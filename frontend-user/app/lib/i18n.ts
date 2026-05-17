export type Locale = 'en' | 'ja';

export const translations = {
    en: {
        nav: {
            home: 'Home',
            products: 'Products',
            providers: 'Providers',
            about: 'About',
            benefits: 'Benefits',
            howToOrder: 'How to Order',
            guidebook: 'Guidebook',
            testimonials: 'Testimonials',
            tracking: 'Tracking',
            contact: 'Contact',
            promos: 'Promos',
        },
        hero: {
            cta: 'Explore Plans',
            ctaSecondary: 'View Promos',
            badge: 'Premium Japan Connectivity',
        },
        bestSeller: {
            title: 'Best Sellers',
            subtitle: 'Top-rated SIM & eSIM plans chosen by our customers',
            empty: 'No best sellers available yet.',
        },
        products: {
            title: 'Our Products',
            subtitle: 'Internet SIM & eSIM for Japan',
            all: 'All',
            monthly: 'Monthly',
            yearly: 'Yearly',
            allCategories: 'All Categories',
            allProviders: 'All Providers',
            empty: 'No products match your filters.',
            viewDetails: 'View Details',
            bestSeller: 'Best Seller',
        },
        providers: {
            title: 'Carrier Partners',
            subtitle: 'Trusted Japanese telecom providers',
            empty: 'Providers will appear here once configured.',
        },
        about: {
            title: 'About All Japan Internet',
            subtitle: 'Your bridge to seamless connectivity in Japan',
        },
        benefits: {
            title: 'Why Choose AJI',
            subtitle: 'Premium service designed for life in Japan',
            items: [
                {
                    title: 'Trusted Carriers',
                    desc: 'Official plans from Softbank, Docomo, AU, and Rakuten.',
                },
                {
                    title: 'Flexible Billing',
                    desc: 'Monthly and yearly options with transparent pricing.',
                },
                {
                    title: 'Multilingual Support',
                    desc: 'English and Japanese assistance when you need it.',
                },
                {
                    title: 'Fast Delivery',
                    desc: 'Reliable shipping across Japan with major couriers.',
                },
            ],
        },
        howToOrder: {
            title: 'How to Order',
            subtitle: 'A clear path from selection to activation',
            steps: [
                {
                    title: 'Choose Your Plan',
                    desc: 'Select product, data variant, and billing period.',
                },
                {
                    title: 'Select Payment',
                    desc: 'Bank transfer, COD, konbini, initial and monthly options.',
                },
                {
                    title: 'Confirm & Pay',
                    desc: 'Complete initial payment as shown in your order summary.',
                },
                {
                    title: 'Delivery',
                    desc: 'SIM delivered within the stated duration after confirmation.',
                },
                {
                    title: 'Activate',
                    desc: 'Follow the guidebook and contact support if needed.',
                },
            ],
            paymentNote:
                'Payment methods include transfer, COD, konbini, initial payment, and recurring monthly billing as shown per product.',
        },
        guidebook: {
            title: 'Guidebook',
            subtitle: 'Everything you need to get connected in Japan',
            cta: 'Request Guidebook',
            empty: 'Contact us to receive the latest AJI guidebook.',
        },
        testimonials: {
            title: 'Customer Stories',
            subtitle: 'Real experiences from our community in Japan',
            empty: 'Testimonials coming soon.',
        },
        tracking: {
            title: 'Track Your Delivery',
            subtitle: 'Monitor shipments with official carrier tools',
            japanPost: 'Japan Post Tracking',
            yamato: 'Yamato Transport Tracking',
        },
        contact: {
            title: 'Contact Us',
            subtitle: 'We are here to help you stay connected',
            whatsapp: 'Chat on WhatsApp',
            email: 'Email',
            map: 'Find Us',
        },
        categories: {
            title: 'Product Categories',
            subtitle: 'Find the right plan for your lifestyle in Japan',
        },
        payment: {
            title: 'Payment Methods',
            subtitle: 'Flexible options shown per product at checkout',
            fallback: ['Bank Transfer', 'Cash on Delivery', 'Konbini', 'Initial + Monthly'],
        },
        shipping: {
            title: 'Shipping & Delivery',
            subtitle: 'Reliable delivery across Japan',
            items: [
                {
                    title: 'Nationwide Shipping',
                    desc: 'SIM and devices shipped via Japan Post and Yamato Transport to addresses across Japan.',
                },
                {
                    title: 'Typical Delivery Time',
                    desc: 'Most orders ship within 2–5 business days after payment confirmation. Express options may apply per product.',
                },
            ],
        },
        search: {
            placeholder: 'Search plans…',
            empty: 'No products found.',
        },
        order: {
            formTitle: 'Order Details',
        },
        footer: {
            narrative: 'All Japan Internet — premium connectivity for life in Japan.',
            rights: 'All rights reserved.',
            language: 'Language',
            theme: 'Theme',
        },
        common: {
            loading: 'Loading…',
            orderWhatsapp: 'Order via WhatsApp',
            total: 'Total',
            variant: 'Variant',
            billing: 'Billing Period',
            payment: 'Payment Method',
        },
    },
    ja: {
        nav: {
            home: 'ホーム',
            products: '商品',
            providers: 'キャリア',
            about: '会社概要',
            benefits: 'メリット',
            howToOrder: 'ご注文方法',
            guidebook: 'ガイドブック',
            testimonials: 'お客様の声',
            tracking: '配送追跡',
            contact: 'お問い合わせ',
            promos: 'プロモ',
        },
        hero: {
            cta: 'プランを見る',
            ctaSecondary: 'プロモを見る',
            badge: 'プレミアム日本通信',
        },
        bestSeller: {
            title: 'ベストセラー',
            subtitle: 'お客様に選ばれた人気SIM・eSIMプラン',
            empty: 'ベストセラーはまだありません。',
        },
        products: {
            title: '商品一覧',
            subtitle: '日本向けインターネットSIM・eSIM',
            all: 'すべて',
            monthly: '月額',
            yearly: '年額',
            allCategories: 'すべてのカテゴリ',
            allProviders: 'すべてのキャリア',
            empty: '条件に一致する商品がありません。',
            viewDetails: '詳細を見る',
            bestSeller: 'ベストセラー',
        },
        providers: {
            title: 'キャリアパートナー',
            subtitle: '信頼の日本通信キャリア',
            empty: 'キャリア情報は準備中です。',
        },
        about: {
            title: 'All Japan Internet について',
            subtitle: '日本でのシームレスな接続をサポート',
        },
        benefits: {
            title: 'AJIが選ばれる理由',
            subtitle: '日本生活のためのプレミアムサービス',
            items: [
                {
                    title: '信頼のキャリア',
                    desc: 'Softbank、Docomo、AU、Rakutenの公式プラン。',
                },
                {
                    title: '柔軟な請求',
                    desc: '月額・年額プラン、明確な料金表示。',
                },
                {
                    title: '多言語サポート',
                    desc: '英語・日本語でサポートいたします。',
                },
                {
                    title: '迅速な配送',
                    desc: '主要配送業者による確実なお届け。',
                },
            ],
        },
        howToOrder: {
            title: 'ご注文の流れ',
            subtitle: '選択から開通までの明確なステップ',
            steps: [
                {
                    title: 'プランを選択',
                    desc: '商品・データ容量・請求期間をお選びください。',
                },
                {
                    title: 'お支払い方法',
                    desc: '振込、代引、コンビニ、初回・月額払いなど。',
                },
                {
                    title: '確認・お支払い',
                    desc: '注文概要の初回お支払いを完了してください。',
                },
                {
                    title: '配送',
                    desc: '確認後、所定の期間内にSIMをお届けします。',
                },
                {
                    title: '開通',
                    desc: 'ガイドブックに従い、必要時はサポートへ。',
                },
            ],
            paymentNote:
                'お支払いは振込、代引、コンビニ、初回払い、月額払いなど、商品ごとに表示されます。',
        },
        guidebook: {
            title: 'ガイドブック',
            subtitle: '日本で接続するために必要な情報',
            cta: 'ガイドブックを請求',
            empty: '最新のAJIガイドブックはお問い合わせください。',
        },
        testimonials: {
            title: 'お客様の声',
            subtitle: '日本でご利用いただいたお客様の体験',
            empty: 'お客様の声は準備中です。',
        },
        tracking: {
            title: '配送追跡',
            subtitle: '公式キャリアツールで荷物を確認',
            japanPost: '日本郵便 追跡',
            yamato: 'ヤマト運輸 追跡',
        },
        contact: {
            title: 'お問い合わせ',
            subtitle: '接続に関するご質問はお気軽に',
            whatsapp: 'WhatsAppで相談',
            email: 'メール',
            map: '所在地',
        },
        categories: {
            title: 'カテゴリ',
            subtitle: '日本生活に合ったプランをお選びください',
        },
        payment: {
            title: 'お支払い方法',
            subtitle: '商品ごとに表示される柔軟なオプション',
            fallback: ['銀行振込', '代金引換', 'コンビニ', '初回＋月額'],
        },
        shipping: {
            title: '配送について',
            subtitle: '日本全国へ確実にお届け',
            items: [
                {
                    title: '全国配送',
                    desc: '日本郵便・ヤマト運輸で日本全国の住所へお届けします。',
                },
                {
                    title: 'お届け目安',
                    desc: 'お支払い確認後、通常2〜5営業日で発送。商品により速達オプションあり。',
                },
            ],
        },
        search: {
            placeholder: 'プランを検索…',
            empty: '商品が見つかりません。',
        },
        order: {
            formTitle: '注文情報',
        },
        footer: {
            narrative: 'All Japan Internet — 日本生活のためのプレミアム接続。',
            rights: 'All rights reserved.',
            language: '言語',
            theme: 'テーマ',
        },
        common: {
            loading: '読み込み中…',
            orderWhatsapp: 'WhatsAppで注文',
            total: '合計',
            variant: '容量',
            billing: '請求期間',
            payment: 'お支払い方法',
        },
    },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Locale) {
    return translations[locale];
}
