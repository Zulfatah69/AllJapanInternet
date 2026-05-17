'use client';

import { useState } from 'react';

import { resolveMediaUrl } from '../../lib/media';
import { cn } from '../../lib/utils';

type Props = {
    src?: string | null;
    alt: string;
    className?: string;
    fallbackClassName?: string;
};

export function MediaImage({ src, alt, className, fallbackClassName }: Props) {
    const [failed, setFailed] = useState(false);
    const url = resolveMediaUrl(src);

    if (!url || failed) {
        return (
            <div
                className={cn(
                    'flex h-full min-h-[120px] w-full items-center justify-center',
                    fallbackClassName,
                )}
                style={{ background: 'var(--gradient-mesh)' }}
                aria-hidden
            />
        );
    }

    return (
        <img
            src={url}
            alt={alt}
            className={className}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
        />
    );
}
