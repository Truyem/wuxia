import { PromptStructure } from '../../types';

export const coreDataFormat: PromptStructure = {
  id: 'core_data',
  title: 'Data Format Definition',
  content: `
<Data structure definition>
# 【Data Structure Definition】WuXia SaveData (V3.0 English Structural)

> Objective: Define the "executable and complete" state tree of this project. AI MUST strictly follow this definition when creating \`tavern_commands\`.
> Principle: Check path first, then match fields, finally check type and constraints.
> Iron Rule of Time: All "structural time strings" are unified to \`YYYY:MM:DD:HH:MM\` (e.g., \`317:03:16:09:45\`).
> Mandatory Case: \`gameState.Environment.time\` must be a standard timestamp; \`gameState.Environment.dayCount\` only represents "which day" (1, 2, 3...).

## 0. Platinum Path Rules (CRITICAL)
1. Use ONLY the following Convenience Paths for optimal UI/Performance:
   - \`gameState.Character\` (Main profile, attributes, survival)
   - \`gameState.Inventory\` (All baggage, items, equipment in bag)
   - \`gameState.Kungfu\` (All manuals, moves, internal kungfu)
   - \`gameState.Equipment\` (Currently equipped slots)
   - \`gameState.Battle\` (Current battle status and enemies)
   - \`gameState.Environment\` (Time, location, weather)
   - \`gameState.Social\` (Social NPC list, favorability, memories)
   - \`gameState.World\` (Major events, rumors, global NPCs)
   - \`gameState.Map\` (Coordinate info, buildings, areas)
   - \`gameState.Story\` (Chapters, foreshadowing, story variables)
   - \`gameState.Tasks\` (Active mission list)
   - \`gameState.Appointments\` (Scheduled meetings/promises)

## 1. Character Structure (gameState.Character)
- \`name\`, \`gender\`, \`age\`, \`birthday\`, \`appearance\`, \`personality\`, \`title\`, \`realm\`
- \`avatar\`: String (Path to character image, e.g.: \`\`)
- \`currentExp\`, \`nextLevelExp\`
- \`currentEnergy\`, \`maxEnergy\`
- \`currentFullness\`, \`maxFullness\`, \`currentThirst\`, \`maxThirst\`
- \`currentWeight\`, \`maxWeight\`
-        "money": { "gold": "number", "silver": "number", "copper": "number" },
- \`strength\`, \`agility\`, \`constitution\`, \`rootBone\`, \`intelligence\`, \`luck\`
- \`bodyHp\`: { \`head\`, \`chest\`, \`abdomen\`, \`leftArm\`, \`rightArm\`, \`leftLeg\`, \`rightLeg\` }
  - Each part contains: \`currentHp\`, \`maxHp\`, \`status\`

## 2. Inventory Structure (gameState.Inventory) - Array of Items
- Each item: \`id\`, \`name\`, \`description\`, \`type\`, \`quality\`, \`weight\`, \`spaceOccupied\`, \`value\`, \`currentDurability\`, \`maxDurability\`
- Weapon Extension: \`minAttack\`, \`maxAttack\`, \`parryRate\`
- Defense Extension: \`physicalDefense\`, \`internalDefense\`
- \`containerId\`: ID of the bag/chest containing this item.
- Containers (Type=\`Container\` or \`Armor\` with storage): use \`containerProperties\` field with structure \`{maxCapacity, currentUsedSpace, maxSingleItemSize, weightReductionRate}\`.

## 3. Kungfu Structure (gameState.Kungfu) - Array of Techniques
- \`id\`, \`name\`, \`description\`, \`type\`, \`quality\`, \`origin\`
- \`currentLevel\`, \`maxLevel\`, \`currentMastery\`, \`expToNextLevel\`
- \`consumeType\`, \`consumeValue\`, \`baseDamage\`

## 4. Equipment Structure (gameState.Equipment)
- \`mainWeapon\`, \`subWeapon\`, \`head\`, \`chest\`, \`hand\`, \`leg\`, \`waist\`, \`back\`, \`mount\`
- Value is String (Item Name) or ID.

## 5. Social & Party Structure (gameState.Social)
- \`id\`, \`name\`, \`gender\`, \`age\`, \`realm\`, \`identity\`
- \`favorability\`, \`relationStatus\`, \`introduction\`, \`memories\` (Array of {content, time})
- \`isPresent\`: Boolean
- \`isTeammate\`: Boolean
- Party only: \`currentHp\`, \`maxHp\`, \`currentEnergy\`, \`attack\`, \`defense\`

## 6. Environment Structure (gameState.Environment)
- \`time\`: \`YYYY:MM:DD:HH:MM\`
- \`gameDays\`: Number
- \`majorLocation\`, \`mediumLocation\`, \`minorLocation\`, \`specificLocation\`
- \`weather\`: { \`type\`, \`intensity\`, \`description\`, \`endDate\` }

## 7. Map & World Structure (gameState.Map / gameState.World)
- \`gameState.Map\` (Convenience for current coordinate/areas): \`coordinate\`, \`name\`, \`description\`
- \`gameState.World.maps\`: Array of { \`id\`, \`name\`, \`coordinate\`, \`description\`, \`avatar\`, \`affiliation\`, \`internalBuildings\` }
- \`activeNpcList\`: Array of global NPCs status.
- \`ongoingEvents\`: Array of { \`id\`, \`type\`, \`title\`, \`content\`, \`location\`, \`startTime\`, \`estimatedEndTime\`, \`currentStatus\` }
- \`settledEvents\`, \`worldHistory\`: Arrays of past events.

## 8. Battle Structure (gameState.Battle)
- \`isInBattle\`: Boolean
- \`enemy\`: { \`name\`, \`currentHp\`, \`maxHp\`, \`attack\`, \`defense\` } | null

## 9. Story Structure (gameState.Story)
- \`currentChapter\`: { \`id\`, \`index\`, \`title\`, \`outline\`, \`backgroundStory\`, \`mainConflict\`, \`endConditions\`, \`foreshadowingList\` }
- \`nextChapterPreview\`: { \`title\`, \`outline\` }
- \`historicalArchives\`: Array of past chapters.
- \`shortTermPlanning\`, \`mediumTermPlanning\`, \`longTermPlanning\`: Thinking/Planning fields.
- \`pendingEvents\`: Future events to trigger.
- \`storyVariables\`: Map of variables.

## 10. Tasks Structure (gameState.Tasks) - Array of Active Missions
- Each task: { \`title\`, \`description\`, \`type\`, \`issuer\`, \`location\`, \`recommendedRealm\`, \`deadline\`, \`currentStatus\`, \`goalList\`, \`rewardDescription\` }
- \`goalList\`: Array of { \`description\`, \`currentProgress\`, \`totalRequired\`, \`isCompleted\` }

## 11. Appointments Structure (gameState.Appointments) - Array of Scheduled Promises
- Each appointment: { \`target\`, \`nature\`, \`title\`, \`oathContent\`, \`location\`, \`time\`, \`validDuration\`, \`currentStatus\`, \`fulfillmentConsequence\`, \`failureConsequence\` }
- \`nature\`: 'Tình cảm' | 'Giao dịch' | 'Cá cược' | 'Báo thù' | 'Cam kết'

# 【Command Constraints】
1. **Creation**: \`PUSH path = {object}\` (Used for Social, Inventory, Kungfu).
2. **Modification**: \`SET path = value\` or \`ADD path = value\`.
3. **Deletion**: \`DEL path\`.
4. **Consistency**: Any changes in \`logs\` (Main Body) MUST be reflected via \`<Command>\`.

</Data structure definition>
`,
  type: 'core setting',
  enabled: true
};
