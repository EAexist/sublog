"use client"

import {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,} from "@/components/ui/empty"
import {
    ANALYSIS_PROGRESS_STATUS_CONFIG,
    APP_USER_ANALYSIS_PROGRESS_STATUS,
    AppUserAnalysisProgressStatus,
    AppUserAnalysisProgressUpdate,
    PROGRESS_UPDATE_TYPE,
    ProgressUpdateType,
    SERVICE_PROVIDER_ANALYSIS_PROGRESS_STATUS,
    ServiceProviderAnalysisProgressUpdate
} from "@/app/[locale]/(auth)/report/analysis/analysisStatus";
import Image from 'next/image';
import {Progress} from "@/components/ui/progress";
import {BrandAvatar} from "@/components/shared/BrandAvatar";
import {Spinner} from "@/components/ui/spinner";
import {Item} from "@/components/ui/item";

const reportUpdateEventApiPath = `${process.env.NEXT_PUBLIC_API_URL}/reports/updates`
// const reportUpdateEventApiPath = '/mock-api/reports/updates'

const STATUS_WEIGHTS: Record<string, number> = {
    'COMPLETED': 0,
    'STARTED': 1,
};

const AnalysisTracker = () => {
    const t = useTranslations("report.analysis.components.AnalysisTracker");
    const router = useRouter();
    // const [isAnalysisPending, setTsAnalysisPending] = useState(false);
    const [currentStep, setCurrentStep] = useState<AppUserAnalysisProgressStatus>(APP_USER_ANALYSIS_PROGRESS_STATUS.STARTED);
    const [serviceProviders, setServiceProviders] = useState<Record<string, ServiceProviderAnalysisProgressUpdate>>({});
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

    const [progress, setProgress] = useState(30)
    useEffect(() => {
        let eventSource: EventSource | null = null;

        const initConnection = async () => {
            const response = await fetch(`${reportUpdateEventApiPath}`)

            if (response.status === 204) {
                router.push('/report')
                return;
            }

            console.log(`🚀 [EventSource Debug] Running UseEffect`)

            // fetchEventSource(reportUpdateEventApiPath, {
            //     method: 'GET',
            //     headers: {
            //         'Authorization': `Bearer YOUR_AUTH_TOKEN`, // 커스텀 헤더 추가
            //         'Content-Type': 'text/event-stream',
            //     },
            // })

            eventSource = new EventSource(reportUpdateEventApiPath, {
                withCredentials: true
            });

            eventSource.addEventListener('progress-update', (event) => {
                try {
                    const update: {
                        type: ProgressUpdateType,
                    } & (AppUserAnalysisProgressUpdate | ServiceProviderAnalysisProgressUpdate) = JSON.parse(event.data);
                    console.log(`🚀 [EventSource Debug] ${event.type} ${JSON.stringify(update)}`);
                    if (update.type === PROGRESS_UPDATE_TYPE.APP_USER) {
                        const data = update as AppUserAnalysisProgressUpdate
                        setCurrentStep(data.status);
                    } else if (update.type === PROGRESS_UPDATE_TYPE.SERVICE_PROVIDER) {
                        const data = update as ServiceProviderAnalysisProgressUpdate
                        setServiceProviders(prev => ({
                            ...prev,
                            [data.serviceProvider.id]: data
                        }));
                    }
                } catch (err) {
                    console.error("Parsing error", err);
                }
            });
            eventSource.onerror = () => {
                console.log(`🚀 [EventSource Debug] EventSource Error`)
                eventSource?.close();
            };
        }
        initConnection();

        return () => eventSource?.close();
    }, [router]);

    useEffect(() => {
        if (currentStep === APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED) {
            router.push('/report');
        }
    }, [currentStep, router]);

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
                    <Progress value={progress} className="w-72 m-2"/>
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
                                    <BrandAvatar className={"h-10 w-10"} serviceProvider={serviceProvider}/>
                                    {
                                        status !== SERVICE_PROVIDER_ANALYSIS_PROGRESS_STATUS.COMPLETED &&
                                        <div
                                            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                                            <Spinner className="h-6 w-6 text-white"/>
                                        </div>
                                    }
                                </div>
                            </li>
                        }
                    )}
                </ul>
            </Empty>
        </Item>
    );
};

export default AnalysisTracker;
