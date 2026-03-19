import { MemorySystem, RecallEntry } from '../../models/system';
import { formatMemoryName } from './memoryUtils';

export const extractMemoryTag = (rawContent: string): { cleanInput: string; recallTag: string } => {
    const source = typeof rawContent === 'string' ? rawContent : '';
    const tagRegex = /<(Ký ức cốt truyện|Story memory)>([\s\S]*?)<\/(Ký ức cốt truyện|Story memory)>/g;
    const matches = Array.from(source.matchAll(tagRegex));
    const recallTag = matches.map((m) => (m[2] || '').trim()).filter(Boolean).join('\n\n');
    const cleanInput = source.replace(tagRegex, '').trim();
    return { cleanInput, recallTag };
};

const parseMemorySequenceList = (line: string): string[] => {
    const set = new Set<string>();
    const matches = line.match(/【Recall\d{3}】/g) || [];
    matches.forEach((item) => set.add(item.trim()));
    return Array.from(set);
};

export const parseStoryMemoryOutput = (raw: string): { strongIds: string[]; weakIds: string[]; normalizedText: string } => {
    const text = (raw || '').trim();
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

    const strongLine = lines.find((line) => /^(Ký ức mạnh|Strong memory)[:：]/.test(line)) || 'Ký ức mạnh:Không';
    const weakLine = lines.find((line) => /^(Ký ức yếu|Weak memory)[:：]/.test(line)) || 'Ký ức yếu:Không';
    const strongIds = parseMemorySequenceList(strongLine);
    const weakIds = parseMemorySequenceList(weakLine).filter((id) => !strongIds.includes(id));
    const normalizedStrong = strongIds.length > 0 ? `Ký ức mạnh:${strongIds.join('|')}` : 'Ký ức mạnh:Không';
    const normalizedWeak = weakIds.length > 0 ? `Ký ức yếu:${weakIds.join('|')}` : 'Ký ức yếu:Không';

    return {
        strongIds,
        weakIds,
        normalizedText: `${normalizedStrong}\n${normalizedWeak}`
    };
};

export const constructRecallContext = (mem: MemorySystem, fullCount: number): string => {
    const archives = Array.isArray(mem.recallArchives) ? [...mem.recallArchives] : [];
    if (archives.length === 0) return 'Tạm thời không có ký ức nào khả dụng.';
    const sorted = archives.sort((a, b) => (a.turn || 0) - (b.turn || 0));
    const fullN = Math.max(1, Math.floor(fullCount || 20));
    const fullStartIndex = Math.max(0, sorted.length - fullN);

    return sorted.map((item, idx) => {
        const name = typeof item?.name === 'string' && item.name.trim().length > 0
            ? item.name.trim()
            : formatMemoryName((item?.turn || idx + 1));
        if (idx >= fullStartIndex) {
            return `${name}：\nNguyên văn：\n${(item?.originalText || '').trim() || '（Không có nguyên văn）'}`;
        }
        return `${name}：\nKý ức ngắn hạn：${(item?.summary || '').trim() || '（Không có tóm tắt）'}`;
    }).join('\n\n');
};

export const constructRecallTags = (
    mem: MemorySystem,
    parsed: { strongIds: string[]; weakIds: string[] }
): string => {
    const archives = Array.isArray(mem.recallArchives) ? mem.recallArchives : [];
    const mapByName = new Map<string, RecallEntry>(archives.map((item) => [item.name, item]));

    const uniqueStrong = Array.from(new Set(parsed.strongIds));
    const uniqueWeak = Array.from(new Set(parsed.weakIds.filter((id) => !uniqueStrong.includes(id))));

    const strongBlocks = uniqueStrong.map((id) => {
        const matched = mapByName.get(id);
        const rawText = typeof matched?.originalText === 'string' ? matched.originalText.trim() : '';
        return `${id}：\n${rawText || '（No original text）'}`;
    });
    const weakBlocks = uniqueWeak.map((id) => {
        const matched = mapByName.get(id);
        const summary = typeof matched?.summary === 'string' ? matched.summary.trim() : '';
        return `${id}：\n${summary || '（No summary）'}`;
    });

    return [
        'Ký ức mạnh：',
        strongBlocks.length > 0 ? strongBlocks.join('\n\n') : 'Không',
        '',
        'Ký ức yếu：',
        parsed.strongIds.length > 0 && weakBlocks.length === 0 ? '' : (weakBlocks.length > 0 ? weakBlocks.join('\n\n') : 'Không')
    ].join('\n').trim();
};
