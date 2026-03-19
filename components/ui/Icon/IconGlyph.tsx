import React from 'react';

export type IconName =
    | 'profile'
    | 'equipment'
    | 'bag'
    | 'social'
    | 'kungfu'
    | 'world'
    | 'map'
    | 'more'
    | 'team'
    | 'sect'
    | 'task'
    | 'agreement'
    | 'story'
    | 'plan'
    | 'memory'
    | 'settings'
    | 'save'
    | 'load'
    | 'grid'
    | 'tavern'
    | 'sword'
    | 'dagger'
    | 'robe'
    | 'outer'
    | 'waist'
    | 'legs'
    | 'feet'
    | 'back'
    | 'system'
    | 'prompt'
    | 'gameplay'
    | 'mountain'
    | 'sparkle'
    | 'link'
    | 'book'
    | 'logs'
    | 'atmosphere'
    | 'customization'
    | 'backup'
    | 'theme'
    | 'dice'
    | 'heart'
    | 'status'
    | 'chat'
    | 'location'
    | 'diary'
    | 'calendar'
    | 'bolt'
    | 'food'
    | 'drop'
    | 'close'
    | 'flower'
    | 'network'
    | 'import'
    | 'user'
    | 'search'
    | 'shield'
    | 'bow'
    | 'box'
    | 'briefcase'
    | 'archive'
    | 'lightning'
    | 'pin'
    | 'temple'
    | 'gem'
    | 'check';

interface Props {
    name: IconName;
    className?: string;
    strokeWidth?: number;
}

const IconGlyph: React.FC<Props> = ({ name, className, strokeWidth = 1.8 }) => {
    const svgClass = className || 'h-4 w-4';

    switch (name) {
        case 'profile':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><circle cx="12" cy="8" r="3.2" /><path d="M5.5 19c1.2-3.1 3.4-4.7 6.5-4.7s5.3 1.6 6.5 4.7" /></svg>;
        case 'equipment':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="m4.5 7 4-2.5 2.5 2.5-2.5 4z" /><path d="m10 10 7 7" /><path d="m16.5 16.5-2 2" /></svg>;
        case 'bag':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M7 8h10l-1 11H8L7 8Z" /><path d="M9.5 8V7a2.5 2.5 0 0 1 5 0v1" /></svg>;
        case 'social':
        case 'chat':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M4.5 6.5h15v9h-7l-4 3v-3h-4z" /></svg>;
        case 'kungfu':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M4.5 6.5h6.5v11H4.5zM13 6.5h6.5v11H13z" /><path d="M11 7.5c.7-.6 1.4-.9 2-.9" /></svg>;
        case 'world':
        case 'system':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><circle cx="12" cy="12" r="8" /><path d="M4.6 12h14.8M12 4.2c2.5 2.3 2.5 13.3 0 15.6M12 4.2c-2.5 2.3-2.5 13.3 0 15.6" /></svg>;
        case 'map':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M3.5 6.5 8.5 4l7 2.5 5-2v13l-5 2-7-2.5-5 2z" /><path d="M8.5 4v12.5M15.5 6.5V19" /></svg>;
        case 'more':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="currentColor"><circle cx="6" cy="6" r="1.6" /><circle cx="12" cy="6" r="1.6" /><circle cx="18" cy="6" r="1.6" /><circle cx="6" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="18" cy="12" r="1.6" /><circle cx="6" cy="18" r="1.6" /><circle cx="12" cy="18" r="1.6" /><circle cx="18" cy="18" r="1.6" /></svg>;
        case 'team':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><circle cx="9" cy="9" r="2.5" /><circle cx="15.5" cy="10.5" r="2" /><path d="M4.8 18c.8-2.5 2.4-3.8 4.8-3.8s4 .9 5 2.8" /></svg>;
        case 'sect':
        case 'mountain':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M4.5 9h15" /><path d="M6.5 9v8M12 9v8M17.5 9v8" /><path d="m4 9 8-4 8 4M4.5 19h15" /></svg>;
        case 'task':
        case 'prompt':
        case 'logs':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><rect x="6" y="4.5" width="12" height="15" rx="1.5" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
        case 'agreement':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M7 6.5h10v11H7z" /><path d="M9.5 9.5h5M9.5 12h5M9.5 14.5h3" /><path d="m14.5 16.5 1.2 1.2 2.8-2.8" /></svg>;
        case 'story':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M5.5 5.5h13v13h-13z" /><path d="M8.5 9h7M8.5 12h7M8.5 15h4" /></svg>;
        case 'plan':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M4.5 6.5h15v11h-15z" /><path d="M7.5 9.5h9M7.5 12.5h5" /><path d="m13.5 14.5 1.5 1.5 3-3" /></svg>;
        case 'memory':
        case 'calendar':
        case 'diary':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><circle cx="12" cy="12" r="7.5" /><path d="M12 8.3V12l3 1.7" /></svg>;
        case 'save':
        case 'backup':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M6 4.5h10l2 2V19H6z" /><path d="M8.5 4.5v5h7v-5M8.5 19v-5h7v5" /></svg>;
        case 'load':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M6 6.5h12V18H6z" /><path d="m12 9.5-3 3h2v2h2v-2h2z" /></svg>;
        case 'settings':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="m12 3.8 1.2 1.8 2.1.4.4 2.1 1.8 1.2-1.8 1.2-.4 2.1-2.1.4-1.2 1.8-1.2-1.8-2.1-.4-.4-2.1-1.8-1.2 1.8-1.2.4-2.1 2.1-.4z" /><circle cx="12" cy="10.8" r="2.2" /></svg>;
        case 'sword':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="m3 21 1.5-1.5M7.5 16.5l-3 3M19 5l-9 9 1 1-1 1-1-1-9 9M15 5l2-2 4 4-2 2M15 5l6 6" /></svg>;
        case 'dagger':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="m18 6-3 3 5 5-2 2-7-7-1 1" /><path d="M3 21l3-3M6.5 14.5l3 3" /></svg>;
        case 'robe':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M12 21h-2l-3-11-2 2V4h14v8l-2-2-3 11z" /><path d="M12 4v17M7 10h10" /></svg>;
        case 'outer':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M20 4H4v16h16V4z" /><path d="M12 4v16M4 12h16" /></svg>;
        case 'waist':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M6 8h12v4H6z" /><path d="M12 10h4M8 10h4" /><circle cx="12" cy="10" r="1.5" /></svg>;
        case 'legs':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M8 4l-1 16h2l1-7 1 7h2l-1-16z" /></svg>;
        case 'feet':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M4 18l3-2h4l1 2h8v2H4z" /></svg>;
        case 'back':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M6 6h12v12H6z" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>;
        case 'gameplay':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="m6 12 3-3 3 3-3 3-3-3zM15 12l3-3 3 3-3 3-3-3z" /></svg>;
        case 'tavern':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" /></svg>;
        case 'sparkle':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" /></svg>;
        case 'link':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;
        case 'atmosphere':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M17.5 19a3.5 3.5 0 1 1-5.1-3.3c.1-1.4 1.1-2.6 2.5-2.7h.2c1.8 0 3.3 1.5 3.3 3.3 0 .3 0 .5-.1.7z" /></svg>;
        case 'customization':
        case 'theme':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M12 19h7M10.4 12.6l4.2 4.2M18.9 7l-9.9 9.9-4.2-4.2 9.9-9.9c.8-.8 2-.8 2.8 0l1.4 1.4c.8.8.8 2 0 2.8z" /></svg>;
        case 'dice':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="8.5" cy="8.5" r="1.2" /><circle cx="15.5" cy="15.5" r="1.2" /><circle cx="12" cy="12" r="1.2" /></svg>;
        case 'heart':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M19 14c1.5-1.5 3-3.2 3-5.5a5.5 5.5 0 0 0-11-0c0-2-3-5.5-5.5-5.5A5.5 5.5 0 1 0 2 11c0 4.5 9 10 10 10 1 0 10-5.5 10-10" /></svg>;
        case 'status':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M3 13h4.5l1.5-3 3 6 1.5-3H18M21 13h-3" /></svg>;
        case 'bolt':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M13 3l-7 9h6l-1 9 7-9h-6l1-9z" /></svg>;
        case 'food':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M18 8a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8z" /><path d="M12 13v6M9 21h6" /></svg>;
        case 'drop':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M12 2.5C12 2.5 5 11.5 5 16.5A7 7 0 0 0 19 16.5C19 11.5 12 2.5 12 2.5Z" /></svg>;
        case 'location':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.1 11.5 7.4 11.7.2.2.5.3.6.3s.4-.1.6-.3c.3-.2 7.4-6.3 7.4-11.7a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></svg>;
        case 'close':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M18 6L6 18M6 6l12 12" /></svg>;
        case 'flower':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5z" /><path d="M12 7.5V2M12 22v-5.5M7.5 12H2M22 12h-5.5M15.2 8.8l3.9-3.9M4.9 19.1l3.9-3.9M15.2 15.2l3.9 3.9M4.9 4.9l3.9 3.9" /></svg>;
        case 'network':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><circle cx="12" cy="12" r="3" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><path d="M17.3 6.7l-3.6 3.6M6.7 17.3l3.6-3.6" /><circle cx="19" cy="19" r="2" /><circle cx="5" cy="5" r="2" /><path d="M17.3 17.3l-3.6-3.6M6.7 6.7l3.6-3.6" /></svg>;
        case 'import':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>;
        case 'user':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
        case 'search':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
        case 'shield':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
        case 'bow':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M6 18c1-3 1-9 0-12m12 12c-1-3-1-9 0-12M6 6c3 0 9 0 12 0l-12 12c3 0 9 0 12 0" /><path d="M12 12h8" /></svg>;
        case 'box':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></svg>;
        case 'briefcase':
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
        case 'archive':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgClass}>
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
            );
        case 'lightning':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgClass}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
            );
        case 'pin':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgClass}>
                    <path d="M21 10V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l2-1.14"></path>
                    <path d="M16.5 9.4L7.5 4.21"></path>
                    <path d="M21 16V8"></path>
                    <path d="M3 8v8"></path>
                    <circle cx="18" cy="18" r="3"></circle>
                </svg>
            );
        case 'book':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgClass}>
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            );
        case 'temple':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgClass}>
                    <path d="M3 21h18"></path>
                    <path d="M10 21V13h4v8"></path>
                    <path d="M19 21v-8a1 1 0 00-1-1H6a1 1 0 00-1 1v8"></path>
                    <path d="M4 12V8a1 1 0 011-1h14a1 1 0 011 1v4"></path>
                    <path d="M12 3l-8 4h16l-8-4z"></path>
                </svg>
            );
        case 'gem':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgClass}>
                    <path d="M6 3h12l4 6-10 12L2 9z"></path>
                    <path d="M11 3L8 9l3 12"></path>
                    <path d="M13 3l3 9-3 9"></path>
                    <path d="M2 9h20"></path>
                </svg>
            );
        case 'check':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={svgClass}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            );
        case 'grid':
        default:
            return <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={strokeWidth}><rect x="5" y="5" width="5.5" height="5.5" /><rect x="13.5" y="5" width="5.5" height="5.5" /><rect x="5" y="13.5" width="5.5" height="5.5" /><rect x="13.5" y="13.5" width="5.5" height="5.5" /></svg>;
    }
};

export default IconGlyph;
