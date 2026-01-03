import {Section} from "@/components/ui/section";
import {Container} from "@/components/ui/container";
import {getTranslations} from "next-intl/server";
import AnalysisTracker from "@/app/[locale]/(auth)/analysis/AnalysisTracker";
import {DefaultLayout} from "@/templates/DefaultLayout";

type Props = {
    params: Promise<{ locale: string }>;
};

const AnalysisPage = async ({params}: Props) => {

    // const appUser: Promise<AppUserType> = await getAppUser()

    const t = await getTranslations("analysis");
    return (
        <DefaultLayout>
            <Section>
                <Container>
                    <AnalysisTracker/>
                </Container>
            </Section>
        </DefaultLayout>

    );
};


export default AnalysisPage;
