import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'glass' | 'ink';
    active?: boolean;
    skewed?: boolean;
}

const GameButton: React.FC<Props> = ({ children, variant = 'primary', active = false, skewed = false, className = '', ...props }) => {
    // Base styles
    const baseStyle = `group relative px-6 py-2.5 font-serif font-bold uppercase transition-all duration-500 transform cursor-pointer outline-none overflow-hidden flex items-center justify-center gap-2 backdrop-blur-lg ${
        skewed ? '-skew-x-[12deg]' : 'rounded-xl'
    }`;

    let variantClasses = "";
    let glowClasses = "";
    let decoColor = "bg-wuxia-gold";

    switch (variant) {
        case 'primary':
            variantClasses = active
                ? "bg-wuxia-gold text-black border border-wuxia-gold shadow-[0_0_25px_rgba(217,184,106,0.5)]"
                : "bg-[rgb(var(--c-ink-black))]/55 text-wuxia-gold border border-wuxia-gold/40 hover:border-wuxia-gold hover:bg-[rgb(var(--c-ink-black))]/75 hover:text-white hover:shadow-[0_0_20px_rgba(217,184,106,0.3)]";
            glowClasses = "bg-wuxia-gold/10";
            break;
        case 'secondary':
            variantClasses = active
                ? "bg-wuxia-gold/30 text-wuxia-gold border border-wuxia-gold shadow-[0_0_20px_rgba(217,184,106,0.4)]"
                : "bg-[rgb(var(--c-ink-black))]/55 text-wuxia-gold/75 border border-wuxia-gold/30 hover:border-wuxia-gold hover:bg-wuxia-gold/10 hover:text-wuxia-gold";
            glowClasses = "bg-wuxia-gold/5";
            decoColor = "bg-wuxia-gold";
            break;
        case 'danger':
            variantClasses = "bg-black/80 text-wuxia-red border border-wuxia-red/40 hover:border-wuxia-red hover:bg-wuxia-red/10 hover:text-white shadow-[0_0_15px_rgba(163,24,24,0.2)]";
            glowClasses = "bg-wuxia-red/10";
            decoColor = "bg-wuxia-red";
            break;
        case 'outline':
            variantClasses = "bg-transparent text-paper-white/60 border border-paper-white/20 hover:border-paper-white/70 hover:text-paper-white hover:bg-white/5";
            glowClasses = "bg-white/5";
            decoColor = "bg-paper-white";
            break;
        case 'glass':
            variantClasses = "bg-white/7 text-paper-white border border-white/12 hover:border-wuxia-gold/50 hover:bg-white/12 shadow-2xl";
            glowClasses = "bg-gradient-to-tr from-white/10 to-transparent";
            break;
        case 'ink':
            variantClasses = "bg-[rgb(var(--c-ink-black))]/82 text-paper-white border border-white/10 hover:border-wuxia-gold/30 hover:bg-[rgb(var(--c-ink-black))]/92 shadow-inner";
            glowClasses = "bg-ink-wash/20";
            break;
    }

    return (
        <button className={`${baseStyle} ${variantClasses} ${className}`} {...props}>
            {/* Liquid Background Pulse */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${glowClasses}`} />
            
            {/* Hover Effects */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />

            {/* Premium Corner Details */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-inherit opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-inherit opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>

            {/* Text Content */}
            <span className={`relative z-10 transition-all duration-500 font-bold tracking-[0.25em] ${skewed ? 'skew-x-[12deg]' : ''} group-hover:text-glow-gold`}>
                {children}
            </span>

            {/* Decorative Pulse Dot */}
            <div className={`absolute top-1 right-1 w-1 h-1 rounded-full ${decoColor} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-[1.5] animate-pulse`} />
        </button>
    );
};

export default GameButton;
