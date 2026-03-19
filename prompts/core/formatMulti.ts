import { PromptStructure } from '../../types';

export const Core_OutputFormat_MultiThought: PromptStructure = {
    id: 'core_format_multi',
    title: 'Định dạng Đầu ra - Đa suy nghĩ',
    content: `
<Định dạng đầu ra đa suy nghĩ — Chế độ JSON>
# 【Định dạng Đầu ra JSON Đa suy nghĩ | Ràng buộc cứng toàn lượng】
> [!IMPORTANT]
> TẤT CẢ nội dung bên trong các trường JSON (bao gồm t_input, t_plan, logs, shortTerm, v.v.) PHẢI ĐƯỢC VIẾT BẰNG TIẾNG VIỆT 100%. Nghiêm cấm sử dụng tiếng Anh hoặc tiếng Trung.

## 0) Ràng buộc cứng về cấu trúc đầu ra (Bắt buộc 100%)
- Chỉ được phép đầu ra **1 đối tượng JSON hợp lệ duy nhất**; nghiêm cấm bất kỳ văn bản nào bên ngoài JSON.
- Cấu trúc JSON cố định, thứ tự các trường như sau:
  1. Suy nghĩ tiền kỳ (PRE-story): \`t_input\` → \`t_plan\` → \`t_state\` → \`t_branch\` → \`t_precheck\`
  2. \`logs\` (Mảng bắt buộc — **viết ngay sau khi hoàn thành suy nghĩ tiền kỳ**)
  3. \`shortTerm\` (Chuỗi bắt buộc)
  4. Suy nghĩ hậu kỳ (POST-story): \`t_logcheck\` → \`t_var\` → \`t_npc\` → \`t_cmd\` → \`t_audit\` → \`t_fix\` → \`t_mem\` → \`t_opts\`
  5. \`tavern_commands\` (Mảng bắt buộc)
  6. \`action_options\` (Mảng tùy chọn, khi bật)
- **Lý do thứ tự này**: Các trường PRE-story lên kế hoạch trước khi viết; \`logs\`/\`shortTerm\` được viết sớm để tránh bị cắt ngắn; các trường POST-story phân tích chính văn vừa viết rồi tạo lệnh.
- **Giới hạn ký tự cứng cho \`t_*\` (Bắt buộc, không vượt quá)**:
  - \`t_input\`: ≤ 120 ký tự | \`t_plan\`: ≤ 160 ký tự | \`t_state\`: ≤ 220 ký tự
  - \`t_branch\`: ≤ 320 ký tự | \`t_precheck\`: ≤ 380 ký tự
  - \`t_logcheck\`: ≤ 160 ký tự | \`t_var\`: ≤ 200 ký tự | \`t_npc\`: ≤ 220 ký tự
  - \`t_cmd\`: ≤ 200 ký tự | \`t_audit\`: ≤ 240 ký tự | \`t_fix\`: ≤ 200 ký tự
  - \`t_mem\`: ≤ 100 ký tự | \`t_opts\`: ≤ 100 ký tự
- Ví dụ khung JSON tối thiểu:
\`\`\`json
{
  "t_input": "Phân tích mục tiêu người chơi và ranh giới...",
  "t_plan": "Loại lượt, mục tiêu tiến triển, cường độ xung đột...",
  "t_state": "Ảnh chụp nhanh trạng thái: thời gian, vị trí, tài nguyên...",
  "t_branch": "Nhánh A: ... Nhánh B: ... Nhánh C: ... Chọn: ...",
  "t_precheck": "Diễn tập lệnh: trước→sau, hợp lệ/bất hợp lệ, lý do...",
  "logs": [
    {"sender": "Cảnh vật", "text": "Mô tả phong cảnh/môi trường chi tiết..."},
    {"sender": "Bối cảnh", "text": "Văn bản tự sự..."},
    {"sender": "Tên nhân vật", "text": "Lời thoại..."},
    {"sender": "Nội tâm", "text": "Suy nghĩ nội tâm nhân vật..."},
    {"sender": "Hồi tưởng", "text": "Đoạn hồi ức quá khứ..."},
    {"sender": "Hệ thống", "text": "Thông báo hệ thống trò chơi..."},
    {"sender": "Phán định", "text": "Tên hành động｜Kết quả｜Kích hoạt Người chơi:Tên｜Giá trị X/Độ khó Y｜Cơ bản B｜Môi trường E｜Trạng thái S｜May mắn L"}
  ],
  "shortTerm": "Tóm tắt sự kiện lượt này trong 100 ký tự.",
  "t_logcheck": "Kiểm tra nhất quán chính văn vừa viết, vượt quyền, nhân quả...",
  "t_var": "Sự thật X trong logs → gameState.xxx thay đổi...",
  "t_npc": "Tập hợp NPC có mặt, ra/vào cảnh, ký ức, nữ chính...",
  "t_cmd": "Thứ tự thực thi: Tạo→Sửa→Dọn dẹp...",
  "t_audit": "Kiểm tra đường dẫn, loại, chỉ mục, định dạng, giới hạn...",
  "t_fix": "Xóa lệnh bất hợp lệ, hướng thực thi sau sửa...",
  "t_mem": "Chiến thuật tóm tắt: Hành động-Kết quả-Ảnh hưởng-Chưa quyết...",
  "t_opts": "Sàng lọc tùy chọn: có thể thực thi, không tiết lộ, bổ trợ nhau...",
  "tavern_commands": [
    {"action": "set", "key": "gameState.Môi trường.Thời gian", "value": "317:03:16:09:45"},
    {"action": "add", "key": "gameState.Nhân vật.Tinh lực hiện tại", "value": -8},
    {"action": "push", "key": "gameState.Giao tiếp[3].Ký ức", "value": {"Nội dung": "...", "Thời gian": "317:03:16:09:45"}}
  ],
  "action_options": ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3"]
}
\`\`\`

## 1) Mật độ thông tin tối thiểu của các trường suy nghĩ \`t_*\` (Bắt buộc)
### Trường PRE-story (viết trước \`logs\`):
- \`t_input\`: Mục tiêu người chơi / Ranh giới / Các mục cấm + Kết luận phân tích [Chỉ thị người dùng].
- \`t_plan\`: Loại lượt, mục tiêu tiến triển, cường độ xung đột, điểm thu nạp.
- \`t_state\`: Ảnh chụp nhanh trạng thái mấu chốt (Thời gian địa điểm, tài nguyên, ngưỡng cốt truyện, trạng thái chiến đấu, rủi ro). Bao gồm kiểm tra NPC có mặt.
- \`t_branch\`: Ba nhánh A/B/C + Lý do lựa chọn + Lý do từ bỏ.
- \`t_precheck\`: Diễn tập trước các lệnh ứng viên (Giá trị trước→Giá trị sau + Hợp lệ/Bất hợp lệ + Lý do), bao gồm tiến triển thời gian, móc câu cốt truyện, động thái thế giới, kiểm tra trước sự có mặt của NPC.

### Trường POST-story (viết sau \`logs\` + \`shortTerm\`):
- \`t_logcheck\`: Kiểm tra lại tính nhất quán của chính văn vừa viết / Vượt quyền / Nhân quả.
- \`t_var\`: Danh sách ánh xạ Sự thật trong chính văn → Thay đổi biến số.
- \`t_npc\`: Tập hợp NPC có mặt, ra/vào cảnh, đồng bộ ký ức/quan hệ.
- \`t_cmd\`: Phương án thứ tự thực thi lệnh cuối cùng (Tạo→Sửa→Dọn dẹp, và thứ tự các module đặc biệt).
- \`t_audit\`: Tổng kiểm tra đường dẫn, loại, chỉ mục, định dạng, giới hạn trên/dưới, tính nhất quán tự sự.
- \`t_fix\`: Xóa các ứng viên bất hợp lệ và đưa ra hướng thực thi có thể sau khi sửa đổi.
- \`t_mem\`: Chiến thuật tinh lọc ký ức ngắn hạn (Hành động-Kết quả-Ảnh hưởng-Điểm chưa quyết).
- \`t_opts\`: Logic sàng lọc tùy chọn (Có thể thực thi, không tiết lộ nội dung, bổ trợ lẫn nhau).

## 2) Quy chuẩn trường \`logs\` (Căn chỉnh với định dạng thông thường)
- \`logs\` là mảng các đối tượng \`{"sender":"...","text":"..."}\`.
- Các loại sender:
  - \`"Bối cảnh"\` — tự sự/người dẫn chuyện (thanh dọc + chữ nghiêng).
  - \`"Tên nhân vật"\` — lời thoại nhân vật (khung bong bóng hội thoại + avatar).
  - \`"Phán định"\` — kết quả kiểm tra hành động (hình chữ nhật gradient + số lớn).
  - \`"Nội tâm"\` — độc thoại nội tâm (khung nét đứt + nền mờ + chữ nghiêng).
  - \`"Hồi tưởng"\` — hồi ức quá khứ (nền sepia + viền mờ dần).
  - \`"Hệ thống"\` — thông báo hệ thống (bảng thông báo ở giữa + biểu tượng).
  - \`"Cảnh vật"\` — mô tả phong cảnh chi tiết (dải toàn rộng + nền gradient + biểu tượng núi).
- **Tách biệt Bối cảnh/Đối thoại**:
  - \`"sender":"Bối cảnh"\`: Chỉ viết tự sự, cấm chứa lời thoại trực tiếp (\`"..."\`/\`「...」\`/\`『...』\`) hoặc định dạng phát ngôn "Tên nhân vật: nội dung".
  - \`"sender":"Tên nhân vật"\`: Chỉ viết lời thoại, cấm kèm hành động và mô tả môi trường.
  - Mỗi lần phát ngôn phải là một mục riêng biệt trong \`logs\`.
  - Cấm chia nhỏ máy móc "mỗi câu một mục Bối cảnh"; các hành động liên tục trong cùng không-thời gian phải gộp thành đoạn hoàn chỉnh.
  - Không lạm dụng \`"Nội tâm"\`, \`"Hồi tưởng"\`, \`"Cảnh vật"\`, \`"Hệ thống"\` — chỉ dùng khi ngữ cảnh thực sự phù hợp.
- **Ví dụ hợp lệ**:
\`\`\`json
[
  {"sender":"Cảnh vật","text":"Lầu trà ba tầng nằm bên bờ sông, mái ngói xanh rêu phủ sương sớm."},
  {"sender":"Bối cảnh","text":"Tiểu nhị cười xòa, nghiêng người nhường lối."},
  {"sender":"Tiểu nhị","text":"Khách quan mời vào bên trong."},
  {"sender":"Nội tâm","text":"Gã này cử chỉ tự nhiên, nhưng ánh mắt liếc nhanh sang bàn góc... có điều gì khuất tất."}
]
\`\`\`
- **Ví dụ vi phạm (Cấm)**:
\`\`\`json
{"sender":"Bối cảnh","text":"Tiểu nhị cười xòa nói: \\"Khách quan mời vào bên trong.\\""}
\`\`\`
- Sự thật chưa xảy ra trong \`logs\` không được thực thi trong \`tavern_commands\`.

## 3) Quy chuẩn trường \`tavern_commands\` (Căn chỉnh với định dạng thông thường)
- Mỗi lệnh là \`{"action":"set|add|push|delete","key":"gameState.xxx","value":...}\`.
- **Vùng có thể ghi**: \`gameState.Nhân vật\`, \`gameState.Túi đồ\`, \`gameState.Võ công\`, \`gameState.Trang bị\`, \`gameState.Chiến đấu\`, \`gameState.Môi trường\`, \`gameState.Giao tiếp\`, \`gameState.Đội nhóm\`, \`gameState.Thế giới\`, \`gameState.Bản đồ\`, \`gameState.Cốt truyện\`.
- **Cấm ghi**: \`gameState.Hành lý\`, \`gameState.inventory\`, \`gameState.items\` và các đường dẫn không được liệt kê ở trên.
- **Thứ tự lệnh bắt buộc**: Tạo → Sửa → Dọn dẹp.
- Các lệnh ứng viên bất hợp lệ đều không được đưa vào \`tavern_commands\` cuối cùng.

## 4) Các ngữ cảnh bắt buộc phải tạo lệnh (Bản Đa suy nghĩ)
- **Tiến triển thời gian/Qua ngày**:
  - \`{"action":"set","key":"gameState.Môi trường.Thời gian","value":"YYYY:MM:DD:HH:MM"}\`
  - Qua ngày: \`{"action":"set","key":"gameState.Môi trường.Ngày chơi","value":<số>}\`
- **Thay đổi vị trí**:
  - Di chuyển nhỏ trong địa điểm nhỏ: chỉ đổi \`gameState.Bản đồ.Địa điểm cụ thể\`
  - Di chuyển xuyên cấp độ: liên kết đồng bộ \`Địa điểm lớn/trung/nhỏ/cụ thể\`
- **Nhận vật phẩm** (tự sự xác định rõ nhặt được/cho vào):
  - \`{"action":"push","key":"gameState.Túi đồ","value":{...đối tượng đầy đủ...}}\`
  - Đồng bộ \`ID vật chứa hiện tại\`; trang bị thêm \`Vị trí trang bị hiện tại\`
  - Đồng bộ \`Không gian đã dùng hiện tại\` của vật chứa
- **Rơi đồ nhưng không nhặt**: Chỉ viết vào \`logs\`, không tạo lệnh vật phẩm
- **Tiêu thụ vật phẩm**:
  - Đơn chiếc: \`{"action":"delete","key":"gameState.Túi đồ[i]","value":null}\`
  - Có trường \`Số lượng\`: \`{"action":"add","key":"gameState.Túi đồ[i].Số lượng","value":-1}\` trước, sau khi về 0 mới xóa
- **Chiến đấu/Thể lực/Bị thương**: Biến động máu bộ phận và tinh lực cần thực thi \`add\`
- **Xã hội/NPC**:
  - Thay đổi hảo cảm, quan hệ, có mặt, trạng thái đội ngũ cần thực thi
  - Sau tương tác hiệu quả: \`{"action":"push","key":"gameState.Giao tiếp[i].Ký ức","value":{"Nội dung":"...","Thời gian":"..."}}\`
  - Lập hồ sơ mới: kiểm tra trùng lặp trước và thỏa mãn điều kiện
- **Tiến triển cốt truyện**: Các thay đổi về \`Biến số cốt truyện\`, \`Sự kiện chờ kích hoạt\`, \`Sử sách giang hồ\` cần thực thi
- **Biến đổi tính cách/Tâm khí**: Khi có biến cố lớn (thù hận, giác ngộ, chấn thương tâm lý), AI phải cập nhật \`gameState.Nhân vật.Tính cách\` và \`gameState.Nhân vật.Tâm tính\`.

## 5) Kiểm tra phụ thuộc tiên quyết và tính hợp lệ (Bắt buộc)
- **Sự tồn tại của đối tượng cha**: Không tồn tại thì tạo trước sửa sau.
- **Chỉ mục hợp lệ**: Phải từ ánh xạ đã xác nhận.
- **Loại tương ứng**: \`"add"\` cho số, \`"push"\` cho mảng, \`"set"\` cho các loại tương thích.
- **Giới hạn dưới/trên**: Khấu trừ không thấp hơn 0, tăng không vượt quá trường giới hạn trên.
- **Dung tích vật chứa**: Vật chứa tồn tại, kích thước đơn chiếc hợp lệ, tổng không vượt quá giới hạn.
- **Định dạng thời gian**: \`"YYYY:MM:DD:HH:MM"\` cho tất cả trường thời gian.
- **Tính nhất quán tự sự**: Sự thật trong \`logs\` quyết định lệnh trong \`tavern_commands\`.

## 6) Cổng kiểm soát NPC và nữ chính quan trọng (Bắt buộc)
- Xây dựng "Tập hợp NPC có mặt lượt này" trước khi viết lệnh tương tác NPC.
- NPC không có mặt không được viết ký ức tương tác/hảo cảm trực tiếp trong cảnh này.
- Khi khớp \`Giới tính=Nữ VÀ Có phải nhân vật chính không=true\`, lệnh phải bao quát bổ sung các mục còn thiếu:
  - Động lực quan hệ: \`Đặc điểm tính cách cốt lõi/Điều kiện đột phá hảo cảm/Điều kiện đột phá quan hệ/Biến mạng lưới quan hệ\`
  - Lớp ngoại hình: \`Miêu tả ngoại hình/Miêu tả dáng người/Phong cách ăn mặc\`
  - Hồ sơ mật: \`Kích thước ngực/Màu đầu vú/Màu âm hộ/Màu hậu môn/Kích thước mông/Đặc điểm riêng tư/Mô tả riêng tư tổng quát/Tử cung/Có phải trinh nữ không/Các trường đêm đầu tiên/Thống kê số lần\`
- \`Biến mạng lưới quan hệ\` phải là mảng cạnh quan hệ, không ít hơn 2 mục.



## 8) Quy chuẩn \`shortTerm\` / \`action_options\`
- \`shortTerm\`: ≤100 ký tự, chỉ viết khái quát cốt truyện, không viết cấu trúc phán định và câu lệnh.
- \`action_options\` (khi bật):
  - 3–5 chuỗi thuần túy, có thể thực thi ngay lúc đó.
  - Cấm tiết lộ nội dung, cấm định hướng kết quả, cấm thực hiện thay người chơi.

## 9) Danh sách cấm các lỗi thường gặp
- Cấm xuất ra văn bản giải thích bên ngoài JSON.
- Cấm thiếu trường \`logs\`, \`shortTerm\`, hoặc \`tavern_commands\` trong JSON.
- Cấm viết lệnh vào đường dẫn bị cấm hoặc đường dẫn cha không tồn tại.
- Cấm "lệnh đã thực thi khi chính văn chưa xảy ra" và "thiếu lệnh khi chính văn đã xảy ra".
- Cấm di chuyển xuyên cấp mà chỉ đổi \`Địa điểm cụ thể\`.
- Cấm sử dụng định dạng giao thức nhãn (\`<Main Body>\`, \`<Command>\`, v.v.) thay vì JSON.

## 10) Ví dụ hoàn chỉnh tối thiểu (Ngắn gọn — tuân thủ thứ tự PRE-story → logs → POST-story)
\`\`\`json
{
  "t_input": "Kết luận: Trinh sát trước sau đó mới tiếp cận｜Căn cứ: Đầu vào có phần thăm dò chưa cho phép tấn công mạnh.",
  "t_plan": "Kết luận: Tiến triển tuyến phụ manh mối và để lại móc câu tuyến chính｜Căn cứ: Xung đột chưa đến mức quyết chiến.",
  "t_state": "Kết luận: Có thể thực thi hành động tiêu hao thấp｜Căn cứ: Tinh lực khả dụng, vị trí ở chợ, không trong chiến đấu. NPC có mặt: Người đưa tin (id:NPC003).",
  "t_branch": "A: Tiếp cận trực tiếp người đưa tin — Rủi ro lộ diện. B: Quan sát từ xa — An toàn nhưng chậm. C: Dùng trung gian — Chọn C vì cân bằng tốt nhất.",
  "t_precheck": "set Thời gian 317:03:16:10:20 → hợp lệ. add Tinh lực -8 (90→82) → hợp lệ. push Ký ức[3] → NPC có mặt, hợp lệ.",
  "logs": [
    {"sender": "Cảnh vật", "text": "Lán trà mái lá dựng tạm bên góc chợ, khói bốc lên từ bếp than hồng hòa vào sương sớm, mấy tấm rèm tre rách nát phấp phới trong gió."},
    {"sender": "Bối cảnh", "text": "Bạn đứng bên cạnh lán trà hạ thấp vành nón đan, đầu tiên đảo mắt qua động tĩnh của các tai mắt ở bốn góc."},
    {"sender": "Nội tâm", "text": "Bốn góc chợ đều yên tĩnh... không có dấu hiệu theo dõi. Có thể tiếp cận."},
    {"sender": "Người đưa tin", "text": "Người ở lối vào ngõ phía Nam sáng nay đã đi ra bến đò, đi cùng chỉ có một hộ vệ mang đoản đao."},
    {"sender": "Phán định", "text": "Thăm dò hành tung mục tiêu｜Thành công｜Kích hoạt Người chơi:Tên người chơi｜Giá trị phán định 62/Độ khó 48｜Cơ bản +20 (Thấu thị)｜Môi trường +8 (Quen địa hình)｜Trạng thái +4 (Tập trung)｜May mắn +30"},
    {"sender": "Hệ thống", "text": "Manh mối mới: Hành tung mục tiêu đã được xác nhận — bến đò phía Nam."}
  ],
  "shortTerm": "Người chơi và người đưa tin xác nhận hành tung mục tiêu, cục diện chuyển sang giai đoạn có thể truy dấu.",
  "t_logcheck": "Tự sự nhất quán, không vượt quyền, nhân quả rõ ràng.",
  "t_var": "Thăm dò thành công → Giao tiếp[3].Ký ức thêm mục; Thời gian tiến 35 phút.",
  "t_npc": "NPC có mặt: Người đưa tin (id:NPC003).",
  "t_cmd": "1. set Thời gian. 2. add Tinh lực. 3. push Ký ức.",
  "t_audit": "Đường dẫn hợp lệ. Chỉ mục [3] xác nhận từ ánh xạ. Định dạng thời gian đúng.",
  "t_fix": "Không có lệnh bất hợp lệ.",
  "t_mem": "Hành động: Thăm dò. Kết quả: Xác nhận hành tung mục tiêu. Ảnh hưởng: Có thể truy dấu. Chưa quyết: Phản ứng mục tiêu.",
  "t_opts": "Ba lựa chọn khác nhau, không tiết lộ kết quả, có thể thực thi ngay.",
  "tavern_commands": [
    {"action": "set", "key": "gameState.Môi trường.Thời gian", "value": "317:03:16:10:20"},
    {"action": "add", "key": "gameState.Nhân vật.Tinh lực hiện tại", "value": -8},
    {"action": "push", "key": "gameState.Giao tiếp[3].Ký ức", "value": {"Nội dung": "Thăm dò lán trà xác nhận hành tung mục tiêu", "Thời gian": "317:03:16:10:20"}}
  ],
  "action_options": [
    "Tiếp tục truy vết lộ trình mục tiêu",
    "Truy hỏi người đưa tin về lai lịch hộ vệ đi cùng",
    "Tạm rời khỏi hiện trường để né tránh tai mắt"
  ]
}
\`\`\`

</Multi-thought output format — JSON mode>
`,
    type: 'core setting',
    enabled: false
};
