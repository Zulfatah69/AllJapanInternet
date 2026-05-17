'use client';

import { motion } from 'framer-motion';
import { FiCreditCard } from 'react-icons/fi';

import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';

const PAYMENT_CARD =
    'w-[calc(50%-0.5rem)] max-w-[280px] min-w-[min(100%,200px)]';

export function PaymentMethodsSection({
    methods,
}: {
    methods: { id: number; nama: string }[];
}) {
    const { copy } = useApp();

    const display = methods.length
        ? methods
        : copy.payment.fallback.map((nama, id) => ({ id, nama }));

    const primary = display.slice(0, 4);
    const extra = display.slice(4);

    return (
        <SectionShell id="payment" variant="muted">
            <Container>
                <SectionHeader
                    title={copy.payment.title}
                    subtitle={copy.payment.subtitle}
                    eyebrow="Checkout"
                />

                <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-4 md:gap-5">
                    {primary.map((method, i) => (
                        <motion.div
                            key={`${method.id}-${method.nama}`}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -4 }}
                            className={`${PAYMENT_CARD} premium-card flex min-h-[100px] flex-col items-center justify-center gap-3 rounded-2xl p-5 text-center md:min-h-[112px]`}
                        >
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                                style={{ background: 'var(--gradient-accent)' }}
                            >
                                <FiCreditCard size={22} />
                            </div>
                            <span className="text-sm font-semibold leading-snug md:text-base">
                                {method.nama}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {extra.length > 0 && (
                    <div className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-3">
                        {extra.map((method) => (
                            <span
                                key={`${method.id}-extra`}
                                className="rounded-full border px-4 py-2 text-sm font-medium"
                                style={{
                                    borderColor: 'var(--border)',
                                    background: 'var(--bg-elevated)',
                                }}
                            >
                                {method.nama}
                            </span>
                        ))}
                    </div>
                )}

                <p
                    className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed"
                    style={{ color: 'var(--fg-muted)' }}
                >
                    {copy.howToOrder.paymentNote}
                </p>
            </Container>
        </SectionShell>
    );
}
