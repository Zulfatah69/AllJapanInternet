'use client';

import { motion } from 'framer-motion';

import { staggerContainer, fadeUp, easeLuxury } from '../../lib/motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';
import { FiShield, FiClock, FiGlobe, FiTruck } from 'react-icons/fi';

const icons = [FiShield, FiGlobe, FiClock, FiTruck];

export function BenefitsSection() {
    const { copy } = useApp();

    return (
        <SectionShell id="benefits" variant="muted">
            <Container>
                <SectionHeader
                    title={copy.benefits.title}
                    subtitle={copy.benefits.subtitle}
                    eyebrow="Why AJI"
                />
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {copy.benefits.items.map((item, i) => {
                        const Icon = icons[i] ?? FiShield;
                        return (
                            <motion.div
                                key={item.title}
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -8, transition: { duration: 0.35, ease: easeLuxury } }}
                                className="premium-card group rounded-3xl p-8"
                            >
                                <div
                                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[var(--shadow-card)] transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: 'var(--gradient-accent)' }}
                                >
                                    <Icon size={24} />
                                </div>
                                <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Container>
        </SectionShell>
    );
}
