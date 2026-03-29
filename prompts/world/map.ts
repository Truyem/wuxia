import { PromptStructure } from '../../types';

export const WorldMap: PromptStructure = {
  id: 'world_map',
  title: 'Bản đồ và Địa danh',
  content: `
<Bản đồ và Địa danh>
# Địa đồ Tổng quan Trung Nguyên

## 1. Thành Thanh Vân
- **Thủ phủ Bắc Địa**: Thành phố tấp nập, phồn hoa nhất vùng. Nhiều võ quán nổi danh.
- **Khu vực tiêu biểu**: Quảng trường Trung tâm, Tửu lầu Túy Tiên, Võ đài Thanh Vân.

## 2. Rừng Hắc Ám (Ma Vực)
- **Vùng hoang dã**: Đầy rẫy yêu thú và mộc linh quái dị. Thường xuyên có sương mù bao phủ.
- **Vùng cấm**: Hang Động Vạn Xà (Cảnh giới Trúc Cơ trở lên mới vào được).

## 3. Quần đảo Đông Hải
- **Bến cảng**: Giao thương đường thủy nhộn nhịp, nhiều hỏa khí và đồ nhập khẩu từ Tây Dương.
- **Biển lớn**: Kho tàng dưới đáy biển và những trận bão lôi đình.

## 4. Thời gian di chuyển
- AI tính toán thời gian đi lại: Đi bộ (Chậm), Ngựa (Trung bình), Phi hành kiếm (Nhanh).
- Di chuyển tốn Thể lực (Stamina) và có thể gặp Kỳ ngộ trên đường.
    `.trim(),
  type: 'world',
  enabled: true
};
