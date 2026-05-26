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
