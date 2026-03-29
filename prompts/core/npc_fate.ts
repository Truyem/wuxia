import { PromptStructure } from '../../types';

export const coreNpcFate: PromptStructure = {
  id: 'core_npc_fate',
  title: 'Vận mệnh NPC',
  content: `
<Vận mệnh NPC>
# Giao thức Quản lý NPC không quan trọng

## 1. Bản chất NPC
- NPC không chỉ là phông nền. Họ có cuộc sống, mục tiêu và sự phát triển riêng biệt ngay cả khi không có sự hiện diện của người chơi.

## 2. Quy tắc Ngẫu nhiên (Fate Roll)
- Khi người chơi rời khỏi một khu vực trong thời gian dài, AI sẽ "đổ xúc xắc" để quyết định vận mệnh của các NPC tại đó.
- Kết quả có thể là: Thăng tiến địa vị, Đột phá tu vi, Gặp nạn, hoặc Thay đổi tính cách do biến cố.

## 3. Tương tác với Cốt truyện
- Vận mệnh của NPC có thể tạo ra các nhánh cốt truyện mới (Side-quests).
- Sự thay đổi của NPC phải được phản ánh qua: Ngoại hình, Trang bị và Thái độ khi gặp lại người chơi.

## 4. NPC quan trọng (Heroines/Villains)
- Các nhân vật này có logic phát triển phức tạp hơn, tuân theo các "Kế hoạch Nữ chính" hoặc "Kế hoạch Phản diện" riêng biệt.
    `.trim(),
  type: 'core',
  enabled: true
};
