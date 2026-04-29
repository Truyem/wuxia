// Định nghĩa hệ thống Nhiệm vụ và Hẹn ước

export type QuestStatus = 'Đang thực hiện' | 'Có thể nộp' | 'Đã hoàn thành' | 'Thất bại';
export type QuestType = 'Chính tuyến' | 'Nhánh' | 'Môn phái' | 'Kỳ ngộ' | 'Treo thưởng' | 'Tin đồn';

export interface QuestGoal {
    description: string;
    currentProgress: number;
    totalRequired: number;
    isCompleted: boolean;
}

export interface QuestStructure {
    title: string;
    description: string;
    type: QuestType;
    issuer: string;
    location: string;
    recommendedRealm: string;
    deadline?: string;
    currentStatus: QuestStatus;
    goalList: QuestGoal[];
    rewardDescription: string[];
    hiddenStoryLine?: string;
}

export type AppointmentStatus = 'Sắp diễn ra' | 'Đang chờ' | 'Đang thực hiện' | 'Hoàn thành' | 'Hủy bỏ' | 'Thất bại';
export type AppointmentNature = 'Tình cảm' | 'Giao dịch' | 'Cá cược' | 'Báo thù' | 'Cam kết' | 'Tự nguyện';

export type TargetType = 'npc' | 'self' | 'family' | 'enemy' | 'past_life' | 'reincarnation' | 'spirit' | 'beast' | 'demon' | 'god';
export type LifeStatus = 'Alive' | 'Dead' | 'Ascended' | 'Reborn' | 'Missing' | 'Imprisoned' | 'Cultivating';
export type SpeciesGroup = 'human' | 'beast' | 'demon' | 'spirit' | 'divine' | 'construct' | 'hybrid' | 'undead';
export type RelationType = 'Cha' | 'Mẹ' | 'Sư phụ' | 'Đệ tử' | 'Tình nhân' | 'Vợ' | 'Chồng' | 'Đệ' | 'Anh' | 'Thù nhân' | 'Tổ tiên' | 'Người lạ';

export interface AppointmentTarget {
    name: string;
    shortName?: string;
    type: TargetType;
    lifeStatus: LifeStatus;
    species?: string;
    speciesGroup?: SpeciesGroup;
    faction?: string;
    realm?: string;
    relationType?: RelationType;
    isMainCharacter?: boolean;
    clanName?: string;
    bloodline?: string;
    pastLifeId?: string;
    pastLifeName?: string;
    reincarnationOf?: string;
    avatar?: string;
}

export interface AppointmentStructure {
    id?: string;
    title: string;
    titleLabel?: string;
    oathContent: string;
    
    target: string | AppointmentTarget;
    nature: AppointmentNature;
    
    location: string;
    time: string;
    validDuration?: number;
    
    currentStatus: AppointmentStatus;
    createdAt?: string;
    updatedAt?: string;
    
    fulfillmentConsequence?: string;
    failureConsequence?: string;
    
    flags?: Record<string, any>;
    backgroundStory?: string;
    hiddenConditions?: string;
}