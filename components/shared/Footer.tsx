import { AppConfig } from "@/utils/AppConfig";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
    const t = useTranslations("components.Footer");

    return (
        <footer className="pb-16 pt-8 w-full mx-auto bg-muted">
            <div className="flex flex-col items-center text-center max-md:text-start px-8">
                <div className="flex w-full justify-center gap-4 text-sm text-muted-foreground max-md:flex-col">
                    <p className="max-w-3xl">
                        {`Copyright © ${new Date().getFullYear()} ${AppConfig.serviceName}`}
                    </p>
                    <ul className="flex flex-wrap gap-4 font-medium [&_a:hover]:opacity-100 [&_a]:opacity-60">
                        <li>
                            <Link href="/privacy">{t("privacy_policy")}</Link>
                        </li>
                        <li>
                            <Link href="/terms">{t("terms_of_service")}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
