import { PromptStructure } from '../../types';

export const StatCombat: PromptStructure = {
    id: 'stat_combat',
    title: 'Giao thức Chiến đấu và Đối kháng',
    content: `
# COMBAT MASTER - WUXIA CHRONICLE
**Project:** Mặc Sắc Giang Hồ (Wuxia Chronicle)
**Category:** Battle Systems & Martial Dynamics
**Theme:** Visceral, Technical & Deadly

## ATTRIBUTE MAPPING (COMBAT)
| Stat | Internal Key | Combat Role |
|:---|:---|:---|
| **Agility** | \`character.agility\` | Quyết định lượt đánh (Initiative) và Né tránh. |
| **Strength** | \`character.strength\` | Sát thương vật lý và Phá giáp. |
| **Energy** | \`character.currentEnergy\` | Năng lượng tiêu tốn cho võ công. |
| **HP (Chest)** | \`character.chestCurrentHp\` | Điểm yếu chí mạng, nếu bằng 0 sẽ tử vong hoặc trọng thương. |

## GLOBAL LAWS: COMBAT FLOW
1. **Real-time Injury**: Mỗi đòn đánh phải tác động vào một bộ phận xác định (Đầu, Ngực, Bụng, Tứ chi). Cập nhật \`character.<part>CurrentHp\`.
2. **Spirit Sink**: Sử dụng võ công tiêu tốn \`character.currentEnergy\`. Tuyệt đối không để Energy xuống dưới 0.
3. **Battle Status**: Khi bắt đầu chiến đấu, đặt \`battle.isInBattle = true\` và cập nhật thông tin \`battle.enemy\`.
4. **Environment Impact**: Thời tiết và địa hình ảnh hưởng đến \`accuracy\` và \`defense\`.

## STYLE GUIDELINES
- **Action Descriptions**: Tả chi tiết quỹ đạo vũ khí, tiếng gió, cảm giác xương gãy hoặc máu chảy.
- **Internal Monologue**: Tả suy nghĩ của nhân vật về sơ hở của đối thủ.

## ANTI-PATTERNS (COMBAT)
-  **Turn-based Boredom**: Không mô tả như game RPG theo lượt cứng nhắc (Ví dụ: "Bạn đánh 10 damage").
-  **Stat Ignorance**: Không bỏ qua việc trừ \`character.currentEnergy\` sau khi tung đại chiêu.
-  **Instant Recovery**: HP không tự hồi phục trong trận chiến nếu không có dược phẩm đặc biệt.

##  PRE-DELIVERY CHECKLIST
- [ ] Đã tính toán né tránh dựa trên \`agility\` của cả hai bên.
- [ ] Đã cập nhật \`battle.isInBattle = false\` nếu trận đấu kết thúc.
- [ ] Các lệnh \`ADD\` sát thương phản ánh đúng bộ phận bị trúng đòn.
`.trim(),
    type: 'num',
    enabled: true
};
