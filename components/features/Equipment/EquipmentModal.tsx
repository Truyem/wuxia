import React, { useState, useEffect, useMemo } from 'react';
import { CharacterData } from '../../../types';
import { GameItem, Weapon, Armor, ContainerItem } from '../../../models/item';
import {
    Crown, Shirt, Backpack, Link as LinkIcon, Hand, Layers,
    Footprints, Sword, Crosshair, Wind, X, User, Shield,
    Zap, ChevronLeft, Sparkles, Gem, Heart, Activity,
    Skull, Minus
} from 'lucide-react';

interface Props {
    character: CharacterData;
    onClose: () => void;
}

type Quality = 'Phàm phẩm' | 'Lương phẩm' | 'Thượng phẩm' | 'Cực phẩm' | 'Tuyệt thế' | 'Truyền thuyết';

const QUALITY_STYLES: Record<Quality, {
    text: string; border: string; bg: string; glow: string; badge: string; gradient: string;
}> = {
    'Phàm phẩm': { text: 'text-gray-400', border: 'border-gray-600/40', bg: 'bg-gray-800/30', glow: '', badge: 'bg-gray-700/60', gradient: 'from-gray-700/20' },
    'Lương phẩm': { text: 'text-amber-300', border: 'border-amber-500/50', bg: 'bg-amber-900/20', glow: 'shadow-[0_0_20px_rgba(251,191,36,0.15)]', badge: 'bg-amber-600/60', gradient: 'from-amber-800/30' },
    'Thượng phẩm': { text: 'text-purple-400', border: 'border-purple-500/50', bg: 'bg-purple-900/20', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]', badge: 'bg-purple-600/60', gradient: 'from-purple-800/30' },
    'Cực phẩm': { text: 'text-orange-400', border: 'border-orange-500/50', bg: 'bg-orange-900/20', glow: 'shadow-[0_0_20px_rgba(251,146,60,0.18)]', badge: 'bg-orange-600/60', gradient: 'from-orange-800/30' },
    'Tuyệt thế': { text: 'text-red-400', border: 'border-red-500/60', bg: 'bg-red-900/20', glow: 'shadow-[0_0_25px_rgba(239,68,68,0.2)]', badge: 'bg-red-600/60', gradient: 'from-red-800/30' },
    'Truyền thuyết': { text: 'text-amber-200', border: 'border-amber-400/60', bg: 'bg-amber-700/20', glow: 'shadow-[0_0_30px_rgba(251,191,36,0.22)]', badge: 'bg-amber-500/60', gradient: 'from-amber-700/30' },
};

const QUALITY_EMOJI: Record<Quality, string> = {
    'Phàm phẩm': '◆',
    'Lương phẩm': '◇',
    'Thượng phẩm': '❖',
    'Cực phẩm': '✦',
    'Tuyệt thế': '✧',
    'Truyền thuyết': '★',
};

const WEAPON_SUBTYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    'Kiếm': Sword, 'Đao': Sword, 'Thương': Crosshair,
    'Côn': Layers, 'Ám khí': Crosshair, 'Quyên thủ': Hand,
};

const EquipmentModal: React.FC<Props> = ({ character, onClose }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState<'status' | 'armor' | 'weapons'>('status');
    const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getItem = (idOrName: string): GameItem | null => {
        if (!idOrName || idOrName === 'None') return null;
        return character.itemList.find(i => i.id === idOrName || i.name === idOrName) || null;
    };

    const getQualityStyle = (quality: string) => {
        return (QUALITY_STYLES[quality as Quality] || QUALITY_STYLES['Phàm phẩm']);
    };

    const equippedItems = useMemo(() => {
        const slots = ['head', 'chest', 'back', 'waist', 'hands', 'legs', 'feet', 'mainWeapon', 'subWeapon', 'hiddenWeapon', 'mount'];
        const items: { slot: string; item: GameItem | null }[] = slots.map(s => ({
            slot: s, item: getItem((character.equipment as any)?.[s])
        }));
        return items;
    }, [character.equipment, character.itemList]);

    const totalStats = useMemo(() => {
        let totalMinAtk = 0, totalMaxAtk = 0;
        let totalPhysDef = 0, totalInnerDef = 0;
        const bonusAttrs: { name: string; value: number }[] = [];

        equippedItems.forEach(({ item }) => {
            if (!item) return;
            if (item.type === 'Vũ khí') {
                const w = item as Weapon;
                totalMinAtk += w.minAttack;
                totalMaxAtk += w.maxAttack;
            } else if (item.type === 'Phòng cụ') {
                const a = item as Armor;
                totalPhysDef += a.physicalDefense;
                totalInnerDef += a.innerDefense;
            }
            if (item.attributes) {
                item.attributes.forEach(attr => {
                    bonusAttrs.push({ name: attr.name, value: attr.value });
                });
            }
        });

        return { totalMinAtk, totalMaxAtk, totalPhysDef, totalInnerDef, bonusAttrs };
    }, [equippedItems]);

    const bodyParts = useMemo(() => [
        { key: 'headCurrentHp', label: 'Đầu', icon: Crown },
        { key: 'chestCurrentHp', label: 'Ngực', icon: Heart },
        { key: 'abdomenCurrentHp', label: 'Bụng', icon: Activity },
        { key: 'leftArmCurrentHp', label: 'Tay trái', icon: Hand },
        { key: 'rightArmCurrentHp', label: 'Tay phải', icon: Hand },
        { key: 'leftLegCurrentHp', label: 'Chân trái', icon: Footprints },
        { key: 'rightLegCurrentHp', label: 'Chân phải', icon: Footprints },
    ], []);

    const SlotCard: React.FC<{
        slotKey: string; label: string; Icon: any; accentColor: string;
        subtypeIcon?: React.ComponentType<{ className?: string }>;
    }> = ({ slotKey, label, Icon, accentColor, subtypeIcon: SubIcon }) => {
        const itemRef = (character.equipment as any)?.[slotKey];
        const item = getItem(itemRef);
        const isHovered = hoveredSlot === slotKey;
        const colors = item ? getQualityStyle(item.quality) : null;
        const WeaponIcon = item?.type === 'Vũ khí' ? WEAPON_SUBTYPE_ICONS[(item as Weapon).weaponSubtype] || Icon : Icon;

        return (
            <div
                className={`group relative p-5 min-w-0 flex items-start gap-5 rounded-2xl border transition-all duration-300 cursor-default ${
                    item
                        ? `${colors!.bg} ${colors!.border} ${colors!.glow} border-opacity-60 hover:scale-[1.015] hover:border-opacity-80`
                        : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04]'
                }`}
                onMouseEnter={() => setHoveredSlot(slotKey)}
                onMouseLeave={() => setHoveredSlot(null)}
            >
                {item && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors!.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                )}

                <div className={`relative w-16 h-16 shrink-0 border flex items-center justify-center rounded-xl overflow-hidden ${
                    item
                        ? 'border-white/15 bg-black/30 shadow-inner'
                        : 'border-white/[0.06] bg-black/20'
                }`}>
                    {item?.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <WeaponIcon className={`w-7 h-7 ${accentColor} ${!item ? 'opacity-20' : 'opacity-80'}`} strokeWidth={1.5} />
                    )}
                    {item && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    )}
                </div>

                <div className="relative flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.15em] ${item ? 'text-white/50' : 'text-gray-600'}`}>
                            {label}
                        </span>
                        {item && (
                            <span className={`flex items-center gap-1 text-[8px] px-2 py-0.5 rounded-full ${colors!.text} ${colors!.badge}`}>
                                <span>{QUALITY_EMOJI[item.quality as Quality] || '◆'}</span>
                                <span className="font-semibold">{item.quality}</span>
                            </span>
                        )}
                    </div>

                    {item ? (
                        <>
                            <div className={`text-lg font-serif font-bold truncate ${colors!.text}`}>
                                {item.name}
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {item.type === 'Vũ khí' && (
                                    <span className={`text-[10px] font-mono ${accentColor} bg-black/30 px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1`}>
                                        <Sword className="w-3 h-3" />
                                        <span>{String((item as Weapon).minAttack).padStart(2, '0')}–{String((item as Weapon).maxAttack).padStart(2, '0')}</span>
                                    </span>
                                )}
                                {item.type === 'Phòng cụ' && (
                                    <span className={`text-[10px] font-mono ${accentColor} bg-black/30 px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1`}>
                                        <Shield className="w-3 h-3" />
                                        <span>P{String((item as Armor).physicalDefense).padStart(2, '0')}</span>
                                        <span className="text-white/40">/</span>
                                        <span>N{String((item as Armor).innerDefense).padStart(2, '0')}</span>
                                    </span>
                                )}
                                {item.weight > 0 && (
                                    <span className="text-[9px] text-gray-500 font-mono flex items-center gap-1">
                                        <Gem className="w-2.5 h-2.5" />{item.weight}
                                    </span>
                                )}
                            </div>

                            {item.attributes && item.attributes.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {item.attributes.slice(0, 3).map((attr, i) => (
                                        <span key={i} className="text-[8px] px-1.5 py-0.5 bg-wuxia-gold/10 text-wuxia-gold/80 rounded border border-wuxia-gold/20 font-semibold">
                                            {attr.name} +{attr.value}
                                        </span>
                                    ))}
                                    {item.attributes.length > 3 && (
                                        <span className="text-[8px] text-gray-500 px-1.5 py-0.5">
                                            +{item.attributes.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-1.5 pt-0.5">
                                <Minus className="w-2 h-2 text-gray-600" />
                                <div className="flex-1 h-1 bg-black/50 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${
                                            (item.currentDurability / item.maxDurability) < 0.3 ? 'bg-wuxia-red' :
                                            (item.currentDurability / item.maxDurability) < 0.6 ? 'bg-amber-500/60' : 'bg-wuxia-gold/50'
                                        }`}
                                        style={{ width: `${(item.currentDurability / item.maxDurability) * 100}%` }}
                                    />
                                </div>
                                <span className="text-[7px] text-gray-600 font-mono w-12 text-right">{item.currentDurability}/{item.maxDurability}</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2 py-2">
                            <WeaponIcon className={`w-4 h-4 ${accentColor} opacity-15`} strokeWidth={2} />
                            <span className="text-[10px] text-gray-600 italic">Chưa trang bị</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const StatusView = () => (
        <div className="flex flex-col items-center py-4 space-y-6">
            <div className={`relative ${isMobile ? 'aspect-[1/1.2] max-h-[240px]' : 'aspect-[1/2.8] max-h-[360px]'} flex items-center justify-center`}>
                <div className="absolute w-40 h-72 bg-wuxia-gold/4 blur-[60px]"></div>

                <div className="relative flex flex-col items-center gap-2 z-10">
                    <div className="w-14 h-14 md:w-18 md:h-18 border-2 border-wuxia-gold/40 bg-black/40 flex items-center justify-center shadow-[0_0_30px_rgba(217,184,106,0.2)] relative overflow-hidden rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-tr from-wuxia-gold/20 to-transparent" />
                        <User className="w-7 h-7 md:w-9 md:h-9 text-wuxia-gold/80" strokeWidth={1} />
                    </div>
                    <div className="w-16 h-48 border border-wuxia-gold/20 bg-gradient-to-b from-wuxia-gold/[0.06] to-transparent relative flex flex-col items-center justify-center overflow-hidden rounded-[1.5rem]">
                        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-wuxia-gold/10 to-transparent" />
                        <div className="text-[9px] text-wuxia-gold/40 text-center leading-relaxed font-serif tracking-[0.3em] vertical-text select-none">
                            身法如風
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-5 h-16 border border-wuxia-gold/10 bg-gradient-to-b from-black/40 to-black/20 relative overflow-hidden rounded-lg">
                            <div className="absolute top-0 inset-x-0 h-3 bg-wuxia-gold/6" />
                        </div>
                        <div className="w-5 h-16 border border-wuxia-gold/10 bg-gradient-to-b from-black/40 to-black/20 relative overflow-hidden rounded-lg">
                            <div className="absolute top-0 inset-x-0 h-3 bg-wuxia-gold/6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[180px] space-y-3">
                <div className="flex justify-between items-center mb-1 px-1">
                    <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-wuxia-gold/80" />
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Tải trọng</span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${character.currentWeight > character.maxWeight ? 'text-wuxia-red' : 'text-wuxia-gold'}`}>
                        {character.currentWeight}/{character.maxWeight}
                    </span>
                </div>
                <div className="h-2 bg-black/50 overflow-hidden border border-white/5 p-[1px] relative shadow-inner rounded-full">
                    <div
                        className={`h-full shadow-[0_0_100px_rgba(217,184,106,0.28)] rounded-full transition-all duration-500 ${
                            character.currentWeight > character.maxWeight ? 'bg-wuxia-red' : 'bg-wuxia-gold/60'
                        }`}
                        style={{ width: `${Math.min(((character.currentWeight || 0) / (character.maxWeight || 1)) * 100, 100)}%` }}
                    />
                </div>
            </div>

            <div className="w-full max-w-[180px] space-y-4 px-2">
                <div className="flex items-center gap-2 mb-1">
                    <Heart className="w-3 h-3 text-wuxia-red/70" />
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Thể chất</span>
                </div>
                <div className="space-y-1.5">
                    {bodyParts.map(({ key, label, icon: PartIcon }) => {
                        const hp = character[key as keyof CharacterData] as number;
                        const maxHp = character[(key.replace('Current', 'Max') as keyof CharacterData) as string] as number;
                        const pct = maxHp > 0 ? hp / maxHp : 1;
                        return (
                            <div key={key} className="flex items-center gap-2">
                                <div className="w-8 text-right">
                                    <span className="text-[8px] text-gray-600 font-mono">{label}</span>
                                </div>
                                <div className="flex-1 h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${
                                            pct < 0.3 ? 'bg-wuxia-red' : pct < 0.6 ? 'bg-amber-500/60' : 'bg-emerald-500/50'
                                        }`}
                                        style={{ width: `${Math.max(pct * 100, 4)}%` }}
                                    />
                                </div>
                                <div className="w-8">
                                    <span className="text-[8px] font-mono text-gray-500">{hp}/{maxHp}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const StatsSummary = () => (
        <div className="space-y-3 px-2">
            <div className="flex items-center gap-2 mb-2">
                <Activity className="w-3 h-3 text-wuxia-red/70" />
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Tổng trang bị</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-black/30 border border-white/[0.06] rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                        <Sword className="w-3 h-3 text-wuxia-red/60" />
                        <span className="text-[8px] text-gray-600 uppercase tracking-wider">Tấn công</span>
                    </div>
                    <div className="text-lg font-mono font-bold text-wuxia-red/90">
                        {totalStats.totalMinAtk}–{totalStats.totalMaxAtk}
                    </div>
                </div>
                <div className="bg-black/30 border border-white/[0.06] rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-wuxia-gold/60" />
                        <span className="text-[8px] text-gray-600 uppercase tracking-wider">Phòng thủ</span>
                    </div>
                    <div className="text-lg font-mono font-bold text-wuxia-gold/90">
                        {totalStats.totalPhysDef} / {totalStats.totalInnerDef}
                    </div>
                </div>
            </div>
            {totalStats.bonusAttrs.length > 0 && (
                <div className="bg-black/20 border border-white/[0.05] rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-purple-400/60" />
                        <span className="text-[8px] text-gray-600 uppercase tracking-wider">Thuộc tính</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {totalStats.bonusAttrs.slice(0, 6).map((attr, i) => (
                            <span key={i} className="text-[9px] px-2 py-0.5 bg-purple-900/20 text-purple-300/80 border border-purple-500/20 rounded-lg font-semibold">
                                {attr.name} +{attr.value}
                            </span>
                        ))}
                        {totalStats.bonusAttrs.length > 6 && (
                            <span className="text-[8px] text-gray-500 px-1.5 py-0.5">
                                +{totalStats.bonusAttrs.length - 6} khác
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    const ArmorView = () => (
        <div className="space-y-5">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-wuxia-gold/10 border border-wuxia-gold/20 flex items-center justify-center rounded-lg">
                    <Shield className="w-4 h-4 text-wuxia-gold/70" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-wuxia-gold font-black uppercase tracking-[0.4em]">Phòng cụ</span>
                <div className="flex-1 h-[1px] bg-wuxia-gold/15" />
            </div>
            <div className="space-y-3">
                <SlotCard slotKey="head" label="Đầu" Icon={Crown} accentColor="text-amber-300" />
                <SlotCard slotKey="chest" label="Thân" Icon={Shirt} accentColor="text-amber-300" />
                <SlotCard slotKey="back" label="Lưng" Icon={Backpack} accentColor="text-amber-300" />
                <SlotCard slotKey="waist" label="Eo" Icon={LinkIcon} accentColor="text-amber-300" />
                <SlotCard slotKey="hands" label="Hộ Thủ" Icon={Hand} accentColor="text-amber-300" />
                <SlotCard slotKey="legs" label="Chân" Icon={Layers} accentColor="text-amber-300" />
                <SlotCard slotKey="feet" label="Hài" Icon={Footprints} accentColor="text-amber-300" />
            </div>
        </div>
    );

    const WeaponsView = () => (
        <div className="space-y-8">
            <div className="space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-wuxia-red/10 border border-wuxia-red/20 flex items-center justify-center rounded-lg">
                        <Sword className="w-4 h-4 text-wuxia-red/70" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-wuxia-red font-black uppercase tracking-[0.4em]">Vũ Khí</span>
                    <div className="flex-1 h-[1px] bg-wuxia-red/15" />
                </div>
                <div className="space-y-3">
                    <SlotCard slotKey="mainWeapon" label="Vũ Khí Chính" Icon={Sword} accentColor="text-wuxia-red" subtypeIcon={Sword} />
                    <SlotCard slotKey="subWeapon" label="Vũ Khí Phụ" Icon={Sword} accentColor="text-wuxia-red" subtypeIcon={Sword} />
                    <SlotCard slotKey="hiddenWeapon" label="Ám Khí" Icon={Crosshair} accentColor="text-wuxia-red" />
                </div>
            </div>

            <div className="space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-400/10 border border-purple-400/20 flex items-center justify-center rounded-lg">
                        <Wind className="w-4 h-4 text-purple-400/70" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-purple-400 font-black uppercase tracking-[0.4em]">Khác</span>
                    <div className="flex-1 h-[1px] bg-purple-400/15" />
                </div>
                <div className="space-y-3">
                    <SlotCard slotKey="mount" label="Tọa Kỵ" Icon={Wind} accentColor="text-purple-400" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/92 backdrop-blur-3xl z-[220] flex items-center justify-center p-0 md:p-8 font-sans">
            <div className="relative w-full h-full md:h-auto md:max-w-4xl">
                {!isMobile && (
                    <>
                        <div className="wuxia-corner wuxia-corner-tl"></div>
                        <div className="wuxia-corner wuxia-corner-tr"></div>
                        <div className="wuxia-corner wuxia-corner-bl"></div>
                        <div className="wuxia-corner wuxia-corner-br"></div>
                    </>
                )}

                <div className="glass-panel border border-white/10 w-full h-full md:h-auto md:max-h-[90vh] flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden rounded-[2rem]">

                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="h-16 md:h-20 shrink-0 flex items-center justify-between px-4 md:px-8 z-10 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            {isMobile && (
                                <button onClick={onClose} className="p-2 -ml-2 text-gray-400">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                            )}
                            <div className="w-11 h-11 md:w-12 md:h-12 bg-wuxia-gold/5 border border-wuxia-gold/15 flex items-center justify-center rounded-xl shadow-inner">
                                <Shield className="w-5 h-5 md:w-6 md:h-6 text-wuxia-gold/70" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-wuxia-gold font-serif font-bold text-lg md:text-2xl tracking-[0.2em] uppercase">Trang Bị</h3>
                                <div className="hidden md:flex items-center gap-3 mt-1.5">
                                    <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-1 border border-white/[0.08] rounded-full">
                                        <div className="w-2 h-2 bg-wuxia-gold shadow-[0_0_10px_rgba(217,184,106,0.5)] rounded-full animate-pulse" />
                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">TRẠNG THÁI NHÂN VẬT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!isMobile && (
                            <button
                                onClick={onClose}
                                className="group w-10 h-10 flex items-center justify-center hover:bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-colors rounded-xl"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        )}
                    </div>

                    {isMobile && (
                        <div className="grid grid-cols-3 border-b border-white/[0.06] bg-black/20">
                            {[
                                { key: 'status', label: 'Trạng Thái', color: 'text-wuxia-gold' },
                                { key: 'armor', label: 'Phòng Cụ', color: 'text-wuxia-gold' },
                                { key: 'weapons', label: 'Vũ Khí', color: 'text-wuxia-red' },
                            ].map(({ key, label, color }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key as any)}
                                    className={`py-3 text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                                        activeTab === key ? `${color} bg-${color.split('-')[0]}/10` : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    {activeTab === key && (
                                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-current rounded-full`} />
                                    )}
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 z-10">
                        <div className={`${isMobile ? 'max-w-md mx-auto' : 'grid grid-cols-[1fr_220px_1fr] gap-6 max-w-5xl mx-auto items-start'}`}>
                            {isMobile ? (
                                <>
                                    {activeTab === 'status' && <StatusView />}
                                    {activeTab === 'armor' && <ArmorView />}
                                    {activeTab === 'weapons' && <WeaponsView />}
                                </>
                            ) : (
                                <>
                                    <div className="space-y-8">
                                        <ArmorView />
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <StatusView />
                                        <StatsSummary />
                                    </div>

                                    <div className="space-y-8">
                                        <WeaponsView />
                                    </div>
                                </>
                            )}
                        </div>

                        {!isMobile && (
                            <div className="pt-8 flex flex-col items-center opacity-15">
                                <div className="text-[9px] text-wuxia-gold font-serif tracking-[1em] mb-2 uppercase">Nhân kiếm hợp nhất</div>
                                <div className="w-12 h-px bg-wuxia-gold/30" />
                            </div>
                        )}
                    </div>

                    <div className="h-12 md:h-14 shrink-0 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-center px-8 relative overflow-hidden">
                        <span className="text-[9px] md:text-[10px] text-gray-600 font-mono tracking-[0.6em] uppercase z-10 font-bold">LUYỆN TRONG BÓNG TỐI • RÈN TRONG MÁU LỬA</span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .vertical-text { writing-mode: vertical-rl; text-orientation: upright; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 2px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }
            `}} />
        </div>
    );
};

export default EquipmentModal;