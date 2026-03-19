import type { EquipmentSlot } from '../../models/item';

export const DefaultEnvironmentalData = {
    time: '',
    majorLocation: '',
    mediumLocation: '',
    minorLocation: '',
    specificLocation: '',
    festival: null,
    weather: { weather: '', endDate: '' },
    environmentalVariables: null,
    gameDays: 1
};

export const DefaultMoneyTemplate = {
    gold: 0,
    silver: 0,
    copper: 0
};

export const DefaultEquipmentTemplate = {
    head: null,
    chest: null,
    legs: null,
    hands: null,
    feet: null,
    mainWeapon: null,
    subWeapon: null,
    hiddenWeapon: null,
    back: null,
    waist: null,
    mount: null
};

export const EquipmentSlotList: EquipmentSlot[] = [
    'head', 'chest', 'legs', 'hands', 'feet', 'mainWeapon', 'subWeapon', 'hiddenWeapon', 'back', 'waist', 'mount'
];

export const EquipmentSlotSet = new Set<string>(EquipmentSlotList);

export const SlotIDFragmentMapping: Record<string, string> = {
    'head': 'head',
    'chest': 'chest',
    'legs': 'legs',
    'hands': 'hands',
    'feet': 'feet',
    'mainWeapon': 'main_weapon',
    'subWeapon': 'sub_weapon',
    'hiddenWeapon': 'hidden_weapon',
    'back': 'back',
    'waist': 'waist',
    'mount': 'mount'
};
