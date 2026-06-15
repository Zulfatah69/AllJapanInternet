'use client';

import React from 'react';
import { FaCheckCircle, FaWifi, FaBolt, FaHome, FaBuilding } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function HomeWifiBanner() {
    return (
        <ScrollReveal direction="up" delay={0.2}>
            <div className="w-full rounded-3xl overflow-hidden shadow-2xl relative group"
                 style={{ 
                     background: 'linear-gradient(145deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)',
                     boxShadow: '0 25px 50px -12px color-mix(in srgb, var(--theme-primary) 40%, transparent)'
                 }}>
                
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                {/* Header Section */}
                <div className="text-white pt-10 pb-8 px-6 text-center relative z-10 flex flex-col items-center">
                    <h2 className="text-5xl md:text-6xl font-black mb-2 tracking-tighter drop-shadow-md italic">
                        Home Wi-Fi
                    </h2>
                    <div className="bg-white text-pink-600 font-black text-2xl md:text-3xl px-6 py-2 border-2 border-pink-500 rounded-lg inline-block mt-2 mb-2 shadow-lg transform -rotate-2">
                        FREE ROUTER !
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-10 bg-white/95 backdrop-blur-xl rounded-t-3xl relative z-10 mx-2 md:mx-4 mb-2 md:mb-4 border border-white/50 shadow-inner flex flex-col gap-8">
                    
                    {/* Info Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Biaya Perbulan Box */}
                        <div className="rounded-3xl p-6 shadow-lg border border-pink-100" style={{ background: 'var(--theme-primary)' }}>
                            <div className="bg-white text-pink-600 font-bold text-lg md:text-xl py-2 px-6 rounded-full inline-block mb-6 shadow-md text-center w-full md:w-auto border-2 border-pink-100">
                                Biaya Perbulan :
                            </div>
                            
                            <div className="space-y-4 text-white">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <FaBuilding className="text-xl opacity-90" />
                                        <span className="font-bold text-base md:text-lg">-Tipe Apartment / Manshion :</span>
                                    </div>
                                    <div className="pl-7 font-black text-2xl text-yellow-300">
                                        Mulai Dari ¥4.000
                                    </div>
                                </div>
                                
                                <div className="pt-2 border-t border-white/20">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FaHome className="text-xl opacity-90" />
                                        <span className="font-bold text-base md:text-lg">-Tipe Family House :</span>
                                    </div>
                                    <div className="pl-7 font-black text-2xl text-yellow-300">
                                        Mulai dari ¥5.000
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Network Provider Box */}
                        <div className="rounded-3xl p-6 shadow-lg border border-pink-100" style={{ background: 'var(--theme-primary)' }}>
                            <div className="bg-white text-pink-600 font-bold text-lg md:text-xl py-2 px-6 rounded-full inline-block mb-6 shadow-md text-center w-full md:w-auto border-2 border-pink-100">
                                Network Provider :
                            </div>
                            
                            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-white font-bold text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                    <span>SOFTBANK HIKARI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                    <span>OCN</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                    <span>TOKAI HIKARI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                    <span>AU HIKARI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                    <span>BIGLOBE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                    <span>NURO HIKARI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                    <span>DOCOMO</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ready Pemasangan Section */}
                    <div className="bg-pink-50/80 rounded-2xl p-6 md:p-8 border-2 border-pink-200 text-center">
                        <h3 className="text-xl md:text-2xl font-black mb-6 text-pink-600 tracking-wide uppercase">
                            Ready Pemasangan Home Wi-Fi
                        </h3>
                        
                        <div className="flex flex-col gap-4 text-left max-w-lg mx-auto">
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-md">
                                        <FaCheckCircle className="w-3 h-3" />
                                    </div>
                                </div>
                                <span className="font-bold text-slate-700 text-lg md:text-xl">Tanpa Uang Awal</span>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-md">
                                        <FaBolt className="w-3 h-3" />
                                    </div>
                                </div>
                                <span className="font-bold text-slate-700 text-lg md:text-xl">Speed Up To 1GBPS</span>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-md">
                                        <FaCheckCircle className="w-3 h-3" />
                                    </div>
                                </div>
                                <span className="font-bold text-slate-700 text-lg md:text-xl leading-tight">Pembayaran pertama adalah 1 bulan setelah pemasangan</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </ScrollReveal>
    );
}
