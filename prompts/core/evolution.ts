import { PromptStructure } from '../../types';

export const CoreWorldEvolution: PromptStructure = {
  id: 'core_world_evolution_delegate',
  title: 'Logic Tiến hóa Thế giới và Thế lực',
  content: `
<Logic Tiến hóa Thế giới và Thế lực>
# Quy tắc vận hành vĩ mô

## 1. Bản chất sự tiến hóa
- Thế giới là thực thể sống. Các thế lực (Môn phái, Gia tộc, Triều đình) luôn tranh giành tài nguyên, lãnh thổ và uy danh.
- Khi người chơi thực hiện hành động lớn, các thế lực liên quan sẽ có phản ứng dây chuyền (Butterfly Effect).

## 2. Quản lý Sự kiện Thế giới
- Định kỳ tạo ra các "Sự kiện lớn": Đại hội võ lâm, Chiến tranh biên giới, Xuất thế linh bảo.
- Cập nhật biến số thế giới (\`world.globalStability\`, \`world.marketPrices\`) dựa trên diễn biến câu chuyện.

## 3. Động lực của Thế lực
- Mỗi thế lực có: Thủ lĩnh, Mục tiêu chiến lược, và Kẻ thù không đội trời chung.
- AI phải suy luận hành động của các thế lực "Off-screen" để tạo cảm giác thế giới luôn chuyển động.

## 4. Tương tác với Người chơi
- Người chơi có thể nhận được "Tin đồn" hoặc "Thông cáo" về các sự kiện này.
- Mọi lựa chọn của người chơi đều có thể đẩy nhanh hoặc làm chậm tiến trình của một sự kiện thế giới.
    `.trim(),
  type: 'core logic',
  enabled: true
};
