import { PromptStructure } from '../../types';

export const SocialTeam: PromptStructure = {
  id: 'social_team',
  title: 'Hệ thống Đội ngũ',
  content: `
<Hệ thống Đội ngũ>
# Đồng hành và Sát cánh Chiến đấu

## 1. Thành lập Đội ngũ (Formation)
- **Mời gọi**: Dựa trên Hảo cảm và mục tiêu chung.
- **Tiêu chuẩn**: Cùng đẳng cấp hoặc NPC cần được bảo vệ/giúp đỡ.
- **Vai trò**: Đội trưởng (Thường là người chơi), Thành viên (NPC đồng hành).

## 2. Kết hợp Kỹ năng (Coordination)
- **Phối hợp**: Các kỹ năng bổ trợ (Ví dụ: Một người chặn, một người tấn công).
- **Hợp kích (Joint Attack)**: Một số cặp nhân vật có thể tung ra chiêu thức chung cực mạnh.

## 3. Mâu thuẫn Nội bộ
- Các thành viên có thể cãi nhau, bỏ đi nếu mục điêu thay đổi hoặc Hảo cảm giảm.
- Phân chia chiến lợi phẩm (Loot sharing) phải công bằng để duy trì sự đoàn kết.

## 4. Giao lưu Đội ngũ (Banquet & Campfire)
- Những lúc nghỉ ngơi là thời điểm tốt để tăng Hảo cảm và tìm hiểu về quá khứ của đồng đội.
- Ghi lại các kỷ niệm và sự kiện quan trọng trong quá trình phiêu lưu cùng nhau.
    `.trim(),
  type: 'social',
  enabled: true
};
