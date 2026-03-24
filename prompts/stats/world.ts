import { PromptStructure } from '../../types';

export const StatWorldEvolution: PromptStructure = {
    id: 'stat_world',
    title: 'Giao thức Tiến hóa Thế giới và Vận hành',
    content: `
<world_evolution_protocol>
# 【Quy tắc Tiến hóa Thế giới (Ánh xạ vào gameState.World & Environment)】

## 1. Cấu trúc Thế giới 3-9-81 (CỐ ĐỊNH)
- **3 Đại Địa (Regions)**:
    - **Bắc Đảo**: Tuyết phủ, dãy núi cao, hang băng. (Coordinates: Around y < -500)
    - **Nam Lục**: Bình nguyên xích đạo, hoang mạc. (Coordinates: Around y > 500)
    - **Đông Hải**: Quần đảo ven biển, vực sâu. (Coordinates: Around x > 500)
- **9 Thành Phố (Cities)**: 3 thành mỗi vùng (Thanh Vân, Hàn Băng, Vô Kỵ; Xích Hỏa, Hoàng Sa, Lâm Hải; Vạn Đảo, Hải Long, Lưu Ly).
- **81 Địa Điểm (Locations)**: 9 địa điểm mỗi thành (Miếu, Tửu Lâu, Võ Đường, Hang Động, v.v.).

## 2. Cơ chế Thời gian
- **Cấu trúc**: \`gameState.World.time\` theo định dạng \`YYYY:MM:DD:HH:MM\`.
- Mỗi lượt hành động thường tiêu tốn 15-30 phút.

## 3. Quy tắc Vận hành và Tác động
- **Dịch chuyển**: Khi Player di chuyển, tọa độ \`gameState.World.coordinate\` phải được cập nhật tương ứng với các địa điểm trong hệ thống 3-9-81.
- **Tiến hóa NPC**: NPC tại 81 địa điểm này có lịch trình và sự kiện riêng.

## 4. Quản lý Sự kiện Thế giới
- \`worldEvents\`: Danh sách các sự kiện (Chiến tranh, Thiên tai, Tin đồn) diễn ra tại các tọa độ cụ thể.

## 5. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "SET", "key": "gameState.Environment.majorLocation", "value": "Thanh Vân Thành"}\`
- \`{"action": "SET", "key": "gameState.World.coordinate", "value": "-1000,-1000"}\`
- \`{"action": "SET", "key": "gameState.Environment.time", "value": "2026:03:24:08:30"}\`

</world_evolution_protocol>
`,
    type: 'num',
    enabled: true
};
