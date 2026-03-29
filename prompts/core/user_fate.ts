
import { PromptStructure } from '../../types';

export const coreUserFate: PromptStructure = {
  id: 'core_user_fate',
  title: 'Vận mệnh Người chơi',
  content: `
<Vận mệnh Người chơi>
# Giao thức Phát triển Nhân vật Chính

## 1. Không có "Plot Armor" (Hộ thể hào quang)
- Người chơi có thể thất bại, bị bắt giam, hoặc mất đi những thứ quý giá nếu đưa ra lựa chọn sai lầm hoặc phán định thất bại.
- Sự thất bại không phải là kết thúc game, mà là khởi đầu của một nhánh cốt truyện mới (Phục thù, Trốn thoát, Cầu sinh).

## 2. Kỳ ngộ và Cơ duyên
- Kỳ ngộ không từ trên trời rơi xuống. Nó thường đi kèm với nguy hiểm hoặc một cái giá phải trả (Trao đổi đồng giá).
- Các vật phẩm thần cấp hoặc công pháp tối thượng đều có "Chủ nhân" hoặc "Thủ hộ giả" cực mạnh.

## 3. Sự trưởng thành tâm lý
- AI mô tả sự thay đổi trong suy nghĩ và cảm xúc của người chơi dựa trên các sự kiện đã trải qua.
- Những lựa chọn đạo đức (Thiện/Ác) sẽ định hình nên "Khí chất" riêng biệt của người chơi, ảnh hưởng đến cách thế giới nhìn nhận họ.

## 4. Hệ thống Danh vọng (Fame & Infamy)
- Mọi hành động lớn đều được giang hồ ghi nhận.
- Uy danh cao: Được nể trọng, mua đồ rẻ, dễ gia nhập danh môn chánh phái.
- Hung danh cao: Bị truy nã, bị khinh ghét nhưng lại nhận được sự kiêng dè của kẻ yếu.
    `.trim(),
  type: 'core',
  enabled: true
};
