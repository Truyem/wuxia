import React from 'react';

interface Props {
    checked: boolean;
    onChange: (next: boolean) => void;
    disabled?: boolean;
    ariaLabel?: string;
    className?: string;
}

const ToggleSwitch: React.FC<Props> = ({ checked, onChange, disabled = false, ariaLabel, className = '' }) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative w-14 h-8 rounded-full transition-all duration-300 border ${checked ? 'border-wuxia-gold ' : 'border-gray-700 '
                } ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-gray-500'} ${className}`}
        >
            <span
                className={`absolute top-0.5 h-[26px] w-[26px] rounded-full transition-all duration-300 flex items-center justify-center ${checked
                        ? 'translate-x-7 bg-[#E0E0E0]'
                        : 'translate-x-0.5 bg-[#E0E0E0]'
                    }`}
            >
                {/* Inner Dot */}
                <div className={`w-3 h-3 rounded-full ${checked ? 'bg-wuxia-gold' : 'bg-[#4A5568]'
                    }`} />
            </span>
        </button>
    );
};

export default ToggleSwitch;
