'use client';

import {
    FaWifi,
    FaMobileAlt,
    FaCreditCard,
    FaTruck,
} from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';
import SectionHeader from './SectionHeader';
import ScrollReveal from './ScrollReveal';

const steps = [
    { icon: FaWifi, titleKey: 'pilihKuota', descKey: 'pilihKuotaDesc' },
    { icon: FaMobileAlt, titleKey: 'isiFormat', descKey: 'isiFormatDesc' },
    { icon: FaCreditCard, titleKey: 'pembayaran', descKey: 'pembayaranDesc' },
    { icon: FaTruck, titleKey: 'proses', descKey: 'prosesDesc' },
];

export default function HowToSection() {
    const { t } = useLanguage();

    return (
        <section
            id="howto"
            className="py-12 md:py-16 px-6 relative overflow-hidden scroll-mt-20"
            style={{ background: 'var(--theme-section)' }}
        >
            {/* Dynamic blurred background accents for premium aesthetic */}
            <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal>
                    <SectionHeader
                        eyebrow={t('howtoEyebrow')}
                        title={t('howtoTitle')}
                        subtitle={t('howtoSubtitle')}
                    />
                </ScrollReveal>

                <div className="relative mt-16 md:mt-24">
                    
                    {/* Wavy Laser Pathway (Desktop Only) */}
                    <div className="hidden lg:block absolute top-10 left-0 w-full h-24 z-0 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
                            {/* Static base wave path */}
                            <path 
                                d="M 125 50 Q 250 10 375 50 T 625 50 T 875 50" 
                                className="path-line-base" 
                                strokeDasharray="6 6"
                            />
                            {/* Animated pulsing wave stream */}
                            <path 
                                d="M 125 50 Q 250 10 375 50 T 625 50 T 875 50" 
                                className="path-line-pulse"
                            />
                        </svg>
                    </div>

                    {/* Vertical Connecting Line (Mobile & Tablet) */}
                    <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 z-0 pointer-events-none">
                        <div 
                            className="w-full h-full opacity-35" 
                            style={{ 
                                background: 'linear-gradient(180deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)',
                                strokeDasharray: '4 4'
                            }} 
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const num = String(index + 1).padStart(2, '0');

                            return (
                                <ScrollReveal key={step.titleKey} delay={index * 0.15} direction="up" className="flex flex-col items-center text-center group">
                                    {/* Flow Portal Node */}
                                    <div className="relative w-20 h-20 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white/70 group-hover:border-white group-hover:shadow-lg">
                                        
                                        {/* Outer Concentric Spinning Halos on Hover */}
                                        <div 
                                            className="absolute -inset-1 rounded-full border border-dashed border-[var(--theme-primary)] opacity-0 group-hover:opacity-40 animate-[spin_8s_linear_infinite]" 
                                        />
                                        <div 
                                            className="absolute -inset-3 rounded-full border border-dotted border-[var(--theme-secondary)] opacity-0 group-hover:opacity-35 animate-[spin_16s_linear_infinite] pointer-events-none" 
                                        />
                                        
                                        {/* Core Icon Capsule */}
                                        <div 
                                            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-sm transition-transform duration-500"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                                                boxShadow: '0 6px 16px var(--theme-glow)'
                                            }}
                                        >
                                            <Icon className="transition-transform duration-300 group-hover:scale-110" />
                                        </div>

                                        {/* Neon Floating Step Badge */}
                                        <span className="absolute -top-3 -right-3 px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider bg-[var(--theme-primary)] text-white shadow-sm border border-white/40">
                                            STEP {num}
                                        </span>
                                    </div>

                                    <div className="mt-8 px-4">
                                        <h3 
                                            className="font-display font-extrabold text-lg md:text-xl transition-colors duration-300"
                                            style={{ color: 'var(--foreground)' }}
                                        >
                                            {t(step.titleKey)}
                                        </h3>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
