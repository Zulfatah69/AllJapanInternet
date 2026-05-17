'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { storageUrl } from '../../lib/utils';
import { useApp } from '../../providers/AppProvider';

export default function Footer() {
    const { copy, locale, setLocale, settings } = useApp();
    const year = new Date().getFullYear();
    const narrative = settings?.footer_text || copy.footer.narrative;
    const logo = storageUrl(settings?.logo);

    return (
        <footer className="relative overflow-hidden border-t border-white/10">
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(165deg, var(--bg-contrast) 0%, color-mix(in srgb, var(--bg-contrast) 85%, var(--primary-strong)) 100%)`,
                }}
            />
            <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />

            <div className="container-aji relative z-10 grid gap-14 py-20 md:grid-cols-3">
                <div>
                    {logo ? (
                        <img src={logo} alt="" className="mb-6 h-10 w-auto brightness-0 invert" />
                    ) : (
                        <h2 className="mb-4 text-2xl font-semibold text-white">
                            {settings?.website_name || 'All Japan Internet'}
                        </h2>
                    )}
                    <p className="max-w-sm text-sm leading-relaxed text-white/70">{narrative}</p>
                </div>

                <div>
                    <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                        {copy.nav.contact}
                    </h3>
                    <ul className="space-y-3 text-sm text-white/85">
                        {settings?.whatsapp && (
                            <li>
                                <a href={`https://wa.me/${settings.whatsapp}`} className="hover:text-white">
                                    WhatsApp
                                </a>
                            </li>
                        )}
                        {settings?.email && (
                            <li>
                                <a href={`mailto:${settings.email}`} className="hover:text-white">
                                    {settings.email}
                                </a>
                            </li>
                        )}
                        {settings?.telegram && <li>Telegram</li>}
                        {settings?.line && <li>LINE</li>}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                        {copy.footer.language}
                    </h3>
                    <div className="mb-8 flex flex-wrap gap-3">
                        <select
                            value={locale}
                            onChange={(e) => setLocale(e.target.value as 'en' | 'ja')}
                            className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white backdrop-blur-sm"
                        >
                            <option value="en">English</option>
                            <option value="ja">日本語</option>
                        </select>
                    </div>
                    <div className="flex flex-wrap gap-5 text-sm text-white/75">
                        <Link href="/#products" className="hover:text-white">
                            {copy.nav.products}
                        </Link>
                        <Link href="/promos" className="hover:text-white">
                            {copy.nav.promos}
                        </Link>
                        <Link href="/#testimonials" className="hover:text-white">
                            {copy.nav.testimonials}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative z-10 border-t border-white/10 py-8 text-center text-xs text-white/45">
                © {year} {settings?.website_name || 'All Japan Internet'}. {copy.footer.rights}
            </div>
        </footer>
    );
}
