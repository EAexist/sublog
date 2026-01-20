import { getTranslations } from "next-intl/server";
// import * as http from "node:http";
import { CenteredHero } from "@/components/shared/CenteredHero";
import { LoginButtonGroup } from "@/components/shared/LoginButtonGroup";
import { Section } from "@/components/ui/section";

interface LoginPageProps {
}

const LoginPage = async ({ }: LoginPageProps) => {
    const t = await getTranslations("login")

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
                    buttons={<LoginButtonGroup />}
                />
            </div>
        </Section>
    )
}

export default LoginPage