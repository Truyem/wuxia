
import { parseTagProtocolResponse, parseCommandBlock } from '../services/aiService';

const mockResponse = `
<thinking>
I need to update the NPC's mood and the game location.
</thinking>
<t_npc>
SET npc.Lý Vân.Cảm xúc=Vui vẻ
SET npc.Lý Vân.Avatar=https://example.com/lyvan.png
</t_npc>
<t_state>
SET gameState.Môi trường.Địa điểm lớn=Thành Đầu
SET gameState.Nhân vật.Đánh giá.độ mạnh=10
</t_state>
<Main Body>
Lý Vân mỉm cười nhìn bạn. "Chào mừng đến với Thành Đầu."
</Main Body>
<Action options>
- Chào lại
- Hỏi về nơi này
</Action options>
`;

console.log("--- Testing parseTagProtocolResponse ---");
const result = parseTagProtocolResponse(mockResponse);
console.log("Parsed Result:", JSON.stringify(result, null, 2));

console.log("\n--- Testing command extraction from t_ fields ---");
if (result) {
    const tNpcCmds = result.t_npc ? parseCommandBlock(result.t_npc) : [];
    console.log("t_npc Commands:", tNpcCmds);

    const tStateCmds = result.t_state ? parseCommandBlock(result.t_state) : [];
    console.log("t_state Commands:", tStateCmds);
}
