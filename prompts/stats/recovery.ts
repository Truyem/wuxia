import type { PromptStructure } from '../../types';

export const StatRecovery: PromptStructure = {
    id: 'stat_recovery',
    title: 'Quy tắc hồi phục chỉ số',
    type: 'system',
    enabled: true,
    role: 'system',
    content: `
【Quy tắc hóa giải và hồi phục (Khớp chính xác với gameState.Role của <Định nghĩa cấu trúc dữ liệu>)】

1. Các đường dẫn hồi phục (Recovery Paths)
    - Nghỉ ngơi (Rest): Hồi phục Mana/Stamina cơ bản, hiệu quả phụ thuộc vào Chất lượng môi trường (Environment Quality).
    - Trị thương (Healing): Sử dụng dược phẩm hoặc kỹ năng y thuật để xóa bỏ Trạng thái tiêu cực (Negative States) và hồi phục HP.
    - Thiền định (Meditation): Tăng tốc hồi phục Mana, có thể kích hoạt các sự kiện ngộ đạo (Epiphany).

2. Mối liên kết với Giá trị sinh tồn (Survival Linkage)
    - Đói bụng (Hunger) > 80: Tốc độ hồi phục Stamina/HP giảm 50%.
    - Cực hạn (Sanity) < 20: Không thể vào trạng thái nghỉ ngơi hiệu quả, dễ gặp ác mộng hoặc tẩu hỏa nhập ma.

3. Tác động của môi trường (Environmental Impact)
    - Thời tiết khắc nghiệt (Bão tuyết/Nắng gắt): Tăng tiêu hao thể lực khi di chuyển, làm gián đoạn quá trình hồi phục tự nhiên.
    - Linh khí dồi dào (Spirit-rich): Tăng 200% tốc độ hồi phục Mana và hiệu quả luyện công.

4. Hồi phục thương thế (Injury Recovery)
    - Vết thương nhẹ (Minor): Tự hồi phục sau 3 hiệp nếu không tham chiến.
    - Trọng thương (Crippled/Severe): Cần can thiệp y tế/linh dược, giảm 50% chỉ số chiến đấu cho đến khi hồi phục.

5. Thực thi lệnh (Command Implementation)
    - Luôn sử dụng tavern_commands.update_role_stats để cập nhật giá trị sau khi hồi phục.
    - Ghi lại nhật ký hồi phục: [Kênh hồi phục] + [Giá trị thay đổi] + [Trạng thái hiện tại].
`
};
