'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import { Locale, t } from '../lib/i18n';
import { getSettings } from '../services/settings.service';
import { applyTheme, themeFromSettings, type ThemeKey } from '../lib/theme';
import type { Settings } from '../types/api';

type AppContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    /** Current theme from backend settings (read-only) */
    theme: ThemeKey;
    settings: Settings | null;
    setSettings: (settings: Settings | null) => void;
    copy: ReturnType<typeof t>;
    settingsLoading: boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

function syncThemeFromSettings(settings: Settings | null) {
    const theme = themeFromSettings(settings);
    applyTheme(theme);
    return theme;
}

export function AppProvider({
    children,
    initialSettings = null,
}: {
    children: ReactNode;
    initialSettings?: Settings | null;
}) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [settings, setSettingsState] = useState<Settings | null>(initialSettings);
    const [theme, setTheme] = useState<ThemeKey>(() => themeFromSettings(initialSettings));
    const [settingsLoading, setSettingsLoading] = useState(!initialSettings);

    const setSettings = useCallback((next: Settings | null) => {
        setSettingsState(next);
        setTheme(syncThemeFromSettings(next));
    }, []);

    const setLocale = useCallback((next: Locale) => {
        setLocaleState(next);
        if (typeof window !== 'undefined') {
            localStorage.setItem('aji-locale', next);
            document.documentElement.lang = next;
        }
    }, []);

    useEffect(() => {
        localStorage.removeItem('aji-theme-override');

        const savedLocale = localStorage.getItem('aji-locale') as Locale | null;
        if (savedLocale === 'en' || savedLocale === 'ja') {
            setLocaleState(savedLocale);
            document.documentElement.lang = savedLocale;
        }

        if (initialSettings) {
            syncThemeFromSettings(initialSettings);
        }
    }, [initialSettings]);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setSettingsLoading(true);
            try {
                const data = await getSettings();
                if (!cancelled && data) {
                    setSettings(data);
                }
            } catch (e) {
                console.error('Failed to load settings', e);
            } finally {
                if (!cancelled) setSettingsLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [setSettings]);

    const copy = useMemo(() => t(locale), [locale]);

    const value = useMemo(
        () => ({
            locale,
            setLocale,
            theme,
            settings,
            setSettings,
            copy,
            settingsLoading,
        }),
        [locale, setLocale, theme, settings, setSettings, copy, settingsLoading],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}
