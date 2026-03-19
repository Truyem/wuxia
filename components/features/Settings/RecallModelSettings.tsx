import React, { useEffect, useMemo, useState } from 'react';
import { ApiSettings, ApiConfig, FeatureModelPlaceholderConfig } from '../../../types';
import GameButton from '../../ui/GameButton';
import ToggleSwitch from '../../ui/ToggleSwitch';
import InlineSelect from '../../ui/InlineSelect';
import { normalizeApiSettings } from '../../../utils/apiConfig';
import IconGlyph from '../../ui/Icon/IconGlyph';
import ParallelogramSaveButton from '../../ui/ParallelogramSaveButton';

interface Props {
    settings: ApiSettings;
    onSave: (settings: ApiSettings) => void;
}

const RecallModelSettings: React.FC<Props> = ({ settings, onSave }) => {
    const [form, setForm] = useState<ApiSettings>(() => normalizeApiSettings(settings));
    const [modelOptions, setModelOptions] = useState<string[]>([]);
    const [loadingModels, setLoadingModels] = useState(false);
    const [message, setMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const normalized = normalizeApiSettings(settings);
        setForm(normalized);
        setModelOptions([]);
    }, [settings]);

    const activeConfig = useMemo<ApiConfig | null>(() => {
        if (!form.configs.length) return null;
        const selected = form.configs.find((cfg) => cfg.id === form.activeConfigId);
        return selected || form.configs[0] || null;
    }, [form.activeConfigId, form.configs]);

    const mainStoryParsingModel = useMemo(() => {
        return (form.featureModelPlaceholder.mainStoryModel || '').trim();
    }, [form.featureModelPlaceholder.mainStoryModel]);

    const independentModelEnabled = Boolean(form.featureModelPlaceholder.recallIndependentModelToggle);

    const updatePlaceholder = <K extends keyof FeatureModelPlaceholderConfig>(key: K, value: FeatureModelPlaceholderConfig[K]) => {
        setForm(prev => ({
            ...prev,
            featureModelPlaceholder: {
                ...prev.featureModelPlaceholder,
                [key]: value
            }
        }));
    };

    const fetchModelsFromCurrentConfig = async (): Promise<string[] | null> => {
        if (!activeConfig?.apiKey || !activeConfig?.baseUrl) {
            setMessage('Vui lòng điền API Key và Base URL trong cấu hình đang kích hoạt trước.');
            return null;
        }
        try {
            const base = activeConfig.baseUrl.replace(/\/+$/, '');
            const normalized = base.replace(/\/v1$/i, '');
            const candidateUrls = Array.from(new Set([
                `${normalized}/v1/models`,
                `${normalized}/models`,
                `${base}/models`
            ]));
            for (const url of candidateUrls) {
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${activeConfig.apiKey}`
                    }
                });
                if (!res.ok) continue;
                const data = await res.json();
                if (data && Array.isArray(data.data)) {
                    return data.data.map((m: any) => m?.id).filter(Boolean);
                }
            }
            setMessage('Lấy thất bại: Lỗi định dạng trả về.');
            return null;
        } catch (e: any) {
            setMessage(`Lấy thất bại: ${e.message}`);
            return null;
        }
    };

    const handleFetchModels = async () => {
        setLoadingModels(true);
        setMessage('');
        const models = await fetchModelsFromCurrentConfig();
        if (models) {
            setModelOptions(models);
            setMessage('Đã lấy danh sách mô hình bộ nhớ cốt truyện thành công.');
        }
        setLoadingModels(false);
    };

    const handleToggleIndependent = (checked: boolean) => {
        setForm(prev => {
            const currentModel = (prev.featureModelPlaceholder.recallModel || '').trim();
            return {
                ...prev,
                featureModelPlaceholder: {
                    ...prev.featureModelPlaceholder,
                    recallIndependentModelToggle: checked,
                    recallModel: checked ? (currentModel || mainStoryParsingModel || '') : ''
                }
            };
        });
    };

    const handleSave = () => {
        if (independentModelEnabled && !(form.featureModelPlaceholder.recallModel || '').trim()) {
            setMessage('Đã bật mô hình độc lập cho bộ nhớ cốt truyện, vui lòng lấy danh sách và chọn mô hình trước.');
            return;
        }
        const normalized = normalizeApiSettings(form);
        onSave(normalized);
        setForm(normalized);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const recallModelValue = (form.featureModelPlaceholder.recallModel || '').trim();
    const recallModelDisplay = independentModelEnabled ? recallModelValue : mainStoryParsingModel;
    const selectOptions = Array.from(
        new Set(
            [
                ...modelOptions,
                recallModelValue,
                mainStoryParsingModel
            ]
                .map(item => (item || '').trim())
                .filter(Boolean)
        )
    );

    return (
        <div className="space-y-6 text-sm animate-fadeIn pb-10">
            <div className="flex justify-between items-end border-b border-wuxia-gold/30 pb-4 mb-6">
                <div className="space-y-1">
                    <h3 className="text-wuxia-gold font-sans font-black text-2xl tracking-tighter text-shadow-gold">Mô hình bộ nhớ cốt truyện</h3>
                    <p className="text-[10px] text-wuxia-gold/60 tracking-[0.3em] font-bold uppercase pl-1">Story Memory Model</p>
                </div>
            </div>

            <div className="rounded-md border border-wuxia-gold/20 bg-ink-black/20 p-4 space-y-4">
                <div className="text-[11px] text-paper-white/50 italic">
                    Cấu hình kết nối đang dùng: <span className="text-wuxia-gold font-bold">{activeConfig?.name || 'Chưa cấu hình'}</span>. Bộ nhớ cốt truyện dùng địa chỉ và API key từ cấu hình này.
                </div>

                <label className="flex items-center justify-between gap-3 text-xs text-paper-white/80">
                    <span>Bật mô hình độc lập cho bộ nhớ cốt truyện</span>
                    <ToggleSwitch
                        checked={independentModelEnabled}
                        onChange={handleToggleIndependent}
                        ariaLabel="Chuyển đổi mô hình độc lập bộ nhớ cốt truyện"
                    />
                </label>

                <div className="flex gap-3 items-end">
                    <div className="flex-1 space-y-1">
                        <label className="text-xs text-paper-white/80">Mô hình dùng cho Bộ nhớ cốt truyện</label>
                        <InlineSelect
                            value={recallModelDisplay}
                            options={selectOptions.map((model) => ({
                                value: model,
                                label: model
                            }))}
                            onChange={(model) => updatePlaceholder('recallModel', model)}
                            disabled={!independentModelEnabled || selectOptions.length === 0}
                            placeholder={!independentModelEnabled
                                ? `Theo mô hình cốt truyện chính: ${mainStoryParsingModel || 'Chưa thiết lập'}`
                                : (selectOptions.length ? 'Vui lòng chọn mô hình' : 'Vui lòng nhấp Lấy danh sách trước')}
                            buttonClassName={independentModelEnabled
                                ? 'bg-wuxia-gold/20 border-wuxia-gold/40 hover:bg-wuxia-gold/30 py-2.5'
                                : 'bg-ink-black/20 border-wuxia-gold/10 py-2.5'}
                        />
                    </div>
                    <GameButton
                        onClick={handleFetchModels}
                        variant="secondary"
                        className="px-4 py-2 text-xs"
                        disabled={loadingModels}
                    >
                        {loadingModels ? '...' : 'Lấy danh sách'}
                    </GameButton>
                </div>

                {!independentModelEnabled && (
                    <div className="text-[11px] text-paper-white/40 italic">
                        Hiện tại: Đồng bộ với mô hình cốt truyện chính {mainStoryParsingModel ? `（${mainStoryParsingModel}）` : '（Chưa thiết lập mô hình cốt truyện chính）'}
                    </div>
                )}
            </div>

            <div className="rounded-md border border-wuxia-gold/20 bg-white/5 p-4 space-y-4">
                <div className="text-xs text-wuxia-gold font-bold uppercase tracking-wider">Chiến lược truy xuất bộ nhớ</div>

                <label className="flex items-center justify-between gap-3 text-xs text-paper-white/80">
                    <span>Chế độ im lặng (Không hiện xác nhận, tự động đính kèm bộ nhớ)</span>
                    <ToggleSwitch
                        checked={Boolean(form.featureModelPlaceholder.recallSilentConfirmation)}
                        onChange={(next) => updatePlaceholder('recallSilentConfirmation', next)}
                        ariaLabel="Chuyển bộ nhớ cốt truyện sang chế độ im lặng"
                    />
                </label>

                <div className="space-y-1">
                    <label className="text-xs text-paper-white/80">Số lần truy xuất toàn văn (N gần nhất)</label>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={Number(form.featureModelPlaceholder.recallFullContextLimitN || 20)}
                        onChange={(e) => updatePlaceholder('recallFullContextLimitN', Math.max(1, Number(e.target.value) || 20))}
                        className="w-full bg-ink-black/20 border border-wuxia-gold/20 p-2 text-paper-white rounded-md outline-none focus:border-wuxia-gold transition-all"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-paper-white/80">Vòng bắt đầu kích hoạt truy xuất ký ức cốt truyện.</label>
                    <input
                        type="number"
                        min={1}
                        max={9999}
                        value={Number(form.featureModelPlaceholder.recallEarliestTriggerTurn || 10)}
                        onChange={(e) => updatePlaceholder('recallEarliestTriggerTurn', Math.max(1, Number(e.target.value) || 10))}
                        className="w-full bg-ink-black/20 border border-wuxia-gold/20 p-2 text-paper-white rounded-md outline-none focus:border-wuxia-gold transition-all"
                    />
                    <div className="text-[11px] text-paper-white/40 italic">
                        Ví dụ điền 6, thì vòng 1-5 không gọi API bộ nhớ cốt truyện, bắt đầu kích hoạt từ vòng 6 trở đi.
                    </div>
                </div>
            </div>

            {message && <p className="text-xs text-wuxia-gold animate-pulse">{message}</p>}

            <div className="pt-6 sticky bottom-0 bg-ink-black/80 backdrop-blur-md pb-4 z-20">
                <ParallelogramSaveButton
                    onClick={handleSave}
                    className="w-full"
                    label={showSuccess ? 'ĐÃ LƯU CÀI ĐẶT' : 'LƯU CÀI ĐẶT'}
                />
            </div>
        </div>
    );
};

export default RecallModelSettings;

