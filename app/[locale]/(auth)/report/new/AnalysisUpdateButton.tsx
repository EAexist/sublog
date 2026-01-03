"use client"

import {Button} from "@/components/ui/button";
import {updateAnalysis} from "@/lib/api";
import {redirect, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {useTransition} from "react";

const AnalysisUpdateButton = () => {
    const t = useTranslations("report.new.components.AnalysisUpdateButton");
    const router = useRouter();

    const [isPending, startTransition] = useTransition()

    const handleTriggerAnalysis = () => {
        startTransition(async () => {
            const response = await updateAnalysis()
            if (response.error) {
                if (response.status === 401) {
                    redirect(`/login`)
                }
                // return <SubscriptionReportError error={response.error} status={response.status}/>
            }
            // setTsAnalysisPending(true)
        });
    }

    return (<Button onClick={handleTriggerAnalysis} size={"fullW"}>{t("run")}</Button>
    );
};

export default AnalysisUpdateButton;
