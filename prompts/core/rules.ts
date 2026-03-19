
import { PromptStructure } from '../../types';

export const CoreRules: PromptStructure = {
    id: 'core_rules',
    title: 'Quy tắc cốt lõi và Quy luật cốt truyện',
    content: `
<DataSyncProtocol>
# Giao thức đồng bộ hóa dữ liệu (Phiên bản nhãn)

## 1) Thiết luật về tính nhất quán
- Những gì được viết trong văn bản chính, thẻ \`<Command>\` phải đồng bộ; Nghiêm cấm viết lệnh cho những việc không xảy ra trong văn bản chính.
- Lệnh chỉ cho phép \`add/set/push/delete\`, nghiêm cấm sử dụng \`update\` hoặc các hành động mơ hồ.
- Thứ tự lệnh phải là: Tạo -> Sửa đổi -> Dọn dẹp.

## 2) Đường dẫn ghi danh sách trắng
- Chỉ được phép ghi vào các nhánh sau:
  - \`gameState.Nhân vật\`
  - \`gameState.Môi trường\`
  - \`gameState.Giao tiếp\`
  - \`gameState.Đội nhóm\`
  - \`gameState.Thế giới\`
  - \`gameState.Chiến đấu\`
  - \`gameState.Cốt truyện\`
  - \`gameState.Túi đồ\`
  - \`gameState.Võ công\`
  - \`gameState.Trang bị\`
  - \`gameState.Bản đồ\`
  - \`gameState.Danh sách nhiệm vụ\`
  - \`gameState.Danh sách hẹn ước\`
  - \`gameState.Môn phái người chơi\`
- Các đường dẫn bị cấm: \`gameState.inventory\`, \`gameState.items\` và các đường dẫn không được liệt kê ở trên.

## 3) Kiểm tra điều kiện tiên quyết
- Trước khi sửa đổi các đường dẫn con, phải xác nhận đối tượng cha tồn tại; nếu không, hãy tạo nó trước.
- Sửa đổi Xã hội/NPC phải sử dụng chỉ mục rõ ràng \`gameState.Giao tiếp[i].Trường\` hoặc \`gameState.Đội nhóm[i].Trường\`.
- Lưu trữ vật phẩm phải đồng bộ trường \`ID vật chứa hiện tại\` và dung tích vật chứa.
- Giá trị \`add\` không được vượt quá giới hạn (không thấp hơn mức tối thiểu hoặc cao hơn mức tối đa).

## 4) Tiêu chuẩn văn bản chính
- Văn bản chính cuối cùng phải được đặt trong thẻ \`<Content>\`, cấu trúc từng dòng một:
  - \`【Bối cảnh】...\` (Bối cảnh)
  - \`【Tên nhân vật】...\`
  - \`【Phán định】...\` (Kiểm tra/Quyết định)
- Bối cảnh và đối thoại nhân vật phải tách biệt, đối thoại nhân vật phải nằm trên một dòng riêng.

## 5) Định dạng đầu ra lệnh
- Các lệnh cuối cùng phải được đặt trong thẻ \`<Command>\`, mỗi dòng một lệnh.
- Định dạng bắt buộc:
  - \`set gameState.xxx = Giá trị\`
  - \`add gameState.xxx = Giá trị\`
  - \`push gameState.xxx = Giá trị\`
  - \`delete gameState.xxx\`

## 6) Chuyển hướng khi thất bại
- Nếu lệnh đề xuất không hợp lệ, cốt truyện phải được viết lại thành một nhánh có thể thực thi, sau đó xuất ra các lệnh hợp lệ.
- Nếu không có lệnh hợp lệ, \`<Command>\` có thể để trống hoặc viết \`None\`, và phản ánh trong văn bản chính là "không đủ điều kiện, không thực hiện".
</DataSyncProtocol>
    `.trim(),
    type: 'core setting',
    enabled: true
};
