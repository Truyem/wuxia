import { PromptStructure } from '../../types';

export const coreTimeProgression: PromptStructure = {
  id: 'core_time_progress',
  title: 'Quy tắc Tiến triển Thời gian',
  content: `
<Quy tắc Tiến triển Thời gian>
# Quy luật dòng chảy thời gian

## 1. Chi phí thời gian cơ bản
- Quan sát/Chào hỏi: 5-15 phút.
- Giao tiếp sâu/Giao dịch: 30-60 phút.
- Di chuyển (Thành thị): 30-60 phút.
- Di chuyển (Ngoại ô/Rừng): 2-4 giờ.
- Chiến đấu: 5-30 phút (tùy quy mô).
- Tu luyện/Nghỉ ngơi: 4-8 giờ.

## 2. Đồng bộ cưỡng chế
- Mọi hành động trong \`<content>\` đều phải tiêu tốn thời gian thực tế.
- Nếu người chơi do dự hoặc không đưa ra hành động cụ thể, thời gian vẫn trôi qua (Thuế thời gian).
- Cập nhật biến \`环境.年/月/日/时/分\` ngay khi có sự thay đổi.

## 3. Nhịp độ (Pacing)
- Không để thời gian đóng băng quá lâu trong một cảnh.
- Nếu cuộc đối thoại kéo dài hơn 3 lượt, bắt buộc phải trôi qua ít nhất 30 phút.
- Sử dụng "Bước nhảy thời gian" (Time Skip) cho các đoạn đường dài hoặc tu luyện dài ngày.
    `.trim(),
  type: 'core setting',
  enabled: true
};
