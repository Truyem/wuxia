import { PromptStructure } from '../../types';

export const StatOtherSettings: PromptStructure = {
  id: 'stat_other',
  title: 'Thiết lập Liên kết Liên hệ thống',
  content: `
<giao_thuc_lien_ket_lien_he_thong>
【Liên kết liên hệ thống (Nhân vật/Xã giao/Môi trường/Thế giới/Cốt truyện)】
Mục tiêu: Ánh xạ hậu quả của một hành động tới nhiều hệ thống cùng một lúc và tất cả đều có thể truy xuất được.

1. Ranh giới vùng có thể ghi
- Có thể ghi: \`gameState.Nhân vật / gameState.Môi trường / gameState.Giao tiếp / gameState.Thế giới / gameState.Chiến đấu / gameState.Cốt truyện / gameState.Túi đồ / gameState.Võ công / gameState.Trang bị / gameState.Bản đồ / gameState.Danh sách nhiệm vụ / gameState.Danh sách hẹn ước / gameState.Môn phái người chơi\`.
- Cấm các đường dẫn không tồn tại: \`gameState.Hành lý / gameState.Vàng\`, v.v.
- Việc thực hiện lệnh phải phù hợp với <Giao thức đồng bộ dữ liệu> và <Định nghĩa cấu trúc dữ liệu>.

2. Liên kết kinh tế
- Tiền mặt người chơi chỉ được ghi vào \`gameState.Nhân vật.Tiền tệ\` (Vàng thỏi/Bạc/Đồng).
- Mua = Khấu trừ tiền + Nhận vật phẩm; Bán = Mất vật phẩm + Nhận tiền, không được cập nhật đơn phương.
- Giao dịch giá trị cao nên chịu ảnh hưởng của thân phận, địa điểm, tình hình thị trường, quan hệ.

3. Liên kết xã giao
- \`Affinity/Favorability\` (Độ hảo cảm) và \`Relationship status\` (Trạng thái quan hệ) cần được đồng bộ:
  - <=-40 Thù địch
  - -39~9 Lạnh nhạt
  - 10~39 Đi lại bình thường
  - 40~69 Thân thiện
  - 70~89 Tin tưởng
  - >=90 Giao tình sinh tử
- Phải viết \`Memory[]\` (Ký ức[]) sau các tương tác then chốt.
- Trạng thái tại chỗ cần được điều chỉnh theo thời gian thực (rời cảnh là false, vào cảnh mới là true).

4. Liên kết môi trường (Cấu trúc mới)
- Ảnh hưởng môi trường nên được ghi vào:
  - \`gameState.Môi trường.Thời tiết.Thời tiết\`
  - \`gameState.Môi trường.Thời tiết.Ngày kết thúc\`
  - \`gameState.Môi trường.Biến môi trường{Tên (4 chữ), Mô tả, Hiệu ứng}\`
- Ví dụ: Mưa bão lầy lội -> Chính xác/Khinh công giảm; Nóng lạnh cực đoan -> Tiêu hao tinh lực tăng.

5. Liên kết Thế giới và Cốt truyện
- Các lựa chọn trọng đại nên ghi vào \`gameState.Cốt truyện.Biến số cốt truyện\`.
- Việc tiến triển các sự kiện thế giới và hành động của NPC đang hoạt động cần đọc các biến này và phản ánh hậu quả.
- Cấm "thay đổi thế giới chỉ xuất hiện trong tự sự mà không hiện thực hóa vào biến".

6. Liên kết tiến triển thời gian
- Sau khi tiến triển \`gameState.Môi trường.Thời gian\` (Thời gian môi trường), hãy đồng bộ kiểm tra:
  - Thay đổi tự nhiên của no bụng/khát nước
  - Kết toán các sự kiện thế giới đến hạn
  - Làm mới hành động của các NPC đang hoạt động đến hạn
- Cập nhật \`gameState.Môi trường.Ngày chơi\` khi sang ngày mới.

7. Giới hạn cuối cùng về sự nhất quán
- Cấm "logs đã xảy ra nhưng không có lệnh" hoặc "lệnh đã thực hiện nhưng logs không xảy ra".
- Mọi sự tăng giảm đều phải có nguồn gốc, cái giá và kết quả khép kín.
</giao_thuc_lien_ket_lien_he_thong>
`,
  type: 'num',
  enabled: true
};
