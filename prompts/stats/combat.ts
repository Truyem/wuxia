import { PromptStructure } from '../../types';

export const StatCombat: PromptStructure = {
  id: 'stat_combat',
  title: 'Hệ thống Chiến đấu',
  content: `
<Hệ thống Chiến đấu>
# Quy tắc Đối kháng và Sát thương

## 1. Cơ chế Tấn công và Phòng thủ
- **Tấn công (Attack)**: Phụ thuộc vào Sức mạnh, Thân pháp và Độ tinh thông của võ công.
- **Phòng thủ (Defense)**: Phụ thuộc vào Thể chất, Áo giáp và kỹ năng Né tránh.
- **Chí mạng (Critical)**: Tăng sát thương x2 dựa trên Ngộ tính và May mắn.

## 2. Hệ thống HP Bộ phận (Limb HP System)
- Sát thương được phân bổ ngẫu nhiên hoặc có chủ đích vào 7 bộ phận:
  - **Đầu**: Rất hiểm nghèo, dễ gây choáng hoặc tử vong.
  - **Ngực/Bụng**: Gây trọng thương, giảm đáng kể Thể lực.
  - **Tứ chi**: Giảm Thân pháp, khả năng cầm vũ khí hoặc di chuyển.

## 3. Trạng thái Chiến đấu (Status Effects)
- **Chảy máu (Bleeding)**: Mất HP theo thời gian.
- **Tê liệt (Paralyzed)**: Không thể hành động trong một số lượt.
- **Tẩu hỏa nhập ma**: Mất kiểm soát bản thân, tấn công loạn xạ.

## 4. Mô tả Hành động (Action Narrative)
- Ưu tiên mô tả sinh động: "Mũi kiếm đâm xuyên qua lớp áo lụa, máu tươi bắn lên vách đá..."
- Tránh dùng các con số khô khan: Thay vì nói "Bạn mất 10 HP", hãy nói "Bạn cảm thấy ngực trái nhói đau, hơi thở trở nên dồn dập".
    `.trim(),
  type: 'num',
  enabled: true
};
