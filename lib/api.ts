import { isServer } from "@/lib/utils";
import { logout } from "./auth";

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

export const getSessionCookie = async () => {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get('SESSION');
}
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

    const url = `${baseUrl}/api/v1/${path}`;

    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    // Session Cookie
    if (isServer) {
        const sessionCookie = await getSessionCookie()
        if (sessionCookie) {
            headers.set('Cookie', `SESSION=${sessionCookie.value}`);
        }
    } else {
        options.credentials = options.credentials || 'include';
    }

    try {
        console.log(`🚀 [API] Fetching ${options.method || 'GET'} ${url}`);

        const response = await fetch(url, {
            ...options,
            headers: headers,
        });

        const data = await readBody(response)

        console.log(`🚀 [API] ${options.method || 'GET'} ${url} responded with\n${response.status} ${response.statusText}`);
        console.dir(data, { depth: null });

        if (!response.ok) {
            if (response.status === 401) {
                logout()
            }
            return {
                data: null,
                error: data?.error || 'API_ERROR',
                status: response.status,
            };
        }

        return { data: data, error: null, status: response.status };

    } catch (e: unknown) {
        const err = e as Error & { code?: string; cause?: { code?: string } };
        console.log(`[API] Error: ${err.message}`)
        const isNetworkDown = (err.cause?.code === 'ECONNREFUSED') || (err.code === 'ECONNREFUSED');
        return {
            data: null,
            status: isNetworkDown ? 503 : 500,
            error: isNetworkDown ? 'Service Unavailable' : 'Internal Server Error'
        }
    }
}

export const triggerProvisioning = async () => {
    const apiPath = 'provisioning'
    return await apiFetch(apiPath, {
        method: "POST"
    })
};

export const getReport = async () => {
    const apiPath = 'reports'
    return await apiFetch(apiPath)
};

export const getReportUpdate = async () => {
    const apiPath = 'reports/updates'
    return await apiFetch(apiPath)
};

export const updateReport = async () => {
    const apiPath = 'reports/updates'
    return await apiFetch(apiPath, {
        method: "POST"
    })
};

export const getReportUpdateEligibility = async () => {
    const apiPath = 'reports/updates/eligibility'
    return await apiFetch(apiPath)
};

export const guestLogin = async () => {
    const apiPath = 'guest'
    return await apiFetch(apiPath)
};

export const getAppUser = async () => {
    const apiPath = 'appUsers'
    return await apiFetch(apiPath)
};

export const deleteGoogleAccount = async (googleSubject: string) => {
    const apiPath = `/googleAccounts/${googleSubject}`
    return await apiFetch(apiPath, {
        method: "DELETE"
    })
};

export interface EventSourceError {
    data: null;
    error: string;
    status: number
}

export type EventSourceResponse<T> =
    | { data: T; error: null; status: number }
    | EventSourceError;

export interface EventSourceHandlers<T> {
    onMessage?: (data: T) => void;
    onError?: (error: EventSourceError) => void;
    onComplete?: () => void;
}

export async function apiEventSource<T>(path: string, handlers: EventSourceHandlers<T> = {}): Promise<EventSourceResponse<EventSource>> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const url = `${baseUrl}/api/v1/${path}`;

    try {
        console.log(`🚀 [EventSource] Connecting to ${url}`);

        // Check connection first
        const response = await apiFetch(path);

        if (response.status != 200) {
            console.log(`🚀 [EventSource] Connection failed ${response.status}`);
            return {
                data: null,
                error: 'EVENTSOURCE_CONNECTION_ERROR',
                status: response.status,
            };
        }

        const eventSource = new EventSource(url, {
            withCredentials: true
        });

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as T;

                console.log(`🚀 [EventSource] Message received from ${url}`);
                console.dir(data, { depth: null });

                handlers.onMessage?.(data);
            } catch (err) {
                const error = err as Error;
                console.log(`[EventSource] Failed to parse message: ${error.message}`);
                handlers.onError?.({
                    data: null,
                    error: 'PARSE_ERROR',
                    status: 500
                });
            }
        };

        eventSource.onerror = (error) => {
            console.log(`[EventSource] Error. ReadyState: ${eventSource.readyState}`);
            console.log(`[EventSource] Error details:`, error);

            handlers.onError?.({
                data: null,
                error: 'EVENTSOURCE_ERROR',
                status: 500
            });
        };

        console.log(`🚀 [EventSource] Connection established to ${url}`);

        return { data: eventSource, error: null, status: 200 };

    } catch (e: unknown) {
        const err = e as Error & { code?: string; cause?: { code?: string } };
        console.log(`[EventSource] Error: ${err.message}`);

        const isNetworkDown = (err.cause?.code === 'ECONNREFUSED') || (err.code === 'ECONNREFUSED');
        return {
            data: null,
            status: isNetworkDown ? 503 : 500,
            error: isNetworkDown ? 'Service Unavailable' : 'Internal Server Error'
        }
    }
}