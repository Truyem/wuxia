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

export const stripFence = (input: string): string => {
    const trimmed = input.trim();
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced?.[1]) return fenced[1].trim();
    return trimmed;
};

const extractJsonBlock = (input: string): string => {
    const startIdx = input.search(/\{[\s\S]*?("logs"|"tavern_commands")/i);
    if (startIdx >= 0) return extractFirstJsonObject(input.slice(startIdx));
    const start = input.indexOf('{');
    const end = input.lastIndexOf('}');
    if (start >= 0 && end > start) return input.slice(start, end + 1);
    return input;
};

const extractFirstJsonObject = (input: string): string => {
    const start = input.indexOf('{');
    if (start < 0) return input;
    let depth = 0, inString = false, escaped = false;
    for (let i = start; i < input.length; i++) {
        const ch = input[i];
        if (inString) {
            if (escaped) escaped = false;
            else if (ch === '\\') escaped = true;
            else if (ch === '"') inString = false;
            continue;
        }
        if (ch === '"') inString = true;
        else if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) return input.slice(start, i + 1);
        }
    }
    const end = input.lastIndexOf('}');
    return end > start ? input.slice(start, end + 1) : input;
};

const structuralAwareRepair = (input: string): string => {
    let result = '', inString = false, escaped = false;
    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (inString) {
            if (escaped) { escaped = false; result += ch; }
            else if (ch === '\\') { escaped = true; result += ch; }
            else if (ch === '"') { inString = false; result += ch; }
            else {
                if (ch === '}') {
                    const remaining = input.slice(i);
                    if (remaining.match(/^\}\s*,?\s*\{/)) { result += '"'; inString = false; }
                }
                result += ch;
            }
            continue;
        }
        if (ch === '"') inString = true;
        result += ch;
    }
    return result;
};

const removeDanglingQuoteTokens = (input: string): string => {
    let result = '', inString = false, escaped = false, lastSig = '';
    const nextNonWsIndex = (from: number): number => {
        for (let i = from; i < input.length; i++) {
            if (!/\s/.test(input[i])) return i;
        }
        return -1;
    };

    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (inString) {
            result += ch;
            if (escaped) escaped = false;
            else if (ch === '\\') escaped = true;
            else if (ch === '"') inString = false;
            continue;
        }

        if (ch === '"') {
            const nextIdx = nextNonWsIndex(i + 1);
            const nextChar = nextIdx >= 0 ? input[nextIdx] : '';
            if (nextChar && ',}]'.includes(nextChar) && /[}"\]0-9]/.test(lastSig)) {
                continue;
            }
            if (input[i + 1] === '"') {
                const afterPairIdx = nextNonWsIndex(i + 2);
                const afterPairChar = afterPairIdx >= 0 ? input[afterPairIdx] : '';
                if (afterPairChar && ',}]'.includes(afterPairChar) && /[}"\]0-9]/.test(lastSig)) {
                    i += 1;
                    continue;
                }
            }
            inString = true;
        }

        result += ch;
        if (!/\s/.test(ch)) lastSig = ch;
    }
    return result;
};

const normalizeFullWidthPunctuation = (input: string): string => {
    const map: Record<string, string> = { '“': '"', '”': '"', '‘': "'", '’': "'", '，': ',', '：': ':', '；': ',' };
    let result = '', inString = false, escaped = false;
    for (const ch of input) {
        if (inString) {
            result += ch;
            if (escaped) escaped = false;
            else if (ch === '\\') escaped = true;
            else if (ch === '"') inString = false;
            continue;
        }
        if (ch === '"') { inString = true; result += ch; continue; }
        result += map[ch] ?? ch;
    }
    return result;
};

const insertMissingCommasBetweenPairs = (input: string): string => {
    return input.replace(/(["\]}0-9])\s*(?=\{|\[|"[^"]+"\s*:)/g, '$1,');
};

const normalizeBracketBalance = (input: string): string => {
    let result = '', stack: string[] = [], inString = false, escaped = false;
    for (const ch of input) {
        if (inString) {
            result += ch;
            if (escaped) escaped = false;
            else if (ch === '\\') escaped = true;
            else if (ch === '"') inString = false;
            continue;
        }
        if (ch === '"') { inString = true; result += ch; continue; }
        if (ch === '{') { stack.push('}'); result += ch; continue; }
        if (ch === '[') { stack.push(']'); result += ch; continue; }
        if (ch === '}' || ch === ']') {
            const idx = stack.lastIndexOf(ch);
            if (idx >= 0) {
                while (stack.length > idx + 1) result += stack.pop();
                stack.pop(); result += ch;
            } else continue;
            continue;
        }
        result += ch;
    }
    if (inString) result += '"';
    if (stack.length > 0) result += stack.reverse().join('');
    return result;
};

const escapeRawLineBreaksInStrings = (input: string): string => {
    let result = '', inString = false, escaped = false;
    const VALID = new Set(['b', 'f', 'n', 'r', 't', '"', '\\', '/', 'u']);
    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (inString) {
            if (escaped) {
                if (!VALID.has(ch)) { result += (ch === '\n' || ch === '\r') ? 'n' : '\\' + ch; }
                else result += ch;
                escaped = false; continue;
            }
            if (ch === '\\') { result += ch; escaped = true; continue; }
            if (ch === '"') { inString = false; result += ch; continue; }
            const code = ch.charCodeAt(0);
            if (code < 0x20) {
                result += (ch === '\n' || ch === '\r') ? '\\n' : '\\u' + code.toString(16).padStart(4, '0');
                continue;
            }
            result += ch; continue;
        }
        if (ch === '"') inString = true;
        result += ch;
    }
    return result;
};

const repairJsonText = (input: string): string => {
    let text = input.replace(/^\uFEFF/, '').trim();
    text = stripFence(text);
    text = extractJsonBlock(text);
    text = normalizeFullWidthPunctuation(text);
    text = structuralAwareRepair(text);
    text = removeDanglingQuoteTokens(text);
    text = insertMissingCommasBetweenPairs(text);
    text = normalizeBracketBalance(text);
    text = escapeRawLineBreaksInStrings(text);
    return text.trim();
};

export const parseJsonWithRepair = <T = any>(input: string): JsonRepairResult<T> => {
    const source = (input || '').replace(/^\uFEFF/, '').trim();
    const candidates = [source, source.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '').trim(), stripFence(source), extractFirstJsonObject(source)];
    const seen = new Set<string>();
    const cleanCandidates = candidates.map(c => c.trim()).filter(c => c && !seen.has(c) && seen.add(c));

    for (const c of cleanCandidates) {
        try { return { value: JSON.parse(c) as T, repairedText: c, usedRepair: c !== source }; } catch {}
    }

    let lastError = 'Repair failed', bestRepaired = source;
    for (const c of cleanCandidates) {
        const repaired = repairJsonText(c);
        bestRepaired = repaired;
        try { return { value: JSON.parse(repaired) as T, repairedText: repaired, usedRepair: true }; }
        catch (e: any) { lastError = e.message; }
    }
    // Final desperate attempt: if error is about comma/brace, try to fix it guiding by position
    return { value: null, repairedText: bestRepaired, usedRepair: true, error: lastError };
};

export const formatJsonWithRepair = (input: string, fallback: string): string => {
    const p = parseJsonWithRepair<any>(input);
    return p.value ? JSON.stringify(p.value, null, 2) : p.repairedText || fallback;
};
