import { PromptStructure } from '../../types';

export const StatBodyHealth: PromptStructure = {
    id: 'stat_body',
    title: 'Máu bộ phận và Hình phạt thương thế',
    content: `
<giao_thuc_mau_bo_phan>
【Hệ thống máu bảy bộ phận (Ràng buộc mạnh với các trường)】
Chỉ sử dụng các trường thực tế sau:
\`Head/Chest/Abdomen/Left Hand/Right Hand/Left Leg/Right Leg\` (Đầu/Ngực/Bụng/Tay trái/Tay phải/Chân trái/Chân phải) và các trường tương ứng \`Current HP/Max HP/Status\`.

1. Tổng máu và Định nghĩa phân phối
- Gợi ý tổng máu tối đa: \`Tổng máu = 400 + Thể chất*28 + Căn cốt*18 + Sức mạnh*8 + Cấp độ cảnh giới*50\`
- Nếu \`Cấp độ cảnh giới\` chưa được khởi tạo, hãy tính là 1.
- Gợi ý phân phối:
  - Đầu 15%, Ngực 22%, Bụng 20%, Tay trái 11%, Tay phải 11%, Chân trái 10.5%, Chân phải 10.5%
- Cho phép làm tròn, nhưng tổng của bảy bộ phận phải quay lại mức tổng máu.

2. Ngưỡng trạng thái (Thống nhất)
- \`>=85%\`: Bình thường
- \`60~84%\`: Khinh thương (Thương nhẹ)
- \`35~59%\`: Trung thương (Thương vừa)
- \`1~34%\`: Trọng thương (Thương nặng)
- \`=0\`: Mất khả năng/Lâm nguy (Quyết định theo bộ phận)

3. Hậu quả theo bộ phận (Phải có thể quan sát được)
- Đầu thương thế Trung thương+: Độ chính xác và ổn định giảm, Trọng thương có thể gây choáng váng.
- Ngực thương thế Trung thương+: Tiêu hao tinh lực tăng, bạo phát bị hạn chế rõ rệt.
- Bụng thương thế Trung thương+: Phát lực động tác bị hạn chế, tồn tại rủi ro mất máu liên tục.
- Tay thương thế Trung thương+: Khả năng cầm vũ khí, đỡ đòn, liên chiêu giảm.
- Chân thương thế Trung thương+: Dịch chuyển, né tránh, khinh công suy giảm rõ rệt.

4. Ý nghĩa khi máu về không (0)
- Đầu = 0: Xác suất cao lâm nguy hoặc tử vong trực tiếp (chỉnh sửa theo độ khó).
- Ngực = 0: Xác suất cao lâm nguy và tình trạng tiếp tục xấu đi.
- Bụng = 0: Rủi ro sốc/nội thương mất kiểm soát cực cao.
- Tứ chi = 0: Chi tương ứng mất khả năng hoạt động, không được tiếp tục tự sự như chi còn lành lặn.

5. Kỷ luật thực hiện
- Sau mỗi lần chịu đòn hoặc điều trị, phải đồng bộ:
  - \`add/set ...Current HP\`
  - \`set ...Status\`
- \`Current HP\` phải được cắt biên trong khoảng \`0~Max HP\`.
- Cấm tình trạng "máu đã đổi nhưng trạng thái chưa cập nhật" hoặc "trạng thái thay đổi nhưng không có căn cứ thay đổi máu".
</giao_thuc_mau_bo_phan>
`,
    type: 'num',
    enabled: true
};
