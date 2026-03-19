import { CharacterData, EnvironmentData, NpcStructure, WorldDataStructure, BattleStatus, StorySystemStructure } from '../types';
import { DetailedSectStructure } from '../models/sect';

export const VIETNAMESE_SUBKEY_MAP: Record<string, string> = {
    // Character / Role
    "Danh sách vật phẩm": "itemList",
    "Túi đồ": "itemList",
    "itemList": "itemList",
    "Công pháp danh sách": "kungfuList",
    "kungfuList": "kungfuList",
    "Tiền tệ": "money",
    "Trang bị": "equipment",
    "Vàng thỏi": "gold",
    "Vàng": "gold",
    "Bạc": "silver",
    "Đồng": "copper",
    "Đồng tiền": "copper",
    "Phụ trọng": "currentWeight",
    "Cân nặng hiện tại": "currentWeight",
    "Tải trọng hiện tại": "currentWeight",
    "Phụ trọng hiện tại": "currentWeight",
    "Tải trọng tối đa": "maxWeight",
    "Phụ trọng tối đa": "maxWeight",
    "Số lượng": "quantity",
    "Cấp": "level",
    "Cấp độ": "level",
    "level": "level",
    "Ngày sinh": "birthDate",
    "Ngoại hình": "appearance",
    "Họ tên đối tượng": "targetName",
    "Quan hệ": "relation",
    "Ghi chú": "note",
    "Tính cách": "personality",
    
    // Body HP - Current
    "Máu đầu hiện tại": "headCurrentHp",
    "Máu ngực hiện tại": "chestCurrentHp",
    "Máu bụng hiện tại": "abdomenCurrentHp",
    "Máu tay trái hiện tại": "leftArmCurrentHp",
    "Máu tay phải hiện tại": "rightArmCurrentHp",
    "Máu chân trái hiện tại": "leftLegCurrentHp",
    "Máu chân phải hiện tại": "rightLegCurrentHp",
    
    // Body HP - Max
    "Máu đầu tối đa": "headMaxHp",
    "Máu ngực tối đa": "chestMaxHp",
    "Máu bụng tối đa": "abdomenMaxHp",
    "Máu tay trái tối đa": "leftArmMaxHp",
    "Máu tay phải tối đa": "rightArmMaxHp",
    "Máu chân trái tối đa": "leftLegMaxHp",
    "Máu chân phải tối đa": "rightLegMaxHp",

    // Survival
    "Năng lượng": "currentEnergy",
    "Năng lượng hiện tại": "currentEnergy",
    "Năng lượng tối đa": "maxEnergy",
    "Tinh lực": "currentEnergy",
    "Tinh lực hiện tại": "currentEnergy",
    "Tinh lực tối đa": "maxEnergy",
    "Độ no": "currentFullness",
    "Độ no hiện tại": "currentFullness",
    "Độ no tối đa": "maxFullness",
    "No bụng": "currentFullness",
    "No bụng hiện tại": "currentFullness",
    "No bụng tối đa": "maxFullness",
    "Độ khát": "currentThirst",
    "Độ khát hiện tại": "currentThirst",
    "Độ khát tối đa": "maxThirst",
    "Khát nước": "currentThirst",
    "Khát nước hiện tại": "currentThirst",
    "Khát nước tối đa": "maxThirst",

    // Attributes
    "Sức mạnh": "strength",
    "str": "strength",
    "Mẫn tiệp": "agility",
    "agi": "agility",
    "Thể chất": "constitution",
    "con": "constitution",
    "Căn cốt": "rootBone",
    "root": "rootBone",
    "Ngộ tính": "intelligence",
    "int": "intelligence",
    "Phúc duyên": "luck",
    "luc": "luck",
    "luck": "luck",
    "Tâm tính": "tamTinh",
    "Phòng ngự": "defense",
    "Tấn công": "attack",
    "Tốc độ": "speed",
    "Danh hiệu": "title",
    "Điểm tiềm năng": "potentialPoints",
    "Danh tiếng": "reputation",
    "Cảnh giới": "realm",
    "Tầng cảnh giới": "realmTier",
    "Realm": "realm",
    "Realm tiers": "realmTiers",

    // Experience
    "Kinh nghiệm": "currentExp",
    "Kinh nghiệm hiện tại": "currentExp",
    "exp": "currentExp",
    "Kinh nghiệm thăng cấp": "levelUpExp",
    "levelUpExp": "levelUpExp",

    // Equipment Slots
    "Vũ khí": "mainWeapon",
    "Vũ khí chính": "mainWeapon",
    "Vũ khí phụ": "subWeapon",
    "Áo": "chest",
    "Quần": "legs",
    "Hộ uyển": "hands",
    "Giày": "feet",
    "Lưng": "back",
    "Thắt lưng": "waist",
    "Tọa kỵ": "mount",

    // NPC / Social
    "Họ tên": "name",
    "Giới tính": "gender",
    "Tuổi": "age",
    "Thân phận": "identity",
    "Có mặt hay không": "isPresent",
    "Có phải đồng đội không": "isTeammate",
    "Có phải nhân vật chính không": "isMainCharacter",
    "Độ hảo cảm": "favorability",
    "Hảo cảm": "favorability",
    "Trạng thái quan hệ": "relationStatus",
    "Quan hệ hiện tại": "relationStatus",
    "Giới thiệu": "description",
    "Ký ức": "memories",
    "Ký ức xã hội": "memories",
    "Social memory": "memories",
    "Biến mạng lưới quan hệ": "socialNetworkVariables",
    "Social network": "socialNetworkVariables",
    "Đặc điểm tính cách cốt lõi": "corePersonalityTraits",
    "Điều kiện đột phá hảo cảm": "favorabilityBreakthroughCondition",
    "Điều kiện đột phá quan hệ": "relationBreakthroughCondition",
    "Miêu tả ngoại hình": "appearanceDescription",
    "Mô tả ngoại hình": "appearanceDescription",
    "Lực tấn công": "attack",
    "Lực phòng ngự": "defense",
    "Miêu tả dáng người": "bodyDescription",
    "Phong cách ăn mặc": "clothingStyle",
    "Kích thước ngực": "breastSize",
    "Màu đầu vú": "nippleColor",
    "Màu âm hộ": "vaginaColor",
    "Màu hậu môn": "anusColor",
    "Kích thước mông": "buttockSize",
    "Đặc điểm riêng tư": "privateTraits",
    "Mô tả riêng tư tổng quát": "privateFullDescription",
    "Tử cung": "womb",
    "Có phải trinh nữ không": "isVirgin",
    "Người đoạt đêm đầu": "firstNightClaimer",
    "Thời gian đêm đầu": "firstNightTime",
    "Mô tả đêm đầu": "firstNightDescription",
    "Số lần_Miệng": "count_oral",
    "Số lần_Ngực": "count_breast",
    "Số lần_Âm đạo": "count_vaginal",
    "Số lần_Hậu môn": "count_anal",
    "Số lần_Lên đỉnh": "count_orgasm",

    // Items / Kungfu
    "ID": "id",
    "Tên": "name",
    "Mô tả": "description",
    "Loại": "type",
    "Phẩm chất": "quality",
    "Cân nặng": "weight",
    "Trọng lượng": "weight",
    "Không gian chiếm dụng": "spaceOccupied",
    "Giá trị": "value",
    "Độ bền hiện tại": "currentDurability",
    "Độ bền tối đa": "maxDurability",
    "Danh sách từ tố": "attributes",
    "Danh sách thuộc tính": "attributes",   // alias used in some AI outputs
    "ID vật chứa hiện tại": "currentContainerId",
    "Vị trí trang bị hiện tại": "currentEquipSlot",
    "Tầng hiện tại": "currentLevel",
    "Tầng tối đa": "maxLevel",
    "Độ thuần thục hiện tại": "currentProficiency",
    "Kinh nghiệm nâng cấp": "proficiencyToNextLevel",
    "Sát thương cơ bản": "baseDamage",
    "Loại tiêu hao": "consumptionType",
    "Giá trị tiêu hao": "consumptionValue",
    "Nguồn gốc": "source",
    // Container item properties — both Vietnamese variants appear across different prompt files
    "Thuộc tính vật chứa": "containerProperties",
    "Dung lượng tối đa": "maxCapacity",
    "Không gian hiện tại đã dùng": "currentUsedSpace",   // variant used in items.ts
    "Không gian đã dùng hiện tại": "currentUsedSpace",   // variant used in format.ts / cot.ts
    "Kích thước tối đa vật phẩm đơn lẻ": "maxSingleItemSize",   // variant used in items.ts
    "Kích thước vật phẩm đơn tối đa": "maxSingleItemSize",      // variant used in opening.ts
    "Tỷ lệ giảm trọng lượng": "weightReductionRatio",

    // Environment / World
    "Thời gian": "time",
    "Năm": "year",
    "Tháng": "month",
    "Ngày": "day",
    "Giờ": "hour",
    "Mùa": "season",
    "Bản đồ": "mediumLocation",
    "Địa điểm": "mediumLocation",
    "Môi trường": "env",
    "Biến môi trường": "environmentVariables",
    "Thế giới": "world",
    "Sự kiện": "event",
    "Sự kiện hiện tại": "currentEvent",

    // Battle
    "Chiến đấu": "battle",
    "Đang chiến đấu": "isInBattle",
    "Kẻ địch": "enemy",
    "Kẻ thù": "enemy",
    "Tên kẻ địch": "name",
    "Máu kẻ địch": "currentHp",
    "Máu tối đa kẻ địch": "maxHp",

    // Story
    "Cốt truyện": "story",
    "Biến cốt truyện": "storyVariables",

    // Story chapter fields
    "Current chapter": "currentChapter",
    "Next chapter teaser": "nextChapterPreview",
    "Historical dossiers": "historicalArchives",
    "Recent story planning": "shortTermPlanning",
    "Medium-term story planning": "mediumTermPlanning",
    "Long-term story planning": "longTermPlanning",
    "Pending events": "pendingEvents",
    "Story variables": "storyVariables",

    // Story chapter sub-fields
    "Title": "title",
    "Outline": "outline",
    "Serial Number": "index",
    "Background story": "backgroundStory",
    "Main conflict": "mainConflict",
    "End condition": "endConditions",
    "Foreshadowing list": "foreshadowingList",
    
    // Category Markers
    "Thuộc tính": "",
    "Lục đạo thuộc tính": "",
    "Sống còn": "",
    "Attributes": "",
    "Survival": "",
    "Stats": "",
    "stats": "",
    "Máu bộ phận": "",
    "Trạng thái bộ phận": "",
    "Hành trang": "itemList",
    "Inventory": "itemList",
    "Máu": "currentHp",
    "Bộ phận": "",
    "Trạng thái": "Status",
    "Chi tiết": "",
    "Môn phái": "sect",
    "Nhiệm vụ": "tasks",
    "Hứa hẹn": "promises",
    "Đội nhóm": "",
    "Nhân vật": "character",
    "Thời gian sự kiện": "time",
    "Tiêu đề": "title",
    "Người giao": "issuer",
    "Phát hành bởi": "issuer",
    "Cảnh giới yêu cầu": "recommendedRealm",
    "Yêu cầu cảnh giới": "recommendedRealm",
    "Thời hạn": "deadline",
    "Trạng thái hiện tại": "currentStatus",
    "Danh sách mục tiêu": "goalList",
    "Mục tiêu": "goalList",
    "Phần thưởng": "rewardDescription",
    "Mô tả phần thưởng": "rewardDescription",
    "Mô tả mục tiêu": "description",
    "Tiến độ hiện tại": "currentProgress",
    "Số lượng yêu cầu": "totalRequired",
    "Số lượng cần thiết": "totalRequired",
    "Hoàn thành": "isCompleted",
    "Đối tượng": "target",
    "Tính chất": "nature",
    "Nội dung hẹn ước": "oathContent",
    "Nội dung": "oathContent",
    "Hậu quả giữ lời": "fulfillmentConsequence",
    "Hậu quả thất hứa": "failureConsequence",
};

export const translateObjectKeys = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(translateObjectKeys);

    const result: any = {};
    const BODY_PARTS_KEYS = ['Đầu', 'Ngực', 'Bụng', 'Tay trái', 'Tay phải', 'Chân trái', 'Chân phải'];
    
    for (const key in obj) {
        let newKey = key;
        if (VIETNAMESE_SUBKEY_MAP[key] !== undefined) {
            newKey = VIETNAMESE_SUBKEY_MAP[key];
        }
        
        // Skip empty keys (category markers) and merge their properties
        if (newKey === "") {
            const translatedSubObj = translateObjectKeys(obj[key]);
            if (typeof translatedSubObj === 'object' && !Array.isArray(translatedSubObj)) {
                Object.assign(result, translatedSubObj);
            } else if (key === "Máu") {
                 // Special case: "Máu": 100 on an item or character
                 // We don't have a direct mapping for just "Máu" yet, usually it's "Máu hiện tại"
            }
            continue;
        }

        const value = translateObjectKeys(obj[key]);

        // Handle body part flattening
        if (BODY_PARTS_KEYS.includes(key) && typeof value === 'object') {
            const partEng = VIETNAMESE_SUBKEY_MAP[key];
            if (value['currentHp'] !== undefined) result[partEng + 'CurrentHp'] = value['currentHp'];
            if (value['maxHp'] !== undefined) result[partEng + 'MaxHp'] = value['maxHp'];
            if (value['Status'] !== undefined) result[partEng + 'Status'] = value['Status'];
            // If it has other properties not flattened, keep the object too just in case
            if (Object.keys(value).some(k => !['currentHp', 'maxHp', 'Status'].includes(k))) {
                result[partEng] = value;
            }
        } else {
            result[newKey] = value;
        }
    }
    return result;
};

export const applyStateCommand = (
    rootCharacter: CharacterData, 
    rootEnv: EnvironmentData, 
    rootSocial: NpcStructure[],
    rootWorld: WorldDataStructure, 
    rootBattle: BattleStatus,
    rootStory: StorySystemStructure, 
    rootTaskList: any[],
    rootAppointmentList: any[],
    rootPlayerSect: DetailedSectStructure,
    key: string, 
    value: any, 
    action: 'set' | 'add' | 'push' | 'delete' | 'sub'
): { char: CharacterData, env: EnvironmentData, social: NpcStructure[], world: WorldDataStructure, battle: BattleStatus, story: StorySystemStructure, taskList: any[], appointmentList: any[], playerSect: DetailedSectStructure } => {
    let newChar = JSON.parse(JSON.stringify(rootCharacter));
    let newEnv = JSON.parse(JSON.stringify(rootEnv));
    let newSocial = JSON.parse(JSON.stringify(rootSocial));
    let newWorld = JSON.parse(JSON.stringify(rootWorld));
    let newBattle = JSON.parse(JSON.stringify(rootBattle));
    let newStory = JSON.parse(JSON.stringify(rootStory)); 
    let newTaskList: any[] = JSON.parse(JSON.stringify(rootTaskList));
    let newAppointmentList: any[] = JSON.parse(JSON.stringify(rootAppointmentList));
    let newPlayerSect: DetailedSectStructure = JSON.parse(JSON.stringify(rootPlayerSect));

    const mergeStoryObjects = (baseStory: any, incoming: any): any => {
        if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) return JSON.parse(JSON.stringify(baseStory));
        const base = (baseStory && typeof baseStory === 'object') ? baseStory : {};
        const next = JSON.parse(JSON.stringify(base));

        if ('currentChapter' in incoming) {
            next.currentChapter = {
                ...(base?.currentChapter || {}),
                ...((incoming?.currentChapter && typeof incoming.currentChapter === 'object') ? incoming.currentChapter : {})
            };
        }
        if ('nextChapterPreview' in incoming) {
            next.nextChapterPreview = {
                ...(base?.nextChapterPreview || {}),
                ...((incoming?.nextChapterPreview && typeof incoming.nextChapterPreview === 'object') ? incoming.nextChapterPreview : {})
            };
        }
        if ('historicalArchives' in incoming) next.historicalArchives = incoming.historicalArchives;
        if ('shortTermPlanning' in incoming) next.shortTermPlanning = incoming.shortTermPlanning;
        if ('mediumTermPlanning' in incoming) next.mediumTermPlanning = incoming.mediumTermPlanning;
        if ('longTermPlanning' in incoming) next.longTermPlanning = incoming.longTermPlanning;
        if ('pendingEvents' in incoming) next.pendingEvents = incoming.pendingEvents;
        if ('storyVariables' in incoming) next.storyVariables = incoming.storyVariables;
        
        // Handle legacy or space-separated keys from AI
        if ('Current chapter' in incoming) {
            next.currentChapter = {
                ...(next.currentChapter || {}),
                ...(incoming['Current chapter'] || {})
            };
        }
        if ('Next chapter teaser' in incoming) {
            next.nextChapterPreview = {
                ...(next.nextChapterPreview || {}),
                ...((incoming['Next chapter teaser'] && typeof incoming['Next chapter teaser'] === 'object') ? incoming['Next chapter teaser'] : {})
            };
        }
        if ('Historical dossiers' in incoming) next.historicalArchives = incoming['Historical dossiers'];
        if ('Recent story planning' in incoming) next.shortTermPlanning = incoming['Recent story planning'];
        if ('Medium-term story planning' in incoming) next.mediumTermPlanning = incoming['Medium-term story planning'];
        if ('Long-term story planning' in incoming) next.longTermPlanning = incoming['Long-term story planning'];
        if ('Pending events' in incoming) next.pendingEvents = incoming['Pending events'];
        if ('Story variables' in incoming) next.storyVariables = incoming['Story variables'];

        Object.keys(incoming).forEach((k) => {
            if (!(k in next) && !['Current chapter', 'Next chapter teaser', 'Historical dossiers', 'Recent story planning', 'Medium-term story planning', 'Long-term story planning', 'Pending events', 'Story variables'].includes(k)) {
                next[k] = incoming[k];
            }
        });
        return next;
    };

    // Determine target root
    let targetObj: any = null;
    let path = "";

    if (!key || typeof key !== 'string') return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };

    if (key.startsWith("gameState.Role") || key.startsWith("gameState.Nhân vật") || key.startsWith("gameState.character") || key.startsWith("gameState.Võ công") || key.startsWith("gameState.Túi đồ") || key.startsWith("gameState.Trang bị") || key.startsWith("gameState.Hành trang") || key.startsWith("gameState.itemList") || key.startsWith("gameState.equipment") || key.startsWith("gameState.kungfuList")) {
        targetObj = newChar;
        // Extract bracket index from prefix segment if present (e.g. "gameState.Túi đồ[0].Tên")
        const charPrefixMatch = key.match(/^gameState\.(Role|Nhân vật|character|Võ công|Túi đồ|Trang bị|Hành trang|itemList|equipment|kungfuList)(\[\d+\])?\.?(.*)/);
        const charBracket = charPrefixMatch?.[2] || '';
        path = charPrefixMatch?.[3] || '';
        if (key.startsWith("gameState.Võ công") || key.startsWith("gameState.kungfuList")) path = "kungfuList" + charBracket + (path ? "." + path : "");
        else if (key.startsWith("gameState.Túi đồ") || key.startsWith("gameState.Hành trang") || key.startsWith("gameState.itemList")) path = "itemList" + charBracket + (path ? "." + path : "");
        else if (key.startsWith("gameState.Trang bị") || key.startsWith("gameState.equipment")) path = "equipment" + (path ? "." + path : "");
        
        if (key === "gameState.Role" || key === "gameState.Nhân vật" || key === "gameState.character") {
            if (action === 'set') {
                newChar = translateObjectKeys(value);
                return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
            }
        }

    } else if (key.startsWith("gameState.Environment") || key.startsWith("gameState.environment") || key.startsWith("gameState.Môi trường") || key.startsWith("gameState.Bản đồ")) {
        targetObj = newEnv;
        path = key.replace(/^gameState\.(Environment|environment|Môi trường)\.?/, "");
        if (key.startsWith("gameState.Bản đồ")) {
            const mapSubPath = key.replace(/^gameState\.Bản đồ\.?/, "");
            path = mapSubPath || "mediumLocation";
        }
        if (!path && action === 'set') {
            newEnv = translateObjectKeys(value);
            return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
        }
    } else if (key.startsWith("gameState.Social") || key.startsWith("gameState.social") || key.startsWith("gameState.Xã hội") || key.startsWith("gameState.Đội nhóm") || key.startsWith("gameState.Giao tiếp")) {
        if (key === "gameState.Social" || key === "gameState.social" || key === "gameState.Xã hội" || key === "gameState.Đội nhóm" || key === "gameState.Giao tiếp") {
            if (action === 'set') {
                newSocial = Array.isArray(value) ? translateObjectKeys(value) : [];
                return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
            }
            if (action === 'push') {
                newSocial.push(translateObjectKeys(value));
                return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
            }
        }
        targetObj = { Social: newSocial };
        path = key.replace(/^gameState\.(Social|social|Xã hội|Đội nhóm|Giao tiếp)\.?/, "");
        if (key.startsWith("gameState.Social") || key.startsWith("gameState.social")) {
             path = key.replace(/^gameState\./, "");
        } else {
             path = key.replace(/^gameState\.(Xã hội|Đội nhóm|Giao tiếp)\.?/, "Social");
        }
    } else if (key.startsWith("gameState.World") || key.startsWith("gameState.world") || key.startsWith("gameState.Thế giới")) {
        targetObj = newWorld;
        path = key.replace(/^gameState\.(World|world|Thế giới)\.?/, "");
        if (!path && action === 'set') {
            newWorld = translateObjectKeys(value);
            return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
        }
    } else if (key.startsWith("gameState.Combat") || key.startsWith("gameState.battle") || key.startsWith("gameState.Chiến đấu")) {
        targetObj = newBattle;
        path = key.replace(/^gameState\.(Combat|battle|Chiến đấu)\.?/, "");
        if (!path && action === 'set') {
            newBattle = translateObjectKeys(value);
            return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
        }
    } else if (key.startsWith("gameState.Story") || key.startsWith("gameState.story") || key.startsWith("gameState.Cốt truyện")) {
        targetObj = newStory;
        path = key.replace(/^gameState\.(Story|story|Cốt truyện)\.?/, "");
        if (!path && action === 'set') {
            newStory = mergeStoryObjects(newStory, value);
            return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
        }
    } else if (key.startsWith("gameState.Danh sách nhiệm vụ") || key.startsWith("gameState.Nhiệm vụ") || key.startsWith("gameState.taskList")) {
        const isRootKey = key === "gameState.Danh sách nhiệm vụ" || key === "gameState.Nhiệm vụ" || key === "gameState.taskList";
        if (isRootKey) {
            if (action === 'set') {
                newTaskList = Array.isArray(value) ? translateObjectKeys(value) : newTaskList;
                return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
            }
            if (action === 'push') {
                newTaskList.push(translateObjectKeys(value));
                return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
            }
        }
        const taskSubPath = key.replace(/^gameState\.(Danh sách nhiệm vụ|Nhiệm vụ|taskList)\.?/, "");
        targetObj = { taskList: newTaskList };
        path = "taskList" + (taskSubPath ? "." + taskSubPath : "");
    } else if (key.startsWith("gameState.Danh sách hẹn ước") || key.startsWith("gameState.Hẹn ước") || key.startsWith("gameState.Hứa hẹn") || key.startsWith("gameState.appointmentList")) {
        const isRootKey = key === "gameState.Danh sách hẹn ước" || key === "gameState.Hẹn ước" || key === "gameState.Hứa hẹn" || key === "gameState.appointmentList";
        if (isRootKey) {
            if (action === 'set') {
                newAppointmentList = Array.isArray(value) ? translateObjectKeys(value) : newAppointmentList;
                return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
            }
            if (action === 'push') {
                newAppointmentList.push(translateObjectKeys(value));
                return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
            }
        }
        const apptSubPath = key.replace(/^gameState\.(Danh sách hẹn ước|Hẹn ước|Hứa hẹn|appointmentList)\.?/, "");
        targetObj = { appointmentList: newAppointmentList };
        path = "appointmentList" + (apptSubPath ? "." + apptSubPath : "");
    } else if (key.startsWith("gameState.Môn phái người chơi") || key.startsWith("gameState.playerSect")) {
        const isRootKey = key === "gameState.Môn phái người chơi" || key === "gameState.playerSect";
        if (isRootKey && action === 'set') {
            newPlayerSect = typeof value === 'object' && !Array.isArray(value) ? { ...newPlayerSect, ...translateObjectKeys(value) } : newPlayerSect;
            return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };
        }
        targetObj = newPlayerSect;
        path = key.replace(/^gameState\.(Môn phái người chơi|playerSect)\.?/, "");
    }

    if (!targetObj || (!path && action !== 'set')) return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };

    const parts = path.split('.').filter(p => p !== "").map(p => {
        let partName = p;
        let index: number | undefined = undefined;
        if (p.includes('[') && p.includes(']')) {
            partName = p.split('[')[0];
            index = parseInt(p.split('[')[1].replace(']', ''));
        }
        
        // Translate Vietnamese key if mapped
        if (VIETNAMESE_SUBKEY_MAP[partName] !== undefined) {
            partName = VIETNAMESE_SUBKEY_MAP[partName];
        }
        
        return { name: partName, index };
    }).filter(p => p.name !== ""); // Skip collapsed category segments
    
    // Body part flattening: combine head + CurrentHp -> headCurrentHp
    const BODY_PARTS = ['head', 'chest', 'abdomen', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
    if (parts.length >= 2 && BODY_PARTS.includes(parts[0].name)) {
        const part = parts[0].name;
        const sub = parts[1].name;
        if (sub === 'CurrentHp' || sub === 'currentHp') {
            parts.splice(0, 2, { name: part + 'CurrentHp', index: undefined });
        } else if (sub === 'MaxHp' || sub === 'maxHp') {
            parts.splice(0, 2, { name: part + 'MaxHp', index: undefined });
        } else if (sub === 'Status' || sub === 'status') {
            parts.splice(0, 2, { name: part + 'Status', index: undefined });
        }
    }

    if (parts.length === 0) return { char: newChar, env: newEnv, social: newSocial, world: newWorld, battle: newBattle, story: newStory, taskList: newTaskList, appointmentList: newAppointmentList, playerSect: newPlayerSect };

    let current = targetObj;
    
    // Iterate to find the parent of the target property
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        
        if (part.index !== undefined) {
             // Array access
             if (!current[part.name]) current[part.name] = [];
             if (!current[part.name][part.index]) current[part.name][part.index] = {};
             current = current[part.name][part.index];
        } else {
             // Object access
             if (!current[part.name]) current[part.name] = {};
             current = current[part.name];
        }
    }

    const lastPart = parts[parts.length - 1];
    const finalKey = lastPart.name;
    
    // Determine the object to modify
    let finalObj = current;

    if (lastPart.index !== undefined) {
        if (!Array.isArray(current[finalKey])) current[finalKey] = [];
        finalObj = current[finalKey];
    }

    const effectiveKey = (finalObj === newChar && finalKey === 'weight') ? 'currentWeight' : finalKey;

    if (action === 'set') {
        const translatedValue = translateObjectKeys(value);
        if (lastPart.index !== undefined) finalObj[lastPart.index] = translatedValue;
        else finalObj[effectiveKey] = translatedValue;
    } else if (action === 'add') {
        if (lastPart.index !== undefined) finalObj[lastPart.index] = (finalObj[lastPart.index] || 0) + Number(value);
        else finalObj[effectiveKey] = (finalObj[effectiveKey] || 0) + Number(value);
    } else if (action === 'sub') {
         if (lastPart.index !== undefined) finalObj[lastPart.index] = (finalObj[lastPart.index] || 0) - Number(value);
         else finalObj[effectiveKey] = (finalObj[effectiveKey] || 0) - Number(value);
    } else if (action === 'push') {
        let arrayToPush = (lastPart.index !== undefined) ? finalObj[lastPart.index] : finalObj[effectiveKey];
        if (!Array.isArray(arrayToPush)) {
            arrayToPush = [];
            if (lastPart.index !== undefined) finalObj[lastPart.index] = arrayToPush;
            else finalObj[effectiveKey] = arrayToPush;
        }
        
        const translatedValue = translateObjectKeys(value);
        if ((key.endsWith('.memories') || key.endsWith('.Ký ức') || finalKey === 'memories') && typeof translatedValue === 'object' && !translatedValue.time) {
             translatedValue.time = newEnv.time || `${newEnv.year || ''}:${String(newEnv.month || 0).padStart(2,'0')}:${String(newEnv.day || 0).padStart(2,'0')}:${String(newEnv.hour || 0).padStart(2,'0')}:00`; 
        }
        
        arrayToPush.push(translatedValue);
    } else if (action === 'delete') {
        if (lastPart.index !== undefined) {
            if (Array.isArray(finalObj) && lastPart.index >= 0 && lastPart.index < finalObj.length) {
                finalObj.splice(lastPart.index, 1);
            }
        } else if (finalObj && typeof finalObj === 'object' && effectiveKey in finalObj) {
            // Safeguard: Prevent deleting core stats
            const protectedKeys = ['strength', 'agility', 'constitution', 'rootBone', 'intelligence', 'luck', 'tamTinh'];
            if (finalObj === newChar && protectedKeys.includes(effectiveKey)) {
                console.warn(`Prevented deletion of core stat: ${effectiveKey}`);
            } else {
                delete finalObj[effectiveKey];
            }
        }
    }

    return {
        char: newChar,
        env: newEnv,
        social: Array.isArray((targetObj as any).Social) ? (targetObj as any).Social : newSocial,
        world: newWorld,
        battle: newBattle,
        story: newStory,
        taskList: newTaskList,
        appointmentList: newAppointmentList,
        playerSect: newPlayerSect
    };
};
