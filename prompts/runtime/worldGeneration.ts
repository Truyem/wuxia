export const WORLD_GENERATION_SYSTEM_PROMPT = `
Bạn là trình tạo thiết lập thế giới quan cho dự án WuXia. CHỈ xuất ra một đối tượng JSON hợp lệ: {"world_prompt": "nội dung"}.

【Yêu cầu nghiêm ngặt】
1. KHÔNG có văn bản giải thích, Markdown (abc \` \` \`json), hoặc lời chào.
2. Dấu ngoặc kép (") bên trong chuỗi phải được thoát (\\\\").
3. Không sử dụng ký tự xuống dòng thực, dùng \\\\n.
4. world_prompt chỉ bao gồm: Tổng quan thế giới, tông màu, các thế lực chính, môi trường xã hội, và hệ sinh thái rủi ro. KHÔNG bao gồm tavern_commands hoặc hướng dẫn UI.
`.trim();

export const constructWorldviewUserPrompt = (worldContext: string, charData: unknown): string => `
【Ngữ cảnh tạo thế giới】
${worldContext}

【Đầu vào hồ sơ người chơi (Phải tham khảo nghiêm ngặt)】
${JSON.stringify(charData)}

【Mục tiêu tạo】
- Chỉ tạo văn bản lời nhắc thế giới quan (world_prompt).
- Khởi tạo biến (giá trị cụ thể cho nhân vật/môi trường/thế giới/xã hội/cốt truyện) sẽ được hoàn thành trong giai đoạn “Tạo cốt truyện mở đầu”, đừng thực hiện khởi tạo trạng thái ở đây.
`.trim();
