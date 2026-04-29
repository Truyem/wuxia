import { PromptStructure } from '../../types';

export const StatCharacter: PromptStructure = {
  id: 'stat_char',
  title: 'Giao thức Thuộc tính Nhân vật',
  content: `
<Giao thức Thuộc tính Nhân vật>
# Hệ thống Chỉ số Nhân vật

## 1. Thuộc tính Cơ bản (Lục Căn)
- **Sức mạnh (Strength)**: Khả năng gây sát thương vật lý và mang vác.
- **Thân pháp (Agility)**: Tốc độ ra đòn, né tránh và độ chính xác.
- **Thể chất (Constitution)**: Giới hạn Máu (HP) và sức chịu đựng bền bỉ.
- **Căn cốt (Root)**: Tốc độ hồi phục Nội lực và khả năng lĩnh hội công pháp cao cấp.
- **Ngộ tính (Comprehension)**: Tốc độ học kỹ năng và khả năng nhận ra sơ hở của đối phương.
- **May mắn (Luck)**: Ảnh hưởng đến tỷ lệ rơi đồ hiếm và các kỳ ngộ trên giang hồ.

## 2. Trạng thái Sinh tồn
- **Nội lực (Qi)**: Năng lượng dùng để thi triển võ công. Hết Nội lực sẽ giảm mạnh lực chiến.
- **Tinh lực (Stamina)**: Cần thiết cho các hành động di chuyển, lao động và chiến đấu.
- **Máu (HP)**: Phân chia theo 7 bộ phận: Đầu, Ngực, Bụng, Tứ chi. 0 HP bộ phận chính = Chết.

## 3. Quy tắc cập nhật
- Use commands in \`<commands>\` to update stats.
- Mọi thay đổi chỉ số phải đi kèm với mô tả logic trong \`<content>\`.
- Giới hạn chỉ số dựa trên Cảnh giới (Realm) hiện tại.
    `.trim(),
  type: 'num',
  enabled: true
};
