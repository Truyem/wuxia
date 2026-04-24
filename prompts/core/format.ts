import { PromptStructure } from '../../types';

export const Core_OutputFormat: PromptStructure = {
  id: 'core_format',
  title: 'Cấu trúc đầu ra và Kịch bản lệnh',
  content: `
<Cấu trúc đầu ra và Kịch bản lệnh>
# Quy tắc Định dạng BẮT BUỘC

## 1. Thẻ gốc (Root Tags)
Bắt buộc đầu ra phải chứa các thẻ sau:
- <Chính văn>: Nội dung dẫn truyện và đối thoại.
- <Ký ức ngắn hạn>: Tóm tắt ngắn gọn diễn biến lượt này.
- <Lệnh>: Các lệnh cập nhật trạng thái hệ thống.

## 2. Cấu trúc Nội dung (<content>)
Sử dụng các tiền tố sau để phân biệt nội dung:
- "Background": Dùng cho mô tả bối cảnh, hành động, nội tâm nhân vật.
- "Tên Nhân Vật": Dùng cho lời đối thoại trực tiếp. Lời thoại phải đặt trong dấu ngoặc kép " ".
- "[Kết quả]": Dùng để thông báo kết quả của một hành động rủi ro (Dice roll).

## 3. Quy tắc Mệnh lệnh (<Lệnh>)
- Mỗi lệnh nằm trên một dòng riêng biệt.
- Sử dụng cú pháp: SET/ADD/PUSH [Đường dẫn biến] [Giá trị].
- Ví dụ: ADD gameState.Character.currentEnergy -10.

## 4. Ký ức ngắn hạn (<Ký ức ngắn hạn>)
- Viết dưới dạng tóm tắt sự kiện khách quan.
- Độ dài không quá 100 chữ.
- Tập trung vào những thay đổi quan trọng nhất vừa xảy ra.
    `.trim(),
  type: 'core',
  enabled: true
};
