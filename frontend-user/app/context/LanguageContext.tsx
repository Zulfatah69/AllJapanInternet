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
    isThemeReady: boolean;
    t: (key: string) => string;
    translateDynamicText: (text: string | undefined | null) => string;
    getLocalizedText: (idText: string | undefined | null, enText?: string | undefined | null) => string;
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
    tentangKami: { id: 'Tentang Kami', en: 'About Us' },
    caraPembayaran: { id: 'Cara Pembayaran', en: 'Payment' },
    qna: { id: 'QnA', en: 'FAQ' },
    tagline: {
        id: 'Termudah, Tercepat, dan Terpercaya',
        en: 'Easy, Fast, and Trusted',
    },
    aboutEyebrow: { id: 'Tentang Kami', en: 'About Us' },
    aboutTitle: {
        id: 'All Japan Internet',
        en: 'All Japan Internet',
    },
    aboutTagline: {
        id: 'TERMUDAH · TERCEPAT · TERPERCAYA',
        en: 'EASIEST · FASTEST · MOST TRUSTED',
    },
    aboutIntro: {
        id: 'Kartu internet fisik, E-Sim, Pocket WiFi tanpa kontrak, dan pemasangan home WiFi untuk seluruh WNI di Jepang.',
        en: 'Physical internet cards, e-SIM, contract-free Pocket WiFi, and home WiFi installation for Indonesians across Japan.',
    },
    aboutBody: {
        id: 'All Japan Internet menyediakan kartu internet fisik dan E-Sim tanpa kontrak, dengan sistem bulanan atau tahunan, untuk pemagang, pekerja tokutei ginou, pelajar, dan semua masyarakat Indonesia yang ada di Jepang.',
        en: 'All Japan Internet provides physical and e-SIM cards without contracts, with monthly or yearly plans, for interns, specified skilled workers, students, and all Indonesian communities in Japan.',
    },
    aboutClosing: {
        id: 'Memiliki sistem pemesanan secara online, pengiriman ke seluruh wilayah Jepang, serta dukungan customer service yang ramah dalam bahasa Indonesia.',
        en: 'We offer online ordering, delivery throughout Japan, and friendly customer service in Indonesian.',
    },
    paymentEyebrow: { id: 'Pembayaran', en: 'Payment' },
    paymentTitle: { id: 'Cara Pembayaran', en: 'How to Pay' },
    paymentSubtitle: {
        id: 'Pilihan pembayaran uang awal yang fleksibel',
        en: 'Flexible options for your initial payment',
    },
    paymentInitialLabel: {
        id: 'Pembayaran uang awal melalui',
        en: 'Initial payment via',
    },
    paymentNote: {
        id: 'Untuk tagihan bulanan berikutnya, metode pembayaran dapat disesuaikan saat order.',
        en: 'For subsequent monthly bills, payment methods can be chosen when you order.',
    },
    payCodTitle: { id: 'COD', en: 'COD' },
    payCodDesc: {
        id: 'Bayar ke kurir saat barang diantar ke alamat Anda.\nMendukung Japan Post dan Kuroneko Yamato.',
        en: 'Pay the courier when your order is delivered.\nSupports Japan Post and Kuroneko Yamato.',
    },
    payTransferTitle: { id: 'Transfer Bank', en: 'Bank Transfer' },
    payTransferDesc: {
        id: 'Transfer melalui Yucho (Japan Post Bank) atau transfer Rupiah.',
        en: 'Pay via Yucho (Japan Post Bank) or Rupiah transfer.',
    },
    payKonbiniTitle: { id: 'Smartpit', en: 'Smartpit' },
    payKonbiniDesc: {
        id: 'Pembayaran di Family Mart, Lawson, dan Ministop melalui kasir (Konbini) atau menggunakan mesin pembayaran (Famiport/Loppi).\nTips: ubah pengaturan bahasa mesin ke English agar lebih mudah.',
        en: 'Pay at Family Mart, Lawson, and Ministop via cashier (Convenience Store) or using payment machines (Famiport/Loppi).\nTip: switch the machine language to English for easier use.',
    },
    paySmartpitTitle: { id: 'Mesin Smartpit', en: 'Smartpit Machine' },
    paySmartpitDesc: {
        id: 'Mesin Famiport di Family Mart, mesin Loppi di Lawson & Ministop, atau mesin fotokopy.\nTips: ubah pengaturan bahasa mesin ke English agar lebih mudah.',
        en: 'Famiport at Family Mart, Loppi at Lawson & Ministop, or copy machines.\nTip: switch the machine language to English for easier use.',
    },
    payCodJpTitle: { id: 'COD - Japan Post', en: 'COD - Japan Post' },
    payCodJpDesc: {
        id: 'Bayar tunai ke kurir Japan Post saat paket tiba di alamat Anda.',
        en: 'Pay cash to the Japan Post courier when your package arrives.',
    },
    hwSubtitle: {
        id: 'Bisa pasang ke seluruh alamat Jepang',
        en: 'Can be installed at any address in Japan',
    },
    hwFeat1: { id: 'Layanan 24 jam', en: '24-hour service' },
    hwFeat2: {
        id: 'Tidak ada pembayaran di awal',
        en: 'No upfront payment',
    },
    hwFeat3: {
        id: 'Pembayaran bulanan pertama setelah 1 bulan pemakaian',
        en: 'First monthly payment after 1 month of use',
    },
    hwCostTitle: { id: 'Biaya Perbulan :', en: 'Monthly Cost :' },
    hwCostApt: {
        id: 'Tipe Apartment / Manshion',
        en: 'Apartment / Mansion Type',
    },
    hwCostHouse: { id: 'Tipe Family House', en: 'Family House Type' },
    hwStartingFrom: { id: 'Mulai Dari', en: 'Starting From' },
    hwNetworkTitle: { id: 'Network Provider :', en: 'Network Provider :' },
    hwReady: {
        id: 'READY PEMASANGAN HOME WI-FI',
        en: 'READY FOR HOME WI-FI INSTALLATION',
    },
    hwNoUpfront: { id: 'Tanpa Uang Awal', en: 'No Upfront Payment' },
    hwFirstPayment: {
        id: 'Pembayaran pertama adalah',
        en: 'First payment is',
    },
    hwAfterInstall: {
        id: '1 bulan setelah pemasangan',
        en: '1 month after installation',
    },
    payCodKuronekoTitle: { id: 'COD - Kuroneko Yamato', en: 'COD - Kuroneko Yamato' },
    payCodKuronekoDesc: {
        id: 'Bayar tunai ke kurir Kuroneko Yamato saat paket tiba di alamat Anda.',
        en: 'Pay cash to the Kuroneko Yamato courier when the package arrives at your address.',
    },
    payTransferJpTitle: { id: 'Transfer Yucho (Jepang)', en: 'Yucho Bank Transfer (Japan)' },
    payTransferJpDesc: {
        id: 'Transfer langsung melalui ATM Yucho (Japan Post Bank) atau ATM lokal Jepang lainnya.',
        en: 'Transfer directly via Yucho ATM (Japan Post Bank) or other local Japanese ATMs.',
    },
    payTransferIdTitle: { id: 'Transfer Rupiah (Indonesia)', en: 'Rupiah Bank Transfer (Indonesia)' },
    payTransferIdDesc: {
        id: 'Transfer online menggunakan mata uang Rupiah ke rekening Bank Mandiri / BCA / BNI Indonesia.',
        en: 'Online transfer using Rupiah currency to Indonesian Bank Mandiri / BCA / BNI accounts.',
    },
    payKonbiniFamiportTitle: { id: 'Famiport (Family Mart)', en: 'Famiport (Family Mart)' },
    payKonbiniFamiportDesc: {
        id: 'Cetak struk pembayaran melalui mesin Famiport di Family Mart lalu bayar di kasir.',
        en: 'Print the payment slip via Famiport machine in Family Mart then pay at the cashier.',
    },
    payKonbiniLoppiTitle: { id: 'Loppi (Lawson & Ministop)', en: 'Loppi (Lawson & Ministop)' },
    payKonbiniLoppiDesc: {
        id: 'Cetak struk pembayaran melalui mesin Loppi di Lawson atau Ministop lalu bayar di kasir.',
        en: 'Print the payment slip via Loppi machine in Lawson or Ministop then pay at the cashier.',
    },
    payKonbiniSmartpitTitle: { id: 'Mesin Fotokopi', en: 'Copy Machine' },
    payKonbiniSmartpitDesc: {
        id: 'Gunakan barcode Smartpit di mesin fotokopi serbaguna Lawson/Family Mart untuk mencetak slip pembayaran.',
        en: 'Use Smartpit barcode on Lawson/Family Mart multifunction copy machines to print your payment slip.',
    },
    faqEyebrow: { id: 'Bantuan', en: 'Help' },
    faqTitle: { id: 'Pertanyaan yang Sering Diajukan', en: 'Frequently Asked Questions' },
    faqSubtitle: {
        id: 'Jawaban untuk pertanyaan pelanggan yang paling sering kami terima',
        en: 'Answers to the questions we hear most often',
    },
    faq1Q: {
        id: 'Apakah ada kontrak atau deposit?',
        en: 'Is there a contract or deposit?',
    },
    faq1A: {
        id: 'Tidak ada kontrak jangka panjang dan tidak ada deposit. Anda bebas berlangganan sesuai kebutuhan.',
        en: 'No long-term contract and no deposit. Subscribe as long as you need.',
    },
    faq2Q: {
        id: 'Berapa lama pengiriman ke alamat saya?',
        en: 'How long is delivery to my address?',
    },
    faq2A: {
        id: 'COD 1 hari untuk area tertentu (Kanto dll.), COD 2 hari untuk wilayah lain. Transfer biasanya 1–3 hari kerja sebelum pengiriman.',
        en: 'COD 1 day in select areas (Kanto etc.), COD 2 days elsewhere. Bank transfer usually 1–3 business days before shipping.',
    },
    faq3Q: {
        id: 'Bisa bayar pakai Rupiah?',
        en: 'Can I pay in Rupiah?',
    },
    faq3A: {
        id: 'Ya, kami menerima pembayaran dalam Yen maupun Rupiah sesuai ketentuan yang berlaku.',
        en: 'Yes, we accept payment in Yen and Rupiah subject to applicable terms.',
    },
    faq4Q: {
        id: 'Apakah SIM bisa terima SMS verifikasi?',
        en: 'Can the SIM receive verification SMS?',
    },
    faq4A: {
        id: 'Produk data tertentu (mis. Softbank) menyediakan nomor HP dan dapat menerima SMS verifikasi, tetapi tidak untuk telepon biasa. Detail ada di halaman produk.',
        en: 'Some data plans (e.g. Softbank) include a phone number for verification SMS, not regular calls. See each product page for details.',
    },
    faq5Q: {
        id: 'Bagaimana cara order?',
        en: 'How do I order?',
    },
    faq5A: {
        id: 'Pilih produk di website, isi form order, pilih metode pembayaran, lalu konfirmasi via WhatsApp. Tim kami memproses dan mengirim ke alamat Anda.',
        en: 'Choose a product, fill the order form, select payment, then confirm via WhatsApp. Our team processes and ships to your address.',
    },
    faq6Q: {
        id: 'Apakah pengiriman ke seluruh Jepang?',
        en: 'Do you ship nationwide in Japan?',
    },
    faq6A: {
        id: 'Ya, kami mengirim setiap hari ke seluruh wilayah Jepang.',
        en: 'Yes, we ship daily throughout Japan.',
    },
    faq7Q: {
        id: 'Customer service bahasa Indonesia?',
        en: 'Is customer service in Indonesian?',
    },
    faq7A: {
        id: 'Ya, CS kami siap membantu dalam bahasa Indonesia setiap hari pukul 09.00–23.00.',
        en: 'Yes, our CS team assists in Indonesian daily from 09:00 to 23:00.',
    },
    faq8Q: {
        id: 'Bisa bayar setelah gajian?',
        en: 'Can I pay after payday?',
    },
    faq8A: {
        id: 'Fleksibel bayar setelah gajian untuk pelanggan tertentu. Syarat & ketentuan berlaku — hubungi CS untuk info.',
        en: 'Pay-after-payday options exist for eligible customers. Terms apply — contact CS for details.',
    },
    productsSimTitle: {
        id: 'SIM & eSIM',
        en: 'SIM & eSIM',
    },
    productsSimSubtitle: {
        id: 'Kartu internet bulanan & tahunan',
        en: 'Monthly & yearly internet cards',
    },
    productsWifiTitle: {
        id: 'Pocket WiFi & Home WiFi',
        en: 'Pocket WiFi & Home WiFi',
    },
    productsWifiSubtitle: {
        id: 'WiFi tanpa kontrak & layanan terkait',
        en: 'Contract-free WiFi and related services',
    },
    contactFacebook: { id: 'Facebook', en: 'Facebook' },
    wifiAskWhatsapp: { id: 'Tanya via WhatsApp', en: 'Ask on WhatsApp' },
    variant: { id: 'Variant', en: 'Variant' },
    billingPeriod: { id: 'Tanggal Pembelian', en: 'Purchase Date' },
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
    const [isThemeReady, setIsThemeReady] = useState(false);

    useEffect(() => {
        // Synchronously check localStorage immediately on mount to prevent the theme flash
        const cached = localStorage.getItem('cached-theme');
        if (cached && ['winter', 'spring', 'summer', 'autumn'].includes(cached)) {
            setTheme(cached as ThemeType);
        }
        const cachedLang = localStorage.getItem('cached-language');
        if (cachedLang && (cachedLang === 'id' || cachedLang === 'en')) {
            setLanguage(cachedLang as 'id' | 'en');
        }
        setIsThemeReady(true);

        async function fetchSettings() {
            try {
                const settings = await getSettings();
                const fetchedTheme = parseSettingsTheme(settings);
                setTheme(fetchedTheme);
                localStorage.setItem('cached-theme', fetchedTheme);
            } catch (error) {
                console.error('Failed to fetch theme settings:', error);
            }
        }
        fetchSettings();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (isThemeReady) {
            localStorage.setItem('cached-language', language);
        }
    }, [language, isThemeReady]);

    const t = (key: string): string => {
        return translations[key]?.[language] ?? key;
    };

    const getLocalizedText = (idText: string | undefined | null, enText?: string | undefined | null): string => {
        if (language === 'en') {
            if (enText) return enText;
            // Fallback to legacy regex translation if the english column is empty in the database
            return translateDynamicText(idText);
        }
        return idText || '';
    };

    const translateDynamicText = (text: string | undefined | null): string => {
        if (!text) return '';
        if (language === 'id') return text;
        let translated = text;
        
        // Exact Categories first
        translated = translated.replace(/Kartu Internet Bulanan/gi, 'Monthly Internet Card');
        translated = translated.replace(/Kartu SIM Bulanan/gi, 'Monthly SIM Card');
        translated = translated.replace(/eSIM Internet Bulanan/gi, 'Monthly Internet eSIM');
        translated = translated.replace(/Kartu SIM Tahunan/gi, 'Yearly SIM Card');
        translated = translated.replace(/eSIM Internet Tahunan/gi, 'Yearly Internet eSIM');

        // General Words
        translated = translated.replace(/Bulanan/gi, 'Monthly');
        translated = translated.replace(/Tahunan/gi, 'Yearly');
        translated = translated.replace(/Produk/gi, 'Product');
        translated = translated.replace(/Kartu/gi, 'Card');

        // Specific Product Description Sentences
        translated = translated.replace(/Data internet only ada nomor hp dan bisa terima sms verifikasi \(Tidak bisa dipakai telfon biasa\)/gi, 'Internet data only, includes phone number and can receive verification SMS (Cannot be used for regular calls)');
        translated = translated.replace(/Data internet only ada nomor hp dan can terima sms verifikasi \(Tidak can dipakai telfon biasa\)/gi, 'Internet data only, includes phone number and can receive verification SMS (Cannot be used for regular calls)'); // Fallback if DB was saved with 'can'
        
        // Variants / Other common words
        translated = translated.replace(/Tanpa limit harian/gi, 'No daily limit');
        translated = translated.replace(/Tanpa limit/gi, 'No limit');
        translated = translated.replace(/Bulan/gi, 'Month');
        translated = translated.replace(/Hari/gi, 'Day');
        
        // Description additions
        translated = translated.replace(/kecepatan/gi, 'speed');
        translated = translated.replace(/pemasangan/gi, 'installation');
        translated = translated.replace(/pembayaran/gi, 'payment');
        translated = translated.replace(/gratis/gi, 'free');
        translated = translated.replace(/kuota/gi, 'quota');
        translated = translated.replace(/tanpa/gi, 'without');
        translated = translated.replace(/awal/gi, 'initial');
        translated = translated.replace(/setelah/gi, 'after');
        translated = translated.replace(/pemakaian/gi, 'usage');
        translated = translated.replace(/jaringan/gi, 'network');
        translated = translated.replace(/pasang/gi, 'install');
        translated = translated.replace(/seluruh/gi, 'all');
        translated = translated.replace(/alamat/gi, 'addresses');
        translated = translated.replace(/jepang/gi, 'Japan');
        translated = translated.replace(/mulai dari/gi, 'starting from');
        
        return translated;
    };

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, theme, isThemeReady, t, translateDynamicText, getLocalizedText }}
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
