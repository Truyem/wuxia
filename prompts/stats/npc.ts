import { PromptStructure } from '../../types';

export const StatNpcReference: PromptStructure = {
    id: 'stat_npc',
    title: 'Giao thức Thuộc tính NPC',
    content: `
<npc_attribute_protocol>
# 【Quy tắc Dữ liệu NPC (Ánh xạ vào gameState.NPCs)】

## 1. Định danh Trường Bắt buộc (BẮT BUỘC sử dụng các khóa Tiếng Anh này)
- **Cơ bản**: \`id / name / gender / age / title / realm\`
- **Trạng thái**: \`currentHp / maxHp / status\`
- **Vị trí**: \`currentLocation (ID Map) / isPresent (Boolean)\`
- **Quan hệ**: \`favorability (-100 đến 100) / relationStatus (Kẻ thù/Người lạ/Bạn bè/Tri kỷ...)\`
- **Chiến đấu**: \`combatPower (Chỉ số sức mạnh tổng hợp)\`
- **Ghi nhớ**: \`shortTermMemory (Tóm tắt các tương tác gần đây)\`

## 2. Phần mở rộng Teammate (Nếu là đồng đội)
- Nếu NPC trong \`gameState.Party\`, sử dụng các trường tương tự như Player:
- \`skillList (Mảng các ID kỹ năng) / equipment (Đối tượng trang bị)\`

## 3. Logic Hiện diện và Tương tác
- Nếu \`isPresent\` là false, NPC không thể tham gia đối thoại trực tiếp hoặc chiến đấu tại vị trí hiện tại của Player.
- Thay đổi \`favorability\` phải dựa trên: quà tặng, lựa chọn đối thoại, hành động giúp đỡ/hại, hoặc sự kiện thế giới.
- \`relationStatus\` tự động cập nhật khi \`favorability\` vượt qua các ngưỡng cột mốc.

## 4. Tính toán Sức mạnh Chiến đấu (Combat Power)
- Dựa trên \`realm\`, \`equipment\`, và \`skillList\`.
- Được sử dụng làm căn cứ cho logic "Trốn chạy/Chiến đấu/Đàm phán" của AI.

## 5. Quy tắc Nhất quán Xã hội
- NPC ghi nhớ các hành động của Player trong \`shortTermMemory\`. 
- Nếu Player giết người thân của NPC, \`favorability\` phải giảm mạnh và \`relationStatus\` chuyển thành "Tử thù".
- Hành vi của NPC phải nhất quán với \`personality\` và \`identity\` đã định nghĩa.

## 6. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "SET", "key": "gameState.NPCs.NPC001.favorability", "value": 15}\`
- \`{"action": "SET", "key": "gameState.NPCs.NPC001.relationStatus", "value": "Bằng hữu"}\`
- \`{"action": "SET", "key": "gameState.NPCs.NPC001.isPresent", "value": true}\`
- \`{"action": "ADD", "key": "gameState.NPCs.NPC001.currentHp", "value": -40}\`

</npc_attribute_protocol>
`,
    type: 'num',
    enabled: true
};
