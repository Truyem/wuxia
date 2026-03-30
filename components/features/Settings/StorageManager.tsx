
import React, { useEffect, useState } from 'react';
import * as dbService from '../../../services/dbService';
import GameButton from '../../ui/GameButton';
import ToggleSwitch from '../../ui/ToggleSwitch';

interface Props {
    requestConfirm?: (options: { title?: string; message: string; confirmText?: string; cancelText?: string; danger?: boolean }) => Promise<boolean>;
}

const StorageManager: React.FC<Props> = ({ requestConfirm }) => {
    const [info, setInfo] = useState<dbService.StorageBreakdown>({
        usage: 0,
        quota: 0,
        details: { saves: 0, settings: 0, prompts: 0, api: 0, cache: 0 }
    });
    const [protectApiKey, setProtectApiKey] = useState(true);
    const [protectCustomPreset, setProtectCustomPreset] = useState(true);
    const [overwriteOnImport, setOverwriteOnImport] = useState(false);
    const [runningAction, setRunningAction] = useState<string | null>(null);
    const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const pushNotice = (type: 'success' | 'error', text: string) => {
        setNotice({ type, text });
        window.setTimeout(() => setNotice(null), 3000);
    };

    const updateInfo = async () => {
        const data = await dbService.getDetailedStorageInfo();
        setInfo(data);
    };

    useEffect(() => {
        updateInfo();
    }, []);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const runWithConfirm = async (
        actionKey: string,
        options: {
            title: string;
            message: string;
            confirmText?: string;
            onRun: () => Promise<void>;
            reloadAfterDone?: boolean;
        }
    ) => {
        if (runningAction) return;
        const ok = requestConfirm
            ? await requestConfirm({
                title: options.title,
                message: options.message,
                confirmText: options.confirmText || 'Xác nhận',
                danger: true
            })
            : true;
        if (!ok) return;
        try {
            setRunningAction(actionKey);
            await options.onRun();
            await updateInfo();
            pushNotice('success', 'Thao tác hoàn tất');
            if (options.reloadAfterDone) {
                window.location.reload();
            }
        } catch (error: any) {
            pushNotice('error', `Thao tác thất bại: ${error?.message || 'Lỗi không xác định'}`);
        } finally {
            setRunningAction(null);
        }
    };

    const handleClearAll = async () => {
        const protectionText = [
            protectApiKey ? 'Cấu hình API' : null,
            protectCustomPreset ? 'Nền/Tài năng tùy chỉnh' : null
        ].filter(Boolean).join('、');
        await runWithConfirm('clear_all', {
            title: 'Xóa tất cả dữ liệu',
            message: protectionText
                ? `Bạn có chắc muốn xóa tất cả dữ liệu không? Sẽ giữ lại: ${protectionText}.`
                : 'Bạn có chắc muốn xóa tất cả dữ liệu không? Thao tác này không thể hoàn tác.',
            confirmText: 'Xóa tất cả',
            onRun: async () => {
                await dbService.clearAllData({
                    keepApiKey: protectApiKey,
                    keepCustomTalents: protectCustomPreset
                });
            },
            reloadAfterDone: true
        });
    };

    const handleClearAllSaves = async () => {
        await runWithConfirm('clear_saves', {
            title: 'Xóa tất cả lưu game',
            message: 'Bạn có chắc muốn xóa tất cả lưu thủ công/tự động không?',
            confirmText: 'Xóa',
            onRun: async () => {
                await dbService.clearSavesData();
            }
        });
    };

    const handleThoroughDelete = async () => {
        await runWithConfirm('thorough_delete', {
            title: 'Xóa hoàn toàn tất cả dữ liệu',
            message: 'Cảnh báo: Thao tác này sẽ bỏ qua mọi tùy chọn bảo vệ và giữ lại, trực tiếp xóa sạch toàn bộ dữ liệu cục bộ (bao gồm Cấu hình API, cài đặt tùy chỉnh, v.v.). Thao tác này không thể hoàn tác.',
            confirmText: 'Xóa hoàn toàn',
            onRun: async () => {
                await dbService.clearAllData({
                    keepApiKey: false,
                    keepCustomTalents: false
                });
            },
            reloadAfterDone: true
        });
    };

    const handleImportJson = async () => {
        if (runningAction) return;

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = async (e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;

            try {
                setRunningAction('import_json');
                const text = await file.text();
                const payload = JSON.parse(text);

                const result = await dbService.importSaveData(payload, {
                    overwriteExisting: overwriteOnImport
                });

                pushNotice('success', `Nhập hoàn tất: thành công ${result.imported} mục, bỏ qua ${result.skipped} mục`);
                await updateInfo();
            } catch (err: any) {
                pushNotice('error', `Nhập thất bại: ${err?.message || 'Lỗi định dạng file'}`);
            } finally {
                setRunningAction(null);
            }
        };

        input.click();
    };

    const handleDeleteApi = async () => {
        await runWithConfirm('delete_api', {
            title: 'Xóa cấu hình API',
            message: 'Xác nhận xóa cấu hình API? Sau khi xóa cần điền lại thông tin kết nối mô hình.',
            confirmText: 'Xóa',
            onRun: async () => {
                await dbService.deleteSetting('api_settings');
            }
        });
    };

    const handleDeletePrompts = async () => {
        await runWithConfirm('delete_prompts', {
            title: 'Xóa cấu hình prompt',
            message: 'Bạn có chắc muốn xóa cấu hình prompt hiện tại không?',
            confirmText: 'Xóa',
            onRun: async () => {
                await dbService.deleteSetting('prompts');
            }
        });
    };

    const handleDeleteVisualSettings = async () => {
        await runWithConfirm('delete_visual', {
            title: 'Xóa cài đặt giao diện',
            message: 'Bạn có chắc muốn xóa cài đặt giao diện không? Thao tác này sẽ xóa ảnh nền, định dạng hiển thị thời gian và cài đặt lớp kết xuất hiện tại.',
            confirmText: 'Xóa',
            onRun: async () => {
                await dbService.deleteSetting('visual_settings');
            }
        });
    };

    const handleDeleteFestivals = async () => {
        await runWithConfirm('delete_festivals', {
            title: 'Xóa cấu hình lễ hội',
            message: 'Bạn có chắc muốn xóa cấu hình lễ hội không?',
            confirmText: 'Xóa',
            onRun: async () => {
                await dbService.deleteSetting('festivals');
            }
        });
    };

    const handleDeleteGameAndMemorySettings = async () => {
        await runWithConfirm('delete_game_memory', {
            title: 'Xóa cài đặt game/Bộ nhớ',
            message: 'Bạn có chắc muốn xóa cài đặt game và bộ nhớ không?',
            confirmText: 'Xóa',
            onRun: async () => {
                await dbService.deleteSettingsBatch(['game_settings', 'memory_settings']);
            }
        });
    };

    const handleDeleteCustomPreset = async () => {
        await runWithConfirm('delete_custom_preset', {
            title: 'Xóa nền/Tài năng tùy chỉnh',
            message: 'Xác nhận xóa "Ảnh nền tùy chỉnh + Mục nhập tài năng/bối cảnh nhân vật tùy chỉnh"?',
            confirmText: 'Xóa',
            onRun: async () => {
                await dbService.clearCustomTalentsAndBackgrounds();
            }
        });
    };

    const handleClearAllSettings = async () => {
        const protectionText = [
            protectApiKey ? 'Cấu hình API' : null,
            protectCustomPreset ? 'Nền/Tài năng tùy chỉnh' : null
        ].filter(Boolean).join('、');
        await runWithConfirm('clear_all_settings', {
            title: 'Xóa tất cả cài đặt',
            message: protectionText
                ? `Bạn có chắc muốn xóa tất cả cài đặt không? Sẽ giữ lại: ${protectionText}.`
                : 'Bạn có chắc muốn xóa tất cả cài đặt không?',
            confirmText: 'Xóa cài đặt',
            onRun: async () => {
                await dbService.clearAllSettings({
                    keepApiKey: protectApiKey,
                    keepCustomTalents: protectCustomPreset
                });
            }
        });
    };

    const handleClearCache = async () => {
        await runWithConfirm('clear_cache', {
            title: 'Xóa bộ nhớ đệm',
            message: 'Bạn có chắc muốn xóa bộ nhớ đệm hệ thống không? Thao tác này sẽ không xóa lưu game hay cài đặt.',
            confirmText: 'Xóa',
            onRun: async () => {
                await dbService.clearSystemCache();
            }
        });
    };

    const handleRepairHistory = async () => {
        await runWithConfirm('repair_history', {
            title: 'Sửa lỗi hội thoại',
            message: 'Tính năng này sẽ quét tất cả các bản lưu và cố gắng sửa các đoạn hội thoại bị lỗi hiển thị JSON. Bạn có muốn tiếp tục?',
            confirmText: 'Sửa lỗi ngay',
            onRun: async () => {
                const result = await dbService.repairAllSaves();
                pushNotice('success', `Đã sửa: ${result.repaired}/${result.total} bản lưu có thay đổi.`);
            }
        });
    };

    // Helpers for Progress Bar
    const getPercent = (val: number) => Math.min((val / (info.usage || 1)) * 100, 100);

    return (
        <div className="space-y-6 h-full flex flex-col">
            {notice && (
                <div className={`text-xs px-3 py-2 border rounded ${notice.type === 'success'
                    ? 'border-wuxia-gold/40 bg-wuxia-gold/10 text-wuxia-gold'
                    : 'border-wuxia-red/40 bg-wuxia-red/10 text-wuxia-red'
                    }`}>
                    {notice.text}
                </div>
            )}

            {/* Storage Breakdown Section */}
            <div className="bg-ink-black/20 p-5 border border-wuxia-gold/20 rounded-xl backdrop-blur-sm">
                <div className="flex justify-between items-end mb-3">
                    <h4 className="text-wuxia-gold font-serif font-bold text-shadow-gold">Tổng quan lưu trữ cục bộ</h4>
                    <span className="text-xs text-wuxia-gold/60 font-mono">
                        Tổng dung lượng: <span className="text-paper-white font-bold">{formatBytes(info.usage)}</span> / {formatBytes(info.quota)}
                    </span>
                </div>

                {/* Visual Bar */}
                <div className="w-full h-4 bg-ink-black/20 rounded-none overflow-hidden flex mb-4 border border-wuxia-gold/30">

                    <div className="h-full bg-wuxia-gold/80 transition-all duration-500" style={{ width: `${getPercent(info.details.saves)}%` }} title="Lưu game"></div>
                    <div className="h-full bg-wuxia-gold/60 transition-all duration-500" style={{ width: `${getPercent(info.details.prompts)}%` }} title="Prompt"></div>
                    <div className="h-full bg-amber-600/60 transition-all duration-500" style={{ width: `${getPercent(info.details.settings)}%` }} title="Cài đặt khác"></div>
                    <div className="h-full bg-wuxia-gold transition-all duration-500" style={{ width: `${getPercent(info.details.api)}%` }} title="Cấu hình API"></div>
                    <div className="h-full bg-paper-white/20 transition-all duration-500" style={{ width: `${getPercent(info.details.cache)}%` }} title="Bộ nhớ đệm"></div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-wuxia-gold/80 uppercase tracking-wider mb-1">Lưu game</span>
                        <span className="text-xs font-mono text-paper-white/70">{formatBytes(info.details.saves)}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-wuxia-gold/60 uppercase tracking-wider mb-1">Prompt</span>
                        <span className="text-xs font-mono text-paper-white/70">{formatBytes(info.details.prompts)}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-amber-500/60 uppercase tracking-wider mb-1">Cài đặt</span>
                        <span className="text-xs font-mono text-paper-white/70">{formatBytes(info.details.settings)}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-wuxia-gold uppercase tracking-wider mb-1">API</span>
                        <span className="text-xs font-mono text-paper-white/70">{formatBytes(info.details.api)}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-paper-white/30 uppercase tracking-wider mb-1">Đệm</span>
                        <span className="text-xs font-mono text-paper-white/50">{formatBytes(info.details.cache)}</span>
                    </div>
                </div>
            </div>

            {/* Archive Migration Section */}
            <div className="bg-ink-black/20 p-5 border border-wuxia-gold/20 rounded-xl space-y-4 backdrop-blur-sm">
                <h4 className="text-wuxia-gold font-serif font-bold italic tracking-wider">Di chuyển & Sửa lỗi</h4>
                <p className="text-[11px] text-paper-white/50 leading-relaxed font-medium">
                    Hỗ trợ nhập file JSON lưu game và sửa lỗi hiển thị hội thoại do mô hình AI.
                </p>

                <div className="grid grid-cols-1 gap-3">
                    <button
                        type="button"
                        className="w-full py-3 border border-wuxia-gold/30 hover:border-wuxia-gold/50 bg-wuxia-gold/5 hover:bg-wuxia-gold/10 text-wuxia-gold text-xs tracking-[0.1em] font-serif transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                        onClick={handleRepairHistory}
                        disabled={Boolean(runningAction)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83m0 0a2.978 2.978 0 01-3.07-3.07m7.388-3.17a3.921 3.921 0 00-5.417 5.417L17.5 5.5l-3.352 3.352m0 0A4.409 4.409 0 0115.5 10.5l-3.958 3.958" />
                        </svg>
                        <span>Sửa lỗi hiển thị JSON hội thoại</span>
                    </button>

                    <div className="border-t border-wuxia-gold/10 my-1" />

                    <div className="flex items-center justify-between py-1">
                        <div className="flex flex-col gap-0.5">
                            <label className="text-sm text-paper-white/70">Ghi đè lưu game hiện có khi nhập.</label>
                            <span className="text-[10px] text-paper-white/30">
                                {overwriteOnImport ? 'Khi bật: Xóa lưu game trước khi nhập.' : 'Khi tắt: Hợp nhất và tự động loại bỏ trùng lặp.'}
                            </span>
                        </div>
                        <ToggleSwitch
                            checked={overwriteOnImport}
                            onChange={setOverwriteOnImport}
                            ariaLabel="Chuyển sang chế độ ghi đè khi nhập"
                            disabled={Boolean(runningAction)}
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full py-3 border border-wuxia-gold/30 hover:border-wuxia-gold/50 bg-wuxia-gold/5 hover:bg-wuxia-gold/10 text-paper-white text-xs tracking-[0.2em] font-serif transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                        onClick={handleImportJson}
                        disabled={Boolean(runningAction)}
                    >
                        <span>Nhập file JSON lưu game</span>
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="border-t border-wuxia-gold/30 pt-4 mt-auto shrink-0">
                <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-paper-white/70 select-none">Giữ lại Cấu hình API khi dọn dẹp</label>
                        <ToggleSwitch
                            checked={protectApiKey}
                            onChange={setProtectApiKey}
                            ariaLabel="Chuyển đổi giữ lại Cấu hình API khi dọn dẹp"
                            disabled={Boolean(runningAction)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-paper-white/70 select-none">Giữ lại nền/tài năng tùy chỉnh khi dọn dẹp</label>
                        <ToggleSwitch
                            checked={protectCustomPreset}
                            onChange={setProtectCustomPreset}
                            ariaLabel="Chuyển đổi giữ lại nền và tài năng tùy chỉnh khi dọn dẹp"
                            disabled={Boolean(runningAction)}
                        />
                    </div>
                </div>

                <GameButton
                    onClick={handleClearAll}
                    variant="danger"
                    className="w-full py-2 text-sm disabled:opacity-50"
                    disabled={Boolean(runningAction)}
                >
                    {runningAction === 'clear_all' ? 'Đang xử lý...' : 'Xóa tất cả dữ liệu (Đặt lại game)'}
                </GameButton>

                <div className="mt-4 pt-4 border-t border-wuxia-red/20">
                    <button
                        onClick={handleThoroughDelete}
                        disabled={Boolean(runningAction)}
                        className="w-full py-2 bg-transparent border border-wuxia-red/60 text-wuxia-red hover:bg-wuxia-red/10 text-xs font-bold transition-all disabled:opacity-50"
                    >
                        {runningAction === 'thorough_delete' ? 'Đang xóa...' : 'Xóa hoàn toàn tất cả dữ liệu (Bỏ qua bảo vệ)'}
                    </button>
                    <p className="mt-2 text-[10px] text-red-400/80 leading-tight">
                        Thao tác này bỏ qua tùy chọn bảo vệ và giữ lại, trực tiếp xóa sạch toàn bộ dữ liệu cục bộ.
                    </p>
                </div>

                <div className="mt-4 text-[11px] text-paper-white/40 italic">
                    Xóa từng mục (Xóa dữ liệu của một mô-đun cụ thể theo nhu cầu):
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <button
                        type="button"
                        className="text-left px-3 py-2 border border-wuxia-red/40 bg-transparent hover:bg-wuxia-red/10 text-xs text-paper-white/80 disabled:opacity-50 transition-all font-medium"
                        onClick={handleClearAllSaves}
                        disabled={Boolean(runningAction)}
                    >
                        Xóa tất cả lưu game
                    </button>
                    <button
                        type="button"
                        className="text-left px-3 py-2 border border-wuxia-red/40 bg-transparent hover:bg-wuxia-red/10 text-xs text-paper-white/80 disabled:opacity-50 transition-all font-medium"
                        onClick={handleClearCache}
                        disabled={Boolean(runningAction)}
                    >
                        Xóa bộ nhớ đệm hệ thống
                    </button>
                    <button
                        type="button"
                        className="text-left px-3 py-2 border border-wuxia-red/40 bg-transparent hover:bg-wuxia-red/10 text-xs text-paper-white/80 disabled:opacity-50 transition-all font-medium"
                        onClick={handleDeleteApi}
                        disabled={Boolean(runningAction)}
                    >
                        Xóa cấu hình API
                    </button>
                    <button
                        type="button"
                        className="text-left px-3 py-2 border border-wuxia-red/40 bg-transparent hover:bg-wuxia-red/10 text-xs text-paper-white/80 disabled:opacity-50 transition-all font-medium"
                        onClick={handleDeletePrompts}
                        disabled={Boolean(runningAction)}
                    >
                        Xóa cấu hình prompt
                    </button>
                    <button
                        type="button"
                        className="text-left px-3 py-2 border border-wuxia-red/40 bg-transparent hover:bg-wuxia-red/10 text-xs text-paper-white/80 disabled:opacity-50 transition-all font-medium"
                        onClick={handleDeleteFestivals}
                        disabled={Boolean(runningAction)}
                    >
                        Xóa cấu hình lễ hội
                    </button>
                    <button
                        type="button"
                        className="text-left px-3 py-2 border border-wuxia-red/40 bg-transparent hover:bg-wuxia-red/10 text-xs text-paper-white/80 disabled:opacity-50 transition-all font-medium"
                        onClick={handleDeleteVisualSettings}
                        disabled={Boolean(runningAction)}
                    >
                        Xóa cài đặt giao diện
                    </button>
                    <button
                        type="button"
                        className="text-left px-3 py-2 border border-wuxia-red/40 bg-transparent hover:bg-wuxia-red/10 text-xs text-paper-white/80 disabled:opacity-50 transition-all font-medium"
                        onClick={handleDeleteGameAndMemorySettings}
                        disabled={Boolean(runningAction)}
                    >
                        Xóa cài đặt game/Bộ nhớ
                    </button>
                    <button
                        type="button"
                        className="text-left px-3 py-2 border border-wuxia-red/40 bg-transparent hover:bg-wuxia-red/10 text-xs text-paper-white/80 disabled:opacity-50 transition-all font-medium"
                        onClick={handleDeleteCustomPreset}
                        disabled={Boolean(runningAction)}
                    >
                        Xóa nền/Tài năng tùy chỉnh
                    </button>
                    <button
                        type="button"
                        className="text-left px-3 py-2 border border-wuxia-red/40 bg-transparent hover:bg-wuxia-red/10 text-xs text-paper-white/80 disabled:opacity-50 transition-all font-medium"
                        onClick={handleClearAllSettings}
                        disabled={Boolean(runningAction)}
                    >
                        Xóa tất cả cài đặt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StorageManager;
