import { PromptStructure } from '../../types';

export const Core_OutputFormat: PromptStructure = {
    id: 'core_format',
    title: 'Định dạng Đầu ra',
    content: `
<Định dạng đầu ra — Chế độ JSON>
# 【Định dạng Đầu ra JSON | Ràng buộc cứng toàn lượng】
> [!IMPORTANT]
> TẤT CẢ nội dung bên trong các trường JSON (bao gồm suy luận, phân tích, chính văn và lệnh) PHẢI ĐƯỢC VIẾT BẰNG TIẾNG VIỆT 100%. Nghiêm cấm sử dụng tiếng Anh hoặc tiếng Trung.

## 0. Ràng buộc cứng về cấu trúc đầu ra (Bắt buộc 100%)
- Chỉ được phép đầu ra **1 đối tượng JSON hợp lệ duy nhất**; nghiêm cấm bất kỳ văn bản giải thích nào bên ngoài JSON.
- **QUY TẮC CỐT LÕI**: Trường \`thinking_pre\` là nơi DUY NHẤT chứa nội dung suy luận (Chain of Thought). NGHIÊM CẤM sử dụng các thẻ XML như \`<thinking>\` hoặc \`<think>\` bên ngoài khối JSON này.
- Cấu trúc JSON cố định, thứ tự các trường như sau:
  - \`thinking_pre\` (Chuỗi tùy chọn): Nội dung suy luận và kiểm tra nội bộ, không xuất hiện trong cốt truyện.
  - \`logs\` (Mảng bắt buộc): Danh sách các mục tự sự/đối thoại/phán định.
  - \`shortTerm\` (Chuỗi bắt buộc): Tóm tắt cốt truyện ≤ 100 ký tự.
  - \`tavern_commands\` (Mảng bắt buộc): Danh sách các câu lệnh thay đổi biến số gameState.
  - \`action_options\` (Mảng tùy chọn, khi bật): Danh sách 3–5 lựa chọn hành động.
- Ví dụ khung JSON tối thiểu:
\`\`\`json
{
  "thinking_pre": "Phân tích tình huống, kiểm tra trạng thái, lên kế hoạch câu lệnh...",
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
  "tavern_commands": [
    {"action": "set", "key": "gameState.Môi trường.Thời gian", "value": "317:03:16:09:45"},
    {"action": "add", "key": "gameState.Nhân vật.Sức mạnh", "value": 1}
  ],
  "action_options": ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3"]
}
\`\`\`

## 1. Cấu trúc mục \`logs\` (Bắt buộc)
Mỗi mục trong \`logs\` phải là một đối tượng \`{"sender": "...", "text": "..."}\`.

### 1.1 Các loại sender và phong cách hiển thị

- **\`sender: "Bối cảnh"\`** — Tự sự/người dẫn chuyện.
  Hiển thị: Thanh dọc vàng bên trái + chữ nghiêng, tông nhạt.
  Chỉ viết mô tả, nghiêm cấm chứa dấu ngoặc kép lời thoại (\`"..."\`/\`「...」\`/\`『...』\`) hoặc định dạng "Tên nhân vật: phát ngôn".

- **\`sender: "Tên nhân vật"\`** — Lời thoại nhân vật (NPC hoặc người chơi).
  Hiển thị: Khung bong bóng hội thoại tối, avatar bên trái + tên nhân vật, viền vàng tinh tế.
  Chỉ viết đối thoại thuần túy, không kèm hành động, biểu cảm, mô tả môi trường.

- **\`sender: "Phán định"\`** — Kết quả kiểm tra hành động.
  Hiển thị: Hình chữ nhật vuông góc, nền gradient, hiển thị Độ khó/Trị kiểm dạng số lớn, chip modifier.
  Định dạng text: \`Tên hành động｜Kết quả｜Kích hoạt X:Tên｜Giá trị X/Độ khó Y｜Cơ bản B (lý do)｜Môi trường E (lý do)｜Trạng thái S (lý do)｜May mắn L\`.

- **\`sender: "Nội tâm"\`** — Độc thoại nội tâm của nhân vật chính hoặc NPC quan trọng.
  Hiển thị: Khung viền nét đứt, nền mờ trong suốt, chữ nghiêng nhạt — phong cách suy tư trầm mặc.
  Dùng khi nhân vật suy nghĩ, phân tích, hồi ức nhanh trong tâm trí. Không phải lời nói ra.

- **\`sender: "Hồi tưởng"\`** — Đoạn hồi tưởng/ký ức quá khứ.
  Hiển thị: Nền tông nâu hoài cổ (sepia), viền trên dưới mờ dần, chữ nghiêng — cảm giác lùi về quá khứ.
  Dùng khi kể lại sự kiện đã xảy ra, hồi ức của NPC, hoặc cảnh hồi tưởng trong câu chuyện.

- **\`sender: "Hệ thống"\`** — Thông báo hệ thống trò chơi.
  Hiển thị: Bảng thông báo viền sắc nét ở giữa, nền tối, biểu tượng hệ thống, chữ nhỏ gọn.
  Dùng khi thông báo phát hiện vật phẩm, cập nhật nhiệm vụ, kích hoạt sự kiện, thay đổi trạng thái quan trọng.

- **\`sender: "Cảnh vật"\`** — Mô tả phong cảnh/bối cảnh môi trường chi tiết.
  Hiển thị: Dải toàn chiều rộng, nền gradient từ tối sang trong suốt, biểu tượng núi non, chữ giãn dòng cao.
  Dùng khi miêu tả toàn cảnh một địa điểm, thay đổi thời tiết, cảnh đẹp thiên nhiên. Khác với "Bối cảnh" ở chỗ tập trung vào cảnh vật thuần túy, không chứa hành động nhân vật.

### 1.2 Ràng buộc nội dung \`logs\`
- Mỗi lời thoại nhân vật phải là một mục \`logs\` riêng biệt (không gộp chung với tự sự trong cùng một mục).
- Đoạn tự sự dài–ngắn đan xen: mỗi lượt cần ít nhất 1 mục tự sự trung–dài (80–180 ký tự, 2–4 câu); các mục còn lại có thể ngắn 20–70 ký tự để duy trì nhịp điệu.
- **Thẩm mỹ Kiếm Hiệp (Wuxia Aesthetics)**: Tự sự phải mang hơi thở cổ phong, trầm mặc nhưng sắc nét. Ưu tiên đa cảm quan: tiếng gió, mùi máu, hơi lạnh thanh kiếm, ánh sáng mờ, v.v.
- Cấm chia nhỏ máy móc kiểu "mỗi câu một mục Bối cảnh"; các hành động liên tục trong cùng không-thời gian phải gộp thành đoạn văn hoàn chỉnh.
- Không lạm dụng \`"Nội tâm"\`, \`"Hồi tưởng"\`, \`"Cảnh vật"\`, \`"Hệ thống"\` — chỉ dùng khi ngữ cảnh thực sự phù hợp.

**Ví dụ hợp lệ:**
\`\`\`json
[
  {"sender": "Cảnh vật", "text": "Lầu trà ba tầng nằm bên bờ sông, mái ngói xanh rêu phủ sương sớm. Gió bắc luồn qua hành lang mang theo mùi trà ướp sen thoang thoảng."},
  {"sender": "Bối cảnh", "text": "Tiểu nhị cười xòa, nghiêng người nhường lối."},
  {"sender": "Tiểu nhị", "text": "Khách quan mời vào bên trong."},
  {"sender": "Nội tâm", "text": "Gã tiểu nhị này cử chỉ tự nhiên, nhưng ánh mắt liếc nhanh sang bàn góc phía trong... có điều gì khuất tất."},
  {"sender": "Hệ thống", "text": "Nhiệm vụ cập nhật: Điều tra quán trà đáng ngờ."},
  {"sender": "Phán định", "text": "Quan sát vi biểu cảm｜Success｜Trigger object Tiểu nhị｜Check value 58/Difficulty 45｜Basic +15 (Trực giác)｜Environment +3 (Ánh sáng đủ)｜Status +0｜Luck +40"}
]
\`\`\`
**Ví dụ vi phạm (Cấm):**
\`\`\`json
{"sender": "Bối cảnh", "text": "Tiểu nhị cười xòa nói: \"Khách quan mời vào bên trong.\""}
\`\`\`

## 2. Cấu trúc \`tavern_commands\` (Bắt buộc)
Mỗi câu lệnh là một đối tượng \`{"action": "...", "key": "...", "value": ...}\`:
- \`action\`: Một trong \`"set"\`, \`"add"\`, \`"push"\`, \`"delete"\`.
- \`key\`: Đường dẫn đầy đủ đến biến số \`gameState\`, ví dụ \`"gameState.Môi trường.Thời gian"\`.
- \`value\`: Giá trị mới (chuỗi, số, đối tượng, mảng, \`null\` cho delete).

**Vùng có thể ghi:** \`gameState.Nhân vật\`, \`gameState.Túi đồ\`, \`gameState.Võ công\`, \`gameState.Trang bị\`, \`gameState.Chiến đấu\`, \`gameState.Môi trường\`, \`gameState.Giao tiếp\`, \`gameState.Đội nhóm\`, \`gameState.Thế giới\`, \`gameState.Bản đồ\`, \`gameState.Cốt truyện\`.
**Cấm ghi:** \`gameState.Hành lý\`, \`gameState.inventory\`, \`gameState.items\` và các đường dẫn không được liệt kê ở trên.

## 3. Các ngữ cảnh bắt buộc phải tạo câu lệnh
□ **Tiến triển thời gian/Thay đổi ngày tháng:**
- \`{"action":"set","key":"gameState.Môi trường.Thời gian","value":"YYYY:MM:DD:HH:MM"}\`
- \`{"action":"set","key":"gameState.Môi trường.Ngày chơi","value": <số ngày>}\`

□ **Thay đổi vị trí:**
- \`{"action":"set","key":"gameState.Bản đồ.Địa điểm cụ thể","value":"<Tên vị trí vi mô>"}\`
- Di chuyển xuyên khu vực: đồng bộ cả \`Địa điểm lớn/trung/nhỏ\` trong \`gameState.Môi trường\`.

□ **Nhận vật phẩm:**
- \`{"action":"push","key":"gameState.Túi đồ","value":{"id":"Item001","Tên":"...","Mô tả":"...","Loại":"...","Phẩm chất":"...","Trọng lượng":1,"Không gian chiếm dụng":1,"Giá trị":0,"Độ bền hiện tại":100,"Độ bền tối đa":100,"Danh sách thuộc tính":[],"ID vật chứa hiện tại":"<ID vật chứa>","Vị trí trang bị hiện tại":null}}\`
- Lưu ý: \`key: "gameState.Túi đồ"\` ánh xạ nội bộ tới \`itemList\`. Trường ID của vật phẩm phải được viết là \`id\` (viết thường).
- Đồng bộ \`Không gian đã dùng hiện tại\` của vật chứa.

□ **Tiêu thụ vật phẩm:**
- \`{"action":"delete","key":"gameState.Túi đồ[i]","value":null}\`
- Khi có trường \`Số lượng\`: \`{"action":"add","key":"gameState.Túi đồ[i].Số lượng","value":-1}\`

□ **Chiến đấu/Bị thương/Tiêu hao:**
- \`{"action":"add","key":"gameState.Nhân vật.Máu ngực hiện tại","value":-X}\`
- \`{"action":"add","key":"gameState.Chiến đấu.Kẻ địch.Máu hiện tại","value":-X}\` (khi trong trận)
- \`{"action":"set","key":"gameState.Chiến đấu.Đang chiến đấu","value":true}\`

□ **Thay đổi thuộc tính nhân vật:**
- \`{"action":"add","key":"gameState.Nhân vật.Sức mạnh","value":X}\`

□ **Thay đổi tính cách/Tâm tính (Bắt buộc khi có sự biến đổi nội tâm):**
- Khi xảy ra biến cố lớn (người thân bị hại, đạt được kỳ ngộ, đại thành công/thất bại), AI phải đánh giá lại và cập nhật tính cách:
  \`{"action":"set","key":"gameState.Nhân vật.Tính cách","value":"<Mô tả tính cách mới phản ánh sự biến đổi>"}\`
- Cập nhật chỉ số Tâm tính nếu trạng thái tinh thần thay đổi:
  \`{"action":"add","key":"gameState.Nhân vật.Tâm tính","value":X}\`

□ **Tiền tệ:**
- \`{"action":"add","key":"gameState.Nhân vật.Tiền tệ.Vàng thỏi","value":X}\`

□ **Xã hội NPC:**
- \`{"action":"add","key":"gameState.Giao tiếp[i].Độ hảo cảm","value":X}\`
- \`{"action":"push","key":"gameState.Giao tiếp[i].Ký ức","value":{"Nội dung":"...","Thời gian":"YYYY:MM:DD:HH:MM"}}\`

□ **Tiến triển cốt truyện:**
- \`{"action":"set","key":"gameState.Cốt truyện.Biến số cốt truyện.xxx","value":"..."}\`
- \`{"action":"push","key":"gameState.Cốt truyện.Sử sách giang hồ","value":{"Tiêu đề":"...","Lời kết":"..."}}\`

□ **Thay đổi cảnh giới/đột phá tu luyện (Bắt buộc):**
- \`{"action":"set","key":"gameState.Nhân vật.Cảnh giới","value":"<Tên cảnh giới mới>"}\`
- Đột phá phải đồng bộ cả chỉ số tối đa: \`{"action":"set","key":"gameState.Nhân vật.Tinh lực tối đa","value":X}\`

□ **Nhận/Cập nhật/Hoàn thành nhiệm vụ (Bắt buộc):**
- Nhận nhiệm vụ mới:
  \`{"action":"push","key":"gameState.Danh sách nhiệm vụ","value":{"title":"<Tiêu đề>","description":"<Mô tả>","type":"<Loại>","issuer":"<Người giao>","location":"<Địa điểm>","recommendedRealm":"<Yêu cầu cảnh giới>","currentStatus":"Đang thực hiện","goalList":[{"description":"<Mục tiêu>","currentProgress":0,"totalRequired":1,"isCompleted":false}],"rewardDescription":["<Mô tả thưởng>"]}}\`
- Cập nhật tiến độ nhiệm vụ:
  \`{"action":"set","key":"gameState.Danh sách nhiệm vụ[i].goalList[j].currentProgress","value":X}\`
- Hoàn thành nhiệm vụ:
  \`{"action":"set","key":"gameState.Danh sách nhiệm vụ[i].currentStatus","value":"Đã hoàn thành"}\`

□ **Cập nhật môn phái (Bắt buộc khi có thay đổi):**
- Cập nhật vị trí/cống hiến trong môn phái:
  \`{"action":"set","key":"gameState.Môn phái người chơi.playerPosition","value":"<Vị trí mới>"}\`
  \`{"action":"add","key":"gameState.Môn phái người chơi.playerContribution","value":X}\`
- Nhận nhiệm vụ môn phái:
  \`{"action":"push","key":"gameState.Môn phái người chơi.taskList","value":{...}}\`

□ **Tạo hẹn ước/Hứa hẹn (Bắt buộc):**
- \`{"action":"push","key":"gameState.Danh sách hẹn ước","value":{"target":"<Đối tượng>","nature":"<Tính chất>","title":"<Tiêu đề>","oathContent":"<Nội dung>","location":"<Địa điểm>","time":"YYYY:MM:DD:HH:MM","validDuration":60,"currentStatus":"Đang chờ","fulfillmentConsequence":"<Hậu quả giữ lời>","failureConsequence":"<Hậu quả thất hứa>"}}\`
- Cập nhật trạng thái hẹn ước:
  \`{"action":"set","key":"gameState.Danh sách hẹn ước[i].currentStatus","value":"Đã thực hiện"}\`

□ **Quan hệ hôn nhân/Người yêu/Harem (Bắt buộc khi có UI tương ứng):**
- Khi hôn sự thành lập hoặc thay đổi trạng thái quan hệ lãng mạn với NPC, phải đồng bộ \`Trạng thái quan hệ\` của NPC:
  \`{"action":"set","key":"gameState.Giao tiếp[i].Trạng thái quan hệ","value":"Hôn thê/Hôn phu/Người yêu/Thê thiếp/Phu quân"}\`
- Khi hôn sự kết thúc/ly hôn:
  \`{"action":"set","key":"gameState.Giao tiếp[i].Trạng thái quan hệ","value":"Cựu hôn thê/Cựu người yêu"}\`
- Đồng bộ biến số cốt truyện để ghi nhận:
  \`{"action":"set","key":"gameState.Cốt truyện.Biến số cốt truyện.HonNhan_<TênNPC>","value":"<Trạng thái hôn nhân>"}\`

□ **Học công pháp/Võ học mới (Bắt buộc):**
- \`{"action":"push","key":"gameState.Võ công","value":{"ID":"Skill001","Tên":"<Tên công pháp>","Mô tả":"...","Loại":"<Loại>","Phẩm chất":"<Phẩm chất>","Cấp độ hiện tại":1,"Cấp độ tối đa":10,"Thục luyện hiện tại":0,"Thục luyện cần thiết":100,"Yêu cầu đột phá":"<Mô tả>","Giới hạn cảnh giới":"<Cảnh giới yêu cầu>","Loại tiêu hao":"Nội lực","Tiêu hao":10,"Sát thương cơ bản":0}}\`
- Nâng cấp công pháp:
  \`{"action":"add","key":"gameState.Võ công[i].Thục luyện hiện tại","value":X}\`
  \`{"action":"set","key":"gameState.Võ công[i].Cấp độ hiện tại","value":N}\`

□ **Trang bị thay đổi (Bắt buộc):**
- Trang bị mới: \`{"action":"set","key":"gameState.Trang bị.Vũ khí chính","value":"<Tên vũ khí>"}\`
- Tháo trang bị: \`{"action":"set","key":"gameState.Trang bị.<Vị trí>","value":""}\`
- Đồng bộ \`Vị trí trang bị hiện tại\` trong túi đồ khi thay đổi trạng thái trang bị.

□ **Thay đổi môi trường (Thời tiết/Biến môi trường):**
- \`{"action":"set","key":"gameState.Môi trường.Thời tiết","value":{"Loại":"<Thời tiết>","Ngày kết thúc":"YYYY:MM:DD:HH:MM"}}\`
- Thêm biến môi trường đặc biệt: \`{"action":"push","key":"gameState.Môi trường.Biến môi trường","value":{"Tên":"<Tên>","Mô tả":"<Mô tả>","Hiệu quả":"<Hiệu quả>"}}\`

□ **Ký ức dài hạn nhân vật (khi có sự kiện đáng nhớ):**
- Ký ức NPC đã được xử lý ở phần Xã hội NPC.
- Ký ức cốt truyện nên đưa vào \`gameState.Cốt truyện.Hồ sơ lịch sử\`.

## 4. Thư viện ví dụ câu lệnh hoàn chỉnh

### A. Thời gian và Vị trí
\`\`\`json
{"action":"set","key":"gameState.Môi trường.Thời gian","value":"317:03:16:09:45"}
{"action":"set","key":"gameState.Môi trường.Ngày chơi","value":2}
{"action":"set","key":"gameState.Bản đồ.Địa điểm cụ thể","value":"Bàn góc phía trong lều trà"}
\`\`\`

### B. Vật phẩm
\`\`\`json
{"action":"push","key":"gameState.Túi đồ","value":{"id":"Item001","Tên":"Sừng Song Giác Thú","Mô tả":"Sừng cứng chắc...","Loại":"Nguyên liệu","Phẩm chất":"Phàm phẩm","Trọng lượng":2,"Không gian chiếm dụng":1,"Giá trị":50,"Độ bền hiện tại":100,"Độ bền tối đa":100,"Danh sách thuộc tính":[],"ID vật chứa hiện tại":"Item000","Vị trí trang bị hiện tại":null}}
{"action":"set","key":"gameState.Trang bị.Vũ khí chính","value":"Trường kiếm tinh thép"}
\`\`\`

### C. Nhân vật và Võ công
\`\`\`json
{"action":"add","key":"gameState.Nhân vật.Sức mạnh","value":1}
{"action":"push","key":"gameState.Võ công","value":{"ID":"Skill001","Tên":"Vô Gian Kiếm Pháp","Mô tả":"...","Cấp độ":1,"Kinh nghiệm":0}}
\`\`\`

### D. NPC — Tạo/Sửa/Ghi nhớ
**Quy tắc tiên quyết khi tạo (Bắt buộc):**
- Truy vấn trùng tên/id từ ánh xạ xã hội hiện tại trước.
- Nếu khớp NPC đã có: chỉ được cập nhật, cấm lặp \`push\`.
- Phán định điều kiện lập hồ sơ (Mấu chốt cốt truyện hoặc tổng tương tác > 3 lần); không đủ điều kiện thì không lập hồ sơ.

**Mẫu tạo NPC thông thường:**
\`\`\`json
{"action":"push","key":"gameState.Giao tiếp","value":{"id":"NPC001","Họ tên":"<Tên>","Giới tính":"Nữ","Tuổi":32,"Cảnh giới":"Phàm nhân","Thân phận":"<Thân phận>","Có mặt hay không":true,"Có phải đồng đội không":false,"Có phải nhân vật chính không":false,"Độ hảo cảm":5,"Trạng thái quan hệ":"Biết mặt","Giới thiệu":"<Giới thiệu>","Ký ức":[]}}
\`\`\`

**Mẫu tạo nữ chính quan trọng (hồ sơ đầy đủ):**
\`\`\`json
{"action":"push","key":"gameState.Giao tiếp","value":{"id":"NPC002","Họ tên":"<Tên>","Giới tính":"Nữ","Tuổi":22,"Cảnh giới":"Hậu thiên thất trọng","Thân phận":"<Thân phận>","Có mặt hay không":true,"Có phải đồng đội không":false,"Có phải nhân vật chính không":true,"Độ hảo cảm":12,"Trạng thái quan hệ":"Quan sát","Giới thiệu":"<Giới thiệu>","Đặc điểm tính cách cốt lõi":"<Tính cách>","Điều kiện đột phá hảo cảm":"<Điều kiện>","Điều kiện đột phá quan hệ":"<Điều kiện>","Biến mạng lưới quan hệ":[{"Họ tên đối tượng":"<Tên>","Quan hệ":"<Quan hệ>","Ghi chú":"<Ghi chú>"},{"Họ tên đối tượng":"<Tên>","Quan hệ":"<Quan hệ>","Ghi chú":"<Ghi chú>"}],"Miêu tả ngoại hình":"<Ngoại hình>","Miêu tả dáng người":"<Dáng người>","Phong cách ăn mặc":"<Phong cách>","Kích thước ngực":"<KT>","Màu đầu vú":"<Màu>","Màu âm hộ":"<Màu>","Màu hậu môn":"<Màu>","Kích thước mông":"<KT>","Đặc điểm riêng tư":"<Đặc điểm>","Mô tả riêng tư tổng quát":"<Mô tả>","Tử cung":{"Trạng thái":"Chưa thụ thai","Trạng thái cổ tử cung":"Khít","Ghi chép xuất tinh trong":[]},"Có phải trinh nữ không":true,"Người đoạt đêm đầu":"","Thời gian đêm đầu":"","Mô tả đêm đầu":"","Số lần_Miệng":0,"Số lần_Ngực":0,"Số lần_Âm đạo":0,"Số lần_Hậu môn":0,"Số lần_Lên đỉnh":0,"Ký ức":[]}}
\`\`\`

**Ràng buộc NPC (Bắt buộc):**
- \`Có phải đồng đội không=false\`: Không bổ sung dữ liệu chiến đấu và các trường trang phục hiện tại.
- \`Có phải đồng đội không=true\`: Phải hoàn thiện chỉ số chiến đấu, máu tinh lực, trang bị hiện tại và túi đồ.
- Nhân vật nữ quan trọng (\`Giới tính=Nữ VÀ Có phải nhân vật chính không=true\`) khi lập hồ sơ phải viết đủ một lần:
  \`Đặc điểm tính cách cốt lõi/Điều kiện đột phá hảo cảm/Điều kiện đột phá quan hệ/Biến mạng lưới quan hệ\` +
  \`Miêu tả ngoại hình/Miêu tả dáng người/Phong cách ăn mặc\` +
  \`Kích thước ngực/Màu đầu vú/Màu âm hộ/Màu hậu môn/Kích thước mông/Đặc điểm riêng tư/Mô tả riêng tư tổng quát/Tử cung/Có phải trinh nữ không/Các trường đêm đầu tiên/Thống kê số lần\`.
- \`Biến mạng lưới quan hệ\` phải là mảng cạnh quan hệ, không ít hơn 2 mục.
- Đối với nữ chính quan trọng đã có mà bị thiếu trường, lượt này phải xuất lệnh sửa lỗi ngay, cấm "để sau bổ sung".

### E. Tiến triển cốt truyện
\`\`\`json
{"action":"set","key":"gameState.Cốt truyện.Biến số cốt truyện.Chương1_Hoànthành","value":true}
{"action":"push","key":"gameState.Cốt truyện.Sử sách giang hồ","value":{"id":"Chapter001", "index": 1, "title":"Quyển X: Tiêu đề chương", "summary": "Tóm tắt chương...", "backgroundStory": "Toàn văn chương...", "epilogue":"Nội dung lời kết."}}
\`\`\`

## 5. Kiểm tra phụ thuộc tiên quyết và tính hợp lệ (Bắt buộc)
- **Sự tồn tại của đối tượng cha**: Không tồn tại thì tạo trước, sửa sau.
- **Chỉ mục hợp lệ**: \`gameState.Giao tiếp[i]\`, \`gameState.Túi đồ[i]\` phải từ ánh xạ đã xác nhận.
- **Loại tương ứng**: \`"add"\` cho số, \`"push"\` cho mảng, \`"set"\` cho các loại tương thích.
- **Giới hạn dưới/trên**: Khấu trừ không thấp hơn 0, tăng không vượt quá trường giới hạn trên.
- **Dung tích vật chứa**: Vật chứa tồn tại, kích thước đơn chiếc hợp lệ, tổng không vượt quá giới hạn.
- **Định dạng thời gian**: Tất cả trường thời gian phải là \`"YYYY:MM:DD:HH:MM"\`.
- **Tính nhất quán tự sự**: Sự thật chưa xảy ra trong \`logs\` không được thực thi trong \`tavern_commands\`.
- **Thứ tự câu lệnh**: Tạo → Sửa → Dọn dẹp.

## 6. ID chuẩn (Bắt buộc)
- Định dạng: **Tiền tố ngắn + 3 chữ số** (ví dụ: \`NPC001\`, \`Item001\`, \`Event001\`).
- Cấm: tên tiếng Anh đầy đủ, phiên âm pinyin hoặc chuỗi ngữ nghĩa dài.

## 7. Ví dụ cấm (Phải tránh)
- Đường dẫn sai: \`gameState.Hành lý\` (Sử dụng \`gameState.Túi đồ\`)
- Chỉ mục chưa xác nhận: \`gameState.Giao tiếp[7].Độ hảo cảm\` khi chưa có ánh xạ
- Tự sự viết "nhìn thấy rơi đồ" nhưng trực tiếp push vào túi đồ
- Chưa tạo đối tượng cha đã viết đường dẫn con
- Vật phẩm đã thu nạp nhưng không viết \`ID vật chứa hiện tại\`
- Vật phẩm đã trang bị nhưng không đồng bộ \`Vị trí trang bị hiện tại\`
- Cho đồ vào vật chứa nhưng không cập nhật \`Không gian đã dùng hiện tại\`

</Output format — JSON mode>
`,
    type: 'core setting',
    enabled: true
};
