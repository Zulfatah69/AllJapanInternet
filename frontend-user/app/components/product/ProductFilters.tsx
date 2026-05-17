'use client';

import { cn } from '../../lib/utils';

type FilterChip = { id: string; label: string };

function FilterGroup({
    label,
    chips,
    selected,
    onSelect,
}: {
    label: string;
    chips: FilterChip[];
    selected: string;
    onSelect: (v: string) => void;
}) {
    return (
        <div className="min-w-0">
            <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ color: 'var(--fg-muted)' }}
            >
                {label}
            </p>
            <div className="flex flex-wrap gap-2">
                {chips.map((chip) => {
                    const active = selected === chip.id;
                    return (
                        <button
                            key={chip.id}
                            type="button"
                            onClick={() => onSelect(chip.id)}
                            className={cn(
                                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                                active
                                    ? 'text-white shadow-md'
                                    : 'border bg-[var(--bg-elevated)] hover:border-[var(--primary)]',
                            )}
                            style={
                                active
                                    ? { background: 'var(--primary-strong)' }
                                    : { borderColor: 'var(--border)' }
                            }
                        >
                            {chip.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export function ProductFilters({
    typeChips,
    categoryChips,
    providerChips,
    billingChips,
    selectedType,
    selectedCategory,
    selectedProvider,
    selectedBilling,
    onType,
    onCategory,
    onProvider,
    onBilling,
    labels,
}: {
    typeChips: FilterChip[];
    categoryChips: FilterChip[];
    providerChips: FilterChip[];
    billingChips?: FilterChip[];
    selectedType: string;
    selectedCategory: string;
    selectedProvider: string;
    selectedBilling?: string;
    onType: (v: string) => void;
    onCategory: (v: string) => void;
    onProvider: (v: string) => void;
    onBilling?: (v: string) => void;
    labels?: {
        type: string;
        billing: string;
        category: string;
        provider: string;
    };
}) {
    const L = labels ?? {
        type: 'Plan type',
        billing: 'Billing',
        category: 'Category',
        provider: 'Carrier',
    };

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FilterGroup label={L.type} chips={typeChips} selected={selectedType} onSelect={onType} />
            {billingChips && onBilling && selectedBilling !== undefined && (
                <FilterGroup
                    label={L.billing}
                    chips={billingChips}
                    selected={selectedBilling}
                    onSelect={onBilling}
                />
            )}
            <FilterGroup
                label={L.category}
                chips={categoryChips}
                selected={selectedCategory}
                onSelect={onCategory}
            />
            <FilterGroup
                label={L.provider}
                chips={providerChips}
                selected={selectedProvider}
                onSelect={onProvider}
            />
        </div>
    );
}
