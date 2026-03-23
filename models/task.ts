// Định nghĩa hệ thống Nhiệm vụ và Hẹn ước

export type QuestStatus = 'Đang thực hiện' | 'Có thể nộp' | 'Đã hoàn thành' | 'Thất bại';
export type QuestType = 'Chính tuyến' | 'Nhánh' | 'Môn phái' | 'Kỳ ngộ' | 'Treo thưởng' | 'Tin đồn';

export interface QuestGoal {
    description: string;           // Mô tả mục tiêu nhiệm vụ
    currentProgress: number;
    totalRequired: number;
    isCompleted: boolean;
}

export interface QuestStructure {
    title: string;           // Tiêu đề nhiệm vụ
    description: string;           // Mô tả bối cảnh nhiệm vụ
    type: QuestType;
    issuer: string;         // Tên người giao nhiệm vụ
    location: string;       // Tên địa điểm
    recommendedRealm: string;       // Yêu cầu cảnh giới
    
    // Giới hạn thời gian (Tùy chọn)
    deadline?: string;      // YYYY:MM:DD:HH:MM
    
    currentStatus: QuestStatus;
    goalList: QuestGoal[];
    
    // Thưởng (Mang tính mô tả, dùng để hiển thị)
    rewardDescription: string[];     // Danh sách mô tả phần thưởng
    
    // Trường hỗ trợ AI (Ẩn)
    hiddenStoryLine?: string;      // Giải thích ẩn tuyến cho AI
}

export type AppointmentStatus = 'Đang chờ' | 'Sắp tới' | 'Đã thực hiện' | 'Đã thất bại' | 'Đã hủy';
export type AppointmentNature = 'Tình cảm' | 'Giao dịch' | 'Cá cược' | 'Báo thù' | 'Cam kết';

export interface AppointmentStructure {
    target: string;           // Tên đối tượng
    titleLabel?: string;          // Danh hiệu hiển thị
    nature: AppointmentNature;
    
    title: string;           // Tiêu đề hẹn ước
    oathContent: string;       // Nội dung hẹn ước
    
    location: string;
    time: string;       // YYYY:MM:DD:HH:MM
    validDuration: number;       // Phút, ví dụ: đến trong vòng 60 phút là hợp lệ
    
    currentStatus: AppointmentStatus;
    
    // Mô tả hậu quả (Dùng cho giao diện cảnh báo người chơi)
    fulfillmentConsequence: string;       // "Hảo cảm đối với Lâm Thanh Nguyệt tăng mạnh, nhận được 【Tín vật Kiếm Tông】"
    failureConsequence: string;       // "Lâm Thanh Nguyệt sẽ coi bạn là kẻ bội tín, quan hệ chuyển thành 【Lạnh nhạt】"
    
    backgroundStory?: string;      // Ngữ cảnh AI
}
