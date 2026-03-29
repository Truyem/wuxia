import { PromptStructure } from '../../types';

export const CombatStyles: PromptStructure = {
  id: 'combat_styles',
  title: 'Phong cách Võ học',
  content: `
<Phong cách Võ học>
# Các trường phái Võ công và Đặc điểm

## 1. Kiếm Pháp (Sword)
- **Đặc trưng**: Linh hoạt, sắc bén, thiên về đâm và gạt.
- **Ưu điểm**: Tốc độ đánh nhanh, dễ đánh trúng yếu điểm.
- **Nhược điểm**: Sát thương vật lý cơ bản không cao bằng đao.

## 2. Đao Pháp (Blade)
- **Đặc trưng**: Mạnh mẽ, bá đạo, thiên về chém và bổ.
- **Ưu điểm**: Sát thương lớn, có khả năng phá giáp và gây chảy máu cao.
- **Nhược điểm**: Thân pháp chậm hơn khi sử dụng.

## 3. Chưởng Pháp/Quyền Pháp (Unarmed)
- **Đặc trưng**: Biến hóa khôn lường, sử dụng nội lực trực tiếp.
- **Ưu điểm**: Không phụ thuộc vũ khí, dễ gây chấn thương nội tạng.
- **Nhược điểm**: Phạm vi tấn công ngắn.

## 4. Ám Khí (Hidden Weapons)
- **Đặc trưng**: Từ xa, bất ngờ, thường đi kèm tẩm độc.
- **Ưu điểm**: Tấn công từ xa, khiến kẻ thù khó đề phòng.
- **Nhược điểm**: Số lượng có hạn, sát thương thấp nếu không trúng chỗ hiểm.

## 5. Khắc chế lẫn nhau
- Trường binh khắc đoản binh, tốc độ khắc sức mạnh, nhu khắc cương.
    `.trim(),
  type: 'combat',
  enabled: true
};
