import React, { useMemo, useState } from 'react';
import { CharacterData } from '../../models/character';
import IconGlyph, { IconName } from '../ui/Icon/IconGlyph';

interface Props {
    activeWindow: string | null;
    onMenuClick: (menu: string) => void;
    characterData?: CharacterData;
}

const VI_LABELS: Record<string, string> = {
    'Role': 'Nhân vật',
    'Equipment': 'Trang bị',
    'Inventory': 'Túi đồ',
    'Social': 'Giao tiếp',
    'Martial Arts': 'Võ công',
    'World': 'Thế giới',
    'Map': 'Bản đồ',
    'Team': 'Đội nhóm',
    'Sect': 'Môn phái',
    'Task': 'Nhiệm vụ',
    'Promise': 'Hứa hẹn',
    'Story': 'Cốt truyện',

    'Memory': 'Ký ức',
    'Settings': 'Cài đặt',
    'Save': 'Lưu',
    'Read': 'Tải',
};

const PRIMARY_MENUS = ['Role', 'Equipment', 'Inventory', 'Social', 'World'];

const MENU_ICON_MAP: Record<string, IconName> = {
    'Role': 'profile',
    'Equipment': 'equipment',
    'Inventory': 'bag',
    'Social': 'social',
    'Martial Arts': 'kungfu',
    'World': 'world',
    'Map': 'map',
    'Team': 'team',
    'Sect': 'sect',
    'Task': 'task',
    'Promise': 'agreement',
    'Story': 'story',

    'Memory': 'memory',
    'Settings': 'settings',
    'Save': 'save',
    'Read': 'load',
};

const getIcon = (menu: string): IconName => MENU_ICON_MAP[menu] || 'grid';

const MobileQuickMenu: React.FC<Props> = ({ activeWindow, onMenuClick, characterData }) => {
    const [showAllMenus, setShowAllMenus] = useState(false);
    const allMenus = useMemo(() => ([
        ...PRIMARY_MENUS,
        'Map',
        'Martial Arts',
        'Team',
        'Sect',
        'Task',
        'Promise',
        'Story',
        'Memory',
        'Save',
        'Read',
        'Settings',
    ]), []);

    const handleMenuClick = (menu: string) => {
        onMenuClick(menu);
        setShowAllMenus(false);
    };

    return (
        <div className="md:hidden border border-white/10 rounded-xl bg-[rgb(var(--c-ink-black))]/72 backdrop-blur-xl shadow-[0_-12px_24px_rgba(0,0,0,0.32)] pb-2 flex flex-col mx-2 mb-2">
            <div className="px-2 pt-1.5 overflow-x-auto">
                <div className="relative rounded-2xl border border-wuxia-gold/20 overflow-hidden min-w-max">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="flex">
                        {PRIMARY_MENUS.map((menu, idx) => (
                            <QuickButton
                                key={`${menu}-${idx}`}
                                icon={getIcon(menu)}
                                label={VI_LABELS[menu] ?? menu}
                                active={activeWindow === menu}
                                onClick={() => handleMenuClick(menu)}
                            />
                        ))}
                        <QuickButton
                            icon="more"
                            label={showAllMenus ? 'Thu gọn' : 'Thêm'}
                            active={showAllMenus}
                            onClick={() => setShowAllMenus((prev) => !prev)}
                        />
                    </div>
                </div>
            </div>

            {showAllMenus && (
                <div className="px-2 pt-2 pb-1">
                    <div className="rounded-2xl border border-white/10 bg-[rgb(var(--c-ink-black))]/55 shadow-[0_8px_20px_rgba(0,0,0,0.35)] overflow-hidden">
                        <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
                            <span className="text-[10px] tracking-[0.18em] text-paper-white/55">Toàn bộ chức năng</span>
                            <span className="text-[10px] text-wuxia-gold/80">{allMenus.length} mục</span>
                        </div>
                        <div className="max-h-44 overflow-y-auto no-scrollbar p-2">
                            <div className="grid grid-cols-4 gap-2">
                                {allMenus.map((menu, idx) => (
                                    <MenuTile
                                        key={`${menu}-${idx}`}
                                        icon={getIcon(menu)}
                                        label={VI_LABELS[menu] ?? menu}
                                        active={activeWindow === menu}
                                        onClick={() => handleMenuClick(menu)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const QuickButton = ({
    icon,
    label,
    active,
    onClick,
}: {
    icon: IconName;
    label: string;
    active?: boolean;
    onClick: () => void;
    key?: string | number;
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`relative h-14 w-16 flex flex-col items-center justify-center gap-1 transition-colors ${active ? 'text-wuxia-gold' : 'text-paper-white/60 hover:text-paper-white'
            }`}
    >
        {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-wuxia-gold rounded-full" />}
        <span className={`h-8 w-8 flex items-center justify-center translate-y-0.5 transition-all ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(230,200,110,0.45)]' : ''
            }`}>
            <IconGlyph name={icon} className="h-5 w-5" />
        </span>
        <span className={`text-[10px] tracking-[0.14em] -translate-y-0.5 transition-colors ${active ? 'text-wuxia-gold' : 'text-gray-400'
            }`}>
            {label}
        </span>
    </button>
);

const MenuTile = ({
    icon,
    label,
    active,
    onClick,
}: {
    icon: IconName;
    label: string;
    active?: boolean;
    onClick: () => void;
    key?: string | number;
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`h-16 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors ${active
            ? 'border-wuxia-gold/80 bg-wuxia-gold/10 text-wuxia-gold'
            : 'border-white/10 text-paper-white/75 hover:border-wuxia-gold/60 hover:text-paper-white'
            }`}
    >
        <span className={`h-8 w-8 flex items-center justify-center translate-y-0.5 transition-all ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(230,200,110,0.45)]' : ''
            }`}>
            <IconGlyph name={icon} className="h-5 w-5" />
        </span>
        <span className="text-[10px] tracking-[0.12em]">{label}</span>
    </button>
);

export default MobileQuickMenu;
