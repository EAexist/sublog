"use client"

import { Container } from "@/components/ui/container";
import { apiEventSource, updateReport, updateReportAndGetStream } from "@/lib/api";
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

export async function processAnalysisStream(
    stream: ReadableStream<Uint8Array>,
    onMessage: (data: any) => void,
    onError: (error: any) => void
) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let partialChunk = "";

    if (!reader) {
        onError(new Error("Failed to get stream reader"));
        return;
    }

    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = (partialChunk + chunk).split("\n");
            partialChunk = lines.pop() || "";

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith("data:")) continue;

                try {
                    const jsonString = trimmed.replace("data:", "").trim();
                    const data = JSON.parse(jsonString);
                    onMessage(data);
                } catch (e) {
                    // Ignore parsing errors from padding/comments
                }
            }
        }
    } catch (error) {
        onError(error);
    } finally {
        reader.releaseLock();
    }
}

const startAnalysis = async (onError: (error: Error | null) => void, onUpdate: (data: any) => void) => {
    try {
        const response = await updateReportAndGetStream()

        if (response.error || !response.data) {
            onError(new CustomError('Api Error', response.status));
            return;
        }

        await processAnalysisStream(
            response.data,
            (data) => onUpdate(data),
            (error) => onError(new CustomError(error.message, 500))
        );

    } catch (err: any) {
        onError(new CustomError(err.message, 500));
    }
};

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
    const eventSourceRef = useRef<EventSource | null>(null);

    const [error, setError] = useState<Error | null>(null);

    if (error) throw error;

    // Internal message handler for report updates
    const handleMessage = (data: {
        type: ProgressUpdateType,
    } & (AppUserAnalysisProgressUpdate | ServiceProviderAnalysisProgressUpdate)) => {
        const update = data as {
            type: ProgressUpdateType,
        } & (AppUserAnalysisProgressUpdate | ServiceProviderAnalysisProgressUpdate);

        if (update.type === PROGRESS_UPDATE_TYPE.APP_USER) {
            const appData = update as AppUserAnalysisProgressUpdate;
            if (appData.status === APP_USER_ANALYSIS_PROGRESS_STATUS.ERROR) {
                console.error("🚀 [Progress Update] Error in update");
                setError(new CustomError("Api Error", 500));
                return;
            }
            setCurrentStep(appData.status);
            if (appData.status === APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED) {
                console.log("🚀 [Progress Update] Closing EventSource: Task Completed");
                eventSourceRef.current?.close();
            }
        } else if (update.type === PROGRESS_UPDATE_TYPE.SERVICE_PROVIDER) {
            const spData = update as ServiceProviderAnalysisProgressUpdate;
            setServiceProviders(prev => ({
                ...prev,
                [spData.serviceProvider.id]: spData
            }));
        }
    };

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_USE_LABMDA_BACKEND === 'true') {
            return;
        }
        if (hasCalledUpdate.current) return;
        hasCalledUpdate.current = true;

        const updateResponse = async () => {
            try {
                const response = await updateReport()
                if (response.status == 429) { // Silently ignore 429 (too many requests). It's expected behavior.
                    return;
                }
                if (response.error) {
                    setError(new CustomError("Api Error", response.status));
                }
            } catch (e) {
                console.error(e);
                setError(new CustomError("Network error", 500));
            }
        }

        updateResponse()

        let isMounted = true;

        const initConnection = async () => {
            if (!isMounted) return;

            const response = await apiEventSource('reports/updates', {
                onMessage: handleMessage,
                onError: (error) => {
                    if (currentStep === APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED) {
                        eventSourceRef.current?.close();
                        return;
                    }
                    setError(new CustomError(error.error, error.status));
                }
            });

            if (response.error) {
                setError(new CustomError(response.error, response.status));
                return;
            }

            eventSourceRef.current = response.data;
        };

        initConnection();

        return () => {
            eventSourceRef.current?.close();
            isMounted = false;
        };
    }, [])

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_USE_LABMDA_BACKEND !== 'true') {
            return;
        }
        startAnalysis(
            (error) => {
                console.error("Analysis failed:", error);
            },
            handleMessage
        );
    }, []);

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
