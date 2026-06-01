'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
    FiZoomIn,
    FiZoomOut,
    FiRotateCcw,
    FiChevronLeft,
    FiChevronRight,
    FiX
} from 'react-icons/fi';

type LightboxProps = {
    images: string[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
};

export default function Lightbox({
    images,
    initialIndex,
    isOpen,
    onClose
}: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);

    // Sync initialIndex when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setScale(1);
            setPosition({ x: 0, y: 0 });
            // Lock body scroll
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, initialIndex]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, [images.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, [images.length]);

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = () => {
        setScale((prev) => {
            const next = Math.max(prev - 0.5, 1);
            if (next === 1) setPosition({ x: 0, y: 0 });
            return next;
        });
    };

    const handleResetZoom = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    // Keyboard handlers
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleNext, handlePrev, onClose]);

    // Drag-to-pan handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale === 1) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || scale === 1) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    if (!isOpen) return null;

    const currentImage = images[currentIndex];

    return (
        <div 
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/95 backdrop-blur-md transition-opacity duration-300 ease-in-out text-white select-none"
            onMouseUp={handleMouseUp}
        >
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/60 to-transparent z-10">
                <div className="text-sm font-semibold tracking-wider opacity-80">
                    {currentIndex + 1} / {images.length}
                </div>
                
                {/* Image Tools */}
                <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                    <button 
                        onClick={handleZoomOut} 
                        disabled={scale <= 1}
                        className="p-1.5 hover:bg-white/10 rounded-full transition disabled:opacity-40"
                        title="Zoom Out"
                    >
                        <FiZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-mono font-semibold w-10 text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <button 
                        onClick={handleZoomIn} 
                        disabled={scale >= 4}
                        className="p-1.5 hover:bg-white/10 rounded-full transition disabled:opacity-40"
                        title="Zoom In"
                    >
                        <FiZoomIn className="w-5 h-5" />
                    </button>
                    {scale > 1 && (
                        <button 
                            onClick={handleResetZoom}
                            className="p-1.5 hover:bg-white/10 rounded-full transition text-sky-400"
                            title="Reset Zoom"
                        >
                            <FiRotateCcw className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-transform active:scale-95 border border-white/10 bg-black/20"
                    title="Close (Esc)"
                >
                    <FiX className="w-6 h-6" />
                </button>
            </div>

            {/* Main Stage */}
            <div 
                className="relative flex-1 flex items-center justify-center overflow-hidden w-full"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
            >
                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrev}
                            className="absolute left-6 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition active:scale-95 hover:scale-105"
                            aria-label="Previous image"
                        >
                            <FiChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="absolute right-6 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition active:scale-95 hover:scale-105"
                            aria-label="Next image"
                        >
                            <FiChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* The Image Wrapper (supports drag cursor when zoomed) */}
                <div 
                    className={`transition-all duration-100 ease-out select-none ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    }}
                >
                    <img
                        ref={imageRef}
                        src={currentImage}
                        alt="Enlarged view"
                        className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl pointer-events-none"
                    />
                </div>
            </div>

            {/* Bottom Carousel / Thumbnails */}
            {images.length > 1 && (
                <div className="px-6 py-5 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center gap-2 z-10">
                    <div className="flex gap-2.5 overflow-x-auto max-w-[85vw] no-scrollbar py-2 scroll-smooth">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    setScale(1);
                                    setPosition({ x: 0, y: 0 });
                                }}
                                className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                                    idx === currentIndex 
                                        ? 'border-sky-400 scale-105 shadow-[0_0_15px_rgba(56,189,248,0.5)]' 
                                        : 'border-white/20 opacity-60 hover:opacity-100 hover:scale-102'
                                }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
