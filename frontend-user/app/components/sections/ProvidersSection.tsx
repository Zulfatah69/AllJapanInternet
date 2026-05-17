'use client';

import { motion } from 'framer-motion';

import { storageUrl } from '../../lib/utils';
import { Container } from '../ui/Container';
import { EmptyState } from '../ui/EmptyState';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

const CARD_WIDTH = 'w-[min(100%,220px)] sm:w-[220px]';

export function ProvidersSection({ providers }: { providers: any[] }) {
    const { copy } = useApp();

    return (
        <SectionShell id="providers" variant="contrast">
            <Container>
                <SectionHeader
                    title={copy.providers.title}
                    subtitle={copy.providers.subtitle}
                    eyebrow="Carriers"
                />
                {providers.length === 0 ? (
                    <EmptyState message={copy.providers.empty} />
                ) : (
                    <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-5 md:gap-6">
                        {providers.map((provider, i) => {
                            const logo = storageUrl(provider.logo);
                            return (
                                <motion.div
                                    key={provider.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06, duration: 0.5 }}
                                    whileHover={{ y: -6 }}
                                    className={`${CARD_WIDTH} flex min-h-[180px] flex-col items-center justify-center rounded-3xl border border-white/12 bg-white/[0.06] p-8 text-center backdrop-blur-md transition-shadow hover:shadow-[0_0_40px_-10px_var(--glow)]`}
                                >
                                    {logo ? (
                                        <img
                                            src={logo}
                                            alt={provider.nama}
                                            className="mb-5 h-14 w-auto max-w-[140px] object-contain brightness-0 invert"
                                        />
                                    ) : (
                                        <div
                                            className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white"
                                            style={{ background: 'var(--gradient-accent)' }}
                                        >
                                            {provider.nama?.charAt(0)}
                                        </div>
                                    )}
                                    <p className="text-sm font-semibold leading-snug text-white/95 md:text-base">
                                        {provider.nama}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </Container>
        </SectionShell>
    );
}
