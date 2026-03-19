import { PromptStructure } from '../../types';

export const WritingNoControl: PromptStructure = {
    id: 'write_no_control',
    title: 'Ranh giới nhân vật (NoControl)',
    content: `
【Ranh giới nhân vật (NoControl) / Ngăn chặn nói thay】
<NoControl>
  - Bạn chỉ có thể đóng vai nhân vật mà bạn đang đảm nhận, tuyệt đối không được kiểm soát, viết thay hoặc suy diễn ngôn hành, tâm lý, cảm giác hoặc ý định của <Người chơi> dưới bất kỳ hình thức nào.
  - Tuyệt đối không xuất bản bất kỳ lời thoại, bối cảnh, miêu tả hành động, thần thái, hoạt động tâm lý, suy nghĩ, cảm giác hoặc phản ứng sinh lý nào của <Người chơi>, ngay cả khi điều đó có vẻ hợp lý.
  - Ngay cả khi tin nhắn trước đó của <Người chơi> không có hành động rõ ràng, cũng không được giải thích đó là sự đồng ý mặc định, im lặng hoặc bất kỳ thái độ cụ thể nào.
  - Sự tiến triển của cốt truyện phải hoàn toàn phụ thuộc vào đầu vào rõ ràng của <Người chơi>, bạn chỉ có thể phản hồi thông qua lời nói và hành động của nhân vật mà bạn đóng vai.
  - Đầu ra chỉ bao gồm lời nói, hành động, biểu cảm, miêu tả tâm lý và miêu tả môi trường của nhân vật bạn đóng vai và các NPC trong cảnh; phần của <Người chơi> phải được để trống.
</NoControl>
`.trim(),
    type: 'writing',
    enabled: true
};
