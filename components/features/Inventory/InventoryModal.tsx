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
    LayoutGrid,
    Menu,
    Coins,
    Book,
    Sparkle
} from 'lucide-react';
import { CharacterData } from '../../../types';
import { GameItem } from '../../../models/item';

interface Props {
    character: CharacterData;
    onClose: () => void;
    onDeleteItem?: (itemId: string) => void;
}

const InventoryModal: React.FC<Props> = ({ character, onClose, onDeleteItem }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const categories = useMemo(() => [
        { id: 'Tất cả', label: 'Tất cả', icon: LayoutGrid },
        { id: 'Trang bị', label: 'Trang bị', icon: Shield },
        { id: 'Tiêu hao', label: 'Tiêu hao', icon: Sparkles },
        { id: 'Nguyên liệu', label: 'Nguyên liệu', icon: Layers },
        { id: 'Bí tịch', label: 'Bí tịch', icon: Book },
        { id: 'Khác', label: 'Khác', icon: Box },
    ], []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
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

    const { filteredGroups, itemTypesCount, totalValue, containerCapacity, containerUsedDerived } = useMemo(() => {
        const rawItems = character.itemList.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 item.type.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return false;

            // Filter by container (keeping existing logic but we'll integrate it better later)
            const location = itemContainerMap.get(item.id) || null;
            const containerMatch = selectedContainerId === unstoredViewId ? location === null : location === selectedContainerId && item.id !== selectedContainerId;

            if (!containerMatch) return false;

            // Filter by category
            if (selectedCategory === 'Tất cả') return true;
            
            const type = item.type.toLowerCase();
            if (selectedCategory === 'Trang bị') {
                return type.includes('vũ khí') || type.includes('phòng cụ') || type.includes('trang sức') || type.includes('trang bị');
            }
            if (selectedCategory === 'Tiêu hao') {
                return type.includes('tiêu hao') || type.includes('thuốc') || type.includes('dược');
            }
            if (selectedCategory === 'Nguyên liệu') {
                return type.includes('nguyên liệu') || type.includes('khoáng') || type.includes('thảo dược');
            }
            if (selectedCategory === 'Bí tịch') {
                return type.includes('bí tịch') || type.includes('sách') || type.includes('bí kíp');
            }
            if (selectedCategory === 'Khác') {
                const known = ['vũ khí', 'phòng cụ', 'trang sức', 'trang bị', 'tiêu hao', 'thuốc', 'dược', 'nguyên liệu', 'khoáng', 'thảo dược', 'bí tịch', 'sách', 'bí kíp'];
                return !known.some(k => type.includes(k));
            }
            return true;
        });

        const groups: { item: GameItem, count: number }[] = [];
        const map = new Map<string, number>();
        let valueSum = 0;

        rawItems.forEach(item => {
            valueSum += Number(item.value) || 0;
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
            filteredGroups: groups,
            itemTypesCount: groups.length,
            totalValue: valueSum,
            containerCapacity: capacity,
            containerUsedDerived: derivedUsed
        };
    }, [currentContainer, character.itemList, itemContainerMap, selectedContainerId, searchQuery, selectedCategory]);

    const getQualityColor = (quality: string) => {
        switch (quality) {
            case 'Phàm phẩm': return 'text-slate-400';
            case 'Lương phẩm': return 'text-emerald-500';
            case 'Thượng phẩm': return 'text-wuxia-cyan';
            case 'Cực phẩm': return 'text-purple-400';
            case 'Tuyệt thế': return 'text-orange-500';
            case 'Truyền thuyết': return 'text-wuxia-gold';
            case 'Thần binh': return 'text-red-600';
            default: return 'text-white/60';
        }
    };

    const categoryTabs = (
        <div className={`flex ${isMobile ? 'flex-row overflow-x-auto no-scrollbar py-2 px-2 gap-2' : 'flex-col p-4 gap-1 h-full'}`}>
            {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                
                // Count items in this category
                const count = character.itemList.filter(item => {
                    if (cat.id === 'Tất cả') return true;
                    const type = item.type.toLowerCase();
                    if (cat.id === 'Trang bị') return type.includes('vũ khí') || type.includes('phòng cụ') || type.includes('trang sức') || type.includes('trang bị');
                    if (cat.id === 'Tiêu hao') return type.includes('tiêu hao') || type.includes('thuốc') || type.includes('dược');
                    if (cat.id === 'Nguyên liệu') return type.includes('nguyên liệu') || type.includes('khoáng') || type.includes('thảo dược');
                    if (cat.id === 'Bí tịch') return type.includes('bí tịch') || type.includes('sách') || type.includes('bí kíp');
                    if (cat.id === 'Khác') {
                        const known = ['vũ khí', 'phòng cụ', 'trang sức', 'trang bị', 'tiêu hao', 'thuốc', 'dược', 'nguyên liệu', 'khoáng', 'thảo dược', 'bí tịch', 'sách', 'bí kíp'];
                        return !known.some(k => type.includes(k));
                    }
                    return false;
                }).length;

                return (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setSelectedCategory(cat.id);
                            if (isMobile) setShowMobileSidebar(false);
                        }}
                        className={`wuxia-list-item flex items-center gap-3 p-3 transition-all ${
                            isSelected 
                                ? 'active text-wuxia-gold shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]' 
                                : 'text-white/40 hover:text-white/60'
                        } ${isMobile ? 'shrink-0 min-w-[100px] !rounded-xl' : 'w-full mb-1 !rounded-2xl'}`}
                    >
                        <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-wuxia-gold' : 'text-white/20'}`} />
                        <div className="flex flex-1 items-center justify-between min-w-0">
                            <span className={`text-[11px] font-bold uppercase tracking-wider truncate ${isSelected ? 'text-wuxia-gold' : ''}`}>{cat.label}</span>
                            {!isMobile && <span className={`text-[9px] font-mono ${isSelected ? 'text-wuxia-gold/60' : 'opacity-20'}`}>{count}</span>}
                        </div>
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className={`fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center font-sans overflow-hidden ${isMobile ? 'p-0' : 'p-4'}`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-wuxia-gold/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-wuxia-cyan/20 blur-[120px] rounded-full animate-pulse capitalize" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className={`relative w-full ${isMobile ? 'h-full' : 'max-w-6xl h-[85vh]'} glass-panel flex flex-col shadow-[0_0_150px_rgba(0,0,0,0.95)] overflow-hidden rounded-[3rem] border border-wuxia-gold/25`}>
                {/* Wuxia corners */}
                {!isMobile && (
                    <>
                        <div className="wuxia-corner wuxia-corner-tl !border-wuxia-gold/60 !w-24 !h-24"></div>
                        <div className="wuxia-corner wuxia-corner-tr !border-wuxia-gold/60 !w-24 !h-24"></div>
                        <div className="wuxia-corner wuxia-corner-bl !border-wuxia-gold/60 !w-24 !h-24"></div>
                        <div className="wuxia-corner wuxia-corner-br !border-wuxia-gold/60 !w-24 !h-24"></div>
                    </>
                )}

                {/* Header */}
                <header className={`shrink-0 bg-black/60 border-b border-white/5 relative z-10 ${isMobile ? 'px-4 py-3' : 'h-16 px-6 flex items-center justify-between'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`bg-wuxia-gold/5 border border-wuxia-gold/20 flex items-center justify-center rounded-xl ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                            <Package className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-wuxia-gold/80`} />
                        </div>
                        <h2 className={`${isMobile ? 'text-lg' : 'text-3xl'} font-serif font-black text-wuxia-gold tracking-[0.3em] uppercase drop-shadow-lg`}>
                            Hành Trang
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        {!isMobile && (
                            <div className="flex items-center gap-6 bg-black/60 border border-white/10 px-6 py-3 rounded-2xl shadow-inner shadow-white/5">
                                <span className="text-[11px] text-white/40 font-black uppercase tracking-[0.2em]">Sức chứa hành trang</span>
                                <div className="flex items-center gap-4">
                                    <div className="w-40 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div 
                                            className={`h-full transition-all duration-700 ease-out ${character.currentWeight > character.maxWeight ? 'bg-wuxia-red shadow-[0_0_10px_#ef4444]' : 'bg-wuxia-gold shadow-[0_0_10px_#d4af37]'}`}
                                            style={{ width: `${Math.min((character.currentWeight / character.maxWeight) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className={`text-[12px] font-mono font-black tracking-tighter ${character.currentWeight > character.maxWeight ? 'text-wuxia-red' : 'text-wuxia-gold underline underline-offset-4 decoration-wuxia-gold/20'}`}>
                                        {character.currentWeight.toFixed(1)} / {character.maxWeight}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`bg-white/[0.02] border border-white/10 pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-wuxia-gold/20 placeholder:text-white/10 rounded-2xl ${isMobile ? 'w-28' : 'w-44'}`}
                                />
                            </div>
                            <button 
                                onClick={onClose}
                                className={`flex items-center justify-center transition-all bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-red-500/30 hover:border-red-500/60 rounded-2xl shadow-lg border-opacity-50 ${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}
                            >
                                <X className="w-6 h-6" strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className={`flex-1 flex overflow-hidden relative ${isMobile ? 'flex-col' : 'flex-row'}`}>
                    {/* Sidebar: Categories */}
                    <aside className={`shrink-0 bg-black/40 border-white/5 ${isMobile ? 'w-full h-auto border-b' : 'w-52 border-r overflow-y-auto no-scrollbar h-full'}`}>
                        {categoryTabs}
                    </aside>

                    {/* Content: Item Grid */}
                    <section className="flex-1 flex flex-col min-w-0 bg-black/10">
                        {/* Subheader: Container Selector */}
                        <div className="shrink-0 h-12 bg-black/20 border-b border-white/5 flex items-center px-6 gap-4 overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setSelectedContainerId(unstoredViewId)}
                                className={`flex items-center gap-2 px-3 py-1.5 transition-all border rounded-2xl ${
                                    selectedContainerId === unstoredViewId 
                                        ? 'bg-wuxia-gold/10 border-wuxia-gold/30 text-wuxia-gold shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]' 
                                        : 'bg-transparent border-transparent text-white/20 hover:text-white/40'
                                }`}
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Tổng hợp</span>
                            </button>

                            {containers.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setSelectedContainerId(c.id)}
                                    className={`flex items-center gap-2 px-3 py-1.5 transition-all border rounded-2xl ${
                                        selectedContainerId === c.id
                                            ? 'bg-wuxia-gold/10 border-wuxia-gold/30 text-wuxia-gold shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]' 
                                            : 'bg-transparent border-transparent text-white/20 hover:text-white/40'
                                    }`}
                                >
                                    {c.type === 'Phòng cụ' ? <Shield className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                                    <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{c.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className={`flex-1 overflow-y-auto custom-scrollbar ${isMobile ? 'p-3' : 'p-6'}`}>
                            {filteredGroups.length > 0 ? (
                                <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                                    {filteredGroups.map(({ item, count }) => (
                                        <div
                                            key={item.id}
                                            className="group relative bg-white/[0.04] border border-white/10 p-5 flex flex-col gap-4 transition-all rounded-[2rem] hover:bg-white/[0.08] hover:border-wuxia-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-wuxia-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                            <div className="flex gap-3">
                                                <div className={`shrink-0 w-16 h-16 border border-white/10 bg-black/40 flex items-center justify-center relative overflow-hidden rounded-2xl`}>
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                                    ) : (
                                                        <Box className="w-8 h-8 text-white/10" />
                                                    )}
                                                    <div className={`absolute left-0 top-0 w-1 h-full opacity-50 ${getQualityColor(item.quality).replace('text', 'bg')}`}></div>
                                                    {count > 1 && (
                                                        <div className="absolute bottom-0 right-0 bg-black/80 text-white/60 text-[9px] px-1 border-tl border-white/10 font-bold rounded-tl-lg">
                                                            x{count}
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={`text-sm font-bold truncate leading-tight mb-0.5 ${getQualityColor(item.quality)}`}>
                                                        {item.name}
                                                    </h4>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/20 whitespace-nowrap">{item.type}</span>
                                                        <div className="h-2 w-px bg-white/10"></div>
                                                        <span className="text-[9px] text-wuxia-gold/40 font-mono italic">#{item.id?.slice(-4)}</span>
                                                    </div>
                                                    <p className="text-[10px] text-white/30 italic line-clamp-2 leading-relaxed">
                                                        "{item.description}"
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-bold">
                                                <div className="flex gap-3">
                                                    <div className="flex items-center gap-1 text-white/20 uppercase tracking-tighter">
                                                        <Weight className="w-3 h-3" />
                                                        {item.weight} TL
                                                    </div>
                                                    <div className="flex items-center gap-1 text-white/20 uppercase tracking-tighter">
                                                        <Box className="w-3 h-3" />
                                                        {item.spaceOccupied} Ô
                                                    </div>
                                                </div>
                                                <span className="text-wuxia-gold font-mono flex items-center gap-1.5 bg-wuxia-gold/5 px-2 py-0.5 border border-wuxia-gold/10 rounded-md">
                                                    <Gem className="w-3 h-3" />
                                                    {item.value}
                                                </span>
                                            </div>

                                            {/* Action Hover Overlay - Desktop Onlyish */}
                                            <div className={`absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100 border border-wuxia-gold/40 rounded-2xl`}>
                                                <button 
                                                    onClick={() => onDeleteItem?.(item.id)}
                                                    className="w-32 bg-red-600/80 hover:bg-red-700 text-white py-2 text-[10px] font-black uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 rounded-2xl shadow-lg shadow-red-900/20"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="relative group">
                                        <div className="w-20 h-20 border border-wuxia-gold/20 flex items-center justify-center mb-6 bg-wuxia-gold/5 transition-all group-hover:border-wuxia-gold/40 group-hover:bg-wuxia-gold/10">
                                            <div className="absolute inset-0 border border-wuxia-gold/10 scale-90 -rotate-45"></div>
                                            <span className="text-2xl font-serif font-black text-wuxia-gold/30 tracking-tight select-none">TRỐNG</span>
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-serif font-bold text-white/40 tracking-[0.3em] uppercase">Phân loại này hiện đang trống rỗng</h3>
                                    <p className="text-[10px] font-medium tracking-widest uppercase mt-3 max-w-xs leading-relaxed text-white/10 italic">
                                        "Tiền tài như bèo bọt, vạn vật giai không."
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                {/* Footer Stats */}
                <footer className={`shrink-0 bg-black/60 border-t border-white/5 px-6 py-3 flex items-center justify-between relative z-10 overflow-hidden`}>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wuxia-gold/20 to-transparent"></div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Box className="w-3.5 h-3.5 text-white/20" />
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Số loại vật phẩm</span>
                            <span className="text-[11px] font-mono font-bold text-wuxia-gold/80">{itemTypesCount}</span>
                        </div>
                        <div className="h-4 w-px bg-white/5"></div>
                        <div className="flex items-center gap-2">
                            <Coins className="w-3.5 h-3.5 text-white/20" />
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Tổng giá trị</span>
                            <span className="text-[11px] font-mono font-bold text-wuxia-gold/80">{totalValue.toLocaleString()} đồng</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2 opacity-30 group cursor-default">
                        <Sparkle className="w-3 h-3 text-wuxia-gold group-hover:animate-spin" />
                        <p className="text-[9px] font-serif italic text-white/40 tracking-[0.3em] uppercase">
                            Giang Hồ Trân Bảo • Tích Thế Cơ Duyên
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default InventoryModal;
