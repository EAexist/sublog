import "@/app/globals.css";
import { routing } from "@/il8n/routing";

import { AllLocales } from "@/utils/AppConfig";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {pretendard} from "@/lib/fonts";
import {cn} from "@/lib/utils";

// export const metadata: Metadata = {
//   icons: [
//     {
//       rel: "apple-touch-icon",
//       url: "/apple-touch-icon.png",
//     },
//     {
//       rel: "icon",
//       type: "image/png",
//       sizes: "32x32",
//       url: "/favicon-32x32.png",
//     },
//     {
//       rel: "icon",
//       type: "image/png",
//       sizes: "16x16",
//       url: "/favicon-16x16.png",
//     },
//     {
//       rel: "icon",
//       url: "/favicon.ico",
//     },
//   ],
// };

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
        {/* PRO: Dark mode support for Shadcn UI */}
        <NextIntlClientProvider>
          <div className="min-h-full flex flex-col">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
