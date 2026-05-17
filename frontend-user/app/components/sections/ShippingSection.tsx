'use client';

import { motion } from 'framer-motion';
import { FiClock, FiPackage } from 'react-icons/fi';

import { staggerContainer, fadeUp } from '../../lib/motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

export function ShippingSection() {
    const { copy } = useApp();

    return (
        <SectionShell id="shipping" variant="default">
            <Container>
                <SectionHeader
                    title={copy.shipping.title}
                    subtitle={copy.shipping.subtitle}
                    eyebrow="Delivery"
                />
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-6 md:grid-cols-2"
                >
                    {copy.shipping.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            variants={fadeUp}
                            custom={i}
                            className="premium-card rounded-[1.75rem] p-8"
                        >
                            <div
                                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                                style={{ background: 'var(--gradient-accent)' }}
                            >
                                {i === 0 ? <FiPackage size={26} /> : <FiClock size={26} />}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </SectionShell>
    );
}
