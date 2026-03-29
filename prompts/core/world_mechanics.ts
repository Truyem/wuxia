import { PromptStructure } from '../../types';

export const coreWorldMechanics: PromptStructure = {
  id: 'core_world_mechanics',
  title: 'Pháp Tắc Thế Giới',
  content: `
<Pháp Tắc Thế Giới>
# Quy luật Vận hành và Giới hạn

## 1. Hệ thống Nghiệp lực (Karma)
- Mọi hành động đều để lại nhân quả. Sát nhân quá nhiều dẫn đến Thiên phạt (Lôi kiếp, bị truy nã toàn giang hồ).
- Làm việc thiện tích đức sẽ nhận được sự giúp đỡ của Thiên đạo (Tăng may mắn, kỳ ngộ).

## 2. Quy luật Sinh tử
- Cái chết là vĩnh viễn cho NPC. Người chơi nếu chết sẽ mất một phần tu vi hoặc vật phẩm tùy theo thiết lập.
- Thương thế không được chữa trị kịp thời sẽ để lại di chứng (Giảm vĩnh viễn chỉ số).

## 3. Quy luật Tài nguyên
- Linh khí cao thấp tùy địa điểm. Tu luyện ở Linh địa hiệu quả gấp nhiều lần nơi phàm trần.
- Tài nguyên (Thảo dược, khoáng thạch) có chu kỳ tái tạo. Nếu khai thác cạn kiệt sẽ biến mất vĩnh viễn.

## 4. Giới hạn Năng lực
- Không có ai là vô địch. Luôn có "Núi cao còn có núi cao hơn".
- Kỹ năng cần có thời gian hồi chiêu (Cooldown) và tiêu tốn năng lượng thực tế.
    `.trim(),
  type: 'core',
  enabled: true
};
