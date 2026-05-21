export type ThemeType = 'winter' | 'spring' | 'summer' | 'autumn';

export function normalizeTheme(raw: string | undefined | null): ThemeType {
    const value = (raw ?? 'winter').toLowerCase();
    if (value === 'fall') return 'autumn';
    if (['winter', 'spring', 'summer', 'autumn'].includes(value)) {
        return value as ThemeType;
    }
    return 'winter';
}

export function parseSettingsTheme(settings: unknown): ThemeType {
    if (!settings || typeof settings !== 'object') return 'winter';
    const obj = settings as Record<string, unknown>;
    const nested = obj.data as Record<string, unknown> | undefined;
    const theme =
        (nested?.theme as string) ??
        (obj.theme as string) ??
        (obj.tema as string);
    return normalizeTheme(theme);
}
