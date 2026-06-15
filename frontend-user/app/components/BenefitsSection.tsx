'use client';

import { useState } from 'react';
import {
    FaShieldAlt,
    FaPercent,
    FaHeadset,
    FaWallet,
    FaGlobeAsia,
    FaCoins,
} from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';
import SectionHeader from './SectionHeader';
import ScrollReveal from './ScrollReveal';

const benefits = [
    { icon: FaShieldAlt, key: 'benefit1' },
    { icon: FaPercent, key: 'benefit2' },
    { icon: FaHeadset, key: 'benefit3' },
    { icon: FaWallet, key: 'benefit4' },
    { icon: FaGlobeAsia, key: 'benefit5' },
    { icon: FaCoins, key: 'benefit6' },
];

export default function BenefitsSection() {
    const { t } = useLanguage();

    return (
        <section
            id="benefits"
            className="py-12 md:py-16 px-6 relative overflow-hidden scroll-mt-20"
        >
            {/* Ambient background glows */}
            <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-10" style={{ background: 'var(--theme-primary)' }} />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-10" style={{ background: 'var(--theme-secondary)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal>
                    <SectionHeader
                        eyebrow={t('benefitsEyebrow')}
                        title={t('benefitsTitle')}
                        subtitle={t('benefitsSubtitle')}
                    />
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 md:mt-16">
                    {benefits.map((item, index) => {
                        const Icon = item.icon;
                        const descKey = `${item.key}desc`;

                        return (
                            <ScrollReveal key={item.key} delay={index * 0.1} className="h-full">
                                <article
                                    className="h-full flex flex-col p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group bg-white"
                                    style={{ 
                                        borderColor: 'color-mix(in srgb, var(--theme-primary) 15%, transparent)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                                    }}
                                >
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 text-white"
                                        style={{ 
                                            background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                                            boxShadow: '0 4px 12px var(--theme-glow)'
                                        }}
                                    >
                                        <Icon className="text-2xl" />
                                    </div>

                                    <h3
                                        className="font-display font-extrabold text-xl mb-3"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        {t(item.key)}
                                    </h3>
                                    
                                    <p
                                        className="text-sm leading-relaxed font-medium flex-1"
                                        style={{ color: 'var(--theme-muted)' }}
                                    >
                                        {t(descKey)}
                                    </p>
                                </article>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
