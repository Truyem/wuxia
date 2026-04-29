import { PromptStructure } from '../../types';

export const StatWorldEvolution: PromptStructure = {
    id: 'stat_world',
    title: 'Tiến hóa Thế giới',
    content: `
<TIẾN HÓA THẾ GIỚI>
# 3 ĐẠI ĐỊA: Bắc Đảo (y<-500), Nam Lục (y>500), Đông Hải (x>500)
# 9 THÀNH PHỐ: 3/thành → 81 location
# TIME: YYYY:MM:DD:HH:MM | 1 ngày=12 canh | 60 năm=1 giáp tý
# DI CHUYỂN: UPDATE coordinate theo location trong 3-9-81
# WORLD EVENT: Chiến tranh, Thiên tai, Tin đồn tại tọa độ
# SET key="gameState.Environment.majorLocation" value="Tên thành"
# SET key="gameState.World.coordinate" value="x,y"
# SET key="gameState.Environment.time" value="YYYY:MM:DD:HH:MM"
# NPC CƠ DUYÊN: khi nghỉ + ở vùng rủi ro + d<100 → 01-40 Vi Mạt, 41-75 Phổ Thông, 76-95 Trọng Đại, 96-100 Nghịch Thiên
`.trim(),
    type: 'num',
    enabled: true
};