// Định nghĩa hệ thống công pháp

export type KungfuType = 'Nội công' | 'Ngoại công' | 'Khinh công' | 'Tuyệt kỹ' | 'Bị động';
export type KungfuQuality = 'Phàm phẩm' | 'Lương phẩm' | 'Thượng phẩm' | 'Cực phẩm' | 'Tuyệt thế' | 'Truyền thuyết';
export type DamageType = 'Vật lý' | 'Nội công' | 'Thực' | 'Hỗn hợp';
export type ConsumptionType = 'Nội lực' | 'Tinh lực' | 'Khí huyết' | 'Không';
export type TargetType = 'Đơn mục tiêu' | 'Toàn thể' | 'Hình quạt' | 'Bản thân' | 'Ngẫu nhiên';

// Cấu trúc con: Giữ đơn giản nhất có thể
export interface SkillEffect {
    code: string;      // ví dụ: "BUFF_POISON"
    name: string;      // ví dụ: "Kịch độc"
    triggerChance: number;  // 0-100
    duration: number;  // giây
    valueParam: number;  // Cường độ/Số tầng
    effectInterval: number;  // giây (0 đại diện cho một lần)
}

export interface PassiveModifier {
    propertyName: string;    // ví dụ: "Sức mạnh"
    value: number;
    type: 'Cố định' | 'Phần trăm';
}

export interface RealmEffect {
    unlockLevel: number;
    description: string;
}

export interface KungfuStructure {
    // --- Thông tin cơ bản ---
    id: string;
    name: string;
    description: string;
    type: KungfuType;
    quality: KungfuQuality;
    source: string;      // Môn phái hoặc nguồn gốc

    // --- Dữ liệu tăng trưởng (Động) ---
    currentLevel: number;
    maxLevel: number;
    currentProficiency: number;
    proficiencyToNextLevel: number;
    breakthroughRequirement: string;  // Mô tả văn bản, ví dụ: "Ngộ tính > 30"

    // --- Điều kiện hạn chế ---
    realmLimit: string;
    weaponLimit: string[]; // Mảng rỗng đại diện cho không hạn chế/tay không

    // --- Tiêu hao và Thời gian ---
    consumptionType: ConsumptionType;
    consumptionValue: number;
    castTime: number;  // Vận công (giây)
    cooldown: number;  // CD (giây)

    // --- Chỉ số chiến đấu ---
    baseDamage: number;
    associatedProperty: string;  // Thuộc tính liên quan, ví dụ: "Thân pháp"
    scalingFactor: number;  // Hệ số nhân thuộc tính liên quan
    damageType: DamageType;
    
    // --- Phạm vi ---
    targetType: TargetType;
    maxTargets: number;

    // --- Danh sách dữ liệu ---
    effects: SkillEffect[];
    passiveModifiers: PassiveModifier[]; // Có hiệu lực khi trang bị/vận công
    realmEffects: RealmEffect[];
}
