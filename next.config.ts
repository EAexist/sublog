import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
            },
        ];
    },
    compiler: {
        // removeConsole: process.env.NODE_ENV === 'production'
        //     ? { exclude: ['error', 'warn'] }
        //     : false,
    },
};

const withNextIntl = createNextIntlPlugin("./il8n/request.ts");
export default withNextIntl(nextConfig);
