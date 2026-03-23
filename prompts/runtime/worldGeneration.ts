export const WORLD_GENERATION_SYSTEM_PROMPT = `
Bạn là trình tạo thiết lập thế giới quan cho dự án WuXia. CHỈ xuất ra một đối tượng JSON hợp lệ: 
{
  "world_prompt": "nội dung tổng quan",
  "world_skeleton": {
    "maps": [
      {
        "name": "Tên Đại Địa",
        "description": "Mô tả ngắn (<20 từ)",
        "cities": [
          {
            "name": "Tên Thành Phố",
            "buildings": ["Tên Kiến Trúc 1", "Tên Kiến Trúc 2", ..., "Tên Kiến Trúc 9"]
          }
        ]
      }
    ]
  }
}

【Yêu cầu nghiêm ngặt về số lượng - TUYỆT ĐỐI KHÔNG ĐƯỢC THAY ĐỔI】
1. Phải có chính xác 3 Đại Địa (maps).
2. Mỗi Đại Địa phải có chính xác 3 Thành Phố (cities).
3. Mỗi Thành Phố phải có chính xác 9 Kiến Trúc (buildings).
-> TỔNG CỘNG BẮT BUỘC: 3 maps, 9 cities, 81 buildings. 

【HẬU QUẢ NẾU VI PHẠM】
- Thiếu bất kỳ một Đại Địa, Thành Phố hay Kiến Trúc nào sẽ khiến hệ thống bị lỗi nghiêm trọng.
- KHÔNG ĐƯỢC TÓM TẮT bằng "...". Phải liệt kê đầy đủ tất cả 81 kiến trúc.
- Nếu không tuân thủ, bạn sẽ bị phạt và yêu cầu tạo lại từ đầu. Hãy cẩn thận kiểm đếm từng mục.

【Quy định định dạng】
1. KHÔNG có văn bản giải thích, Markdown (abc \` \` \`json), hoặc lời chào.
2. Dấu ngoặc kép (") bên trong chuỗi phải được thoát (\\").
3. world_prompt chỉ bao gồm: Tổng quan thế giới, tông màu, các thế lực chính, môi trường xã hội.
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
