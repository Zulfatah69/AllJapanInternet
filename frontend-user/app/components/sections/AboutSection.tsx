'use client';

import { motion } from 'framer-motion';

import { AMBIENT_IMAGES } from '../../lib/visuals';
import { easeLuxury } from '../../lib/motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

export function AboutSection() {
    const { copy, settings } = useApp();
    const narrative = settings?.footer_text || copy.footer.narrative;

    return (
        <SectionShell id="about" variant="default">
            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: easeLuxury }}
                        className="relative"
                    >
                        <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)]">
                            <img
                                src={AMBIENT_IMAGES.japanStreet}
                                alt=""
                                className="aspect-[4/5] w-full object-cover image-mask-blob"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-contrast)]/70 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <p className="eyebrow mb-2 !text-white/70">All Japan Internet</p>
                                <p className="text-2xl font-semibold text-white md:text-3xl">
                                    {settings?.website_name || 'AJI'}
                                </p>
                            </div>
                        </div>
                        <motion.div
                            className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-card)] md:block"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-3xl font-bold text-gradient">100%</p>
                            <p className="text-sm text-[var(--fg-muted)]">Japan-focused connectivity</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: easeLuxury }}
                    >
                        <SectionHeader
                            title={copy.about.title}
                            subtitle={copy.about.subtitle}
                            align="left"
                            eyebrow="Our story"
                        />
                        <div className="glass-card rounded-3xl p-8 md:p-10">
                            <p
                                className="whitespace-pre-line text-lg leading-[1.8] md:text-xl"
                                style={{ color: 'var(--fg-muted)' }}
                            >
                                {narrative}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </SectionShell>
    );
}
