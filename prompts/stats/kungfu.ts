import { PromptStructure } from '../../types';

export const StatKungfu: PromptStructure = {
    id: 'stat_kf',
    title: 'Giao thức Võ công và Kỹ năng',
    content: `
# KUNGFU MASTER - WUXIA CHRONICLE
**Project:** Mặc Sắc Giang Hồ (Wuxia Chronicle)
**Category:** Martial Arts & Skill Growth
**Theme:** Discipline & Mastery

##  ATTRIBUTE MAPPING (SKILLS)
| Category | Growth Factor | Mastery Effect |
|:---|:---|:---|
| **External** | Luyện thể | Tăng damage vật lý, giảm delay |
| **Internal** | Thiền định | Tăng Energy Max, tăng hộ thể |
| **Movement** | Thân pháp | Tăng né tránh, tăng tầm di chuyển |
| **Support** | Tần suất dùng | Tăng hiệu quả buff, giảm cost |

##  GLOBAL LAWS: KUNGFU GROWTH
1. **Mastery Law**: \`currentProficiency\` tăng sau mỗi lần sử dụng thành công. Tuyệt đối không tăng cấp (currentLevel) mà không đủ Proficiency.
2. **Cost Reality**: Mọi chiêu thức phải tiêu tốn \`consumptionValue\` (Energy). Nếu cạn kiệt, nhân vật rơi vào trạng thái kiệt sức.
3. **Breakthrough**: Tại các cấp độ [3, 6, 9], yêu cầu người chơi thực hiện "Đột phá" (Phán đoán độ khó cao).
4. **Sect Identity**: Võ công môn phái phải có ID theo môn phái trong \`character.kungfuList\`.

##  STYLE GUIDELINES
- **Skill Usage**: Mô tả hoa mỹ, mang tính triết lý võ học (Như rồng bay, như nước chảy).
- **Impact Flow**: Tả cảm giác kình lực va chạm và phản ứng của đối thủ.

##  ANTI-PATTERNS (KUNGFU)
-  **One-Hit Wonder**: Không cho phép học chiêu thức cấp cao khi chưa đủ cảnh giới.
-  **Free Usage**: Không bỏ qua việc trừ \`character.currentEnergy\` sau khi dùng chiêu.
-  **Generic Keys**: Dùng các key không tồn tại như \`gameState.Kungfu\` (Dùng \`character.kungfuList\`).

##  PRE-DELIVERY CHECKLIST
- [ ] Lệnh \`ADD\` Proficiency đã được tính toán dựa trên mức độ khó của hành động.
- [ ] Lệnh \`SUB\` Energy đã được thực hiện chính xác.
- [ ] Trạng thái "Đột phá" được kích hoạt nếu đạt ngưỡng Level.
`.trim(),
    type: 'num',
    enabled: true
};

export const SkillExtractionPrompt: PromptStructure = {
    id: 'skill_extraction',
    title: 'Trích xuất Thông tin Võ học chuyên sâu',
    content: `
# KUNGFU EXTRACTION PROTOCOL
**Task:** Phân tích yêu cầu và tạo ra bộ võ học/kỹ năng tương ứng.

## INPUT FORMAT:
"Ta muốn sáng tạo một tầng võ công dựa trên sóng biển."

## EXTRACTION REQUIREMENTS:
1. **Type Classification**: Thuộc loại Internal (Nội công) hay External (Ngoại công)?
2. **Progression Path**: Thiết lập \`maxLevel\` và \`maxMastery\` phù hợp với độ hiếm.
3. **Power Scaling**: Định giá \`power\` và \`cost\` theo sự cân bằng của game.
4. **Lore Integration**: Viết 1 đoạn description ngắn gọn mang tính kiếm hiệp.

## OUTPUT FORMAT:
Trả về đối tượng JSON với cấu trúc chuẩn của \`gameState.Kungfu\`.
`.trim(),
    type: 'custom',
    enabled: true
};
