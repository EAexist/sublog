import { CenteredHero } from "@/components/shared/CenteredHero";
import { LoginButtonGroup } from "@/components/shared/LoginButtonGroup";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getSessionCookie } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
    params: Promise<{ locale: string }>;
};

const DashboardNavigateButton = async () => {
    const t = await getTranslations("home.components.DashboardNavigateButton");
    return <Button size={"fullW"}><Link href={"/dashboard"}>{t("title")}</Link>
    </Button>;
}

const MainActionButton = async () => {
    const sessionCookie = await getSessionCookie()
    return (sessionCookie !== undefined) ? <DashboardNavigateButton /> : <LoginButtonGroup />
}

const IndexPage = async ({ params }: Props) => {
    const isAuthenticated = true;
    const t = await getTranslations("home");
    const commonT = await getTranslations("common")
    return (
        <Section className={"my-auto"}>
            <div className={"py-20 grow"}>
                <CenteredHero
                    title={commonT.rich("title", {
                        important: (chunks) => (
                            <span
                                className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                {chunks}
                            </span>
                        ),
                    })}
                    description={t("description")}
                    buttons={<Suspense fallback={<DashboardNavigateButton />}><MainActionButton /></Suspense>}
                />
            </div>
        </Section>
    );
};

export default IndexPage;
