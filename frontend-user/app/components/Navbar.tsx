'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
    { href: '/#', labelKey: 'beranda' },
    { href: '/#about', labelKey: 'tentangKami' },
    { href: '/#products', labelKey: 'produk' },
    { href: '/#benefits', labelKey: 'keunggulan' },
    { href: '/#howto', labelKey: 'caraOrder' },
    { href: '/#payment', labelKey: 'caraPembayaran' },
    { href: '/#guide', labelKey: 'bukuPanduan' },
    { href: '/#shipping', labelKey: 'waktuPengiriman' },
    { href: '/#faq', labelKey: 'qna' },
    { href: '/#contact', labelKey: 'kontak' },
];

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Disable body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show/hide on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Change background at scroll threshold
            setIsScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`
            fixed top-0 left-0 w-full z-50
            transition-all duration-300 ease-out
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            ${isScrolled 
                ? 'premium-glass-nav-solid' 
                : 'premium-glass-nav-transparent'
            }
        `}>
            {/* Desktop Navbar (xl:flex, hidden on mobile/tablet) */}
            <div className="hidden xl:flex w-full px-8 py-4 items-center justify-between">
                {/* Left: Logo */}
                <Link href="/#" className="flex items-center gap-3 shrink-0 group hover:scale-105 transition-transform duration-300">
                    <img
                        src="/images/logoaji.png"
                        alt="All Japan Internet"
                        className="w-11 h-11 rounded-full object-cover border border-black/10 shadow-md group-hover:shadow-lg transition-shadow"
                    />
                    <h1
                        className="font-display text-lg leading-tight font-bold tracking-tight transition-colors duration-300"
                        style={{ color: 'var(--foreground)' }}
                    >
                        <span className="inline 2xl:hidden">AJI</span>
                        <span className="hidden 2xl:inline">AllJapanInternet</span>
                    </h1>
                </Link>

                {/* Centered links with responsive spacing and font sizes to prevent overlap and ensure consistency */}
                <div className="flex flex-1 justify-center items-center gap-4 2xl:gap-6 text-xs 2xl:text-sm font-medium px-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="relative whitespace-nowrap transition-all duration-300 hover:opacity-70"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {t(link.labelKey)}
                        </a>
                    ))}
                </div>

                {/* Right: Language Selector */}
                <div className="flex items-center gap-1 rounded-full p-1 bg-black/5 shrink-0 backdrop-blur-sm">
                    <button
                        type="button"
                        onClick={() => setLanguage('id')}
                        className={`premium-lang-pill transition-all duration-300 transform hover:scale-105 active:scale-95 ${language === 'id' ? 'active' : 'inactive'}`}
                    >
                        ID
                    </button>
                    <button
                        type="button"
                        onClick={() => setLanguage('en')}
                        className={`premium-lang-pill transition-all duration-300 transform hover:scale-105 active:scale-95 ${language === 'en' ? 'active' : 'inactive'}`}
                    >
                        EN
                    </button>
                </div>
            </div>

            {/* Mobile/Tablet Navbar (xl:hidden, perfectly spaced flex layout) */}
            <div className="xl:hidden flex justify-between items-center px-5 py-3.5 w-full">
                {/* Left Side: Logo & Brand Title */}
                <Link href="/#" className="flex items-center gap-2.5 shrink-0">
                    <img
                        src="/images/logoaji.png"
                        alt="All Japan Internet"
                        className="w-10 h-10 rounded-full object-cover border border-black/10"
                    />
                    <h1
                        className="font-display text-base leading-tight font-bold"
                        style={{ color: 'var(--foreground)' }}
                    >
                        AJI
                    </h1>
                </Link>

                {/* Right Side: Language Switcher & Hamburger Toggle Button */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-0.5 rounded-full p-0.5 bg-black/5 text-2xs scale-95 origin-right">
                        <button
                            type="button"
                            onClick={() => setLanguage('id')}
                            className={`premium-lang-pill py-1 px-2.5 text-[10px] ${language === 'id' ? 'active' : 'inactive'}`}
                        >
                            ID
                        </button>
                        <button
                            type="button"
                            onClick={() => setLanguage('en')}
                            className={`premium-lang-pill py-1 px-2.5 text-[10px] ${language === 'en' ? 'active' : 'inactive'}`}
                        >
                            EN
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="p-2 rounded-xl hover:bg-black/5 transition-colors text-lg"
                        style={{ color: 'var(--foreground)' }}
                        aria-label="Open menu"
                    >
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Sliding Drawer Menu for Mobile */}
            {/* Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer Container */}
            <div
                className={`
                    fixed top-0 right-0 h-full w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl z-50
                    transform transition-transform duration-300 ease-out flex flex-col p-6
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-6">
                    <span className="font-display font-bold text-sm tracking-wide text-slate-400">MENU</span>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-black/5 text-lg transition-colors"
                        style={{ color: 'var(--foreground)' }}
                        aria-label="Close menu"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Drawer Links */}
                <div className="flex flex-col gap-2 flex-1 pb-10 overflow-y-auto">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="py-3 px-4 rounded-xl text-base font-bold transition-all duration-300"
                            style={{ 
                                color: 'var(--foreground)',
                                background: 'color-mix(in srgb, var(--theme-primary) 3%, transparent)'
                            }}
                        >
                            {t(link.labelKey)}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
