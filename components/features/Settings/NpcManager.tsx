import React from 'react';
import type { NpcStructure, NpcMemory, MemoryConfig } from '../../../types';

interface Props {
    socialList: NpcStructure[];
    memoryConfig?: MemoryConfig;
    onStartNpcMemorySummary?: (npcId: string) => void;
    onCreateNpc: (seed?: Partial<NpcStructure>) => NpcStructure | void;
    onSaveNpc: (npcId: string, npc: NpcStructure) => void;
    onDeleteNpc: (npcId: string) => void;
}

const cardStyle = 'rounded-2xl border border-gray-800/80 bg-black/25 p-4 md:p-5';
const inputStyle = 'w-full rounded-xl border border-gray-700/80 bg-black/40 px-3 py-2 text-sm text-gray-200 outline-none transition-colors focus:border-wuxia-gold/50';
const labelStyle = 'text-xs tracking-[0.22em] text-gray-500';
const secondaryButtonStyle = 'rounded-lg border border-gray-700/80 px-3 py-2 text-xs text-gray-300 transition-colors hover:border-wuxia-gold/40 hover:text-wuxia-gold';
const primaryButtonStyle = 'rounded-lg border border-wuxia-gold/50 bg-wuxia-gold/10 px-3 py-2 text-xs text-wuxia-gold transition-colors hover:bg-wuxia-gold/20';

const parseJSON = <T,>(text: string, fallback: T): T => {
    try {
        return JSON.parse(text) as T;
    } catch {
        return fallback;
    }
};

const NpcManager: React.FC<Props> = ({
    socialList,
    memoryConfig,
    onStartNpcMemorySummary,
    onCreateNpc,
    onSaveNpc,
    onDeleteNpc
}) => {
    const [selectedNpcId, setSelectedNpcId] = React.useState('');
    const [draftText, setDraftText] = React.useState('');
    const [memoryDraftList, setMemoryDraftList] = React.useState<NpcMemory[]>([]);
    const [collapsedMemoryIndexes, setCollapsedMemoryIndexes] = React.useState<number[]>([]);
    const [error, setError] = React.useState('');
    
    const list = React.useMemo(() => Array.isArray(socialList) ? socialList : [], [socialList]);
    const selectedNpc = React.useMemo(
        () => list.find((npc) => npc?.id === selectedNpcId) || list[0] || null,
        [list, selectedNpcId]
    );

    React.useEffect(() => {
        if (!selectedNpc && selectedNpcId) {
            setSelectedNpcId('');
            return;
        }
        if (!selectedNpc && list[0]?.id) {
            setSelectedNpcId(list[0].id);
        }
    }, [list, selectedNpc, selectedNpcId]);

    React.useEffect(() => {
        if (!selectedNpc) {
            setDraftText('');
            setMemoryDraftList([]);
            return;
        }
        const restNpc = { ...selectedNpc } as Partial<NpcStructure>;
        delete (restNpc as any).memories;
        setDraftText(JSON.stringify(restNpc, null, 2));
        setMemoryDraftList(Array.isArray(selectedNpc.memories) ? selectedNpc.memories : []);
        setCollapsedMemoryIndexes(Array.isArray(selectedNpc.memories) ? selectedNpc.memories.map((_, index) => index) : []);
        setError('');
    }, [selectedNpc]);

    const updateDraftField = (field: string, value: unknown) => {
        const parsed = parseJSON<Record<string, unknown>>(draftText, selectedNpc ? { ...selectedNpc } as Record<string, unknown> : {});
        parsed[field] = value;
        setDraftText(JSON.stringify(parsed, null, 2));
    };

    const handleCreateNpc = () => {
        const created = onCreateNpc({
            name: `NPC mới ${list.length + 1}`,
            identity: 'Cần chỉnh sửa',
            description: ''
        });
        if (created && typeof created === 'object' && 'id' in created && typeof created.id === 'string' && created.id) {
            setSelectedNpcId(created.id);
        }
    };

    const handleSave = () => {
        if (!selectedNpc?.id) return;
        try {
            const parsedNpc = JSON.parse(draftText) as NpcStructure;
            parsedNpc.id = selectedNpc.id;
            parsedNpc.memories = memoryDraftList
                .map((item) => ({
                    content: typeof item?.content === 'string' ? item.content.trim() : '',
                    time: typeof item?.time === 'string' ? item.time.trim() : ''
                }))
                .filter((item) => item.content || item.time);
            onSaveNpc(selectedNpc.id, parsedNpc);
            setError('');
        } catch (saveError: any) {
            setError(saveError?.message || 'NPC draft JSON cannot be parsed.');
        }
    };

    const handleDelete = () => {
        if (!selectedNpc?.id) return;
        if (!window.confirm(`Xác nhận xóa NPC "${selectedNpc.name || selectedNpc.id}"?`)) return;
        onDeleteNpc(selectedNpc.id);
        setSelectedNpcId('');
    };

    const updateMemoryEntry = (index: number, patch: Partial<NpcMemory>) => {
        setMemoryDraftList((prev) => prev.map((item, itemIndex) => (
            itemIndex === index ? { ...item, ...patch } : item
        )));
    };

    const addMemoryEntry = () => {
        setMemoryDraftList((prev) => [...prev, { content: '', time: '' }]);
    };

    const deleteMemoryEntry = (index: number) => {
        setMemoryDraftList((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
        setCollapsedMemoryIndexes((prev) => prev
            .filter((itemIndex) => itemIndex !== index)
            .map((itemIndex) => (itemIndex > index ? itemIndex - 1 : itemIndex)));
    };

    const toggleMemoryCollapse = (index: number) => {
        setCollapsedMemoryIndexes((prev) => (
            prev.includes(index)
                ? prev.filter((itemIndex) => itemIndex !== index)
                : [...prev, index]
        ));
    };

    const expandAllMemories = () => {
        setCollapsedMemoryIndexes([]);
    };

    const collapseAllMemories = () => {
        setCollapsedMemoryIndexes(memoryDraftList.map((_, index) => index));
    };

    return (
        <div className="space-y-4 pb-6">
            <div className={cardStyle}>
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="text-lg font-bold text-paper-white">Quản lý NPC</div>
                        <div className="mt-1 text-sm text-gray-500">Chỉnh sửa trực tiếp dữ liệu NPC trong phiên chơi hiện tại.</div>
                    </div>
                    <button type="button" onClick={handleCreateNpc} className={`${primaryButtonStyle} w-full sm:w-auto`}>
                        Thêm NPC
                    </button>
                </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
                <div className={cardStyle}>
                    <div className="mb-3 flex items-center justify-between">
                        <div className="text-sm font-bold text-wuxia-gold">NPC Hiện tại</div>
                        <div className="text-xs text-gray-500">{list.length} người</div>
                    </div>
                    <div className="space-y-2 max-h-[36vh] overflow-y-auto custom-scrollbar pr-1 sm:max-h-[70vh]">
                        {list.length === 0 && (
                            <div className="rounded-xl border border-dashed border-gray-700 p-4 text-sm text-gray-500">
                                Hiện không có NPC, có thể tạo mới.
                            </div>
                        )}
                        {list.map((npc) => (
                            <button
                                key={npc.id}
                                type="button"
                                onClick={() => setSelectedNpcId(npc.id)}
                                className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                                    selectedNpc?.id === npc.id
                                        ? 'border-wuxia-gold/60 bg-wuxia-gold/10'
                                        : 'border-gray-800/80 bg-black/20 hover:border-gray-600'
                                }`}
                            >
                                <div className="text-sm font-bold text-paper-white">{npc.name || npc.id}</div>
                                <div className="mt-1 text-xs text-gray-500">{npc.identity || 'Chưa điền danh tính'}</div>
                                <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-gray-400">
                                    <span>Yêu thích {npc.favorability ?? 0}</span>
                                    <span>{npc.relationStatus || 'Chưa xác định'}</span>
                                    {npc.isMainCharacter && <span className="text-wuxia-gold">Nhân vật chính</span>}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className={cardStyle}>
                        <div className="grid gap-3 md:grid-cols-2">
                            <label className="space-y-2">
                                <div className={labelStyle}>Tên</div>
                                <input
                                    value={parseJSON<Record<string, any>>(draftText, {}).name || ''}
                                    onChange={(e) => updateDraftField('name', e.target.value)}
                                    className={inputStyle}
                                />
                            </label>
                            <label className="space-y-2">
                                <div className={labelStyle}>Danh tính</div>
                                <input
                                    value={parseJSON<Record<string, any>>(draftText, {}).identity || ''}
                                    onChange={(e) => updateDraftField('identity', e.target.value)}
                                    className={inputStyle}
                                />
                            </label>
                            <label className="space-y-2">
                                <div className={labelStyle}>Mức yêu thích</div>
                                <input
                                    type="number"
                                    value={parseJSON<Record<string, any>>(draftText, {}).favorability ?? 0}
                                    onChange={(e) => updateDraftField('favorability', Number(e.target.value))}
                                    className={inputStyle}
                                />
                            </label>
                            <label className="space-y-2">
                                <div className={labelStyle}>Trạng thái quan hệ</div>
                                <input
                                    value={parseJSON<Record<string, any>>(draftText, {}).relationStatus || ''}
                                    onChange={(e) => updateDraftField('relationStatus', e.target.value)}
                                    className={inputStyle}
                                />
                            </label>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <div className="text-sm font-bold text-paper-white">Chỉnh sửa ký ức</div>
                                <div className="mt-1 text-xs text-gray-500">Chỉnh sửa từng mục ký ức NPC.</div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button type="button" onClick={expandAllMemories} className={secondaryButtonStyle}>
                                    Mở rộng tất cả
                                </button>
                                <button type="button" onClick={collapseAllMemories} className={secondaryButtonStyle}>
                                    Thu gọn tất cả
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3 max-h-[52vh] overflow-y-auto custom-scrollbar pr-1 sm:max-h-[60vh]">
                            {memoryDraftList.length === 0 && (
                                <div className="rounded-xl border border-dashed border-gray-700 p-4 text-sm text-gray-500">
                                    Hiện không có mục ký ức, có thể thêm mới thủ công.
                                </div>
                            )}
                            {memoryDraftList.map((memory, index) => (
                                <div key={`memory-${index}`} className="rounded-xl border border-gray-800/80 bg-black/20 p-3">
                                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                        <button type="button" onClick={() => toggleMemoryCollapse(index)} className="min-w-0 flex-1 text-left">
                                            <div className="text-xs tracking-[0.2em] text-gray-500">Ký ức #{index + 1}</div>
                                            <div className="mt-1 truncate text-sm text-paper-white">
                                                {memory?.time || 'Chưa điền thời gian'}
                                                {(memory?.time || memory?.content) ? ' · ' : ''}
                                                {memory?.content || 'Chưa điền nội dung'}
                                            </div>
                                        </button>
                                        <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:flex-nowrap">
                                            <button type="button" onClick={() => toggleMemoryCollapse(index)} className={`${secondaryButtonStyle} flex-1 sm:flex-none`}>
                                                {collapsedMemoryIndexes.includes(index) ? 'Mở' : 'Thu'}
                                            </button>
                                            <button type="button" onClick={() => deleteMemoryEntry(index)} className="flex-1 rounded-lg border border-red-900/70 px-3 py-1.5 text-xs text-red-300 transition-colors hover:border-red-700 hover:bg-red-950/20 sm:flex-none">
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                    {!collapsedMemoryIndexes.includes(index) && (
                                        <div className="grid gap-3 md:grid-cols-[200px_minmax(0,1fr)]">
                                            <label className="space-y-2">
                                                <div className={labelStyle}>Thời gian</div>
                                                <input
                                                    value={memory?.time || ''}
                                                    onChange={(e) => updateMemoryEntry(index, { time: e.target.value })}
                                                    className={inputStyle}
                                                    placeholder="1:01:01:00:00"
                                                />
                                            </label>
                                            <label className="space-y-2">
                                                <div className={labelStyle}>Nội dung</div>
                                                <textarea
                                                    value={memory?.content || ''}
                                                    onChange={(e) => updateMemoryEntry(index, { content: e.target.value })}
                                                    rows={4}
                                                    className={`${inputStyle} max-h-56 resize-y overflow-y-auto custom-scrollbar`}
                                                    placeholder="Nhập nội dung ký ức"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button type="button" onClick={addMemoryEntry} className={`${primaryButtonStyle} w-full sm:w-auto`}>
                                    Thêm ký ức
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="text-sm font-bold text-paper-white">NPC JSON Đầy đủ</div>
                                <div className="mt-1 text-xs text-gray-500">Có thể chỉnh sửa trực tiếp tất cả các trường.</div>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <button type="button" onClick={() => {
                                    if (!selectedNpc) return;
                                    const restNpc = { ...selectedNpc } as Partial<NpcStructure>;
                                    delete (restNpc as any).memories;
                                    setDraftText(JSON.stringify(restNpc, null, 2));
                                    setMemoryDraftList(Array.isArray(selectedNpc.memories) ? selectedNpc.memories : []);
                                }} className={`${secondaryButtonStyle} w-full sm:w-auto`}>
                                    Đặt lại
                                </button>
                                <button type="button" onClick={handleDelete} className="w-full rounded-lg border border-red-900/70 px-3 py-2 text-xs text-red-300 transition-colors hover:border-red-700 hover:bg-red-950/20 sm:w-auto">
                                    Xóa NPC
                                </button>
                                <button type="button" onClick={handleSave} className={`${primaryButtonStyle} w-full sm:w-auto`}>
                                    Lưu NPC
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={draftText}
                            onChange={(e) => setDraftText(e.target.value)}
                            rows={24}
                            className={`${inputStyle} font-mono text-[12px] leading-6`}
                            placeholder="Vui lòng chọn hoặc tạo NPC mới"
                        />
                        {error && <div className="mt-3 rounded-lg border border-red-900/60 bg-red-950/20 px-3 py-2 text-sm text-red-300">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NpcManager;