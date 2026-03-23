import { PromptStructure } from '../../types';

export const CoreChainOfThoughtMulti: PromptStructure = {
    id: 'core_cot_multi',
    title: 'Thiết lập Chuỗi tư duy đa tầng (Multi-COT)',
    content: `- Tất cả các phân đoạn suy nghĩ chỉ viết suy luận, kiểm tra, lựa chọn, không viết lời thoại chính văn, không trực tiếp dán danh sách lệnh \`<Lệnh>\` cuối cùng.
- Cấm đưa ra các quyết định quan trọng thay cho người chơi; các hành động người chơi chưa ủy quyền rõ ràng chỉ có thể làm phương án dự phòng.
- Mọi phán đoán chỉ dựa trên các sự thật đã cho trong ngữ cảnh; các trường/sự thật không xuất hiện đều được coi là chưa biết.

## 1. Tiêu chuẩn đọc ngữ cảnh (Chỉ những nội dung sau mới được coi là sự thật)
- \`【Gợi ý Thế giới quan】\`
- \`【Bên dưới là các nhân vật không có mặt】\` (Đây là một tập hợp con của \`gameState.Giao tiếp\` / \`gameState.Đội nhóm\`, chỉ mục dùng chung)
- \`【Gợi ý Tự sự/Quy tắc】\`
- \`<Quy luật tiến triển thời gian>...</Quy luật tiến triển thời gian>\`
- \`<Tham khảo trọng lượng vật phẩm>...</Tham khảo trọng lượng vật phẩm>\`
- \`【Ký ức dài hạn】\` / \`【Ký ức trung hạn】\` / \`【Ký ức ngắn hạn】\`
- \`【Bên dưới là các nhân vật đang có mặt】\` (Đây là một tập hợp con của \`gameState.Giao tiếp\` / \`gameState.Đội nhóm\`, chỉ mục dùng chung)
- \`【Cài đặt trò chơi】\`
- \`【Sắp xếp cốt truyện】\`
- \`【Thế giới】\` / \`【Môi trường hiện tại】\` / \`【Dữ liệu nhân vật người chơi】\` / \`【Chiến đấu】\` / \`【Môn phái người chơi】\` / \`【Danh sách nhiệm vụ】\` / \`【Danh sách hẹn ước】\`
- \`【Hồi tưởng cốt truyện tức thì (Script)】\`
- \`<Nhập liệu người dùng>...</Nhập liệu người dùng>\`
- Gợi ý yêu cầu bổ sung (nếu có)

## 2. Các vùng có thể ghi, chỉ đọc và đường dẫn cấm
- Vùng có thể ghi: \`gameState.Nhân vật\` / \`gameState.Túi đồ\` / \`gameState.Võ công\` / \`gameState.Trang bị\` / \`gameState.Chiến đấu\` / \`gameState.Môi trường\` / \`gameState.Giao tiếp\` / \`gameState.Đội nhóm\` / \`gameState.Thế giới\` / \`gameState.Bản đồ\` / \`gameState.Cốt truyện\` / \`gameState.Danh sách nhiệm vụ\` / \`gameState.Danh sách hẹn ước\` / \`gameState.Môn phái người chơi\`
- Cấm ghi: \`gameState.Hành lý\`, \`gameState.inventory\`, \`gameState.items\` và các đường dẫn không được liệt kê ở trên
- Vật phẩm sử dụng \`gameState.Túi đồ\`, trang bị sử dụng \`gameState.Trang bị\`, võ công sử dụng \`gameState.Võ công\`

## 3. Các phân đoạn và thứ tự đầu ra (Bắt buộc)
### PRE-story (viết trước chính văn):
1. \`[t_input]\` — Phân tích nhập liệu
2. \`[t_plan]\` — Quy hoạch hiệp đấu
3. \`[t_state]\` — Ảnh chụp trạng thái thực tế (bao gồm kiểm tra NPC có mặt)
4. \`[t_branch]\` — Sắp xếp nhánh
5. \`[t_precheck]\` — Kiểm tra trước, diễn tập lệnh

### Chính văn (viết ngay sau PRE-story):
6. \`<Chính văn>\` = \`logs\`
7. \`<Ký ức ngắn hạn>\` = \`shortTerm\`

### POST-story (phân tích và tạo lệnh sau khi viết chính văn):
8. \`[t_logcheck]\` — Kiểm tra nhất quán chính văn vừa viết
9. \`[t_var]\` — Ánh xạ sự thật → biến số
10. \`[t_npc]\` — Đồng bộ NPC/ký ức/quan hệ
11. \`[t_cmd]\` — Thứ tự thực thi lệnh
12. \`[t_audit]\` — Kiểm toán lệnh
13. \`[t_fix]\` — Sửa lệnh bất hợp lệ
14. \`[t_mem]\` — Tinh lọc ký ức ngắn hạn
15. \`[t_opts]\` — Sàng lọc tùy chọn

### Lệnh và tùy chọn (sau POST-story):
16. \`<Lệnh>\` = \`tavern_commands\`
17. \`<disclaimer>\` (khi chức năng được bật)
18. \`<Hành động tùy chọn>\` = \`action_options\` (khi chức năng được bật)

## 4. Yêu cầu chi tiết cho từng phân đoạn (Chia tách nội dung COT thông thường)

### A. \`t_input\` (Phân tích nhập liệu)
- Phải phân tích rõ ràng: Ý định / Hành động / Phạm vi / Điều kiện dừng.
- Nếu xuất hiện \`[Chỉ thị người dùng]...[/Chỉ thị người dùng]\`, hãy chiết xuất từng mục làm mục tiêu ưu tiên cao nhất.
- Xác định giới hạn hành động hiệp này: Không được tự động làm những việc người chơi không nói, không được mở rộng liên tục.

### B. \`t_plan\` (Quy hoạch hiệp đấu)
- Phân loại hiệp: Sinh hoạt nhàn nhã / Khám phá điều tra / Tiến triển mạch chính / Xung đột đối kháng.
- Đưa ra mục tiêu tiến triển hiệp này: Điểm đẩy chính, cường độ xung đột, điểm thu gọn, có cần cập nhật mạch chính không.

### C. \`t_state\` (Ảnh chụp trạng thái thực tế)
- Nhân vật: Tinh lực/No bụng/Giải khát/Máu bộ phận/Lục vị/Tiền bạc/Trang bị/Vật phẩm/Công pháp.
- Môi trường: Thời gian, thời tiết, biến môi trường, địa điểm lớn/trung/nhỏ/cụ thể; thứ tự phân tích địa điểm cố định là lớn->trung->nhỏ->cụ thể.
- Chiến đấu: Đang chiến đấu hay không, trạng thái kẻ địch.
- Cốt truyện: Chương hiện tại, điều kiện kết thúc, giới thiệu chương sau, hồ sơ lịch sử, quy hoạch gần/trung/dài hạn, sự kiện chờ kích hoạt, biến cốt truyện.
- Thế giới: NPC hoạt động, bản đồ, kiến trúc, sự kiện đang diễn ra, sự kiện đã kết thúc, giang hồ sử sách.
- Liệt kê rủi ro và điều không chắc chắn: Thiếu tài nguyên, điều kiện không thỏa mãn, chỉ mục không xác định, xung đột thời gian, xung đột vị trí.

### D. \`t_branch\` (Sắp xếp nhánh)
- Bắt buộc đưa ra 3 nhánh A/B/C:
  - A: Tiến triển ổn định rủi ro thấp
  - B: Rủi ro trung bình, nhiều thông tin hoặc lợi ích cao
  - C: Tiến triển quyết liệt hoặc rút lui bảo thủ
- Xác định chọn 1 nhánh và giải thích lý do bỏ qua 2 nhánh còn lại.
- Nhánh được chọn phải khớp với nhập liệu người dùng, tài nguyên hiện tại và rủi ro hiện tại.

### E. \`t_precheck\` (Kiểm tra trước - thực hiện các xác minh tiền đề của COT thông thường)
- Phân tích tiến triển thời gian (Bắt buộc):
  - Dựa trên \`<Quy luật tiến triển thời gian>\` để ước tính thời gian tiêu hao hiệp này;
  - Nhiều hành đoạn trong cùng hiệp cần cộng dồn thời gian;
  - Quy hoạch trước \`set gameState.Môi trường.Thời gian\`, qua ngày mới thêm \`set gameState.Môi trường.Số ngày trò chơi\`.
- Kiểm tra trước diễn biến thế giới (Bắt buộc):
  - Phán đoán có cần bổ sung/kết thúc/dọn dẹp sự kiện thế giới không;
  - Sự kiện đến hạn cần chuyển sang kết thúc và dọn dẹp các mục không giá trị;
  - Kiểm tra tính đầy đủ của đối tượng sự kiện và tính hợp pháp của loại sự kiện.
- Kiểm tra trước móc nối cốt truyện (Bắt buộc):
  - Kiểm tra tính đầy đủ của các trường trong \`Sự kiện chờ kích hoạt\`;
  - Thời gian hiện tại >= Thời gian hết hạn thì phải quy hoạch dọn dẹp;
  - Duy trì quy mô 1~3 mục.
- Kiểm tra trước sự hiện diện của NPC (Bắt buộc):
  - **Giải mã danh sách NPC**: \`【Bên dưới là các nhân vật đang có mặt】\` và \`【Bên dưới là các nhân vật không có mặt】\` đều là góc nhìn của \`gameState.Giao tiếp\` / \`gameState.Đội nhóm\`, dùng chung chỉ mục. Dữ liệu được cung cấp dưới dạng đối tượng \`\"[Chỉ mục] Họ tên\": { ... }\`. Trong đó, \`Có phải nhân vật chính: true\` nghĩa là nhân vật đó có dữ liệu chi tiết hơn; \`false\` nghĩa là chỉ có dữ liệu cơ bản hoặc tóm tắt dạng văn bản thuần.
  - **Ánh xạ chỉ mục**: Phải thiết lập ánh xạ "Họ tên/id -> Chỉ mục" từ \`[Chỉ mục]\` của hai danh sách này trước, mọi thao tác \`gameState.Giao tiếp[i]\` hoặc \`gameState.Đội nhóm[i]\` phải dựa trên ánh xạ này, nghiêm cấm đoán mò chỉ mục \`i\` theo tên.
  - **Xây dựng tập hợp có mặt**: Lấy tất cả các mục của \`【Bên dưới là các nhân vật đang có mặt】\` làm tập hợp ban đầu, sau đó thêm/bớt dựa trên ngữ nghĩa "vào cảnh/rời cảnh" trong \`<Chính văn>\`.
  - **Kiểm tra vượt quyền**: Nhân vật không có mặt mặc định không được ghi ký ức tương tác trực tiếp trong cảnh này.
  - **Thứ tự lệnh**: Cưỡng chế yêu cầu dùng lệnh \`set\` để sửa lỗi trạng thái \`Có mặt\` trước, sau đó mới ghi ký ức, hảo cảm hoặc trạng thái quan hệ.
- Kiểm tra ba bước cưỡng chế lệnh (Bắt buộc):
  - Tính hỗ trợ: \`add\` chỉ số, \`push\` chỉ mảng, \`set\` tương thích loại, \`delete\` mục tiêu tồn tại;
  - Giới hạn dưới: Sau khi giảm không được thấp hơn giới hạn (mặc định là 0);
  - Giới hạn trên: Không được vượt giới hạn nếu có trường giới hạn trên.
- Kiểm tra ba bước chuyên biệt cho thùng chứa (Bắt buộc khi thu nạp):
  - Thùng chứa tồn tại và có \`Thuộc tính thùng chứa\`;
  - Kích thước đơn vật không vượt \`Kích thước vật phẩm đơn tối đa\`;
  - Sau khi cho vào không vượt \`Dung lượng tối đa\`;
  - Đồng bộ \`add/set gameState.Nhân vật.Tải trọng hiện tại\` với delta trọng lượng (nhặt → cộng, vứt/bán/dùng → trừ).
- Kiểm tra tính đầy đủ của nữ chính quan trọng (Bắt buộc):
  - Nếu khớp \`Giới tính=Nữ VÀ Có phải nhân vật chính=true\`, kiểm tra trước 4 mục thúc đẩy quan hệ + 3 mục ngoại hình + các trường hồ sơ thâm cung;
  - Nếu thiếu phải bổ sung trước khi tiến triển;
  - \`Biến mạng lưới quan hệ\` phải là mảng các cạnh quan hệ và >=2 mục.
- Lệnh ứng cử phải được diễn tập theo dạng "Giá trị trước -> Giá trị sau + Hợp pháp/Không hợp pháp + Lý do".

### F. \`<Chính văn>\` (Chính văn)
- Chỉ chứa tự sự nhập vai, đối thoại, phán đoán có cấu trúc.
- Tách biệt nghiêm ngặt giữa bối cảnh và lời thoại: Bối cảnh không chứa trích dẫn trực tiếp và định dạng "Tên nhân vật: Lời thoại"; trường nhân vật chỉ viết lời thoại.
- Nhịp độ bối cảnh phải đan xen: Mỗi hiệp ít nhất có 1 đoạn bối cảnh trung bình dài (gợi ý 2-4 câu, khoảng 80-180 chữ), các đoạn khác có thể dùng bối cảnh ngắn (20-70 chữ) để điều chỉnh nhịp độ.
- Cấm chia nhỏ hành động liên tiếp thành "mỗi câu một 【Bối cảnh】"; các chuỗi hành động cùng thời không nên được gộp lại trước khi phân chia.
- Không được viết thay các hành động mấu chốt/lời thoại/quyết định mà người chơi chưa nhập liệu.
- Dòng phán đoán chỉ được phép viết trong \`<Chính văn>\`, không được đưa vào \`<Ký ức ngắn hạn>\`.

### G. \`t_logcheck\` (Lớp xem xét lại đầu tiên sau chính văn)
- Đối soát xem chính văn có nhất quán với nhánh đã chọn không, có vượt quyền không, có nhảy vọt nhân quả không.
- Nếu chính văn xung đột với kiểm tra trước, phải đánh dấu chiến lược đổi hướng, không được cưỡng ép thực hiện lệnh ứng cử ban đầu.

### H. \`t_var\` (Xem xét ánh xạ biến số)
- Ánh xạ "Sự thật đã xảy ra trong chính văn" thành "Danh sách thay đổi biến số cần thực hiện".
- Bao quát ít nhất: Thời gian, địa điểm, tài nguyên, móc nối cốt truyện, trạng thái chiến đấu, biến cốt truyện mấu chốt.
- Cấm ánh xạ các sự thật chưa xảy ra thành thay đổi thành công.

### I. \`t_npc\` (Xem xét chuyên biệt NPC)
- Đối soát việc vào cảnh/rời cảnh, tập hợp có mặt, hảo cảm/mối quan hệ, ghi ký ức có tương ứng từng mục với chính văn không.
- Kiểm tra xem có lệnh vượt quyền "chưa có mặt nhưng lại ghi ký ức tương tác trực tiếp/hảo cảm" không.
- Nếu hiệp này lập hồ sơ mới, hãy xác minh điều kiện lập hồ sơ, kết quả kiểm tra trùng lặp và tính nhất quán của giá trị \`Có mặt\` ban đầu.

### J. \`t_cmd\` (Quy hoạch cấu trúc lệnh)
- Đưa ra phương án thứ tự lệnh cuối cùng theo dạng "Tạo -> Sửa -> Dọn dẹp".
- Lệnh địa điểm tuân thủ liên kết tầng cấp:
  - Chỉ khi di chuyển nhỏ trong cùng địa điểm nhỏ mới được chỉ sửa \`Địa điểm cụ thể\`;
  - Di chuyển qua các cấp độ phải liên kết cập nhật các trường bị ảnh hưởng.

### K. \`t_audit\` (Tổng kiểm toán)
- Kiểm toán từng mục: Tính hợp pháp của đường dẫn, loại dữ liệu, chỉ mục, định dạng thời gian, giới hạn trên/dưới, tính nhất quán của tự sự.
- Các mục bắt buộc kiểm tra:
  - Sự kiện thế giới có được duy trì theo "Thời gian kết thúc dự kiến" không;
  - Các mục quá hạn trong sự kiện chờ kích hoạt đã được dọn dẹp chưa;
  - Khi kết thúc chiến đấu có đồng bộ \`Trong chiến đấu=false\` và \`Kẻ địch=null\` không;
  - Túi đồ có thay đổi → \`Tải trọng hiện tại\` đã được cập nhật chưa? (Tổng = Σ trọng lượng vật phẩm không nằm trong thùng chứa khác).

### L. \`t_fix\` (Sửa lỗi)
- Loại bỏ các lệnh ứng cử không hợp pháp, đưa ra hướng lệnh có thể thực hiện sau khi sửa đổi.
- Nếu không có lệnh hợp pháp, \`<Lệnh>\` có thể để trống hoặc viết \`Không\`, và yêu cầu chính văn thể hiện rõ việc "không thực hiện do điều kiện không đủ".

### M. \`t_mem\` và \`<Ký ức ngắn hạn>\`
- \`t_mem\`: Trích lọc "Hành động - Kết quả - Ảnh hưởng - Điểm chưa quyết định".
- \`<Ký ức ngắn hạn>\`: Tóm tắt cốt truyện trong 100 chữ; cấm cấu trúc phán đoán, danh sách dấu thời gian, câu lệnh.

### N. \`t_opts\` và \`<Hành động tùy chọn>\`
- Chỉ xuất \`<Hành động tùy chọn>\` khi công tắc được bật.
- 3-5 câu hành động ngắn thuần túy; phải có thể thực hiện ngay lập tức; cấm tiết lộ kết quả, cấm thực hiện thay người chơi.

## 5. Ngân sách độ dài (Bắt buộc — hard limit, không được vượt quá)
- \`t_input\`: ≤ 120 ký tự
- \`t_plan\`: ≤ 160 ký tự
- \`t_state\`: ≤ 220 ký tự
- \`t_branch\`: ≤ 320 ký tự (Bắt buộc A/B/C + lý do lựa chọn)
- \`t_precheck\`: ≤ 380 ký tự
- \`t_logcheck\`: ≤ 160 ký tự
- \`t_var\`: ≤ 200 ký tự
- \`t_npc\`: ≤ 220 ký tự
- \`t_cmd\`: ≤ 200 ký tự
- \`t_audit\`: ≤ 240 ký tự
- \`t_fix\`: ≤ 200 ký tự
- \`t_mem\`: ≤ 100 ký tự
- \`t_opts\`: ≤ 100 ký tự

## 6. Tiêu chuẩn thực hiện cuối cùng
- Tất cả các phân đoạn \`t_*\` phải được viết trong thẻ \`<thinking>...</thinking>\` (và được đánh dấu rõ ràng bằng \`[t_tên phân đoạn]\`).
- Đầu ra cuối cùng sử dụng giao thức thẻ, không xuất vỏ bọc JSON.
- \`<Lệnh>\` chỉ giữ lại tập hợp các lệnh hợp pháp cuối cùng sau khi đã sửa lỗi.

</Giao thức COT đa tầng suy nghĩ>
`.trim(),
    type: 'core setting',
    enabled: false
};
