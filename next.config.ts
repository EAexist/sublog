import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
      return [
          {
                      source: '/api/oauth2/:path*',
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/:path*`,
                    },
          {
                      source: '/api/login/oauth2/:path*',
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/login/oauth2/:path*`,
                    },
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
        },
      ];
    },
};

const withNextIntl = createNextIntlPlugin("./il8n/request.ts");
export default withNextIntl(nextConfig);
