export async function register() {
    if (process.env.NEXT_PUBLIC_MSW_ENABLED === 'true' && process.env.NEXT_RUNTIME === 'nodejs') {
        const { server } = await import('./mocks/node');
        server.listen({ onUnhandledRequest: 'bypass' });
        console.log('✅ MSW: Server-side mocking enabled');
    }
}