import React, { useState } from 'react';
import { DetailedSectStructure, positionLevelOrder, SectTaskStatus } from '../../../models/sect';
import { GameTimeFormat } from '../../../models/world';

interface Props {
    sectData: DetailedSectStructure;
    currentTime: GameTimeFormat;
    onClose: () => void;
}

type Tab = 'hall' | 'missions' | 'exchange' | 'members';

const MobileSect: React.FC<Props> = ({ sectData, currentTime, onClose }) => {
    const [activeTab, setActiveTab] = useState<Tab>('hall');
    const [missionFilter, setMissionFilter] = useState<'all' | 'active' | 'available'>('all');

    const isTimeAfter = (t1: string, t2: string) => t1 > t2;

    const getMissionStatusColor = (status: SectTaskStatus) => {
        switch (status) {
            case 'Có thể tiếp nhận': return 'text-green-400 border-green-500/50';
            case 'Đang thực hiện': return 'text-wuxia-gold border-wuxia-gold/50';
            case 'Đã hoàn thành': return 'text-gray-400 border-gray-600';
            case 'Đã quá hạn': return 'text-red-500 border-red-500';
            default: return 'text-gray-500 border-gray-600';
        }
    };

    const filteredMissions = sectData.taskList.filter(m => {
        if (missionFilter === 'all') return true;
        if (missionFilter === 'active') return m.currentStatus === 'Đang thực hiện';
        if (missionFilter === 'available') return m.currentStatus === 'Có thể tiếp nhận';
        return true;
    });

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-3 md:hidden animate-fadeIn">
            <div className="bg-modal-gradient border border-wuxia-gold/30 w-full max-w-[620px] h-[86vh] flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden rounded-2xl">
                <div className="h-12 shrink-0 border-b border-gray-800/60 bg-ink-black/40 flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-wuxia-gold/10 border border-wuxia-gold/50 rounded-full flex items-center justify-center text-base font-serif font-bold text-wuxia-gold">
                            {sectData.name[0]}
                        </div>
                        <div>
                            <div className="text-wuxia-gold font-serif font-bold text-base">{sectData.name}</div>
                            <div className="text-[9px] text-gray-500 font-mono">{sectData.playerPosition}</div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-ink-black/50 border border-gray-700 text-gray-400 hover:text-wuxia-red hover:border-wuxia-red transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="border-b border-gray-800/60 /30 px-3 py-2 overflow-x-auto no-scrollbar">
                    <div className="flex gap-2">
                        {[
                            { id: 'hall', label: 'Môn Phái' },
                            { id: 'missions', label: 'Nhiệm Vụ' },
                            { id: 'exchange', label: 'Kinh Văn' },
                            { id: 'members', label: 'Đồng Môn' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`px-3 py-1.5 text-[11px] rounded-full border transition-colors ${activeTab === tab.id
                                        ? 'border-wuxia-gold bg-wuxia-gold/10 text-wuxia-gold'
                                        : 'border-gray-800 text-gray-400 /20'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 space-y-4 /5">
                    {activeTab === 'hall' && (
                        <>
                            <div className="bg-ink-black/40 border border-gray-800 rounded-xl p-4">
                                <div className="flex justify-between text-[11px] text-gray-400">
                                    <span>Fund <span className="text-gray-200">{sectData.sectFunds}</span></span>
                                    <span>Resources <span className="text-gray-200">{sectData.sectResources}</span></span>
                                    <span>Construction <span className="text-gray-200">{sectData.constructionLevel}</span></span>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="text-[10px] text-gray-500">Contribution points</div>
                                    <div className="text-wuxia-gold font-mono font-bold">{sectData.playerContribution}</div>
                                </div>
                            </div>

                            <div className="bg-ink-black/40 border border-gray-800 rounded-xl p-4">
                                <div className="text-[10px] text-wuxia-gold/70 tracking-[0.3em] mb-2">Sect objective</div>
                                <p className="text-sm text-gray-300 font-serif leading-relaxed">“{sectData.description}”</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {(sectData.sectRules || []).map((rule, i) => (
                                        <span key={i} className="text-[10px] bg-red-950/30 text-red-300 border border-red-900/50 px-2 py-1 rounded">
                                            Precepts{i + 1}: {rule}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-ink-black/40 border border-gray-800 rounded-xl p-4">
                                <div className="text-[10px] text-wuxia-gold/70 tracking-[0.3em] mb-2">Path of promotion</div>
                                <div className="space-y-2">
                                    {Object.entries(positionLevelOrder)
                                        .sort((a, b) => a[1] - b[1])
                                        .map(([rank, lvl]) => {
                                            const currentLvl = positionLevelOrder[sectData.playerPosition] || 0;
                                            if (lvl > currentLvl + 2 || lvl < currentLvl - 1) return null;
                                            const isCurrent = rank === sectData.playerPosition;
                                            const isPassed = lvl < currentLvl;
                                            return (
                                                <div key={rank} className="flex items-center gap-3 text-[11px]">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] border ${isCurrent ? 'bg-wuxia-gold text-black border-wuxia-gold' :
                                                            isPassed ? 'bg-gray-700 text-gray-400 border-gray-600' : 'border-gray-600 text-gray-500'
                                                        }`}>
                                                        {lvl}
                                                    </div>
                                                    <span className={isCurrent ? 'text-wuxia-gold' : 'text-gray-400'}>{rank}</span>
                                                    {isCurrent && <span className="text-[9px] text-wuxia-gold border border-wuxia-gold px-2 rounded">Current</span>}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'missions' && (
                        <>
                            <div className="flex gap-2">
                                {['all', 'available', 'active'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setMissionFilter(f as any)}
                                        className={`px-3 py-1.5 text-[11px] rounded-full border transition-all ${missionFilter === f ? 'bg-wuxia-gold/15 border-wuxia-gold text-wuxia-gold' : 'border-gray-800 text-gray-500'
                                            }`}
                                    >
                                        {f === 'all' ? 'Tất cả' : f === 'available' ? 'Có thể tiếp nhận' : 'Đang thực hiện'}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-3">
                                {filteredMissions.map(mission => {
                                    const statusColor = getMissionStatusColor(mission.currentStatus);
                                    const isExpired = isTimeAfter(currentTime, mission.deadline) && mission.currentStatus !== 'Đã hoàn thành';
                                    return (
                                        <div key={mission.id} className="bg-ink-black/40 border border-gray-800 rounded-xl p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <div className="text-sm text-gray-200 font-bold">{mission.title}</div>
                                                    <div className="text-[10px] text-gray-500 mt-1">{mission.description}</div>
                                                </div>
                                                <span className={`text-[10px] px-2 py-0.5 rounded border ${statusColor}`}>
                                                    {isExpired ? 'Đã quá hạn' : mission.currentStatus}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-gray-500 font-mono">
                                                <span>Phát hành {mission.releaseDate}</span>
                                                <span className={isExpired ? 'text-red-400' : ''}>Deadline {mission.deadline}</span>
                                            </div>
                                            <div className="mt-3 flex items-center justify-between text-[11px]">
                                                <span className="text-wuxia-gold font-mono">+{mission.rewardContribution} Contribution</span>
                                                {mission.currentStatus === 'Có thể tiếp nhận' && !isExpired && (
                                                    <button className="px-3 py-1 text-[10px] rounded border border-wuxia-gold text-wuxia-gold hover:bg-wuxia-gold/10">
                                                        Accept task
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {activeTab === 'exchange' && (
                        <div className="grid grid-cols-2 gap-3">
                            {sectData.exchangeList.map(good => (
                                <div key={good.id} className="bg-ink-black/40 border border-gray-800 rounded-xl p-3 space-y-2">
                                    <div className="text-sm text-gray-200 font-bold">{good.itemName}</div>
                                    <div className="text-[10px] text-gray-500">Requirement {good.requiredPosition}</div>
                                    <div className="flex items-center justify-between text-[10px]">
                                        <span className="text-wuxia-gold font-mono">{good.exchangePrice} Contribution</span>
                                        <span className="text-gray-500">Stock {good.stock}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div className="space-y-3">
                            {sectData.importantMembers.map(mem => (
                                <div key={mem.id} className="bg-ink-black/40 border border-gray-800 rounded-xl p-4 flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base border shrink-0 ${mem.gender === 'Nữ' ? 'border-pink-900 bg-pink-900/10 text-pink-500' : 'border-wuxia-cyan/30 bg-wuxia-cyan/10 text-wuxia-cyan'
                                        }`}>
                                        {mem.name[0]}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-200 font-bold">{mem.name}</span>
                                            <span className="text-[9px] text-wuxia-gold bg-wuxia-gold/10 px-2 py-0.5 rounded border border-wuxia-gold/20">{mem.identity}</span>
                                        </div>
                                        <div className="text-[10px] text-gray-500 mt-1">{mem.gender} · {mem.age}Age · {mem.realm}</div>
                                        <p className="text-[11px] text-gray-400 mt-2">“{mem.brief}”</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileSect;
