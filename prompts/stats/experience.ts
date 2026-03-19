import { PromptStructure } from '../../types';

export const StatExperience: PromptStructure = {
    id: 'stat_exp',
    title: 'Nhận kinh nghiệm và Đường cong tăng trưởng',
    content: `
<giao_thuc_tang_truong_kinh_nghiem>
【Hệ thống kinh nghiệm (Công thức + Chống cày + Truy xuất được)】
Kinh nghiệm chỉ được ghi vào \`gameState.Nhân vật.Kinh nghiệm hiện tại\` và \`gameState.Nhân vật.Kinh nghiệm thăng cấp\`.

1. Công thức kinh nghiệm đơn lẻ (Gợi ý cố định)
- \`EXP = floor(Kinh nghiệm cơ bản*Rủi ro*Chênh lệch cảnh giới*Lần đầu*Độ khó*(1+Ngộ tính*0.015+Phước duyên*0.005))\`
- Các nhân tố phải có căn cứ tự sự, cấm chồng chất nhân hệ số mà không có nhân quả.

2. Phạm vi gợi ý của các nhân tố
- Kinh nghiệm cơ bản: Tạp binh < Tinh anh < Thủ lĩnh < Sinh tử chiến < Lựa chọn then chốt tuyến chính.
- Rủi ro: Thấp 0.5~0.8, Trung bình 1.0, Cao 1.2~1.8.
- Chênh lệch cảnh giới: Vượt cấp tăng lên, cùng cấp khoảng 1.0, áp đảo hạ xuống.
- Lần đầu: Lần đầu vượt qua 1.2~1.5, lặp lại 1.0.
- Độ khó: Được kiểm soát bởi lời nhắc độ khó hiện tại.

3. Giảm trừ chống cày (Gợi ý cố định)
- Lần thứ 1~3 cho cùng một loại mục tiêu: 100%
- Lần thứ 4~6: 45%
- Lần thứ 7 trở đi: 20%
- Việc lặp lại thu thập rủi ro thấp có thể tiến dần về 0.

4. Ngưỡng thăng cấp và Kết toán
- Ngưỡng gợi ý: \`Kinh nghiệm thăng cấp = floor(100 * 1.28^(Cấp độ cảnh giới-1) + Cấp độ cảnh giới^2 * 35)\`
- Điều kiện kích hoạt: \`Kinh nghiệm hiện tại >= Kinh nghiệm thăng cấp\`
- Kết toán thăng cấp:
  - \`Kinh nghiệm hiện tại -= Kinh nghiệm thăng cấp\`
  - Tính toán lại \`Kinh nghiệm thăng cấp\` tiếp theo
  - Nếu cần thiết, đồng bộ \`Cấp độ cảnh giới\` và \`Cảnh giới\`

5. Sự nhất quán tự sự
- Thăng cấp phải có căn cứ có thể quan sát (Đột phá, đốn ngộ, kết quả bế quan, kinh qua sinh tử chiến).
- Mặc định cấm thăng nhiều cấp trong một hiệp; nếu xảy ra, phải có cái giá cao và điều kiện khan hiếm rõ ràng.

6. Yêu cầu lệnh
- Tăng giảm kinh nghiệm sử dụng \`add gameState.Nhân vật.Kinh nghiệm hiện tại ...\`
- Cập nhật ngưỡng sử dụng \`set gameState.Nhân vật.Kinh nghiệm thăng cấp ...\`
- Không được viết vào các trường không tồn tại (vd: Bể kinh nghiệm, tổng bảng thuần thục, v.v.).
</giao_thuc_tang_truong_kinh_nghiem>
`,
    type: 'num',
    enabled: true
};
