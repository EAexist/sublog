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

const ReportNavigateButton = async () => {
    const t = await getTranslations("home.components.ReportNavigateButton");
    return <Button size={"fullW"}><Link href={"/report"}>{t("title")}</Link>
    </Button>;
}

const MainActionButton = async () => {
    const sessionCookie = await getSessionCookie()
    return (sessionCookie !== undefined) ? <ReportNavigateButton /> : <LoginButtonGroup />
}

const IndexPage = async ({ params }: Props) => {
    const isAuthenticated = true;
    const t = await getTranslations("home");
    return (
        <Section className={"grow"}>
            <div className={"py-20"}>
                <CenteredHero
                    title={t.rich("title", {
                        important: (chunks) => (
                            <span
                                className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                {chunks}
                            </span>
                        ),
                    })}
                    description={t("description")}
                    buttons={<Suspense fallback={<ReportNavigateButton />}><MainActionButton /></Suspense>}
                />
            </div>
        </Section>
    );
};

export default IndexPage;
