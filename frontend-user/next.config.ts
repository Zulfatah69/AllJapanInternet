import type { NextConfig } from 'next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api';
const apiOrigin = new URL(apiUrl.replace(/\/api\/?$/, ''));

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: apiOrigin.protocol.replace(':', '') as 'http' | 'https',
                hostname: apiOrigin.hostname,
                pathname: '/storage/**',
            },
        ],
    },
};

export default nextConfig;
