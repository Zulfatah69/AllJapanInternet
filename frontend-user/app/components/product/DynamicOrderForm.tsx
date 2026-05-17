'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { getOrderFields } from '../../lib/order/formFields';
import { getOrderNotes } from '../../lib/order/notes';
import {
    buildWhatsAppMessage,
    calculateOrderTotal,
    openWhatsAppCheckout,
} from '../../lib/order/whatsapp';
import type {
    BillingPeriod,
    PaymentMethod,
    Product,
    ProductVariant,
} from '../../types/api';
import { formatYen } from '../../lib/utils';
import { useApp } from '../../providers/AppProvider';

type Props = {
    product: Product;
    variant: ProductVariant | null;
    billing: BillingPeriod | null;
    payment: PaymentMethod | null;
    whatsapp?: string;
};

export function DynamicOrderForm({
    product,
    variant,
    billing,
    payment,
    whatsapp,
}: Props) {
    const { locale, copy } = useApp();
    const fields = useMemo(() => getOrderFields(product), [product]);
    const notes = useMemo(() => getOrderNotes(product, locale), [product, locale]);

    const [form, setForm] = useState<Record<string, string>>({});

    const total = calculateOrderTotal(billing, payment, variant);

    function updateField(key: string, value: string) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        for (const field of fields) {
            if (field.required && !form[field.key]?.trim()) {
                alert(`Please fill in ${field.label}`);
                return;
            }
        }

        const message = buildWhatsAppMessage({
            product,
            variant,
            billing,
            payment,
            total,
            form,
        });
        openWhatsAppCheckout(whatsapp, message);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {notes.map((block) => (
                <motion.div
                    key={block.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border p-4"
                    style={{
                        borderColor: 'var(--border)',
                        background: 'color-mix(in srgb, var(--primary) 8%, var(--bg-elevated))',
                    }}
                >
                    <p className="mb-2 text-sm font-semibold text-[var(--primary-strong)]">
                        {block.title}
                    </p>
                    <ul className="space-y-1 text-sm" style={{ color: 'var(--fg-muted)' }}>
                        {block.lines.map((line) => (
                            <li key={line}>• {line}</li>
                        ))}
                    </ul>
                </motion.div>
            ))}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
            >
                <h3 className="text-lg font-semibold">{copy.order.formTitle}</h3>
                {fields.map((field) => (
                    <div key={field.key}>
                        <label className="mb-1.5 block text-sm font-medium">
                            {field.label}
                            {field.required && (
                                <span className="text-[var(--primary-strong)]"> *</span>
                            )}
                        </label>
                        {field.type === 'textarea' ? (
                            <textarea
                                value={form[field.key] ?? ''}
                                onChange={(e) => updateField(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                rows={3}
                                className="w-full rounded-2xl border bg-[var(--bg-elevated)] px-4 py-3 outline-none transition-colors focus:border-[var(--primary)]"
                                style={{ borderColor: 'var(--border)' }}
                            />
                        ) : (
                            <input
                                type={field.type}
                                value={form[field.key] ?? ''}
                                onChange={(e) => updateField(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                className="w-full rounded-2xl border bg-[var(--bg-elevated)] px-4 py-3 outline-none transition-colors focus:border-[var(--primary)]"
                                style={{ borderColor: 'var(--border)' }}
                            />
                        )}
                    </div>
                ))}
            </motion.div>

            <div
                className="rounded-3xl p-6 text-white"
                style={{ background: 'var(--gradient-accent)' }}
            >
                <p className="text-sm opacity-90">{copy.common.total}</p>
                <p className="text-4xl font-bold">{formatYen(total)}</p>
            </div>

            <button
                type="submit"
                className="w-full rounded-2xl py-4 text-lg font-semibold text-white btn-primary"
            >
                {copy.common.orderWhatsapp}
            </button>
        </form>
    );
}
