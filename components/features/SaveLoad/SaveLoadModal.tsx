import React, { useEffect, useRef, useState } from 'react';
import * as dbService from '../../../services/dbService';
import { SaveStructure } from '../../../types';
import { parseJsonWithRepair } from '../../../utils/jsonRepair';
import GameButton from '../../ui/GameButton';

interface Props {
    onClose: () => void;
    onLoadGame: (save: SaveStructure) => void;
    onSaveGame?: () => void | Promise<void>;
    mode: 'save' | 'load';
    requestConfirm?: (options: { title?: string; message: string; confirmText?: string; cancelText?: string; danger?: boolean }) => Promise<boolean>;
}

const SaveLoadModal: React.FC<Props> = ({ onClose, onLoadGame, onSaveGame, mode, requestConfirm }) => {
    const [saves, setSaves] = useState<SaveStructure[]>([]);
    const [activeTab, setActiveTab] = useState<'auto' | 'manual'>('manual');
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        void loadSaves();
    }, []);

    const loadSaves = async () => {
        setLoading(true);
        try {
            const list = await dbService.getSavesList();
            setSaves(list);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const readLocationText = (save: SaveStructure): string => {
        const env = save.environmentInfo || ({} as any);
        const list = [env.specificLocation, env.minorLocation, env.mediumLocation, env.majorLocation]
            .map((item: any) => (typeof item === 'string' ? item.trim() : ''))
            .filter(Boolean);
        return list[0] || 'Vị trí không rõ';
    };

    const readTimeText = (save: SaveStructure): string => {
        const timeText = typeof save.environmentInfo?.time === 'string' ? save.environmentInfo.time.trim() : '';
        return timeText || (save.timestamp ? new Date(save.timestamp).toLocaleString() : 'Thời gian không rõ');
    };

    const buildingArchiveTitle = (save: SaveStructure): string => {
        const roleName = typeof save.characterData?.name === 'string' ? save.characterData.name.trim() : '';
        return roleName || 'Nhân vật không rõ';
    };

    const buildingArchiveSummary = (save: SaveStructure): string => {
        const historyCount = typeof save.metadata?.historyItemCount === 'number'
            ? save.metadata.historyItemCount
            : (Array.isArray(save.history) ? save.history.length : 0);
        const tags: string[] = [
            save.type === 'auto' ? 'Ảnh chụp tự động' : 'Ảnh chụp thủ công',
            `${historyCount} mục lịch sử`
        ];
        if (save.metadata?.isHistoryTrimmed) {
            tags.push('đã cắt');
        }
        return tags.join(' · ');
    };

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const ok = requestConfirm
            ? await requestConfirm({ title: 'Xóa lưu', message: 'Bạn có chắc muốn xóa lần lưu này không?', confirmText: 'Xóa', danger: true })
            : true;
        if (!ok) return;
        await dbService.deleteSave(id);
        await loadSaves();
    };

    const handleLoadClick = async (save: SaveStructure) => {
        if (mode !== 'load') return;
        const ok = requestConfirm
            ? await requestConfirm({
                title: 'Đọc lưu',
                message: `Đọc lưu: ${buildingArchiveTitle(save)}（${readLocationText(save)}）？`,
                confirmText: 'Đọc'
            })
            : true;
        if (!ok) return;
        onLoadGame(save);
    };

    const handleSave = async () => {
        if (!onSaveGame || syncing) return;
        setSyncing(true);
        try {
            await Promise.resolve(onSaveGame());
            setActiveTab('manual');
            await loadSaves();
        } catch (error: any) {
            console.error(error);
            alert(`Lưu thất bại: ${error?.message || 'Lỗi không rõ'}`);
        } finally {
            setSyncing(false);
        }
    };

    const handleExport = async () => {
        if (syncing) return;
        setSyncing(true);
        try {
            const payload = await dbService.exportSaveData();
            const content = JSON.stringify(payload, null, 2);
            const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const stamp = new Date().toISOString().replace(/[:]/g, '-');
            link.href = url;
            link.download = `wuxia-saves-${stamp}.json`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (error: any) {
            console.error(error);
            alert(`Xuất thất bại: ${error?.message || 'Lỗi không rõ'}`);
        } finally {
            setSyncing(false);
        }
    };

    const handleTriggerImport = async () => {
        const ok = requestConfirm
            ? await requestConfirm({
                title: 'Nhập lưu',
                message: 'Dữ liệu nhập sẽ được ghi vào lưu cục bộ theo phương thức "Hợp nhất + Loại trùng lặp", tiếp tục?',
                confirmText: 'Tiếp tục nhập'
            })
            : true;
        if (!ok) return;
        fileInputRef.current?.click();
    };

    const handleImportFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.currentTarget.value = '';
        if (!file) return;

        setSyncing(true);
        try {
            const fileText = await file.text();
            const parsed = parseJsonWithRepair<any>(fileText);
            if (!parsed.value) {
                throw new Error(parsed.error || 'Phân tích JSON thất bại');
            }

            const result = await dbService.importSaveData(parsed.value, { overwriteExisting: false });
            await loadSaves();
            setActiveTab('manual');

            const repairedTip = parsed.usedRepair ? '\nPhát hiện lỗi định dạng trong tệp, đã tự động sửa và nhập.' : '';
            alert(`Nhập hoàn tất: Đã thêm ${result.imported} mục, Bỏ qua ${result.skipped} mục.${repairedTip}`);
        } catch (error: any) {
            console.error(error);
            alert(`Nhập thất bại: ${error?.message || 'Lỗi không rõ'}`);
        } finally {
            setSyncing(false);
        }
    };

    const filteredSaves = saves.filter((save) => {
        if (activeTab === 'auto') return save.type === 'auto';
        return save.type !== 'auto';
    });
    const busy = loading || syncing;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[300] flex items-center justify-center p-4 font-sans">
            <div className="glass-panel-square border border-white/10 w-full max-w-4xl h-[600px] flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.95)] rounded-none relative overflow-hidden">
                <div className="h-16 shrink-0 border-b border-white/10 bg-white/5 flex items-center justify-between px-6 relative z-50">
                    <h3 className="text-wuxia-gold font-serif font-bold text-2xl tracking-[0.3em] drop-shadow-md">
                        {mode === 'save' ? 'Khắc Thời Gian' : 'Hồi Quy Thời Gian'}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-paper-white text-2xl">×</button>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {mode === 'save' && (
                        <div className="w-[30%] bg-ink-black/20 border-r border-gray-800/50 p-6 flex flex-col gap-4">
                            <h4 className="text-wuxia-gold font-bold text-sm uppercase tracking-widest">Lưu Thủ Công</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Cả lưu thủ công lẫn tự động đều lưu đầy đủ nội dung. Tự động chỉ giữ 3 lưu gần nhất.
                            </p>
                            <GameButton onClick={() => { void handleSave(); }} disabled={!onSaveGame || busy} variant="primary" className="w-full">
                                Lưu ngay
                            </GameButton>
                        </div>
                    )}

                    <div className="flex-1 flex flex-col /5">
                        <div className="px-6 pt-4 pb-3 border-b border-gray-800/50 flex justify-end gap-2">
                            <GameButton
                                onClick={() => { void handleExport(); }}
                                disabled={busy}
                                variant="secondary"
                                className="px-4 py-2 text-xs"
                            >
                                Xuất lưu
                            </GameButton>
                            <GameButton
                                onClick={() => { void handleTriggerImport(); }}
                                disabled={busy}
                                variant="secondary"
                                className="px-4 py-2 text-xs"
                            >
                                Nhập lưu
                            </GameButton>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".json,application/json,text/plain"
                                className="hidden"
                                onChange={(e) => { void handleImportFileChange(e); }}
                            />
                        </div>

                        <div className="flex border-b border-gray-800/50">
                            <button
                                onClick={() => setActiveTab('manual')}
                                className={`flex-1 py-3 text-sm font-bold tracking-widest ${activeTab === 'manual' ? 'bg-wuxia-gold/10 text-wuxia-gold border-b-2 border-wuxia-gold' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Lưu thủ công
                            </button>
                            <button
                                onClick={() => setActiveTab('auto')}
                                className={`flex-1 py-3 text-sm font-bold tracking-widest ${activeTab === 'auto' ? 'bg-wuxia-gold/10 text-wuxia-gold border-b-2 border-wuxia-gold' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Lưu tự động
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                            {filteredSaves.length === 0 && !loading && (
                                <div className="text-center text-gray-600 py-10">Không có hồ sơ</div>
                            )}
                            {loading && (
                                <div className="text-center text-gray-500 py-10">Đang tải...</div>
                            )}

                            {filteredSaves.map((save) => (
                                <div
                                    key={save.id}
                                    onClick={() => { void handleLoadClick(save); }}
                                    className={`relative bg-white/[0.02] border border-white/5 p-4 rounded-none group flex flex-col gap-2 ${mode === 'load' ? 'cursor-pointer hover:border-wuxia-gold/50 hover:/60' : ''}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] px-1.5 rounded-none border ${save.type === 'auto' ? 'border-wuxia-cyan/40 text-wuxia-cyan' : 'border-wuxia-gold text-wuxia-gold'}`}>
                                                {save.type === 'auto' ? 'TỰ ĐỘNG' : 'THỦ CÔNG'}
                                            </span>
                                            <span className="font-bold text-gray-200 text-sm">{buildingArchiveTitle(save)}</span>
                                            <span className="text-xs text-gray-500">
                                                {save.characterData?.realm || 'Cảnh giới không rõ'}
                                            </span>
                                        </div>
                                        <div className="text-[10px] text-gray-600 font-mono">
                                            {new Date(save.timestamp).toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-400 border-l-2 border-gray-700 pl-2">
                                        {readLocationText(save)} · {readTimeText(save)}
                                    </div>
                                    <div className="text-[11px] text-gray-500">
                                        {buildingArchiveSummary(save)}
                                    </div>

                                    <button
                                        onClick={(e) => { void handleDelete(save.id, e); }}
                                        className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                        title="Xóa"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveLoadModal;
