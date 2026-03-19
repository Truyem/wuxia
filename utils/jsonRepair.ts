type ParseAttempt<T> = {
    ok: boolean;
    value: T | null;
    error?: string;
};

export interface JsonRepairResult<T = any> {
    value: T | null;
    repairedText: string;
    usedRepair: boolean;
    error?: string;
}

const tryParse = <T = any>(input: string): ParseAttempt<T> => {
    try {
        return { ok: true, value: JSON.parse(input) as T };
    } catch (error: any) {
        return { ok: false, value: null, error: error?.message || 'JSON Parsing failed' };
    }
};

const stripFence = (input: string): string => {
    const trimmed = input.trim();
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced?.[1]) return fenced[1].trim();
    return trimmed;
};

const extractJsonBlock = (input: string): string => {
    const start = input.indexOf('{');
    const end = input.lastIndexOf('}');
    if (start >= 0 && end > start) return input.slice(start, end + 1);
    return input;
};

/**
 * Extracts the first complete, balanced JSON object using bracket counting.
 * This handles the case where extra text (possibly containing `}`) appears
 * after a valid JSON object – e.g. `{"k":"v"} {"extra":"data"}` or
 * `{"k":"v"}\nHere is the explanation`.  Unlike `extractJsonBlock` which
 * uses `lastIndexOf('}')`, this stops at the very first closing brace that
 * returns the depth counter to zero.
 */
const extractFirstJsonObject = (input: string): string => {
    const start = input.indexOf('{');
    if (start < 0) return input;

    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = start; i < input.length; i++) {
        const ch = input[i];
        if (inString) {
            if (escaped) {
                escaped = false;
            } else if (ch === '\\') {
                escaped = true;
            } else if (ch === '"') {
                inString = false;
            }
            continue;
        }
        if (ch === '"') {
            inString = true;
        } else if (ch === '{') {
            depth++;
        } else if (ch === '}') {
            depth--;
            if (depth === 0) {
                return input.slice(start, i + 1);
            }
        }
    }

    // Fallback: depth never reached 0 (truncated stream), return from start to last `}`
    const end = input.lastIndexOf('}');
    if (end > start) return input.slice(start, end + 1);
    return input;
};

const replaceOutsideStrings = (input: string, mapper: (ch: string) => string): string => {
    let result = '';
    let inString = false;
    let escaped = false;

    for (const ch of input) {
        if (inString) {
            result += ch;
            if (escaped) {
                escaped = false;
            } else if (ch === '\\') {
                escaped = true;
            } else if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
            result += ch;
            continue;
        }
        result += mapper(ch);
    }

    return result;
};

const normalizeFullWidthPunctuation = (input: string): string => {
    const map: Record<string, string> = {
        '“': '"',
        '”': '"',
        '‘': "'",
        '’': "'",
        '，': ',',
        '：': ':',
        '；': ',',
    };
    return replaceOutsideStrings(input, (ch) => map[ch] ?? ch);
};

const normalizeSlashN = (input: string): string => {
    return input
        .replace(/\\\/n/g, '\\n')
        .replace(/\/n/g, '\\n');
};

const normalizeSingleQuoteJson = (input: string): string => {
    const escapeDoubleQuote = (text: string) => text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return input
        .replace(/([{,]\s*)'([^'\\]*(?:\\.[^'\\]*)*)'(\s*:)/g, (_m, p1, p2, p3) => `${p1}"${escapeDoubleQuote(p2)}"${p3}`)
        .replace(/(:\s*)'([^'\\]*(?:\\.[^'\\]*)*)'(?=\s*[,}\]])/g, (_m, p1, p2) => `${p1}"${escapeDoubleQuote(p2)}"`);
};

const quoteBareKeys = (input: string): string => {
    return input.replace(/([{,]\s*)([A-Za-z_\u4e00-\u9fa5][\w\u4e00-\u9fa5-]*)(\s*:)/g, '$1"$2"$3');
};

const insertMissingCommasBetweenPairs = (input: string): string => {
    return input.replace(/(["\]}0-9])\s*(?="[^"]+"\s*:)/g, '$1,');
};

const removeTrailingCommas = (input: string): string => {
    return input.replace(/,\s*([}\]])/g, '$1');
};

const trimIllegalTailPunctuation = (input: string): string => {
    return input.replace(/([}\]])[，。；;]+/g, '$1');
};

const endsInsideString = (input: string): boolean => {
    let inString = false;
    let escaped = false;

    for (const ch of input) {
        if (inString) {
            if (escaped) {
                escaped = false;
            } else if (ch === '\\') {
                escaped = true;
            } else if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
        }
    }

    return inString;
};

const closeDanglingString = (input: string): string => {
    if (!endsInsideString(input)) return input;
    const tailMatch = input.match(/(\s*[}\]]+\s*)$/);
    if (tailMatch && typeof tailMatch.index === 'number') {
        const insertAt = tailMatch.index;
        return `${input.slice(0, insertAt)}"${input.slice(insertAt)}`;
    }
    return `${input}"`;
};

const findPrevNonWhitespaceIndex = (text: string, from: number): number => {
    for (let i = Math.min(from, text.length - 1); i >= 0; i--) {
        if (!/\s/.test(text[i])) return i;
    }
    return -1;
};

const findNextNonWhitespaceIndex = (text: string, from: number): number => {
    for (let i = Math.max(0, from); i < text.length; i++) {
        if (!/\s/.test(text[i])) return i;
    }
    return -1;
};

const extractErrorPosition = (input: string, errorMessage: string): number => {
    // Chrome/V8: "at position 2019"
    const posMatch = errorMessage.match(/position\s+(\d+)/i);
    if (posMatch) return Number(posMatch[1]);
    // Firefox: "at line X column Y of the JSON data"
    const firefoxMatch = errorMessage.match(/line\s+(\d+)\s+column\s+(\d+)/i);
    if (firefoxMatch) {
        const line = Number(firefoxMatch[1]);
        const col = Number(firefoxMatch[2]);
        let currentLine = 1;
        for (let i = 0; i < input.length; i++) {
            if (currentLine === line) return i + col - 1;
            if (input[i] === '\n') currentLine++;
        }
    }
    return NaN;
};

const repairMissingCommaByParseError = (input: string, errorMessage?: string): string => {
    if (!errorMessage) return input;
    if (!/expected\s*['“]?,['\u201D]?\s*or\s*['“]?}['\u201D]?\s*after\s*property\s*value/i.test(errorMessage)) return input;
    const pos = extractErrorPosition(input, errorMessage);
    if (!Number.isFinite(pos)) return input;

    const nextIdx = findNextNonWhitespaceIndex(input, pos);
    if (nextIdx < 0) return input;

    const prevIdx = findPrevNonWhitespaceIndex(input, nextIdx - 1);
    if (prevIdx < 0) return input;

    const prevCh = input[prevIdx];
    const nextCh = input[nextIdx];
    const beforeHasComma = prevCh === ',';
    const looksLikeAdjacentNextKey = nextCh === '"' || nextCh === '{' || nextCh === '[';
    const valueEnded = prevCh === '"' || prevCh === '}' || prevCh === ']' || /[0-9a-zA-Z]/.test(prevCh);

    if (!beforeHasComma && looksLikeAdjacentNextKey && valueEnded) {
        return `${input.slice(0, nextIdx)},${input.slice(nextIdx)}`;
    }
    return input;
};

const repairUnterminatedStringByParseError = (input: string, errorMessage?: string): string => {
    if (!errorMessage) return input;
    if (!/unterminated\s*string/i.test(errorMessage)) return input;
    return closeDanglingString(input);
};

const repairUnescapedQuotesByParseError = (input: string, errorMessage?: string): string => {
    if (!errorMessage) return input;
    // Common error when an unescaped quote breaks the string and the next character is unexpected
    if (!/expected\s*['“]?,['\u201D]?\s*or\s*['“]?}['\u201D]?/i.test(errorMessage) &&
        !/unexpected\s*char/i.test(errorMessage) &&
        !/invalid\s*character/i.test(errorMessage)) return input;

    const pos = extractErrorPosition(input, errorMessage);
    if (!Number.isFinite(pos)) return input;

    // Logic: Look back to see if we are likely inside a large text block due to an unescaped quote
    let inString = false;
    for (let i = 0; i < pos; i++) {
        if (input[i] === '"' && (i === 0 || input[i - 1] !== '\\')) {
            inString = !inString;
        }
    }

    if (!inString) {
        // Find the most recent '"' that might have been unescaped (this quote ended the string prematurely)
        const lastQuoteIdx = input.lastIndexOf('"', pos - 1);
        if (lastQuoteIdx > 0 && input[lastQuoteIdx - 1] !== '\\') {
            const nextAfterQuote = findNextNonWhitespaceIndex(input, lastQuoteIdx + 1);
            if (nextAfterQuote >= 0) {
                const charAfterQuote = input[nextAfterQuote];
                // If it's not a structural character, it's probably unescaped content
                if (charAfterQuote !== ':' && charAfterQuote !== ',' && charAfterQuote !== '}' && charAfterQuote !== ']') {
                    return `${input.slice(0, lastQuoteIdx)}\\"${input.slice(lastQuoteIdx + 1)}`;
                }
            }
        }
    }

    return input;
};

const repairExpectedQuotedPropertyNameByParseError = (input: string, errorMessage?: string): string => {
    if (!errorMessage) return input;
    if (!/expected\s*double-quoted\s*property\s*name/i.test(errorMessage)) return input;
    const pos = extractErrorPosition(input, errorMessage);
    if (!Number.isFinite(pos)) return input;

    const nextIdx = findNextNonWhitespaceIndex(input, pos);
    if (nextIdx < 0) return input;
    const nextCh = input[nextIdx];

    const prevIdx = findPrevNonWhitespaceIndex(input, nextIdx - 1);
    if (prevIdx >= 0) {
        const prevCh = input[prevIdx];
        if ((nextCh === '}' || nextCh === ']') && prevCh === ',') {
            return `${input.slice(0, prevIdx)}${input.slice(prevIdx + 1)}`;
        }
    }

    if (nextCh === ',') {
        const afterComma = findNextNonWhitespaceIndex(input, nextIdx + 1);
        if (afterComma >= 0 && (input[afterComma] === '}' || input[afterComma] === ']')) {
            return `${input.slice(0, nextIdx)}${input.slice(nextIdx + 1)}`;
        }
    }

    const escapeDoubleQuote = (text: string) => text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const singleQuotedKeyFixed = input.replace(
        /([{,]\s*)'([^'\\]*(?:\\.[^'\\]*)*)'(\s*:)/g,
        (_m, p1, p2, p3) => `${p1}"${escapeDoubleQuote(p2)}"${p3}`
    );
    if (singleQuotedKeyFixed !== input) {
        return singleQuotedKeyFixed;
    }

    const keyStartChar = input[nextIdx];
    const isKeyStart = /[A-Za-z_\u4e00-\u9fa5]/.test(keyStartChar);
    if (isKeyStart) {
        let endIdx = nextIdx + 1;
        while (endIdx < input.length && /[A-Za-z0-9_\u4e00-\u9fa5-]/.test(input[endIdx])) {
            endIdx += 1;
        }
        const colonIdx = findNextNonWhitespaceIndex(input, endIdx);
        const prevTokenIdx = findPrevNonWhitespaceIndex(input, nextIdx - 1);
        const keyBoundaryOk = prevTokenIdx < 0 || input[prevTokenIdx] === '{' || input[prevTokenIdx] === ',';
        if (colonIdx >= 0 && input[colonIdx] === ':' && keyBoundaryOk) {
            const keyText = input.slice(nextIdx, endIdx);
            return `${input.slice(0, nextIdx)}"${keyText}"${input.slice(endIdx)}`;
        }
    }

    return quoteBareKeys(removeTrailingCommas(input));
};

const repairEmbeddedQuoteByParseError = (input: string, errorMessage?: string): string => {
    if (!errorMessage) return input;
    if (!/expected\s*['"]?,['\u201D]?\s*or\s*['"]?}['\u201D]?\s*after\s*property\s*value/i.test(errorMessage)) return input;
    const pos = extractErrorPosition(input, errorMessage);
    if (!Number.isFinite(pos)) return input;

    const nextIdx = findNextNonWhitespaceIndex(input, pos);
    if (nextIdx < 0) return input;
    const charAtError = input[nextIdx];

    // If the character at the error position is '{' or '[',
    // this is likely a missing comma issue – skip.
    if (charAtError === '{' || charAtError === '[') {
        return input;
    }

    // If the character is '"', it could be:
    // a) A missing comma before a new key ("val" "key": ...) – skip for comma repair
    // b) A trailing embedded dialogue quote ("text..."") – should be handled here
    if (charAtError === '"') {
        // Check if this " starts a key-value pair ("key": ...)
        let j = nextIdx + 1;
        while (j < input.length && input[j] !== '"' && input[j] !== '\n') {
            if (input[j] === '\\') j++;
            j++;
        }
        if (j < input.length && input[j] === '"') {
            const colonIdx = findNextNonWhitespaceIndex(input, j + 1);
            if (colonIdx >= 0 && input[colonIdx] === ':') {
                // Looks like a key-value pair – missing comma, not embedded quote
                return input;
            }
        }
    }

    // Look backwards from the error position for an unescaped double quote.
    // This quote prematurely ended the string value and should be escaped.
    for (let i = nextIdx - 1; i >= 0; i--) {
        if (input[i] === '"') {
            let backslashes = 0;
            for (let j = i - 1; j >= 0; j--) {
                if (input[j] === '\\') backslashes++;
                else break;
            }
            if (backslashes % 2 === 0) {
                return `${input.slice(0, i)}\\"${input.slice(i + 1)}`;
            }
        }
    }

    return input;
};

const errorGuidedRepair = (input: string, firstError?: string): string => {
    let text = input;
    let lastError = firstError;
    // Each unescaped embedded quote needs one iteration to fix (two iterations
    // per dialogue pair: one for the opening quote, one for the closing).
    // AI-generated world prompts can have many dialogue exchanges, so we allow
    // up to 50 iterations to handle up to ~25 dialogue pairs.
    for (let i = 0; i < 50; i++) {
        let next = repairEmbeddedQuoteByParseError(text, lastError);
        if (next === text) {
            next = repairMissingCommaByParseError(text, lastError);
        }
        if (next === text) {
            next = repairUnescapedQuotesByParseError(text, lastError);
        }
        if (next === text) {
            next = repairExpectedQuotedPropertyNameByParseError(text, lastError);
        }
        if (next === text) {
            next = repairUnterminatedStringByParseError(text, lastError);
        }
        if (next === text) break;
        text = next;
        const parsed = tryParse(text);
        if (parsed.ok) return text;
        lastError = parsed.error;
    }
    return text;
};

const normalizeBracketBalance = (input: string): string => {
    let result = '';
    const stack: string[] = [];
    let inString = false;
    let escaped = false;

    for (const ch of input) {
        if (inString) {
            result += ch;
            if (escaped) {
                escaped = false;
            } else if (ch === '\\') {
                escaped = true;
            } else if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
            result += ch;
            continue;
        }

        if (ch === '{') {
            stack.push('}');
            result += ch;
            continue;
        }
        if (ch === '[') {
            stack.push(']');
            result += ch;
            continue;
        }
        if (ch === '}' || ch === ']') {
            const expected = stack[stack.length - 1];
            if (expected === ch) {
                stack.pop();
                result += ch;
            }
            continue;
        }
        result += ch;
    }

    // If stream output ends inside a string literal, close the quote first.
    if (inString) {
        result += '"';
    }

    if (stack.length > 0) {
        result += stack.reverse().join('');
    }
    return result;
};

const VALID_JSON_ESCAPES = new Set(['b', 'f', 'n', 'r', 't', '"', '\\', '/', 'u']);

const escapeRawLineBreaksInStrings = (input: string): string => {
    let result = '';
    let inString = false;
    let escaped = false;

    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (inString) {
            if (escaped) {
                if (!VALID_JSON_ESCAPES.has(ch)) {
                    const code = ch.charCodeAt(0);
                    if (code < 0x20) {
                        // Control character following a backslash (e.g. `\` + actual newline).
                        // The `\` is already in the result; just emit the correct escape letter
                        // so the sequence becomes a valid JSON escape like `\n`, `\t`, etc.
                        if (ch === '\n') {
                            result += 'n';
                        } else if (ch === '\r') {
                            if (input[i + 1] === '\n') i += 1;
                            result += 'n';
                        } else if (ch === '\t') {
                            result += 't';
                        } else if (ch === '\b') {
                            result += 'b';
                        } else if (ch === '\f') {
                            result += 'f';
                        } else {
                            result += 'u' + code.toString(16).padStart(4, '0');
                        }
                    } else {
                        // Non-control invalid escape (e.g. \a, \x) – escape the
                        // backslash as a literal so the JSON stays valid.
                        result += '\\';
                        result += ch;
                    }
                } else {
                    result += ch;
                }
                escaped = false;
                continue;
            }
            if (ch === '\\') {
                result += ch;
                escaped = true;
                continue;
            }
            if (ch === '"') {
                inString = false;
                result += ch;
                continue;
            }
            // Escape ALL control characters (ASCII 0-31) inside strings
            const code = ch.charCodeAt(0);
            if (code < 0x20) {
                if (ch === '\n') {
                    result += '\\n';
                } else if (ch === '\r') {
                    if (input[i + 1] === '\n') i += 1;
                    result += '\\n';
                } else if (ch === '\t') {
                    result += '\\t';
                } else if (ch === '\b') {
                    result += '\\b';
                } else if (ch === '\f') {
                    result += '\\f';
                } else {
                    result += '\\u' + code.toString(16).padStart(4, '0');
                }
                continue;
            }
            result += ch;
            continue;
        }

        if (ch === '"') {
            inString = true;
            result += ch;
            continue;
        }
        result += ch;
    }

    return result;
};

const normalizeBase = (input: string): string => {
    return input.replace(/^\uFEFF/, '').trim();
};

const repairJsonText = (input: string): string => {
    let text = normalizeBase(input);
    text = stripFence(text);
    text = extractJsonBlock(text);
    text = normalizeSlashN(text);
    text = normalizeFullWidthPunctuation(text);
    text = normalizeSingleQuoteJson(text);
    text = quoteBareKeys(text);
    text = insertMissingCommasBetweenPairs(text);
    text = removeTrailingCommas(text);
    text = trimIllegalTailPunctuation(text);
    text = closeDanglingString(text);
    text = normalizeBracketBalance(text);
    text = escapeRawLineBreaksInStrings(text);
    return text.trim();
};

const dedupeCandidates = (candidates: string[]): string[] => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const item of candidates) {
        const value = item.trim();
        if (!value || seen.has(value)) continue;
        seen.add(value);
        list.push(value);
    }
    return list;
};

export const parseJsonWithRepair = <T = any>(input: string): JsonRepairResult<T> => {
    const source = normalizeBase(input || '');
    const candidates = dedupeCandidates([
        source,
        stripFence(source),
        extractFirstJsonObject(source),
        extractFirstJsonObject(stripFence(source)),
        extractJsonBlock(source),
        extractJsonBlock(stripFence(source)),
    ]);

    for (const candidate of candidates) {
        const parsed = tryParse<T>(candidate);
        if (parsed.ok) {
            return {
                value: parsed.value,
                repairedText: candidate,
                usedRepair: candidate !== source,
            };
        }
    }

    let lastError = 'JSON Parsing failed';
    for (const candidate of candidates) {
        const repaired = repairJsonText(candidate);
        const parsed = tryParse<T>(repaired);
        if (parsed.ok) {
            return {
                value: parsed.value,
                repairedText: repaired,
                usedRepair: true,
            };
        }
        const guided = errorGuidedRepair(repaired, parsed.error);
        if (guided !== repaired) {
            const guidedParsed = tryParse<T>(guided);
            if (guidedParsed.ok) {
                return {
                    value: guidedParsed.value,
                    repairedText: guided,
                    usedRepair: true,
                };
            }
            if (guidedParsed.error) lastError = guidedParsed.error;
        }
        if (parsed.error) lastError = parsed.error;
    }

    const fallback = repairJsonText(source);
    return {
        value: null,
        repairedText: fallback,
        usedRepair: true,
        error: lastError,
    };
};

export const formatJsonWithRepair = (input: string, fallback: string): string => {
    const parsed = parseJsonWithRepair<any>(input);
    if (parsed.value === null) return fallback;
    try {
        return JSON.stringify(parsed.value, null, 2);
    } catch {
        return parsed.repairedText || fallback;
    }
};
