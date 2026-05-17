'use client';

import { motion } from 'framer-motion';

import { staggerContainer, fadeUp } from '../../lib/motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';
import { FiPackage, FiExternalLink } from 'react-icons/fi';

const TRACKING_LINKS = [
    { id: 'japan-post', href: 'https://trackings.post.japanpost.jp/services/srv/search/' },
    { id: 'yamato', href: 'https://toi.kuronekoyamato.co.jp/cgi-bin/tneko' },
] as const;

export function TrackingSection() {
    const { copy } = useApp();
    const labels = [copy.tracking.japanPost, copy.tracking.yamato];

    return (
        <SectionShell id="tracking" variant="muted">
            <Container>
                <SectionHeader
                    title={copy.tracking.title}
                    subtitle={copy.tracking.subtitle}
                    eyebrow="Delivery"
                />
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2"
                >
                    {TRACKING_LINKS.map((link, i) => (
                        <motion.a
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={fadeUp}
                            custom={i}
                            whileHover={{ y: -6 }}
                            className="premium-card group flex items-center gap-5 rounded-2xl p-6"
                        >
                            <div
                                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                                style={{ background: 'var(--gradient-accent)' }}
                            >
                                <FiPackage size={24} />
                            </div>
                            <div className="flex-1">
                                <span className="font-semibold">{labels[i]}</span>
                            </div>
                            <FiExternalLink className="opacity-40 transition-opacity group-hover:opacity-100" />
                        </motion.a>
                    ))}
                </motion.div>
            </Container>
        </SectionShell>
    );
}
