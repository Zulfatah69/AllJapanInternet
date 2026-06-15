type BillingPeriod = {
    monthly_price?: number | string;
    initial_price?: number | string;
    harga?: number | string;
    price?: number | string;
};

type VariantPrice = {
    harga?: number | string;
    period?: string;
};

type Variant = {
    monthly_price?: number | string;
    billing_periods?: BillingPeriod[];
    billingPeriods?: BillingPeriod[];
    prices?: VariantPrice[];
};

type YearlyPeriod = {
    harga?: number | string;
    initial_price?: number | string;
};

type Product = {
    nama?: string;
    slug?: string;
    type?: string;
    lowest_price?: number | string;
    variants?: Variant[];
    yearly_active_periods?: YearlyPeriod[];
    yearlyActivePeriods?: YearlyPeriod[];
    category?: { nama?: string };
};

const PRICE_KEYS_YEARLY = ['initial_price', 'harga', 'price'] as const;
const PRICE_KEYS_MONTHLY = [
    'initial_price',
    'harga',
    'price',
    'monthly_price',
] as const;

function num(v: unknown): number {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}

function isYearlyProduct(product: Product): boolean {
    const type = (product.type ?? '').toLowerCase();
    return type === 'yearly' || type === 'tahunan';
}

function getBillingPeriods(variant: Variant): BillingPeriod[] {
    return variant.billing_periods ?? variant.billingPeriods ?? [];
}

function periodAmount(period: BillingPeriod): number {
    return num(
        period.initial_price ?? period.harga ?? period.price ?? period.monthly_price
    );
}

function deepCollectPrices(
    value: unknown,
    keys: readonly string[],
    depth = 0
): number[] {
    if (depth > 8 || value == null) {
        return [];
    }

    const amounts: number[] = [];

    if (Array.isArray(value)) {
        for (const item of value) {
            amounts.push(...deepCollectPrices(item, keys, depth + 1));
        }
        return amounts;
    }

    if (typeof value === 'object') {
        for (const [key, nested] of Object.entries(
            value as Record<string, unknown>
        )) {
            if (keys.includes(key)) {
                const amount = num(nested);
                if (amount > 0) {
                    amounts.push(amount);
                }
            } else if (typeof nested === 'object' && nested !== null) {
                amounts.push(...deepCollectPrices(nested, keys, depth + 1));
            }
        }
    }

    return amounts;
}

function collectMonthlyTotals(variants: Variant[]): number[] {
    const amounts: number[] = [];

    for (const variant of variants) {
        const monthly = num(variant.monthly_price);

        if (monthly > 0) {
            amounts.push(monthly);
        }

        for (const period of getBillingPeriods(variant)) {
            const initial = periodAmount(period);
            if (initial > 0) {
                amounts.push(initial);
            }
            const total = monthly + initial;
            if (total > 0) {
                amounts.push(total);
            }
        }

        if (variant.prices?.length) {
            for (const price of variant.prices) {
                const amount = num(price.harga);
                if (amount > 0) {
                    amounts.push(amount);
                }
            }
        }
    }

    return amounts;
}

function computeLowestFromVariants(product: Product): number | null {
    const variants = product.variants ?? [];
    const isYearly = isYearlyProduct(product);
    let amounts: number[] = [];

    if (isYearly) {
        amounts = deepCollectPrices(variants, PRICE_KEYS_YEARLY);

        const yearlyPeriods =
            product.yearly_active_periods ?? product.yearlyActivePeriods ?? [];
        amounts.push(...deepCollectPrices(yearlyPeriods, PRICE_KEYS_YEARLY));
    } else {
        amounts = collectMonthlyTotals(variants);
        if (amounts.length === 0) {
            amounts = deepCollectPrices(variants, PRICE_KEYS_MONTHLY);
        }
    }

    // Filter out anomalous prices (e.g. less than 1000 Yen)
    const validAmounts = amounts.filter(amount => amount >= 1000);

    if (validAmounts.length === 0) {
        return null;
    }

    return Math.min(...validAmounts);
}

export function getLowestProductPrice(product: Product): number | null {
    const fromVariants = computeLowestFromVariants(product);
    if (fromVariants !== null && fromVariants >= 1000) {
        return fromVariants;
    }

    const apiLowest = num(product.lowest_price);
    if (apiLowest >= 1000) {
        return apiLowest;
    }

    return null;
}

export function formatLowestPrice(
    product: Product,
    language: 'id' | 'en' = 'id'
): string | null {
    const price = getLowestProductPrice(product);
    if (price === null || price <= 0) {
        return null; // Let the component handle empty state
    }
    return `¥${price.toLocaleString('ja-JP')}`;
}
