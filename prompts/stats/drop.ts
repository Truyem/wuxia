import { PromptStructure } from '../../types';

export const StatResourceDrop: PromptStructure = {
    id: 'stat_drop',
    title: 'Tỷ lệ rơi đồ và Đường cong tài nguyên',
    content: `
<giao_thuc_tai_nguyen_roi_do>
【Rơi đồ và Đường cong tài nguyên (Độ khan hiếm + Hiện thực hóa vật chứa)】
Dùng để ràng buộc chiến lợi phẩm, tài nguyên kỳ ngộ, dòng tiền ra vào giao dịch, ngăn chặn lạm phát kinh tế.

1. Nguyên tắc khớp rơi đồ
- Rơi đồ phải khớp với: Danh tính kẻ địch, bối cảnh thế lực, cấp độ địa điểm, rủi ro sự kiện.
- Khu vực cấp thấp không được sản xuất trang bị thần thánh cấp cao với tần suất lớn.
- Các vật phẩm rơi quan trọng nên được liên kết với biến thế giới/cốt truyện.

2. Gợi ý tỷ lệ hiếm
- Phổ biến 55%~75%
- Ít gặp 18%~30%
- Hiếm 5%~12%
- Tuyệt thế/Truyền thuyết 0.2%~2% (Thông thường yêu cầu điều kiện thủ lĩnh hoặc sự kiện)

3. Chỉnh sửa Phước duyên (Phúc nguyên)
- Phước duyên chỉ chỉnh sửa xác suất, không phải bảo hiểm.
- Gợi ý mỗi 1 điểm phước duyên cung cấp tăng trưởng khu vực nhân 0.15%~0.35% cho "Hiếm trở lên".

4. Chống lạm phát tài nguyên
- Việc lặp lại thu thập tại cùng một điểm trong thời gian ngắn sẽ làm giảm giá trị và xác suất hiếm.
- Những vật phẩm rơi lớn phải đi kèm với rủi ro cao hoặc hậu quả thế lực.
- Cấm liên tục rơi đồ giá trị cao mà không có lý do trong cùng một lượt.

5. Quy tắc thực hiện (Bắt buộc khả thi)
- Người chơi nhận vật phẩm: Ghi vào \`gameState.Túi đồ\`.
- Thu nạp phải bổ sung \`ID vật chứa hiện tại\`; nếu trang bị ngay, bổ sung \`Bộ phận trang bị hiện tại\` và \`ID vật chứa hiện tại = Bộ phận trang bị hiện tại\`.
- Cần đồng bộ \`Không gian đã dùng hiện tại\` của vật chứa; các loại túi đồng bộ sự thay đổi gấp nếp của \`Không gian chiếm dụng\`.
- Khi không có vật chứa khả dụng hoặc dung lượng không đủ, có thể giữ lại tự sự "tồn tại trong cảnh nền", nhưng không được ép buộc tự động vào túi.

6. Giao dịch và Chuyển nhượng
- Tài sản người chơi chỉ thay đổi \`gameState.Nhân vật.Tiền tệ\`.
- Việc chuyển nhượng sở hữu của NPC có thể đồng bộ với \`gameState.Giao tiếp[i].Inventory\`.
- Mua = Thanh toán + Nhận được, Bán = Mất đi + Nhận tiền, cấm tình trạng "bán rồi vẫn còn".
</giao_thuc_tai_nguyen_roi_do>
`,
    type: 'num',
    enabled: true
};
