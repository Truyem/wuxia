import React, { useEffect, useMemo, useState } from 'react';
import { MemoryConfig } from '../../../types';
import { estimateTextTokens } from '../../../utils/tokenEstimate';

type ContextSection = {
    id: string;
    title: string;
    category: string;
    order: number;
    content: string;
    tokenEstimate?: number;
};

type ContextSnapshot = {
    sections?: ContextSection[];
    fullText?: string;
    totalTokens?: number;
};

interface Props {
    snapshot: ContextSnapshot;
    memoryConfig?: MemoryConfig;
    onSaveMemory?: (config: MemoryConfig) => void;
}

const ContextViewer: React.FC<Props> = ({ snapshot, memoryConfig, onSaveMemory }) => {
    const [contextPage, setContextPage] = useState<'main' | 'recall'>('main');
    const [mode, setMode] = useState<'all' | 'single'>('all');
    const [selectedId, setSelectedId] = useState('');
    const [keyNpcMemoryN, setKeyNpcMemoryN] = useState(memoryConfig?.keyNpcImportantMemoryLimitN || 20);
    const [saving, setSaving] = useState(false);
    const [Saved, setSaved] = useState(false);

    const isRecallSection = (section: ContextSection): boolean => {
        return section.id.startsWith('recall_');
    };

    const hasRecallSections = useMemo(
        () => snapshot.sections?.some(isRecallSection) || false,
        [snapshot.sections]
    );

    const pageSections = useMemo(() => {
        if (!snapshot.sections) return [];
        if (contextPage === 'recall') {
            return snapshot.sections.filter(isRecallSection);
        }
        return snapshot.sections.filter(section => !isRecallSection(section));
    }, [snapshot.sections, contextPage]);

    useEffect(() => {
        if (contextPage === 'recall' && !hasRecallSections) {
            setContextPage('main');
        }
    }, [contextPage, hasRecallSections]);

    useEffect(() => {
        if (!pageSections.find(s => s.id === selectedId)) {
            setSelectedId(pageSections[0]?.id || '');
        }
    }, [pageSections, selectedId]);

    useEffect(() => {
        setKeyNpcMemoryN(memoryConfig?.keyNpcImportantMemoryLimitN || 20);
    }, [memoryConfig?.keyNpcImportantMemoryLimitN]);

    const selectedSection = useMemo(
        () => pageSections.find(s => s.id === selectedId) || pageSections[0],
        [pageSections, selectedId]
    );

    const pageFullText = useMemo(
        () => pageSections.map(section => section.content).join('\n\n'),
        [pageSections]
    );
    const pageTokens = useMemo(
        () => pageSections.reduce((sum, section) => sum + (section.tokenEstimate || estimateTextTokens(section.content)), 0),
        [pageSections]
    );

    const displayContent = mode === 'all'
        ? pageFullText
        : (selectedSection?.content || '');
    const canSaveContextConfiguration = Boolean(memoryConfig && onSaveMemory);

    const handleSaveMemoryInContext = async () => {
        if (!memoryConfig || !onSaveMemory) return;
        setSaving(true);
        try {
            await Promise.resolve(onSaveMemory({
                ...memoryConfig,
                keyNpcImportantMemoryLimitN: Math.max(1, Number(keyNpcMemoryN) || 20)
            }));
            setSaved(true);
            setTimeout(() => setSaved(false), 1800);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="h-full flex flex-col space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-wuxia-gold font-serif font-bold text-2xl tracking-tighter text-shadow-gold">
                        {contextPage === 'main' ? 'Ngữ cảnh AI cốt truyện chính hiện tại' : 'Ngữ cảnh AI API Bộ nhớ hiện tại'}
                    </h3>
                    <div className="text-[11px] text-paper-white/40 italic">
                        Overview của Thứ tự và Danh mục · Ước tính tổng Token trên trang {pageTokens.toLocaleString()}
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                    <button
                        onClick={() => {
                            setContextPage('main');
                            setMode('all');
                        }}
                        className={`px-3 py-1 text-xs rounded border transition-all ${contextPage === 'main' ? 'border-wuxia-gold bg-wuxia-gold/10 text-wuxia-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' : 'border-paper-white/10 bg-white/5 text-paper-white/50 hover:bg-white/10 hover:border-paper-white/20'
                            }`}
                    >
                        Cốt truyện chính
                    </button>
                    <button
                        onClick={() => {
                            if (!hasRecallSections) return;
                            setContextPage('recall');
                            setMode('all');
                        }}
                        disabled={!hasRecallSections}
                        className={`px-3 py-1 text-xs rounded border transition-all ${contextPage === 'recall'
                                ? 'border-wuxia-gold bg-wuxia-gold/15 text-wuxia-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]'
                                : 'border-paper-white/10 bg-white/5 text-paper-white/50 hover:bg-white/10 hover:border-paper-white/20'
                            } ${!hasRecallSections ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                    >
                        API Recall
                    </button>
                    <button
                        onClick={() => setMode('all')}
                        className={`px-3 py-1 text-xs rounded border transition-all ${mode === 'all' ? 'border-wuxia-gold bg-wuxia-gold/10 text-wuxia-gold' : 'border-paper-white/10 bg-white/5 text-paper-white/50 hover:bg-white/10'
                            }`}
                    >
                        Toàn bộ nội dung
                    </button>
                    <button
                        onClick={() => setMode('single')}
                        className={`px-3 py-1 text-xs rounded border transition-all ${mode === 'single' ? 'border-wuxia-gold bg-wuxia-gold/15 text-wuxia-gold' : 'border-paper-white/10 bg-white/5 text-paper-white/50 hover:bg-white/10'
                            }`}
                    >
                        Xem mục đơn
                    </button>
                </div>
            </div>

            <div className="bg-white/5 border border-wuxia-gold/20 rounded-lg px-4 py-3 flex flex-wrap items-center gap-3 backdrop-blur-sm">
                <span className="text-[11px] text-paper-white/50 font-medium">Chiến lược ngữ cảnh · Số ký ức quan trọng cho nhân vật chính N</span>
                <input
                    type="number"
                    min={1}
                    max={50}
                    value={keyNpcMemoryN}
                    disabled={!canSaveContextConfiguration || saving}
                    onChange={(e) => setKeyNpcMemoryN(parseInt(e.target.value) || 20)}
                    className="bg-white/5 border border-wuxia-gold/30 p-1 text-paper-white font-mono w-20 text-center focus:border-wuxia-gold outline-none text-xs transition-all no-spinner"
                />
                <button
                    onClick={handleSaveMemoryInContext}
                    disabled={!canSaveContextConfiguration || saving}
                    className="px-4 py-1 text-xs rounded border border-wuxia-gold/40 text-wuxia-gold hover:bg-wuxia-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold tracking-wider"
                >
                    {saving ? 'ĐANG LƯU...' : 'LƯU CẤU HÌNH'}
                </button>
                {Saved && <span className="text-[11px] text-wuxia-gold font-bold italic animate-pulse">Đã lưu</span>}
                {!canSaveContextConfiguration && <span className="text-[11px] text-paper-white/30 italic">Phiên hiện tại không thể chỉnh sửa</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
                <div className="bg-white/5 border border-wuxia-gold/20 rounded-lg overflow-hidden flex flex-col min-h-0 backdrop-blur-sm shadow-inner">
                    <div className="px-4 py-2 border-b border-wuxia-gold/20 text-[11px] text-paper-white/50 font-serif italic flex items-center justify-between">
                        <span>Thứ tự ngữ cảnh</span>
                        <span className="font-mono">{pageSections.length} mục</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white/10 text-[10px] text-paper-white/40 uppercase font-bold sticky top-0 z-10 backdrop-blur-md">
                                <tr>
                                    <th className="p-2 w-10 text-center border-b border-wuxia-gold/20">#</th>
                                    <th className="p-2 w-16 border-b border-wuxia-gold/20">Loại</th>
                                    <th className="p-2 border-b border-wuxia-gold/20">Nội dung</th>
                                    <th className="p-2 w-14 text-right border-b border-wuxia-gold/20">Tok</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs font-mono">
                                {pageSections.map((item) => {
                                    const tokens = item.tokenEstimate || estimateTextTokens(item.content);
                                    const isActive = item.id === selectedId;
                                    return (
                                        <tr
                                            key={item.id}
                                            className={`border-b border-wuxia-gold/5 transition-all cursor-pointer ${isActive ? 'bg-wuxia-gold/15' : 'hover:bg-white/5'
                                                }`}
                                            onClick={() => {
                                                setSelectedId(item.id);
                                                setMode('single');
                                            }}
                                        >
                                            <td className={`p-2 text-center ${isActive ? 'text-wuxia-gold/80' : 'text-paper-white/30'}`}>{item.order}</td>
                                            <td className={`p-2 ${isActive ? 'text-wuxia-gold/80' : 'text-paper-white/50'}`}>{item.category}</td>
                                            <td className={`p-2 ${isActive ? 'text-paper-white font-bold' : 'text-paper-white/70'}`}>{item.title}</td>
                                            <td className={`p-2 text-right ${isActive ? 'text-wuxia-gold/80' : 'text-paper-white/40'}`}>{tokens}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white/5 border border-wuxia-gold/20 rounded-lg flex flex-col min-h-0 backdrop-blur-sm shadow-inner">
                    <div className="px-4 py-2 border-b border-wuxia-gold/20 text-[11px] text-paper-white/50 font-serif italic flex items-center justify-between">
                        <span>
                            {mode === 'all' ? 'Toàn bộ nội dung ngữ cảnh' : (selectedSection?.title || 'Nội dung mục đơn')}
                        </span>
                        {mode === 'single' && selectedSection && (
                            <span className="text-wuxia-gold/60 font-mono text-[10px]">{selectedSection.category}</span>
                        )}
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                        <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-paper-white/70">
                            {displayContent || 'Chưa có nội dung'}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContextViewer;
