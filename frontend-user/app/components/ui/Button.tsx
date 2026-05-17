'use client';

import Link from 'next/link';
import { cn } from '../../lib/utils';

type ButtonProps = {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'ghost' | 'outline';
    className?: string;
    type?: 'button' | 'submit';
};

export function Button({
    children,
    href,
    onClick,
    variant = 'primary',
    className,
    type = 'button',
}: ButtonProps) {
    const base =
        'inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]';

    const variants = {
        primary: 'btn-primary text-white',
        ghost: 'bg-transparent hover:bg-black/5',
        outline:
            'border bg-[var(--bg-elevated)] hover:border-[var(--primary)]',
    };

    const styles = cn(base, variants[variant], className);

    if (href) {
        return (
            <Link href={href} className={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={styles}>
            {children}
        </button>
    );
}
