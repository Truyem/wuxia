import { PromptStructure } from '../../types';

export const StatKungfu: PromptStructure = {
    id: 'stat_kungfu',
    title: 'Hệ thống Công pháp',
    content: `
<giao_thuc_he_thong_cong_phap>
【Quy tắc chính Hệ thống Công pháp (Khớp chính xác với các trường công pháp của <Định nghĩa cấu trúc dữ liệu>)】
Tất cả các đối tượng công pháp phải có thể viết trực tiếp vào \`gameState.Võ công\`.

1. Nhóm các trường bắt buộc
- Cơ bản: \`ID/Name (Tên)/Description (Mô tả)/Type (Loại)/Quality (Phẩm chất)/Source (Nguồn gốc)\`
- \`ID\` chỉ cho phép “tiền tố ngắn + ba chữ số” (vd: \`Skill001\`), cấm tên tiếng Anh đầy đủ, phiên âm pinyin hoặc chuỗi dài có nghĩa.
- Tăng trưởng: \`Current level/tier (Tầng hiện tại)/Highest level (Tầng tối đa)/Current proficiency (Độ thuần thục hiện tại)/Level-up experience (Kinh nghiệm thăng cấp)/Breakthrough condition (Điều kiện đột phá)\`
- Hạn chế: \`Realm restriction (Hạn chế cảnh giới)/Weapon restriction[] (Hạn chế vũ khí[])\`
- Tiêu hao: \`Consumption type (Loại tiêu hao)/Consumption value (Giá trị tiêu hao)/Casting time (Thời gian thi triển)/Cooldown time (Thời gian hồi chiêu)\`
- Chiến đấu: \`Base damage (Sát thương cơ bản)/Bonus attributes (Thuộc tính cộng thêm)/Bonus coefficient (Hệ số cộng thêm)/Damage type (Loại sát thương)\`
- Phạm vi: \`Target Type (Loại mục tiêu)/Max target count (Số mục tiêu tối đa)\`
- Danh sách: \`Side effect[] (Hiệu ứng đi kèm[])/Passive correction[] (Chỉnh sửa bị động[])/Realm special effects[] (Hiệu ứng cảnh giới[])\`

2. Cấu trúc phần tử danh sách (Không được thiếu khóa)
- \`Side effect[]\`: \`Mã, Tên, Xác suất kích hoạt, Thời gian duy trì, Tham số giá trị, Khoảng cách hiệu lực\`
- \`Passive correction[]\`: \`Tên thuộc tính, Giá trị, Loại (Giá trị cố định|Phần trăm)\`
- \`Realm special effects[]\`: \`Tầng mở khóa, Mô tả\`

3. Ràng buộc Tăng trưởng và Đột phá
- \`Current level/tier <= Highest level\`, và không được nhảy tầng thăng cấp vượt giai.
- Khi \`Current proficiency < Level-up experience\` thì không được thăng tầng.
- Sau khi thăng tầng nên tiêu hao độ thuần thục và tính toán lại kinh nghiệm cần thiết cho tầng tiếp theo.
- Công pháp phẩm chất cao phải có điều kiện đột phá nghiêm ngặt hơn (Cảnh giới/Sư thừa/Cơ duyên/Cái giá).

4. Ánh xạ tiêu hao và Các trường trong dự án
- \`Loại tiêu hao = Tinh lực\`: Trừ \`gameState.Nhân vật.Tinh lực hiện tại\`.
- \`Loại tiêu hao = Nội lực\`: Dự án không có trường Nội lực độc lập, quy đổi thành tiêu hao Tinh lực và giải thích trong tự sự.
- \`Loại tiêu hao = Khí huyết\`: Phải đi kèm với ít nhất một rủi ro tổn thương bộ phận hoặc cái giá máu thực tế.
- Bất kỳ việc khấu trừ nào cũng không được nhỏ hơn 0.

5. Liên kết kết toán
- Sát thương công pháp cần chồng thêm Chính xác, Thương thế, Hình phạt bộ phận từ <Giao thức định nghĩa chiến đấu> và <Giao thức máu các bộ phận>.
- Khi không thỏa mãn hạn chế vũ khí, phải làm suy yếu hoặc phán đoán thất bại, không thể kết toán đầy đủ.
- Chỉnh sửa bị động phải nhất quán với \`PlayerBUFF\`, trang bị, trạng thái, cấm việc chồng chất lặp lại các hiệu ứng cùng nguồn.

6. Chống lỗ hổng
- \`Xác suất kích hoạt\` cưỡng chế từ 0~100.
- Khi thời gian hồi chiêu chưa kết thúc, không được coi là đã thi triển hoàn chỉnh lặp lại.
- Cấm xuất ra “đối tượng công pháp bán cấu trúc” hoặc các trường không tồn tại.
</giao_thuc_he_thong_cong_phap>
`,
    type: 'num',
    enabled: true
};
