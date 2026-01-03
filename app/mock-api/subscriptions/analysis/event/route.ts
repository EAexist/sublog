export const dynamic = 'force-dynamic'; // Prevents static optimization


export async function GET() {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {

            const sendEvent = (type: 'appUser' | 'serviceProvider', data: object) => {
                const dataWithMetadata = {type, ...data};
                const chunk = `event: progress-update\ndata: ${JSON.stringify(dataWithMetadata)}\n\n`
                controller.enqueue(encoder.encode(chunk));
            };

            sendEvent('appUser', {status: 'STARTED'});

            await sleep(2000);
            sendEvent('appUser', {status: 'EMAIL_FETCHED'});

            await sleep(1000);

            sendEvent('serviceProvider', {
                serviceProvider: {
                    id: 'ChatGPT Pro',
                    displayName: 'ChatGPT Pro',
                    logoDevSuffix: 'chatgpt.com',
                    canAnalyzePayment: false
                },
                status: 'STARTED'
            });

            sendEvent('serviceProvider', {
                serviceProvider: {
                    id: '네이버플러스 멤버십',
                    displayName: '네이버플러스 멤버십',
                    logoDevSuffix: 'navercorp.vn',
                    canAnalyzePayment: true
                },
                status: 'STARTED'
            });

            sendEvent('serviceProvider', {
                serviceProvider: {
                    id: 'Sketchfab',
                    displayName: 'Sketchfab',
                    logoDevSuffix: 'sketchfab.com',
                    canAnalyzePayment: false
                },
                status: 'STARTED'
            });

            sendEvent('serviceProvider', {
                serviceProvider: {
                    id: 'Netflix',
                    displayName: 'Netflix',
                    logoDevSuffix: 'netflix.com',
                    canAnalyzePayment: true
                },
                status: 'STARTED'
            });


            await sleep(2000);
            sendEvent('serviceProvider', {
                serviceProvider: {
                    id: 'Netflix',
                    displayName: 'Netflix',
                    logoDevSuffix: 'netflix.com',
                    canAnalyzePayment: true
                },
                status: 'COMPLETED'
            });

            await sleep(1000);
            sendEvent('serviceProvider', {
                serviceProvider: {
                    id: 'Sketchfab',
                    displayName: 'Sketchfab',
                    logoDevSuffix: 'sketchfab.com',
                    canAnalyzePayment: false
                },
                status: 'COMPLETED'
            });

            await sleep(1000);
            sendEvent('serviceProvider', {
                serviceProvider: {
                    id: '네이버플러스 멤버십',
                    displayName: '네이버플러스 멤버십',
                    logoDevSuffix: 'navercorp.vn',
                    canAnalyzePayment: true
                },
                status: 'COMPLETED'
            });

            await sleep(1000);
            sendEvent('serviceProvider', {
                serviceProvider: {
                    id: 'ChatGPT Pro',
                    displayName: 'ChatGPT Pro',
                    logoDevSuffix: 'chatgpt.com',
                    canAnalyzePayment: false
                },
                status: 'COMPLETED'
            });

            await sleep(2000);
            sendEvent('appUser', {status: 'EMAIL_ACCOUNT_ANALYSIS_COMPLETED'});

            await sleep(2000);
            sendEvent('appUser', {status: 'COMPLETED'});

            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));