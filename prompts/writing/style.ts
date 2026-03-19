import type { PromptStructure } from '../../types';

export const WritingStyle: PromptStructure = {
    id: 'writing_style_reference',
    title: 'Tham chiếu phong cách viết',
    content: `
【Phong cách viết: Tham chiếu Cổ Long (Không phải Kim Dung)】

1. Nhịp điệu ngôn ngữ
    - Câu ngắn, dứt khoát. Sử dụng nhiều đoạn văn ngắn để tạo nhịp điệu nhanh và cảm giác hồi hộp.
    - Cấu trúc "Hỏi - Đáp - Hành động" đặc trưng.

2. Góc quay Camera
    - Tập trung vào các chi tiết tĩnh lặng trước khi bùng nổ hành động.
    - Ví dụ: "Gió ngừng thổi. Tiếng lá rơi có thể nghe thấy rõ ràng. Đao đã rút."

3. Từ khóa không khí
    - Cô độc, lạnh lẽo, đêm tối, rượu, tàn nhẫn, nghĩa khí, nhanh, chính xác.

4. Biểu đạt nhân vật
    - Nhân vật ít nói nhưng mỗi lời nói đều có sức nặng.
    - Sử dụng mô tả hành động để thay thế cho mô tả tâm trạng rườm rà.

5. Mô hình cảnh quay
    - Đối thế (Confrontation): Sự tĩnh lặng đáng sợ giữa các cao thủ.
    - Kết liễu (Finishing): Thắng bại thường phân định trong một chiêu.
    - Đặc tả (Close-up): Tập trung vào một chi tiết duy nhất (giọt rượu rơi, ánh mắt, cán đao) để gợi mở toàn bộ không gian.

6. Yếu tố Bí ẩn và Gợi mở
    - Luôn giữ lại một phần thông tin để người chơi tự suy luận.
    - Cấm giải thích "Tại sao": Hãy để hành động tự trả lời.

7. Cấm kỵ
    - Tránh giải thích cơ chế võ công quá chi tiết bằng con số.
    - Tránh các đại từ hiện đại hoặc cách nói chuyện sặc mùi "game".
`,
    type: 'writing',
    enabled: true
};
