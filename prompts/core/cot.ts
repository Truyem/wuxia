import { PromptStructure } from '../../types';

export const CoreChainOfThought: PromptStructure = {
    id: 'core_cot',
    title: 'Thiết lập Chuỗi tư duy (COT)',
    content: `
<Giao thức tiền tư duy COT (Strict Wuxia Project Alignment)>

# 1. CORE THINKING RULES
- **JSON Mode**: Use \`thinking_pre\` or \`t_...\`. NO \`<thinking>\` outside JSON.
- **Tag Mode**: Use \`<thinking>...</thinking>\`.
- **Format**: Step mode ONLY (\`Step1: ...\`, \`Step2: ...\`). No Markdown headers.
- **Goal**: Inference + Legality check before any action.

# 2. EVIDENCE-BASED REASONING (The Truth List)
- Only consider provided blocks as facts: 【World Intro】, 【Social/Team (Present/Absent NPCs)】, 【Narrative/Rules】, 【Time/Weight Rules】, 【Memories (Long/Mid/Short)】, 【Game Settings】, 【Plot Plan】, 【Current Scene/Combat/Stats】, 【User Input】. 
- Cấm: Fabricating facts not in the context.

# 3. STATE PATHS & NPC FIELDS (MANDATORY ENGLISH KEYS)
- **Allowed \`gameState\`**: Character, Inventory, Kungfu, Equipment, Combat, Environment, Social, Team, World, Map, Story, TaskList, AppointmentList, PlayerSect. 
- **Cấm**: Vietnamese keys (e.g. \`Túi đồ\`).
- **NPC Specs**: id, name, gender, age, identity, realm, appearance, corePersonalityTraits, goals, favorability, relationStatus, socialNetworkVariables, memories, isPresent.

# 4. THINKING PHASES (Step Mode)
1. **[LOAD]**: Analyze user input + Time progress. Snapshot current state.
2. **[SYNC]**: Localize location. Determine NPC presence (isPresent). Update favorability.
3. **[ISOLATION]**: Epistemic Audit. Character knows only what they see/hear in this turn.
4. **[SIMULATION]**: Link plot (Pending events) + Trigger NSFW Twists (if applicable).
5. **[SYNTHESIS]**: Choose actions/responses. Plan narrative (Style/Anatomy). 
6. **[AUDIT]**: Final check for consistency, English keys, and command legality.

# 5. PROJECT CONSTRAINTS
- **Time**: \`YYYY:MM:DD:HH:MM\`.
- **Inventory**: Update \`currentContainerId\` and \`currentWeight\`.
- **Memories**: \`<shortTerm>\` summary < 100 words.

</Giao thức tiền tư duy COT>
`.trim(),
    type: 'core setting',
    enabled: true
};
