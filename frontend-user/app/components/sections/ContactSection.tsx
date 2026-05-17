'use client';

import { motion } from 'framer-motion';

import { AMBIENT_IMAGES } from '../../lib/visuals';
import { staggerContainer, fadeUp } from '../../lib/motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionShell } from '../visual/SectionShell';
import { useApp } from '../../providers/AppProvider';
import { FiMail, FiMapPin, FiMessageCircle } from 'react-icons/fi';

export function ContactSection() {
    const { copy, settings } = useApp();

    const links = [
        settings?.whatsapp && {
            icon: FiMessageCircle,
            label: copy.contact.whatsapp,
            href: `https://wa.me/${settings.whatsapp}`,
            highlight: true,
        },
        settings?.telegram && {
            icon: FiMessageCircle,
            label: 'Telegram',
            href: settings.telegram.startsWith('http') ? settings.telegram : `https://t.me/${settings.telegram}`,
        },
        settings?.line && {
            icon: FiMessageCircle,
            label: 'LINE',
            href: settings.line.startsWith('http') ? settings.line : `https://line.me/ti/p/${settings.line}`,
        },
        settings?.email && {
            icon: FiMail,
            label: copy.contact.email,
            href: `mailto:${settings.email}`,
        },
    ].filter(Boolean) as { icon: typeof FiMail; label: string; href: string; highlight?: boolean }[];

    const socials = [
        { key: 'instagram', href: settings?.instagram },
        { key: 'tiktok', href: settings?.tiktok },
        { key: 'youtube', href: settings?.youtube },
    ].filter((s) => s.href);

    return (
        <SectionShell id="contact" variant="glow">
            <Container>
                <SectionHeader
                    title={copy.contact.title}
                    subtitle={copy.contact.subtitle}
                    eyebrow="Get in touch"
                />

                <div className="grid gap-8 lg:grid-cols-2">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {links.map((link) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={fadeUp}
                                whileHover={{ x: 6, scale: 1.01 }}
                                className={`premium-card flex items-center gap-4 rounded-2xl p-5 ${
                                    link.highlight ? 'ring-2 ring-[var(--primary)]/30' : ''
                                }`}
                            >
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                                    style={{ background: 'var(--gradient-accent)' }}
                                >
                                    <link.icon size={22} />
                                </div>
                                <span className="font-semibold">{link.label}</span>
                            </motion.a>
                        ))}
                        {socials.length > 0 && (
                            <div className="flex flex-wrap gap-3 pt-4">
                                {socials.map((s) => (
                                    <a
                                        key={s.key}
                                        href={s.href!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full border px-5 py-2.5 text-sm font-medium capitalize transition-colors hover:border-[var(--primary)]"
                                        style={{ borderColor: 'var(--border)' }}
                                    >
                                        {s.key}
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="premium-card overflow-hidden rounded-[2rem]"
                    >
                        <div className="relative h-56">
                            <img
                                src={AMBIENT_IMAGES.tokyoNight}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-contrast)]/90 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <FiMapPin className="mb-2" size={24} />
                                <p className="text-lg font-semibold">{copy.contact.map}</p>
                                <p className="text-sm text-white/70">
                                    {settings?.website_name || 'All Japan Internet'}
                                </p>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                {copy.contact.subtitle}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </SectionShell>
    );
}
