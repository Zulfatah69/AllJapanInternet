import { Inter, Noto_Sans_JP } from 'next/font/google';

import './globals.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ClientProviders } from './providers/ClientProviders';

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

export const metadata = {
    title: 'All Japan Internet',
    description: 'Premium Internet SIM & eSIM for Japan',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="spring" suppressHydrationWarning>
            <body className={`${inter.variable} ${notoSansJp.variable} antialiased`}>
                <ClientProviders>
                    <Navbar />
                    <main className="pt-[72px]">{children}</main>
                    <Footer />
                </ClientProviders>
            </body>
        </html>
    );
}
