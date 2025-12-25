import {Footer} from "@/components/shared/Footer";
import {getTranslations} from "next-intl/server";
import {cookies} from 'next/headers'
import {CenteredHero} from "@/components/shared/CenteredHero";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {GoogleLoginButton} from "@/components/shared/GoogleLoginButton";
import {Section} from "@/components/ui/section";
import {ViewportHeightLayout} from "@/templates/ViewportHeightLayout";

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

const IndexPage = async ({params}: Props) => {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.has("JSESSIONID");
    const t = await getTranslations("Hero");
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
                        buttons={isAuthenticated ?
                            <Button size={"fullW"}><Link href={"/dashboard"}>{t("navigate_to_dashboard")}</Link>
                            </Button> : <GoogleLoginButton/>}
                    />
                </div>
            </Section>
            <Footer/>
        </ViewportHeightLayout>
    );
};

export default IndexPage;
