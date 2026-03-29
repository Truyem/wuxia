
import React from 'react';
import { CharacterData, NpcStructure } from '../../../types';
import IconGlyph from '../../ui/Icon/IconGlyph';

interface Props {
    character: CharacterData;
    teammates: NpcStructure[];
    onClose: () => void;
}

const TeamModal: React.FC<Props> = ({ character, teammates, onClose }) => {
    // Determine active teammates using both possible key formats
    const activeTeammates = teammates.filter(n => 
        (n as any)['Is teammate?'] === true || n.isTeammate === true
    );

    const getSafeVal = (obj: any, keys: string[]) => {
        for (const k of keys) {
            if (obj[k] !== undefined) return obj[k];
        }
        return 0;
    };

    const getName = (npc: any) => npc['Full Name'] || npc.name || "Vô danh";
    const getGender = (npc: any) => npc.Gender || npc.gender || "Nam";
    const getRealm = (npc: any) => npc.Realm || npc.realm || "Sơ nhập giang hồ";
    const getIdentity = (npc: any) => npc.Identity || npc.identity || "Tán tu";

    // Helper for Equipment Item
    const PremiumEquipItem: React.FC<{ label: string; value?: string; highlight?: boolean; icon?: string }> = ({ label, value, highlight, icon }) => (
        <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 group/eq">
            <div className="flex items-center gap-2">
                {icon && <span className="text-[10px] opacity-40 group-hover/eq:opacity-100 transition-opacity flex items-center">{icon}</span>}
                <span className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-pink-400/60' : 'text-paper-white/30'}`}>{label}</span>
            </div>
            <span className={`text-xs font-serif italic ${value && value !== 'None' ? 'text-wuxia-gold' : 'text-paper-white/10'}`}>
                {value || 'Trống'}
            </span>
        </div>
    );

    const StatBox: React.FC<{ label: string; value: number | string; color: string; icon: React.ReactNode }> = ({ label, value, color, icon }) => (
        <div className={`flex-1 bg-black/40 border border-white/5 p-3 rounded-none flex flex-col items-center group/stat hover:border-${color}/30 transition-all duration-500`}>
            <span className={`text-[8px] uppercase tracking-[0.2em] mb-1 font-black text-paper-white/30 group-hover/stat:text-${color}/60 flex items-center gap-1`}>
                {icon} {label}
            </span>
            <span className={`font-mono text-xl font-black ${color.startsWith('text-') ? color : `text-${color}`} tracking-tighter drop-shadow-lg`}>{value}</span>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/95 md:bg-black/85 backdrop-blur-2xl z-[200] flex items-center justify-center p-2 md:p-8">
            {/* Main fellowship scroll container */}
            <div className="w-full max-w-4xl h-[95vh] md:h-[80vh] flex flex-col relative overflow-hidden glass-panel border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-none">
                {/* Wuxia Decorative Corners */}
                <div className="wuxia-corner wuxia-corner-tl"></div>
                <div className="wuxia-corner wuxia-corner-tr"></div>
                <div className="wuxia-corner wuxia-corner-bl"></div>
                <div className="wuxia-corner wuxia-corner-br"></div>
                
                {/* Background Textures */}
                <div className="absolute inset-0 bg-ink-wash opacity-10 mix-blend-overlay pointer-events-none"></div>
                
                {/* --- HEADER --- */}
                <div className="h-20 md:h-24 shrink-0 border-b border-wuxia-gold/10 bg-black/60 flex items-center justify-between px-4 md:px-10 relative z-50">
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex flex-col">
                            <h3 className="text-wuxia-gold font-serif font-black text-xl md:text-3xl tracking-[0.2em] md:tracking-[0.4em] drop-shadow-2xl uppercase">
                                ĐỒNG HÀNH LUÂN
                            </h3>
                            <div className="flex items-center gap-2 md:gap-4 mt-1">
                                <span className="text-[8px] md:text-[10px] text-paper-white/30 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold">Hành trình vạn dặm có nhau</span>
                                <div className="hidden sm:block h-[1px] w-8 md:w-12 bg-wuxia-gold/20 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Player Preview */}
                        <div className="hidden lg:flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-none backdrop-blur-md">
                            <div className="flex flex-col items-end">
                                <span className="text-[8px] text-paper-white/30 uppercase font-black tracking-widest">Đội trưởng</span>
                                <span className="text-sm font-serif font-black text-wuxia-gold">{character.name}</span>
                            </div>
                        </div>

                        <button 
                            onClick={onClose}
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-none bg-wuxia-red/10 border border-wuxia-red/20 text-wuxia-red hover:bg-wuxia-red hover:text-white transition-all duration-500 shadow-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-10 relative z-10">
                    
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-wuxia-gold shadow-[0_0_10px_rgba(230,200,110,1)]"></div>
                        <h4 className="text-[9px] md:text-[11px] text-paper-white/40 font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">Đội ngũ hiện tại ({activeTeammates.length})</h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>

                    {activeTeammates.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
                            {activeTeammates.map(npc => {
                                const hpCur = getSafeVal(npc, ['Current HP', 'currentHp']);
                                const hpMax = getSafeVal(npc, ['Max HP', 'maxHp']) || 1;
                                const spCur = getSafeVal(npc, ['Current energy', 'currentEnergy']);
                                const spMax = getSafeVal(npc, ['Max energy', 'maxEnergy']) || 1;
                                const hpPct = Math.min((hpCur / hpMax) * 100, 100);
                                const spPct = Math.min((spCur / spMax) * 100, 100);
                                
                                const gender = getGender(npc);
                                const name = getName(npc);

                                return (
                                    <div key={npc.id} className="group relative bg-black/40 border border-white/5 rounded-none p-6 md:p-8 hover:border-wuxia-gold/30 hover:bg-black/60 transition-all duration-700 shadow-2xl overflow-hidden">
                                        {/* Liquid Edge Decor */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wuxia-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        
                                        {/* Background character glyph */}
                                        <div className="absolute -right-6 -bottom-6 text-[120px] font-serif font-black text-white/[0.03] select-none pointer-events-none group-hover:text-wuxia-gold/[0.02] transition-colors duration-1000">
                                            {name[0]}
                                        </div>

                                        {/* NPC Top Info Card */}
                                        <div className="flex items-center gap-6 mb-8 relative z-10">
                                            <div className={`w-20 h-20 rounded-none border-2 flex items-center justify-center font-serif font-black text-3xl shadow-2xl transition-all duration-700 group-hover:scale-105 ${gender === 'Female' ? 'border-pink-500/30 bg-pink-500/5 text-pink-400' : 'border-wuxia-cyan/30 bg-wuxia-cyan/5 text-wuxia-cyan'}`}>
                                                {name[0]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h5 className="text-xl md:text-2xl font-black font-serif text-paper-white group-hover:text-wuxia-gold transition-colors tracking-tight truncate">{name}</h5>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[10px] text-paper-white/40 font-bold uppercase tracking-widest">{getIdentity(npc)}</span>
                                                    <span className="w-1 h-1 rounded-none bg-white/20"></span>
                                                    <span className="text-[10px] text-wuxia-cyan font-black uppercase tracking-widest">{getRealm(npc)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Vital Bars */}
                                        <div className="space-y-4 mb-8 relative z-10">
                                            {/* HP Bar */}
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between items-end px-1">
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-wuxia-red/60">Sinh Mệnh</span>
                                                    <span className="text-[9px] font-mono text-paper-white/40">{Math.round(hpCur)} <span className="opacity-30">/</span> {hpMax}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-black/60 rounded-none overflow-hidden border border-white/5">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-wuxia-red/50 to-wuxia-red shadow-[0_0_8px_rgba(239,68,68,0.4)] transition-all duration-1000"
                                                        style={{ width: `${hpPct}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            {/* Energy Bar */}
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between items-end px-1">
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-wuxia-cyan/60">Nội Lực</span>
                                                    <span className="text-[9px] font-mono text-paper-white/40">{Math.round(spCur)} <span className="opacity-30">/</span> {spMax}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-black/60 rounded-none overflow-hidden border border-white/5">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-wuxia-cyan/50 to-wuxia-cyan shadow-[0_0_8px_rgba(68,170,170,0.4)] transition-all duration-1000"
                                                        style={{ width: `${spPct}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Combat Stats Grid */}
                                        <div className="flex gap-4 mb-8 relative z-10">
                                            <StatBox label="Công" value={npc['Công kích'] || 0} color="wuxia-red" icon={<IconGlyph name="sword" className="w-2.5 h-2.5" />} />
                                            <StatBox label="Thủ" value={npc['Phòng ngự'] || 0} color="wuxia-cyan" icon={<IconGlyph name="shield" className="w-2.5 h-2.5" />} />
                                        </div>

                                        {/* Equipment Section */}
                                        <div className="bg-black/60 p-6 rounded-none border border-white/5 relative z-10">
                                            <h6 className="text-[9px] text-paper-white/20 uppercase tracking-[0.4em] mb-4 font-black">Vật phẩm & Trang bị</h6>
                                            <div className="space-y-1">
                                                <PremiumEquipItem label="Chính" value={npc['Current equipment']?.['Vũ khí chính']} icon={<IconGlyph name="dagger" className="w-2.5 h-2.5" />} />
                                                <PremiumEquipItem label="Phụ" value={npc['Current equipment']?.['Vũ khí phụ']} icon={<IconGlyph name="bow" className="w-2.5 h-2.5" />} />
                                                {gender === 'Female' && (
                                                    <PremiumEquipItem label="Y phục" value={npc['Current equipment']?.['Trang phục']} highlight icon={<IconGlyph name="robe" className="w-2.5 h-2.5" />} />
                                                )}
                                                <div className="pt-3 mt-3 border-t border-white/5">
                                                    <div className="text-[8px] text-paper-white/20 uppercase font-black mb-2">Hành trang nhanh</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {npc.Inventory && npc.Inventory.length > 0 ? (
                                                            npc.Inventory.slice(0, 4).map((item, i) => (
                                                                <span key={i} className="text-[9px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-none text-paper-white/60 font-serif italic">
                                                                    {item}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-[9px] text-paper-white/10 italic">Hành trang trống</span>
                                                        )}
                                                        {npc.Inventory && npc.Inventory.length > 4 && (
                                                            <span className="text-[9px] text-wuxia-gold font-black px-2 py-1">+{npc.Inventory.length - 4}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 md:py-40 border-2 border-dashed border-white/5 rounded-none bg-white/[0.01]">
                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-none border border-wuxia-gold/20 flex items-center justify-center text-3xl md:text-4xl grayscale opacity-20 mb-6 md:mb-8 text-wuxia-gold/40">
                                <IconGlyph name="team" className="w-8 h-8 md:w-12 md:h-12" />
                            </div>
                            <h4 className="text-xl md:text-3xl font-serif font-black text-paper-white/10 tracking-[0.2em] md:tracking-[0.6em] uppercase text-center px-4">Độc Hành Giang Hồ</h4>
                            <p className="text-[9px] md:text-[11px] text-paper-white/20 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mt-3 md:mt-4 italic text-center px-6">Huynh đệ bốn bể, chưa gặp tri kỷ</p>
                        </div>
                    )}
                </div>

                {/* --- FOOTER DECO --- */}
                <div className="h-6 shrink-0 bg-black/80 border-t border-wuxia-gold/5 flex items-center justify-center gap-4 md:gap-10 relative z-[100]">
                    <div className="w-1/6 md:w-1/4 h-[1px] bg-gradient-to-r from-transparent via-wuxia-gold/10 to-transparent"></div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-1.5 h-1.5 border border-wuxia-gold/30 rotate-45"></div>
                        <span className="text-[7px] md:text-[8px] text-paper-white/10 uppercase tracking-[0.4em] md:tracking-[0.8em] font-black whitespace-nowrap">Wuxia Fellowship Matrix</span>
                        <div className="w-1.5 h-1.5 border border-wuxia-gold/30 rotate-45"></div>
                    </div>
                    <div className="w-1/6 md:w-1/4 h-[1px] bg-gradient-to-l from-transparent via-wuxia-gold/10 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default TeamModal;


