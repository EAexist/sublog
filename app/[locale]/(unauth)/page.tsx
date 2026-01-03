import {Footer} from "@/components/shared/Footer";
import {getTranslations} from "next-intl/server";
import {CenteredHero} from "@/components/shared/CenteredHero";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {GoogleLoginButton} from "@/components/shared/GoogleLoginButton";
import {Section} from "@/components/ui/section";
import {ViewportHeightLayout} from "@/templates/ViewportHeightLayout";
import {getAppUser} from "@/lib/api";
import {Suspense} from "react";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({params}: Props) {
    const {locale} = await params;

    const t = await getTranslations({
        locale: locale,
        namespace: "Metadata",
    });

    return {
        title: t("title"),
        description: t("description"),
    };
}


const ReportNavigateButton = async () => {
    const t = await getTranslations("home.components.ReportNavigateButton");
    const response = await getAppUser()
    if (response.status === 401) {
        return <GoogleLoginButton/>
    }
    return <Button size={"fullW"}><Link href={"/report"}>{t("title")}</Link>
    </Button>;
}


const MainActionButton = async () => {
    const response = await getAppUser()
    if (response.status === 401) {
        return <GoogleLoginButton/>
    }
    return <ReportNavigateButton/>
}

const IndexPage = async ({params}: Props) => {
    const isAuthenticated = await getAppUser();
    const t = await getTranslations("home");
    return (
        <ViewportHeightLayout>
            <Section className={"grow"}>
                <div className={"py-36"}>
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
                        buttons={<Suspense fallback={<ReportNavigateButton/>}><MainActionButton/></Suspense>}
                    />
                </div>
            </Section>
            <Footer/>
        </ViewportHeightLayout>
    );
};

export default IndexPage;
