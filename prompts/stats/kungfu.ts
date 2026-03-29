import { PromptStructure } from '../../types';

export const StatKungfu: PromptStructure = {
  id: 'stat_kf',
  title: 'Hệ thống Võ học',
  content: `
<Hệ thống Võ học>
# Phân loại và Tấn thăng Công pháp

## 1. Phân loại Công pháp
- **Nội công (Internal)**: Tăng cường linh lực, khả năng hồi phục và sức mạnh căn bản.
- **Ngoại công (External)**: Các chiêu thức tấn công trực tiếp bằng vũ khí hoặc tay không.
- **Bộ pháp (Movement)**: Tăng khả năng né tránh và tốc độ di chuyển trong chiến đấu.
- **Tâm pháp (Mental)**: Các kỹ năng bị động tăng cường ngộ tính hoặc kháng trạng thái.

## 2. Cấp độ và Tinh thông (Level & Mastery)
- **Cấp độ (Level)**: Từ 1 đến 10 (hoặc cao hơn tùy phẩm cấp). Tăng cấp yêu cầu điểm Tinh thông.
- **Tinh thông (Mastery)**: Tăng lên sau mỗi lần sử dụng thành công trong thực chiến hoặc luyện tập.
- **Đột phá (Breakthrough)**: Cần điều kiện đặc biệt (Đan dược, Địa điểm, Tâm cảnh) để vượt qua các tầng cổ chai.

## 3. Uy lực và Tiêu hao
- **Uy lực (Power)**: Sát thương hoặc hiệu ứng gây ra, phụ thuộc vào cấp độ và thuộc tính liên quan.
- **Tiêu hao (Cost)**: Lượng Linh lực hoặc Thể chất tiêu tốn mỗi khi thi triển.

## 4. Mô tả Chiêu thức
- Khuyến khích mô tả mang tính hình tượng: "Kiếm khí như rồng bay phượng múa, kình lực xé toạc hư không...".
    `.trim(),
  type: 'num',
  enabled: true
};

export const SkillExtractionPrompt: PromptStructure = {
  id: 'skill_extraction',
  title: 'Trích xuất Võ học',
  content: `
<Trích xuất Võ học>
# Quy trình Khởi tạo Võ công từ Ý tưởng

## 1. Phân tích Thuộc tính
- Xác định loại công pháp và thuộc tính ngũ hành (nếu có) từ mô tả của người chơi.
- Đánh giá phẩm cấp (Hoàng, Huyền, Địa, Thiên) dựa trên uy lực mô tả.

## 2. Thiết lập Thông số
- Định nghĩa các chỉ số \`power_scale\`, \`cost_per_use\`, và \`max_level\`.
- Tạo tên chiêu thức hào hùng, đậm chất kiếm hiệp.

## 3. Đồng bộ Hệ thống
- Tạo object JSON chuẩn để \`ADD\` vào \`kungfu_list\` của nhân vật.
- Đảm bảo các ràng buộc về cấp độ và cảnh giới được thực thi.
    `.trim(),
  type: 'custom',
  enabled: true
};
