// https://next-intl.dev/docs/routing/setup#proxy

import { routing } from "@/il8n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

const nextIntlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {

    if (process.env.NEXT_PUBLIC_MSW_ENABLED === 'true') {
        return nextIntlMiddleware(request)
    }

    const { pathname } = request.nextUrl

    if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('SESSION');
    const segments = pathname.split('/');
    const firstSegment = segments[1];

    const isLocalePresent = routing.locales.includes(firstSegment as any);
    const locale = isLocalePresent ? firstSegment : routing.defaultLocale;

    // Normalize path for comparison (e.g., /ko/login -> /login)
    const pathWithoutLocale = isLocalePresent
        ? `/${segments.slice(2).join('/')}`
        : pathname;

    // 1. If user IS authenticated and trying to access (unauth) routes
    if (sessionCookie && (pathWithoutLocale === '/login' || pathWithoutLocale === '/login/')) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }

    // 3. First visit redirect logic - redirect authenticated users to dashboard on first visit
    if (sessionCookie && pathWithoutLocale === '/') {
        const referer = request.headers.get('referer');
        const isExternalReferer = !referer || !referer.includes(request.nextUrl.host);

        if (isExternalReferer) {
            return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
        }
    }

    // 2. If user is NOT authenticated and trying to access (auth) routes
    if (!sessionCookie && (pathWithoutLocale.startsWith('/dashboard') || pathWithoutLocale.startsWith('/settings'))) {
        const loginUrl = new URL(`/${locale}/login`, request.url);
        // Optional: remove search params to break RSC loops
        loginUrl.search = '';
        return NextResponse.redirect(loginUrl);
    }

    return nextIntlMiddleware(request)
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: "/((?!api|trpc|_next|_vercel|mock-api|.*\\..*).*)",
};