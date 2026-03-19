import { PromptStructure } from '../../types';

export const StatCultivation: PromptStructure = {
    id: 'stat_cultivation',
    title: 'Hệ thống Tu luyện Chín tầng',
    content: `
<giao_thuc_he_thong_tu_luyen>
【Hệ thống tu luyện (Chín tầng đồng trục + Ràng buộc chi phí)】
Mô-đun này ràng buộc thu nhập tu luyện, rủi ro đột phá và cập nhật cảnh giới trong các trường hiện có.

1. Trường cốt lõi
- Trục giá trị: \`gameState.Nhân vật.Cấp độ cảnh giới\` (Trường mở rộng tùy chọn, gợi ý khởi tạo)
- Trục văn bản: \`gameState.Nhân vật.Cảnh giới\`
- Tài nguyên và giá phải trả: \`Tinh lực hiện tại\` (Tinh lực hiện tại), Trạng thái máu bảy bộ phận, \`Buff người chơi\`.

2. Khung tầng thứ (1~9)
- 1 Phàm thể/Luyện thể sơ thành
- 2 Hậu thiên/Thông mạch
- 3 Tiên thiên/Ngưng tức
- 4 Tông sư/Hóa kình
- 5 Đại tông sư/Cương khí
- 6 Thiên nhân/Ngự khí
- 7 Ngưỡng địa tiên/Tiểu thần thông
- 8 Ngưỡng chân quân/Ngự phong phi lược
- 9 Lục địa thần tiên/Lăng không ngắn hạn
- Các thế giới quan khác nhau có thể thay đổi danh xưng, nhưng bậc thang giá trị phải giữ nguyên nhất quán.

3. Công thức gợi ý thu nhập tu luyện
- \`Giá trị tu luyện = floor((Căn cốt*2.4 + Ngộ tính*2.1 + Tầng số công pháp hiện tại*6) * Hệ số môi trường * Hệ số trạng thái)\`
- Hệ số môi trường nên được đưa ra hợp lý dựa trên môi trường hiện tại (Địa điểm/Thời tiết/Biến môi trường).
- Hệ số trạng thái phải chịu ảnh hưởng của no bụng, khát nước, thương thế, mệt mỏi.

4. Công thức gợi ý tỷ lệ thành công đột phá
- \`P = clamp(40 + Căn cốt*1.2 + Ngộ tính*1.4 + Cộng thêm cơ duyên + Cộng thêm đan dược - Hình phạt thất bại, 5, 95)\`
- Cấm đột phá bảo đảm 100%.

5. Phản phệ khi thất bại (Bắt buộc có giá phải trả)
- Ít nhất phải thực hiện một mục:
  - Trừ \`gameState.Nhân vật.Tinh lực hiện tại\`
  - Ngực/Bụng bị thương và cập nhật trạng thái bộ phận
  - Ghi vào \`PlayerBUFF\` tiêu cực (Vd: Kinh mạch hỗn loạn)
- Cấm "thất bại không mất gì" để thử sai liên tục.

6. Ranh giới năng lực cao giai
- Từ giai 7 trở lên có thể xuất hiện thuật pháp cấp thấp, nhưng cần tiêu hao và có giới hạn cảnh nền.
- Giai 8~9 có thể ngự phong/lăng không thời gian ngắn, cấm bay lượn lâu dài không tiêu hao.

7. Kỷ luật thực hiện
- Khi \`gameState.Nhân vật.Cấp độ cảnh giới\` chưa khởi tạo, hãy \`set\` trước khi trích dẫn.
- Sau khi phá cảnh cần đồng bộ: \`gameState.Nhân vật.Cấp độ cảnh giới\`, \`gameState.Nhân vật.Cảnh giới\`, các giá trị \`Kinh nghiệm thăng cấp\` cần thiết và tính toán lại trạng thái.
</giao_thuc_he_thong_tu_luyen>
`,
    type: 'num',
    enabled: true
};
