import { PromptStructure } from '../../types';

export const StatCharacter: PromptStructure = {
    id: 'stat_char',
    title: 'Tổng cương Thuộc tính Nhân vật',
    content: `
<giao_thuc_tong_cuong_thuoc_tinh_nhan_vat>
【Quy tắc giá trị nhân vật (Tương ứng với các trường trong dự án)】
Mô-đun này chịu trách nhiệm cập nhật hợp lệ của \`gameState.Nhân vật\`, phải nhất quán với <Định nghĩa cấu trúc dữ liệu>, <Giao thức đồng bộ dữ liệu>, <Giao thức suy nghĩ trước COT>.

1. Định danh trường (Chỉ sử dụng các tên khóa hiện có)
- Danh tính cơ bản: \`Họ tên/Giới tính/Tuổi/Ngày sinh/Ngoại hình/Danh hiệu/Cảnh giới\`
- Trục tăng trưởng: \`Kinh nghiệm hiện tại/Kinh nghiệm thăng cấp\`
- Lục căn (Sáu thuộc tính): \`Sức mạnh/Mẫn tiệp/Thể chất/Căn cốt/Ngộ tính/Phúc duyên\`
- Tâm tính (Mới): \`Tâm tính\`
- Sinh tồn: \`Tinh lực hiện tại/Tinh lực tối đa\`【\`No bụng hiện tại/No bụng tối đa\`【\`Khát nước hiện tại/Khát nước tối đa\`
- Phụ trọng (Gánh nặng): \`Tải trọng hiện tại/Tải trọng tối đa\` (Đơn vị: Cân)
- Tiền bạc: \`Tiền tệ.Vàng thỏi/Bạc/Đồng\`
- Thể trạng chiến đấu: Bảy bộ phận \`Máu hiện tại/Máu tối đa/Trạng thái\`
- Tài nguyên: \`gameState.Trang bị/gameState.Túi đồ/gameState.Võ công/Buff người chơi\`

2. Ràng buộc cứng khi cập nhật giá trị
- Bất kỳ lệnh \`add\` nào cũng phải thực hiện từ biên: \`Giá trị hiện tại >= 0\`, và nếu có giới hạn trên thì \`Giá trị hiện tại <= Giá trị tối đa\`.
- Cấm "chỉ viết tự sự mà không viết lệnh", cũng cấm "viết lệnh nhưng nhật ký không xảy ra".
- Cấm nhảy vọt không có nguyên nhân: Thu nhập cao phải có chi phí về thời gian, rủi ro, tài nguyên hoặc căn cứ cốt truyện.
- Trường tiền bạc không được viết số âm, không được tự ý tạo ra các đường dẫn như \`gameState.Gold Coin\`.

3. Trách nhiệm của Lục căn (Định nghĩa giải thích phán đoán)
- \`Sức mạnh\`: Phá giáp, vận chuyển, áp chế đối đầu trực diện.
- \`Mẫn tiệp\`: Tiên thủ, chính xác, né tránh, dịch chuyển.
- \`Thể chất\`: Giới hạn máu, chịu đòn, chiến đấu bền bỉ.
- \`Căn cốt\`: Độ ổn định hồi phục, khả năng chịu đựng của kinh mạch.
- \`Ngoại hình\`: Miêu tả thần thái, trang phục, dáng vẻ (Cyberpunk/Wuxia). 
- \`Tính cách\`: Miêu tả khí chất, phong cách hành sự, tư tưởng cốt lõi. Phải nhất quán với \`Tâm tính\` và \`Căn cốt\`.
- \`Ngộ tính\`: Học tập công pháp, tăng trưởng độ thuần thục, hiểu rõ cách phá chiêu.
- \`Phúc duyên\`: Chỉnh sửa xác suất gặp kỳ ngộ và vật phẩm hiếm (không phải bảo hiểm).

4. Liên kết với các mô-đun khác
- Kết toán chiến đấu thời gian thực: Tuân thủ <Giao thức định nghĩa chiến đấu> + <Giao thức máu các bộ phận>.
- Kinh nghiệm và thăng cấp: Tuân thủ <Giao thức tăng trưởng kinh nghiệm>.
- Tu luyện, đột phá và phản phệ: Tuân thủ <Giao thức hệ thống tu luyện>.
- Hồi phục và điều trị: Tuân thủ <Giao thức hồi phục nghỉ ngơi>.
- Rơi đồ và kinh tế: Tuân thủ <Giao thức tài nguyên rơi đồ>.

5. Mở rộng tùy chọn (Cần khởi tạo trước)
- \`gameState.Nhân vật.Cấp độ cảnh giới\` (Số; nếu chưa khởi tạo thì xử lý là 1)

6. Ví dụ lệnh (Hợp lệ)
- \`add gameState.Nhân vật.Kinh nghiệm hiện tại 36\`
- \`add gameState.Nhân vật.Tinh lực hiện tại -18\`
- \`set gameState.Nhân vật.Ngực.Trạng thái "Trung thương"\`
- \`set gameState.Nhân vật.Tiền tệ.Bạc 27\`
</giao_thuc_tong_cuong_thuoc_tinh_nhan_vat>
`,
    type: 'num',
    enabled: true
};
