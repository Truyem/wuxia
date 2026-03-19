
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
        name: 'Nhẹ nhàng',
        positioning: 'Thiên về trải nghiệm cốt truyện, áp lực chiến đấu và tài nguyên thấp nhất.',
        enemyMultipliers: { hp: 0.75, attack: 0.75, defense: 0.8 },
        resourceEconomy: { exp: 1.35, drop: 1.4, quest: 1.25, price: 0.8 },
        survivalPressure: { energyConsumption: 0.7, hungerThirstConsumption: 0.7, safeZoneRecovery: 1.5, nonSafeZoneRecovery: 0.8 },
        socialWorld: { assistanceThreshold: 'NPC có hảo cảm thấp cũng có thể cung cấp trợ giúp cơ bản', worldReaction: 'Dung sai cao, hậu quả phán đoán sai lầm nhẹ nhàng' },
        failureCost: 'Thất bại chủ yếu là trọng thương nhẹ và tổn thất ít vật tư, không kích hoạt hình phạt vĩnh viễn.',
        mandatoryRules: 'Ngay cả ở chế độ nhẹ nhàng, cũng không được tạo ra phần thưởng vô căn cứ.'
    },
    {
        id: 'easy',
        name: 'Dễ',
        positioning: 'Thiên về trưởng thành ổn định, cho phép người mới dần nắm vững hệ thống.',
        enemyMultipliers: { hp: 0.9, attack: 0.9, defense: 0.95 },
        resourceEconomy: { exp: 1.15, drop: 1.2, quest: 1.1, price: 0.9 },
        survivalPressure: { energyConsumption: 0.85, hungerThirstConsumption: 0.85, safeZoneRecovery: 1.25, nonSafeZoneRecovery: 0.6 },
        socialWorld: { assistanceThreshold: 'Hảo cảm trung lập có thể đổi lấy sự chi viện nhỏ', worldReaction: 'Hầu hết các xung đột có thể được xoa dịu thông qua trả phí hoặc xin lỗi' },
        failureCost: 'Thất bại sẽ để lại vết thương và tổn thất tài nguyên, nhưng thường có thể khắc phục sau đó.',
        mandatoryRules: 'Các nút thắt quan trọng cho phép nhượng bộ, không cho phép "tay không bắt giặc".'
    },
    {
        id: 'normal',
        name: 'Bình thường',
        positioning: 'Độ khó tiêu chuẩn của dự án này, nhấn mạnh sinh tồn giang hồ thực tế và cái giá phải trả.',
        enemyMultipliers: { hp: 1.25, attack: 1.2, defense: 1.15 },
        resourceEconomy: { exp: 0.85, drop: 0.8, quest: 0.9, price: 1.2 },
        survivalPressure: { energyConsumption: 1.2, hungerThirstConsumption: 1.3, safeZoneRecovery: 0.75, nonSafeZoneRecovery: 0.2 },
        socialWorld: { assistanceThreshold: 'Trên cơ sở không có hảo cảm, hầu như không cung cấp hỗ trợ bổ sung', worldReaction: 'Danh tiếng và lập trường sẽ ảnh hưởng đáng kể đến các sự kiện tiếp theo' },
        failureCost: 'Thất bại phải được thể hiện qua trọng thương, tổn thất tài sản, suy giảm quan hệ hoặc đóng cửa cốt truyện.',
        mandatoryRules: 'Không có bảo hiểm cốt truyện, mạo hiểm vượt cấp phải kích hoạt hậu quả rủi ro cao.'
    },
    {
        id: 'hard',
        name: 'Khó',
        positioning: 'Áp lực cao và cốt lõi, nhấn mạnh chiến thuật, tiếp tế và quản lý các mối quan hệ xã hội.',
        enemyMultipliers: { hp: 1.45, attack: 1.4, defense: 1.3 },
        resourceEconomy: { exp: 0.7, drop: 0.65, quest: 0.75, price: 1.4 },
        survivalPressure: { energyConsumption: 1.4, hungerThirstConsumption: 1.5, safeZoneRecovery: 0.6, nonSafeZoneRecovery: 0.1 },
        socialWorld: { assistanceThreshold: 'Cần hảo cảm đáng kể hoặc trao đổi lợi ích tương đương mới được viện trợ', worldReaction: 'Các thế lực thù địch sẽ truy đuổi và phong tỏa tích cực hơn' },
        failureCost: 'Thất bại thường kèm theo di chứng lâu dài, có thể mất các vật phẩm quan trọng hoặc tuyến nhiệm vụ.',
        mandatoryRules: 'Không thể dùng sự trùng hợp để bù đắp cho những sai lầm liên tiếp, hệ thống phải thực thi cái giá phải trả.'
    },
    {
        id: 'extreme',
        name: 'Cực hạn',
        positioning: 'Trải nghiệm sinh tồn địa ngục, bất kỳ sai lầm nào cũng có thể không thể cứu vãn.',
        enemyMultipliers: { hp: 1.7, attack: 1.7, defense: 1.5 },
        resourceEconomy: { exp: 0.5, drop: 0.45, quest: 0.55, price: 1.8 },
        survivalPressure: { energyConsumption: 1.7, hungerThirstConsumption: 1.8, safeZoneRecovery: 0.4, nonSafeZoneRecovery: 0.03 },
        socialWorld: { assistanceThreshold: 'Phải đáp ứng đồng thời hảo cảm cao và khế ước rõ ràng mới có thể nhận được hỗ trợ', worldReaction: 'Giang hồ cực kỳ không khoan nhượng với kẻ yếu, thất bại sẽ bị tiếp tục truy đuổi' },
        failureCost: 'Thất bại có thể trực tiếp kích hoạt cái chết, tàn tật, thanh trừng thế lực hoặc đứt gãy mạch truyện chính.',
        mandatoryRules: 'Cấm các câu chuyện lật ngược tình thế kỳ tích, tổn thất phải được thực hiện và có thể truy xuất nguồn gốc.'
    }
];

const buildGameDifficultyPrompt = (config: GameDifficultyConfig): string => `
<GiaoThứcĐộKhóTròChơi>
# 【Độ khó trò chơi: ${config.name}】
Định vị chế độ này: ${config.positioning}

Giao thức này là "Khu vực nhân độ khó toàn cầu", được sử dụng để điều chỉnh thống nhất chiến đấu, tài nguyên, sinh tồn, xã hội và cái giá thất bại.
Khi thực thi phải đồng thời thỏa mãn: <GiaoThứcĐồngBộDữLiệu>, <ĐịnhNghĩaCấuTrúcDữLiệu>, <GiaoThứcTiềnTưDuyCOT>.

## 1. Phạm vi tác động của độ khó (Bắt buộc)
- Độ khó này chỉ điều chỉnh "Hệ số, Ngưỡng, Cường độ cái giá phải trả", không thay đổi cấu trúc trường và đường dẫn ghi dữ liệu.
- Vẫn chỉ có thể ghi vào: \`gameState.character/environment/social/world/battle/story\`.
- Nghiêm cấm sử dụng "giải thích độ khó" để bỏ qua tính hợp pháp của mệnh lệnh (như vượt biên giới, đường dẫn không tồn tại, lỗi kiểu dữ liệu).

## 2. Khu vực nhân cường độ chiến đấu
- Hệ số máu kẻ địch: x${config.enemyMultipliers.hp}
- Hệ số tấn công kẻ địch: x${config.enemyMultipliers.attack}
- Hệ số phòng ngự kẻ địch: x${config.enemyMultipliers.defense}
- Quyết toán tuân theo <GiaoThứcCỡNòngChiếnĐấu> và <GiaoThứcSinhMệnhBộPhận>:
  - Sau khi chiến đấu phải đồng bộ lượng máu/trạng thái bộ phận người chơi, tinh lực hiện tại, trạng thái chiến đấu.
  - Không được "chiến thắng bằng văn bản" nhưng biến số vẫn giữ trạng thái chưa quyết toán.
- Liên kết bối cảnh:
  - Dựa vào \`gameState.environment.weather.weather\`, \`gameState.environment.envVariables\`, \`gameState.environment.specificLocation\` để quyết định hiệu chỉnh tư thế chiến đấu.

## 3. Khu vực nhân tài nguyên và kinh tế
- Hệ số kinh nghiệm: x${config.resourceEconomy.exp}
- Hệ số rơi đồ: x${config.resourceEconomy.drop}
- Hệ số phần thưởng nhiệm vụ: x${config.resourceEconomy.quest}
- Hệ số vật giá: x${config.resourceEconomy.price}
- Tính toán kinh nghiệm tuân theo <GiaoThứcTrưởngThànhKinhNghiệm>:
  - \`EXP = floor(Kinh nghiệm cơ bản * Rủi ro * Cách biệt cảnh giới * Lần đầu * Độ khó * (1 + Ngộ tính * 0.015 + Phúc duyên * 0.005))\`
  - Độ khó này chỉ tác động vào "Yếu tố độ khó".
- Rơi đồ và lưu trữ tuân theo <GiaoThứcRơiTàiNguyên> + <GiaoThứcVậtPhẩmTrangBị>:
  - Chỉ ghi vào \`itemList\` khi "Đã nhặt/Đã lưu trữ";
  - Phải đồng bộ \`currentContainerId\` và thay đổi dung lượng vật chứa.
- Nghiêm cấm làm giàu không lý do: Thu nhập giá trị cao phải gắn liền với rủi ro, thời gian hoặc các sự kiện then chốt.

## 4. Khu vực nhân áp lực sinh tồn
- Hệ số tiêu hao tinh lực hành động: x${config.survivalPressure.energyConsumption}
- Hệ số tiêu hao no bụng/khát: x${config.survivalPressure.hungerThirstConsumption}
- Hệ số hồi phục khu an toàn: x${config.survivalPressure.safeZoneRecovery}
- Hệ số hồi phục khu không an toàn: x${config.survivalPressure.nonSafeZoneRecovery}
- Quyết toán sinh lý tuân theo <GiaoThứcHồiPhụcChỉnhĐốn>:
  - Hồi phục phải có tiến trình thời gian và căn cứ bối cảnh;
  - No bụng thấp/Khát thấp/Trọng thương phải thực sự ức chế biểu hiện hành động.
- Luật sắt về trọng tải: Khi \`Trọng tải hiện tại > Trọng tải tối đa\` phải xuất hiện hình phạt rõ rệt (Trúng đích/Né tránh/Di chuyển/Tinh lực).

## 5. Cường độ phản hồi xã hội và thế giới
- Ngưỡng hỗ trợ: ${config.socialWorld.assistanceThreshold}
- Phản ứng thế giới: ${config.socialWorld.worldReaction}
- Thay đổi mối quan hệ phải được thực hiện: \`Hảo cảm / Trạng thái quan hệ / Ký ức\`.
- Tiến trình thế giới tuân theo <Giao thức Tiến hóa Thế giới>:
  - Sự kiện đến hạn phải được quyết toán và di chuyển;
  - Hành động của NPC năng động đến hạn phải được làm mới, cấm treo lâu dài.
- Hậu quả nghiêm trọng phải được ánh xạ vào \`Biến cốt truyện\` hoặc \`Hồ sơ lịch sử\`, và nhất quán với nhật ký.

## 6. Cường độ cái giá thất bại
- ${config.failureCost}
- Thất bại ít nhất phải thực hiện 1 tổn thất có thể kiểm chứng: Máu, tinh lực, vật tư, quan hệ, ranh giới cốt truyện.
- Thất bại cấm "bỏ qua không tổn thất"; nếu là thất bại then chốt, nên xuất hiện hậu quả chậm (truy sát, phong tỏa, đứt gãy nhiệm vụ, v.v.).
- Hậu quả không thể đảo ngược (Chết/Tàn tật/Mất liên lạc quan trọng) phải được để lại dấu vết trong \`Biến cốt truyện\`.

## 7. Tính nhất quán bắt buộc
- Quy tắc của cấp độ này là quy tắc độc lập hoàn chỉnh, không phụ thuộc vào sự bổ sung của các độ khó khác.
- Tất cả các hệ số và hậu quả phải duy trì sự nhất quán trong ba lớp "thinking -> logs -> tavern_commands".
- ${config.mandatoryRules}

</GiaoThứcĐộKhóTròChơi>
`;

export const Difficulty_Game: PromptStructure[] = [
    {
        id: 'diff_game_relaxed',
        title: 'Độ khó trò chơi: Nhẹ nhàng',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[0]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_game_easy',
        title: 'Độ khó trò chơi: Dễ',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[1]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_game_normal',
        title: 'Độ khó trò chơi: Bình thường',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[2]),
        type: 'diff',
        enabled: true
    },
    {
        id: 'diff_game_hard',
        title: 'Độ khó trò chơi: Khó',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[3]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_game_extreme',
        title: 'Độ khó trò chơi: Cực hạn',
        content: buildGameDifficultyPrompt(DifficultyConfigTable[4]),
        type: 'diff',
        enabled: false
    }
];
