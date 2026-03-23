import { PromptStructure } from '../../types';

export const StatWorldEvolution: PromptStructure = {
    id: 'stat_world',
    title: 'Giao thức Tiến hóa Thế giới và Vận hành',
    content: `
<world_evolution_protocol>
# 【Quy tắc Tiến hóa Thế giới (Ánh xạ vào gameState.World & Environment)】

## 1. Cơ chế Thời gian (Tiếng Anh)
- **Cấu trúc**: \`gameState.World.time\` bao gồm \`Year / Month / Day / Hour / Minute\`.
- Mỗi lượt hành động thường tiêu tốn 15-30 phút tùy vào độ phức tạp của hành động.
- Các sự kiện định kỳ (Phiên chợ, Lễ hội, Đấu giá) dựa trên các mốc thời gian này.

## 2. Quy tắc Vận hành và Tác động
- **Lọc thông tin**: Chỉ cập nhật những thay đổi có tác động trực tiếp hoặc gián tiếp đến Player hoặc khu vực hiện tại.
- **Tiến hóa NPC**: Các NPC quan trọng không ở cùng Player vẫn có thể thăng cấp, đổi vị trí hoặc thay đổi trạng thái dựa trên sự kiện thế giới.
- **Thay đổi Bản đồ**: Cơ sở hạ tầng, sự phá hủy của chiến tranh, hoặc thay đổi chủ quyền của các môn phái.

## 3. Quản lý Sự kiện Thế giới
- \`worldEvents\`: Danh sách các sự kiện đang diễn ra (Chiến tranh, Thiên tai, Tin đồn).
- Mỗi sự kiện phải có: \`id / type / description / duration / intensity\`.

## 4. Hiệu ứng Môi trường (Tiếng Anh)
- **Trường dữ liệu**: \`gameState.Environment.weather\` (Thời tiết), \`gameState.Environment.temperature\` (Nhiệt độ).
- Ảnh hưởng trực tiếp đến HP/MP hoặc độ khó của các hành động (Ví dụ: Trời mưa giảm độ chính xác của ám khí).

## 5. Phán định Tầm nhìn và Thông tin
- Player chỉ biết những gì xảy ra tại vị trí hiện tại hoặc thông qua tin đồn (\`rumors\`).
- Hệ thống phải cập nhật \`shortTermMemory\` của thế giới để duy trì tính nhất quán của lịch sử.

## 6. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "SET", "key": "gameState.Environment.weather", "value": "Bão Tuyết"}\`
- \`{"action": "ADD", "key": "gameState.World.time.Hour", "value": 2}\`
- \`{"action": "PUSH", "key": "gameState.World.worldEvents", "value": {"id": "EV001", "description": "Ma giáo tấn công Thanh Vân Môn"}}\`

</world_evolution_protocol>
`,
    type: 'num',
    enabled: true
};
