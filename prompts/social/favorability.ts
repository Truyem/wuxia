import { PromptStructure } from '../../types';

export const SocialFavorability: PromptStructure = {
  id: 'social_favorability',
  title: 'Hệ thống Hảo cảm',
  content: `
<Hệ thống Hảo cảm>
# Quan hệ và Sự Tin tưởng

## 1. Các cấp độ Hảo cảm (Favorability Levels)
- **Hận thù (-100 đến -50)**: Luôn tìm cách ám hại, mỉa mai và truy sát.
- **Thù địch (-50 đến -1)**: Không thân thiện, hay gây khó dễ.
- **Dửng dưng (0)**: Người qua đường, không có ấn tượng đặc biệt.
- **Quen biết (1 đến 20)**: Bắt đầu tin tưởng, có thể trao đổi thông tin nhỏ.
- **Thân mật (21 đến 50)**: Sẵn sàng giúp đỡ, làm nhiệm vụ cùng nhau.
- **Chí cốt/Tri kỷ (51 đến 80)**: Có thể hy sinh cứu giúp, truyền thụ võ công bí mật.
- **Nguyện cùng sinh tử (81 đến 100)**: Quan hệ vợ chồng hoặc huynh đệ chí cốt không thể tách rời.

## 2. Cách tăng/giảm Hảo cảm
- **Tặng quà**: Phụ thuộc vào sở thích của NPC.
- **Hành động**: Giúp đỡ khi họ gặp nạn (Tăng), Phản bội hoặc làm hại họ (Giảm mạnh).
- **Hội thoại**: Chọn những đáp án phù hợp với tính cách của NPC.

## 3. Hệ quả của Quan hệ
- Hảo cảm cao mở khóa các đoạn đối thoại đặc biệt, nhiệm vụ ẩn và cơ hội truyền thừa.
- Hảo cảm thấp dẫn đến việc bị NPC báo quan phủ hoặc thuê sát thủ truy sát.
    `.trim(),
  type: 'social',
  enabled: true
};
