'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { formatLowestPrice } from '../../lib/productPrice';

export default function SimulationProductCard({ product }: { product: any }) {
    const { language } = useLanguage();

    const getLocalizedText = (idText: string, enText: string) => {
        return language === 'en' && enText ? enText : idText;
    };

    return (
        <a href={`/products/${product.slug}`} className="apple-store-utility-card flex flex-col items-center text-center block group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            {/* Image (square 1:1 crop per guidelines) */}
            <div className="w-full aspect-square mb-6 flex items-center justify-center p-4 bg-gray-50 rounded-[8px] overflow-hidden">
                <img 
                    src={product.thumbnail_url || product.gambar_url || 'https://via.placeholder.com/400'} 
                    alt={product.nama}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 apple-product-shadow"
                />
            </div>

            {/* Content Stack */}
            <h3 className="apple-body-strong mb-1 truncate w-full px-2 text-black">
                {getLocalizedText(product.nama, product.nama_en)}
            </h3>
            
            {/* Price Line */}
            <p className="apple-body mb-4 text-gray-800">
                {formatLowestPrice(product, language) || (language === 'id' ? 'Hubungi Kami' : 'Contact Us')}
            </p>

            {/* Action Link */}
            <div className="mt-auto pt-2">
                <span className="text-[var(--colors-primary)] apple-button-utility group-hover:underline">
                    {language === 'id' ? 'Beli' : 'Buy'} &gt;
                </span>
            </div>
        </a>
    );
}
