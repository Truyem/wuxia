import { PromptStructure } from '../../types';

interface PhysiologicalDifficultyConfig {
    Identifier: string;
    Name: string;
    Position: string;
    'Energy fatigue': {
        'Light fatigue threshold': number;
        'Heavy fatigue threshold': number;
        'Action consumption multiplier': number;
        'Natural recovery factor': number;
    };
    'Fullness and thirst': {
        'Fullness per hour': string;
        'Thirst per hour': string;
        'HP reduction on zeroing': string;
    };
    'Injury system': {
        'Blood loss penalty': string;
        'Infection risk': string;
        'Fatal check': string;
    };
    'Recovery rules': {
        'Safe zone': string;
        'Non-safe zone': string;
    };
    'Near-death window': string;
    'Force rules': string;
}

const physiologicalDifficultyConfigTable: PhysiologicalDifficultyConfig[] = [
    {
        Identifier: 'relaxed',
        Name: 'An Nhiên (Nhẹ nhàng)',
        Position: 'Trải nghiệm sinh tồn thư thái, tối ưu hóa sự mượt mà của hành trình.',
        'Energy fatigue': { 'Light fatigue threshold': 25, 'Heavy fatigue threshold': 8, 'Action consumption multiplier': 0.7, 'Natural recovery factor': 1.5 },
        'Fullness and thirst': { 'Fullness per hour': '2~3', 'Thirst per hour': '3~4', 'HP reduction on zeroing': '2%~4% mỗi giờ' },
        'Injury system': { 'Blood loss penalty': 'Giảm chỉ số nhẹ (-10~-25)', 'Infection risk': 'Rất thấp, dễ dàng tự hồi phục', 'Fatal check': 'Các bộ phận hiểm yếu về 0 sẽ vào trạng thái cận tử, không chết ngay.' },
        'Recovery rules': { 'Safe zone': 'Hồi phục cực nhanh, đầy đủ khí huyết và tinh lực.', 'Non-safe zone': 'Hồi phục chậm nhưng ổn định, cần ít nhu yếu phẩm.' },
        'Near-death window': 'Rất dài (hành động được thêm 5~6 lượt)',
        'Force rules': 'Dù nhẹ nhàng, nếu để đói/khát kéo dài quá lâu vẫn sẽ bị trừ máu liên tục.'
    },
    {
        Identifier: 'easy',
        Name: 'Kiên Trình (Dễ)',
        Position: 'Cảm giác sinh tồn thực tế nhưng vẫn nằm trong tầm kiểm soát.',
        'Energy fatigue': { 'Light fatigue threshold': 30, 'Heavy fatigue threshold': 10, 'Action consumption multiplier': 0.85, 'Natural recovery factor': 1.25 },
        'Fullness and thirst': { 'Fullness per hour': '3~4', 'Thirst per hour': '4~5', 'HP reduction on zeroing': '4%~6% mỗi giờ' },
        'Injury system': { 'Blood loss penalty': 'Giảm chỉ số vừa phải (-15~-35)', 'Infection risk': 'Thấp, cần xử lý trong ngày.', 'Fatal check': 'Bộ phận hiểm yếu về 0 rất nguy hiểm, có thể cấp cứu kịp thời.' },
        'Recovery rules': { 'Safe zone': 'Hồi phục ổn định, cần thời gian nghỉ ngơi.', 'Non-safe zone': 'Hồi phục hạn chế, chủ yếu dựa vào đan dược.' },
        'Near-death window': 'Trung bình (hành động được thêm 4~5 lượt)',
        'Force rules': 'Trọng thương sẽ ảnh hưởng đến khả năng chiến đấu liên tục.'
    },
    {
        Identifier: 'normal',
        Name: 'Sinh Tử (Bình thường)',
        Position: 'Độ khó chuẩn, áp lực sinh tồn là yếu tố then chốt xuyên suốt.',
        'Energy fatigue': { 'Light fatigue threshold': 30, 'Heavy fatigue threshold': 10, 'Action consumption multiplier': 1.2, 'Natural recovery factor': 0.75 },
        'Fullness and thirst': { 'Fullness per hour': '5~6', 'Thirst per hour': '6~8', 'HP reduction on zeroing': '8%~10% mỗi giờ' },
        'Injury system': { 'Blood loss penalty': 'Giảm chỉ số nặng (-25~-55)', 'Infection risk': 'Trung bình, không xử lý sẽ suy giảm tu vi.', 'Fatal check': 'Bộ phận hiểm yếu bị thương nặng có thể dẫn đến tử vong ngay.' },
        'Recovery rules': { 'Safe zone': 'Hồi phục chậm, tiêu tốn linh thạch/nhu yếu phẩm.', 'Non-safe zone': 'Gần như không thể tự hồi phục, chỉ có thể cầm cự.' },
        'Near-death window': 'Ngắn (hành động được thêm 2~3 lượt)',
        'Force rules': 'Cảnh báo: Đói khát về 0 hoặc mất máu quá nhiều sẽ bắt đầu đếm ngược thời gian tử vong.'
    },
    {
        Identifier: 'hard',
        Name: 'Tuyệt Cảnh (Khó)',
        Position: 'Sinh tồn khắc nghiệt, quản lý cơ thể sai lầm dẫn đến sụp đổ hoàn toàn.',
        'Energy fatigue': { 'Light fatigue threshold': 35, 'Heavy fatigue threshold': 12, 'Action consumption multiplier': 1.4, 'Natural recovery factor': 0.6 },
        'Fullness and thirst': { 'Fullness per hour': '6~7', 'Thirst per hour': '8~9', 'HP reduction on zeroing': '10%~12% mỗi giờ' },
        'Injury system': { 'Blood loss penalty': 'Giảm chỉ số cực nặng (-35~-70)', 'Infection risk': 'Cao, kèm mệt mỏi và suy nhược kéo dài.', 'Fatal check': 'Đầu/Ngực về 0 mặc định tử vong. Tứ chi về 0 sẽ phế bỏ hoàn toàn.' },
        'Recovery rules': { 'Safe zone': 'Hồi phục rất chậm và cực kỳ tốn kém.', 'Non-safe zone': 'Tuyệt đối không hồi phục, vết thương chỉ có thể tồi tệ hơn.' },
        'Near-death window': 'Cực ngắn (chỉ 1~2 lượt để cứu vãn)',
        'Force rules': 'AI nghiêm cấm bỏ qua các quyết toán thương tích. Mọi vết thương phải được cập nhật ngay lập tức.'
    },
    {
        Identifier: 'extreme',
        Name: 'Thiên Mệnh (Cực hạn)',
        Position: 'Địa ngục trần gian, mỗi hơi thở đều là một cuộc chiến.',
        'Energy fatigue': { 'Light fatigue threshold': 40, 'Heavy fatigue threshold': 15, 'Action consumption multiplier': 1.7, 'Natural recovery factor': 0.4 },
        'Fullness and thirst': { 'Fullness per hour': '7~8', 'Thirst per hour': '9~10', 'HP reduction on zeroing': '12%~14% mỗi giờ' },
        'Injury system': { 'Blood loss penalty': 'Tổn thương thảm khốc (-45~-90)', 'Infection risk': 'Cực cao, tử vong nhanh chóng do biến chứng.', 'Fatal check': 'Đầu/Ngực về 0 chết ngay lập tức. Bụng về 0 tử vong trong tích tắc.' },
        'Recovery rules': { 'Safe zone': 'Hồi phục cực chậm, nhu yếu phẩm hiếm và đắt đỏ.', 'Non-safe zone': 'Vô phương cứu chữa nếu không có linh dược cực phẩm.' },
        'Near-death window': 'Gần như không có (thường chết ngay khi trúng đòn hiểm)',
        'Force rules': 'Không có bất kỳ sự bảo vệ nào. Sinh lý sụp đổ đồng nghĩa với kết thúc hành trình.'
    }
];

const buildPhysiologicalDifficultyPrompt = (Config: PhysiologicalDifficultyConfig): string => `
<Hệ thống Sinh lý: ${Config.Name}>
# Định vị Chế độ: ${Config.Position}

Giao thực này điều chỉnh "Tiêu hao sinh lý, Thương tích và Hiệu suất hồi phục". AI phải thực hiện đồng bộ dữ liệu theo các tham số này.

## 1. Tinh lực và Mệt mỏi (Energy & Fatigue)
- **Hệ số tiêu hao hành động**: x${Config['Energy fatigue']['Action consumption multiplier']}
- **Hệ số hồi phục tự nhiên**: x${Config['Energy fatigue']['Natural recovery factor']}
- **Ngưỡng mệt mỏi nhẹ**: Tinh lực <= ${Config['Energy fatigue']['Light fatigue threshold']}%
- **Ngưỡng mệt mỏi nặng**: Tinh lực <= ${Config['Energy fatigue']['Heavy fatigue threshold']}%

## 2. Tiêu hao Cơ bản (Fullness & Thirst)
- **Độ đói (Fullness)**: Giảm ${Config['Fullness and thirst']['Fullness per hour']} mỗi giờ.
- **Độ khát (Thirst)**: Giảm ${Config['Fullness and thirst']['Thirst per hour']} mỗi giờ.
- **Hậu quả khi về 0**: Trừ ${Config['Fullness and thirst']['HP reduction on zeroing']} máu trực tiếp và gây suy nhược thần trí.

## 3. Thương tích và Mất máu (Bleeding & Injuries)
- **Hình phạt mất máu**: ${Config['Injury system']['Blood loss penalty']}
- **Rủi ro nhiễm trùng**: ${Config['Injury system']['Infection risk']}
- **Kiểm tra chí mạng**: ${Config['Injury system']['Fatal check']}
- Ghi chú: Các bộ phận hiểm yếu (Đầu, Ngực) về 0 sẽ dẫn đến kết cục tử vong sớm.

## 4. Hồi phục và Nghỉ ngơi (Recovery)
- **Khu vực an toàn**: ${Config['Recovery rules']['Safe zone']}
- **Dã ngoại/Khu vực nguy hiểm**: ${Config['Recovery rules']['Non-safe zone']}

## 5. Thời điểm Cận tử (Near-death Window)
- **Cửa sổ sống sót**: ${Config['Near-death window']}
- Nếu không được cấp cứu kịp thời trong thời gian này, nhân vật sẽ tử vong vĩnh viễn.

## 6. Quy tắc Bắt buộc
- ${Config['Force rules']}
- Mọi thay đổi sinh lý phải được cập nhật trực tiếp vào trạng thái nhân vật, không chỉ mô tả suông bằng văn bản.
    `.trim();

export const Difficulty_Physiology: PromptStructure[] = [
    {
        id: 'diff_phys_relaxed',
        title: 'Sinh lý: An Nhiên',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[0]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_phys_easy',
        title: 'Sinh lý: Kiên Trình',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[1]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_phys_normal',
        title: 'Sinh lý: Sinh Tử',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[2]),
        type: 'diff',
        enabled: true
    },
    {
        id: 'diff_phys_hard',
        title: 'Sinh lý: Tuyệt Cảnh',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[3]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_phys_extreme',
        title: 'Sinh lý: Thiên Mệnh',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[4]),
        type: 'diff',
        enabled: false
    }
];
