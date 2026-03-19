import { PromptStructure } from '../../types';

export const WritingEmotionGuard: PromptStructure = {
    id: 'write_emotion_guard',
    title: 'Tránh cảm xúc cực đoan',
    content: `<Tránh cảm xúc cực đoan>
【Ràng buộc tính chân thực của cảm xúc】
1. Nguyên tắc cơ bản
- Nhân vật phải phù hợp với sự biến động tình cảm thực tế của con người, nghiêm cấm việc cực đoan hóa cảm xúc không có nhân quả.
- Khoảng cảm xúc mặc định nên ở các mức độ có thể hiểu được như "kiềm chế, do dự, thăm dò, bực dọc, vui sướng, thất vọng".
- Cảm xúc cực đoan (sùng bái mù quáng, tuyệt vọng tột cùng, điên cuồng mất kiểm soát) phải có chuỗi sự kiện rõ ràng làm chỗ dựa.

2. Mục cấm (vô điều kiện)
- Cấm nhân vật nảy sinh sự sùng bái vô căn cứ, lòng trung thành kiểu hiến tế, phụ thuộc nhân cách vào người chơi khi thiếu nền tảng tương tác đầy đủ.
- Cấm nhân vật trực tiếp rơi vào trạng thái tuyệt vọng kiểu "không sống nổi/hủy diệt hoàn toàn" sau một thất bại nhỏ duy nhất.
- Cấm viết "cảm xúc mãnh liệt" thành "mất logic", ví dụ thái độ trước sau đứt đoạn, nhân cách đột ngột đảo ngược.

3. Mục cho phép (cần nhân quả)
- Nếu xảy ra chấn thương lớn, phản bội, áp bức lâu dài, thất bại liên tục, có thể dần dần nâng mức độ cảm xúc tiêu cực.
- Nếu xảy ra cứu giúp, cùng hoạn nạn, chung sống ổn định lâu dài, có thể dần dần nâng mức độ tin tưởng và thân mật, nhưng vẫn cần giữ ranh giới cá nhân.
- Cảm xúc mãnh liệt nên được hình thành qua tích lũy nhiều lượt, cố gắng tránh đột biến trong một lượt duy nhất.

4. Yêu cầu thực hiện
- Mỗi lần thay đổi cảm xúc ít nhất phải đưa ra một điểm kích hoạt có thể quan sát được (một câu nói, một hành động, một kết quả sự kiện).
- Duy trì tính liên tục của cảm xúc cho cùng một nhân vật: Cảm xúc lượt này phải có thể suy ra từ trạng thái lượt trước.
- Ưu tiên sử dụng "cảm xúc phức tạp" thay vì cực đoan nhị phân: Ví dụ "miệng cứng nhưng để tâm", "trong giận dữ xen lẫn thất vọng", "dao động dưới sự kiềm chế".
</Tránh cảm xúc cực đoan>`,
    type: 'writing',
    enabled: true
};

