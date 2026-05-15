export const siteConfig = {
  logo: "/logo.png",
  name: "All Japan Internet",
  slogan: "TERMUDAH • TERCEPAT • TEPERCAYA",
  description: "Kartu internet fisik, E-Sim, Pocket Wifi tanpa kontrak, dan pemasangan home wifi untuk seluruh WNI di Jepang.",
  whatsapp: "https://wa.me/6281234567890",
  instagram: "https://instagram.com/alljapaninternet",
  email: "info@alljapaninternet.com",
  address: "Tokyo, Japan",
  operationalHours: "Senin - Sabtu: 09:00 - 21:00 WIB / 11:00 - 23:00 JST",
  maps: "https://maps.google.com/?q=Tokyo,Japan",
  trackingJP: "https://trackings.post.japanpost.jp",
  trackingYamato: "https://jizen.kuronekoyamato.co.jp",
  guideBookPdf: "/guide-book.pdf",
};

export const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80",
    title: "Internet Cepat & Terpercaya",
    subtitle: "Untuk Seluruh WNI di Jepang",
    cta: "Lihat Produk",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1920&q=80",
    title: "eSIM & Pocket WiFi",
    subtitle: "Tanpa Kontrak, Tanpa Deposit",
    cta: "Order Sekarang",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80",
    title: "Home WiFi Seluruh Jepang",
    subtitle: "Pemasangan Cepat & Mudah",
    cta: "Konsultasi Gratis",
  },
];

export const promos = [
  {
    id: 1,
    title: "Promo Ramadan 2025",
    description: "Diskon 20% untuk semua paket internet bulanan",
    badge: "HOT",
    discount: "20%",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    validUntil: "2025-12-31",
    countdown: true,
    active: true,
  },
  {
    id: 2,
    title: "Bundle Pocket WiFi + SIM",
    description: "Hemat lebih banyak dengan paket kombinasi WiFi & SIM Card",
    badge: "BUNDLE",
    discount: "15%",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80",
    validUntil: "2025-12-31",
    countdown: false,
    active: true,
  },
  {
    id: 3,
    title: "eSIM Perdana Gratis",
    description: "Daftar pertama kali, gratis aktivasi eSIM senilai ¥500",
    badge: "NEW",
    discount: "FREE",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    validUntil: "2025-12-31",
    countdown: false,
    active: true,
  },
];

export const categories = [
  {
    id: 1,
    name: "Internet Tahunan",
    nameJp: "年間インターネット",
    icon: "CalendarDays",
    order: 1,
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1200&q=80",
    description: "Paket internet tahunan premium untuk koneksi stabil selama 12 bulan di Jepang.",
    subCategories: [
      {
        id: 11,
        name: "Kartu Internet Tahunan",
        order: 1,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
        description: "Kartu internet fisik tahunan dengan harga ekonomis dan konektivitas luas.",
        providers: [
          { id: 111, name: "Softbank", logo: "https://images.unsplash.com/photo-1556740769-2d7866f31130?w=200&q=80", color: "#e31937", packages: [
            { id: 1111, name: "50GB/tahun", quota: "50GB", price: 150000, currency: "IDR", masa: "1 Tahun", ongkir: "Gratis", stok: "Tersedia", benefits: ["Sinyal luas", "Tanpa FUP"], description: "Paket Softbank 50GB tahunan untuk kebutuhan stabil selama setahun.", orderFormat: "Nama: \nAlamat: \nPaket: Softbank 50GB Tahunan", gallery: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&q=80"] },
            { id: 1112, name: "100GB/tahun", quota: "100GB", price: 250000, currency: "IDR", masa: "1 Tahun", ongkir: "Gratis", stok: "Tersedia", benefits: ["Cepat untuk streaming", "Harga terbaik"], description: "Paket Softbank 100GB tahunan cocok untuk pengguna aktif.", orderFormat: "Nama: \nAlamat: \nPaket: Softbank 100GB Tahunan", gallery: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&q=80"] },
          ]},
          { id: 112, name: "Docomo", logo: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=200&q=80", color: "#e40026", packages: [
            { id: 1121, name: "50GB/tahun", quota: "50GB", price: 170000, currency: "IDR", masa: "1 Tahun", ongkir: "Gratis", stok: "Tersedia", benefits: ["Stabil di seluruh Jepang", "Aktivasi mudah"], description: "Paket Docomo tahunan untuk pengguna yang butuh jangkauan luas.", orderFormat: "Nama: \nAlamat: \nPaket: Docomo 50GB Tahunan", gallery: ["https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=700&q=80"] },
          ]},
          { id: 113, name: "Rakuten", logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&q=80", color: "#bf0000", packages: [
            { id: 1131, name: "Unlimited/tahun", quota: "Unlimited", price: 300000, currency: "IDR", masa: "1 Tahun", ongkir: "Gratis", stok: "Tersedia", benefits: ["Tanpa batas", "Cocok untuk streaming"], description: "Unlimited tahunan untuk browsing dan streaming tanpa batas.", orderFormat: "Nama: \nAlamat: \nPaket: Rakuten Unlimited Tahunan", gallery: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=80"] },
          ]},
        ],
      },
      {
        id: 12,
        name: "E-Sim Internet Tahunan",
        order: 2,
        image: "https://images.unsplash.com/photo-1523475496153-3e6d8fc86756?w=800&q=80",
        description: "eSIM tahunan tanpa kartu fisik, siap dipasang langsung di smartphone Anda.",
        providers: [
          { id: 121, name: "Softbank", logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=80", color: "#e31937", packages: [
            { id: 1211, name: "20GB/tahun", quota: "20GB", price: 120000, currency: "IDR", masa: "1 Tahun", ongkir: "Gratis (Digital)", stok: "Tersedia", benefits: ["Aktivasi langsung", "Tanpa kartu fisik"], description: "eSIM Softbank 20GB tahunan untuk penggunaan digital tanpa kerepotan.", orderFormat: "Nama: \nEmail: \nHP (IMEI): \nPaket: Softbank eSIM 20GB Tahunan", gallery: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80"] },
          ]},
          { id: 122, name: "Docomo", logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&q=80", color: "#e40026", packages: [
            { id: 1221, name: "30GB/tahun", quota: "30GB", price: 180000, currency: "IDR", masa: "1 Tahun", ongkir: "Gratis (Digital)", stok: "Tersedia", benefits: ["Aktivasi cepat", "Aman"], description: "eSIM Docomo 30GB tahunan dengan jaringan premium.", orderFormat: "Nama: \nEmail: \nHP (IMEI): \nPaket: Docomo eSIM 30GB Tahunan", gallery: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=80"] },
          ]},
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Internet Bulanan",
    nameJp: "月間インターネット",
    icon: "Wifi",
    order: 2,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80",
    description: "Paket internet bulanan fleksibel, cocok untuk kebutuhan harian dan travel di Jepang.",
    subCategories: [
      {
        id: 21,
        name: "Kartu Internet Bulanan",
        order: 1,
        image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
        description: "Kartu fisik bulanan dengan pilihan kuota lengkap untuk kebutuhan harian.",
        providers: [
          { id: 211, name: "Softbank", logo: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=200&q=80", color: "#e31937", packages: [
            { id: 2111, name: "3GB/bulan", quota: "3GB", price: 150000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Harga terjangkau", "Cocok untuk chat"], description: "Paket Softbank 3GB bulanan untuk pengguna ringan.", orderFormat: "Nama: \nAlamat: \nPaket: Softbank 3GB Bulanan", gallery: ["https://images.unsplash.com/photo-1498804103079-a6351b050096?w=700&q=80"] },
            { id: 2112, name: "10GB/bulan", quota: "10GB", price: 280000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Cocok untuk streaming", "Bisa digunakan banyak device"], description: "Paket Softbank 10GB bulanan dengan kestabilan jaringan.", orderFormat: "Nama: \nAlamat: \nPaket: Softbank 10GB Bulanan", gallery: ["https://images.unsplash.com/photo-1498804103079-a6351b050096?w=700&q=80"] },
            { id: 2113, name: "20GB/bulan", quota: "20GB", price: 450000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Cocok untuk streaming HD", "Akses cepat"], description: "Paket Softbank 20GB bulanan untuk pengguna aktif.", orderFormat: "Nama: \nAlamat: \nPaket: Softbank 20GB Bulanan", gallery: ["https://images.unsplash.com/photo-1498804103079-a6351b050096?w=700&q=80"] },
          ]},
          { id: 212, name: "Softbank Jumbo", logo: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=200&q=80", color: "#e31937", packages: [
            { id: 2121, name: "50GB/bulan", quota: "50GB", price: 700000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Kuota besar", "Stabil untuk banyak device"], description: "Paket Softbank Jumbo 50GB untuk penggunaan berat.", orderFormat: "Nama: \nAlamat: \nPaket: Softbank Jumbo 50GB", gallery: ["https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=700&q=80"] },
          ]},
          { id: 213, name: "Docomo", logo: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=200&q=80", color: "#e40026", packages: [
            { id: 2131, name: "10GB/bulan", quota: "10GB", price: 300000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Stabil di area urban", "Baik untuk social media"], description: "Paket Docomo 10GB bulanan untuk pengguna biasa.", orderFormat: "Nama: \nAlamat: \nPaket: Docomo 10GB Bulanan", gallery: ["https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=700&q=80"] },
            { id: 2132, name: "30GB/bulan", quota: "30GB", price: 550000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Cocok untuk video call", "Kualitas tinggi"], description: "Paket Docomo 30GB bulanan untuk kebutuhan multimedia.", orderFormat: "Nama: \nAlamat: \nPaket: Docomo 30GB Bulanan", gallery: ["https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=700&q=80"] },
          ]},
          { id: 214, name: "Rakuten", logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&q=80", color: "#bf0000", packages: [
            { id: 2141, name: "Unlimited/bulan", quota: "Unlimited", price: 600000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Tanpa batas", "Cocok untuk streaming"], description: "Paket Rakuten unlimited bulanan untuk kebebasan internet.", orderFormat: "Nama: \nAlamat: \nPaket: Rakuten Unlimited Bulanan", gallery: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=80"] },
          ]},
        ],
      },
      {
        id: 22,
        name: "Pocket Wifi",
        order: 2,
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80",
        description: "Pocket WiFi portabel untuk koneksi fleksibel selama perjalanan di Jepang.",
        providers: [
          { id: 221, name: "POCKET WIFI 809 SHARP", logo: "https://images.unsplash.com/photo-1524230570336-98ca5184f7c7?w=200&q=80", color: "#1a1a2e", packages: [
            { id: 2211, name: "20GB/bulan", quota: "20GB", price: 350000, currency: "IDR", masa: "30 Hari", ongkir: "¥600", stok: "Tersedia", benefits: ["Portabel", "Bisa dipinjam ramai"], description: "Pocket Wifi Sharp 809 20GB bulanan untuk mobilitas tinggi.", orderFormat: "Nama: \nAlamat: \nPaket: Pocket Wifi 809 Sharp 20GB", gallery: ["https://images.unsplash.com/photo-1524230570336-98ca5184f7c7?w=700&q=80"] },
            { id: 2212, name: "50GB/bulan", quota: "50GB", price: 550000, currency: "IDR", masa: "30 Hari", ongkir: "¥600", stok: "Tersedia", benefits: ["Bagus untuk tim kecil", "Stabil kuota"], description: "Pocket Wifi Sharp 809 50GB untuk penggunaan bersama.", orderFormat: "Nama: \nAlamat: \nPaket: Pocket Wifi 809 Sharp 50GB", gallery: ["https://images.unsplash.com/photo-1524230570336-98ca5184f7c7?w=700&q=80"] },
            { id: 2213, name: "100GB/bulan", quota: "100GB", price: 750000, currency: "IDR", masa: "30 Hari", ongkir: "¥600", stok: "Tersedia", benefits: ["Cocok untuk streaming HD", "Baterai tahan lama"], description: "Pocket Wifi Sharp 809 100GB untuk kebutuhan tinggi.", orderFormat: "Nama: \nAlamat: \nPaket: Pocket Wifi 809 Sharp 100GB", gallery: ["https://images.unsplash.com/photo-1524230570336-98ca5184f7c7?w=700&q=80"] },
          ]},
          { id: 222, name: "POCKET WIFI DOCK 5G 01", logo: "https://images.unsplash.com/photo-1524230570336-98ca5184f7c7?w=200&q=80", color: "#003087", packages: [
            { id: 2221, name: "30GB/bulan", quota: "30GB", price: 480000, currency: "IDR", masa: "30 Hari", ongkir: "¥600", stok: "Tersedia", benefits: ["5G ready", "Cocok untuk kerja remote"], description: "Pocket Wifi Dock 5G 01 dengan kecepatan tinggi 30GB.", orderFormat: "Nama: \nAlamat: \nPaket: Pocket Wifi Dock 5G 01 30GB", gallery: ["https://images.unsplash.com/photo-1524230570336-98ca5184f7c7?w=700&q=80"] },
            { id: 2222, name: "Unlimited/bulan", quota: "Unlimited", price: 750000, currency: "IDR", masa: "30 Hari", ongkir: "¥600", stok: "Tersedia", benefits: ["Tanpa batas", "Optimal untuk team"], description: "Pocket Wifi Dock 5G Unlimited untuk penggunaan unlimited.", orderFormat: "Nama: \nAlamat: \nPaket: Pocket Wifi Dock 5G 01 Unlimited", gallery: ["https://images.unsplash.com/photo-1524230570336-98ca5184f7c7?w=700&q=80"] },
          ]},
          { id: 223, name: "HOME WIFI PORTABLE L13", logo: "https://images.unsplash.com/photo-1524230570336-98ca5184f7c7?w=200&q=80", color: "#e8751a", packages: [
            { id: 2231, name: "Unlimited/bulan", quota: "Unlimited", price: 800000, currency: "IDR", masa: "30 Hari", ongkir: "¥600", stok: "Tersedia", benefits: ["Home Wifi mudah dipasang", "Cocok keluarga"], description: "Home Wifi Portable L13 unlimited untuk penggunaan rumah.", orderFormat: "Nama: \nAlamat: \nPaket: Home Wifi Portable L13 Unlimited", gallery: ["https://images.unsplash.com/photo-1524230570336-98ca5184f7c7?w=700&q=80"] },
          ]},
        ],
      },
      {
        id: 23,
        name: "Kartu Telepon + Data Internet",
        order: 3,
        image: "https://images.unsplash.com/photo-1518509562903-7b4d2b536d4c?w=800&q=80",
        description: "Paket kombinasi telepon dan data untuk komunikasi tanpa batas di Jepang.",
        providers: [
          { id: 231, name: "Softbank", logo: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=200&q=80", color: "#e31937", packages: [
            { id: 2311, name: "10GB + Telepon/bulan", quota: "10GB", price: 380000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Panggilan dan data", "Cocok traveler"], description: "Paket kombo Softbank 10GB + telepon untuk penggunaan lengkap.", orderFormat: "Nama: \nAlamat: \nPaket: Softbank 10GB + Telepon", gallery: ["https://images.unsplash.com/photo-1518509562903-7b4d2b536d4c?w=700&q=80"] },
          ]},
          { id: 232, name: "Rakuten", logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&q=80", color: "#bf0000", packages: [
            { id: 2321, name: "Unlimited + Telepon/bulan", quota: "Unlimited", price: 650000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Unlimited data dan telepon", "Cocok komunikasi intensif"], description: "Rakuten unlimited + telepon untuk pemakaian super fleksibel.", orderFormat: "Nama: \nAlamat: \nPaket: Rakuten Unlimited + Telepon", gallery: ["https://images.unsplash.com/photo-1518509562903-7b4d2b536d4c?w=700&q=80"] },
          ]},
          { id: 233, name: "Docomo", logo: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=200&q=80", color: "#e40026", packages: [
            { id: 2331, name: "20GB + Telepon/bulan", quota: "20GB", price: 500000, currency: "IDR", masa: "30 Hari", ongkir: "Gratis", stok: "Tersedia", benefits: ["Kualitas jaringan terbaik", "Telepon lokal terjangkau"], description: "Docomo 20GB + telepon untuk koneksi premium.", orderFormat: "Nama: \nAlamat: \nPaket: Docomo 20GB + Telepon", gallery: ["https://images.unsplash.com/photo-1518509562903-7b4d2b536d4c?w=700&q=80"] },
          ]},
        ],
      },
    ],
  },
];

export const bestSellers = [
  {
    id: 1,
    name: "Softbank 20GB Bulanan",
    category: "Kartu Internet Bulanan",
    provider: "Softbank",
    providerColor: "#e31937",
    quota: "20GB",
    price: 450000,
    currency: "IDR",
    masa: "30 Hari",
    ongkir: "Gratis",
    badge: "BEST SELLER",
    badgeColor: "gold",
    stok: "Tersedia",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    ],
    benefits: ["Kecepatan tinggi", "Tidak ada FUP", "Sinyal luas"],
    description: "Paket internet bulanan Softbank 20GB dengan kecepatan tinggi untuk kebutuhan harian.",
    orderFormat: "Nama: \nAlamat: \nPaket: Softbank 20GB Bulanan",
  },
  {
    id: 2,
    name: "Pocket Wifi 809 Sharp 50GB",
    category: "Pocket Wifi",
    provider: "Softbank",
    providerColor: "#e31937",
    quota: "50GB",
    price: 550000,
    currency: "IDR",
    masa: "30 Hari",
    ongkir: "¥600",
    badge: "POPULER",
    badgeColor: "red",
    stok: "Tersedia",
    images: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    ],
    benefits: ["Bisa dibagi ke banyak device", "Portabel", "5G Ready"],
    description: "Pocket Wifi Sharp 809 dengan kapasitas 50GB, cocok untuk penggunaan bersama.",
    orderFormat: "Nama: \nAlamat: \nPaket: Pocket Wifi 809 Sharp 50GB",
  },
  {
    id: 3,
    name: "eSIM Docomo 30GB Tahunan",
    category: "E-Sim Internet Tahunan",
    provider: "Docomo",
    providerColor: "#e40026",
    quota: "30GB",
    price: 18000,
    currency: "IDR",
    masa: "1 Tahun",
    ongkir: "Gratis (Digital)",
    badge: "NEW",
    badgeColor: "blue",
    stok: "Tersedia",
    images: [
      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=80",
    ],
    benefits: ["Aktivasi langsung", "Tanpa kartu fisik", "Multi device"],
    description: "eSIM Docomo tahunan 30GB, aktifkan langsung di smartphone tanpa perlu kartu fisik.",
    orderFormat: "Nama: \nEmail: \nHP (IMEI): \nPaket: eSIM Docomo 30GB Tahunan",
  },
  {
    id: 4,
    name: "Rakuten Unlimited Bulanan",
    category: "Kartu Internet Bulanan",
    provider: "Rakuten",
    providerColor: "#bf0000",
    quota: "Unlimited",
    price: 600000,
    currency: "IDR",
    masa: "30 Hari",
    ongkir: "Gratis",
    badge: "UNLIMITED",
    badgeColor: "purple",
    stok: "Tersedia",
    images: [
      "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=600&q=80",
    ],
    benefits: ["Unlimited data", "Kecepatan stabil", "Cocok untuk streaming"],
    description: "Paket unlimited Rakuten tanpa batas kuota, ideal untuk pengguna berat.",
    orderFormat: "Nama: \nAlamat: \nPaket: Rakuten Unlimited Bulanan",
  },
];

export const benefits = [
  { id: 1, icon: "Clock", title: "Layanan 24 Jam", description: "Tim kami siap melayani Anda kapan saja, 24 jam sehari 7 hari seminggu.", color: "red" },
  { id: 2, icon: "CreditCard", title: "Bayar Setelah Gajian", description: "Nikmati fleksibilitas pembayaran, bayar di akhir bulan setelah gajian.", color: "blue" },
  { id: 3, icon: "Truck", title: "Pengiriman Seluruh Jepang", description: "Kami mengirim ke seluruh prefektur di Jepang dengan cepat dan aman.", color: "green" },
  { id: 4, icon: "DollarSign", title: "Bayar Yen / Rupiah", description: "Fleksibel bayar dalam mata uang Yen Jepang atau Rupiah Indonesia.", color: "gold" },
  { id: 5, icon: "FileX", title: "Tanpa Kontrak", description: "Tidak ada kontrak jangka panjang, bebas berhenti kapan saja.", color: "purple" },
  { id: 6, icon: "ShieldOff", title: "Tanpa Deposit", description: "Tidak diperlukan uang jaminan atau deposit untuk berlangganan.", color: "red" },
  { id: 7, icon: "Receipt", title: "Tanpa Pajak Tambahan", description: "Harga yang Anda lihat adalah harga yang Anda bayar, tanpa pajak tersembunyi.", color: "blue" },
  { id: 8, icon: "Headphones", title: "Support Bahasa Indonesia", description: "Customer service berbahasa Indonesia, mudah berkomunikasi.", color: "green" },
];

export const testimonials = [
  {
    id: 1,
    name: "Anisa Rahmawati",
    location: "Osaka, Japan",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    rating: 5,
    text: "Sudah 2 tahun pakai All Japan Internet, pelayanannya luar biasa! Responsif, harga terjangkau, dan internetnya stabil. Highly recommended buat WNI di Jepang!",
    date: "April 2025",
    product: "Softbank 20GB Bulanan",
  },
  {
    id: 2,
    name: "Budi Santoso",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "Proses ordernya gampang banget, tinggal WA langsung diproses. Kartu datang dalam 2 hari, langsung aktif. Sinyalnya kuat bahkan di dalam subway!",
    date: "Maret 2025",
    product: "Docomo 30GB Bulanan",
  },
  {
    id: 3,
    name: "Siti Nur Haliza",
    location: "Kyoto, Japan",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "Pakai pocket wifi dari AJI selama traveling keliling Jepang, koneksinya stabil dari Tokyo sampai Hokkaido. Admin juga super ramah dan helpful!",
    date: "Februari 2025",
    product: "Pocket Wifi 50GB",
  },
  {
    id: 4,
    name: "Rizky Firmansyah",
    location: "Nagoya, Japan",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "AJI is the best! Udah pernah coba beberapa provider lain tapi balik lagi ke AJI karena harganya paling reasonable dan servicenya paling bagus.",
    date: "Januari 2025",
    product: "Rakuten Unlimited",
  },
  {
    id: 5,
    name: "Dewi Anggraeni",
    location: "Fukuoka, Japan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    text: "Belanja mudah, pengiriman cepat, internet lancar. Plus bisa bayar pakai rupiah jadi gak perlu ribet tukar uang. Thank you AJI!",
    date: "Desember 2024",
    product: "Softbank 10GB Bulanan",
  },
];

export const aboutUs = {
  title: "Tentang All Japan Internet",
  subtitle: "Mitra Terpercaya WNI di Jepang",
  description: "All Japan Internet hadir untuk memenuhi kebutuhan koneksi internet WNI (Warga Negara Indonesia) yang tinggal, bekerja, atau belajar di Jepang. Didirikan oleh WNI yang memahami betul tantangan mendapatkan layanan internet yang affordable dan terpercaya di Jepang.",
  story: "Berawal dari pengalaman pribadi kesulitan mendapatkan kartu internet yang terjangkau dan tanpa kontrak di Jepang, kami membangun AJI sebagai solusi untuk sesama WNI. Kini kami telah melayani ribuan pelanggan di seluruh prefektur Jepang.",
  vision: "Menjadi platform layanan internet dan komunikasi terdepan yang memberdayakan WNI di Jepang dengan konektivitas yang andal, terjangkau, dan bebas hambatan.",
  image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
  stats: [
    { label: "Pelanggan Aktif", value: "5000+", icon: "Users" },
    { label: "Prefektur Terlayani", value: "47", icon: "MapPin" },
    { label: "Tahun Berpengalaman", value: "5+", icon: "Award" },
    { label: "Rating Kepuasan", value: "4.9", icon: "Star" },
  ],
};

export const howToOrder = [
  { step: 1, title: "Pilih Produk", description: "Browse dan pilih paket internet yang sesuai kebutuhan Anda dari website kami.", icon: "Search" },
  { step: 2, title: "Hubungi Admin", description: "Hubungi admin via WhatsApp dengan format order yang telah tersedia.", icon: "MessageCircle" },
  { step: 3, title: "Konfirmasi Pesanan", description: "Admin akan mengkonfirmasi ketersediaan dan detail pengiriman paket Anda.", icon: "ClipboardCheck" },
  { step: 4, title: "Pembayaran", description: "Lakukan pembayaran sesuai instruksi admin. Tersedia berbagai metode pembayaran.", icon: "CreditCard" },
  { step: 5, title: "Pengiriman", description: "Kartu SIM dikirim via Japan Post atau Yamato ke alamat Anda di Jepang.", icon: "Truck" },
  { step: 6, title: "Aktivasi", description: "Ikuti panduan aktivasi yang disertakan. Tim kami siap membantu 24 jam.", icon: "Zap" },
];

export const paymentMethods = [
  { id: 1, name: "Transfer Bank", icon: "Building2", description: "BCA, Mandiri, BNI, BRI" },
  { id: 2, name: "COD (Cash on Delivery)", icon: "Banknote", description: "Bayar saat barang tiba (area tertentu)" },
  { id: 3, name: "Konbini Payment", icon: "Store", description: "Bayar di minimarket Jepang" },
  { id: 4, name: "PayPay / PayJP", icon: "Smartphone", description: "Digital payment Jepang" },
];

export const faqs = [
  {
    id: 1,
    question: "Apakah kartu SIM ini bisa digunakan di smartphone Indonesia?",
    answer: "Ya, kartu SIM kami bisa digunakan di smartphone apapun selama HP dalam kondisi unlocked. Untuk eSIM, pastikan HP Anda mendukung fitur eSIM.",
  },
  {
    id: 2,
    question: "Berapa lama proses pengiriman kartu?",
    answer: "Pengiriman via Japan Post biasanya 1-3 hari kerja, via Yamato biasanya 1-2 hari kerja tergantung lokasi di Jepang.",
  },
  {
    id: 3,
    question: "Apakah bisa bayar menggunakan Rupiah?",
    answer: "Ya! Kami menerima pembayaran dalam Rupiah (IDR) maupun Yen Jepang (JPY) sesuai kenyamanan Anda.",
  },
  {
    id: 4,
    question: "Bagaimana cara perpanjang paket?",
    answer: "Cukup hubungi admin via WhatsApp sebelum masa aktif habis. Admin akan membantu proses perpanjangan dengan mudah.",
  },
  {
    id: 5,
    question: "Apakah ada kontrak jangka panjang?",
    answer: "Tidak ada! Semua paket kami bebas kontrak. Anda bisa berhenti berlangganan kapan saja tanpa denda.",
  },
  {
    id: 6,
    question: "Bagaimana jika sinyal tidak bagus di lokasi saya?",
    answer: "Kami menawarkan beberapa provider (Softbank, Docomo, Rakuten) dengan jangkauan berbeda. Admin akan membantu memilih provider terbaik untuk area Anda.",
  },
];

export const wisata = [
  {
    id: 1,
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    description: "Ibu kota Jepang dengan perpaduan budaya tradisional dan modern yang menakjubkan.",
    tips: "Pastikan internet Anda aktif untuk navigasi di Tokyo yang luas!",
  },
  {
    id: 2,
    name: "Kyoto",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    description: "Kota budaya Jepang dengan ratusan kuil, geisha, dan taman tradisional.",
    tips: "Koneksi stabil diperlukan untuk foto dan upload ke sosmed dari lokasi-lokasi indah.",
  },
  {
    id: 3,
    name: "Osaka",
    image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=80",
    description: "Kota kuliner terbaik Jepang dengan Dotonbori yang ikonik dan Universal Studios.",
    tips: "Pocket WiFi sangat berguna untuk berbagi koneksi saat jalan bareng teman.",
  },
  {
    id: 4,
    name: "Hokkaido",
    image: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=600&q=80",
    description: "Surga salju di utara Jepang dengan pemandangan alam yang spektakuler.",
    tips: "Pastikan paket internet Anda mencakup area Hokkaido untuk koneksi optimal.",
  },
];

export const ts = {
  title: "TS (Tanya Seputar) Layanan Kami",
  subtitle: "Informasi umum yang sering ditanyakan seputar layanan All Japan Internet",
  items: [
    {
      id: 1,
      question: "Apa perbedaan kartu SIM fisik dan eSIM?",
      answer: "Kartu SIM fisik adalah kartu yang dimasukkan ke slot SIM HP. eSIM adalah SIM digital yang diaktifkan secara virtual tanpa kartu fisik, cocok untuk HP modern yang mendukung eSIM.",
    },
    {
      id: 2,
      question: "Apakah bisa order untuk dikirim ke seluruh Jepang?",
      answer: "Ya! Kami mengirim ke seluruh 47 prefektur di Jepang via Japan Post dan Yamato Express.",
    },
  ],
};
