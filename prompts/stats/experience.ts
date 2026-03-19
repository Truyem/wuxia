import { PromptStructure } from '../../types';

export const StatExperience: PromptStructure = {
    id: 'stat_exp',
    title: 'Giao thức Tăng trưởng Kinh nghiệm',
    content: `
<experience_growth_protocol>
# 【Hệ thống Kinh nghiệm (Ánh xạ vào gameState.Character.currentExp & levelUpExp)】

## 1. Định danh Trường (BẮT BUỘC sử dụng các khóa Tiếng Anh này)
- \`currentExp\`: Kinh nghiệm hiện tại.
- \`levelUpExp\`: Kinh nghiệm cần thiết để lên cấp.
- \`level\`: Cấp độ hiện tại.

## 2. Công thức EXP và Cân bằng
- EXP nhận được từ: Chiến đấu, hoàn thành nhiệm vụ, kỳ ngộ, luyện tập.
- **Cơ chế chống cày cuốc**: Sát thương hoặc EXP sẽ giảm dần khi Player đối đầu với kẻ địch yếu hơn nhiều cấp.

## 3. Ngưỡng Lên cấp
- Khi \`currentExp >= levelUpExp\`:
- Player được tăng các chỉ số thuộc tính cơ bản (\`strength\`, \`agility\`, v.v.).
- \`currentExp\` được trừ đi \`levelUpExp\`, và \`levelUpExp\` tăng cho cấp tiếp theo.

## 4. Quy tắc Nhất quán Tự sự
- Lên cấp phải đi kèm với miêu tả về sự giác ngộ hoặc đột phá thể chất trong logs.
- Không sử dụng các từ ngữ "Game" như "Level Up" trong logs hội thoại.

## 5. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "ADD", "key": "gameState.Character.currentExp", "value": 150}\`
- \`{"action": "SET", "key": "gameState.Character.level", "value": 10}\`
- \`{"action": "SET", "key": "gameState.Character.levelUpExp", "value": 2000}\`

</experience_growth_protocol>
`,
    type: 'num',
    enabled: true
};
