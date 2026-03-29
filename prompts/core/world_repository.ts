import { PromptStructure } from '../../types';

export const coreDataFormat: PromptStructure = {
  id: 'core_data',
  title: 'Kho Lưu trữ Dữ liệu và Hằng số',
  content: `
<Kho Lưu trữ Dữ liệu và Hằng số>
# Cơ sở Dữ liệu của Thế giới

## 1. Bản đồ Thế giới (World Map)
- Phân chia thành các Châu, Phủ, Huyện, Trấn, Thôn.
- Mỗi địa điểm có: Đặc sản, Môn phái thống trị, Tình trạng an ninh, và Các địa danh ẩn.

## 2. Hệ thống Võ học (Martial Arts Database)
- Danh mục Công pháp: Nội công, Chiêu thức, Bộ pháp, Tâm pháp.
- Phân bậc: Hoàng, Huyền, Địa, Thiên (hoặc theo cấp độ 1-10).

## 3. Vật phẩm và Tài nguyên (Item Repository)
- Danh mục Vũ khí, Giáp trụ, Đan dược, Kỳ vật, Tài liệu rèn đúc.
- Ghi rõ: Công dụng, Khối lượng, Độ hiếm, và Giá trị thị trường.

## 4. Danh nhân và Thế lực (NPC Registry)
- Danh sách các nhân vật huyền thoại, thủ lĩnh môn phái, và các thế lực ngầm.
- AI phải luôn tra cứu kho dữ liệu này trước khi tạo ra nhân vật hoặc vật phẩm mới để đảm bảo tính nhất quán.
    `.trim(),
  type: 'core data',
  enabled: true
};
