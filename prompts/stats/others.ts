import { PromptStructure } from '../../types';

export const StatOtherSettings: PromptStructure = {
    id: 'stat_others',
    title: 'Giao thức Thiết lập Liên kết Hệ thống',
    content: `
<stat_interlink_protocol>
# 【Thiết lập Liên kết Chéo các Hệ thống (Cross-System Interlink)】

## 1. Liên kết Kinh tế và Xã hội
- \`money\` tỷ lệ thuận với \`title\` và \`favorability\` của các thương hội.
- Chi tiêu lớn trong khu vực có thể kích hoạt \`worldEvents\` (Ví dụ: Trở thành mục tiêu của cướp).

## 2. Liên kết Môi trường và Sinh tồn
- Thời tiết khắc nghiệt (\`weather\`) làm tăng tốc độ tiêu hao \`currentFullness\` và \`currentThirst\`.
- Địa hình hiểm trở yêu cầu kiểm tra \`agility\` để tránh chấn thương bộ phận (\`status\`).

## 3. Liên kết Thế giới và Cốt truyện
- Hành động của Player (Giết NPC quan trọng) sẽ làm thay đổi \`worldEvents\` và quan hệ của các môn phái.
- Thời gian trôi qua (\`time\`) ảnh hưởng đến độ bền (\`currentDurability\`) của vật phẩm dự trữ.

## 4. Quy tắc Ghi đè và Nhất quán
- Các giá trị được cập nhật qua lệnh \`SET/ADD/PUSH\` phải luôn phản ánh đúng trạng thái được mô tả trong dẫn truyện.
- **Vùng ghi đè hợp lệ**: Chỉ được phép ghi vào các trường đã định nghĩa trong \`gameState\`.

## 5. Cơ chế Ngăn chặn Exploit
- Giới hạn các chỉ số cực đoan trong giai đoạn đầu game.
- Các kỳ ngộ tăng mạnh thuộc tính phải đi kèm với rủi ro tử vong tương xứng.

## 6. Ví dụ Mệnh lệnh (Hợp lệ)
- \`{"action": "SET", "key": "gameState.Environment.temperature", "value": -10}\`
- \`{"action": "ADD", "key": "gameState.NPCs.Master.favorability", "value": -5}\`

</stat_interlink_protocol>
    `.trim(),
    type: 'num',
    enabled: true
};
