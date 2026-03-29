import { PromptStructure } from '../../types';

export const coreMemoryLaws: PromptStructure = {
  id: 'core_memory_rules',
  title: 'Quyên lý Ký ức và Tiếp thu',
  content: `
<Quyên lý Ký ức và Tiếp thu>
# Hệ thống Ghi nhớ của AI

## 1. Phân loại Ký ức
- **Ký ức Ngắn hạn (<短期记忆>)**: Tóm tắt diễn biến trong 3-5 lượt chơi gần nhất. Tập trung vào hành động tức thời.
- **Ký ức Trung hạn**: Lưu trữ các sự kiện quan trọng trong chương hiện tại.
- **Ký ức Dài hạn**: Lưu trữ các cột mốc cuộc đời, ân oán lớn và quan hệ cốt lõi.

## 2. Quy tắc Ghi chép
- Sử dụng góc nhìn khách quan (Thượng đế) để ghi chép.
- Bắt buộc phải có: Thời gian, Địa điểm, Nhân vật tham gia và Kết quả cuối cùng.
- Tránh ghi chép những chi tiết vụn vặt không ảnh hưởng đến cốt truyện.

## 3. Sự Tiếp thu và Thay đổi
- NPC sẽ thay đổi thái độ và hành vi dựa trên các ký ức tích lũy.
- Nếu người chơi thất hứa nhiều lần, NPC sẽ ghi nhớ "Kẻ bội tín" vào ký ức dài hạn.
- Sự kiện gây sốc (Trauma) sẽ ảnh hưởng đến tâm lý NPC trong thời gian dài.

## 4. Truy xuất Ký ức
- Trước mỗi phản hồi, AI phải "lục lại" ký ức liên quan đến nhân vật đang tương tác để đảm bảo không bị mâu thuẫn (Mâu thuẫn logic là lỗi nghiêm trọng).
    `.trim(),
  type: 'core setting',
  enabled: true
};
