
import React, { useState } from 'react';
import { DetailedSectStructure, SectTask, positionLevelOrder, SectTaskStatus } from '../../../models/sect';

interface Props {
    sectData: DetailedSectStructure;
    currentTime: string;
    onAcceptTask?: (task: SectTask) => void;
    onExchange?: (goodsId: string) => void;
    onClose: () => void;
}

type Tab = 'hall' | 'missions' | 'exchange' | 'members';

const GlassCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = "", onClick }) => (
    <div 
        onClick={onClick}
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.06] hover:border-wuxia-gold/30 group ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
    </div>
);

const SectModal: React.FC<Props> = ({ sectData, currentTime, onClose, onAcceptTask, onExchange }) => {
    const [activeTab, setActiveTab] = useState<Tab>('hall');
    const [missionFilter, setMissionFilter] = useState<'all' | 'active' | 'available'>('all');

    const isTimeAfter = (t1: string, t2: string) => t1 > t2;

    const getMissionStatusColor = (status: SectTaskStatus) => {
        switch (status) {
            case 'Có thể tiếp nhận': return 'text-green-400 border-green-500/30 bg-green-500/5';
            case 'Đang thực hiện': return 'text-wuxia-gold border-wuxia-gold/30 bg-wuxia-gold/5';
            case 'Đã hoàn thành': return 'text-gray-400 border-gray-600/30 bg-gray-600/5';
            case 'Đã quá hạn': return 'text-red-500 border-red-500/30 bg-red-500/5';
            default: return 'text-gray-500 border-gray-600/20';
        }
    };

    const filteredMissions = sectData.taskList.filter(m => {
        if (missionFilter === 'all') return true;
        if (missionFilter === 'active') return m.currentStatus === 'Đang thực hiện';
        if (missionFilter === 'available') return m.currentStatus === 'Có thể tiếp nhận';
        return true;
    });

    const getSafeVal = (obj: any, keys: string[], defaultVal: any = "Trống") => {
        for (const key of keys) {
            if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
        }
        return defaultVal;
    };

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[220] flex items-center justify-center p-2 md:p-8 font-sans overflow-hidden">
            <div className="w-full max-w-6xl h-[95vh] md:h-[85vh] flex flex-col relative glass-panel border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden">
                {/* Wuxia Decorative Corners */}
                <div className="wuxia-corner wuxia-corner-tl"></div>
                <div className="wuxia-corner wuxia-corner-tr"></div>
                <div className="wuxia-corner wuxia-corner-bl"></div>
                <div className="wuxia-corner wuxia-corner-br"></div>
                
                {/* Decorative Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wuxia-gold/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wuxia-gold/12 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3" />
                </div>

                {/* Header */}
                <div className="min-h-20 shrink-0 border-b border-white/10 bg-white/5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 md:py-0 z-10 gap-4 md:gap-0">
                    <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-wuxia-gold/20 to-transparent border border-wuxia-gold/30 flex items-center justify-center shadow-lg shadow-wuxia-gold/5 shrink-0">
                            <span className="text-2xl md:text-3xl font-serif font-bold text-wuxia-gold drop-shadow-md">
                                {sectData.name[0]}
                            </span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-wuxia-gold font-serif font-bold text-xl md:text-3xl tracking-[0.1em] md:tracking-[0.2em] drop-shadow-lg uppercase leading-tight truncate">
                                {sectData.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-[12px] text-gray-400 font-mono mt-2 uppercase tracking-wider md:tracking-widest font-bold">
                                <span>Ngân quỹ: <span className="text-wuxia-gold">{getSafeVal(sectData, ['sectFunds', 'Funds'])}</span></span>
                                <span>Tài nguyên: <span className="text-wuxia-cyan">{getSafeVal(sectData, ['sectMaterials', 'Materials'])}</span></span>
                                <span>Cấp độ: <span className="text-gray-300">{getSafeVal(sectData, ['constructionProgress', 'Progress'])}%</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 w-full md:w-auto border-t border-white/5 md:border-t-0 pt-3 md:pt-0">
                        <div className="text-left md:text-right">
                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Chức Vị</div>
                            <div className="text-wuxia-cyan font-bold font-serif text-sm md:text-lg tracking-wide uppercase">{getSafeVal(sectData, ['playerPosition', 'Position'])}</div>
                        </div>
                        <div className="text-right border-l border-white/10 pl-4 md:pl-8">
                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Cống Hiến</div>
                            <div className="text-wuxia-gold font-bold font-mono text-sm md:text-xl tracking-tighter">{getSafeVal(sectData, ['playerContribution', 'Contribution'])}</div>
                        </div>
                        <button
                            onClick={onClose}
                            className="group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-ink-black border border-white/10 text-gray-400 hover:text-white transition-all duration-300 overflow-hidden shadow-lg shrink-0 ml-auto md:ml-0"
                        >
                            <div className="absolute inset-0 bg-wuxia-red/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Navigation Sidebar */}
                    <div className="w-full md:w-72 bg-black/20 border-b md:border-b-0 md:border-r border-wuxia-gold/10 flex flex-row md:flex-col py-2 md:py-8 gap-1 md:gap-3 z-10 overflow-x-auto no-scrollbar shrink-0">
                        {[
                            { id: 'hall', label: 'TỔNG ĐÀN', sub: 'Main Hall' },
                            { id: 'missions', label: 'NHIỆM VỤ', sub: 'Missions' },
                            { id: 'exchange', label: 'TRAO ĐỔI', sub: 'Exchange' },
                            { id: 'members', label: 'ĐỆ TỬ', sub: 'Disciples' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`px-4 md:px-8 py-2 md:py-4 text-left transition-all duration-300 relative group flex-shrink-0 md:flex-shrink-1 ${
                                    activeTab === tab.id
                                        ? 'bg-wuxia-gold/5 text-wuxia-gold'
                                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                                }`}
                            >
                                <div className={`absolute left-0 right-0 md:right-auto bottom-0 md:bottom-auto md:top-0 md:w-1 h-0.5 md:h-auto transition-all duration-500 ${activeTab === tab.id ? 'bg-wuxia-gold scale-x-100 md:scale-y-100 shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-transparent scale-x-0 md:scale-y-0'}`} />
                                <div className="font-serif font-bold tracking-[0.1em] text-[10px] md:text-sm uppercase whitespace-nowrap">{tab.label}</div>
                                <div className="hidden md:block text-[10px] opacity-40 font-mono mt-1 tracking-wider">{tab.sub}</div>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 relative overflow-y-auto no-scrollbar p-4 md:p-10 z-10">

                        {/* --- HALL --- */}
                        {activeTab === 'hall' && (
                            <div className="max-w-4xl mx-auto space-y-10">
                                <GlassCard className="p-5 md:p-10 rounded-3xl">
                                    <div className="absolute top-0 right-0 p-4 md:p-6 opacity-5 text-4xl md:text-8xl font-serif font-black select-none pointer-events-none tracking-tighter">
                                        MÔN PHÁI
                                    </div>
                                    <h4 className="text-wuxia-gold font-serif font-bold text-lg md:text-xl mb-4 md:mb-6 flex items-center gap-3 md:gap-4 uppercase">
                                        <span className="w-1 h-6 md:w-1.5 md:h-8 bg-gradient-to-b from-wuxia-gold to-transparent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                                        Mục Tiêu Môn Phái
                                    </h4>
                                    <p className="text-gray-300 font-serif leading-relaxed text-sm md:text-lg indent-6 md:indent-10 italic bg-white/[0.02] p-4 md:p-6 rounded-2xl border border-white/5 border-dashed">
                                        “{sectData.description}”
                                    </p>
                                    <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                                        {(sectData.sectRules || []).map((rule, i) => (
                                            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-wuxia-red/5 border border-wuxia-red/20 rounded-2xl text-wuxia-red/70 text-[10px] md:text-xs font-serif shadow-lg">
                                                <span className="w-1.5 h-1.5 rounded-full bg-wuxia-red" />
                                                Giới Luật {i + 1}: {rule}
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <GlassCard className="p-8 rounded-3xl">
                                        <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                                            <span>Thăng Tiến Chức Vị</span>
                                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                        </h4>
                                        <div className="space-y-4">
                                            {Object.entries(positionLevelOrder)
                                                .sort((a, b) => a[1] - b[1])
                                                .map(([rank, lvl]) => {
                                                    const currentLvl = positionLevelOrder[sectData.playerPosition] || 0;
                                                    const isCurrent = rank === sectData.playerPosition;
                                                    const isPassed = lvl < currentLvl;
                                                    
                                                    if (lvl > currentLvl + 2 || lvl < currentLvl - 1) return null;

                                                    return (
                                                        <div key={rank} className={`flex items-center gap-5 transition-all duration-500 ${isCurrent ? 'opacity-100 translate-x-1' : 'opacity-40'}`}>
                                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-base border shadow-lg ${
                                                                isCurrent ? 'bg-wuxia-gold text-black border-wuxia-gold shadow-wuxia-gold/20' :
                                                                isPassed ? 'bg-gray-800 text-gray-500 border-gray-700' : 'border-white/10 text-gray-700'
                                                            }`}>
                                                                {lvl}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className={`font-serif font-bold tracking-widest uppercase ${isCurrent ? 'text-wuxia-gold text-lg' : 'text-gray-500 text-sm'}`}>
                                                                    {rank}
                                                                </span>
                                                                {isCurrent && <span className="text-[9px] text-wuxia-gold/60 font-mono tracking-widest uppercase font-bold">Vị trí hiện tại</span>}
                                                            </div>
                                                            {isCurrent && <div className="ml-auto w-2.5 h-2.5 rounded-full bg-wuxia-gold shadow-[0_0_8px_rgba(212,175,55,1)]" />}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </GlassCard>

                                    <div className="flex flex-col gap-6">
                                        <GlassCard className="p-6 flex items-center gap-5 rounded-2xl">
                                            <div className="w-14 h-14 rounded-2xl bg-wuxia-gold/10 border border-wuxia-gold/20 flex items-center justify-center text-wuxia-gold">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Uy danh Môn Phái</div>
                                                <div className="text-2xl font-bold font-mono text-white">9,842</div>
                                            </div>
                                        </GlassCard>
                                        <GlassCard className="p-6 flex items-center gap-5 rounded-2xl">
                                            <div className="w-14 h-14 rounded-2xl bg-wuxia-cyan/10 border border-wuxia-cyan/20 flex items-center justify-center text-wuxia-cyan">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Tổng số đệ tử</div>
                                                <div className="text-2xl font-bold font-mono text-white">1,254</div>
                                            </div>
                                        </GlassCard>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- MISSIONS --- */}
                        {activeTab === 'missions' && (
                            <div className="space-y-8">
                                <div className="flex flex-wrap gap-2 md:gap-4 p-2 bg-black/40 rounded-2xl border border-white/5 w-full md:w-fit shadow-xl">
                                    {[
                                        { id: 'all', label: 'TẤT CẢ' },
                                        { id: 'available', label: 'CÓ THỂ NHẬN' },
                                        { id: 'active', label: 'ĐANG THỰC HIỆN' }
                                    ].map(f => (
                                        <button
                                            key={f.id}
                                            onClick={() => setMissionFilter(f.id as any)}
                                            className={`flex-1 md:flex-none px-4 md:px-8 py-2.5 text-[11px] md:text-sm rounded-xl font-bold uppercase tracking-wider md:tracking-widest transition-all duration-300 ${
                                                missionFilter === f.id
                                                    ? 'bg-wuxia-gold text-black shadow-lg shadow-wuxia-gold/20'
                                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.05]'
                                            }`}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {filteredMissions.map(mission => {
                                        const statusColor = getMissionStatusColor(mission.currentStatus);
                                        const isExpired = isTimeAfter(currentTime, mission.deadline) && mission.currentStatus !== 'Đã hoàn thành';

                                        return (
                                            <GlassCard key={mission.id} className="p-4 md:p-8 group rounded-3xl">
                                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
                                                    <div className="space-y-3 md:space-y-4 w-full">
                                                        <div className="flex items-start md:items-center gap-3 md:gap-4">
                                                            <div className={`w-2 h-16 md:w-2.5 md:h-12 rounded-full transition-all duration-500 group-hover:scale-y-110 shrink-0 ${
                                                                mission.currentStatus === 'Có thể tiếp nhận' ? 'bg-green-500' :
                                                                mission.currentStatus === 'Đang thực hiện' ? 'bg-wuxia-gold' : 'bg-gray-600'
                                                            }`} />
                                                            <div className="min-w-0">
                                                                <div className="flex flex-wrap items-center gap-4">
                                                                    <h4 className="text-gray-100 font-bold text-lg md:text-2xl tracking-wide truncate font-serif">{mission.title}</h4>
                                                                    <span className={`text-[9px] md:text-[11px] px-3 py-1 rounded-lg border font-bold uppercase tracking-widest shrink-0 ${statusColor}`}>
                                                                        {isExpired ? 'Đã quá hạn' : mission.currentStatus}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-400 text-sm md:text-base mt-3 max-w-4xl leading-relaxed italic border-l-2 border-white/5 pl-4">
                                                                    “{mission.description}”
                                                                </p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex flex-wrap gap-4 md:gap-8 text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-tighter text-gray-500 ml-4 md:ml-6">
                                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                                <span className="w-1 h-1 rounded-none bg-gray-600" />
                                                                Phát hành: {mission.releaseDate}
                                                            </div>
                                                            <div className={`flex items-center gap-1.5 md:gap-2 ${isExpired ? 'text-wuxia-red' : ''}`}>
                                                                <span className="w-1 h-1 rounded-none bg-current" />
                                                                Hạn chót: {mission.deadline}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start w-full md:w-auto mt-2 md:mt-0 border-t border-white/5 md:border-t-0 pt-3 md:pt-0">
                                                        <div className="space-y-1 md:space-y-2">
                                                            <div className="text-[10px] md:text-[12px] text-gray-500 uppercase font-bold tracking-[0.2em]">Phần thưởng</div>
                                                            <div className="font-mono font-bold text-right">
                                                                <div className="text-wuxia-gold text-sm md:text-lg">+{mission.rewardContribution} PT</div>
                                                                {mission.rewardFunds > 0 && <div className="text-gray-400 text-xs md:text-sm">+{mission.rewardFunds} Đồng</div>}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-0 md:mt-4">
                                                            {mission.currentStatus === 'Có thể tiếp nhận' && !isExpired && (
                                                                <button
                                                                    onClick={() => onAcceptTask && onAcceptTask(mission)}
                                                                    className="px-6 md:px-10 py-3 bg-wuxia-gold/10 hover:bg-wuxia-gold text-wuxia-gold hover:text-black border border-wuxia-gold/50 rounded-2xl text-[11px] md:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-black/40"
                                                                >
                                                                    Tiếp nhận
                                                                </button>
                                                            )}
                                                            {mission.currentStatus === 'Đang thực hiện' && !isExpired && (
                                                                <div className="px-6 md:px-10 py-3 bg-white/5 border border-white/10 text-gray-500 rounded-2xl text-[11px] md:text-sm font-bold uppercase tracking-widest opacity-60">
                                                                    Đang tiến hành...
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {activeTab === 'exchange' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                {sectData.exchangeList.map(good => (
                                    <GlassCard key={good.id} className="p-6 md:p-10 flex flex-col h-full rounded-[2rem]">
                                        <div className="flex justify-between items-start mb-6 md:mb-8">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-wuxia-cyan/20 to-transparent border border-wuxia-cyan/30 flex items-center justify-center text-wuxia-cyan shadow-lg shadow-wuxia-cyan/5 shrink-0">
                                                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            <span className="text-[10px] md:text-[12px] font-mono text-gray-400 bg-black/40 px-4 py-1.5 rounded-xl border border-white/5 uppercase tracking-widest shrink-0 font-bold">
                                                {good.type}
                                            </span>
                                        </div>

                                        <h4 className="text-gray-100 font-bold text-xl md:text-2xl mb-3 md:mb-4 tracking-wide font-serif truncate">{good.itemName}</h4>
                                        <div className="text-[11px] md:text-[13px] text-gray-400 flex items-center gap-3 uppercase tracking-widest font-bold">
                                            Yêu cầu: <span className="text-wuxia-cyan truncate">{good.requiredPosition}</span>
                                        </div>

                                        <div className="mt-auto pt-8 md:pt-10 border-t border-white/5 flex flex-col gap-6 md:gap-8">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-[10px] md:text-[12px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-1">Giá trao đổi</div>
                                                    <div className="text-wuxia-gold font-mono font-black text-2xl md:text-3xl tracking-tighter">{good.exchangePrice} PT</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] md:text-[12px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-1">Kho vật phẩm</div>
                                                    <div className="text-gray-300 font-mono font-bold text-base md:text-lg tracking-tighter">{good.stock} {good.type === 'Kinh Văn' ? 'cuốn' : 'vật'}</div>
                                                </div>
                                            </div>
                                            
                                            {onExchange && (
                                                <button
                                                    onClick={() => onExchange(good.id)}
                                                    className="w-full py-4 md:py-5 bg-wuxia-cyan/10 hover:bg-wuxia-cyan text-wuxia-cyan hover:text-black border border-wuxia-cyan/50 rounded-2xl text-[12px] md:text-sm font-bold uppercase tracking-[0.3em] transition-all duration-300 shadow-xl shadow-black/40 active:scale-95"
                                                >
                                                    Tiến hành Trao đổi
                                                </button>
                                            )}
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        )}

                        {/* --- MEMBERS --- */}
                        {activeTab === 'members' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {sectData.importantMembers.map(mem => (
                                    <GlassCard key={mem.id} className="p-6 md:p-10 group rounded-[2rem]">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                                            <div className={`shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-2xl border flex items-center justify-center text-3xl md:text-5xl font-black font-serif shadow-2xl transition-all duration-500 group-hover:scale-105 ${
                                                mem.gender === 'Nữ' 
                                                    ? 'border-pink-500/30 bg-pink-500/10 text-pink-500 shadow-pink-500/5' 
                                                    : 'border-wuxia-cyan/30 bg-wuxia-cyan/10 text-wuxia-cyan shadow-wuxia-cyan/5'
                                            }`}>
                                                {mem.name[0]}
                                            </div>
                                            <div className="flex-1 space-y-3 md:space-y-4 w-full">
                                                <div className="flex justify-between items-center w-full">
                                                    <h4 className="text-white font-bold text-lg md:text-2xl tracking-wide font-serif truncate">{mem.name}</h4>
                                                    <div className="px-3 md:px-4 py-1 md:py-1.5 bg-wuxia-gold/10 border border-wuxia-gold/30 rounded-lg text-wuxia-gold text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shrink-0">
                                                        {mem.identity}
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-4 md:gap-6 text-[10px] md:text-[12px] text-gray-500 font-mono font-bold uppercase tracking-wider md:tracking-widest">
                                                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-current opacity-30" />{mem.gender}</span>
                                                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-current opacity-30" />{mem.age} Tuổi</span>
                                                    <span className="text-wuxia-cyan font-black border-b border-wuxia-cyan/20 pb-0.5">{mem.realm}</span>
                                                </div>
                                                <p className="text-xs md:text-base text-gray-400 font-serif italic border-t border-white/5 pt-4 md:pt-6 leading-relaxed line-clamp-3 md:line-clamp-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                    “{mem.brief}”
                                                </p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        )}

                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="h-12 md:h-14 shrink-0 bg-ink-black/95 border-t border-wuxia-gold/10 px-6 md:px-10 flex items-center justify-between z-10 text-[10px] md:text-[12px] text-gray-400 font-mono tracking-[0.2em] uppercase overflow-hidden">
                    <div className="flex items-center gap-4 md:gap-6 overflow-hidden w-full">
                        <div className="flex items-center gap-3 shrink-0">
                            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-wuxia-gold shadow-[0_0_12px_rgba(212,175,55,1)]" />
                            <span className="truncate font-bold tracking-widest text-white/80">CẢNH GIỚI VÕ LÂM</span>
                        </div>
                        <span className="opacity-20 text-lg">|</span>
                        <span className="truncate opacity-60">UY DANH MÔN PHÁI CHIẾN TÍCH</span>
                        <div className="ml-auto flex items-center gap-4 text-gray-600">
                            <span className="hidden md:block">Bản quyền 2026</span>
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            <span className="text-wuxia-gold/60">TRANG THÁI TRỰC TUYẾN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectModal;
