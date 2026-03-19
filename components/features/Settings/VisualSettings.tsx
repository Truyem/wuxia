import React, { useRef, useState, useMemo } from 'react';
import { VisualSettings as VisualSettingsType, VisualAreaCategory, AreaVisualSettings, ImportedFontInfo, EnvironmentData } from '../../../types';
import { ImageService } from '../../../services/imageService';
import { TextGenService } from '../../../services/textGenService';
import GameButton from '../../ui/GameButton';
import ToggleSwitch from '../../ui/ToggleSwitch';
import ParallelogramSaveButton from '../../ui/ParallelogramSaveButton';
import IconGlyph from '../../ui/Icon/IconGlyph';
import InlineSelect from '../../ui/InlineSelect';

interface Props {
    settings: VisualSettingsType;
    currentEnvironment?: EnvironmentData;
    onSave: (settings: VisualSettingsType) => void;
}

const AREAS: { id: VisualAreaCategory; label: string; desc: string }[] = [
    { id: 'Nội dung chat', label: 'Thân trò chuyện', desc: 'Lời người dùng, bản nháp phát trực tiếp và kiểu chữ chính tổng thể.' },
    { id: 'Bối cảnh', label: 'Bối cảnh', desc: 'Dẫn dắt, mô tả môi trường và bối cảnh câu chuyện.' },
    { id: 'Đối thoại', label: 'Hội thoại nhân vật', desc: 'Bong bóng thoại, thẻ tên và nội dung đối thoại.' },
    { id: 'Thẻ phán định', label: 'Thẻ kiểm tra', desc: 'Kết quả kiểm tra, giá trị và thẻ điều chỉnh.' },
    { id: 'Thanh trên', label: 'Thanh trên cùng', desc: 'Thời tiết, thời gian, lễ hội và biển hiệu.' },
    { id: 'Thanh trái', label: 'Thanh bên trái', desc: 'Bảng nhân vật, thanh trạng thái, khu vực trang bị.' },
    { id: 'Thanh phải', label: 'Thanh bên phải', desc: 'Menu hệ thống và cổng thao tác.' },
    { id: 'Hồ sơ nhân vật', label: 'Hồ sơ nhân vật', desc: 'Popup hồ sơ nhân vật và thông tin tài liệu.' },
];

const PRESET_COLORS = ['#ffffff', '#e5e7eb', '#d4af37', '#fca5a5', '#93c5fd', '#86efac', '#f9a8d4', '#1f2937'];
const FONT_SIZE_PRESETS = [12, 14.7, 17.3, 20, 22.7, 25.3, 28];
const LINE_HEIGHT_PRESETS = [1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4];
const DEFAULT_FONT_SIZE_PRESETS = [12, 14, 16, 18, 20, 22, 24];
const RENDER_LAYERS_PRESETS = [10, 25, 40, 55, 70, 85, 100];

const defaultAreaConfig: AreaVisualSettings = {
    enabled: false,
    fontFamily: 'Classical serif',
    fontStyle: 'normal',
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 1.6
};

const VisualSettings: React.FC<Props> = ({ settings, currentEnvironment, onSave }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeAreaId, setActiveAreaId] = useState<VisualAreaCategory>('Nội dung chat');
    const [hexInput, setHexInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [testImageUrl, setTestImageUrl] = useState<string | null>(null);
    const [isTestingImage, setIsTestingImage] = useState(false);
    const [testError, setTestError] = useState<string | null>(null);

    const safeSettings = useMemo(() => ({
        ...settings,
        areaSettings: settings.areaSettings || {},
        importedFonts: settings.importedFonts || [],
        defaultFontSizeChat: settings.defaultFontSizeChat || 16,
        defaultLineHeightChat: settings.defaultLineHeightChat || 1.6,
        renderLayers: settings.renderLayers || 30,
        timeFormat: settings.timeFormat || 'Traditional'
    }), [settings]);

    const activeAreaConfig = safeSettings.areaSettings[activeAreaId] || { ...defaultAreaConfig };

    const updateAreaConfig = (updates: Partial<AreaVisualSettings>) => {
        const newAreaConfig = { ...activeAreaConfig, ...updates };
        const newSettings = {
            ...safeSettings,
            areaSettings: {
                ...safeSettings.areaSettings,
                [activeAreaId]: newAreaConfig
            }
        };
        onSave(newSettings);
    };

    const handleNhậpFont = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const newFont: ImportedFontInfo = {
                    name: file.name.replace(/\.[^/.]+$/, ""),
                    identifier: `custom-font-${Date.now()}`,
                    data: base64String
                };
                onSave({
                    ...safeSettings,
                    importedFonts: [...(safeSettings.importedFonts || []), newFont]
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const availableFonts = [
        { label: 'Hệ thống mặc định', value: 'system-ui' },
        { label: 'Serif cổ điển', value: 'Classical serif' },
        ...(safeSettings.importedFonts || []).map(f => ({ label: f.name, value: f.identifier }))
    ];

    const [generatingForEnv, setGeneratingForEnv] = useState<string | null>(null);

    // Auto-generation logic for background
    React.useEffect(() => {
        const checkAndGenerateEnv = async () => {
            if (!currentEnvironment?.name || isGenerating || generatingForEnv === currentEnvironment.name) return;

            // Check if we need to generate a new image
            const isUsingDefaultOrOld = !safeSettings.backgroundImage || 
                                       (!safeSettings.backgroundImage.includes('/images/backgrounds/') && 
                                        !safeSettings.backgroundImage.startsWith('data:'));
            
            if (!isUsingDefaultOrOld) return;

            const workerUrl = safeSettings.imageGenWorkerUrl;
            if (!workerUrl) return;

            const cacheKey = `env_${currentEnvironment.name.replace(/\s+/g, '_')}`;
            const fileName = `${currentEnvironment.name.replace(/\s+/g, '_')}.png`;
            const envImagePath = `/images/backgrounds/${fileName}`;
            
            const existingImage = await ImageService.checkImageExists(envImagePath, cacheKey);
            
            if (existingImage) {
                if (safeSettings.backgroundImage !== existingImage) {
                    onSave({
                        ...safeSettings,
                        backgroundImage: existingImage
                    });
                }
            } else {
                setGeneratingForEnv(currentEnvironment.name);
                setIsGenerating(true);
                try {
                    const prompt = ImageService.constructBackgroundPrompt({
                        name: currentEnvironment.name,
                        description: currentEnvironment.description
                    });
                    const dataUrl = await ImageService.generateAndCache(workerUrl, { prompt }, cacheKey);
                    if (dataUrl) {
                        onSave({
                            ...safeSettings,
                            backgroundImage: dataUrl
                        });
                    }
                } catch (error) {
                    console.error('Environment background generation error:', error);
                } finally {
                    setIsGenerating(false);
                }
            }
        };

        checkAndGenerateEnv();
    }, [currentEnvironment?.name, safeSettings.backgroundImage, safeSettings.imageGenWorkerUrl]);

    const handleTestImage = async () => {
        const workerUrl = safeSettings.imageGenWorkerUrl;
        if (!workerUrl) {
            setTestError('Vui lòng nhập Worker URL trước.');
            return;
        }

        setIsTestingImage(true);
        setTestError(null);
        setTestImageUrl(null);

        try {
            const prompt = "A beautiful wuxia landscape, misty mountains, ancient pagoda, high quality, digital art";
            const result = await ImageService.generateImage(workerUrl, { prompt });
            setTestImageUrl(result);
        } catch (error: any) {
            console.error('Test image generation error:', error);
            setTestError(error.message || 'Lỗi khi tạo ảnh test.');
        } finally {
            setIsTestingImage(false);
        }
    };


    return (
        <div className="space-y-6 animate-fadeIn text-sm pb-10">
            {/* ... other code remains same ... */}
            {/* Header */}
            <div className="flex justify-between items-end border-b border-wuxia-gold/30 pb-4">
                <div className="space-y-1">
                    <h3 className="text-wuxia-gold font-sans font-black text-2xl tracking-tighter">Giao diện và Hiển thị</h3>
                    <p className="text-[10px] text-paper-white/40 tracking-[0.3em] font-bold uppercase pl-1">Cài đặt hình ảnh</p>
                </div>
            </div>

            {/* Preview Area */}
            <div className="bg-ink-black/5 border border-wuxia-gold/20 rounded-xl p-6 shadow-lg shadow-ink-black/20">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-paper-white font-bold tracking-wider opacity-90">Khu vực xem trước · {activeAreaId}</h4>
                    <span className="text-xs text-paper-white/40 font-sans">Font hiện tại: {activeAreaConfig.fontFamily}</span>
                </div>
                <div
                    className="p-4 bg-ink-black/10 border border-wuxia-gold/20 rounded-lg min-h-[80px] flex items-center shadow-inner"
                    style={{
                        fontFamily: activeAreaConfig.fontFamily,
                        fontStyle: activeAreaConfig.fontStyle,
                        color: activeAreaConfig.color,
                        fontSize: `${activeAreaConfig.fontSize}px`,
                        lineHeight: activeAreaConfig.lineHeight
                    }}
                >
                    Bạn đặt tay lên cán kiếm，Mắt nhìn qua những bóng người trong đại sảnh，Chỉ nghe tiếng va chạm kim loại mơ hồ trong gió.。
                </div>
            </div>

            {/* Area Font & Color Control */}
            <div className="bg-ink-black/5 border border-wuxia-gold/20 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute left-0 top-10 bottom-10 w-1 bg-gradient-to-b from-wuxia-gold/0 via-wuxia-gold/20 to-wuxia-gold/0"></div>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h4 className="text-paper-white font-bold text-lg mb-2">Kiểm soát font và màu theo vùng</h4>
                        <p className="text-xs text-paper-white/50 max-w-md leading-relaxed italic">
                            Từng vùng riêng biệt, sắp xếp dọc. Chọn vùng trước, sau đó chỉnh font, kiểu chữ, màu sắc, kích thước font, chiều cao dòng và font đã nhập.
                        </p>
                    </div>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-shrink-0 px-4 py-2 bg-wuxia-gold/10 hover:bg-wuxia-gold/20 border border-wuxia-gold/30 hover:border-wuxia-gold/60 text-wuxia-gold text-sm font-serif rounded-md transition-all active:scale-95 shadow-lg shadow-ink-black/20 flex items-center gap-2"
                    >
                        <IconGlyph name="import" className="w-4 h-4" /> Nhập Font
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleNhậpFont} accept=".ttf,.otf,.woff,.woff2" className="hidden" />
                </div>

                <div className="mb-4 text-xs text-paper-white/40 uppercase tracking-widest font-bold">Chọn vùng chỉnh sửa</div>
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {AREAS.map(area => (
                        <button
                            key={area.id}
                            onClick={() => setActiveAreaId(area.id)}
                            className={`p-4 rounded-xl border text-left transition-all duration-300 ${activeAreaId === area.id
                                    ? 'border-wuxia-gold/50 bg-wuxia-gold/10 shadow-[0_0_15px_rgba(var(--c-wuxia-gold),0.05)] text-wuxia-gold'
                                    : 'border-wuxia-gold/10 text-paper-white/30 hover:border-wuxia-gold/30 hover:bg-paper-white/5 shadow-md shadow-ink-black/10'
                                }`}
                        >
                            <div className={`font-bold mb-1 ${activeAreaId === area.id ? 'text-wuxia-gold' : 'text-paper-white/80'}`}>{area.label}</div>
                            <div className="text-[10px] text-paper-white/30 uppercase tracking-tighter">{area.desc}</div>
                        </button>
                    ))}
                </div>

                {/* Current Edit Config Block */}
                <div className="bg-ink-black/5 border border-wuxia-gold/20 rounded-xl p-6 shadow-lg shadow-ink-black/20">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-wuxia-gold/20">
                        <div>
                            <h5 className="text-paper-white font-bold text-lg">Đang chỉnh sửa：{activeAreaId}</h5>
                            <p className="text-[10px] text-paper-white/40 mt-1 italic">Mỗi khối cài đặt được sắp xếp dọc và độc lập, tránh nhiễu khi đọc và nhấp do căn hàng ngang.</p>
                        </div>
                        <ToggleSwitch
                            checked={activeAreaConfig.enabled}
                            onChange={(checked) => updateAreaConfig({ enabled: checked })}
                        />
                    </div>

                    <div className={`space-y-8 ${!activeAreaConfig.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                        {/* Font Family */}
                        <div>
                            <label className="block text-xs text-paper-white/50 mb-2 font-bold uppercase tracking-wider">Chọn font</label>
                            <InlineSelect
                                value={activeAreaConfig.fontFamily}
                                options={availableFonts}
                                onChange={(val) => updateAreaConfig({ fontFamily: val })}
                                placeholder="-- Chọn font chữ --"
                                buttonClassName="bg-ink-black/10 border-wuxia-gold/20 hover:border-wuxia-gold/50 py-3 text-paper-white text-xs"
                                panelClassName="max-w-full"
                            />
                        </div>

                        {/* Font Style */}
                        <div>
                            <label className="block text-xs text-paper-white/50 mb-2 font-bold uppercase tracking-wider">Kiểu chữ</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateAreaConfig({ fontStyle: 'normal' })}
                                    className={`flex-1 py-3 border rounded-lg transition-all duration-200 shadow-sm ${activeAreaConfig.fontStyle === 'normal' ? 'border-wuxia-gold/50 bg-wuxia-gold/15 text-wuxia-gold shadow-[0_0_10px_rgba(var(--c-wuxia-gold),0.05)]' : 'border-wuxia-gold/20 text-paper-white/60 bg-paper-white/5 hover:border-wuxia-gold/50 hover:bg-paper-white/10'}`}
                                >
                                    Bình thường
                                </button>
                                <button
                                    onClick={() => updateAreaConfig({ fontStyle: 'italic' })}
                                    className={`flex-1 py-3 border rounded-lg italic transition-all duration-200 shadow-sm ${activeAreaConfig.fontStyle === 'italic' ? 'border-wuxia-gold/50 bg-wuxia-gold/15 text-wuxia-gold shadow-[0_0_10px_rgba(var(--c-wuxia-gold),0.05)]' : 'border-wuxia-gold/20 text-paper-white/60 bg-paper-white/5 hover:border-wuxia-gold/50 hover:bg-paper-white/10'}`}
                                >
                                    Nghiêng
                                </button>
                            </div>
                        </div>

                        {/* Font Color */}
                        <div>
                            <label className="block text-xs text-paper-white/50 mb-3 font-bold uppercase tracking-wider">Màu chữ</label>
                            <div className="flex items-center gap-3 mb-4">
                                {PRESET_COLORS.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => updateAreaConfig({ color: color })}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform shadow-lg shadow-ink-black/50 ${activeAreaConfig.color.toLowerCase() === color ? 'border-paper-white scale-110' : 'border-transparent hover:scale-105'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                            <div className="flex bg-ink-black/5 border border-wuxia-gold/30 rounded-lg p-2 items-center shadow-inner">
                                <div className="w-8 h-8 rounded shadow-inner shrink-0 mr-3 border border-wuxia-gold/20" style={{ backgroundColor: activeAreaConfig.color }} />
                                <div className="flex-1 flex flex-col">
                                    <span className="text-[10px] text-paper-white/40 font-bold">HEX</span>
                                    <input
                                        type="text"
                                        value={hexInput || activeAreaConfig.color}
                                        onChange={(e) => setHexInput(e.target.value)}
                                        className="bg-transparent border-none outline-none text-paper-white/80 font-mono w-full"
                                        placeholder="#ffffff"
                                    />
                                </div>
                                <GameButton
                                    variant="outline"
                                    skewed={true}
                                    size="sm"
                                    onClick={() => updateAreaConfig({ color: hexInput || activeAreaConfig.color })}
                                    className="px-4 py-1.5"
                                >
                                    Áp dụng
                                </GameButton>
                            </div>
                        </div>

                        {/* Cỡ chữ */}
                        <div className="bg-ink-black/5 border border-wuxia-gold/20 rounded-xl p-5 shadow-lg shadow-ink-black/20">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <div className="text-sm font-bold text-paper-white/90">Cỡ chữ</div>
                                    <div className="text-[10px] text-paper-white/40 italic">Điều khiển tỷ lệ font chữ mượt mà, không dùng thanh trượt mặc định.</div>
                                </div>
                                <div className="px-3 py-1 border border-wuxia-gold/20 bg-paper-white/5 rounded-lg text-xs text-wuxia-gold font-mono">{activeAreaConfig.fontSize}px</div>
                            </div>
                            <div className="flex items-center gap-4 mt-6">
                                <button onClick={() => updateAreaConfig({ fontSize: Math.max(8, activeAreaConfig.fontSize - 1) })} className="w-8 h-8 flex items-center justify-center border border-wuxia-gold/20 rounded-lg text-paper-white/60 hover:bg-wuxia-gold/10 hover:text-wuxia-gold hover:border-wuxia-gold/40 transition-all font-bold shadow-sm">-</button>
                                <div className="flex-1 flex justify-between relative px-2">
                                    <div className="absolute left-0 right-0 top-1/2 -mt-[2px] h-1 bg-paper-white/10 rounded-xl shadow-inner">
                                        <div
                                            className="h-full bg-wuxia-gold/50 rounded-xl shadow-[0_0_8px_rgba(var(--c-wuxia-gold),0.3)]"
                                            style={{ width: `${Math.min(100, Math.max(0, ((activeAreaConfig.fontSize - 12) / (28 - 12)) * 100))}%` }}
                                        />
                                    </div>
                                    {FONT_SIZE_PRESETS.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => updateAreaConfig({ fontSize: size })}
                                            className={`relative z-10 w-10 text-[10px] py-1 border rounded transition-all font-bold shadow-sm ${activeAreaConfig.fontSize === size ? 'border-wuxia-gold bg-wuxia-gold/10 text-wuxia-gold shadow-[0_0_8px_rgba(var(--c-wuxia-gold),0.2)]' : 'border-wuxia-gold/20 text-paper-white/40 bg-paper-white/5 hover:border-wuxia-gold/50 hover:text-paper-white/70'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => updateAreaConfig({ fontSize: Math.min(72, activeAreaConfig.fontSize + 1) })} className="w-8 h-8 flex items-center justify-center border border-wuxia-gold/20 rounded-lg text-paper-white/60 hover:bg-wuxia-gold/10 hover:text-wuxia-gold hover:border-wuxia-gold/40 transition-all font-bold shadow-sm">+</button>
                            </div>
                        </div>

                        {/* Chiều cao dòng */}
                        <div className="bg-ink-black/5 border border-wuxia-gold/20 rounded-xl p-5 shadow-lg shadow-ink-black/20">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <div className="text-sm font-bold text-paper-white/90">Chiều cao dòng</div>
                                    <div className="text-[10px] text-paper-white/40 italic">Phù hợp để tinh chỉnh nhịp đọc của nội dung, hội thoại và thông tin xác định.</div>
                                </div>
                                <div className="px-3 py-1 border border-wuxia-gold/20 bg-paper-white/5 rounded-lg text-xs text-wuxia-gold font-mono">{activeAreaConfig.lineHeight}</div>
                            </div>
                            <div className="flex items-center gap-4 mt-6">
                                <button onClick={() => updateAreaConfig({ lineHeight: Math.max(1.0, activeAreaConfig.lineHeight - 0.1) })} className="w-8 h-8 flex items-center justify-center border border-wuxia-gold/20 rounded-lg text-paper-white/60 hover:bg-wuxia-gold/10 hover:text-wuxia-gold hover:border-wuxia-gold/40 transition-all font-bold shadow-sm">-</button>
                                <div className="flex-1 flex justify-between relative px-2">
                                    <div className="absolute left-0 right-0 top-1/2 -mt-[2px] h-1 bg-paper-white/10 rounded-xl shadow-inner">
                                        <div
                                            className="h-full bg-wuxia-gold/50 rounded-xl shadow-[0_0_8px_rgba(var(--c-wuxia-gold),0.3)]"
                                            style={{ width: `${Math.min(100, Math.max(0, ((activeAreaConfig.lineHeight - 1.2) / (2.4 - 1.2)) * 100))}%` }}
                                        />
                                    </div>
                                    {LINE_HEIGHT_PRESETS.map(lh => (
                                        <button
                                            key={lh}
                                            onClick={() => updateAreaConfig({ lineHeight: lh })}
                                            className={`relative z-10 w-10 text-[10px] py-1 border rounded transition-all font-bold shadow-sm ${activeAreaConfig.lineHeight === lh ? 'border-wuxia-gold bg-wuxia-gold/10 text-wuxia-gold shadow-[0_0_8px_rgba(var(--c-wuxia-gold),0.2)]' : 'border-wuxia-gold/20 text-paper-white/40 bg-paper-white/5 hover:border-wuxia-gold/50 hover:text-paper-white/70'}`}
                                        >
                                            {lh}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => updateAreaConfig({ lineHeight: Math.min(3.0, activeAreaConfig.lineHeight + 0.1) })} className="w-8 h-8 flex items-center justify-center border border-wuxia-gold/20 rounded-lg text-paper-white/60 hover:bg-wuxia-gold/10 hover:text-wuxia-gold hover:border-wuxia-gold/40 transition-all font-bold shadow-sm">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Image Generation Config */}
            <div className="bg-ink-black/5 border border-wuxia-gold/20 rounded-xl p-6 shadow-lg shadow-ink-black/20">
                <div className="mb-6">
                    <h4 className="text-wuxia-gold font-bold text-lg mb-1">Cấu hình AI Image (Cloudflare)</h4>
                    <p className="text-xs text-paper-white/40 italic">Nhập URL Cloudflare Worker để bật tính năng gen ảnh tự động cho nhân vật và bối cảnh.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-ink-black/5 border border-wuxia-gold/30 rounded-lg p-4">
                        <div>
                            <div className="text-sm font-bold text-paper-white/90">Định dạng thời gian</div>
                            <div className="text-[10px] text-paper-white/40 italic">Chuyển đổi giữa định dạng số (23:15) và truyền thống (Giờ Tý).</div>
                        </div>
                        <div className="flex bg-paper-white/5 border border-wuxia-gold/20 rounded-lg overflow-hidden p-1 gap-1">
                            <button
                                onClick={() => onSave({ ...safeSettings, timeFormat: 'Number' })}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${safeSettings.timeFormat === 'Number' ? 'bg-wuxia-gold/20 text-wuxia-gold border border-wuxia-gold/30' : 'text-paper-white/40 hover:bg-paper-white/5'}`}
                            >
                                Kiểu số
                            </button>
                            <button
                                onClick={() => onSave({ ...safeSettings, timeFormat: 'Traditional' })}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${safeSettings.timeFormat === 'Traditional' ? 'bg-wuxia-gold/20 text-wuxia-gold border border-wuxia-gold/30' : 'text-paper-white/40 hover:bg-paper-white/5'}`}
                            >
                                Truyền thống
                            </button>
                        </div>
                    </div>

                    <div className="bg-paper-white/5 border border-wuxia-gold/30 rounded-lg p-3 flex flex-col gap-2">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-[10px] text-paper-white/40 font-bold uppercase tracking-widest">Worker URL</label>
                            <button
                                onClick={handleTestImage}
                                disabled={isTestingImage || !safeSettings.imageGenWorkerUrl}
                                className={`text-[10px] px-2 py-0.5 rounded border transition-all ${isTestingImage
                                    ? 'bg-wuxia-gold/5 border-wuxia-gold/20 text-wuxia-gold/40 cursor-not-allowed'
                                    : 'bg-wuxia-gold/10 border-wuxia-gold/30 text-wuxia-gold hover:bg-wuxia-gold/20'
                                    }`}
                            >
                                {isTestingImage ? 'Đang test...' : 'Test Image'}
                            </button>
                        </div>
                        <input
                            type="text"
                            value={safeSettings.imageGenWorkerUrl || ''}
                            onChange={(e) => {
                                let val = e.target.value.trim();
                                if (val && !val.startsWith('http://') && !val.startsWith('https://') && val.includes('.')) {
                                    val = `https://${val}`;
                                }
                                onSave({ ...safeSettings, imageGenWorkerUrl: val });
                            }}
                            placeholder="https://your-worker.your-subdomain.workers.dev"
                            className="bg-transparent border-none outline-none text-wuxia-gold font-mono w-full text-xs"
                        />
                    </div>


                    {testError && (
                        <div className="text-[10px] text-wuxia-red/80 bg-wuxia-red/5 border border-wuxia-red/20 p-2 rounded italic">
                            {testError}
                        </div>
                    )}

                    {testImageUrl && (
                        <div className="relative group bg-ink-black/40 border border-wuxia-gold/20 rounded-lg overflow-hidden max-h-[200px] flex items-center justify-center">
                            <img src={testImageUrl} alt="Generated Test" className="max-w-full max-h-full object-contain" />
                            <button
                                onClick={() => setTestImageUrl(null)}
                                className="absolute top-2 right-2 p-1 bg-ink-black/60 rounded-full text-paper-white/60 hover:text-white"
                            >
                                <IconGlyph name="close" className="w-4 h-4" />
                            </button>
                            <div className="absolute inset-0 bg-ink-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                <span className="text-[10px] font-bold text-wuxia-gold uppercase tracking-widest">Ảnh Test Thành Công</span>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3">

                        {safeSettings.backgroundImage && (
                            <GameButton
                                variant="outline"
                                skewed={true}
                                size="sm"
                                onClick={() => onSave({ ...safeSettings, backgroundImage: undefined })}
                                className={`${safeSettings.backgroundImage.startsWith('data:') ? 'px-4' : 'flex-1'} py-4 text-wuxia-red border-wuxia-red/30 hover:bg-wuxia-red/10`}
                            >
                                Xóa ảnh
                            </GameButton>
                        )}
                    </div>
                </div>
            </div>

            {/* Imported Fonts */}
            <div className="bg-ink-black/5 border border-wuxia-gold/20 rounded-xl p-6 shadow-lg shadow-ink-black/20 relative overflow-hidden">
                <div className="absolute right-0 top-10 bottom-10 w-1 bg-gradient-to-b from-wuxia-gold/0 via-wuxia-gold/20 to-wuxia-gold/0"></div>
                <div className="mb-4">
                    <h4 className="text-paper-white font-bold text-lg mb-1">Font đã nhập</h4>
                    <p className="text-xs text-paper-white/40 italic">Chỉ hiển thị nút tùy chỉnh frontend, không hiển thị điều khiển chọn file trình duyệt gốc. Áp dụng ngay cho vùng hiện tại sau khi nhập.</p>
                </div>
                <div className="p-8 border border-dashed border-wuxia-gold/20 rounded-xl text-center text-paper-white/30 text-xs bg-ink-black/20 shadow-inner">
                    {(safeSettings.importedFonts || []).length === 0 ? (
                        "Chưa có font nào được nhập. Sử dụng nút 'Nhập font' ở trên để tải file font cục bộ."
                    ) : (
                        <div className="flex flex-wrap gap-2 justify-center">
                            {(safeSettings.importedFonts || []).map(f => (
                                <div key={f.identifier} className="px-3 py-1 bg-paper-white/5 rounded-lg border border-wuxia-gold/30 text-paper-white/80 shadow-sm font-medium">
                                    {f.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Body Default Layout */}
            <div className="bg-ink-black/5 border border-wuxia-gold/20 rounded-xl p-6 shadow-lg shadow-ink-black/20">
                <div className="mb-6">
                    <h4 className="text-paper-white font-bold text-lg mb-1">Bố cục mặc định thân trò chuyện</h4>
                    <p className="text-xs text-paper-white/40 italic">Ánh xạ đồng bộ tại đây với vùng “Chat body”，Tương thích với cấu trúc lưu trữ cũ。</p>
                </div>

                <div className="space-y-4">
                    {/* Default Body Cỡ chữ */}
                    <div className="bg-ink-black/5 border border-ink-gray/60 rounded-xl p-5 shadow-lg shadow-ink-black/20">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-sm font-bold text-paper-white/90">Cỡ chữ thân</div>
                            <div className="px-3 py-1 border border-wuxia-gold/20 bg-ink-black/60 rounded-lg text-xs text-wuxia-gold font-mono">{safeSettings.defaultFontSizeChat}px</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={() => onSave({ ...safeSettings, defaultFontSizeChat: Math.max(8, safeSettings.defaultFontSizeChat! - 1) })} className="w-8 h-8 flex items-center justify-center border border-ink-gray/60 rounded-lg text-paper-white/60 hover:bg-wuxia-gold/10 hover:text-wuxia-gold hover:border-wuxia-gold/40 transition-all font-bold shadow-sm">-</button>
                            <div className="flex-1 flex justify-between relative px-2">
                                <div className="absolute left-0 right-0 top-1/2 -mt-[2px] h-1 bg-ink-black/80 rounded-xl shadow-inner">
                                    <div
                                        className="h-full bg-wuxia-gold/50 rounded-xl shadow-[0_0_8px_rgba(var(--c-wuxia-gold),0.3)]"
                                        style={{ width: `${Math.min(100, Math.max(0, ((safeSettings.defaultFontSizeChat! - 12) / (24 - 12)) * 100))}%` }}
                                    />
                                </div>
                                {DEFAULT_FONT_SIZE_PRESETS.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => onSave({ ...safeSettings, defaultFontSizeChat: size })}
                                        className={`relative z-10 w-10 text-[10px] py-1 border rounded transition-colors ${safeSettings.defaultFontSizeChat === size ? 'border-wuxia-gold text-wuxia-gold shadow-[0_0_5px_rgba(var(--c-wuxia-gold),0.1)]' : 'border-wuxia-gold/20 text-paper-white/40 hover:border-paper-white/60'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => onSave({ ...safeSettings, defaultFontSizeChat: Math.min(72, safeSettings.defaultFontSizeChat! + 1) })} className="w-8 h-8 flex items-center justify-center border border-wuxia-gold/20 rounded-lg text-paper-white/60 hover:bg-wuxia-gold/10 hover:text-wuxia-gold hover:border-wuxia-gold/40 transition-all font-bold shadow-sm">+</button>
                        </div>
                    </div>

                    {/* Default Paragraph Spacing */}
                    <div className="bg-ink-black/20 border border-wuxia-gold/20 rounded-xl p-5">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-sm font-bold text-paper-white/90">Giãn dòng đoạn văn</div>
                            <div className="px-3 py-1 border border-wuxia-gold/20 bg-ink-black/60 rounded-lg text-xs text-wuxia-gold">{safeSettings.defaultLineHeightChat}</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={() => onSave({ ...safeSettings, defaultLineHeightChat: Math.max(1.0, safeSettings.defaultLineHeightChat! - 0.1) })} className="w-8 h-8 flex items-center justify-center border border-paper-white/20 rounded-lg text-paper-white/60 hover:bg-paper-white/10 hover:text-paper-white transition-colors">-</button>
                            <div className="flex-1 flex justify-between relative px-2">
                                <div className="absolute left-0 right-0 top-1/2 -mt-[2px] h-1 bg-ink-black/80 rounded-xl">
                                    <div
                                        className="h-full bg-wuxia-gold/30 rounded-xl"
                                        style={{ width: `${Math.min(100, Math.max(0, ((safeSettings.defaultLineHeightChat! - 1.2) / (2.4 - 1.2)) * 100))}%` }}
                                    />
                                </div>
                                {LINE_HEIGHT_PRESETS.map(lh => (
                                    <button
                                        key={lh}
                                        onClick={() => onSave({ ...safeSettings, defaultLineHeightChat: lh })}
                                        className={`relative z-10 w-10 text-[10px] py-1 border rounded transition-colors ${safeSettings.defaultLineHeightChat === lh ? 'border-wuxia-gold text-wuxia-gold shadow-[0_0_5px_rgba(var(--c-wuxia-gold),0.1)]' : 'border-wuxia-gold/20 text-paper-white/40 hover:border-paper-white/60'}`}
                                    >
                                        {lh}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => onSave({ ...safeSettings, defaultLineHeightChat: Math.min(3.0, safeSettings.defaultLineHeightChat! + 0.1) })} className="w-8 h-8 flex items-center justify-center border border-wuxia-gold/20 rounded-lg text-paper-white/60 hover:bg-paper-white/10 hover:text-paper-white transition-colors">+</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Layers */}
            <div className="bg-ink-black/5 border border-wuxia-gold/20 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute right-0 top-10 bottom-10 w-1 bg-gradient-to-b from-wuxia-gold/0 via-wuxia-gold/20 to-wuxia-gold/0"></div>
                <div className="mb-6">
                    <h4 className="text-wuxia-red font-bold text-lg mb-1">Số vòng hiển thị (Render Layers)</h4>
                    <p className="text-xs text-wuxia-red italic font-black">Hiện tại: {safeSettings.renderLayers} vòng</p>
                </div>

                <div className="bg-paper-white/5 border border-wuxia-red/20 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-sm font-bold text-paper-white/90">Số vòng hiển thị gần đây</div>
                        <div className="px-3 py-1 border border-wuxia-red/20 bg-paper-white/10 rounded-lg text-xs text-wuxia-red">{safeSettings.renderLayers}</div>
                    </div>
                    <p className="text-[10px] text-wuxia-red/80 mb-6 italic leading-relaxed font-bold">Chỉ hiển thị {safeSettings.renderLayers} vòng gần nhất để tối ưu hiệu suất, hồ sơ cũ hơn có thể xem trong lịch sử tương tác.</p>
                    <div className="flex items-center gap-4">
                        <button onClick={() => onSave({ ...safeSettings, renderLayers: Math.max(10, safeSettings.renderLayers - 5) })} className="w-8 h-8 flex items-center justify-center border border-wuxia-red/30 rounded-lg text-wuxia-red/60 hover:bg-wuxia-red/10 hover:text-wuxia-red transition-all font-bold shadow-sm">-</button>
                        <div className="flex-1 flex justify-between relative px-2">
                            <div className="absolute left-0 right-0 top-1/2 -mt-[2px] h-1 bg-paper-white/10 rounded-xl">
                                <div
                                    className="h-full bg-wuxia-red/50 rounded-xl shadow-[0_0_8px_rgba(var(--c-wuxia-red),0.3)]"
                                    style={{ width: `${Math.min(100, Math.max(0, ((safeSettings.renderLayers - 10) / (100 - 10)) * 100))}%` }}
                                />
                            </div>
                            {RENDER_LAYERS_PRESETS.map(layer => (
                                <button
                                    key={layer}
                                    onClick={() => onSave({ ...safeSettings, renderLayers: layer })}
                                    className={`relative z-10 w-10 text-[10px] py-1 border rounded transition-all font-bold ${safeSettings.renderLayers === layer ? 'border-wuxia-red bg-wuxia-red/15 text-wuxia-red shadow-[0_0_10px_rgba(var(--c-wuxia-red),0.3)]' : 'border-wuxia-red/20 text-paper-white/40 hover:border-wuxia-red/50 hover:text-paper-white/70'}`}
                                >
                                    {layer}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => onSave({ ...safeSettings, renderLayers: Math.min(100, safeSettings.renderLayers + 5) })} className="w-8 h-8 flex items-center justify-center border border-wuxia-red/30 rounded-lg text-wuxia-red/60 hover:bg-wuxia-red/10 hover:text-wuxia-red transition-all font-bold shadow-sm">+</button>
                    </div>
                </div>
            </div>

            <div className="pt-4 sticky bottom-0 bg-ink-black/80 backdrop-blur-md pb-4 z-20">
                < ParallelogramSaveButton
                    onClick={() => onSave(safeSettings)}
                    className="w-full"
                />
            </div>

            {/* Injected Font Styles */}
            <style dangerouslySetInnerHTML={{
                __html: (safeSettings.importedFonts || []).map(f => `
                @font-face {
                    font-family: '${f.identifier}';
                    src: url('${f.data}');
                }
            `).join('\n')
            }} />
        </div>
    );
};

export default VisualSettings;
