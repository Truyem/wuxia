// Định nghĩa cốt lõi của hệ thống vật phẩm
// Phân cấp kích thước vật phẩm (1-10)
// 1: Cực nhỏ (Đan dược, Kim, Đồng tiền)
// 2: Nhỏ (Găm, Táo, Bí kíp)
// 3: Trung bình (Kiếm một tay, Quần áo, Giày, Bình nước)
// 4: Lớn (Trường thương, Rìu hai tay, Đàn Tranh)
// 5: Siêu lớn (Thi thể, Đỉnh)

export type ItemSize = number; 

export type ItemType = 'Vũ khí' | 'Phòng cụ' | 'Nội dung' | 'Tiêu hao' | 'Nguyên liệu' | 'Bí kíp' | 'Tạp vật' | 'Vật chứa';
export type ItemQuality = 'Phàm phẩm' | 'Lương phẩm' | 'Thượng phẩm' | 'Cực phẩm' | 'Tuyệt thế' | 'Truyền thuyết';
export type EquipmentSlot = 'head' | 'chest' | 'legs' | 'hands' | 'feet' | 'mainWeapon' | 'subWeapon' | 'hiddenWeapon' | 'back' | 'waist' | 'mount';

// Định nghĩa bộ phận cơ thể
export type BodyPart = 'Đầu' | 'Ngực' | 'Bụng' | 'Cánh tay trái' | 'Cánh tay phải' | 'Chân trái' | 'Chân phải' | 'Bàn tay' | 'Bàn chân';

// Thuộc tính/Modifier ngẫu nhiên
export interface ItemAttribute {
    name: string;      // ví dụ: "Sắc bén"
    property: string;  // ví dụ: "Tấn công vật lý"
    value: number;     // ví dụ: 5
    type: 'Cố định' | 'Phần trăm'; 
}

// Thuộc tính chi tiết của vật chứa (balo, áo có túi)
export interface ContainerProperties {
    maxCapacity: number;       // Đơn vị dựa trên kích thước (ví dụ: balo dung tích 20)
    currentUsedSpace: number;   // Tính toán thời gian thực
    maxSingleItemSize: number;   // Hạn chế kích thước vật phẩm (ví dụ: túi áo chỉ đựng được vật phẩm kích thước <= 2)
    weightReductionRatio: number; // 0-100 (ví dụ: Rương sắt giảm trọng 0%, Túi Càn Khôn giảm trọng 80%)
}

// Giao diện vật phẩm cơ bản
export interface BaseItem {
    id: string;
    name: string;
    description: string;
    type: ItemType;
    quality: ItemQuality;
    
    weight: number;        // Đơn vị: Cân (có thể là số thập phân, ví dụ 0.3 cân)
    spaceOccupied: ItemSize;   // Đơn vị: Ô (1-10)
    image?: string;        // Hình ảnh vật phẩm
    
    value: number;        // Đồng tiền
    
    currentDurability: number;
    maxDurability: number;    // 0 là không thể phá hủy
    
    attributes: ItemAttribute[]; // Thuộc tính ngẫu nhiên
    currentContainerId?: string;  // ID vật chứa hoặc vị trí trang bị; có thể để trống nếu không trong túi
    currentEquipSlot?: EquipmentSlot; // Vị trí đang trang bị/cầm

    // Mọi vật phẩm đều có thể có thuộc tính vật chứa
    containerProperties?: ContainerProperties;
}

// Mở rộng Vũ khí
export interface Weapon extends BaseItem {
    type: 'Vũ khí';
    weaponSubtype: 'Kiếm' | 'Đao' | 'Thương' | 'Côn' | 'Ám khí' | 'Quyền thủ';
    minAttack: number;
    maxAttack: number;
    speedModifier: number; // 1.0 là tiêu chuẩn
    parryRate: number;   // 0-100
}

// Mở rộng Phòng cụ
export interface Armor extends BaseItem {
    type: 'Phòng cụ';
    equipPosition: 'Đầu' | 'Ngực' | 'Chân' | 'Tay' | 'Bàn chân';
    coveredParts: BodyPart[]; // Bộ phận thực tế được bảo vệ
    
    physicalDefense: number;
    innerDefense: number;
}

// Mở rộng Vật chứa (vật phẩm thuần vật chứa, như gùi)
export interface ContainerItem extends BaseItem {
    type: 'Vật chứa';
    equipPosition: 'Lưng' | 'Thắt lưng'; 
    containerProperties: ContainerProperties; // Vật phẩm vật chứa bắt buộc có thuộc tính này
}

// Mở rộng Bí kíp
export interface SecretManual extends BaseItem {
    type: 'Bí kíp';
    correspondingSkillName: string;
    studyRequirement: string; // ví dụ: "Ngộ tính > 30"
    studyProgress: number;    // 0-100
    isConsumedOnUse: boolean; // Có biến mất sau khi đọc không
}

// Mở rộng Tiêu hao
export interface Consumable extends BaseItem {
    type: 'Tiêu hao';
    usageEffects: {
        targetProperty: string; // ví dụ: "Máu hiện tại", "Nội lực hiện tại"
        value: number;
    }[];
    toxicity: number; // Độc tính của đan dược
}

// Kiểu kết hợp
export type GameItem = Weapon | Armor | ContainerItem | SecretManual | Consumable | BaseItem;
