"use client"

import { Container } from "@/components/ui/container";
import { apiEventSource, updateReport } from "@/lib/api";
import { CustomError } from "@/lib/error";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import {
    APP_USER_ANALYSIS_PROGRESS_STATUS,
    AppUserAnalysisProgressStatus,
    AppUserAnalysisProgressUpdate,
    PROGRESS_UPDATE_TYPE,
    ProgressUpdateType,
    ServiceProviderAnalysisProgressUpdate
} from "../analysisStatus";
import ReportUpdateTracker from "./ReportUpdateTracker";

const reportUpdateEventApiPath = `/api/reports/updates`

interface ReportUpdateManagerProps {
    showUpdateTracker?: boolean;
}

const ReportUpdateManager = ({ showUpdateTracker = true }: ReportUpdateManagerProps) => {
    const t = useTranslations("dashboard");
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState<AppUserAnalysisProgressStatus>(APP_USER_ANALYSIS_PROGRESS_STATUS.STARTED);
    const [serviceProviders, setServiceProviders] = useState<Record<string, ServiceProviderAnalysisProgressUpdate>>({});

    // Prevent redundant calls to updateReport
    const hasCalledUpdate = useRef(false);

    const [error, setError] = useState<Error | null>(null);

    if (error) throw error;

    useEffect(() => {
        if (hasCalledUpdate.current) return;
        hasCalledUpdate.current = true;

        const updateResponse = async () => {
            try {
                const response = await updateReport()
                if (response.status == 429) { // Silently ignore 429 (too many requests). It's expected behavior.
                    return;
                }
                if (response.error) {
                    setError(new CustomError("API ERROR", response.status));
                }
            } catch (e) {
                console.error(e);
                setError(new CustomError("Network error", 500));
            }
        }

        updateResponse()
    }, [])

    useEffect(() => {
        let eventSource: EventSource | null = null;
        let isMounted = true;

        const initConnection = async () => {
            if (!isMounted) return;

            const response = await apiEventSource('reports/updates', {
                onMessage: (data) => {
                    const update: {
                        type: ProgressUpdateType,
                    } & (AppUserAnalysisProgressUpdate | ServiceProviderAnalysisProgressUpdate) = data as {
                        type: ProgressUpdateType,
                    } & (AppUserAnalysisProgressUpdate | ServiceProviderAnalysisProgressUpdate);

                    if (update.type === PROGRESS_UPDATE_TYPE.APP_USER) {
                        const appData = update as AppUserAnalysisProgressUpdate;
                        setCurrentStep(appData.status);
                        if (appData.status === APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED) {
                            console.log("🚀 [Progress Update] Closing EventSource: Task Completed");
                            eventSource?.close();
                        }
                    } else if (update.type === PROGRESS_UPDATE_TYPE.SERVICE_PROVIDER) {
                        const spData = update as ServiceProviderAnalysisProgressUpdate;
                        setServiceProviders(prev => ({
                            ...prev,
                            [spData.serviceProvider.id]: spData
                        }));
                    }
                },
                onError: (error) => {
                    if (currentStep === APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED) {
                        eventSource?.close();
                        return;
                    }
                    setError(new CustomError(error.error, error.status));
                }
            });

            if (response.error) {
                setError(new CustomError(response.error, response.status));
                return;
            }

            eventSource = response.data;
        };

        initConnection();

        return () => {
            eventSource?.close();
            isMounted = false;
        };

    }, []);

    // Previous EventSource implementation (commented out)
    /*
    let eventSource: EventSource | null = null;
    let isMounted = true;

    const initConnection = async () => {
        if (!isMounted) return;

        const response = await getReportUpdate()

        if (response.status != 200) {
            setError(new CustomError("API ERROR", response.status));
            return
        }

        eventSource = new EventSource(reportUpdateEventApiPath, {
            withCredentials: true
        });

        eventSource.addEventListener('progress-update', (event) => {
            try {
                const update: {
                    type: ProgressUpdateType,
                } & (AppUserAnalysisProgressUpdate | ServiceProviderAnalysisProgressUpdate) = JSON.parse(event.data);
                if (update.type === PROGRESS_UPDATE_TYPE.APP_USER) {
                    const data = update as AppUserAnalysisProgressUpdate
                    setCurrentStep(data.status)
                    if (data.status === APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED) {
                        console.log("🚀 [Progress Update] Closing EventSource: Task Completed");
                        eventSource?.close();
                    }
                } else if (update.type === PROGRESS_UPDATE_TYPE.SERVICE_PROVIDER) {
                    const data = update as ServiceProviderAnalysisProgressUpdate
                    setServiceProviders(prev => ({
                        ...prev,
                        [data.serviceProvider.id]: data
                    }));
                }
            } catch (err) {
                console.error(err);
                setError(new CustomError("API ERROR", 500));
            }
        });
        eventSource.onerror = (error) => {
            if (currentStep === APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED) {
                eventSource?.close();
                return;
            }
            console.error(`🚀 [Progress Update] Error. ReadyState: ${eventSource?.readyState}`);
            console.error("🚀 Error details:", error);
            setError(new CustomError("API ERROR"));
        };
    }
    initConnection();

    return () => {
        eventSource?.close();
        isMounted = false
    };
    */

    const delay = 1000

    useEffect(() => {
        console.log(`🚀 [Progress Update] currentStep: ${currentStep}`);

        if (currentStep === APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED) {
            console.log("🚀 [Progress Update] Task Completed");
            setTimeout(() => {
                router.refresh()
            }, delay);
        }
    }, [currentStep]);

    return (
        <>
            {showUpdateTracker && (
                <Container>
                    <ReportUpdateTracker currentStep={currentStep} serviceProviders={serviceProviders} />
                </Container>
            )}
        </>
    );
};

export default ReportUpdateManager;
