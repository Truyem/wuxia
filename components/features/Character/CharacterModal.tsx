
import React from 'react';
import { CharacterData } from '../../../types';
import LeftPanel from '../../layout/LeftPanel';

interface Props {
    character: CharacterData;
    onClose: () => void;
}

const CharacterModal: React.FC<Props> = ({ character, onClose }) => {
    return (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-3xl hidden md:flex items-center justify-center p-4">
            {/* Background Atmosphere - Simplified and Static */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-wuxia-gold/5 blur-[160px]"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-wuxia-red/5 blur-[160px]"></div>
            </div>

            {/* Premium Container: Square Glassmorphism */}
            <div className="w-full max-w-[500px] h-[90vh] flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden rounded-none glass-panel border border-white/10 group">
                {/* Global Texture Overlays */}
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] pointer-events-none z-0"></div>
                
                {/* ── Header ── */}
                <div className="h-20 shrink-0 border-b border-white/5 bg-black/40 flex items-center justify-between px-8 relative z-50">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-wuxia-gold/20 to-transparent"></div>
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-gradient-to-b from-wuxia-gold/10 to-transparent border border-wuxia-gold/30 flex items-center justify-center text-xl font-serif font-black text-wuxia-gold shadow-[0_0_15px_rgba(230,200,110,0.2)]">
                            命
                        </div>
                        <div>
                            <h3 className="text-wuxia-gold/90 font-serif font-black text-xl tracking-[0.25em] drop-shadow-lg uppercase italic">MỆNH BÀN CHIẾU</h3>
                            <div className="flex items-center gap-2 text-[9px] font-mono mt-1 opacity-40 uppercase tracking-widest">
                                <span>Thiên Mệnh Hồ Sơ</span>
                                <span className="w-1 h-px bg-wuxia-gold/30"></span>
                                <span className="text-wuxia-gold font-bold italic">{character.name}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-wuxia-gold"
                    >
                        <span className="text-xl">×</span>
                    </button>
                </div>

                {/* ── Main Content Area ── */}
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar relative z-10 px-4">
                    <div className="min-h-full py-6">
                        <LeftPanel Role={character} isProfile={true} onUpdateCharacter={() => {}} visualConfig={{} as any} />
                    </div>
                </div>

                {/* ── Footer Branding ── */}
                <div className="shrink-0 h-12 border-t border-white/5 flex items-center justify-center px-10 bg-black/20 relative z-50">
                    <div className="flex items-center gap-6 opacity-30">
                        <div className="w-8 h-px bg-gradient-to-r from-transparent to-wuxia-gold/50"></div>
                        <span className="text-[9px] text-wuxia-gold uppercase tracking-[0.6em] font-black italic">Ngọc Giản Truyền Thừa</span>
                        <div className="w-8 h-px bg-gradient-to-l from-transparent to-wuxia-gold/50"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterModal;
