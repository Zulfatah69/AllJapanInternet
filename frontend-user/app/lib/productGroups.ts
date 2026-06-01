export function isWifiCategory(product: {
    category?: { nama?: string; slug?: string } | null;
}): boolean {
    const name = (product.category?.nama || '').toUpperCase();
    const slug = (product.category?.slug || '').toUpperCase();
    return (
        name.includes('POCKET WIFI') ||
        slug.includes('pocket-wifi') ||
        (name.includes('WIFI') &&
            !name.includes('E-SIM') &&
            !name.includes('KARTU INTERNET'))
    );
}

export function splitCatalogProducts<T extends { category?: { nama?: string; slug?: string } | null }>(
    items: T[]
): { simEsim: T[]; wifi: T[] } {
    const simEsim: T[] = [];
    const wifi: T[] = [];

    for (const item of items) {
        if (isWifiCategory(item)) {
            wifi.push(item);
        } else {
            simEsim.push(item);
        }
    }

    return { simEsim, wifi };
}
export function isYearlyCategory(product: {
    category?: { nama?: string; slug?: string } | string | null;
    nama?: string;
}): boolean {
    const catObj = typeof product.category === 'object' ? product.category : null;
    const catStr = typeof product.category === 'string' ? product.category : '';
    const catName = (catObj?.nama || catStr || '').toUpperCase();
    const catSlug = (catObj?.slug || catStr || '').toUpperCase();
    const prodName = (product.nama || '').toUpperCase();
    return (
        catName.includes('TAHUNAN') ||
        catSlug.includes('tahunan') ||
        catName.includes('YEARLY') ||
        catSlug.includes('yearly') ||
        catName.includes('ANNUAL') ||
        catSlug.includes('annual') ||
        prodName.includes('TAHUNAN') ||
        prodName.includes('1 TAHUN') ||
        prodName.includes('1 YEAR') ||
        prodName.includes('YEARLY')
    );
}

export function isPocketWifiCategory(product: {
    category?: { nama?: string; slug?: string } | string | null;
    nama?: string;
}): boolean {
    const catObj = typeof product.category === 'object' ? product.category : null;
    const catStr = typeof product.category === 'string' ? product.category : '';
    const catName = (catObj?.nama || catStr || '').toUpperCase();
    const catSlug = (catObj?.slug || catStr || '').toUpperCase();
    const prodName = (product.nama || '').toUpperCase();
    return (
        catName.includes('POCKET') ||
        catSlug.includes('pocket') ||
        prodName.includes('POCKET') ||
        prodName.includes('PORTABLE')
    );
}

export function isEsimCategory(product: {
    category?: { nama?: string; slug?: string } | string | null;
    nama?: string;
}): boolean {
    const catObj = typeof product.category === 'object' ? product.category : null;
    const catStr = typeof product.category === 'string' ? product.category : '';
    const catName = (catObj?.nama || catStr || '').toUpperCase();
    const catSlug = (catObj?.slug || catStr || '').toUpperCase();
    const prodName = (product.nama || '').toUpperCase();
    return (
        catName.includes('E-SIM') ||
        catSlug.includes('e-sim') ||
        catName.includes('ESIM') ||
        catSlug.includes('esim') ||
        prodName.includes('E-SIM') ||
        prodName.includes('ESIM')
    );
}
