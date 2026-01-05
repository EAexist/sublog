"use client"

import {Button} from "@/components/ui/button";
import {updateAnalysis} from "@/lib/api";
import {redirect, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {useTransition} from "react";
import {CustomError} from "@/lib/error";
import {Spinner} from "@/components/ui/spinner";

const UpdateStartButton = ({isFirst}: { isFirst: boolean }) => {
    const t = useTranslations(`report.new.${isFirst ? "new" : "update"}`);
    const router = useRouter();

    const [isPending, startTransition] = useTransition()

    const handleTriggerAnalysis = () => {
        startTransition(async () => {
            const response = await updateAnalysis()

            if (response.status === 202) {
                router.push('/report/analysis');
            } else {
                if (response.error) {
                    if (response.status === 401) {
                        redirect(`/login`)
                    }
                    throw new CustomError("API ERROR", response.status, t("title"))
                } else {
                    throw new CustomError("API ERROR", undefined, t("title"))
                }
            }
        });
    }

    return (<Button onClick={handleTriggerAnalysis} size={"fullW"}>{isPending ?
            <Spinner/> : t("components.UpdateStartButton.run")}</Button>
    );
};

export default UpdateStartButton;
