'use client';

import { motion } from 'framer-motion';
import { FiBookOpen, FiDownload } from 'react-icons/fi';

import { AMBIENT_IMAGES } from '../../lib/visuals';
import { easeLuxury } from '../../lib/motion';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

export function GuidebookSection() {
    const { copy, settings } = useApp();
    const contactHref = settings?.whatsapp
        ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(copy.guidebook.cta)}`
        : '#contact';

    return (
        <SectionShell id="guidebook" variant="muted">
            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <SectionHeader
                        title={copy.guidebook.title}
                        subtitle={copy.guidebook.subtitle}
                        align="left"
                        eyebrow="Resources"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30, rotate: -2 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: easeLuxury }}
                        className="relative"
                    >
                        <div
                            className="absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl"
                            style={{ background: 'var(--glow-soft)' }}
                        />
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className="premium-card relative overflow-hidden rounded-[2rem]"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={AMBIENT_IMAGES.mobileLife}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-contrast)]/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                                        style={{ background: 'var(--gradient-accent)' }}
                                    >
                                        <FiBookOpen size={22} />
                                    </div>
                                    <div>
                                        <p className="font-semibold">AJI Guidebook</p>
                                        <p className="text-xs text-white/70">PDF · Setup & tips</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <p className="mb-6" style={{ color: 'var(--fg-muted)' }}>
                                    {copy.guidebook.empty}
                                </p>
                                <Button href={contactHref}>
                                    <FiDownload />
                                    {copy.guidebook.cta}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </SectionShell>
    );
}
