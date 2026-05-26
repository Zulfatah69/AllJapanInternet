'use client';

import { useEffect, useMemo, useState } from 'react';
import api from './lib/api';
import { getProducts } from './services/product.service';
import { useLanguage } from './context/LanguageContext';
import { splitCatalogProducts } from './lib/productGroups';
import BenefitsSection from './components/BenefitsSection';
import HowToSection from './components/HowToSection';
import AboutSection from './components/AboutSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import FaqSection from './components/FaqSection';
import ProductCatalogCard from './components/ProductCatalogCard';
import SimpleWifiCard from './components/SimpleWifiCard';
import SectionHeader from './components/SectionHeader';
import {
    FaWhatsapp,
    FaBook,
    FaShippingFast,
    FaBoxOpen,
} from 'react-icons/fa';
import { getSimpleProducts } from './lib/api';

const FACEBOOK_URL_1 = 'https://www.facebook.com/all.japan.internet';
const FACEBOOK_URL_2 = 'https://www.facebook.com/groups/all.japan.internet';

export default function HomePage() {
    const { language, t, theme } = useLanguage();

    const [products, setProducts] = useState<any[]>([]);
    const [promos, setPromos] = useState<any[]>([]);
    const [currentPromo, setCurrentPromo] = useState(0);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [
        simpleProducts,
        setSimpleProducts
    ] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        loadProducts();
        loadPromos();
        loadTestimonials();
        loadSimpleProducts();
        setIsMounted(true);
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
            const data = await getSimpleProducts();
            setSimpleProducts(Array.isArray(data) ? data : data?.data ?? []);
        } catch {
            setSimpleProducts([]);
        }
    }

    const { simEsim: simEsimProducts, wifi: wifiProducts } = useMemo(
        () => splitCatalogProducts(products),
        [products]
    );

    const hasWifiCatalog =
        wifiProducts.length > 0 || simpleProducts.length > 0;

    return (
        <div className="overflow-x-hidden">
            {/* HERO */}
            {promos.length > 0 && (
                <section className="relative mt-0 min-h-screen overflow-hidden pt-24 flex items-center justify-center">
                    {/* Smooth image crossfade slider */}
                    <div className="absolute inset-0 z-0">
                        {promos.map((promo, idx) => (
                            <div
                                key={promo.id || idx}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    idx === currentPromo ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                            >
                                <img
                                    src={promo.gambar_url}
                                    alt=""
                                    className="w-full h-full object-cover transition-transform duration-[5000ms] ease-out"
                                    style={{ transform: idx === currentPromo ? 'scale(1.02)' : 'scale(1.08)' }}
                                />
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2.5px]" />
                            </div>
                        ))}
                    </div>

                    {/* Floating Ambient seasonal particles over image background */}
                    <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
                        {isMounted && theme === 'spring' && (
                            <>
                                {[...Array(15)].map((_, i) => (
                                    <svg
                                        key={`hero-petal-${i}`}
                                        className="absolute opacity-75"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `-40px`,
                                            width: `${10 + Math.random() * 12}px`,
                                            height: `${10 + Math.random() * 12}px`,
                                            fill: '#FF69B4',
                                            animation: `float-sakura ${10 + Math.random() * 8}s linear infinite`,
                                            animationDelay: `${Math.random() * 8}s`,
                                        }}
                                        viewBox="0 0 30 30"
                                    >
                                        <path d="M15 0 C25 10, 25 20, 15 30 C5 20, 5 10, 15 0" />
                                    </svg>
                                ))}
                            </>
                        )}
                        {isMounted && theme === 'winter' && (
                            <>
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={`hero-snow-${i}`}
                                        className="absolute rounded-full bg-white opacity-60"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `-20px`,
                                            width: `${3 + Math.random() * 5}px`,
                                            height: `${3 + Math.random() * 5}px`,
                                            boxShadow: `0 0 6px #fff`,
                                            animation: `float-snow ${8 + Math.random() * 6}s linear infinite`,
                                            animationDelay: `${Math.random() * 6}s`,
                                        }}
                                    />
                                ))}
                            </>
                        )}
                        {isMounted && theme === 'autumn' && (
                            <>
                                {[...Array(12)].map((_, i) => (
                                    <svg
                                        key={`hero-leaf-${i}`}
                                        className="absolute opacity-75"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `-40px`,
                                            width: `${14 + Math.random() * 10}px`,
                                            height: `${14 + Math.random() * 10}px`,
                                            fill: '#EA580C',
                                            animation: `float-leaf ${11 + Math.random() * 8}s linear infinite`,
                                            animationDelay: `${Math.random() * 8}s`,
                                            transform: `rotate(${Math.random() * 360}deg)`,
                                        }}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C11.5 4 8.5 7 7 9C5.5 11 3 12 3 13.5C3 15.5 5 17 7 17C9 17 11 15 12 13.5C13 15 15 17 17 17C19 17 21 15.5 21 13.5C21 12 18.5 11 17 9C15.5 7 12.5 4 12 2Z" />
                                    </svg>
                                ))}
                            </>
                        )}
                        {isMounted && theme === 'summer' && (
                            <div className="absolute inset-0 opacity-15 overflow-hidden">
                                <div
                                    className="absolute -top-[15%] -right-[15%] w-[80%] aspect-square rounded-full mix-blend-screen"
                                    style={{
                                        background: 'radial-gradient(circle, #FEF08A 0%, transparent 60%)',
                                        animation: 'sunbeam-pulse 10s ease-in-out infinite',
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Premium Frosted Glass Text Overlay Card */}
                    <div
                        className="relative z-20 max-w-4xl mx-auto px-6 py-12 md:py-16 rounded-3xl border border-white/10 backdrop-blur-md text-center text-white premium-fade-up shadow-2xl bg-black/35"
                        style={{
                            boxShadow: `0 30px 70px -15px rgba(0,0,0,0.55), 0 0 30px ${
                                theme === 'spring' ? 'rgba(255, 105, 180, 0.35)' :
                                theme === 'summer' ? 'rgba(234, 179, 8, 0.25)' :
                                theme === 'autumn' ? 'rgba(234, 88, 12, 0.3)' :
                                'rgba(56, 189, 248, 0.35)'
                            }`,
                        }}
                    >
                        <p className="premium-eyebrow text-white/90 mb-4 tracking-widest font-bold text-xs md:text-sm">
                            {t('heroEyebrow')}
                        </p>
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 max-w-4xl font-extrabold leading-tight tracking-tight drop-shadow-md text-white">
                            {t('heroTitle')}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-3 max-w-2xl mx-auto font-medium">
                            {t('heroDesc')}
                        </p>
                        <p className="text-sm md:text-base text-white/70 mb-10 mx-auto tracking-wide font-light">
                            {t('tagline')}
                        </p>
                        <a href="#products" className="premium-btn text-sm md:text-base px-8 py-4 font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200">
                            {t('heroCta')}
                        </a>
                    </div>

                    {/* Slider dot navigation + horizontal loading bar */}
                    <div className="absolute bottom-10 left-0 right-0 z-20 flex flex-col items-center gap-4">
                        {/* Dot Navigation */}
                        <div className="flex gap-2">
                            {promos.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentPromo(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        idx === currentPromo ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Active Progress bar */}
                        <div className="w-32 h-0.5 bg-white/20 rounded-full overflow-hidden">
                            <div
                                key={currentPromo} /* Re-triggers animation on slide change */
                                className="h-full bg-white transition-all rounded-full"
                                style={{
                                    animation: 'hero-progress 5s linear forwards',
                                }}
                            />
                        </div>
                    </div>
                </section>
            )}

            <AboutSection />

            <BenefitsSection />

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

                    {simEsimProducts.length > 0 && (
                        <div className="mb-16 md:mb-20">
                            <h3
                                className="font-display text-2xl md:text-3xl mb-2"
                                style={{ color: 'var(--foreground)' }}
                            >
                                {t('productsSimTitle')}
                            </h3>
                            <p
                                className="text-sm mb-8"
                                style={{ color: 'var(--theme-muted)' }}
                            >
                                {t('productsSimSubtitle')}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {simEsimProducts.map((product) => (
                                    <ProductCatalogCard
                                        key={product.id}
                                        product={product}
                                        language={language}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {hasWifiCatalog && (
                        <div>
                            <h3
                                className="font-display text-2xl md:text-3xl mb-2"
                                style={{ color: 'var(--foreground)' }}
                            >
                                {t('productsWifiTitle')}
                            </h3>
                            <p
                                className="text-sm mb-8"
                                style={{ color: 'var(--theme-muted)' }}
                            >
                                {t('productsWifiSubtitle')}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {wifiProducts.map((product) => (
                                    <ProductCatalogCard
                                        key={product.id}
                                        product={product}
                                        language={language}
                                    />
                                ))}
                                {simpleProducts.map((item) => (
                                    <SimpleWifiCard
                                        key={`simple-${item.id}`}
                                        item={item}
                                        whatsappLabel={t('wifiAskWhatsapp')}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <HowToSection />

            <PaymentMethodsSection />

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

            <FaqSection />

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
                                <a
                                    href="https://www.instagram.com/all_japan_internet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                    style={{ color: 'var(--theme-muted)' }}
                                >
                                    @all_japan_internet
                                </a>
                            </p>
                            <p>
                                <span
                                    className="font-semibold block mb-1"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {t('contactFacebook')}
                                </span>
                                <span className="flex flex-col gap-1.5">
                                    <a
                                        href={FACEBOOK_URL_1}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline block"
                                        style={{ color: 'var(--theme-muted)' }}
                                    >
                                        Warung Kartu All Japan Intanet
                                    </a>
                                    <a
                                        href={FACEBOOK_URL_2}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline block"
                                        style={{ color: 'var(--theme-muted)' }}
                                    >
                                        All Japan Internet
                                    </a>
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
