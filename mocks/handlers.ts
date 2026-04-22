import { http, HttpResponse } from 'msw';
import { sampleReport } from './_constants/SampleReport';

export const handlers = [
    http.get('*/appUsers', () => {
        return HttpResponse.json({
            name: "John Doe",
            googleAccounts: [
                {
                    subject: "test-subject-1",
                    name: "John Doe",
                    email: "john.doe.1@gmail.com",
                    canDelete: false,
                },
                {
                    subject: "test-subject-2",
                    name: "John Doe",
                    email: "jane.doe.2@gmail.com",
                    canDelete: false,
                },
                {
                    subject: "test-subject-3",
                    name: "John Doe",
                    email: "john.doe.3@gmail.com",
                    canDelete: false,
                }
            ]
        }, { status: 200 })
    }),


    http.get('*/reports', () => {
        // return HttpResponse.json({}, { status: 204 })
        return HttpResponse.json(sampleReport, { status: 200 })
    }),

    http.get('*/reports/updates', () => {
        return new Response(
            new ReadableStream({
                start(controller) {
                    // Send initial connection response
                    controller.enqueue(new TextEncoder().encode(': ping\n\n'));

                    // Simulate progress updates
                    const updates = [
                        {
                            type: 'appUser',
                            status: 'STARTED'
                        },
                        {
                            type: 'appUser',
                            status: 'EMAIL_FETCHED'
                        },
                        {
                            type: 'serviceProvider',
                            status: 'STARTED',
                            serviceProvider: {
                                id: 'netflix',
                                displayName: 'Netflix',
                                websiteUrl: 'https://netflix.com',
                                subscriptionPageUrl: 'https://netflix.com/account',
                                canAnalyzeSubscription: true,
                                logoDevSuffix: 'netflix.com'
                            }
                        },
                        {
                            type: 'serviceProvider',
                            status: 'COMPLETED',
                            serviceProvider: {
                                id: 'netflix',
                                displayName: 'Netflix',
                                websiteUrl: 'https://netflix.com',
                                subscriptionPageUrl: 'https://netflix.com/account',
                                canAnalyzeSubscription: true,
                                logoDevSuffix: 'netflix.com'
                            }
                        },
                        {
                            type: 'appUser',
                            status: 'EMAIL_ACCOUNT_ANALYSIS_COMPLETED'
                        },
                        {
                            type: 'appUser',
                            status: 'COMPLETED'
                        }
                    ];

                    let index = 0;
                    const interval = setInterval(() => {
                        if (index < updates.length) {
                            const data = `event: progress-update\ndata: ${JSON.stringify(updates[index])}\n\n`;
                            controller.enqueue(new TextEncoder().encode(data));
                            index++;
                        } else {
                            clearInterval(interval);
                            controller.close();
                        }
                    }, 1000);

                    return () => clearInterval(interval);
                }
            }),
            {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                }
            }
        );
    }),

    http.post('*/reports/updates', () => {
        return HttpResponse.json(
            {}, { status: 202 })
    }),

    http.post('*/provisioning', () => {
        return HttpResponse.json({
            success: true,
            message: 'Provisioning completed'
        })
    }),

    http.post('*/guest', () => {
        return HttpResponse.json({
            user: {
                id: 'guest-user-id',
                name: 'Guest User',
                email: 'guest@example.com',
                role: 'guest'
            },
            token: 'mock-guest-token-' + Math.random().toString(36).substr(2, 9)
        }, { status: 200 })
    }),

    http.get('*/auth/session', () => {
        return HttpResponse.json({
            user: {
                id: 'dev-user-id',
                name: 'Development User',
                email: 'dev@example.com',
                role: 'admin'
            },
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }, { status: 200 })
    }),

    http.get('*/reports/error', () => {
        return new HttpResponse(
            JSON.stringify({ error: 'Internal Server Error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }),

    http.get('*/reports/unauthorized', () => {
        return new HttpResponse(
            JSON.stringify({ error: 'Unauthorized' }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    })
]
