import { PromptStructure } from '../../types';

export const AppointmentSystemPrompt: PromptStructure = {
  id: 'appointment_system',
  title: 'Hệ thống Ước Hẹn',
  content: `
<HỆ THỐNG ƯỚC HẸN>
# APPOINTMENT STRUCTURE
{
  id: string,
  title: string,
  titleLabel?: string,
  oathContent: string,
  target: {
    name: string,
    shortName?: string,
    type: "npc"|"self"|"family"|"enemy"|"past_life"|"reincarnation"|"spirit"|"beast"|"demon"|"god",
    lifeStatus: "Alive"|"Dead"|"Ascended"|"Reborn"|"Missing"|"Imprisoned"|"Cultivating",
    species?: string,
    speciesGroup?: "human"|"beast"|"demon"|"spirit"|"divine"|"construct"|"hybrid"|"undead",
    faction?: string,
    realm?: string,
    relationType?: "Cha"|"Mẹ"|"Sư phụ"|"Đệ tử"|"Tình nhân"|"Vợ"|"Chồng"|"Đệ"|"Anh"|"Thù nhân"|"Tổ tiên"|"Người lạ",
    isMainCharacter?: boolean,
    clanName?: string,
    bloodline?: string,
    pastLifeId?: string,
    pastLifeName?: string,
    reincarnationOf?: string,
    avatar?: string
  },
  nature: "Tình cảm"|"Giao dịch"|"Cá cược"|"Báo thù"|"Cam kết"|"Tự nguyện",
  location: string,
  time: string,
  validDuration?: number,
  currentStatus: "Sắp diễn ra"|"Đang chờ"|"Đang thực hiện"|"Hoàn thành"|"Hủy bỏ"|"Thất bại",
  createdAt?: string,
  updatedAt?: string,
  fulfillmentConsequence?: string,
  failureConsequence?: string,
  flags?: Record<string, any>,
  backgroundStory?: string,
  hiddenConditions?: string
}
# TARGET TYPES: npc, self, family, enemy, past_life, reincarnation, spirit, beast, demon, god
# LIFE STATUS: Alive, Dead, Ascended, Reborn, Missing, Imprisoned, Cultivating
# SPECIES GROUP: human, beast, demon, spirit, divine, construct, hybrid, undead
# RELATION: Cha, Mẹ, Sư phụ, Đệ tử, Tình nhân, Vợ, Chồng, Đệ, Anh, Thù nhân, Tổ tiên, Người lạ
# NATURE: Tình cảm, Giao dịch, Cá cược, Báo thù, Cam kết, Tự nguyện
# STATUS: Sắp diễn ra → Đang chờ → Đang thực hiện → Hoàn thành | Hủy bỏ | Thất bại
`.trim(),
  type: 'num',
  enabled: true
};