import React, { useRef } from 'react';
import { TavernSettingsStructure, TavernPreset } from '../../../types';
import ToggleSwitch from '../../ui/ToggleSwitch';
import GameButton from '../../ui/GameButton';
import InlineSelect from '../../ui/InlineSelect';

interface Props {
    config: TavernSettingsStructure;
    onSave: (config: TavernSettingsStructure) => void;
    requestConfirm?: (options: { title?: string; message: string; confirmText?: string; cancelText?: string; danger?: boolean }) => Promise<boolean>;
}

const parseTavernCard = (jsonStr: string): Partial<TavernPreset> | null => {
    try {
        const full = JSON.parse(jsonStr);
        const data = full.data || full;
        return {
            name: data.name || '',
            description: data.description || '',
            style: data.personality || data.scenario || data.first_mes || '',
        };
    } catch {
        return null;
    }
}

const TavernSettings: React.FC<Props> = ({ config, onSave, requestConfirm }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!config || !config.presets || !Array.isArray(config.presets)) {
        return (
            <div className="p-8 text-center text-paper-white/40 border border-dashed border-wuxia-gold/30 rounded">
                Tavern preset loading or configuration abnormal....
            </div>
        );
    }

    const activePreset = config.presets.find(p => p.id === config.activePresetId);

    const updateConfig = (updates: Partial<TavernSettingsStructure>) => {
        onSave({ ...config, ...updates });
    };

    const updateActivePreset = (updates: Partial<TavernPreset>) => {
        if (!activePreset) return;
        const newPresets = config.presets.map(p => 
            p.id === activePreset.id ? { ...p, ...updates } : p
        );
        updateConfig({ presets: newPresets });
    };

    const handleImportClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const parsed = parseTavernCard(event.target?.result as string);
            if (parsed) {
                const newPreset: TavernPreset = {
                    id: Date.now().toString(),
                    name: parsed.name || 'New preset',
                    description: parsed.description || '',
                    style: parsed.style || '',
                    prompt: '',
                };
                updateConfig({
                    presets: [...config.presets, newPreset],
                    activePresetId: newPreset.id
                });
            } else {
                alert('Parsing failed，Please ensure it is a valid Tavern character card.JSONFile');
            }
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsText(file);
    };

    const handleDelete = async () => {
        if (!activePreset) return;
        const ok = requestConfirm 
            ? await requestConfirm({ title: 'Delete preset', message: `Are you sure you want to delete? ${activePreset.name} ?？`, danger: true, confirmText: 'Delete' })
            : window.confirm('Confirm deletion?？');
        if (!ok) return;

        const newPresets = config.presets.filter(p => p.id !== activePreset.id);
        updateConfig({
            presets: newPresets,
            activePresetId: newPresets.length > 0 ? newPresets[0].id : null
        });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-serif text-wuxia-gold border-b border-wuxia-gold/30 pb-2 mb-4">Tavern preset configuration</h3>

            <div className="flex items-center justify-between p-4 border border-wuxia-gold/20 bg-ink-black/5 rounded-none">
                <div>
                    <div className="font-bold text-paper-white/90">Enable Tavern preset mode</div>
                    <div className="text-xs text-paper-white/40 mt-1">Use Tavern character card(Tavern Card)To replace or supplement native prompts.</div>
                </div>
                <ToggleSwitch 
                    checked={config.enabled}
                    onChange={(val) => updateConfig({ enabled: val })} 
                />
            </div>

            <div className="flex gap-4 p-4 border border-wuxia-gold/20 bg-ink-black/5 rounded-none items-center">
                <input 
                    type="file" 
                    accept=".json" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleImport} 
                />
                <GameButton variant="primary" onClick={handleImportClick} className="px-4 py-2 text-xs">Import Tavern preset</GameButton>
                {activePreset && (
                    <GameButton variant="danger" onClick={handleDelete} className="px-4 py-2 text-xs !text-wuxia-red !border-wuxia-red">Delete current preset</GameButton>
                )}
            </div>

            {config.presets.length > 0 && (
                <div className="space-y-4 p-4 border border-wuxia-gold/20 bg-ink-black/5 rounded-none">
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-wuxia-gold mb-1">Current preset</label>
                             <InlineSelect
                                 value={config.activePresetId || ''}
                                 options={config.presets.map(p => ({ value: p.id, label: p.name }))}
                                 onChange={value => updateConfig({ activePresetId: value })}
                                 placeholder="Chọn Preset..."
                                 buttonClassName="bg-transparent border-wuxia-gold/20 p-2 text-paper-white/80 focus:border-wuxia-gold outline-none"
                             />
                        </div>
                        <div>
                            <label className="block text-xs text-wuxia-gold mb-1">Prompt post-processing method</label>
                            <InlineSelect
                                value={config.postProcessing}
                                options={[
                                    { value: 'Thêm vào trước prompt thế giới', label: 'Thêm vào trước prompt thế giới' },
                                    { value: 'Thêm vào sau prompt thế giới/cốt truyện gốc', label: 'Thêm vào sau prompt thế giới/cốt truyện gốc' },
                                    { value: 'Đè hoàn toàn prompt hệ thống', label: 'Đè hoàn toàn prompt hệ thống' }
                                ]}
                                onChange={value => updateConfig({ postProcessing: value as any })}
                                buttonClassName="bg-transparent border-wuxia-gold/20 p-2 text-paper-white/80 focus:border-wuxia-gold outline-none"
                            />
                        </div>
                    </div>

                    {activePreset && (
                        <div className="space-y-4 pt-4 border-t border-wuxia-gold/30">
                            <div>
                                <label className="block text-xs text-wuxia-gold mb-1">Preset name</label>
                                <input 
                                    className="w-full bg-transparent border border-wuxia-gold/20 p-2 text-paper-white/80 focus:border-wuxia-gold outline-none"
                                    value={activePreset.name}
                                    onChange={e => updateActivePreset({ name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-wuxia-gold mb-1">Character Card Role Description (Used for {'{{char}}'} / {'<charname>'})</label>
                                <textarea 
                                    className="w-full h-40 bg-transparent border border-wuxia-gold/20 p-2 text-xs font-mono text-paper-white/80 focus:border-wuxia-gold outline-none custom-scrollbar"
                                    value={activePreset.description}
                                    onChange={e => updateActivePreset({ description: e.target.value })}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs text-wuxia-gold mb-1">Character Card Reply Style (Used for system prompts)</label>
                                <textarea 
                                    className="w-full h-24 bg-transparent border border-wuxia-gold/20 p-2 text-xs font-mono text-paper-white/80 focus:border-wuxia-gold outline-none custom-scrollbar"
                                    value={activePreset.style}
                                    onChange={e => updateActivePreset({ style: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {config.presets.length === 0 && (
                <div className="p-8 text-center text-paper-white/40 border border-dashed border-wuxia-gold/30 rounded-none">
                    No Tavern presets have been imported yet.，Please click the button above to import
                </div>
            )}
        </div>
    );
};

export default TavernSettings;
