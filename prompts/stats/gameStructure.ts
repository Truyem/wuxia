import { PromptStructure } from '../../types';

export const GameStructurePrompt: PromptStructure = {
  id: 'game_structure',
  title: 'Cấu trúc Game',
  content: `
<CẤU TRÚC GAME WORLD>
# BIOME > REGION > NODE (3 cấp)
Biome IDs: huyet_hai, cot_lam, u_minh_vuc, phan_thien_sa_mac, loi_phat_nguyen, doc_chuong_trach, van_tinh_coc, bang_phong_cuc_dia, ao_canh_than_lau, van_kiem_truong, hu_moc_lam, tang_long_son, hu_khong_dao, huyet_nguyet_canh, luu_sa_ha, nghiep_hoa_luyen_nguc, thi_mang_lam, thien_long_canh, long_dao_hai, cuu_trung_du_chen, ngoc_linh_son, thanh_ac, thieu_moc_lien, am_duong_du_chen, am_tinh_cung, hoang_quy_son, long_vuc, bac_giang_truong, thuyet_nhan_giang, hoa_cuc_dai_than, kim_lon_dai_hiep
NODE: {id, name, type: "Bí cảnh"|"Tông môn"|"Thị trấn"|"Di tích"|"Thôn trang"|"Khu vực cấm kỵ", faction, x, y}
# CHARACTER STATE
{id, name, gender, age, realm, sectId, sectPosition, sectContribution, karma, money: gold, health, energy, experience}
# EQUIPMENT
{head, chest, legs, hands, feet, mainWeapon, subWeapon, hiddenWeapon, back, waist, mount}
# COMBAT
{enemies: [], currentAction: {type, target, damage}}
# ENVIRONMENT  
{gameDays, Year/Month/Day/HH/MM, weather, festival: {name, effect}, majorLocation, mediumLocation, minorLocation, specificLocation, x, y: 0-3000, biomeId, regionId, nearbyNodes: [], karma, worldTick}
# TIME FORMAT: YYYY:MM:DD:HH:MM
# VALID PATHS
gameState.Character, gameState.Equipment, gameState.Inventory[], gameState.Kungfu[], gameState.Combat, gameState.Environment, gameState.Social[], gameState.Team[], gameState.World{activeNpcList, ongoingEvents, visitedNodeIds}, gameState.Map{coordinate}, gameState.Story, gameState.TaskList[], gameState.AppointmentList[], gameState.PlayerSect{id, name, sectFunds, constructionLevel}
# COMMANDS
SET key="path" value, PUSH key value, DELETE key, ADD key value
# TASK
{id, title, currentStatus: "Chưa bắt đầu"|"Đang thực hiện"|"Đã hoàn thành", goalList[], rewardList}
# APPOINTMENT
{Title, Object, Nature: "Tình cảm"|"Báo thù"|"Giao dịch"|"Cá cược"|"Cam kết", Status, Participants[], Location, Time, Content, Consequences}
# WORLD EVENT
{id, type: "Thiên tai"|"Chiến tranh"|"Kỳ ngộ"|"Tin đồn"|"Quyết đấu"|"Hệ thống", title, content, location, startTime, currentStatus: "Đang diễn ra"|"Đã kết thúc", isMajorEvent}
# NPC
{id, name, affiliation, realm, currentLocation, status, actionDescription, heldTreasures[]}
`.trim(),
  type: 'world',
  enabled: true
};