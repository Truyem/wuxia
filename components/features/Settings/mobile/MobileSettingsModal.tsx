import React from 'react';
import IconGlyph from '../../../ui/Icon/IconGlyph';
import ApiSettings from '../ApiSettings';
import PromptManager from '../PromptManager';
import StorageManager from '../StorageManager';
import ThemeSettings from '../ThemeSettings';
import VisualSettings from '../VisualSettings';
import WorldSettings from '../WorldSettings';
import GameSettings from '../GameSettings';
import MemorySettings from '../MemorySettings';
import HistoryViewer from '../HistoryViewer';
import ContextViewer from '../ContextViewer';
import RecallModelSettings from '../RecallModelSettings';
import ArticleOptimizationSettings from '../ArticleOptimizationSettings';
import WorldEvolutionSettings from '../WorldEvolutionSettings';
import RealWorldSettings from '../RealWorldSettings';
import TavernSettings from '../TavernSettings';
import type {
    InterfaceSettingsStructure, PromptStructure, ThemePreset, VisualSettings as VisualSettingsType, FestivalStructure,
    GameSettings as GameSettingsType, MemoryConfig, MemorySystem, ChatHistory, TavernSettingsStructure
} from '../../../../types';

type ContextSection = {
    id: string;
    title: string;
    category: string;
    order: number;
    content: string;
    tokenEstimate?: number;
};

type ContextSnapshot = {
    sections: ContextSection[];
    fullText: string;
    totalTokens?: number;
};

interface Props {
    activeTab: 'api' | 'recall' | 'prompt' | 'storage' | 'theme' | 'visual' | 'world' | 'game' | 'memory' | 'history' | 'context' | 'article_optimization' | 'world_evolution' | 'realworld' | 'tavern';
    onTabChange: (tab: 'api' | 'recall' | 'prompt' | 'storage' | 'theme' | 'visual' | 'world' | 'game' | 'memory' | 'history' | 'context' | 'article_optimization' | 'world_evolution' | 'realworld' | 'tavern') => void;
    onClose: () => void;
    apiConfig: InterfaceSettingsStructure;
    visualConfig: VisualSettingsType;
    gameConfig?: GameSettingsType;
    memoryConfig?: MemoryConfig;
    prompts: PromptStructure[];
    festivals: FestivalStructure[];
    currentTheme: ThemePreset;
    history: ChatHistory[];
    memorySystem?: MemorySystem;
    contextSnapshot?: ContextSnapshot;
    tavernSettings?: TavernSettingsStructure;
    onSaveApi: (config: InterfaceSettingsStructure) => void;
    onSaveVisual: (config: VisualSettingsType) => void;
    onSaveGame?: (config: GameSettingsType) => void;
    onSaveMemory?: (config: MemoryConfig) => void;
    onSaveTavern?: (config: TavernSettingsStructure) => void;
    onUpdatePrompts: (prompts: PromptStructure[]) => void;
    onUpdateFestivals: (festivals: FestivalStructure[]) => void;
    onThemeChange: (theme: ThemePreset) => void;
    onReturnToHome?: () => void;
    isHome?: boolean;
    requestConfirm?: (options: { title?: string; message: string; confirmText?: string; cancelText?: string; danger?: boolean }) => Promise<boolean>;
}

const MobileSettingsModal: React.FC<Props> = ({
    activeTab, onTabChange, onClose,
    apiConfig, visualConfig, gameConfig, memoryConfig, prompts, festivals, currentTheme, history, memorySystem, contextSnapshot,
    tavernSettings,
    onSaveApi, onSaveVisual, onSaveGame, onSaveMemory, onUpdatePrompts, onUpdateFestivals, onThemeChange,
    onSaveTavern,
    onReturnToHome, isHome, requestConfirm
}) => {
    const tabItems = [
        { id: 'game', label: 'Cài đặt game' },
        { id: 'world', label: 'Cài đặt thế giới' },
        { id: 'realworld', label: 'Thế giới thực' },
        { id: 'memory', label: 'Cấu hình ký ức' },
        { id: 'visual', label: 'Giao diện hiển thị' },
        { id: 'history', label: 'Lịch sử tương tác' },
        { id: 'context', label: 'Context' },
        { id: 'api', label: 'Kết nối API' },
        { id: 'recall', label: 'Ký ức cốt truyện' },
        { id: 'article_optimization', label: 'Tối ưu hóa văn bản' },
        { id: 'world_evolution', label: 'Tiến hóa thế giới' },
        { id: 'prompt', label: 'Thư viện Prompt' },
        { id: 'storage', label: 'Lưu trữ dữ liệu' },
        { id: 'theme', label: 'Phong cách giao diện' }
    ] as const;

    return (
        <div className="fixed inset-0 z-[610] bg-black/70 backdrop-blur-md flex items-start justify-center p-3 pt-5 md:hidden animate-fadeIn overflow-y-auto">
            <div className="w-full max-w-[680px] h-[86vh] max-h-[92dvh] overflow-hidden flex flex-col rounded-2xl"
                style={{ background: 'linear-gradient(145deg, rgb(var(--c-ink-black) / 0.99) 0%, rgb(var(--c-ink-gray) / 0.97) 100%)', border: '1px solid rgb(var(--c-wuxia-gold)/0.25)', boxShadow: '0 0 60px rgba(0,0,0,0.5), 0 0 30px rgb(var(--c-wuxia-gold)/0.06)' }}>
                {/* Header */}
                <div className="shrink-0" style={{ borderBottom: '1px solid rgb(var(--c-wuxia-gold)/0.2)', background: 'linear-gradient(180deg, rgb(var(--c-ink-black) / 0.99) 0%, rgb(var(--c-ink-gray) / 0.95) 100%)' }}>
                    {/* Top glow line */}
                    <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--c-wuxia-gold)/0.5), transparent)' }} />
                    <div className="px-4 py-3 flex items-center justify-between">
                        <div>
                            <div className="text-wuxia-gold font-serif font-black tracking-[0.28em] text-sm flex items-center gap-2"
                                style={{ textShadow: '0 0 12px rgb(var(--c-wuxia-gold)/0.5)' }}>
                                <IconGlyph name="settings" className="h-4 w-4" /> Cài Đặt
                            </div>
                            <div className="text-[9px] text-paper-white/40 mt-0.5 tracking-[0.2em] font-sans">SETTINGS PANEL</div>
                        </div>
                        <div className="flex items-center gap-2">
                            {!isHome && onReturnToHome && (
                                <button
                                    onClick={onReturnToHome}
                                    className="px-2.5 py-1 text-[10px] rounded border border-red-900/60 text-red-400 bg-red-900/10"
                                >
                                    Quay lại
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-black font-bold text-sm"
                                style={{ background: 'linear-gradient(135deg, rgb(var(--c-wuxia-gold)) 0%, rgb(var(--c-wuxia-gold-dark)) 100%)', boxShadow: '0 0 10px rgb(var(--c-wuxia-gold)/0.4)' }}
                                title="Đóng"
                            >
                                <IconGlyph name="close" className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="px-3 pb-3 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-1.5 min-w-max">
                            {tabItems.map(item => (
                                <button
                                    key={`mobile-tab-${item.id}`}
                                    onClick={() => onTabChange(item.id as any)}
                                    className={`px-3 py-1.5 rounded-full text-[11px] transition-all duration-200 font-semibold whitespace-nowrap ${activeTab === item.id
                                        ? 'text-black'
                                        : 'text-paper-white/50 border border-wuxia-gold/20'
                                        }`}
                                    style={activeTab === item.id ? {
                                        background: 'linear-gradient(135deg, rgb(var(--c-wuxia-gold)) 0%, rgb(var(--c-wuxia-gold-dark)) 100%)',
                                        boxShadow: '0 0 10px rgb(var(--c-wuxia-gold)/0.4)',
                                    } : undefined}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4"
                    style={{ background: 'linear-gradient(135deg, rgb(var(--c-ink-black) / 0.6) 0%, rgb(var(--c-ink-gray) / 0.4) 100%)' }}>
                    {activeTab === 'api' && <ApiSettings settings={apiConfig} onSave={onSaveApi} />}
                    {activeTab === 'recall' && <RecallModelSettings settings={apiConfig} onSave={onSaveApi} />}
                    {activeTab === 'prompt' && <PromptManager prompts={prompts} onUpdate={onUpdatePrompts} requestConfirm={requestConfirm} />}
                    {activeTab === 'world' && <WorldSettings festivals={festivals || []} onUpdate={onUpdateFestivals} requestConfirm={requestConfirm} />}
                    {activeTab === 'theme' && <ThemeSettings currentTheme={currentTheme} onThemeChange={onThemeChange} />}
                    {activeTab === 'visual' && <VisualSettings settings={visualConfig} onSave={onSaveVisual} />}
                    {activeTab === 'storage' && <StorageManager requestConfirm={requestConfirm} />}
                    {activeTab === 'history' && <HistoryViewer history={history} memorySystem={memorySystem} />}
                    {activeTab === 'context' && contextSnapshot && (
                        <ContextViewer
                            snapshot={contextSnapshot}
                            memoryConfig={memoryConfig}
                            onSaveMemory={onSaveMemory}
                        />
                    )}
                    {activeTab === 'game' && gameConfig && onSaveGame && (
                        <GameSettings settings={gameConfig} onSave={onSaveGame} />
                    )}
                    {activeTab === 'memory' && memoryConfig && onSaveMemory && (
                        <MemorySettings settings={memoryConfig} onSave={onSaveMemory} />
                    )}
                    {activeTab === 'article_optimization' && <ArticleOptimizationSettings settings={apiConfig} onSave={onSaveApi} />}
                    {activeTab === 'world_evolution' && <WorldEvolutionSettings settings={apiConfig} onSave={onSaveApi} />}
                    {activeTab === 'realworld' && gameConfig && onSaveGame && (
                        <RealWorldSettings settings={gameConfig} onSave={onSaveGame} />
                    )}
                    {activeTab === 'tavern' && tavernSettings && onSaveTavern && (
                        <TavernSettings settings={tavernSettings} onSave={onSaveTavern} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileSettingsModal;

