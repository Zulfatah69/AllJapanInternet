'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import SectionHeader from './SectionHeader';
import {
    FaMoneyBillWave,
    FaTruck,
    FaUniversity,
    FaStore,
} from 'react-icons/fa';

const paymentKeys = [
    { key: 'payCodJp', category: 'cod', icon: FaTruck, image: '/images/payment-cod-jp.jpg', featured: true },
    { key: 'payCodKuroneko', category: 'cod', icon: FaTruck, image: '/images/payment-cod-kuroneko.jpg', featured: false },
    { key: 'payTransferJp', category: 'transfer', icon: FaUniversity, image: '/images/payment-transfer-yucho.jpg', featured: false },
    { key: 'payTransferId', category: 'transfer', icon: FaUniversity, image: '/images/payment-transfer-rupiah.png', featured: true },
    { key: 'payKonbiniFamiport', category: 'konbini', icon: FaStore, image: '/images/payment-konbini-famiport.jpg', featured: false },
    { key: 'payKonbiniLoppi', category: 'konbini', icon: FaStore, image: '/images/payment-konbini-loppi.jpg', featured: false },
    { key: 'payKonbiniSmartpit', category: 'konbini', icon: FaStore, image: '/images/payment-konbini-smartpit.png', featured: false },
] as const;

export default function PaymentMethodsSection() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'cod' | 'transfer' | 'konbini'>('cod');

    const filteredKeys = paymentKeys.filter(item => item.category === activeTab);

    return (
        <section
            id="payment"
            className="py-20 md:py-28 px-6 premium-mesh"
        >
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    eyebrow={t('paymentEyebrow')}
                    title={t('paymentTitle')}
                    subtitle={t('paymentSubtitle')}
                />

                {/* Tab Switcher */}
                <div className="flex justify-center gap-3 mb-12 flex-wrap">
                    {(['cod', 'transfer', 'konbini'] as const).map((tab) => {
                        const isActive = activeTab === tab;
                        const labelKey = tab === 'cod' ? 'payCodTitle' : tab === 'transfer' ? 'payTransferTitle' : 'payKonbiniTitle';
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                                    isActive
                                        ? 'border-transparent text-white'
                                        : 'hover:opacity-90 shadow-sm'
                                }`}
                                style={
                                    isActive
                                        ? {
                                              background: 'var(--theme-primary)',
                                              boxShadow: '0 8px 24px var(--theme-glow)',
                                          }
                                        : {
                                              background: 'var(--theme-accent-soft)',
                                              borderColor: 'color-mix(in srgb, var(--theme-primary) 25%, transparent)',
                                              color: 'var(--theme-muted)',
                                          }
                                }
                            >
                                {t(labelKey)}
                            </button>
                        );
                    })}
                </div>

                {/* Dynamic Grid Layout based on tab selection */}
                <div
                    className={`
                        grid grid-cols-1 gap-6 md:gap-8 mx-auto
                        ${activeTab === 'konbini' ? 'md:grid-cols-3 max-w-6xl' : 'md:grid-cols-2 max-w-4xl'}
                    `}
                >
                    {filteredKeys.map(({ key, icon: Icon, image, featured }, index) => {
                        const num = String(index + 1).padStart(2, '0');
                        return (
                            <div
                                key={key}
                                className={`
                                    premium-card
                                    overflow-hidden
                                    flex flex-col
                                    premium-fade-up
                                    h-full
                                    group
                                    ${featured ? 'benefit-card-featured' : ''}
                                `}
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                {/* Card Image Header with Ambient Blurred Background */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100/10 flex items-center justify-center">
                                    {/* Blurred Backdrop */}
                                    <img
                                        src={image}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-30 select-none pointer-events-none"
                                    />
                                    {/* Sharp centered foreground image */}
                                    <img
                                        src={image}
                                        alt={t(`${key}Title`)}
                                        className="relative z-10 max-h-[85%] max-w-[85%] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Card Content */}
                                <div className={`flex-1 flex flex-col p-6 md:p-7 ${featured ? 'md:p-9' : ''}`}>
                                    <div className={`flex items-start justify-between gap-3 ${featured ? 'mb-2' : 'mb-1'}`}>
                                        <div
                                            className={`shrink-0 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105 ${featured ? 'w-14 h-14 text-2xl' : 'w-11 h-11 text-lg'}`}
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
                                        className={`font-display mb-2 mt-4 ${featured ? 'text-xl md:text-2xl font-bold' : 'text-base md:text-lg font-semibold'}`}
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        {t(`${key}Title`)}
                                    </h3>

                                    <p
                                        className={`leading-relaxed flex-1 ${featured ? 'text-sm md:text-base max-w-2xl' : 'text-sm'}`}
                                        style={{ color: 'var(--theme-muted)' }}
                                    >
                                        {t(`${key}Desc`)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div
                    className="premium-card mt-12 p-6 flex items-center gap-4 justify-center text-center max-w-4xl mx-auto"
                >
                    <FaMoneyBillWave
                        className="text-2xl shrink-0"
                        style={{ color: 'var(--theme-primary)' }}
                    />
                    <p
                        className="text-sm md:text-base"
                        style={{ color: 'var(--theme-muted)' }}
                    >
                        {t('paymentNote')}
                    </p>
                </div>
            </div>
        </section>
    );
}
