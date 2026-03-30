import React from 'react';
import { StorySystemStructure } from '../../../models/story';

interface Props {
    open?: boolean;
    story: StorySystemStructure;
    onClose: () => void;
}

const MobileStory: React.FC<Props> = ({ story, onClose }) => {
    const [revealNext, setRevealNext] = React.useState(false);
    const [viewMode, setViewMode] = React.useState<'current' | 'archive'>('current');
    const [selectedArchiveIndex, setSelectedArchiveIndex] = React.useState<number | null>(null);
    const [showTOC, setShowTOC] = React.useState(false);
    const pressTimerRef = React.useRef<number | null>(null);

    const handleArchiveSelect = (index: number) => {
        setSelectedArchiveIndex(index);
        setViewMode('archive');
        setShowTOC(false);
        // Scroll content to top
        const contentArea = document.querySelector('.story-content-area');
        if (contentArea) contentArea.scrollTop = 0;
    };

    const handleSelectCurrent = () => {
        setViewMode('current');
        setSelectedArchiveIndex(null);
        setShowTOC(false);
        const contentArea = document.querySelector('.story-content-area');
        if (contentArea) contentArea.scrollTop = 0;
    };

    const currentDisplayChapter = viewMode === 'current'
        ? story.currentChapter
        : selectedArchiveIndex !== null ? story.historicalArchives[selectedArchiveIndex] : story.currentChapter;

    const hasArchives = story.historicalArchives.length > 0;
    const canGoPrev = viewMode === 'current' ? hasArchives : (selectedArchiveIndex !== null && selectedArchiveIndex > 0);
    const canGoNext = viewMode === 'archive';

    const prevChapterInfo = viewMode === 'current' 
        ? (hasArchives ? story.historicalArchives[story.historicalArchives.length - 1] : null)
        : (selectedArchiveIndex !== null && selectedArchiveIndex > 0 ? story.historicalArchives[selectedArchiveIndex - 1] : null);

    const handlePrev = () => {
        if (viewMode === 'current') {
            if (hasArchives) handleArchiveSelect(story.historicalArchives.length - 1);
        } else if (selectedArchiveIndex !== null && selectedArchiveIndex > 0) {
            handleArchiveSelect(selectedArchiveIndex - 1);
        }
    };

    const handleNext = () => {
        if (viewMode === 'archive' && selectedArchiveIndex !== null) {
            if (selectedArchiveIndex === story.historicalArchives.length - 1) {
                handleSelectCurrent();
            } else {
                handleArchiveSelect(selectedArchiveIndex + 1);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-[200] flex items-center justify-center p-0 md:hidden overflow-hidden">
            <div className="w-full h-full flex flex-col relative overflow-hidden font-serif"
                style={{ background: 'linear-gradient(180deg, #0a0c10 0%, #050608 100%)' }}>
                
                {/* Header / Nav Bar (MATCH REFERENCE media__1773738095641.png) */}
                <div className="h-14 shrink-0 border-b border-gray-800/20 bg-[#0d1117]/60 backdrop-blur-xl flex items-center justify-between px-6 relative z-50">
                    <div className="flex items-center">
                        {canGoPrev && prevChapterInfo ? (
                            <button
                                onClick={handlePrev}
                                className="flex items-center gap-2 text-gray-400 hover:text-white"
                            >
                                <span className="text-xl">‹</span>
                                <span className="text-[11px] font-serif tracking-[0.1em] lowercase first-letter:uppercase">Chương {prevChapterInfo.index}</span>
                            </button>
                        ) : (
                            <div className="w-10" />
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[11px] font-bold text-wuxia-gold tracking-[0.2em] font-serif uppercase">
                            CHƯƠNG {currentDisplayChapter.index}
                        </span>
                        <div className="flex items-center gap-4 text-gray-500 border-l border-gray-800/50 pl-4 ml-1">
                            <button className="hover:text-wuxia-gold">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                            <button 
                                onClick={() => setShowTOC(true)}
                                className="hover:text-wuxia-gold"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-wuxia-red"
                        >
                            <span className="text-2xl leading-none">×</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar story-content-area scroll-smooth">
                    <div className="p-4 space-y-8">
                        {/* Chapter Hero Section */}
                        <div className="text-center py-6 space-y-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-px w-8 bg-wuxia-gold/30"></div>
                                <span className="text-[10px] text-wuxia-gold/60 tracking-[0.4em] uppercase font-bold">Chương {currentDisplayChapter.index}</span>
                                <div className="h-px w-8 bg-wuxia-gold/30"></div>
                            </div>
                            <h2 className="text-2xl text-white font-bold tracking-wider px-4 leading-snug">
                                {currentDisplayChapter.title}
                            </h2>
                        </div>

                        {/* Chapter Body */}
                        <div className="bg-[#0f141a]/40 border border-gray-800/40 p-6 relative">
                            {currentDisplayChapter.summary && (
                                <div className="mb-8 p-4 bg-wuxia-gold/5 border-l-2 border-wuxia-gold/40">
                                    <p className="text-[13px] text-gray-400 italic leading-relaxed">
                                        {currentDisplayChapter.summary}
                                    </p>
                                </div>
                            )}

                            <div className="text-[15px] text-gray-300 leading-[2] text-justify whitespace-pre-wrap font-serif tracking-wide">
                                {currentDisplayChapter.backgroundStory}
                            </div>

                            {viewMode === 'archive' && (currentDisplayChapter as any).epilogue && (
                                <div className="mt-12 pt-8 border-t border-gray-800/20 text-center">
                                    <div className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold mb-4">Kết thúc chương</div>
                                    <p className="text-sm text-gray-400 italic leading-loose px-4">
                                        "{(currentDisplayChapter as any).epilogue}"
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Metadata Sections (Current Only) */}
                        {viewMode === 'current' && (
                            <div className="space-y-6 pb-12">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="bg-[#140a0a]/40 border border-wuxia-red/20 p-5">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-1.5 h-1.5 bg-wuxia-red"></div>
                                            <span className="text-[11px] text-wuxia-red font-bold tracking-[0.2em] uppercase">Xung đột đương tiền</span>
                                        </div>
                                        <p className="text-sm text-gray-300 leading-relaxed italic">{story.currentChapter.mainConflict}</p>
                                    </div>

                                    <div className="bg-[#0a1214]/40 border border-wuxia-gold/20 p-5">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-1.5 h-1.5 bg-wuxia-gold"></div>
                                            <span className="text-[11px] text-wuxia-gold font-bold tracking-[0.2em] uppercase">Phục bút ẩn tàng</span>
                                        </div>
                                        <ul className="space-y-3">
                                            {story.currentChapter.foreshadowingList.map((hint, i) => (
                                                <li key={i} className="flex gap-3 text-[13px] text-gray-400 leading-relaxed italic group">
                                                    <span className="text-wuxia-gold/40 mt-1">◇</span>
                                                    <span>{hint}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Goals */}
                                <div className="bg-[#12120a]/40 border border-wuxia-gold/20 p-6">
                                    <div className="text-center mb-6">
                                        <span className="text-[11px] text-wuxia-gold font-bold tracking-[0.3em] uppercase">Nhiệm vụ chương hồi</span>
                                    </div>
                                    <div className="space-y-4">
                                        {story.currentChapter.endConditions.map((cond, i) => {
                                            const isMet = cond.correspondingVariableKey && story.storyVariables && 
                                                          story.storyVariables[cond.correspondingVariableKey] === cond.targetValue;
                                            return (
                                                <div key={i} className={`flex items-start gap-4 p-4 border ${isMet ? 'bg-wuxia-gold/5 border-wuxia-gold/30' : 'bg-black/20 border-gray-800'}`}>
                                                    <div className={`mt-0.5 w-5 h-5 flex items-center justify-center border text-[10px] shrink-0 ${isMet ? 'bg-wuxia-gold border-wuxia-gold text-black' : 'border-gray-700 text-gray-700'}`}>
                                                        {isMet ? '✓' : ''}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className={`text-[13px] leading-snug ${isMet ? 'text-wuxia-gold/70 line-through' : 'text-gray-200'}`}>{cond.description}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table of Contents Overlay (MATCH REFERENCE media__1773737555993.png) */}
                {showTOC && (
                    <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-end">
                        <div 
                            className="absolute inset-0" 
                            onClick={() => setShowTOC(false)}
                        ></div>
                            <div className="relative bg-[#0d1117] border-t border-gray-800 h-[85%] flex flex-col overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
                            {/* Drag Indicator */}
                            <div className="w-12 h-1 bg-gray-800 mx-auto my-4 shrink-0"></div>
                            
                            {/* TOC Header */}
                            <div className="px-6 pb-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-wuxia-gold/10">
                                        <svg className="w-5 h-5 text-wuxia-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Mục lục</h3>
                                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                                            {story.historicalArchives.length + 1} chương hồi
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowTOC(false)}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-800/50 text-gray-400"
                                >
                                    <span className="text-xl">×</span>
                                </button>
                            </div>

                            {/* TOC List */}
                            <div className="flex-1 overflow-y-auto px-0 pb-12 custom-scrollbar">
                                {/* Archives (Chronological) */}
                                {story.historicalArchives.map((arc, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleArchiveSelect(idx)}
                                        className={`w-full flex items-center gap-5 px-6 py-4 border-b border-gray-800/30 ${viewMode === 'archive' && selectedArchiveIndex === idx ? 'bg-wuxia-gold/5' : 'hover:bg-white/5'}`}
                                    >
                                        <div className="w-12 shrink-0">
                                            <span className="text-[13px] font-bold text-wuxia-gold/70 font-serif">Ch. {arc.index}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[12px] text-gray-400 font-serif italic truncate">{arc.summary || arc.title}</p>
                                        </div>
                                        <div className="shrink-0 text-gray-700">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </button>
                                ))}

                                {/* Current Chapter */}
                                <button
                                    onClick={handleSelectCurrent}
                                    className={`w-full flex items-center gap-5 px-6 py-5 border-b border-gray-800/50 ${viewMode === 'current' ? 'bg-wuxia-gold/5' : 'hover:bg-white/5'}`}
                                >
                                    <div className="w-12 shrink-0">
                                        <span className="text-[13px] font-bold text-wuxia-gold font-serif">Ch. {story.currentChapter.index}</span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[12px] text-gray-200 font-serif italic truncate">{story.currentChapter.summary || story.currentChapter.title}</p>
                                    </div>
                                    <div className="shrink-0 flex items-center gap-2">
                                        <div className="px-1.5 py-0.5 border border-wuxia-gold/50 text-wuxia-gold text-[8px] font-bold tracking-tighter uppercase">HIỆN TẠI</div>
                                        <svg className="w-3 h-3 text-wuxia-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Next Chapter Teaser Overlay (Only when showTOC is false) */}
                {!showTOC && viewMode === 'current' && (
                    <div className="p-4 bg-[#0d1117]/90 border-t border-gray-800/40 backdrop-blur-md">
                        <div
                            className="relative overflow-hidden border border-gray-800 bg-black/40 px-4 py-3 select-none"
                            onTouchStart={() => {
                                if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
                                pressTimerRef.current = window.setTimeout(() => setRevealNext(true), 450);
                            }}
                            onTouchEnd={() => {
                                if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
                                pressTimerRef.current = null;
                                setRevealNext(false);
                            }}
                        >
                            {!revealNext && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center z-10">
                                    <div className="text-[10px] text-wuxia-gold font-bold tracking-[0.2em]">THIÊN CƠ BẤT KHẢ LỘ</div>
                                    <div className="text-[8px] text-gray-600 uppercase mt-0.5">Giữ để xem tiền đồ</div>
                                </div>
                            )}
                            <div className={`transition-all duration-500 ${revealNext ? 'blur-0 opacity-100' : 'blur-md opacity-30'}`}>
                                <div className="text-xs text-wuxia-gold font-bold mb-1">{story.nextChapterPreview.title}</div>
                                <p className="text-[10px] text-gray-500 italic truncate">{story.nextChapterPreview.outline}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default MobileStory;

