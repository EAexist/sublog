import { SubscriptionReport as SubscriptionReportType } from "@/lib/dto/dto";
import { subMonths } from "date-fns";

// Helper function to calculate next payment date
// Finds the closest date after today with the same day value as subscribedSince
const calculateNextPaymentDate = (subscribedSince: Date): Date => {
    const today = new Date();
    const subscribedDay = subscribedSince.getDate();

    // Start with current month
    let nextPayment = new Date(today.getFullYear(), today.getMonth(), subscribedDay);

    // If this date is in the past or today, move to next month
    if (nextPayment <= today) {
        nextPayment = new Date(today.getFullYear(), today.getMonth() + 1, subscribedDay);
    }

    return nextPayment;
};

export const sampleReport: SubscriptionReportType = {
    reportUpdateAvailableSince: new Date(),
    accountReports:
        [{
            subscriptions: [{
                id: "netflix-sub-1",
                serviceProvider: {
                    id: "netflix",
                    displayName: "Netflix",
                    websiteUrl: "https://www.netflix.com/browse",
                    subscriptionPageUrl: "https://www.netflix.com/browse",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "netflix.com"
                },
                registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 0),
                isNotSureIfSubscriptionIsOngoing: false,
                nextPaymentDate: calculateNextPaymentDate(subMonths(Date.now(), 7))
            }, {
                id: "naver-plus-sub-1",
                serviceProvider: {
                    id: "naver-plus",
                    displayName: "네이버플러스 멤버십",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "navercorp.vn"
                },
                registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: false,
                nextPaymentDate: calculateNextPaymentDate(subMonths(Date.now(), 8))
            }, {
                id: "disney-plus-sub-1",
                serviceProvider: {
                    id: "disney-plus",
                    displayName: "Disney+",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "disneyplus.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: false,
                nextPaymentDate: calculateNextPaymentDate(subMonths(Date.now(), 8))
            }, {
                id: "watcha-sub-1",
                serviceProvider: {
                    id: "watcha",
                    displayName: "왓챠",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "watcha.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: true,
                nextPaymentDate: calculateNextPaymentDate(subMonths(Date.now(), 8))
            }, {
                id: "tving-sub-1",
                serviceProvider: {
                    id: "tving",
                    displayName: "티빙",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: false,
                    logoDevSuffix: "tving.com"

                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: null,
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                id: "chatgpt-sub-1",
                serviceProvider: {
                    id: "chatgpt",
                    displayName: "ChatGPT Pro",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "chatgpt.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: true,
                nextPaymentDate: calculateNextPaymentDate(subMonths(Date.now(), 8))
            }, {
                id: "sketchfab-sub-1",
                serviceProvider: {
                    id: "sketchfab",
                    displayName: "Sketchfab",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "sketchfab.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: null,
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                id: "figma-sub-1",
                serviceProvider: {
                    id: "figma",
                    displayName: "Figma",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "figma.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: null,
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                id: "coupang-sub-1",
                serviceProvider: {
                    id: "coupang",
                    displayName: "쿠팡",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "coupang.com"
                },
                registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: null,
                isNotSureIfSubscriptionIsOngoing: false
            },],
            googleAccount: {
                name: "sample_google_account_name_A",
                email: "sample_google_account_A@gmail.com"
            },
        },
        {
            subscriptions: [{
                id: "disney-plus-sub-2",
                serviceProvider: {
                    id: "disney-plus",
                    displayName: "Disney+",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "disneyplus.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: false,
                nextPaymentDate: calculateNextPaymentDate(subMonths(Date.now(), 8))
            }, {
                id: "chatgpt-sub-2",
                serviceProvider: {
                    id: "chatgpt",
                    displayName: "ChatGPT Pro",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "chatgpt.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: true,
                nextPaymentDate: calculateNextPaymentDate(subMonths(Date.now(), 8))
            }, {
                id: "figma-sub-2",
                serviceProvider: {
                    id: "figma",
                    displayName: "Figma",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "figma.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: null,
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                id: "coupang-sub-2",
                serviceProvider: {
                    id: "coupang",
                    displayName: "쿠팡",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "coupang.com"
                },
                registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: null,
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                id: "naver-plus-sub-2",
                serviceProvider: {
                    id: "naver-plus",
                    displayName: "매우 긴 서비스 이름 가나다라마바사아자차카타파하",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "navercorp.vn"
                },
                registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: null,
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                id: "naver-plus-sub-2",
                serviceProvider: {
                    id: "naver-plus",
                    displayName: "매우 긴 서비스 이름 가나다라마바사아자차카타파하",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "navercorp.vn"
                },
                registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: null,
                isNotSureIfSubscriptionIsOngoing: false
            }],
            googleAccount: {
                name: "sample_google_account_name_B",
                email: "sample_google_account_B@gmail.com"
            },
        }
        ]
}