"use client"

import { SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/lib/auth";
import { useTranslations } from "next-intl";

export const LogoutSheetTrigger = () => {
    const t = useTranslations("components.Navbar");

    return (
        <SheetTrigger className={"flex w-full p-5"} onClick={async () => {
            await logout()
        }}>
            {t("logout")}
        </SheetTrigger>
    )
}
