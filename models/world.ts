// --- Định nghĩa cơ bản ---

// Định dạng thời gian nghiêm ngặt: YYYY:MM:DD:HH:MM (Ví dụ: 2024:03:12:12:00)
export type GameTimeFormat = string;

// --- NPC Hoạt động (Mô phỏng hậu trường) ---

export interface ActiveNpcStructure {
    id: string;
    name: string;
    title: string;
    affiliation: string; // Thế lực thuộc về
    realm: string;

    currentLocation: string;
    status: string;

    currentActionDescription: string;
    actionStartTime: GameTimeFormat;
    actionEstimatedEndTime: GameTimeFormat;

    heldTreasures: string[];
}

// --- Sự kiện thế giới (Vòng đời) ---

export type EventStatus = 'Đang diễn ra' | 'Đã kết thúc';

export interface WorldEventStructure {
    id: string;
    type: 'Thiên tai' | 'Chiến tranh' | 'Kỳ ngộ' | 'Tin đồn' | 'Quyết đấu' | 'Hệ thống';
    title: string;
    content: string;
    location: string;

    startTime: GameTimeFormat;
    estimatedEndTime: GameTimeFormat;

    currentStatus: EventStatus;
    eventResult?: string;

    dissipationTime?: GameTimeFormat;
    isMajorEvent: boolean;

    relatedAffiliations: string[];
    relatedCharacters: string[];
}

// --- Bản đồ và Kiến trúc (Cấu trúc đơn giản hóa) ---

export interface LocationAffiliation {
    region: string; // Đại địa điểm
    area: string;   // Trung địa điểm
    subArea: string; // Tiểu địa điểm
}

export interface MapStructure {
    name: string;
    coordinates: string;
    description: string;
    affiliation: LocationAffiliation;
    internalBuildings: string[];
}

export interface BuildingStructure {
    name: string;
    description: string;
    affiliation: LocationAffiliation;
}

// --- Toàn cảnh thế giới ---

export interface WorldDataStructure {
    activeNpcList: ActiveNpcStructure[];
    maps: MapStructure[];
    buildings: BuildingStructure[];

    ongoingEvents: WorldEventStructure[];
    settledEvents: WorldEventStructure[];
    worldHistory: WorldEventStructure[]; // Giang hồ sử sách
}
