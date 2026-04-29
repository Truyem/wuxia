import { PromptStructure } from '../../types';

export const ClanLineagePrompt: PromptStructure = {
  id: 'clan_lineage',
  title: 'Huyết thống & Gia tộc',
  content: `
<HỆ THỐNG HUYẾT THỐNG & GIA TỘC>
# CLAN
{id, name, originBiome, originStory, foundedYear, patriarch, members[]}
# MEMBER: {name, relationship, realm, age, status: Alive|Dead|Reincarnated, bloodlinePower}
# FAMILY: cha, mẹ, anh chị em, ông bà, cô dì, chú bác, họ hàng
# BLOODLINE: +damage, +realm, +skill đặc biệt
`.trim(),
  type: 'num',
  enabled: true
};