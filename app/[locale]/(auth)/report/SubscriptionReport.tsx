"use client"

import {Section} from "@/components/ui/section";
import {ReportUpdateEligibility, Subscription, SubscriptionReport as SubscriptionReportType} from "@/lib/dto/dto";
import {differenceInDays} from 'date-fns';
import {Item, ItemActions, ItemContent, ItemTitle} from "@/components/ui/item";
import ReportUpdateButton from "@/app/[locale]/(auth)/report/ReportUpdateButton";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {
    AtSign,
    BadgeCheck,
    BadgeDollarSign,
    BadgeQuestionMark,
    BadgeX,
    Calendar,
    ChevronRight,
    CircleDollarSign,
    CircleUserRound,
    UserCheck
} from "lucide-react";
import {Toggle} from "@/components/ui/toggle"
import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {BrandAvatar} from "@/components/shared/BrandAvatar";
import {UIProvider, useUI} from "@/app/[locale]/(auth)/report/UIContext"

const EmailBadge = ({email}: { email: string }) => {

    const {showEmail} = useUI()

    return (
        showEmail ?
            <Badge variant="secondary" className={"mt-1"}><CircleUserRound
                className={"shrink-0"}/><span className="truncate">{email}</span>
            </Badge> : null)
}

export const ShowEmailToggle = () => {
    const t = useTranslations("report.components.ShowEmailToggle")

    const {showEmail, setShowEmail} = useUI()
    return (
        <Button asChild size={"sm"} variant={"outline"}
                className={"font-light text-sm items-center"}><Toggle
            aria-label="Toggle"
            size="sm"
            variant="outline"
            pressed={showEmail}
            onPressedChange={() => setShowEmail(prev => !prev)}
        >
            <AtSign className={"size-4"} strokeWidth={1.5}/>
            {t('title')}
        </Toggle></Button>)
}

interface SubscriptionReportProps {
    subscriptionReport: SubscriptionReportType
    reportUpdateEligibility: ReportUpdateEligibility
}

const SubscriptionReport = ({subscriptionReport, reportUpdateEligibility}: SubscriptionReportProps) => {

    const t = useTranslations("report")

    const report = subscriptionReport
    const hasMultipleGoogleAccounts = report.accountReports.length > 1

    const googleAccounts = report.accountReports.map(it => it.googleAccount)
    // const googleAccountToClassname = Object.fromEntries(googleAccounts.map((acc, idx) => [acc.email, `bg-chart-${(idx % 5) + 1}`]));
    const subscriptions: SubscriptionItemProps[] = report.accountReports.flatMap((report) =>
        report.subscriptions.map((sub) => ({
            ...sub,
            email: report.googleAccount.email
            // accountAvatarProps: {
            //     bgClassName: googleAccountToClassname[report.googleAccount.email],
            //     name: report.googleAccount.name
            // }
        })))

    const subscribedServices = subscriptions.filter(it => (it.subscribedSince !== null) && !it.isNotSureIfSubscriptionIsOngoing).sort((a, b) => a.subscribedSince?.getTime() - b.subscribedSince?.getTime())
    const notSureServices = subscriptions.filter(it => (it.subscribedSince !== null) && it.isNotSureIfSubscriptionIsOngoing)
    const cannotAnalyzeServices = subscriptions.filter(it => !it.serviceProvider.canAnalyzeSubscription)
    const notSubscribedServices = subscriptions.filter(it => (it.subscribedSince == null) && it.serviceProvider.canAnalyzeSubscription)

    console.log(`subscriptions: ${subscriptions.length}`)
    console.log(`subscribedServices: ${subscribedServices.length}`)
    console.log(`notSubscribedServices: ${notSubscribedServices.length}`)

    return (
        <>
            <UIProvider>
                <div className={"pb-10"}>
                    <ButtonGroup>{
                        hasMultipleGoogleAccounts &&
                        <ButtonGroup>
                            <ShowEmailToggle/>
                        </ButtonGroup>
                    }
                        <ButtonGroup>
                            <ReportUpdateButton reportUpdateEligibility={reportUpdateEligibility}/>
                        </ButtonGroup>
                    </ButtonGroup>
                </div>
                <Section className={"pb-10"}>
                    <div className="flex items-center gap-2 pb-4">
                        <BadgeDollarSign strokeWidth={1.5} className="size-5"/>
                        <h2 className="font-regular text-base">구독 중</h2>
                    </div>
                    <ul className={"flex flex-col gap-2"}>
                        {
                            subscribedServices.map((subscriptionProps, index) =>
                                <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                    <SubscribedServiceProviderItem
                                        {...subscriptionProps}/>
                                </li>)
                        }
                    </ul>
                </Section>
                {
                    notSureServices.length > 0 &&
                    <Section className={"pb-10"}>
                        <div className="flex items-center gap-2 pb-4">
                            <BadgeQuestionMark strokeWidth={1.5} className="size-5"/>
                            <h2 className="font-regular text-base">구독을 유지 중인지 확실하지 않아요</h2>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {
                                notSureServices.map((subscriptionProps, index) =>
                                    <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                        <SubscribedServiceProviderItem
                                            {...subscriptionProps}/>
                                    </li>)
                            }
                        </ul>
                    </Section>
                }
                {
                    cannotAnalyzeServices.length > 0 &&
                    <Section className={"pb-10"}>
                        <div className="flex items-center gap-2 pb-4">
                            <BadgeX strokeWidth={1.5} className="size-5"/>
                            <h2 className="font-regular text-base">구독 여부를 확인할 수 없어요</h2>
                        </div>
                        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {
                                cannotAnalyzeServices.map((subscriptionProps, index) =>
                                    <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                        <ServiceProviderItem {...subscriptionProps}/>
                                    </li>)
                            }
                        </ul>
                    </Section>
                }
                {
                    notSubscribedServices.length > 0 &&
                    <Section className={"pb-10"}>
                        <div className="flex items-center gap-2 pb-4">
                            <BadgeCheck strokeWidth={1.5} className="size-5"/>
                            <h2 className="font-regular text-base">가입만 한 서비스</h2>
                        </div>
                        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {
                                notSubscribedServices.map((subscriptionProps, index) =>
                                    <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                        <ServiceProviderItem {...subscriptionProps}/></li>)
                            }
                        </ul>
                    </Section>
                }</UIProvider></>
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

    const paidMonths = getMonthsPassed(subscribedSince)

    return <Item asChild variant={"outline"}><Link
        href={serviceProvider.subscriptionPageUrl ?? serviceProvider.websiteUrl ?? "#"} target="_blank"
        rel="noopener noreferrer">
        <ItemContent className={"min-w-0"}>
            <ItemTitle className={"w-full"}>
                <BrandAvatar serviceProvider={serviceProvider}/>
                <h2 className={"text-lg font-semibold truncate"}>{serviceProvider.displayName}</h2>
            </ItemTitle>
            <div className={"flex gap-2 mt-1"}>
                {
                    !isNotSureIfSubscriptionIsOngoing &&
                    <Badge>
                        {`${paidMonths}개월`}
                    </Badge>
                }
                <Badge variant="outline">
                    <CircleDollarSign strokeWidth={1.5}/>
                    {subscribedSince?.toLocaleDateString()}
                </Badge>
                <Badge variant="outline">
                    <UserCheck strokeWidth={1.5}/>
                    {registeredSince?.toLocaleDateString()}
                </Badge>
            </div>
            <EmailBadge email={email}/>
        </ItemContent>
        <ItemActions>
            <ChevronRight className={"size-5"}/>
            {/*<Badge variant="outline" size="sm">*/}
            {/*    구독 중*/}
            {/*</Badge>*/}
        </ItemActions>
    </Link>
    </Item>
}
const ServiceProviderItem = ({serviceProvider, registeredSince, subscribedSince, email}: SubscriptionItemProps) => {

    return <Item variant={"outline"} className={"p-3"} asChild><Link
        href={serviceProvider.subscriptionPageUrl ?? serviceProvider.websiteUrl ?? "#"} target="_blank"
        rel="noopener noreferrer">
        <ItemContent className={"min-w-0"}>
            <ItemTitle className={"w-full"}>
                <BrandAvatar serviceProvider={serviceProvider}/>
                <h3 className={"text-base font-medium truncate"}>{serviceProvider.displayName}</h3>
            </ItemTitle>
            <div className={"flex gap-2 mt-1"}>
                {
                    subscribedSince &&
                    <Badge variant="outline">
                        <Calendar strokeWidth={1.5}/>
                        {subscribedSince?.toLocaleDateString()}
                    </Badge>
                }
                {
                    registeredSince &&
                    <Badge variant="outline">
                        <UserCheck strokeWidth={1.5}/>
                        {registeredSince.toLocaleDateString()}
                    </Badge>
                }
            </div>
            <EmailBadge email={email}/>
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
