'use client';

import React, { useEffect, useState } from 'react';
import './apple-theme.css';
import { getProducts } from '../services/product.service';
import SimulationHero from './components/SimulationHero';
import SimulationProductCard from './components/SimulationProductCard';
import { useLanguage } from '../context/LanguageContext';

export default function AppleSimulationPage() {
    const { language } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                // Fetch the products for the simulation grid
                const response = await getProducts();
                if (response) {
                    // response is the array itself based on product.service.ts
                    const data = Array.isArray(response) ? response : (response as any).data || [];
                    setProducts(data.slice(0, 4));
                }
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <div className="apple-theme">
            {/* HERO SECTION */}
            <SimulationHero />

            {/* DARK TILE DIVIDER SECTION */}
            <section className="apple-product-tile-dark">
                <div className="apple-container-store max-w-4xl mx-auto">
                    <h2 className="apple-display-lg mb-4 text-white">
                        {language === 'id' ? 'Kekuatan di setiap klik.' : 'Power in every click.'}
                    </h2>
                    <p className="apple-lead text-gray-300">
                        {language === 'id' 
                            ? 'Kami merancang layanan internet yang stabil, cepat, dan selalu ada untuk Anda.' 
                            : 'We designed internet services that are stable, fast, and always there for you.'}
                    </p>
                </div>
            </section>

            {/* PRODUCT GRID UTILITY CARDS */}
            <section className="apple-product-tile-light bg-white py-20">
                <div className="apple-container-store">
                    <div className="text-center mb-16">
                        <h2 className="apple-display-lg text-black">
                            {language === 'id' ? 'Pilih Paket Anda.' : 'Choose Your Plan.'}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
                            {products.map((product, idx) => (
                                <SimulationProductCard key={idx} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
