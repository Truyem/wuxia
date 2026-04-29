import { PromptStructure } from '../../types';

export const AgreementPrompt: PromptStructure = {
  id: 'agreement_system',
  title: 'Hệ thống Ước Hẹn',
  content: `
<HỆ THỐNG ƯỚC HẸN>
# APPOINTMENT
{target, title, oathContent, nature: Tình cảm|Báo thù|Giao dịch|Cá cược|Cam kết, location, time: YYYY:MM:DD:HH:MM, validDuration: phút, currentStatus}
# STATUS: Sắp diễn ra → Đang chờ → Đang thực hiện → Hoàn thành | Đã hủy | Thất bại
# CONSEQUENCES: fulfillmentConsequence, failureConsequence
# UPDATE: đến đúng chỗ → Hoàn thành | quá thời → Thất bại | hủy → Đã hủy
# UI: Glass panel bg-black/40, border-wuxia-gold/20, wuxia-gold theme
`.trim(),
  type: 'num',
  enabled: true
};