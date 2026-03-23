import type { ThemePreset } from '../types';
import { themes as themeDataList } from '../data/themes';

// Helpers for generating CSS variable values from hex colors
function hexToRgbStr(hex: string): string {
    const h = (hex || '#000000').replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return '0 0 0';
    return `${r} ${g} ${b}`;
}

function darkenRgbStr(hex: string, factor = 0.55): string {
    const h = (hex || '#000000').replace('#', '');
    const r = Math.round(parseInt(h.substring(0, 2), 16) * factor);
    const g = Math.round(parseInt(h.substring(2, 4), 16) * factor);
    const b = Math.round(parseInt(h.substring(4, 6), 16) * factor);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return '0 0 0';
    return `${r} ${g} ${b}`;
}

function getLuminance(hex: string): number {
    const h = (hex || '#000000').replace('#', '');
    const r = parseInt(h.substring(0, 2), 16) / 255;
    const g = parseInt(h.substring(2, 4), 16) / 255;
    const b = parseInt(h.substring(4, 6), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

function generateThemeVars(colors: string[]): Record<string, string> {
    const bg1 = colors[0] || '#050505';
    const bg2 = colors[1] || '#1A1A1A';
    const accent1 = colors[2] || '#E6C86E';
    const accent2 = colors[3] || '#44AAAA';
    const isLightBg = getLuminance(bg1) > 0.5;
    return {
        '--c-ink-black': hexToRgbStr(bg1),
        '--c-ink-gray': hexToRgbStr(bg2),
        '--c-wuxia-gold': hexToRgbStr(accent1),
        '--c-wuxia-gold-dark': darkenRgbStr(accent1),
        '--c-wuxia-cyan': hexToRgbStr(accent2),
        '--c-wuxia-red': isLightBg ? '163 24 24' : '200 60 60',
        '--c-paper-white': isLightBg ? '30 30 40' : '230 230 230',
    };
}

const STATIC_THEMES: Partial<Record<ThemePreset, Record<string, string>>> = {
    ink: {
        '--c-ink-black': '5 5 5',
        '--c-ink-gray': '26 26 26',
        '--c-wuxia-gold': '230 200 110', // Classic Gold
        '--c-wuxia-gold-dark': '138 114 54',
        '--c-wuxia-cyan': '68 170 170',
        '--c-wuxia-red': '163 24 24',
        '--c-paper-white': '230 230 230',
    },
    azure: {
        '--c-ink-black': '2 18 12',
        '--c-ink-gray': '12 38 28',
        '--c-wuxia-gold': '60 235 150',
        '--c-wuxia-gold-dark': '30 110 60',
        '--c-wuxia-cyan': '180 240 220',
        '--c-wuxia-red': '163 24 24',
        '--c-paper-white': '225 255 242',
    },
    blood: {
        '--c-ink-black': '20 5 5',
        '--c-ink-gray': '45 15 15',
        '--c-wuxia-gold': '255 80 80',
        '--c-wuxia-gold-dark': '150 30 30',
        '--c-wuxia-cyan': '255 200 200',
        '--c-wuxia-red': '255 50 50',
        '--c-paper-white': '255 240 240',
    },
    violet: {
        '--c-ink-black': '12 5 20',
        '--c-ink-gray': '28 15 45',
        '--c-wuxia-gold': '180 120 255',
        '--c-wuxia-gold-dark': '100 60 180',
        '--c-wuxia-cyan': '220 200 255',
        '--c-wuxia-red': '255 50 150',
        '--c-paper-white': '245 240 255',
    },
    jade: {
        '--c-ink-black': '5 20 15',
        '--c-ink-gray': '15 40 30',
        '--c-wuxia-gold': '120 255 180',
        '--c-wuxia-gold-dark': '60 150 100',
        '--c-wuxia-cyan': '200 255 220',
        '--c-wuxia-red': '255 100 100',
        '--c-paper-white': '240 255 245',
    },
    frost: {
        '--c-ink-black': '5 15 25',
        '--c-ink-gray': '15 30 50',
        '--c-wuxia-gold': '150 220 255',
        '--c-wuxia-gold-dark': '80 140 180',
        '--c-wuxia-cyan': '220 245 255',
        '--c-wuxia-red': '255 120 150',
        '--c-paper-white': '245 250 255',
    },
    scarlet: {
        '--c-ink-black': '25 5 5',
        '--c-ink-gray': '50 15 15',
        '--c-wuxia-gold': '255 100 80',
        '--c-wuxia-gold-dark': '180 50 40',
        '--c-wuxia-cyan': '255 200 180',
        '--c-wuxia-red': '255 60 60',
        '--c-paper-white': '255 240 235',
    },
    sand: {
        '--c-ink-black': '20 18 10',
        '--c-ink-gray': '45 40 25',
        '--c-wuxia-gold': '255 220 150',
        '--c-wuxia-gold-dark': '180 150 80',
        '--c-wuxia-cyan': '255 240 200',
        '--c-wuxia-red': '255 120 80',
        '--c-paper-white': '255 250 240',
    }
};

// Generate CSS variable maps for extended themes (t1-t92) from data/themes.ts color arrays
const dynamicThemes: Partial<Record<ThemePreset, Record<string, string>>> = {};
for (const theme of themeDataList) {
    if (theme.id in STATIC_THEMES) continue;
    if (theme.colors && theme.colors.length >= 2) {
        dynamicThemes[theme.id] = generateThemeVars(theme.colors);
    }
}

export const THEMES: Partial<Record<ThemePreset, Record<string, string>>> = {
    ...STATIC_THEMES,
    ...dynamicThemes,
};