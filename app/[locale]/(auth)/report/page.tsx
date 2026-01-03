import {getTranslations} from "next-intl/server";
import {Suspense} from "react";
import {Section} from "@/components/ui/section";
import {Container} from "@/components/ui/container";
import {subMonths} from "date-fns";
import {SubscriptionReportSchema} from "@/lib/dto/dto";
import {getReport} from "@/lib/api";
import {redirect} from 'next/navigation'
import {DefaultLayout} from "@/templates/DefaultLayout";
import SubscriptionReport from "@/app/[locale]/(auth)/report/SubscriptionReport";
import ErrorPage from "@/components/shared/ErrorPage";


type Props = {
    params: Promise<{ locale: string }>;
};

const AnalysisReportPage = async ({params}: Props) => {

    // const appUser : Promise<SubscriptionReport> = await getAppUser()

    const t = await getTranslations("report");

    const response = await getReport()

    if (response.status === 401) {
        redirect(`/login`)
    }
    if (response.status === 204) {
        redirect(`/report/new`)
    }

    if (response.error) {
        return <ErrorPage status={response.status} pageTitle={t("title")}/>
    }

    const report = SubscriptionReportSchema.parse(response.data)

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
                        <SubscriptionReport subscriptionReport={report}/>
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
                    displayName: "Netflix",
                    websiteUrl: "https://www.netflix.com/browse",
                    canAnalyzePayment: true,
                    logoDevSuffix: "netflix.com"
                },
                //registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                paidSince: subMonths(Date.now(), 7),
                isNotSureIfPaymentIsOngoing: false
            }, {
                serviceProvider: {
                    displayName: "네이버플러스 멤버십",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    canAnalyzePayment: true,
                    logoDevSuffix: "navercorp.vn"
                },
                //registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                paidSince: subMonths(Date.now(), 8),
                isNotSureIfPaymentIsOngoing: false
            }, {
                serviceProvider: {
                    displayName: "Disney+",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    canAnalyzePayment: true,
                    logoDevSuffix: "disneyplus.com"
                },
                //registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                paidSince: subMonths(Date.now(), 8),
                isNotSureIfPaymentIsOngoing: false
            }, {
                serviceProvider: {
                    displayName: "왓챠",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    canAnalyzePayment: true,
                    logoDevSuffix: "watcha.com"
                },
                //registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                paidSince: subMonths(Date.now(), 8),
                isNotSureIfPaymentIsOngoing: true
            }, {
                serviceProvider: {
                    displayName: "티빙",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    canAnalyzePayment: false,
                    logoDevSuffix: "tving.com"

                },
                //registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                paidSince: null,
                isNotSureIfPaymentIsOngoing: false
            }, {
                serviceProvider: {
                    displayName: "ChatGPT Pro",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    canAnalyzePayment: true,
                    logoDevSuffix: "chatgpt.com"
                },
                //registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                paidSince: subMonths(Date.now(), 8),
                isNotSureIfPaymentIsOngoing: true
            }, {
                serviceProvider: {
                    displayName: "Sketchfab",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    canAnalyzePayment: true,
                    logoDevSuffix: "sketchfab.com"
                },
                //registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                paidSince: null,
                isNotSureIfPaymentIsOngoing: false
            }, {
                serviceProvider: {
                    displayName: "Figma",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    canAnalyzePayment: true,
                    logoDevSuffix: "figma.com"
                },
                //registeredSince: subMonths(Date.now(), 12),
                hasSubscribedNewsletterOrAd: false,
                paidSince: null,
                isNotSureIfPaymentIsOngoing: false
            }, {
                serviceProvider: {
                    displayName: "쿠팡",
                    websiteUrl: "https://nid.naver.com/membership/join",
                    canAnalyzePayment: true,
                    logoDevSuffix: "coupang.com"
                },
                //registeredSince: subMonths(Date.now(), 8),
                hasSubscribedNewsletterOrAd: false,
                paidSince: null,
                isNotSureIfPaymentIsOngoing: false
            },],
            googleAccount: {
                name: "현",
                email: "hyeon.expression@gmail.com"
            },
        },
            // {
            //     subscriptions: [{
            //         serviceProvider: {
            //             displayName: "Disney+",
            //             websiteUrl: "https://nid.naver.com/membership/join",
            //             canAnalyzePayment: true,
            // logoDevSuffix: "disneyplus.com"
            //         },
            //         //registeredSince: subMonths(Date.now(), 12),
            //         hasSubscribedNewsletterOrAd: false,
            //         paidSince: subMonths(Date.now(), 8),
            //         isNotSureIfPaymentIsOngoing: false
            //     }, {
            //         serviceProvider: {
            //             displayName: "왓챠",
            //             websiteUrl: "https://nid.naver.com/membership/join",
            //             canAnalyzePayment: true,
            // logoDevSuffix: "watcha.com"
            //         },
            //         //registeredSince: subMonths(Date.now(), 12),
            //         hasSubscribedNewsletterOrAd: false,
            //         paidSince: subMonths(Date.now(), 8),
            //         isNotSureIfPaymentIsOngoing: true
            //     }, {
            //         serviceProvider: {
            //             displayName: "티빙",
            //             websiteUrl: "https://nid.naver.com/membership/join",
            //             canAnalyzePayment: false,
            // logoDevSuffix: "tving.com"
            //         },
            //         //registeredSince: subMonths(Date.now(), 12),
            //         hasSubscribedNewsletterOrAd: false,
            //         paidSince: null,
            //         isNotSureIfPaymentIsOngoing: false
            //     }, {
            //         serviceProvider: {
            //             displayName: "ChatGPT Pro",
            //             websiteUrl: "https://nid.naver.com/membership/join",
            //             canAnalyzePayment: true,
            // logoDevSuffix: "chatgpt.com"
            //         },
            //         //registeredSince: subMonths(Date.now(), 12),
            //         hasSubscribedNewsletterOrAd: false,
            //         paidSince: subMonths(Date.now(), 8),
            //         isNotSureIfPaymentIsOngoing: true
            //     }, {
            //         serviceProvider: {
            //             displayName: "Figma",
            //             websiteUrl: "https://nid.naver.com/membership/join",
            //             canAnalyzePayment: true,
            // logoDevSuffix: "figma.com"
            //         },
            //         //registeredSince: subMonths(Date.now(), 12),
            //         hasSubscribedNewsletterOrAd: false,
            //         paidSince: null,
            //         isNotSureIfPaymentIsOngoing: false
            //     }, {
            //         serviceProvider: {
            //             displayName: "쿠팡",
            //             websiteUrl: "https://nid.naver.com/membership/join",
            //             canAnalyzePayment: true,
            // logoDevSuffix: "coupang.com"
            //         },
            //         //registeredSince: subMonths(Date.now(), 8),
            //         hasSubscribedNewsletterOrAd: false,
            //         paidSince: null,
            //         isNotSureIfPaymentIsOngoing: false
            //     }, {
            //         serviceProvider: {
            //             displayName: "매우 긴 서비스 이름 가나다라마바사아자차카타파하",
            //             websiteUrl: "https://nid.naver.com/membership/join",
            //             canAnalyzePayment: true,
            // logoDevSuffix: "navercorp.vn"
            //         },
            //         //registeredSince: subMonths(Date.now(), 8),
            //         hasSubscribedNewsletterOrAd: false,
            //         paidSince: null,
            //         isNotSureIfPaymentIsOngoing: false
            //     }, {
            //         serviceProvider: {
            //             displayName: "매우 긴 서비스 이름 가나다라마바사아자차카타파하",
            //             websiteUrl: "https://nid.naver.com/membership/join",
            //             canAnalyzePayment: true,
            // logoDevSuffix: "navercorp.vn"
            //         },
            //         //registeredSince: subMonths(Date.now(), 8),
            //         hasSubscribedNewsletterOrAd: false,
            //         paidSince: subMonths(Date.now(), 7),
            //         isNotSureIfPaymentIsOngoing: false
            //     }],
            //     googleAccount: {
            //         name: "HYEON",
            //         email: "very long email address abcdefghijkelmopqrstuvwxyz@gmail.com"
            //     },
            // }
        ]
}