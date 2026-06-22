'use client';

import { useEffect, useMemo, useState } from 'react';
import api from './lib/api';
import { getProducts } from './services/product.service';
import { useLanguage } from './context/LanguageContext';
import { splitCatalogProducts, isYearlyCategory, isPocketWifiCategory, isEsimCategory } from './lib/productGroups';
import BenefitsSection from './components/BenefitsSection';
import PromoCarousel from './components/PromoCarousel';
import ProductCarouselWrapper from './components/ProductCarouselWrapper';
import HowToSection from './components/HowToSection';

import HomeWifiBanner from './components/HomeWifiBanner';
import AboutSection from './components/AboutSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import FaqSection from './components/FaqSection';
import ProductCatalogCard from './components/ProductCatalogCard';
import SimpleWifiCard from './components/SimpleWifiCard';
import SectionHeader from './components/SectionHeader';
import TestimonialMarquee from './components/TestimonialMarquee';
import {
    FaWhatsapp,
    FaBook,
    FaShippingFast,
    FaBoxOpen,
    FaEnvelope,
    FaInstagram,
    FaFacebook,
    FaMapMarkerAlt,
    FaClock,
    FaChevronRight,
    FaHeadset,
    FaShareAlt,
} from 'react-icons/fa';
import { getSimpleProducts } from './lib/api';
import Lightbox from './components/Lightbox';

const FACEBOOK_URL_1 = 'https://www.facebook.com/all.japan.internet';
const FACEBOOK_URL_2 = 'https://www.facebook.com/groups/all.japan.internet';

const seasonalBackgrounds: Record<string, string> = {
    spring: '/images/spring-background.png',
    summer: '/images/summer-background.png',
    autumn: '/images/autumn-background.png',
    winter: '/images/winter-background.png',
};

// Global cache to survive Next.js client-side navigations and Chrome Back button
let cachedProducts: any[] | null = null;
let cachedPromos: any[] | null = null;
let cachedTestimonials: any[] | null = null;
let cachedSimpleProducts: any[] | null = null;
let cachedCategories: any[] | null = null;

export default function HomePage() {
    const { language, t, theme, isThemeReady, translateDynamicText } = useLanguage();

    const getCategoryTitle = (items: any[], fallback: string) => {
        const item = items.find(x => x.category?.nama);
        const nama = item?.category?.nama || fallback;
        return translateDynamicText(nama);
    };

    const getCategorySubtitle = (items: any[], fallback: string) => {
        const item = items.find(x => x.category?.slug);
        const slug = (item?.category?.slug || '').toLowerCase();
        
        if (slug.includes('bulanan') || slug.includes('monthly')) {
            if (slug.includes('esim') || slug.includes('e-sim')) {
                return language === 'id' 
                    ? 'Paket eSIM dengan sistem bulanan fleksibel tanpa kontrak jangka panjang' 
                    : 'eSIM packages with flexible monthly plans and no long-term contracts';
            }
            return language === 'id' 
                ? 'Pilihan kartu SIM internet fisik bulanan praktis untuk pekerja dan pelajar' 
                : 'Practical physical monthly internet SIM card options for workers and students';
        }
        
        if (slug.includes('tahunan') || slug.includes('yearly') || slug.includes('annual')) {
            if (slug.includes('esim') || slug.includes('e-sim')) {
                return language === 'id' 
                    ? 'Paket eSIM hemat jangka panjang aktif hingga 1 tahun penuh' 
                    : 'Cost-effective long-term eSIM packages active for up to 1 full year';
            }
            return language === 'id' 
                ? 'Kartu SIM internet fisik tahunan super hemat dengan kuota melimpah' 
                : 'Super economical yearly physical internet SIM cards with abundant data quota';
        }
        
        if (slug.includes('pocket') || slug.includes('portable') || slug.includes('wifi')) {
            if (slug.includes('home')) {
                return language === 'id' 
                    ? 'Modem WiFi rumah tanpa kabel dengan koneksi stabil untuk keluarga' 
                    : 'Wireless home WiFi modem with stable connection for family';
            }
            return language === 'id' 
                ? 'Perangkat modem WiFi portable praktis yang bisa dibawa ke mana saja di Jepang' 
                : 'Practical portable WiFi modem devices that you can carry anywhere in Japan';
        }

        return fallback;
    };

    const [products, setProducts] = useState<any[]>([]);
    const [promos, setPromos] = useState<any[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [simpleProducts, setSimpleProducts] = useState<any[]>([]);
    const [categoriesList, setCategoriesList] = useState<any[]>([]);
    
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [currentPromo, setCurrentPromo] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [heroParticles, setHeroParticles] = useState<any[]>([]);

    useEffect(() => {
        if (!isMounted) return;
        
        let count = 10;
        if (theme === 'spring') count = 15;
        else if (theme === 'winter') count = 20;
        else if (theme === 'autumn') count = 12;
        else if (theme === 'summer') count = 15;
        
        const generated = [...Array(count)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: Math.random(),
            delay: Math.random(),
            duration: Math.random(),
            rotation: `${Math.random() * 360}deg`
        }));
        
        setHeroParticles(generated);
    }, [theme, isMounted]);

    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [activeShippingTab, setActiveShippingTab] = useState<'info' | 'map'>('info');
    
    useEffect(() => {
        loadProducts();
        loadPromos();
        loadTestimonials();
        loadSimpleProducts();
        loadCategories();
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
        if (!cachedProducts) setIsLoadingProducts(true);
        try {
            const data = await getProducts();
            cachedProducts = data;
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setIsLoadingProducts(false);
        }
    }

    async function loadPromos() {
        if (cachedPromos) return;
        try {
            const response = await api.get('/promos');
            const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
            cachedPromos = data;
            setPromos(data);
        } catch (error) {
            console.error('Failed to load promos:', error);
        }
    }

    async function loadTestimonials() {
        if (cachedTestimonials) return;
        try {
            const response = await api.get('/testimonials');
            const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
            cachedTestimonials = data;
            setTestimonials(data);
        } catch (error) {
            console.error('Failed to load testimonials:', error);
        }
    }
    async function loadSimpleProducts() {
        if (cachedSimpleProducts) return;
        try {
            const data = await getSimpleProducts();
            const resData = Array.isArray(data) ? data : data?.data ?? [];
            cachedSimpleProducts = resData;
            setSimpleProducts(resData);
        } catch (error) {
            console.error('Failed to load simple products:', error);
        }
    }

    async function loadCategories() {
        if (cachedCategories) return;
        try {
            const response = await api.get('/categories');
            const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
            cachedCategories = data;
            setCategoriesList(data);
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    }

    // DYNAMIC CATEGORY GROUPING
    const groupedProducts = useMemo(() => {
        const groups: Record<string, { items: any[], sort_order: number }> = {};
        
        const categoryOrderMap: Record<string, number> = {};
        for (const cat of categoriesList) {
            categoryOrderMap[cat.nama] = cat.sort_order || 0;
        }

        for (const prod of products) {
            const catName = typeof prod.category === 'string' ? prod.category : prod.category?.nama || 'Lainnya';
            let sortOrder = categoryOrderMap[catName];
            if (sortOrder === undefined) {
                sortOrder = (typeof prod.category === 'object' && prod.category !== null && 'sort_order' in prod.category) ? (prod.category as any).sort_order : 0;
            }
            if (!groups[catName]) groups[catName] = { items: [], sort_order: sortOrder };
            groups[catName].items.push({ ...prod, isSimple: false });
        }
        
        // simpleProducts di-handle terpisah di komponen Home WiFi, tidak usah digabung ke groupedProducts
        
        return groups;
    }, [products, categoriesList]);

    const homeWifiItems = useMemo(() => {
        return simpleProducts.map(prod => ({ ...prod, isSimple: true }));
    }, [simpleProducts]);

    return (
        <div className="overflow-x-hidden">
            {/* HERO */}
            <section className="relative mt-0 min-h-screen overflow-hidden pt-24 flex items-center justify-center">
                {/* Dynamic seasonal background image */}
                {isMounted && isThemeReady && (
                    <div className="absolute inset-0 z-0 animate-bg-fade-in">
                        <img
                            src={seasonalBackgrounds[theme] || '/images/winter-background.png'}
                            alt="Seasonal Hero Background"
                            className="w-full h-full object-cover animate-ken-burns"
                        />
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2.5px]" />
                    </div>
                )}

                {/* Floating Ambient seasonal particles over image background */}
                {isMounted && isThemeReady && (
                    <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
                        {theme === 'spring' && (
                            <>
                                {heroParticles.map((p) => {
                                    const width = 10 + p.size * 12;
                                    const duration = 10 + p.duration * 8;
                                    const delay = p.delay * 8;
                                    return (
                                        <svg
                                            key={`hero-petal-${p.id}`}
                                            className="absolute opacity-75"
                                            style={{
                                                left: p.left,
                                                top: `-40px`,
                                                width: `${width}px`,
                                                height: `${width}px`,
                                                fill: '#FF69B4',
                                                animation: `float-sakura ${duration}s linear infinite`,
                                                animationDelay: `${delay}s`,
                                            }}
                                            viewBox="0 0 30 30"
                                        >
                                            <path d="M15 0 C25 10, 25 20, 15 30 C5 20, 5 10, 15 0" />
                                        </svg>
                                    );
                                })}
                            </>
                        )}
                        {theme === 'winter' && (
                            <>
                                {heroParticles.map((p) => {
                                    const width = 3 + p.size * 5;
                                    const duration = 8 + p.duration * 6;
                                    const delay = p.delay * 6;
                                    return (
                                        <div
                                            key={`hero-snow-${p.id}`}
                                            className="absolute rounded-full bg-white opacity-60"
                                            style={{
                                                left: p.left,
                                                top: `-20px`,
                                                width: `${width}px`,
                                                height: `${width}px`,
                                                boxShadow: `0 0 6px #fff`,
                                                animation: `float-snow ${duration}s linear infinite`,
                                                animationDelay: `${delay}s`,
                                            }}
                                        />
                                    );
                                })}
                            </>
                        )}
                        {theme === 'autumn' && (
                            <>
                                {heroParticles.map((p) => {
                                    const width = 14 + p.size * 10;
                                    const duration = 11 + p.duration * 8;
                                    const delay = p.delay * 8;
                                    return (
                                        <svg
                                            key={`hero-leaf-${p.id}`}
                                            className="absolute opacity-75"
                                            style={{
                                                left: p.left,
                                                top: `-40px`,
                                                width: `${width}px`,
                                                height: `${width}px`,
                                                fill: '#EA580C',
                                                animation: `float-leaf ${duration}s linear infinite`,
                                                animationDelay: `${delay}s`,
                                                transform: `rotate(${p.rotation})`,
                                            }}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2C11.5 4 8.5 7 7 9C5.5 11 3 12 3 13.5C3 15.5 5 17 7 17C9 17 11 15 12 13.5C13 15 15 17 17 17C19 17 21 15.5 21 13.5C21 12 18.5 11 17 9C15.5 7 12.5 4 12 2Z" />
                                        </svg>
                                    );
                                })}
                            </>
                        )}
                        {theme === 'summer' && (
                            <>
                                {/* Glowing Sunlight Ray */}
                                <div className="absolute inset-0 opacity-15 overflow-hidden">
                                    <div
                                        className="absolute -top-[15%] -right-[15%] w-[80%] aspect-square rounded-full mix-blend-screen"
                                        style={{
                                            background: 'radial-gradient(circle, #FEF08A 0%, transparent 60%)',
                                            animation: 'sunbeam-pulse 10s ease-in-out infinite',
                                        }}
                                    />
                                </div>
                                {/* Sunlight Floating Particles */}
                                {heroParticles.map((p) => {
                                    const width = 6 + p.size * 14;
                                    const duration = 12 + p.duration * 10;
                                    const delay = p.delay * 8;
                                    return (
                                        <div
                                            key={`hero-bokeh-${p.id}`}
                                            className="absolute rounded-full mix-blend-screen"
                                            style={{
                                                left: p.left,
                                                bottom: `-40px`,
                                                width: `${width}px`,
                                                height: `${width}px`,
                                                background: 'radial-gradient(circle, rgba(254, 240, 138, 0.85) 0%, rgba(251, 191, 36, 0.3) 60%, transparent 100%)',
                                                filter: 'blur(1px)',
                                                boxShadow: '0 0 8px rgba(254, 240, 138, 0.35)',
                                                animation: `float-bokeh ${duration}s ease-in-out infinite`,
                                                animationDelay: `${delay}s`,
                                            }}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </div>
                )}

                {/* Centered Hero Content (staggered animated reveals) */}
                <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white">
                    <p className="premium-eyebrow text-white/90 mb-4 tracking-widest font-bold text-xs md:text-sm animate-reveal-eyebrow">
                        {t('heroEyebrow')}
                    </p>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 max-w-4xl font-extrabold leading-tight tracking-tight drop-shadow-md text-white animate-reveal-title">
                        {t('heroTitle')}
                    </h1>
                    <div className="animate-reveal-desc">
                        <p className="text-lg md:text-xl text-white/90 mb-3 max-w-2xl mx-auto font-medium">
                            {t('heroDesc')}
                        </p>
                        <p className="text-sm md:text-base text-white/70 mb-10 mx-auto tracking-wide font-light">
                            {t('tagline')}
                        </p>
                    </div>
                    <div className="animate-reveal-btn">
                        <a href="#products" className="premium-btn text-sm md:text-base px-8 py-4 font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200">
                            {t('heroCta')}
                        </a>
                    </div>
                </div>
            </section>

            <AboutSection />

            <BenefitsSection />

            <section
                id="products"
                className="py-12 md:py-16 px-6 scroll-mt-20"
                style={{ background: 'var(--background)' }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* PROMO CAROUSEL */}
                    {promos && promos.length > 0 && (
                        <div className="mb-12">
                            <PromoCarousel promos={promos} />
                        </div>
                    )}
                    
                    <SectionHeader
                        eyebrow={t('productsEyebrow')}
                        title={t('productsTitle')}
                        subtitle={t('productsSubtitle')}
                    />
                    {/* Products Grid Sections */}
                    {isLoadingProducts ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38bdf8] mb-4"></div>
                            <p className="text-slate-500 font-medium">{language === 'id' ? 'Memuat produk...' : 'Loading products...'}</p>
                        </div>
                    ) : (
                        <>
                            {/* Best Sellers Section */}
                            {products.filter(p => p.best_seller).length > 0 && (
                                <div className="mb-12 md:mb-16">
                                    <div className="flex items-center gap-4 mb-6">
                                        <h3
                                            className="font-display text-2xl md:text-3xl font-bold text-slate-800 tracking-tight"
                                            style={{ color: 'var(--foreground)' }}
                                        >
                                            {language === 'en' ? 'Best Sellers' : 'Produk Terlaris'}
                                        </h3>
                                        <div className="flex-1 h-px bg-slate-200"></div>
                                    </div>
                                    
                                    <ProductCarouselWrapper>
                                        {products.filter(p => p.best_seller).map((item, idx) => (
                                            item.isSimple ? (
                                                <SimpleWifiCard
                                                    key={`best-simple-${item.id || idx}`}
                                                    item={item}
                                                    whatsappLabel={t('wifiAskWhatsapp')}
                                                />
                                            ) : (
                                                <ProductCatalogCard
                                                    key={`best-prod-${item.id || idx}`}
                                                    product={item}
                                                    language={language}
                                                />
                                            )
                                        ))}
                                    </ProductCarouselWrapper>
                                </div>
                            )}

                            {Object.entries(groupedProducts)
                                .sort(([, a], [, b]) => a.sort_order - b.sort_order)
                                .map(([categoryName, group]) => {
                                const items = group.items;
                                if (!items || items.length === 0) return null;
                                
                                const displayCategoryName = language === 'en' && items[0]?.category?.nama_en ? items[0].category.nama_en : categoryName;
                                
                                return (
                                    <div key={categoryName} className="mb-12 md:mb-16">
                                        <div className="flex items-center gap-4 mb-6">
                                            <h3
                                                className="font-display text-2xl md:text-3xl font-bold text-slate-800 tracking-tight"
                                                style={{ color: 'var(--foreground)' }}
                                            >
                                                {displayCategoryName}
                                            </h3>
                                            <div className="flex-1 h-px bg-slate-200"></div>
                                        </div>
                                        
                                        <ProductCarouselWrapper>
                                            {items.map((item, idx) => (
                                                item.isSimple ? (
                                                    <SimpleWifiCard
                                                        key={`simple-${item.id || idx}`}
                                                        item={item}
                                                        whatsappLabel={t('wifiAskWhatsapp')}
                                                    />
                                                ) : (
                                                    <ProductCatalogCard
                                                        key={`prod-${item.id || idx}`}
                                                        product={item}
                                                        language={language}
                                                    />
                                                )
                                            ))}
                                        </ProductCarouselWrapper>
                                    </div>
                                );
                            })}
                            
                            {/* Home WiFi Section */}
                            {homeWifiItems.length > 0 && (
                                <div className="mb-12 md:mb-16">
                                    <div className="flex items-center gap-4 mb-6">
                                        <h3
                                            className="font-display text-2xl md:text-3xl font-bold text-slate-800 tracking-tight"
                                            style={{ color: 'var(--foreground)' }}
                                        >
                                            Home WiFi
                                        </h3>
                                        <div className="flex-1 h-px bg-slate-200"></div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:gap-8">
                                        <div className="col-span-1">
                                            <HomeWifiBanner items={homeWifiItems} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <HowToSection />

            <PaymentMethodsSection />

            {/* GUIDE */}
            <section
                id="guide"
                className="py-12 md:py-16 px-6 premium-mesh text-center scroll-mt-20"
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
                            className="premium-btn"
                        >
                            {t('guideYearly')}
                        </a>
                    </div>
                </div>
            </section>

            {/* SHIPPING */}
            <section
                id="shipping"
                className="py-12 md:py-16 px-6 scroll-mt-20"
                style={{ background: 'var(--theme-section)' }}
            >
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        eyebrow={t('shippingEyebrow')}
                        title={t('shippingTitle')}
                        subtitle={t('shippingSubtitle')}
                    />

                    {/* Tab Switcher */}
                    <div className="flex justify-center gap-3 mb-12 flex-wrap">
                        {(['info', 'map'] as const).map((tab) => {
                            const isActive = activeShippingTab === tab;
                            const label = tab === 'info'
                                ? (language === 'id' ? 'Info Rute Pengiriman' : 'Shipping Route Info')
                                : (language === 'id' ? 'Peta Pengiriman' : 'Shipping Map');
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveShippingTab(tab)}
                                    className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                                        isActive
                                            ? 'border-transparent text-white'
                                            : 'hover:opacity-90 shadow-sm'
                                    }`}
                                    style={
                                        isActive
                                            ? {
                                                  background: 'var(--theme-primary)',
                                                  boxShadow: '0 8px 24px var(--theme-glow)',
                                              }
                                            : {
                                                  background: 'var(--theme-accent-soft)',
                                                  borderColor: 'color-mix(in srgb, var(--theme-primary) 25%, transparent)',
                                                  color: 'var(--theme-muted)',
                                              }
                                    }
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Shipping Content based on tab selection */}
                    {activeShippingTab === 'map' ? (
                        <div className="premium-card p-6 flex flex-col items-center justify-center overflow-hidden group max-w-4xl mx-auto premium-fade-up">
                            <h3 className="font-display text-lg md:text-xl font-bold mb-6 text-center" style={{ color: 'var(--foreground)' }}>
                                {language === 'id' ? 'Peta Rute & Durasi Pengiriman Jepang' : 'Japan Shipping Route & Duration Map'}
                            </h3>
                            <div 
                                onClick={() => setIsLightboxOpen(true)}
                                className="relative w-full overflow-hidden rounded-2xl flex items-center justify-center bg-black/5 dark:bg-white/5 p-4 cursor-pointer border border-white/5 hover:border-sky-500/30 transition-all duration-300 shadow-inner"
                            >
                                <img
                                    src="/images/japan-shipping-map.png"
                                    alt="Japan Shipping Map"
                                    className="w-full h-auto max-h-[550px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 flex items-center justify-center transition-all duration-300">
                                    <span className="bg-sky-500/90 text-white text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                                        {language === 'id' ? 'Buka Peta Penuh' : 'Open Full Map'}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-center mt-4" style={{ color: 'var(--theme-muted)' }}>
                                {language === 'id' ? '* Ketuk gambar untuk memperbesar rute pengiriman.' : '* Tap image to zoom routing details.'}
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-5xl mx-auto space-y-8 premium-fade-up">
                            {/* 2-Column Grid for Shipping Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {/* Card 1: COD 1 Hari */}
                                <div className="premium-card p-8 md:p-10 flex flex-col justify-between h-full group">
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-6">
                                            <div
                                                className="shrink-0 rounded-xl flex items-center justify-center text-white w-14 h-14 text-2xl transition-transform duration-300 group-hover:scale-105 shadow-md"
                                                style={{
                                                    background: 'var(--theme-primary)',
                                                    boxShadow: `0 8px 20px var(--theme-glow)`,
                                                }}
                                            >
                                                <FaShippingFast />
                                            </div>
                                            <span className="benefit-number leading-none">
                                                01
                                            </span>
                                        </div>

                                        <h3
                                            className="font-display mb-1 mt-6 text-xl md:text-2xl font-bold"
                                            style={{ color: 'var(--foreground)' }}
                                        >
                                            COD 1 Hari
                                        </h3>
                                        <p
                                            className="text-sm font-semibold mb-4"
                                            style={{ color: 'var(--theme-muted)' }}
                                        >
                                            Transfer 1-2 Hari
                                        </p>

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
                                </div>

                                {/* Card 2: COD 2 Hari */}
                                <div className="premium-card p-8 md:p-10 flex flex-col justify-between h-full group">
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-6">
                                            <div
                                                className="shrink-0 rounded-xl flex items-center justify-center text-white w-14 h-14 text-2xl transition-transform duration-300 group-hover:scale-105 shadow-md"
                                                style={{
                                                    background: 'var(--theme-primary)',
                                                    boxShadow: `0 8px 20px var(--theme-glow)`,
                                                }}
                                            >
                                                <FaBoxOpen />
                                            </div>
                                            <span className="benefit-number leading-none">
                                                02
                                            </span>
                                        </div>

                                        <h3
                                            className="font-display mb-1 mt-6 text-xl md:text-2xl font-bold"
                                            style={{ color: 'var(--foreground)' }}
                                        >
                                            COD 2 Hari
                                        </h3>
                                        <p
                                            className="text-sm font-semibold mb-4"
                                            style={{ color: 'var(--theme-muted)' }}
                                        >
                                            Transfer 2-3 Hari
                                        </p>

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
                            </div>

                            <div
                                className="premium-card p-8 text-center flex items-center gap-4 justify-center border-l-4"
                                style={{
                                    borderColor: 'var(--theme-primary)',
                                    boxShadow: `0 8px 32px var(--theme-glow)`,
                                }}
                            >
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-muted)' }}>
                                    <strong>{t('shippingNoteTitle')}:</strong> {t('shippingNote')}
                                </p>
                            </div>
                        </div>
                    )}

                    {isLightboxOpen && (
                        <Lightbox
                            images={['/images/japan-shipping-map.png']}
                            initialIndex={0}
                            isOpen={isLightboxOpen}
                            onClose={() => setIsLightboxOpen(false)}
                        />
                    )}
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
                    <TestimonialMarquee testimonials={testimonials} />
                </div>
            </section>
            <section
                id="contact"
                className="py-20 md:py-28 px-6 scroll-mt-20"
                style={{ background: 'var(--background)' }}
            >
                <div className="max-w-5xl mx-auto">
                    <SectionHeader
                        eyebrow={t('contactEyebrow')}
                        title={t('contactTitle')}
                        subtitle={t('contactSubtitle')}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {/* Card 1: Hubungi Kami */}
                        <div
                            className="premium-card p-6 md:p-8 flex flex-col h-full border group hover:-translate-y-1.5 transition-all duration-300"
                            style={{
                                background: 'rgba(255, 255, 255, 0.45)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                borderColor: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)',
                                boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                            }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                                        boxShadow: '0 8px 24px var(--theme-glow)',
                                    }}
                                >
                                    <FaHeadset className="text-xl" />
                                </div>
                                <h3 className="font-display font-extrabold text-xl tracking-tight" style={{ color: 'var(--foreground)' }}>
                                    {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                                </h3>
                            </div>

                            <div className="space-y-4 w-full flex-grow">
                                {/* WhatsApp Item */}
                                <a
                                    href="https://wa.me/818075558719"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-2xl border bg-white/40 hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 no-underline group/item w-full"
                                    style={{
                                        borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                                        style={{
                                            background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                            color: 'var(--theme-primary)',
                                        }}
                                    >
                                        <FaWhatsapp />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-50" style={{ color: 'var(--foreground)' }}>
                                            WhatsApp
                                        </span>
                                        <span className="text-sm font-extrabold transition-colors group-hover/item:text-primary" style={{ color: 'var(--theme-muted)' }}>
                                            +81 80-7555-8719
                                        </span>
                                    </div>
                                </a>

                                {/* Email Item */}
                                <a
                                    href="mailto:Alljapaninternet@gmail.com"
                                    className="flex items-center gap-4 p-4 rounded-2xl border bg-white/40 hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 no-underline group/item w-full"
                                    style={{
                                        borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                                        style={{
                                            background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                            color: 'var(--theme-primary)',
                                        }}
                                    >
                                        <FaEnvelope />
                                    </div>
                                    <div className="text-left min-w-0">
                                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-50" style={{ color: 'var(--foreground)' }}>
                                            Email
                                        </span>
                                        <span className="text-[13px] font-extrabold block truncate transition-colors group-hover/item:text-primary" style={{ color: 'var(--theme-muted)' }}>
                                            Alljapaninternet@gmail.com
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Card 2: Sosial Media */}
                        <div
                            className="premium-card p-6 md:p-8 flex flex-col h-full border group hover:-translate-y-1.5 transition-all duration-300"
                            style={{
                                background: 'rgba(255, 255, 255, 0.45)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                borderColor: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)',
                                boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                            }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                                        boxShadow: '0 8px 24px var(--theme-glow)',
                                    }}
                                >
                                    <FaShareAlt className="text-lg" />
                                </div>
                                <h3 className="font-display font-extrabold text-xl tracking-tight" style={{ color: 'var(--foreground)' }}>
                                    {language === 'id' ? 'Media Sosial' : 'Social Media'}
                                </h3>
                            </div>

                            <div className="space-y-4 w-full flex-grow">
                                {/* Instagram Item */}
                                <a
                                    href="https://www.instagram.com/all_japan_internet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-2xl border bg-white/40 hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 no-underline group/item w-full"
                                    style={{
                                        borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                                        style={{
                                            background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                            color: 'var(--theme-primary)',
                                        }}
                                    >
                                        <FaInstagram />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-50" style={{ color: 'var(--foreground)' }}>
                                            Instagram
                                        </span>
                                        <span className="text-sm font-extrabold transition-colors group-hover/item:text-primary" style={{ color: 'var(--theme-muted)' }}>
                                            @all_japan_internet
                                        </span>
                                    </div>
                                </a>

                                {/* Facebook Page Item */}
                                <a
                                    href={FACEBOOK_URL_1}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-2xl border bg-white/40 hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 no-underline group/item w-full"
                                    style={{
                                        borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                                        style={{
                                            background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                            color: 'var(--theme-primary)',
                                        }}
                                    >
                                        <FaFacebook />
                                    </div>
                                    <div className="text-left min-w-0">
                                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-50" style={{ color: 'var(--foreground)' }}>
                                            Facebook
                                        </span>
                                        <span className="text-[13px] font-extrabold block truncate transition-colors group-hover/item:text-primary" style={{ color: 'var(--theme-muted)' }}>
                                            Warung Kartu All Japan Intanet
                                        </span>
                                    </div>
                                </a>

                                {/* Facebook Group Item */}
                                <a
                                    href={FACEBOOK_URL_2}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-2xl border bg-white/40 hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 no-underline group/item w-full"
                                    style={{
                                        borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                                        style={{
                                            background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                            color: 'var(--theme-primary)',
                                        }}
                                    >
                                        <FaFacebook />
                                    </div>
                                    <div className="text-left min-w-0">
                                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-50" style={{ color: 'var(--foreground)' }}>
                                            Facebook Group
                                        </span>
                                        <span className="text-[13px] font-extrabold block truncate transition-colors group-hover/item:text-primary" style={{ color: 'var(--theme-muted)' }}>
                                            All Japan Internet
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Card 3: Lokasi & Waktu */}
                        <div
                            className="premium-card p-6 md:p-8 flex flex-col h-full border group hover:-translate-y-1.5 transition-all duration-300"
                            style={{
                                background: 'rgba(255, 255, 255, 0.45)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                borderColor: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)',
                                boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                            }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%)',
                                        boxShadow: '0 8px 24px var(--theme-glow)',
                                    }}
                                >
                                    <FaMapMarkerAlt className="text-lg" />
                                </div>
                                <h3 className="font-display font-extrabold text-xl tracking-tight" style={{ color: 'var(--foreground)' }}>
                                    {language === 'id' ? 'Lokasi & Waktu' : 'Location & Hours'}
                                </h3>
                            </div>

                            <div className="space-y-4 w-full flex-grow">
                                {/* Location Item */}
                                <div
                                    className="flex items-center gap-4 p-4 rounded-2xl border bg-white/40 transition-all duration-300 w-full"
                                    style={{
                                        borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                                        style={{
                                            background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                            color: 'var(--theme-primary)',
                                        }}
                                    >
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-50" style={{ color: 'var(--foreground)' }}>
                                            {t('contactLocation')}
                                        </span>
                                        <span className="text-sm font-extrabold" style={{ color: 'var(--theme-muted)' }}>
                                            Shinjuku, Tokyo
                                        </span>
                                    </div>
                                </div>

                                {/* Hours Item */}
                                <div
                                    className="flex items-center gap-4 p-4 rounded-2xl border bg-white/40 transition-all duration-300 w-full"
                                    style={{
                                        borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                                        style={{
                                            background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                                            color: 'var(--theme-primary)',
                                        }}
                                    >
                                        <FaClock />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-50" style={{ color: 'var(--foreground)' }}>
                                            {t('contactHours')}
                                        </span>
                                        <span className="text-xs font-extrabold" style={{ color: 'var(--theme-muted)' }}>
                                            {language === 'id'
                                                ? '24 Jam'
                                                : '24 Hours'}
                                        </span>
                                    </div>
                                </div>
                            </div>
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
