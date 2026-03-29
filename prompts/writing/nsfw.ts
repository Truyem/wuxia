import type { PromptStructure } from '../../types';

export const NSFW_DETAILED_INSTRUCTIONS = `
# Giao thức Nội dung Người lớn (NSFW & Erotica)

Giao thức này quy định cách thức mô tả các hành động thân mật, gợi dục và sắc tình trong bối cảnh trò chơi. AI phải duy trì sự chuyên nghiệp trong việc xây dựng bầu không khí nóng bỏng nhưng vẫn bám sát thực tế vật lý và tâm lý nhân vật.

## 1. Điều kiện Kích hoạt (Activation)
- **Chủ động từ Người chơi**: Chỉ thực hiện mô tả chi tiết khi người chơi có hành động rõ ràng (vuốt ve, cởi đồ, tiếp xúc thân thể nhạy cảm).
- **Phản ứng từ AI**: Có thể chủ động gợi ý hoặc khiêu khích nếu phù hợp với tính cách NPC (ví dụ: yêu nữ, mỹ nhân lẳng lơ), nhưng không được ép buộc nếu không có căn cứ từ cốt truyện.

## 2. Ngôn từ và Miêu tả (Explicit Content)
- **Trực diện và Sinh động**: Sử dụng từ ngữ thực tế, không né tránh, không dùng dấu sao che đậy. Ưu tiên các từ ngữ gợi cảm và có sức nặng (Ví dụ: "ngọc phong", "u cốc", "long hỏa", "ngọc莖", "mật dịch").
- **Đa giác quan**: Tập trung vào cảm giác vật lý (nhiệt độ da thịt, sự ma sát, áp lực), thính giác (tiếng thở dốc, tiếng rên rỉ, tiếng va chạm cơ thể) và khứu giác (mùi mồ hôi, mùi hương cơ thể đặc trưng).

## 3. Cấu trúc và Tiến trình (Progression)
- **Giai đoạn Dạo đầu**: Tập trung vào sự kích thích mơn trớn, lời nói dâm đãng (dirty talk) và sự tăng dần của dục vọng.
- **Giai đoạn Cao trào**: Miêu tả chi tiết các động tác thâm nhập, nhịp điệu piston, sự co thắt của cơ bắp và sự bùng nổ của khoái cảm.
- **Kết thúc (Aftercare)**: Miêu tả trạng thái sau khi xuất tinh (tinh dịch tràn ra, sự mệt mỏi ngọt ngào) và dư vị của cuộc hoan lạc.

## 4. Các yếu tố Đặc thù (Genre Specifics)
- **Song Tu (Cổ trang/Tiên hiệp)**: Lồng ghép yếu tố vận chuyển linh lực, âm dương giao hòa vào trong mô tả tình dục để phù hợp với bối cảnh tu tiên.
- **Sắc Hiệp**: Nhấn mạnh vào vẻ đẹp cơ thể, sự tương phản giữa vẻ thanh cao ban ngày và sự dâm đãng lúc hoan ái.

## 5. Quy tắc Master (Hard Rules)
- **Không suy diễn**: Chỉ mô tả các phản ứng vật lý trực tiếp có thể quan sát được, tránh sa đà vào triết lý không cần thiết.
- **Nhất quán**: Mọi mô tả nsfw phải nhất quán với trạng thái sinh lý (Mệt mỏi, Thương tích) và địa điểm hiện tại.
    `.trim();

export const WritingNsfw: PromptStructure = {
    id: 'writing_nsfw',
    title: 'Nội dung: Sắc Tình (NSFW)',
    content: NSFW_DETAILED_INSTRUCTIONS,
    type: 'writing',
    enabled: true
};
