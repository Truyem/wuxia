import { PromptStructure } from '../../types';

export const coreDataFormat: PromptStructure = {
  id: 'core_data',
  title: 'Định dạng Dữ liệu',
  content: `
<Data structure definition>
# 【Định nghĩa cấu trúc dữ liệu】WuXia SaveData (V2.0 Tiếng Việt Chuẩn hóa)

> Mục tiêu: Định nghĩa cây trạng thái "có thể thực thi và hoàn chỉnh" của dự án này. AI khi tạo \`tavern_commands\` phải tuân thủ nghiêm ngặt định nghĩa này.
> Nguyên tắc: Kiểm tra đường dẫn trước, sau đó khớp trường dữ liệu, cuối cùng kiểm tra loại và giới hạn.
> Quy tắc thời gian sắt đá: Tất cả các trường "chuỗi thời gian cấu trúc" được thống nhất định dạng là \`YYYY:MM:DD:HH:MM\` (ví dụ: \`317:03:16:09:45\`).
> Trường hợp bắt buộc: \`gameState.Môi trường.Thời gian\` phải là dấu thời gian chuẩn; \`gameState.Môi trường.Ngày chơi\` chỉ biểu thị "ngày thứ mấy" (1, 2, 3...).

## 0. Quy tắc đường dẫn Bạch kim (QUAN TRỌNG)
1. Chỉ sử dụng các đường dẫn tắt (Convenience Paths) sau để đạt hiệu quả UI tốt nhất:
   - \`gameState.Nhân vật\` (Hồ sơ chính, thuộc tính, sinh tồn)
   - \`gameState.Túi đồ\` (Toàn bộ hành lý, vật phẩm, trang bị trong túi)
   - \`gameState.Võ công\` (Toàn bộ bí tịch, chiêu thức, nội công)
   - \`gameState.Trang bị\` (Các ô trang bị đang mặc)
   - \`gameState.Chiến đấu\` (Trạng thái và kẻ địch hiện tại)
   - \`gameState.Môi trường\` (Thời gian, địa điểm, thời tiết)
   - \`gameState.Giao tiếp\` (Danh sách NPC xã hội, hảo cảm, ký ức)
   - \`gameState.Đội nhóm\` (Danh sách đồng đội, chỉ số chiến đấu đồng đội)
   - \`gameState.Thế giới\` (Sự kiện lớn, tin đồn, NPC hoạt động toàn cầu)
   - \`gameState.Bản đồ\` (Thông tin tọa độ, kiến trúc, khu vực)
   - \`gameState.Cốt truyện\` (Chương hồi, phục bút, biến số story)

## 1. Cấu trúc Nhân vật (gameState.Nhân vật)
- \`Họ tên\`, \`Giới tính\`, \`Tuổi\`, \`Ngày sinh\`, \`Ngoại hình\`, \`Tính cách\`, \`Danh hiệu\`, \`Cảnh giới\`
- \`avatar\`: String (Đường dẫn ảnh nhân vật, ví dụ: \`\`)
- \`Kinh nghiệm hiện tại\`, \`Kinh nghiệm thăng cấp\`
- \`Tinh lực hiện tại\`, \`Tinh lực tối đa\`
- \`No bụng hiện tại\`, \`No bụng tối đa\`, \`Khát nước hiện tại\`, \`Khát nước tối đa\`
- \`Tải trọng hiện tại\`, \`Tải trọng tối đa\`
- \`Tiền tệ\`: { \`Vàng thỏi\`, \`Bạc\`, \`Đồng\` }
- \`Sức mạnh\`, \`Mẫn tiệp\`, \`Thể chất\`, \`Căn cốt\`, \`Ngộ tính\`, \`Phúc duyên\`
- \`Máu bộ phận\`: { \`Đầu\`, \`Ngực\`, \`Bụng\`, \`Tay trái\`, \`Tay phải\`, \`Chân trái\`, \`Chân phải\` }
  - Mỗi bộ phận gồm: \`Máu hiện tại\`, \`Máu tối đa\`, \`Trạng thái\`

## 2. Cấu trúc Túi đồ (gameState.Túi đồ) - Mảng các Vật phẩm
- Mỗi vật phẩm gồm: \`ID\`, \`Tên\`, \`Mô tả\`, \`Loại\`, \`Phẩm chất\`, \`Trọng lượng\`, \`Không gian chiếm dụng\`, \`Giá trị\`, \`Độ bền hiện tại\`, \`Độ bền tối đa\`
- Mở rộng Vũ khí: \`Tấn công tối thiểu\`, \`Tấn công tối đa\`, \`Tỷ lệ đỡ đòn\`
- Mở rộng Phòng ngự: \`Phòng ngự vật lý\`, \`Phòng ngự nội công\`
- \`ID vật chứa hiện tại\`: ID của túi/rương chứa vật phẩm này.
- Vật chứa (Loại=\`Vật chứa\` hoặc \`Phòng cụ\`): chứa trường \`Thuộc tính vật chứa\` (= \`containerProperties\` trong JSON) với cấu trúc \`{Dung lượng tối đa, Không gian hiện tại đã dùng, Kích thước tối đa vật phẩm đơn lẻ, Tỷ lệ giảm trọng lượng}\`.

## 3. Cấu trúc Võ công (gameState.Võ công) - Mảng các Công pháp
- \`ID\`, \`Tên\`, \`Mô tả\`, \`Loại\`, \`Phẩm chất\`, \`Nguồn gốc\`
- \`Tầng hiện tại\`, \`Tầng tối đa\`, \`Độ thuần thục hiện tại\`, \`Kinh nghiệm thăng cấp\`
- \`Loại tiêu hao\`, \`Giá trị tiêu hao\`, \`Sát thương cơ bản\`

## 4. Cấu trúc Trang bị (gameState.Trang bị)
- \`Vũ khí chính\`, \`Vũ khí phụ\`, \`Đầu\`, \`Ngực\`, \`Tay\`, \`Chân\`, \`Thắt lưng\`, \`Lưng\`, \`Tọa kỵ\`
- Giá trị là String (Tên vật phẩm) hoặc ID.

## 5. Cấu trúc Giao tiếp & Đội nhóm (gameState.Giao tiếp / gameState.Đội nhóm)
- \`id\`, \`Họ tên\`, \`Giới tính\`, \`Tuổi\`, \`Cảnh giới\`, \`Thân phận\`
- \`Độ hảo cảm\`, \`Trạng thái quan hệ\`, \`Giới thiệu\`, \`Ký ức\` (Mảng {Nội dung, Thời gian})
- \`Có mặt hay không\`: Boolean
- \`Có phải đồng đội không\`: Boolean
- Chỉ dành cho \`Đội nhóm\`: \`Máu hiện tại\`, \`Máu tối đa\`, \`Tinh lực hiện tại\`, \`Lực tấn công\`, \`Lực phòng ngự\`

## 6. Cấu trúc Môi trường & Bản đồ (gameState.Môi trường / gameState.Bản đồ)
- \`Thời gian\`: \`YYYY:MM:DD:HH:MM\`
- \`Ngày chơi\`: Number
- \`Địa điểm lớn\`, \`Địa điểm trung\`, \`Địa điểm nhỏ\`, \`Địa điểm cụ thể\`
- \`Thời tiết\`: { \`Thời tiết\`, \`Ngày kết thúc\` }

## 7. Cấu trúc Chiến đấu (gameState.Chiến đấu)
- \`Đang chiến đấu\`: Boolean
- \`Kẻ địch\`: { \`Tên\`, \`Cảnh giới\`, \`Máu hiện tại\`, \`Máu tối đa\`, \`Lực tấn công\`, \`Lực phòng ngự\` } | null

## 8. Cấu trúc Cốt truyện (gameState.Cốt truyện)
- \`Chương hiện tại\`: { \`ID\`, \`Tiêu đề\`, \`Câu chuyện nền\`, \`Mâu thuẫn chính\` }
- \`Biến số cốt truyện\`: Map các biến (Boolean/Number/String)
- \`Sử sách giang hồ\`: Mảng các sự kiện quan trọng.



# 【Ràng buộc Thao tác】
1. **Lệnh tạo**: \`push path = {object}\` (Dùng cho Xã hội, Túi đồ, Võ công).
2. **Lệnh sửa**: \`set path = value\` hoặc \`add path = value\`.
3. **Lệnh xóa**: \`delete path\`.
4. **Consistency**: Mọi thay đổi trong \`logs\` (Main Body) PHẢI được phản ánh qua \`<Command>\`.

</Data structure definition>
`,
  type: 'core setting',
  enabled: true
};
