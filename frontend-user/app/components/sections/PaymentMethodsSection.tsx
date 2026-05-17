'use client';

import { motion } from 'framer-motion';
import { FiCreditCard } from 'react-icons/fi';

import { staggerContainer, fadeUp } from '../../lib/motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

export function PaymentMethodsSection({
    methods,
}: {
    methods: { id: number; nama: string }[];
}) {
    const { copy } = useApp();

    const display = methods.length
        ? methods
        : copy.payment.fallback.map((nama, id) => ({ id, nama }));

    return (
        <SectionShell id="payment" variant="muted">
            <Container>
                <SectionHeader
                    title={copy.payment.title}
                    subtitle={copy.payment.subtitle}
                    eyebrow="Checkout"
                />
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {display.map((method, i) => (
                        <motion.div
                            key={`${method.id}-${method.nama}`}
                            variants={fadeUp}
                            custom={i}
                            className="premium-card flex items-center gap-4 rounded-2xl p-5"
                        >
                            <motion.div
                                whileHover={{ rotate: 8, scale: 1.05 }}
                                className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                                style={{ background: 'var(--gradient-accent)' }}
                            >
                                <FiCreditCard size={22} />
                            </motion.div>
                            <span className="font-semibold">{method.nama}</span>
                        </motion.div>
                    ))}
                </motion.div>
                <p
                    className="mt-8 max-w-3xl text-sm leading-relaxed"
                    style={{ color: 'var(--fg-muted)' }}
                >
                    {copy.howToOrder.paymentNote}
                </p>
            </Container>
        </SectionShell>
    );
}
