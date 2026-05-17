'use client';

import { motion } from 'framer-motion';

import { staggerContainer, fadeUp } from '../../lib/motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

export function HowToOrderSection() {
    const { copy } = useApp();

    return (
        <SectionShell id="how-to-order" variant="default">
            <Container>
                <SectionHeader
                    title={copy.howToOrder.title}
                    subtitle={copy.howToOrder.subtitle}
                    eyebrow="Process"
                />

                <motion.ol
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative mx-auto max-w-4xl space-y-6"
                >
                    <div
                        className="absolute left-6 top-4 bottom-4 w-px md:left-1/2"
                        style={{ background: 'linear-gradient(180deg, var(--primary), transparent)' }}
                    />
                    {copy.howToOrder.steps.map((step, i) => (
                        <motion.li
                            key={step.title}
                            variants={fadeUp}
                            custom={i}
                            className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            <div className="hidden flex-1 md:block" />
                            <div
                                className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-[var(--shadow-glow)] md:absolute md:left-1/2 md:-translate-x-1/2"
                                style={{ background: 'var(--gradient-accent)' }}
                            >
                                {i + 1}
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="premium-card flex-1 rounded-2xl p-6 md:max-w-[calc(50%-3rem)]"
                            >
                                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                    {step.desc}
                                </p>
                            </motion.div>
                        </motion.li>
                    ))}
                </motion.ol>

                <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {copy.howToOrder.paymentNote}
                </p>
            </Container>
        </SectionShell>
    );
}
