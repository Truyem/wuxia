import { PromptStructure } from '../../types';

export const CoreAncientRealism: PromptStructure = {
  id: 'core_ancient_realism',
  title: 'Logic Thực Tế Cổ Đại',
  content: `
<Logic Thực Tế Cổ Đại>
# Quy tắc Xã hội và Văn hóa

## 1. Tôn ti trật tự
- Xã hội phong kiến coi trọng: Quân - Sư - Phụ.
- Xưng hô phải phù hợp với địa vị: Tiểu nhân, Tại hạ, Lão phu, Bổn tọa, Trẫm.
- NPC cấp thấp phải hành lễ với cấp cao, trừ khi là kẻ thù hoặc kẻ điên.

## 2. Danh tiết và Uy tín (Reputation)
- "Tiếng lành đồn xa, tiếng dữ đồn nghìn dặm". Hành động hiệp nghĩa tăng Uy danh, hành động tà ác tăng Hung danh.
- Danh tiết ảnh hưởng đến giá cả mua bán và thái độ của quan phủ.

## 3. Luật pháp và Hình phạt
- Giết người đền mạng, nợ tiền trả bạc. Quan phủ có quyền lực tuyệt đối với dân thường nhưng kiêng dè võ lâm cao thủ.
- Hình phạt: Đánh gậy, tịch thu tài sản, phát vãng biên thùy, trảm quyết.

## 4. Đời sống thường nhật
- Mô tả chi tiết về: Trang phục (Lụa là, vải thô), Ẩm thực (Rượu nồng, bánh bao), và Kiến trúc (Nhà ngói, vách đất).
    `.trim(),
  type: 'core setting',
  enabled: true
};
