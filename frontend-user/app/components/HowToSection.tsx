'use client';

import {
    FaWifi,
    FaMobileAlt,
    FaCreditCard,
    FaTruck,
} from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';
import SectionHeader from './SectionHeader';

const steps = [
    { icon: FaWifi, titleKey: 'pilihKuota' },
    { icon: FaMobileAlt, titleKey: 'isiFormat' },
    { icon: FaCreditCard, titleKey: 'pembayaran' },
    { icon: FaTruck, titleKey: 'proses' },
];

export default function HowToSection() {
    const { t } = useLanguage();

    return (
        <section
            id="howto"
            className="py-20 md:py-28 px-6"
            style={{ background: 'var(--theme-section)' }}
        >
            <div className="max-w-7xl mx-auto premium-fade-up">
                <SectionHeader
                    eyebrow={t('howtoEyebrow')}
                    title={t('howtoTitle')}
                    subtitle={t('howtoSubtitle')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const num = String(index + 1).padStart(2, '0');

                        return (
                            <div
                                key={step.titleKey}
                                className="premium-card p-6 md:p-7 flex flex-col justify-between min-h-[10.5rem] group"
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div
                                        className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white text-lg transition-transform duration-300 group-hover:scale-105"
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
                                    className="font-display text-base md:text-lg font-semibold mt-auto"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {t(step.titleKey)}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
