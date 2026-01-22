import "@/app/globals.css";
import { routing } from "@/il8n/routing";

import { ApiProvisioningTrigger } from "@/app/[locale]/ApiProvisioningTrigger";
import { Navbar } from "@/app/[locale]/Navbar";
import { Footer } from "@/components/shared/Footer";
import { pretendard } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { AllLocales } from "@/utils/AppConfig";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: Props) {
    const { locale } = await params;

    const t = await getTranslations({
        locale: locale,
        namespace: "Metadata",
    });

    return {
        title: t("title"),
        description: t("description"),
    };
}
export function generateStaticParams() {
    return AllLocales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
    //   unstable_setRequestLocale(props.params.locale);

    // Using internationalization in Client Components
    //   const messages = useMessages();

    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    // The `suppressHydrationWarning` in <html> is used to prevent hydration errors caused by `next-themes`.
    // Solution provided by the package itself: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app

    // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
    // which dynamically adds a `style` attribute to the body tag.
    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className={cn(`w-full h-full min-w-xs`, pretendard.className)}
        >
            <body
                className="bg-background text-foreground antialiased w-full h-full min-w-xs"
                suppressHydrationWarning
            >
                <ApiProvisioningTrigger />
                <NextIntlClientProvider>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
