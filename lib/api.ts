import {isServer} from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiError {
    data: null;
    error: string;
    status: number
}

export type ApiResponse<T> =
    | { data: T; error: null; status: number }
    | ApiError;

const readBody = async (response: Response) => {
    try {
        return await response.json()
    } catch {
        return null
    }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {

    const url = `${BASE_URL}${path}`;

    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    // Session Cookie
    if (isServer) {
        const {cookies} = await import('next/headers');
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('SESSION');
        if (sessionCookie) {
            headers.set('Cookie', `SESSION=${sessionCookie.value}`);
        }
    } else {
        options.credentials = options.credentials || 'include';
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers: headers,
        });

        const data = await readBody(response)

        if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 [API DEBUG] ${url}`);
            console.log(`🚀 [Status] ${response.status} ${response.statusText}`);
            console.dir(data, {depth: null});
        }

        if (!response.ok) {
            return {
                data: null,
                error: data?.error || 'API_ERROR',
                status: response.status,
            };
        }

        return {data: data, error: null, status: response.status};

    } catch (e: unknown) {
        const err = e as Error & { code?: string; cause?: { code?: string } };
        console.log(`[API DEBUG] ${err.message}`)
        const isNetworkDown = (err.cause?.code === 'ECONNREFUSED') || (err.code === 'ECONNREFUSED');
        return {
            data: null,
            status: isNetworkDown ? 503 : 500,
            error: isNetworkDown ? 'Service Unavailable' : 'Internal Server Error'
        }
    }
}

export const triggerProvisioning = async () => {
    const apiPath = '/provisioning'
    return await apiFetch(apiPath, {
        method: "POST"
    })
};

export const getReport = async () => {
    const apiPath = '/reports'
    return await apiFetch(apiPath)
};

export const updateAnalysis = async () => {
    const apiPath = '/reports/updates'
    return await apiFetch(apiPath, {
        method: "POST"
    })
};

export const getIsAnalysisEnabled = async () => {
    return Promise.resolve({status: "ok", error: null, data: {isAnalysisEnabled: true}})
    const apiPath = '/subscriptions/analysis'
    return await apiFetch(apiPath, {
        method: "POST"
    })
};