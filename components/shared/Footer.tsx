
import { AppConfig } from "@/utils/AppConfig";

export const Footer = () => {
    // const t = useTranslations("Footer");

    return (
        <footer className="pb-16 pt-0">
            <div className="flex flex-col items-center text-center">
                <div className="flex w-full items-center justify-between gap-y-2 border-t pt-3 text-sm text-muted-foreground max-md:flex-col">
                    {/* <ul className="flex gap-x-4 font-medium [&_a:hover]:opacity-100 [&_a]:opacity-60">
            <>
              <li>
                <Link href="/sign-up">{t("terms_of_service")}</Link>
              </li>
              <li>
                <Link href="/sign-up">{t("privacy_policy")}</Link>
              </li>
            </>
          </ul> */}
                    <div>
                        {`© Copyright ${new Date().getFullYear()} ${AppConfig.name}`}
                    </div>
                </div>
            </div>
        </footer>
    );
};
