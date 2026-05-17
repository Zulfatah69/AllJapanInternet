/**
 * Backend admin stores exactly: spring | summer | autumn | winter
 * Visual mapping (frontend only):
 *   spring → Sakura
 *   summer → Bright Green
 *   autumn → Brown
 *   winter → Light Blue
 */
export type ThemeKey = 'spring' | 'summer' | 'autumn' | 'winter';

export const BACKEND_THEME_KEYS: ThemeKey[] = ['spring', 'summer', 'autumn', 'winter'];

/** Display names for admin theme values (read-only on storefront) */
export const THEME_DISPLAY: Record<ThemeKey, { en: string; ja: string }> = {
    spring: { en: 'Sakura', ja: '桜' },
    summer: { en: 'Bright Green', ja: 'ブライトグリーン' },
    autumn: { en: 'Brown', ja: 'ブラウン' },
    winter: { en: 'Light Blue', ja: 'ライトブルー' },
};

const ALIASES: Record<string, ThemeKey> = {
    spring: 'spring',
    sakura: 'spring',
    summer: 'summer',
    green: 'summer',
    'bright-green': 'summer',
    'bright green': 'summer',
    autumn: 'autumn',
    brown: 'autumn',
    winter: 'winter',
    'light-blue': 'winter',
    'light blue': 'winter',
    'white-blue': 'winter',
    whiteblue: 'winter',
};

export function resolveThemeKey(raw?: string | null): ThemeKey {
    if (!raw) return 'spring';
    const key = raw.toLowerCase().trim();
    return ALIASES[key] ?? 'spring';
}

export function applyTheme(theme: ThemeKey) {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
}

export function themeFromSettings(settings?: { theme?: string | null } | null): ThemeKey {
    return resolveThemeKey(settings?.theme);
}

/** @deprecated Use THEME_DISPLAY — themes are backend-controlled */
export const THEME_LABELS = THEME_DISPLAY;
