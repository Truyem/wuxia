import React, { useEffect, useState } from 'react';
import { OpeningConfig, InitialRelationTemplateType, RelationFocusType, OpeningEntryPreferenceType, FandomBlendConfig, FandomSourceType, FandomBlendIntensityType } from '../../../types';
import ToggleSwitch from '../../ui/ToggleSwitch';
import InlineSelect from '../../ui/InlineSelect';
import ParallelogramSaveButton from '../../ui/ParallelogramSaveButton';

interface Props {
    settings: OpeningConfig | undefined;
    onSave: (config: OpeningConfig) => void;
}

const defaultOpeningConfig: OpeningConfig = {
    初始关系模板: '师门牵引',
    关系侧重: ['师门', '友情'],
    开局切入偏好: '日常低压',
    同人融合: {
        enabled: false,
        作品名: '',
        来源类型: '小说',
        融合强度: '轻度映射',
        保留原著角色: false,
        启用角色替换: false,
        替换目标角色名: '',
        附加替换角色名列表: [],
        附加角色替换规则列表: [],
        启用附加小说: false,
        附加小说数据集ID: ''
    }
};

const OpeningConfigSettings: React.FC<Props> = ({ settings, onSave }) => {
    const [form, setForm] = useState<OpeningConfig>(settings || defaultOpeningConfig);
    const [enabled, setEnabled] = useState<boolean>(!!settings);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setForm(settings || defaultOpeningConfig);
        setEnabled(!!settings);
    }, [settings]);

    const handleSave = () => {
        if (enabled) {
            onSave(form);
        } else {
            onSave(defaultOpeningConfig);
        }
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const toggleRelationFocus = (value: RelationFocusType) => {
        setForm(prev => {
            const current = prev.关系侧重;
            if (current.includes(value)) {
                return { ...prev, 关系侧重: current.filter(v => v !== value) };
            } else if (current.length < 2) {
                return { ...prev, 关系侧重: [...current, value] };
            }
            return prev;
        });
    };

    const updateFandomConfig = (patch: Partial<FandomBlendConfig>) => {
        setForm(prev => ({
            ...prev,
            同人融合: { ...prev.同人融合, ...patch }
        }));
    };

    const relationFocusOptions: Array<{ value: RelationFocusType; label: string }> = [
        { value: '亲情', label: 'Quan tình' },
        { value: '友情', label: 'Hữu nghị' },
        { value: '师门', label: 'Sư môn' },
        { value: '情缘', label: 'Tình duyên' },
        { value: '利益', label: 'Lợi ích' },
        { value: '仇怨', label: 'Thù oán' }
    ];

    const entryPreferenceOptions: Array<{ value: OpeningEntryPreferenceType; label: string; hint: string }> = [
        { value: '日常低压', label: 'Sinh hoạt hàng ngày', hint: 'Ưu tiên bắt đầu từ cuộc sống thường nhật, bầu không khí nhẹ nhàng và quan hệ đơn giản.' },
        { value: '在途起手', label: 'Khởi đầu trên đường', hint: 'Bắt đầu ở cảnh di chuyển, đường giao thông, núi non.' },
        { value: '家宅起手', label: 'Khởi đầu từ nhà', hint: 'Ưu tiên bắt đầu trong phòng, sân, cửa hàng, biệt thự.' },
        { value: '门派起手', label: 'Khởi đầu từ môn phái', hint: 'Ưu tiên bắt đầu ở cổng môn, sân tập, đại sảnh.' },
        { value: '风波前夜', label: 'Trước cơn bão', hint: 'Cho phép có những dấu hiệu bất ổn, nhưng vẫn giữ sự kiềm chế trong hồi đầu.' }
    ];

    const initialRelationOptions: Array<{ value: InitialRelationTemplateType; label: string; hint: string }> = [
        { value: '独行少系', label: 'Một mình', hint: 'Mạng lưới xã hội ban đầu thu gọn 1-2 người, thiên về một mình phiêu lưu.' },
        { value: '家族牵引', label: 'Gia tộc', hint: 'Ưu tiên tạo người thân, tộc nhân, nhà cũ và áp lực gia sản.' },
        { value: '师门牵引', label: 'Sư môn', hint: 'Ưu tiên tạo sư phụ, đồng môn, quy củ môn và nhiệm vụ trong môn.' },
        { value: '世家官门', label: 'Quý tộc', hint: 'Thiên về địa vị, quan hệ, nghi lễ và mạng lưới tài nguyên thực tế.' },
        { value: '青梅旧识', label: 'Bạn cũ', hint: 'Ưu tiên tạo bạn bè cũ, người quen và dòng cảm xúc từ quá khứ.' },
        { value: '旧仇旧债', label: 'Thù cũ', hint: 'Mối quan hệ xã hội mang theo món nợ cũ, mối hận và nguồn áp lực.' }
    ];

    const fandomSourceOptions: Array<{ value: FandomSourceType; label: string }> = [
        { value: '小说', label: 'Tiểu thuyết' },
        { value: '动漫', label: 'Anime/Manga' },
        { value: '游戏', label: 'Game' },
        { value: '影视', label: 'Phim/TV' }
    ];

    const fandomIntensityOptions: Array<{ value: FandomBlendIntensityType; label: string; hint: string }> = [
        { value: '轻度映射', label: 'Ánh xạ nhẹ', hint: 'Chỉ mượn bầu không khí và chủ đề, không trực tiếp mang nhân vật.' },
        { value: '中度混编', label: 'Trộn lẫn vừa', hint: 'Cho phép một số thế lực, cài đặt và phong cách vào thế giới gốc.' },
        { value: '显性同台', label: 'Xuất hiện rõ ràng', hint: 'Cho phép nhân vật hoặc thế lực gốc tồn tại trực tiếp.' }
    ];

    const ToggleCard = ({ title, desc, checked, onChange }: { title: string, desc: string, checked: boolean, onChange: (c: boolean) => void }) => (
        <div
            onClick={() => onChange(!checked)}
            className="rounded-md border border-wuxia-gold/10 bg-paper-white/5 p-4 hover:border-wuxia-gold/50 transition-colors cursor-pointer group"
        >
            <div className="flex items-start justify-between gap-4 pointer-events-none">
                <div className="flex-1 pr-4">
                    <div className="text-sm text-wuxia-gold/90 font-bold tracking-wide group-hover:text-wuxia-gold">{title}</div>
                    <div className="text-xs text-paper-white/50 font-medium mt-1 leading-relaxed">{desc}</div>
                </div>
                <div className="shrink-0 flex items-center mt-1">
                    <ToggleSwitch checked={checked} onChange={onChange} ariaLabel={title} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-fadeIn pb-10">
            <div className="flex justify-between items-end border-b border-wuxia-gold/30 pb-4">
                <div className="space-y-1">
                    <h3 className="text-wuxia-gold font-sans font-black text-2xl tracking-tighter text-shadow-gold">Cấu hình khởi đầu</h3>
                    <p className="text-[10px] text-wuxia-gold/60 tracking-[0.3em] font-bold uppercase pl-1">Opening Configuration</p>
                </div>
                {showSuccess && (
                    <div className="text-[10px] font-bold animate-pulse px-3 py-1 bg-wuxia-gold/10 border border-wuxia-gold/30 rounded-full text-wuxia-gold">
                        Da luu cai dat
                    </div>
                )}
            </div>

            <div className="rounded-md border border-wuxia-gold/20 bg-black/30 p-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-sm text-wuxia-cyan font-bold">Bật cấu hình khởi đầu</div>
                        <div className="text-xs text-gray-400 mt-1">Khi tắt sẽ không thêm quan hệ, sở thích và trộn lẫn fan fiction.</div>
                    </div>
                    <ToggleSwitch
                        checked={enabled}
                        onChange={setEnabled}
                        ariaLabel="Bat cau hinh khoi dau"
                    />
                </div>
            </div>

            {enabled && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-sm text-wuxia-gold font-bold tracking-wide">Ưu tiên khởi đầu</label>
                            <InlineSelect
                                value={form.开局切入偏好}
                                options={entryPreferenceOptions.map(item => ({ value: item.value, label: item.label }))}
                                onChange={(value) => setForm(prev => ({ ...prev, 开局切入偏好: value as OpeningEntryPreferenceType }))}
                                buttonClassName="bg-transparent border-wuxia-gold/20 hover:border-wuxia-gold/40 py-2.5"
                            />
                            <div className="text-xs text-paper-white/40">
                                {entryPreferenceOptions.find(item => item.value === form.开局切入偏好)?.hint}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm text-wuxia-gold font-bold tracking-wide">Mẫu quan hệ ban đầu</label>
                            <InlineSelect
                                value={form.初始关系模板}
                                options={initialRelationOptions.map(item => ({ value: item.value, label: item.label }))}
                                onChange={(value) => setForm(prev => ({ ...prev, 初始关系模板: value as InitialRelationTemplateType }))}
                                buttonClassName="bg-transparent border-wuxia-gold/20 hover:border-wuxia-gold/40 py-2.5"
                            />
                            <div className="text-xs text-paper-white/40">
                                {initialRelationOptions.find(item => item.value === form.初始关系模板)?.hint}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm text-wuxia-gold font-bold tracking-wide">Trọng tâm quan hệ (tối đa 2)</label>
                        <div className="flex flex-wrap gap-3">
                            {relationFocusOptions.map((item) => {
                                const active = form.关系侧重.includes(item.value);
                                const disabled = !active && form.关系侧重.length >= 2;
                                return (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => toggleRelationFocus(item.value)}
                                        disabled={disabled}
                                        className={`rounded-full border px-4 py-2 text-sm transition-all ${
                                            active
                                                ? 'border-wuxia-gold bg-wuxia-gold/10 text-wuxia-gold'
                                                : 'border-gray-700 bg-black/30 text-gray-300 hover:border-wuxia-gold/40'
                                        } disabled:cursor-not-allowed disabled:opacity-40`}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="text-xs text-gray-500">Đã chọn {form.关系侧重.length}/2. Sẽ ưu tiên ảnh hưởng cấu trúc cảm xúc của mạng lưới xã hội ban đầu.</div>
                    </div>

                    <div className="space-y-5">
                        <ToggleCard
                            title="Hoán trộn Fan fiction"
                            desc="Khi bật, thế giới sẽ mang xu hướng hoán trộn fan fiction; khi tắt sẽ tạo theo thế giới gốc."
                            checked={form.同人融合.enabled}
                            onChange={(next) => updateFandomConfig({ enabled: next })}
                        />

                        {form.同人融合.enabled && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
                                <div className="space-y-2">
                                    <label className="text-sm text-wuxia-cyan font-bold">Tên tác phẩm</label>
                                    <input
                                        value={form.同人融合.作品名}
                                        onChange={(e) => updateFandomConfig({ 作品名: e.target.value })}
                                        className="w-full bg-black/40 border border-wuxia-gold/20 rounded-lg px-3 py-2 text-sm text-paper-white focus:border-wuxia-gold/50 outline-none"
                                        placeholder="Nhap ten tac pham..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-wuxia-cyan font-bold">Loại nguồn</label>
                                    <InlineSelect
                                        value={form.同人融合.来源类型}
                                        options={fandomSourceOptions.map(item => ({ value: item.value, label: item.label }))}
                                        onChange={(value) => updateFandomConfig({ 来源类型: value as FandomSourceType })}
                                        buttonClassName="bg-transparent border-wuxia-gold/20 hover:border-wuxia-gold/40 py-2"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-wuxia-cyan font-bold">Cường độ hoán trộn</label>
                                    <InlineSelect
                                        value={form.同人融合.融合强度}
                                        options={fandomIntensityOptions.map(item => ({ value: item.value, label: item.label }))}
                                        onChange={(value) => updateFandomConfig({ 融合强度: value as FandomBlendIntensityType })}
                                        buttonClassName="bg-transparent border-wuxia-gold/20 hover:border-wuxia-gold/40 py-2"
                                    />
                                    <div className="text-xs text-paper-white/40">
                                        {fandomIntensityOptions.find(item => item.value === form.同人融合.融合强度)?.hint}
                                    </div>
                                </div>

                                <ToggleCard
                                    title="Giữ nguyên nhân vật gốc"
                                    desc="Giữ lại các nhân vật từ tác phẩm gốc."
                                    checked={form.同人融合.保留原著角色}
                                    onChange={(next) => updateFandomConfig({ 保留原著角色: next })}
                                />

                                <ToggleCard
                                    title="Bật thay thế nhân vật"
                                    desc="Cho phép thay thế nhân vật trong tác phẩm gốc bằng nhân vật người chơi."
                                    checked={form.同人融合.启用角色替换}
                                    onChange={(next) => updateFandomConfig({ 启用角色替换: next })}
                                />

                                {form.同人融合.启用角色替换 && (
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm text-wuxia-cyan font-bold">Tên nhân vật thay thế</label>
                                        <input
                                            value={form.同人融合.替换目标角色名}
                                            onChange={(e) => updateFandomConfig({ 替换目标角色名: e.target.value })}
                                            className="w-full bg-black/40 border border-wuxia-gold/20 rounded-lg px-3 py-2 text-sm text-paper-white focus:border-wuxia-gold/50 outline-none"
                                            placeholder="Nhap ten nhan vat can thay the..."
                                        />
                                    </div>
                                )}

                                <ToggleCard
                                    title="Bật tiểu thuyết bổ sung"
                                    desc="Cho phép sử dụng thêm tiểu thuyết bổ sung."
                                    checked={form.同人融合.启用附加小说}
                                    onChange={(next) => updateFandomConfig({ 启用附加小说: next })}
                                />

                                {form.同人融合.启用附加小说 && (
                                    <div className="space-y-2">
                                        <label className="text-sm text-wuxia-cyan font-bold">ID dataset tiểu thuyết bổ sung</label>
                                        <input
                                            value={form.同人融合.附加小说数据集ID}
                                            onChange={(e) => updateFandomConfig({ 附加小说数据集ID: e.target.value })}
                                            className="w-full bg-black/40 border border-wuxia-gold/20 rounded-lg px-3 py-2 text-sm text-paper-white focus:border-wuxia-gold/50 outline-none"
                                            placeholder="Nhap ID dataset..."
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}

            <div className="pt-4 sticky bottom-0 bg-ink-black/80 backdrop-blur-md pb-4 z-20">
                <ParallelogramSaveButton
                    onClick={handleSave}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default OpeningConfigSettings;