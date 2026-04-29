import { PromptStructure } from '../../types';

export const CoreCotJudge: PromptStructure = {
  id: 'core_cot_judge',
  title: 'Phán định',
  content: `
<JUDGE>
# Dùng <judge> cho hành động rủi ro: Chiến đấu, Đột nhập, Thuyết phục
# D100: 1-5 Đại thành | 6-60 Thành | 61-95 Thất | 96-100 Đại thất
# [Kết quả] Hành động｜Kết quả｜Đối tượng
# Kết quả phải ảnh hưởng story tiếp
`.trim(),
  type: 'core',
  enabled: true
};