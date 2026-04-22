import { ServiceProvider } from "@/lib/dto/dto";
import doubleCheckGif from "@/public/assets/images/gifs/double-check.gif";
import emailGif from "@/public/assets/images/gifs/email.gif";
import notesGif from "@/public/assets/images/gifs/notes.gif";
import searchGif from "@/public/assets/images/gifs/search.gif";

// import emailGif from "@/public/assets/images/gifs/email.gif";

export const PROGRESS_UPDATE_TYPE = {
    APP_USER: 'appUser',
    SERVICE_PROVIDER: 'serviceProvider',
} as const;
export type ProgressUpdateType = typeof PROGRESS_UPDATE_TYPE[keyof typeof PROGRESS_UPDATE_TYPE]

export const APP_USER_ANALYSIS_PROGRESS_STATUS = {
    ERROR: 'ERROR',
    STARTED: 'STARTED',
    EMAIL_FETCHED: 'EMAIL_FETCHED',
    EMAIL_ACCOUNT_ANALYSIS_COMPLETED: 'EMAIL_ACCOUNT_ANALYSIS_COMPLETED',
    COMPLETED: 'COMPLETED',
} as const;
export type AppUserAnalysisProgressStatus = typeof APP_USER_ANALYSIS_PROGRESS_STATUS[keyof typeof APP_USER_ANALYSIS_PROGRESS_STATUS]


export const SERVICE_PROVIDER_ANALYSIS_PROGRESS_STATUS = {
    STARTED: 'STARTED',
    COMPLETED: 'COMPLETED',
} as const;
export type ServiceProviderAnalysisProgressStatus = typeof SERVICE_PROVIDER_ANALYSIS_PROGRESS_STATUS[keyof typeof SERVICE_PROVIDER_ANALYSIS_PROGRESS_STATUS]


export interface AppUserAnalysisProgressUpdate {
    status: AppUserAnalysisProgressStatus
}

export interface ServiceProviderAnalysisProgressUpdate {
    status: ServiceProviderAnalysisProgressStatus
    serviceProvider: ServiceProvider,
}


export const ANALYSIS_PROGRESS_STATUS_CONFIG = {
    [APP_USER_ANALYSIS_PROGRESS_STATUS.ERROR]: {
        icon: searchGif,
    },
    [APP_USER_ANALYSIS_PROGRESS_STATUS.STARTED]: {
        icon: emailGif,
    },
    [APP_USER_ANALYSIS_PROGRESS_STATUS.EMAIL_FETCHED]: {
        icon: searchGif,
    },
    [APP_USER_ANALYSIS_PROGRESS_STATUS.EMAIL_ACCOUNT_ANALYSIS_COMPLETED]: {
        icon: notesGif,
    },
    [APP_USER_ANALYSIS_PROGRESS_STATUS.COMPLETED]: {
        icon: doubleCheckGif,
    },
};