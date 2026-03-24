
import React from 'react';
import IconGlyph from '../../ui/Icon/IconGlyph';

type JudgmentModifier = {
    key: string;
    label: string;
    value: number | null;
    reason?: string;
    raw: string;
};

type ParsedJudgment = {
    eventName: string;
    result: string;
    target: string;
    score: number;
    difficulty: number;
    modifiers: JudgmentModifier[];
};

const createEmptyJudgment = (): ParsedJudgment => ({
    eventName: 'Sự kiện kiểm tra',
    result: 'Không xác định',
    target: 'Bản thân',
    score: 0,
    difficulty: 0,
    modifiers: []
});

const MODIFIER_LABELS: Record<string, string> = {
    Basic: 'Cơ bản',
    Environment: 'Môi trường',
    Status: 'Trạng thái',
    Luck: 'May mắn',
    Equipment: 'Trang bị'
};

const parseModifier = (part: string): JudgmentModifier | null => {
    // English: Basic, Environment, Status, Luck, Equipment
    // Vietnamese: Cơ bản, Môi trường, Trạng thái, May mắn, Trang bị
    const modifierMatch = part.match(/^(Basic|Environment|Status|Luck|Equipment|Cơ bản|Môi trường|Trạng thái|May mắn|Trang bị)\s*([+\-]?\d+(?:\.\d+)?|B|E|S|L|Q)?(?:\s*\((.+)\))?$/i);
    if (!modifierMatch) return null;

    const [, key, valueRaw, reason] = modifierMatch;
    // Map Vietnamese keys back to English if possible, or use as is
    const keyMap: Record<string, string> = {
        'Cơ bản': 'Basic',
        'Môi trường': 'Environment',
        'Trạng thái': 'Status',
        'May mắn': 'Luck',
        'Trang bị': 'Equipment'
    };
    const mappedKey = keyMap[key] || key;
    
    // Check if valueRaw is numeric
    const numericValue = valueRaw && !isNaN(Number(valueRaw)) ? Number(valueRaw) : null;

    return {
        key: mappedKey,
        label: MODIFIER_LABELS[mappedKey] || key,
        value: numericValue,
        reason: reason?.trim(),
        raw: part
    };
};

const parseJudgmentText = (text: string): ParsedJudgment => {
    const parts = text.split('｜').map(s => s.trim()).filter(Boolean);
    if (parts.length === 0) return createEmptyJudgment();

    const parsed: ParsedJudgment = {
        ...createEmptyJudgment(),
        modifiers: [],
        eventName: parts[0] || 'Sự kiện kiểm tra'
    };

    const isResultToken = (token: string) => 
        /(Success|Failure|Critical Success|Critical Failure|Ultimate Success|Ultimate Failure|Thành công|Thất bại|Đại thành công|Đại thất bại|Cực thành công|Cực thất bại)/i.test(token);

    if (parts[1] && isResultToken(parts[1])) {
        parsed.result = parts[1];
    }

    for (let i = 1; i < parts.length; i++) {
        const part = parts[i];

        if (isResultToken(part)) {
            parsed.result = part;
            continue;
        }

        // Support both "Trigger object Player" and "Người chơi: Lý Vân"
        const targetMatch = part.match(/^(Trigger object|Đối tượng kích hoạt|Người chơi|NPC)\s*[:\s]*(.+)$/i);
        if (targetMatch) {
            parsed.target = targetMatch[2].trim() || parsed.target;
            continue;
        }

        // Support both "Check value X / Difficulty Y" and "Giá trị phán đoán X/Độ khó Y"
        const scoreDiffMatch = part.match(/^(Check value|Giá trị phán đoán|Phán đoán|Kiểm tra)\s*([+\-]?\d+(?:\.\d+)?)\s*\/\s*(Difficulty|Độ khó)\s*([+\-]?\d+(?:\.\d+)?)$/i);
        if (scoreDiffMatch) {
            parsed.score = Number(scoreDiffMatch[2]);
            parsed.difficulty = Number(scoreDiffMatch[4]);
            continue;
        }

        const modifier = parseModifier(part);
        if (modifier) {
            parsed.modifiers.push(modifier);
            continue;
        }
    }

    return parsed;
};

const RESULT_LABELS: Record<string, string> = {
    'Success': 'Thành công',
    'Failure': 'Thất bại',
    'Critical Success': 'Đại thành công',
    'Critical Failure': 'Đại thất bại',
    'Ultimate Success': 'Cực thành công',
    'Ultimate Failure': 'Cực thất bại',
};
const translateResult = (result: string): string => RESULT_LABELS[result] || result;

// --- Highlighting Utility ---
const highlightText = (text: string) => {
    if (!text) return text;
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) {
            const content = part.slice(1, -1);
            return (
                <span key={i} className="text-wuxia-gold font-bold bg-gradient-to-t from-wuxia-gold/20 to-transparent px-1 rounded-sm" style={{textShadow:'0 0 8px rgba(230,200,110,0.5)'}}>
                    {content}
                </span>
            );
        }
        return part;
    });
};

// --- 1. Narrator Renderer ---
export const NarratorRenderer: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-full my-4 px-2 max-w-4xl mx-auto">
        <div className="relative border-l-[3px] pl-5 py-2.5" style={{borderImage:'linear-gradient(to bottom, rgba(230,200,110,0.8), rgba(230,200,110,0.1)) 1'}}>
            {/* Left glow dot */}
            <div className="absolute -left-[5px] top-3 w-2 h-2 rounded-full bg-wuxia-gold/60" style={{boxShadow:'0 0 6px rgba(230,200,110,0.5)'}} />
            <span className="text-paper-white/75 text-[15px] italic tracking-wide leading-relaxed">
                {highlightText(text)}
            </span>
        </div>
    </div>
);

// --- 1b. Inner Thought Renderer — Premium Glassmorphism ---
export const InnerThoughtRenderer: React.FC<{ text: string; speaker?: string }> = ({ text, speaker }) => (
    <div className="w-full my-5 px-2 max-w-4xl mx-auto animate-thought-float">
        <div
            className="relative rounded-xl overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, rgba(15,20,30,0.75) 0%, rgba(10,35,40,0.65) 50%, rgba(15,20,30,0.75) 100%)',
                border: '1px dashed rgba(68,170,170,0.45)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(68,170,170,0.1)',
            }}
        >
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{background:'linear-gradient(to right, transparent, rgba(68,170,170,0.5), transparent)'}} />

            {/* Watermark 心 */}
            <div className="absolute -right-2 -bottom-4 text-[90px] font-serif text-wuxia-cyan select-none pointer-events-none" style={{opacity:0.04, lineHeight:1}}>心</div>

            {/* Header Row */}
            <div className="flex items-center gap-2.5 px-4 pt-3 pb-0">
                {/* Icon */}
                <div className="w-5 h-5 shrink-0 text-wuxia-cyan/70">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-wuxia-cyan/60">Nội tâm</span>
                {speaker && (
                    <>
                        <div className="w-px h-3 bg-wuxia-cyan/20 mx-0.5" />
                        <span className="text-[11px] font-serif text-wuxia-cyan/80 tracking-wider">{speaker}</span>
                    </>
                )}
            </div>

            {/* Divider */}
            <div className="mx-4 mt-2 mb-0 h-px" style={{background:'linear-gradient(to right, rgba(68,170,170,0.3), transparent)'}} />

            {/* Content */}
            <div className="px-5 pt-3 pb-4">
                <p className="text-paper-white/72 text-[14px] italic leading-[1.85] tracking-wide font-serif">
                    {highlightText(text)}
                </p>
            </div>

            {/* Bottom shimmer */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{background:'linear-gradient(to right, transparent, rgba(68,170,170,0.15), transparent)'}} />
        </div>
    </div>
);

// --- 1c. Flashback Renderer ---
export const FlashbackRenderer: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-full my-5 px-2 max-w-4xl mx-auto">
        <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/25 via-amber-900/10 to-yellow-900/25 pointer-events-none"></div>
            <div className="border-t border-b border-wuxia-gold/25 px-5 py-4 relative" style={{background:'rgba(20,14,5,0.6)'}}>
                <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-px h-3 bg-wuxia-gold/50" />
                    <div className="text-wuxia-gold/50 text-[10px] tracking-[0.25em] uppercase font-mono">Hồi tưởng</div>
                    <div className="flex-1 h-px bg-gradient-to-r from-wuxia-gold/20 to-transparent" />
                </div>
                <p className="text-paper-white/55 text-[14px] italic leading-relaxed tracking-wide">
                    {highlightText(text)}
                </p>
            </div>
        </div>
    </div>
);

// --- 1d. System Notification Renderer ---
export const SystemRenderer: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-full my-4 flex justify-center">
        <div className="inline-flex items-center gap-2.5 backdrop-blur-md border border-wuxia-gold/20 rounded-md px-4 py-2 shadow-lg" style={{background:'rgba(10,8,5,0.7)'}}>
            <div className="w-1.5 h-1.5 rounded-full bg-wuxia-gold/60" />
            <IconGlyph name="system" className="w-4 h-4 text-wuxia-gold/50 shrink-0" strokeWidth={1.5} />
            <span className="text-paper-white/80 text-xs tracking-wider font-mono">
                {text}
            </span>
        </div>
    </div>
);

// --- 1e. Scenery Renderer ---
export const SceneryRenderer: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-full my-6 max-w-4xl mx-auto px-2">
        <div className="relative rounded-lg px-6 py-4 border-l-2 border-wuxia-cyan/25 overflow-hidden" style={{background:'linear-gradient(to right, rgba(5,8,12,0.7), rgba(10,14,18,0.4), transparent)'}}>
            {/* Mountain watermark */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-[0.07]">
                <IconGlyph name="mountain" className="w-10 h-10 text-wuxia-cyan" strokeWidth={1} />
            </div>
            <div className="absolute top-0 left-0 bottom-0 w-[2px]" style={{background:'linear-gradient(to bottom, transparent, rgba(68,170,170,0.5), transparent)'}} />
            <p className="text-paper-white/60 text-[15px] leading-loose tracking-wider pr-8">
                {highlightText(text)}
            </p>
        </div>
    </div>
);

// --- 2. Character Dialogue Renderer ---
export const CharacterRenderer: React.FC<{ 
    sender: string; 
    text: string; 
    providedAvatar?: string; 
    isUser?: boolean; 
    isGenerating?: boolean;
    identity?: string;
    personality?: string;
    relationStatus?: string;
    favorability?: number;
}> = ({ sender, text, providedAvatar, isUser, isGenerating, identity, personality, relationStatus, favorability }) => {
    let avatarUrl = providedAvatar;
    
    return (
        <div className={`flex w-full my-7 items-start group pl-0 sm:pl-2 animate-fade-in relative ${isUser ? 'flex-col sm:flex-row-reverse pr-0 sm:pr-2' : 'flex-col sm:flex-row'}`}>
            {/* Hover backdrop */}
            <div className="absolute -inset-x-4 -inset-y-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" style={{background: isUser ? 'rgba(230,200,110,0.02)' : 'rgba(255,255,255,0.01)'}} />

            {/* Avatar and Name column - Row layout on mobile, Column on desktop */}
            <div className={`flex flex-row sm:flex-col items-center relative z-20 shrink-0 w-full sm:w-auto mb-3 sm:mb-0 ${isUser ? 'sm:ml-5 sm:mr-0 justify-end' : 'sm:mr-5 sm:ml-0 justify-start'}`}>
                <div className="relative">
                    {/* Glow ring */}
                    <div className={`absolute -inset-[3px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${isUser ? 'bg-wuxia-gold/10' : 'bg-paper-white/5'}`} style={{filter:'blur(4px)'}} />
                    <div className={`w-14 h-14 rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500 flex items-center justify-center ${isUser ? 'border border-wuxia-gold/50' : 'border border-paper-white/15'}`} style={{background:'#050505'}}>
                        {isGenerating ? (
                            <div className="w-full h-full relative overflow-hidden bg-ink-wash/20">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-wuxia-gold/10 to-transparent animate-shimmer" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border-2 border-wuxia-gold/30 border-t-wuxia-gold animate-spin" />
                                </div>
                            </div>
                        ) : avatarUrl ? (
                            <img 
                                src={avatarUrl} 
                                alt={sender} 
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                onError={(e) => {
                                    const parent = (e.target as HTMLImageElement).parentElement;
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    if (parent) {
                                        parent.classList.add('flex', 'items-center', 'justify-center', 'bg-ink-wash/20');
                                        const span = document.createElement('span');
                                        span.className = `font-serif font-black text-2xl ${isUser ? 'text-wuxia-gold' : 'text-paper-white/60'}`;
                                        span.style.textShadow = '0 2px 10px rgba(0,0,0,0.5)';
                                        span.textContent = sender.charAt(0);
                                        parent.appendChild(span);
                                    }
                                }}
                            />
                        ) : (
                            <div className={`flex items-center justify-center w-full h-full bg-ink-wash/10 ${isUser ? 'bg-wuxia-gold/5' : 'bg-white/5'}`}>
                                <span className={`font-serif font-black text-2xl ${isUser ? 'text-wuxia-gold' : 'text-paper-white/60'}`} style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
                                    {sender.charAt(0)}
                                </span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
                    </div>
                </div>

                {/* Name tag */}
                <div className={`mt-0 sm:mt-2.5 ml-3 sm:ml-0 relative order-2 sm:order-none`}>
                    <div className={`px-2.5 py-1 rounded-md shadow-lg min-w-[60px] text-center ${isUser ? 'border border-wuxia-gold/40' : 'border border-paper-white/10'}`} style={{background: isUser ? 'rgba(20,15,5,0.9)' : 'rgba(10,10,10,0.85)', backdropFilter:'blur(8px)'}}>
                        <span className={`font-serif font-black text-[10px] tracking-[0.12em] uppercase block truncate max-w-[120px] ${isUser ? 'text-wuxia-gold' : 'text-paper-white/70'}`} title={sender}>
                            {sender}
                        </span>
                    </div>
                    {isUser && (
                        <div className="hidden sm:block">
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-wuxia-gold rounded-full" style={{boxShadow:'0 0 4px rgba(230,200,110,0.7)'}} />
                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-wuxia-gold rounded-full" style={{boxShadow:'0 0 4px rgba(230,200,110,0.7)'}} />
                        </div>
                    )}
                </div>
            </div>

            {/* Speech bubble */}
            <div className={`w-full sm:flex-1 relative ${isUser ? 'text-right' : ''}`}>
                {/* Meta info (Identity/Personality) */}
                {!isUser && (identity || personality) && (
                    <div className="flex items-center gap-2 mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        {identity && (
                            <span className="text-[9px] font-mono text-wuxia-gold/80 bg-wuxia-gold/5 px-1.5 py-0.5 rounded border border-wuxia-gold/15 uppercase tracking-tighter">
                                {identity}
                            </span>
                        )}
                        {personality && (
                            <span className="text-[9px] font-serif italic text-paper-white/50 truncate max-w-[200px]">
                                {personality}
                            </span>
                        )}
                        {relationStatus && (
                            <span className="text-[9px] font-mono font-bold text-wuxia-cyan/70 bg-wuxia-cyan/5 px-1.5 py-0.5 rounded border border-wuxia-cyan/20">
                                {relationStatus} {favorability !== undefined ? `(${favorability})` : ''}
                            </span>
                        )}
                    </div>
                )}

                <div
                    className={`relative rounded-2xl p-4 sm:p-5 shadow-2xl group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ${isUser ? 'border border-wuxia-gold/25' : 'border border-paper-white/8'}`}
                    style={{
                        background: isUser ? 'rgba(18,12,4,0.55)' : 'rgba(12,12,12,0.45)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                    }}
                >
                    {/* Bubble tail - hidden on mobile for cleaner look */}
                    <div className={`hidden sm:block absolute top-5 ${isUser ? '-right-[7px] border-r border-t border-wuxia-gold/25' : '-left-[7px] border-l border-b border-paper-white/8'} w-3.5 h-3.5 rotate-45`} style={{background: isUser ? 'rgba(18,12,4,0.55)' : 'rgba(12,12,12,0.45)'}} />

                    <p className="font-sans text-[16px] leading-[1.85] text-paper-white/88 tracking-wide selection:bg-wuxia-gold/30 first-letter:text-xl first-letter:font-serif first-letter:text-wuxia-gold first-letter:mr-0.5">
                        {highlightText(text)}
                    </p>

                    {/* Bottom glow */}
                    <div className="absolute bottom-0 left-10 right-10 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" style={{background:'linear-gradient(to right, transparent, rgba(230,200,110,0.15), transparent)'}} />
                </div>
            </div>
        </div>
    );
};

// --- 3. Judgment Renderer ---
export const JudgmentRenderer: React.FC<{ text: string; isNsfw?: boolean }> = ({ text, isNsfw }) => {
    const parsed = parseJudgmentText(text);
    const scoreValue = parsed.score;
    const difficultyValue = parsed.difficulty;
    const result = parsed.result;

    const isSuccess = /(Success|Critical Success|Ultimate Success)/.test(result);
    // Specifically check for failure tokens to ensure we don't misidentify Success-only checks as failure
    const isFailure = /(Failure|Critical Failure|Ultimate Failure)/.test(result);
    const isUndetermined = result === 'Không xác định' || (!isSuccess && !isFailure);
    const isCrit = /(Critical|Ultimate)/.test(result);

    // Color config
    const accentColor = isNsfw
        ? { rgb: '236,72,153', hex: '#ec4899', cls: 'text-pink-400', bgCls: 'bg-pink-500', borderCls: 'border-pink-500/40' }
        : isUndetermined
            ? { rgb: '68,170,170', hex: '#44aaaa', cls: 'text-wuxia-cyan', bgCls: 'bg-wuxia-cyan', borderCls: 'border-wuxia-cyan/30' }
            : isSuccess
                ? { rgb: '230,200,110', hex: '#e6c86e', cls: 'text-wuxia-gold', bgCls: 'bg-wuxia-gold', borderCls: 'border-wuxia-gold/40' }
                : { rgb: '180,50,50', hex: '#b43232', cls: 'text-wuxia-red', bgCls: 'bg-wuxia-red', borderCls: 'border-wuxia-red/40' };

    const statusLabel = translateResult(result);
    const scoreBarPct = difficultyValue > 0 ? Math.min((scoreValue / difficultyValue) * 100, 150) : 100;
    const normalizedBarPct = Math.min(scoreBarPct, 100);

    return (
        <div className="w-full my-5 max-w-lg mx-auto px-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div
                className={`relative overflow-hidden border ${accentColor.borderCls}`}
                style={{
                    background: 'rgba(5,5,8,0.85)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '4px',
                    boxShadow: `0 0 20px rgba(${accentColor.rgb},0.08), inset 0 1px 0 rgba(255,255,255,0.03)`,
                }}
            >
                {/* Scanline overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-30 opacity-[0.04]"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                    }}
                />

                {/* Left accent bar */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] z-20"
                    style={{ background: `linear-gradient(to bottom, rgba(${accentColor.rgb},0.6), rgba(${accentColor.rgb},0.1))` }}
                />

                {/* ─── Row 1: Header ─── */}
                <div className="relative z-10 flex items-center justify-between px-4 py-2 border-b border-white/[0.04]">
                    <div className="flex items-center gap-2 min-w-0">
                        <IconGlyph name={isNsfw ? 'heart' : 'dice'} className={`w-3 h-3 ${accentColor.cls} shrink-0`} strokeWidth={1.5} />
                        <span className={`text-[10px] font-mono font-black tracking-[0.12em] uppercase truncate ${accentColor.cls}`}>{parsed.eventName}</span>
                        <span className="text-[8px] text-paper-white/20 font-mono">·</span>
                        <span className="text-[9px] text-paper-white/40 font-serif italic truncate">:{parsed.target}</span>
                    </div>
                    {isCrit && (
                        <span
                            className={`text-[7px] font-mono font-black uppercase tracking-[0.15em] px-1.5 py-0.5 rounded-sm ${accentColor.cls} shrink-0`}
                            style={{ background: `rgba(${accentColor.rgb},0.12)`, border: `1px solid rgba(${accentColor.rgb},0.25)` }}
                        >Cực hạn</span>
                    )}
                </div>

                {/* ─── Row 2: Score Comparison Bar ─── */}
                <div className="relative z-10 px-4 py-3">
                    {/* Numbers row */}
                    <div className="flex items-end justify-between mb-1.5">
                        <div className="flex items-baseline gap-1">
                            <span className="text-[8px] text-paper-white/25 font-mono uppercase tracking-widest">DC</span>
                            <span className="text-sm font-mono font-black text-paper-white/50">{difficultyValue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-2xl font-mono font-black ${accentColor.cls}`}
                                style={{ textShadow: `0 0 12px rgba(${accentColor.rgb},0.5), 0 0 4px rgba(${accentColor.rgb},0.3)` }}
                            >
                                {scoreValue}
                            </span>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="relative w-full h-[6px] rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        {/* Difficulty threshold marker */}
                        <div
                            className="absolute top-0 bottom-0 w-[1px] z-10"
                            style={{
                                left: `${Math.min((difficultyValue / Math.max(scoreValue, difficultyValue, 1)) * 100, 100)}%`,
                                background: 'rgba(255,255,255,0.25)',
                                boxShadow: '0 0 3px rgba(255,255,255,0.1)',
                            }}
                        />
                        {/* Score fill */}
                        <div
                            className="h-full rounded-sm transition-all duration-1000 ease-out relative"
                            style={{
                                width: `${normalizedBarPct}%`,
                                background: `linear-gradient(90deg, rgba(${accentColor.rgb},0.3), rgba(${accentColor.rgb},0.7))`,
                                boxShadow: `0 0 8px rgba(${accentColor.rgb},0.3)`,
                            }}
                        >
                            <div
                                className="absolute right-0 top-0 bottom-0 w-[2px]"
                                style={{ background: `rgba(${accentColor.rgb},1)`, boxShadow: `0 0 6px rgba(${accentColor.rgb},0.8)` }}
                            />
                        </div>
                    </div>

                    {/* Result label */}
                    <div className="flex items-center justify-center mt-2.5">
                        <span
                            className={`text-xs font-serif font-black italic tracking-[0.2em] uppercase ${accentColor.cls}`}
                            style={{ textShadow: `0 0 8px rgba(${accentColor.rgb},0.4)` }}
                        >
                            {statusLabel}
                        </span>
                    </div>
                </div>

                {/* ─── Row 3: Modifier Pills ─── */}
                {parsed.modifiers.length > 0 && (
                    <div className="relative z-10 px-4 pb-2.5 pt-0">
                        <div className="flex flex-wrap gap-1">
                            {parsed.modifiers.map((modifier, i) => {
                                const isPositive = modifier.value !== null && modifier.value > 0;
                                const isNegative = modifier.value !== null && modifier.value < 0;
                                return (
                                    <span
                                        key={`${modifier.key}-${i}`}
                                        className="inline-flex items-center gap-1 px-1.5 py-[2px] rounded-sm text-[8px] font-mono transition-colors cursor-default"
                                        style={{
                                            background: isPositive ? `rgba(${accentColor.rgb},0.08)` : isNegative ? 'rgba(180,50,50,0.08)' : 'rgba(255,255,255,0.02)',
                                            border: `1px solid ${isPositive ? `rgba(${accentColor.rgb},0.15)` : isNegative ? 'rgba(180,50,50,0.15)' : 'rgba(255,255,255,0.05)'}`,
                                        }}
                                        title={modifier.reason || modifier.label}
                                    >
                                        <span className="text-paper-white/35 uppercase tracking-wider font-black">{modifier.label}</span>
                                        {modifier.reason && <span className="text-paper-white/15 italic">({modifier.reason})</span>}
                                        <span className={`font-bold ${isPositive ? accentColor.cls : isNegative ? 'text-wuxia-red/70' : 'text-paper-white/25'}`}>
                                            {modifier.value === null ? '' : (modifier.value > 0 ? `+${modifier.value}` : modifier.value)}
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Bottom glow line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${accentColor.rgb},0.3), transparent)` }}
                />
            </div>
        </div>
    );
};
