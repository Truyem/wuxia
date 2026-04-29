import { PromptStructure } from '../../types';

export const coreDataFormat: PromptStructure = {
  id: 'core_data',
  title: 'Data Format',
  content: `
<DATA STRUCTURE>
# GAME STATE PATHS
gameState.Character: {id, name, gender, age, realm, karma, money}
gameState.Inventory: []
gameState.Kungfu: []
gameState.Equipment: {head, chest, legs, hands, feet, mainWeapon, subWeapon, hiddenWeapon, back, waist, mount}
gameState.Combat: {enemies:[], currentAction:{type, target, damage}}
gameState.Environment: {time, majorLocation, specificLocation, biomeId, x, y}
gameState.Social: []
gameState.Team: []
gameState.World: {activeNpcList, ongoingEvents}
gameState.Map: {coordinate}
gameState.Story: {chapters}
gameState.TaskList: []
gameState.AppointmentList: []
gameState.PlayerSect: {id, name, sectFunds}
`.trim(),
  type: 'core',
  enabled: true
};