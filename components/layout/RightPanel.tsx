
import React from 'react';
import GameButton from '../ui/GameButton';
import IconGlyph, { IconName } from '../ui/Icon/IconGlyph';

interface Props {
    onOpenSettings: () => void;
    onOpenInventory: () => void;
    onOpenEquipment: () => void; 
    onOpenTeam: () => void;
    onOpenSocial: () => void;
    onOpenKungfu: () => void;
    onOpenWorld: () => void;
    onOpenMap: () => void;
    onOpenSect: () => void;
    onOpenTask: () => void; 
    onOpenAgreement: () => void;
    onOpenStory: () => void; 
    onOpenMemory: () => void; 
    onSave: () => void;
    onLoad: () => void;
    onExit: () => void;
}

const RightPanel: React.FC<Props> = ({
    onOpenSettings, onOpenInventory, onOpenEquipment, onOpenTeam,
    onOpenSocial, onOpenKungfu, onOpenWorld, onOpenMap, onOpenSect,
    onOpenTask, onOpenAgreement, onOpenStory, onOpenMemory,
    onSave, onLoad, onExit
}) => {
    const MENU_ITEMS: { label: string; display: string; action: () => void; icon: IconName }[] = [
        { label: 'Equipment', display: 'Trang Bị', action: onOpenEquipment, icon: 'equipment' },
        { label: 'Inventory', display: 'Túi Đồ', action: onOpenInventory, icon: 'bag' },
        { label: 'Team', display: 'Đội Nhóm', action: onOpenTeam, icon: 'team' },
        { label: 'Social', display: 'Giao Tiếp', action: onOpenSocial, icon: 'social' },
        { label: 'Martial Arts', display: 'Võ Công', action: onOpenKungfu, icon: 'kungfu' },
        { label: 'Sect', display: 'Môn Phái', action: onOpenSect, icon: 'sect' },
        { label: 'Story', display: 'Cốt Truyện', action: onOpenStory, icon: 'story' },
        { label: 'Task', display: 'Nhiệm Vụ', action: onOpenTask, icon: 'task' },
        { label: 'World', display: 'Thế Giới', action: onOpenWorld, icon: 'world' },
        { label: 'Map', display: 'Bản Đồ', action: onOpenMap, icon: 'map' },
        { label: 'Promise', display: 'Hứa Hẹn', action: onOpenAgreement, icon: 'agreement' },

        { label: 'Memory', display: 'Ký Ức', action: onOpenMemory, icon: 'memory' },
    ];

    const SYSTEM_ITEMS = [
        { label: 'Exit', display: 'Thoát', action: onExit, variant: 'glass' as const },
        { label: 'Save', display: 'Lưu', action: onSave, variant: 'glass' as const },
        { label: 'Load', display: 'Tải', action: onLoad, variant: 'glass' as const },
        { label: 'Settings', display: 'Cài Đặt', action: onOpenSettings, variant: 'outline' as const },
    ];

    return (
        <div className="h-full flex flex-col p-4 relative bg-transparent glass-panel">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-ink-wash opacity-5 pointer-events-none"></div>

            {/* ── Header ── */}
            <div className="mb-6 pb-4 border-b border-wuxia-gold/20 shrink-0 text-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-wuxia-gold to-transparent opacity-50"></div>
                <h1 className="font-serif font-black tracking-[0.5em] text-wuxia-gold text-2xl drop-shadow-lg text-glow-gold/40">
                    神机阁
                </h1>
                <div className="text-paper-white/40 tracking-[0.4em] mt-1 uppercase text-[8px] font-bold">
                    Thần Cơ Các
                </div>
            </div>

            {/* ── Menu list ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 flex flex-col gap-2 pr-1">
                {MENU_ITEMS.map((item) => (
                    <button
                        key={item.label}
                        onClick={item.action}
                        className="w-full group relative flex items-center gap-3 px-3 py-3 bg-black/40 border border-white/5 rounded-xl hover:border-wuxia-gold/40 hover:bg-wuxia-gold/5 transition-all duration-300"
                    >
                        <span className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                            <IconGlyph name={item.icon} className="h-4 w-4" strokeWidth={1.5} />
                        </span>
                        <span className="flex-1 text-left font-serif text-[11px] text-paper-white/70 tracking-[0.2em] group-hover:text-wuxia-gold transition-colors font-bold uppercase">
                            {item.display ?? item.label}
                        </span>
                        
                        {/* Hover accent */}
                        <div className="absolute right-3 w-1 h-3 bg-wuxia-gold rounded-full opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 shadow-[0_0_8px_rgba(230,200,110,0.8)]"></div>
                    </button>
                ))}
            </div>

            {/* ── System row ── */}
            <div className="mt-6 pt-4 border-t border-wuxia-gold/20 shrink-0 flex flex-col gap-2">
                {/* Exit Button */}
                <GameButton
                    variant={SYSTEM_ITEMS[0].variant}
                    onClick={SYSTEM_ITEMS[0].action}
                    className="w-full !py-2 text-[10px] tracking-widest"
                >
                    {SYSTEM_ITEMS[0].display ?? SYSTEM_ITEMS[0].label}
                </GameButton>

                {/* Save & Load Grid */}
                <div className="grid grid-cols-2 gap-2">
                    {SYSTEM_ITEMS.slice(1, 3).map((item) => (
                        <GameButton
                            key={item.label}
                            variant={item.variant}
                            onClick={item.action}
                            className="!py-2 !px-0 text-[10px] tracking-widest"
                        >
                            {item.display ?? item.label}
                        </GameButton>
                    ))}
                </div>

                {/* Settings Button */}
                <GameButton
                    variant={SYSTEM_ITEMS[3].variant}
                    onClick={SYSTEM_ITEMS[3].action}
                    className="w-full !py-2 text-[10px] tracking-widest"
                >
                    {SYSTEM_ITEMS[3].display ?? SYSTEM_ITEMS[3].label}
                </GameButton>
            </div>
            
            {/* Bottom Accent */}
            <div className="mt-4 flex justify-center opacity-20 group">
                <div className="w-1.5 h-1.5 rounded-full border border-wuxia-gold rotate-45 group-hover:bg-wuxia-gold transition-colors"></div>
            </div>
        </div>
    );
};

export default RightPanel;
