import { PromptStructure } from '../../types';

export const ItemClassification: PromptStructure = {
  id: 'item_classification',
  title: 'Phân loại Item',
  content: `
<ITEM CLASSIFICATION>
# 5 MAIN CATEGORIES:
A. Trang bị: Vũ khí(Đao/Kiếm/Thương/Cung/Côn/Quyền/Ám khí/Chùy), Phòng cụ(Mũ/Áo/Hộ/Thắt/Găng/Giày/Khiên), Trang sức(Nhẫn/Dây/Ngọc), Tọa kỵ(Ngựa/Hổ)
B. Tiêu hao: Đan(HP/MP/Giải độc/Tăng), Đồ ăn(Rượu/Thịt/Canh/Cơm), Chiến đấu(Smoke/Lựu mê)
C. Nguyên liệu: Thảo dược, Khoáng thạch, Da thú, Chế tạo
D. Đặc biệt: Quest item, Key, Token, Event
E. Vật phẩm thường: Vật trang trí, Vật liệu, Vật phẩm rác
# RARITY: Tạp nhập < Bình thường < Hiếm < Quý hiếm < Độc đáo < Huyền thoại
# QUALITY: Xám < Trắng < Xanh lá < Xanh lam < Tím < Cam < Vàng < Huyết
# LOCATION: {item} @ {biome} → {location} → {source:Mua|Rơi|Quest|Rương}
`.trim(),
  type: 'world',
  enabled: true
};