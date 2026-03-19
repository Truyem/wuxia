import React, { useState, useEffect } from 'react';

interface Props {
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

const ParallelogramSaveButton: React.FC<Props> = ({ onClick, className = '', disabled = false }) => {
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (saved) {
            const timer = setTimeout(() => setSaved(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [saved]);

    const handleSave = () => {
        if (disabled || saved) return;
        onClick();
        setSaved(true);
    };

    return (
        <button
            onClick={handleSave}
            disabled={disabled || saved}
            className={`
                relative group transition-all duration-300
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${className}
            `}
            style={{
                clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)',
            }}
        >
            <div className={`
                absolute inset-0 transition-opacity duration-300
                ${saved 
                    ? 'bg-green-600/20' 
                    : 'bg-wuxia-gold/10 group-hover:bg-wuxia-gold/20'
                }
            `} />
            
            <div className={`
                px-8 py-3 flex items-center justify-center gap-3
                border-2 transition-colors duration-300
                ${saved 
                    ? 'border-green-500/50 bg-green-900/40 text-green-300' 
                    : 'border-wuxia-gold/40 bg-black/60 text-wuxia-gold group-hover:border-wuxia-gold group-hover:text-paper-white'
                }
            `}>
                <span className="font-serif font-black text-sm tracking-[0.3em] uppercase">
                    {saved ? 'Đã lưu cài đặt' : 'Lưu cài đặt'}
                </span>
                
                {saved ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-400">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4.13-5.5z" clipRule="evenodd" />
                    </svg>
                )}
            </div>
            
            {/* Border glow decoration */}
            <div className={`
                absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none
                ${saved ? '' : 'shadow-[0_0_15px_rgba(212,175,55,0.3)]'}
            `} />
        </button>
    );
};

export default ParallelogramSaveButton;
