'use client';

import { useEffect, useState, useMemo } from 'react';
import api from '../../lib/api';
import { useLanguage } from '@/app/context/LanguageContext';

function getBillingPeriods(variant: any) {
    return variant?.billing_periods ?? variant?.billingPeriods ?? [];
}

function getVisiblePayments(methods: any[] | undefined) {
    return (methods ?? []).filter(
        (p) => Number(p.additional_price ?? 0) > 0
    );
}

export default function ProductDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { language, t } = useLanguage();

    const [slug, setSlug] = useState('');
    const [product, setProduct] = useState<any>(null);
    const [setting, setSetting] = useState<any>(null);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [selectedBilling, setSelectedBilling] = useState<any>(null);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);

    const visiblePayments = useMemo(
        () => getVisiblePayments(product?.payment_methods),
        [product?.payment_methods]
    );

    useEffect(() => {
        async function resolveParams() {
            const resolved = await params;
            setSlug(resolved.slug);
        }
        resolveParams();
    }, [params]);

    useEffect(() => {
        if (slug) {
            fetchProduct();
            loadSettings();
        }
    }, [slug]);

    useEffect(() => {
        if (visiblePayments.length > 0) {
            const stillValid = visiblePayments.some(
                (p) => p.id === selectedPayment?.id
            );
            if (!stillValid) {
                setSelectedPayment(visiblePayments[0]);
            }
        } else {
            setSelectedPayment(null);
        }
    }, [visiblePayments, selectedPayment?.id]);

    async function fetchProduct() {
        try {
            const response = await api.get(`/products/${slug}`);
            const data = response.data?.data ?? response.data;
            setProduct(data);

            if (data?.variants?.length > 0) {
                const first = data.variants[0];
                setSelectedVariant(first);
                const periods = getBillingPeriods(first);
                if (periods.length > 0) {
                    setSelectedBilling(periods[0]);
                }
            }

            const payments = getVisiblePayments(data?.payment_methods);
            if (payments.length > 0) {
                setSelectedPayment(payments[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function loadSettings() {
        try {
            const response = await api.get('/settings');
            setSetting(response.data?.data ?? response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function selectVariant(variant: any) {
        setSelectedVariant(variant);
        const periods = getBillingPeriods(variant);
        if (periods.length > 0) {
            setSelectedBilling(periods[0]);
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
            `Payment Method: ${selectedPayment?.nama ?? '-'}%0A` +
            `Total: ¥${total}%0A%0A` +
            `Thank you`;

        const wa =
            setting?.whatsapp_number ??
            setting?.whatsapp ??
            '818075558719';

        window.open(
            `https://wa.me/${wa}?text=${message}`,
            '_blank'
        );
    }

    const sectionHeading =
        'text-xs font-semibold uppercase tracking-widest mb-4';

    const selectBtn = (selected: boolean) =>
        selected
            ? {
                  background: 'var(--theme-primary)',
                  color: '#fff',
                  borderColor: 'var(--theme-primary)',
              }
            : {
                  background: '#fff',
                  color: 'var(--foreground)',
                  borderColor: 'rgba(15, 23, 42, 0.12)',
              };

    if (!product) {
        return (
            <div
                className="max-w-7xl mx-auto px-5 md:px-10 py-20 text-center"
                style={{ color: 'var(--theme-muted)' }}
            >
                Loading...
            </div>
        );
    }

    const billingPeriods = getBillingPeriods(selectedVariant);

    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 pb-16 pt-8 md:pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                <img
                    src={product.thumbnail_url}
                    alt={product.nama}
                    className="w-full rounded-2xl object-cover shadow-lg"
                />

                <div>
                    <div className="flex gap-2 mb-6 flex-wrap">
                        <span
                            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ background: 'var(--theme-primary)' }}
                        >
                            {product.type}
                        </span>
                        <span
                            className="px-3 py-1 rounded-full text-xs font-semibold border"
                            style={{
                                color: 'var(--foreground)',
                                borderColor: 'rgba(15,23,42,0.15)',
                            }}
                        >
                            {product.provider?.nama}
                        </span>
                        <span
                            className="px-3 py-1 rounded-full text-xs font-semibold border"
                            style={{
                                color: 'var(--foreground)',
                                borderColor: 'rgba(15,23,42,0.15)',
                            }}
                        >
                            {product.category?.nama}
                        </span>
                    </div>

                    <h1
                        className="font-display text-3xl md:text-4xl lg:text-5xl mb-5"
                        style={{ color: 'var(--foreground)' }}
                    >
                        {product.nama}
                    </h1>

                    <p
                        className="mb-10 whitespace-pre-line leading-relaxed"
                        style={{ color: 'var(--theme-muted)' }}
                    >
                        {product.deskripsi}
                    </p>

                    {/* VARIANT */}
                    <div className="mb-10">
                        <h2
                            className={sectionHeading}
                            style={{ color: 'var(--theme-primary)' }}
                        >
                            {t('variant')}
                        </h2>
                        <div className="space-y-3">
                            {product?.variants?.map((variant: any) => {
                                const selected =
                                    selectedVariant?.id === variant.id;
                                return (
                                    <button
                                        key={variant.id}
                                        type="button"
                                        onClick={() => selectVariant(variant)}
                                        className="w-full border-2 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md font-medium"
                                        style={selectBtn(selected)}
                                    >
                                        <div className="flex justify-between items-center gap-4">
                                            <span>{variant.gb}</span>
                                            <span className="font-display text-lg">
                                                ¥
                                                {Number(
                                                    variant.monthly_price || 0
                                                ).toLocaleString('ja-JP')}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* BILLING */}
                    {billingPeriods.length > 0 && (
                        <div className="mb-10">
                            <h2
                                className={sectionHeading}
                                style={{ color: 'var(--theme-primary)' }}
                            >
                                {t('billingPeriod')}
                            </h2>
                            <div className="space-y-3">
                                {billingPeriods.map((period: any) => {
                                    const selected =
                                        selectedBilling?.id === period.id;
                                    return (
                                        <button
                                            key={period.id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedBilling(period)
                                            }
                                            className="w-full border-2 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md font-medium"
                                            style={selectBtn(selected)}
                                        >
                                            <div className="flex justify-between items-center gap-4">
                                                <span>{period.nama}</span>
                                                <span className="font-display text-lg">
                                                    ¥
                                                    {Number(
                                                        period.initial_price ||
                                                            0
                                                    ).toLocaleString('ja-JP')}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* PAYMENT */}
                    {visiblePayments.length > 0 && (
                        <div className="mb-10">
                            <h2
                                className={sectionHeading}
                                style={{ color: 'var(--theme-primary)' }}
                            >
                                {t('paymentMethod')}
                            </h2>
                            <div className="space-y-3">
                                {visiblePayments.map((payment: any) => {
                                    const selected =
                                        selectedPayment?.id === payment.id;
                                    return (
                                        <button
                                            key={payment.id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedPayment(payment)
                                            }
                                            className="w-full border-2 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md font-medium"
                                            style={selectBtn(selected)}
                                        >
                                            <div className="flex justify-between items-center gap-4">
                                                <span>{payment.nama}</span>
                                                <span className="font-display text-lg">
                                                    +¥
                                                    {Number(
                                                        payment.additional_price
                                                    ).toLocaleString('ja-JP')}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* TOTAL */}
                    <div
                        className="rounded-2xl p-8 mb-8 text-white"
                        style={{
                            background: 'var(--theme-primary)',
                            boxShadow: `0 12px 40px var(--theme-glow)`,
                        }}
                    >
                        <h2 className="font-display text-xl mb-2 opacity-90">
                            {t('total')}
                        </h2>
                        <p className="font-display text-4xl">
                            ¥
                            {(
                                Number(selectedBilling?.initial_price || 0) +
                                Number(
                                    selectedPayment?.additional_price || 0
                                )
                            ).toLocaleString('ja-JP')}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={orderWhatsApp}
                        className="premium-btn w-full"
                    >
                        {t('orderWhatsapp')}
                    </button>
                </div>
            </div>
        </div>
    );
}
