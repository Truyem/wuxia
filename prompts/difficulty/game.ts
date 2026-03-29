import { PromptStructure } from '../../types';

interface GameDifficultyConfig {
    id: string;
    name: string;
    positioning: string;
    enemyMultipliers: {
        hp: number;
        attack: number;
        defense: number;
    };
    resourceEconomy: {
        exp: number;
        drop: number;
        quest: number;
        price: number;
    };
    survivalPressure: {
        energyConsumption: number;
        hungerThirstConsumption: number;
        safeZoneRecovery: number;
        nonSafeZoneRecovery: number;
    };
    socialWorld: {
        assistanceThreshold: string;
        worldReaction: string;
    };
    failureCost: string;
    mandatoryRules: string;
}

const DifficultyConfigTable: GameDifficultyConfig[] = [
    {
        id: 'relaxed',
        name: 'Vãn Cảnh (Nhẹ nhàng)',
        positioning: 'Thiên về trải nghiệm cốt truyện, áp lực sinh tồn và chiến đấu cực thấp.',
        enemyMultipliers: { hp: 0.7, attack: 0.6, defense: 0.7 },
        resourceEconomy: { exp: 1.5, drop: 1.5, quest: 1.3, price: 0.7 },
        survivalPressure: { energyConsumption: 0.5, hungerThirstConsumption: 0.5, safeZoneRecovery: 2.0, nonSafeZoneRecovery: 1.0 },
        socialWorld: { assistanceThreshold: 'NPC rất hào phóng, dễ dàng nhận được hỗ trợ.', worldReaction: 'Thế giới ôn hòa, hiếm khi gặp rắc rối lớn.' },
        failureCost: 'Thất bại chỉ gây ra tổn thất nhỏ về vật tư, không có hình phạt vĩnh viễn.',
        mandatoryRules: 'Dù nhẹ nhàng nhưng vẫn phải duy trì tính logic của thế giới.'
    },
    {
        id: 'easy',
        name: 'Nhập Môn (Dễ)',
        positioning: 'Cung cấp sự phát triển ổn định, phù hợp để làm quen với các hệ thống game.',
        enemyMultipliers: { hp: 0.9, attack: 0.85, defense: 0.9 },
        resourceEconomy: { exp: 1.2, drop: 1.2, quest: 1.1, price: 0.9 },
        survivalPressure: { energyConsumption: 0.8, hungerThirstConsumption: 0.8, safeZoneRecovery: 1.3, nonSafeZoneRecovery: 0.5 },
        socialWorld: { assistanceThreshold: 'NPC thân thiện, sẵn sàng giúp đỡ nếu có quan hệ tốt.', worldReaction: 'Thế giới có quy tắc rõ ràng nhưng không quá khắt khe.' },
        failureCost: 'Thất bại gây tốn kém thời gian và tài nguyên, nhưng có thể phục hồi nhanh chóng.',
        mandatoryRules: 'Yêu cầu sự cố gắng cơ bản để đạt được mục tiêu.'
    },
    {
        id: 'normal',
        name: 'Giang Hồ (Bình thường)',
        positioning: 'Độ khó tiêu chuẩn, nhấn mạnh sự thực tế và khắc nghiệt của giới võ lâm.',
        enemyMultipliers: { hp: 1.2, attack: 1.15, defense: 1.1 },
        resourceEconomy: { exp: 0.9, drop: 0.85, quest: 0.95, price: 1.1 },
        survivalPressure: { energyConsumption: 1.2, hungerThirstConsumption: 1.2, safeZoneRecovery: 0.8, nonSafeZoneRecovery: 0.2 },
        socialWorld: { assistanceThreshold: 'Dựa trên lợi ích và quan hệ thực tế mới có được sự giúp đỡ.', worldReaction: 'Thế giới biến động theo hành động và danh tiếng của người chơi.' },
        failureCost: 'Thất bại để lại hậu quả rõ rệt: bị thương, mất đồ hoặc hỏng việc.',
        mandatoryRules: 'Mọi lựa chọn đều có cái giá phải trả, rủi ro đi kèm với lợi ích.'
    },
    {
        id: 'hard',
        name: 'Khổ Hạnh (Khó)',
        positioning: 'Thách thức cao độ, yêu cầu sự quản lý tài nguyên và chiến thuật chặt chẽ.',
        enemyMultipliers: { hp: 1.5, attack: 1.5, defense: 1.3 },
        resourceEconomy: { exp: 0.7, drop: 0.6, quest: 0.75, price: 1.4 },
        survivalPressure: { energyConsumption: 1.5, hungerThirstConsumption: 1.5, safeZoneRecovery: 0.5, nonSafeZoneRecovery: 0.05 },
        socialWorld: { assistanceThreshold: 'NPC thực dụng, viện trợ rất đắt đỏ và có điều kiện khắt khe.', worldReaction: 'Thế giới nguy hiểm, các thế lực thù địch chủ động truy sát.' },
        failureCost: 'Thất bại gây ra tổn thất nặng nề, có thể mất vĩnh viễn các cơ hội quý giá.',
        mandatoryRules: 'Không có sự khoan nhượng, sai lầm dẫn đến hậu quả nghiêm trọng ngay lập tức.'
    },
    {
        id: 'extreme',
        name: 'Vô Gian (Cực hạn)',
        positioning: 'Trải nghiệm sinh tồn khắc nghiệt nhất, nơi cái chết luôn cận kề.',
        enemyMultipliers: { hp: 2.0, attack: 2.0, defense: 1.7 },
        resourceEconomy: { exp: 0.4, drop: 0.3, quest: 0.5, price: 2.0 },
        survivalPressure: { energyConsumption: 2.0, hungerThirstConsumption: 2.0, safeZoneRecovery: 0.3, nonSafeZoneRecovery: 0.01 },
        socialWorld: { assistanceThreshold: 'Hầu như không có sự giúp đỡ vô tư, mọi thứ đều là sự trao đổi máu và mạng sống.', worldReaction: 'Thế giới cực kỳ bài xích kẻ yếu, thất bại thường dẫn đến kết cục bi thảm.' },
        failureCost: 'Cái chết là vĩnh viễn, tàn phế là chung thân. Tuyến truyện có thể kết thúc bất ngờ.',
        mandatoryRules: 'Cấm mọi hình thức "phép màu" không hợp lý. Luật lệ của thế giới là tuyệt đối.'
    }
];

const buildGameDifficultyPrompt = (config: GameDifficultyConfig): string => `
<Hệ thống Độ khó: ${config.name}>
# Định vị Chế độ: ${config.positioning}

Giao thức này điều chỉnh toàn bộ trải nghiệm từ chiến đấu, tài nguyên đến các phản ứng xã hội. AI phải tuân thủ nghiêm ngặt các tham số dưới đây dựa trên cấp độ khó hiện tại.

## 1. Hiệu chỉnh Chiến đấu
- **Máu kẻ địch**: x${config.enemyMultipliers.hp}
- **Sức tấn công**: x${config.enemyMultipliers.attack}
- **Khả năng phòng thủ**: x${config.enemyMultipliers.defense}
- Ghi chú: Chiến đấu phải cảm thấy kịch tính và có sức nặng phù hợp với độ khó.

## 2. Kinh tế và Tài nguyên
- **Kinh nghiệm (EXP)**: x${config.resourceEconomy.exp}
- **Tỷ lệ rơi đồ**: x${config.resourceEconomy.drop}
- **Phần thưởng nhiệm vụ**: x${config.resourceEconomy.quest}
- **Vật giá thị trường**: x${config.resourceEconomy.price}
- Ghi chú: Việc tích lũy tài nguyên phải phản ánh đúng sự vất vả của chế độ hiện tại.

## 3. Áp lực Sinh tồn
- **Tiêu hao Tinh lực/Năng lượng**: x${config.survivalPressure.energyConsumption}
- **Tiêu hao No bụng/Khát**: x${config.survivalPressure.hungerThirstConsumption}
- **Hồi phục (Khu an toàn)**: x${config.survivalPressure.safeZoneRecovery}
- **Hồi phục (Dã ngoại)**: x${config.survivalPressure.nonSafeZoneRecovery}

## 4. Tương tác Xã hội và Hệ quả
- **Ngưỡng hỗ trợ từ NPC**: ${config.socialWorld.assistanceThreshold}
- **Phản ứng của Thế giới**: ${config.socialWorld.worldReaction}
- **Cái giá của Thất bại**: ${config.failureCost}

## 5. Quy tắc Bắt buộc
- ${config.mandatoryRules}
- AI không được tự ý giảm nhẹ hình phạt hoặc tăng thêm phần thưởng ngoài những gì hệ thống cho phép.
    `.trim();

export const Difficulty_Game: PromptStructure[] = [
    {
        id: 'diff_game_relaxed',
        title: 'Độ khó: Vãn Cảnh',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[0]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_game_easy',
        title: 'Độ khó: Nhập Môn',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[1]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_game_normal',
        title: 'Độ khó: Giang Hồ',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[2]),
        type: 'diff',
        enabled: true
    },
    {
        id: 'diff_game_hard',
        title: 'Độ khó: Khổ Hạnh',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[3]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_game_extreme',
        title: 'Độ khó: Vô Gian',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[4]),
        type: 'diff',
        enabled: false
    }
];
