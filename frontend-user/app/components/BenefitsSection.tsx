'use client';

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
    { icon: FaShieldAlt, key: 'benefit1', slot: 1, featured: true },
    { icon: FaPercent, key: 'benefit2', slot: 2, featured: false },
    { icon: FaHeadset, key: 'benefit3', slot: 3, featured: false },
    { icon: FaWallet, key: 'benefit4', slot: 4, featured: false },
    { icon: FaGlobeAsia, key: 'benefit5', slot: 5, featured: false },
    { icon: FaCoins, key: 'benefit6', slot: 6, featured: false },
];

export default function BenefitsSection() {
    const { t } = useLanguage();

    return (
        <section
            id="benefits"
            className="py-20 md:py-28 px-6 premium-mesh"
        >
            <div className="max-w-7xl mx-auto premium-fade-up">
                <SectionHeader
                    eyebrow={t('benefitsEyebrow')}
                    title={t('benefitsTitle')}
                    subtitle={t('benefitsSubtitle')}
                />

                <div className="benefits-bento">
                    {benefits.map((item, index) => {
                        const Icon = item.icon;
                        const num = String(index + 1).padStart(2, '0');
                        const descKey = `${item.key}desc`;

                        return (
                            <article
                                key={item.key}
                                className={`
                                    benefit-slot-${item.slot}
                                    premium-card
                                    flex flex-col
                                    p-6 md:p-7
                                    min-h-[10.5rem]
                                    ${item.featured ? 'benefit-card-featured md:p-9' : ''}
                                `}
                            >
                                <div
                                    className={`flex items-start justify-between gap-3 ${item.featured ? 'mb-6' : 'mb-4'}`}
                                >
                                    <div
                                        className={`shrink-0 rounded-xl flex items-center justify-center text-white ${item.featured ? 'w-14 h-14 text-2xl' : 'w-11 h-11 text-lg'}`}
                                        style={{
                                            background: 'var(--theme-primary)',
                                            boxShadow: `0 8px 20px var(--theme-glow)`,
                                        }}
                                    >
                                        <Icon />
                                    </div>
                                    <span className="benefit-number leading-none">
                                        {num}
                                    </span>
                                </div>

                                <h3
                                    className={`font-display mb-2 ${item.featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {t(item.key)}
                                </h3>

                                <p
                                    className={`leading-relaxed flex-1 ${item.featured ? 'text-sm md:text-base max-w-md' : 'text-sm'}`}
                                    style={{ color: 'var(--theme-muted)' }}
                                >
                                    {t(descKey)}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
