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
    const [hoveredIndex, setHoveredIndex] = useState(0);

    const ActiveIcon = benefits[hoveredIndex].icon;

    return (
        <section
            id="benefits"
            className="py-12 md:py-16 px-6 premium-mesh relative overflow-hidden scroll-mt-20"
        >
            {/* Ambient background glows */}
            <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20" style={{ background: 'var(--theme-primary)' }} />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20" style={{ background: 'var(--theme-secondary)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeader
                    eyebrow={t('benefitsEyebrow')}
                    title={t('benefitsTitle')}
                    subtitle={t('benefitsSubtitle')}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12 md:mt-20">
                    
                    {/* Left Column: Interactive Glowing Orbital Sphere */}
                    <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-36 relative py-6 lg:py-0 w-full select-none">
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center orbit-showcase-container">
                            
                            {/* Outer spin rings */}
                            <div className="absolute w-full h-full rounded-full orbit-ring-outer" />
                            <div className="absolute w-5/6 h-5/6 rounded-full orbit-ring-inner border-spacing-2" />
                            
                            {/* Orbit path node dots */}
                            <div className="absolute w-full h-full rounded-full animate-[spin_40s_linear_infinite] opacity-60">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[var(--theme-primary)] shadow-[0_0_12px_var(--theme-primary)]" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--theme-secondary)] shadow-[0_0_10px_var(--theme-secondary)]" />
                            </div>

                            {/* Core Glowing Glass Orb */}
                            <div className="absolute w-1/2 h-1/2 rounded-full orbit-glass-core flex items-center justify-center">
                                {/* Inner glow radial gradient aura */}
                                <div 
                                    className="absolute inset-3 rounded-full blur-md opacity-35 animate-[pulse_4s_ease-in-out_infinite]"
                                    style={{ background: 'var(--theme-primary)' }}
                                />
                                
                                {/* Dynamic active icon container with key trigger to restart entry animation */}
                                <div 
                                    key={hoveredIndex} 
                                    className="animate-scale-in relative z-10 text-4xl sm:text-5xl"
                                >
                                    <ActiveIcon style={{ color: 'var(--foreground)' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Cardless Typographic List */}
                    <div className="lg:col-span-7 flex flex-col w-full">
                        {benefits.map((item, index) => {
                            const num = String(index + 1).padStart(2, '0');
                            const descKey = `${item.key}desc`;
                            const isActive = hoveredIndex === index;

                            return (
                                <article
                                    key={item.key}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onClick={() => setHoveredIndex(index)}
                                    className={`
                                        cardless-benefit-item
                                        flex gap-6 md:gap-8
                                        p-6 md:p-8
                                        cursor-pointer
                                        items-start
                                        ${isActive ? 'cardless-benefit-item-active' : ''}
                                    `}
                                >
                                    <span className="benefit-list-num">
                                        {num}
                                    </span>

                                    <div className="flex-1 space-y-2">
                                        <h3
                                            className="font-display font-extrabold text-lg sm:text-xl transition-colors duration-300"
                                            style={{ 
                                                color: isActive ? 'var(--theme-primary-hover)' : 'var(--foreground)'
                                            }}
                                        >
                                            {t(item.key)}
                                        </h3>
                                        <p
                                            className="text-sm sm:text-base leading-relaxed transition-colors duration-300 font-medium"
                                            style={{ 
                                                color: isActive ? 'var(--foreground)' : 'var(--theme-muted)',
                                                opacity: isActive ? 1 : 0.8
                                            }}
                                        >
                                            {t(descKey)}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
