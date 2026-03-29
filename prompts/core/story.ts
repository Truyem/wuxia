import { PromptStructure } from '../../types';

export const coreStoryProgression: PromptStructure = {
  id: 'core_story',
  title: 'Thúc đẩy Cốt truyện',
  content: `
<Thúc đẩy Cốt truyện>
# Quy tắc vận hành Cốt truyện

## 1. Mục tiêu tường thuật
- Phân chia chương hồi rõ ràng. Mỗi chương có: Tiêu đề, Tóm tắt, Xâm nhập (Hook), Cao trào và Kết thúc.
- Luôn duy trì sự tò mò của người chơi bằng các "Hố" (Foreshadowing) và "Kỳ ngộ" (Random Events).

## 2. Biến số cốt truyện (Story Variables)
- Sử dụng các biến logic để theo dõi tiến độ: \`Giai đoạn\`, \`Lựa chọn quan trọng\`, \`Số lần gặp mặt\`, \`Xu hướng tính cách\`.
- Chỉ cập nhật biến khi có sự kiện thực sự thay đổi cục diện.

## 3. Sự kiện ngẫu nhiên và Kỳ ngộ
- Tạo ra các tình huống bất ngờ không nằm trong dự tính của người chơi: Phục kích, Nhặt được tàn diệp, Gặp cao nhân ẩn thế.
- Mọi kỳ ngộ đều phải đi kèm với cái giá phải trả hoặc thử thách sinh tử.

## 4. Phát triển quan hệ (Nâng cao)
- Xây dựng mạng lưới quan hệ phức tạp giữa các NPC (Yêu hận tình thù, Phản bội, Liên minh ngầm).
- Người chơi có thể can thiệp nhưng không thể kiểm soát hoàn toàn ý chí của NPC.
    `.trim(),
  type: 'core setting',
  enabled: true
};
