import { PromptStructure } from '../../types';

export const CoreCotJudge: PromptStructure = {
  id: 'core_cot_judge',
  title: 'Hệ thống Phán định (Judgement System)',
  content: `
<Hệ thống Phán định (Judgement System)>
# Giao thức Đổ xúc xắc và Kiểm tra Chỉ số

## 1. Dùng thẻ <judge>
- Khi hành động có tính rủi ro, không chắc chắn (Chiến đấu, Đột nhập, Thuyết phục), AI phải dùng thẻ <judge>.
- Nội dung bên trong thẻ là quá trình suy luận xác suất dựa trên chỉ số (Ví dụ: Thân pháp 80 vs Phản ứng kẻ địch 70).

## 2. Quy tắc Phán định (Roll Rules)
- Sử dụng hệ thống D100 (1-100).
- **Đại thành công (1-5)**: Kết quả cực tốt ngoài mong đợi.
- **Thành công (6-60)**: Hành động diễn ra như ý muốn.
- **Thất bại (61-95)**: Gặp trở ngại hoặc không đạt được mục đích.
- **Đại thất bại (96-100)**: Hậu quả nghiêm trọng (Bị thương, Mất vật phẩm, Lộ tung tích).

## 3. Bản tin phán định [Kết quả]
- Ngay sau thẻ <judge> trong <content>, phải in ra dòng:
  - [Kết quả] Tên hành động｜Kết quả｜Đối tượng...
- Ví dụ: [Kết quả] Đột nhập｜Thành công｜Lao Lý

## 4. Tác động của Kết quả
- Kết quả phán định phải ảnh hưởng trực tiếp đến diễn biến tiếp theo của câu chuyện.
- Không được "lật kèo" sau khi đã phán định (Nhất quán kết quả).
    `.trim(),
  type: 'core logic',
  enabled: true
};
