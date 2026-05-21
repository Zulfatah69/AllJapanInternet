'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer
            className="mt-0 relative"
            style={{
                background: 'var(--theme-footer)',
                color: '#fff',
                boxShadow: `inset 0 1px 0 var(--theme-glow)`,
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-14 md:py-16 text-center">
                <h2 className="font-display text-2xl md:text-3xl mb-2">
                    All Japan Internet
                </h2>
                <p
                    className="text-sm md:text-base mb-6 opacity-80"
                    style={{ color: 'var(--theme-secondary)' }}
                >
                    {t('footerTagline')}
                </p>
                <p className="text-xs opacity-60">
                    © {year} All Japan Internet. {t('footerRights')}
                </p>
            </div>
        </footer>
    );
}
