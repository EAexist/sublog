import { AppConfig } from "@/utils/AppConfig";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
    const t = useTranslations("components.Footer");

    return (
        <footer className="pb-16 pt-0 w-full mx-auto bg-muted">
            <div className="flex flex-col items-center text-center max-md:text-start px-8">
                <div className="flex w-full justify-center gap-4 border-t pt-3 text-sm text-muted-foreground max-md:flex-col">
                    <ul className="flex max-md:flex-col max-md:gap-y-1 gap-x-4 font-medium [&_a:hover]:opacity-100 [&_a]:opacity-60">
                        <li>
                            <Link href="/privacy">{t("privacy_policy")}</Link>
                        </li>
                        <li>
                            <Link href="/terms">{t("terms_of_service")}</Link>
                        </li>
                    </ul>
                    <div className="max-w-3xl">
                        {`© Copyright ${new Date().getFullYear()} ${AppConfig.serviceName}`}
                    </div>
                </div>
            </div>
        </footer>
    );
};
