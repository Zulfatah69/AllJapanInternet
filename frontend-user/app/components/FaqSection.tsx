'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import SectionHeader from './SectionHeader';
import { FaChevronDown } from 'react-icons/fa';

const faqKeys = [
    'faq1',
    'faq2',
    'faq3',
    'faq4',
    'faq5',
    'faq6',
    'faq7',
    'faq8',
] as const;

export default function FaqSection() {
    const { t } = useLanguage();
    const [openKey, setOpenKey] = useState<string | null>('faq1');

    return (
        <section
            id="faq"
            className="py-20 md:py-28 px-6"
            style={{ background: 'var(--background)' }}
        >
            <div className="max-w-3xl mx-auto">
                <SectionHeader
                    eyebrow={t('faqEyebrow')}
                    title={t('faqTitle')}
                    subtitle={t('faqSubtitle')}
                />

                <div className="space-y-4">
                    {faqKeys.map((key) => {
                        const isOpen = openKey === key;

                        return (
                            <div
                                key={key}
                                className="premium-card overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenKey(isOpen ? null : key)
                                    }
                                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                                >
                                    <span
                                        className="font-semibold text-base md:text-lg pr-4"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        {t(`${key}Q`)}
                                    </span>
                                    <FaChevronDown
                                        className={`shrink-0 transition-transform duration-300 ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                        style={{ color: 'var(--theme-primary)' }}
                                    />
                                </button>

                                {isOpen && (
                                    <div
                                        className="px-6 pb-6 pt-0 border-t"
                                        style={{
                                            borderColor: 'var(--theme-accent-soft)',
                                        }}
                                    >
                                        <p
                                            className="leading-relaxed text-sm md:text-base pt-4"
                                            style={{ color: 'var(--theme-muted)' }}
                                        >
                                            {t(`${key}A`)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
