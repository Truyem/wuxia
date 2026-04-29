import { PromptStructure } from '../../types';

export const SpeciesSystemPrompt: PromptStructure = {
  id: 'species_system',
  title: 'Chủng loài',
  content: `
<CHỦNG LOÀI & SINH VẬT>
# GROUPS: human|beast|demon|undead|spirit|divine|hybrid|construct
# 30 BIOMES → SPECIES:
huyet_hai: Huyết Yêu, Hải Ma | Huyết Ma Giáo | Red scales
cot_lam: Cốt Nhân, Khô Lâu | Bạch xương
u_minh_vuc: U Hồn, Quỷ Vương | U Minh Điện | Dark ghost
phan_thien_sa_mac: Sa Nhân, Thiên Sa Quỷ | Desert
loi_phat_nguyen: Lôi Linh, Thiên Lôi | Lightning
doc_chuong_trach: Độc Xà, Hà Lộc | Green scaled
van_tinh_coc: Thạch Thú, Lĩnh Thần | Stone
bang_phong_cuc_dia: Băng Tinh, Tuyết Yêu | Ice blue
ao_canh_than_lau: Ảo Hồn, Mộng Yêu | Ethereal
van_kiem_truong: Kiếm Thần, Kiếm Khách | Thiên Kiếm Tông
hu_moc_lam: Mục Thú, Trùng Vương | Rotting
tang_long_son: Long, Long Nhân | Golden dragon
hu_khong_dao: Phi Thử, Hư Không Nhân | Floating
huyet_nguyet_canh: Tử Vong, Tế Hồn | Pale dead
luu_sa_ha: Sa Thú, Lưu Sa Nhân | Sandy
nghiep_hoa_luyen_nguc: Hỏa Thú, Nghiệp Hỏa | Fire
thi_mang_lam: Mãnh Thú, Cửu Vĩ | Wild furry
thien_long_canh: Long Tàng, Thần Long | Dragon
long_dao_hai: Thủy Tinh, Ngư Thần | Blue
cuu_trung_du_chen: Cổ Tộc, Tàn Hồn | Ancient
ngoc_linh_son: Ngọc Linh, Tinh Linh | Crystal
thanh_ac: Thanh Linh, Âm Quỷ | Ghostly
thieu_moc_lien: Thiếu Mộc, Liên Hoàn | Grass
am_duong_du_chen: Âm Dương, Du Đồng | Yin Yang
am_tinh_cung: Âm Tinh, Tối Thần | Dark
hoang_quy_son: Hoàng Quy, Cửu Vĩ | Nine-tailed
long_vuc: Long Vực, Hải Thần | Sea dragon
bac_giang_truong: Bạch Giang, Trường Sinh | White
thuyet_nhan_giang: Thuyết Nhân, Giang Thần | River
hoa_cuc_dai_than: Hoa Cúc, Đại Thanh | Flower
kim_lon_dai_hiep: Kim Long, Đại Hiệp | Gold dragon
quy_thi_tran: Quỷ Thị, Yêu Quỷ | Red ghost
`.trim(),
  type: 'num',
  enabled: true
};