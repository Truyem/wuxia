
import React from 'react';
import { CharacterData } from '../../../types';

interface Props {
    character: CharacterData;
    onRestart: () => void;
}

const DeathOverlay: React.FC<Props> = ({ character, onRestart }) => {
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn">
            {/* Ink Wash Background */}
            <div className="absolute inset-0 bg-ink-wash opacity-30 pointer-events-none mix-blend-multiply"></div>
            
            {/* Blood Spatter Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-wuxia-red/5 to-wuxia-red/20 pointer-events-none"></div>

            <div className="max-w-md w-full text-center relative z-10 space-y-8">
                {/* Death Icon/Glyph */}
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full border-2 border-wuxia-red/40 flex items-center justify-center animate-pulse">
                        <span className="text-5xl font-serif text-wuxia-red drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">TỬ</span>
                    </div>
                    <div className="absolute -inset-4 border border-wuxia-red/20 rounded-full animate-ping"></div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-4xl font-serif font-black text-paper-white tracking-[0.3em] uppercase drop-shadow-lg">
                        VẪN LẠC
                    </h2>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-wuxia-red to-transparent mx-auto"></div>
                    <p className="text-wuxia-gold/80 font-serif italic text-lg tracking-widest">
                        "{character.name} đã tạ thế, một đời hào kiệt hóa hư không."
                    </p>
                </div>

                <div className="py-6 space-y-2">
                    <p className="text-paper-white/40 text-xs uppercase tracking-[0.4em] font-black">
                        Cái chết là sự khởi đầu mới
                    </p>
                    <p className="text-paper-white/60 text-[10px] italic">
                        Luân hồi chuyển thế, duyên xưa chưa dứt...
                    </p>
                </div>

                <button
                    onClick={onRestart}
                    className="group relative px-10 py-4 bg-transparent overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
                >
                    {/* Button Background */}
                    <div className="absolute inset-0 bg-wuxia-red/10 border border-wuxia-red/30 rounded-xl group-hover:bg-wuxia-red/20 group-hover:border-wuxia-red/50 transition-all duration-500"></div>
                    
                    {/* Glowing Effect */}
                    <div className="absolute inset-0 shadow-[0_0_20px_rgba(220,38,38,0.2)] group-hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-all duration-500 rounded-xl"></div>
                    
                    <span className="relative z-10 text-wuxia-red font-serif font-black tracking-[0.5em] uppercase text-sm group-hover:text-paper-white transition-colors duration-500">
                        NHẬP NIẾT BÀN
                    </span>
                    
                    {/* Decorative Brackets */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-8 border-l-2 border-wuxia-red/60 -ml-1 group-hover:h-full transition-all duration-500"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-8 border-r-2 border-wuxia-red/60 -mr-1 group-hover:h-full transition-all duration-500"></div>
                </button>

                {/* Final Stats/Summary Small Display */}
                <div className="pt-10 grid grid-cols-2 gap-4 px-10 opacity-30">
                    <div className="text-center">
                        <div className="text-[9px] text-paper-white/50 uppercase tracking-widest">Cảnh giới</div>
                        <div className="text-xs text-wuxia-gold font-black">{character.realm}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[9px] text-paper-white/50 uppercase tracking-widest">Tuổi thọ</div>
                        <div className="text-xs text-wuxia-gold font-black">{character.age}</div>
                    </div>
                </div>
            </div>

            {/* Background Texture Ornament */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-ink-wash opacity-10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-ink-wash opacity-10 blur-3xl rounded-full pointer-events-none"></div>
        </div>
    );
};

export default DeathOverlay;
