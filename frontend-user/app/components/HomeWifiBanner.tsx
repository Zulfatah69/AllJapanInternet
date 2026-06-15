'use client';

import React from 'react';
import { FaCheckCircle, FaBolt, FaHome, FaBuilding, FaWhatsapp, FaWifi } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function HomeWifiBanner({ items = [] }: { items?: any[] }) {
    const { language } = useLanguage();

    const handleWhatsappClick = () => {
        const adminPhone = "818042571217"; // Nomor admin sesuai yang ada di header/footer
        const message = language === 'id' 
            ? "Halo, saya ingin bertanya tentang informasi pemasangan Home Wi-Fi yang ada di website."
            : "Hello, I would like to ask about the Home Wi-Fi installation information on the website.";
        const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    };

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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Biaya Perbulan Box */}
                        <div className="rounded-3xl p-6 shadow-lg border border-pink-100 flex flex-col" style={{ background: 'var(--theme-primary)' }}>
                            <div className="bg-white text-pink-600 font-bold text-lg md:text-xl py-2 px-6 rounded-full inline-block mb-6 shadow-md text-center w-full lg:w-auto border-2 border-pink-100 self-start">
                                Biaya Perbulan :
                            </div>
                            
                            <div className="space-y-6 text-white mt-auto mb-auto">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaBuilding className="text-xl opacity-90" />
                                        <span className="font-bold text-base md:text-lg">-Tipe Apartment / Manshion :</span>
                                    </div>
                                    <div className="pl-7 font-black text-3xl text-yellow-300">
                                        Mulai Dari ¥4.000
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t border-white/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaHome className="text-xl opacity-90" />
                                        <span className="font-bold text-base md:text-lg">-Tipe Family House :</span>
                                    </div>
                                    <div className="pl-7 font-black text-3xl text-yellow-300">
                                        Mulai dari ¥5.000
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Network Provider Box (Dynamic from Backend) */}
                        <div className="rounded-3xl p-6 shadow-lg border border-pink-100" style={{ background: 'var(--theme-primary)' }}>
                            <div className="bg-white text-pink-600 font-bold text-lg md:text-xl py-2 px-6 rounded-full inline-block mb-6 shadow-md text-center w-full lg:w-auto border-2 border-pink-100">
                                Network Provider :
                            </div>
                            
                            {items && items.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                                    {items.map((provider, idx) => (
                                        <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            {provider.gambar_url ? (
                                                <div className="aspect-[16/9] w-full overflow-hidden bg-white flex items-center justify-center p-2">
                                                    <img 
                                                        src={provider.gambar_url} 
                                                        alt={provider.nama}
                                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-[16/9] w-full bg-slate-100 flex items-center justify-center">
                                                    <FaWifi className="text-slate-300 text-3xl" />
                                                </div>
                                            )}
                                            <div className="py-2 px-2 text-center border-t border-slate-100">
                                                <p className="text-slate-800 font-black text-xs md:text-sm truncate">
                                                    {provider.nama}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-white/80 text-center py-8 italic font-medium">
                                    Provider sedang dimuat...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ready Pemasangan Section */}
                    <div className="bg-pink-50/80 rounded-2xl p-6 md:p-8 border-2 border-pink-200 text-center shadow-md">
                        <h3 className="text-xl md:text-2xl font-black mb-6 text-pink-600 tracking-wide uppercase drop-shadow-sm">
                            Ready Pemasangan Home Wi-Fi
                        </h3>
                        
                        <div className="flex flex-col gap-5 text-left max-w-2xl mx-auto">
                            <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                    <FaCheckCircle className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-700 text-lg md:text-xl">Tanpa Uang Awal</span>
                            </div>
                            
                            <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                    <FaBolt className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-700 text-lg md:text-xl">Speed Up To 1GBPS</span>
                            </div>
                            
                            <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                    <FaCheckCircle className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-700 text-base md:text-xl leading-tight">Pembayaran pertama adalah 1 bulan setelah pemasangan</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Call to Action WhatsApp */}
                    <div className="mt-2 text-center">
                        <button 
                            onClick={handleWhatsappClick}
                            className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl font-black text-lg md:text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
                        >
                            <FaWhatsapp className="text-3xl" />
                            {language === 'id' ? 'Tanya / Pesan via WhatsApp' : 'Ask / Order via WhatsApp'}
                        </button>
                        <p className="mt-3 text-slate-500 text-sm font-medium">
                            {language === 'id' ? '*Konsultasi gratis!' : '*Free consultation!'}
                        </p>
                    </div>

                </div>
            </div>
        </ScrollReveal>
    );
}
