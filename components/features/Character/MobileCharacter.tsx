import React from 'react';
import { CharacterData } from '../../../types';

interface Props {
    character: CharacterData;
    onClose: () => void;
}

const VitalBar: React.FC<{ label: string; current: number; max: number; color: string }> = ({ label, current, max, color }) => {
    const pct = Math.min((current / (max || 1)) * 100, 100);
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-gray-500">
                <span>{label}</span>
                <span className="font-mono text-gray-300">{current}/{max}</span>
            </div>
            <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
};

const BodyRow: React.FC<{ name: string; current: number; max: number }> = ({ name, current, max }) => {
    const pct = Math.min((current / (max || 1)) * 100, 100);
    return (
        <div className="flex items-center gap-2">
            <span className="w-10 text-[10px] text-gray-400">{name}</span>
            <div className="flex-1 h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                <div className="h-full bg-wuxia-red" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-12 text-[10px] text-gray-500 font-mono text-right">{current}/{max}</span>
        </div>
    );
};

const MobileCharacter: React.FC<Props> = ({ character, onClose }) => {
    const Money = character.money || { gold: 0, silver: 0, copper: 0 };
    const attributes = [
        { key: 'Sức mạnh', val: character.strength, base: character.baseStats?.strength },
        { key: 'Thân pháp', val: character.agility, base: character.baseStats?.agility },
        { key: 'Thể chất', val: character.constitution, base: character.baseStats?.constitution },
        { key: 'Căn cốt', val: character.rootBone, base: character.baseStats?.rootBone },
        { key: 'Ngộ tính', val: character.intelligence, base: character.baseStats?.intelligence },
        { key: 'Phúc duyên', val: character.luck, base: character.baseStats?.luck },
        { key: 'Tâm tính', val: character.tamTinh, base: character.baseStats?.tamTinh },
    ];

    const bodyParts = [
        { name: 'Đầu', current: character.headCurrentHp, max: character.headMaxHp },
        { name: 'Ngực', current: character.chestCurrentHp, max: character.chestMaxHp },
        { name: 'Bụng', current: character.abdomenCurrentHp, max: character.abdomenMaxHp },
        { name: 'Tay trái', current: character.leftArmCurrentHp, max: character.leftArmMaxHp },
        { name: 'Tay phải', current: character.rightArmCurrentHp, max: character.rightArmMaxHp },
        { name: 'Chân trái', current: character.leftLegCurrentHp, max: character.leftLegMaxHp },
        { name: 'Chân phải', current: character.rightLegCurrentHp, max: character.rightLegMaxHp },
    ];

    const equipmentOrder: { key: keyof typeof character.equipment; label: string }[] = [
        { key: 'head', label: 'Đầu' },
        { key: 'chest', label: 'Thân' },
        { key: 'back', label: 'Lưng' },
        { key: 'waist', label: 'Thắt lưng' },
        { key: 'legs', label: 'Chân' },
        { key: 'feet', label: 'Bàn chân' },
        { key: 'hands', label: 'Hộ thủ' },
        { key: 'mainWeapon', label: 'Vũ khí chính' },
        { key: 'subWeapon', label: 'Vũ khí phụ' },
        { key: 'hiddenWeapon', label: 'Ám khí' },
        { key: 'mount', label: 'Tọa kỵ' },
    ];

    const getEquipName = (key: keyof typeof character.equipment) => {
        const idOrName = character.equipment[key];
        if (idOrName === 'None') return 'None';
        const item = character.itemList.find(i => i.ID === idOrName || i.Name === idOrName);
        return item ? item.Name : idOrName;
    };

    return (
        <div className="fixed inset-0 bg-black z-[200] flex items-center justify-center p-3 md:hidden animate-fadeIn"
            style={{ background: 'radial-gradient(circle at center, rgba(30,15,5,1) 0%, rgba(0,0,0,1) 100%)' }}>
            <div className="bg-ink-black border border-wuxia-gold/30 w-full max-w-[520px] h-[82vh] flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.95)] relative overflow-hidden rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(15,8,4,1) 0%, rgba(5,3,2,1) 100%)' }}>
                <div className="h-12 shrink-0 border-b border-ink-gray/60 bg-ink-gray/40 flex items-center justify-between px-4">
                    <h3 className="text-wuxia-gold font-serif font-bold text-base tracking-[0.3em]">Thuộc tính nhân vật</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-ink-black/50 border border-gray-700 text-gray-400 hover:text-wuxia-red hover:border-wuxia-red transition-all"
                        title="Đóng"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-ink-black/5">
                    <div className="bg-ink-gray/40 border border-ink-gray rounded-xl p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-xl text-wuxia-gold font-serif font-bold">{character.name}</div>
                                <div className="text-[11px] text-gray-400 mt-1">{character.title || 'No title'}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-gray-500">Cảnh giới</div>
                                <div className="text-wuxia-red font-bold text-sm">{character.realm}</div>
                            </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                            <span className="px-2 py-1 bg-ink-gray/40 border border-ink-gray rounded text-gray-300">Giới tính {character.gender}</span>
                            <span className="px-2 py-1 bg-ink-gray/40 border border-ink-gray rounded text-gray-300">Tuổi {character.age}</span>
                            <span className="px-2 py-1 bg-ink-gray/40 border border-ink-gray rounded text-gray-300 font-mono">Cân nặng {character.currentWeight}/{character.maxWeight}</span>
                            <span className="px-2 py-1 bg-ink-gray/40 border border-ink-gray rounded text-gray-300 font-mono">Vàng {Money.gold}</span>
                            <span className="px-2 py-1 bg-ink-gray/40 border border-ink-gray rounded text-gray-300 font-mono">Bạc {Money.silver}</span>
                            <span className="px-2 py-1 bg-ink-gray/40 border border-ink-gray rounded text-gray-300 font-mono">Đồng {Money.copper}</span>
                        </div>
                        {character.personality && (
                            <div className="mt-4 pt-3 border-t border-ink-gray/60 italic text-[11px] text-gray-400 leading-relaxed">
                                <span className="text-wuxia-gold/70 not-italic mr-2">Tính cách:</span>
                                {character.personality}
                            </div>
                        )}
                    </div>

                    <div className="bg-ink-gray/40 border border-ink-gray rounded-xl p-4">
                        <div className="text-[10px] text-wuxia-gold/70 tracking-[0.3em] mb-3">Lục đạo thuộc tính</div>
                        <div className="grid grid-cols-3 gap-2">
                            {attributes.map((attr) => (
                                <div key={attr.key} className="border border-gray-800 rounded-lg px-2 py-2 text-center hover:border-wuxia-gold/50 transition-colors">
                                    <div className="text-[9px] text-gray-500">{attr.key}</div>
                                    <div className="text-wuxia-gold font-mono font-bold text-sm">{attr.val}</div>
                                    {attr.base !== undefined && (
                                        <div className="text-[8px] text-gray-600 mt-1">Gốc: {attr.base}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-ink-gray/40 border border-ink-gray rounded-xl p-4 space-y-3">
                        <div className="text-[10px] text-wuxia-gold/70 tracking-[0.3em]">Trạng thái</div>
                        <VitalBar label="Năng lượng" current={character.currentEnergy} max={character.maxEnergy} color="bg-wuxia-cyan" />
                        <VitalBar label="No bụng" current={character.currentFullness} max={character.maxFullness} color="bg-wuxia-gold" />
                        <VitalBar label="Nước" current={character.currentThirst} max={character.maxThirst} color="bg-wuxia-cyan" />
                    </div>

                    <div className="bg-ink-gray/40 border border-ink-gray rounded-xl p-4 space-y-2">
                        <div className="text-[10px] text-wuxia-gold/70 tracking-[0.3em]">Cơ thể</div>
                        {bodyParts.map((part) => (
                            <BodyRow key={part.name} name={part.name} current={part.current} max={part.max} />
                        ))}
                    </div>

                    {character.playerBuffs && character.playerBuffs.length > 0 && (
                        <div className="bg-ink-gray/40 border border-ink-gray rounded-xl p-4">
                            <div className="text-[10px] text-wuxia-gold/70 tracking-[0.3em] mb-2">Trạng thái buff</div>
                            <div className="flex flex-wrap gap-2">
                                {character.playerBuffs.map((buff, i) => (
                                    <span key={i} className="text-[10px] px-2 py-1 border border-wuxia-cyan/30 text-wuxia-cyan bg-wuxia-cyan/5 rounded">
                                        {buff}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-ink-gray/40 border border-ink-gray rounded-xl p-4">
                        <div className="text-[10px] text-wuxia-gold/70 tracking-[0.3em] mb-2">Trang phục</div>
                        <div className="space-y-2">
                            {equipmentOrder.map((item) => (
                                <div key={item.key} className="flex justify-between text-[10px] border-b border-gray-800/60 pb-1 last:border-0">
                                    <span className="text-gray-500">{item.label}</span>
                                    <span className="text-gray-300 max-w-[180px] truncate text-right" title={getEquipName(item.key)}>
                                        {getEquipName(item.key)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileCharacter;

