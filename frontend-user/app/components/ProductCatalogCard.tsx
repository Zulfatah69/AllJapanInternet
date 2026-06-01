'use client';

import { formatLowestPrice } from '@/app/lib/productPrice';

type ProductCatalogCardProps = {
    product: {
        id: number;
        slug: string;
        nama: string;
        thumbnail_url?: string;
        gambar_url?: string;
        category?: { nama?: string } | null;
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

export default function ProductCatalogCard({
    product,
    language,
    href,
}: ProductCatalogCardProps) {
    const { translateDynamicText } = useLanguage();
    const link = href ?? `/products/${product.slug}`;

    return (
        <a href={link} className="premium-product-card group block">
            <div className="overflow-hidden aspect-[16/9]">
                <img
                    src={product.thumbnail_url || product.gambar_url}
                    alt={product.nama}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-5 md:p-6">
                <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--theme-primary)' }}
                >
                    {translateDynamicText(product.category?.nama)}
                </p>
                <h3
                    className="font-display text-lg md:text-xl mb-2"
                    style={{ color: 'var(--foreground)' }}
                >
                    {product.nama}
                </h3>
                {product.type === 'monthly' && product.cycle_type && (
                    <p
                        className="text-xs font-semibold mb-4"
                        style={{ color: 'var(--theme-muted)' }}
                    >
                        {language === 'id' ? 'Pembayaran Bulanan: ' : 'Monthly Payment: '}
                        {product.cycle_type.toUpperCase() === 'VT' ? 'Tanggal 20-28' : 
                         product.cycle_type.toUpperCase() === 'GJ' ? 'Tanggal 18-24' : product.cycle_type.toUpperCase()}
                    </p>
                )}
                <p
                    className="font-display text-xl"
                    style={{ color: 'var(--theme-primary)' }}
                >
                    {formatLowestPrice(product as any, language)}
                </p>
            </div>
        </a>
    );
}
