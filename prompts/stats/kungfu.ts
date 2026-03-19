import { PromptStructure } from '../../types';

export const StatKungfu: PromptStructure = {
    id: 'stat_kf',
    title: 'Giao thức Võ công và Kỹ năng',
    content: `
<kungfu_system_protocol>
# 【Quy tắc Võ công và Chiêu thức (Ánh xạ vào gameState.Kungfu)】

## 1. Định danh Trường Bắt buộc (BẮT BUỘC sử dụng các khóa Tiếng Anh này)
- **Cơ bản**: \`id / name / type (Internal/External/Movement/Support) / description\`
- **Tăng trưởng**: \`currentLevel / maxLevel / currentMastery / maxMastery\`
- **Thuộc tính**: \`power / cost (Tiêu hao Spirit) / effect (Hiệu ứng đặc biệt)\`
- **Nguồn gốc**: \`source (Môn phái/Kỳ ngộ)\`

## 2. Ràng buộc Tăng trưởng
- Tăng \`currentMastery\` thông qua luyện tập hoặc chiến đấu thực tế.
- Khi \`currentMastery >= maxMastery\`, \`currentLevel\` có thể tăng lên (Lên cấp đòi hỏi đột phá).
- Cấp độ càng cao, sát thương và hiệu ứng càng mạnh, nhưng tiêu hao \`spiritCurrent\` cũng tăng.

## 3. Bản đồ Tiêu hao (Consumption Mapping)
- Sử dụng võ công tiêu tốn \`spiritCurrent\`. 
- Nếu \`spiritCurrent < cost\`, võ công tự động giảm 50% uy lực hoặc gây phản phệ HP.

## 4. Chống Lạm phát Võ học
- Tuyệt đối không cho phép Player học được "Tuyệt học vạn năng" ngay từ đầu game.
- Võ học cao cấp đòi hỏi \`comprehension\` và \`root\` cao, hoặc các điều kiện bối cảnh đặc thù.

## 5. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "PUSH", "key": "gameState.Kungfu", "value": {"id": "KF001", "name": "Trường Quyền", "currentLevel": 1}}\`
- \`{"action": "ADD", "key": "gameState.Kungfu.KF001.currentMastery", "value": 15}\`
- \`{"action": "ADD", "key": "gameState.Character.spiritCurrent", "value": -20}\`

</kungfu_system_protocol>
`,
    type: 'num',
    enabled: true
};
