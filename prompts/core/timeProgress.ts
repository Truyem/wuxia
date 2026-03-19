import { PromptStructure } from '../../types';

export const coreTimeProgression: PromptStructure = {
  id: 'core_time_progress',
  title: 'Quy tắc Tiến triển Thời gian',
  content: `
<Time progression laws>
# 【Quy tắc Tiến triển Thời gian | Bản Tránh Đóng băng Thời gian】

## 0. Mục tiêu
- Tiến triển thời gian phải khớp với chi phí hành động, tránh việc "cốt truyện đi nhiều mà thời gian gần như không đổi".
- Mỗi vòng phải phán đoán tiêu hao thời gian trước, sau đó mới viết \`tavern_commands\`.

## 1. Mức độ tiến triển cơ bản (Khoảng tham khảo)
- Quan sát ngắn/Chào hỏi/Hỏi đáp đơn giản: 5 ~ 15 phút
- Dò hỏi thông tin/Giao dịch/Băng bó/Sắp xếp hành trang: 15 ~ 45 phút
- Di chuyển trong thành trấn (giữa các khu phố): 15 ~ 40 phút
- Di chuyển quãng ngắn ngoại ô: 40 ~ 120 phút
- Chiến đấu (chạm trán): 1 ~ 20 phút
- Truy đuổi/Lẻn vào/Vây quét: 20 ~ 90 phút
- Tu luyện/Chữa thương/Tọa thiền: 1 ~ 8 giờ
- Ngủ/Nghỉ ngơi sâu: 6 ~ 9 giờ

## 2. Quy tắc đồng bộ bắt buộc
- Khi xảy ra hành động hiệu quả (không phải chỉ tán gẫu suông), về nguyên tắc nên đẩy nhanh \`gameState.Môi trường.Thời gian\`.
- Khi qua ngày mới phải cập nhật đồng thời:
  - \`set gameState.Môi trường.Thời gian\` sang dấu thời gian mới (\`YYYY:MM:DD:HH:MM\`)
  - \`set gameState.Môi trường.Ngày chơi\` sang số "Ngày thứ mấy" mới
- Nghiêm cấm chỉ sửa \`Ngày\` mà không sửa \`Giờ\`, cũng nghiêm cấm chỉ viết dẫn truyện mà không cập nhật biến thời gian.

## 3. Ngăn chặn thời gian trôi quá chậm (QUAN TRỌNG)
- Khi thực hiện các hành động có mật độ thông tin cao tại cùng một cảnh trong hơn 2 vòng liên tiếp, không nên chỉ tiến thêm 1~2 phút.
- Nếu vòng này hoàn thành từ hai hạng mục trở lên trong số "điều tra + đối thoại + di chuyển + chiến đấu", khuyến nghị tổng tiến trình >= 30 phút.
- Nếu người chơi chủ động chọn "Chờ đợi/Phục kích/Nghỉ ngơi", nên sử dụng bước nhảy thời gian rõ ràng (ví dụ: +1 giờ, +nửa ngày).
- Nghiêm cấm duy trì cùng một dấu thời gian trong nhiều vòng liên tiếp; chỉ những trận chiến cường độ cao trong cùng một phút mới có thể ngoại lệ ngắn ngủi (không quá 2 vòng).

## 4. Yêu cầu thực thi COT
- Trong \`thinking_pre\` phải đưa ra "Phân tích tiến triển thời gian" trước:
  - Loại hành động vòng này
  - Khoảng thời gian dự kiến tiêu hao
  - Giá trị tiến triển cuối cùng được áp dụng và lý do
- Trong \`thinking_post\` kiểm tra lại "Văn bản dẫn truyện và biến thời gian có nhất quán không".

## 5. Tính nhất quán tự sự
- Khi logs thể hiện các hành động dài (đi xa, đàm luận lâu, tu luyện), tiến triển thời gian phải nhất quán với quy mô của dẫn truyện.
- Không được để xảy ra kết quả phi lý như "Hoàn thành lộ trình nửa ngày nhưng thời gian chỉ trôi qua 5 phút".
</Time progression laws>
`.trim(),
  type: 'core setting',
  enabled: true
};
