'use client';

import React, { useState, useEffect } from 'react';

export default function ProductCarouselWrapper({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const items = React.Children.toArray(children);

    if (items.length === 0) {
        return null;
    }

    if (!isMobile) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {items}
            </div>
        );
    }

    // Mobile layout: horizontal scroll list (menyamping, ukuran besar w-[85%])
    return (
        <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-6 px-1 -mx-1 hide-scrollbar">
            {items.map((item, idx) => (
                <div key={idx} className="snap-center shrink-0 w-[85%] max-w-[320px]">
                    {item}
                </div>
            ))}
        </div>
    );
}
