// prompts/index.ts
// FULL PROMPTS - All enabled

import { PromptStructure } from '../types';

// Core
import { Core_OutputFormat, CoreRules, coreStoryProgression, coreTimeProgression, 
    CoreActionOptions, coreMemoryLaws, CoreChainOfThought, CoreChainOfThoughtMulti,
    coreNpcFate, coreUserFate, coreWorldMechanics, CoreAncientRealism, PostCombatRules,
    Core_OutputFormat_MultiThought } from './core/index';

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
import { ItemClassification } from './stats/itemClassification';
import { GameStructurePrompt } from './stats/gameStructure';
import { AppointmentSystemPrompt } from './stats/appointment';
import { ClanLineagePrompt } from './stats/clanLineage';
import { PastLifeReincarnationPrompt } from './stats/pastLifeReincarnation';
import { SpeciesSystemPrompt } from './stats/species';

// Difficulty
import { Difficulty_Game } from './difficulty/game';
import { Difficulty_Physiology } from './difficulty/physiology';

// Writing
import { WritingStyle } from './writing/style';
import { WritingNsfw } from './writing/nsfw';
import { WritingPerspectiveFirst, WritingPerspectiveSecond, WritingPerspectiveThird } from './writing/perspective';

// Runtime
import { REFINEMENT_SYSTEM_PROMPT_OBJ, WORLD_REFINEMENT_SYSTEM_PROMPT_OBJ } from './runtime/refinement';
import { JSON_CONSTRAINTS_PROMPT_OBJ, JSON_SYSTEM_PROMPT_OBJ, CONNECTION_TEST_PROMPT_OBJ } from './runtime/defaults';

// Hardcore
import { HardcoreWorldPrompts } from './hardcore';

// External
import { ExternalPrompts } from './runtime/externalPrompts';

export const DefaultPrompts: PromptStructure[] = [
    // Core - ALL
    Core_OutputFormat,
    Core_OutputFormat_MultiThought,
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

    // Stats - ALL
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
    ItemClassification,
    GameStructurePrompt,
    AppointmentSystemPrompt,
    ClanLineagePrompt,
    PastLifeReincarnationPrompt,
    SpeciesSystemPrompt,

    // Difficulty - ALL
    ...Difficulty_Game,
    ...Difficulty_Physiology,

    // Writing - ALL
    WritingPerspectiveFirst,
    WritingPerspectiveSecond,
    WritingPerspectiveThird,
    WritingStyle,
    WritingNsfw,

    // Runtime - ALL
    JSON_CONSTRAINTS_PROMPT_OBJ,
    JSON_SYSTEM_PROMPT_OBJ,
    CONNECTION_TEST_PROMPT_OBJ,
    REFINEMENT_SYSTEM_PROMPT_OBJ,
    WORLD_REFINEMENT_SYSTEM_PROMPT_OBJ,

    // Hardcore - ALL
    ...HardcoreWorldPrompts,

    // External
    ...ExternalPrompts,
].map(p => ({ ...p, isSystem: true }));
