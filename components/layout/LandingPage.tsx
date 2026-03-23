import React, { useState, useEffect, useCallback } from 'react';
import GameButton from '../ui/GameButton';
import IconGlyph from '../ui/Icon/IconGlyph';

interface Props {
    onStart: () => void;
    onLoad: () => void;
    onSettings: () => void;
    hasSave: boolean;
}

const LandingPage: React.FC<Props> = ({ onStart, onLoad, onSettings, hasSave }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const updateFullscreenState = useCallback(() => {
        setIsFullscreen(!!document.fullscreenElement);
    }, []);

    useEffect(() => {
        document.addEventListener('fullscreenchange', updateFullscreenState);
        const t = setTimeout(() => setMounted(true), 60);
        return () => {
            document.removeEventListener('fullscreenchange', updateFullscreenState);
            clearTimeout(t);
        };
    }, [updateFullscreenState]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen().catch(() => { });
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden z-40">

            {/* ── Deep layered background glows ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Ink wash gradient using theme colors */}
                <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgb(var(--c-ink-gray) / 0.8) 0%, transparent 70%)' }}></div>
                {/* Top themed accent haze */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px]"
                    style={{ background: 'rgb(var(--c-wuxia-gold) / 0.07)' }}></div>
                {/* Secondary cyan accent */}
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[200px] rounded-full blur-[150px]"
                    style={{ background: 'rgb(var(--c-wuxia-cyan) / 0.04)' }}></div>
                {/* Bottom cool fade */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/60 to-transparent"></div>
                {/* Subtle vertical scan lines */}
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 4px)' }}></div>
                {/* Neon border top glow */}
                <div className="absolute top-0 left-0 w-full h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--c-wuxia-gold) / 0.4), rgb(var(--c-wuxia-cyan) / 0.3), transparent)' }}></div>
            </div>

            {/* ── Fullscreen toggle ── */}
            <button
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
                className="absolute top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 border border-wuxia-gold/30 text-wuxia-gold/60 hover:text-wuxia-gold hover:border-wuxia-gold/60 hover:bg-wuxia-gold/5 transition-all duration-200 text-[11px] tracking-[0.2em] font-mono cursor-pointer"
            >
                {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                )}
                {isFullscreen ? 'Thoát' : 'Toàn màn'}
            </button>

            {/* ── Main title area ── */}
            <div className={`relative z-10 flex flex-col items-center mb-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* Top ornament line */}
                <div className="flex items-center gap-3 mb-6 opacity-70">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-wuxia-gold/60"></div>
                    <div className="w-1.5 h-1.5 rotate-45 border border-wuxia-gold/60"></div>
                    <div className="text-[9px] text-wuxia-gold/50 font-mono tracking-[0.4em] uppercase">Giang Hồ · Võ Lâm</div>
                    <div className="w-1.5 h-1.5 rotate-45 border border-wuxia-gold/60"></div>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-wuxia-gold/60"></div>
                </div>

                {/* Main title — gradient follows theme accent colors */}
                <h1 className="text-6xl md:text-8xl font-black font-serif text-transparent bg-clip-text select-none mb-2 text-center leading-tight"
                    style={{ backgroundImage: 'linear-gradient(180deg, rgb(var(--c-paper-white)) 0%, rgb(var(--c-wuxia-gold)) 50%, rgb(var(--c-wuxia-gold-dark)) 100%)' }}>
                    墨色江湖
                </h1>
                <h1 className="text-2xl md:text-4xl font-bold font-serif text-transparent bg-clip-text select-none mb-5 text-center tracking-[0.12em]"
                    style={{ backgroundImage: 'linear-gradient(180deg, rgb(var(--c-paper-white) / 0.85) 0%, rgb(var(--c-wuxia-gold) / 0.8) 100%)' }}>
                    Mặc Sắc Giang Hồ
                </h1>

                {/* Subtitle with decorative separators */}
                <div className="flex items-center gap-4">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-wuxia-red/70"></div>
                    <h2 className="text-sm md:text-base font-serif text-wuxia-red/90 tracking-[0.5em] uppercase font-semibold"
                        style={{ textShadow: '0 0 20px rgb(var(--c-wuxia-red) / 0.4)' }}>
                        Vô Tận Võ Lâm
                    </h2>
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-wuxia-red/70"></div>
                </div>
            </div>

            {/* ── Menu options ── */}
            <div className={`relative z-10 flex flex-col gap-4 w-72 transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {/* Primary action */}
                <GameButton onClick={onStart} variant="primary" skewed={true} className="text-base py-3.5 shadow-lg tracking-[0.15em]">
                    <span className="flex items-center justify-center gap-2">
                        <IconGlyph name="sword" className="h-4 w-4" strokeWidth={1.5} />
                        <span>Bước vào Giang Hồ</span>
                    </span>
                </GameButton>

                {/* Load game */}
                <GameButton
                    onClick={onLoad}
                    variant="secondary"
                    skewed={true}
                    className={`text-base py-3.5 shadow-lg tracking-[0.1em] ${!hasSave ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
                    disabled={!hasSave}
                >
                    <span className="flex items-center justify-center gap-2">
                        <IconGlyph name="load" className="h-4 w-4 opacity-80" strokeWidth={1.5} />
                        <span>Tiếp tục hành trình</span>
                    </span>
                </GameButton>

                {/* Divider */}
                <div className="ink-divider my-1 opacity-40"></div>

                {/* Settings */}
                <GameButton
                    onClick={onSettings}
                    variant="outline"
                    skewed={true}
                    className="text-[11px] py-2 shadow-md tracking-[0.2em]"
                >
                    <span className="flex items-center justify-center gap-2">
                        <IconGlyph name="settings" className="h-3.5 w-3.5" strokeWidth={1.5} />
                        <span>Cài Đặt Hệ Thống</span>
                    </span>
                </GameButton>
            </div>

            {/* ── Bottom version tag ── */}
            <div className={`absolute bottom-6 flex flex-col items-center gap-1 transition-all duration-700 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-[9px] text-gray-700 font-mono tracking-[0.35em]">VER 1.0.0 BETA</div>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
            </div>

        </div>
    );
};

export default LandingPage;
