export interface BattleEnemyInfo {
    name: string;
    realm: string;
    description: string;
    skills: string[];
    combatPower: number;
    defense: number;
    currentHp: number;
    maxHp: number;
    currentEnergy: number;
    maxEnergy: number;
}

export interface BattleStatus {
    isInBattle: boolean;
    enemy: BattleEnemyInfo | null;
}
