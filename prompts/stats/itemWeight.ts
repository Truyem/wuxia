import { PromptStructure } from '../../types';

export const StatItemWeight: PromptStructure = {
    id: 'stat_item_weight',
    title: 'Giao thức Trọng lượng Vật phẩm (Jin/Cân)',
    content: `
<item_weight_reference>
# 【Trọng lượng Vật phẩm Tham chiếu (Đơn vị: Cân/Jin)】

## 1. Vũ khí (Weapons)
- **Kiếm/Đao nhẹ**: 2 - 5 Cân.
- **Trường thương/Đại đao**: 15 - 30 Cân.
- **Búa tạ/Vũ khí nặng**: 40 - 80 Cân.
- **Ám khí (Bộ)**: 1 - 2 Cân.

## 2. Giáp trụ (Armor)
- **Y phục lụa/vải**: 0.5 - 1 Cân.
- **Giáp da**: 5 - 10 Cân.
- **Giáp kim loại nặng**: 30 - 60 Cân.

## 3. Container (Túi/Rương)
- **Túi hành lý**: 0.2 Cân (Tự thân).
- **Rương báu**: 5 - 20 Cân.

## 4. Vật phẩm tiêu hao (Consumables)
- **Bình rượu/Nước**: 1 - 2 Cân.
- **Dược thảo/Đan dược**: 0.1 Cân.

## 5. Quy tắc Sáng tạo và Cân bằng
- Vật phẩm mới phải được gán \`weight\` dựa trên bảng tham chiếu này.
- **Trọng lượng tổng**: \`gameState.Character.weightCurrent\` được tính bằng tổng \`weight\` của mọi vật phẩm trong \`Inventory\` và \`Equipment\`.

## 6. Liên kết Hệ thống Gánh nặng (Burden)
- Nếu \`weightCurrent > weightMax\`: Player bị trạng thái "Quá tải", giảm 50% \`agility\` và không thể thi triển khinh công.

## 7. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "SET", "key": "gameState.Character.weightCurrent", "value": 45}\`
- \`{"action": "SET", "key": "gameState.Character.weightMax", "value": 100}\`

</item_weight_reference>
`,
    type: 'num',
    enabled: true
};
