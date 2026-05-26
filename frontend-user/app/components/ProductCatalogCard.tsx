'use client';

import { formatLowestPrice } from '@/app/lib/productPrice';

type ProductCatalogCardProps = {
    product: {
        id: number;
        slug: string;
        nama: string;
        thumbnail_url?: string;
        category?: { nama?: string } | null;
        provider?: { nama?: string } | null;
        lowest_price?: number | null;
        type?: string;
        variants?: unknown[];
    };
    language: 'id' | 'en';
    href?: string;
};

export default function ProductCatalogCard({
    product,
    language,
    href,
}: ProductCatalogCardProps) {
    const link = href ?? `/products/${product.slug}`;

    return (
        <a href={link} className="premium-product-card group block">
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
                {product.provider?.nama && (
                    <p
                        className="text-sm mb-4"
                        style={{ color: 'var(--theme-muted)' }}
                    >
                        {product.provider.nama}
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
