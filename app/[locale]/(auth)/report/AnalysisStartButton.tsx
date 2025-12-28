import {Button} from "@/components/ui/button";
import {getTranslations} from "next-intl/server";
import { useTransition } from 'react';

const AnalysisStartButton = async () => {
    const [isPending, startTransition] = useTransition();
    const appUser = await getAppUser()

    const handleAnalyze = startTransition((=>))

    const t = await getTranslations("Dashboard");
    return (
                <Button onClick={handleAnalyze} size={"fullW"}>{t("run_analysis")}</Button>
    );
};

const getAppUser = async () => {

    const apiPath = 'http://localhost:8080/api.vercel.app/blog'
    const res = await fetch(apiPath)
    return res.json()
};


export default AnalysisStartButton;
