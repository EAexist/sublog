"use client"

import {Button} from "@/components/ui/button";
import {updateAnalysis} from "@/lib/api";
import {redirect, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {useTransition} from "react";
import {CustomError} from "@/lib/error";

const AnalysisUpdateButton = () => {
    const t = useTranslations("report.new");
    const router = useRouter();

    const [isPending, startTransition] = useTransition()

    const handleTriggerAnalysis = () => {
        startTransition(async () => {
            const response = await updateAnalysis()
            if (response.error) {
                if (response.status === 401) {
                    redirect(`/login`)
                }
                throw new CustomError("API ERROR", response.status, t("title"))
            } else {

            }
            // setTsAnalysisPending(true)
        });
    }

    return (<Button onClick={handleTriggerAnalysis} size={"fullW"}>{t("components.AnalysisUpdateButton.run")}</Button>
    );
};

export default AnalysisUpdateButton;
