import './globals.css';

import { DM_Sans } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id" data-theme="winter" suppressHydrationWarning>
            <body
                className={`${dmSans.variable} antialiased`}
                style={{
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                }}
            >
                <LanguageProvider>
                    <Navbar />
                    <main className="pt-20 md:pt-28">{children}</main>
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
