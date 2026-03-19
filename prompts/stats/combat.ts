import { PromptStructure } from '../../types';

export const StatCombat: PromptStructure = {
    id: 'stat_combat',
    title: 'Công thức Chính xác và Sát thương Chiến đấu',
    content: `
<giao_thuc_dinh_nghia_chien_dau>
【Định nghĩa chiến đấu (Chính xác/Né tránh/Sát thương + Hiện thực hóa trạng thái)】
Chỉ quy định tính toán và hiện thực hóa, không cho phép thêm mới các trường chiến đấu.

1. Điểm neo cấu trúc chiến đấu
- Chỉ sử dụng \`gameState.Chiến đấu\`:
  - \`Đang chiến đấu\` (Đang chiến đấu?)
  - \`Kẻ địch{Tên,Cảnh giới,Giới thiệu,Kỹ năng[],Lực chiến,Phòng ngự,Máu hiện tại,Máu tối đa,Tinh lực hiện tại,Tinh lực tối đa}\`
- Vào chiến đấu: Phải viết đầy đủ đối tượng kẻ địch.
- Kết thúc chiến đấu: Phải thu hồi về \`{"Đang chiến đấu":false,"Kẻ địch":null}\`.

2. Chính xác và Né tránh (Gợi ý định nghĩa cố định)
- \`Giá trị chính xác = Nhanh nhẹn*9 + Ngộ tính*4 + Cấp độ cảnh giới*35 + Chỉnh sửa vũ khí + Chỉnh sửa trạng thái\`
- \`Giá trị né tránh = Nhanh nhẹn*10 + Căn cốt*5 + Cấp độ cảnh giới*30 + Chỉnh sửa khinh công + Chỉnh sửa trạng thái\`
- Phán đoán chính xác: \`Giá trị chính xác >= Giá trị né tránh\`.

3. Kết toán sát thương (Công thức Phức hợp)
- \`Sát thương gốc = Sát thương cơ bản công pháp + Giá trị thuộc tính cộng thêm*Hệ số cộng thêm + Giá trị tấn công trung bình của vũ khí\`
- \`Hệ số Phẩm chất (Q) = match(Chất lượng võ công) { "Phàm": 1.0, "Thạch": 1.1, "Sắt": 1.25, "Đồng": 1.45, "Bạc": 1.7, "Vàng": 2.0, "Ngọc": 2.5, "Thần": 3.5 }\`
- \`Hệ số Thuần thục (M) = 1 + (Cấp hiện tại/Cấp tối đa)*0.5\`
- \`Hệ số Cảnh giới (C) = 1 + (Cấp độ cảnh giới người chơi - Cấp độ cảnh giới kẻ địch)*0.15\` (Tối thiểu 0.5, tối đa 2.5)
- \`Hệ số Tuyệt cảnh (H) = 1 + (1 - Máu hiện tại/Máu tối đa)*0.4\` (Càng thấp máu sát thương càng cao)
- \`Hệ số Môi trường (E) = Bonus/Penalty dựa trên thuộc tính công pháp và môi trường (ví dụ: Công pháp Hỏa trong mưa -20%, trong núi lửa +30%)\`
- \`Hệ số Thời gian (T) = Bonus dựa trên giờ (ví dụ: Công pháp Âm lúc nửa đêm +15%, Công pháp Dương lúc chính ngọ +15%)\`
- \`Tỷ lệ giảm thương = clamp(Phòng ngự mục tiêu/(Phòng ngự mục tiêu+220), 0.05, 0.75)\`
- \`Sát thương cuối cùng = floor(max(1, Sát thương gốc * Q * M * C * H * (1 + E) * (1 + T) * (1-Tỷ lệ giảm thương) * Hệ số bộ phận * Hệ số bạo kích))\`
- Hệ số bộ phận: Đầu 1.25 / Ngực 1.10 / Bụng 1.00 / Tay 0.85 / Chân 0.90.

4. Liên kết hình phạt trạng thái
- Khinh thương: Chính xác/Né tránh -8%
- Trung thương: Chính xác/Né tránh -18%
- Trọng thương: Chính xác/Né tránh -35%
- Tinh lực <=10%: Giảm thêm -30%
- Hậu quả bị thương cụ thể phải đồng bộ với trạng thái bộ phận tương ứng trong <Giao thức máu các bộ phận>.

5. Hiển thị phán đoán và Nhất quán nhật ký
- Định dạng nhật ký phán đoán thống nhất (\`sender="【Phán đoán】"\`):
  - \`Tên hành động｜Kết quả｜Đối tượng kích hoạt Người chơi:Tên hoặc NPC:Tên｜Giá trị phán đoán X/Độ khó Y｜Cơ sở B (Giải thích)｜Môi trường E (Giải thích)｜Trạng thái S (Giải thích)｜May mắn L｜Trang bị Q (Giải thích, tùy chọn)\`
- Kết quả chỉ cho phép: \`Thành công/Thất bại/Đại thành công/Đại thất bại\`.
- Kết quả trong logs phải nhất quán với việc thực hiện tavern_commands.

6. Ràng buộc chống bất thường
- Sát thương đơn lẻ ít nhất là 1; không được giết chết mục tiêu đầy máu cùng cấp mà không có căn cứ.
- Cấm "đánh bại kẻ địch bằng văn bản" nhưng \`Combat.Enemy\` vẫn giữ đầy máu.
- Sau trận chiến ít nhất phải đồng bộ: Máu/Trạng thái bộ phận người chơi, Tinh lực hiện tại, Trạng thái chiến đấu.
</giao_thuc_dinh_nghia_chien_dau>
`,
    type: 'num',
    enabled: true
};
