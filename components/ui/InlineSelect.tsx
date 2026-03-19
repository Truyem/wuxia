import React, { useEffect, useMemo, useRef, useState } from 'react';
import IconGlyph from './Icon/IconGlyph';

export type InlineSelectOption<T extends string = string> = {
    value: T;
    label: string;
};

type InlineSelectProps<T extends string = string> = {
    value: T;
    options: InlineSelectOption<T>[];
    onChange: (next: T) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    buttonClassName?: string;
    panelClassName?: string;
};

const InlineSelect = <T extends string>({
    value,
    options,
    onChange,
    placeholder = 'Vui lòng chọn',
    disabled = false,
    className = '',
    buttonClassName = '',
    panelClassName = ''
}: InlineSelectProps<T>) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const selected = useMemo(() => {
        return options.find((option) => option.value === value);
    }, [options, value]);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: MouseEvent) => {
            const root = rootRef.current;
            if (!root) return;
            if (event.target instanceof Node && root.contains(event.target)) return;
            setOpen(false);
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open]);

    useEffect(() => {
        if (disabled) setOpen(false);
    }, [disabled]);

    return (
        <div className={`relative ${className}`} ref={rootRef}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full border p-3 text-left rounded-md transition-all flex items-center justify-between gap-2 shadow-inner ${disabled
                        ? 'bg-ink-black/10 border-wuxia-gold/10 text-paper-white/40 cursor-not-allowed'
                        : (open
                            ? 'bg-ink-black/40 border-wuxia-gold text-wuxia-gold shadow-[0_0_15px_rgba(var(--c-wuxia-gold),0.2)]'
                            : 'bg-ink-black/5 border-wuxia-gold/20 text-paper-white hover:border-wuxia-gold/50')
                    } ${buttonClassName}`}
            >
                <span className={`truncate ${selected ? '' : 'text-paper-white/40 italic'}`}>
                    {selected?.label || placeholder}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-4 h-4 transition-transform ${disabled ? 'text-paper-white/20' : (open ? 'text-wuxia-gold rotate-180' : 'text-wuxia-gold/50')
                        }`}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.512a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {open && !disabled && (
                <div className={`absolute left-0 right-0 top-full mt-2 z-50 bg-ink-black border border-wuxia-gold/30 rounded-md shadow-2xl overflow-hidden ${panelClassName}`}>
                    <div className="max-h-60 overflow-y-auto custom-scrollbar py-1">
                        {options.length === 0 && (
                             <div className="px-3 py-2 text-xs text-paper-white/40 italic">Không có tùy chọn</div>
                        )}
                        {options.map((option) => {
                            const active = option.value === value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 text-left text-sm transition-all flex items-center justify-between gap-2 ${
                                        active
                                            ? 'bg-wuxia-gold/20 text-wuxia-gold font-bold shadow-inner'
                                            : 'text-paper-white/90 hover:bg-paper-white/5 hover:text-wuxia-gold'
                                    }`}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {active && <IconGlyph name="check" className="w-4 h-4 text-wuxia-gold" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InlineSelect;
