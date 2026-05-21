'use client';

interface SectionHeaderProps {
    eyebrow: string;
    title: string;
    subtitle?: string;
    className?: string;
    centered?: boolean;
}

export default function SectionHeader({
    eyebrow,
    title,
    subtitle,
    className = '',
    centered = true,
}: SectionHeaderProps) {
    return (
        <div
            className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}
        >
            <p className="premium-eyebrow mb-3">{eyebrow}</p>
            <h2
                className="font-display text-3xl md:text-4xl lg:text-5xl"
                style={{ color: 'var(--foreground)' }}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-4 text-base md:text-lg max-w-2xl ${centered ? 'mx-auto' : ''}`}
                    style={{ color: 'var(--theme-muted)' }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
