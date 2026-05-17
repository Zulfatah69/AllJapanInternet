'use client';

import { motion } from 'framer-motion';

import { storageUrl } from '../../lib/utils';
import { staggerContainer, fadeUp } from '../../lib/motion';
import { Container } from '../ui/Container';
import { EmptyState } from '../ui/EmptyState';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

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
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-5 md:grid-cols-4"
                    >
                        {providers.map((provider, i) => {
                            const logo = storageUrl(provider.logo);
                            return (
                                <motion.div
                                    key={provider.id}
                                    variants={fadeUp}
                                    custom={i}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-shadow hover:shadow-[0_0_40px_-10px_var(--glow)]"
                                >
                                    {logo ? (
                                        <img
                                            src={logo}
                                            alt={provider.nama}
                                            className="mb-5 h-16 w-auto object-contain brightness-0 invert"
                                        />
                                    ) : (
                                        <div
                                            className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold"
                                            style={{ background: 'var(--gradient-accent)' }}
                                        >
                                            {provider.nama?.charAt(0)}
                                        </div>
                                    )}
                                    <p className="font-semibold text-white/95">{provider.nama}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </Container>
        </SectionShell>
    );
}
