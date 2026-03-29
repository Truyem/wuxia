import { PromptStructure } from '../../types';

export const StatBodyHealth: PromptStructure = {
  id: 'stat_body',
  title: 'Hệ thống Trạng thái Cơ thể',
  content: `
<Hệ thống Trạng thái Cơ thể>
# Quản lý Sinh mệnh và Thương tích Bộ phận

## 1. Các bộ phận Cơ thể (Body Parts)
- **Đầu (Head)**: Cực kỳ chí mạng. Về 0 dẫn đến chết ngay hoặc hôn mê sâu.
- **Ngực (Chest)**: Chí mạng. Ảnh hưởng đến nội lực và hơi thở.
- **Bụng (Abdomen)**: Nguy hiểm. Dễ dẫn đến sốc và mất máu liên tục.
- **Tứ chi (Arms/Legs)**: Ảnh hưởng đến khả năng tấn công, thủ thế và di chuyển.

## 2. Các trạng thái Thương tổn
- **Khỏe mạnh**: Hoạt động bình thường.
- **Bị thương nhẹ**: Đau nhức, giảm nhẹ tốc độ hồi phục.
- **Trọng thương**: Giảm mạnh các chỉ số chiến đấu, cần điều trị khẩn cấp.
- **Tàn phế**: Mất hoàn toàn chức năng của bộ phận đó.

## 3. Hệ thống Mất máu và Hồi phục
- **Mất máu (Bleeding)**: Trừ HP bộ phận theo thời gian nếu không cầm máu.
- **Nghiệm trọng (Critical)**: Khi HP của Đầu hoặc Ngực xuống mức báo động.
- **Hồi phục (Recovery)**: Phụ thuộc vào đan dược, nội công và môi trường nghỉ ngơi.

## 4. Ràng buộc Tự sự
- AI phải mô tả cảm giác đau đớn và sự hạn chế của cơ thể khi bị thương (Ví dụ: "Cánh tay trái tê dại, không còn đủ sức để cầm vững thanh kiếm...").
    `.trim(),
  type: 'num',
  enabled: true
};
