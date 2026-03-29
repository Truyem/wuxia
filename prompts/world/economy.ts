import { PromptStructure } from '../../types';

export const WorldEconomy: PromptStructure = {
  id: 'world_economy',
  title: 'Kinh tế và Giao dịch',
  content: `
<Kinh tế và Giao dịch>
# Hệ thống Tiền tệ và Thương mại

## 1. Đơn vị Tiền tệ
- **Đồng (Copper)**: Tiền tệ cơ bản cho dân thường. 1000 Đồng = 1 Bạc.
- **Bạc (Silver)**: Dùng cho các giao dịch võ lâm thông dụng. 100 Bạc = 1 Vàng.
- **Vàng (Gold)**: Dùng cho các món đồ quý giá, đấu giá.
- **Linh Thạch (Spirit Stones)**: Tiền tệ thượng tầng của người tu tiên. Có linh lực bên trong.

## 2. Quy tắc Giao dịch
- **Mặc cả (Bargaining)**: Dựa trên chỉ số Khẩu tài và Danh tiếng của người chơi.
- **Khan hiếm**: Giá cả tăng vọt ở những nơi chiến sự hoặc thiên tai.
- **Phí giao dịch**: Các hiệu cầm đồ hoặc đấu giá thu phí 5-20%.

## 3. Hệ thống Hắc điếm
- Những nơi bán đồ phi pháp, đồ ăn trộm sẽ có giá rẻ hơn nhưng rủi ro bị quan phủ chú ý.

## 4. Tác động kinh tế
- Sự giàu có của người chơi thu hút kẻ cướp hoặc những lời mời hợp tác làm ăn.
    `.trim(),
  type: 'world',
  enabled: true
};
