import { PromptStructure } from '../../types';

export const StatItem: PromptStructure = {
    id: 'stat_item',
    title: 'Giao thức Vật phẩm và Trang bị',
    content: `
<item_system_protocol>
# 【Quy tắc Quản lý Vật phẩm (Ánh xạ vào gameState.Inventory & Equipment)】

## 1. Định danh Vật phẩm (BẮT BUỘC sử dụng các khóa Tiếng Anh này)
- **Cơ bản**: \`id / name / type (Weapon/Armor/Consumable/Material) / description / weight / value / rarity\`
- **Trạng thái**: \`currentDurability / maxDurability\`
- **Thuộc tính đặc biệt**: \`attackPower / defensePower / effect (Loại hiệu ứng)\`

## 2. Ràng buộc Container và Hành trang
- \`weightMax\`: Giới hạn trọng lượng của Player. Vượt quá sẽ bị phạt \`agility\`.
- \`Inventory\`: Mảng các đối tượng vật phẩm. Phải dùng lệnh \`PUSH\` để thêm mới.

## 3. Quy tắc Gánh nặng và Độ bền
- Mỗi hành động chiến đấu hoặc di chuyển đường dài có xác suất làm giảm \`currentDurability\` của trang bị.
- Khi \`currentDurability <= 0\`, vật phẩm bị hỏng và mất toàn bộ chỉ số cộng thêm cho đến khi được sửa.

## 4. Giao dịch và Kinh tế
- Giá vật phẩm dao động dựa trên \`value\` và \`luck\`, cũng như uy tín của người bán.
- Sử dụng lệnh \`SET\` để cập nhật \`currency\` khi mua/bán.

## 5. Chống Lạm phát và Exploit
- Không tạo ra các vật phẩm thần cấp một cách tùy tiện.
- Vật phẩm hiếm phải có nguồn gốc rõ ràng từ \`worldEvents\` hoặc \`drop_logic\`.

## 6. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "PUSH", "key": "gameState.Inventory", "value": {"id": "W001", "name": "Kiếm Gỉ", "type": "Weapon", "weight": 3}}\`
- \`{"action": "SET", "key": "gameState.Equipment.mainHand", "value": "W001"}\`
- \`{"action": "ADD", "key": "gameState.Character.currency.gold", "value": -10}\`
- \`{"action": "DEL", "key": "gameState.Inventory", "value": "W001"}\`

</item_system_protocol>
`,
    type: 'num',
    enabled: true
};
