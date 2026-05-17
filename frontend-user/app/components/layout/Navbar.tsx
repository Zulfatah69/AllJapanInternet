'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

import { storageUrl } from '../../lib/utils';
import { GlobalSearch } from '../search/GlobalSearch';
import { useApp } from '../../providers/AppProvider';

const NAV_IDS = [
    'home',
    'products',
    'providers',
    'about',
    'benefits',
    'how-to-order',
    'guidebook',
    'testimonials',
    'tracking',
    'contact',
] as const;

export default function Navbar() {
    const { copy, locale, setLocale, settings } = useApp();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLabels: Record<string, string> = {
        home: copy.nav.home,
        products: copy.nav.products,
        providers: copy.nav.providers,
        about: copy.nav.about,
        benefits: copy.nav.benefits,
        'how-to-order': copy.nav.howToOrder,
        guidebook: copy.nav.guidebook,
        testimonials: copy.nav.testimonials,
        tracking: copy.nav.tracking,
        contact: copy.nav.contact,
    };

    const logo = storageUrl(settings?.logo);

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${
                scrolled ? 'glass-nav' : 'border-b border-transparent'
            }`}
            style={
                scrolled
                    ? undefined
                    : {
                          background:
                              'linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 85%, transparent), transparent)',
                      }
            }
        >
            <div className="container-aji flex items-center justify-between py-4">
                <Link href="/" className="flex items-center gap-3">
                    {logo ? (
                        <img src={logo} alt={settings?.website_name || 'AJI'} className="h-9 w-auto" />
                    ) : (
                        <span className="text-xl font-bold tracking-tight">
                            {settings?.website_name || 'AJI'}
                        </span>
                    )}
                </Link>

                <nav className="hidden items-center gap-6 lg:flex">
                    {NAV_IDS.slice(0, 6).map((id) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className="text-sm font-medium transition-colors hover:opacity-70"
                        >
                            {navLabels[id]}
                        </a>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <GlobalSearch />
                    <select
                        value={locale}
                        onChange={(e) => setLocale(e.target.value as 'en' | 'ja')}
                        className="rounded-full border bg-transparent px-3 py-1.5 text-sm"
                        style={{ borderColor: 'var(--border)' }}
                        aria-label={copy.footer.language}
                    >
                        <option value="en">EN</option>
                        <option value="ja">JA</option>
                    </select>
                </div>

                <button
                    type="button"
                    className="rounded-xl border p-2 lg:hidden"
                    style={{ borderColor: 'var(--border)' }}
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                >
                    {open ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-nav border-t lg:hidden"
                    >
                        <div className="container-aji flex flex-col gap-3 py-4">
                            {NAV_IDS.map((id) => (
                                <a
                                    key={id}
                                    href={`#${id}`}
                                    onClick={() => setOpen(false)}
                                    className="py-2 text-sm font-medium"
                                >
                                    {navLabels[id]}
                                </a>
                            ))}
                            <select
                                value={locale}
                                onChange={(e) => setLocale(e.target.value as 'en' | 'ja')}
                                className="mt-2 w-full rounded-full border px-3 py-2 text-sm"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                <option value="en">English</option>
                                <option value="ja">日本語</option>
                            </select>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
