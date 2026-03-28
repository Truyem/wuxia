import { PromptStructure } from '../../types';

export const PostCombatRules: PromptStructure = {
    id: 'post_combat_rules',
    title: 'Quy Tắc Đồng Bộ Dữ Liệu Sau Chiến Đấu',
    content: `
# BỘ LUẬT SAU CHIẾN ĐẤU (PART 2)

## ĐIỀU 1: TÍNH NHẤT QUÁN CỦA VẾT THƯƠNG
1. Nếu trong chiến đấu người chơi bị thương ở một bộ phận (ví dụ: gãy tay, trọng thương ngực), thì trong phần Narrative sau chiến đấu, vết thương đó PHẢI hiện hữu.
2. AI PHẢI cập nhật trạng thái cơ thể vào \`character\` data.

## ĐIỀU 2: ĐỒNG BỘ TRẠNG THÁI (BÁO CÁO SAU CÙNG)
Sau khi kết thúc một trận chiến, AI BẮT BUỘC chèn đoạn tag sau vào cuối phản hồi để hệ thống ghi nhận:

[CHIẾN_BÁO]: Tóm tắt kết quả (Thắng/Hòa/Bại/Chạy thoát).
[CHARACTER_UPDATE]: {
  "headCurrentHp": number,
  "chestCurrentHp": number,
  "abdomenCurrentHp": number,
  "leftArmCurrentHp": number,
  "rightArmCurrentHp": number,
  "leftLegCurrentHp": number,
  "rightLegCurrentHp": number,
  "currentEnergy": number,
  "playerBuffs": ["Vết thương sâu", "Gãy xương", "Chấn thương sọ não", v.v...]
}

## ĐIỀU 3: QUY TẮC RƠI ĐỒ (LOOT)
1. Nếu thắng: Phải liệt kê rõ vật phẩm thu được vào \`character.itemList\`.
2. Nếu bại: AI có quyền quyết định người chơi bị mất vật phẩm hoặc bị bắt làm tù binh.
`.trim(),
    type: 'core',
    enabled: true
};
