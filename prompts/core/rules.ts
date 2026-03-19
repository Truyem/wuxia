import { PromptStructure } from '../../types';

export const CoreRules: PromptStructure = {
    id: 'core_rules',
    title: 'Quy tắc cốt lõi và Quy luật cốt truyện',
    content: `
<DataSyncProtocol>
# Giao thức đồng bộ hóa dữ liệu (Phiên bản JSON)

## 1) Thiết luật về tính nhất quán
- Những gì được viết trong mảng \`logs\`, trường \`shortTerm\` và mảng \`tavern_commands\` phải đồng bộ; Nghiêm cấm tạo lệnh cho những việc không xảy ra trong văn bản chính.
- Lệnh chỉ cho phép \`action: "add/set/push/delete"\`, nghiêm cấm sử dụng các hành động mơ hồ.
- Thứ tự lệnh phải là: Tạo -> Sửa đổi -> Dọn dẹp.
- **Tính nhất quán tên nhân vật**: Sử dụng chính xác họ tên từ \`gameState\` trong trường \`sender\`, nghiêm cấm sử dụng "Người chơi", "Nhân vật chính" hoặc "Tên nhân vật" làm tên hiển thị.

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

## 4) Tiêu chuẩn văn bản (trong mảng logs)
- Văn bản phải được chia nhỏ vào mảng \`logs\` theo cấu trúc:
  - \`"sender": "Cảnh vật"\` - Miêu tả môi trường.
  - \`"sender": "Bối cảnh"\` - Tự sự hành động.
  - \`"sender": "Tên thực tế của nhân vật"\` - Lời thoại.
  - \`"sender": "Phán đoán"\` - Kết quả kiểm tra hành động.
- Văn bản bối cảnh và đối thoại nhân vật phải tách biệt thành các mục riêng.

## 5) Định dạng Phán đoán (Judgment Line)
- Định dạng bắt buộc: \`Tên hành động｜Kết quả｜Kích hoạt [Người chơi/NPC]:Tên thực tế｜Giá trị phán đoán X/Độ khó Y｜Cơ bản B (lý do)｜Môi trường E (lý do)｜Trạng thái S (lý do)｜May mắn L\`.
- "Tên thực tế" phải khớp với họ tên trong \`gameState\`.

## 6) Chuyển hướng khi thất bại
- Nếu hành động người chơi đề xuất không hợp lệ (vi phạm logic hoặc thiếu điều kiện), cốt truyện phải được viết lại thành một nhánh có thể thực thi, sau đó xuất ra các lệnh hợp lệ.
- Nếu không có lệnh hợp lệ, \`tavern_commands\` để mảng trống \`[]\`, và phản ánh trong văn bản là "không đủ điều kiện, không thực hiện".
</DataSyncProtocol>
    `.trim(),
    type: 'core setting',
    enabled: true
};
