import { GameResponse, MemorySystem, MemoryConfig } from '../../types';
import { defaultMidToLongMemoryPrompt, defaultShortToMidMemoryPrompt } from '../../prompts/runtime/defaults';

export const MEMORY_SEPARATOR = '\n<<SHORT_TERM_SYNC>>\n';

export const splitInstantAndShortTerm = (entry: string): { immediateContent: string; shortTermSummary: string } => {
    const raw = (entry || '').trim();
    if (!raw) return { immediateContent: '', shortTermSummary: '' };
    const splitAt = raw.lastIndexOf(MEMORY_SEPARATOR);
    if (splitAt < 0) return { immediateContent: raw, shortTermSummary: '' };
    return {
        immediateContent: raw.slice(0, splitAt).trim(),
        shortTermSummary: raw.slice(splitAt + MEMORY_SEPARATOR.length).trim()
    };
};

export const formatMemoryName = (round: number): string => `【Recall${String(Math.max(1, round)).padStart(3, '0')}】`;

export const deriveMemoryArchivesFromInstantMemory = (immediateMemory: string[]): any[] => {
    return immediateMemory
        .map((item, index) => {
            const { immediateContent, shortTermSummary } = splitInstantAndShortTerm(item);
            const hasContent = immediateContent.trim().length > 0 || shortTermSummary.trim().length > 0;
            if (!hasContent) return null;
            const round = index + 1;
            return {
                name: formatMemoryName(round),
                summary: shortTermSummary.trim(),
                originalText: immediateContent.trim(),
                turn: round,
                recordedTime: 'Unknown time',
                timestamp: 0
            };
        })
        .filter(Boolean) as any[];
};

export const standardizeMemorySystem = (raw?: Partial<MemorySystem> | null): MemorySystem => {
    const immediateMemory = Array.isArray(raw?.instantMemory) ? [...raw!.instantMemory] : [];
    const recallArchives = Array.isArray((raw as any)?.recallArchives)
        ? (raw as any).recallArchives
            .map((item: any, idx: number) => {
                if (!item || typeof item !== 'object') return null;
                const round = Number(item.round);
                const normalizedRound = Number.isFinite(round) && round > 0 ? Math.floor(round) : idx + 1;
                return {
                    name: typeof item.name === 'string' && item.name.trim()
                        ? item.name.trim()
                        : formatMemoryName(normalizedRound),
                    summary: typeof item.summary === 'string' ? item.summary : (typeof item.summarize === 'string' ? item.summarize : ''),
                    originalText: typeof item.originalText === 'string' ? item.originalText : '',
                    turn: normalizedRound,
                    recordedTime: typeof item.recordedTime === 'string' ? item.recordedTime : (typeof item.recordTime === 'string' ? item.recordTime : 'Unknown time'),
                    timestamp: typeof item.timestamp === 'number' && Number.isFinite(item.timestamp) ? item.timestamp : 0
                };
            })
            .filter(Boolean)
        : deriveMemoryArchivesFromInstantMemory(immediateMemory);

    return {
        recallArchives,
        instantMemory: immediateMemory,
        shortTermMemory: Array.isArray(raw?.shortTermMemory) ? [...raw!.shortTermMemory] : [],
        midTermMemory: Array.isArray(raw?.midTermMemory) ? [...raw!.midTermMemory] : [],
        longTermMemory: Array.isArray(raw?.longTermMemory) ? [...raw!.longTermMemory] : []
    };
};

export const standardizeMemoryConfig = (raw?: Partial<MemoryConfig> | null): MemoryConfig => ({
    shortTermThreshold: Math.max(5, Number(raw?.shortTermThreshold) || 30),
    midTermThreshold: Math.max(20, Number(raw?.midTermThreshold) || 50),
    keyNpcImportantMemoryLimitN: Math.max(1, Number(raw?.keyNpcImportantMemoryLimitN) || 20),
    shortToMidPrompt: typeof raw?.shortToMidPrompt === 'string'
        ? raw.shortToMidPrompt
        : defaultShortToMidMemoryPrompt,
    midToLongPrompt: typeof raw?.midToLongPrompt === 'string'
        ? raw.midToLongPrompt
        : defaultMidToLongMemoryPrompt
});

export const generateMemorySummary = (batch: string[], source: 'Short-term' | 'Mid-term'): string => {
    const filtered = batch.map(item => item.trim()).filter(Boolean);
    if (filtered.length === 0) return source === 'Short-term' ? 'Short-term memory summary (Empty)' : 'Medium-term memory summary (Empty)';
    const first = filtered[0];
    const last = filtered[filtered.length - 1];
    const preview = filtered.slice(0, 3).join('；');
    return `${source}Summary(${filtered.length}): ${first} -> ${last}｜Key Points: ${preview}`.slice(0, 300);
};

export const formatMemoryTime = (raw: string): string => {
    if (typeof raw !== 'string') return '【Unknown time】';
    const m = raw.trim().match(/^(\d{1,6}):(\d{1,2}):(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
    if (!m) return `【${raw || 'Unknown time'}】`;
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    const hour = Number(m[4]).toString().padStart(2, '0');
    const minute = Number(m[5]).toString().padStart(2, '0');
    return `【${year}Year${month}Month${day}Day-${hour}:${minute}】`;
};

export const buildRealTimeMemoryEntry = (
    gameTime: string,
    playerInput: string,
    aiData: GameResponse,
    options?: { omitPlayerInput?: boolean }
): string => {
    const timeLabel = formatMemoryTime(gameTime || 'Unknown time');
    const logsText = Array.isArray(aiData.logs) && aiData.logs.length > 0
        ? aiData.logs
            .map((log) => `${log.sender}：${(log.text || '').trim()}`)
            .join('\n')
        : '（No valid story logs this round）';
    const lines = [timeLabel];
    if (!options?.omitPlayerInput) {
        lines.push(`Player input：${playerInput || '（Empty input）'}`);
    }
    lines.push('AI Output：', logsText);
    return lines.join('\n').trim();
};

export const buildShortTermMemoryEntry = (gameTime: string, playerInput: string, aiData: GameResponse): string => {
    const timeLabel = formatMemoryTime(gameTime || 'Unknown time');
    const summary = (aiData.shortTerm || '').trim() ||
        (Array.isArray(aiData.logs)
            ? aiData.logs.map(log => `${log.sender}:${log.text}`).join(' ').slice(0, 180)
            : 'Progression this round');
    return `${timeLabel} ${playerInput} -> ${summary}`;
};

export const mergeInstantAndShortTerm = (immediateEntry: string, shortEntry: string): string => {
    const full = immediateEntry.trim();
    const summary = shortEntry.trim();
    if (!summary) return full;
    return `${full}${MEMORY_SEPARATOR}${summary}`;
};

export const writeFourMemorySegments = (
    memoryBase: MemorySystem,
    immediateEntry: string,
    shortEntry: string,
    options?: {
        shortLimit?: number;
        midLimit?: number;
        recordTime?: string;
        timestamp?: number;
    }
): MemorySystem => {
    const next = standardizeMemorySystem(memoryBase);
    const full = immediateEntry.trim();
    const summary = shortEntry.trim();
    if (!full && !summary) return next;

    const shortLimit = Math.max(5, Number(options?.shortLimit) || 30);

    if (full) next.instantMemory.push(mergeInstantAndShortTerm(full, summary));
    else if (summary) next.shortTermMemory.push(summary);

    if (full || summary) {
        const round = (next.recallArchives?.length || 0) + 1;
        next.recallArchives.push({
            name: formatMemoryName(round),
            summary: summary,
            originalText: full,
            turn: round,
            recordedTime: options?.recordTime || 'Unknown time',
            timestamp: options?.timestamp || Date.now()
        });
    }

    while (next.instantMemory.length > shortLimit) {
        const shifted = next.instantMemory.shift();
        if (!shifted) continue;
        const { shortTermSummary } = splitInstantAndShortTerm(shifted);
        if (shortTermSummary) next.shortTermMemory.push(shortTermSummary);
    }

    while (next.shortTermMemory.length > shortLimit) {
        const batch = next.shortTermMemory.splice(0, shortLimit);
        next.midTermMemory.push(generateMemorySummary(batch, 'Short-term'));
    }

    const midLimit = Math.max(3, Number(options?.midLimit) || 50);
    while (next.midTermMemory.length > midLimit) {
        const batch = next.midTermMemory.splice(0, midLimit);
        next.longTermMemory.push(generateMemorySummary(batch, 'Mid-term'));
    }

    return next;
};
