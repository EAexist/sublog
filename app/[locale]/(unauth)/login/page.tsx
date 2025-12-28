import {getTranslations} from "next-intl/server";
// import * as http from "node:http";
import {ViewportHeightLayout} from "@/templates/ViewportHeightLayout";
import {Section} from "@/components/ui/section";
import {CenteredHero} from "@/components/shared/CenteredHero";
import {GoogleLoginButton} from "@/components/shared/GoogleLoginButton";
import {Footer} from "@/components/shared/Footer";

interface LoginPageProps {
}

const LoginPage = async ({}: LoginPageProps) => {
    const t = await getTranslations("login")

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
                        buttons={<GoogleLoginButton/>}
                    />
                </div>
            </Section>
            <Footer/>
        </ViewportHeightLayout>
    )
}

export default LoginPage