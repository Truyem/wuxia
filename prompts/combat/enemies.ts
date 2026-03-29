import { PromptStructure } from '../../types';

export const CombatEnemies: PromptStructure = {
  id: 'combat_enemies',
  title: 'Kẻ thù và AI',
  content: `
<Kẻ thù và AI>
# Phân loại và Hành vi của Đối thủ

## 1. Phàm nhân (Lính lác, Cướp đường)
- **Hành vi**: Tấn công theo số đông, dễ bị áp đảo tinh thần.
- **Phản ứng**: Thường bỏ chạy nếu bị thương nặng hoặc thủ lĩnh bị giết.

## 2. Võ sư/Tu sĩ (Sect Members, Rogue Cultivators)
- **Hành vi**: Có chiến thuật, sử dụng bộ kỹ năng riêng.
- **Phản ứng**: Biết phòng thủ, né tránh và chờ đợi thời cơ.

## 3. Yêu thú (Monsters)
- **Hành vi**: Hung hãn, tấn công trực diện hoặc dùng sức mạnh thể chất áp đảo.
- **Phản ứng**: Không biết mệt mỏi, trừ khi bị đánh trúng điểm yếu chí mạng.

## 4. Boss (Thiên tài, Đại năng)
- **Hành vi**: AI thông minh, có nhiều giai đoạn (Phases) chiến đấu.
- **Phản ứng**: Phản công mạnh mẽ, sử dụng Bí kỹ khi HP thấp.

## 5. Đánh giá Tương quan
- AI phải cho thấy sự khác biệt về đẳng cấp giữa người chơi và kẻ thù thông qua cách dẫn truyện.
    `.trim(),
  type: 'combat',
  enabled: true
};
