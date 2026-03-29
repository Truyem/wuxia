import React from 'react';
import IconGlyph from '../ui/Icon/IconGlyph';

// Custom very thin bar for Vitals with premium gradients
export const PremiumBar: React.FC<{ label: string; current: number; max: number; colorClass: string; icon?: any; gradient?: string }> = ({ label, current, max, colorClass, icon, gradient }) => {
    const pct = Math.min((current / (max || 1)) * 100, 100);

    return (
        <div className="mb-4 group relative">
            <div className="flex justify-between items-end mb-1.5 px-1">
                <div className="flex items-center gap-2">
                    {icon && <span className="text-[10px] text-paper-white/40 group-hover:text-wuxia-gold transition-colors">
                        {typeof icon === 'string' ? icon : <IconGlyph name={icon.name} className="h-3.5 w-3.5" />}
                    </span>}
                    <span className="tracking-[0.2em] font-serif text-[10px] text-paper-white/60 font-black uppercase group-hover:text-paper-white transition-colors">{label}</span>
                </div>
                <span className="font-mono text-[9px] text-paper-white/40 font-black">
                    {Math.round(current)}<span className="opacity-20 mx-0.5">/</span>{max}
                </span>
            </div>
            {/* Very thin progress bar with gradient */}
            <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <div
                    className={`h-full ${gradient ? '' : colorClass} transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(255,255,255,0.1)]`}
                    style={{ width: `${pct}%`, background: gradient }}
                ></div>
            </div>
        </div>
    );
};

// Mini Body Part with Liquid Glass look
export const MiniBodyPart: React.FC<{ name: string; current: number; max: number; status?: string }> = ({ name, current, max, status }) => {
    const pct = (current / (max || 1)) * 100;
    const s = status?.trim().toLowerCase();
    const isHealthy = !s || s === 'khỏe mạnh' || s === 'bình thường' || s === 'ổn định' || s === 'tốt' || s === 'khỏe' || s === 'bình thường';
    const isInjured = pct < 99.5 || !isHealthy;
    const isCritical = pct < 30;
    
    return (
        <div className="flex items-center gap-4 w-full group transition-all py-[2px] hover:bg-white/5 px-2 rounded-lg">
            <span className={`font-serif text-[10px] w-14 shrink-0 uppercase tracking-widest font-black ${isCritical ? 'text-wuxia-red animate-pulse' : 'text-paper-white/60'}`}>
                {name}
            </span>
            <div className="flex-1 h-[4px] bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                    className={`h-full transition-all duration-1000 ${isCritical ? 'bg-gradient-to-r from-red-600 to-wuxia-red shadow-[0_0_12px_rgba(239,68,68,0.6)]' : 'bg-gradient-to-r from-wuxia-red/40 to-wuxia-red'}`}
                    style={{ width: `${pct}%` }}
                ></div>
            </div>
            {/* Conditional icon: X for injury, dot for healthy */}
            <div className="w-4 h-4 flex items-center justify-center">
                {isInjured ? (
                    <svg className={`w-3 h-3 ${isCritical ? 'text-wuxia-red bubble-glow' : 'text-wuxia-red/70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-wuxia-gold/40 shadow-[0_0_6px_rgba(230,200,110,0.5)] group-hover:bg-wuxia-gold transition-colors" />
                )}
            </div>
        </div>
    );
};
