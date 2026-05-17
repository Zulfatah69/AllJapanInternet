'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { getProduct } from '../../services/product.service';
import { getSettings } from '../../services/settings.service';
import { formatYen, cn } from '../../lib/utils';
import { Container } from '../../components/ui/Container';
import { Skeleton } from '../../components/ui/Skeleton';
import { DynamicOrderForm } from '../../components/product/DynamicOrderForm';
import { useApp } from '../../providers/AppProvider';
import type {
    BillingPeriod,
    PaymentMethod,
    Product,
    ProductVariant,
    Settings,
} from '../../types/api';

export default function ProductDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { copy } = useApp();
    const [slug, setSlug] = useState('');
    const [product, setProduct] = useState<Product | null>(null);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [selectedBilling, setSelectedBilling] = useState<BillingPeriod | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string | undefined>();

    useEffect(() => {
        params.then((r) => setSlug(r.slug));
    }, [params]);

    useEffect(() => {
        if (!slug) return;

        async function load() {
            setLoading(true);
            try {
                const [productData, settingsData] = await Promise.all([
                    getProduct(slug),
                    getSettings(),
                ]);
                setProduct(productData);
                setSettings(settingsData);
                setActiveImage(productData.thumbnail_url ?? undefined);

                if (productData.variants?.length) {
                    const first = productData.variants[0];
                    setSelectedVariant(first);
                    if (first.billing_periods?.length) {
                        setSelectedBilling(first.billing_periods[0]);
                    }
                }
                if (productData.payment_methods?.length) {
                    setSelectedPayment(productData.payment_methods[0]);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [slug]);

    function selectVariant(variant: ProductVariant) {
        setSelectedVariant(variant);
        if (variant.billing_periods?.length) {
            setSelectedBilling(variant.billing_periods[0]);
        } else {
            setSelectedBilling(null);
        }
    }

    const optionClass = (active: boolean) =>
        cn(
            'w-full rounded-2xl border p-4 text-left transition-all duration-300',
            active
                ? 'text-white shadow-md'
                : 'bg-[var(--bg-elevated)] hover:border-[var(--primary)]',
        );

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="section-padding"
            >
                <Container>
                    <motion.div
                        className="grid gap-10 lg:grid-cols-2"
                        initial="hidden"
                        animate="visible"
                    >
                        <Skeleton className="aspect-square rounded-3xl" />
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-2/3" />
                            <Skeleton className="h-32" />
                            <Skeleton className="h-48" />
                        </div>
                    </motion.div>
                </Container>
            </motion.div>
        );
    }

    if (!product) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="section-padding text-center"
            >
                <Container>
                    <p>{copy.products.empty}</p>
                    <Link href="/#products" className="mt-4 inline-block text-gradient font-semibold">
                        ← {copy.nav.products}
                    </Link>
                </Container>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-padding"
        >
            <Container>
                <Link
                    href="/#products"
                    className="mb-8 inline-flex text-sm font-medium"
                    style={{ color: 'var(--fg-muted)' }}
                >
                    ← {copy.nav.products}
                </Link>

                <motion.div
                    layout
                    className="grid gap-12 lg:grid-cols-2"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div
                            className="overflow-hidden rounded-3xl border"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            {activeImage ? (
                                <motion.img
                                    key={activeImage}
                                    src={activeImage}
                                    alt={product.nama}
                                    initial={{ opacity: 0.6, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="aspect-square w-full object-cover"
                                />
                            ) : (
                                <div
                                    className="aspect-square w-full"
                                    style={{ background: 'var(--gradient-mesh)' }}
                                />
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <motion.div layout className="mb-5 flex flex-wrap gap-2">
                            {product.type && (
                                <span
                                    className="rounded-full px-4 py-1.5 text-xs font-semibold text-white"
                                    style={{ background: 'var(--primary-strong)' }}
                                >
                                    {product.type}
                                </span>
                            )}
                            {product.provider?.nama && (
                                <span
                                    className="rounded-full border px-4 py-1.5 text-xs font-semibold"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    {product.provider.nama}
                                </span>
                            )}
                            {product.category?.nama && (
                                <span
                                    className="rounded-full border px-4 py-1.5 text-xs font-semibold"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    {product.category.nama}
                                </span>
                            )}
                        </motion.div>

                        <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
                            {product.nama}
                        </h1>
                        {product.deskripsi && (
                            <p
                                className="mb-10 whitespace-pre-line leading-relaxed"
                                style={{ color: 'var(--fg-muted)' }}
                            >
                                {product.deskripsi}
                            </p>
                        )}

                        {product.variants && product.variants.length > 0 && (
                            <div className="mb-8">
                                <h2 className="mb-4 text-lg font-semibold">{copy.common.variant}</h2>
                                <div className="space-y-3">
                                    {product.variants.map((variant) => (
                                        <motion.button
                                            key={variant.id}
                                            type="button"
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => selectVariant(variant)}
                                            className={optionClass(selectedVariant?.id === variant.id)}
                                            style={
                                                selectedVariant?.id === variant.id
                                                    ? { background: 'var(--primary-strong)' }
                                                    : { borderColor: 'var(--border)' }
                                            }
                                        >
                                            <motion.div layout className="flex justify-between">
                                                <span>{variant.gb ?? variant.nama}</span>
                                                <span>{formatYen(variant.monthly_price)}</span>
                                            </motion.div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedVariant?.billing_periods &&
                            selectedVariant.billing_periods.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="mb-4 text-lg font-semibold">
                                        {copy.common.billing}
                                    </h2>
                                    <motion.div layout className="space-y-3">
                                        {selectedVariant.billing_periods.map((period) => (
                                            <motion.button
                                                key={period.id}
                                                type="button"
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setSelectedBilling(period)}
                                                className={optionClass(
                                                    selectedBilling?.id === period.id,
                                                )}
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
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                </div>
                            )}

                        {product.payment_methods && product.payment_methods.length > 0 && (
                            <div className="mb-8">
                                <h2 className="mb-4 text-lg font-semibold">{copy.common.payment}</h2>
                                <div className="space-y-3">
                                    {product.payment_methods.map((payment) => (
                                        <motion.button
                                            key={payment.id}
                                            type="button"
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedPayment(payment)}
                                            className={optionClass(
                                                selectedPayment?.id === payment.id,
                                            )}
                                            style={
                                                selectedPayment?.id === payment.id
                                                    ? { background: 'var(--primary-strong)' }
                                                    : { borderColor: 'var(--border)' }
                                            }
                                        >
                                            <motion.div layout className="flex justify-between">
                                                <span>{payment.nama}</span>
                                                <span>+{formatYen(payment.additional_price)}</span>
                                            </motion.div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <DynamicOrderForm
                            product={product}
                            variant={selectedVariant}
                            billing={selectedBilling}
                            payment={selectedPayment}
                            whatsapp={settings?.whatsapp}
                        />
                    </motion.div>
                </motion.div>
            </Container>
        </motion.div>
    );
}
