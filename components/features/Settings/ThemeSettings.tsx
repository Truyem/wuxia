import React from 'react';
import { ThemePreset } from '../../../types';
import { themes } from '../../../data/themes';

interface Props {
    currentTheme: ThemePreset;
    onThemeChange: (theme: ThemePreset) => void;
}

const ThemeSettings: React.FC<Props> = ({ currentTheme, onThemeChange }) => {
    return (
        <div className="h-full flex flex-col pt-2">
            <h3 className="text-wuxia-gold font-serif font-bold text-[20px] mb-6 tracking-widest text-shadow-gold italic">PHONG CÁCH GIAO DIỆN</h3>

            <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-10">
                    {themes.map(theme => {
                        const isActive = currentTheme === theme.id;
                        return (
                            <div
                                key={theme.id}
                                onClick={() => onThemeChange(theme.id)}
                                className={`
                                    relative p-5 cursor-pointer transition-all duration-300 group
                                    rounded-xl bg-white/5 border-2 backdrop-blur-sm
                                    ${isActive
                                        ? 'border-wuxia-gold bg-white/10 shadow-lg shadow-wuxia-gold/10'
                                        : 'border-paper-white/10 hover:border-wuxia-gold/30 hover:bg-white/10'}
                                `}
                                style={isActive ? { boxShadow: '0 0 20px rgb(var(--c-wuxia-gold) / 0.15)' } : undefined}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex flex-col">
                                        <span className={`font-bold font-serif text-[17px] tracking-wide ${isActive ? 'text-wuxia-gold' : 'text-paper-white/70'}`}>
                                            {theme.name}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-[11px] text-paper-white/50 font-serif leading-relaxed mb-4 min-h-[32px] italic">
                                    {theme.description}
                                </p>

                                {/* Color Preview */}
                                <div className="flex gap-2 mb-4">
                                    {theme.colors.map((c, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 aspect-square rounded-md border border-paper-white/10 shadow-inner"
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>

                                <p className="text-[10px] text-paper-white/30 font-serif italic border-t border-paper-white/5 pt-3">
                                    {theme.recommendation}
                                </p>

                                {/* Hover Glow */}
                                {!isActive && (
                                    <div className="absolute inset-0 rounded-xl bg-wuxia-gold/0 group-hover:bg-wuxia-gold/5 transition-colors duration-300" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ThemeSettings;
