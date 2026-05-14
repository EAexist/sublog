"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/il8n/navigation";
import { routing } from "@/il8n/routing";
import { Check, Globe } from "lucide-react";
import { useLocale } from "next-intl";

const localeNames: Record<string, string> = {
    ko: "한국어",
    jp: "日本語",
    en: "English",
};

export function LocaleSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const handleLocaleChange = (locale: string) => {
        router.replace(pathname, { locale });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
                    <span className="sm:hidden">{currentLocale.toUpperCase()}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] z-[100]">
                {routing.locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => handleLocaleChange(locale)}
                        className="flex items-center justify-between gap-2"
                    >
                        <span>{localeNames[locale]}</span>
                        {currentLocale === locale && (
                            <Check className="h-4 w-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
