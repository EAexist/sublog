// https://next-intl.dev/docs/routing/setup#proxy

import {NextResponse} from "next/dist/server/web/spec-extension/response";
import {NextRequest} from "next/dist/server/web/spec-extension/request";
import createMiddleware from "next-intl/middleware";
import {routing} from "@/il8n/routing";

const nextIntlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    const sessionCookie = request.cookies.get('SESSION')
    const {pathname} = request.nextUrl

    type Locale = (typeof routing.locales)[number];

    const isLocale = (value: string): value is Locale =>
        routing.locales.includes(value as Locale);

    const segment = pathname.split('/')[1];
    const locale = isLocale(segment) ? segment : routing.defaultLocale;
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/';


    // 1. If user IS authenticated and trying to access (unauth) routes
    if (sessionCookie && (pathWithoutLocale.startsWith('/login'))) {
        return NextResponse.redirect(new URL(`/${locale}/report`, request.url))
    }

    // 2. If user is NOT authenticated and trying to access (auth) routes
    if (!sessionCookie && pathWithoutLocale.startsWith('/report')) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }

    return nextIntlMiddleware(request)
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: "/((?!api|trpc|_next|_vercel|mock-api|.*\\..*).*)",
};