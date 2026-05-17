import { Inter, Noto_Sans_JP } from 'next/font/google';

import './globals.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ClientProviders } from './providers/ClientProviders';
import { fetchSettingsServer } from './lib/fetch-settings-server';
import { themeFromSettings } from './lib/theme';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const notoSansJp = Noto_Sans_JP({
    subsets: ['latin'],
    variable: '--font-jp',
    display: 'swap',
});

export async function generateMetadata() {
    const settings = await fetchSettingsServer();
    return {
        title: settings?.website_name || 'All Japan Internet',
        description: 'Premium Internet SIM & eSIM for Japan',
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await fetchSettingsServer();
    const theme = themeFromSettings(settings);

    return (
        <html lang="en" data-theme={theme} suppressHydrationWarning>
            <body className={`${inter.variable} ${notoSansJp.variable} antialiased`}>
                <ClientProviders initialSettings={settings}>
                    <Navbar />
                    <main className="pt-[72px]">{children}</main>
                    <Footer />
                </ClientProviders>
            </body>
        </html>
    );
}
