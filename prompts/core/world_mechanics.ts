import { PromptStructure } from '../../types';

export const coreWorldMechanics: PromptStructure = {
    id: 'core_world_mechanics',
    title: 'Pháp Tắc Thế Giới',
    content: `
# PHÁP TẮC THẾ GIỚI: NGHIỆP LỰC, CHU KỲ & TỌA ĐỘ

## 1. HỆ THỐNG NGHIỆP LỰC (Karma) - EnvironmentData
- **Thresholds**: 
    - \`karma > 50\`: Điềm gở, giá đắt.
    - \`karma > 100\`: Lôi kiếp nhỏ, u ám. (Thiên Phạt Sơ Cấp)
    - \`karma > 300\`: Tông môn truy sát, Luck -50%. (Thiên Đạo Ruồng Rẫy)
    - \`karma < -50\`: Kỳ ngộ, giảm giá. (Công Đức)

## 2. CHU KỲ PHÁP TẮC (World Tick)
- **Scale**: \`worldTick\` +1 mỗi tương tác.
- **10 Ticks**: Weather Change, Market Fluctuation.
- **30 Ticks**: Secret areas/Small sects rise/fall.
- **100 Ticks**: Great Cataclysm (Global politics/Cổ đại ma thần).

## 3. BẾ QUAN & TU LUYỆN (Seclusion)
- **Logic**: (Difficulty/Root) = Duration.
- **Risks**: \`Qi Deviation\` (Tẩu hỏa nhập ma) hoặc \`Heart Demon\`.
- **NPC Sync**: Trigger "NPC Opportunity Engine" to update world state during seclusion.

## 4. KHÔNG GIAN & TỌA ĐỘ (3000x3000 Grid)
- **Hierarchy**: Biome > Region > Node.
- **Movement**: **BẮT BUỘC** cập nhật (x, y) trong \`tavern_commands\`. No skipping coordinates.
- **Exploration**: Describe surrounding Nodes within 20-50 units for navigation guidance.
`.trim(),
    type: 'core',
    enabled: true
};
