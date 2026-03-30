import React, { useState } from 'react';
import { ChatHistory, MemorySystem } from '../../../types';
import IconGlyph from '../../ui/Icon/IconGlyph';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    history: ChatHistory[];
    memorySystem?: MemorySystem;
    currentTime?: string;
}

type TabType = 'context' | 'short' | 'medium' | 'long';
const INSTANT_SHORT_TERM_SEPARATOR = '\n<<SHORT_TERM_SYNC>>\n';

const parseRealTimeMemory = (raw: string) => {
    const text = (raw || '').trim();
    const splitAt = text.lastIndexOf(INSTANT_SHORT_TERM_SEPARATOR);
    if (splitAt < 0) return { main: text, syncedShort: '' };
    return {
        main: text.slice(0, splitAt).trim(),
        syncedShort: text.slice(splitAt + INSTANT_SHORT_TERM_SEPARATOR.length).trim()
    };
};

const MemoryModal: React.FC<Props> = ({ isOpen, onClose, history, memorySystem, currentTime }) => {
    const [activeTab, setActiveTab] = useState<TabType>('context');

    if (!isOpen) return null;

    const fallbackImmediateData = history
        .filter(msg => msg.role === 'assistant' && msg.structuredResponse?.shortTerm)
        .map((msg, i) => ({
            content: msg.structuredResponse?.shortTerm || "",
            timestamp: msg.timestamp,
            rawDate: msg.gameTime || currentTime || "Thời gian không xác định",
            id: i
        }))
        .reverse();

    const immediateData = (memorySystem?.instantMemory || []).map((m, i) => {
        const parsed = parseRealTimeMemory(m);
        return { content: parsed.main, syncedShort: parsed.syncedShort, id: i };
    }).reverse();

    const contextData = immediateData.length > 0 ? immediateData : fallbackImmediateData;
    const shortData = (memorySystem?.shortTermMemory || []).map((m, i) => ({ content: m, id: i })).reverse();
    const mediumData = (memorySystem?.midTermMemory || []).map((m, i) => ({ content: m, id: i })).reverse();
    const longData = (memorySystem?.longTermMemory || []).map((m, i) => ({ content: m, id: i })).reverse();

    const getTabContent = () => {
        switch (activeTab) {
            case 'context': return contextData;
            case 'short': return shortData;
            case 'medium': return mediumData;
            case 'long': return longData;
            default: return [];
        }
    };

    const currentData = getTabContent();

    const tabAccentClass: Record<TabType, string> = {
        context: 'bg-wuxia-gold/50 group-hover:bg-wuxia-gold',
        short: 'bg-wuxia-gold/40 group-hover:bg-wuxia-gold/70',
        medium: 'bg-purple-500/40 group-hover:bg-purple-400/70',
        long: 'bg-blue-500/30 group-hover:bg-blue-400/60',
    };

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 md:p-8 animate-fadeIn font-sans">
            <div className="glass-panel border border-white/10 w-full max-w-5xl h-[90vh] flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.95)] relative overflow-hidden rounded-[2.5rem]">
                {/* Wuxia Decorative Corners */}
                <div className="wuxia-corner wuxia-corner-tl"></div>
                <div className="wuxia-corner wuxia-corner-tr"></div>
                <div className="wuxia-corner wuxia-corner-bl"></div>
                <div className="wuxia-corner wuxia-corner-br"></div>
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-wuxia-gold/60 to-transparent pointer-events-none z-10" />

                {/* Header */}
                <div className="h-14 shrink-0 border-b border-white/10 bg-white/5 flex items-center justify-between px-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border border-wuxia-gold/40 bg-gradient-to-br from-wuxia-gold/15 to-transparent flex items-center justify-center text-wuxia-gold font-serif font-bold text-lg md:text-xl shadow-inner shadow-wuxia-gold/10">
                            Ức
                        </div>
                        <div>
                            <div className="text-wuxia-gold font-serif font-bold text-lg md:text-2xl tracking-[0.2em] uppercase">Ký ức cung điện</div>
                            <div className="text-[10px] md:text-[11px] text-gray-500 uppercase tracking-[0.3em] font-mono mt-1 font-bold">HỆ THỐNG LIÊN KẾT THẦN THỨC</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-1.5 bg-ink-black/60 border border-gray-800 px-3 py-1 rounded-full text-[9px] font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-wuxia-gold animate-pulse" />
                            <span className="text-gray-400">{currentData.length} ghi chép</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-ink-black/50 border border-gray-700/50 text-gray-400 hover:text-wuxia-red hover:border-wuxia-red/60 hover:bg-ink-black/80 transition-all group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Tab bar */}
                <div className="border-b border-gray-800/60 bg-ink-black/20 flex px-5 gap-0.5 pt-1">
                    {([
                        { id: 'context', label: 'TỨC THỜI', icon: 'lightning' },
                        { id: 'short', label: 'NGẮN HẠN', icon: 'pin' },
                        { id: 'medium', label: 'TRUNG HẠN', icon: 'book' },
                        { id: 'long', label: 'DÀI HẠN', icon: 'temple' }
                    ] as const).map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            aria-label={tab.label}
                            aria-pressed={activeTab === tab.id}
                            className={`flex items-center gap-2 px-6 py-4 text-xs md:text-sm font-bold transition-all relative border-b-2 uppercase tracking-widest ${
                                activeTab === tab.id
                                    ? 'text-wuxia-gold border-wuxia-gold bg-wuxia-gold/5'
                                    : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-ink-black/30'
                            }`}
                        >
                            <IconGlyph name={tab.icon as any} className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Memory list */}
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-5 py-4 space-y-3">
                    {currentData.length > 0 ? (
                        <>
                            {currentData.map((mem, idx) => (
                                <div
                                    key={`${activeTab}-${(mem as any).id ?? idx}`}
                                    className="group relative bg-white/[0.03] border border-white/5 hover:border-wuxia-gold/20 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:translate-x-1"
                                >
                                    {/* Left accent bar */}
                                    <div className={`absolute top-3 left-0 w-0.5 h-[calc(100%-24px)] rounded-r-full transition-colors duration-200 ${tabAccentClass[activeTab]}`} />

                                    {/* Index + Date row */}
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <span className="text-[9px] text-gray-700 font-mono">#{String(idx + 1).padStart(3, '0')}</span>
                                        {activeTab === 'context' && (mem as any).rawDate && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-wuxia-gold/70 animate-pulse flex-shrink-0" />
                                                <span className="text-[10px] text-gray-500 font-mono bg-ink-black/60 px-2 py-0.5 rounded border border-gray-800/80">
                                                    {(mem as any).rawDate}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Main content */}
                                    <p className="text-gray-200 font-serif leading-relaxed text-base md:text-xl whitespace-pre-wrap pl-4 border-l-2 border-white/5 italic group-hover:border-wuxia-gold/30 transition-colors">
                                        {mem.content}
                                    </p>

                                    {/* Synced short-term section */}
                                    {activeTab === 'context' && (mem as any).syncedShort && (
                                        <div className="mt-3 pt-3 border-t border-wuxia-gold/10">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="text-[9px] text-wuxia-gold/60 font-mono uppercase tracking-widest">Đồng bộ ngắn hạn</span>
                                                <div className="flex-1 h-px bg-gradient-to-r from-wuxia-gold/15 to-transparent" />
                                            </div>
                                            <p className="text-xs text-gray-400/80 italic font-serif leading-relaxed whitespace-pre-wrap bg-wuxia-gold/[0.04] px-3 py-2 rounded-lg border border-wuxia-gold/10">
                                                {(mem as any).syncedShort}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-700 font-serif italic space-y-3">
                            <div className="text-5xl opacity-15 select-none">Vô</div>
                            <div className="text-xs tracking-[0.2em] text-gray-600">Không tìm thấy ghi chép ở độ sâu ký ức này...</div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="h-10 md:h-12 shrink-0 bg-ink-black/80 border-t border-gray-900/80 px-6 md:px-10 flex items-center justify-between text-[10px] md:text-[12px] text-gray-500 font-mono tracking-widest uppercase">
                    <div className="flex items-center gap-4">
                        <span className="opacity-50 font-bold">TỔNG CỘNG:</span>
                        <span className="text-wuxia-gold font-black">{currentData.length} MỤC KÝ ỨC</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full status-accent-dot" />
                        <span className="font-bold status-accent-text">
                            LIÊN KẾT ỔN ĐỊNH
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemoryModal;
