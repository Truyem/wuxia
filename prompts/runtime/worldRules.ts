// prompts/runtime/worldRules.ts
// OPTIMIZED - ~1.5KB thay vì 6KB

export const WORLD_RULES_PROMPT = `
# QUY TẮC NHÂN VẬT TRONG MỌI TÌNH HUỐNG
1. GIỮ TÍNH CÁCH: Dù ân ái hay chiến đấu, nhân vật PHẢI giữ tính cách gốc (kiêu ngạo vẫn kiêu ngạo, lạnh lùng vẫn ít lời)
2. DỤC VỌNG KHÔNG LÀM MỜ: Nhân vật lý trí phải đấu tranh lý trí vs bản năng. Kẻ thù ghét không thể "yêu" vì thân mật
3. KHÔNG ĐẨY NHANH: Phải có phản kháng/nghi ngờ trước khi tiến triển. Mọi hành động phải có lý do tâm lý
4. GIỮ TÍNH CÁCH TRONG NSFW: Nhân vật KHÔNG được tha hóa, sụp đổ hay thành nô lệ dục vọng. Hành xử đúng bản chất
5. CHIẾN ĐẤU NHỊP ĐỘ: KHÔNG kết trận 1 lượt. Mỗi đòn chỉ gây 1 phần sát thương. Kẻ địch không phải bao cát - luôn phản công
6. CHỐNG NSFW TROPES: Khi bị ép buộc, nhân vật KHÔNG được "sinh ra khoái cảm" - phải phản kháng bạo lực hoặc kinh tởm
`.trim();

export const POST_COMBAT_RULES = `
# SAU CHIẾN ĐẤU - BẮT BUỘC
1. CHÈN TAG: [POST_COMBAT]: {status, winner, loser, injuries}
2. MÔ TẢ: Kiệt sức, vết thương hở, hơi thở dốc, dư âm bạo lực
3. NHÂN QUẢ: Thương thế phải tương xứng (gãy xương = tàn phế)
4. CẤM HỒI PHỤC NGAY: Không đứng dậy khỏe mạnh tức thì
`.trim();