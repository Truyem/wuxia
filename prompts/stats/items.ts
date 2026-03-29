import { PromptStructure } from '../../types';

export const StatItem: PromptStructure = {
  id: 'stat_item',
  title: 'Hệ thống Vật phẩm',
  content: `
<Hệ thống Vật phẩm>
# Phân loại và Thuộc tính Vật phẩm

## 1. Phân loại Chính
- **Vũ khí (Weapon)**: Đao, Kiếm, Thương, Cung, Ám khí. Cung cấp sát thương.
- **Giáp trụ (Armor)**: Áo giáp, Mũ, Giày, Hộ tống. Cung cấp phòng thủ.
- **Trang sức (Accessory)**: Nhẫn, Dây chuyền, Ngọc bội. Cung cấp các chỉ số phụ.
- **Đan dược (Medicine)**: Hồi phục HP, MP, hoặc tăng cường chỉ số tạm thời.
- **Tài liệu (Material)**: Thảo dược, Khoáng thạch, Da thú. Dùng để chế tạo.

## 2. Các chỉ số Cơ bản của Vật phẩm
- **Độ hiếm (Rarity)**: Phàm (Trắng), Huyền (Xanh), Địa (Tím), Thiên (Vàng), Thần (Đỏ).
- **Trọng lượng (Weight)**: Ảnh hưởng đến khả năng mang vác của người chơi.
- **Độ bền (Durability)**: Giảm dần khi sử dụng, cần sửa chữa định kỳ.
- **Yêu cầu (Requirements)**: Cảnh giới hoặc Thể chất tối thiểu để sử dụng.

## 3. Quản lý Kho đồ (Inventory)
- AI phải luôn theo dõi số lượng và khối lượng vật phẩm trong túi của người chơi.
- Khi nhặt được vật phẩm mới, AI phải mô tả chi tiết hình dáng và cảm quan (Ví dụ: "Thanh kiếm lạnh lẽo, tỏa ra sát khí hừng hực...").
    `.trim(),
  type: 'num',
  enabled: true
};

export const ItemExtractionPrompt: PromptStructure = {
  id: 'item_extraction',
  title: 'Trích xuất Vật phẩm',
  content: `
<Trích xuất Vật phẩm>
# Quy trình Tạo lập Vật phẩm từ Tự sự

## 1. Phân tích Văn bản
- AI tìm kiếm các manh mối về vật phẩm trong lời dẫn (Ví dụ: "Một viên đan dược tỏa hương thơm ngát").
- Xác định loại vật phẩm và độ hiếm dựa trên bối cảnh.

## 2. Gán chỉ số (Stat Assignment)
- Tự động gán các chỉ số phù hợp (Sát thương, Phòng thủ, Khối lượng) dựa trên mô tả.
- Đảm bảo tính cân bằng so với đẳng cấp của người chơi.

## 3. Tạo ID và Metadata
- Tạo ID định danh duy nhất (\`item_unique_id\`).
- Lưu trữ vào danh sách vật phẩm của nhân vật thông qua các lệnh \`ADD\` hoặc \`SET\`.
    `.trim(),
  type: 'custom',
  enabled: true
};
