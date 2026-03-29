import { PromptStructure } from '../../types';

export const SocialInteraction: PromptStructure = {
  id: 'social_interaction',
  title: 'Tương tác Xã hội',
  content: `
<Tương tác Xã hội>
# Quy tắc Hội thoại và Giao tiếp

## 1. Hệ thống Xưng hô (Honorifics)
- **Kính trọng**: "Tiền bối", "Vị đại nhân này", "Tôn giả".
- **Thân mật**: "Huynh/Đệ", "Tỷ/Muội", "Đạo hữu".
- **Mỉa mai/Thù địch**: "Ngươi", "Kẻ kia", "Tiểu tặc".

## 2. Nghệ thuật Đàm phán (Persuasion)
- **Thuyết phục**: Sử dụng lý lẽ, lợi ích để đạt mục đích.
- **Đe dọa**: Sử dụng sức mạnh hoặc danh tiếng để áp chế tinh thần đối phương.
- **Dụ dỗ**: Sử dụng tiền bạc, mỹ nhân hoặc lời hứa để lôi kéo.

## 3. Quy tắc "Mất mặt" (Losing Face)
- Trong võ lâm, danh dự là tối thượng. Hành động sỉ nhục NPC có thể dẫn đến huyết chiến.
- Trả lời sai trong một cuộc hội thoại quan trọng có thể làm đóng lại vĩnh viễn một nhánh cốt truyện.

## 4. Ngôn ngữ Cơ thể (Subtext)
- Miêu tả ánh mắt, nụ cười, và cử chỉ của NPC để lộ ra tâm ý thật sự của họ.
    `.trim(),
  type: 'social',
  enabled: true
};
