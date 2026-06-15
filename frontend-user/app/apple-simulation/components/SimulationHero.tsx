'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function SimulationHero() {
    const { language } = useLanguage();

    return (
        <section className="apple-product-tile-parchment relative">
            <div className="apple-container-store flex flex-col items-center">
                {/* Text Stack */}
                <div className="text-center max-w-3xl mx-auto z-10 relative">
                    <h1 className="apple-hero-display mb-2 text-black">
                        {language === 'id' ? 'Koneksi Tanpa Batas.' : 'Limitless Connection.'}
                    </h1>
                    <p className="apple-lead mb-6 text-gray-800">
                        {language === 'id' 
                            ? 'Internet tercepat di ujung jari Anda.' 
                            : 'The fastest internet at your fingertips.'}
                    </p>
                    <div className="flex flex-row justify-center gap-4">
                        <button className="apple-button-primary">
                            {language === 'id' ? 'Beli' : 'Buy'}
                        </button>
                        <button className="apple-button-secondary-pill">
                            {language === 'id' ? 'Pelajari lebih lanjut' : 'Learn more'}
                        </button>
                    </div>
                </div>

                {/* Product Render Placeholder */}
                <div className="mt-12 relative z-0 max-w-2xl w-full mx-auto">
                    {/* Placeholder for realistic product image */}
                    <div className="aspect-[16/9] w-full flex items-center justify-center">
                        <img 
                            src="https://images.unsplash.com/photo-1544228821-3fbafcb58a98?q=80&w=1200&auto=format&fit=crop" 
                            alt="Wifi Device" 
                            className="w-[80%] h-auto object-contain apple-product-shadow"
                            style={{ filter: 'brightness(1.05) contrast(1.1)' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
