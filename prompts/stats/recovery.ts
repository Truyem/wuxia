import { PromptStructure } from '../../types';

export const StatRecovery: PromptStructure = {
    id: 'stat_recovery',
    title: 'Giao thức Hồi phục và Trị thương',
    content: `
<rest_recovery_protocol>
# 【Quy tắc Hồi phục Thuộc tính và Vết thương】

## 1. Lối thoát Hồi phục (Recovery Paths)
- **Nghỉ ngơi/Ngủ**: Hồi phục \`spiritCurrent\`, \`hungerCurrent\`, \`thirstCurrent\`.
- **Dược phẩm**: Hồi phục tức thì \`currentHp\` hoặc xóa bỏ trạng thái \`status\` tiêu cực.
- **Vận công**: Sử dụng nội lực để đẩy nhanh quá trình hồi phục kinh mạch.

## 2. Liên kết Sinh tồn
- Nếu \`hungerCurrent\` hoặc \`thirstCurrent\` bằng 0, nhân vật không thể hồi phục tự nhiên và sẽ mất HP dần theo thời gian.
- Môi trường (Thời tiết lạnh/nóng) ảnh hưởng đến tốc độ tiêu hao và hồi phục.

## 3. Hồi phục Chấn thương
- Chấn thương nặng (\`Heavy\`) cần thời gian nghỉ ngơi dài ngày và thuốc đặc trị để chuyển về nhẹ (\`Light\`) hoặc khỏe mạnh.
- Phải cập nhật \`status\` của bộ phận cơ thể tương ứng khi được điều trị.

## 4. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "ADD", "key": "gameState.Character.spiritCurrent", "value": 20}\`
- \`{"action": "SET", "key": "gameState.Character.chest.status", "value": "Khỏe mạnh"}\`
- \`{"action": "ADD", "key": "gameState.Character.hungerCurrent", "value": 30}\`

</rest_recovery_protocol>
`,
    type: 'num',
    enabled: true
};
