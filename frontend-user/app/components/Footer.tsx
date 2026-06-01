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
            <div className="max-w-7xl mx-auto px-6 py-8 md:py-10 text-center">
                <h2 className="font-display text-xl md:text-2xl mb-1">
                    All Japan Internet
                </h2>
                <p
                    className="text-xs md:text-sm mb-4 opacity-80"
                    style={{ color: 'var(--theme-secondary)' }}
                >
                    {t('footerTagline')}
                </p>
                <p className="text-[11px] md:text-xs opacity-60">
                    © {year} All Japan Internet. {t('footerRights')}
                </p>
            </div>
        </footer>
    );
}
