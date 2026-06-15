'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import SectionHeader from './SectionHeader';
import { FaUsers, FaShippingFast, FaCheckCircle, FaHeadset } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
    const { t, theme, language } = useLanguage();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Theme-specific configuration for all 4 concepts
    const themeConfig = {
        spring: {
            bgGradient: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 50%, #FFF5F7 100%)',
            accentLight: '#FFB6D9',
            accentMid: '#FF69B4',
            accentDark: '#EC407A',
            glowColor: 'rgba(255, 105, 180, 0.25)',
            badgeBg: 'rgba(255, 182, 217, 0.15)',
            badgeBorder: 'rgba(255, 105, 180, 0.2)',
        },
        summer: {
            bgGradient: 'linear-gradient(135deg, #FFFDEB 0%, #FFFBEB 50%, #F0FDF4 100%)',
            accentLight: '#FEF08A',
            accentMid: '#EAB308',
            accentDark: '#854D0E',
            glowColor: 'rgba(234, 179, 8, 0.2)',
            badgeBg: 'rgba(254, 240, 138, 0.15)',
            badgeBorder: 'rgba(234, 179, 8, 0.2)',
        },
        autumn: {
            bgGradient: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FDF4E3 100%)',
            accentLight: '#FDBA74',
            accentMid: '#EA580C',
            accentDark: '#9A3412',
            glowColor: 'rgba(234, 88, 12, 0.22)',
            badgeBg: 'rgba(253, 186, 116, 0.15)',
            badgeBorder: 'rgba(234, 88, 12, 0.2)',
        },
        winter: {
            bgGradient: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #F8FAFC 100%)',
            accentLight: '#BAE6FD',
            accentMid: '#38BDF8',
            accentDark: '#0369A1',
            glowColor: 'rgba(56, 189, 248, 0.25)',
            badgeBg: 'rgba(186, 230, 253, 0.15)',
            badgeBorder: 'rgba(56, 189, 248, 0.2)',
        },
    };

    const currentTheme = themeConfig[theme as keyof typeof themeConfig] || themeConfig.winter;

    // Stat data with dual language support
    const stats = [
        {
            icon: FaUsers,
            title: language === 'id' ? '10,000+ Pelanggan' : '10,000+ Customers',
            desc: language === 'id' ? 'Warga Negara Indonesia terhubung di Jepang' : 'Indonesian citizens connected across Japan',
        },
        {
            icon: FaShippingFast,
            title: language === 'id' ? '1 Hari Express COD' : '1-Day Express COD',
            desc: language === 'id' ? 'Pengiriman kilat untuk wilayah Kanto' : 'Super fast delivery for Kanto area',
        },
        {
            icon: FaCheckCircle,
            title: language === 'id' ? 'Tanpa Kontrak & Deposit' : 'No Contract & Deposit',
            desc: language === 'id' ? 'Bebas biaya jaminan dan denda pemutusan' : 'Zero hidden guarantee fees or cancel penalties',
        },
        {
            icon: FaHeadset,
            title: language === 'id' ? 'CS Bahasa Indonesia' : 'Indonesian CS Support',
            desc: language === 'id' ? 'Bantuan teknis ramah dan responsif setiap hari' : 'Daily responsive technical help in your language',
        },
    ];

    return (
        <section
            id="about"
            className="py-12 md:py-16 px-6 relative overflow-hidden scroll-mt-20"
            style={{ background: currentTheme.bgGradient }}
        >
            {/* FLOATING SEASONAL PARTICLES - High-end dynamic ambient effect */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
                {isMounted && theme === 'spring' && (
                    <>
                        {/* Sakura Petals */}
                        {[...Array(12)].map((_, i) => (
                            <svg
                                key={`petal-${i}`}
                                className="absolute opacity-80"
                                style={{
                                    left: `${5 + Math.random() * 90}%`,
                                    top: `-50px`,
                                    width: `${12 + Math.random() * 14}px`,
                                    height: `${12 + Math.random() * 14}px`,
                                    fill: currentTheme.accentMid,
                                    animation: `float-sakura ${8 + Math.random() * 7}s linear infinite`,
                                    animationDelay: `${Math.random() * 8}s`,
                                }}
                                viewBox="0 0 30 30"
                            >
                                <path d="M15 0 C25 10, 25 20, 15 30 C5 20, 5 10, 15 0" />
                            </svg>
                        ))}
                    </>
                )}

                {isMounted && theme === 'winter' && (
                    <>
                        {/* Snowflakes */}
                        {[...Array(16)].map((_, i) => (
                            <div
                                key={`snow-${i}`}
                                className="absolute rounded-full bg-white opacity-70"
                                style={{
                                    left: `${5 + Math.random() * 90}%`,
                                    top: `-20px`,
                                    width: `${4 + Math.random() * 6}px`,
                                    height: `${4 + Math.random() * 6}px`,
                                    boxShadow: `0 0 8px #fff`,
                                    animation: `float-snow ${7 + Math.random() * 6}s linear infinite`,
                                    animationDelay: `${Math.random() * 6}s`,
                                }}
                            />
                        ))}
                    </>
                )}

                {isMounted && theme === 'autumn' && (
                    <>
                        {/* Autumn Leaves */}
                        {[...Array(10)].map((_, i) => (
                            <svg
                                key={`leaf-${i}`}
                                className="absolute opacity-80"
                                style={{
                                    left: `${5 + Math.random() * 90}%`,
                                    top: `-50px`,
                                    width: `${16 + Math.random() * 12}px`,
                                    height: `${16 + Math.random() * 12}px`,
                                    fill: currentTheme.accentMid,
                                    animation: `float-leaf ${9 + Math.random() * 8}s linear infinite`,
                                    animationDelay: `${Math.random() * 8}s`,
                                }}
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C11.5 4 8.5 7 7 9C5.5 11 3 12 3 13.5C3 15.5 5 17 7 17C9 17 11 15 12 13.5C13 15 15 17 17 17C19 17 21 15.5 21 13.5C21 12 18.5 11 17 9C15.5 7 12.5 4 12 2Z" />
                            </svg>
                        ))}
                    </>
                )}

                {isMounted && theme === 'summer' && (
                    <div className="absolute inset-0 opacity-20 overflow-hidden">
                        {/* Sunbeams radiating from top right */}
                        <div
                            className="absolute -top-[20%] -right-[20%] w-[100%] aspect-square rounded-full mix-blend-screen"
                            style={{
                                background: `radial-gradient(circle, ${currentTheme.accentLight} 0%, transparent 70%)`,
                                animation: 'sunbeam-pulse 10s ease-in-out infinite',
                            }}
                        />
                        <div
                            className="absolute -top-[10%] -right-[10%] w-[80%] aspect-square rounded-full mix-blend-screen"
                            style={{
                                background: `radial-gradient(circle, ${currentTheme.accentMid} 0%, transparent 60%)`,
                                animation: 'sunbeam-pulse 12s ease-in-out infinite',
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Subtle background landscape - Fuji or waves depending on theme */}
            <svg
                className="absolute inset-x-0 bottom-0 w-full h-[30%] opacity-[0.06] pointer-events-none z-0"
                viewBox="0 0 1440 300"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,224L120,202.7C240,181,480,139,720,138.7C960,139,1200,181,1320,202.7L1440,224L1440,300L1320,300C1200,300,960,300,720,300C480,300,240,300,120,300L0,300Z"
                    fill={currentTheme.accentMid}
                />
            </svg>

            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal>
                    <SectionHeader
                        eyebrow={t('aboutEyebrow')}
                        title={t('aboutTitle')}
                        subtitle={t('aboutTagline')}
                    />
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center mt-12">
                    {/* Left Column: Glassmorphic Content Card */}
                    <ScrollReveal direction="right" delay={0.2} className="lg:col-span-6">
                        <div
                            className="p-8 md:p-12 space-y-6 text-left premium-glass-card border border-white/40 shadow-xl h-full"
                            style={{
                                boxShadow: `0 20px 50px -12px ${currentTheme.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
                            }}
                        >
                            <div className="space-y-4">
                                <p
                                    className="text-lg md:text-xl font-bold tracking-tight leading-snug"
                                    style={{ color: currentTheme.accentDark }}
                                >
                                    {t('aboutIntro')}
                                </p>
                                <div className="h-0.5 w-16" style={{ background: currentTheme.accentMid }} />
                            </div>
                            <p
                                className="text-base md:text-lg leading-relaxed font-medium"
                                style={{ color: 'var(--theme-muted)' }}
                            >
                                {t('aboutBody')}
                            </p>
                            <p
                                className="text-base md:text-lg leading-relaxed font-medium"
                                style={{ color: 'var(--theme-muted)' }}
                            >
                                {t('aboutClosing')}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Right Column: Dynamic Concept Stats Dashboard */}
                    <ScrollReveal direction="left" delay={0.4} className="lg:col-span-6">
                        <div className="flex flex-col items-center justify-center space-y-8 h-full">
                            {/* Custom Premium Logo Showcase */}
                            <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md shadow-lg border border-white/60 overflow-hidden group hover:scale-[1.03] transition-all duration-300">
                                {/* Rotating delicate halo background */}
                                <div
                                    className="absolute -inset-1.5 rounded-full border border-dashed opacity-35 animate-spin"
                                    style={{
                                        borderColor: currentTheme.accentMid,
                                        animationDuration: '35s',
                                    }}
                                />
                                <img
                                    src="/images/logoaji.png"
                                    alt="All Japan Internet Logo"
                                    className="w-full h-full object-cover rounded-full filter drop-shadow-sm transition-transform duration-700 group-hover:rotate-[360deg]"
                                />
                            </div>

                            {/* Stat Badges Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                {stats.map((stat, i) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div
                                            key={`stat-${i}`}
                                            className="p-5 flex items-start gap-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] bg-white/70 backdrop-blur-md"
                                            style={{
                                                borderColor: currentTheme.badgeBorder,
                                                boxShadow: `0 4px 20px rgba(0,0,0,0.02)`,
                                            }}
                                        >
                                            <div
                                                className="p-3 rounded-lg text-white shrink-0"
                                                style={{
                                                    background: `linear-gradient(135deg, ${currentTheme.accentMid} 0%, ${currentTheme.accentDark} 100%)`,
                                                    boxShadow: `0 6px 16px ${currentTheme.glowColor}`,
                                                }}
                                            >
                                                <Icon className="text-lg" />
                                            </div>
                                            <div className="space-y-1 text-left">
                                                <h4
                                                    className="font-display font-bold text-sm leading-tight"
                                                    style={{ color: 'var(--foreground)' }}
                                                >
                                                    {stat.title}
                                                </h4>
                                                <p className="text-xs leading-normal text-slate-500 font-medium">
                                                    {stat.desc}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
