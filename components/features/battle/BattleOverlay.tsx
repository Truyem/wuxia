
import React, { useMemo, useEffect, useRef } from 'react';
import { 
    Swords, 
    Shield, 
    Activity, 
    Zap, 
    Skull, 
    Timer, 
    MapPin, 
    Sun, 
    Moon, 
    AlertTriangle,
    ChevronRight,
    Trophy,
    User,
    Bot
} from 'lucide-react';
import { CharacterData } from '../../../models/character';
import { BattleStatus, BattleEnemyInfo } from '../../../models/battle';
import { EnvironmentData } from '../../../models/environment';

interface Props {
    state: {
        character: CharacterData;
        battle: BattleStatus;
        environment: EnvironmentData;
        history: any[];
    };
    onAction: (action: string) => void;
    onClose: () => void;
}

const BattleOverlay: React.FC<Props> = ({ state, onAction, onClose }) => {
    const { character, battle, environment, history } = state;
    const enemy = battle.enemy;
    const scrollRef = useRef<HTMLDivElement>(null);

    // Filter battle related history for the log
    const battleLog = useMemo(() => {
        return history
            .filter(h => h.role === 'assistant')
            .map(h => h.content)
            .filter(content => content.includes('【Phán đoán】') || content.includes('【Chiến đấu】'));
    }, [history]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [battleLog]);

    if (!battle.isInBattle || !enemy) return null;

    const playerHpPercent = Math.max(0, (character.chestCurrentHp / character.chestMaxHp) * 100); // Using chest as main HP for simplicity here or sum of all parts
    const enemyHpPercent = Math.max(0, (enemy.currentHp / enemy.maxHp) * 100);

    const getRealmColor = (realm: string) => {
        if (realm.includes('Thần')) return 'text-amber-400';
        if (realm.includes('Vàng') || realm.includes('Kim')) return 'text-yellow-400';
        if (realm.includes('Bạc')) return 'text-slate-300';
        return 'text-stone-400';
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[500] flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Cyberpunk HUD Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(var(--c-wuxia-cyan),0.2)_0%,transparent_70%)]" />
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(220,38,38,0.2)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-wuxia-cyan/30 shadow-[0_0_20px_rgba(var(--c-wuxia-cyan),0.5)]" />
            </div>

            {/* Header / Environment Info */}
            <div className="w-full max-w-6xl mb-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-4 bg-stone-900/80 border border-stone-800 px-4 py-2 rounded-lg backdrop-blur-md">
                    <MapPin className="w-4 h-4 text-wuxia-cyan" />
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-300">{environment.currentRegionId || 'Sơn Ngoại Sơn'}</span>
                    <div className="w-[1px] h-4 bg-stone-800" />
                    {environment.hour >= 6 && environment.hour <= 18 ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-wuxia-cyan/80" />}
                    <span className="text-xs font-mono text-stone-400">{environment.hour}:00</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                        Cảnh báo: Đang chiến đấu
                    </div>
                </div>
            </div>

            {/* Main Battle Field */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 flex-1 overflow-hidden">
                
                {/* Player Character Panel */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-stone-950/60 border border-wuxia-cyan/30 rounded-3xl p-6 relative overflow-hidden group">
                        {/* Avatar Wrapper */}
                        <div className="relative mb-4 aspect-square max-w-[200px] mx-auto overflow-hidden rounded-2xl border-2 border-wuxia-cyan/20 shadow-[0_0_30px_rgba(var(--c-wuxia-cyan),0.12)] bg-stone-900 group">
                            {character.avatar ? (
                                <img src={character.avatar} alt={character.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-900 to-black relative">
                                    <div className="absolute inset-0 bg-ink-wash opacity-20 pointer-events-none"></div>
                                    <div className="w-20 h-20 rounded-full border border-wuxia-cyan/30 flex items-center justify-center bg-wuxia-cyan/5 backdrop-blur-md shadow-[0_0_20px_rgba(var(--c-wuxia-cyan),0.2)]">
                                        <span className="text-5xl font-serif font-black text-wuxia-cyan leading-none drop-shadow-[0_2px_10px_rgba(var(--c-wuxia-cyan),0.5)]">
                                            {character.name ? character.name.charAt(0) : '?'}
                                        </span>
                                    </div>
                                </div>
                            ) }
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${getRealmColor(character.realm)}`}>{character.realm}</span>
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-wuxia-cyan drop-shadow-[0_0_10px_rgba(var(--c-wuxia-cyan),0.5)]">{character.name}</h3>
                            <p className="text-[10px] text-stone-500 uppercase font-bold tracking-[0.2em] mt-1">Đang vào vị thế</p>
                        </div>

                        {/* HP Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-end px-1">
                                <span className="text-[10px] font-black text-wuxia-cyan uppercase tracking-widest">Khí Huyết (HP)</span>
                                <span className="text-xs font-mono font-bold text-stone-300">{character.chestCurrentHp} / {character.chestMaxHp}</span>
                            </div>
                            <div className="h-3 bg-black/60 rounded-full border border-wuxia-cyan/20 p-[2px] overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-wuxia-cyan/80 to-wuxia-cyan rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(var(--c-wuxia-cyan),0.5)]"
                                    style={{ width: `${playerHpPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* Energy Bar */}
                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between items-end px-1">
                                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Nội Lực (MP)</span>
                                <span className="text-xs font-mono font-bold text-stone-300">{character.currentEnergy} / {character.maxEnergy}</span>
                            </div>
                            <div className="h-2 bg-black/60 rounded-full border border-amber-500/20 p-[1px] overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                    style={{ width: `${(character.currentEnergy / character.maxEnergy) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Decorative HUD Elements */}
                        <div className="absolute top-0 right-0 p-2 opacity-30">
                            <div className="border-t-2 border-r-2 border-wuxia-cyan w-4 h-4" />
                        </div>
                        <div className="absolute bottom-0 left-0 p-2 opacity-30">
                            <div className="border-b-2 border-l-2 border-wuxia-cyan w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Central Action Area & Battle Log */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full min-h-[400px]">
                    {/* Log Container */}
                    <div className="flex-1 bg-black/60 border border-stone-800 rounded-3xl overflow-hidden flex flex-col relative">
                        <div className="px-4 py-2 bg-stone-900/80 border-b border-stone-800 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 flex items-center gap-2">
                                <Activity className="w-3 h-3" />
                                Nhật Ký Chiến Đấu
                            </span>
                            <div className="w-2 h-2 rounded-full bg-wuxia-cyan animate-pulse" />
                        </div>
                        
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs custom-scrollbar"
                        >
                            {battleLog.length > 0 ? (
                                battleLog.map((log, idx) => {
                                    const isJudgement = log.includes('【Phán đoán】');
                                    return (
                                        <div 
                                            key={idx} 
                                            className={`p-2 rounded border-l-2 animate-in slide-in-from-bottom-2 duration-300 ${isJudgement ? 'bg-amber-500/5 border-l-amber-500 text-amber-200/80' : 'bg-wuxia-cyan/5 border-l-wuxia-cyan text-wuxia-cyan/80'}`}
                                            dangerouslySetInnerHTML={{ __html: log.replace(/\n/g, '<br/>') }}
                                        />
                                    );
                                })
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-stone-700 opacity-50 space-y-2">
                                    <Timer className="w-8 h-8 stroke-1" />
                                    <p className="text-[9px] uppercase font-bold tracking-widest text-center">Đang chờ lượt hành động...</p>
                                </div>
                            )}
                        </div>

                        {/* Controls/Options Overlay */}
                        <div className="p-4 bg-stone-900/40 border-t border-stone-800">
                             <h4 className="text-[10px] text-stone-600 font-bold uppercase tracking-widest mb-3">Lựa chọn hành động:</h4>
                             <div className="grid grid-cols-2 gap-2">
                                {character.kungfuList.filter(k => k.Type === 'Active').slice(0, 4).map((skill, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => onAction(`Sử dụng ${skill.Name}`)}
                                        className="bg-wuxia-cyan/10 border border-wuxia-cyan/20 hover:bg-wuxia-cyan/20 hover:border-wuxia-cyan/40 p-2 rounded text-left transition-all group"
                                    >
                                        <div className="text-[10px] font-black text-wuxia-cyan truncate uppercase tracking-tighter">{skill.Name}</div>
                                        <div className="text-[8px] text-stone-500 flex items-center gap-1">
                                            <Zap className="w-2 h-2" />
                                            {skill['Consumption value']} MP
                                        </div>
                                    </button>
                                ))}
                                <button 
                                    onClick={() => onAction('Phòng thủ')}
                                    className="bg-stone-800/50 border border-stone-700 hover:border-stone-500 p-2 rounded text-left transition-all"
                                >
                                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Phòng Thủ</div>
                                </button>
                                <button 
                                    onClick={() => onAction('Rời khỏi trận chiến')}
                                    className="bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 p-2 rounded text-left transition-all"
                                >
                                    <div className="text-[10px] font-black text-red-400 uppercase tracking-widest text-center">Rút Lui</div>
                                </button>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Enemy Panel */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-stone-950/60 border border-red-500/30 rounded-3xl p-6 relative overflow-hidden group">
                        {/* Avatar Wrapper (Placeholder icon for enemy since we don't have separate enemy avatars easily yet) */}
                        <div className="relative mb-4 aspect-square max-w-[200px] mx-auto overflow-hidden rounded-2xl border-2 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] bg-stone-900 flex items-center justify-center text-red-500/20">
                            <Bot className="w-24 h-24" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 flex flex-col items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Mục Tiêu Địch</span>
                                <span className="text-xs font-bold text-red-400">{enemy.realm || 'Không rõ'}</span>
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">{enemy.name}</h3>
                            <p className="text-[10px] text-stone-500 uppercase font-bold tracking-[0.2em] mt-1">Sát ý nồng đậm</p>
                        </div>

                        {/* HP Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-end px-1">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Khí Huyết (HP)</span>
                                <span className="text-xs font-mono font-bold text-stone-300">{enemy.currentHp} / {enemy.maxHp}</span>
                            </div>
                            <div className="h-3 bg-black/60 rounded-full border border-red-500/20 p-[2px] overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-red-600 to-orange-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                    style={{ width: `${enemyHpPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* Stats Info */}
                        <div className="mt-8 pt-6 border-t border-stone-800/50 grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="text-[8px] text-stone-600 font-black uppercase tracking-widest">Sức mạnh</div>
                                <div className="text-lg font-mono font-bold text-red-400">{enemy.combatPower}</div>
                            </div>
                            <div className="space-y-1 text-right">
                                <div className="text-[8px] text-stone-600 font-black uppercase tracking-widest">Phòng Ngự</div>
                                <div className="text-lg font-mono font-bold text-stone-300">{enemy.defense}</div>
                            </div>
                        </div>

                        {/* Decorative HUD Elements */}
                        <div className="absolute top-0 left-0 p-2 opacity-30">
                            <div className="border-t-2 border-l-2 border-red-500 w-4 h-4" />
                        </div>
                        <div className="absolute bottom-0 right-0 p-2 opacity-30">
                            <div className="border-b-2 border-r-2 border-red-500 w-4 h-4" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer / HUD Info */}
            <div className="w-full max-w-6xl mt-6 flex justify-between items-center z-10 opacity-50">
                <div className="text-[9px] font-mono text-stone-600 flex items-center gap-2">
                    <span className="text-wuxia-cyan/50 font-black">BATTLE_OS_V4.0</span>
                    <span>|</span>
                    <span>SYNC_ACTIVE</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-32 bg-stone-800" />
                    <div className="text-[8px] font-black text-stone-700 uppercase tracking-[0.4em]">Combat Protocol Initiated</div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #292524; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #44403C; }
            `}</style>
        </div>
    );
};

export default BattleOverlay;
