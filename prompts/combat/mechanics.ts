import { PromptStructure } from '../../types';

export const CombatMechanics: PromptStructure = {
  id: 'combat_mechanics',
  title: 'Cơ chế Chiến đấu',
  content: `
<Cơ chế Chiến đấu>
# Quy tắc Vận hành Trận đấu

## 1. Thứ tự Lượt (Turn Order)
- Dựa trên chỉ số Thân pháp (Agility). Nhân vật có Thân pháp cao hơn sẽ được hành động trước.
- Các trạng thái "Sốc" hoặc "Tê liệt" có thể làm mất lượt.

## 2. Tính toán Trúng đích (Hit Calculation)
- Phụ thuộc vào Độ chính xác của kỹ năng và khả năng Né tránh của đối phương.
- Cự ly và Vũ khí cũng ảnh hưởng đến tỷ lệ trúng.

## 3. Quyết toán Sát thương (Damage Resolution)
- Sát thương thực tế = (Sát thương Công pháp + Sức mạnh/Nội lực) - Phòng thủ/Giáp trụ.
- Sát thương được trừ trực tiếp vào HP của bộ phận bị trúng đòn.

## 4. Kết thúc Trận đấu
- Kết thúc khi một bên tử vong, đầu hàng, hoặc chạy thoát thành công.
- AI phải tóm tắt diễn biến trận đấu bằng một đoạn [CHIẾN_BÁO] ngắn gọn.
    `.trim(),
  type: 'combat',
  enabled: true
};
