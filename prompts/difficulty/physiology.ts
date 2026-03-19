
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
        Name: 'Nhẹ nhàng',
        Position: 'Thiên về trải nghiệm sinh tồn khoan dung, nhấn mạnh sự mượt mà của chuyến phiêu lưu.',
        'Energy fatigue': { 'Light fatigue threshold': 25, 'Heavy fatigue threshold': 8, 'Action consumption multiplier': 0.7, 'Natural recovery factor': 1.5 },
        'Fullness and thirst': { 'Fullness per hour': '2~3', 'Thirst per hour': '3~4', 'HP reduction on zeroing': 'Mỗi giờ 4%~6%' },
        'Injury system': { 'Blood loss penalty': 'Mất máu nhẹ đến vừa, phán đoán -10~-25', 'Infection risk': 'Thấp, thường có thể ức chế thông qua nghỉ ngắn', 'Fatal check': 'Đầu/Ngực về 0 sẽ rơi vào trạng thái cận tử, không chết ngay lập tức' },
        'Recovery rules': { 'Safe zone': 'Hồi phục nhanh, có thể bổ sung đáng kể tinh lực và máu bộ phận', 'Non-safe zone': 'Có thể hồi phục chậm, cần tiêu hao thêm nhu yếu phẩm' },
        'Near-death window': 'Khá dài (có thể giữ lại 5~6 cửa sổ hành động hiệu quả)',
        'Force rules': 'Ngay cả ở chế độ nhẹ nhàng, nếu no bụng/khát về 0 trong thời gian dài vẫn phải liên tục trừ máu.'
    },
    {
        Identifier: 'easy',
        Name: 'Dễ',
        Position: 'Thiên về trải nghiệm sinh tồn ổn định, giữ lại cảm giác thực tế cơ bản.',
        'Energy fatigue': { 'Light fatigue threshold': 30, 'Heavy fatigue threshold': 10, 'Action consumption multiplier': 0.85, 'Natural recovery factor': 1.25 },
        'Fullness and thirst': { 'Fullness per hour': '3~4', 'Thirst per hour': '4~5', 'HP reduction on zeroing': 'Mỗi giờ 6%~8%' },
        'Injury system': { 'Blood loss penalty': 'Mất máu vừa, phán đoán -15~-35', 'Infection risk': 'Trung bình thấp, trì hoãn xử lý sẽ trở nên tồi tệ hơn', 'Fatal check': 'Đầu/Ngực về 0 cực kỳ nguy hiểm, có thể cấp cứu trong thời gian ngắn' },
        'Recovery rules': { 'Safe zone': 'Hồi phục ổn định nhưng vẫn cần thời gian', 'Non-safe zone': 'Hồi phục hạn chế, chủ yếu dựa vào thuốc men' },
        'Near-death window': 'Trung bình (khoảng 4~5 cửa sổ hành động hiệu quả)',
        'Force rules': 'Sau khi trọng thương phải thể hiện sự hạn chế hành động, không thể tiếp tục chiến đấu liên tục cường độ cao.'
    },
    {
        Identifier: 'normal',
        Name: 'Bình thường',
        Position: 'Độ khó sinh lý tiêu chuẩn của dự án này, nhấn mạnh áp lực sinh tồn liên tục.',
        'Energy fatigue': { 'Light fatigue threshold': 30, 'Heavy fatigue threshold': 10, 'Action consumption multiplier': 1.2, 'Natural recovery factor': 0.75 },
        'Fullness and thirst': { 'Fullness per hour': '5~6', 'Thirst per hour': '6~8', 'HP reduction on zeroing': 'Mỗi giờ 10%~12%' },
        'Injury system': { 'Blood loss penalty': 'Mất máu nặng, phán đoán -25~-55', 'Infection risk': 'Trung bình cao, không xử lý sẽ liên tục giảm thuộc tính', 'Fatal check': 'Đầu/Ngực bị trọng thương có thể trực tiếp dẫn đến cái chết, bụng về 0 có xác suất cao bị sốc' },
        'Recovery rules': { 'Safe zone': 'Hồi phục chậm và cần chi phí nhu yếu phẩm', 'Non-safe zone': 'Hầu như không thể hồi phục, chỉ có thể giảm thiểu thiệt hại' },
        'Near-death window': 'Ngắn (khoảng 2~3 cửa sổ hành động hiệu quả)',
        'Force rules': 'No bụng/Khát về 0, mất máu nghiêm trọng, bộ phận cốt lõi bị phá hủy phải bắt đầu đếm ngược cái chết.'
    },
    {
        Identifier: 'hard',
        Name: 'Khó',
        Position: 'Sinh tồn cốt lõi, quản lý cơ thể mất kiểm soát đồng nghĩa với việc sụp đổ sức chiến đấu.',
        'Energy fatigue': { 'Light fatigue threshold': 35, 'Heavy fatigue threshold': 12, 'Action consumption multiplier': 1.4, 'Natural recovery factor': 0.6 },
        'Fullness and thirst': { 'Fullness per hour': '6~7', 'Thirst per hour': '8~9', 'HP reduction on zeroing': 'Mỗi giờ 12%~14%' },
        'Injury system': { 'Blood loss penalty': 'Mất máu cường độ cao, phán đoán -35~-70', 'Infection risk': 'Cao, thường kèm theo sự suy nhược liên tục', 'Fatal check': 'Đầu/Ngực về 0 mặc định chết trực tiếp, tứ chi về 0 đồng nghĩa với mất khả năng vận động' },
        'Recovery rules': { 'Safe zone': 'Hồi phục chậm và cái giá đắt đỏ', 'Non-safe zone': 'Cơ bản không thể hồi phục, trì hoãn đồng nghĩa với việc tồi tệ hơn' },
        'Near-death window': 'Cực ngắn (khoảng 1~2 cửa sổ hành động hiệu quả)',
        'Force rules': 'Không được dùng tự sự để bỏ qua quyết toán thương tích, phải liên tục theo dõi tình trạng bộ phận và mất máu.'
    },
    {
        Identifier: 'extreme',
        Name: 'Cực hạn',
        Position: 'Hệ thống sinh lý cấp độ địa ngục, gần với sinh tồn thực tế cực đoan.',
        'Energy fatigue': { 'Light fatigue threshold': 40, 'Heavy fatigue threshold': 15, 'Action consumption multiplier': 1.7, 'Natural recovery factor': 0.4 },
        'Fullness and thirst': { 'Fullness per hour': '7~8', 'Thirst per hour': '9~10', 'HP reduction on zeroing': 'Mỗi giờ 14%~16%' },
        'Injury system': { 'Blood loss penalty': 'Mất máu cấp độ thảm họa, phán đoán -45~-90', 'Infection risk': 'Cực cao, có thể nhanh chóng biến chuyển thành biến chứng chí mạng', 'Fatal check': 'Đầu/Ngực về 0 chết ngay lập tức, bụng về 0 có xác suất cao tử vong trong thời gian ngắn' },
        'Recovery rules': { 'Safe zone': 'Hồi phục vẫn chậm chạp, nhu yếu phẩm khan hiếm và đắt đỏ', 'Non-safe zone': 'Gần như không hồi phục, chỉ có giá trị cầm máu khẩn cấp' },
        'Near-death window': 'Gần như không tồn tại (thường chỉ có 1 cơ hội cấp cứu duy nhất)',
        'Force rules': 'Nghiêm cấm bất kỳ sự bảo hiểm hay trì hoãn tử hình nào, sự sụp đổ sinh lý phải được thực hiện ngay lập tức.'
    }
];

const buildPhysiologicalDifficultyPrompt = (Config: PhysiologicalDifficultyConfig): string => `
<Giao thức Sinh lý Độ khó>
# 【Hệ thống sinh lý: ${Config.Name}】
Định vị chế độ này: ${Config.Position}

Giao thức này được sử dụng để điều chỉnh độ khó của "Tiêu hao sinh lý, Thương tích tồi tệ hơn, Hiệu suất hồi phục".
Khi thực thi phải thỏa mãn: <Giao thức Đồng bộ Dữ liệu>, <Luật tiến triển thời gian>, <Giao thức Sinh mệnh Bộ phận>, <Giao thức Hồi phục và Nghỉ ngơi>.

## 1. Liên kết trường dữ liệu (Chỉ đường dẫn thực tế)
- Tinh lực: \`Role.Current energy/Max energy\`
- No bụng và Khát: \`Role.Current fullness/Max fullness\`, \`Role.Current thirst/Max thirst\`
- Máu bộ phận: 7 bộ phận \`Current HP/Max HP/Status\`
- Trạng thái liên tục: \`Role.PlayerBUFF\` (như mất máu/nhiễm trùng/mất nước/mệt mỏi)
- Đọc ảnh hưởng môi trường: \`Environment.Weather.Weather\`, \`Environment.envVariables\`

## 2. Tinh lực và Mệt mỏi
- Hệ số tiêu hao hành động: x${Config['Energy fatigue']['Action consumption multiplier']}
- Hệ số hồi phục tự nhiên: x${Config['Energy fatigue']['Natural recovery factor']}
- Ngưỡng mệt mỏi nhẹ: \`Tinh lực hiện tại <= ${Config['Energy fatigue']['Light fatigue threshold']}%\`
- Ngưỡng mệt mỏi nặng: \`Tinh lực hiện tại <= ${Config['Energy fatigue']['Heavy fatigue threshold']}%\`
- Khi trong cùng một lượt trúng cả mệt mỏi nhẹ và mệt mỏi nặng, ưu tiên hình phạt mệt mỏi nặng.

## 3. No bụng và Khát
- Tiêu hao no bụng: Mỗi giờ ${Config['Fullness and thirst']['Fullness per hour']}
- Tiêu hao khát: Mỗi giờ ${Config['Fullness and thirst']['Thirst per hour']}
- Bất kỳ cái nào về 0: Liên tục trừ máu ${Config['Fullness and thirst']['HP reduction on zeroing']}, và ức chế biểu hiện phán đoán.
- Các thay đổi liên quan phải được thực hiện bằng \`add\`, nghiêm cấm chỉ mô tả trong văn bản.

## 4. Thương tích, Mất máu, Nhiễm trùng
- Ngưỡng trạng thái bộ phận tuân theo <Giao thức Sinh mệnh Bộ phận>.
- Ngữ nghĩa chí mạng của bộ phận then chốt:
  - Đầu = 0: Xác suất cao cận tử hoặc chết trực tiếp
  - Ngực = 0: Xác suất cao cận tử và liên tục mất máu
  - Bụng = 0: Xác suất cao bị sốc
  - Tứ chi = 0: Mất khả năng vận động chi tương ứng
- Hình phạt mất máu: ${Config['Injury system']['Blood loss penalty']}
- Rủi ro nhiễm trùng: ${Config['Injury system']['Infection risk']}
- Phán đoán chí mạng: ${Config['Injury system']['Fatal check']}

## 5. Môi trường và Hiệu suất hồi phục
- Hồi phục khu an toàn: ${Config['Recovery rules']['Safe zone']}
- Hồi phục khu không an toàn: ${Config['Recovery rules']['Non-safe zone']}
- Thời tiết khắc nghiệt / Biến môi trường tiêu cực nên làm giảm thêm hiệu suất hồi phục và tăng rủi ro nhiễm trùng.
- Hành động hồi phục phải đi kèm với tiến trình thời gian, nghiêm cấm "hồi phục hoàn chỉnh nhiều lần trong cùng một phút".

## 6. Cửa sổ cận tử và Thực thi cái chết
- Cửa sổ cận tử: ${Config['Near-death window']}
- Khi bỏ lỡ cửa sổ cấp cứu, phải thực thi cái chết hoặc trọng thương không thể đảo ngược.
- Hậu quả quan trọng cần đồng bộ ghi vào \`Biến cốt truyện\` và có thể thấy trong nhật ký.

## 7. Quy tắc bắt buộc
- Quy tắc của cấp độ này là độc lập hoàn chỉnh, không phụ thuộc vào sự bổ sung của các độ khó khác.
- Hình phạt sinh lý phải ảnh hưởng thời gian thực đến hành động, phán đoán và rủi ro tiếp theo.
- ${Config['Force rules']}

</Giao thức Sinh lý Độ khó>
`;

export const Difficulty_Physiology: PromptStructure[] = [
    {
        id: 'diff_phys_relaxed',
        title: 'Sinh lý Độ khó: Nhẹ nhàng',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[0]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_phys_easy',
        title: 'Sinh lý Độ khó: Dễ',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[1]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_phys_normal',
        title: 'Sinh lý Độ khó: Bình thường',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[2]),
        type: 'diff',
        enabled: true
    },
    {
        id: 'diff_phys_hard',
        title: 'Sinh lý Độ khó: Khó',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[3]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_phys_extreme',
        title: 'Sinh lý Độ khó: Cực hạn',
        content: buildPhysiologicalDifficultyPrompt(physiologicalDifficultyConfigTable[4]),
        type: 'diff',
        enabled: false
    }
];
