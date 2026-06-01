'use client';

import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Promo {
    id: number;
    judul: string;
    gambar_url: string;
    link?: string;
}

export default function PromoCarousel({ promos }: { promos: Promo[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll
    useEffect(() => {
        if (!promos || promos.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % promos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [promos]);

    if (!promos || promos.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % promos.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length);
    };

    const getSlideClass = (index: number) => {
        if (index === currentIndex) return "translate-x-0 scale-100 opacity-100 z-20";
        
        // Previous slide
        if (index === (currentIndex - 1 + promos.length) % promos.length) {
            return "-translate-x-[60%] sm:-translate-x-[75%] md:-translate-x-[85%] scale-90 opacity-40 z-10 brightness-50";
        }
        
        // Next slide
        if (index === (currentIndex + 1) % promos.length) {
            return "translate-x-[60%] sm:translate-x-[75%] md:translate-x-[85%] scale-90 opacity-40 z-10 brightness-50";
        }

        // Other slides hidden
        return "opacity-0 scale-75 z-0 pointer-events-none";
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden py-8 md:py-12 flex items-center justify-center">
            {/* Carousel Track */}
            <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] flex items-center justify-center">
                {promos.map((promo, index) => (
                    <div
                        key={promo.id}
                        className={`absolute w-[80%] md:w-[70%] max-w-4xl transition-all duration-500 ease-out ${getSlideClass(index)} cursor-pointer shadow-2xl rounded-2xl overflow-hidden`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <img 
                            src={promo.gambar_url} 
                            alt={promo.judul} 
                            className="w-full h-full object-cover aspect-[21/9]"
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            {promos.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 md:left-10 z-30 bg-[#0c1824]/90 text-white p-3 rounded-xl hover:bg-[#1a2c3f] transition-colors border border-white/10"
                        aria-label="Previous Promo"
                    >
                        <FaChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 md:right-10 z-30 bg-[#0c1824]/90 text-white p-3 rounded-xl hover:bg-[#1a2c3f] transition-colors border border-white/10"
                        aria-label="Next Promo"
                    >
                        <FaChevronRight size={20} />
                    </button>
                </>
            )}
        </div>
    );
}
