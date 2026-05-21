'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

const navLinks = [
    { href: '/#', labelKey: 'beranda' },
    { href: '/#products', labelKey: 'produk' },
    { href: '/#benefits', labelKey: 'keunggulan' },
    { href: '/#howto', labelKey: 'caraOrder' },
    { href: '/#guide', labelKey: 'bukuPanduan' },
    { href: '/#shipping', labelKey: 'waktuPengiriman' },
    { href: '/#contact', labelKey: 'kontak' },
];

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 premium-glass-nav">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center gap-4">
                <Link href="/#" className="flex items-center gap-3 shrink-0">
                    <img
                        src="/LOGO AJI.png"
                        alt="All Japan Internet"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-black/10"
                    />
                    <div>
                        <h1
                            className="font-display text-base md:text-lg leading-tight"
                            style={{ color: 'var(--foreground)' }}
                        >
                            AllJapanInternet
                        </h1>
                        <p
                            className="text-xs hidden sm:block"
                            style={{ color: 'var(--theme-muted)' }}
                        >
                            {t('tagline')}
                        </p>
                    </div>
                </Link>

                <div className="hidden lg:flex gap-5 text-sm font-medium">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="transition-colors duration-200 hover:opacity-80"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {t(link.labelKey)}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-1 rounded-full p-1 bg-black/5">
                    <button
                        type="button"
                        onClick={() => setLanguage('id')}
                        className={`premium-lang-pill ${language === 'id' ? 'active' : 'inactive'}`}
                    >
                        ID
                    </button>
                    <button
                        type="button"
                        onClick={() => setLanguage('en')}
                        className={`premium-lang-pill ${language === 'en' ? 'active' : 'inactive'}`}
                    >
                        EN
                    </button>
                </div>
            </div>
        </nav>
    );
}
