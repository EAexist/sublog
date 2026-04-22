"use client"

import { BrandAvatar } from "@/components/shared/BrandAvatar";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "@/components/ui/empty";
import { Item } from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
    ANALYSIS_PROGRESS_STATUS_CONFIG,
    APP_USER_ANALYSIS_PROGRESS_STATUS,
    AppUserAnalysisProgressStatus,
    SERVICE_PROVIDER_ANALYSIS_PROGRESS_STATUS,
    ServiceProviderAnalysisProgressUpdate
} from "../analysisStatus";

const STATUS_WEIGHTS: Record<string, number> = {
    'COMPLETED': 0,
    'STARTED': 1,
};

interface ReportUpdateTrackerProps {
    currentStep: AppUserAnalysisProgressStatus;
    serviceProviders: Record<string, ServiceProviderAnalysisProgressUpdate>;
}

const ReportUpdateTracker = ({ currentStep, serviceProviders }: ReportUpdateTrackerProps) => {
    const t = useTranslations("dashboard.components.ReportUpdateTracker");
    const maxServiceProviderCount = 18
    const displayedServiceProviders: ServiceProviderAnalysisProgressUpdate[] =
        // Array(5).fill(
        Object.values(serviceProviders).sort((a, b) => {
            // COMPLETED (true -> 1) vs STARTED (false -> 0)
            // We want COMPLETED first, so we subtract in reverse: b - a
            return (b.status === 'COMPLETED' ? 1 : 0) - (a.status === 'COMPLETED' ? 1 : 0);
        })
            // ).flat()
            .slice(0, maxServiceProviderCount)

    const serviceProviderCount = Object.keys(serviceProviders).length
    const completedServiceProviderAnalysisCount = Object.values(serviceProviders).filter(it => it.status === SERVICE_PROVIDER_ANALYSIS_PROGRESS_STATUS.COMPLETED).length
    const stepConfig = ANALYSIS_PROGRESS_STATUS_CONFIG[currentStep]

    const [progress, setProgress] = useState(0)
    const STATUS_PROGRESS_MAP: Record<string, number> = {
        [APP_USER_ANALYSIS_PROGRESS_STATUS.STARTED]: 0,
        [APP_USER_ANALYSIS_PROGRESS_STATUS.EMAIL_FETCHED]: 25,
        [APP_USER_ANALYSIS_PROGRESS_STATUS.EMAIL_ACCOUNT_ANALYSIS_COMPLETED]: 75,
        [APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED]: 100,
    };

    useEffect(() => {
        setProgress(STATUS_PROGRESS_MAP[currentStep])
    }, [currentStep]);

    return (
        <Item variant={"outline"}>
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Image
                            src={stepConfig.icon}
                            alt="" aria-hidden="true"
                            unoptimized
                            width={300}
                            height={300}
                        />
                    </EmptyMedia>
                    <EmptyTitle>
                        {t(`steps.${currentStep}.title`)}</EmptyTitle>
                    <Progress value={progress} className="w-72 m-2" />
                    <EmptyDescription>
                        <div className="flex items-center gap-1">
                            <span>
                                {t(`steps.${currentStep}.description`)}
                                {(currentStep === APP_USER_ANALYSIS_PROGRESS_STATUS.EMAIL_FETCHED) && (serviceProviderCount > 0) && ` [${completedServiceProviderAnalysisCount}/${serviceProviderCount}]`}
                            </span>
                            {/*                                    {*/}
                            {/*                                        // (currentStep !== ANALYSIS_PROGRESS_STATUS.COMPLETED)&&*/}
                            {/*                                        <span*/}
                            {/*                                            className="inline-flex items-center ml-0.5 gap-0.5">*/}
                            {/*  <span className="animate-pulse rounded-full h-0.5 w-0.5 bg-current mx-px animation-duration-[1.2s]"/>*/}
                            {/*  <span*/}
                            {/*      className="animate-pulse rounded-full h-0.5 w-0.5 bg-current mx-px animation-duration-[1.2s] [animation-delay:0.2s]"/>*/}
                            {/*  <span*/}
                            {/*      className="animate-pulse rounded-full h-0.5 w-0.5 bg-current mx-px animation-duration-[1.2s] [animation-delay:0.4s]"/>*/}
                            {/*</span>}*/}
                        </div>
                    </EmptyDescription>
                    {/*<Progress value={progress} className="w-72"/>*/}
                </EmptyHeader>
                <ul className={"grid grid-cols-10 gap-5 justify-center w-fit mx-auto"}>
                    {displayedServiceProviders.map(({
                        serviceProvider,
                        status
                    }, i) => {
                        const indexInCycle = i % 9;
                        const isRowOfFour = indexInCycle >= 5;

                        return <li key={serviceProvider.id}
                            className={`col-span-2 w-10 h-10 ${isRowOfFour && indexInCycle === 5 ? "col-start-2" : ""}`}>
                            <div className="relative w-fit">
                                <BrandAvatar className={"h-10 w-10"} serviceProvider={serviceProvider} />
                                {/* {
                                    status !== SERVICE_PROVIDER_ANALYSIS_PROGRESS_STATUS.COMPLETED &&
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                                        <Spinner className="h-6 w-6 text-white" />
                                    </div>
                                } */}
                            </div>
                        </li>
                    }
                    )}
                </ul>
            </Empty>
        </Item>
    );
};

export default ReportUpdateTracker;
