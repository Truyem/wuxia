import { PromptStructure } from '../../types';

export const StatItem: PromptStructure = {
    id: 'stat_item',
    title: 'Giao thức Vật phẩm và Trang bị',
    content: `
# ITEM MASTER - WUXIA CHRONICLE
**Project:** Mặc Sắc Giang Hồ (Wuxia Chronicle)
**Category:** Inventory & Equipment System
**Theme:** Resource Management & Wealth

## GLOBAL LAWS: ITEM CLASSIFICATION
| Type | Examples | Role in Gameplay |
|:---|:---|:---|
| **Weapon** | Kiếm, Đao, Thương | Gây sát thương chính (Physical/Internal) |
| **Armor** | Giáp Trụ, Y Phục | Giảm sát thương nhận vào, tăng thủ tính |
| **Consumable** | Đan Dược, Rượu | Phục hồi HP/Energy, tăng buff tạm thời |
| **Material** | Thiết khoáng, Dược liệu | Nguyên liệu rèn đúc, luyện đan |

## SCALING & BALANCE
1. **Rarity Levels**: Common (Trắng) -> Uncommon (Xanh) -> Rare (Tím) -> Epic (Vàng) -> Legendary (Đỏ).
2. **Durability Law**: Mỗi hành động nặng giảm \`currentDurability\`. Khi bằng 0, trang bị mất tác dụng.
3. **Weight Overload**: Nếu \`character.currentWeight > character.maxWeight\`, giảm 20% Agility cho mỗi 10% vượt mức.
4. **Economic Sync**: Giá trị vật phẩm (\`value\`) dao động [-20%, +50%] tùy khu vực. Sử dụng tiền tệ qua \`character.money.gold/silver/copper\`.

## STYLE GUIDELINES
- **Item Descriptions**: Mô tả chất liệu, trọng lượng và cảm giác khi cầm nắm (Lạnh lẽo, nặng nề, sắc bén).
- **Usage Narrative**: Khi dùng thuốc, tả cảm giác luồng khí lan tỏa. Khi trang bị vũ khí, tả tư thế cầm nắm.

## ANTI-PATTERNS (ITEMS)
- **Magic Item Spawning**: Không tạo vật phẩm mạnh mà không có sự kiện tương ứng.
- **Infinite Durability**: Không bỏ qua việc trừ độ bền sau các trận chiến lớn.
- **Stat Inflation**: Tránh dùng các key sai như \`gameState.Inventory\` (Dùng \`character.itemList\`).

## PRE-DELIVERY CHECKLIST
- [ ] Lệnh \`PUSH\` vào \`character.itemList\` bao gồm đầy đủ thuộc tính cơ bản.
- [ ] Kiểm tra gánh nặng (\`character.currentWeight\`) sau khi thêm vật phẩm.
- [ ] Nếu là trang bị, cập nhật \`character.equipment.<slot>\`.
`.trim(),
    type: 'num',
    enabled: true
};

export const ItemExtractionPrompt: PromptStructure = {
    id: 'item_extraction',
    title: 'Trích xuất Thông tin Vật phẩm chuyên sâu',
    content: `
# ITEM EXTRACTION PROTOCOL
**Task:** Từ mô tả thô của người dùng, hãy thiết kế một vật phẩm hoàn chỉnh.

## INPUT FORMAT:
Người dùng sẽ đưa ra ý tưởng (Ví dụ: "Một thanh kiếm rỉ sét").

## EXTRACTION REQUIREMENTS:
1. **Classification**: Phân loại chính xác vào 1 trong 4 loại (Weapon, Armor, Consumable, Material).
2. **Stats Calculation**: Tính toán chỉ số dựa trên mô tả (Ví dụ: Rỉ sét thì ATK thấp).
3. **Internal Consistency**: ID phải là unique snake_case.
4. **Visual Aesthetic**: Cung cấp mô tả ngoại hình ngắn gọn cho hệ thống vẽ Avatar.

## OUTPUT FORMAT:
Trả về duy nhất 1 đối tượng JSON chứa đầy đủ thuộc tính để PUSH vào hệ thống.
`.trim(),
    type: 'custom',
    enabled: true
};
