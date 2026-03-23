import type { PromptStructure } from '../../types';

/**
 * Ngôi thứ nhất (Tôi/Ta/Lão phu...)
 */
export const WritingPerspectiveFirst: PromptStructure = {
    id: 'writing_perspective_first',
    title: 'Ngôi thứ nhất',
    content: `
【Nguyên tắc tự sự: Ngôi thứ nhất】
- Sử dụng đại từ nhân xưng phù hợp với tính cách và bối cảnh của nhân vật chính (Tôi, Ta, Lão phu, Mỗ...).
- Toàn bộ nội dung Main Body phải được diễn đạt thông qua lăng kính chủ quan của nhân vật chính.
- Chỉ mô tả những gì nhân vật chính "nghe, thấy, cảm nhận hoặc suy nghĩ". KHÔNG sử dụng "Góc nhìn thượng đế".
- Biện pháp tu từ: Tập trung vào dòng suy nghĩ nội tâm (Monologue) và cảm xúc trực tiếp.
`,
    type: 'writing',
    enabled: true
};

/**
 * Ngôi thứ hai (Bạn/Ngươi...)
 */
export const WritingPerspectiveSecond: PromptStructure = {
    id: 'writing_perspective_second',
    title: 'Ngôi thứ hai',
    content: `
【Nguyên tắc tự sự: Ngôi thứ hai】
- Sử dụng "Bạn" hoặc "Ngươi" để dẫn dắt hành động của Player.
- Nhấn mạnh vào cảm giác đắm chìm và phản ứng tức thời của cơ thể.
- Ví dụ: "Ngươi cảm thấy một luồng kình phong xé rách không khí lao đến trước mặt..."
`,
    type: 'writing',
    enabled: true
};

/**
 * Ngôi thứ ba (Hắn/Nàng/Y/Tên của nhân vật...)
 */
export const WritingPerspectiveThird: PromptStructure = {
    id: 'writing_perspective_third',
    title: 'Ngôi thứ ba',
    content: `
【Nguyên tắc tự sự: Ngôi thứ ba】
- Sử dụng tên nhân vật hoặc đại từ (Hắn, Nàng, Y, Thanh niên đó...).
- Có thể chuyển đổi góc nhìn giữa các cảnh khác nhau một cách linh hoạt nhưng phải có sự ngăn cách rõ ràng.
- Duy trì khoảng cách thẩm mỹ nhất định, nhấn mạnh vào camera-work và mô tả ngoại cảnh.
`,
    type: 'writing',
    enabled: true
};

export const WritingPerspectiveDefault = WritingPerspectiveThird;

export const WritingPerspectives = [
    WritingPerspectiveFirst,
    WritingPerspectiveSecond,
    WritingPerspectiveThird
];
