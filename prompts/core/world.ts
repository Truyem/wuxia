
import { PromptStructure } from '../../types';

export const coreWorldview: PromptStructure = {
    id: 'core_world',
    title: 'Thiết Lập Thế Giới Quan',
    content: `
【Tổng quan thế giới】
Thế giới này mang danh Vạn Giới. Thời đại hiện tại là sự giao thoa giữa một kỷ nguyên võ học cực thịnh và loạn thế giang hồ; vừa có sự huy hoàng của các bậc vương triều, vừa ẩn chứa sóng gió ngầm của võ lâm. Cương vực vô cùng mênh mông, không phải là một đại lục đơn nhất mà được cấu thành từ vô số 'Giới Vực' liên kết với nhau bằng hiểm sơn, hắc hải hoặc các thông đạo bí ẩn. Trật tự bề ngoài do triều đình cường thịnh duy trì, nhưng trong bóng tối, các tông môn, thế gia, hào cường địa phương và tà phái ẩn thế cát cứ một phương, tạo nên thế chân vạc rắc rối. Nền tảng văn minh lấy 'Dĩ võ vi tôn' làm gốc, Nho - Thích - Đạo tam giáo đồng tu.

【Bản đồ Thế lực】
Vạn Giới mang bố cục 'Quần hùng trục lộc'. Các thế lực bá chủ bao gồm:
1. Triều đình: Chưởng khống giang sơn vạn dặm, sở hữu hùng binh và quan lại, mưu đồ trấn áp dị kỷ, thu thập tuyệt học. Dã tâm nhất thống các Giới Vực nhưng lực bất tòng tâm.
2. Chính đạo Tông môn: Thiếu Lâm, Võ Đang, Nga Mi, Cái Bang... đề cao hiệp nghĩa, duy trì võ lâm chính thống. Vừa hợp tác vừa đối kháng triều đình.
3. Tà đạo thế lực: Ma giáo, Tà tông, Hắc đạo... hành sự quỷ dị, không từ thủ đoạn, là cội nguồn của huyết vũ tinh phong.
4. Địa phương Thế gia: Nắm giữ mạch máu kinh tế và tư binh, là kẻ duy trì trật tự địa phương nhưng cũng sẵn sàng xé xác kẻ thù vì lợi ích.

【Hệ thống Cảnh giới (Bắt buộc tuân thủ)】
Hệ thống vũ lực tuân thủ nghiêm ngặt 'Cửu giai phân tầng' thuần võ hiệp, tuyệt đối không trượt sang tiên hiệp (không ngự kiếm phi hành, không nguyên anh, không pháp thuật).
Cửu giai gồm: Khai Mạch Cảnh (1-10 trọng) -> Tụ Tức Cảnh -> Quy Nguyên Cảnh -> Ngự Kình Cảnh -> Hóa Cương Cảnh (Mỗi cảnh giới chia Sơ/Trung/Hậu kỳ) -> Thông Huyền Cảnh -> Thần Chiếu Cảnh -> Phản Chân Cảnh -> Thiên Nhân Cảnh.
Cao thủ Thiên Nhân Cảnh như 'Thần minh' tại thế, thoái ẩn không xuất hiện. Cao thủ Phản Chân, Thần Chiếu là cự phách trấn phái. Khai Mạch Cảnh là hạng tôm tép mới bước chân vào giang hồ.

【Logic Vận hành】
Giang hồ trọng tín nghĩa, phân ân oán. Mọi xung đột bắt nguồn từ tranh đoạt bí kíp, thiên tài địa bảo, mỏ khoáng hoặc thù xưa hận cũ. Tuyệt học và thần binh vô cùng khan hiếm, kỳ ngộ luôn đi kèm với rủi ro sinh tử. Không có chuyện đi đường nhặt được thần công mà không trả giá.
    `.trim(),
    type: 'core setting',
    enabled: true
};
