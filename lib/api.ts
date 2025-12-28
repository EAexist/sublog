import {cookies} from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
type ApiResponse<T> =
    | { data: T; error: null; status: number }
    | { data: null; error: string; status: number };

const readBody = async (response: Response) => {
    try {
        return await response.json()
    } catch {
        return null
    }
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {

    const url = `${BASE_URL}${endpoint}`;

    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    // Session Cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('SESSION');

    if (sessionCookie) {
        headers.set('Cookie', `SESSION=${sessionCookie.value}`);
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

export const getReport = async () => {
    const apiPath = '/subscriptions/analysis'
    return await apiFetch(apiPath)
};

export const getAppUser = async () => {
    const apiPath = '/appUser'
    return await apiFetch(apiPath)
};