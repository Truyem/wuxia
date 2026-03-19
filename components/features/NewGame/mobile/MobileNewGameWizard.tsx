import React, { useEffect, useMemo, useRef, useState } from 'react';
import GameButton from '../../../ui/GameButton';
import { WorldGenConfig, CharacterData, Talent, Background, GameDifficulty } from '../../../../types';
import { PresetTalent, PresetBackground } from '../../../../data/presets';
import { OrnateBorder } from '../../../ui/decorations/OrnateBorder';
import InlineSelect from '../../../ui/InlineSelect';
import ToggleSwitch from '../../../ui/ToggleSwitch';
import * as dbService from '../../../../services/dbService';

interface Props {
    onComplete: (
        worldConfig: WorldGenConfig,
        charData: CharacterData,
        mode: 'all' | 'step',
        openingStreaming: boolean
    ) => void;
    onCancel: () => void;
    loading: boolean;
    requestConfirm?: (options: { title?: string; message: string; confirmText?: string; cancelText?: string; danger?: boolean }) => Promise<boolean>;
}

const STEPS = ['Thế giới quan', 'Nền tảng nhân vật', 'Thiên bẩm & Thân thế', 'Xác nhận tạo'];
const CUSTOM_TALENT_STORAGE_KEY = 'new_game_custom_talents';
const CUSTOM_BACKGROUND_STORAGE_KEY = 'new_game_custom_backgrounds';
const DIFFICULTY_OPTIONS: Array<{ value: GameDifficulty; label: string }> = [
    { value: 'relaxed', label: 'Thư giãn (Chế độ truyện)' },
    { value: 'easy', label: 'Dễ (Tân thủ giang hồ)' },
    { value: 'normal', label: 'Bình thường (Trải nghiệm tiêu chuẩn)' },
    { value: 'hard', label: 'Khó (Gươm đao lóe sáng)' },
    { value: 'extreme', label: 'Cực hạn (Địa ngục A-tu-la)' },
    { value: 'custom', label: 'Tùy chỉnh (Theo thư viện prompt)' }
];
const POWER_LEVEL_OPTIONS: Array<{ value: WorldGenConfig['powerLevel']; label: string }> = [
    { value: 'Low-tier Martial', label: 'Võ lực thấp (Quyền cước binh khí)' },
    { value: 'Mid-tier Martial', label: 'Võ lực trung (Nội lực phát ngoại)' },
    { value: 'High-tier Martial', label: 'Võ lực cao (Dời núi lấp biển)' },
    { value: 'Cultivations', label: 'Tu tiên (Trường sinh đắc đạo)' }
];
const WORLD_SIZE_OPTIONS: Array<{ value: WorldGenConfig['worldSize']; label: string }> = [
    { value: 'A tiny place', label: 'Một vùng nhỏ (Một đảo hoặc thành phố)' },
    { value: 'Grand Nine Provinces', label: 'Đại Cửu Châu (Vạn dặm sơn hà)' },
    { value: 'Endless planes', label: 'Bình diện vô tận (Đa thế giới)' }
];
const SECT_DENSITY_OPTIONS: Array<{ value: WorldGenConfig['sectDensity']; label: string }> = [
    { value: 'Rare', label: 'Hiếm có (Ẩn cư tự tại)' },
    { value: 'Moderate', label: 'Vừa phải (Vài môn phái lớn)' },
    { value: 'Standing like trees', label: 'Nhiều như rừng (Trăm nhà tranh luận)' }
];
const PERSONALITY_PRESETS = [
    'Chí khí cao vời, coi trọng nghĩa khí, ghét ác như thù, luôn sẵn lòng giúp đỡ kẻ yếu.',
    'Lạnh lùng cô độc, ít nói cười, hành sự quyết đoán, chỉ tin tưởng vào bản thân và thanh kiếm trong tay.',
    'Phóng khoáng tự tại, tiêu diêu giang hồ, yêu rượu và thơ ca, không thích sự ràng buộc của quy tắc.',
    'Tâm cơ thâm trầm, mưu định sau mới hành động, giỏi che giấu cảm xúc, khó lòng nhìn thấu.',
    'Hiền lành chất phác, thật thà bao dung, luôn nhìn thấy điểm tốt ở người khác, tâm tính thiện lương.',
    'Kiêu ngạo bất khuất, khí thế lăng người, không bao giờ chịu cúi đầu trước cường quyền.',
    'Trầm tĩnh điềm đạm, suy nghĩ thấu đáo, hành sự cẩn trọng, là người đáng tin cậy trong mọi tình huống.',
    'Hoạt bát lém lỉnh, ham học hỏi, tính tình tò mò, đôi khi hơi tinh quái nhưng bản chất tốt.',
    'Chính trực vô tư, tuân thủ đạo lý, kiên định với lý tưởng của bản thân dù gặp bao gian khổ.',
    'Âm trầm quái gở, lời nói sắc sảo, hành tung bí ẩn, khiến người khác vừa sợ vừa kính.'
];

const STAT_LABELS: Record<string, string> = {
    strength: 'Sức mạnh',
    agility: 'Nhanh nhẹn',
    constitution: 'Thể chất',
    rootBone: 'Căn cốt',
    intelligence: 'Ngộ tính',
    luck: 'Phúc duyên',
    tamTinh: 'Tâm tính',
};
const GENDER_LABELS: Record<string, string> = { 'Male': 'Nam', 'Female': 'Nữ' };


type DropdownProps = {
    value: number;
    options: number[];
    suffix: string;
    open: boolean;
    onToggle: () => void;
    onSelect: (next: number) => void;
    containerRef: React.RefObject<HTMLDivElement>;
};

const CompactDropdown: React.FC<DropdownProps> = ({
    value,
    options,
    suffix,
    open,
    onToggle,
    onSelect,
    containerRef,
}) => (
    <div className="relative" ref={containerRef}>
        <button
            type="button"
            onClick={onToggle}
            className="w-full bg-transparent border border-wuxia-gold/30 p-3 text-wuxia-gold outline-none focus:border-wuxia-gold rounded-md flex items-center justify-between gap-2 transition-all shadow-inner shadow-black/40"
        >
            <span className="font-mono text-sm">{value}{suffix}</span>
            <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
        </button>
        {open && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-black/95 border border-gray-700 rounded-md shadow-[0_12px_30px_rgba(0,0,0,0.6)] z-50">
                <div className="max-h-[336px] overflow-y-auto custom-scrollbar py-1">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => onSelect(opt)}
                            className={`w-full px-3 h-7 flex items-center text-sm font-mono transition-colors ${opt === value ? 'bg-wuxia-gold/20 text-wuxia-gold' : 'text-gray-300 hover:bg-wuxia-gold/[0.05]'
                                }`}
                        >
                            {opt}{suffix}
                        </button>
                    ))}
                </div>
            </div>
        )}
    </div>
);

const MobileNewGameWizard: React.FC<Props> = ({ onComplete, onCancel, loading, requestConfirm }) => {
    const [step, setStep] = useState(0);

    // --- State: World Config ---
    const [worldConfig, setWorldConfig] = useState<WorldGenConfig>({
        worldName: '',
        powerLevel: 'Mid-tier Martial',
        worldSize: 'Grand Nine Provinces',
        dynastySetting: '',
        sectDensity: 'Standing like trees',
        tianjiaoSetting: '',
        difficulty: 'normal' as GameDifficulty, // Default difficulty
        enableNsfw: false,
    });

    // --- State: Character Config ---
    const [charName, setCharName] = useState('');
    const [charGender, setCharGender] = useState<'Male' | 'Female'>('Male');
    const [charAge, setCharAge] = useState(18);
    const [charAppearance, setCharAppearance] = useState('');
    const [charPersonality, setCharPersonality] = useState('');
    const [birthMonth, setBirthMonth] = useState(1);
    const [birthDay, setBirthDay] = useState(1);
    const [monthOpen, setMonthOpen] = useState(false);
    const [dayOpen, setDayOpen] = useState(false);
    const monthRef = useRef<HTMLDivElement>(null);
    const dayRef = useRef<HTMLDivElement>(null);

    // Attributes (Total 60 points to distribute)
    const MAX_POINTS = 60;
    const [stats, setStats] = useState({
        strength: 5, agility: 5, constitution: 5, rootBone: 5, intelligence: 5, luck: 5, tamTinh: 5
    });

    // Talents & Background
    const [selectedBackground, setSelectedBackground] = useState<Background>(PresetBackground[0]);
    const [selectedTalents, setSelectedTalents] = useState<Talent[]>([]);
    const [customTalentList, setCustomTalentList] = useState<Talent[]>([]);
    const [customBackgroundList, setCustomBackgroundList] = useState<Background[]>([]);

    // Custom Inputs
    const [customTalent, setCustomTalent] = useState<Talent>({ name: '', description: '', effect: '' });
    const [showCustomTalent, setShowCustomTalent] = useState(false);
    const [customBackground, setCustomBackground] = useState<Background>({ name: '', description: '', effect: '' });
    const [showCustomBackground, setShowCustomBackground] = useState(false);
    const [openingStreaming, setOpeningStreaming] = useState(true);

    // --- Logic ---
    const monthOptions = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
    const dayOptions = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
    const standardizeTalent = (raw: Talent): Talent | null => {
        const name = raw?.name?.trim() || '';
        const description = raw?.description?.trim() || '';
        const effect = raw?.effect?.trim() || '';
        if (!name || !description || !effect) return null;
        return { name, description, effect };
    };
    const standardizeBackground = (raw: Background): Background | null => {
        const name = raw?.name?.trim() || '';
        const description = raw?.description?.trim() || '';
        const effect = raw?.effect?.trim() || '';
        if (!name || !description || !effect) return null;
        return { name, description, effect };
    };
    const mergeAndDeduplicateTalents = (rawList: Talent[]): Talent[] => {
        const map = new Map<string, Talent>();
        rawList.forEach((item) => {
            const normalized = standardizeTalent(item);
            if (!normalized) return;
            map.set(normalized.name, normalized);
        });
        return Array.from(map.values());
    };
    const mergeAndDeduplicateBackgrounds = (rawList: Background[]): Background[] => {
        const map = new Map<string, Background>();
        rawList.forEach((item) => {
            const normalized = standardizeBackground(item);
            if (!normalized) return;
            map.set(normalized.name, normalized);
        });
        return Array.from(map.values());
    };
    const allBackgroundOptions = useMemo(
        () => [...PresetBackground, ...customBackgroundList.filter(item => !PresetBackground.some(p => p.name === item.name))],
        [customBackgroundList]
    );
    const allTalentOptions = useMemo(
        () => [...PresetTalent, ...customTalentList.filter(item => !PresetTalent.some(p => p.name === item.name))],
        [customTalentList]
    );

    const usedPoints = (Object.values(stats) as number[]).reduce((a, b) => a + b, 0);
    const remainingPoints = MAX_POINTS - usedPoints;
    const stepProgress = ((step + 1) / STEPS.length) * 100;
    const currentStepLabel = STEPS[step] || 'Tạo';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (monthRef.current && monthRef.current.contains(target)) return;
            if (dayRef.current && dayRef.current.contains(target)) return;
            setMonthOpen(false);
            setDayOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const loadCustomConfig = async () => {
            try {
                const savedTalents = await dbService.getSetting(CUSTOM_TALENT_STORAGE_KEY);
                const savedBackgrounds = await dbService.getSetting(CUSTOM_BACKGROUND_STORAGE_KEY);
                if (Array.isArray(savedTalents)) {
                    setCustomTalentList(mergeAndDeduplicateTalents(savedTalents as Talent[]));
                }
                if (Array.isArray(savedBackgrounds)) {
                    setCustomBackgroundList(mergeAndDeduplicateBackgrounds(savedBackgrounds as Background[]));
                }
            } catch (error) {
                console.error('Load custom identity/Talent failed', error);
            }
        };
        loadCustomConfig();
    }, []);

    const handleStatChange = (key: keyof typeof stats, delta: number) => {
        const current = stats[key];
        if (delta > 0 && remainingPoints <= 0) return;
        if (delta < 0 && current <= 1) return;
        setStats({ ...stats, [key]: current + delta });
    };

    const toggleTalent = (t: Talent) => {
        if (selectedTalents.find(x => x.name === t.name)) {
            setSelectedTalents(selectedTalents.filter(x => x.name !== t.name));
        } else {
            if (selectedTalents.length >= 3) {
                alert("Tối đa 3 thiên bẩm");
                return;
            }
            setSelectedTalents([...selectedTalents, t]);
        }
    };

    const addCustomTalent = async () => {
        const normalized = standardizeTalent(customTalent);
        if (!normalized) {
            alert("Vui lòng điền đầy đủ thiên bẩm tùy chỉnh (Tên/Mô tả/Hiệu ứng)");
            return;
        }
        const selectedSameName = selectedTalents.some(x => x.name === normalized.name);
        if (!selectedSameName && selectedTalents.length >= 3) {
            alert("Tối đa 3 thiên bẩm được chọn");
            return;
        }

        const nextCustomTalentList = mergeAndDeduplicateTalents([...customTalentList, normalized]);
        setCustomTalentList(nextCustomTalentList);
        setSelectedTalents(
            selectedSameName
                ? selectedTalents.map(item => (item.name === normalized.name ? normalized : item))
                : [...selectedTalents, normalized]
        );
        setCustomTalent({ name: '', description: '', effect: '' });
        setShowCustomTalent(false);
        try {
            await dbService.saveSetting(CUSTOM_TALENT_STORAGE_KEY, nextCustomTalentList);
        } catch (error) {
            console.error('Failed to save custom talent', error);
        }
    };

    const addCustomBackground = async () => {
        const name = customBackground.name.trim();
        const description = customBackground.description.trim();
        const effect = customBackground.effect.trim();
        if (!name || !description || !effect) {
            alert("Vui lòng điền đầy đủ thân thế tùy chỉnh (Tên/Mô tả/Hiệu ứng)");
            return;
        }
        const nextBg: Background = { name, description, effect };
        const nextCustomBackgroundList = mergeAndDeduplicateBackgrounds([...customBackgroundList, nextBg]);
        setCustomBackgroundList(nextCustomBackgroundList);
        setSelectedBackground(nextBg);
        setCustomBackground({ name: '', description: '', effect: '' });
        setShowCustomBackground(false);
        try {
            await dbService.saveSetting(CUSTOM_BACKGROUND_STORAGE_KEY, nextCustomBackgroundList);
        } catch (error) {
            console.error('Failed to save custom identity', error);
        }
    };

    const handleGenerate = async () => {
        if (!charName.trim()) {
            alert("Vui lòng nhập tên nhân vật trước");
            setStep(1);
            return;
        }

        // Construct final character data object mapping to CharacterData interface
        const charData: CharacterData = {
            name: charName.trim(),
            gender: charGender === 'Male' ? 'Nam' : 'Nữ',
            age: charAge,
            birthDate: `${birthMonth}Tháng${birthDay}Ngày`,
            appearance: charAppearance.trim() || 'Ngoại hình bình thường, ăn mặc giản dị.',
            personality: charPersonality.trim() || 'Tâm tính chính trực, hành hiệp trượng nghĩa.',
            
            talentList: selectedTalents,
            background: selectedBackground,

            ...stats,

            title: "Fresh from the mountains", 
            realm: "Mortal",
            sectId: "none", 
            sectPosition: "None", 
            sectContribution: 0,
            money: { gold: 0, silver: 0, copper: 0 },
            
            currentEnergy: 100, 
            maxEnergy: 100,
            currentFullness: 80, 
            maxFullness: 100,
            currentThirst: 80, 
            maxThirst: 100,
            currentWeight: 0, 
            maxWeight: 100 + (stats.strength * 10),

            headCurrentHp: 100, headMaxHp: 100, headStatus: "Normal",
            chestCurrentHp: 100, chestMaxHp: 100, chestStatus: "Normal",
            abdomenCurrentHp: 100, abdomenMaxHp: 100, abdomenStatus: "Normal",
            leftArmCurrentHp: 100, leftArmMaxHp: 100, leftArmStatus: "Normal",
            rightArmCurrentHp: 100, rightArmMaxHp: 100, rightArmStatus: "Normal",
            leftLegCurrentHp: 100, leftLegMaxHp: 100, leftLegStatus: "Normal",
            rightLegCurrentHp: 100, rightLegMaxHp: 100, rightLegStatus: "Normal",

            equipment: { head: "None", chest: "None", legs: "None", hands: "None", feet: "None", mainWeapon: "None", subWeapon: "None", hiddenWeapon: "None", back: "None", waist: "None", mount: "None" },
            itemList: [], 
            kungfuList: [],
            currentExp: 0, 
            levelUpExp: 100, 
            playerBuffs: []
        };

        const streamStatus = openingStreaming ? 'Mở' : 'Đóng';
        const confirmText = `Chế độ bắt đầu truyền phát cốt truyện hiện đang được đặt thành 【${streamStatus}】.\nKhi được bật, hiển thị trong khi tạo. Chờ phản hồi đầy đủ nếu đóng.\nTiếp tục tạo?`;
        const ok = requestConfirm
            ? await requestConfirm({
                title: 'Xác nhận tạo',
                message: confirmText,
                confirmText: 'Bắt đầu tạo'
            })
            : true;
        if (!ok) return;
        onComplete(worldConfig, charData, 'all', openingStreaming);
    };

    if (loading) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center bg-black/90 text-wuxia-gold z-50">
                <div className="text-2xl font-serif font-bold animate-pulse mb-2">Đang tạo...</div>
                <div className="text-xs font-mono text-gray-500">Vui lòng chờ</div>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-black/95 relative overflow-hidden p-2 z-50 md:hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none"></div>

            {/* Main Container */}
            <div className="w-full max-w-[620px] h-[86vh] border border-wuxia-gold/30 rounded-2xl bg-black/50 shadow-2xl flex flex-col overflow-hidden relative backdrop-blur-sm">

                {/* Header Steps */}
                <div className="hidden md:flex h-16 border-b border-gray-800 items-center justify-between px-8 bg-black/40">
                    <h2 className="text-2xl font-serif font-bold text-wuxia-gold">Biên niên sử sáng tác</h2>
                    <div className="flex gap-2">
                        {STEPS.map((s, idx) => (
                            <div key={idx} className={`flex items-center gap-2 ${idx === step ? 'text-wuxia-gold' : 'text-gray-600'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${idx === step ? 'border-wuxia-gold bg-wuxia-gold/20' : 'border-gray-700'}`}>
                                    {idx + 1}
                                </div>
                                <span className="text-xs font-bold hidden md:block">{s}</span>
                                {idx < STEPS.length - 1 && <div className="w-8 h-px bg-gray-800 hidden md:block"></div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:hidden border-b border-wuxia-gold/10 bg-black/50 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-serif font-bold text-wuxia-gold tracking-wider">Biên niên sử sáng tác</h2>
                        <span className="text-[11px] text-wuxia-gold/40 font-mono">{step + 1}/{STEPS.length}</span>
                    </div>
                    <div className="mt-2 text-xs text-wuxia-gold font-bold tracking-widest">{currentStepLabel}</div>
                    <div className="mt-2 h-1 w-full bg-black/60 border border-wuxia-gold/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-wuxia-gold shadow-[0_0_5px_rgba(230,200,110,0.5)] transition-all duration-300"
                            style={{ width: `${stepProgress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-black/20 relative">

                    {/* STEP 1: WORLD SETTINGS */}
                    {step === 0 && (
                        <div className="animate-slide-in max-w-4xl mx-auto">
                            <OrnateBorder className="p-4 md:p-8">
                                <h3 className="text-xl font-serif font-bold text-wuxia-gold border-b border-wuxia-gold/30 pb-3 mb-6">Thiết lập quy luật thế giới</h3>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 group">
                                            <label className="text-sm text-wuxia-gold group-hover:text-amber-300 transition-colors font-serif font-bold italic block">Tên thế giới</label>
                                            <input
                                                value={worldConfig.worldName}
                                                onChange={e => setWorldConfig({ ...worldConfig, worldName: e.target.value })}
                                                placeholder="Nhập tên thế giới..."
                                                className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-3 text-wuxia-gold outline-none rounded-md transition-all font-serif tracking-wider placeholder-wuxia-gold/30"
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-sm text-wuxia-gold group-hover:text-amber-300 transition-colors font-serif font-bold italic block">Độ khó</label>
                                            <InlineSelect
                                                value={worldConfig.difficulty}
                                                options={DIFFICULTY_OPTIONS}
                                                onChange={(difficulty) => setWorldConfig({ ...worldConfig, difficulty })}
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-sm text-wuxia-gold group-hover:text-amber-300 transition-colors font-serif font-bold italic block">Hệ thống vũ lực</label>
                                            <InlineSelect
                                                value={worldConfig.powerLevel}
                                                options={POWER_LEVEL_OPTIONS}
                                                onChange={(powerLevel) => setWorldConfig({ ...worldConfig, powerLevel })}
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-sm text-wuxia-gold group-hover:text-amber-300 transition-colors font-serif font-bold italic block">Bản đồ thế giới</label>
                                            <InlineSelect
                                                value={worldConfig.worldSize}
                                                options={WORLD_SIZE_OPTIONS}
                                                onChange={(worldSize) => setWorldConfig({ ...worldConfig, worldSize })}
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-sm text-wuxia-gold group-hover:text-amber-300 transition-colors font-serif font-bold italic block">Mật độ môn phái</label>
                                            <InlineSelect
                                                value={worldConfig.sectDensity}
                                                options={SECT_DENSITY_OPTIONS}
                                                onChange={(sectDensity) => setWorldConfig({ ...worldConfig, sectDensity })}
                                            />
                                        </div>

                                        <div className="space-y-4 pt-2 border-t border-wuxia-gold/10 mt-2">
                                            <div className="flex items-center justify-between group p-3 bg-wuxia-gold/5 rounded-lg border border-wuxia-gold/10 active:border-wuxia-gold/30 transition-all">
                                                <div className="space-y-0.5">
                                                    <label className="text-sm font-medium text-wuxia-gold group-hover:text-amber-300 transition-colors block italic">Chế độ NSFW</label>
                                                    <p className="text-[10px] text-wuxia-gold/50 italic">Kích hoạt các nội dung nhạy cảm và 18+</p>
                                                </div>
                                                <ToggleSwitch
                                                    checked={!!worldConfig.enableNsfw}
                                                    onChange={(val) => setWorldConfig(prev => ({ ...prev, enableNsfw: val }))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-wuxia-gold/70 font-serif font-bold italic block">Bối cảnh triều đại (Tùy chỉnh)</label>
                                        <input
                                            value={worldConfig.dynastySetting}
                                            onChange={e => setWorldConfig({ ...worldConfig, dynastySetting: e.target.value })}
                                            placeholder="Anh hùng tranh đỉnh, cuối triều đại suy tàn"
                                            className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-3 text-wuxia-gold outline-none rounded-md transition-all font-serif tracking-wider placeholder-wuxia-gold/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-wuxia-gold/70 font-serif font-bold italic block">Thiên kiều/Thiết lập vũ lực (Tùy chỉnh)</label>
                                        <textarea
                                            value={worldConfig.tianjiaoSetting}
                                            onChange={e => setWorldConfig({ ...worldConfig, tianjiaoSetting: e.target.value })}
                                            placeholder="Thời kỳ tranh giành, thiên tài xuất hiện đồng loạt"
                                            className="w-full h-24 bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-3 text-wuxia-gold outline-none rounded-md transition-all resize-none font-serif placeholder-wuxia-gold/30"
                                        />
                                    </div>
                                </div>
                            </OrnateBorder>
                        </div>
                    )}

                    {/* STEP 2: CHARACTER BASIC */}
                    {step === 1 && (
                        <div className="animate-slide-in max-w-4xl mx-auto">
                            <h3 className="text-lg md:text-xl font-serif font-bold text-wuxia-gold border-b border-wuxia-gold/30 pb-3 mb-6">Hồ sơ hiệp khách</h3>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                                {/* Left: Info */}
                                <div className="md:col-span-2 space-y-6">
                                    <OrnateBorder className="p-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-wuxia-gold/70 font-serif font-bold italic block">Họ và tên</label>
                                            <input
                                                value={charName}
                                                onChange={e => setCharName(e.target.value)}
                                                placeholder="Nhập tên hiệu của bạn"
                                                className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-3 text-wuxia-gold outline-none rounded-md transition-all font-serif tracking-wider italic"
                                            />
                                        </div>
                                    </OrnateBorder>

                                    <OrnateBorder className="p-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm text-wuxia-gold/70 font-serif font-bold italic block">Giới tính</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button onClick={() => setCharGender('Male')} className={`p-3 rounded text-center transition-all ${charGender === 'Male' ? 'bg-wuxia-gold/20 text-wuxia-gold border-wuxia-gold border shadow-[0_0_10px_rgba(230,200,110,0.2)]' : 'bg-transparent border border-wuxia-gold/10 hover:border-wuxia-gold/30 text-wuxia-gold/40'}`}>Nam</button>
                                                    <button onClick={() => setCharGender('Female')} className={`p-3 rounded text-center transition-all ${charGender === 'Female' ? 'bg-wuxia-gold/20 text-wuxia-gold border-wuxia-gold border shadow-[0_0_10px_rgba(230,200,110,0.2)]' : 'bg-transparent border border-wuxia-gold/10 hover:border-wuxia-gold/30 text-wuxia-gold/40'}`}>Nữ</button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-wuxia-gold/70 font-serif font-bold italic block">Ngày sinh</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <CompactDropdown
                                                        value={birthMonth}
                                                        options={monthOptions}
                                                        suffix="Tháng"
                                                        open={monthOpen}
                                                        onToggle={() => {
                                                            setMonthOpen((prev) => !prev);
                                                            setDayOpen(false);
                                                        }}
                                                        onSelect={(next) => {
                                                            setBirthMonth(next);
                                                            setMonthOpen(false);
                                                        }}
                                                        containerRef={monthRef}
                                                    />
                                                    <CompactDropdown
                                                        value={birthDay}
                                                        options={dayOptions}
                                                        suffix="Ngày"
                                                        open={dayOpen}
                                                        onToggle={() => {
                                                            setDayOpen((prev) => !prev);
                                                            setMonthOpen(false);
                                                        }}
                                                        onSelect={(next) => {
                                                            setBirthDay(next);
                                                            setDayOpen(false);
                                                        }}
                                                        containerRef={dayRef}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </OrnateBorder>

                                    <OrnateBorder className="p-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-wuxia-gold/70 font-serif font-bold italic block">Tuổi</label>
                                            <input type="number" min={14} max={100} value={charAge} onChange={e => setCharAge(parseInt(e.target.value))} className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-3 text-wuxia-gold outline-none rounded-md transition-all font-serif tracking-wider" />
                                        </div>
                                    </OrnateBorder>

                                    <OrnateBorder className="p-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-wuxia-gold/70 font-serif font-bold italic block">Ngoại hình</label>
                                            <textarea
                                                value={charAppearance}
                                                onChange={e => setCharAppearance(e.target.value)}
                                                placeholder="Tóc đen và mắt đen..."
                                                className="w-full h-24 bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-3 text-wuxia-gold outline-none rounded-md transition-all resize-none font-serif"
                                            />
                                        </div>
                                    </OrnateBorder>

                                    <OrnateBorder className="p-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-wuxia-gold/70 font-serif font-bold italic block">Tính cách</label>
                                            <div className="relative">
                                                <textarea
                                                    value={charPersonality}
                                                    onChange={e => setCharPersonality(e.target.value)}
                                                    placeholder="Chí khí cao vời..."
                                                    className="w-full h-24 bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-3 pr-10 text-wuxia-gold outline-none rounded-md transition-all resize-none font-serif"
                                                />
                                                <button
                                                    onClick={() => setCharPersonality(PERSONALITY_PRESETS[Math.floor(Math.random() * PERSONALITY_PRESETS.length)])}
                                                    title="Ngẫu nhiên tính cách"
                                                    className="absolute right-2 bottom-2 text-wuxia-gold/50 hover:text-wuxia-gold transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/><path d="M12 12h.01"/></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </OrnateBorder>
                                </div>

                                {/* Right: Stats */}
                                <div className="md:col-span-3">
                                    <OrnateBorder className="h-full">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-wuxia-gold font-bold text-lg">Thiên bẩm cốt cách</span>
                                            <span className={`text-sm font-mono transition-colors ${remainingPoints > 0 ? 'text-green-400' : 'text-wuxia-gold/40'}`}>Điểm còn lại: {remainingPoints}</span>
                                        </div>
                                        <div className="space-y-4 pt-4 border-t border-wuxia-gold/20">
                                            {Object.entries(stats).map(([key, val]) => (
                                                <div key={key} className="flex items-center justify-between">
                                                    <span className="text-wuxia-gold/70 text-base font-serif w-20">{STAT_LABELS[key] ?? key}</span>
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => handleStatChange(key as any, -1)} className="w-8 h-8 bg-black/60 border border-wuxia-gold/20 text-wuxia-gold/50 hover:text-wuxia-gold hover:border-wuxia-gold rounded-md disabled:opacity-30 transition-all font-bold" disabled={(val as number) <= 1}>-</button>
                                                        <span className="w-8 text-center text-wuxia-gold font-serif font-black text-xl shadow-glow-sm">{val as number}</span>
                                                        <button onClick={() => handleStatChange(key as any, 1)} className="w-8 h-8 bg-black/60 border border-wuxia-gold/20 text-wuxia-gold/50 hover:text-wuxia-gold hover:border-wuxia-gold rounded-md disabled:opacity-30 transition-all font-bold" disabled={remainingPoints <= 0}>+</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </OrnateBorder>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: TALENTS & BACKGROUND */}
                    {step === 2 && (
                        <div className="space-y-8 animate-slide-in max-w-5xl mx-auto">

                            {/* Backgrounds */}
                            <OrnateBorder className="p-6">
                                <div className="flex justify-between items-center border-b border-wuxia-gold/30 pb-3 mb-4">
                                    <h3 className="text-xl font-serif font-bold text-wuxia-gold">Thân thế xuất thân (Chọn một)</h3>
                                    <button onClick={() => setShowCustomBackground(!showCustomBackground)} className="text-xs text-wuxia-gold hover:underline font-medium">+ Thân thế tùy chỉnh</button>
                                </div>
                                {showCustomBackground && (
                                    <div className="bg-black/40 border border-wuxia-gold/30 p-4 mb-4 rounded-lg space-y-3 shadow-inner shadow-black/40">
                                        <input
                                            placeholder="Tên thân thế (VD: Thái tử phủ Giang Nam)"
                                            value={customBackground.name}
                                            onChange={e => setCustomBackground({ ...customBackground, name: e.target.value })}
                                            className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-2 text-xs text-wuxia-gold outline-none rounded-md transition-all font-serif"
                                        />
                                        <input
                                            placeholder="Mô tả thân thế"
                                            value={customBackground.description}
                                            onChange={e => setCustomBackground({ ...customBackground, description: e.target.value })}
                                            className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-2 text-xs text-wuxia-gold/80 outline-none rounded-md transition-all font-serif"
                                        />
                                        <input
                                            placeholder="Hiệu ứng thân thế"
                                            value={customBackground.effect}
                                            onChange={e => setCustomBackground({ ...customBackground, effect: e.target.value })}
                                            className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-2 text-xs text-wuxia-gold outline-none rounded-md transition-all font-serif italic"
                                        />
                                        <GameButton onClick={addCustomBackground} variant="secondary" className="w-full py-1 text-xs">Thêm</GameButton>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {allBackgroundOptions.map((bg, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedBackground(bg)}
                                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${selectedBackground.name === bg.name
                                                    ? 'border-wuxia-gold bg-wuxia-gold/10 shadow-lg shadow-wuxia-gold/10'
                                                    : 'border-wuxia-gold/10 bg-transparent hover:border-wuxia-gold/30'
                                                }`}
                                        >
                                            <div className={`font-bold text-sm font-serif ${selectedBackground.name === bg.name ? 'text-wuxia-gold' : 'text-wuxia-gold/50'}`}>
                                                {bg.name}
                                                {!PresetBackground.some(p => p.name === bg.name) ? ' (Tùy chỉnh)' : ''}
                                            </div>
                                            <div className="text-xs text-wuxia-gold/40 mt-1 line-clamp-2 italic">{bg.description}</div>
                                            <div className="text-xs text-wuxia-gold/80 mt-2 pt-2 border-t border-wuxia-gold/10 font-mono">{bg.effect}</div>
                                        </div>
                                    ))}
                                </div>
                            </OrnateBorder>

                            {/* Talents */}
                            <OrnateBorder className="p-6">
                                <div className="flex justify-between items-center border-b border-wuxia-gold/30 pb-3 mb-4">
                                    <h3 className="text-xl font-serif font-bold text-wuxia-gold">Lựa chọn thiên bẩm (Tối đa 3 mục)</h3>
                                    <button onClick={() => setShowCustomTalent(!showCustomTalent)} className="text-xs text-wuxia-gold hover:underline font-medium">+ Thêm thiên bẩm</button>
                                </div>

                                {showCustomTalent && (
                                    <div className="bg-black/40 border border-wuxia-gold/30 p-4 mb-4 rounded-lg space-y-3 shadow-inner shadow-black/40">
                                        <div className="flex gap-2">
                                            <input placeholder="Tên thiên bẩm" value={customTalent.name} onChange={e => setCustomTalent({ ...customTalent, name: e.target.value })} className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-2 text-xs text-wuxia-gold outline-none rounded-md transition-all flex-1 font-serif" />
                                            <input placeholder="Hiệu ứng (VD: Tấn công +10)" value={customTalent.effect} onChange={e => setCustomTalent({ ...customTalent, effect: e.target.value })} className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-2 text-xs text-wuxia-gold outline-none rounded-md transition-all flex-1 font-serif italic" />
                                        </div>
                                        <input placeholder="Mô tả" value={customTalent.description} onChange={e => setCustomTalent({ ...customTalent, description: e.target.value })} className="w-full bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-2 text-xs text-wuxia-gold/80 outline-none rounded-md transition-all font-serif" />
                                        <GameButton onClick={addCustomTalent} variant="secondary" className="w-full py-1 text-xs">Thêm</GameButton>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {allTalentOptions.map((t, idx) => {
                                        const isSelected = !!selectedTalents.find(x => x.name === t.name);
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => toggleTalent(t)}
                                                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${isSelected
                                                        ? 'border-wuxia-gold bg-wuxia-gold/10 shadow-lg shadow-wuxia-gold/10'
                                                        : 'border-wuxia-gold/10 bg-black/20 hover:border-wuxia-gold/30'
                                                    }`}
                                            >
                                                <div className={`font-bold text-sm font-serif ${isSelected ? 'text-wuxia-gold' : 'text-wuxia-gold/50'}`}>
                                                    {t.name}
                                                    {!PresetTalent.some(p => p.name === t.name) ? ' (Tùy chỉnh)' : ''}
                                                </div>
                                                <div className="text-xs text-wuxia-gold/50 mt-1 line-clamp-2 italic" title={t.description}>{t.description}</div>
                                                <div className="text-xs text-wuxia-gold/80 mt-2 pt-2 border-t border-wuxia-gold/10 font-mono">{t.effect}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </OrnateBorder>
                        </div>
                    )}

                    {/* STEP 4: CONFIRMATION */}
                    {step === 3 && (
                        <div className="space-y-6 animate-slide-in max-w-lg mx-auto flex flex-col items-center">
                            <h3 className="text-xl font-serif font-bold text-wuxia-gold border-b border-wuxia-gold/30 pb-3 mb-6 w-full text-center">Xác nhận hiệp khách</h3>
                             <OrnateBorder className="w-full p-6 text-left">
                                <div className="text-sm space-y-3 font-mono text-wuxia-gold/70">
                                    <p>Thế giới: <span className="text-wuxia-gold">{worldConfig.worldName || 'Chưa điền tên'}</span> <span className='text-wuxia-gold/40'>({POWER_LEVEL_OPTIONS.find(o => o.value === worldConfig.powerLevel)?.label ?? worldConfig.powerLevel})</span></p>
                                    <p>Độ khó: <span className="text-wuxia-gold">{DIFFICULTY_OPTIONS.find(o => o.value === worldConfig.difficulty)?.label ?? worldConfig.difficulty}</span></p>
                                    <p>Nhân vật chính: <span className="text-wuxia-gold">{charName.trim() || 'Chưa điền tên'}</span> <span className='text-wuxia-gold/40'>({GENDER_LABELS[charGender] === 'Nam' ? 'Nam' : 'Nữ'}, {charAge} tuổi)</span></p>
                                    <p>Ngoại hình: <span className="text-wuxia-gold">{charAppearance.trim() || 'Chưa điền'}</span></p>
                                    <p>Thân thế: <span className="text-wuxia-gold">{selectedBackground.name}</span></p>
                                    <p>Thiên bẩm: <span className="text-wuxia-gold">{selectedTalents.map(t => t.name).join(', ') || 'Không có'}</span></p>
                                    <div className="pt-2 border-t border-wuxia-gold/10 mt-2 space-y-1">
                                        <p>Chế độ NSFW: <span className={worldConfig.enableNsfw ? "text-green-400" : "text-wuxia-gold/40"}>{worldConfig.enableNsfw ? 'Đã bật' : 'Tắt'}</span></p>
                                    </div>
                                </div>
                            </OrnateBorder>

                            <OrnateBorder className="w-full p-4">
                                <div className="flex items-center justify-between p-4 bg-wuxia-gold/5 rounded-lg border border-wuxia-gold/20 group hover:border-wuxia-gold/40 transition-all">
                                    <div className="flex flex-col text-left">
                                        <span className="text-wuxia-gold font-medium font-serif">Truyền phát cốt truyện mở đầu</span>
                                        <span className="text-[11px] text-wuxia-gold/50 italic">Bật chế độ này để hiển thị nội dung tạo mở đầu theo thời gian thực</span>
                                    </div>
                                    <ToggleSwitch
                                        checked={openingStreaming}
                                        onChange={setOpeningStreaming}
                                    />
                                </div>
                            </OrnateBorder>

                            <div className="text-center text-[11px] text-wuxia-gold/40">
                                Vui lòng nhấn nút "Tạo một chạm" bên dưới để bước vào thế giới
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Nav */}
                <div className="hidden md:flex h-16 border-t border-wuxia-gold/10 bg-black/40 items-center justify-between px-8">
                    {step > 0 ? (

                        <GameButton onClick={() => setStep(step - 1)} variant="secondary" className="px-6 py-2 border-opacity-50 opacity-80 hover:opacity-100">
                            &larr; Bước trước
                        </GameButton>
                    ) : (

                        <GameButton onClick={onCancel} variant="secondary" className="px-6 py-2 !border-red-500/50 !text-red-500/80 hover:!bg-red-500/10 hover:!text-red-500">
                            Hủy
                        </GameButton>
                    )}

                    {step < STEPS.length - 1 ? (
                        <GameButton onClick={() => setStep(step + 1)} variant="primary" className="px-6 py-2">
                            Bước tiếp &rarr;
                        </GameButton>
                    ) : null}
                </div>
                <div className="md:hidden border-t border-wuxia-gold/10 bg-black/60 px-3 py-3 pb-[calc(env(safe-area-inset-bottom)+10px)]">
                    <div className="flex items-center gap-2">
                        {step > 0 ? (
                            <GameButton onClick={() => setStep(step - 1)} variant="secondary" className="flex-1 py-2 text-xs">
                                Bước trước
                            </GameButton>
                        ) : (
                            <GameButton onClick={onCancel} variant="secondary" className="flex-1 py-2 text-xs !border-red-500/50 !text-red-400">
                                Hủy
                            </GameButton>
                        )}
                        {step < STEPS.length - 1 ? (
                            <GameButton onClick={() => setStep(step + 1)} variant="primary" className="flex-1 py-2 text-xs">
                                Bước tiếp
                            </GameButton>
                        ) : (
                            <GameButton onClick={() => { void handleGenerate(); }} variant="primary" className="flex-1 py-2 text-xs">
                                Tạo một chạm
                            </GameButton>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MobileNewGameWizard;


