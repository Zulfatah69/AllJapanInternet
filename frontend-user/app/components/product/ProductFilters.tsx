'use client';

import { cn } from '../../lib/utils';

type FilterChip = { id: string; label: string };

export function ProductFilters({
    typeChips,
    categoryChips,
    providerChips,
    selectedType,
    selectedCategory,
    selectedProvider,
    onType,
    onCategory,
    onProvider,
}: {
    typeChips: FilterChip[];
    categoryChips: FilterChip[];
    providerChips: FilterChip[];
    selectedType: string;
    selectedCategory: string;
    selectedProvider: string;
    onType: (v: string) => void;
    onCategory: (v: string) => void;
    onProvider: (v: string) => void;
}) {
    return (
        <div className="space-y-5 mb-10">
            <ChipRow chips={typeChips} selected={selectedType} onSelect={onType} />
            <ChipRow chips={categoryChips} selected={selectedCategory} onSelect={onCategory} />
            <ChipRow chips={providerChips} selected={selectedProvider} onSelect={onProvider} />
        </div>
    );
}

function ChipRow({
    chips,
    selected,
    onSelect,
}: {
    chips: FilterChip[];
    selected: string;
    onSelect: (v: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {chips.map((chip) => {
                const active = selected === chip.id;
                return (
                    <button
                        key={chip.id}
                        type="button"
                        onClick={() => onSelect(chip.id)}
                        className={cn(
                            'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
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
    );
}

