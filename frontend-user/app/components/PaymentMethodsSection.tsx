'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import SectionHeader from './SectionHeader';
import Lightbox from './Lightbox';
import {
    FaMoneyBillWave,
    FaTruck,
    FaUniversity,
    FaStore,
} from 'react-icons/fa';

const paymentKeys = [
    { key: 'payCodJp', category: 'cod', icon: FaTruck, image: '/images/payment-cod-jp.jpg', featured: true, position: 'top-slight' },
    { key: 'payCodKuroneko', category: 'cod', icon: FaTruck, image: '/images/payment-cod-kuroneko.jpg', featured: false },
    { key: 'payTransferJp', category: 'transfer', icon: FaUniversity, image: '/images/payment-transfer-yucho.jpg', featured: false },
    { key: 'payTransferId', category: 'transfer', icon: FaUniversity, image: '/images/payment-transfer-rupiah.jpg', featured: true },
    { key: 'payKonbiniFamiport', category: 'konbini', icon: FaStore, image: '/images/payment-konbini-famiport.jpg', featured: false, position: 'famiport-focus' },
    { key: 'payKonbiniLoppi', category: 'konbini', icon: FaStore, image: '/images/payment-konbini-loppi.jpg', featured: false, position: 'screen-focus' },
    { key: 'payKonbiniSmartpit', category: 'konbini', icon: FaStore, image: '/images/payment-konbini-smartpit.jpg', featured: false },
] as const;

export default function PaymentMethodsSection() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'cod' | 'transfer' | 'konbini'>('cod');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const filteredKeys = paymentKeys.filter(item => item.category === activeTab);

    return (
        <section
            id="payment"
            className="py-12 md:py-16 px-6 premium-mesh scroll-mt-20"
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
                    {filteredKeys.map(({ key, icon: Icon, image, featured, ...rest }, index) => {
                        const position = 'position' in rest ? (rest as any).position : undefined;
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
                                {/* Card Image Header */}
                                <div 
                                    className="relative aspect-[16/10] w-full overflow-hidden cursor-zoom-in group"
                                    onClick={() => {
                                        setLightboxIndex(index);
                                        setIsLightboxOpen(true);
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={t(`${key}Title`)}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        style={{
                                            objectPosition: 
                                                position === 'top-slight' ? 'center 45%' : 
                                                position === 'famiport-focus' ? 'center 7%' : 
                                                position === 'screen-focus' ? 'center 25%' : 
                                                undefined
                                        }}
                                        loading="lazy"
                                    />
                                    {/* Zoom hover overlay */}
                                    <div className="absolute inset-0 z-20 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                            </svg>
                                        </div>
                                    </div>
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
                    className={`premium-card mt-12 p-6 flex items-center gap-4 justify-center text-center mx-auto transition-all duration-500 ease-in-out ${
                        activeTab === 'konbini' ? 'max-w-6xl' : 'max-w-4xl'
                    }`}
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
            {isLightboxOpen && (
                <Lightbox
                    images={filteredKeys.map(item => item.image)}
                    initialIndex={lightboxIndex}
                    isOpen={isLightboxOpen}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </section>
    );
}
