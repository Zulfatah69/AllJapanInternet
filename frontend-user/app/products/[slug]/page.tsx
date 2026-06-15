'use client';

import { useEffect, useState, useMemo } from 'react';
import api from '../../lib/api';
import { useLanguage } from '@/app/context/LanguageContext';
import Lightbox from '@/app/components/Lightbox';
import { FaInfoCircle } from 'react-icons/fa';

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
    const { language, t, translateDynamicText, getLocalizedText } = useLanguage();

    const [slug, setSlug] = useState('');
    const [product, setProduct] = useState<any>(null);
    const [setting, setSetting] = useState<any>(null);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [selectedBilling, setSelectedBilling] = useState<any>(null);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const visiblePayments = useMemo(
        () => getVisiblePayments(product?.payment_methods),
        [product?.payment_methods]
    );

    const isSoftbank = useMemo(() => {
        const provName = (product?.provider?.nama || '').toUpperCase();
        const prodName = (product?.nama || '').toUpperCase();
        return provName.includes('SOFTBANK') || provName.includes('SOFTBANK');
    }, [product?.provider?.nama, product?.nama]);

    const isJumbo = useMemo(() => {
        const prodName = (product?.nama || '').toUpperCase();
        return slug === 'softbank-jumbo' || prodName.includes('JUMBO') || prodName.includes('GJ');
    }, [product?.nama, slug]);

    const isYearlyOrFixed = useMemo(() => {
        const prodName = (product?.nama || '').toUpperCase();
        const catName = (product?.category?.nama || '').toUpperCase();
        return (
            prodName.includes('TAHUNAN') || 
            prodName.includes('BERJANGKA') || 
            prodName.includes('YEARLY') || 
            prodName.includes('FIXED') ||
            catName.includes('TAHUNAN') || 
            catName.includes('BERJANGKA') || 
            catName.includes('YEARLY')
        );
    }, [product?.nama, product?.category?.nama]);

    const isEsim = useMemo(() => {
        const catName = (product?.category?.nama || '').toUpperCase();
        const prodName = (product?.nama || '').toUpperCase();
        return catName.includes('E-SIM') || prodName.includes('E-SIM');
    }, [product?.category?.nama, product?.nama]);

    const uniquePeriodNames = useMemo(() => {
        const names = new Set<string>();
        product?.variants?.forEach((variant: any) => {
            const periods = getBillingPeriods(variant);
            periods.forEach((period: any) => {
                if (period.nama) {
                    names.add(period.nama);
                }
            });
        });
        return Array.from(names);
    }, [product?.variants]);

    const hasPeriods = useMemo(() => {
        return product?.variants?.some((v: any) => getBillingPeriods(v).length > 0);
    }, [product?.variants]);

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

    const translatePeriodName = (name: string | undefined) => {
        if (!name) return '';
        if (language === 'en') {
            return name
                .replace(/BULAN/gi, 'MONTHS')
                .replace(/HARI/gi, 'DAYS')
                .replace(/TAHUN/gi, 'YEARS')
                .replace(/MINGGU/gi, 'WEEKS');
        }
        return name;
    };

    function orderWhatsApp() {
        if (!product || !selectedVariant) return;

        const total =
            Number(selectedBilling?.initial_price || 0) +
            Number(selectedPayment?.additional_price || 0);

        const variantLabel = 
            isSoftbank && !isYearlyOrFixed && !isJumbo && selectedVariant.gb.includes('100')
                ? (selectedVariant.gb.includes('Day') || selectedVariant.gb.includes('3.3')
                    ? (language === 'id' ? '100GB (Batas Harian 3,3GB / Hari)' : '100GB (3.3GB / Day Daily Limit)')
                    : (language === 'id' ? '100GB (Tanpa Limit Harian)' : '100GB (No Daily Limit)'))
                : selectedVariant.gb;

        const message =
            `Hello Admin,%0A%0A` +
            `I want to order:%0A%0A` +
            `Product: ${product.nama}%0A` +
            `Variant: ${variantLabel}%0A` +
            `Billing Period: ${translatePeriodName(selectedBilling?.nama)}%0A` +
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

    
    const renderInitialPaymentInfoCard = () => {
        if (!hasPeriods) return null;
        return (
                        <div 
                            className="premium-card p-6 md:p-8 rounded-2xl border transition-all duration-300 animate-fade-in"
                            style={{ 
                                background: 'rgba(255, 255, 255, 0.45)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                borderColor: 'color-mix(in srgb, var(--theme-primary) 15%, transparent)'
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div 
                                    className="p-2.5 rounded-xl flex items-center justify-center text-white"
                                    style={{ 
                                        background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                                        boxShadow: '0 4px 12px var(--theme-glow)'
                                    }}
                                >
                                    <FaInfoCircle className="text-lg" />
                                </div>
                                <div>
                                    <h3 
                                        className="text-base font-black uppercase tracking-wider"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        {isYearlyOrFixed 
                                            ? (language === 'id' ? 'Detail Harga' : 'Price Details')
                                            : (language === 'id' ? 'Detail Pembayaran Awal' : 'Initial Payment Details')
                                        }
                                    </h3>
                                    <p 
                                        className="text-xs font-semibold"
                                        style={{ color: 'var(--theme-muted)' }}
                                    >
                                        {language === 'id' ? 'Biaya berdasarkan tanggal pembelian' : 'Price based on purchase date'}
                                    </p>
                                </div>
                            </div>

                            <p className="text-xs font-semibold mb-4 leading-relaxed" style={{ color: 'var(--theme-muted)' }}>
                                {isYearlyOrFixed ? (
                                    language === 'id' 
                                        ? 'Berikut rincian biaya berdasarkan Periode Masa Aktif:'
                                        : 'Here is the cost breakdown based on the Active Period:'
                                ) : (
                                    language === 'id' 
                                        ? 'Pembayaran awal menyesuaikan tanggal pembelian kartu/layanan dan pilihan paket. Berikut rincian biaya awal berdasarkan periode pembelian:'
                                        : 'Initial payment adjusts according to the purchase date and selected package. Here is the initial cost breakdown based on the purchase period:'
                                )}
                            </p>

                            {/* Responsive Table */}
                            <div className="overflow-x-auto rounded-xl border mb-6" style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 15%, transparent)' }}>
                                <table className="w-full text-sm border-collapse text-left">
                                    <thead>
                                        <tr 
                                            className="border-b font-extrabold uppercase tracking-wider text-[11px]"
                                            style={{ 
                                                background: 'color-mix(in srgb, var(--theme-primary) 6%, transparent)', 
                                                borderColor: 'color-mix(in srgb, var(--theme-primary) 15%, transparent)',
                                                color: 'var(--theme-muted)'
                                            }}
                                        >
                                            <th className="py-3 px-4 font-black">Variant</th>
                                            {uniquePeriodNames.map((name) => (
                                                <th key={name} className="py-3 px-4 font-black whitespace-nowrap text-center">
                                                    {translatePeriodName(name)}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y font-medium" style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)' }}>
                                        {product?.variants?.map((variant: any) => {
                                            const periods = getBillingPeriods(variant);
                                            return (
                                                <tr key={variant.id} className="hover:bg-slate-50/40 transition-colors duration-150 border-b" style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)' }}>
                                                    <td className="py-3.5 px-4 font-bold" style={{ color: 'var(--foreground)' }}>
                                                        {variant.gb ? (variant.gb.toString().toUpperCase().includes('GB') ? variant.gb : `${variant.gb} GB`) : variant.nama}
                                                        {Number(variant.monthly_price || 0) > 0 && (
                                                            <span className="text-xs font-semibold opacity-70 ml-1.5">
                                                                (¥{Number(variant.monthly_price).toLocaleString()}/{language === 'id' ? 'bln' : 'mo'})
                                                            </span>
                                                        )}
                                                    </td>
                                                    {uniquePeriodNames.map((name) => {
                                                        const p = periods.find((x: any) => x.nama === name);
                                                        return (
                                                            <td key={name} className="py-3.5 px-4 font-black text-center" style={{ color: 'var(--theme-primary)' }}>
                                                                {p ? `¥${Number(p.initial_price || 0).toLocaleString()}` : '-'}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Terms and Details Section */}
                            <div className="space-y-4">
                                <div className="h-[1px]" style={{ background: 'color-mix(in srgb, var(--theme-primary) 12%, transparent)' }} />
                                <div className="text-xs space-y-4 font-semibold">
                                    {/* Detail Pembayaran */}
                                    {!isYearlyOrFixed && (
                                        <div className="space-y-2">
                                            <p className="font-bold text-[13px]" style={{ color: 'var(--foreground)' }}>
                                                {language === 'id' ? 'Detail Pembayaran:' : 'Payment Details:'}
                                            </p>
                                            <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed" style={{ color: 'var(--theme-muted)' }}>
                                                {product.type === 'monthly' && product.cycle_type && (
                                                    <li className="font-bold text-[#cc0000]">
                                                        {language === 'id' ? 'Siklus Pembayaran Per-Bulan: ' : 'Billing Cycle: '}
                                                        {product.cycle_type.toUpperCase() === 'VT' ? 'Tanggal 20-28' : 
                                                         product.cycle_type.toUpperCase() === 'GJ' ? 'Tanggal 18-24' : product.cycle_type.toUpperCase()}
                                                    </li>
                                                )}
                                                <li>{language === 'id' ? 'Pembelian tanggal 1-10 : dapat kuota 1 bulan(bulan saat pembelian di lakukan)' : 'Purchase on 1st-10th : get 1 month quota (the month of purchase)'}</li>
                                                <li>{language === 'id' ? 'Pembelian tanggal 11-19 : dapat kuota 2 bulan(bulan saat pembelian di lakukan dan bulan selanjutnya)' : 'Purchase on 11th-19th : get 2 months quota (month of purchase and the next month)'}</li>
                                                <li>{language === 'id' ? 'Pembelian tanggal 20-31 : dapat kuota 2 bulan(bulan saat pembelian di lakukan dan bulan selanjutnya)' : 'Purchase on 20th-31st : get 2 months quota (month of purchase and the next month)'}</li>
                                            </ul>
                                        </div>
                                    )}

                                    {/* Informasi Produk Tahunan */}
                                    {isYearlyOrFixed && (
                                        <div className="space-y-2">
                                            <p className="font-bold text-[13px]" style={{ color: 'var(--foreground)' }}>
                                                {language === 'id' ? 'Informasi Produk:' : 'Product Information:'}
                                            </p>
                                            <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed" style={{ color: 'var(--theme-muted)' }}>
                                                <li>{language === 'id' ? 'Akan dapat Kuota Setiap Bulan' : 'Will receive quota every month'}</li>
                                                <li>{language === 'id' ? 'Masa aktif terhitung sejak bulan pembelian' : 'The active period is calculated from the month of purchase'}</li>
                                                <li>{language === 'id' ? 'Setiap bulan akan dapat kuota sesuai dengan varian yang dipilih' : 'You will receive the selected quota amount every month'}</li>
                                                <li>{language === 'id' ? 'Data reset di tanggal 1 setiap bulannya' : 'Data resets on the 1st of every month'}</li>
                                                <li>{language === 'id' ? 'Bisa diperpanjang minimal konfirmasi 2 bulan sebelum masa aktif habis' : 'Can be extended with confirmation at least 2 months before the active period expires'}</li>
                                            </ul>
                                        </div>
                                    )}

                                    {/* 3. DOCOMO Rollover */}
                                    {(product.provider?.nama || '').toUpperCase().includes('DOCOMO') && (
                                        <div className="space-y-1">
                                            <p className="font-bold text-[13px]" style={{ color: 'var(--foreground)' }}>
                                                DATA ROLLOVER:
                                            </p>
                                            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--theme-muted)' }}>
                                                {language === 'id' 
                                                    ? 'Mulai tanggal 1 November, semua pesanan baru kuota kartu DOCOMO akan riset pada tanggal 16 setiap bulannya, jika kuota masih tersisa di bulan sebelumnya, bisa di gunakan di bulan seblumnya dengan maksimal sesuai kuota yang di pilih.' 
                                                    : 'Starting November 1st, all new DOCOMO data card orders will reset on the 16th of each month. Any remaining quota from the previous month can be rolled over up to the maximum of your chosen plan.'}
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    
        );
    };

    const billingPeriods = getBillingPeriods(selectedVariant);

    return (
        <div className="max-w-7xl mx-auto px-5 md:px-10 pb-16 pt-28 md:pt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                <div className="flex flex-col gap-8 h-fit">
                    <div 
                        className="relative w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border cursor-zoom-in group h-fit"
                        style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 15%, transparent)' }}
                        onClick={() => setIsLightboxOpen(true)}
                    >
                        <img
                            src={product.thumbnail_url}
                            alt={product.nama}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Zoom hover overlay */}
                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                                        {/* Initial Payment Info Card (Desktop) */}
                    <div className="hidden lg:block mt-8">
                        {renderInitialPaymentInfoCard()}
                    </div>
                </div>

                <div>

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
                        {getLocalizedText(product.deskripsi, product.deskripsi_en)}
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
                                                <span className="font-bold">
                                                    {isSoftbank && !isYearlyOrFixed && !isJumbo && variant.gb.includes('100')
                                                        ? (variant.gb.includes('Day') || variant.gb.includes('3.3')
                                                            ? (language === 'id' ? '100GB (Batas Harian 3,3GB / Hari)' : '100GB (3.3GB / Day Daily Limit)')
                                                            : (language === 'id' ? '100GB (Tanpa Limit Harian)' : '100GB (No Daily Limit)'))
                                                        : variant.gb
                                                    }
                                                </span>
                                            </div>
                                            {!isYearlyOrFixed && (
                                                <div className="text-right">
                                                    <span className="font-display text-lg font-black block">
                                                        ¥
                                                        {Number(
                                                            variant.monthly_price || 0
                                                        ).toLocaleString('ja-JP')}
                                                    </span>
                                                    {Number(variant.monthly_price || 0) > 0 && (
                                                        <span className="text-[10px] opacity-70 font-semibold block -mt-1">
                                                            {language === 'id' ? '*Harga kuota bulanan' : '*Monthly quota price'}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* BILLING */}
                    {billingPeriods.filter((p: any) => !isYearlyOrFixed || Number(p.initial_price || 0) > 0).length > 0 && (
                        <div className="mb-10">
                            <h2
                                className={sectionHeading}
                                style={{ color: 'var(--theme-primary)' }}
                            >
                                {isYearlyOrFixed ? (language === 'id' ? 'Periode Masa Aktif' : 'Active Period') : t('billingPeriod')}
                            </h2>
                            <div className="space-y-3">
                                {billingPeriods
                                    .filter((p: any) => !isYearlyOrFixed || Number(p.initial_price || 0) > 0)
                                    .map((period: any) => {
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
                                                    <span className="font-bold">
                                                        {language === 'id' ? (isYearlyOrFixed ? '' : 'Tanggal ') : (isYearlyOrFixed ? '' : 'Date ')}
                                                        {translatePeriodName(period.nama)}
                                                    </span>
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

                    {/* Initial Payment Info Card (Mobile) */}
                    <div className="block lg:hidden mt-10">
                        {renderInitialPaymentInfoCard()}
                    </div>
                </div>
            </div>
            {isLightboxOpen && product.thumbnail_url && (
                <Lightbox
                    images={[product.thumbnail_url]}
                    initialIndex={0}
                    isOpen={isLightboxOpen}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </div>
    );
}
