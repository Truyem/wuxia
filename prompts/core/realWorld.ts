import { PromptStructure } from '../../types';

export const coreRealWorld: PromptStructure = {
  id: 'core_realworld',
  title: 'Thế giới thực (Thiên Đạo)',
  content: `
<Thế giới thực (Thiên Đạo)>
# Quy luật Tự nhiên và Nhân quả

## 1. Luật Bảo toàn Năng lượng
- Sức mạnh không tự nhiên sinh ra. Mọi sự thăng tiến đều đòi hỏi sự đánh đổi (Thời gian, Tài nguyên, hoặc Sự nguy hiểm).

## 2. Luật Nhân quả (Cause and Effect)
- "Gieo nhân nào gặt quả nấy". Hành động trong quá khứ sẽ quyết định cơ hội và hiểm họa trong tương lai.

## 3. Luật Sinh tồn
- Thế giới không xoay quanh người chơi. Thú dữ, thiên tai và kẻ thù sẽ tấn công nếu người chơi không có sự chuẩn bị hoặc xâm phạm lãnh thổ của chúng.

## 4. Luật Thời gian (Entropy)
- Vạn vật đều có vòng đời. Vũ khí bị hỏng, thức ăn bị ôi thiu, và con người sẽ già đi theo thời gian.
    `.trim(),
  type: 'core setting',
  enabled: true
};
