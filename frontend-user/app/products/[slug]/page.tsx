'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import api from '../../lib/api';
import { formatYen, cn } from '../../lib/utils';
import { Container } from '../../components/ui/Container';
import { Skeleton } from '../../components/ui/Skeleton';
import { useApp } from '../../providers/AppProvider';

export default function ProductDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { copy } = useApp();
    const [slug, setSlug] = useState('');
    const [product, setProduct] = useState<any>(null);
    const [setting, setSetting] = useState<any>(null);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [selectedBilling, setSelectedBilling] = useState<any>(null);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        params.then((r) => setSlug(r.slug));
    }, [params]);

    useEffect(() => {
        if (!slug) return;

        async function load() {
            setLoading(true);
            try {
                const [productRes, settingsRes] = await Promise.all([
                    api.get(`/products/${slug}`),
                    api.get('/settings'),
                ]);
                const data = productRes.data;
                setProduct(data);
                setSetting(settingsRes.data);

                if (data?.variants?.length > 0) {
                    const first = data.variants[0];
                    setSelectedVariant(first);
                    if (first?.billing_periods?.length > 0) {
                        setSelectedBilling(first.billing_periods[0]);
                    }
                    if (data?.payment_methods?.length > 0) {
                        setSelectedPayment(data.payment_methods[0]);
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [slug]);

    function selectVariant(variant: any) {
        setSelectedVariant(variant);
        if (variant?.billing_periods?.length > 0) {
            setSelectedBilling(variant.billing_periods[0]);
        }
    }

    function orderWhatsApp() {
        if (!product || !selectedVariant) return;
        const total =
            Number(selectedBilling?.initial_price || 0) +
            Number(selectedPayment?.additional_price || 0);
        const message =
            `Hello Admin,%0A%0A` +
            `I want to order:%0A%0A` +
            `Product: ${product.nama}%0A` +
            `Variant: ${selectedVariant.gb}%0A` +
            `Billing Period: ${selectedBilling?.nama}%0A` +
            `Payment Method: ${selectedPayment?.nama}%0A` +
            `Total: ¥${total}%0A%0A` +
            `Thank you`;
        window.open(`https://wa.me/${setting?.whatsapp}?text=${message}`, '_blank');
    }

    const total =
        Number(selectedBilling?.initial_price || 0) +
        Number(selectedPayment?.additional_price || 0);

    const optionClass = (active: boolean) =>
        cn(
            'w-full rounded-2xl border p-4 text-left transition-all duration-300',
            active ? 'text-white shadow-md' : 'bg-[var(--bg-elevated)] hover:border-[var(--primary)]',
        );

    if (loading) {
        return (
            <div className="section-padding">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-2">
                        <Skeleton className="aspect-square" />
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-2/3" />
                            <Skeleton className="h-32" />
                            <Skeleton className="h-48" />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="section-padding text-center">
                <Container>
                    <p>{copy.products.empty}</p>
                    <Link href="/#products" className="mt-4 inline-block text-gradient font-semibold">
                        ← {copy.nav.products}
                    </Link>
                </Container>
            </div>
        );
    }

    return (
        <div className="section-padding">
            <Container>
                <Link
                    href="/#products"
                    className="mb-8 inline-flex text-sm font-medium"
                    style={{ color: 'var(--fg-muted)' }}
                >
                    ← {copy.nav.products}
                </Link>

                <div className="grid gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="overflow-hidden rounded-3xl border"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <img
                            src={product.thumbnail_url}
                            alt={product.nama}
                            className="aspect-square w-full object-cover"
                        />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="mb-5 flex flex-wrap gap-2">
                            <span
                                className="rounded-full px-4 py-1.5 text-xs font-semibold text-white"
                                style={{ background: 'var(--primary-strong)' }}
                            >
                                {product.type}
                            </span>
                            <span className="rounded-full border px-4 py-1.5 text-xs font-semibold" style={{ borderColor: 'var(--border)' }}>
                                {product.provider?.nama}
                            </span>
                            <span className="rounded-full border px-4 py-1.5 text-xs font-semibold" style={{ borderColor: 'var(--border)' }}>
                                {product.category?.nama}
                            </span>
                        </div>

                        <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">{product.nama}</h1>
                        <p className="mb-10 whitespace-pre-line leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                            {product.deskripsi}
                        </p>

                        <div className="mb-8">
                            <h2 className="mb-4 text-lg font-semibold">{copy.common.variant}</h2>
                            <div className="space-y-3">
                                {product?.variants?.map((variant: any) => (
                                    <button
                                        key={variant.id}
                                        type="button"
                                        onClick={() => selectVariant(variant)}
                                        className={optionClass(selectedVariant?.id === variant.id)}
                                        style={
                                            selectedVariant?.id === variant.id
                                                ? { background: 'var(--primary-strong)' }
                                                : { borderColor: 'var(--border)' }
                                        }
                                    >
                                        <div className="flex justify-between">
                                            <span>{variant.gb}</span>
                                            <span>{formatYen(variant.monthly_price)}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="mb-4 text-lg font-semibold">{copy.common.billing}</h2>
                            <div className="space-y-3">
                                {selectedVariant?.billing_periods?.map((period: any) => (
                                    <button
                                        key={period.id}
                                        type="button"
                                        onClick={() => setSelectedBilling(period)}
                                        className={optionClass(selectedBilling?.id === period.id)}
                                        style={
                                            selectedBilling?.id === period.id
                                                ? { background: 'var(--primary-strong)' }
                                                : { borderColor: 'var(--border)' }
                                        }
                                    >
                                        <div className="flex justify-between">
                                            <span>{period.nama}</span>
                                            <span>{formatYen(period.initial_price)}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="mb-4 text-lg font-semibold">{copy.common.payment}</h2>
                            <div className="space-y-3">
                                {product?.payment_methods?.map((payment: any) => (
                                    <button
                                        key={payment.id}
                                        type="button"
                                        onClick={() => setSelectedPayment(payment)}
                                        className={optionClass(selectedPayment?.id === payment.id)}
                                        style={
                                            selectedPayment?.id === payment.id
                                                ? { background: 'var(--primary-strong)' }
                                                : { borderColor: 'var(--border)' }
                                        }
                                    >
                                        <div className="flex justify-between">
                                            <span>{payment.nama}</span>
                                            <span>+{formatYen(payment.additional_price)}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div
                            className="mb-8 rounded-3xl p-6 text-white"
                            style={{ background: 'var(--gradient-accent)' }}
                        >
                            <h2 className="mb-2 text-lg font-semibold opacity-90">{copy.common.total}</h2>
                            <p className="text-4xl font-bold">{formatYen(total)}</p>
                        </div>

                        <button
                            type="button"
                            onClick={orderWhatsApp}
                            className="w-full rounded-2xl py-4 text-lg font-semibold text-white btn-primary"
                        >
                            {copy.common.orderWhatsapp}
                        </button>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
}
