
import { PromptStructure } from '../../types';

export const coreMemoryLaws: PromptStructure = {
    id: 'core_memory_rules',
    title: 'Quy tắc ghi nhớ của NPC',
    content: `
<Quy tắc viết ký ức NPC>
【Quy tắc ghi nhớ của NPC】
**Luật sắt**: NPC không phải là những con rối chỉ biết nói, họ có ký ức được duy trì dựa trên \`cấu trúc NPC\`.

1. **Định vị dữ liệu**:
   - Tất cả dữ liệu NPC được lưu trữ trong mảng \`gameState.Social\`.
   - Định dạng đường dẫn: \`gameState.Social[Index].Memory\`.

2. **Lập hồ sơ và ghi nhớ (Thiết yếu)**:
   - Đối với NPC **đã lập hồ sơ**: Sau mỗi lần tương tác hiệu quả (đối thoại, giao dịch, chiến đấu, ủy thác, sự kiện H), phải thêm một bản ghi vào mảng ký ức của NPC đó.
   - Đối với NPC **chưa lập hồ sơ**: Trước tiên phán định xem có lập hồ sơ hay không.
     - Người qua đường một lần (như "Người qua đường A") mặc định không lập hồ sơ, không ghi ký ức xã hội.
     - Khi nhân vật có vai trò then chốt trong cốt truyện, hoặc tích lũy tương tác với người chơi quá 3 lần (dựa trên xem lại cốt truyện tức thời/ký ức tức thời), cho phép lập hồ sơ.
   - Trước khi lập hồ sơ phải kiểm tra trùng lặp (tên/id):
     - Khớp với nhân vật đã có: Cập nhật nhân vật cũ, không được lặp lại \`push gameState.Social\`.
     - Không khớp và đủ điều kiện lập hồ sơ: Thực hiện \`push gameState.Social\` để tạo trước, sau đó mới ghi \`gameState.Social[i].Memory\`.
   - Khi lập hồ sơ mới cần ghi bổ sung các ký ức tương tác then chốt trước đó, sau đó mới thêm ký ức của vòng này, tránh đứt gãy ký ức.
   - Định dạng lệnh: 
     \`push gameState.Social[TargetIndex].Memory { "Content": "...", "Time": "317:03:16:09:45" }\`
   - **Định dạng thời gian**: Sử dụng thời gian có cấu trúc \`YYYY:MM:DD:HH:MM\`.

3. **Cập nhật thuộc tính phẳng**:
   - Khi xảy ra sự kiện H, cập nhật trực tiếp các thuộc tính dưới nút gốc.
   - Ví dụ:
     - \`add gameState.Social[0].Count_Mouth 1\`
     - \`set gameState.Social[0].Is virgin? false\`
     - \`set gameState.Social[0].First Night Taker "Tên người chơi"\`

4. **Ứng dụng ký ức**:
   - Trước khi tạo đối thoại, phải truy xuất danh sách \`Memory\` (Ký ức) của NPC đó.
   - Điều chỉnh mức độ xấu hổ và phản ứng của NPC dựa trên \`Private summary description\` (Mô tả riêng tư tổng quát) và trạng thái \`Is virgin?\` (Còn trinh hay không).
</NPCMemory writing laws>
`.trim(),
    type: 'core setting',
    enabled: true
};
