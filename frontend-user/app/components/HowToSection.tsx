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
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    eyebrow={t('howtoEyebrow')}
                    title={t('howtoTitle')}
                    subtitle={t('howtoSubtitle')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const num = String(index + 1).padStart(2, '0');

                        return (
                            <div
                                key={step.titleKey}
                                className="premium-card p-6 md:p-8 flex flex-col items-center text-center gap-4"
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                                    style={{
                                        background: 'var(--theme-primary)',
                                        color: '#fff',
                                    }}
                                >
                                    <Icon />
                                </div>
                                <span
                                    className="text-xs font-bold tracking-widest"
                                    style={{ color: 'var(--theme-primary)' }}
                                >
                                    {num}
                                </span>
                                <h3
                                    className="font-display text-lg md:text-xl"
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
