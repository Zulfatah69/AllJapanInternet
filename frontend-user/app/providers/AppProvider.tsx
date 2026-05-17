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
import { applyTheme, resolveThemeKey, type ThemeKey } from '../lib/theme';

type AppContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    themeKey: ThemeKey;
    setThemeKey: (theme: ThemeKey) => void;
    settings: any;
    setSettings: (settings: any) => void;
    copy: ReturnType<typeof t>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [themeKey, setThemeKeyState] = useState<ThemeKey>('spring');
    const [settings, setSettings] = useState<any>(null);

    const setLocale = useCallback((next: Locale) => {
        setLocaleState(next);
        if (typeof window !== 'undefined') {
            localStorage.setItem('aji-locale', next);
            document.documentElement.lang = next;
        }
    }, []);

    const setThemeKey = useCallback((next: ThemeKey) => {
        setThemeKeyState(next);
        applyTheme(next);
        if (typeof window !== 'undefined') {
            localStorage.setItem('aji-theme-override', next);
        }
    }, []);

    useEffect(() => {
        const savedLocale = localStorage.getItem('aji-locale') as Locale | null;
        if (savedLocale === 'en' || savedLocale === 'ja') {
            setLocaleState(savedLocale);
            document.documentElement.lang = savedLocale;
        }
        const savedTheme = localStorage.getItem('aji-theme-override') as ThemeKey | null;
        if (savedTheme) {
            setThemeKeyState(savedTheme);
            applyTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (settings?.theme) {
            const fromApi = resolveThemeKey(settings.theme);
            const override = localStorage.getItem('aji-theme-override') as ThemeKey | null;
            const active = override ?? fromApi;
            setThemeKeyState(active);
            applyTheme(active);
        }
    }, [settings?.theme]);

    const copy = useMemo(() => t(locale), [locale]);

    const value = useMemo(
        () => ({
            locale,
            setLocale,
            themeKey,
            setThemeKey,
            settings,
            setSettings,
            copy,
        }),
        [locale, setLocale, themeKey, setThemeKey, settings, copy],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}
