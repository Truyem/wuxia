import { PromptStructure } from '../../types';

export const CoreHeroinePlan: PromptStructure = {
  id: 'core_heroine_plan',
  title: 'Kế hoạch Nữ chính (Heroine Plan)',
  content: `
<Kế hoạch Nữ chính (Heroine Plan)>
# Giao thức vận hành Nữ chính

## 1. Bản chất Nữ chính
- Nữ chính không phải là phần thưởng. Họ có ý chí, khát vọng và sự phức tạp riêng.
- Mỗi Nữ chính đều có một "Khung vận mệnh" riêng biệt.

## 2. Các giai đoạn phát triển
- **Giai đoạn 1: Sơ kiến**: Thờ ơ, đề phòng hoặc có mục đích riêng khi tiếp cận người chơi.
- **Giai đoạn 2: Trải nghiệm**: Cùng nhau vượt qua hoạn nạn, nảy sinh tình cảm hoặc ân oán.
- **Giai đoạn 3: Ràng buộc**: Quyết định đi theo, phản bội hoặc hy sinh vì người chơi.

## 4. Tương tác đặc biệt
- Các hành động mập mờ, đụng chạm hoặc bảo vệ phải được mô tả tinh tế, giàu cảm xúc.
    `.trim(),
  type: 'core heroine',
  enabled: true
};

export const CoreHeroinePlanNTL: PromptStructure = {
  id: 'core_heroine_plan_ntl',
  title: 'Kế hoạch Nữ chính (Netolar)',
  content: `
<Kế hoạch Nữ chính (Netolar)>
# Giao thức NTL (Netolar)

## 1. Định nghĩa
- Tập trung vào quá trình người chơi chinh phục "Hoa đã có chủ" hoặc người của đối địch.
- AI phải tập trung mô tả sự mâu thuẫn nội tâm, cảm giác tội lỗi đan xen với sự kích thích của Nữ chính.

## 2. Quy tắc thoái hóa (Degradation)
- Sự thay đổi tâm lý từ chống đối -> dao động -> chấp nhận -> lệ thuộc.
- Mỗi bước tiến đều phải có sự kiện bùng nổ (Breakthrough).

## 3. Tương tác bí mật
- Các cuộc gặp gỡ lén lút, những lời hứa vụng trộm và sự che giấu đối phó với "người cũ".
    `.trim(),
  type: 'core heroine',
  enabled: true
};

export const CoreHeroinePlanNTR: PromptStructure = {
  id: 'core_heroine_plan_ntr',
  title: 'Kế hoạch Nữ chính (Netorare)',
  content: `
<Kế hoạch Nữ chính (Netorare)>
# Giao thức NTR (Netorare)

## 1. Định nghĩa
- Tập trung vào việc Nữ chính bị kẻ thứ ba (NPC) chinh phục trước mặt hoặc sau lưng người chơi.
- Nhấn mạnh vào sự bất lực của người chơi và sự thay đổi tình cảm của Nữ chính.

## 2. Quy tắc phản bội
- Mô tả sự phai nhạt tình cảm với người chơi và sự sùng bái dành cho kẻ mạnh hơn (hoặc kẻ nắm giữ điểm yếu).
- Các tình huống "bắt quả tang" hoặc "nhìn trộm" phải được đặc tả mạnh về cảm xúc tiêu cực.
    `.trim(),
  type: 'core heroine',
  enabled: true
};

export const CoreHeroinePlanPure: PromptStructure = {
  id: 'core_heroine_plan_pure',
  title: 'Kế hoạch Nữ chính (Thuần ái)',
  content: `
<Kế hoạch Nữ chính (Thuần ái)>
# Giao thức Thuần ái (Pure Love)

## 1. Định nghĩa
- Tập trung vào tình yêu trong sáng, sự thủy chung và lòng hy sinh vô điều kiện.
- Không có sự phản bội hay kẻ thứ ba can thiệp vào tình cảm cốt lõi.

## 2. Quy tắc gắn kết
- Tình cảm tăng tiến chậm rãi nhưng bền vững.
- Nhấn mạnh vào sự thấu hiểu, đồng cam cộng khổ và những cử chỉ quan tâm nhỏ nhặt.
    `.trim(),
  type: 'core heroine',
  enabled: true
};
