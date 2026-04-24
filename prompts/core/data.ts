import { PromptStructure } from '../../types';

export const coreDataFormat: PromptStructure = {
  id: 'core_data',
  title: 'Data Format Definition',
  content: `
<Data structure definition>
# 【Data Structure Definition】WuXia SaveData (V3.0 English Structural)

> Objective: Define the "executable and complete" state tree of this project. AI MUST strictly follow this definition when creating \`tavern_commands\`.
> Principle: Check path first, then match fields, finally check type and constraints.

## 0. Platinum Path Rules (CRITICAL)
- \`gameState.Character\`: { \`id\`, \`name\`, \`gender\`, \`age\`, \`realm\`, \`karma\` }
- \`gameState.Inventory\` (All baggage, items, equipment in bag)
- \`gameState.Kungfu\` (All manuals, moves, internal kungfu)
- \`gameState.Equipment\` (Currently equipped slots)
- \`gameState.Combat\` (Current battle status and enemies)
- \`gameState.Environment\` (Time, location, weather, progress)
- \`gameState.Social\` (Social NPC list, favorability, memories)
- \`gameState.Team\` (Teammates/Followers list)
- \`gameState.World\` (Major events, rumors, global NPCs)
- \`gameState.Map\` (Coordinate info, buildings, areas)
- \`gameState.Story\` (Chapters, foreshadowing, story variables)
- \`gameState.PlayerSect\`: Môn phái của người chơi
- \`gameState.TaskList\`: Danh sách nhiệm vụ
- \`gameState.AppointmentList\` (Scheduled meetings/promises)

## 1. PlayerSect Structure (Môn phái)
- \`id\`: string (VD: "vo_hinh_tong")
- \`name\`: string (VD: "Vô Hình Tông")
- \`description\`: string
- \`sectRules\`: string[]
- \`sectFunds\`: number (Ngân quỹ)
- \`sectResources\`: number (Tài nguyên)
- \`constructionLevel\`: number (0-100%)
- \`playerPosition\`: string (VD: "Đệ tử ngoại môn")
- \`playerContribution\`: number (Điểm cống hiến)
- \`taskList\`: SectTask[]
- \`exchangeList\`: SectGoods[]
- \`importantMembers\`: SectMember[]

### SectTask Structure
- \`id\`, \`title\`, \`description\`, \`type\`: "Hàng ngày" | "Treo thưởng" | "Xây dựng" | "Rèn luyện"
- \`difficulty\`: number (1-5 sao)
- \`releaseDate\`, \`deadline\`, \`refreshDate\`: YYYY:MM:DD:HH:MM
- \`rewardContribution\`, \`rewardFunds\`, \`rewardItems\`: string[]
- \`currentStatus\`: "Có thể tiếp nhận" | "Đang thực hiện" | "Đã hoàn thành" | "Thất bại" | "Đã quá hạn"

### SectGoods Structure
- \`id\`, \`itemName\`, \`type\`: "Võ học" | "Đan dược" | "Trang bị" | "Nguyên liệu"
- \`exchangePrice\`, \`stock\`: number
- \`requiredPosition\`: string

### SectMember Structure
- \`id\`, \`name\`, \`gender\`, \`age\`, \`realm\`, \`identity\`, \`brief\`: string

## 2. TaskList Structure (Nhiệm vụ)
- \`title\`: string
- \`description\`: string
- \`type\`: "Chính tuyến" | "Nhánh" | "Môn phái" | "Kỳ ngộ"
- \`issuer\`: string (Người giao nhiệm vụ)
- \`location\`: string (Địa điểm)
- \`recommendedRealm\`: string
- \`deadline\`: string (YYYY:MM:DD:HH:MM)
- \`currentStatus\`: "Chưa nhận" | "Đang thực hiện" | "Có thể nộp" | "Đã hoàn thành"
- \`goalList\`: Array<{ description, currentProgress, totalRequired, isCompleted }>
- \`rewardDescription\`: string[]

## 3. Item Structure (Inventory/Túi đồ)
- \`id\`, \`name\`, \`description\`, \`type\`: "Vũ khí" | "Phòng cụ" | "Nội dung" | "Tiêu hao" | "Nguyên liệu" | "Bí kíp" | "Tạp vật" | "Vật chứa"
- \`quality\`: "Phàm phẩm" | "Lương phẩm" | "Thượng phẩm" | "Cực phẩm" | "Tuyệt thế" | "Truyền thuyết"
- \`weight\`, \`spaceOccupied\`, \`value\`: number
- \`currentDurability\`, \`maxDurability\`: number
- \`attributes\`: Array<{ name, property, value, type }>
- \`currentContainerId\`: string | null (ID của túi/chứa đựng)
- \`currentEquipSlot\`: string | null (VD: "chest", "legs", "mainWeapon")
- \`containerProperties\`: { maxCapacity, currentUsedSpace, maxSingleItemSize, weightReductionRatio }

## 4. Kungfu Structure (Võ công)
- \`id\`, \`name\`, \`description\`, \`type\`: "Nội công" | "Ngoại công" | "Khinh công" | "Tuyệt kỹ" | "Bị động"
- \`quality\`: "Phàm phẩm" | "Lương phẩm" | "Thượng phẩm" | "Cực phẩm" | "Tuyệt thế" | "Truyền thuyết"
- \`source\`: string (Môn phái/nơi học)
- \`currentLevel\`, \`maxLevel\`: number
- \`currentProficiency\`, \`proficiencyToNextLevel\`: number
- \`breakthroughRequirement\`: string
- \`realmLimit\`: string
- \`weaponLimit\`: string[]
- \`consumeType\`, \`consumeValue\`: string, number
- \`castTime\`, \`cooldown\`: number (giây)
- \`baseDamage\`, \`bonusAttribute\`, \`bonusCoefficient\`: number
- \`damageType\`: "Vật lý" | "Nội công" | "Thực" | "Hỗn hợp"
- \`targetType\`: "Đơn mục tiêu" | "Toàn thể" | "Hình quạt" | "Bản thân"
- \`secondaryEffects\`: Array<{ code, name, triggerChance, duration, valueParam }>
- \`passiveMods\`: Array<{ propertyName, value, type }>
- \`realmSpecial\`: Array<{ unlockLevel, description }>

## 5. NPC Structure (Social/Team)
- \`id\` (BẮT BUỘC: \`snake_case\`, không dấu, permanent), \`name\`, \`gender\`, \`age\`, \`identity\`, \`realm\`
- \`appearance\`: Visual description (Mandatory for key NPCs)
- \`corePersonalityTraits\`: Personality description (Mandatory for accurate roleplay)
- \`favorability\`: Number (Interpersonal point)
- \`relationStatus\`: String (Stranger, Friend, Lover, Enemy, etc.)
- \`memories\`: Array of {content, time}
- \`socialNetworkVariables\`: Array of {targetName, relation, note}
- \`isPresent\`: Boolean (True if NPC is in current scene)
- \`isTeammate\`: Boolean

## 6. Environment Structure
- \`time\`: \`YYYY:MM:DD:HH:MM\`
- \`gameDays\`: Number (Total days passed)
- \`majorLocation\`, \`mediumLocation\`, \`minorLocation\`, \`specificLocation\`
- \`x\`, \`y\`: Number (Global Coordinates 0-3000)
- \`biomeId\`, \`regionId\`: String (Permanent identifiers)
- \`weather\`: { \`type\`, \`description\`, \`endDate\` }
- \`karma\`: Number (World karma value)
- \`level_3_nodes\`: Array of {
              id: string,
              name: string,
              type: "Thành trì" | "Tông môn" | "Bí cảnh" | "Thôn trang" | "Di tích" | "Hang động" | "Rừng rậm",
              faction: string,
              description: string,
              x: number (0-3000),
              y: number (0-3000),
              possibleOrigins: string[],
              typicalPersonalities: string[]
            }
- \`worldTick\`: Number (Global world progression tick)

## 7. Combat Structure
- \`isInBattle\`: Boolean
- \`enemy\`: { \`id\`, \`name\`, \`currentHp\`, \`maxHp\`, \`attack\`, \`defense\` } | null

## 8. Tavern Commands Reference (SET/ADD/PUSH/DELETE)

### Inventory (Túi đồ)
- SET key="gameState.Inventory[id]" value={itemObject}
- SET key="gameState.Inventory" value=[{item1}, {item2}]
- SET key="gameState.Inventory[KF001].currentDurability" value=50
- SET key="gameState.Inventory[KF001].currentContainerId" value="backpack"
- DELETE key="gameState.Inventory[ITM001]"

### Kungfu (Võ công)
- SET key="gameState.Kungfu[id]" value={kungfuObject}
- SET key="gameState.Kungfu" value=[{kungfu1}, {kungfu2}]
- SET key="gameState.Kungfu[KC001].currentLevel" value=2
- SET key="gameState.Kungfu[KC001].currentProficiency" value=1500
- DELETE key="gameState.Kungfu[KC001]"

### PlayerSect (Môn phái)
- SET key="gameState.PlayerSect" value={sectObject}
- SET key="gameState.PlayerSect.sectFunds" value=5000
- SET key="gameState.PlayerSect.sectResources" value=100
- SET key="gameState.PlayerSect.constructionLevel" value=50
- SET key="gameState.PlayerSect.playerPosition" value="Đệ tử nội môn"
- SET key="gameState.PlayerSect.playerContribution" value=500
- SET key="gameState.PlayerSect.taskList[0].currentStatus" value="Đang thực hiện"
- SET key="gameState.PlayerSect.taskList" value=[{task1}, {task2}]
- SET key="gameState.PlayerSect.exchangeList[0].stock" value=10
- PUSH key="gameState.PlayerSect.taskList" value={newTask}
- DELETE key="gameState.PlayerSect.taskList[0]"
- DELETE key="gameState.PlayerSect.exchangeList[0]"

### TaskList (Nhiệm vụ)
- SET key="gameState.TaskList[id]" value={taskObject}
- SET key="gameState.TaskList[0].currentStatus" value="Đang thực hiện"
- SET key="gameState.TaskList[0].goalList[0].currentProgress" value=3
- SET key="gameState.TaskList[0].goalList[0].isCompleted" value=true
- SET key="gameState.TaskList" value=[{task1}, {task2}]
- PUSH key="gameState.TaskList" value={newTask}
- DELETE key="gameState.TaskList[TSK001]"

</Data structure definition>
`.trim(),
  type: 'core setting',
  enabled: true
};
