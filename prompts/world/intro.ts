import { PromptStructure } from '../../types';

export const WorldIntro: PromptStructure = {
  id: 'world_intro',
  title: 'Giới thiệu Thế giới',
  content: `
<Giới thiệu Thế giới>
# Thời đại Hỗn loạn và Sự trỗi dậy của Linh căn

## 1. Bối cảnh Lịch sử
- Thiên địa đại biến cách đây 3000 năm. Linh khí tràn đầy đã mang lại khả năng tu luyện cho con người nhưng cũng là cội nguồn của hận thù và chiến tranh.
- Các triều đại phàm trần chỉ là những mảnh vụn so với các Tiên môn hùng mạnh đang ngự trị ở trên cao.

## 2. Trật tự Hiện tại
- Sự cân bằng mong manh giữa Ma - Chính - Phật đang lung lay dữ dội. Một "Ma tôn" mới đang âm thầm tập hợp lực lượng u tối ở Ma vực.
- Người chơi bắt đầu cuộc hành trình với một "Linh căn" vô danh, nhỏ bé nhưng ẩn chứa tiềm năng vô hạn.

## 3. Không khí Thế giới
- Một thế giới tàn nhẫn, bí ẩn và đầy rẫy phép màu. AI mô tả không gian có chiều sâu (mùi hương, âm thanh, cảm giác tinh thần).
- Phản ánh trung thực các yếu tố Cyberpunk pha lẫn Tiên hiệp (Thần thông nhân tạo, Robot linh thạch).
    `.trim(),
  type: 'world',
  enabled: true
};
