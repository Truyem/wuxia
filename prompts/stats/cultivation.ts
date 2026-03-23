import { PromptStructure } from '../../types';

export const StatCultivation: PromptStructure = {
    id: 'stat_cult',
    title: 'Giao thức Hệ thống Tu vi',
    content: `
<cultivation_system_protocol>
# 【Hệ thống Tu vi 9 Đại Cảnh giới (Ánh xạ vào gameState.Character.realmTier & realm)】

## 1. Các trường Dữ liệu Cốt lõi (BẮT BUỘC sử dụng các khóa Tiếng Anh này)
- \`realmTier\`: Cấp độ cảnh giới (1-9).
- \`realm\`: Tên cảnh giới (Tiếng Việt).
- \`cultivationProgress\`: Tiến độ tu vi hiện tại (0-100%).
- \`breakthroughSuccess\`: Tỷ lệ thành công đột phá.

## 2. Khung Cảnh giới (Tham chiếu)
1. Phàm Nhân (Mortality)
2. Luyện Khí (Qi Refining)
3. Trúc Cơ (Foundation Establishment)
... (và các cảnh giới cao hơn)

## 3. Công thức Tăng trưởng Tu vi
- Tăng trưởng dựa trên: \`comprehension\`, môi trường linh khí, dược quán, và võ công tâm pháp.
- Mỗi lượt tu luyện sử dụng lệnh \`ADD\` vào \`cultivationProgress\`.

## 4. Đột phá Cảnh giới (Breakthrough)
- Khi \`cultivationProgress >= 100\`, Player có thể thực hiện đột phá.
- Thất bại đột phá gây phản phệ: Trừ mạnh \`currentHp\` hoặc giảm \`realmTier\`.

## 5. Ranh giới Năng lực
- Chênh lệch 1 \`realmTier\` tạo ra sự áp đảo về sức mạnh và thân pháp.
- Người ở cảnh giới cao có thể "nhìn thấu" chiêu thức của người cảnh giới thấp.

## 6. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "ADD", "key": "gameState.Character.cultivationProgress", "value": 5}\`
- \`{"action": "SET", "key": "gameState.Character.realmTier", "value": 2}\`
- \`{"action": "SET", "key": "gameState.Character.realm", "value": "Luyện Khí Kỳ"}\`

</cultivation_system_protocol>
`,
    type: 'num',
    enabled: true
};
