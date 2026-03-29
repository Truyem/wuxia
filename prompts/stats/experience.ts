import { PromptStructure } from '../../types';

export const StatExperience: PromptStructure = {
  id: 'stat_exp',
  title: 'Hệ thống Kinh nghiệm',
  content: `
<Hệ thống Kinh nghiệm>
# Tăng trưởng và Đột phá Cảnh giới

## 1. Nguồn điểm Kinh nghiệm (EXP Sources)
- **Chiến đấu**: Tiêu diệt kẻ thù, lính lác hoặc boss.
- **Tu luyện**: Thiền định, luyện tập công pháp hàng ngày.
- **Nhiệm vụ**: Hoàn thành các ủy thác từ NPC hoặc môn phái.
- **Kỳ ngộ**: Tìm thấy bí kíp ẩn, đan dược quý hoặc gặp được cao nhân.

## 2. Cấp độ và Cảnh giới (Levels & Realms)
- **Cảnh giới**: Phân chia theo các đại cảnh giới (Ví dụ: Luyện Khí, Trúc Cơ, Kim Đan...).
- **Cấp độ**: Các tiểu cảnh giới bên trong mỗi đại cảnh giới (Cấp 1-9).
- **Điểm EXP**: Cần thiết để thăng cấp tiểu cảnh giới.

## 3. Quy tắc Đột phá (Breakthrough Rules)
- Khi đạt đỉnh cao của một cảnh giới, người chơi cần thực hiện hành động "Đột phá".
- Đột phá có thể thất bại, dẫn đến tổn hại kinh mạch hoặc giảm sút tu vi.
- Yêu cầu các vật phẩm hỗ trợ (Trúc Cơ Đan, Tụ Linh Trận) để tăng tỷ lệ thành công.

## 4. Ảnh hưởng của Cảnh giới
- Cảnh giới cao hơn mở khóa các công pháp mạnh hơn và tăng cường thuộc tính cơ bản đáng kể.
- Áp chế cảnh giới: Người ở cảnh giới cao sẽ có lợi thế áp đảo khi đối đầu với người cảnh giới thấp.
    `.trim(),
  type: 'num',
  enabled: true
};
