import { PromptStructure } from '../../types';

export const StatNpcReference: PromptStructure = {
    id: 'stat_npc',
    title: 'NPC',
    content: `
<NPC>
# FIELDS: id, name, gender, age, title, realm, appearance, currentHp, maxHp, status, currentLocation, isPresent, favorability:-100~100, relationStatus, combatPower, shortTermMemory
# PRESENT: isPresent=false → không đối thoại/chiến đấu
# FAVOR: thay đổi qua quà, đối thoại, hành động
# RELATION: tự động theo favorability threshold
# COMBAT: dựa realm + equipment + skills
# MEMORY: nhớ hành động player
# SET key="gameState.NPCs.{id}.favorability" value
`.trim(),
    type: 'num',
    enabled: true
};