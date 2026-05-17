import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AppConfig } from "../utils/AppConfig";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isServer = typeof window === 'undefined';
export const isClient = !isServer;

export const ensureAbsoluteUrl = (url: string | null | undefined) => {
    if (!url || url === "#") return "#";
    // Check if it already has http://, https://, or //
    const hasProtocol = /^https?:\/\/|^\/\//i.test(url);
    return hasProtocol ? url : `https://${url}`;
};

export const replaceContentWithAppConfig = (content: string): string => {
    let processedContent = content;
    Object.entries(AppConfig).forEach(([key, value]) => {
        if (typeof value === 'string') {
            const placeholder = `{{${key}}}`;
            processedContent = processedContent.replace(new RegExp(placeholder, 'g'), value);
        }
    });
    return processedContent;
};
