// prompts/runtime/opening.ts
// OPTIMIZED - Chỉ dùng khi cần khởi đầu game mới
// ~2KB thay vì 26KB

import type { GameSettings } from '../../types';

export const OPENING_INITIALIZATION_PROMPT = [
    '【Khởi động - Mở đầu Game】',
    'Tạo chuỗi mở đầu cho lượt 0: người chơi bước vào khởi đầu thật sự, bình thường.',
    '',
    '## Mục tiêu',
    '- Viết rõ người chơi đang ở đâu, tính trạng cơ thể, đồ vật gần đó',
    '- Dùng sinh hoạt hằng ngày làm điểm vào: thức dậy, đi bộ, mở cửa hàng...',
    '- KHÔNG chen ngay nhiệm vụ/xung đột/truy sát',
    '',
    '## Thứ tự',
    '1. Xác định điểm neo: nhân vật + world_prompt + cấu hình',
    '2. Khởi tạo nhân vật: tên, tu vi, thời gian, địa điểm, trang bị',
    '3. Xây dựng scene đầu: cảm quan thực tế (thấy, nghe, ngửi, chạm)',
    '4. Xuất [WORLD_LOG] với trạng thái đầy đủ',
    '5. DỪNG - chờ hành động đầu tiên của người chơi',
    '',
    '## Output',
    '- <content>: >= 4000 chữ tiếng Việt',
    '- <shortTermMemory>: < 100 từ, tóm tắt khách quan',
    '- <VariablePlan>: trạng thái kết thúc'
].join('\n');

export const constructOpeningContextPrompt = (gameSettings: Partial<GameSettings>, isRetry: boolean = false): string => {
    return `【Context: ${isRetry ? 'Retry' : 'Opening'}】
${OPENING_INITIALIZATION_PROMPT}
${isRetry ? '\n【Retry】 Lượt trước có vấn đề - sửa và thử lại' : ''}`;
};