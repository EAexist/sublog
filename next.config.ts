import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const REWRITES = [
    { source: '/api/:path*', destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` },
    { source: '/actuator/:path*', destination: `${process.env.NEXT_PUBLIC_API_URL}/actuator/:path*` },
    { source: `/${process.env.NEXT_PUBLIC_GOOGLE_AUTH_PATH}`, destination: `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_GOOGLE_AUTH_PATH}` },
];

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return REWRITES;
    },
    compiler: {
        // removeConsole: process.env.NODE_ENV === 'production'
        //     ? { exclude: ['error', 'warn'] }
        //     : false,
    },
};

const withNextIntl = createNextIntlPlugin("./il8n/request.ts");
export default withNextIntl(nextConfig);
