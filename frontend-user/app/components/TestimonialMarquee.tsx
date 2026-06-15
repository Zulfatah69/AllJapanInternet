'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
    id: number;
    image_url: string;
}

export default function TestimonialMarquee({ testimonials }: { testimonials: Testimonial[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    // If there are very few items, we need to duplicate them enough times to fill the screen
    // plus extra to allow seamless looping.
    const getDuplicatedItems = () => {
        if (!testimonials || testimonials.length === 0) return [];
        
        // If we have 1 item, we want to duplicate it maybe 10 times to form a long enough strip
        // If we have 5 items, maybe duplicate 2 or 3 times.
        const minItemsForSeamless = 8;
        let arr = [...testimonials];
        while (arr.length < minItemsForSeamless) {
            arr = [...arr, ...testimonials];
        }
        // Then double it so we have a left half and a right half that are identical
        return [...arr, ...arr];
    };

    const duplicatedItems = getDuplicatedItems();

    useEffect(() => {
        if (containerRef.current) {
            // contentWidth is exactly HALF of the total scrollable width
            // because we doubled the array at the end.
            setContentWidth(containerRef.current.scrollWidth / 2);
        }
    }, [duplicatedItems.length]);

    const baseVelocity = -1; // pixels per frame
    const [xPosition, setXPosition] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useAnimationFrame(() => {
        if (!contentWidth || isHovered) return;
        
        let newX = xPosition + baseVelocity;
        
        // If we have scrolled past the first half, wrap back to 0 seamlessly!
        if (newX <= -contentWidth) {
            newX = newX + contentWidth;
        }
        
        setXPosition(newX);
    });

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <ScrollReveal direction="up" delay={0.2} duration={0.8}>
            <div className="relative w-full overflow-hidden py-8">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none"></div>
                
                {/* Motion Container */}
                <motion.div
                    ref={containerRef}
                    className="flex gap-6 w-max"
                    style={{ x: xPosition }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                >
                    {duplicatedItems.map((item, idx) => (
                        <div
                            key={`testi-${item.id}-${idx}`}
                            className="premium-card overflow-hidden p-0 flex-shrink-0 w-[240px] sm:w-[280px] shadow-lg rounded-2xl transform transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={item.image_url}
                                alt="Testimonial"
                                className="w-full h-auto object-cover pointer-events-none"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </ScrollReveal>
    );
}
