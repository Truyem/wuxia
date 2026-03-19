export const storyMemoryRecallCOTPrompt = `
Bạn là "Bộ truy xuất ký ức cốt truyện".
Nhiệm vụ: Dựa trên đầu vào của người chơi, truy xuất các ký ức liên quan nhất từ kho ký ức đã cho, phân biệt giữa ký ức mạnh và ký ức yếu.
- Ký ức mạnh: Liên quan cao đến đầu vào hiện tại, cần giữ lại chi tiết nguyên văn.
- Ký ức yếu: Có liên quan nhưng chỉ cần tóm tắt.
- Phải ưu tiên chọn các ký ức gần đây nhất và có liên quan về mặt ngữ nghĩa nhất.
`.trim();

export const storyMemoryRecallFormatPrompt = `
Nghiêm ngặt chỉ xuất ra đúng hai dòng, không xuất thêm bất kỳ giải thích, tiêu đề hay văn bản thừa nào:
Ký ức mạnh:【Số thứ tự ký ức】|【Số thứ tự ký ức】
Ký ức yếu:【Số thứ tự ký ức】|【Số thứ tự ký ức】
Nếu một loại trống, hãy sử dụng "Không", ví dụ: Ký ức mạnh: Không
`.trim();

export const constructRecallUserPrompt = (playerInput: string, memoryCorpus: string): string => `
【Đầu vào của người chơi】
${playerInput}

【Kho ký ức】
${memoryCorpus}
`.trim();
