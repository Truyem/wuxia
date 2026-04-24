import type {
    OpeningConfig,
    FandomCharacterReplacementRule,
    GameDifficulty,
    InitialRelationTemplateType,
    RelationFocusType,
    OpeningEntryPreferenceType,
    FandomSourceType,
    FandomBlendIntensityType
} from '../types';

export const NEW_GAME_STEPS_LIST = ['world', 'role', 'talent', 'opening_config', 'confirm'] as const;

export const ATTRIBUTE_KEYS = ['strength', 'agility', 'constitution', 'rootBone', 'intelligence', 'luck'] as const;
export const DEFAULT_ATTRIBUTE_VALUE = 3;
export const ATTRIBUTE_MIN = 3;
export const ATTRIBUTE_MAX = 10;

export const DIFFICULTY_TOTAL_ATTRIBUTE_POINTS: Record<GameDifficulty, number> = {
    relaxed: 38,
    easy: 34,
    normal: 30,
    hard: 26,
    extreme: 22,
    custom: 30
};

export const INITIAL_RELATION_OPTIONS_VIETNAMESE: Array<{ value: InitialRelationTemplateType; label: string; hint: string }> = [
    { value: '独行少系', label: 'Một mình', hint: 'Mạng lưới xã hội ban đầu thu gọn 1-2 người, thiên về một mình phiêu lưu.' },
    { value: '家族牵引', label: 'Gia tộc', hint: 'Ưu tiên tạo người thân, tộc nhân, nhà cũ và áp lực gia sản.' },
    { value: '师门牵引', label: 'Sư môn', hint: 'Ưu tiên tạo sư phụ, đồng môn, quy củ môn và nhiệm vụ trong môn.' },
    { value: '世家官门', label: 'Quý tộc', hint: 'Thiên về địa vị, quan hệ, nghi lễ và mạng lưới tài nguyên thực tế.' },
    { value: '青梅旧识', label: 'Bạn cũ', hint: 'Ưu tiên tạo bạn bè cũ, người quen và dòng cảm xúc từ quá khứ.' },
    { value: '旧仇旧债', label: 'Thù cũ', hint: 'Mối quan hệ xã hội mang theo món nợ cũ, mối hận và nguồn áp lực.' }
];

export const RELATION_FOCUS_OPTIONS_VIETNAMESE: Array<{ value: RelationFocusType; label: string }> = [
    { value: '亲情', label: 'Quan tình' },
    { value: '友情', label: 'Hữu nghị' },
    { value: '师门', label: 'Sư môn' },
    { value: '情缘', label: 'Tình duyên' },
    { value: '利益', label: 'Lợi ích' },
    { value: '仇怨', label: 'Thù oán' }
];

export const OPENING_ENTRY_OPTIONS_VIETNAMESE: Array<{ value: OpeningEntryPreferenceType; label: string; hint: string }> = [
    { value: '日常低压', label: 'Sinh hoạt hàng ngày', hint: 'Ưu tiên bắt đầu từ cuộc sống thường nhật, bầu không khí nhẹ nhàng và quan hệ đơn giản.' },
    { value: '在途起手', label: 'Khởi đầu trên đường', hint: 'Bắt đầu ở cảnh di chuyển, đường giao thông, núi non.' },
    { value: '家宅起手', label: 'Khởi đầu từ nhà', hint: 'Ưu tiên bắt đầu trong phòng, sân, cửa hàng, biệt thự.' },
    { value: '门派起手', label: 'Khởi đầu từ môn phái', hint: 'Ưu tiên bắt đầu ở cổng môn, sân tập, đại sảnh.' },
    { value: '风波前夜', label: 'Trước cơn bão', hint: 'Cho phép có những dấu hiệu bất ổn, nhưng vẫn giữ sự kiềm chế trong hồi đầu.' }
];

export const FANDOM_SOURCE_OPTIONS_VIETNAMESE: Array<{ value: FandomSourceType; label: string }> = [
    { value: '小说', label: 'Tiểu thuyết' },
    { value: '动漫', label: 'Anime/Manga' },
    { value: '游戏', label: 'Game' },
    { value: '影视', label: 'Phim/TV' }
];

export const FANDOM_INTENSITY_OPTIONS_VIETNAMESE: Array<{ value: FandomBlendIntensityType; label: string; hint: string }> = [
    { value: '轻度映射', label: 'Ánh xạ nhẹ', hint: 'Chỉ mượn bầu không khí và chủ đề, không trực tiếp mang nhân vật.' },
    { value: '中度混编', label: 'Trộn lẫn vừa', hint: 'Cho phép một số thế lực, cài đặt và phong cách vào thế giới gốc.' },
    { value: '显性同台', label: 'Xuất hiện rõ ràng', hint: 'Cho phép nhân vật hoặc thế lực gốc tồn tại trực tiếp.' }
];

export const DEFAULT_OPENING_CONFIG = (): OpeningConfig => ({
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
});

const readText = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');
const REPLACEMENT_NAME_SPLIT_REGEX = /[\r\n,，、;；]+/u;

export const normalizeReplacementNameList = (value: unknown): string[] => {
    const rawList = Array.isArray(value)
        ? value
        : typeof value === 'string'
            ? value.split(REPLACEMENT_NAME_SPLIT_REGEX)
            : [];
    const result: string[] = [];
    const seen = new Set<string>();
    rawList.forEach((item) => {
        const name = readText(item);
        if (!name || seen.has(name)) return;
        seen.add(name);
        result.push(name);
    });
    return result;
};

export const normalizeReplacementRuleList = (value: unknown): FandomCharacterReplacementRule[] => {
    const source = Array.isArray(value) ? value : [];
    const result: FandomCharacterReplacementRule[] = [];
    source.forEach((item) => {
        const 原名称 = readText((item as FandomCharacterReplacementRule | null | undefined)?.原名称);
        const 替换为 = readText((item as FandomCharacterReplacementRule | null | undefined)?.替换为);
        if (!原名称 || !替换为) return;
        result.push({ 原名称, 替换为 });
    });
    return result;
};

export const getCharacterReplacementRules = (
    config?: OpeningConfig | null,
    playerName?: string
): FandomCharacterReplacementRule[] => {
    const ruleMap = new Map<string, string>();
    const resolvedPlayerName = readText(playerName);
    const addRule = (原名称: unknown, 替换为: unknown) => {
        const sourceName = readText(原名称);
        const targetName = readText(替换为);
        if (!sourceName || !targetName || sourceName === targetName) return;
        ruleMap.set(sourceName, targetName);
    };

    addRule(config?.同人融合?.替换目标角色名, resolvedPlayerName);
    normalizeReplacementNameList(config?.同人融合?.附加替换角色名列表)
        .forEach((name) => addRule(name, resolvedPlayerName));
    normalizeReplacementRuleList(config?.同人融合?.附加角色替换规则列表)
        .forEach((rule) => addRule(rule.原名称, rule.替换为));

    return Array.from(ruleMap.entries()).map(([原名称, 替换为]) => ({ 原名称, 替换为 }));
};

export const formatReplacementRuleSummary = (
    rules: FandomCharacterReplacementRule[],
    options?: { maxItems?: number }
): string => {
    const list = normalizeReplacementRuleList(rules).map((rule) => `${rule.原名称} -> ${rule.替换为}`);
    if (list.length <= 0) return '';
    const maxItems = Math.max(1, Math.floor(options?.maxItems || 3));
    if (list.length <= maxItems) return list.join('；');
    return `${list.slice(0, maxItems).join('；')} 等${list.length}项`;
};

export const getDifficultyTotalAttributePoints = (difficulty?: GameDifficulty): number => (
    DIFFICULTY_TOTAL_ATTRIBUTE_POINTS[difficulty || 'normal'] || DIFFICULTY_TOTAL_ATTRIBUTE_POINTS.normal
);

export const createDefaultAttributeDistribution = () => ({
    strength: DEFAULT_ATTRIBUTE_VALUE,
    agility: DEFAULT_ATTRIBUTE_VALUE,
    constitution: DEFAULT_ATTRIBUTE_VALUE,
    rootBone: DEFAULT_ATTRIBUTE_VALUE,
    intelligence: DEFAULT_ATTRIBUTE_VALUE,
    luck: DEFAULT_ATTRIBUTE_VALUE
});

const RELATION_OPTIONS = [
    { value: '独行少系' },
    { value: '家族牵引' },
    { value: '师门牵引' },
    { value: '世家官门' },
    { value: '青梅旧识' },
    { value: '旧仇旧债' }
];

const FOCUS_OPTIONS = [
    { value: '亲情' },
    { value: '友情' },
    { value: '师门' },
    { value: '情缘' },
    { value: '利益' },
    { value: '仇怨' }
];

const ENTRY_OPTIONS = [
    { value: '日常低压' },
    { value: '在途起手' },
    { value: '家宅起手' },
    { value: '门派起手' },
    { value: '风波前夜' }
];

const SOURCE_OPTIONS = [
    { value: '小说' },
    { value: '动漫' },
    { value: '游戏' },
    { value: '影视' }
];

const INTENSITY_OPTIONS = [
    { value: '轻度映射' },
    { value: '中度混编' },
    { value: '显性同台' }
];

export const normalizeOpeningConfig = (raw?: any): OpeningConfig => {
    const fallback = DEFAULT_OPENING_CONFIG();
    const 初始关系模板 = RELATION_OPTIONS.some((item) => item.value === raw?.初始关系模板)
        ? raw.初始关系模板
        : fallback.初始关系模板;
    const 关系侧重 = Array.isArray(raw?.关系侧重)
        ? raw.关系侧重
            .map((item: unknown) => readText(item))
            .filter((item: string): item is RelationFocusType => FOCUS_OPTIONS.some((option) => option.value === item))
            .slice(0, 2)
        : fallback.关系侧重;
    const 开局切入偏好 = ENTRY_OPTIONS.some((item) => item.value === raw?.开局切入偏好)
        ? raw.开局切入偏好
        : fallback.开局切入偏好;
    const 来源类型 = SOURCE_OPTIONS.some((item) => item.value === raw?.同人融合?.来源类型)
        ? raw.同人融合.来源类型
        : fallback.同人融合.来源类型;
    const 融合强度 = INTENSITY_OPTIONS.some((item) => item.value === raw?.同人融合?.融合强度)
        ? raw.同人融合.融合强度
        : fallback.同人融合.融合强度;

    return {
        初始关系模板,
        关系侧重: 关系侧重.length > 0 ? 关系侧重 : fallback.关系侧重,
        开局切入偏好,
        同人融合: {
            enabled: raw?.同人融合?.enabled === true,
            作品名: readText(raw?.同人融合?.作品名),
            来源类型,
            融合强度,
            保留原著角色: raw?.同人融合?.保留原著角色 === true,
            启用角色替换: raw?.同人融合?.启用角色替换 === true,
            替换目标角色名: readText(raw?.同人融合?.替换目标角色名),
            附加替换角色名列表: normalizeReplacementNameList(raw?.同人融合?.附加替换角色名列表),
            附加角色替换规则列表: normalizeReplacementRuleList(raw?.同人融合?.附加角色替换规则列表),
            启用附加小说: raw?.同人融合?.启用附加小说 === true,
            附加小说数据集ID: readText(raw?.同人融合?.附加小说数据集ID)
        }
    };
};

export const normalizeOptionalOpeningConfig = (raw?: any): OpeningConfig | undefined => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return undefined;
    return normalizeOpeningConfig(raw);
};