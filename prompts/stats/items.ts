import { PromptStructure } from '../../types';

export const StatItem: PromptStructure = {
  id: 'stat_item',
  title: 'Hệ thống Vật phẩm và Trang bị',
  content: `
<giao_thuc_vat_pham_trang_bi>
【Quy tắc chính Vật phẩm và Trang bị (Khớp chính xác với các trường vật phẩm của <Định nghĩa cấu trúc dữ liệu>)】
Tất cả vật phẩm được ghi vào \`gameState.Túi đồ\`, tham chiếu trang bị được ghi vào \`gameState.Trang bị\`.

1. Các trường cơ bản (Dùng chung cho tất cả các loại)
- \`ID, Name (Tên), Description (Mô tả), Type (Loại), Quality (Phẩm chất), Weight (Trọng lượng), spaceOccupied (Không gian chiếm dụng), Value (Giá trị), Current durability (Độ bền hiện tại), Max durability (Độ bền tối đa), attributes (Danh sách dòng thuộc tính)\`
- Định vị tùy chọn: \`ID vật chứa hiện tại?\`, \`Bộ phận trang bị hiện tại?\`
- Đơn vị thống nhất: \`Trọng lượng = Cân\` (Số thập phân); \`Không gian chiếm dụng = Ô\` (Giá trị số).
- \`ID\` phải là duy nhất, cấm việc cùng một thực thể được giữ lại sau khi bán lặp lại.
- \`ID\` chỉ cho phép “tiền tố ngắn + ba chữ số” (vd: \`Item001\`), cấm tên tiếng Anh đầy đủ, phiên âm pinyin hoặc chuỗi dài có nghĩa.

2. Các trường mở rộng theo loại (Bổ sung chính xác theo loại)
- Vũ khí: \`Subtype vũ khí, Tấn công tối thiểu, Tấn công tối đa, Chỉnh sửa tốc độ đánh, Tỷ lệ đỡ đòn\`
- Giáp: \`Vị trí trang bị, Bộ phận che phủ, Phòng ngự vật lý, Phòng ngự nội công\`
- Vật chứa thuần túy: \`Vị trí trang bị (Lưng|Hông), Thuộc tính vật chứa\`
- Bí kíp: \`Tên kỹ năng tương ứng, Yêu cầu học tập, Tiến độ nghiên cứu, Có tiêu hao không\`
- Vật phẩm tiêu hao: \`Hiệu ứng sử dụng[], Độc tính\`

3. Ràng buộc cứng hệ thống vật chứa (Bắt buộc)
- Các trường vật chứa chỉ cho phép: \`Thuộc tính vật chứa = {Dung lượng tối đa, Không gian hiện tại đã dùng, Kích thước tối đa vật phẩm đơn lẻ, Tỷ lệ giảm trọng lượng}\`.
  (Trong JSON trạng thái: \`containerProperties = {maxCapacity, currentUsedSpace, maxSingleItemSize, weightReductionRatio}\`)
- Khi thu nạp phải đồng thời thỏa mãn:
  - \`Vật phẩm.Không gian chiếm dụng <= Vật chứa.Thuộc tính vật chứa.Kích thước tối đa vật phẩm đơn lẻ\` (= \`containerProperties.maxSingleItemSize\`)
  - \`Vật chứa.Không gian hiện tại đã dùng + Vật phẩm.Không gian chiếm dụng <= Vật chứa.Dung lượng tối đa\` (= \`containerProperties.currentUsedSpace + ... <= containerProperties.maxCapacity\`)
- Thứ tự ghi:
  1) \`set Vật phẩm.ID vật chứa hiện tại\`
  2) Nếu cần thiết \`set Vật phẩm.Bộ phận trang bị hiện tại\`
  3) \`set/add Vật chứa.Thuộc tính vật chứa.Không gian hiện tại đã dùng\`
- Vật phẩm đã trang bị phải thỏa mãn: \`ID vật chứa hiện tại = Bộ phận trang bị hiện tại\` (vd: \`Vũ khí chính\`).
- Cho phép túi trong túi, nhưng mỗi lớp đều phải kiểm tra dung lượng, cấm lồng lặp vòng tròn.

4. Phụ trọng và Độ bền
- \`gameState.Nhân vật.Tải trọng hiện tại\` (Phụ trọng hiện tại) phải nhất quán với "mang theo + trang bị".
- Quá tải (\`Phụ trọng hiện tại > Phụ trọng tối đa\`) phải kích hoạt hình phạt hành động (Chính xác/Né tránh/Di chuyển/Tiêu hao tinh lực).
- Kết toán độ bền:
  - Chiến đấu, đỡ đòn, môi trường khắc nghiệt sẽ trừ \`Độ bền hiện tại\`.
  - Khi \`Độ bền hiện tại <= 0\`, vật phẩm phải bị suy yếu hoặc mất hiệu lực.
  - \`Độ bền tối đa = 0\` chỉ dành cho số ít vật phẩm không thể phá hủy.

5. Giao dịch và Sở hữu
- Dự án không tồn tại đường dẫn cấp cao \`gameState.Hành lý\` (Túi đồ).
- Vật phẩm người chơi chỉ vào \`gameState.Túi đồ\`; NPC sở hữu có thể vào \`gameState.Giao tiếp[i].Inventory\`.
- “Thấy rơi đồ” không đồng nghĩa với “đã vào túi”, phải có hành động nhặt/thu nạp.
- Ô trang bị có thể viết tên hoặc ID, nhưng đối tượng vật phẩm đầy đủ tương ứng phải tồn tại trong \`gameState.Túi đồ\`.

6. Cân bằng và Chống lỗ hổng
- \`Trọng lượng/Giá trị/Độ bền/Công phòng/Xác suất\` không được là số âm.
- Phẩm chất cao (Cực phẩm/Tuyệt thế/Truyền thuyết) phải ràng buộc với rủi ro, sự kiện hoặc hậu quả thế lực.
- Sản phẩm hiếm tuân thủ <Giao thức tài nguyên rơi đồ>, tham khảo trọng lượng tuân thủ <Tham khảo trọng lượng vật phẩm>.
</giao_thuc_vat_pham_trang_bi>
`,
  type: 'num',
  enabled: true
};
