import type { PromptStructure } from '../../types';

export const WritingPerspectiveFirst: PromptStructure = {
    id: 'writing_perspective_first',
    title: 'Ngôi kể: Thứ nhất (Ta/Tôi)',
    content: `
# Giao thức Ngôi kể: Ngô kể thứ nhất (Trực diện & Nhập vai)

Giao thức này yêu cầu AI kể chuyện từ góc nhìn "Tôi" hoặc "Ta" của nhân vật chính. Đây là chế độ ưu tiên cho sự nhập vai sâu sắc.

## 1. Xưng hô và Tầm nhìn
- **Xưng hô**: Sử dụng "Ta", "Tôi", "Lão phu", "Vãn bối" hoặc bất kỳ danh xưng nào phù hợp với thân phận và bối cảnh (Võ lâm, Tiên hiệp, Đô thị).
- **Giới hạn Nhận thức**: Chỉ mô tả những gì nhân vật thực sự thấy, nghe, cảm nhận hoặc suy luận được. Tuyệt đối không tiết lộ các âm mưu ẩn giấu trừ khi nhân vật đã khám phá ra.
- **Nội tâm**: Tập trung mạnh vào các luồng suy nghĩ, cảm xúc nhất thời và phản ứng bản năng.

## 2. Tương tác Xã hội
- **Góc nhìn Chủ quan**: Các nhận xét về NPC phải mang tính cá nhân (Ví dụ: "Ánh mắt hắn khiến ta cảm thấy bất an", thay vì "Hắn là kẻ nguy hiểm").
- **Giao tiếp**: Phải giữ đúng vai vế và thái độ của nhân vật đối với từng đối tượng (Kính trọng, khinh thường, thân thiết).
    `.trim(),
    type: 'writing',
    enabled: false
};

export const WritingPerspectiveSecond: PromptStructure = {
    id: 'writing_perspective_second',
    title: 'Ngôi kể: Thứ hai (Bạn/Ngươi)',
    content: `
# Giao thức Ngôi kể: Ngôi kể thứ hai (Dẫn dắt & DM)

Giao thức này đặt người chơi làm trung tâm của mọi hành động, AI đóng vai trò như một người dẫn chuyện hoặc Quản trò (Dungeon Master).

## 1. Xưng hô và Chỉ dẫn
- **Xưng hô**: Gọi người chơi là "Bạn", "Ngươi", "Đại hiệp" hoặc "Đạo hữu". 
- **Mô tả Hành động**: Tập trung vào các hành động trực tiếp của người chơi và kết quả của chúng (Ví dụ: "Bạn vung kiếm...", "Ngươi cảm nhận được luồng linh lực cuồn cuộn...").
- **Xúc giác & Cảm giác**: Nhấn mạnh vào các cảm nhận vật lý ngay lập tức để tăng tính chân thực.

## 2. Gợi mở Tương tác
- **Câu hỏi dẫn dắt**: Sử dụng các câu hỏi ở cuối mô tả để thúc đẩy hành động: "Ngươi sẽ làm gì?", "Bạn có sẵn lòng đánh cược mạng sống?"
- **Bầu không khí**: Xây dựng bối cảnh xung quanh người chơi một cách sinh động để kích thích trí tưởng tượng.
    `.trim(),
    type: 'writing',
    enabled: true
};

export const WritingPerspectiveThird: PromptStructure = {
    id: 'writing_perspective_third',
    title: 'Ngôi kể: Thứ ba (Hắn/Y/Chàng/Nàng)',
    content: `
# Giao thức Ngôi kể: Ngôi kể thứ ba (Tiểu thuyết & Khách quan)

Giao thức này sử dụng văn phong của một tác giả viết truyện, quan sát mọi hành động từ bên ngoài.

## 1. Định danh và Khoảng cách
- **Xưng hô**: Gọi nhân vật chính bằng tên riêng hoặc các đại từ "Hắn", "Y", "Chàng", "Nàng", "Thiếu nữ".
- **Nhân vật phụ (NPC)**: Sử dụng danh xưng hoặc tên để phân biệt rõ ràng, tránh gây nhầm lẫn khi có nhiều người trong cùng một phân cảnh.

## 2. Chiều sâu Văn học
- **Góc nhìn Toàn tri (Omniscient)**: Có thể hé lộ một phần suy nghĩ của NPC hoặc các sự kiện đang diễn ra song song để tăng kịch tính.
- **Mô tả Cảnh vật**: Sử dụng bối cảnh thiên nhiên, thời tiết để phản chiếu nội tâm nhân vật hoặc tạo điềm báo.
- **Nhịp độ**: Kiểm soát nhịp độ câu chuyện qua các đoạn văn mô tả dài hoặc các câu thoại ngắn, sắc sảo.
    `.trim(),
    type: 'writing',
    enabled: false
};

export const WritingPerspectives = [
    WritingPerspectiveFirst,
    WritingPerspectiveSecond,
    WritingPerspectiveThird
];
