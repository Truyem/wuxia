
import React, { useState, useMemo } from 'react';
import { 
    X, 
    Swords, 
    Zap, 
    Shield, 
    Clock, 
    Target, 
    Flame, 
    ScrollText, 
    Trophy, 
    Activity, 
    BookOpen,
    Lock,
    Unlock,
    ChevronRight,
    Search,
    Sparkles,
    Dna,
    ZapOff,
    Wind,
    Info
} from 'lucide-react';
import { KungfuStructure, KungfuQuality } from '../../../models/kungfu';

interface Props {
    skills: KungfuStructure[];
    onClose: () => void;
}

const KungfuModal: React.FC<Props> = ({ skills, onClose }) => {
    const safeSkills = Array.isArray(skills) ? skills : [];
    const [selectedId, setSelectedId] = useState<string | null>(
        safeSkills.length > 0 ? safeSkills[0]['ID'] : null
    );
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSkills = useMemo(() => {
        return safeSkills.filter(skill => 
            (skill['Name'] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (skill['Type'] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (skill['Quality'] || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [safeSkills, searchTerm]);

    const currentSkill = safeSkills.find(s => s['ID'] === selectedId);

    const getQualityStyles = (quality: KungfuQuality) => {
        switch (quality) {
            case 'Phàm phẩm': 
                return {
                    text: 'text-stone-400',
                    border: 'border-stone-700/50',
                    bg: 'bg-stone-900/40',
                    accent: 'bg-stone-500',
                    glow: 'shadow-stone-900/20'
                };
            case 'Lương phẩm': 
                return {
                    text: 'text-emerald-400',
                    border: 'border-emerald-900/30',
                    bg: 'bg-emerald-950/20',
                    accent: 'bg-emerald-500',
                    glow: 'shadow-emerald-500/10'
                };
            case 'Thượng phẩm': 
                return {
                    text: 'text-blue-400',
                    border: 'border-blue-900/30',
                    bg: 'bg-blue-950/20',
                    accent: 'bg-blue-500',
                    glow: 'shadow-blue-500/10'
                };
            case 'Cực phẩm': 
                return {
                    text: 'text-purple-400',
                    border: 'border-purple-900/30',
                    bg: 'bg-purple-950/20',
                    accent: 'bg-purple-500',
                    glow: 'shadow-purple-500/10'
                };
            case 'Tuyệt thế': 
                return {
                    text: 'text-orange-400',
                    border: 'border-orange-900/30',
                    bg: 'bg-orange-950/20',
                    accent: 'bg-orange-500',
                    glow: 'shadow-orange-500/20'
                };
            case 'Truyền thuyết': 
                return {
                    text: 'text-amber-400',
                    border: 'border-amber-900/50',
                    bg: 'bg-amber-950/30',
                    accent: 'bg-amber-500',
                    glow: 'shadow-amber-500/30'
                };
            default: 
                return {
                    text: 'text-stone-500',
                    border: 'border-stone-800',
                    bg: 'bg-stone-900/20',
                    accent: 'bg-stone-700',
                    glow: 'shadow-transparent'
                };
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Active': return <Swords className="w-4 h-4" />;
            case 'Passive': return <Shield className="w-4 h-4" />;
            case 'Inner Kungfu': return <Zap className="w-4 h-4" />;
            case 'Movement': return <Wind className="w-4 h-4" />;
            default: return <Sparkles className="w-4 h-4" />;
        }
    };

    const StatItem = ({ icon: Icon, label, value, colorClass = "text-stone-400" }: { icon: any, label: string, value: string | number, colorClass?: string }) => (
        <div className="flex flex-col gap-1 p-3 rounded-lg bg-stone-900/40 border border-stone-800/50 hover:bg-stone-900/60 transition-colors">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-stone-500 font-bold">
                <Icon className="w-3 h-3" />
                <span>{label}</span>
            </div>
            <div className={`text-sm font-mono font-bold ${colorClass}`}>
                {value}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[220] flex items-center justify-center p-4 md:p-8 font-sans">
            {/* Main Modal Container */}
            <div className="glass-panel-square border border-white/10 w-full max-w-7xl h-full max-h-[850px] flex flex-col shadow-2xl rounded-none overflow-hidden relative text-stone-300">
                {/* Wuxia Decorative Corners */}
                <div className="wuxia-corner wuxia-corner-tl"></div>
                <div className="wuxia-corner wuxia-corner-tr"></div>
                <div className="wuxia-corner wuxia-corner-bl"></div>
                <div className="wuxia-corner wuxia-corner-br"></div>
                
                {/* Cyberpunk Decorative Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1c1917_0%,#0c0a09_100%)]" />
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/5 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_0%_100%,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
                    
                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
                </div>

                {/* Header */}
                <header className="h-20 shrink-0 border-b border-stone-800 bg-stone-900/50 backdrop-blur-md flex items-center justify-between px-8 z-10 relative">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-none bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-500 rounded-none shadow-[0_0_8px_rgba(245,158,11,1)]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-stone-100 bg-gradient-to-r from-stone-100 to-stone-400 bg-clip-text text-transparent">
                                Võ Học Tâm Pháp
                            </h2>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className="h-[1px] w-6 bg-amber-500/50" />
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-500">Kỹ năng & Tuyệt kỹ</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 group-focus-within:text-amber-500 transition-colors" />
                            <input 
                                type="text"
                                placeholder="Tìm kiếm công pháp..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-none pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 w-64 transition-all"
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2.5 rounded-none bg-white/5 border border-white/10 hover:border-amber-500/50 text-stone-500 hover:text-amber-500 transition-all duration-300 group"
                        >
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden z-10 relative">
                    {/* Left Panel: Skill List */}
                    <aside className="w-[380px] border-r border-stone-800 bg-black/20 flex flex-col">
                        <div className="p-4 border-b border-stone-800/50 bg-stone-900/20">
                            <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-stone-500 flex items-center gap-2">
                                <Activity className="w-3 h-3" />
                                Danh Sách Công Pháp ({filteredSkills.length})
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            {filteredSkills.map(skill => {
                                const isSelected = selectedId === skill['ID'];
                                const style = getQualityStyles(skill['Quality'] || 'Phàm phẩm' as KungfuQuality);
                                
                                return (
                                    <button
                                        key={skill['ID']}
                                        onClick={() => setSelectedId(skill['ID'])}
                                        className={`w-full text-left rounded-none border p-4 transition-all duration-300 relative group overflow-hidden ${
                                            isSelected 
                                                ? `${style.border} ${style.bg} shadow-lg ring-1 ring-inset ${style.accent}/20` 
                                                : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.05]"
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2 relative z-10">
                                            <span className={`font-bold tracking-wide transition-colors ${isSelected ? 'text-stone-100' : 'text-stone-400 group-hover:text-stone-300'}`}>
                                                {skill['Name']}
                                            </span>
                                            <span className={`text-[9px] px-2 py-0.5 rounded-none uppercase font-black tracking-tighter border ${style.text} ${style.border}`}>
                                                {skill['Quality']}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-[10px] text-stone-500 font-bold mb-3 relative z-10">
                                            <div className="flex items-center gap-1.5">
                                                {getTypeIcon(skill['Type'])}
                                                <span className="uppercase tracking-widest">{skill['Type']}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 font-mono">
                                                <ChevronRight className="w-3 h-3 text-amber-500" />
                                                <span>TẦNG {skill['Current level/tier']}</span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-1 relative z-10">
                                            <div className="flex justify-between text-[8px] text-stone-600 font-black uppercase tracking-widest">
                                                <span>TIẾN ĐỘ</span>
                                                <span>{Math.round((skill['Current proficiency'] / skill['Level-up experience']) * 100)}%</span>
                                            </div>
                                            <div className="h-1 bg-black/40 rounded-none overflow-hidden border border-stone-800">
                                                <div 
                                                    className={`h-full transition-all duration-700 ease-out ${isSelected ? style.accent : 'bg-stone-700'}`}
                                                    style={{ width: `${Math.min((skill['Current proficiency'] / skill['Level-up experience']) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Selected Indicator Glow */}
                                        {isSelected && (
                                            <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2 ${style.accent}`} />
                                        )}
                                    </button>
                                );
                            })}

                            {filteredSkills.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 text-stone-600 opacity-50">
                                    <ZapOff className="w-12 h-12 mb-3 stroke-1" />
                                    <p className="text-xs uppercase tracking-[0.2em] font-bold">Không tìm thấy công pháp</p>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Right Panel: Detail View */}
                    <main className="flex-1 flex flex-col bg-stone-950/20 overflow-y-auto custom-scrollbar relative">
                        {currentSkill ? (
                            <div className="p-8 space-y-8">
                                {/* Header Section */}
                                <section className="relative">
                                    <div className="flex justify-between items-start gap-8">
                                        <div className="space-y-4 flex-1">
                                            <div className="flex items-center gap-4">
                                                <h1 className="text-4xl font-black uppercase tracking-tighter text-stone-100">
                                                    {currentSkill['Name']}
                                                </h1>
                                                <div className={`px-3 py-1 rounded-none text-[10px] font-black uppercase tracking-[0.2em] border ${getQualityStyles(currentSkill['Quality'] as KungfuQuality).text} ${getQualityStyles(currentSkill['Quality'] as KungfuQuality).border} ${getQualityStyles(currentSkill['Quality'] as KungfuQuality).bg}`}>
                                                    {currentSkill['Quality']}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-900/50 border border-stone-800 rounded text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                                    {getTypeIcon(currentSkill['Type'])}
                                                    <span>{currentSkill['Type']}</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-900/50 border border-stone-800 rounded text-stone-100 text-[10px] font-mono font-bold tracking-[0.1em]">
                                                    <span className="text-amber-500 text-[8px]">LV.</span>
                                                    {currentSkill['Current level/tier']}
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-900/50 border border-stone-800 rounded text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                                    <BookOpen className="w-3 h-3 text-stone-500" />
                                                    <span>Nguồn: {currentSkill['Source'] || 'Vô Danh'}</span>
                                                </div>
                                            </div>

                                            <div className="relative group">
                                                <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-amber-500/30" />
                                                <p className="text-stone-400 text-sm leading-relaxed font-medium italic pl-4 py-2 border-l border-amber-500/10 bg-amber-500/5 rounded-none">
                                                    "{currentSkill['Description']}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Combat Stats Divider */}
                                {currentSkill['Type'] !== 'Passive' && currentSkill['Type'] !== 'Inner Kungfu' && (
                                    <section className="space-y-4">
                                        <h4 className="text-[10px] text-stone-500 font-black uppercase tracking-[0.3em] flex items-center gap-4">
                                            <Swords className="w-3 h-3" />
                                            <span>Thông Số Kỹ Chiến</span>
                                            <div className="h-[1px] flex-1 bg-stone-800" />
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <StatItem icon={Flame} label="Sát Thương Cơ Bản" value={currentSkill['Base damage'] || 0} colorClass="text-amber-400" />
                                            <StatItem icon={Dna} label="Hệ Số Cộng Thêm" value={`x${currentSkill['Bonus coefficient'] || 0}`} colorClass="text-stone-100" />
                                            <StatItem icon={Clock} label="Vận Công" value={`${currentSkill['Casting time'] || 0}s`} colorClass="text-blue-400" />
                                            <StatItem icon={Clock} label="Hồi Chiêu" value={`${currentSkill['Cooldown time'] || 0}s`} colorClass="text-rose-400" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-stone-900/40 border border-stone-800 p-4 rounded-none flex justify-between items-center group hover:bg-stone-900/60 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-none bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
                                                        <Zap className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] text-stone-500 uppercase tracking-widest font-black">Tiêu Hao</span>
                                                        <div className="text-xs font-bold text-stone-300">{currentSkill['Consumption type'] || 'Không'}</div>
                                                    </div>
                                                </div>
                                                <div className="text-2xl font-mono font-bold text-rose-500">{currentSkill['Consumption value'] || 0}</div>
                                            </div>
                                            <div className="bg-stone-900/40 border border-stone-800 p-4 rounded-none flex justify-between items-center group hover:bg-stone-900/60 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-none bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500">
                                                        <Target className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] text-stone-500 uppercase tracking-widest font-black">Mục Tiêu</span>
                                                        <div className="text-xs font-bold text-stone-300">{currentSkill['Target Type'] || 'Đơn thể'}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-mono font-bold text-stone-100">{currentSkill['Max target count'] || 1}</div>
                                                    <div className="text-[8px] text-stone-600 uppercase font-black">Mục Tiêu Tối Đa</div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Training Section */}
                                <section className="p-6 rounded-none bg-stone-900/40 border border-stone-800 relative overflow-hidden group">
                                    <div className="flex justify-between items-end mb-4 relative z-10">
                                        <div>
                                            <h4 className="text-stone-100 font-bold text-lg uppercase tracking-tight flex items-center gap-2">
                                                <Activity className="w-5 h-5 text-amber-500" />
                                                Tu Luyện Tầng {currentSkill['Current level/tier']}
                                            </h4>
                                            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em] mt-1">Nâng cấp cảnh giới công pháp</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-mono font-bold text-amber-500">
                                                {currentSkill['Current proficiency']} <span className="text-stone-600 text-sm">/ {currentSkill['Level-up experience']}</span>
                                            </div>
                                            <span className="text-[8px] text-stone-600 uppercase font-black tracking-widest">Kinh nghiệm hiện tại</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-2 bg-black rounded-none overflow-hidden border border-stone-800 p-[1px] relative z-10">
                                        <div 
                                            className="h-full bg-amber-500 rounded-none transition-all duration-1000 ease-out relative"
                                            style={{ width: `${Math.min((currentSkill['Current proficiency'] / currentSkill['Level-up experience']) * 100, 100)}%` }}
                                        >
                                            {/* Removed shimmer highlight */}
                                        </div>
                                    </div>

                                    {currentSkill['Breakthrough condition'] && currentSkill['Breakthrough condition'] !== "None" && (
                                        <div className="mt-4 flex items-center gap-3 p-3 bg-rose-500/5 border border-rose-500/20 rounded-none relative z-10">
                                            <Lock className="w-4 h-4 text-rose-500" />
                                            <div className="text-xs text-rose-400">
                                                <span className="font-black uppercase tracking-widest mr-2 text-[9px]">Điểu kiện đột phá:</span>
                                                <span className="font-medium italic">{currentSkill['Breakthrough condition']}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Sub background pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />
                                </section>

                                {/* Effects Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Side Effects */}
                                    {Array.isArray(currentSkill['Side effect']) && currentSkill['Side effect'].length > 0 && (
                                        <section className="space-y-4">
                                            <h4 className="text-[10px] text-stone-500 font-black uppercase tracking-[0.3em] flex items-center gap-4">
                                                <Sparkles className="w-3 h-3 text-emerald-500" />
                                                <span>Hiệu Ứng Chiêu Thức</span>
                                                <div className="h-[1px] flex-1 bg-stone-800" />
                                            </h4>
                                            <div className="space-y-3">
                                                {currentSkill['Side effect'].map((eff: any, i: number) => (
                                                    <div key={i} className="p-4 rounded-none bg-stone-900/40 border-l-2 border-l-emerald-500 border-y border-r border-stone-800 hover:bg-stone-900/60 transition-all">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h5 className="text-emerald-400 font-bold text-sm uppercase tracking-wide">{eff['Tên'] || eff['name'] || 'Hiệu ứng'}</h5>
                                                            <div className="px-2 py-0.5 rounded-none bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-500">
                                                                {eff['Xác suất kích hoạt'] || eff['triggerChance'] || 0}% TỶ LỆ
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock className="w-3 h-3" />
                                                                <span>Duy trì: <span className="text-stone-300 font-mono">{eff['Thời gian duy trì'] || eff['duration'] || 0}s</span></span>
                                                            </div>
                                                            {(eff['Tham số giá trị'] || eff['valueParam'] || 0) > 0 && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <Activity className="w-3 h-3" />
                                                                    <span>Cường độ: <span className="text-amber-500 font-mono">{eff['Tham số giá trị'] || eff['valueParam']}</span></span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Passive Bonuses */}
                                    {Array.isArray(currentSkill['Passive correction']) && currentSkill['Passive correction'].length > 0 && (
                                        <section className="space-y-4">
                                            <h4 className="text-[10px] text-stone-500 font-black uppercase tracking-[0.3em] flex items-center gap-4">
                                                <Dna className="w-3 h-3 text-blue-500" />
                                                <span>Thuộc Tính Cộng Thêm</span>
                                                <div className="h-[1px] flex-1 bg-stone-800" />
                                            </h4>
                                            <div className="p-4 rounded-none bg-stone-900/40 border border-stone-800 space-y-3">
                                                {currentSkill['Passive correction'].map((mod: any, i: number) => (
                                                    <div key={i} className="flex justify-between items-center py-1 group/stat">
                                                        <span className="text-stone-400 text-xs font-bold uppercase tracking-widest group-hover/stat:text-stone-200 transition-colors">
                                                            {mod['Tên thuộc tính'] || mod['propertyName']}
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-[1px] w-8 bg-stone-800" />
                                                            <span className="text-blue-400 font-mono font-bold text-sm">
                                                                {mod['Giá trị'] || mod['value'] > 0 ? '+' : ''}{mod['Giá trị'] || mod['value']}{mod['Loại'] === 'Phần trăm' || mod['type'] === 'Phần trăm' ? '%' : ''}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>

                                {/* Unlock Tiers */}
                                {Array.isArray(currentSkill['Realm special effects']) && currentSkill['Realm special effects'].length > 0 && (
                                    <section className="space-y-6">
                                        <h4 className="text-[10px] text-stone-500 font-black uppercase tracking-[0.3em] flex items-center gap-4">
                                            <Trophy className="w-3 h-3 text-amber-500" />
                                            <span>Cảnh Giới Công Pháp</span>
                                            <div className="h-[1px] flex-1 bg-stone-800" />
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {currentSkill['Realm special effects'].map((eff: any, i: number) => {
                                                const unlockLevel = eff['Tầng mở khóa'] || eff['unlockLevel'] || 0;
                                                const isUnlocked = currentSkill['Current level/tier'] >= unlockLevel;
                                                return (
                                                    <div 
                                                        key={i}
                                                        className={`p-5 rounded-none border flex gap-5 transition-all duration-500 relative overflow-hidden ${
                                                            isUnlocked 
                                                                ? "bg-amber-500/5 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.05)]" 
                                                                : "bg-stone-900/10 border-stone-800/50 opacity-40"
                                                        }`}
                                                    >
                                                        <div className={`shrink-0 flex flex-col items-center justify-center w-14 border-r ${isUnlocked ? 'border-amber-500/20 text-amber-500' : 'border-stone-800 text-stone-600'}`}>
                                                            <span className="text-2xl font-black font-mono leading-none">{unlockLevel}</span>
                                                            <span className="text-[7px] uppercase font-black tracking-widest mt-1">Tầng</span>
                                                        </div>
                                                        <div className="flex-1 space-y-1">
                                                            <div className="flex justify-between items-center">
                                                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isUnlocked ? 'text-amber-500' : 'text-stone-600'}`}>
                                                                    {isUnlocked ? 'Tuyệt kỹ khai mở' : 'Chưa đạt yêu cầu'}
                                                                </span>
                                                                {isUnlocked ? <Unlock className="w-3 h-3 text-amber-500" /> : <Lock className="w-3 h-3 text-stone-700" />}
                                                            </div>
                                                            <p className={`text-sm leading-relaxed ${isUnlocked ? 'text-stone-200' : 'text-stone-600'} italic`}>
                                                                "{eff['Mô tả'] || eff['description']}"
                                                            </p>
                                                        </div>
                                                        
                                                        {isUnlocked && (
                                                            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                                                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-500/20 to-transparent" />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-stone-600 space-y-4">
                                <div className="p-8 rounded-none bg-stone-900/20 border border-stone-800/50 relative">
                                    <Info className="w-12 h-12 stroke-1 opacity-20" />
                                    <div className="absolute inset-0 rounded-none border border-amber-500/10" />
                                </div>
                                <div className="text-center space-y-1">
                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-stone-500">Thông tin võ học</h4>
                                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Vui lòng chọn một tuyệt học từ danh sách bên trái</p>
                                </div>
                            </div>
                        )}
                    </main>
                </div>

                {/* Footer / HUD Info */}
                <footer className="h-10 shrink-0 border-t border-stone-800 bg-stone-900/80 backdrop-blur-sm flex items-center justify-between px-8 z-10 relative">
                    <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-none bg-amber-500" />
                            <span>Trạng thái tủy luyện: Ổn định</span>
                        </div>
                        <div className="h-3 w-[1px] bg-stone-800" />
                        <div className="flex items-center gap-2">
                            <Activity className="w-3 h-3 text-blue-500" />
                            <span>Chân khí vận hành bình thường</span>
                        </div>
                    </div>
                    <div className="text-[9px] font-mono text-stone-600 flex items-center gap-2">
                        <span className="text-amber-500/50">WUXIA_OS_V2.0</span>
                        <span className="opacity-30">|</span>
                        <span>SESSION_ACTIVE</span>
                    </div>
                </footer>
            </div>
            
            {/* Global Shimmer Animation */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #292524;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #44403C;
                }
            `}</style>
        </div>
    );
};

export default KungfuModal;
