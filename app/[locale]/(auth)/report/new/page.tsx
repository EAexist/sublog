import {Section} from "@/components/ui/section";
import {Container} from "@/components/ui/container";
import {getTranslations} from "next-intl/server";
import {DefaultLayout} from "@/templates/DefaultLayout";
import AnalysisUpdateButton from "@/app/[locale]/(auth)/report/new/AnalysisUpdateButton";
import {getIsAnalysisEnabled} from "@/lib/api";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Timer} from "lucide-react";
import Link from "next/link";
import {ErrorPage} from "@/components/shared/ErrorPage";

type Props = {
    params: Promise<{ locale: string }>;
};

const AnalysisUpdatePage = async ({params}: Props) => {

    // const appUser: Promise<AppUserType> = await getAppUser()

    const t = await getTranslations("report.new");

    const response = await getIsAnalysisEnabled()

    if (response.status === 401) {
        redirect(`/login`)
    }

    if (response.error) {
        return <ErrorPage title={t("title")} apiError={response}/>
    }

    const isAnalysisEnabled = (response.data as { isAnalysisEnabled: boolean })?.isAnalysisEnabled ?? false

    return (
        <DefaultLayout>
            <Section>
                <Container>
                    <div className={"pb-8"}>
                        <h1 className={"font-semibold text-xl"}>{t("title")}</h1>
                    </div>
                    {
                        isAnalysisEnabled ?
                            <AnalysisUpdateButton/> :
                            <div>
                                <Button disabled variant={"outline"}
                                        size={"fullW"}><Timer/>{t("components.AnalysisUpdateButton.run")}
                                </Button>
                                <Button size={"fullW"} asChild><Link
                                    href={"/report"}>{t("reportNavigateButton")}</Link></Button>
                            </div>
                    }
                </Container>
            </Section>
        </DefaultLayout>

    );
};


export default AnalysisUpdatePage;
