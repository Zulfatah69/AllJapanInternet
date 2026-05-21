'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { getSettings } from '@/app/services/api';
import { parseSettingsTheme, type ThemeType } from '@/app/lib/theme';

export type { ThemeType } from '@/app/lib/theme';

interface LanguageContextType {
    language: 'id' | 'en';
    setLanguage: (lang: 'id' | 'en') => void;
    theme: ThemeType;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

const translations: Record<string, { id: string; en: string }> = {
    beranda: { id: 'Beranda', en: 'Home' },
    produk: { id: 'Produk', en: 'Products' },
    keunggulan: { id: 'Keunggulan', en: 'Features' },
    caraOrder: { id: 'Cara Order', en: 'How to Order' },
    bukuPanduan: { id: 'Buku Panduan', en: 'Guide' },
    waktuPengiriman: { id: 'Waktu Pengiriman', en: 'Delivery' },
    kontak: { id: 'Kontak', en: 'Contact' },
    tagline: {
        id: 'Termudah, Tercepat, dan Terpercaya',
        en: 'Easy, Fast, and Trusted',
    },
    variant: { id: 'Variant', en: 'Variant' },
    billingPeriod: { id: 'Periode Pembelian', en: 'Billing Period' },
    paymentMethod: { id: 'Metode Pembayaran', en: 'Payment Method' },
    total: { id: 'Total', en: 'Total' },
    orderWhatsapp: { id: 'Pesan via WhatsApp', en: 'Order via WhatsApp' },
    heroEyebrow: { id: 'Internet Jepang', en: 'Japan Internet' },
    heroTitle: { id: 'Tetap Terhubung di Jepang', en: 'Stay Connected in Japan' },
    heroDesc: {
        id: 'SIM Card, Pocket WiFi & Home WiFi Japan',
        en: 'SIM Card, Pocket WiFi & Home WiFi Japan',
    },
    heroCta: { id: 'Lihat Produk', en: 'View Products' },
    benefitsEyebrow: { id: 'Keunggulan', en: 'Why Us' },
    benefitsTitle: { id: 'Mengapa Memilih Kami', en: 'Why Choose Us' },
    benefitsSubtitle: {
        id: 'Layanan internet terpercaya untuk kehidupan Anda di Jepang',
        en: 'Trusted internet service for your life in Japan',
    },
    benefit1: { id: 'Tanpa Kontrak & Deposit', en: 'No Contract & Deposit' },
    benefit1desc: {
        id: 'Bebas berlangganan tanpa kontrak panjang dan tanpa deposit',
        en: 'No long-term contract and no deposit required',
    },
    benefit2: { id: 'Tanpa Pajak Tambahan', en: 'No Extra Tax' },
    benefit2desc: {
        id: 'Tidak ada biaya tersembunyi atau pajak tambahan',
        en: 'Clean monthly payment with no hidden fees',
    },
    benefit3: { id: 'Layanan 24 Jam', en: '24 Hour Service' },
    benefit3desc: {
        id: 'Customer service siap membantu kapan saja',
        en: 'Customer service available anytime in Indonesian',
    },
    benefit4: { id: 'Bayar Setelah Gajian', en: 'Pay After Payday' },
    benefit4desc: {
        id: 'Fleksibel! Bisa bayar setelah gajian (*S&K berlaku)',
        en: 'Flexible payment after payday (*terms apply)',
    },
    benefit5: { id: 'Pengiriman Seluruh Jepang', en: 'Shipping Across Japan' },
    benefit5desc: {
        id: 'Pesan online dan dikirim ke seluruh wilayah Jepang',
        en: 'Order online and delivered throughout Japan',
    },
    benefit6: { id: 'Bayar Yen atau Rupiah', en: 'Pay in Yen or Rupiah' },
    benefit6desc: {
        id: 'Pembayaran fleksibel menggunakan Yen atau Rupiah',
        en: 'Flexible payment in Yen or Rupiah',
    },
    productsEyebrow: { id: 'Katalog', en: 'Catalog' },
    productsTitle: { id: 'Produk', en: 'Products' },
    productsSubtitle: {
        id: 'Internet SIM & eSIM untuk Jepang',
        en: 'Internet SIM & eSIM for Japan',
    },
    howtoEyebrow: { id: 'Panduan', en: 'Guide' },
    howtoTitle: { id: 'Cara Order', en: 'How to Order' },
    howtoSubtitle: {
        id: 'Empat langkah mudah untuk memulai',
        en: 'Four easy steps to get started',
    },
    pilihKuota: { id: 'Pilih Kuota', en: 'Choose Package' },
    isiFormat: { id: 'Isi Format Order', en: 'Fill Order Form' },
    pembayaran: { id: 'Pilih Cara Pembayaran', en: 'Choose Payment' },
    proses: { id: 'Pesanan Diproses & Dikirim', en: 'Processed & Delivered' },
    guideEyebrow: { id: 'Dokumen', en: 'Documents' },
    guideTitle: { id: 'Buku Panduan', en: 'Guide Book' },
    guideDesc: {
        id: 'Download buku panduan SIM & WiFi Jepang',
        en: 'Download our SIM & WiFi guide book',
    },
    guideMonthly: { id: 'Buku Panduan Bulanan', en: 'Monthly Guide PDF' },
    guideYearly: { id: 'Buku Panduan Tahunan', en: 'Yearly Guide PDF' },
    shippingEyebrow: { id: 'Pengiriman', en: 'Shipping' },
    shippingTitle: { id: 'Waktu Pengiriman', en: 'Delivery Time' },
    shippingSubtitle: {
        id: 'Estimasi pengiriman ke seluruh Jepang',
        en: 'Delivery estimates across Japan',
    },
    shippingNoteTitle: {
        id: 'Pengiriman Seluruh Jepang',
        en: 'Nationwide Delivery',
    },
    shippingNote: {
        id: 'Pengiriman dilakukan setiap hari dan dikirim langsung ke alamat Anda di seluruh wilayah Jepang.',
        en: 'We ship daily directly to your address anywhere in Japan.',
    },
    testimonialEyebrow: { id: 'Ulasan', en: 'Reviews' },
    testimonialTitle: { id: 'Testimoni', en: 'Testimonials' },
    testimonialSubtitle: {
        id: 'Apa kata pelanggan kami',
        en: 'What our customers say',
    },
    contactEyebrow: { id: 'Hubungi', en: 'Reach Us' },
    contactTitle: { id: 'Kontak', en: 'Contact' },
    contactSubtitle: {
        id: 'Kami siap membantu Anda',
        en: 'We are here to help you',
    },
    contactWhatsapp: { id: 'WhatsApp', en: 'WhatsApp' },
    contactEmail: { id: 'Email', en: 'Email' },
    contactInstagram: { id: 'Instagram', en: 'Instagram' },
    contactLocation: { id: 'Lokasi', en: 'Location' },
    contactHours: { id: 'Jam Operasional', en: 'Operating Hours' },
    footerTagline: {
        id: 'Internet SIM & eSIM untuk Jepang',
        en: 'Internet SIM & eSIM for Japan',
    },
    footerRights: {
        id: 'Hak Cipta Dilindungi',
        en: 'All Rights Reserved',
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<'id' | 'en'>('id');
    const [theme, setTheme] = useState<ThemeType>('winter');

    useEffect(() => {
        async function fetchSettings() {
            try {
                const settings = await getSettings();
                setTheme(parseSettingsTheme(settings));
            } catch (error) {
                console.error('Failed to fetch theme settings:', error);
            }
        }
        fetchSettings();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const t = (key: string): string => {
        return translations[key]?.[language] ?? key;
    };

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, theme, t }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
