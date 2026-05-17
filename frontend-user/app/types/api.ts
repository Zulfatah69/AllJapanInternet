export type ApiEnvelope<T> = {
    success?: boolean;
    message?: string;
    data?: T;
};

export type Category = {
    id: number;
    nama: string;
    slug: string;
};

export type Provider = {
    id: number;
    nama: string;
    slug: string;
    logo?: string | null;
};

export type BillingPeriod = {
    id: number;
    nama: string;
    initial_price?: number | string;
    months?: number;
};

export type ProductVariant = {
    id: number;
    gb?: string;
    nama?: string;
    monthly_price?: number | string;
    billing_periods?: BillingPeriod[];
    prices?: { id: number; period: string; harga: number }[];
};

export type PaymentMethod = {
    id: number;
    nama: string;
    additional_price?: number | string;
};

export type Product = {
    id: number;
    nama: string;
    slug: string;
    type?: string;
    code?: string;
    billing_type?: string;
    deskripsi?: string;
    thumbnail?: string | null;
    thumbnail_url?: string | null;
    provider?: Provider | null;
    category?: Category | null;
    variants?: ProductVariant[];
    payment_methods?: PaymentMethod[];
    is_best_seller?: boolean;
    best_seller?: boolean;
    lowest_price?: number | null;
};

export type Promo = {
    id: number;
    judul: string;
    deskripsi?: string;
    gambar?: string | null;
    gambar_url?: string | null;
    link?: string | null;
};

export type Testimonial = {
    id: number;
    image?: string;
    image_url?: string;
};

export type Settings = {
    website_name?: string;
    logo?: string;
    favicon?: string;
    whatsapp?: string;
    telegram?: string;
    line?: string;
    email?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    footer_text?: string;
    theme?: string;
    guidebook_url?: string;
    map_embed?: string;
    address?: string;
};

export type HomeData = {
    promos: Promo[];
    best_sellers: Product[];
    new_products: Product[];
    categories: Category[];
};
