'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

import { useDebouncedProductSearch } from '../../hooks/useDebouncedSearch';
import { formatYen } from '../../lib/utils';
import { useApp } from '../../providers/AppProvider';

export function GlobalSearch() {
    const { copy } = useApp();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const { results, loading } = useDebouncedProductSearch(
        { search: query || undefined },
        350,
    );

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(true);
            }
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="hidden items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors hover:border-[var(--primary)] md:flex"
                style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}
                aria-label="Search"
            >
                <FiSearch size={16} />
                <span>{copy.search.placeholder}</span>
                <kbd className="rounded border px-1.5 text-[10px] opacity-60">⌘K</kbd>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card w-full max-w-xl overflow-hidden rounded-3xl"
                        >
                            <motion.div
                                layout
                                className="flex items-center gap-3 border-b px-4 py-3"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                <FiSearch style={{ color: 'var(--fg-muted)' }} />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={copy.search.placeholder}
                                    className="flex-1 bg-transparent py-2 outline-none"
                                />
                                <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                                    <FiX />
                                </button>
                            </motion.div>
                            <div className="max-h-[50vh] overflow-y-auto p-2">
                                {loading && (
                                    <p className="p-4 text-sm" style={{ color: 'var(--fg-muted)' }}>
                                        {copy.common.loading}
                                    </p>
                                )}
                                {!loading && query && results.length === 0 && (
                                    <p className="p-4 text-sm" style={{ color: 'var(--fg-muted)' }}>
                                        {copy.search.empty}
                                    </p>
                                )}
                                {results.slice(0, 8).map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.slug}`}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-[var(--bg-muted)]"
                                    >
                                        {product.thumbnail_url && (
                                            <img
                                                src={product.thumbnail_url}
                                                alt=""
                                                className="h-12 w-12 rounded-xl object-cover"
                                            />
                                        )}
                                        <motion.div layout className="min-w-0 flex-1">
                                            <p className="truncate font-medium">{product.nama}</p>
                                            <p className="text-sm text-[var(--primary-strong)]">
                                                {formatYen(product.lowest_price)}
                                            </p>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
