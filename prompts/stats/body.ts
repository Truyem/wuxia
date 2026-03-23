import { PromptStructure } from '../../types';

export const StatBodyHealth: PromptStructure = {
    id: 'stat_body',
    title: 'Giao thức HP Bộ phận Cơ thể',
    content: `
<body_part_hp_protocol>
# 【Hệ thống HP 7 Bộ phận (Ánh xạ vào từng bộ phận trong gameState.Character)】

## 1. Định danh Bộ phận (BẮT BUỘC sử dụng các khóa Tiếng Anh này)
Mỗi bộ phận có: \`currentHp / maxHp / status\`
- \`head\` (Đầu)
- \`chest\` (Ngực)
- \`abdomen\` (Bụng)
- \`leftArm\` (Tay trái)
- \`rightArm\` (Tay phải)
- \`leftLeg\` (Chân trái)
- \`rightLeg\` (Chân phải)

## 2. Ngưỡng Trạng thái và Hình phạt
- **Khỏe mạnh (>90% HP)**: Không có hình phạt.
- **Tổn thương nhẹ (60%-90% HP)**: Đau nhức, giảm nhẹ tinh thần.
- **Trung thương (30%-60% HP)**: Giảm 20% Thân pháp (\`agility\`) hoặc Sức mạnh (\`strength\`).
- **Trọng thương (10%-30% HP)**: Giảm 50% chỉ số liên quan, nguy cơ ngất xỉu.
- **Tàn phế/Chết (<=0% HP)**: Mất chức năng bộ phận. Nếu là Đầu/Ngực/Bụng, nhân vật tử vong.

## 3. Hệ quả Đặc thù theo Bộ phận
- **Tay (Arm)**: Không thể cầm vũ khí hoặc sử dụng chiêu thức ngoại công.
- **Chân (Leg)**: Giảm mạnh khả năng né tránh và không thể trốn chạy.
- **Đầu (Head)**: Ảnh hưởng đến \`comprehension\` và gây trạng thái choáng váng.

## 4. Kỷ luật Thực thi
- Mọi sát thương trong chiến đấu PHẢI được phân bổ vào các bộ phận cụ thể.
- Kiểm tra \`currentHp\` sau mỗi lượt để cập nhật \`status\`.

## 5. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "ADD", "key": "gameState.Character.leftArm.currentHp", "value": -30}\`
- \`{"action": "SET", "key": "gameState.Character.leftArm.status", "value": "Trọng thương"}\`
- \`{"action": "SET", "key": "gameState.Character.head.status", "value": "Phê vật"}\`

</body_part_hp_protocol>
`,
    type: 'num',
    enabled: true
};
