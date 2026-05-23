'use client';

import { useEffect, useState } from 'react';
import api from './lib/api';
import { getProducts } from './services/product.service';
import { useLanguage } from './context/LanguageContext';
import { formatLowestPrice } from './lib/productPrice';
import BenefitsSection from './components/BenefitsSection';
import HowToSection from './components/HowToSection';
import SectionHeader from './components/SectionHeader';
import {
    FaWhatsapp,
    FaTruck,
    FaBook,
    FaShippingFast,
    FaBoxOpen,
} from 'react-icons/fa';
import {
    getSimpleProducts
} from './lib/api';
export default function HomePage() {
    const { language, t } = useLanguage();

    const [products, setProducts] = useState<any[]>([]);
    const [promos, setPromos] = useState<any[]>([]);
    const [currentPromo, setCurrentPromo] = useState(0);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [
        simpleProducts,
        setSimpleProducts
    ] = useState<any[]>([]);
    useEffect(() => {
        loadProducts();
        loadPromos();
        loadTestimonials();
        loadSimpleProducts();
    }, []);

    useEffect(() => {
        if (promos.length === 0) return;
        const interval = setInterval(() => {
            setCurrentPromo((prev) =>
                prev === promos.length - 1 ? 0 : prev + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [promos]);

    async function loadProducts() {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch {
            setProducts([]);
        }
    }

    async function loadPromos() {
        try {
            const response = await api.get('/promos');
            setPromos(
                Array.isArray(response.data)
                    ? response.data
                    : response.data?.data || []
            );
        } catch {
            setPromos([]);
        }
    }

    async function loadTestimonials() {
        try {
            const response = await api.get('/testimonials');
            setTestimonials(
                Array.isArray(response.data)
                    ? response.data
                    : response.data?.data || []
            );
        } catch {
            setTestimonials([]);
        }
    }
    async function loadSimpleProducts() {

        try {

            const data =
                await getSimpleProducts();

            setSimpleProducts(

                Array.isArray(data)
                    ? data
                    : []

            );

        } catch {

            setSimpleProducts([]);
        }
    }
    return (
        <div className="overflow-x-hidden">
            {/* HERO */}
            {promos.length > 0 && (
                <section className="relative -mt-20 md:-mt-28 min-h-screen overflow-hidden">
                    <img
                        src={promos[currentPromo]?.gambar_url}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/55" />
                    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center text-white px-6 premium-fade-up">
                        <p className="premium-eyebrow text-white/90 mb-4">
                            {t('heroEyebrow')}
                        </p>
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 max-w-4xl">
                            {t('heroTitle')}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-3 max-w-2xl">
                            {t('heroDesc')}
                        </p>
                        <p className="text-base text-white/75 mb-10">
                            {t('tagline')}
                        </p>
                        <a href="#products" className="premium-btn">
                            {t('heroCta')}
                        </a>
                    </div>
                </section>
            )}

            <BenefitsSection />

            {/* PRODUCTS */}
            <section
                id="products"
                className="py-20 md:py-28 px-6"
                style={{ background: 'var(--background)' }}
            >
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        eyebrow={t('productsEyebrow')}
                        title={t('productsTitle')}
                        subtitle={t('productsSubtitle')}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {products.map((product) => (
                            <a
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="premium-product-card group block"
                            >
                                <div className="overflow-hidden aspect-[4/3]">
                                    <img
                                        src={product.thumbnail_url}
                                        alt={product.nama}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-5 md:p-6">
                                    <p
                                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                                        style={{ color: 'var(--theme-primary)' }}
                                    >
                                        {product.category?.nama}
                                    </p>
                                    <h3
                                        className="font-display text-lg md:text-xl mb-2"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        {product.nama}
                                    </h3>
                                    <p
                                        className="text-sm mb-4"
                                        style={{ color: 'var(--theme-muted)' }}
                                    >
                                        {product.provider?.nama}
                                    </p>
                                    <p
                                        className="font-display text-xl"
                                        style={{ color: 'var(--theme-primary)' }}
                                    >
                                        {formatLowestPrice(product, language)}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <HowToSection />

            {/* GUIDE */}
            <section
                id="guide"
                className="py-20 md:py-28 px-6 premium-mesh text-center"
            >
                <div className="max-w-3xl mx-auto premium-fade-up">
                    <FaBook
                        className="text-5xl mx-auto mb-6"
                        style={{ color: 'var(--theme-primary)' }}
                    />
                    <SectionHeader
                        eyebrow={t('guideEyebrow')}
                        title={t('guideTitle')}
                        subtitle={t('guideDesc')}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="/Buku Panduan Bulanan.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="premium-btn"
                        >
                            {t('guideMonthly')}
                        </a>
                        <a
                            href="/Buku Panduan Tahunan.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="premium-btn-outline"
                        >
                            {t('guideYearly')}
                        </a>
                    </div>
                </div>
            </section>

            {/* SHIPPING */}
            <section
                id="shipping"
                className="py-20 md:py-28 px-6"
                style={{ background: 'var(--theme-section)' }}
            >
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        eyebrow={t('shippingEyebrow')}
                        title={t('shippingTitle')}
                        subtitle={t('shippingSubtitle')}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="premium-card p-8 md:p-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white"
                                    style={{ background: 'var(--theme-primary)' }}
                                >
                                    <FaShippingFast />
                                </div>
                                <div>
                                    <h3
                                        className="font-display text-xl md:text-2xl"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        COD 1 Hari
                                    </h3>
                                    <p
                                        className="text-sm"
                                        style={{ color: 'var(--theme-muted)' }}
                                    >
                                        Transfer 1-2 Hari
                                    </p>
                                </div>
                            </div>
                            <p
                                className="leading-relaxed text-sm md:text-base"
                                style={{ color: 'var(--theme-muted)' }}
                            >
                                Tokyo, Kanagawa, Chiba, Saitama, Tochigi, Gunma,
                                Ibaraki, Fukushima, Miyagi, Yamagata, Akita,
                                Aomori, Iwate, Nagano, Shizuoka, Gifu, Aichi,
                                Yamanashi, Fukui, Ishikawa, Toyama, dan Niigata.
                            </p>
                        </div>

                        <div className="premium-card p-8 md:p-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white"
                                    style={{ background: 'var(--theme-primary)' }}
                                >
                                    <FaBoxOpen />
                                </div>
                                <div>
                                    <h3
                                        className="font-display text-xl md:text-2xl"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        COD 2 Hari
                                    </h3>
                                    <p
                                        className="text-sm"
                                        style={{ color: 'var(--theme-muted)' }}
                                    >
                                        Transfer 2-3 Hari
                                    </p>
                                </div>
                            </div>
                            <p
                                className="leading-relaxed text-sm md:text-base"
                                style={{ color: 'var(--theme-muted)' }}
                            >
                                Hokkaido, Kyoto, Osaka, Nara, Hyogo, Shiga, Mie,
                                Hiroshima, Okayama, Shimane, Tottori, Yamaguchi,
                                Tokushima, Kagawa, Ehime, Kochi, Fukuoka,
                                Nagasaki, Kumamoto, Oita, Miyazaki, Kagoshima,
                                Okinawa.
                            </p>
                        </div>
                    </div>

                    <div
                        className="premium-card mt-8 p-8 text-center"
                        style={{
                            borderColor: 'var(--theme-primary)',
                            boxShadow: `0 8px 32px var(--theme-glow)`,
                        }}
                    >
                        <h3
                            className="font-display text-xl mb-3"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {t('shippingNoteTitle')}
                        </h3>
                        <p style={{ color: 'var(--theme-muted)' }}>
                            {t('shippingNote')}
                        </p>
                    </div>
                </div>
            </section>
            {/* SIMPLE PRODUCTS */}

            <section
                className="
                    py-20
                    md:py-28
                    px-6
                "
            >

                <div className="max-w-7xl mx-auto">

                    <SectionHeader
                        eyebrow="WIFI"
                        title="Wifi Products"
                        subtitle="Additional products and services"
                    />

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            gap-8
                        "
                    >

                        {simpleProducts.map((item) => (

                            <div
                                key={item.id}
                                className="
                                    premium-card
                                    overflow-hidden
                                    p-0
                                "
                            >

                                {item.gambar_url && (

                                    <img
                                        src={item.gambar_url}
                                        alt={item.nama}
                                        className="
                                            w-full
                                            h-72
                                            object-cover
                                        "
                                    />

                                )}

                                <div className="p-6">

                                    <h3
                                        className="
                                            text-2xl
                                            font-black
                                            mb-3
                                        "
                                    >
                                        {item.nama}
                                    </h3>

                                    <p
                                        className="
                                            text-gray-500
                                            mb-6
                                        "
                                    >
                                        {item.deskripsi}
                                    </p>

                                    <button
                                        onClick={() => {

                                            const message =

                                                `Hello Admin,%0A%0A` +

                                                `I want to ask about:%0A` +

                                                `${item.nama}`;

                                            window.open(

                                                `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${message}`,

                                                '_blank'
                                            );
                                        }}
                                        className="
                                            bg-green-500
                                            text-white
                                            px-6
                                            py-3
                                            rounded-2xl
                                            font-bold
                                        "
                                    >
                                        WhatsApp
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>
            {/* TESTIMONIALS */}
            <section
                className="py-20 md:py-28 px-6 premium-mesh"
            >
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        eyebrow={t('testimonialEyebrow')}
                        title={t('testimonialTitle')}
                        subtitle={t('testimonialSubtitle')}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                className="premium-card overflow-hidden p-0"
                            >
                                <img
                                    src={item.image_url}
                                    alt="Testimonial"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section
                id="contact"
                className="py-20 md:py-28 px-6"
                style={{ background: 'var(--background)' }}
            >
                <div className="max-w-5xl mx-auto">
                    <SectionHeader
                        eyebrow={t('contactEyebrow')}
                        title={t('contactTitle')}
                        subtitle={t('contactSubtitle')}
                    />

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <div className="premium-card p-8 space-y-5">
                            <p>
                                <span
                                    className="font-semibold block mb-1"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {t('contactWhatsapp')}
                                </span>
                                <span style={{ color: 'var(--theme-muted)' }}>
                                    +81 80-7555-8719
                                </span>
                            </p>
                            <p>
                                <span
                                    className="font-semibold block mb-1"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {t('contactEmail')}
                                </span>
                                <span style={{ color: 'var(--theme-muted)' }}>
                                    Alljapaninternet@gmail.com
                                </span>
                            </p>
                            <p>
                                <span
                                    className="font-semibold block mb-1"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {t('contactInstagram')}
                                </span>
                                <span style={{ color: 'var(--theme-muted)' }}>
                                    @all_japan_internet
                                </span>
                            </p>
                        </div>

                        <div className="premium-card p-8 space-y-5">
                            <p>
                                <span
                                    className="font-semibold block mb-1"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {t('contactLocation')}
                                </span>
                                <span style={{ color: 'var(--theme-muted)' }}>
                                    Shinjuku, Tokyo
                                </span>
                            </p>
                            <p>
                                <span
                                    className="font-semibold block mb-1"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {t('contactHours')}
                                </span>
                                <span style={{ color: 'var(--theme-muted)' }}>
                                    {language === 'id'
                                        ? 'Setiap hari 09.00 - 23.00'
                                        : 'Daily 09:00 - 23:00'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <a
                href="https://wa.me/818075558719"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl z-50 text-3xl transition-transform hover:scale-105"
                aria-label="WhatsApp"
            >
                <FaWhatsapp />
            </a>
        </div>
    );
}
