// prompts/core/index.ts
// OPTIMIZED - Giữ essential rules only, ~3KB total

import { PromptStructure } from '../../types';

export const Core_OutputFormat: PromptStructure = {
    id: 'core_format',
    title: 'Output Format',
    content: `<OUTPUT FORMAT>
# JSON: {logs:[{sender,text}], tavern_commands:[], shortTerm:""}
# logs: Background hoặc Tên NPC, KHÔNG trộn
# MÔ TẢ: >= 4000 chữ
# Cấm: số RPG trong văn bản (VD: "mất 50 HP")
`.trim(),
    type: 'core',
    enabled: true
};

export const CoreRules: PromptStructure = {
    id: 'core_rules',
    title: 'Quy tắc',
    content: `<QUY TẮC>
# Thế giới tự vận hành - NPC có cuộc sống riêng
# Chiến đấu nguy hiểm - 1 đòn chí mạng có thể chết
# Mọi hành động có nhân quả
# Thời gian trôi theo hành động
`.trim(),
    type: 'core',
    enabled: true
};

export const coreStoryProgression: PromptStructure = {
    id: 'core_story',
    title: 'Cốt truyện',
    content: `<CỐT TRUYỆN>
# Chapters → Foreshadowing → Current
# Update story.states sau mỗi sự kiện lớn
`.trim(),
    type: 'core',
    enabled: true
};

export const coreTimeProgression: PromptStructure = {
    id: 'core_time',
    title: 'Thời gian',
    content: `<THỜI GIAN>
# Quan sát: 5-15p | Giao tiếp: 30-60p | Di chuyển: 30p-4h | Chiến đấu: 5-30p | Tu luyện: 4-8h
# Cập nhật time mỗi hành động
`.trim(),
    type: 'core',
    enabled: true
};

export const CoreActionOptions: PromptStructure = {
    id: 'core_actions',
    title: 'Actions',
    content: `<HÀNH ĐỘNG>
# Di chuyển, Chiến đấu, Giao tiếp, Tu luyện, Nghỉ ngơi, Khám phá
`.trim(),
    type: 'core',
    enabled: true
};

export const coreMemoryLaws: PromptStructure = {
    id: 'core_memory',
    title: 'Memory',
    content: `<MEMORY>
# instantMemory: Đang diễn ra
# shortTermMemory: 1-3 ngày
# midTermMemory: 1-3 tháng  
# longTermMemory: Quan trọng
`.trim(),
    type: 'core',
    enabled: true
};

export const CoreChainOfThought: PromptStructure = {
    id: 'core_cot',
    title: 'CoT',
    content: `<CHAIN OF THOUGHT>
# t_input: INPUT # t_plan: KẾ HOẠCH # t_state: TRẠNG THÁI
# t_branch: NHÁNH # t_precheck: KIỂM TRA TRƯỚC # t_logcheck: LOG # t_opts: TÙY CHỌN
`.trim(),
    type: 'core',
    enabled: true
};

export const CoreChainOfThoughtMulti: PromptStructure = {
    id: 'core_cot_multi',
    title: 'Multi CoT',
    content: `<MULTI COT>
# t_input # t_plan # t_state # t_branch # t_precheck # t_logcheck # t_mem # t_opts
`.trim(),
    type: 'core',
    enabled: true
};

export const coreNpcFate: PromptStructure = {
    id: 'core_npc_fate',
    title: 'NPC Fate',
    content: `<NPC FATE>
# Cơ duyên: Vi Mạt(01-40), Phổ Thông(41-75), Trọng Đại(76-95), Nghịch Thiên(96-100)
`.trim(),
    type: 'core',
    enabled: true
};

export const coreUserFate: PromptStructure = {
    id: 'core_user_fate',
    title: 'User Fate',
    content: `<USER FATE>
# Player có fate đặc biệt: thiên tài, truyền nhân, nghịch thiên
# Random d100 khi đạt realm mới
`.trim(),
    type: 'core',
    enabled: true
};

export const coreWorldMechanics: PromptStructure = {
    id: 'core_world_mechanics',
    title: 'World',
    content: `<WORLD>
# Tiền tệ: Vàng (1 lượng = 1000 đồng)
# Kinh nghiệm: sát thương + đột phá + quest
# Sect: đóng góp → chức vị → quyền lực
`.trim(),
    type: 'core',
    enabled: true
};

export const CoreAncientRealism: PromptStructure = {
    id: 'core_realism',
    title: 'Realism',
    content: `<REALISM>
# HP bộ phận: đầu, ngực, bụng, tay, chân
# Thương tích ảnh hưởng vĩnh viễn
# Kiệt sức → không chiến đấu được
`.trim(),
    type: 'core',
    enabled: true
};

export const PostCombatRules: PromptStructure = {
    id: 'core_post_combat',
    title: 'Sau chiến đấu',
    content: `<SAU CHIẾN ĐẤU>
# Thưởng: Exp, Vàng, Item, Kungfu
# Thương tích: cần thời gian hồi
# NPCs phản ứng với hành vi
`.trim(),
    type: 'core',
    enabled: true
};

export const Core_OutputFormat_MultiThought: PromptStructure = {
    id: 'core_format_multi',
    title: 'Multi Thought',
    content: `<OUTPUT FORMAT>
# JSON: {logs:[{sender,text}], tavern_commands:[], shortTerm:""}
# logs: Background hoặc Tên NPC, KHÔNG trộn
# MÔ TẢ: >= 4000 chữ
# Cấm: số RPG trong văn bản
# Multi: Phân tích nhiều hướng
`.trim(),
    type: 'core',
    enabled: true
};

// Export for prompts/index.ts
const CorePrompts = {
    Core_OutputFormat,
    CoreRules,
    coreStoryProgression,
    coreTimeProgression,
    CoreActionOptions,
    coreMemoryLaws,
    CoreChainOfThought,
    CoreChainOfThoughtMulti,
    coreNpcFate,
    coreUserFate,
    coreWorldMechanics,
    CoreAncientRealism,
    PostCombatRules,
    Core_OutputFormat_MultiThought
};

export default CorePrompts;