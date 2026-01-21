"use client"

import { UIProvider, useUI } from "@/app/[locale]/(auth)/report/UIContext";
import { BrandAvatar } from "@/components/shared/BrandAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item";
import { Section } from "@/components/ui/section";
import { Toggle } from "@/components/ui/toggle";
import { ReportUpdateEligibility, Subscription, SubscriptionReport as SubscriptionReportType } from "@/lib/dto/dto";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { differenceInDays } from 'date-fns';
import { partition } from 'lodash';
import {
    Calendar,
    ChevronRight,
    CircleCheck,
    CircleDollarSign,
    CircleUserRound,
    Eye,
    EyeOff,
    UserCheck
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ReportUpdateButton from "./ReportUpdateButton";

const EmailBadge = ({ email }: { email: string }) => {

    return (
        <Badge variant="secondary"><CircleUserRound
            className={"shrink-0"} /><span className="truncate">{email}</span>
        </Badge>)
}

const ServiceProviderItemEmailBadge = ({ email }: { email: string }) => {

    const { showEmail } = useUI()

    return (
        showEmail ?
            <Badge variant="secondary"><CircleUserRound
                className={"shrink-0"} /><span className="truncate">{email}</span>
            </Badge> : null)
}

export const ShowEmailToggle = () => {
    const t = useTranslations("report.components.ShowEmailToggle")

    const { showEmail, setShowEmail } = useUI()
    return (
        <Button variant={"outline"} asChild
            className={"font-light text-sm"} size={"sm"}>
            <Toggle
                aria-label="Toggle"
                size="sm"
                pressed={showEmail}
                onPressedChange={() => setShowEmail(prev => !prev)}
            >{
                    showEmail ?
                        <>
                            <Eye className={"w-10 h-10"} strokeWidth={1.5} />
                            {t('hide')}</>
                        :
                        <>
                            <EyeOff className={"w-10 h-10"} strokeWidth={1.5} />
                            {t('show')}
                        </>
                }
            </Toggle>
        </Button>
    )
}

interface SubscriptionReportProps {
    subscriptionReport: SubscriptionReportType
    reportUpdateEligibility: ReportUpdateEligibility
}

const SubscriptionReport = ({ subscriptionReport, reportUpdateEligibility }: SubscriptionReportProps) => {

    const t = useTranslations("report")

    const report = subscriptionReport
    const hasMultipleGoogleAccounts = report.accountReports.length > 1

    const googleAccounts = report.accountReports.map(it => it.googleAccount)
    // const googleAccountToClassname = Object.fromEntries(googleAccounts.map((acc, idx) => [acc.email, `bg-chart-${(idx % 5) + 1}`]));
    const subscriptions: SubscriptionItemProps[] = report.accountReports.flatMap((report) =>
        report.subscriptions.filter(sub => sub.registeredSince != null).map((sub) => ({
            ...sub,
            email: report.googleAccount.email
            // accountAvatarProps: {
            //     bgClassName: googleAccountToClassname[report.googleAccount.email],
            //     name: report.googleAccount.name
            // }
        })))

    const [subscribed, unsubscribed] = partition(
        subscriptions,
        it => it.subscribedSince !== null && !it.isNotSureIfSubscriptionIsOngoing
    );

    const subscribedServices = subscribed.sort((a, b) => {
        const timeA = a.subscribedSince?.getTime() ?? 0
        const timeB = b.subscribedSince?.getTime() ?? 0
        return timeA - timeB
    })
    const notSubscribedServices = unsubscribed

    // const notSureServices = subscriptions.filter(it => (it.subscribedSince !== null) && it.isNotSureIfSubscriptionIsOngoing)
    // const cannotAnalyzeServices = subscriptions.filter(it => !it.serviceProvider.canAnalyzeSubscription)

    console.log(`subscriptions: ${subscriptions.length}`)
    console.log(`subscribedServices: ${subscribedServices.length}`)
    console.log(`notSubscribedServices: ${notSubscribedServices.length}`)

    return (
        <UIProvider showEmail={false}>
            <div className={"pb-8"}>
                <ButtonGroup>
                    <ReportUpdateButton reportUpdateEligibility={reportUpdateEligibility} />
                    <ShowEmailToggle />
                </ButtonGroup>
                {/* <div className="flex flex-wrap gap-1 py-4">
                    {
                        googleAccounts.map(it => <EmailBadge key={it.email} email={it.email} />)
                    }
                </div> */}
            </div>
            <Section className={"pb-10"}>
                <div className="flex items-center gap-2 pb-4">
                    <h2 className="font-regular text-base">구독 중</h2>
                    <CircleDollarSign strokeWidth={1} className="size-5" />
                </div>
                <ul className={"flex flex-col gap-2"}>
                    {
                        subscribedServices.map((subscriptionProps, index) =>
                            <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                <SubscribedServiceProviderItem
                                    {...subscriptionProps} />
                            </li>)
                    }
                </ul>
            </Section>
            {/* {
                notSureServices.length > 0 &&
                <Section className={"pb-10"}>
                    <div className="flex items-center gap-2 pb-4">
                        <h2 className="font-regular text-base">구독을 유지 중인지 확실하지 않아요</h2>
                        <CircleQuestionMark strokeWidth={1.5} className="size-5" />
                    </div>
                    <ul className="flex flex-col gap-2">
                        {
                            notSureServices.map((subscriptionProps, index) =>
                                <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                    <SubscribedServiceProviderItem
                                        {...subscriptionProps} />
                                </li>)
                        }
                    </ul>
                </Section>
            }
            {
                cannotAnalyzeServices.length > 0 &&
                <Section className={"pb-10"}>
                    <div className="flex items-center gap-2 pb-4">
                        <h2 className="font-regular text-base">구독 여부를 확인할 수 없어요</h2>
                        <CircleX strokeWidth={1} className="size-5" />
                    </div>
                    <ul className="flex flex-col gap-2">
                        {
                            cannotAnalyzeServices.map((subscriptionProps, index) =>
                                <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                    <ServiceProviderItem {...subscriptionProps} />
                                </li>)
                        }
                    </ul>
                </Section>
            } */}
            {
                notSubscribedServices.length > 0 &&
                <Section className={"pb-10"}>
                    <div className="flex items-center gap-2 pb-4">
                        <h2 className="font-regular text-base">가입만 한 서비스</h2>
                        <CircleCheck strokeWidth={1} className="size-5" />
                    </div>
                    <ul className="flex flex-col gap-2">
                        {
                            notSubscribedServices.map((subscriptionProps, index) =>
                                <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                    <ServiceProviderItem {...subscriptionProps} /></li>)
                        }
                    </ul>
                </Section>
            }</UIProvider>
    );
};

interface SubscriptionItemProps extends Subscription {
    email: string
}

const SubscribedServiceProviderItem = ({
    subscribedSince,
    isNotSureIfSubscriptionIsOngoing,
    registeredSince,
    serviceProvider,
    email
}: SubscriptionItemProps) => {

    const paidMonths = subscribedSince ? getMonthsPassed(subscribedSince) : null

    return <Item asChild variant={"outline"}><Link
        href={(serviceProvider.subscriptionPageUrl || serviceProvider.websiteUrl) ? ensureAbsoluteUrl(serviceProvider.subscriptionPageUrl ?? serviceProvider.websiteUrl) : "#"} target="_blank"
        rel="noopener noreferrer">
        <ItemContent className={"min-w-0"}>
            <ItemTitle className={"w-full"}>
                <BrandAvatar serviceProvider={serviceProvider} />
                <h2 className={"text-lg font-semibold truncate"}>{serviceProvider.displayName}</h2>
            </ItemTitle>
            <div className={"flex flex-col gap-2 mt-1"}>
                <div className={"flex gap-2"}>
                    {
                        !isNotSureIfSubscriptionIsOngoing &&
                        <Badge>
                            {`${paidMonths}개월`}
                        </Badge>
                    }
                    <Badge variant="outline">
                        <CircleDollarSign strokeWidth={1.5} />
                        {subscribedSince?.toLocaleDateString()}
                    </Badge>
                    <Badge variant="outline">
                        <UserCheck strokeWidth={1.5} />
                        {registeredSince?.toLocaleDateString()}
                    </Badge>
                </div>
                <ServiceProviderItemEmailBadge email={email} />
            </div>
        </ItemContent>
        <ItemActions>
            <ChevronRight className={"size-5"} />
            {/*<Badge variant="outline" size="sm">*/}
            {/*    구독 중*/}
            {/*</Badge>*/}
        </ItemActions>
    </Link>
    </Item>
}
const ServiceProviderItem = ({ serviceProvider, registeredSince, subscribedSince, email }: SubscriptionItemProps) => {

    return <Item variant={"outline"} className={"p-3"} asChild><Link
        href={(serviceProvider.subscriptionPageUrl || serviceProvider.websiteUrl) ? ensureAbsoluteUrl(serviceProvider.subscriptionPageUrl ?? serviceProvider.websiteUrl) : "#"} target="_blank"
        rel="noopener noreferrer">
        <ItemContent className={"min-w-0"}>
            <ItemTitle className={"w-full"}>
                <BrandAvatar serviceProvider={serviceProvider} />
                <h3 className={"text-base font-medium truncate"}>{serviceProvider.displayName}</h3>
            </ItemTitle>
            <div className={"flex flex-wrap gap-2 mt-1"}>
                {
                    subscribedSince &&
                    <Badge variant="outline">
                        <Calendar strokeWidth={1.5} />
                        {subscribedSince?.toLocaleDateString()}
                    </Badge>
                }
                {
                    registeredSince &&
                    <Badge variant="outline">
                        <UserCheck strokeWidth={1.5} />
                        {registeredSince.toLocaleDateString()}
                    </Badge>
                }
                <ServiceProviderItemEmailBadge email={email} />
            </div>
        </ItemContent>
        <ItemActions>
            {/*<ChevronRight className={"size-5"}/>*/}
        </ItemActions></Link>
    </Item>
}

const getMonthsPassed = (start: Date): number => {
    const days = differenceInDays(Date.now(), start);
    return Math.ceil(days / 30); // Using 30 as the standard month divisor
};

export default SubscriptionReport;
