import { useTranslations } from "next-intl";

import Link from 'next/link';

import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { CenteredHero } from "@/features/landing/CenteredHero";
import {Button} from "@/components/ui/button";
import {Section} from "@/components/ui/section";

export const Hero = ({isAuthenticated}: {isAuthenticated: boolean}) => {
  const t = useTranslations("Hero");

  return (
    <Section className={"grow"}>
        <div className={"py-36"}>
      <CenteredHero
        title={t.rich("title", {
          important: (chunks) => (
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {chunks}
            </span>
          ),
        })}
        description={t("description")}
        buttons={isAuthenticated ? <Button size={"fullW"}><Link href={"/dashboard"}>{t("navigate_to_dashboard")}</Link>
        </Button> : <GoogleLoginButton/>}
      />
        </div>
        {/*<div className={"fixed bottom-0 w-full z-50 p-8"}>*/}
        {/*    <GoogleLoginButton />*/}
        {/*</div>*/}
    </Section>
  );
};
