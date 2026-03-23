import { PromptStructure } from '../../types';

export const CoreActionOptions: PromptStructure = {
    id: 'core_action_options',
    title: 'Tiêu chuẩn Tùy chọn Hành động',
    content: `
<Action Option Standards>
# Tiêu chuẩn Tùy chọn Hành động

## ⚠️ Yêu cầu Định dạng
Khi hệ thống kích hoạt tính năng "Tùy chọn Hành động", bạn phải thêm khối thẻ \`<Action Options>...</Action Options>\` vào đầu ra cuối cùng.
Mỗi dòng trong khối thẻ là một hành động bằng văn bản thuần túy (có thể bắt đầu bằng \`-\` hoặc \`1.\`).
Ví dụ:
\`\`\`
<Action Options>
- Quan sát động tĩnh tại cổng thành
- Hỏi Thẩm Thanh Vãn về tình hình kinh đô
- Đến quán trà để thu thập tin tức
</Action Options>
\`\`\`

- **Số lượng**: 3-5 tùy chọn.
- **Nội dung**: Các hành động lệnh ngắn gọn và rõ ràng (gợi ý 4-10 chữ).
- **Nguyên tắc**:
  1. **Tùy chọn bảo thủ** - Quan sát/Chờ đợi/Phòng thủ/Nghỉ ngơi.
  2. **Tùy chọn trung lập** - Giao tiếp/Hỏi thăm/Tìm hiểu tình hình.
  3. **Tùy chọn chủ động** - Khám phá/Hành động/Tiến tới/Tấn công.
  4. **Tùy chọn đặc biệt** - Các lựa chọn duy nhất dựa trên kỹ năng hoặc vật phẩm hiện có.
- **Các ràng buộc bổ sung**:
  - Chỉ viết **hành động thuần túy**, nên bắt đầu bằng một động từ, tránh các ý định trừu tượng (như "Muốn/Hy vọng/Xem xét/Cảm thấy").
  - **Cấm** bao gồm cảm xúc/thái độ/khuynh hướng (như "Cẩn thận", "Giận dữ", "Sợ hãi").
  - **Cấm** bao gồm trạng thái hoặc chỉ số (như "Bị thương/Mệt mỏi/Mất nước/Còn lại/Phán định thành công").
  - **Cấm nội dung tiết lộ (Spoiler)**: Không viết thông tin "hướng kết quả" hoặc "sắp xảy ra" (như "Giải cứu thành công", "Kích hoạt phục kích", "Nhận được phần thưởng").
  - Các tùy chọn phải là **hành động trung lập, có thể thực hiện được, tức thì**.
</Action Option Standards>
    `.trim(),
    type: 'core setting',
    enabled: true
};
