'use client';

import { useEffect, useMemo } from 'react';

import { useHomeData } from './hooks/useHomeData';
import { useApp } from './providers/AppProvider';
import { collectPaymentMethods } from './lib/product';
import { AmbientBackground } from './components/visual/AmbientBackground';
import { WhatsAppFab } from './components/visual/WhatsAppFab';
import { HeroSection } from './components/sections/HeroSection';
import { PromoSliderSection } from './components/sections/PromoSliderSection';
import { BestSellerSection } from './components/sections/BestSellerSection';
import { CategoriesSection } from './components/sections/CategoriesSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { ProvidersSection } from './components/sections/ProvidersSection';
import { AboutSection } from './components/sections/AboutSection';
import { BenefitsSection } from './components/sections/BenefitsSection';
import { HowToOrderSection } from './components/sections/HowToOrderSection';
import { GuidebookSection } from './components/sections/GuidebookSection';
import { PaymentMethodsSection } from './components/sections/PaymentMethodsSection';
import { ShippingSection } from './components/sections/ShippingSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { TrackingSection } from './components/sections/TrackingSection';
import { ContactSection } from './components/sections/ContactSection';

export default function HomePage() {
    const { setSettings } = useApp();
    const {
        products,
        bestSellers,
        promos,
        testimonials,
        categories,
        providers,
        settings,
        loading,
    } = useHomeData();

    const paymentMethods = useMemo(
        () => collectPaymentMethods(products),
        [products],
    );

    useEffect(() => {
        if (settings) setSettings(settings);
    }, [settings, setSettings]);

    return (
        <>
            <AmbientBackground />
            <WhatsAppFab />
            <HeroSection promos={promos} planCount={products.length} />
            <PromoSliderSection promos={promos} />
            <BestSellerSection products={bestSellers} loading={loading} />
            <CategoriesSection categories={categories} />
            <ProductsSection
                products={products}
                categories={categories}
                providers={providers}
                loading={loading}
            />
            <ProvidersSection providers={providers} />
            <AboutSection />
            <BenefitsSection />
            <HowToOrderSection />
            <GuidebookSection />
            <PaymentMethodsSection methods={paymentMethods} />
            <ShippingSection />
            <TestimonialsSection testimonials={testimonials} />
            <TrackingSection />
            <ContactSection />
        </>
    );
}
