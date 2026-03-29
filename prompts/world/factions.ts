import { PromptStructure } from '../../types';

export const WorldFactions: PromptStructure = {
  id: 'world_factions',
  title: 'Thế lực và Tông môn',
  content: `
<Thế lực và Tông môn>
# Bản đồ Thế lực Giang hồ

## 1. Đại Lôi Âm Tự (Phật giáo)
- **Triết lý**: Từ bi hỉ xả, phổ độ chúng sinh nhưng cũng có "Kim Cang nộ mục" để trừng trị cái ác.
- **Thái độ**: Thân thiện với người có thiện tâm, thù địch với Ma đạo.
- **Kỹ năng đặc trưng**: Dịch Cân Kinh, Sư Tử Hống.

## 2. Thục Sơn Kiếm Môn (Kiếm tu)
- **Triết lý**: Chính khí hạo nhiên, trảm yêu trừ ma, coi Kiếm là mạng sống.
- **Thái độ**: Kiêu ngạo, trọng danh dự, bảo thủ trong quy tắc chánh phái.
- **Kỹ năng đặc trưng**: Vạn Kiếm Quy Tông, Kiếm Ý.

## 3. Ma Giáo (U Minh Giáo)
- **Triết lý**: Tự do tự tại, kẻ mạnh là vua, bất chấp thủ đoạn để đạt mục đích.
- **Thái độ**: Sống theo bản năng, coi thường lễ giáo gian hồ.
- **Kỹ năng đặc trưng**: Huyết Ma Công, Ảnh Độn.

## 4. Giao tiếp Thế lực
- Khi người chơi gặp NPC thuộc tông môn, AI phải thể hiện rõ đặc điểm tư tưởng của tông môn đó qua ngôn ngữ và hành động của NPC.
- Hệ thống danh vọng (Reputation) với từng thế lực sẽ mở ra các cơ hội hoặc hiểm họa khác nhau.
    `.trim(),
  type: 'world',
  enabled: true
};
