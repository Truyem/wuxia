import React, { useState, useMemo, useEffect } from 'react';
import { 
    Package, 
    X, 
    ChevronRight, 
    Briefcase, 
    Shield, 
    Box, 
    Sparkles, 
    Gem, 
    Weight,
    Search,
    Filter,
    Layers,
    LayoutGrid
} from 'lucide-react';
import { CharacterData } from '../../../types';
import { GameItem } from '../../../models/item';

interface Props {
    character: CharacterData;
    onClose: () => void;
}

const InventoryModal: React.FC<Props> = ({ character, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const unstoredViewId = '__unstored__';
    const equipmentSlotSet = useMemo(() => new Set([
        'head', 'chest', 'legs', 'hands', 'feet',
        'mainWeapon', 'subWeapon', 'hiddenWeapon', 'back', 'waist', 'mount',
        'Đầu', 'Ngực', 'Chân', 'Tay', 'Bàn tay', 'Bàn chân',
        'Vũ khí chính', 'Vũ khí phụ', 'Ám khí', 'Lưng', 'Thắt lưng', 'Tọa kỵ'
    ]), []);

    const containers = useMemo(() => {
        return character.itemList.filter(item =>
            (item.containerProperties !== undefined || (item as any).containerAttributes !== undefined) &&
            (item.type === 'Vật chứa' || item.type === 'Phòng cụ')
        );
    }, [character.itemList]);

    const containerIds = useMemo(() => new Set(containers.map(c => c.id)), [containers]);

    const itemContainerMap = useMemo(() => {
        const out = new Map<string, string | null>();
        character.itemList.forEach((item) => {
            const explicit = typeof item.currentContainerId === 'string' ? item.currentContainerId.trim() : '';
            if (explicit && (containerIds.has(explicit) || equipmentSlotSet.has(explicit))) {
                out.set(item.id, explicit);
                return;
            }
            out.set(item.id, null);
        });
        return out;
    }, [character.itemList, containerIds, equipmentSlotSet]);

    const [selectedContainerId, setSelectedContainerId] = useState<string | null>(unstoredViewId);

    useEffect(() => {
        const available = new Set([unstoredViewId, ...containers.map(c => c.id)]);
        if (!selectedContainerId || !available.has(selectedContainerId)) {
            setSelectedContainerId(unstoredViewId);
        }
    }, [containers, selectedContainerId]);

    const currentContainer = character.itemList.find(i => i.id === selectedContainerId);

    const { containerItems, containerCapacity, containerUsedDerived } = useMemo(() => {
        const rawItems = character.itemList.filter((item) => {
            const location = itemContainerMap.get(item.id) || null;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 item.type.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return false;

            if (selectedContainerId === unstoredViewId) {
                return location === null;
            }
            return location === selectedContainerId && item.id !== selectedContainerId;
        });

        const groups: { item: GameItem, count: number }[] = [];
        const map = new Map<string, number>();

        rawItems.forEach(item => {
            const key = `${item.name}-${item.quality}-${item.type}`;
            if (map.has(key)) {
                groups[map.get(key)!].count++;
            } else {
                groups.push({ item, count: 1 });
                map.set(key, groups.length - 1);
            }
        });

        const derivedUsed = rawItems.reduce((sum, item) => sum + (Number(item.spaceOccupied) || 0), 0);
        const containerProps = currentContainer?.containerProperties || (currentContainer as any)?.containerAttributes;
        const capacity = containerProps?.maxCapacity || 0;

        return {
            containerItems: groups,
            containerCapacity: capacity,
            containerUsedDerived: derivedUsed
        };
    }, [currentContainer, character.itemList, itemContainerMap, selectedContainerId, searchQuery]);

    const getQualityColor = (quality: string) => {
        switch (quality) {
            case 'Phàm phẩm': return 'text-slate-400';
            case 'Lương phẩm': return 'text-emerald-400';
            case 'Thượng phẩm': return 'text-wuxia-cyan';
            case 'Cực phẩm': return 'text-purple-400';
            case 'Tuyệt thế': return 'text-orange-400';
            case 'Truyền thuyết': return 'text-wuxia-gold';
            case 'Thần binh': return 'text-red-500';
            default: return 'text-white';
        }
    };

    const getQualityGlow = (quality: string) => {
        switch (quality) {
            case 'Phàm phẩm': return 'shadow-slate-500/10';
            case 'Lương phẩm': return 'shadow-emerald-500/20';
            case 'Thượng phẩm': return 'shadow-cyan-500/20';
            case 'Cực phẩm': return 'shadow-purple-500/30';
            case 'Tuyệt thế': return 'shadow-orange-500/40';
            case 'Truyền thuyết': return 'shadow-wuxia-gold/50';
            case 'Thần binh': return 'shadow-red-500/60';
            default: return '';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-6xl h-[85vh] glass-panel-square border border-white/10 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden rounded-none group">
                {/* Header Section */}
                <header className="h-16 shrink-0 bg-black/40 border-b border-white/5 flex items-center justify-between px-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-wuxia-gold/10 to-transparent border border-wuxia-gold/20 flex items-center justify-center">
                                <Package className="w-6 h-6 text-wuxia-gold/80" />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-black text-white/90 tracking-[0.2em] uppercase italic flex items-center gap-3">
                                    Hành Trang
                                    <span className="text-[9px] font-sans font-black tracking-widest text-wuxia-gold/60 border border-wuxia-gold/20 px-2 py-0.5 uppercase italic not-italic">
                                        Inventory v4.5
                                    </span>
                                </h2>
                            </div>
                        </div>

                        {/* Weight Indicator */}
                        <div className="ml-8 flex items-center gap-4 bg-white/5 border border-white/5 py-1.5 px-4">
                            <Weight className="w-4 h-4 text-wuxia-cyan/70" />
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-tighter text-white/30">Phụ Trọng</span>
                                    <span className={`text-xs font-mono font-bold ${character.currentWeight > character.maxWeight ? 'text-red-500' : 'text-wuxia-gold/80'}`}>
                                        {character.currentWeight.toFixed(1)} / {character.maxWeight}
                                    </span>
                                </div>
                                <div className="w-32 h-1 bg-white/5 mt-1 overflow-hidden relative border border-white/5">
                                    <div 
                                        className={`absolute inset-y-0 left-0 ${character.currentWeight > character.maxWeight ? 'bg-red-500' : 'bg-wuxia-cyan/40'}`}
                                        style={{ width: `${Math.min((character.currentWeight / character.maxWeight) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-none pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-wuxia-gold/30 w-64 placeholder:text-white/20"
                            />
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-none bg-white/5 border border-white/10 hover:border-wuxia-gold hover:text-white text-white/40"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 flex overflow-hidden">
                    {/* Left Sidebar: Containers */}
                    <aside className="w-64 border-r border-white/5 bg-black/20 flex flex-col p-4 gap-4 overflow-y-auto no-scrollbar">
                        <div className="px-2 mb-2">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-4 flex items-center gap-2">
                                <Layers className="w-3 h-3" />
                                Kho Lưu Trữ
                            </h3>
                            
                            <button
                                onClick={() => setSelectedContainerId(unstoredViewId)}
                                className={`w-full group relative flex items-center gap-3 p-3 rounded-none border ${
                                    selectedContainerId === unstoredViewId 
                                        ? 'bg-wuxia-gold/5 border-wuxia-gold/20' 
                                        : 'bg-transparent border-transparent hover:bg-white/5'
                                }`}
                            >
                                <div className={`w-10 h-10 flex items-center justify-center border ${
                                    selectedContainerId === unstoredViewId 
                                        ? 'bg-wuxia-gold text-black border-wuxia-gold' 
                                        : 'bg-white/5 text-white/20 border-white/5'
                                }`}>
                                    <LayoutGrid className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedContainerId === unstoredViewId ? 'text-wuxia-gold' : 'text-white/40'}`}>
                                        Chung
                                    </span>
                                    <span className="text-[8px] font-bold text-white/10 uppercase mt-0.5 italic">Mặc định</span>
                                </div>
                            </button>
                        </div>

                        <div className="space-y-1">
                            {containers.map((c) => {
                                const isSelected = selectedContainerId === c.id;
                                const capacity = c.containerProperties?.maxCapacity ?? (c as any).containerAttributes?.maxCapacity ?? 0;
                                const occupied = character.itemList.filter(i => i.currentContainerId === c.id).length;
                                const progress = Math.min((occupied / capacity) * 100, 100);

                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => setSelectedContainerId(c.id)}
                                        className={`w-full group relative flex items-center gap-3 p-3 rounded-none border ${
                                            isSelected 
                                                ? 'bg-wuxia-cyan/5 border-wuxia-cyan/20' 
                                                : 'bg-transparent border-transparent hover:bg-white/5'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 flex items-center justify-center border ${
                                            isSelected 
                                                ? 'bg-wuxia-cyan text-black border-wuxia-cyan' 
                                                : 'bg-white/5 text-white/20 border-white/5'
                                        }`}>
                                            {c.type === 'Phòng cụ' ? <Shield className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0 text-left">
                                            <span className={`text-[10px] font-black uppercase tracking-widest truncate ${isSelected ? 'text-wuxia-cyan' : 'text-white/40'}`}>
                                                {c.name}
                                            </span>
                                            <div className="mt-1.5 flex flex-col gap-1">
                                                <div className="flex justify-between text-[8px] font-black uppercase tracking-tighter text-white/20">
                                                    <span>{occupied} / {capacity} Ô</span>
                                                    <span>{Math.round(progress)}%</span>
                                                </div>
                                                <div className="w-full h-[1px] bg-white/5 rounded-none overflow-hidden">
                                                    <div 
                                                        className={`h-full transition-all ${isSelected ? 'bg-wuxia-cyan/50' : 'bg-white/10'}`}
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Right Side: Items Grid */}
                    <section className="flex-1 flex flex-col relative bg-black/10">
                        <div className="h-12 flex items-center justify-between px-8 bg-black/20 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                                    {selectedContainerId === unstoredViewId ? 'DANH SÁCH TỔNG HỢP' : currentContainer?.name}
                                </span>
                                <div className="h-3 w-[1px] bg-white/10"></div>
                                <span className="text-[9px] font-bold text-wuxia-gold/40 italic uppercase tracking-wider">
                                    {containerItems.length} Phân loại
                                </span>
                            </div>
                            
                            {currentContainer && (
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <div 
                                                key={i} 
                                                className={`w-2 h-1 ${
                                                    i < (containerUsedDerived / containerCapacity * 10) 
                                                        ? 'bg-wuxia-cyan/50' 
                                                        : 'bg-white/5'
                                                }`}
                                            ></div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-wuxia-cyan/60">
                                        {containerUsedDerived} / {containerCapacity}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Items Grid */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                            {containerItems.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {containerItems.map(({ item, count }) => (
                                        <div
                                            key={item.id}
                                            className="group/card relative bg-white/[0.02] border border-white/5 rounded-none p-4 hover:bg-white/[0.04] hover:border-wuxia-gold/20 flex flex-col gap-3 group/item overflow-hidden"
                                        >
                                            {/* Static rarity highlight */}
                                            <div className={`absolute top-0 right-0 w-16 h-16 opacity-[0.03] ${getQualityColor(item.quality).replace('text', 'bg')}`}></div>
                                            
                                            <div className="flex gap-4 relative z-10">
                                                <div className={`w-14 h-14 border border-white/10 bg-black flex items-center justify-center relative overflow-hidden shrink-0`}>
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-70 group-hover/card:opacity-90 grayscale-[30%] group-hover/card:grayscale-0" />
                                                    ) : (
                                                        <Box className="w-6 h-6 text-white/5" />
                                                    )}
                                                    <div className={`absolute top-0 left-0 w-1 h-full ${getQualityColor(item.quality).replace('text', 'bg')} opacity-40`}></div>
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h4 className={`text-sm font-serif font-black tracking-wide truncate ${getQualityColor(item.quality)}`}>
                                                            {item.name}
                                                        </h4>
                                                        {count > 1 && (
                                                            <span className="bg-white/5 text-white/50 text-[9px] font-black px-1.5 py-0.5 border border-white/5">
                                                                x{count}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
                                                            {item.type}
                                                        </span>
                                                        <span className="text-[8px] font-mono text-white/10">#{item.id?.slice(-4)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative z-10 flex-1">
                                                <p className="text-[10px] text-white/30 leading-relaxed italic line-clamp-2 h-8">
                                                    "{item.description}"
                                                </p>
                                            </div>

                                            <div className="relative z-10 flex flex-col gap-2 bg-black/40 p-2 border border-white/5">
                                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tighter">
                                                    <div className="flex items-center gap-2 text-white/20">
                                                        <Box className="w-3 h-3" />
                                                        {item.spaceOccupied} Ô
                                                    </div>
                                                    <span className="text-wuxia-cyan/60">{item.weight} TL</span>
                                                </div>
                                                
                                                {item.attributes && item.attributes.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1 mt-1 border-t border-white/5 pt-2">
                                                        {item.attributes.slice(0, 3).map((attr, i) => (
                                                            <div key={i} className="bg-white/[0.02] px-1.5 py-0.5 border border-white/5 shrink-0 flex gap-2 items-center">
                                                                <span className="text-[7px] text-white/20 font-black uppercase">{attr.name}</span>
                                                                <span className="text-[9px] text-wuxia-gold/60 font-mono font-black">+{attr.value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-[8px] text-white/10 italic text-center py-0.5">Vô ngã</div>
                                                )}
                                            </div>

                                            {/* Static Hover Actions */}
                                            <div className="absolute inset-x-0 bottom-0 py-3 px-4 bg-black/90 translate-y-full group-hover/card:translate-y-0 flex justify-between items-center border-t border-wuxia-gold/20">
                                                <div className="flex flex-col">
                                                    <span className="text-[7px] text-white/30 uppercase font-black tracking-widest">Trị Giá</span>
                                                    <div className="flex items-center gap-1.5 text-wuxia-gold/70 font-mono font-black text-[10px]">
                                                        <Gem className="w-3 h-3" />
                                                        {item.value}
                                                    </div>
                                                </div>
                                                <button className="bg-wuxia-gold/10 hover:bg-wuxia-gold text-wuxia-gold hover:text-black px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] border border-wuxia-gold/30">
                                                    SỬ DỤNG
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center gap-6 opacity-30">
                                    <div className="w-24 h-24 border border-white/5 flex items-center justify-center">
                                        <Search className="w-10 h-10 text-white/10" />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <h3 className="text-lg font-serif font-black text-white/40 tracking-[0.5em] uppercase">TRỐNG KHÔNG</h3>
                                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mt-3">
                                            Vạn vật giai không, duyên sơ vạn hỏa
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                <footer className="h-8 bg-black/60 shrink-0 border-t border-white/5 flex items-center justify-center gap-12 relative z-10 px-8">
                    <div className="w-16 h-px bg-white/5"></div>
                    <p className="text-[9px] font-serif italic text-white/20 tracking-[0.3em] uppercase flex items-center gap-3">
                        <Sparkles className="w-3 h-3" />
                        Trân trọng từng mảnh cơ duyên
                        <Sparkles className="w-3 h-3" />
                    </p>
                    <div className="w-16 h-px bg-white/5"></div>
                    
                    <div className="absolute right-8 flex items-center gap-3">
                        <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.2em] italic">{character.name}</span>
                        <div className="h-3 w-[1px] bg-white/10"></div>
                        <span className="text-[8px] font-mono text-white/5">ARCHIVE.INV</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default InventoryModal;
