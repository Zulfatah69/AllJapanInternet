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
        <div className="max-w-7xl mx-auto px-5 md:px-10 pb-16 pt-28 md:pt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                <img
                    src={product.thumbnail_url}
                    alt={product.nama}
                    className="w-full rounded-2xl object-cover shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-slate-100"
                />

                <div>
                    <div className="flex gap-2 mb-6 flex-wrap">
                        <span
                            className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm capitalize"
                            style={{ background: 'var(--theme-primary)' }}
                        >
                            {product.type}
                        </span>
                        <span
                            className="px-3 py-1 rounded-full text-xs font-semibold border bg-white shadow-2xs"
                            style={{
                                color: 'var(--foreground)',
                                borderColor: 'rgba(15,23,42,0.12)',
                            }}
                        >
                            {product.provider?.nama}
                        </span>
                        <span
                            className="px-3 py-1 rounded-full text-xs font-semibold border bg-white shadow-2xs"
                            style={{
                                color: 'var(--foreground)',
                                borderColor: 'rgba(15,23,42,0.12)',
                            }}
                        >
                            {product.category?.nama}
                        </span>
                    </div>

                    <h1
                        className="font-display text-3xl md:text-4xl lg:text-5xl mb-5 font-extrabold tracking-tight"
                        style={{ color: 'var(--foreground)' }}
                    >
                        {product.nama}
                    </h1>

                    <p
                        className="mb-10 whitespace-pre-line leading-relaxed text-base font-medium"
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
                                        className="w-full border-2 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.005] hover:shadow-md font-medium"
                                        style={
                                            selected
                                                ? {
                                                      background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                                                      color: '#fff',
                                                      borderColor: 'transparent',
                                                      boxShadow: '0 8px 24px var(--theme-glow)',
                                                  }
                                                : {
                                                      background: '#fff',
                                                      color: 'var(--foreground)',
                                                      borderColor: 'rgba(15, 23, 42, 0.08)',
                                                  }
                                        }
                                    >
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                    selected ? 'border-white bg-white/20' : 'border-slate-300 bg-transparent'
                                                }`}>
                                                    {selected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                                </div>
                                                <span className="font-bold">{variant.gb}</span>
                                            </div>
                                            <span className="font-display text-lg font-black">
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
                                            className="w-full border-2 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.005] hover:shadow-md font-medium"
                                            style={
                                                selected
                                                    ? {
                                                          background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                                                          color: '#fff',
                                                          borderColor: 'transparent',
                                                          boxShadow: '0 8px 24px var(--theme-glow)',
                                                      }
                                                    : {
                                                          background: '#fff',
                                                          color: 'var(--foreground)',
                                                          borderColor: 'rgba(15, 23, 42, 0.08)',
                                                      }
                                            }
                                        >
                                            <div className="flex justify-between items-center gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                        selected ? 'border-white bg-white/20' : 'border-slate-300 bg-transparent'
                                                    }`}>
                                                        {selected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                                    </div>
                                                    <span className="font-bold">{period.nama}</span>
                                                </div>
                                                <span className="font-display text-lg font-black">
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
                                            className="w-full border-2 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.005] hover:shadow-md font-medium"
                                            style={
                                                selected
                                                    ? {
                                                          background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                                                          color: '#fff',
                                                          borderColor: 'transparent',
                                                          boxShadow: '0 8px 24px var(--theme-glow)',
                                                      }
                                                    : {
                                                          background: '#fff',
                                                          color: 'var(--foreground)',
                                                          borderColor: 'rgba(15, 23, 42, 0.08)',
                                                      }
                                            }
                                        >
                                            <div className="flex justify-between items-center gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                        selected ? 'border-white bg-white/20' : 'border-slate-300 bg-transparent'
                                                    }`}>
                                                        {selected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                                    </div>
                                                    <span className="font-bold">{payment.nama}</span>
                                                </div>
                                                <span className="font-display text-lg font-black">
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
                        className="rounded-2xl p-8 mb-8 text-white relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                            boxShadow: `0 16px 40px var(--theme-glow)`,
                        }}
                    >
                        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0,50 Q25,70 50,50 T100,50 L100,100 L0,100 Z" fill="white" />
                            </svg>
                        </div>
                        <div className="relative z-10 flex justify-between items-center">
                            <div>
                                <h2 className="font-display text-xs md:text-sm mb-1 opacity-90 uppercase tracking-widest font-extrabold">
                                    {t('total')}
                                </h2>
                                <p className="font-display text-4xl md:text-5xl font-black tracking-tight">
                                    ¥
                                    {(
                                        Number(selectedBilling?.initial_price || 0) +
                                        Number(
                                            selectedPayment?.additional_price || 0
                                        )
                                    ).toLocaleString('ja-JP')}
                                </p>
                            </div>
                            <div className="text-right hidden sm:block">
                                <p className="text-xs opacity-75 font-semibold uppercase">{product.nama}</p>
                                <p className="text-sm font-black">{selectedVariant?.gb}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={orderWhatsApp}
                        className="premium-btn w-full text-base py-4 font-bold shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                        }}
                    >
                        {t('orderWhatsapp')}
                    </button>
                </div>
            </div>
        </div>
    );
}
