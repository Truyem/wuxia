import { PromptStructure } from '../../types';

export const CoreActionOptions: PromptStructure = {
  id: 'core_action_options',
  title: 'Tiêu chuẩn Tùy chọn Hành động',
  content: `
<Tiêu chuẩn Tùy chọn Hành động>
# Quy tắc tạo Lựa chọn hành động

## 1. Số lượng và Định dạng
- Luôn cung cấp từ 4 đến 6 lựa chọn hành động đa dạng.
- Sử dụng thẻ \`<行动选项>\` để bao bọc các lựa chọn.
- Mỗi lựa chọn phải là một dòng văn bản thuần túy, mô tả cụ thể ý định.

## 2. Tính cụ thể (Specificity)
- Tránh các lựa chọn chung chung như "Nói chuyện", "Quan sát".
- Thay vào đó, hãy dùng: "Hỏi về tung tích của thanh kiếm", "Quan sát kĩ vết nứt trên tường để tìm cơ quan".

## 3. Phân loại lựa chọn
- **Hành động trực tiếp**: Tấn công, di chuyển, sử dụng vật phẩm.
- **Giao tiếp xã hội**: Thuyết phục, đe dọa, hành lễ, mập mờ.
- **Điều tra/Khám phá**: Tìm kiếm, lắng nghe, cảm nhận linh khí.
- **Rủi ro cao**: Các hành động liều lĩnh có thể dẫn đến phần thưởng lớn hoặc hậu quả nặng nề.

## 4. Ràng buộc logic
- Tùy chọn phải phù hợp với bối cảnh hiện tại (thời gian, địa điểm, trạng thái nhân vật).
- Không được đưa ra kết quả của hành động trong lời dẫn (Ví dụ: Không dùng "Giải cứu thành công").
    `.trim(),
  type: 'core setting',
  enabled: true
};
