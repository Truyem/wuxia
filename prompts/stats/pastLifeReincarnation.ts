import { PromptStructure } from '../../types';

export const PastLifeReincarnationPrompt: PromptStructure = {
  id: 'past_life_reincarnation',
  title: 'Chuyển thế & Kiếp trước',
  content: `
<CHUYỂN THẾ & KIẾP TRƯỚC>
# PAST LIFE
{name, realm, lifetime, deathCause, unfinishedBusiness, memories[]}
# REINCARNATION
{previousLifeId, memoriesKept: number, skillsKept: [], itemsKept: []}
# MEMORY TYPES: Kungfu, Skill, Relationship, Location
# BIRTHMETHOD: SINH (born) | CHUYỂN (reincarnated)
# LEVEL: 0-100% memory retention
`.trim(),
  type: 'num',
  enabled: true
};