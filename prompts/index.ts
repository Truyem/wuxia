
import { PromptStructure } from '../types';

// Core
import { Core_OutputFormat } from './core/format';
import { CoreRules } from './core/rules';
import { coreDataFormat } from './core/data';
import { coreMemoryLaws } from './core/memory';
import { coreWorldview } from './core/world';
import { CoreChainOfThought } from './core/cot';
import { CoreChainOfThoughtMulti } from './core/cotMulti';
import { CoreAncientRealism } from './core/ancientRealism';
import { coreStoryProgression } from './core/story';
import { CoreActionOptions } from './core/actionOptions';
import { coreTimeProgression } from './core/timeProgress';
import { Core_OutputFormat_MultiThought } from './core/formatMulti';
import { coreNpcFate } from './core/npc_fate';
import { coreUserFate } from './core/user_fate';
import { coreWorldMechanics } from './core/world_mechanics';
import { coreRealWorld } from './core/realWorld';
import { PostCombatRules } from './core/postCombatRules';

// Stats
import { StatCharacter } from './stats/character';
import { StatItem, ItemExtractionPrompt } from './stats/items';
import { StatKungfu, SkillExtractionPrompt } from './stats/kungfu';
import { StatWorldEvolution } from './stats/world';
import { StatOtherSettings } from './stats/others';
import { StatCombat } from './stats/combat';
import { StatBodyHealth } from './stats/body';
import { StatExperience } from './stats/experience';
import { StatCultivation } from './stats/cultivation';
import { StatNpcReference } from './stats/npc';
import { StatResourceDrop } from './stats/drop';
import { StatRecovery } from './stats/recovery';
import { StatItemWeight } from './stats/itemWeight';

// Difficulty
import { Difficulty_Game } from './difficulty/game';
import { Difficulty_Physiology } from './difficulty/physiology';

// Writing
import { WritingPerspectiveFirst, WritingPerspectiveSecond, WritingPerspectiveThird } from './writing/perspective';
import { WritingStyle } from './writing/style';
import { WritingNsfw } from './writing/nsfw';

// Runtime
import { REFINEMENT_SYSTEM_PROMPT_OBJ, WORLD_REFINEMENT_SYSTEM_PROMPT_OBJ } from './runtime/refinement';
import { JSON_CONSTRAINTS_PROMPT_OBJ, JSON_SYSTEM_PROMPT_OBJ, CONNECTION_TEST_PROMPT_OBJ } from './runtime/defaults';

export const DefaultPrompts: PromptStructure[] = [
    // Core
    coreWorldview,
    CoreAncientRealism,
    Core_OutputFormat,
    Core_OutputFormat_MultiThought,
    CoreRules,
    coreStoryProgression,
    coreTimeProgression,
    CoreActionOptions,
    coreDataFormat,
    coreMemoryLaws,
    CoreChainOfThought,
    CoreChainOfThoughtMulti,
    coreNpcFate,
    coreUserFate,
    coreWorldMechanics,
    coreRealWorld,
    PostCombatRules,
    // Stats

    StatCharacter,
    StatItem,
    ItemExtractionPrompt,
    StatKungfu,
    SkillExtractionPrompt,
    StatWorldEvolution,
    StatOtherSettings,
    StatCombat,
    StatBodyHealth,
    StatExperience,
    StatCultivation,
    StatNpcReference,
    StatResourceDrop,
    StatRecovery,
    StatItemWeight,

    // Difficulty (Arrays)
    ...Difficulty_Game,
    ...Difficulty_Physiology,

    // Writing
    WritingPerspectiveFirst,
    WritingPerspectiveSecond,
    WritingPerspectiveThird,
    WritingStyle,
    WritingNsfw,
    // New Runtime Prompts
    REFINEMENT_SYSTEM_PROMPT_OBJ,
    WORLD_REFINEMENT_SYSTEM_PROMPT_OBJ,
    JSON_CONSTRAINTS_PROMPT_OBJ,
    JSON_SYSTEM_PROMPT_OBJ,
    CONNECTION_TEST_PROMPT_OBJ
].map(p => ({ ...p, isSystem: true }));
