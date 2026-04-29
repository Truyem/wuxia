import React, { useState, useMemo } from 'react';
import { 
    X, 
    Search, 
    Heart, 
    Coins, 
    Trophy, 
    Skull, 
    Scroll, 
    User,
    Sparkle,
    Clock,
    MapPin,
    ChevronRight,
    Users,
    Ghost,
    Crown,
    Gem,
    Shield,
    BookOpen
} from 'lucide-react';
import { AppointmentStructure, AppointmentNature } from '../../../models/task';

interface Props {
    agreements: AppointmentStructure[];
    onClose: () => void;
}

const AgreementModal: React.FC<Props> = ({ agreements = [], onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [selectedIdx, setSelectedIdx] = useState<number>(0);

    const categories = useMemo(() => [
        { id: 'Tất cả', label: 'Tất cả', icon: Scroll, color: 'text-wuxia-gold' },
        { id: 'Tình cảm', label: 'Tình cảm', icon: Heart, color: 'text-pink-400' },
        { id: 'Giao dịch', label: 'Giao dịch', icon: Coins, color: 'text-wuxia-gold' },
        { id: 'Cá cược', label: 'Cá cược', icon: Trophy, color: 'text-purple-400' },
        { id: 'Báo thù', label: 'Báo thù', icon: Skull, color: 'text-red-500' },
        { id: 'Cam kết', label: 'Cam kết', icon: Scroll, color: 'text-amber-400' },
        { id: 'Tự nguyện', label: 'Tự nguyện', icon: User, color: 'text-cyan-400' },
    ], []);

    const filteredAgreements = useMemo(() => {
        return agreements.filter(agree => {
            const matchesSearch = 
                agree.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (agree as any).target?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agree.oathContent?.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return false;

            if (selectedCategory === 'Tất cả') return true;
            
            const nature = agree.nature || (agree as any).nature?.toString() || '';
            return nature.includes(selectedCategory);
        });
    }, [agreements, searchQuery, selectedCategory]);

    const stats = useMemo(() => {
        const total = agreements.length;
        const pending = agreements.filter(a => a.currentStatus === 'Đang chờ').length;
        const inProgress = agreements.filter(a => a.currentStatus === 'Đang thực hiện').length;
        const completed = agreements.filter(a => a.currentStatus === 'Hoàn thành').length;
        const failed = agreements.filter(a => a.currentStatus === 'Thất bại').length;
        return { total, pending, inProgress, completed, failed };
    }, [agreements]);

    const getNatureColor = (nature: string) => {
        switch (nature) {
            case 'Tình cảm': return { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' };
            case 'Giao dịch': return { bg: 'bg-wuxia-gold/10', border: 'border-wuxia-gold/30', text: 'text-wuxia-gold' };
            case 'Cá cược': return { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' };
            case 'Báo thù': return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' };
            case 'Cam kết': return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' };
            case 'Tự nguyện': return { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' };
            default: return { bg: 'bg-wuxia-gold/10', border: 'border-wuxia-gold/30', text: 'text-wuxia-gold' };
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Đang chờ': return <Clock className="w-3 h-3" />;
            case 'Sắp diễn ra': return <Clock className="w-3 h-3 animate-pulse" />;
            case 'Đang thực hiện': return <Shield className="w-3 h-3" />;
            case 'Hoàn thành': return <Shield className="w-3 h-3 text-green-400" />;
            case 'Thất bại': return <X className="w-3 h-3" />;
            case 'Hủy bỏ': return <X className="w-3 h-3" />;
            default: return <Clock className="w-3 h-3" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Đang chờ': return 'text-yellow-400';
            case 'Sắp diễn ra': return 'text-orange-400';
            case 'Đang thực hiện': return 'text-blue-400';
            case 'Hoàn thành': return 'text-green-400';
            case 'Thất bại': return 'text-red-400';
            case 'Hủy bỏ': return 'text-gray-400';
            default: return 'text-gray-400';
        }
    };

    const currentItem = filteredAgreements[selectedIdx];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-0 md:p-4 font-sans overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-wuxia-gold/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-wuxia-gold/15 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className={`relative w-full max-w-6xl h-[85vh] glass-panel flex flex-col shadow-[0_0_150px_rgba(0,0,0,0.95)] overflow-hidden rounded-[3rem] border border-wuxia-gold/25`}>
                {/* Wuxia Decorative Corners */}
                <div className="wuxia-corner wuxia-corner-tl !border-wuxia-gold/60 !w-24 !h-24"></div>
                <div className="wuxia-corner wuxia-corner-tr !border-wuxia-gold/60 !w-24 !h-24"></div>
                <div className="wuxia-corner wuxia-corner-bl !border-wuxia-gold/60 !w-24 !h-24"></div>
                <div className="wuxia-corner wuxia-corner-br !border-wuxia-gold/60 !w-24 !h-24"></div>

                {/* Header */}
                <header className="h-16 shrink-0 bg-black/60 border-b border-white/5 px-6 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-wuxia-gold/5 border border-wuxia-gold/20 w-10 h-10 flex items-center justify-center rounded-xl">
                            <Scroll className="w-5 h-5 text-wuxia-gold/80" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-black text-wuxia-gold tracking-[0.3em] uppercase drop-shadow-lg">
                                Ước Hẹn
                            </h2>
                            <p className="text-[10px] text-white/30 tracking-[0.2em] -mt-0.5">QUÂN TỬ</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Stats */}
                        <div className="flex items-center gap-4 bg-black/40 border border-white/10 px-4 py-2 rounded-xl">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-yellow-400" />
                                <span className="text-[10px] text-white/40 font-bold uppercase">Chờ</span>
                                <span className="text-[11px] font-mono text-yellow-400">{stats.pending}</span>
                            </div>
                            <div className="h-4 w-px bg-white/10"></div>
                            <div className="flex items-center gap-1.5">
                                <Shield className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-[10px] text-white/40 font-bold uppercase">Xong</span>
                                <span className="text-[11px] font-mono text-green-400">{stats.completed}</span>
                            </div>
                            <div className="h-4 w-px bg-white/10"></div>
                            <div className="flex items-center gap-1.5">
                                <X className="w-3.5 h-3.5 text-red-400" />
                                <span className="text-[10px] text-white/40 font-bold uppercase">Thất</span>
                                <span className="text-[11px] font-mono text-red-400">{stats.failed}</span>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/[0.02] border border-white/10 pl-9 pr-4 py-1.5 text-xs text-white w-44 focus:outline-none focus:border-wuxia-gold/20 placeholder:text-white/10 rounded-2xl"
                            />
                        </div>

                        {/* Close */}
                        <button 
                            onClick={onClose}
                            className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-red-500/30 hover:border-red-500/60 rounded-2xl transition-all"
                        >
                            <X className="w-6 h-6" strokeWidth={2.5} />
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex overflow-hidden">
                    {/* Sidebar: Categories */}
                    <aside className="w-52 bg-black/40 border-r border-white/5 overflow-y-auto no-scrollbar">
                        <div className="flex flex-col p-4 gap-1 h-full">
                            {categories.map((cat) => {
                                const isSelected = selectedCategory === cat.id;
                                const Icon = cat.icon;
                                
                                const count = agreements.filter(a => {
                                    if (cat.id === 'Tất cả') return true;
                                    const nature = a.nature || (a as any).nature?.toString() || '';
                                    return nature.includes(cat.id);
                                }).length;

                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`wuxia-list-item flex items-center gap-3 p-3 transition-all ${
                                            isSelected 
                                                ? 'active text-wuxia-gold shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]' 
                                                : 'text-white/40 hover:text-white/60'
                                        } w-full mb-1 !rounded-2xl`}
                                    >
                                        <Icon className={`w-4 h-4 transition-colors ${isSelected ? cat.color : 'text-white/20'}`} />
                                        <div className="flex flex-1 items-center justify-between">
                                            <span className={`text-[11px] font-bold uppercase tracking-wider truncate ${isSelected ? cat.color : ''}`}>
                                                {cat.label}
                                            </span>
                                            <span className={`text-[9px] font-mono ${isSelected ? 'text-wuxia-gold/60' : 'opacity-20'}`}>
                                                {count}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Content: Appointments Grid */}
                    <section className="flex-1 flex flex-col min-w-0 bg-black/10">
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                            {filteredAgreements.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredAgreements.map((agree, idx) => {
                                        const isSelected = idx === selectedIdx;
                                        const nature = agree.nature || (agree as any).nature?.toString() || 'Cam kết';
                                        const colors = getNatureColor(nature);
                                        const target = (agree as any).target;
                                        
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedIdx(idx)}
                                                className={`group relative bg-white/[0.04] border p-5 flex flex-col gap-3 transition-all rounded-[2rem] text-left ${
                                                    isSelected 
                                                        ? `${colors.border} ${colors.bg} shadow-[0_0_30px_rgba(212,175,55,0.1)]` 
                                                        : 'border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                                                }`}
                                            >
                                                {/* Nature Badge */}
                                                <div className="flex justify-between items-start">
                                                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${colors.border} ${colors.bg} ${colors.text}`}>
                                                        {nature}
                                                    </span>
                                                    <div className={`flex items-center gap-1 ${getStatusColor(agree.currentStatus)}`}>
                                                        {getStatusIcon(agree.currentStatus)}
                                                        <span className="text-[9px] font-bold uppercase">{agree.currentStatus}</span>
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h4 className={`text-sm font-bold truncate leading-tight ${isSelected ? colors.text : 'text-white'}`}>
                                                    {agree.title}
                                                </h4>

                                                {/* Target */}
                                                {target?.name && (
                                                    <div className="flex items-center gap-2 text-[10px] text-white/40">
                                                        <Users className="w-3 h-3" />
                                                        <span className="font-medium">{target.name}</span>
                                                        <span className="opacity-50">•</span>
                                                        <span className="capitalize">{target.type || 'npc'}</span>
                                                    </div>
                                                )}

                                                {/* Location & Time */}
                                                <div className="flex flex-col gap-1 text-[9px] text-white/30 mt-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="w-3 h-3" />
                                                        <span className="truncate">{agree.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3 h-3" />
                                                        <span className="font-mono">{agree.time}</span>
                                                    </div>
                                                </div>

                                                {/* Arrow indicator */}
                                                <ChevronRight className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform ${
                                                    isSelected ? 'text-wuxia-gold rotate-90' : 'text-white/20 opacity-0 group-hover:opacity-100'
                                                }`} />
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 border border-wuxia-gold/20 flex items-center justify-center mb-6 bg-wuxia-gold/5 rounded-3xl">
                                        <Scroll className="w-10 h-10 text-wuxia-gold/30" />
                                    </div>
                                    <h3 className="text-sm font-serif font-bold text-white/40 tracking-[0.3em] uppercase">
                                        Chưa có ước hẹn
                                    </h3>
                                    <p className="text-[10px] text-white/20 mt-3 max-w-xs">
                                        Quân tử giữ lời, hảo cảm vạn ba
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Detail Panel */}
                    <aside className="w-[380px] bg-black/40 border-l border-white/5 overflow-y-auto custom-scrollbar p-6">
                        {currentItem ? (
                            <div className="flex flex-col gap-4">
                                {/* Nature & Status */}
                                <div className="flex justify-between items-center">
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-xl border ${
                                        getNatureColor(currentItem.nature || 'Cam kết').bg
                                    } ${
                                        getNatureColor(currentItem.nature || 'Cam kết').border
                                    } ${
                                        getNatureColor(currentItem.nature || 'Cam kết').text
                                    }`}>
                                        {currentItem.nature || 'Cam kết'}
                                    </span>
                                    <span className={`text-[10px] font-bold uppercase flex items-center gap-1 ${
                                        getStatusColor(currentItem.currentStatus)
                                    }`}>
                                        {getStatusIcon(currentItem.currentStatus)}
                                        {currentItem.currentStatus}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-serif font-bold text-wuxia-gold tracking-wide text-center">
                                    {currentItem.title}
                                </h3>

                                {/* Target */}
                                {(currentItem as any).target && (
                                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                                        <p className="text-[9px] text-white/30 uppercase tracking-wider mb-2">Đối tượng</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-wuxia-gold/10 border border-wuxia-gold/20 flex items-center justify-center">
                                                <Users className="w-6 h-6 text-wuxia-gold/60" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{(currentItem as any).target?.name || 'Không xác định'}</p>
                                                <p className="text-[10px] text-white/40 capitalize">{(currentItem as any).target?.type || 'npc'} • {(currentItem as any).target?.lifeStatus || 'Alive'}</p>
                                                {(currentItem as any).target?.faction && (
                                                    <p className="text-[9px] text-white/30">{(currentItem as any).target?.faction}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Oath Content */}
                                <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                                    <p className="text-[9px] text-white/30 uppercase tracking-wider mb-2">Nội dung</p>
                                    <p className="text-sm text-white/80 italic leading-relaxed font-serif">
                                        "{currentItem.oathContent}"
                                    </p>
                                </div>

                                {/* Time & Location */}
                                <div className="flex gap-3">
                                    <div className="flex-1 bg-white/[0.02] border border-white/10 p-3 rounded-xl">
                                        <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1">Thời gian</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <Clock className="w-4 h-4 text-wuxia-gold/60" />
                                            <span className="text-sm font-mono">{currentItem.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-white/[0.02] border border-white/10 p-3 rounded-xl">
                                        <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1">Địa điểm</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <MapPin className="w-4 h-4 text-wuxia-gold/60" />
                                            <span className="text-sm truncate">{currentItem.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Consequences */}
                                <div className="space-y-2">
                                    {(currentItem as any).fulfillmentConsequence && (
                                        <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-xl">
                                            <p className="text-[9px] text-green-400 uppercase tracking-wider mb-1">Nếu giữ lời</p>
                                            <p className="text-xs text-white/70">
                                                {(currentItem as any).fulfillmentConsequence}
                                            </p>
                                        </div>
                                    )}
                                    {(currentItem as any).failureConsequence && (
                                        <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-xl">
                                            <p className="text-[9px] text-red-400 uppercase tracking-wider mb-1">Nếu phá lời</p>
                                            <p className="text-xs text-white/70">
                                                {(currentItem as any).failureConsequence}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Background Story (if any) */}
                                {(currentItem as any).backgroundStory && (
                                    <div className="bg-wuxia-gold/5 border border-wuxia-gold/10 p-3 rounded-xl">
                                        <p className="text-[9px] text-wuxia-gold/60 uppercase tracking-wider mb-1">Ngữ cảnh</p>
                                        <p className="text-xs text-white/50 italic">
                                            {(currentItem as any).backgroundStory}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <BookOpen className="w-12 h-12 text-wuxia-gold/20 mb-4" />
                                <p className="text-sm text-white/30 font-serif italic">
                                    Chọn một ước hẹn để xem chi tiết
                                </p>
                            </div>
                        )}
                    </aside>
                </main>

                {/* Footer */}
                <footer className="shrink-0 bg-black/60 border-t border-white/5 px-6 py-3 flex items-center justify-between relative z-10">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wuxia-gold/20 to-transparent"></div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Scroll className="w-3.5 h-3.5 text-white/20" />
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Tổng</span>
                            <span className="text-[11px] font-mono font-bold text-wuxia-gold/80">{stats.total}</span>
                        </div>
                        <div className="h-4 w-px bg-white/5"></div>
                        <div className="text-[9px] text-white/20 italic font-serif">
                            "Lời hứa như gánh nặng, giữ được là nam nhân"
                        </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-30 group cursor-default">
                        <Sparkle className="w-3 h-3 text-wuxia-gold" />
                        <p className="text-[9px] font-serif italic text-white/40 tracking-[0.3em] uppercase">
                            Ước Hẹn Quân Tử • Tín Nghĩa
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AgreementModal;