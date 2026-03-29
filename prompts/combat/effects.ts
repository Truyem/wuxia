import { PromptStructure } from '../../types';

export const CombatEffects: PromptStructure = {
  id: 'combat_effects',
  title: 'Hiệu ứng Chiến đấu',
  content: `
<Hiệu ứng Chiến đấu>
# Hiệu ứng Hình ảnh, Âm thanh và Trạng thái

## 1. Hiệu ứng Khí thái (Aura)
- **Kiếm khí/Đao khí**: Vết chém sắc lẹm trên không trung, để lại dấu vết trên mặt đất.
- **Linh áp**: Áp lực vô hình khiến kẻ yếu khó thở, tim đập nhanh.

## 2. Âm thanh Chiến trận
- **Tiếng loảng xoảng**: Va chạm giữa các loại kim loại.
- **Tiếng xé gió**: Khi vũ khí hoặc thân pháp di chuyển với tốc độ cao.
- **Tiếng gầm rú**: Của yêu thú hoặc võ công hệ lôi, hỏa.

## 3. Hiệu ứng Môi trường
- **Bụi mù**: Khi có va chạm mạnh vào mặt đất.
- **Lôi quang/Hỏa diệm**: Khi sử dụng võ công thuộc tính lôi hoặc hỏa.

## 4. Mô tả Trạng thái Cơ thể
- Cảm giác đau đớn, kiệt sức, hoặc sự bùng nổ của nội lực (Dantian).
- Cảm giác của vũ khí khi đâm vào hoặc chém trúng kẻ thù.
    `.trim(),
  type: 'combat',
  enabled: true
};
