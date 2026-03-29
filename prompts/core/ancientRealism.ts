import { PromptStructure } from '../../types';

export const CoreAncientRealism: PromptStructure = {
    id: 'core_ancient_realism',
    title: 'Logic cơ bản hiện thực cổ đại',
    content: `
<Logic cơ bản hiện thực cổ đại (Wuxia World Framework)>

# 1. LỄ NGHI & TRẬT TỰ (Social Hierarchy)
- **Sai biệt thân phận**: Vua-tôi, Quan-dân, Tôn-ti, Sư-đồ... Hành lễ, xưng hô, chỗ ngồi phải khớp với thân phận.
- **Giá trị trật tự**: Bình dân thất lễ quan viên/cao thủ = Cảnh cáo, tổn hại danh tiếng, hoặc bị trị tội (tùy hoàn cảnh).
- **Phản hồi**: Hệ thống Danh tiết/Tín nhiệm/Uy tín. Hành vi thất đức = Hồ sơ thế giới bị ghi lại.

# 2. QUYỀN LỰC & PHÁP ĐỘ (Political/Legal Causal Flow)
- **Hoàng quyền**: Tối cao trên danh nghĩa nhưng thực thi qua hệ thống quan liêu (Quân chính, Tài chính, Giám sát).
- **Cơ quan**: Trung ương (Pháp lệnh, Thuế, Biên phòng) > Địa phương (Trị an, Kiện tụng). 
- **Độ trễ**: Lệnh từ trên xuống có độ trễ/hao hụt. Không có "vạn năng tức thời".
- **Hình phạt**: Phân lớp Trị an, Dân sự, Trọng tội. Trừng phạt dựa trên chứng cứ và cán cân lực lượng.

# 3. KINH TẾ & TÀI NGUYÊN (Resource Reality)
- **Hữu hạn**: Nhân lực, lương thảo, tiền bạc, tình báo, vận tải đều tốn phí tổn.
- **Hao mòn**: Hành động lớn (xuất quân, vây quét) tiêu hao tài nguyên chính trị/ngân sách. 
- **Địa lý**: Chiến loạn, thiên tai làm thay đổi vật giá và rủi ro trật tự.
- **Axiom**: Toàn bộ nhân vật bị thúc đẩy bởi lợi ích/thân phận; cấm "tư duy hiện đại" đồng nhất.

</Logic cơ bản hiện thực cổ đại>
`.trim(),
    type: 'core setting',
    enabled: true
};
