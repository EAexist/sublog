"use client"

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useTranslations } from "next-intl";

export const LogoutButton = () => {
    const t = useTranslations("components.Navbar");

    return (
        <Button variant={"outline"} className={""} onClick={async () => {
            await logout()
        }}>
            {t("logout")}
        </Button>
    )
}
