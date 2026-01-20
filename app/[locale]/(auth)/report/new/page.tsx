import UpdateStartButton from "@/app/[locale]/(auth)/report/new/UpdateStartButton";
import { AvailableSinceAlert } from "@/app/[locale]/(auth)/report/UpdateEligiblityAlert";
import ErrorPage from "@/components/shared/ErrorPage";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { getUpdateEligibility } from "@/lib/api";
import { ReportUpdateEligibility, ReportUpdateEligibilitySchema } from "@/lib/dto/dto";
import { DefaultLayout } from "@/templates/DefaultLayout";
import { ChevronRight, SearchCheckIcon, Timer } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = {
    params: Promise<{ locale: string }>;
};

const AnalysisStartPage = async ({ params }: Props) => {

    const t_base = await getTranslations("report.new");

    const response = await getUpdateEligibility()

    if (response.error) {
        return <ErrorPage status={response.status} pageTitle={t_base("title")} />
    }

    const reportUpdateEligibility: ReportUpdateEligibility = ReportUpdateEligibilitySchema.parse(response.data)

    const isFirst = reportUpdateEligibility.analyzedAt === null

    const t = await getTranslations(`report.new.${(isFirst) ? "new" : "update"}`);

    return (
        <DefaultLayout>
            <Section>
                <Container>
                    <div className={"pb-8"}>
                        <h1 className={"font-semibold text-xl"}>{t("title")}</h1>
                    </div>
                    {
                        reportUpdateEligibility.canUpdate ?
                            <div>
                                <UpdateStartButton isFirst={isFirst} />
                            </div>
                            :
                            <div className={"flex flex-col gap-8"}>{
                                reportUpdateEligibility.availableSince &&
                                <AvailableSinceAlert availableSince={reportUpdateEligibility.availableSince}
                                    variant={"muted"} />
                            }
                                <Button disabled size={"fullW"}><Timer />{t("components.UpdateStartButton.run")}</Button>
                            </div>
                    }
                </Container>
            </Section>
            {
                !isFirst &&
                <>
                    <div className={"px-4"}>
                        <Separator />
                    </div>
                    <Section>
                        <Container><Item asChild variant={"outline"}><Link
                            href={"/report"}><ItemMedia>
                                <SearchCheckIcon className={"size-6"} strokeWidth={1.5} />
                            </ItemMedia>
                            <ItemContent className={"min-w-0"}>
                                <ItemTitle className={"w-full"}>
                                    <h2 className={""}>{t("lastReportTitle")}</h2>
                                </ItemTitle>
                                <ItemDescription
                                    className={""}>{reportUpdateEligibility.analyzedAt?.toLocaleString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        hour12: true
                                    })}
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <ChevronRight className={"size-5"} />
                            </ItemActions>
                        </Link>
                        </Item>
                        </Container>
                    </Section>
                </>
            }
        </DefaultLayout>

    );
};


export default AnalysisStartPage;
