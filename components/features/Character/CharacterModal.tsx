import React, { useMemo } from 'react';
import { CharacterData } from '../../../types';
import { RadarChart, RadarData } from '../../shared/RadarChart';
import { StatBar } from '../../shared/StatBar';
import { PremiumBar, MiniBodyPart } from '../../shared/ProfileComponents';
import IconGlyph from '../../ui/Icon/IconGlyph';

interface Props {
    character: CharacterData;
    onClose: () => void;
}

const STAT_COLORS: Record<string, string> = {
    strength: '#ef4444',
    agility: '#22c55e',
    constitution: '#eab308',
    rootBone: '#3b82f6',
    intelligence: '#a855f7',
    luck: '#f97316',
    tamTinh: '#06b6d4',
};

const STAT_LABELS: Record<string, string> = {
    strength: 'Sức mạnh',
    agility: 'Thân pháp',
    constitution: 'Thể chất',
    rootBone: 'Căn cốt',
    intelligence: 'Ngộ tính',
    luck: 'Phúc duyên',
    tamTinh: 'Tâm tính',
};

const CharacterModal: React.FC<Props> = ({ character, onClose }) => {
    const radarData = useMemo(() => {
        const stats = {
            strength: character.strength,
            agility: character.agility,
            constitution: character.constitution,
            rootBone: character.rootBone,
            intelligence: character.intelligence,
            luck: character.luck,
            tamTinh: character.tamTinh || 5
        };
        return Object.entries(stats).map(([key, val]) => ({
            label: STAT_LABELS[key] || key,
            value: val,
            color: STAT_COLORS[key] || '#e6c86e'
        })) as RadarData[];
    }, [character]);

    const bodyParts = [
        { name: 'Đầu', current: character.headCurrentHp, max: character.headMaxHp, status: character.headStatus },
        { name: 'Ngực', current: character.chestCurrentHp, max: character.chestMaxHp, status: character.chestStatus },
        { name: 'Bụng', current: character.abdomenCurrentHp, max: character.abdomenMaxHp, status: character.abdomenStatus },
        { name: 'T.Tay', current: character.leftArmCurrentHp, max: character.leftArmMaxHp, status: character.leftArmStatus },
        { name: 'P.Tay', current: character.rightArmCurrentHp, max: character.rightArmMaxHp, status: character.rightArmStatus },
        { name: 'T.Chân', current: character.leftLegCurrentHp, max: character.leftLegMaxHp, status: character.leftLegStatus },
        { name: 'P.Chân', current: character.rightLegCurrentHp, max: character.rightLegMaxHp, status: character.rightLegStatus },
    ];

    const equipmentOrder = [
        { key: 'head', label: 'Đầu', icon: 'robe' },
        { key: 'chest', label: 'Thân', icon: 'robe' },
        { key: 'back', label: 'Lưng', icon: 'back' },
        { key: 'waist', label: 'Eo', icon: 'waist' },
        { key: 'legs', label: 'Chân', icon: 'legs' },
        { key: 'feet', label: 'Hài', icon: 'feet' },
        { key: 'mainWeapon', label: 'Chính', icon: 'sword' },
        { key: 'subWeapon', label: 'Phụ', icon: 'dagger' },
    ];

    const getEquipName = (key: string) => {
        const idOrName = (character.equipment as any)[key];
        if (!idOrName || idOrName === 'None') return 'Chưa trang bị';
        const item = character.itemList?.find(i => i.id === idOrName || i.name === idOrName);
        if (!item) return String(idOrName);
        return typeof item.name === 'string' ? item.name : JSON.stringify(item.name);
    };

    return (
        <div className="fixed inset-0 z-[600] hidden md:flex items-center justify-center p-6 md:p-12 overflow-hidden">
            {/* Background Overlay with Mesh Gradient */}
            <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-2xl" onClick={onClose}>
                <div className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none overflow-hidden">
                    <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-wuxia-gold/10 blur-[200px] rounded-full"></div>
                    <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-wuxia-red/10 blur-[200px] rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_70%)] opacity-60"></div>
                </div>
                {/* Ink Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none"></div>
            </div>

            {/* Main Premium Container */}
            <div className="relative w-full max-w-[1240px] h-[85vh] flex flex-col glass-panel shadow-[0_0_150px_rgba(0,0,0,0.95)] border border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-500 rounded-[3rem]">
                {/* Decorative Pattern Layer */}
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] pointer-events-none z-0"></div>

                {/* ── Header ── */}
                <div className="h-24 shrink-0 border-b border-white/5 bg-black/60 flex items-center justify-between px-12 relative z-50">
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-wuxia-gold/40 to-transparent"></div>
                    
                    <div className="flex items-center gap-8">
                        {/* Ancient Seal Icon */}
                        <div className="w-16 h-16 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-wuxia-gold/10 border-2 border-wuxia-gold/40 rotate-45 animate-pulse-slow"></div>
                            <div className="absolute inset-1 border border-wuxia-gold/20 -rotate-12"></div>
                            <span className="relative z-10 text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-wuxia-gold to-wuxia-gold/40 drop-shadow-[0_0_10px_rgba(230,200,110,0.5)]">
                                命
                            </span>
                        </div>
                        
                        <div>
                            <h3 className="text-3xl font-serif font-black tracking-[0.4em] drop-shadow-2xl italic text-transparent bg-clip-text bg-gradient-to-r from-white via-wuxia-gold to-white uppercase">
                                MỆNH BÀN CHIẾU
                            </h3>
                            <div className="flex items-center gap-4 text-[11px] font-mono mt-2 uppercase tracking-[0.3em]">
                                <span className="text-paper-white/40 italic">Hồ Sơ Thiên Mệnh</span>
                                <span className="w-8 h-px bg-gradient-to-r from-wuxia-gold/50 to-transparent"></span>
                                <span className="text-wuxia-gold font-black italic drop-shadow-sm">{character.name}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="group relative w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 hover:border-wuxia-gold hover:bg-wuxia-gold/10 transition-all active:scale-95 overflow-hidden rounded-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-wuxia-gold/0 to-wuxia-gold/5 group-hover:to-wuxia-gold/20 transition-all"></div>
                        <span className="text-2xl text-white/40 group-hover:text-white transition-colors relative z-10 font-light">×</span>
                    </button>
                </div>

                {/* ── Scrollable Content Area: 3-Column Grid ── */}
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar relative z-10 px-12 py-10 bg-gradient-to-b from-transparent via-black/10 to-transparent">
                    <div className="grid grid-cols-12 gap-10 min-h-full">
                        
{/* COLUMN 1: IDENTITY (3/12) */}
                        <div className="col-span-3 space-y-10 animate-in slide-in-from-left-8 duration-700 delay-100">
                            {/* Hero Section */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-b from-wuxia-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10 rounded-full"></div>
                                <div className="flex flex-col items-center">
                                    {/* Premium Avatar Frame */}
                                    <div className="relative w-48 h-48 mb-8">
                                        <div className="absolute inset-0 border-2 border-dashed border-wuxia-gold/20 rounded-full animate-spin-slow"></div>
                                        <div className="absolute inset-2 border border-wuxia-gold/40 rounded-full p-2">
                                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-wuxia-gold bg-black/40">
                                                {character.avatar ? (
                                                    <img src={character.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt={character.name} />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-4xl font-serif font-black text-wuxia-gold opacity-30">{character.name.charAt(0)}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name & Title */}
                                    <div className="text-center space-y-2">
                                        <h2 className="text-3xl font-serif font-black text-paper-white tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{character.name}</h2>
                                        <p className="text-xs text-wuxia-gold/80 font-serif italic tracking-[0.2em] font-black uppercase">{character.title || 'Giang Hồ Tản Nhân'}</p>
                                        <p className="text-[10px] text-paper-white/50 font-mono tracking-widest">
                                            {character.realm} · {character.meridianStatus || 'Bình thường'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Essential Vitals */}
                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <h4 className="text-[10px] text-paper-white/30 uppercase tracking-[0.4em] font-black mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-wuxia-red shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                                    Sinh Mệnh Khí Tượng
                                </h4>
                                <PremiumBar label="Tinh lực" current={character.currentEnergy} max={character.maxEnergy} colorClass="bg-white/40" gradient="linear-gradient(90deg, #374151 0%, #9ca3af 100%)" icon={{name: 'bolt'}} />
                                <PremiumBar label="No bụng" current={character.currentFullness} max={character.maxFullness} colorClass="bg-white/40" gradient="linear-gradient(90deg, #92400e 0%, #f59e0b 100%)" icon={{name: 'food'}} />
                                <PremiumBar label="Khát nước" current={character.currentThirst} max={character.maxThirst} colorClass="bg-white/40" gradient="linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)" icon={{name: 'drop'}} />
                                <PremiumBar label="Kinh nghiệm" current={character.currentExp} max={character.levelUpExp} colorClass="bg-white/40" gradient="linear-gradient(90deg, #4d1d95 0%, #a855f7 100%)" icon={{name: 'sparkle'}} />
                            </div>
                        </div>

                        {/* COLUMN 2: ATTRIBUTES & HEALTH (4/12) */}
                        <div className="col-span-4 space-y-10 animate-in fade-in duration-1000 delay-300">
                            {/* Radar Chart Section */}
                            <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 relative group hover:border-wuxia-gold/20 transition-all duration-700 overflow-visible">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-wuxia-gold/5 blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                <h4 className="text-[10px] text-wuxia-gold/60 uppercase tracking-[0.4em] font-black mb-8 flex items-center justify-center gap-3">
                                    <IconGlyph name="sparkle" className="h-3 w-3 opacity-40" /> Thất Cơ Tuyệt Học
                                </h4>
                                <div className="flex justify-center relative z-10 transition-transform duration-700">
                                    <RadarChart data={radarData} size={220} maxValue={30} />
                                </div>
                            </div>

                            {/* Meridian/Body Status */}
                            <div className="bg-black/20 border border-white/5 rounded-[2rem] p-8 group hover:border-wuxia-red/20 transition-all duration-700">
                                <h4 className="text-[10px] text-wuxia-red/60 uppercase tracking-[0.4em] font-black mb-8 flex items-center gap-3">
                                    <IconGlyph name="bolt" className="h-3 w-3 opacity-40" /> Kinh Mạch Trạng Thái
                                </h4>
                                <div className="space-y-4 grid grid-cols-1 gap-x-8">
                                    {bodyParts.map(part => (
                                        <MiniBodyPart key={part.name} name={part.name} current={part.current} max={part.max} status={part.status} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* COLUMN 3: DETAILS & POSSESSIONS (5/12) */}
                        <div className="col-span-5 space-y-10 animate-in slide-in-from-right-8 duration-700 delay-500">
                            {/* Descriptive Grid */}
                            <div className="grid grid-cols-1 gap-6">
                                <div className="p-8 bg-black/40 border border-white/5 rounded-[2rem] relative overflow-hidden group h-32">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-wuxia-gold/40 to-transparent"></div>
                                    <h5 className="text-[10px] text-wuxia-gold uppercase tracking-[0.3em] font-black mb-3"># Ngoại hình</h5>
                                    <p className="text-[11px] leading-relaxed text-paper-white/60 font-serif italic line-clamp-3 group-hover:text-paper-white/90 transition-colors">
                                        {character.appearance || "Chưa rõ dung mạo, tựa như sương mù vây quanh."}
                                    </p>
                                </div>
                                <div className="p-8 bg-black/40 border border-white/5 rounded-[2rem] relative overflow-hidden group h-32">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-wuxia-gold/40 to-transparent"></div>
                                    <h5 className="text-[10px] text-wuxia-gold uppercase tracking-[0.3em] font-black mb-3"># Tính cách</h5>
                                    <p className="text-[11px] leading-relaxed text-paper-white/60 font-serif italic line-clamp-3 group-hover:text-paper-white/90 transition-colors">
                                        {character.personality || "Đạo tâm chưa định, tâm tính khó dò."}
                                    </p>
                                </div>
                            </div>

                            {/* Wealth Redesign with Gradients */}
                            <div className="p-8 bg-gradient-to-br from-wuxia-gold/5 to-transparent border border-wuxia-gold/20 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group/wealth">
                                <h4 className="text-[10px] text-wuxia-gold uppercase tracking-[0.4em] mb-8 font-black flex items-center gap-3">
                                    <IconGlyph name="sparkle" className="h-3 w-3 opacity-40" /> Thố Kho Tàng Kim
                                </h4>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="flex flex-col items-center gap-3 group/coin">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center border border-wuxia-gold/40 bg-black/40 shadow-[0_0_15px_rgba(230,200,110,0.2)] group-hover/coin:scale-110 group-hover/coin:border-wuxia-gold transition-all">
                                            <IconGlyph name="grid" className="h-5 w-5 text-wuxia-gold" />
                                        </div>
                                        <span className="text-[9px] text-wuxia-gold/60 font-black uppercase tracking-widest">Vàng</span>
                                        <span className="text-xl font-mono text-paper-white font-black">{character.money?.gold || 0}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 group/coin">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-400/40 bg-black/40 shadow-[0_0_15px_rgba(156,163,175,0.2)] group-hover/coin:scale-110 group-hover/coin:border-gray-300 transition-all">
                                            <IconGlyph name="grid" className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <span className="text-[9px] text-gray-400/60 font-black uppercase tracking-widest">Bạc</span>
                                        <span className="text-xl font-mono text-paper-white font-black">{character.money?.silver || 0}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 group/coin">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center border border-amber-800/40 bg-black/40 shadow-[0_0_15px_rgba(146,64,14,0.2)] group-hover/coin:scale-110 group-hover/coin:border-amber-700 transition-all">
                                            <IconGlyph name="grid" className="h-5 w-5 text-amber-800" />
                                        </div>
                                        <span className="text-[9px] text-amber-800/60 font-black uppercase tracking-widest">Đồng</span>
                                        <span className="text-xl font-mono text-paper-white font-black">{character.money?.copper || 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Equipment Grid */}
                            <div className="p-8 bg-black/40 border border-white/5 rounded-[2rem] group/equip">
                                <h4 className="text-[10px] text-paper-white/40 uppercase tracking-[0.4em] font-black mb-8 border-b border-white/5 pb-4">Phận Ngoại Trang Bị</h4>
                                <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                                    {equipmentOrder.map(item => {
                                        const name = getEquipName(item.key);
                                        const isEmpty = name === 'Chưa trang bị';
                                        return (
                                            <div key={item.key} className="flex flex-col group/item gap-1">
                                                <div className="flex items-center gap-2 opacity-60">
                                                    <IconGlyph name={item.icon as any} className="h-3 w-3 text-wuxia-gold/80" />
                                                    <span className="text-[9px] text-paper-white/60 uppercase font-black tracking-widest">{item.label}</span>
                                                </div>
                                                <span className={`text-[11px] font-serif tracking-wide truncate ${isEmpty ? 'text-paper-white/20 italic' : 'text-paper-white/80 group-hover/item:text-wuxia-gold transition-colors'}`}>
                                                    {name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <div className="shrink-0 h-16 border-t border-white/5 flex items-center justify-between px-16 bg-black/40 relative z-50">
                    <div className="flex items-center gap-4 opacity-40">
                        <div className="w-2 h-2 rounded-full bg-wuxia-gold/60"></div>
                        <span className="text-[9px] text-wuxia-gold uppercase tracking-[0.8em] font-black italic">Ngọc Giản Truyền Thừa</span>
                    </div>
                    
                    <div className="flex items-center gap-10">
                         {/* Karma & Weight indicators */}
                         <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] text-paper-white/40 uppercase tracking-widest font-black">Nghiệp Lực</span>
                                <span className={`text-sm font-mono font-black ${character.karma >= 0 ? 'text-wuxia-gold' : 'text-wuxia-red'}`}>{character.karma || 0}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] text-paper-white/40 uppercase tracking-widest font-black">Phụ Trọng</span>
                                <span className="text-sm font-mono font-black text-paper-white/80">{character.currentWeight?.toFixed(1) || 0} / {character.maxWeight || 0}</span>
                            </div>
                         </div>
                         <div className="h-8 w-px bg-white/5 mx-2"></div>
                         <div className="flex items-center gap-4 group cursor-help">
                            <span className="text-[9px] text-paper-white/20 uppercase tracking-[0.2em] font-black group-hover:text-wuxia-gold transition-colors">Thiên Mệnh Chi Chủ</span>
                            <div className="w-8 h-8 rounded-full border border-wuxia-gold/20 flex items-center justify-center bg-wuxia-gold/5">
                                <IconGlyph name="user" className="h-4 w-4 text-wuxia-gold/40" />
                            </div>
                         </div>
                    </div>
                </div>
                
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-20">
                    <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-wuxia-gold rounded-tl-[2rem]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-20 rotate-180">
                    <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-wuxia-gold rounded-tl-[2rem]"></div>
                </div>
            </div>
        </div>
    );
};

export default CharacterModal;
