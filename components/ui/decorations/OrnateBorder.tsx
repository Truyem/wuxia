import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

// A highly stylized container with ornate corners and borders, inspired by traditional Chinese art.
export const OrnateBorder: React.FC<Props> = ({ children, className, ...props }) => {
    return (
        <div className={`relative border border-wuxia-gold/30 p-6 rounded-lg ${className}`} {...props}>
            {/* Corner decorations - Top-left */}
            <div className="absolute -top-3 -left-3 w-24 h-24 pointer-events-none drop-shadow-[0_0_3px_rgba(230,200,110,0.4)] transition-all duration-700">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Primary Corner flourish - more curved and ornate */}
                    <path d="M4,45 V12 C4,7.58 7.58,4 12,4 H45" stroke="#E6C86E" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8,35 V15 C8,11.13 11.13,8 15,8 H35" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                    
                    {/* Traditional Swirl/Cloud Pattern - more complex */}
                    <path d="M12,12 Q12,28 28,28 Q36,28 36,20 Q36,13 28,13 Q22,13 22,20 Q22,25 27,25" stroke="#E6C86E" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M18,18 Q18,35 35,35 Q44,35 44,26 Q44,19 37,19 Q31,19 31,26 Q31,31 36,31" stroke="#E6C86E" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                    
                    {/* Traditional Ruyi Pattern element */}
                    <path d="M5,25 Q15,25 15,15 Q15,5 25,5" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <path d="M25,5 Q35,5 35,15 Q35,25 45,25" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                    
                    {/* Inner Accent lines */}
                    <path d="M4,20 L12,20 M20,4 L20,12" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                    <path d="M8,25 L15,25 M25,8 L25,15" stroke="#E6C86E" strokeWidth="0.5" strokeLinecap="round" opacity="0.2" />
                    
                    {/* Triple Dot accents */}
                    <circle cx="4" cy="4" r="2.5" fill="#E6C86E" />
                    <circle cx="10" cy="4" r="1.5" fill="#E6C86E" opacity="0.6" />
                    <circle cx="4" cy="10" r="1.5" fill="#E6C86E" opacity="0.6" />
                </svg>
            </div>

            {/* Corner decorations - Top-right (flipped) */}
            <div className="absolute -top-3 -right-3 w-24 h-24 pointer-events-none transform scale-x-[-1] drop-shadow-[0_0_3px_rgba(230,200,110,0.4)]">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4,45 V12 C4,7.58 7.58,4 12,4 H45" stroke="#E6C86E" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8,35 V15 C8,11.13 11.13,8 15,8 H35" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                    <path d="M12,12 Q12,28 28,28 Q36,28 36,20 Q36,13 28,13 Q22,13 22,20 Q22,25 27,25" stroke="#E6C86E" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M18,18 Q18,35 35,35 Q44,35 44,26 Q44,19 37,19 Q31,19 31,26 Q31,31 36,31" stroke="#E6C86E" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                    <path d="M5,25 Q15,25 15,15 Q15,5 25,5" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <circle cx="4" cy="4" r="2.5" fill="#E6C86E" />
                </svg>
            </div>

            {/* Corner decorations - Bottom-left (flipped) */}
            <div className="absolute -bottom-3 -left-3 w-24 h-24 pointer-events-none transform scale-y-[-1] drop-shadow-[0_0_3px_rgba(230,200,110,0.4)]">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4,45 V12 C4,7.58 7.58,4 12,4 H45" stroke="#E6C86E" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8,35 V15 C8,11.13 11.13,8 15,8 H35" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                    <path d="M12,12 Q12,28 28,28 Q36,28 36,20 Q36,13 28,13 Q22,13 22,20 Q22,25 27,25" stroke="#E6C86E" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M18,18 Q18,35 35,35 Q44,35 44,26 Q44,19 37,19 Q31,19 31,26 Q31,31 36,31" stroke="#E6C86E" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                    <path d="M5,25 Q15,25 15,15 Q15,5 25,5" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <circle cx="4" cy="4" r="2.5" fill="#E6C86E" />
                </svg>
            </div>

            {/* Corner decorations - Bottom-right (flipped) */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 pointer-events-none transform scale-x-[-1] scale-y-[-1] drop-shadow-[0_0_3px_rgba(230,200,110,0.4)]">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4,45 V12 C4,7.58 7.58,4 12,4 H45" stroke="#E6C86E" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8,35 V15 C8,11.13 11.13,8 15,8 H35" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                    <path d="M12,12 Q12,28 28,28 Q36,28 36,20 Q36,13 28,13 Q22,13 22,20 Q22,25 27,25" stroke="#E6C86E" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M18,18 Q18,35 35,35 Q44,35 44,26 Q44,19 37,19 Q31,19 31,26 Q31,31 36,31" stroke="#E6C86E" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                    <path d="M5,25 Q15,25 15,15 Q15,5 25,5" stroke="#E6C86E" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <circle cx="4" cy="4" r="2.5" fill="#E6C86E" />
                </svg>
            </div>

            {/* Propitious Cloud Decoration */}
            <div className="absolute top-4 right-4 w-24 h-16 opacity-10 pointer-events-none overflow-hidden">
                <svg viewBox="0 0 120 60" fill="currentColor" className="text-wuxia-gold w-full h-full"><path d="M81.54,23.15c-1.2-1.8-3.6-2.4-5.4-1.2s-2.4,3.6-1.2,5.4c3.2,4.8,2,10.8-2.8,14s-10.8,2-14-2.8c-2.95-4.43-1.94-10.2,2.49-13.15C65,23,68.2,21.9,71,23.1c1.8-1.2,2.4-3.6,1.2-5.4c-1.2-1.8-3.6-2.4-5.4-1.2c-5.2,3.5-7.5,10.3-4.1,15.5c4.7,7.1,13.8,8.4,20.9,3.7C90.74,31.05,89.54,26.15,81.54,23.15z"></path><path d="M68,16.5C64.6,12.3,58.7,11,53.2,13.2c-1.7-1.4-4.2-0.9-5.6,0.8c-1.4,1.7-0.9,4.2,0.8,5.6c4.6,3.9,6.5,10,4.2,15.5c-3.1,7.2-11.2,10.5-18.4,7.4c-0.8-0.3-1.6-0.7-2.4-1.1c-1.6-0.9-3.6-0.2-4.5,1.4s-0.2,3.6,1.4,4.5c1.1,0.6,2.2,1.2,3.3,1.7c9.9,4.4,21.5,0,25.9-9.9C73.2,28.5,72.4,21.9,68,16.5z"></path><path d="M103.8,13.4c-3.9-3.9-10.1-4.5-14.7-1.5c-1.8-1.2-4.2-0.6-5.4,1.2s-0.6,4.2,1.2,5.4c3.1,2.1,4.4,6.1,3.2,9.6c-1.6,4.8-6.1,7.7-10.9,7.1c-0.2,0-0.3,0-0.5,0c-1.9,0-3.6-1.3-4-3.2c-0.5-2.2,0.9-4.4,3-4.9c1.5-0.3,2.9,0.3,3.8,1.4c1.2,1.4,3.4,1.6,4.8,0.4c1.4-1.2,1.6-3.4,0.4-4.8c-2.3-2.6-5.8-3.7-9.2-2.9c-4.9,1.1-8.2,5.6-7.1,10.5c1.4,6.1,7.2,10.1,13.3,9.2c0.2,0,0.5,0,0.7,0c7.8-0.8,14.2-6.5,15.4-14.2C108.3,23.3,107.1,16.7,103.8,13.4z"></path></svg>
            </div>

            {children}
        </div>
    );
};
