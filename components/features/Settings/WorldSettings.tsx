
import React, { useState } from 'react';
import { FestivalStructure } from '../../../types';
import GameButton from '../../ui/GameButton';
import ParallelogramSaveButton from '../../ui/ParallelogramSaveButton';

interface Props {
    festivals: FestivalStructure[];
    onUpdate: (festivals: FestivalStructure[]) => void;
    requestConfirm?: (options: { title?: string; message: string; confirmText?: string; cancelText?: string; danger?: boolean }) => Promise<boolean>;
}

const WorldSettings: React.FC<Props> = ({ festivals, onUpdate, requestConfirm }) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<FestivalStructure | null>(null);
    const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const pushNotice = (type: 'success' | 'error', text: string) => {
        setNotice({ type, text });
        window.setTimeout(() => setNotice(null), 2200);
    };

    const handleEdit = (festival: FestivalStructure) => {
        setEditingId(festival.id);
        setEditForm({ ...festival });
    };

    const handleSave = () => {
        if (!editForm) return;

        // Validation
        if (editForm.month < 1 || editForm.month > 12) {
            pushNotice('error', 'Tháng phải từ 1 đến 12');
            return;
        }
        if (editForm.day < 1 || editForm.day > 30) {
            pushNotice('error', 'Ngày phải từ 1 đến 30');
            return;
        }

        const newList = festivals.map(f => f.id === editForm.id ? editForm : f);
        if (!festivals.find(f => f.id === editForm.id)) {
            newList.push(editForm);
        }

        // Sort by date
        newList.sort((a, b) => (a.month * 30 + a.day) - (b.month * 30 + b.day));

        onUpdate(newList);
        setEditingId(null);
        setEditForm(null);
        pushNotice('success', 'Đã lưu cài đặt ngày lễ');
    };

    const handleDelete = async (id: string) => {
        const ok = requestConfirm
            ? await requestConfirm({ title: 'Xóa ngày lễ', message: 'Bạn có chắc muốn xóa ngày lễ này không?', confirmText: 'Xóa', danger: true })
            : true;
        if (!ok) return;
        onUpdate(festivals.filter(f => f.id !== id));
    };

    const handleAddNew = () => {
        const newFestival: FestivalStructure = {
            id: Date.now().toString(),
            name: 'Ngày lễ mới',
            month: 1,
            day: 1,
            description: 'Mô tả ngày lễ...',
            effect: 'Không có hiệu ứng đặc biệt'
        };
        setEditForm(newFestival);
        setEditingId(newFestival.id);
    };

    if (editingId && editForm) {
        return (
            <div className="space-y-4 p-5 bg-ink-black/20 border border-wuxia-gold/30 backdrop-blur-sm animate-fadeIn">
                <h3 className="text-wuxia-gold font-serif font-bold mb-2">Chỉnh sửa ngày lễ</h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs text-paper-white/50">Tên ngày lễ</label>
                        <input
                            className="w-full bg-ink-black/20 border border-wuxia-gold/20 p-2 text-paper-white focus:border-wuxia-gold outline-none rounded"
                            value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="space-y-1 flex-1">
                            <label className="text-xs text-paper-white/50">Tháng</label>
                            <input
                                type="number" min="1" max="12"
                                className="w-full bg-white/5 border border-wuxia-gold/20 p-2 text-wuxia-gold font-mono focus:border-wuxia-gold outline-none rounded"
                                value={editForm.month}
                                onChange={e => setEditForm({ ...editForm, month: parseInt(e.target.value) || 1 })}
                            />
                        </div>
                        <div className="space-y-1 flex-1">
                            <label className="text-xs text-paper-white/50">Ngày</label>
                            <input
                                type="number" min="1" max="30"
                                className="w-full bg-white/5 border border-wuxia-gold/20 p-2 text-wuxia-gold font-mono focus:border-wuxia-gold outline-none rounded"
                                value={editForm.day}
                                onChange={e => setEditForm({ ...editForm, day: parseInt(e.target.value) || 1 })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-paper-white/50">Mô tả ngày lễ</label>
                    <textarea
                        className="w-full h-20 bg-ink-black/20 border border-wuxia-gold/20 p-2 text-xs text-paper-white/70 focus:border-wuxia-gold outline-none custom-scrollbar resize-none rounded"
                        value={editForm.description}
                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-paper-white/50">Hiệu ứng đặc biệt (chỉ ghi chú)</label>
                    <input
                        className="w-full bg-white/5 border border-wuxia-gold/20 p-2 text-xs text-wuxia-red/80 focus:border-wuxia-red outline-none rounded"
                        value={editForm.effect}
                        onChange={e => setEditForm({ ...editForm, effect: e.target.value })}
                        placeholder="Ví dụ: Quái vật đặc biệt xuất hiện, hoặc NPC thay đổi lời thoại"
                    />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                    <GameButton onClick={() => { setEditingId(null); setEditForm(null); }} variant="secondary" className="px-4 py-2 text-xs">Hủy</GameButton>
                    <GameButton onClick={handleSave} variant="primary" className="px-4 py-2 text-xs">Lưu</GameButton>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fadeIn pb-10">
            {notice && (
                <div className={`text-xs px-3 py-2 border rounded ${notice.type === 'success'
                        ? 'border-wuxia-gold/40 bg-wuxia-gold/10 text-wuxia-gold'
                        : 'border-wuxia-red/40 bg-wuxia-red/10 text-wuxia-red'
                    }`}>
                    {notice.text}
                </div>
            )}
            <div className="flex justify-between items-end border-b border-wuxia-gold/30 pb-4">
                <div className="space-y-1">
                    <h3 className="text-wuxia-gold font-sans font-black text-2xl tracking-tighter">Ngày lễ Việt Nam</h3>
                    <p className="text-[10px] text-paper-white/40 tracking-[0.3em] font-bold uppercase pl-1 text-shadow-gold">World Settings</p>
                </div>
                <GameButton onClick={handleAddNew} variant="primary" className="text-xs px-3 py-2">Thêm ngày lễ</GameButton>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                {festivals.map(f => (
                    <div key={f.id} className="relative bg-ink-black/20 border border-wuxia-gold/20 p-4 hover:border-wuxia-gold/30 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <span className="text-wuxia-gold font-bold font-serif text-lg">{f.name}</span>
                                <span className="text-xs font-mono bg-wuxia-gold/10 text-wuxia-gold px-2 py-0.5 rounded border border-wuxia-gold/20">
                                    Tháng {f.month} Ngày {f.day}
                                </span>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(f)} className="text-xs text-wuxia-gold hover:underline">Sửa</button>
                                <button onClick={() => handleDelete(f.id)} className="text-xs text-wuxia-red hover:underline">Xóa</button>
                            </div>
                        </div>

                        <p className="text-xs text-paper-white/60 mb-2 leading-relaxed">{f.description}</p>

                        {f.effect && f.effect !== 'Không có' && (
                            <div className="text-[10px] text-wuxia-red/70 flex items-center gap-1 mt-2 border-t border-paper-white/10 pt-2">
                                <span className="font-bold tracking-wider">Hiệu ứng:</span>
                                <span>{f.effect}</span>
                            </div>
                        )}
                    </div>
                ))}

                {festivals.length === 0 && (
                    <div className="text-center text-paper-white/30 py-10 font-serif">
                        Chưa có ngày lễ nào, thế giới đang yên tĩnh.
                    </div>
                )}
            </div>

            <p className="text-[10px] text-paper-white/40 italic mt-4">
                * Các ngày lễ đã thiết lập sẽ tự động đồng bộ lên thanh trạng thái phía trên dựa theo ngày trong game.
            </p>

            <div className="pt-4 sticky bottom-0 bg-ink-black/80 backdrop-blur-md pb-4 z-20">
                <ParallelogramSaveButton
                    onClick={() => onUpdate(festivals)}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default WorldSettings;

