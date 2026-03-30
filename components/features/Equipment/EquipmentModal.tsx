import React, { useState, useEffect } from 'react';
import { CharacterData } from '../../../types';
import { GameItem, Weapon, Armor } from '../../../models/item';
import { 
    Crown, 
    Shirt, 
    Backpack, 
    Link as LinkIcon, 
    Hand, 
    Layers, 
    Footprints, 
    Sword, 
    Crosshair, 
    Wind, 
    X,
    User,
    Shield,
    Zap,
    ChevronLeft
} from 'lucide-react';

interface Props {
    character: CharacterData;
    onClose: () => void;
}

const EquipmentModal: React.FC<Props> = ({ character, onClose }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState<'status' | 'armor' | 'weapons'>('status');

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

    const getQualityColor = (quality: string) => {
        switch (quality) {
            case 'Phàm phẩm': return { text: 'text-gray-400', border: 'border-gray-600/40', bg: 'bg-gray-600/10', glow: '' };
            case 'Lương phẩm': return { text: 'text-wuxia-gold', border: 'border-wuxia-gold/40', bg: 'bg-wuxia-gold/10', glow: 'shadow-[0_0_8px_rgba(217,184,106,0.15)]' };
            case 'Thượng phẩm': return { text: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-600/10', glow: 'shadow-[0_0_8px_rgba(168,85,247,0.15)]' };
            case 'Cực phẩm': return { text: 'text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-600/10', glow: 'shadow-[0_0_8px_rgba(251,146,60,0.15)]' };
            case 'Tuyệt thế': return { text: 'text-red-500', border: 'border-red-500/40', bg: 'bg-red-600/10', glow: 'shadow-[0_0_12px_rgba(239,68,68,0.2)]' };
            case 'Truyền thuyết': return { text: 'text-wuxia-gold', border: 'border-wuxia-gold/50', bg: 'bg-wuxia-gold/10', glow: 'shadow-[0_0_15px_rgba(212,175,55,0.2)]' };
            default: return { text: 'text-gray-500', border: 'border-gray-700/30', bg: 'bg-gray-800/10', glow: '' };
        }
    };

    const SlotCard: React.FC<{
        slotKey: string;
        label: string;
        Icon: any;
        colorClass?: string;
    }> = ({ slotKey, label, Icon, colorClass = "text-gray-500" }) => {
        const itemRef = (character.equipment as any)?.[slotKey];
        const item = getItem(itemRef);
        const colors = item ? getQualityColor(item.quality) : null;

        return (
            <div className={`group relative p-4 md:p-6 min-w-0 flex items-start gap-5 border rounded-[1.5rem] transition-all duration-300 hover:scale-[1.02] ${
                item
                    ? `${colors!.bg} ${colors!.border} ${colors!.glow} border-opacity-60`
                    : 'bg-black/25 border-white/5 hover:border-white/10'
            }`}>
                {/* Image/Icon Container */}
                <div className={`w-14 h-14 md:w-16 md:h-16 shrink-0 border flex items-center justify-center relative overflow-hidden rounded-xl ${
                    item ? 'border-white/20 bg-black/40' : 'border-white/5 bg-black/20'
                }`}>
                    {item?.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <Icon className={`w-6 h-6 opacity-20 ${colorClass}`} strokeWidth={1.5} />
                    )}
                    {item && (
                        <div className="absolute top-0 right-0 bg-black/60 p-0.5">
                            <Icon className={`w-2.5 h-2.5 ${colorClass}`} />
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.1em] ${item ? 'text-white/40' : 'text-gray-600'}`}>
                            {label}
                        </span>
                        {item && (
                             <span className={`text-[8px] px-1 border border-current opacity-60 rounded ${colors!.text}`}>
                                {item.quality}
                            </span>
                        )}
                    </div>

                    {item ? (
                        <>
                            <div className={`text-base md:text-lg font-serif font-bold truncate ${colors!.text}`}>
                                {item.name}
                            </div>
                            <div className="flex items-center gap-2">
                                {item.type === 'Vũ khí' && (
                                    <span className="text-[9px] text-wuxia-red/80 font-mono flex items-center gap-1">
                                        <Sword className="w-2.5 h-2.5" /> {(item as Weapon).minAttack}-{ (item as Weapon).maxAttack}
                                    </span>
                                )}
                                {item.type === 'Phòng cụ' && (
                                    <span className="text-[9px] text-wuxia-gold/80 font-mono flex items-center gap-1">
                                        <Shield className="w-2.5 h-2.5" /> {(item as Armor).physicalDefense}
                                    </span>
                                )}
                            </div>
                            {/* Durability bar */}
                            <div className="flex items-center gap-1.5 pt-0.5">
                                <div className="flex-1 h-0.5 bg-black/60 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${
                                            (item.currentDurability / item.maxDurability) < 0.3 ? 'bg-wuxia-red' : 'bg-wuxia-gold/40'
                                        }`}
                                        style={{ width: `${(item.currentDurability / item.maxDurability) * 100}%` }}
                                    />
                                </div>
                                <span className="text-[7px] text-gray-600 font-mono">{item.currentDurability}/{item.maxDurability}</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-start py-0.5 opacity-20">
                            <span className="text-[9px] text-gray-500 italic">Trống</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const StatusView = () => (
        <div className="flex flex-col items-center py-6 md:py-10">
            {/* Central Silhouette */}
            <div className={`relative w-full ${isMobile ? 'aspect-[1/1.5] max-h-[300px]' : 'aspect-[1/3] max-h-[400px]'} flex items-center justify-center`}>
                {/* Silhouette Glow */}
                <div className="absolute w-32 h-64 bg-wuxia-gold/6 blur-[40px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-80 bg-wuxia-gold/[0.02] border border-wuxia-gold/8 rotate-12"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-80 bg-wuxia-gold/[0.02] border border-wuxia-gold/8 -rotate-12"></div>
                
                {/* Scanline for silhouette only */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]"></div>

                <div className="relative flex flex-col items-center gap-2 z-10">
                    {/* Head Circle */}
                    <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-wuxia-gold/30 bg-black/50 flex items-center justify-center shadow-[0_0_25px_rgba(217,184,106,0.18)] relative overflow-hidden group rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-tr from-wuxia-gold/20 to-transparent"></div>
                        <User className="w-8 h-8 md:w-10 md:h-10 text-wuxia-gold/70" strokeWidth={1} />
                    </div>
                    
                    {/* Body Bar */}
                    <div className="w-20 h-56 border border-wuxia-gold/20 bg-gradient-to-b from-wuxia-gold/[0.08] to-transparent relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem]">
                        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-wuxia-gold/12 to-transparent"></div>
                        <div className="text-[10px] text-wuxia-gold/50 text-center leading-relaxed font-serif tracking-[0.5em] vertical-text select-none">
                            身法如風
                        </div>
                        {/* Circuit-like decorations */}
                        <div className="absolute bottom-4 left-0 w-full h-px bg-wuxia-gold/20"></div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-px h-8 bg-wuxia-gold/20"></div>
                    </div>

                    {/* Legs - Dual Bars */}
                    <div className="flex gap-3">
                        <div className="w-6 h-20 border border-wuxia-gold/12 bg-gradient-to-b from-black/40 to-black/20 relative overflow-hidden rounded-lg">
                            <div className="absolute top-0 inset-x-0 h-4 bg-wuxia-gold/8"></div>
                        </div>
                        <div className="w-6 h-20 border border-wuxia-gold/12 bg-gradient-to-b from-black/40 to-black/20 relative overflow-hidden rounded-lg">
                            <div className="absolute top-0 inset-x-0 h-4 bg-wuxia-gold/8"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Weight / Payload Bar */}
            <div className="mt-8 md:mt-12 w-full max-w-sm px-4">
                <div className="flex justify-between items-center mb-2 px-1">
                    <div className="flex items-center gap-1.5">
                        <Zap className="w-2.5 h-2.5 text-wuxia-gold opacity-70" />
                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Tải trọng</span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${character.currentWeight > character.maxWeight ? 'text-wuxia-red' : 'text-wuxia-gold'}`}>
                        {character.currentWeight} / {character.maxWeight}
                    </span>
                </div>
                <div className="h-1.5 bg-white/[0.03] overflow-hidden border border-white/5 p-[1px] relative shadow-inner rounded-full">
                    <div
                        className={`h-full shadow-[0_0_100px_rgba(217,184,106,0.28)] rounded-full ${
                            character.currentWeight > character.maxWeight ? 'bg-wuxia-red' : 'bg-wuxia-gold/60'
                        }`}
                        style={{ width: `${Math.min(((character.currentWeight || 0) / (character.maxWeight || 1)) * 100, 100)}%` }}
                    />
                    {/* Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none rounded-full"></div>
                </div>
            </div>
        </div>
    );

    const ArmorView = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 px-2">
                <span className="text-[10px] text-wuxia-gold font-black uppercase tracking-[0.4em]">🛡 PHÒNG CỤ</span>
                <div className="flex-1 h-[1px] bg-wuxia-gold/20"></div>
            </div>
            
            <div className="grid gap-3">
                <SlotCard slotKey="head" label="Đầu" Icon={Crown} colorClass="text-wuxia-gold" />
                <SlotCard slotKey="chest" label="Thân" Icon={Shirt} colorClass="text-wuxia-gold" />
                <SlotCard slotKey="back" label="Lưng" Icon={Backpack} colorClass="text-wuxia-gold" />
                <SlotCard slotKey="waist" label="Eo" Icon={LinkIcon} colorClass="text-wuxia-gold" />
                <SlotCard slotKey="hands" label="Hộ Thủ" Icon={Hand} colorClass="text-wuxia-gold" />
                <SlotCard slotKey="legs" label="Chân" Icon={Layers} colorClass="text-wuxia-gold" />
                <SlotCard slotKey="feet" label="Hài" Icon={Footprints} colorClass="text-wuxia-gold" />
            </div>
        </div>
    );

    const WeaponsView = () => (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="flex items-center gap-4 px-2">
                    <span className="text-[10px] text-wuxia-red font-black uppercase tracking-[0.4em]">⚔ VŨ KHÍ</span>
                    <div className="flex-1 h-[1px] bg-wuxia-red/20"></div>
                </div>
                
                <div className="grid gap-3">
                    <SlotCard slotKey="mainWeapon" label="Vũ Khí Chính" Icon={Sword} colorClass="text-wuxia-red" />
                    <SlotCard slotKey="subWeapon" label="Vũ Khí Phụ" Icon={Sword} colorClass="text-wuxia-red" />
                    <SlotCard slotKey="hiddenWeapon" label="Ám Khí" Icon={Crosshair} colorClass="text-wuxia-red" />
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4 px-2">
                    <span className="text-[10px] text-purple-400 font-black uppercase tracking-[0.4em]">🐴 KHÁC</span>
                    <div className="flex-1 h-[1px] bg-purple-400/20"></div>
                </div>
                
                <div className="grid gap-3">
                    <SlotCard slotKey="mount" label="Tọa Kỵ" Icon={Wind} colorClass="text-purple-400" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[220] flex items-center justify-center p-0 md:p-8 font-sans">
            <div className="relative w-full h-full md:h-auto md:max-w-4xl">
                {/* Wuxia Corners - Only on Desktop */}
                {!isMobile && (
                    <>
                        <div className="wuxia-corner wuxia-corner-tl"></div>
                        <div className="wuxia-corner wuxia-corner-tr"></div>
                        <div className="wuxia-corner wuxia-corner-bl"></div>
                        <div className="wuxia-corner wuxia-corner-br"></div>
                    </>
                )}

                <div className="glass-panel border border-white/10 w-full h-full md:h-auto md:max-h-[90vh] flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden rounded-[2.5rem]">
                
                {/* Decorative Accents */}
                <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"></div>

                {/* Header */}
                <div className="h-16 md:h-20 shrink-0 flex items-center justify-between px-4 md:px-8 z-10 border-b border-white/10 glass-panel-square">
                    <div className="flex items-center gap-3 md:gap-4">
                        {isMobile && (
                            <button onClick={onClose} className="p-2 -ml-2 text-gray-400">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/[0.02] border border-white/10 flex items-center justify-center rounded-xl">
                            <Sword className="w-5 h-5 md:w-6 md:h-6 text-wuxia-gold opacity-80" />
                        </div>
                        <div>
                            <h3 className="text-wuxia-gold font-serif font-bold text-lg md:text-2xl tracking-[0.2em] uppercase">Trang Bị</h3>
                            <div className="hidden md:flex items-center gap-3 mt-1.5">
                                <div className="flex items-center gap-2 bg-white/[0.05] px-3 py-1 border border-white/10 rounded-full">
                                    <div className="w-2 h-2 bg-wuxia-gold shadow-[0_0_10px_rgba(217,184,106,0.5)] rounded-full animate-pulse"></div>
                                    <span className="text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-[0.2em]">TRẠNG THÁI HIỆN TẠI</span>
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

                {/* Mobile Tabs */}
                {isMobile && (
                    <div className="grid grid-cols-3 border-b border-white/10">
                        <button 
                            onClick={() => setActiveTab('status')}
                            className={`py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'status' ? 'text-wuxia-gold bg-wuxia-gold/10' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Trạng Thái
                        </button>
                        <button 
                            onClick={() => setActiveTab('armor')}
                            className={`py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'armor' ? 'text-wuxia-gold bg-wuxia-gold/10' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Phòng Cụ
                        </button>
                        <button 
                            onClick={() => setActiveTab('weapons')}
                            className={`py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'weapons' ? 'text-wuxia-red bg-wuxia-red/10' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Vũ Khí
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 z-10">
                    <div className={`${isMobile ? 'max-w-md mx-auto' : 'grid grid-cols-[1fr_200px_1fr] gap-8 max-w-5xl mx-auto items-start'}`}>
                        {isMobile ? (
                            <>
                                {activeTab === 'status' && <StatusView />}
                                {activeTab === 'armor' && <ArmorView />}
                                {activeTab === 'weapons' && <WeaponsView />}
                            </>
                        ) : (
                            <>
                                <ArmorView />
                                <StatusView />
                                <WeaponsView />
                            </>
                        )}
                    </div>

                    {!isMobile && (
                        <div className="pt-10 flex flex-col items-center opacity-20">
                            <div className="text-[10px] text-wuxia-gold font-serif tracking-[1em] mb-2 uppercase">Nhân kiếm hợp nhất</div>
                            <div className="w-16 h-px bg-wuxia-gold/30"></div>
                        </div>
                    )}
                </div>

                {/* Footer Quote */}
                <div className="h-12 md:h-14 shrink-0 bg-white/[0.02] border-t border-white/10 flex items-center justify-center px-8 relative overflow-hidden">
                    <span className="text-[9px] md:text-[11px] text-gray-600 font-mono tracking-[0.6em] uppercase z-10 font-bold">LUYỆN TRONG BÓNG TỐI • RÈN TRONG MÁU LỬA</span>
                </div>
            </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            .vertical-text {
                writing-mode: vertical-rl;
                text-orientation: upright;
            }
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(212, 175, 55, 0.2);
                border-radius: 2px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(212, 175, 55, 0.4);
            }
        `}} />
        </div>
    );
};

export default EquipmentModal;
