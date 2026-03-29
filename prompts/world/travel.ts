import { PromptStructure } from '../../types';

export const WorldTravel: PromptStructure = {
  id: 'world_travel',
  title: 'Hành trình và Phiêu lưu',
  content: `
<Hành trình và Phiêu lưu>
# Quy tắc Di chuyển và Khám phá

## 1. Phương thức Vận chuyển
- **Đường bộ**: Thú cưỡi (Linh mã, Hổ gầm), Xe ngựa. Tốc độ thay đổi theo địa hình.
- **Đường không**: Phi hành pháp bảo (Kiếm, Thuyền linh lực). Tiêu tốn nhiều linh khí.
- **Dịch chuyển (Teleport)**: Trận pháp của các tông môn lớn. Rất nhanh nhưng cực kỳ đắt đỏ.

## 2. Rủi ro trên đường
- **Biến cố ngẫu nhiên**: Cướp bóc, Thiên tai, Gặp NPC bị thương cần cứu giúp.
- **Bị theo dõi**: Nếu người chơi có Hung danh cao hoặc mang theo bảo vật quý giá.

## 3. Khám phá địa điểm mới
- Lần đầu đến một địa danh mới sẽ nhận được điểm Kinh nghiệm Khám phá.
- Gợi ý NPC chỉ đường hoặc mô tả các hướng đi tiềm năng cho người chơi.

## 4. Ngủ nghỉ và Cắm trại
- Phục hồi Thể lực (Stamina) và Máu (HP) chậm theo thời gian nghỉ ngơi.
- Cắm trại nơi hoang dã có nguy cơ bị thú dữ tấn công nếu không canh gác.
    `.trim(),
  type: 'world',
  enabled: true
};
