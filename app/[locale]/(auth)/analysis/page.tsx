import {Section} from "@/components/ui/section";
import {Button} from "@/components/ui/button";
import {Container} from "@/components/ui/container";
import {getTranslations} from "next-intl/server";
import Link from "next/link";
import {AppUserType} from "@/lib/dto/dto";
import {getAppUser} from "@/lib/api";
import {Play} from "lucide-react";

type Props = {
    params: Promise<{ locale: string }>;
};

const AnalysisPage = async ({params}: Props) => {

    const appUser: Promise<AppUserType> = await getAppUser()

    const t = await getTranslations("analysis");
    return (
        <Section>
            <Container>
                <h2>Dashboard</h2>
                <Button size={"fullW"}><Link href={"/report"}
                                             className={"flex gap-2 items-center"}><Play/>{t("run")}
                </Link></Button>
            </Container>
        </Section>
    );
};


export default AnalysisPage;
