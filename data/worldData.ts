export interface WorldLocation {
  id: string;
  name: string;
  type: 'city' | 'landmark';
  description: string;
  x: number;
  y: number;
  region: string;
  city?: string;
  imageUrl?: string;
}

export const WORLD_REGIONS = [
  { id: 'bac_dao', name: 'Bắc Đảo', description: 'Vùng đất tuyết phủ quanh năm, địa hình hiểm trở.' },
  { id: 'nam_luc', name: 'Nam Lục', description: 'Bình nguyên trù phú, khí hậu ôn hòa, trung tâm giao thương.' },
  { id: 'dong_hai', name: 'Đông Hải', description: 'Vùng biển đảo xa xôi, ẩn chứa nhiều bí mật cổ xưa.' }
];

export const WORLD_STRUCTURE: WorldLocation[] = [
  // --- BẮC ĐẢO (North) ---
  // Thành 1: Thanh Vân Thành
  { id: 'thanh_van_thanh', name: 'Thanh Vân Thành', type: 'city', region: 'Bắc Đảo', x: -1000, y: -1000, description: 'Đô thị phồn hoa nhất phương Bắc.' },
  { id: 'loc_an_quan', name: 'Lộc An Quán', type: 'landmark', region: 'Bắc Đảo', city: 'Thanh Vân Thành', x: -1020, y: -980, description: 'Tửu lâu nổi tiếng với rượu Bách Hoa.' },
  { id: 'tuyet_son_mon', name: 'Tuyết Sơn Môn', type: 'landmark', region: 'Bắc Đảo', city: 'Thanh Vân Thành', x: -980, y: -1020, description: 'Cổng thành phía Bắc hướng ra dãy Tuyết Sơn.' },
  { id: 'vinh_ngu_phong', name: 'Vịnh Ngư Phong', type: 'landmark', region: 'Bắc Đảo', city: 'Thanh Vân Thành', x: -1050, y: -1000, description: 'Bến thuyền tấp nập.' },
  { id: 'van_kiem_cac', name: 'Vạn Kiếm Các', type: 'landmark', region: 'Bắc Đảo', city: 'Thanh Vân Thành', x: -1000, y: -950, description: 'Nơi rèn đúc binh khí danh tiếng.' },
  { id: 'am_nguyet_tu', name: 'Ám Nguyệt Tự', type: 'landmark', region: 'Bắc Đảo', city: 'Thanh Vân Thành', x: -950, y: -1000, description: 'Ngôi chùa cổ u tịch.' },
  { id: 'bac_thi_truong', name: 'Bắc Thị Trường', type: 'landmark', region: 'Bắc Đảo', city: 'Thanh Vân Thành', x: -1010, y: -1010, description: 'Khu chợ buôn bán sầm uất.' },
  { id: 'thu_phu_quan', name: 'Thủ Phủ Quân', type: 'landmark', region: 'Bắc Đảo', city: 'Thanh Vân Thành', x: -990, y: -990, description: 'Dinh thự của quản hạt vùng.' },
  { id: 'han_bang_dong', name: 'Hàn Băng Động', type: 'landmark', region: 'Bắc Đảo', city: 'Thanh Vân Thành', x: -1080, y: -1050, description: 'Hang động băng giá vĩnh cửu.' },
  { id: 'phong_van_dai', name: 'Phong Vân Đài', type: 'landmark', region: 'Bắc Đảo', city: 'Thanh Vân Thành', x: -1000, y: -1100, description: 'Nơi quan sát thiên văn.' },

  // Thành 2: Hàn Băng Cung
  { id: 'han_bang_cung', name: 'Hàn Băng Cung', type: 'city', region: 'Bắc Đảo', x: 0, y: -2000, description: 'Cung điện xây từ băng thạch.' },
  // ... 8 more for Hàn Băng Cung
  { id: 'tuyet_lien_tri', name: 'Tuyết Liên Trì', type: 'landmark', region: 'Bắc Đảo', city: 'Hàn Băng Cung', x: 20, y: -1980, description: 'Hồ sen tuyết quý hiếm.' },
  { id: 'bang_phong_dao', name: 'Băng Phong Đạo', type: 'landmark', region: 'Bắc Đảo', city: 'Hàn Băng Cung', x: -20, y: -2020, description: 'Con đường huyết mạch dẫn vào cung.' },
  { id: 'thien_nha_cac', name: 'Thiên Nha Các', type: 'landmark', region: 'Bắc Đảo', city: 'Hàn Băng Cung', x: 50, y: -2000, description: 'Lầu quan sát từ trên cao.' },
  { id: 'ngoc_tuyet_vien', name: 'Ngọc Tuyết Viện', type: 'landmark', region: 'Bắc Đảo', city: 'Hàn Băng Cung', x: -50, y: -2000, description: 'Khu vườn băng thanh ngọc khiết.' },
  { id: 'tinh_ha_lau', name: 'Tinh Hà Lầu', type: 'landmark', region: 'Bắc Đảo', city: 'Hàn Băng Cung', x: 0, y: -1950, description: 'Lầu các ngắm sao.' },
  { id: 'van_han_dai', name: 'Vạn Hàn Đài', type: 'landmark', region: 'Bắc Đảo', city: 'Hàn Băng Cung', x: 0, y: -2050, description: 'Nơi tế lễ thần băng.' },
  { id: 'vo_song_dien', name: 'Vô Song Điện', type: 'landmark', region: 'Bắc Đảo', city: 'Hàn Băng Cung', x: 30, y: -2030, description: 'Chánh điện uy nghiêm.' },
  { id: 'minh_kinh_ho', name: 'Minh Kính Hồ', type: 'landmark', region: 'Bắc Đảo', city: 'Hàn Băng Cung', x: -30, y: -1970, description: 'Hồ nước trong như gương.' },
  { id: 'co_phong_dinh', name: 'Cô Phong Đỉnh', type: 'landmark', region: 'Bắc Đảo', city: 'Hàn Băng Cung', x: 100, y: -2100, description: 'Đỉnh núi cô độc.' },

  // Thành 3: Vô Kỵ Thành
  { id: 'vo_ky_thanh', name: 'Vô Kỵ Thành', type: 'city', region: 'Bắc Đảo', x: 1000, y: -1000, description: 'Thành bang tự do của các lãng khách.' },
  { id: 'cuong_phong_dien', name: 'Cuồng Phong Điện', type: 'landmark', region: 'Bắc Đảo', city: 'Vô Kỵ Thành', x: 1020, y: -1020, description: 'Đại sảnh hội họp.' },
  { id: 'thiet_huyet_truong', name: 'Thiết Huyết Trường', type: 'landmark', region: 'Bắc Đảo', city: 'Vô Kỵ Thành', x: 980, y: -980, description: 'Võ trường huấn luyện.' },
  { id: 'u_minh_ngo', name: 'U Minh Ngõ', type: 'landmark', region: 'Bắc Đảo', city: 'Vô Kỵ Thành', x: 1000, y: -1050, description: 'Khu phố đen tối.' },
  { id: 'chien_than_mien', name: 'Chiến Thần Miếu', type: 'landmark', region: 'Bắc Đảo', city: 'Vô Kỵ Thành', x: 1000, y: -950, description: 'Miếu thờ cổ.' },
  { id: 'lang_tu_lau', name: 'Lãng Tử Lầu', type: 'landmark', region: 'Bắc Đảo', city: 'Vô Kỵ Thành', x: 1050, y: -1000, description: 'Nơi dừng chân của lữ khách.' },
  { id: 'hac_van_quan', name: 'Hạc Vân Quán', type: 'landmark', region: 'Bắc Đảo', city: 'Vô Kỵ Thành', x: 950, y: -1000, description: 'Quán trà bên đường.' },
  { id: 'thien_long_mon', name: 'Thiên Long Môn', type: 'landmark', region: 'Bắc Đảo', city: 'Vô Kỵ Thành', x: 1010, y: -990, description: 'Cổng thành phía Đông.' },
  { id: 'dia_sat_duong', name: 'Địa Sát Đường', type: 'landmark', region: 'Bắc Đảo', city: 'Vô Kỵ Thành', x: 990, y: -1010, description: 'Nơi giao nhiệm vụ.' },
  { id: 'vo_ngan_hai', name: 'Vô Ngạn Hải', type: 'landmark', region: 'Bắc Đảo', city: 'Vô Kỵ Thành', x: 1100, y: -900, description: 'Bờ biển không bến bờ.' },

  // --- NAM LỤC (South) ---
  // Thành 4: Xích Hỏa Thành
  { id: 'xich_hoa_thanh', name: 'Xích Hỏa Thành', type: 'city', region: 'Nam Lục', x: -1000, y: 1000, description: 'Thành phố nằm cạnh núi lửa.' },
  { id: 'hoa_long_tri', name: 'Hỏa Long Trì', type: 'landmark', region: 'Nam Lục', city: 'Xích Hỏa Thành', x: -1020, y: 1020, description: 'Hồ dung nham nóng chảy.' },
  { id: 'thiet_gia_vien', name: 'Thiết Gia Viện', type: 'landmark', region: 'Nam Lục', city: 'Xích Hỏa Thành', x: -980, y: 980, description: 'Gia tộc rèn sắt.' },
  { id: 'xich_nguyet_lau', name: 'Xích Nguyệt Lầu', type: 'landmark', region: 'Nam Lục', city: 'Xích Hỏa Thành', x: -1000, y: 1050, description: 'Lầu cao sắc đỏ.' },
  { id: 'phong_hoa_dai', name: 'Phong Hỏa Đài', type: 'landmark', region: 'Nam Lục', city: 'Xích Hỏa Thành', x: -1000, y: 950, description: 'Đài báo động.' },
  { id: 'linh_son_tu', name: 'Linh Sơn Tự', type: 'landmark', region: 'Nam Lục', city: 'Xích Hỏa Thành', x: -1050, y: 1000, description: 'Chùa trên núi linh.' },
  { id: 'hoa_van_cac', name: 'Hỏa Vân Các', type: 'landmark', region: 'Nam Lục', city: 'Xích Hỏa Thành', x: -950, y: 1000, description: 'Thư viện cổ.' },
  { id: 'nam_mon_bao', name: 'Nam Môn Bảo', type: 'landmark', region: 'Nam Lục', city: 'Xích Hỏa Thành', x: -1010, y: 1010, description: 'Pháo đài cổng Nam.' },
  { id: 'duong_mon_duong', name: 'Đường Môn Đường', type: 'landmark', region: 'Nam Lục', city: 'Xích Hỏa Thành', x: -990, y: 990, description: 'Nơi bào chế độc dược.' },
  { id: 'thien_hoa_dong', name: 'Thiên Hỏa Động', type: 'landmark', region: 'Nam Lục', city: 'Xích Hỏa Thành', x: -1100, y: 1100, description: 'Động lửa thiên.' },

  // Thành 5: Hoàng Sa Thành
  { id: 'hoang_sa_thanh', name: 'Hoàng Sa Thành', type: 'city', region: 'Nam Lục', x: 0, y: 2000, description: 'Ốc đảo giữa sa mạc.' },
  { id: 'kim_sa_tuu_quan', name: 'Kim Sa Tửu Quán', type: 'landmark', region: 'Nam Lục', city: 'Hoàng Sa Thành', x: 20, y: 2020, description: 'Quán rượu lớn nhất sa mạc.' },
  { id: 'ngoc_mon_quan', name: 'Ngọc Môn Quan', type: 'landmark', region: 'Nam Lục', city: 'Hoàng Sa Thành', x: -20, y: 1980, description: 'Cửa ải quan trọng.' },
  { id: 'phong_tran_cac', name: 'Phong Trần Các', type: 'landmark', region: 'Nam Lục', city: 'Hoàng Sa Thành', x: 50, y: 2000, description: 'Nơi dừng chân của thương nhân.' },
  { id: 'lac_da_thanh', name: 'Lạc Đà Thành', type: 'landmark', region: 'Nam Lục', city: 'Hoàng Sa Thành', x: -50, y: 2000, description: 'Khu vực nuôi lạc đà.' },
  { id: 'thanh_tru_mieu', name: 'Thánh Trụ Miếu', type: 'landmark', region: 'Nam Lục', city: 'Hoàng Sa Thành', x: 0, y: 2050, description: 'Miếu cổ thờ thần cát.' },
  { id: 'linh_xa_dong', name: 'Linh Xà Động', type: 'landmark', region: 'Nam Lục', city: 'Hoàng Sa Thành', x: 0, y: 1950, description: 'Hang rắn linh.' },
  { id: 'duong_to_vien', name: 'Đường Tơ Viện', type: 'landmark', region: 'Nam Lục', city: 'Hoàng Sa Thành', x: 30, y: 1970, description: 'Nơi sản xuất tơ lụa.' },
  { id: 'hoang_hon_dai', name: 'Hoàng Hôn Đài', type: 'landmark', region: 'Nam Lục', city: 'Hoàng Sa Thành', x: -30, y: 2030, description: 'Đài ngắm hoàng hôn.' },
  { id: 'co_thanh_phe_tich', name: 'Cổ Thành Phế Tích', type: 'landmark', region: 'Nam Lục', city: 'Hoàng Sa Thành', x: 100, y: 2100, description: 'Di tích thành cổ.' },

  // Thành 6: Lâm Hải Thành
  { id: 'lam_hai_thanh', name: 'Lâm Hải Thành', type: 'city', region: 'Nam Lục', x: 1000, y: 1000, description: 'Thành phố rừng ven biển.' },
  { id: 'thien_lam_mon', name: 'Thiên Lâm Môn', type: 'landmark', region: 'Nam Lục', city: 'Lâm Hải Thành', x: 1020, y: 980, description: 'Cổng rừng thiên.' },
  { id: 'hai_van_dai', name: 'Hải Vân Đài', type: 'landmark', region: 'Nam Lục', city: 'Lâm Hải Thành', x: 980, y: 1020, description: 'Đài ngắm biển.' },
  { id: 'thien_huong_vien', name: 'Thiên Hương Viện', type: 'landmark', region: 'Nam Lục', city: 'Lâm Hải Thành', x: 1000, y: 950, description: 'Vườn hoa thơm ngát.' },
  { id: 'thu_sinh_cac', name: 'Thư Sinh Các', type: 'landmark', region: 'Nam Lục', city: 'Lâm Hải Thành', x: 1000, y: 1050, description: 'Nơi học tập của văn sĩ.' },
  { id: 'ngu_ong_dao', name: 'Ngư Ông Đảo', type: 'landmark', region: 'Nam Lục', city: 'Lâm Hải Thành', x: 1050, y: 1000, description: 'Đảo của người đánh cá.' },
  { id: 'lam_nguyet_ho', name: 'Lam Nguyệt Hồ', type: 'landmark', region: 'Nam Lục', city: 'Lâm Hải Thành', x: 950, y: 1000, description: 'Hồ trăng xanh.' },
  { id: 'tinh_phong_mon', name: 'Tĩnh Phong Môn', type: 'landmark', region: 'Nam Lục', city: 'Lâm Hải Thành', x: 1010, y: 1010, description: 'Cổng gió lặng.' },
  { id: 'moc_linh_duong', name: 'Mộc Linh Đường', type: 'landmark', region: 'Nam Lục', city: 'Lâm Hải Thành', x: 990, y: 990, description: 'Nơi thờ thần rừng.' },
  { id: 'van_truc_lam', name: 'Vạn Trúc Lâm', type: 'landmark', region: 'Nam Lục', city: 'Lâm Hải Thành', x: 1100, y: 1100, description: 'Rừng trúc vạn dặm.' },

  // --- ĐÔNG HẢI (East) ---
  // Thành 7: Vạn Đảo Thành
  { id: 'van_dao_thanh', name: 'Vạn Đảo Thành', type: 'city', region: 'Đông Hải', x: 2000, y: -1000, description: 'Thành phố trên ngàn hòn đảo.' },
  { id: 'phu_chu_dao', name: 'Phù Chú Đảo', type: 'landmark', region: 'Đông Hải', city: 'Vạn Đảo Thành', x: 2020, y: -980, description: 'Đảo bí ẩn.' },
  { id: 'long_quy_dong', name: 'Long Quy Động', type: 'landmark', region: 'Đông Hải', city: 'Vạn Đảo Thành', x: 1980, y: -1020, description: 'Hang rùa rồng.' },
  { id: 'hai_tieu_dai', name: 'Hải Tiêu Đài', type: 'landmark', region: 'Đông Hải', city: 'Vạn Đảo Thành', x: 2000, y: -950, description: 'Đài quan sát sóng.' },
  { id: 'ngoc_van_duong', name: 'Ngọc Vân Đường', type: 'landmark', region: 'Đông Hải', city: 'Vạn Đảo Thành', x: 2050, y: -1000, description: 'Khu buôn bán ngọc trai.' },
  { id: 'tinh_tu_dao', name: 'Tinh Tú Đảo', type: 'landmark', region: 'Đông Hải', city: 'Vạn Đảo Thành', x: 1950, y: -1000, description: 'Hòn đảo ngắm sao.' },
  { id: 'bac_dau_cac', name: 'Bắc Đẩu Các', type: 'landmark', region: 'Đông Hải', city: 'Vạn Đảo Thành', x: 2010, y: -1010, description: 'Lầu quan sát phương Bắc.' },
  { id: 'hai_su_mon', name: 'Hải Sư Môn', type: 'landmark', region: 'Đông Hải', city: 'Vạn Đảo Thành', x: 1990, y: -990, description: 'Cổng sư tử biển.' },
  { id: 'linh_chau_vien', name: 'Linh Châu Viện', type: 'landmark', region: 'Đông Hải', city: 'Vạn Đảo Thành', x: 2030, y: -1030, description: 'Nơi nghiên cứu sinh vật biển.' },
  { id: 'vo_danh_dao', name: 'Vô Danh Đảo', type: 'landmark', region: 'Đông Hải', city: 'Vạn Đảo Thành', x: 2100, y: -1100, description: 'Hòn đảo không tên.' },

  // Thành 8: Hải Long Thành
  { id: 'hai_long_thanh', name: 'Hải Long Thành', type: 'city', region: 'Đông Hải', x: 2000, y: 0, description: 'Đô thành dưới mặt nước.' },
  { id: 'long_vuong_dien', name: 'Long Vương Điện', type: 'landmark', region: 'Đông Hải', city: 'Hải Long Thành', x: 2020, y: 20, description: 'Cung điện Long Vương.' },
  { id: 'san_ho_lau', name: 'San Hô Lầu', type: 'landmark', region: 'Đông Hải', city: 'Hải Long Thành', x: 1980, y: -20, description: 'Lầu xây từ san hô.' },
  { id: 'cu_nhan_bao', name: 'Cự Nhẫn Bảo', type: 'landmark', region: 'Đông Hải', city: 'Hải Long Thành', x: 2050, y: 0, description: 'Pháo đài ngầm.' },
  { id: 'tinh_trieu_ngan', name: 'Tinh Triều Ngạn', type: 'landmark', region: 'Đông Hải', city: 'Hải Long Thành', x: 1950, y: 0, description: 'Bờ cát lấp lánh.' },
  { id: 'thuy_tinh_cung', name: 'Thủy Tinh Cung', type: 'landmark', region: 'Đông Hải', city: 'Hải Long Thành', x: 2000, y: 50, description: 'Cung điện pha lê.' },
  { id: 'minh_chau_tri', name: 'Minh Châu Trì', type: 'landmark', region: 'Đông Hải', city: 'Hải Long Thành', x: 2000, y: -50, description: 'Hồ ngọc trai.' },
  { id: 'u_minh_vuc', name: 'U Minh Vực', type: 'landmark', region: 'Đông Hải', city: 'Hải Long Thành', x: 2030, y: 30, description: 'Vực sâu tối tăm.' },
  { id: 'hac_kinh_vien', name: 'Hắc Kình Viện', type: 'landmark', region: 'Đông Hải', city: 'Hải Long Thành', x: 1970, y: -30, description: 'Khu vực cá voi đen.' },
  { id: 'hai_than_tru', name: 'Hải Thần Trụ', type: 'landmark', region: 'Đông Hải', city: 'Hải Long Thành', x: 2100, y: 100, description: 'Cột trụ thần biển.' },

  // Thành 9: Lưu Ly Thành
  { id: 'luu_ly_thanh', name: 'Lưu Ly Thành', type: 'city', region: 'Đông Hải', x: 2000, y: 1000, description: 'Thành phố ánh sáng rực rỡ.' },
  { id: 'nguyet_ha_lau', name: 'Nguyệt Hạ Lầu', type: 'landmark', region: 'Đông Hải', city: 'Lưu Ly Thành', x: 2020, y: 1020, description: 'Lầu dưới ánh trăng.' },
  { id: 'tinh_trieu_mon', name: 'Tinh Triều Môn', type: 'landmark', region: 'Đông Hải', city: 'Lưu Ly Thành', x: 1980, y: 980, description: 'Cổng triều tinh.' },
  { id: 'linh_lan_vien', name: 'Linh Lan Viện', type: 'landmark', region: 'Đông Hải', city: 'Lưu Ly Thành', x: 2000, y: 1050, description: 'Vườn hoa linh lan.' },
  { id: 'phong_van_lau', name: 'Phong Vân Lầu', type: 'landmark', region: 'Đông Hải', city: 'Lưu Ly Thành', x: 2000, y: 950, description: 'Lầu cao đón gió.' },
  { id: 'di_hoa_cung', name: 'Di Hoa Cung', type: 'landmark', region: 'Đông Hải', city: 'Lưu Ly Thành', x: 2050, y: 1000, description: 'Cung điện của hoa.' },
  { id: 'tuyet_yue_dai', name: 'Tuyệt Nguyệt Đài', type: 'landmark', region: 'Đông Hải', city: 'Lưu Ly Thành', x: 1950, y: 1000, description: 'Đài cao nhất thành.' },
  { id: 'bach_ngọc_đường', name: 'Bạch Ngọc Đường', type: 'landmark', region: 'Đông Hải', city: 'Lưu Ly Thành', x: 2010, y: 990, description: 'Phố buôn bán ngọc.' },
  { id: 'phu_tu_mon', name: 'Phù Tử Môn', type: 'landmark', region: 'Đông Hải', city: 'Lưu Ly Thành', x: 990, y: 1010, description: 'Cổng trường học.' },
  { id: 'vo_bien_hai', name: 'Vô Biên Hải', type: 'landmark', region: 'Đông Hải', city: 'Lưu Ly Thành', x: 2100, y: 1100, description: 'Biển không biên giới.' },
];
