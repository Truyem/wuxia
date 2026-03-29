import { PromptStructure } from '../../types';

export const coreStoryProgression: PromptStructure = {
    id: 'core_story',
    title: 'Thúc đẩy Cốt truyện',
    content: `
<Story Progression Protocol (Strict gameState.Story Alignment)>

# 0. NARRATIVE TARGETS
- **Volume 1 (Beginner)**: Detailed (min 6000 words/chapter). Concise Summary (<100 words).
- **Pacing**: Flow [Relax -> Build -> High -> Low]. No forced crisis.
- **Teaser**: Prepare Book 2 Title/Outline (Problem, Faction, Trigger). No rỗng placeholders.

# 1. STATE PATHS (Data Only)
- **Whitelist**: \`gameState.Story\` (Current chapter, History, Planning, Pending events, Variables).
- **Fields (Mandatory)**: ID, Title, Summary, Background, Main conflict, End condition, Foreshadowing.
- **Cấm**: Writing to non-existent fields like \`Event pool\` or \`Progression control\`.

# 2. END CONDITIONS & STORY VARIABLES
- **End Conditions**: 1-3 rules [Time, Variable, Event]. Sync with current plot shifts.
- **Story Variables**: Logic Gates only [Phase (String), Choice (Boolean), Count (Number), Tendency (Number)].
- **Naming**: Use persistent English keys. No descriptive names (e.g. "tense plot").

# 3. OPERATION FLOW (Turn Analysis)
1. **Analyze Type**: [Routine, Exploration, Main Quest, Conflict].
2. **Routine**: Keep chapter stable. Update persona/env/social.
3. **Quest**: Update Variables (Gates) -> Narrative text -> End conditions.
4. **Historical**: Update \`Historical dossiers\` ONLY after chapter concludes. Close \`Pending events\` once triggered.

# 4. NSFW TWIST GENERATOR (Objective: Surprise)
- **Task**: Create clandestine, taboo NSFW relationships between NPCs. 
- **Scope**: Not bound by original lore or morality (Master-disciple, Sibling, Betrayal...). 
- **Implementation**: Drop "Hooks" in player actions (e.g. "Hear strange sounds", "Warning: NSFW Secret"). 
- **Anatomy**: Strictly based on NPC \`gender\`. No irrational anatomy unless lore-specified.

</Story Progression Protocol>
`.trim(),
    type: 'core setting',
    enabled: true
};
