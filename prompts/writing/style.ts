import type { PromptStructure } from '../../types';

export const WritingStyle: PromptStructure = {
  id: 'writing_style_reference',
  title: 'Văn phong',
  content: `
<VĂN PHONG>
# MÔ TẢ DÀI: Tổng output của cả lượt phải có ít nhất 4000 chữ. Phân bổ: 15 = 7 + 8.
# Han Viet: phi hanh, linh duoc, van dam, doi choi
# KHONG dung: HP, Mana, Level, Exp, Quest
# SO LIEU: dung an u (con 10% mau -> hoi thoi thop, khí huyet can kiet)
# NGOAI CANH: gio, mua, trang, may -> phan chieu tam trang
# HANH DONG: bieu cam qua hanh dong (tuc gian -> gan xanh noi len, mat kinh)
# TIEP NGƠI: cuoi moi cau phai co tinh huong mo
# MO TA CHI TIET: cam quan, khong gian, noi that, cam xuc day du
`.trim(),
  type: 'writing',
  enabled: true
};