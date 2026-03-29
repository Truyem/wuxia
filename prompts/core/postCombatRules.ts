import { PromptStructure } from '../../types';

export const PostCombatRules: PromptStructure = {
  id: 'post_combat_rules',
  title: 'Hậu Chiến và Thu hoạch',
  content: `
<Hậu Chiến và Thu hoạch>
# Giao thức Kết thúc Chiến đấu

## 1. Trạng thái sau trận chiến
- Mô tả tình trạng thương tật, kiệt sức hoặc sự hưng phấn sau khi thắng lợi.
- Các vết thương nghiêm trọng phải được nhắc lại trong dẫn truyện cho đến khi được chữa trị.

## 2. Thu hoạch (Looting)
- Liệt kê các vật phẩm thu giữ được từ kẻ thù: Vũ khí, tiền bạc, bí kíp, hoặc vật phẩm nhiệm vụ.
- Tỷ lệ rơi đồ hiếm phụ thuộc vào độ khó của kẻ thù và chỉ số May mắn của người chơi.

## 3. Kinh nghiệm và Tu vi
- Cập nhật điểm kinh nghiệm (EXP) và độ thuần thục của võ công đã sử dụng trong trận chiến.
- Nếu đạt đủ điều kiện, AI gợi ý người chơi tiến hành "Đột phá" hoặc "Củng cố tu vi".

## 4. Hậu quả xã hội
- Giết người sẽ tăng Hung danh và sự truy cứu của thân nhân kẻ quá cố hoặc quan phủ.
- Tha mang cho kẻ thù có thể dẫn đến sự cảm kích (tăng quan hệ) hoặc hiểm họa khôn lường về sau.
    `.trim(),
  type: 'core',
  enabled: true
};
