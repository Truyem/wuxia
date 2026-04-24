import React from 'react';
import ApiSettings from './ApiSettings';
import PromptManager from './PromptManager';
import StorageManager from './StorageManager';
import ThemeSettings from './ThemeSettings';
import WorldSettings from './WorldSettings';
import GameSettings from './GameSettings';
import MemorySettings from './MemorySettings';
import HistoryViewer from './HistoryViewer';
import ContextViewer from './ContextViewer';
import RecallModelSettings from './RecallModelSettings';
import ArticleOptimizationSettings from './ArticleOptimizationSettings';
import MusicSettings from './MusicSettings';
import WorldEvolutionSettings from './WorldEvolutionSettings';
import NpcManager from './NpcManager';
import VariableManager from './VariableManager';
import OpeningConfigSettings from './OpeningConfigSettings';

import IconGlyph, { IconName } from '../../ui/Icon/IconGlyph';
import { CharacterData } from '../../../types';
import type {
    InterfaceSettingsStructure, PromptStructure, ThemePreset, VisualSettings as VisualSettingsType, FestivalStructure,
    GameSettings as GameSettingsType, MemoryConfig, MemorySystem, TavernSettingsStructure
} from '../../../types';

type ContextSection = {
    id: string;
    title: string;
    category: string;
    order: number;
    content: string;
    tokenEstimate?: number;
};

type ContextSnapshot = {
    sections?: ContextSection[];
    fullText?: string;
    totalTokens?: number;
};

interface Props {
    activeTab: 'api' | 'recall' | 'prompt' | 'storage' | 'theme' | 'world' | 'game' | 'memory' | 'history' | 'context' | 'article_optimization' | 'world_evolution' | 'music' | 'npc' | 'variable' | 'opening_config';
    onTabChange: (tab: 'api' | 'recall' | 'prompt' | 'storage' | 'theme' | 'world' | 'game' | 'memory' | 'history' | 'context' | 'article_optimization' | 'world_evolution' | 'music' | 'npc' | 'variable' | 'opening_config') => void;
    onClose: () => void;

    // Config Props
    apiConfig: InterfaceSettingsStructure;
    visualConfig: VisualSettingsType;
    gameConfig: GameSettingsType;
    memoryConfig: MemoryConfig;
    prompts: PromptStructure[];
    festivals: FestivalStructure[];
    currentTheme: ThemePreset;

    // Data Props
    history: any[];
    memorySystem: MemorySystem;
    contextSnapshot?: any;
    socialList?: any[];
    runtimeState?: Record<string, unknown>;
    openingConfig?: any;

    // Actions
    onSaveApi: (config: InterfaceSettingsStructure) => void;
    onSaveVisual: (config: VisualSettingsType) => void;
    onSaveGame: (config: GameSettingsType) => void;
    onSaveMemory: (config: MemoryConfig) => void;
    onSaveOpeningConfig?: (config: any) => void;

    onUpdatePrompts: (prompts: PromptStructure[]) => void;
    onUpdateFestivals: (festivals: FestivalStructure[]) => void;
    onThemeChange: (theme: ThemePreset) => void;
    
    onCreateNpc?: (seed?: any) => any;
    onSaveNpc?: (npcId: string, npc: any) => void;
    onDeleteNpc?: (npcId: string) => void;
    onReplaceSection?: (section: string, value: unknown) => void;
    onApplyCommand?: (command: any) => void;

    onReturnToHome?: () => void;
    isHome?: boolean;
    requestConfirm?: (options: { title?: string; message: string; confirmText?: string; cancelText?: string; danger?: boolean }) => Promise<boolean>;
    currentEnvironment?: any;
}

const SettingsModal: React.FC<Props> = ({
    activeTab, onTabChange, onClose,
    apiConfig, visualConfig, gameConfig, memoryConfig, prompts, festivals, currentTheme, history, memorySystem, contextSnapshot, socialList, runtimeState,
    onSaveApi, onSaveVisual, onSaveGame, onSaveMemory, onUpdatePrompts, onUpdateFestivals, onThemeChange,
    onCreateNpc, onSaveNpc, onDeleteNpc, onReplaceSection, onApplyCommand,
    onReturnToHome, isHome, requestConfirm, currentEnvironment
}) => {
    const tabItems: { id: string; label: string; icon: IconName }[] = [
        { id: 'opening_config', label: 'Cấu hình khởi đầu', icon: 'plan' },
        { id: 'npc', label: 'Quản lý NPC', icon: 'social' },
        { id: 'variable', label: 'Biến lưu trữ', icon: 'plan' },
        { id: 'music', label: 'Âm nhạc & Âm thanh', icon: 'atmosphere' },
        { id: 'article_optimization', label: 'Tối ưu hóa văn bản', icon: 'agreement' },
        { id: 'world_evolution', label: 'Tiến hóa thế giới', icon: 'memory' },
        { id: 'game', label: 'Cài đặt trò chơi', icon: 'gameplay' },
        { id: 'world', label: 'Cài đặt thế giới', icon: 'mountain' },
        { id: 'memory', label: 'Cấu hình bộ nhớ', icon: 'memory' },
        { id: 'api', label: 'Kết nối API', icon: 'link' },
        { id: 'recall', label: 'Bộ nhớ cốt truyện', icon: 'story' },
        { id: 'history', label: 'Lịch sử tương tác', icon: 'logs' },
        { id: 'context', label: 'Bối cảnh AI', icon: 'atmosphere' },
        { id: 'prompt', label: 'Thư viện Prompt', icon: 'prompt' },
        { id: 'storage', label: 'Lưu trữ dữ liệu', icon: 'save' },
        { id: 'theme', label: 'Phong cách giao diện', icon: 'theme' }
    ];

    return (
        <div className="fixed inset-0 bg-ink-black/90 backdrop-blur-md z-[600] overflow-y-auto flex items-center justify-center font-sans"
            style={{ background: 'radial-gradient(circle at center, rgb(var(--c-ink-black) / 0.8) 0%, rgb(var(--c-ink-black) / 0.98) 100%)' }}>

            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            <div className="w-full h-full md:w-[95vw] md:h-[90vh] md:max-w-6xl flex items-center justify-center p-0 md:p-6">
                <div className="bg-modal-gradient w-full h-full flex shadow-[0_0_80px_rgba(var(--c-ink-black),0.8),0_0_40px_rgb(var(--c-wuxia-gold)/0.1)] p-0 overflow-hidden backdrop-blur-2xl rounded-3xl border border-wuxia-gold/10">

                    <div className="flex w-full h-full min-h-0 relative">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-ink-wash opacity-5 pointer-events-none rotate-180" />

                        {/* Sidebar */}
                        <div className="hidden md:flex w-72 flex-col pt-10 relative z-20 min-h-0 shrink-0 border-r border-wuxia-gold/15"
                            style={{
                                background: 'linear-gradient(180deg, rgb(var(--c-ink-black) / 0.95) 0%, rgb(var(--c-ink-black) / 0.9) 100%)',
                            }}>

                            {/* Inner glow */}
                            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-wuxia-gold/30 to-transparent" />

                            {/* Header */}
                            <div className="px-8 mb-10">
                                <div className="text-center relative group">
                                    <div className="absolute -inset-4 bg-wuxia-gold/5 blur-2xl rounded-none opacity-0 group-hover:opacity-100" />
                                    <h2 className="relative text-2xl text-wuxia-gold font-serif tracking-[0.4em] font-black flex items-center gap-3 py-2"
                                        style={{ textShadow: '0 0 15px rgb(var(--c-wuxia-gold)/0.4)' }}>
                                        <IconGlyph name="settings" className="w-6 h-6" strokeWidth={2} /> CÀI ĐẶT
                                    </h2>
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-wuxia-gold/40 to-transparent scale-x-75 mt-1" />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-1 pb-10">
                                {tabItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => onTabChange(item.id as any)}
                                        className={`wuxia-list-item relative w-full px-4 py-3 flex items-center gap-3 group transition-all mb-1 rounded-2xl ${activeTab === item.id
                                            ? 'active text-wuxia-gold shadow-[0_4px_15px_rgba(0,0,0,0.3)]'
                                            : 'text-paper-white/40 hover:text-paper-white/80'
                                            }`}
                                    >

                                        <span className={`transition-all duration-300 ease-out ${activeTab === item.id ? 'scale-110 rotate-3 text-wuxia-gold' : 'group-hover:scale-110'}`}>
                                            <IconGlyph name={item.icon} className="w-5 h-5" strokeWidth={1.5} />
                                        </span>

                                        <span className={`relative z-10 font-sans font-bold text-[13px] tracking-[0.1em] transition-all duration-300 ease-out ${activeTab === item.id ? 'translate-x-3 text-wuxia-gold' : 'group-hover:translate-x-3 opacity-80 group-hover:opacity-100'}`}>
                                            {item.label}
                                        </span>

                                        {activeTab === item.id && (
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-wuxia-gold shadow-[0_0_10px_rgb(var(--c-wuxia-gold))]" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Sidebar Footer */}
                            <div className="p-6 mt-auto">
                                <button
                                    onClick={onClose}
                                    className="w-full py-3.5 px-4 bg-ink-black/40 border border-wuxia-gold/20 hover:border-wuxia-gold/50 text-wuxia-gold font-bold text-[11px] tracking-[0.3em] rounded-2xl flex items-center justify-center gap-2 group overflow-hidden relative transition-all"
                                >
                                    <div className="absolute inset-0 bg-wuxia-gold/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        ĐÓNG CỬA SỔ
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Header - Compact & Premium */}
                        <div className="md:hidden w-full h-full flex flex-col min-h-0 bg-ink-black/98">
                            <div className="shrink-0 relative z-30 border-b border-wuxia-gold/20"
                                style={{ background: 'linear-gradient(180deg, rgb(var(--c-ink-black)) 0%, rgb(var(--c-ink-gray)) 100%)' }}>
                                <div className="px-5 py-4 flex items-center justify-between">
                                    <h2 className="text-lg text-wuxia-gold font-serif font-black tracking-[0.2em] flex items-center gap-2">
                                        <IconGlyph name="settings" className="w-5 h-5" /> CÀI ĐẶT
                                    </h2>
                                    <button onClick={onClose} className="p-2 text-wuxia-gold bg-wuxia-gold/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                                <div className="px-2 pb-3 overflow-x-auto no-scrollbar scroll-smooth">
                                    <div className="flex gap-2 min-w-max px-2">
                                        {tabItems.map(item => (
                                            <button
                                                key={`m-${item.id}`}
                                                onClick={() => onTabChange(item.id as any)}
                                                className={`px-4 py-2 rounded-2xl text-[12px] whitespace-nowrap font-bold border transition-all ${activeTab === item.id
                                                    ? 'bg-wuxia-gold text-ink-black border-wuxia-gold'
                                                    : 'text-paper-white/60 border-wuxia-gold/10 bg-paper-white/5'
                                                    }`}
                                                style={activeTab === item.id ? { boxShadow: '0 4px 15px rgb(var(--c-wuxia-gold)/0.4)' } : undefined}
                                            >
                                                <span className="flex items-center gap-1.5">
                                                    <IconGlyph name={item.icon} className="w-4 h-4" /> {item.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Content */}
                            <div className="flex-1 min-h-0 p-5 overflow-y-auto relative z-10 custom-scrollbar bg-ink-black/20">
                                <div className="max-w-xl mx-auto space-y-8 pb-10">
                                    {activeTab === 'api' && <ApiSettings settings={apiConfig} onSave={onSaveApi} />}
                                    {activeTab === 'recall' && <RecallModelSettings settings={apiConfig} onSave={onSaveApi} />}
                                    {activeTab === 'prompt' && <PromptManager prompts={prompts} onUpdate={onUpdatePrompts} requestConfirm={requestConfirm} apiConfig={apiConfig} />}
                                    {activeTab === 'world' && <WorldSettings festivals={festivals || []} onUpdate={onUpdateFestivals} requestConfirm={requestConfirm} />}
                                    {activeTab === 'theme' && <ThemeSettings currentTheme={currentTheme} onThemeChange={onThemeChange} />}
                                    {activeTab === 'storage' && <StorageManager requestConfirm={requestConfirm} />}
                                    {activeTab === 'history' && <HistoryViewer history={history} memorySystem={memorySystem} />}
                                    {activeTab === 'context' && (
                                        <ContextViewer snapshot={contextSnapshot} />
                                    )}
                                    {activeTab === 'game' && gameConfig && onSaveGame && (
                                        <GameSettings settings={gameConfig} onSave={onSaveGame} />
                                    )}
                                    {activeTab === 'memory' && memoryConfig && onSaveMemory && (
                                        <MemorySettings settings={memoryConfig} onSave={onSaveMemory} />
                                    )}
                                    {activeTab === 'article_optimization' && <ArticleOptimizationSettings settings={apiConfig} onSave={onSaveApi} />}
                                    {activeTab === 'world_evolution' && <WorldEvolutionSettings settings={apiConfig} onSave={onSaveApi} />}
                                    {activeTab === 'music' && <MusicSettings />}
                                    {activeTab === 'npc' && socialList && onCreateNpc && onSaveNpc && onDeleteNpc && (
                                        <NpcManager 
                                            socialList={socialList} 
                                            memoryConfig={memoryConfig}
                                            onCreateNpc={onCreateNpc}
                                            onSaveNpc={onSaveNpc}
                                            onDeleteNpc={onDeleteNpc}
                                        />
                                    )}
                                    {activeTab === 'variable' && runtimeState && onReplaceSection && onApplyCommand && (
                                        <VariableManager 
                                            runtimeState={runtimeState as any}
                                            onReplaceSection={onReplaceSection as any}
                                            onApplyCommand={onApplyCommand as any}
                                        />
                                    )}
                                    {activeTab === 'opening_config' && onSaveOpeningConfig && (
                                        <OpeningConfigSettings 
                                            settings={openingConfig}
                                            onSave={onSaveOpeningConfig}
                                        />
                                    )}

                                </div>
                            </div>
                        </div>

                        {/* Desktop Content - Refined Spacing & Typography */}
                        <div className="hidden md:block flex-1 min-h-0 relative z-10 overflow-hidden">
                            <div className="absolute inset-0 bg-ink-wash opacity-[0.02] pointer-events-none" />

                            <div className="h-full overflow-y-auto p-10 custom-scrollbar relative z-20">
                                <div className="max-w-3xl mx-auto">
                                    <div className="mb-8 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-serif text-paper-white font-bold tracking-wider mb-2">
                                                {tabItems.find(t => t.id === activeTab)?.label}
                                            </h3>
                                            <div className="h-1 w-20 bg-gradient-to-r from-wuxia-gold to-transparent rounded-none" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        {activeTab === 'api' && <ApiSettings settings={apiConfig} onSave={onSaveApi} />}
                                        {activeTab === 'recall' && <RecallModelSettings settings={apiConfig} onSave={onSaveApi} />}
                                        {activeTab === 'prompt' && <PromptManager prompts={prompts} onUpdate={onUpdatePrompts} requestConfirm={requestConfirm} apiConfig={apiConfig} />}
                                        {activeTab === 'world' && <WorldSettings festivals={festivals || []} onUpdate={onUpdateFestivals} requestConfirm={requestConfirm} />}
                                        {activeTab === 'theme' && <ThemeSettings currentTheme={currentTheme} onThemeChange={onThemeChange} />}
                                        {activeTab === 'storage' && <StorageManager requestConfirm={requestConfirm} />}
                                        {activeTab === 'history' && <HistoryViewer history={history} memorySystem={memorySystem} />}
                                        {activeTab === 'context' && (
                                            <ContextViewer snapshot={contextSnapshot} />
                                        )}
                                        {activeTab === 'game' && gameConfig && onSaveGame && (
                                            <GameSettings settings={gameConfig} onSave={onSaveGame} />
                                        )}
                                        {activeTab === 'memory' && memoryConfig && onSaveMemory && (
                                            <MemorySettings settings={memoryConfig} onSave={onSaveMemory} />
                                        )}
                                        {activeTab === 'article_optimization' && <ArticleOptimizationSettings settings={apiConfig} onSave={onSaveApi} />}
                                        {activeTab === 'world_evolution' && <WorldEvolutionSettings settings={apiConfig} onSave={onSaveApi} />}
                                        {activeTab === 'music' && <MusicSettings />}
                                        {activeTab === 'npc' && socialList && onCreateNpc && onSaveNpc && onDeleteNpc && (
                                            <NpcManager 
                                                socialList={socialList} 
                                                memoryConfig={memoryConfig}
                                                onCreateNpc={onCreateNpc}
                                                onSaveNpc={onSaveNpc}
                                                onDeleteNpc={onDeleteNpc}
                                            />
                                        )}
                                        {activeTab === 'variable' && runtimeState && onReplaceSection && onApplyCommand && (
                                            <VariableManager 
                                                runtimeState={runtimeState as any}
                                                onReplaceSection={onReplaceSection as any}
                                                onApplyCommand={onApplyCommand as any}
                                            />
                                        )}
                                        {activeTab === 'opening_config' && onSaveOpeningConfig && (
                                            <OpeningConfigSettings 
                                                settings={openingConfig}
                                                onSave={onSaveOpeningConfig}
                                            />
                                        )}

                                    </div>

                                    <div className="h-20" /> {/* Bottom spacing */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
