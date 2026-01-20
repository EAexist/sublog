import SubscriptionReport from "@/app/[locale]/(auth)/report/SubscriptionReport";
import ErrorPage from "@/components/shared/ErrorPage";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getReport, getUpdateEligibility } from "@/lib/api";
import { ReportUpdateEligibilitySchema, SubscriptionReportSchema } from "@/lib/dto/dto";
import { DefaultLayout } from "@/templates/DefaultLayout";
import { subMonths } from "date-fns";
import { getTranslations } from "next-intl/server";
import { redirect } from 'next/navigation';
import { Suspense } from "react";


type Props = {
    params: Promise<{ locale: string }>;
};

const AnalysisReportPage = async ({ params }: Props) => {

    const t = await getTranslations("report");

    const response = await getReport()

    if (response.status === 204) {
        redirect(`/report/new`)
    }
    if (response.error) {
        return <ErrorPage status={response.status} pageTitle={t("title")} />
    }

    const report = SubscriptionReportSchema.parse(response.data)

    //     const report = sampleReport

    const updateEligibilityResponse = await getUpdateEligibility()
    if (updateEligibilityResponse.error) {
        return <ErrorPage status={updateEligibilityResponse.status} pageTitle={t("title")} />
    }

    const reportUpdateEligibility = ReportUpdateEligibilitySchema.parse(updateEligibilityResponse.data)

    return (
        <DefaultLayout>
            <Section>
                <Container>
                    <div className={"flex justify-between items-end pb-4"}>
                        <div className={"flex items-end gap-2"}>
                            <h1 className={"font-semibold text-xl"}>{t("title")}</h1>
                        </div>
                    </div>
                    <Suspense>
                        <SubscriptionReport subscriptionReport={report}
                            reportUpdateEligibility={reportUpdateEligibility} />
                    </Suspense>
                </Container>
            </Section>
        </DefaultLayout>
    );
};

export default AnalysisReportPage;

const sampleReport = {
    analyzedAt: (new Date()),
    accountReports:
        [{
            subscriptions: [{
                serviceProvider: {
                    id: "fakeId",
                    displayName: "Netflix",
                    websiteUrl: "https://www.netflix.com/browse",
                    subscriptionPageUrl: "https://www.netflix.com/browse",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "netflix.com"
                },
                registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 7),
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                serviceProvider: {
                    id: "fakeId",
                    displayName: "네이버플러스 멤버십",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "navercorp.vn"
                },
                registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                serviceProvider: {
                    id: "fakeId",
                    displayName: "Disney+",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "disneyplus.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                serviceProvider: {
                    id: "fakeId",
                    displayName: "왓챠",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "watcha.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: true
            }, {
                serviceProvider: {
                    id: "fakeId",
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
                serviceProvider: {
                    id: "fakeId",
                    displayName: "ChatGPT Pro",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "chatgpt.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: true
            }, {
                serviceProvider: {
                    id: "fakeId",
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
                serviceProvider: {
                    id: "fakeId",
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
                serviceProvider: {
                    id: "fakeId",
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
                name: "현",
                email: "hyeon.expression@gmail.com"
            },
        },
        {
            subscriptions: [{
                serviceProvider: {
                    id: "fakeId",
                    displayName: "Disney+",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "disneyplus.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: false
            }, {
                serviceProvider: {
                    id: "fakeId",
                    displayName: "왓챠",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "watcha.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: true
            }, {
                serviceProvider: {
                    id: "fakeId",
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
                serviceProvider: {
                    id: "fakeId",
                    displayName: "ChatGPT Pro",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "chatgpt.com"
                },
                registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 8),
                isNotSureIfSubscriptionIsOngoing: true
            }, {
                serviceProvider: {
                    id: "fakeId",
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
                serviceProvider: {
                    id: "fakeId",
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
                serviceProvider: {
                    id: "fakeId",
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
                serviceProvider: {
                    id: "fakeId",
                    displayName: "매우 긴 서비스 이름 가나다라마바사아자차카타파하",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    subscriptionPageUrl: "https://nid.naver.com/membership/join",
                    canAnalyzeSubscription: true,
                    logoDevSuffix: "navercorp.vn"
                },
                registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                subscribedSince: subMonths(Date.now(), 7),
                isNotSureIfSubscriptionIsOngoing: false
            }],
            googleAccount: {
                name: "HYEON",
                email: "very long email address abcdefghijkelmopqrstuvwxyz@gmail.com"
            },
        }
        ]
}