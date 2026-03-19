import React, { useState } from 'react';
import { WorldDataStructure } from '../../../models/world';

interface Props {
    world: WorldDataStructure;
    onClose: () => void;
}

type TabType = 'overview' | 'events' | 'npcs';

// Premium Glass Card Component - Refactored for Square Glassmorphism
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`relative overflow-hidden rounded-none border border-wuxia-gold/20 bg-black/40 backdrop-blur-md shadow-2xl group ${className}`}>
        <div className="relative z-10">{children}</div>
    </div>
);

const WorldModal: React.FC<Props> = ({ world, onClose }) => {
    const [activeTab, setActiveTab] = useState<TabType>('events');

    const getSafeVal = (obj: any, keys: string[]) => {
        for (const key of keys) {
            if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
        }
        return null;
    };

    const events = getSafeVal(world, ['ongoingEvents', 'Ongoing events']) || [];
    const npcs = getSafeVal(world, ['activeNpcList', 'Active NPCs']) || [];

    return (
        <div className="fixed inset-0 bg-ink-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-4">
            {/* Background Ink Wash Effect - Static */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10"></div>
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-wuxia-cyan/5 blur-[160px] rounded-none"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-wuxia-gold/5 blur-[160px] rounded-none"></div>
            </div>

            <div className="glass-panel-square w-full max-w-6xl h-[750px] flex flex-col shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden rounded-none">
                {/* Wuxia Decorative Corners */}
                <div className="wuxia-corner wuxia-corner-tl"></div>
                <div className="wuxia-corner wuxia-corner-tr"></div>
                <div className="wuxia-corner wuxia-corner-bl"></div>
                <div className="wuxia-corner wuxia-corner-br"></div>
                
                {/* Header */}
                <div className="h-24 shrink-0 border-b border-wuxia-gold/20 bg-ink-black/60 flex items-center justify-between px-10 relative z-50 backdrop-blur-md">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-wuxia-gold/20"></div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-none border border-wuxia-gold/40 flex items-center justify-center bg-gradient-to-b from-wuxia-gold/20 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            <span className="text-2xl font-serif text-wuxia-gold drop-shadow-sm">武</span>
                        </div>
                        <div>
                            <h3 className="text-wuxia-gold font-serif font-bold text-3xl tracking-[0.4em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">TÌNH HÌNH VÕ LÂM</h3>
                            <p className="text-gray-400 text-[11px] tracking-[0.2em] mt-1 italic opacity-80 uppercase">World Status & Chronicles</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="h-10 w-px bg-wuxia-gold/10"></div>
                        <button
                            onClick={onClose}
                            className="group relative w-10 h-10 flex items-center justify-center rounded-none border border-wuxia-gold/20 bg-black/40 overflow-hidden shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-wuxia-gold relative z-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Navigation Sidebar */}
                    <div className="w-80 border-r border-wuxia-gold/10 bg-black/40 flex flex-col py-10 gap-4 relative px-6 backdrop-blur-md">
                        <div className="absolute inset-y-0 right-0 w-px bg-wuxia-gold/10"></div>
                        {[
                            { id: 'events', label: 'Bách Hiểu Sinh', sub: 'Thế giới đại sự' },
                            { id: 'npcs', label: 'Anh Hùng Bảng', sub: 'Nhân sĩ hoạt động' },
                            { id: 'overview', label: 'Võ Lâm Sử Ký', sub: 'Thiên hạ bản đồ' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`group relative px-6 py-5 rounded-none border text-left ${
                                    activeTab === tab.id
                                        ? 'bg-wuxia-gold/10 border-wuxia-gold/30 shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]'
                                        : 'bg-transparent border-transparent opacity-60'
                                }`}
                            >
                                {activeTab === tab.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-wuxia-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
                                )}
                                <div className="relative z-10">
                                    <span className={`block font-serif font-bold tracking-[0.15em] text-xl ${
                                        activeTab === tab.id ? 'text-wuxia-gold' : 'text-gray-400'
                                    }`}>{tab.label}</span>
                                    <span className="block text-[10px] tracking-widest text-gray-500 font-sans mt-1 opacity-60 uppercase">{tab.sub}</span>
                                </div>
                            </button>
                        ))}
                        
                        {/* Sidebar Deco */}
                        <div className="mt-auto opacity-5 pointer-events-none select-none p-4">
                            <div className="text-8xl font-serif leading-none italic">江湖</div>
                        </div>
                    </div>

                    {/* Main Scrolling Content Area */}
                    <div className="flex-1 p-12 overflow-y-auto custom-scrollbar relative">
                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                        
                        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
                            
                            {/* --- EVENTS TAB --- */}
                            {activeTab === 'events' && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 border-b border-wuxia-gold/10 pb-4">
                                        <div className="w-2 h-2 rounded-none bg-wuxia-gold"></div>
                                        <h4 className="text-wuxia-gold/70 font-bold uppercase tracking-[0.3em] text-xs">Mây gió phương nào đang biến đổi?</h4>
                                    </div>

                                    {events.length > 0 ? (
                                        <div className="relative space-y-8 pl-8 border-l-2 border-dashed border-wuxia-gold/10 ml-4">
                                            {events.map((evt: any, idx: number) => (
                                                <div key={evt.ID || idx} className="relative group">
                                                    {/* Custom Timeline Bullet */}
                                                    <div className="absolute -left-[45px] top-6 w-8 h-8 rounded-none bg-black border border-wuxia-gold/30 flex items-center justify-center shadow-xl">
                                                        <div className="w-2 h-2 rounded-none bg-wuxia-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                                                    </div>

                                                    <GlassCard className="p-8">
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-4">
                                                                    <h4 className="text-wuxia-gold font-serif text-3xl font-bold tracking-wide drop-shadow-md">{evt.title}</h4>
                                                                    <span className="px-3 py-1 rounded-none bg-wuxia-gold/10 text-wuxia-gold text-[10px] font-bold border border-wuxia-gold/20 style-ink uppercase tracking-wider">{evt.type}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-wuxia-cyan/70 text-[11px] font-mono tracking-widest uppercase">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                                                    {evt.location}
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="px-3 py-1 rounded-none bg-black/50 border border-wuxia-gold/10 text-[10px] text-gray-400 font-mono">
                                                                    <div className="text-wuxia-gold/60">T: {evt.startTime}</div>
                                                                    <div className="opacity-40 italic">E: {evt.estimatedEndTime}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="bg-black/40 border-l-4 border-wuxia-gold/60 p-6 rounded-none relative overflow-hidden">
                                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-5"></div>
                                                            <p className="relative z-10 text-gray-200 text-base leading-relaxed font-serif italic ink-wash-text selection:bg-wuxia-gold/30">
                                                                "{evt.content}"
                                                            </p>
                                                        </div>

                                                        <div className="mt-4 flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="relative flex h-2 w-2">
                                                                  <span className="relative inline-flex rounded-none h-2 w-2 bg-green-500"></span>
                                                                </span>
                                                                <span className="text-[10px] text-green-500 font-bold uppercase tracking-[0.2em]">{evt.currentStatus}</span>
                                                            </div>
                                                        </div>
                                                    </GlassCard>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 opacity-30">
                                            <div className="text-6xl mb-4 italic font-serif">静</div>
                                            <p className="text-sm tracking-[0.5em] uppercase">Vạn vật tịch liêu, chưa có dị động</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* --- NPCS TAB --- */}
                            {activeTab === 'npcs' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
                                    {npcs.length > 0 ? npcs.map((npc: any, idx: number) => (
                                        <GlassCard key={npc.ID || idx} className="h-full flex flex-col group/npc overflow-hidden">
                                            {/* Decorative Background Symbol */}
                                            <div className="absolute -bottom-4 -right-4 text-7xl text-white/5 font-serif font-black italic select-none group-hover/npc:text-wuxia-gold/10 pointer-events-none">
                                                {npc['Full Name']?.[0] || npc.name?.[0]}
                                            </div>

                                            <div className="p-5 flex-1 relative z-10">
                                                <div className="flex gap-4 items-start mb-4">
                                                    <div className="relative">
                                                        <div className="w-16 h-16 rounded-none border-2 border-wuxia-gold/30 bg-black/40 overflow-hidden shadow-lg p-1">
                                                            <div className="w-full h-full rounded-none bg-gradient-to-tr from-gray-900 to-gray-800 flex items-center justify-center text-2xl font-serif text-wuxia-gold font-bold">
                                                                {npc['Full Name']?.[0] || npc.name?.[0]}
                                                            </div>
                                                        </div>
                                                        <div className="absolute -bottom-2 -right-2 bg-wuxia-gold text-black text-[9px] font-black px-2 py-0.5 rounded-none shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                                                            {npc['Kingdom'] || 'Giang Hồ'}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="text-gray-100 font-serif text-xl font-bold tracking-wide group-hover/npc:text-wuxia-gold">{npc.name || npc['Full Name']}</h4>
                                                                <div className="text-wuxia-gold/70 text-[10px] font-bold uppercase tracking-widest mt-0.5">{npc.title}</div>
                                                            </div>
                                                            <div className="px-2 py-0.5 rounded-none border border-wuxia-cyan/30 text-wuxia-cyan text-[10px] font-bold bg-wuxia-cyan/10">
                                                                {npc['Realm']}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 text-[10px] text-gray-500 border-t border-white/5 pt-3">
                                                        <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-none bg-gray-500"></span>Vị trí:</span>
                                                        <span className="text-gray-300 font-medium truncate max-w-[150px]">{npc.currentLocation}</span>
                                                        <span className="w-px h-3 bg-white/10"></span>
                                                        <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-none bg-gray-500"></span>Trạng thái:</span>
                                                        <span className="text-gray-300 font-medium">{npc['Status']}</span>
                                                    </div>

                                                    <div className="bg-black/30 rounded-none p-3 border border-white/5 group-hover/npc:bg-black/50">
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-4 h-4 mt-0.5 rounded-none border border-wuxia-gold/30 flex items-center justify-center p-0.5">
                                                                <div className="w-full h-full rounded-none bg-wuxia-gold"></div>
                                                            </div>
                                                            <p className="text-gray-400 text-xs leading-relaxed italic line-clamp-2">
                                                                {npc.currentActionDescription}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {(Array.isArray(npc.heldTreasures) ? npc.heldTreasures : []).slice(0, 3).map((item: string, i: number) => (
                                                            <span key={i} className="text-[9px] px-2 py-0.5 rounded-none bg-white/5 border border-white/10 text-gray-400 group-hover/npc:border-wuxia-gold/20 group-hover/npc:text-wuxia-gold/70">{item}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="px-5 py-2 bg-black/40 border-t border-white/5 flex justify-between items-center text-[9px] text-gray-600 font-mono">
                                                <span>S: {npc.actionStartTime}</span>
                                                <span>E: {npc.actionEstimatedEndTime}</span>
                                            </div>
                                        </GlassCard>
                                    )) : (
                                        <div className="col-span-2 py-20 text-center text-gray-600 font-serif italic text-lg opacity-30">
                                            Sóng yên biển lặng, anh hùng ẩn mình...
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* --- CHRONICLE TAB --- */}
                            {activeTab === 'overview' && (
                                <div className="space-y-10 pb-10">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Cao Thủ Hiện Diện', val: npcs.length, color: 'text-wuxia-gold' },
                                            { label: 'Kỳ Vực Khám Phá', val: Array.isArray((world as any).Map) ? (world as any).Map.length : 0, color: 'text-wuxia-cyan' },
                                            { label: 'Kình Thiên Trụ', val: Array.isArray((world as any).Building) ? (world as any).Building.length : 0, color: 'text-gray-100' },
                                            { label: 'Đại Sự Kiện', val: events.length, color: 'text-wuxia-red' },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-none backdrop-blur-sm relative group overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-none opacity-20 transition-all"></div>
                                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</div>
                                                <div className={`text-4xl font-serif font-black ${stat.color} drop-shadow-lg`}>{stat.val}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 py-4">
                                            <div className="h-px flex-1 bg-wuxia-gold/20"></div>
                                            <h4 className="text-wuxia-gold font-serif font-bold text-2xl tracking-[0.4em] uppercase drop-shadow-lg">VŨ TRỤ BIẾN THIÊN</h4>
                                            <div className="h-px flex-1 bg-wuxia-gold/20"></div>
                                        </div>

                                        <div className="relative space-y-10 pl-10 border-l border-wuxia-gold/10 ml-5 py-5">
                                            {Array.isArray(world.worldHistory) && world.worldHistory.length > 0 ? world.worldHistory.map((hist: any, i: number) => (
                                                <div key={i} className="relative group">
                                                    <div className="absolute -left-[48px] top-1.5 w-4 h-4 rounded-none bg-black border border-wuxia-gold/20 flex items-center justify-center p-0.5 group-hover:border-wuxia-gold shadow-lg">
                                                        <div className="w-full h-full rounded-none bg-gray-600 group-hover:bg-wuxia-gold"></div>
                                                    </div>
                                                    
                                                    <div className="space-y-2">
                                                        <div className="inline-block px-3 py-0.5 rounded-none bg-wuxia-gold/10 text-wuxia-gold font-mono text-[10px] font-bold border border-wuxia-gold/20 shadow-sm">
                                                            Năm {hist.startTime?.split(':')[0] || '??'}
                                                        </div>
                                                        <h4 className="text-gray-100 font-serif font-bold text-xl group-hover:text-wuxia-gold">{hist.title}</h4>
                                                        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl font-serif italic border-l-2 border-white/5 pl-4 group-hover:border-wuxia-gold/20 group-hover:text-gray-300">
                                                            {hist.eventResult || hist.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="flex flex-col items-center justify-center py-20 opacity-20">
                                                    <div className="text-5xl font-serif italic mb-2">無</div>
                                                    <p className="text-xs uppercase tracking-widest">Sử sách chưa ghi lại điều gì</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                
                {/* Decorative Bottom Bar */}
                <div className="h-px bg-wuxia-gold/20 opacity-50 shrink-0"></div>
            </div>
        </div>
    );
};

export default WorldModal;
