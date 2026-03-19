import React, { useMemo, useState } from 'react';
import { ChatHistory, MemorySystem } from '../../../types';

interface Props {
    history?: ChatHistory[];
    memorySystem?: MemorySystem;
}

type MemoryDisplayStructure = {
    name: string;
    summary: string;
    originalText: string;
    turn: number;
    recordedTime: string;
    timestamp: number;
};

const INSTANT_SHORT_TERM_SEPARATOR = '\n<<SHORT_TERM_SYNC>>\n';

const splitInstantAndShortTerm = (entry: string): { immediateContent: string; shortTermSummary: string } => {
    const raw = (entry || '').trim();
    if (!raw) return { immediateContent: '', shortTermSummary: '' };
    const splitAt = raw.lastIndexOf(INSTANT_SHORT_TERM_SEPARATOR);
    if (splitAt < 0) return { immediateContent: raw, shortTermSummary: '' };
    return {
        immediateContent: raw.slice(0, splitAt).trim(),
        shortTermSummary: raw.slice(splitAt + INSTANT_SHORT_TERM_SEPARATOR.length).trim()
    };
};

const formatMemoryName = (round: number): string => `【Recall${String(Math.max(1, round)).padStart(3, '0')}】`;
const formatRoundDisplay = (round: number): string => (round === 1 ? 'Cốt truyện mở đầu' : `Vòng: ${round}`);

const HistoryViewer: React.FC<Props> = ({ history = [], memorySystem }) => {
    const [query, setQuery] = useState('');
    const [expandedKey, setExpandedKey] = useState<string | null>(null);

    const allMemories = useMemo<MemoryDisplayStructure[]>(() => {
        if (Array.isArray(memorySystem?.recallArchives) && memorySystem!.recallArchives.length > 0) {
            return memorySystem!.recallArchives
                .map((item, idx) => ({
                    name: typeof item?.name === 'string' && item.name.trim() ? item.name.trim() : formatMemoryName(idx + 1),
                    summary: typeof item?.summary === 'string' ? item.summary : '',
                    originalText: typeof item?.originalText === 'string' ? item.originalText : '',
                    turn: typeof item?.turn === 'number' && Number.isFinite(item.turn) ? Math.max(1, Math.floor(item.turn)) : idx + 1,
                    recordedTime: typeof item?.recordedTime === 'string' ? item.recordedTime : 'Thời gian không rõ',
                    timestamp: typeof item?.timestamp === 'number' && Number.isFinite(item.timestamp) ? item.timestamp : 0
                }))
                .sort((a, b) => b.turn - a.turn);
        }

        const immediate = Array.isArray(memorySystem?.instantMemory) ? memorySystem!.instantMemory : [];
        if (immediate.length > 0) {
            return immediate
                .map((raw, idx) => {
                    const { immediateContent, shortTermSummary } = splitInstantAndShortTerm(raw);
                    const round = idx + 1;
                    return {
                        name: formatMemoryName(round),
                        summary: shortTermSummary,
                        originalText: immediateContent,
                        turn: round,
                        recordedTime: 'Thời gian không rõ',
                        timestamp: 0
                    };
                })
                .filter(item => item.summary.trim() || item.originalText.trim())
                .reverse();
        }

        const fallback = history
            .filter(msg => msg.role === 'assistant' && msg.structuredResponse)
            .map((msg, idx) => {
                const summary = (msg.structuredResponse?.shortTerm || '').trim();
                const rawText = Array.isArray(msg.structuredResponse?.logs)
                    ? msg.structuredResponse!.logs.map(l => `${l.sender}：${l.text}`).join('\n')
                    : msg.content;
                const round = idx + 1;
                return {
                    name: formatMemoryName(round),
                    summary: summary,
                    originalText: rawText,
                    turn: round,
                    recordedTime: msg.gameTime || new Date(msg.timestamp).toLocaleString(),
                    timestamp: msg.timestamp || 0
                };
            })
            .filter(item => item.summary.trim() || item.originalText.trim())
            .reverse();

        return fallback;
    }, [memorySystem, history]);

    const filteredMemories = useMemo(() => {
        const keyword = query.trim().toLowerCase();
        if (!keyword) return allMemories;
        return allMemories.filter(item => {
            const haystack = `${item.name}\n${item.summary}\n${item.originalText}\n${item.recordedTime}`.toLowerCase();
            return haystack.includes(keyword);
        });
    }, [allMemories, query]);

    return (
        <div className="h-full flex flex-col animate-fadeIn">
            <h3 className="text-wuxia-gold font-sans font-black text-2xl tracking-tighter mb-1 shrink-0">Kho lưu trữ lịch sử tương tác</h3>
            <p className="text-[10px] text-paper-white/40 tracking-[0.3em] font-bold uppercase mb-4 shrink-0 text-shadow-gold">Interaction History</p>

            <div className="shrink-0 mb-3">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm Tên / Tóm tắt / Văn bản gốc"
                    className="w-full bg-white/5 border border-wuxia-gold/30 p-2.5 text-sm text-paper-white rounded-md outline-none focus:border-wuxia-gold backdrop-blur-sm"
                />
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-white/5 border border-wuxia-gold/20 rounded-lg p-3 space-y-2">
                {filteredMemories.map((item) => {
                    const key = `${item.name}-${item.turn}`;
                    const isExpanded = expandedKey === key;
                    return (
                        <div key={key} className="border border-wuxia-gold/20 rounded-lg bg-white/5 overflow-hidden">
                            <button
                                onClick={() => setExpandedKey(prev => prev === key ? null : key)}
                                className={`w-full text-left px-3 py-2.5 transition-colors ${isExpanded ? 'bg-wuxia-gold/10' : 'hover:bg-paper-white/5'}`}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className={`font-mono text-xs truncate ${isExpanded ? 'text-wuxia-gold' : 'text-paper-white/80'}`}>{item.name}</div>
                                    <div className={`text-[10px] ${isExpanded ? 'text-wuxia-gold' : 'text-paper-white/40'}`}>{isExpanded ? 'Thu gọn' : 'Mở rộng'}</div>
                                </div>
                                <div className={`mt-1 text-[11px] truncate ${isExpanded ? 'text-paper-white/90' : 'text-paper-white/50'}`}>
                                    {item.summary || '（Không có tóm tắt）'}
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="border-t border-wuxia-gold/20 px-3 py-3 space-y-3">
                                    <div className="text-[11px] text-paper-white/40 font-mono tracking-tighter">{formatRoundDisplay(item.turn)}</div>

                                    <div>
                                        <div className="text-xs text-wuxia-gold mb-1 underline underline-offset-4 decoration-wuxia-gold/30">Tóm tắt</div>
                                        <div className="text-sm text-paper-white/70 whitespace-pre-wrap">{item.summary || '（Không có tóm tắt）'}</div>
                                    </div>

                                    <div className="border-t border-wuxia-gold/20 pt-3">
                                        <div className="text-xs text-wuxia-gold mb-1 underline underline-offset-4 decoration-wuxia-gold/30">Văn bản gốc</div>
                                        <div className="text-sm text-paper-white/50 whitespace-pre-wrap leading-relaxed">{item.originalText || '（Không có văn bản gốc）'}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {filteredMemories.length === 0 && (
                    <div className="text-center text-paper-white/30 py-10 font-serif">Chưa có hồ sơ phù hợp</div>
                )}
            </div>
        </div>
    );
};

export default HistoryViewer;

