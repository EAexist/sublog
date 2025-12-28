import {cookies} from "next/headers";

const SESSION_COOKIE_KEY = "SESSION";

export async function getIsAuthenticated() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.has(SESSION_COOKIE_KEY);

    return isAuthenticated;
}

export async function clearSession() {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE_KEY)
}