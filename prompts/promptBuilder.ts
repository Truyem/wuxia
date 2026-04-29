// prompts/promptBuilder.ts
// Hệ thống build prompt tối ưu - Giữ tổng < 40k ký tự mỗi lượt
// Tách: Core (1 lần) | Runtime (mỗi lượt)

export interface PromptStructure {
    id: string;
    title: string;
    content: string;
    type?: string;
    enabled?: boolean;
}

export interface RuntimeContext {
    gameState?: any;
    userInput?: string;
    history?: any[];
    shortTerm?: string;
}

// ─────────────────────────────────────────────────────────
// CORE PROMPTS: Chỉ chạy 1 lần lúc khởi động - nén gọn
// ~15k ký tự
// ─────────────────────────────────────────────────────────
const CORE_PROMPTS: PromptStructure[] = [
    {
        id: 'core_format',
        title: 'Output Format',
        content: `<OUTPUT FORMAT>
# Response: JSON {logs:[{sender,text}], tavern_commands:[], ...}
# logs: [{sender:"Background/NPC name", text:"..."}]
# tavern_commands: [{action:"SET"|"PUSH"|"ADD"|"DELETE",key:"path",value:x}]
# Constraints: JSON ONLY, no extra text
# MÔ TẢ: Tổng output >= 4000 chữ
`.trim(),
        enabled: true
    },
    {
        id: 'core_rules',
        title: 'Quy tắc',
        content: `<QUY TẮC>
# Thế giới tự vận hành - NPC có cuộc sống riêng
# Chiến đấu nguy hiểm - 1 đòn trúng chí mạng có thể chết
# Mọi hành động có nhân quả - Thời gian trôi theo hành động
`.trim(),
        enabled: true
    },
    {
        id: 'stat_char',
        title: 'Thuộc tính Nhân vật',
        content: `<THUỘC TÍNH NHÂN VẬT>
# Sáu Thuộc tính: Lực, Nhanh, Thể chất, Căn cốt, Ngộ tính, May mắn
# Nội lực (Qi): Dùng thi triển võ công - Hết giảm lực chiến
# Tinh lực (Stamina): Di chuyển, lao động, chiến đấu
# HP: 7 bộ phận (Đầu Ngực Bụng TayChânTrái TayChânPhải) - 0 = Chết/Tàn phế
# Cập nhật qua tavern_commands: {action:"SET"|"ADD",key:"gameState.Character.xxx",value:y}
`.trim(),
        enabled: true
    },
    {
        id: 'stat_combat',
        title: 'Chiến đấu',
        content: `<CHIẾN ĐẤU>
# Tấn công: Lực + Nhanh + Vũ khí - Phòng thủ = Sát thương
# Né tránh: Nhanh + Căn cốt + Tu vi
# Chí mạng: Ngộ tính + May mắn (x2 sát thương)
# HP bộ phận < 35% = Trọng thương, < 60% = Khinh thương
# Hết Tinh lực hoặc Nội lực = Chiêu biến dạng, giảm uy lực
`.trim(),
        enabled: true
    },
    {
        id: 'diff_game',
        title: 'Độ khó Dễ Thở',
        content: `<ĐỘ KHÓ: DỄ THỞ>
# Thích hợp Tân thủ
# HP địch: x0.95, Sát thương địch: x0.96
# EXP: x1.12, Rơi đồ: x1.15, Tiêu hao Tinh lực: x0.88
# Hảo cảm NPC dễ tăng, sai lầm nhỏ được tha thứ
`.trim(),
        enabled: true
    },
    {
        id: 'diff_phys',
        title: 'Sinh Lý Dễ Thở',
        content: `<SINH LÝ: DỄ THỞ>
# Đói/Khát giảm x0.85
# Nhiễm trùng mức trung bình, tự khỏi nếu nghỉ ngơi
# Cấm đánh nhau 3 ngày không ăn uống
`.trim(),
        enabled: true
    },
    {
        id: 'writing_style',
        title: 'Phong cách Viết',
        content: `<VĂN PHONG: CỔ LONG>
# Câu văn ngắn gọn, sắc bén - Tĩnh/Động/Tĩnh
# Show Don't Tell: Tả hành động/cảm giác, không statedirectly "cảm thấy buồn"
# Đ���i thoại NPC: Ngắn, hiểm, ẩn ý - Cấm dài dòng đạo lý
# Cấm: số liệu RPG trong văn bản (VD: "mất 50 HP"), tiên hiệp slang
`.trim(),
        enabled: true
    },
    {
        id: 'json_constraint',
        title: 'JSON Constraint',
        content: `【Hệ thống: Trả về JSON hợp lệ với logs, shortTerm, tavern_commands. Không text ngoài JSON.】
[SYSTEM: JSON OUTPUT ONLY - Chỉ respond valid JSON, không error message]
`.trim(),
        enabled: true
    }
];

// Tính độ dài core
const CORE_LENGTH = CORE_PROMPTS.reduce((sum, p) => sum + p.content.length, 0);
console.log(`[PromptBuilder] Core: ${CORE_LENGTH} ký tự (${CORE_PROMPTS.length} modules)`);

// ─────────────────────────────────────────────────────────
// BUILD RUNTIME PROMPT: Mỗi lượt + context/user input
// Target: < 40k ký tự
// ─────────────────────────────────────────────────────────
export function buildRuntimePrompt(context: RuntimeContext): string {
    const parts: string[] = [];
    
    // 1. CORE PROMPTS (~8k)
    parts.push(`[SYSTEM: CORE]\n${CORE_PROMPTS.map(p => p.content).join('\n\n')}`);
    
    // 2. CONTEXT - Lấy tối thiểu (~3k)
    const contextPrompt = buildContextPrompt(context);
    parts.push(`[SYSTEM: CONTEXT]\n${contextPrompt}`);
    
    // 3. USER INPUT - Max 2k
    if (context.userInput) {
        const input = context.userInput.substring(0, 2000);
        parts.push(`[USER]\n${input}`);
    }
    
    // 4. HISTORY - Chỉ 5 lượt gần nhất, mỗi lượt max 500 chars (~2.5k)
    if (context.history?.length > 0) {
        const recentHistory = context.history
            .slice(-5)
            .map((h: any) => {
                if (typeof h === 'string') return h.substring(0, 500);
                if (h?.logs) return JSON.stringify(h.logs).substring(0, 500);
                return String(h).substring(0, 500);
            })
            .join('\n');
        parts.push(`[HISTORY]\n${recentHistory.substring(0, 2500)}`);
    }
    
    // 5. SHORT TERM MEMORY (~500)
    if (context.shortTerm) {
        parts.push(`[MEMORY: SHORT TERM]\n${context.shortTerm.substring(0, 500)}`);
    }
    
    // 6. INSTRUCTIONS
    parts.push(`[SYSTEM: INSTRUCTIONS]
Bạn là "Huyền Tiêu" - người dẫn truyện kiếm hiệp.
Respond bằng JSON: {"logs":[], "shortTerm":"", "tavern_commands":[]}
Mỗi logs: {sender:"Background"|"Tên NPC", text:"..."}
Dùng info đã cho, KHÔNG bịa đặt.`);

    const result = parts.join('\n\n');
    
    // Warn nếu quá dài
    if (result.length > 45000) {
        console.warn(`[PromptBuilder] WARNING: ${result.length} ký tự - vượt ngưỡng!`);
    } else {
        console.log(`[PromptBuilder] Total: ${result.length} ký tự`);
    }
    
    return result;
}

// Build context prompt tối thiểu
function buildContextPrompt(ctx: RuntimeContext): string {
    const parts: string[] = [];
    const char = ctx.gameState?.Character;
    const env = ctx.gameState?.Environment;
    const world = ctx.gameState?.World;
    
    if (char) {
        parts.push(`【NHÂN VẬT】
Tên: ${char.name || '?'}
Tu vi: ${char.realm || 'Phàm Nhân'}
Nội lực: ${char.currentEnergy ?? 100}/${char.maxEnergy ?? 100}
Tinh lực: ${char.currentFullness ?? 80}/${char.maxFullness ?? 100}
HP: ${JSON.stringify(char.bodyPartHP || {}).substring(0, 200)}`);
    }
    
    if (env) {
        parts.push(`【MÔI TRƯỜNG】
Thời gian: Năm ${env.year ?? 1} Tháng ${env.month ?? 1} Ngày ${env.day ?? 1} Giờ ${env.hour ?? 0}:${env.minute ?? 0}
Địa điểm: ${env.specificLocation || env.majorLocation || env.mediumLocation || '?'}`);
    }
    
    if (world?.ongoingEvents?.length) {
        parts.push(`【THẾ GIỚI】
Sự kiện đang chạy: ${world.ongoingEvents.slice(0, 3).join(', ')}`);
    }
    
    return parts.join('\n').substring(0, 3000);
}

// Export for testing
export function getCoreLength(): number {
    return CORE_PROMPTS.reduce((sum, p) => sum + p.content.length, 0);
}

export function getCorePromptCount(): number {
    return CORE_PROMPTS.length;
}