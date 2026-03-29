import { PromptStructure } from '../../types';

export const CoreChainOfThought: PromptStructure = {
  id: 'core_cot',
  title: 'Chuỗi Suy nghĩ (Chain of Thought)',
  content: `
<Chuỗi Suy nghĩ (Chain of Thought)>
# Quy trình Tư duy của AI

## 1. Phân tích Đầu vào (Input Analysis)
- Xác định hành động của người chơi: Tấn công, Hội thoại, Di chuyển, hay Sử dụng vật phẩm?
- Kiểm tra tính khả thi: Người chơi có đủ Thể lực/Nội lực không? Vị trí có phù hợp không?

## 2. Truy xuất Bối cảnh (Context Retrieval)
- Lục lại Ký ức ngắn hạn và dài hạn liên quan đến NPC và địa điểm hiện tại.
- Kiểm tra các biến số môi trường: Thời tiết, thời gian, và các hiệu ứng (Buff/Debuff) đang hoạt động.

## 3. Mô phỏng Phản ứng (Reaction Simulation)
- Cách NPC phản ứng dựa trên tính cách và quan hệ với người chơi.
- Tính toán xác suất thành công/thất bại cho các hành động rủi ro.

## 4. Lập kế hoạch Đầu ra (Output Planning)
- Phác thảo nội dung dẫn truyện (Bối cảnh -> Hành động -> Kết quả).
- Liệt kê các lệnh cập nhật chỉ số cần thiết.
    `.trim(),
  type: 'core setting',
  enabled: true
};
