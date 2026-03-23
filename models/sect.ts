// Hệ thống nhiệm vụ môn phái và định nghĩa chi tiết

export type SectTaskStatus = 'Có thể tiếp nhận' | 'Đang thực hiện' | 'Đã hoàn thành' | 'Thất bại' | 'Đã quá hạn';
export type SectTaskType = 'Hàng ngày' | 'Treo thưởng' | 'Xây dựng' | 'Rèn luyện';

export interface SectTask {
    id: string;
    title: string;
    description: string;
    type: SectTaskType;
    difficulty: number; // 1-5 sao
    
    // Giới hạn thời gian (YYYY:MM:DD:HH:MM)
    releaseDate: string;
    deadline: string; 
    refreshDate: string; // Chỉ nhiệm vụ hàng ngày hoặc nhiệm vụ tuần hoàn có trường này
    
    // Phần thưởng
    rewardContribution: number;
    rewardFunds: number;
    rewardItems?: string[]; // Định dạng: "Tên vật phẩm x Số lượng"

    currentStatus: SectTaskStatus;
}

export interface SectGoods {
    id: string;
    itemName: string; // Sử dụng tên trực tiếp
    type: 'Võ học' | 'Đan dược' | 'Trang bị' | 'Nguyên liệu';
    exchangePrice: number; // Điểm cống hiến
    stock: number;
    requiredPosition: string; // ví dụ: "Đệ tử nội môn"
}

export interface SectMemberBrief {
    id: string; // Giữ ID để làm mục lục duy nhất, nhưng UI hiển thị dùng các trường dưới đây
    name: string;
    gender: 'Nam' | 'Nữ';
    age: number;
    realm: string;
    identity: string;
    brief: string; // Giới thiệu cực ngắn
}

// Cấu trúc chi tiết môn phái của người chơi (Kế thừa từ thế lực cơ bản, nhưng nhiều trường hơn)
export interface DetailedSectStructure {
    id: string;
    name: string;
    description: string;
    sectRules: string[];
    introduction: string;
    
    // Tài nguyên
    sectFunds: number;
    sectResources: number;
    constructionLevel: number;
    
    // Liên quan đến người chơi
    playerPosition: string; // Đệ tử ngoại môn, Đệ tử nội môn, Đệ tử chân truyền, Trưởng lão, Cung phụng
    playerContribution: number;
    
    // Danh sách động
    taskList: SectTask[];
    exchangeList: SectGoods[];
    
    // Danh sách nhân sự
    importantMembers: SectMemberBrief[];
}

export const positionLevelOrder: Record<string, number> = {
    "Đệ tử tạp dịch": 1,
    "Đệ tử ngoại môn": 2,
    "Đệ tử nội môn": 3,
    "Đệ tử chân truyền": 4,
    "Chấp sự": 5,
    "Trưởng lão": 6,
    "Phó chưởng môn": 7,
    "Chưởng môn": 8
};
