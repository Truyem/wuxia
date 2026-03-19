import { PromptStructure } from '../../types';

export const StatResourceDrop: PromptStructure = {
    id: 'stat_drop',
    title: 'Giao thức Rơi Tài nguyên và Vật phẩm',
    content: `
<resource_drop_protocol>
# 【Hệ thống Rơi đồ và Loot (Ánh xạ vào gameState.Inventory)】

## 1. Nguyên tắc Khớp rơi (Drop Matching)
- Vật phẩm rơi ra phải phù hợp với: Danh tính kẻ địch, khu vực hiện tại, và độ khó của trận đấu.
- **Tỷ lệ hiếm (Rarity %)**:
- Common (70%), Uncommon (20%), Rare (8%), Epic (1.5%), Mythic (0.5%).

## 2. Chỉ số May mắn (Luck Modifier)
- Chỉ số \`luck\` của Player ảnh hưởng đến xác suất rơi đồ Rare+ và các thuộc tính ẩn trên vật phẩm.

## 3. Chống Lạm phát và Cân bằng
- **Giới hạn số lượng**: Không rơi quá nhiều vật phẩm giá trị cao trong một khoảng thời gian ngắn.
- **Rác và Nguyên liệu**: Ưu tiên rơi các vật phẩm có thể tái chế hoặc sử dụng làm nguyên liệu chế tạo.

## 4. Kỷ luật Thực thi
- Mọi vật phẩm rơi ra phải được liệt kê trong logs phán định hoặc dẫn truyện.
- Sử dụng lệnh \`PUSH\` để thêm vật phẩm vào \`gameState.Inventory\`.

## 5. Giao dịch và Giá trị (Economics)
- Vật phẩm rơi ra có thể mang đi bán lấy \`currency\`. Giá trị thực tế phụ thuộc vào uy tín và kỹ năng đàm phán.

## 6. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "PUSH", "key": "gameState.Inventory", "value": {"id": "ITEM001", "name": "Ngọc Bội Cổ", "type": "Consumable", "rarity": "Rare"}}\`
- \`{"action": "SET", "key": "gameState.World.lastDropTime", "value": "2024-03-20T10:00:00"}\`

</resource_drop_protocol>
`,
    type: 'num',
    enabled: true
};
