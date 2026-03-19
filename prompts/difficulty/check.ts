
import { PromptStructure } from '../../types';

interface CheckDifficultyConfig {
    Identifier: string;
    Name: string;
    Position: string;
    'Difficulty bias': number;
    'Same-realm threshold': {
        Minion: number;
        Elite: number;
        Leader: number;
    };
    'Cross-border threshold': {
        'one layer higher': number;
        'Two layers higher': number;
    };
    'Non-combatDC': {
        Simple: string;
        Medium: string;
        Hard: string;
        Extreme: string;
    };
    'Environmental correction': {
        Venue: string;
        Bad: string;
        Support: string;
    };
    'Status correction': {
        'Light fatigue': number;
        'Heavy fatigue': number;
        'Fullness and thirst': string;
        'Part severe injury': string;
    };
    'Result threshold': {
        'Critical Failure': number;
        'Critical Success': number;
    };
    'Force rules': string;
}

const checkDifficultyConfigTable: CheckDifficultyConfig[] = [
    {
        Identifier: 'relaxed',
        Name: 'Nhẹ nhàng',
        Position: 'Thiên về thúc đẩy tự sự, cho phép sai số cao hơn.',
        'Difficulty bias': 35,
        'Same-realm threshold': { Minion: -120, Elite: -60, Leader: 40 },
        'Cross-border threshold': { 'one layer higher': 280, 'Two layers higher': 640 },
        'Non-combatDC': { Simple: '80~130', Medium: '130~180', Hard: '180~240', Extreme: '240+' },
        'Environmental correction': { Venue: '+20 ~ +45', Bad: '-20 ~ -45', Support: '+15 ~ +40' },
        'Status correction': { 'Light fatigue': -20, 'Heavy fatigue': -45, 'Fullness and thirst': '-10 ~ -25', 'Part severe injury': '-20 ~ -35' },
        'Result threshold': { 'Critical Failure': -120, 'Critical Success': 120 },
        'Force rules': 'Cho phép cầu thắng trong hiểm cảnh, nhưng vẫn cần thực thi cái giá thực tế.'
    },
    {
        Identifier: 'easy',
        Name: 'Dễ',
        Position: 'Thiên về trưởng thành ổn định, áp lực chiến đấu và khám phá vừa phải.',
        'Difficulty bias': 15,
        'Same-realm threshold': { Minion: -80, Elite: -20, Leader: 80 },
        'Cross-border threshold': { 'one layer higher': 420, 'Two layers higher': 900 },
        'Non-combatDC': { Simple: '110~160', Medium: '160~220', Hard: '220~290', Extreme: '290+' },
        'Environmental correction': { Venue: '+15 ~ +35', Bad: '-30 ~ -60', Support: '+10 ~ +30' },
        'Status correction': { 'Light fatigue': -25, 'Heavy fatigue': -55, 'Fullness and thirst': '-15 ~ -30', 'Part severe injury': '-25 ~ -45' },
        'Result threshold': { 'Critical Failure': -150, 'Critical Success': 130 },
        'Force rules': 'Thất bại phải có hậu quả, nhưng mặc định không gây tử vong trực tiếp.'
    },
    {
        Identifier: 'normal',
        Name: 'Bình thường',
        Position: 'Độ khó tiêu chuẩn của dự án này, nhấn mạnh sinh tử võ hiệp và ràng buộc tài nguyên.',
        'Difficulty bias': 0,
        'Same-realm threshold': { Minion: -40, Elite: 40, Leader: 160 },
        'Cross-border threshold': { 'one layer higher': 600, 'Two layers higher': 1200 },
        'Non-combatDC': { Simple: '140~200', Medium: '200~260', Hard: '260~330', Extreme: '330+' },
        'Environmental correction': { Venue: '+10 ~ +30', Bad: '-50 ~ -90', Support: '+10 ~ +25' },
        'Status correction': { 'Light fatigue': -30, 'Heavy fatigue': -70, 'Fullness and thirst': '-20 ~ -45', 'Part severe injury': '-35 ~ -65' },
        'Result threshold': { 'Critical Failure': -180, 'Critical Success': 150 },
        'Force rules': 'Các trận chiến vượt cấp không thể trở thành bình thường, thất bại phải trả giá bằng trọng thương và tổn thất tài nguyên.'
    },
    {
        Identifier: 'hard',
        Name: 'Khó',
        Position: 'Thực chiến áp lực cao, sai lầm sẽ nhanh chóng dẫn đến thất bại.',
        'Difficulty bias': -20,
        'Same-realm threshold': { Minion: 20, Elite: 120, Leader: 280 },
        'Cross-border threshold': { 'one layer higher': 780, 'Two layers higher': 1450 },
        'Non-combatDC': { Simple: '170~230', Medium: '230~300', Hard: '300~380', Extreme: '380+' },
        'Environmental correction': { Venue: '+5 ~ +20', Bad: '-60 ~ -110', Support: '+5 ~ +20' },
        'Status correction': { 'Light fatigue': -40, 'Heavy fatigue': -85, 'Fullness and thirst': '-25 ~ -55', 'Part severe injury': '-45 ~ -85' },
        'Result threshold': { 'Critical Failure': -220, 'Critical Success': 170 },
        'Force rules': 'Không cho phép bảo hiểm cốt truyện, sai lầm then chốt có thể phá hủy trực tiếp chiến tuyến.'
    },
    {
        Identifier: 'extreme',
        Name: 'Cực hạn',
        Position: 'Phán định tàn khốc cực đoan, sát nút với rủi ro cấp địa ngục.',
        'Difficulty bias': -45,
        'Same-realm threshold': { Minion: 100, Elite: 240, Leader: 420 },
        'Cross-border threshold': { 'one layer higher': 980, 'Two layers higher': 1700 },
        'Non-combatDC': { Simple: '200~270', Medium: '270~350', Hard: '350~440', Extreme: '440+' },
        'Environmental correction': { Venue: '0 ~ +15', Bad: '-80 ~ -140', Support: '+0 ~ +15' },
        'Status correction': { 'Light fatigue': -50, 'Heavy fatigue': -100, 'Fullness and thirst': '-35 ~ -70', 'Part severe injury': '-60 ~ -110' },
        'Result threshold': { 'Critical Failure': -260, 'Critical Success': 200 },
        'Force rules': 'Khoảng cách đẳng cấp và sát thương vào bộ phận trí mạng có tính tuyệt đối, không được giảm nhẹ.'
    }
];

const buildCheckPrompt = (Config: CheckDifficultyConfig): string => `
<Giao thức Phán định Độ khó>
# 【Hệ thống Phán định: ${Config.Name}】
Định vị chế độ này: ${Config.Position}

Giao thức này được sử dụng để tính toán và ánh xạ "Giá trị phán định và Giá trị độ khó".
Đầu ra, mệnh lệnh và ràng buộc cấu trúc phải đồng thời thỏa mãn: <Giao thức Đồng bộ Dữ liệu>, <Định nghĩa Cấu trúc Đầu ra và Ngữ cảnh Câu lệnh>, <Giao thức Tiền tư duy COT>, <Giao thức Cỡ nòng Chiến đấu>.

## 1. Liên kết dữ liệu (Chỉ các trường thực tế)
- Lục thông số nhân vật: \`Sức mạnh/Thân pháp/Thể chất/Căn cốt/Ngộ tính/Phúc duyên\`
- Trạng thái sinh tồn: \`Tinh lực hiện tại/Tinh lực tối đa\`, \`No bụng hiện tại/No bụng tối đa\`, \`Khát hiện tại/Khát tối đa\`
- Trạng thái bộ phận: 7 bộ phận \`Máu hiện tại/Máu tối đa/Trạng thái\`
- Trang bị và Công pháp: \`gameState.Trang bị\`, \`gameState.Võ công\`
- Tham chiếu mục tiêu (nếu tồn tại): \`Xã hội[i].Công kích/Phòng ngữ/Cảnh giới\` hoặc \`Chiến đấu.Kẻ địch\`.
- Trường trưởng thành tùy chọn: \`Nhân vật.Cấp độ cảnh giới\` (mặc định là 1 nếu thiếu).

## 2. Định dạng nhật ký phán định (Ràng buộc cứng)
- Khi cần phán định, \`nhật ký\` phải xuất ra \`sender="【Phán định】"\` (hoặc trong tình huống bắt buộc \`【Phán định NSFW】\`).
- Định dạng cố định:
\`Tên hành động｜Kết quả｜Đối tượng kích hoạt Người chơi:Tên nhân vật hoặc NPC:Tên nhân vật｜Giá trị phán định X/Độ khó Y｜Cơ bản B (Giải thích)｜Môi trường E (Giải thích)｜Trạng thái S (Giải thích)｜May mắn L｜Trang bị Q (Giải thích, tùy chọn)\`
- Kết quả chỉ cho phép: \`Thành công/Thất bại/Đại thành công/Đại thất bại\`.

## 3. Công thức tính toán cốt lõi
\`\`\`
Giá trị phán định cuối cùng = (Năng lực cơ bản + Bù đắp cảnh giới) + Hiệu chỉnh may mắn + Hiệu chỉnh môi trường + Hiệu chỉnh trạng thái + Hiệu chỉnh trang bị + Độ lệch độ khó
\`\`\`
- Độ lệch độ khó: ${Config['Difficulty bias'] >= 0 ? `+${Config['Difficulty bias']}` : Config['Difficulty bias']}
- Bù đắp cảnh giới: Lv1 +0 / Lv2 +120 / Lv3 +260 / Lv4 +420 / Lv5 +620 / Lv6+ tiếp tục tăng tiến.
- Đề xuất thuộc tính cốt lõi của hành động:
  - Công sát cận chiến: \`Sức mạnh*10 + Thân pháp*5\`
  - Né tránh dịch chuyển: \`Thân pháp*10 + Căn cốt*4\`
  - Hộ thể kháng đòn: \`Thể chất*10 + Căn cốt*6\`
  - Nội công thuật pháp: \`Ngộ tính*10 + Căn cốt*5\`
  - Cơ biến kỳ mưu: \`Phúc duyên*10 + Ngộ tính*4\`
- Quyết toán chi tiết chiến đấu tuân theo <Giao thức Cỡ nòng Chiến đấu> (Trúng đích, né tránh, sát thương, hệ số bộ phận).

## 4. Tạo giá trị độ khó (Độc lập với bản mẫu người chơi)
- Ưu tiên sử dụng "Cường độ tự thân của mục tiêu":
  - \`Giá trị cơ bản đối thủ = floor((Công kích mục tiêu + Phòng ngự mục tiêu)/2)\` (nếu trường tồn tại)
- Nếu công phòng của mục tiêu không khả dụng, sử dụng "Giá trị cơ bản ánh xạ cấp độ cảnh giới mục tiêu":
  - \`Cơ sở cảnh giới = 180 + Cấp độ cảnh giới mục tiêu*120\`
- Mức tăng ngưỡng cùng cảnh giới:
  - Tạp binh: \`${Config['Same-realm threshold'].Minion >= 0 ? `+ ${Config['Same-realm threshold'].Minion}` : `- ${Math.abs(Config['Same-realm threshold'].Minion)}`}\`
  - Tinh anh: \`${Config['Same-realm threshold'].Elite >= 0 ? `+ ${Config['Same-realm threshold'].Elite}` : `- ${Math.abs(Config['Same-realm threshold'].Elite)}`}\`
  - Thủ lĩnh: \`+ ${Config['Same-realm threshold'].Leader}\`
- Mức tăng vượt cấp:
  - Mục tiêu cao hơn 1 tầng: \`+${Config['Cross-border threshold']['one layer higher']}\`
  - Mục tiêu cao hơn 2 tầng: \`+${Config['Cross-border threshold']['Two layers higher']}\`
- DC phi chiến đấu:
  - Dễ: ${Config['Non-combatDC'].Simple}
  - Trung bình: ${Config['Non-combatDC'].Medium}
  - Khó: ${Config['Non-combatDC'].Hard}
  - Cực khó: ${Config['Non-combatDC'].Extreme}

## 5. Định mức giá trị hiệu chỉnh
- Hiệu chỉnh môi trường:
  - Chủ trường/Thông thạo địa hình: ${Config['Environmental correction'].Venue}
    - Né tránh dịch chuyển: \`${Config['Environmental correction'].Bad}\`
    - Trận hình/Đồng đội chi viện: \`${Config['Environmental correction'].Support}\`
    - Phán đoán môi trường cần đọc \`Môi trường.Thời tiết.Thời tiết\` và \`Môi trường.Biến môi trường\`.
- Hiệu chỉnh trạng thái:
    - \`Tinh lực hiện tại <= 30%\`: ${Config['Status correction']['Light fatigue']}
    - \`Tinh lực hiện tại <= 10%\`: ${Config['Status correction']['Heavy fatigue']}
    - No bụng/Khát quá thấp: ${Config['Status correction']['Fullness and thirst']}
    - Bộ phận then chốt trọng thương và mất khả năng vận động tứ chi: ${Config['Status correction']['Part severe injury']}
- Hiệu chỉnh trang bị:
    - Khắc chế rõ rệt: \`+10 ~ +30\`
    - Hư hỏng/Không phù hợp: \`-20 ~ -70\`

## 6. Bảng ánh xạ kết quả
| Chênh lệch (Giá trị phán định - Độ khó) | Kết quả | Hậu quả trực tiếp |
|---|---|---|
| < ${Config['Result threshold']['Critical Failure']} | Đại thất bại | Sai lầm nghiêm trọng, kích hoạt trọng sáng/tước khí giới/phản chế |
| < 0 | Thất bại | Hành động không đạt được và phải chịu giá trả |
| >= 0 | Thành công | Đạt được mục tiêu và thúc đẩy cục diện |
| >= ${Config['Result threshold']['Critical Success']} | Đại thành công | Lợi ích bổ sung (áp chế, phá chiêu, thúc đẩy thêm) |

## 7. Quy tắc bắt buộc
- Quy trình cố định: Xác định hành động -> Chọn thuộc tính cốt lõi -> Tạo giá trị độ khó -> Cộng dồn hiệu chỉnh -> Xuất dòng phán định -> Thực thi giá trả/lợi ích.
- Thất bại không được bỏ qua không tổn thất, phải được thực thi trong \`tavern_commands\`.
- ${Config['Force rules']}

</Giao thức Phán đoán Độ khó>
`;

export const Difficulty_Judgment: PromptStructure[] = [
    {
        id: 'diff_check_relaxed',
        title: 'Độ khó Phán định: Nhẹ nhàng',
        content: buildCheckPrompt(checkDifficultyConfigTable[0]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_check_easy',
        title: 'Độ khó Phán định: Dễ',
        content: buildCheckPrompt(checkDifficultyConfigTable[1]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_check_normal',
        title: 'Độ khó Phán định: Bình thường',
        content: buildCheckPrompt(checkDifficultyConfigTable[2]),
        type: 'diff',
        enabled: true
    },
    {
        id: 'diff_check_hard',
        title: 'Độ khó Phán định: Khó',
        content: buildCheckPrompt(checkDifficultyConfigTable[3]),
        type: 'diff',
        enabled: false
    },
    {
        id: 'diff_check_extreme',
        title: 'Độ khó Phán định: Cực hạn',
        content: buildCheckPrompt(checkDifficultyConfigTable[4]),
        type: 'diff',
        enabled: false
    }
];
