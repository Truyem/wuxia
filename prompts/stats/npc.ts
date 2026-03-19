import { PromptStructure } from '../../types';

export const StatNpcReference: PromptStructure = {
    id: 'stat_npc',
    title: 'Mẫu Tham khảo Chỉ số NPC',
    content: `
<giao_thuc_chi_so_npc>
【Mẫu NPC (Hồ sơ xã giao + Chỉ số đội nhóm + Trạng thái tại chỗ)】
Giao thức này dùng cho việc tạo, hiệu chuẩn và cập nhật \`gameState.Giao tiếp[i]\`; việc thực hiện lệnh tuân thủ <Giao thức đồng bộ dữ liệu> và <Giao thức suy nghĩ trước COT>.

1. Các trường bắt buộc khi lập hồ sơ (Phải đầy đủ khi tạo)
- \`id, Họ tên, Giới tính, Tuổi, Cảnh giới, Thân phận\`
- \`Có mặt hay không, Có phải đồng đội không, Có phải nhân vật chính không\`
- \`Độ hảo cảm, Trạng thái quan hệ, Giới thiệu, Ký ức[]\`
- Phần tử \`Memory[]\` cố định: \`{Content (Nội dung), Time (Thời gian - YYYY:MM:DD:HH:MM)}\`
- \`id\` chỉ cho phép “tiền tố ngắn + ba chữ số” (vd: \`NPC001\`), cấm tên tiếng Anh đầy đủ, phiên âm pinyin hoặc chuỗi dài có nghĩa.

2. Mở rộng cho đồng đội (Chỉ bắt buộc khi \`Có phải đồng đội không=true\`)
- \`Lực tấn công, Lực phòng ngự, Thời gian cập nhật cuối\`
- \`Máu hiện tại, Máu tối đa, Tinh lực hiện tại, Tinh lực tối đa\`
- \`Trang bị hiện tại?, Túi đồ?\`

3. Logic tại chỗ (Nghiêm ngặt)
- Người tham gia tương tác trong cảnh hiện tại phải có \`Có mặt hay không=true\`.
- NPC không tại chỗ mặc định không được viết "Ký ức tương tác trực tiếp trong cảnh này".
- Hiệp rời cảnh phải \`set Có mặt hay không false\`; khi vào cảnh cần có tự sự xuất hiện rõ ràng trước khi đặt thành true.
- Quy trình gia nhập đội tạm thời: Trước tiên \`set Có phải đồng đội không true\`, sau đó bổ sung các trường mở rộng cho đồng đội.

4. Định nghĩa tham khảo lực chiến (Công thức độc lập, không phụ thuộc người chơi)
- Cấm dùng thuộc tính người chơi để suy ngược sức mạnh NPC.
- Trước tiên xác định "Bậc chiến đấu" của NPC:
  - \`Bình dân/Không chiến đấu\`
  - \`Tạp binh\`
  - \`Tinh nhuệ\`
  - \`Thủ lĩnh\`
  - \`Tông sư/Thiên kiêu\`
- Sau đó tính toán độc lập dựa trên Bậc + Cấp độ cảnh giới + Chỉnh sửa trang bị:
  - \`Lực tấn công = floor((Giá trị tấn công gốc theo bậc + Cấp độ cảnh giới*6 + Chỉnh sửa vũ khí) * Hệ số trạng thái)\`
  - \`Lực phòng ngự = floor((Giá trị phòng ngự gốc theo bậc + Cấp độ cảnh giới*5 + Chỉnh sửa giáp) * Hệ số trạng thái)\`
  - \`Máu tối đa = floor(Giá trị máu gốc theo bậc + Cấp độ cảnh giới*35 + Chỉnh sửa thể chất)\`
  - \`Tinh lực tối đa = floor(Giá trị tinh lực gốc theo bậc + Cấp độ cảnh giới*28 + Chỉnh sửa nội tức)\`
- Gợi ý giá trị gốc theo bậc:
  - Bình dân: Công 4 / Thủ 3 / Máu 60 / Tinh 40
  - Tạp binh: Công 10 / Thủ 8 / Máu 110 / Tinh 70
  - Tinh nhuệ: Công 18 / Thủ 14 / Máu 170 / Tinh 110
  - Thủ lĩnh: Công 30 / Thủ 24 / Máu 260 / Tinh 170
  - Tông sư/Thiên kiêu: Công 45 / Thủ 36 / Máu 360 / Tinh 240
- Đọc cấp độ cảnh giới:
  - Nếu đã tồn tại trường mở rộng \`Realm tiers\` (Cấp độ cảnh giới) thì sử dụng trực tiếp.
  - Nếu không có trường này, hãy ánh xạ văn bản \`Realm\` (Cảnh giới) sang 1~9 (cùng trục với <Giao thức hệ thống tu luyện>) và giải thích căn cứ ánh xạ trong phần thinking.

5. Sự nhất quán giá trị và Ranh giới
- \`Máu hiện tại <= Máu tối đa\`, \`Tinh lực hiện tại <= Tinh lực tối đa\`.
- Khi chuyển sang đồng đội (true) phải bổ sung đầy đủ các trường chiến đấu; khi chuyển ngược lại (false) có thể giữ lại giá trị lịch sử nhưng không bắt buộc cập nhật liên tục.
- Cấm "thân phận bình dân nhưng chỉ số cấp Tông sư" mà không có căn cứ cốt truyện.

6. Sự nhất quán Xã giao và Ký ức
- Cập nhật \`Affinity/Favorability/Relationship status\` (Độ hảo cảm/Trạng thái quan hệ) và thêm \`Memory\` (Ký ức) sau các tương tác then chốt.
- Ký ức phải có thể truy xuất, cấm dùng "thời gian không xác định" thay cho thời gian có cấu trúc.
- Cùng tên/cùng id ưu tiên cập nhật, không push thêm hồ sơ mới lặp lại.
- Nhân vật nữ quan trọng nên duy trì bốn biến điều hướng quan hệ:
  - \`Đặc điểm tính cách cốt lõi\`: Một câu neo giữ logic hành vi lâu dài (tránh thay đổi xoạch xoạch).
  - \`Điều kiện đột phá độ hảo cảm\`: Điều kiện kích hoạt để chuyển từ giai đoạn hiện tại sang giai đoạn tiếp theo.
  - \`Điều kiện đột phá quan hệ\`: Điều kiện kích hoạt thăng cấp/ngoặt hướng của trạng thái quan hệ.
  - \`Biến mạng lưới quan hệ\`: Mảng cạnh quan hệ (Tên đối tượng/Quan hệ/Ghi chú), dùng để thể hiện "ai có quan hệ gì với ai".
- Khi phong cách cốt truyện là \`NTL Hậu cung\`, bốn mục trên của nhân vật nữ then chốt nên được coi là các trường duy trì thường trực.
- Quy tắc vàng khi lập hồ sơ đầy đủ cho nhân vật nữ quan trọng (\`Giới tính = Nữ và Nhân vật chính = true\`):
  - Hiệp lập hồ sơ phải viết đủ một lần: Bốn mục điều hướng quan hệ + Ba mục ngoại hình + Các trường Hồ sơ bí mật khuê phòng.
  - \`Biến mạng lưới quan hệ\` ít nhất 2 dòng (ít nhất chứa 1 dòng quan hệ tình cảm nam giới đã có + 1 dòng quan hệ ràng buộc gia tộc/thế lực).
  - Các trường đếm Hồ sơ bí mật khuê phòng (\`Số lần_Miệng/Số lần_Ngực/Số lần_Âm đạo/Số lần_Hậu môn/Số lần_Cao trào\`) khi lập hồ sơ nên khởi tạo là \`0\`.
  - Đối với các nhân vật nữ quan trọng đã có, nếu phát hiện thiếu mục, phải bổ sung ngay trong lệnh hiệp này, cấm trì hoãn.

7. Ranh giới mở rộng riêng tư (Chỉ có thể viết khi tồn tại trường)
- Các trường khả dụng: \`Đặc chất riêng tư\` và các trường mở rộng xã giao khác.
- Thống kê đêm đầu và số lần thực hiện nghiêm ngặt theo định danh người chơi:
  - Chỉ thống kê tương tác "với người chơi".
  - Nếu đối tượng không phải người chơi, cấm viết \`Người đoạt đêm đầu/Thời gian đêm đầu/Mô tả đêm đầu\`.

8. Quy tắc đặt tên và Thân phận (Bắt buộc)
- **Họ tên (Name)**: CẤM TUYỆT ĐỐI việc sử dụng các danh từ chung, nghề nghiệp hay chức danh (VD: "Thương nhân", "Tiểu nhị", "Đạo tặc", "Dược sư") làm tên gọi chính trong trường \`Họ tên\`.
- Mỗi NPC phải có một cái tên riêng biệt mang phong vị kiếm hiệp (gồm Họ + Tên).
- **Thân phận (Identity/Profession)**: Đây mới là nơi để ghi nghề nghiệp hoặc vị trí xã hội của NPC (VD: "Thương nhân bán thảo dược", "Tiểu nhị quán trà", "Sát thủ ẩn danh").
- Ví dụ đúng: \`Họ tên: "Chu Vạn Phát"\`, \`Thân phận: "Thương nhân giàu có"\`.
- Ví dụ sai: \`Họ tên: "Thương nhân"\`, \`Thân phận: "Bán thuốc"\`.

</giao_thuc_chi_so_npc>
`,
    type: 'num',
    enabled: true
};
