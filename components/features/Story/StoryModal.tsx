
import React from 'react';
import { StorySystemStructure } from '../../../models/story';

interface Props {
    open?: boolean;
    story: StorySystemStructure;
    onClose: () => void;
    onSaveChapter?: () => void;
}

const StoryModal: React.FC<Props> = ({ story, onClose, onSaveChapter }) => {
    const [revealNext, setRevealNext] = React.useState(false);
    const [viewMode, setViewMode] = React.useState<'current' | 'archive'>('current');
    const [selectedArchiveIndex, setSelectedArchiveIndex] = React.useState<number | null>(null);
    const pressTimerRef = React.useRef<number | null>(null);

    const storyPlanningList = [
        { tag: 'Kế hoạch ngắn hạn', content: story.shortTermPlanning },
        { tag: 'Kế hoạch trung hạn', content: story.mediumTermPlanning },
        { tag: 'Kế hoạch dài hạn', content: story.longTermPlanning }
    ];
    const pendingEventList = Array.isArray(story.pendingEvents) ? story.pendingEvents : [];

    const handleSelectArchive = (index: number) => {
        setSelectedArchiveIndex(index);
        setViewMode('archive');
    };

    const handleSelectCurrent = () => {
        setViewMode('current');
        setSelectedArchiveIndex(null);
    };

    const displayChapter = viewMode === 'archive' && selectedArchiveIndex !== null
        ? story.historicalArchives[selectedArchiveIndex]
        : story.currentChapter;

    const hasArchives = story.historicalArchives.length > 0;
    const canGoPrev = viewMode === 'current' ? hasArchives : selectedArchiveIndex! > 0;
    const canGoNext = viewMode === 'archive';

    const handlePrev = () => {
        if (viewMode === 'current') {
            if (hasArchives) handleSelectArchive(story.historicalArchives.length - 1);
        } else if (selectedArchiveIndex !== null && selectedArchiveIndex > 0) {
            handleSelectArchive(selectedArchiveIndex - 1);
        }
    };

    const handleNext = () => {
        if (viewMode === 'archive' && selectedArchiveIndex !== null) {
            if (selectedArchiveIndex === story.historicalArchives.length - 1) {
                handleSelectCurrent();
            } else {
                handleSelectArchive(selectedArchiveIndex + 1);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl hidden md:flex items-center justify-center p-4">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-wuxia-gold/10 blur-[160px]"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-wuxia-red/10 blur-[160px]"></div>
            </div>

            {/* Modal Container */}
            <div className="w-full max-w-6xl h-[850px] flex flex-col shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
                
                {/* Global Texture Overlays */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] pointer-events-none z-0"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-wuxia-gold/10 to-transparent opacity-40 pointer-events-none z-0"></div>

                {/* --- Header --- */}
                <div className="h-24 shrink-0 border-b border-white/5 bg-black/60 flex items-center justify-between px-10 relative z-50 backdrop-blur-xl">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-wuxia-gold/40 to-transparent"></div>
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gradient-to-b from-wuxia-red/20 to-transparent border border-wuxia-red/40 flex items-center justify-center text-2xl font-serif font-bold text-wuxia-red shadow-[0_0_20px_rgba(163,24,24,0.3)]">
                            書
                        </div>
                        <div>
                            <h3 className="text-wuxia-gold font-serif font-bold text-2xl tracking-[0.3em] drop-shadow-lg uppercase">GIANG HỒ HỒ SƠ</h3>
                            <div className="flex items-center gap-3 text-[10px] font-mono mt-1.5 opacity-60">
                                <span className="text-gray-400 tracking-widest uppercase">{viewMode === 'current' ? 'Chương hiện tại' : 'Bản thảo cổ'}</span>
                                <span className="w-1 h-1 bg-wuxia-gold/40"></span>
                                <span className="text-wuxia-gold tracking-tight italic">{displayChapter.title}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-ink-black/50 border border-gray-800 text-gray-400 hover:text-wuxia-red hover:border-wuxia-red ml-4 group"
                    >
                        <span>×</span>
                    </button>
                </div>

                {/* --- Main Content --- */}
                <div className="flex-1 flex overflow-hidden relative z-10">

                    {/* Left Sidebar: Table of Contents */}
                    <div className="w-80 bg-black/40 border-r border-white/5 flex flex-col relative z-20 backdrop-blur-xl">
                        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-wuxia-gold/20 to-transparent"></div>
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-wuxia-gold/15 border border-wuxia-gold/30 shadow-inner">
                                    <svg className="w-6 h-6 text-wuxia-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-gray-200 font-serif font-bold text-lg tracking-wide uppercase">MỤC LỤC</h4>
                                    <p className="text-[9px] text-wuxia-gold/50 font-mono tracking-[0.3em] mt-1 uppercase">
                                        {story.historicalArchives.length + 1} Hồi Ức
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-4">
                            {/* Archives (Chronological) */}
                            {story.historicalArchives.map((arc, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSelectArchive(idx)}
                                    className={`w-full flex items-center gap-5 px-6 py-5 mb-1 ${
                                        viewMode === 'archive' && selectedArchiveIndex === idx 
                                        ? 'bg-wuxia-gold/15 border border-wuxia-gold/30 shadow-[inset_0_0_15px_rgba(212,175,55,0.1)]' 
                                        : 'hover:bg-white/5 border border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <div className="w-14 shrink-0">
                                        <span className="text-[14px] font-bold text-wuxia-cyan/80 font-serif tracking-widest uppercase">Hồi {arc.index}</span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] text-gray-300 font-serif italic truncate opacity-80">{arc.summary || arc.title}</p>
                                    </div>
                                    <div className="shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </button>
                            ))}

                            {/* Current Chapter */}
                            <button
                                onClick={handleSelectCurrent}
                                className={`w-full flex items-center gap-5 px-6 py-6 mt-2 ${
                                    viewMode === 'current' 
                                    ? 'bg-wuxia-red/10 border border-wuxia-red/30 shadow-[inset_0_0_20px_rgba(163,24,24,0.1)]' 
                                    : 'hover:bg-white/5 border border-transparent opacity-80'
                                }`}
                            >
                                <div className="w-14 shrink-0">
                                    <span className="text-[14px] font-bold text-wuxia-red font-serif tracking-widest uppercase">Hồi {story.currentChapter.index}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[11px] text-gray-100 font-serif italic truncate drop-shadow-sm">{story.currentChapter.summary || story.currentChapter.title}</p>
                                </div>
                                <div className="shrink-0 flex items-center gap-3">
                                    <div className="px-2 py-0.5 bg-wuxia-red/20 text-wuxia-red text-[8px] font-black tracking-[0.2em] border border-wuxia-red/40">ĐANG VIẾT</div>
                                    <svg className={`w-4 h-4 ${viewMode === 'current' ? 'text-wuxia-red' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Content: The Scroll */}
                    <div className="flex-1 overflow-hidden relative flex flex-col bg-black/60 backdrop-blur-sm">
                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                        
                        {/* Horizontal Navigation Bar */}
                        <div className="h-16 shrink-0 border-b border-white/5 bg-black/40 backdrop-blur-2xl flex items-center justify-between px-10 relative z-50">
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-wuxia-cyan/20 to-transparent"></div>
                            <div className="flex items-center">
                                {canGoPrev ? (
                                    <button
                                        onClick={handlePrev}
                                        className="flex items-center gap-3 text-gray-500 hover:text-white group"
                                    >
                                        <span className="text-xl">‹</span>
                                        <span className="text-xs font-serif tracking-[0.1em] lowercase first-letter:uppercase">
                                            Chương {viewMode === 'current' ? story.historicalArchives[story.historicalArchives.length - 1].index : (selectedArchiveIndex! > 0 ? story.historicalArchives[selectedArchiveIndex! - 1].index : '...')}
                                        </span>
                                    </button>
                                ) : (
                                    <div className="w-24" /> 
                                )}
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="text-xs font-bold text-wuxia-cyan tracking-[0.3em] font-serif uppercase">
                                    CHƯƠNG {displayChapter.index}
                                </span>
                                <div className="flex items-center gap-4 text-gray-500 border-l border-gray-800/50 pl-6 ml-2">
                                    <button 
                                        onClick={onSaveChapter}
                                        className="hover:text-wuxia-gold transition-colors"
                                        title="Lưu chương (Tự động tóm tắt)"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                </div>
                                {canGoNext && (
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-3 text-gray-500 hover:text-white group ml-4"
                                    >
                                        <span className="text-xs font-serif tracking-[0.1em] lowercase first-letter:uppercase">
                                            Kế tiếp
                                        </span>
                                        <span className="text-xl">›</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative story-content-area">
                            <div className="relative z-10 max-w-4xl mx-auto space-y-10 pb-16">

                            {/* Section 1: Introduction */}
                            <div className="relative py-12 border-b border-wuxia-gold/10">
                                <div className="flex flex-col items-center gap-3 mb-10">
                                    <div className="h-px w-12 bg-wuxia-gold/30"></div>
                                    <span className="text-xs text-wuxia-gold/60 tracking-[0.5em] uppercase font-bold text-center">Chương {displayChapter.index}</span>
                                    <div className="h-px w-12 bg-wuxia-gold/30"></div>
                                </div>
                                <h2 className="text-5xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-b from-wuxia-gold to-wuxia-gold-dark mb-12 tracking-[0.2em] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] leading-tight text-center">
                                    {displayChapter.title}
                                </h2>

                                {/* Narrative Paragraph with 80% Transparent Gradient Styling */}
                                <div className="relative p-1 bg-gradient-to-br from-wuxia-gold/20 via-white/5 to-transparent shadow-2xl overflow-hidden group">
                                    <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl z-0"></div>
                                    <div className="relative z-10 p-10 md:p-14 border border-wuxia-gold/10">
                                        {/* Decorative Corner */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-wuxia-gold/5 blur-3xl pointer-events-none"></div>
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-wuxia-red/5 blur-3xl pointer-events-none"></div>

                                        <div className="text-lg md:text-xl leading-[2.2] font-serif text-gray-200 text-justify whitespace-pre-wrap first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-6 first-letter:mt-2 first-letter:text-wuxia-gold first-letter:drop-shadow-glow-gold">
                                            {displayChapter.backgroundStory?.trim() || 'Hồi ức này vẫn chưa được ghi chép lại...'}
                                        </div>

                                        {displayChapter.summary && (
                                            <div className="mt-10 pt-8 border-t border-wuxia-gold/10 flex flex-col items-center">
                                                <div className="text-[10px] text-wuxia-gold/40 tracking-[0.4em] uppercase mb-4 font-bold">Hồi ức tóm lược</div>
                                                <p className="max-w-2xl text-base text-gray-400 italic leading-relaxed font-serif text-center">
                                                    "{displayChapter.summary}"
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {viewMode === 'current' ? (
                                <>
                                    {/* Section 2: Conflict & Clues (Two Columns) - Only for current if not empty */}
                                    {(story.currentChapter.mainConflict || story.currentChapter.foreshadowingList.length > 0) && (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            {story.currentChapter.mainConflict && (
                                    <div className="bg-[#140a0a]/40 border border-wuxia-red/20 p-8 relative overflow-hidden group shadow-2xl">
                                                    <div className="flex items-center gap-2 mb-6">
                                                        <div className="w-2 h-2 bg-wuxia-red"></div>
                                                        <h4 className="text-wuxia-red font-bold text-xs uppercase tracking-[0.3em] font-serif">
                                                            Xung đột đương tiền
                                                        </h4>
                                                    </div>
                                                    <p className="text-gray-300 text-base leading-8 font-serif italic">
                                                        {story.currentChapter.mainConflict}
                                                    </p>
                                                </div>
                                            )}

                                            {story.currentChapter.foreshadowingList.length > 0 && (
                                                <div className="bg-[#0a1214]/40 border border-wuxia-cyan/20 p-8 relative overflow-hidden group shadow-2xl">
                                                    <div className="flex items-center gap-2 mb-6">
                                                        <div className="w-2 h-2 bg-wuxia-cyan"></div>
                                                        <h4 className="text-wuxia-cyan font-bold text-xs uppercase tracking-[0.3em] font-serif">
                                                            Phục bút ẩn tàng
                                                        </h4>
                                                    </div>
                                                    <ul className="space-y-4">
                                                        {story.currentChapter.foreshadowingList.map((hint, i) => (
                                                            <li key={i} className="text-[15px] text-gray-400 flex items-start gap-3 italic group">
                                                                <span className="text-wuxia-cyan/40 mt-1 font-serif text-lg">◇</span>
                                                                <span className="leading-relaxed">{hint}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Section 3: Objectives - Only if not empty */}
                                    {story.currentChapter.endConditions.length > 0 && (
                                        <div className="bg-[#12120a]/40 border border-wuxia-gold/20 relative p-1 shadow-2xl">
                                            <div className="bg-gradient-to-b from-ink-black/90 to-black p-10">
                                                <h4 className="text-wuxia-gold font-bold text-sm uppercase tracking-[0.5em] mb-10 flex items-center justify-center gap-6 font-serif">
                                                    <span className="w-16 h-px bg-gradient-to-r from-transparent to-wuxia-gold opacity-50"></span>
                                                    Nhiệm vụ chương hồi
                                                    <span className="w-16 h-px bg-gradient-to-l from-transparent to-wuxia-gold opacity-50"></span>
                                                </h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {story.currentChapter.endConditions.map((cond, i) => {
                                                        let isMet = false;
                                                        if (cond.correspondingVariableKey && story.storyVariables) {
                                                            const currentVal = story.storyVariables[cond.correspondingVariableKey];
                                                            if (currentVal === cond.targetValue) isMet = true;
                                                        }

                                                        return (
                                                            <div key={i} className={`flex items-start gap-4 p-5 border ${isMet
                                                                ? 'bg-wuxia-gold/10 border-wuxia-gold/40 shadow-[0_0_20px_rgba(230,200,110,0.1)]'
                                                                : 'bg-white/5 border-gray-800'
                                                                }`}>
                                                                <div className={`mt-0.5 w-6 h-6 flex items-center justify-center border shrink-0 ${isMet
                                                                    ? 'border-wuxia-gold bg-wuxia-gold text-black shadow-glow-gold'
                                                                    : 'border-gray-700 text-transparent'
                                                                    }`}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                                    </svg>
                                                                </div>

                                                                <div className="flex-1">
                                                                    <div className={`text-base font-serif ${isMet ? 'text-wuxia-gold/70 line-through' : 'text-gray-200'}`}>
                                                                        {cond.description}
                                                                    </div>
                                                                    <div className="flex items-center gap-2 mt-2">
                                                                        <span className="text-[10px] uppercase font-mono tracking-tighter bg-gray-900 px-2 py-0.5 text-gray-500 border border-gray-800">
                                                                            {cond.type}
                                                                        </span>
                                                                        {isMet && <span className="text-[10px] text-wuxia-gold font-bold">● Đã hoàn thành</span>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Section 4: Planning & Events */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-[#0f141a]/40 border border-gray-800/40 p-8 group shadow-xl">
                                            <div className="flex items-center gap-2 mb-6">
                                                <div className="w-1.5 h-1.5 bg-wuxia-gold/60"></div>
                                                <h4 className="text-wuxia-gold font-bold text-xs uppercase tracking-[0.3em] font-serif">
                                                    Quy hoạch cốt truyện
                                                </h4>
                                            </div>
                                            <div className="space-y-4">
                                                {storyPlanningList.map((plan) => (
                                                    <div key={plan.tag} className="bg-white/5 border border-gray-800/40 p-5 hover:bg-white/10">
                                                        <div className="text-[10px] text-gray-500 tracking-[0.2em] mb-2 font-bold font-serif uppercase">{plan.tag}</div>
                                                        <div className="text-[15px] text-gray-400 leading-relaxed font-serif italic">
                                                            {plan.content?.trim() ? plan.content : 'Vô tự thiên thư'}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-[#0f141a]/40 border border-gray-800/40 p-8 group shadow-xl">
                                            <div className="flex items-center gap-2 mb-6">
                                                <div className="w-1.5 h-1.5 bg-wuxia-cyan/60"></div>
                                                <h4 className="text-wuxia-cyan font-bold text-xs uppercase tracking-[0.3em] font-serif">
                                                    Sự kiện tiềm tàng
                                                </h4>
                                            </div>
                                            {pendingEventList.length > 0 ? (
                                                <div className="space-y-4">
                                                    {pendingEventList.map((event, idx) => (
                                                        <div key={`${event.name}-${idx}`} className="bg-white/5 border border-gray-800/40 p-5 hover:bg-wuxia-cyan/5 group">
                                                            <div className="text-lg font-serif font-bold text-gray-200 group-hover:text-wuxia-cyan">{event.name || `Sự kiện ${idx + 1}`}</div>
                                                            <div className="text-sm text-gray-500 leading-relaxed mt-3 font-serif italic">{event.description || 'Chưa có thông tin'}</div>
                                                            <div className="flex flex-col gap-2 mt-5 pt-5 border-t border-gray-800/50">
                                                                <span className="text-[11px] text-gray-600 font-serif">
                                                                    <strong className="text-gray-400 mr-2 uppercase tracking-tighter">Kích hoạt:</strong> {event.triggerConditionOrTime}
                                                                </span>
                                                                <span className="text-[11px] text-gray-600 font-serif">
                                                                    <strong className="text-gray-400 mr-2 uppercase tracking-tighter">Giới hạn:</strong> {event.expirationTime}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-sm text-gray-600 italic py-16 text-center border border-dashed border-gray-800 font-serif">
                                                    Hiện tại không có thiên cơ...
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Section 5: Next Chapter Teaser */}
                                    <div className="pt-12 border-t border-gray-800/30">
                                        <h4 className="text-gray-600 font-bold text-[10px] uppercase tracking-[0.5em] mb-8 text-center">Bói toán thiên cơ</h4>
                                        <div
                                            className="relative mx-auto max-w-2xl select-none"
                                            onMouseDown={() => {
                                                if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
                                                pressTimerRef.current = window.setTimeout(() => setRevealNext(true), 450);
                                            }}
                                            onMouseUp={() => {
                                                if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
                                                pressTimerRef.current = null;
                                                setRevealNext(false);
                                            }}
                                            onMouseLeave={() => {
                                                if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
                                                pressTimerRef.current = null;
                                                setRevealNext(false);
                                            }}
                                            onTouchStart={() => {
                                                if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
                                                pressTimerRef.current = window.setTimeout(() => setRevealNext(true), 450);
                                            }}
                                            onTouchEnd={() => {
                                                if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
                                                pressTimerRef.current = null;
                                                setRevealNext(false);
                                            }}
                                            onTouchCancel={() => {
                                                if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
                                                pressTimerRef.current = null;
                                                setRevealNext(false);
                                            }}
                                        >
                                            {!revealNext && (
                                                <div className="absolute inset-0 backdrop-blur-[12px] bg-black/60 z-20 flex flex-col items-center justify-center border border-wuxia-gold/20 shadow-2xl">
                                                    <div className="w-16 h-16 border-2 border-wuxia-gold/20 flex items-center justify-center mb-4">
                                                        <div className="w-10 h-10 border-2 border-wuxia-gold/40 flex items-center justify-center">
                                                            <div className="w-4 h-4 bg-wuxia-gold/60"></div>
                                                        </div>
                                                    </div>
                                                    <div className="text-wuxia-gold font-serif text-sm tracking-[0.5em] mb-2 font-bold">
                                                        THIÊN CƠ BẤT KHẢ LỘ
                                                    </div>
                                                    <div className="text-[10px] text-gray-500 tracking-[0.2em]">Ấn giữ trung tâm để giải mã bát quái</div>
                                                </div>
                                            )}

                                            <div className={`bg-gradient-to-b from-ink-black to-black p-10 border border-gray-800 text-center relative overflow-hidden shadow-inner ${revealNext ? 'scale-105 opacity-100' : 'blur-md opacity-40'
                                                }`}>
                                                <div className="text-2xl text-wuxia-gold font-serif font-bold mb-6 tracking-widest">{story.nextChapterPreview.title}</div>
                                                <p className="text-gray-400 leading-[2] font-serif text-justify px-10 italic">
                                                    {story.nextChapterPreview.outline}
                                                </p>
                                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-wuxia-gold/5 blur-3xl"></div>
                                                <div className="absolute -top-10 -left-10 w-40 h-40 bg-wuxia-red/5 blur-3xl"></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="py-12 border-t border-gray-800/30">
                                    <div className="max-w-xl mx-auto text-center space-y-6">
                                        <h4 className="text-gray-600 font-bold text-[10px] uppercase tracking-[0.5em]">Lời kết chương</h4>
                                        <p className="text-lg text-gray-400 font-serif italic leading-relaxed">
                                            {`"${(displayChapter as any).epilogue || 'Kết thúc một hồi phong vân.'}"`}
                                        </p>
                                        <div className="flex justify-center pt-8">
                                            <button
                                                onClick={handleSelectCurrent}
                                                className="px-8 py-3 bg-white/5 border border-gray-800 text-gray-400 font-serif text-sm hover:bg-wuxia-gold hover:text-black tracking-widest"
                                            >
                                                QUAY LẠI CHƯƠNG HIỆN TẠI
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default StoryModal;

