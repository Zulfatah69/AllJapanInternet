'use client';

import { useEffect } from 'react';

import { useHomeData } from './hooks/useHomeData';
import { useApp } from './providers/AppProvider';
import { AmbientBackground } from './components/visual/AmbientBackground';
import { WhatsAppFab } from './components/visual/WhatsAppFab';
import { HeroSection } from './components/sections/HeroSection';
import { BestSellerSection } from './components/sections/BestSellerSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { ProvidersSection } from './components/sections/ProvidersSection';
import { AboutSection } from './components/sections/AboutSection';
import { BenefitsSection } from './components/sections/BenefitsSection';
import { HowToOrderSection } from './components/sections/HowToOrderSection';
import { GuidebookSection } from './components/sections/GuidebookSection';
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

    useEffect(() => {
        if (settings) setSettings(settings);
    }, [settings, setSettings]);

    return (
        <>
            <AmbientBackground />
            <WhatsAppFab />
            <HeroSection promos={promos} products={products} />
            <BestSellerSection products={bestSellers} loading={loading} />
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
            <TestimonialsSection testimonials={testimonials} />
            <TrackingSection />
            <ContactSection />
        </>
    );
}
