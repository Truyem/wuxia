
import React, { useState, useEffect } from 'react';

interface Props {
    loading: boolean;
    modelName?: string;
    startTime?: number;
    tokens?: {
        input: number;
        output: number;
    };
}

const GenerationStatusBar: React.FC<Props> = ({ loading, modelName = 'AI Master', startTime, tokens }) => {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if (!loading || !startTime) {
            setElapsed(0);
            return;
        }

        const interval = setInterval(() => {
            setElapsed((Date.now() - startTime) / 1000);
        }, 100);

        return () => clearInterval(interval);
    }, [loading, startTime]);

    if (!loading) return null;

    return (
        <div className="w-full max-w-4xl mx-auto mb-8 animate-fadeIn px-4">
            <div className="relative overflow-hidden rounded-2xl border border-wuxia-gold/20 bg-black/40 backdrop-blur-2xl shadow-2xl glass-panel group">
                {/* Background Ink Wash Texture */}
                <div className="absolute inset-0 bg-ink-wash opacity-10 mix-blend-overlay pointer-events-none"></div>

                {/* Top Glowing Edge */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-wuxia-gold/50 to-transparent shadow-[0_0_15px_rgba(230,200,110,0.3)]"></div>

                <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-4">
                        {/* Animated Visual Indicator */}
                        <div className="relative scale-110">
                            <div className="w-4 h-4 rounded-full border-2 border-wuxia-gold/30 animate-[spin_3s_linear_infinite]" />
                            <div className="absolute inset-0 w-4 h-4 rounded-full border-t-2 border-wuxia-gold animate-[spin_1s_linear_infinite]" />
                            <div className="absolute inset-1 w-2 h-2 rounded-full bg-wuxia-gold animate-pulse shadow-[0_0_10px_rgba(230,200,110,0.8)]" />
                        </div>
                        
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] uppercase tracking-[0.3em] text-wuxia-gold font-bold">
                                    Thiên Cơ Đang Vận Chuyển
                                </span>
                                <span className="flex gap-0.5">
                                    <span className="w-1 h-1 rounded-full bg-wuxia-gold animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1 h-1 rounded-full bg-wuxia-gold animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1 h-1 rounded-full bg-wuxia-gold animate-bounce"></span>
                                </span>
                            </div>
                            <span className="text-sm font-serif text-paper-white/90 font-bold tracking-wide mt-0.5">
                                {elapsed > 20 ? 'Sắp hoàn tất...' : elapsed > 10 ? 'Bút mực đang múa...' : 'Đang cảm thụ linh khí...'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 bg-black/40 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm self-stretch sm:self-auto justify-around">
                        {/* Model Info */}
                        <div className="flex flex-col items-center sm:items-end min-w-[80px]">
                            <span className="text-[8px] uppercase tracking-widest text-paper-white/40 font-bold mb-0.5">Thần Khí</span>
                            <span className="text-[11px] text-wuxia-gold/80 font-serif italic font-bold">{modelName}</span>
                        </div>

                        {/* Tokens */}
                        {tokens && (
                            <div className="flex flex-col items-center sm:items-end border-l border-white/10 pl-8 min-w-[80px]">
                                <span className="text-[8px] uppercase tracking-widest text-paper-white/40 font-bold mb-0.5">Linh Thạch</span>
                                <span className="text-[11px] text-wuxia-gold font-mono font-bold tracking-tighter">
                                    {tokens.input} <span className="text-paper-white/20 mx-0.5">|</span> {tokens.output}
                                </span>
                            </div>
                        )}

                        {/* Timer */}
                        <div className="flex flex-col items-center sm:items-end border-l border-white/10 pl-8 min-w-[80px]">
                            <span className="text-[8px] uppercase tracking-widest text-paper-white/40 font-bold mb-0.5">Thời Gian</span>
                            <span className="text-[11px] text-wuxia-gold font-mono font-black">
                                {elapsed.toFixed(1)}s
                            </span>
                        </div>
                    </div>
                </div>

                {/* Shimmer Removed */}

                {/* Decorative Brackets */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-wuxia-gold/30"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-wuxia-gold/30"></div>
            </div>
        </div>
    );
};

export default GenerationStatusBar;
