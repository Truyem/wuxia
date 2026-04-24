import React from 'react';
import type { TavernCommand } from '../../../types';

type VariableRootKey = 'character' | 'environment' | 'social' | 'world' | 'battle' | 'story' | 'heroinePlan' | 'playerSect' | 'taskList' | 'appointmentList' | 'memorySystem';

interface Props {
    runtimeState: Record<VariableRootKey, unknown>;
    onReplaceSection: (section: VariableRootKey, value: unknown) => void;
    onApplyCommand: (command: TavernCommand) => void;
}

const blockStyle = 'rounded-2xl border border-gray-800/80 bg-black/25 p-4 md:p-5';
const inputStyle = 'w-full rounded-xl border border-gray-700/80 bg-black/40 px-3 py-2 text-sm text-gray-200 outline-none transition-colors focus:border-wuxia-gold/50';
const buttonStyle = 'rounded-lg border border-wuxia-gold/50 bg-wuxia-gold/10 px-3 py-2 text-xs text-wuxia-gold transition-colors hover:bg-wuxia-gold/20';
const secondaryButtonStyle = 'rounded-lg border border-gray-700/80 px-3 py-2 text-xs text-gray-300 transition-colors hover:border-wuxia-gold/40 hover:text-wuxia-gold';

const sectionList: Array<{ key: VariableRootKey; label: string; description: string }> = [
    { key: 'character', label: 'Nhân vật', description: 'Hồ sơ, thuộc tính, trang bị và trạng thái nhân vật chính.' },
    { key: 'environment', label: 'Môi trường', description: 'Thời gian, địa điểm, thời tiết và biến môi trường.' },
    { key: 'social', label: 'Xã hội', description: 'Danh sách NPC và trạng thái động của họ.' },
    { key: 'world', label: 'Thế giới', description: 'Bản đồ, sự kiện đang diễn ra, sử sách giang hồ, v.v.' },
    { key: 'battle', label: 'Chiến đấu', description: 'Tình hình chiến đấu hiện tại.' },
    { key: 'story', label: 'Cốt truyện', description: 'Chương, kế hoạch cốt truyện, nhóm biến cốt truyện quan trọng.' },
    { key: 'heroinePlan', label: 'Kế hoạch nữ chính', description: 'Lịch trình và hướng dẫn thúc đẩy nữ chính.' },
    { key: 'playerSect', label: 'Môn phái', description: 'Cấu trúc môn phái, chức vụ và tài nguyên môn phái.' },
    { key: 'taskList', label: 'Danh sách nhiệm vụ', description: 'Tất cả các mục nhiệm vụ.' },
    { key: 'appointmentList', label: 'Danh sách hứa hẹn', description: 'Tất cả các mục hứa hẹn.' },
    { key: 'memorySystem', label: 'Hệ thống ký ức', description: 'Hồ sơ ký ức, ngắn hạn/trung hạn/dài hạn.' }
];

const deepClone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const formatJSON = (value: unknown): string => JSON.stringify(value, null, 2);

const parseJSONInput = (raw: string): unknown => {
    const text = raw.trim();
    if (!text) return '';
    return JSON.parse(text);
};

const TreeNodeEditor: React.FC<{
    label: string;
    value: any;
    depth?: number;
    onChange: (value: any) => void;
    onDelete?: () => void;
}> = ({ label, value, depth = 0, onChange, onDelete }) => {
    const isArray = Array.isArray(value);
    const isObject = value && typeof value === 'object' && !isArray;
    const title = `${label}${isArray ? ` [${value.length}]` : ''}${isObject ? ` {${Object.keys(value).length}}` : ''}`;

    if (!isArray && !isObject) {
        if (typeof value === 'boolean') {
            return (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-800/70 bg-black/20 px-3 py-2">
                    <div className="text-sm text-gray-300">{label}</div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
                        {onDelete && <button type="button" onClick={onDelete} className={secondaryButtonStyle}>Xoa</button>}
                    </div>
                </div>
            );
        }
        return (
            <div className="flex flex-col gap-2 rounded-xl border border-gray-800/70 bg-black/20 p-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-gray-300">{label}</div>
                    {onDelete && <button type="button" onClick={onDelete} className={secondaryButtonStyle}>Xoa</button>}
                </div>
                <input
                    type={typeof value === 'number' ? 'number' : 'text'}
                    value={value ?? ''}
                    onChange={(e) => onChange(typeof value === 'number' ? Number(e.target.value) : e.target.value)}
                    className={inputStyle}
                />
            </div>
        );
    }

    const handleAdd = () => {
        if (isArray) {
            const raw = window.prompt(`Thêm muc mang cho ${label}, nhap JSON:`, '""');
            if (raw === null) return;
            try {
                onChange([...(value || []), parseJSONInput(raw)]);
            } catch {
                window.alert('JSON muc mang khong the phan tich.');
            }
            return;
        }
        const key = window.prompt(`Nhap ten truong moi cho ${label}:`, '');
        if (!key) return;
        const raw = window.prompt(`Nhap gia tri JSON cho truong ${key}:`, '""');
        if (raw === null) return;
        try {
            onChange({
                ...(value || {}),
                [key]: parseJSONInput(raw)
            });
        } catch {
            window.alert('JSON gia tri truong khong the phan tich.');
        }
    };

    return (
        <details open={depth < 1} className="rounded-xl border border-gray-800/70 bg-black/20 p-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-gray-200">
                <span>{title}</span>
                <span className="flex items-center gap-2">
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(); }} className={secondaryButtonStyle}>
                        Them
                    </button>
                    {onDelete && (
                        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }} className={secondaryButtonStyle}>
                            Xoa
                        </button>
                    )}
                </span>
            </summary>
            <div className="mt-3 space-y-3">
                {isArray && value.map((item: any, index: number) => (
                    <TreeNodeEditor
                        key={`${label}-${index}`}
                        label={`[${index}]`}
                        value={item}
                        depth={depth + 1}
                        onChange={(nextItem) => {
                            const nextArray = [...value];
                            nextArray[index] = nextItem;
                            onChange(nextArray);
                        }}
                        onDelete={() => {
                            const nextArray = [...value];
                            nextArray.splice(index, 1);
                            onChange(nextArray);
                        }}
                    />
                ))}
                {isObject && Object.keys(value).map((key) => (
                    <TreeNodeEditor
                        key={`${label}-${key}`}
                        label={key}
                        value={value[key]}
                        depth={depth + 1}
                        onChange={(nextChild) => onChange({ ...value, [key]: nextChild })}
                        onDelete={() => {
                            const nextObject = { ...value };
                            delete nextObject[key];
                            onChange(nextObject);
                        }}
                    />
                ))}
            </div>
        </details>
    );
};

const VariableManager: React.FC<Props> = ({ runtimeState, onReplaceSection, onApplyCommand }) => {
    const [activeSection, setActiveSection] = React.useState<VariableRootKey>('character');
    const [drafts, setDrafts] = React.useState<Record<string, any>>(() => deepClone(runtimeState));
    const [jsonDraft, setJsonDraft] = React.useState('');
    const [commandAction, setCommandAction] = React.useState<TavernCommand['action']>('set');
    const [commandKey, setCommandKey] = React.useState('story.keyStoryVariables');
    const [commandValue, setCommandValue] = React.useState('[]');
    const [commandError, setCommandError] = React.useState('');

    React.useEffect(() => {
        const nextDrafts = deepClone(runtimeState);
        setDrafts(nextDrafts);
        setJsonDraft(formatJSON(nextDrafts[activeSection]));
    }, [runtimeState, activeSection]);

    const activeValue = drafts[activeSection];

    React.useEffect(() => {
        setJsonDraft(formatJSON(activeValue));
    }, [activeValue]);

    const updateActiveDraft = (value: any) => {
        setDrafts((prev) => ({ ...prev, [activeSection]: value }));
    };

    const handleSaveSection = () => {
        try {
            const parsed = JSON.parse(jsonDraft);
            setDrafts((prev) => ({ ...prev, [activeSection]: parsed }));
            onReplaceSection(activeSection, parsed);
        } catch {
            window.alert('JSON phan vung hien tai khong the phan tich.');
        }
    };

    const handleApplyCommand = () => {
        try {
            const parsedValue = commandAction === 'delete' ? null : parseJSONInput(commandValue);
            onApplyCommand({
                action: commandAction,
                key: commandKey.trim(),
                value: parsedValue
            });
            setCommandError('');
        } catch (error: any) {
            setCommandError(error?.message || 'JSON lenh cao cap khong the phan tich.');
        }
    };

    return (
        <div className="space-y-4">
            <div className={blockStyle}>
                <div className="text-lg font-bold text-paper-white">Quan ly bien luu tru</div>
                <div className="mt-1 text-sm text-gray-500">Chinh sua truc quan cac bien cho phien choi hien tai. Cau truc phu hop de sua cac truong hien co, lenh cao cap phu hop cho ban va duong dan va thao tac mang phuc tap.</div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
                <div className={blockStyle}>
                    <div className="space-y-2">
                        {sectionList.map((section) => (
                            <button
                                key={section.key}
                                type="button"
                                onClick={() => setActiveSection(section.key)}
                                className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                                    activeSection === section.key
                                        ? 'border-wuxia-gold/60 bg-wuxia-gold/10'
                                        : 'border-gray-800/80 bg-black/20 hover:border-gray-600'
                                }`}
                            >
                                <div className="text-sm font-bold text-paper-white">{section.label}</div>
                                <div className="mt-1 text-xs text-gray-500">{section.description}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className={blockStyle}>
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-bold text-paper-white">{activeSection}</div>
                                <div className="mt-1 text-xs text-gray-500">{sectionList.find((item) => item.key === activeSection)?.description}</div>
                            </div>
                            <button type="button" onClick={() => updateActiveDraft(deepClone(runtimeState[activeSection]))} className={secondaryButtonStyle}>
                                Dat lai phan vung
                            </button>
                        </div>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                            <TreeNodeEditor label={activeSection} value={activeValue} onChange={updateActiveDraft} />
                        </div>
                    </div>

                    <div className={blockStyle}>
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-bold text-paper-white">Ban nhap JSON thô</div>
                                <div className="mt-1 text-xs text-gray-500">Them doi tuong phuc tap, sua doi hang loat mang hoac thay the toan bo bang cach chinh sua JSON phan vung nay nhanh hon.</div>
                            </div>
                            <button type="button" onClick={handleSaveSection} className={buttonStyle}>
                                Luu phan vung
                            </button>
                        </div>
                        <textarea
                            value={jsonDraft}
                            onChange={(e) => setJsonDraft(e.target.value)}
                            rows={16}
                            className={`${inputStyle} font-mono text-[12px] leading-6`}
                        />
                    </div>

                    <div className={blockStyle}>
                        <div className="mb-3">
                            <div className="text-sm font-bold text-paper-white">Sua doi duong dan nang cao</div>
                            <div className="mt-1 text-xs text-gray-500">Phu hop cho `set/add/push/delete` cap duong dan. Vi du: `social[0].memories`, `story.keyStoryVariables`, `memorySystem.shortTermMemory`.</div>
                        </div>
                        <div className="grid gap-3 md:grid-cols-[160px_minmax(0,1fr)]">
                            <label className="space-y-2">
                                <div className="text-xs text-gray-500">Hanh dong</div>
                                <select value={commandAction} onChange={(e) => setCommandAction(e.target.value as TavernCommand['action'])} className={inputStyle}>
                                    <option value="set">set</option>
                                    <option value="add">add</option>
                                    <option value="push">push</option>
                                    <option value="delete">delete</option>
                                </select>
                            </label>
                            <label className="space-y-2">
                                <div className="text-xs text-gray-500">Duong dan</div>
                                <input value={commandKey} onChange={(e) => setCommandKey(e.target.value)} className={inputStyle} />
                            </label>
                        </div>
                        <div className="mt-3 space-y-2">
                            <div className="text-xs text-gray-500">Gia tri JSON</div>
                            <textarea
                                value={commandValue}
                                onChange={(e) => setCommandValue(e.target.value)}
                                rows={6}
                                className={`${inputStyle} font-mono text-[12px] leading-6`}
                                disabled={commandAction === 'delete'}
                            />
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                            <button type="button" onClick={handleApplyCommand} className={buttonStyle}>
                                Ap dung lenh
                            </button>
                            {commandError && <div className="text-sm text-red-300">{commandError}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VariableManager;