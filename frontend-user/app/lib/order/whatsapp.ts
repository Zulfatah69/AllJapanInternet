import { formatYen } from '../utils';
import type { Product, ProductVariant, BillingPeriod, PaymentMethod } from '../../types/api';

export type OrderFormValues = Record<string, string>;

export function buildWhatsAppMessage(params: {
    product: Product;
    variant?: ProductVariant | null;
    billing?: BillingPeriod | null;
    payment?: PaymentMethod | null;
    total: number;
    form: OrderFormValues;
}): string {
    const { product, variant, billing, payment, total, form } = params;
    const lines: string[] = [
        'Hello Admin,',
        '',
        'I would like to place an order:',
        '',
        `Product: ${product.nama}`,
        `Type: ${product.type ?? '-'}`,
        `Code: ${product.code ?? '-'}`,
    ];

    if (variant?.gb) lines.push(`Variant: ${variant.gb}`);
    if (variant?.nama) lines.push(`Plan: ${variant.nama}`);
    if (billing?.nama) lines.push(`Billing: ${billing.nama}`);
    if (payment?.nama) lines.push(`Payment: ${payment.nama}`);
    lines.push(`Total: ${formatYen(total)}`);
    lines.push('');

    lines.push('--- Customer Details ---');
    for (const [key, value] of Object.entries(form)) {
        if (value?.trim()) {
            lines.push(`${capitalize(key)}: ${value.trim()}`);
        }
    }

    lines.push('', 'Thank you.');
    return lines.join('\n');
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function openWhatsAppCheckout(phone: string | undefined, message: string): void {
    if (!phone) {
        alert('WhatsApp number is not configured. Please contact support.');
        return;
    }
    const normalized = phone.replace(/\D/g, '');
    const url = `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

export function calculateOrderTotal(
    billing?: BillingPeriod | null,
    payment?: PaymentMethod | null,
    variant?: ProductVariant | null,
): number {
    const billingPrice = Number(billing?.initial_price ?? 0);
    const paymentExtra = Number(payment?.additional_price ?? 0);
    const monthly = Number(variant?.monthly_price ?? 0);
    if (billingPrice > 0) return billingPrice + paymentExtra;
    return monthly + paymentExtra;
}
