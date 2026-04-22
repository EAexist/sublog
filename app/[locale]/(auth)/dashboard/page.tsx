import ErrorPage from "@/components/shared/ErrorPage";
import { Container } from "@/components/ui/container";
import { getReport } from "@/lib/api";
import { SubscriptionReportSchema } from "@/lib/dto/dto";
import { ensureMsw } from "@/lib/msw";
import { DefaultLayout } from "@/templates/DefaultLayout";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import SubscriptionDashboard from "./_components/SubscriptionDashboard";
import ReportUpdateManager from "./_components/update/ReportUpdateManager";


type Props = {
    params: Promise<{ locale: string }>;
};

const DashboardPage = async ({ params }: Props) => {

    await ensureMsw();

    const t = await getTranslations("dashboard");

    const response = await getReport()

    if (response.error) {
        return <ErrorPage status={response.status} pageTitle={t("title")} />
    }

    const isReportEmpty = response.status === 204

    const report = isReportEmpty ? null : SubscriptionReportSchema.parse(response.data)

    console.log(`report: ${JSON.stringify(report)}`)

    return (
        <DefaultLayout>
            {/* <div className={"flex justify-between items-end pb-4"}>
                        <div className={"flex items-end gap-2"}>
                            <h1 className={"font-semibold text-xl"}>{t("title")}</h1>
                        </div>
                    </div> */}
            <Suspense>
                {
                    report &&
                    <Container className="bg-muted flex-1">
                        <SubscriptionDashboard report={report} />
                    </Container>
                }
            </Suspense>
            <ReportUpdateManager showUpdateTracker={report === null} />
        </DefaultLayout>
    );
};

export default DashboardPage;