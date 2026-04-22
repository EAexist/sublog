import { isServer } from "./utils";

// Prevent TypeScript errors on the global object
const globalForMsw = global as unknown as {
    mswServerStarted?: boolean
};

let serverInstance: any;

export async function ensureMsw() {
    if (process.env.NEXT_PUBLIC_MSW_ENABLED !== 'true') return;

    if (!isServer) return;

    const { server } = await import('../mocks/node');

    // Always reassign (important in dev)
    if (!serverInstance) {
        serverInstance = server;
    }

    try {
        serverInstance.listen({ onUnhandledRequest: 'warn' });
        console.log('✅ MSW: Server interception ensured');
    } catch (e) {
        // ignore "already listening" type situations
    }

    // if (!globalForMsw.mswServerStarted) {
    //     const { server } = await import('../mocks/node');

    //     server.listen({ onUnhandledRequest: 'warn' });

    //     globalForMsw.mswServerStarted = true;
    //     console.log('✅ MSW: Server-side Interception Active');
    // }
}