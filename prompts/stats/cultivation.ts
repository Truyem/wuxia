import { PromptStructure } from '../../types';

export const StatCultivation: PromptStructure = {
  id: 'stat_cult',
  title: 'Hệ thống Tu vi',
  content: `
<Hệ thống Tu vi>
# Cảnh giới và Tiến trình Tu luyện

## 1. Cấp độ Cảnh giới (Realms)
- **Hạ Giới**: Phàm Nhân, Luyện Khí, Trúc Cơ, Kim Đan, Nguyên Anh, Hóa Thần.
- **Linh Giới**: Luyện Hư, Hợp Thể, Đại Thừa, Độ Kiếp.
- **Tiên Giới**: Chân Tiên, Kim Tiên, Thái Ất Ngọc Tiên, Đại La Tiên, Đạo Tổ.

## 2. Tiến độ Tu luyện (Cultivation Progress)
- Điềm Tu vi nhận được từ thiền định, dược liệu quý, hoặc song tu.
- Khi tiến độ đạt 100%, tiên nhân có thể thử thách "Đột phá" (Breakthrough) để tiến vào cảnh giới mới.

## 3. Tâm ma và Thiên kiếp (Tribulations)
- **Tâm ma**: Xuất hiện khi đột phá ở các cảnh giới cao, yêu cầu ý chí và tâm cảnh vững vàng.
- **Thiên kiếp**: Sét đánh từ trời cao khi thăng cấp đại cảnh giới. Cần chuẩn bị pháp bảo và trận pháp phòng hộ.

## 4. Đặc lợi của Cảnh giới cao
- Tuổi thọ tăng vọt, mở khóa thần thông (Teleport, Khống vật, v.v.).
- Khả năng áp chế linh áp lên những kẻ có cảnh giới thấp hơn.

## 5. Ràng buộc Tự sự
- AI phải mô tả quá trình tu luyện một cách lung linh, huyền ảo (Ví dụ: "Linh khí xung quanh cuồn cuộn đổ dồn vào đan điền, cảm giác như biển rộng sông dài...").
    `.trim(),
  type: 'num',
  enabled: true
};
