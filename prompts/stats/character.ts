import { PromptStructure } from '../../types';

export const StatCharacter: PromptStructure = {
    id: 'stat_char',
    title: 'Giao thức Thuộc tính Nhân vật',
    content: `
<character_attribute_protocol>
# 【Quy tắc Giá trị Nhân vật (Ánh xạ vào các trường dự án)】
Module này xử lý các cập nhật hợp lệ của \`gameState.Character\`. Phải duy nhất quán với <Định nghĩa Cấu trúc Dữ liệu>, <Giao thức Đồng bộ Dữ liệu>, và <Giao thức Chuỗi Suy nghĩ>.

## 1. Định danh Trường (BẮT BUỘC sử dụng các khóa Tiếng Anh này)
- **Danh tính Cơ bản**: \`name / gender / age / birthday / appearance / title / realm\`
- **Trục Tăng trưởng**: \`currentExp / levelUpExp\`
- **Lục Căn (Thuộc tính)**: \`strength / agility / constitution / root / comprehension / luck\`
- **Tâm thái**: \`mentality\`
- **Sinh tồn**: \`spiritCurrent / spiritMax\`, \`hungerCurrent / hungerMax\`, \`thirstCurrent / thirstMax\`
- **Cân nặng**: \`weightCurrent / weightMax\` (Đơn vị: Cân/Jin)
- **Tiền tệ**: \`currency.gold / silver / copper\`
- **Trạng thái Chiến đấu**: 7 bộ phận cơ thể với \`currentHp / maxHp / status\`
- **Tài nguyên**: \`gameState.Equipment / gameState.Inventory / gameState.Kungfu / playerBuffs\`

## 2. Ràng buộc Cứng khi Cập nhật Giá trị
- Mọi lệnh \`ADD\` phải kiểm tra biên: \`Giá trị Hiện tại >= 0\`. Nếu có giới hạn: \`Giá trị Hiện tại <= Giá trị Tối đa\`.
- **KHÔNG CÓ DẪN TRUYỆN NẾU KHÔNG CÓ LỆNH**: Tuyệt đối không miêu tả thay đổi mà không có lệnh tương ứng.
- **KHÔNG CÓ LỆNH NẾU KHÔNG CÓ DẪN TRUYỆN**: Các lệnh phải được giải thích hợp lý qua logs cốt truyện.
- Tăng trưởng phải logic: Các mức tăng lớn đòi hỏi thời gian, rủi ro, tài nguyên hoặc giải thích cốt truyện rõ ràng.
- Các trường tiền tệ tuyệt đối không được âm. Không tạo các đường dẫn tùy tiện như \`gameState.Gold Coin\`.

## 3. Định nghĩa Thuộc tính (Căn cứ Phán định)
- **strength (Sức mạnh)**: Xuyên giáp, sức tải, áp chế vật lý trực tiếp.
- **agility (Thân pháp)**: Tốc độ ra đòn, độ chính xác, né tránh, tốc độ di chuyển.
- **constitution (Thể chất)**: Giới hạn HP, khả năng chịu đựng, sức bền chiến đấu.
- **root (Căn cốt)**: Sự ổn định hồi phục, sức chịu đựng kinh mạch.
- **appearance (Dung mạo)**: Sức hút, phong thái, trang phục (Phong cách Cyberpunk/Wuxia).
- **personality (Tính cách)**: Khí chất, phong cách hành vi, triết lý cốt lõi (Nhất quán với \`mentality\` và \`root\`).
- **comprehension (Ngộ tính)**: Tốc độ học kỹ năng, tăng trưởng thuần thục, nhận diện điểm yếu chiêu thức.
- **luck (May mắn)**: Điều chỉnh xác suất cho các kỳ ngộ và vật phẩm hiếm (không phải là bảo chứng).

## 4. Liên kết Module
- Chiến đấu thời gian thực: Tuân theo <Giao thức Định nghĩa Chiến đấu> + <Giao thức HP Bộ phận>.
- Kinh nghiệm/Cấp độ: Tuân theo <Giao thức Tăng trưởng Kinh nghiệm>.
- Tu vi/Đột phá: Tuân theo <Giao thức Hệ thống Tu vi>.
- Hồi phục/Nghỉ ngơi: Tuân theo <Giao thức Hồi phục Nghỉ ngơi>.
- Rơi đồ/Kinh tế: Tuân theo <Giao thức Rơi Tài nguyên>.

## 5. Mở rộng Tùy chọn (Phải được khởi tạo trước)
- \`gameState.Character.realmTier\` (Số; mặc định là 1 nếu thiếu)

## 6. Ví dụ Lệnh (Hợp lệ)
- \`{"action": "ADD", "key": "gameState.Character.currentExp", "value": 36}\`
- \`{"action": "ADD", "key": "gameState.Character.spiritCurrent", "value": -18}\`
- \`{"action": "SET", "key": "gameState.Character.chest.status", "value": "Trung thương"}\`
- \`{"action": "SET", "key": "gameState.Character.currency.silver", "value": 27}\`

</character_attribute_protocol>
`,
    type: 'num',
    enabled: true
};
