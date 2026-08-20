'use client';

import { formatLowestPrice } from '@/app/lib/productPrice';

type ProductCatalogCardProps = {
    product: {
        id: number;
        slug: string;
        nama: string;
        nama_en?: string;
        thumbnail_url?: string;
        gambar_url?: string;
        category?: { nama?: string; nama_en?: string } | null;
        category_en?: string;
        provider?: { nama?: string } | null;
        lowest_price?: number | null;
        type?: string;
        cycle_type?: string;
        variants?: unknown[];
    };
    language: 'id' | 'en';
    href?: string;
};

import { useLanguage } from '@/app/context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function ProductCatalogCard({
    product,
    language,
    href,
}: ProductCatalogCardProps) {
    const { getLocalizedText, theme } = useLanguage();
    const link = href ?? `/products/${product.slug}`;

    const themeHoverClass = 
        theme === 'spring' ? 'theme-spring-hover-sakura' :
        theme === 'summer' ? 'theme-summer-sun-glare' :
        theme === 'autumn' ? 'theme-autumn-wind-sweep' :
        theme === 'winter' ? 'theme-winter-frost-melt' : '';

    return (
        <ScrollReveal direction="up" duration={0.6}>
            <a href={link} className={`premium-product-card group block h-full flex flex-col p-3 md:p-4 bg-[var(--background)] border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-all ${themeHoverClass}`}>

                {/* foto           = Nama produk */}
                <div className="flex flex-row items-center gap-3 mb-3 flex-1">
                    <div className="w-[100px] md:w-[120px] shrink-0 aspect-[16/9] rounded-lg overflow-hidden border border-black/5 bg-white">
                        <img
                            src={product.thumbnail_url || product.gambar_url}
                            alt={product.nama}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-base md:text-lg font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
                            {getLocalizedText(product.nama, product.nama_en)}
                        </h3>
                        
                        {product.type === 'monthly' && product.cycle_type && (
                            <p className="text-xs md:text-sm font-semibold mt-1.5" style={{ color: 'var(--theme-muted)' }}>
                                {product.cycle_type.toUpperCase() === 'VT' ? 'Tgl 20-28' : 
                                 product.cycle_type.toUpperCase() === 'GJ' ? 'Tgl 18-24' : product.cycle_type.toUpperCase()}
                            </p>
                        )}
                    </div>
                </div>

                {/* ======== From / Price section */}
                <div className="mt-auto border-t border-black/5 pt-3">
                    {formatLowestPrice(product as any, language) ? (
                        <div className="flex flex-col">
                            <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-slate-600 mb-1">
                                {language === 'id' ? 'Mulai Dari' : 'Starts From'}
                            </span>
                            <span className="text-xl md:text-2xl font-black tracking-tight tabular-nums" style={{ color: 'var(--theme-primary)' }}>
                                {formatLowestPrice(product as any, language)}
                            </span>
                        </div>
                    ) : (
                        <div className="text-sm md:text-base font-bold text-slate-600 py-1">
                            {language === 'id' ? 'Hubungi kami' : 'Contact us'}
                        </div>
                    )}
                </div>

            </a>
        </ScrollReveal>
    );
}
