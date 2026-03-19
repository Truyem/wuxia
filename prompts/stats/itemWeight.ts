import { PromptStructure } from '../../types';

export const StatItemWeight: PromptStructure = {
    id: 'stat_item_weight_ref',
    title: 'Tham khảo Trọng lượng Vật phẩm',
    content: `
<tham_khao_trong_luong_vat_pham>
【Định nghĩa trọng lượng vật phẩm thực tế (Đơn vị thống nhất là Cân)】
Mục tiêu: Cung cấp tham khảo thực tế khả thi cho \`gameState.Túi đồ[].Trọng lượng\`, tránh việc trọng lượng quá cao hoặc không thực tế.

0. Quy tắc đơn vị
- Các trường trọng lượng trong dự án thống nhất sử dụng \`Cân\` (có thể là số thập phân, gợi ý giữ lại 1 chữ số thập phân).
- Quy đổi tham khảo: \`1 Cân = 500 gram\`.
- Các vật phẩm cùng loại nên cố gắng giữ định nghĩa ổn định, tránh việc cùng phẩm chất cùng hình dáng mà trọng lượng nhảy vọt lớn.

1. Tham khảo trọng lượng vũ khí thường gặp (Cân)
- Phi châm/Ám khí nhỏ (mỗi chiếc): 0.01 ~ 0.05
- Đoản đao/Dao găm: 0.4 ~ 1.2
- Đơn thủ kiếm: 1.8 ~ 3.5
- Đơn thủ đao: 2.2 ~ 4.5
- Trường thương/Binh khí cán dài: 4.0 ~ 9.0
- Song thủ trọng binh (Trọng đao/Trọng chùy): 6.0 ~ 20.0
- Cung: 1.2 ~ 2.8
- Tên (mỗi mũi): 0.03 ~ 0.08

2. Tham khảo trọng lượng giáp và đồ mặc thường gặp (Cân)
- Khăn vấn/Nón lá: 0.3 ~ 1.0
- Mũ da/Mũ sắt: 1.0 ~ 4.0
- Vải áo/Tight-fitting outfit (Kính trang): 0.8 ~ 2.5
- Giáp da: 3.0 ~ 8.0
- Giáp xích/Giáp phiến: 8.0 ~ 20.0
- Ủng/Giày (cặp): 0.8 ~ 2.5
- Hộ cổ/Hộ thủ: 0.4 ~ 1.8

3. Tham khảo trọng lượng vật chứa và linh tinh (Cân)
- Túi vải trống/Cẩm nang: 0.1 ~ 0.6
- Túi đeo hông/Túi đeo chéo: 0.5 ~ 1.8
- Balo/Gùi (trống): 1.2 ~ 4.0
- Rương gỗ (trống): 4.0 ~ 15.0
- Bình nước (đầy): 1.0 ~ 3.0
- Túi tiền (100 đồng tiền đồng): Khoảng 0.8 ~ 1.2

4. Tham khảo trọng lượng vật phẩm tiêu hao và nguyên liệu (Cân)
- Đan dược (mỗi viên): 0.01 ~ 0.08
- Thuốc bột/Gói thuốc (mỗi phần): 0.05 ~ 0.4
- Lương khô (mỗi phần): 0.2 ~ 0.8
- Thịt tươi/Khối nguyên liệu lớn: 0.8 ~ 6.0
- Thỏi sắt (mỗi thỏi): 2.0 ~ 8.0
- Gỗ/Quặng (mỗi đơn vị): 1.0 ~ 20.0

5. Quy tắc tạo và cân bằng
- Gợi ý trang bị đơn lẻ thường dùng cho người mới không quá 6 Cân (ngoại trừ trọng binh).
- Nếu một vật phẩm đơn lẻ có thể mang theo thao tác mà vượt quá 30 Cân, phải có căn cứ tự sự rõ ràng (Cự binh/Trọng giáp/Nguyên liệu dị thú).
- Vật nặng cực đoan (>100 Cân) mặc định không thể là vật mang theo hàng ngày, cần phương tiện vận chuyển/đồng đội hỗ trợ hoặc năng lực đặc biệt chống đỡ.
- Gợi ý tải trọng tổng của vật chứa tuân theo: \`Tổng trọng lượng vật chứa = Trọng lượng bản thân vật chứa + Trọng lượng vật bên trong truyền dẫn\`; nếu có tỷ lệ giảm trọng lượng, hãy chiết khấu trọng lượng truyền dẫn theo quy tắc.
- Các vật chứa mềm (túi vải/cẩm nang) gợi ý nên điều chỉnh động \`Không gian chiếm dụng\` của bản thân theo \`Thuộc tính vật chứa.Không gian hiện tại đã dùng\` (Tải trống=1, không trống=\`max(1, ceil(Không gian hiện tại đã dùng*0.35))\`).

6. Liên kết với Phụ trọng
- \`gameState.Nhân vật.Tải trọng hiện tại\` (Phụ trọng hiện tại) nên phản ánh tổng thời gian thực của "vật phẩm mang theo và trang bị".
- Khi xuất hiện lượng lớn việc nhặt/chuyển đồ trong cùng một hiệp, phải cập nhật phụ trọng đồng bộ, cấm việc chỉ thay đổi tự sự mà không đổi giá trị.
- Khi thực hiện thu nạp phải đồng bộ với \`ID vật chứa hiện tại\`, \`Không gian hiện tại đã dùng\` của vật chứa, tránh tình trạng đứt đoạn "trọng lượng đã tăng nhưng vật chứa chưa bị chiếm dụng".
</tham_khao_trong_luong_vat_pham>
`,
    type: 'num',
    enabled: true
};
