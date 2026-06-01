'use client';

import React from 'react';
import { FaCheckCircle, FaWifi } from 'react-icons/fa';

export default function HomeWifiBanner({ products = [] }: { products?: any[] }) {
    return (
        <div className="w-full rounded-3xl overflow-hidden shadow-sm border mt-8 mb-8"
             style={{ 
                 background: 'color-mix(in srgb, var(--theme-primary) 3%, transparent)',
                 borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)'
             }}>
            {/* Header Section */}
            <div className="text-white p-6 md:p-10 text-center relative overflow-hidden"
                 style={{ background: 'var(--theme-primary)' }}>
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Home Wi-Fi</h2>
                    <p className="text-lg md:text-xl font-bold opacity-90">Bisa pasang ke seluruh alamat Jepang</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10">
                {/* Images/Icons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border text-center flex flex-col items-center justify-center overflow-hidden group"
                                 style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)' }}>
                                {product.thumbnail_url || product.gambar_url ? (
                                    <img src={product.thumbnail_url || product.gambar_url} alt={product.nama} className="w-32 h-32 md:w-40 md:h-40 object-contain mb-3 group-hover:scale-110 transition-transform" />
                                ) : (
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-3"
                                         style={{ background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)', color: 'var(--theme-primary)' }}>
                                        <FaWifi className="w-12 h-12 md:w-16 md:h-16" />
                                    </div>
                                )}
                                <span className="font-bold text-sm" style={{ color: 'var(--theme-primary)' }}>{product.nama}</span>
                            </div>
                        ))
                    ) : (
                        ['Softbank', 'AU', 'Nuro', 'Tokai'].map((provider) => (
                            <div key={provider} className="bg-white rounded-xl p-4 shadow-sm border text-center flex flex-col items-center justify-center"
                                 style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)' }}>
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-3"
                                     style={{ background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)', color: 'var(--theme-primary)' }}>
                                    <FaWifi className="w-12 h-12 md:w-16 md:h-16" />
                                </div>
                                <span className="font-bold" style={{ color: 'var(--theme-primary)' }}>{provider}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10 text-sm md:text-base font-semibold text-gray-700">
                    {[
                        'Free area checking',
                        'Fiber optic line',
                        'Free router',
                        'Layanan 24 jam',
                        'Tidak ada pembayaran di awal',
                        'Pembayaran bulanan pertama setelah 1 bulan pemakaian',
                        'Unlimited Data',
                        'Network speed 1-2Gbps'
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <FaCheckCircle className="shrink-0" size={18} style={{ color: 'var(--theme-primary)' }} />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Info Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Biaya Box */}
                    <div className="text-white rounded-2xl p-6 shadow-md" style={{ background: 'var(--theme-primary)' }}>
                        <div className="bg-white font-black text-center py-2 px-4 rounded-full inline-block mb-4 shadow-sm border-2"
                             style={{ color: 'var(--theme-primary)', borderColor: 'var(--theme-primary)' }}>
                            Biaya Perbulan :
                        </div>
                        <ul className="space-y-3 font-semibold text-sm md:text-base">
                            <li className="flex gap-2">
                                <span>-</span>
                                <span>Tipe Apartment / Manshion :<br />Mulai Dari ¥4.000</span>
                            </li>
                            <li className="flex gap-2">
                                <span>-</span>
                                <span>Tipe Family House :<br />Mulai dari ¥5.000</span>
                            </li>
                        </ul>
                    </div>

                    {/* Network Provider Box */}
                    <div className="text-white rounded-2xl p-6 shadow-md" style={{ background: 'var(--theme-primary)' }}>
                        <div className="bg-white font-black text-center py-2 px-4 rounded-full inline-block mb-4 shadow-sm border-2"
                             style={{ color: 'var(--theme-primary)', borderColor: 'var(--theme-primary)' }}>
                            Network Provider :
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-semibold text-sm md:text-base">
                            <ul className="space-y-2 list-disc list-inside">
                                <li>SOFTBANK HIKARI</li>
                                <li>TOKAI HIKARI</li>
                                <li>BIGLOBE</li>
                                <li>DOCOMO</li>
                            </ul>
                            <ul className="space-y-2 list-disc list-inside">
                                <li>OCN</li>
                                <li>AU HIKARI</li>
                                <li>NURO HIKARI</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Final Banner */}
                <div className="border-2 rounded-2xl p-6 text-center shadow-sm"
                     style={{ background: 'color-mix(in srgb, var(--theme-primary) 3%, transparent)', borderColor: 'var(--theme-primary)' }}>
                    <div className="text-white font-black text-lg md:text-xl py-2 px-8 rounded-full inline-block mb-6 shadow-sm"
                         style={{ background: 'var(--theme-primary)' }}>
                        READY PEMASANGAN HOME WI-FI
                    </div>
                    <ul className="text-left max-w-md mx-auto space-y-2 font-semibold md:text-lg"
                        style={{ color: 'var(--theme-primary)' }}>
                        <li className="flex items-center gap-2"><span className="text-2xl">•</span> Tanpa Uang Awal</li>
                        <li className="flex items-center gap-2"><span className="text-2xl">•</span> Speed Up To 1GBPS</li>
                        <li className="flex items-start gap-2"><span className="text-2xl">•</span> <span>Pembayaran pertama adalah<br/>1 bulan setelah pemasangan</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
