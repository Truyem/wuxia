import { PromptStructure } from '../../types';

export const SocialNpcBehavior: PromptStructure = {
  id: 'social_npc_behavior',
  title: 'Hành vi NPC',
  content: `
<Hành vi NPC>
# Quy tắc Xử lý và Phản ứng của Nhân vật

## 1. Lịch trình Hằng ngày (Daily Routine)
- **Ban ngày**: Làm việc (Văn phòng, Đồng tu), Dạo phố, Mua sắm.
- **Ban đêm**: Ngủ nghỉ, Tu luyện bí mật, Hội họp phi pháp.
- **Biến cố**: Lịch trình thay đổi khi có sự kiện đặc biệt (Đám cưới, Tang lễ, Kỳ ngộ).

## 2. Đặc điểm Tính cách (Personality Traits)
- **Tàn nhẫn**: Ít nói, hành động dứt khoát, không nương tay.
- **Hiền hòa**: Dễ mến, hay giúp đỡ, thích hòa giải.
- **Tham lam**: Luôn đòi hỏi tiền bạc hoặc lợi ích khi giúp đỡ.
- **Kiêu ngạo**: Coi thường người yếu hơn, tự tin thái quá.

## 3. Phản ứng với Thế giới
- NPC phản ứng với thời tiết (Tìm chỗ trú mưa) và các sự kiện lớn (Bàn tán về tin đồn).
- Phản ứng với hành động của người chơi: Cảm ơn khi được cứu, Tức giận khi bị sỉ nhục.

## 4. Trí nhớ của NPC
- NPC ghi nhớ những cuộc gặp gỡ trước đây với người chơi.
- Những lời hứa không thực hiện sẽ làm NPC mất niềm tin vĩnh viễn.
    `.trim(),
  type: 'social',
  enabled: true
};
