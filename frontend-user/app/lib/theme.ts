export type ThemeKey = 'spring' | 'summer' | 'autumn' | 'winter';

const ALIASES: Record<string, ThemeKey> = {
    spring: 'spring',
    sakura: 'spring',
    summer: 'summer',
    green: 'summer',
    'bright-green': 'summer',
    autumn: 'autumn',
    brown: 'autumn',
    winter: 'winter',
    'white-blue': 'winter',
    whiteblue: 'winter',
};

export function resolveThemeKey(raw?: string | null): ThemeKey {
    if (!raw) return 'spring';
    const key = raw.toLowerCase().trim();
    return ALIASES[key] ?? 'spring';
}

export const THEME_LABELS: Record<ThemeKey, { en: string; ja: string }> = {
    spring: { en: 'Sakura', ja: '桜' },
    summer: { en: 'Bright Green', ja: 'グリーン' },
    autumn: { en: 'Brown', ja: 'ブラウン' },
    winter: { en: 'White Blue', ja: 'ホワイトブルー' },
};

export function applyTheme(theme: ThemeKey) {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
}
