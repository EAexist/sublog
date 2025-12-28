"use client"

import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState} from 'react';

import {Section} from "@/components/ui/section";
import {SubscriptionReportType, SubscriptionType} from "@/lib/dto/dto";
import {differenceInDays} from 'date-fns';
import {Item, ItemActions, ItemContent, ItemTitle} from "@/components/ui/item";
import ReRunMenuButton from "@/app/[locale]/(auth)/report/ReReunMenuButton";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {AtSign, Calendar, ChevronRight, CircleUserRound} from "lucide-react";
import {Toggle} from "@/components/ui/toggle"
import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {BrandAvatar} from "@/components/shared/BrandAvatar";

interface UIContextType {
    showEmail: boolean;
    setShowEmail: Dispatch<SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextType>({
    showEmail: false, setShowEmail: () => {
    }
})

const UIProvider = ({children}: PropsWithChildren) => {
    const [showEmail, setShowEmail] = useState(false)
    return <UIContext.Provider value={{showEmail, setShowEmail}}>{children}</UIContext.Provider>
}
const useUI: () => UIContextType = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};

const EmailBadge = ({email}: { email: string }) => {

    const {showEmail} = useUI()

    return (
        showEmail ?
            <Badge variant="secondary" className={"mt-1"}><CircleUserRound
                className={"shrink-0"}/><span className="truncate">{email}</span>
            </Badge> : null)
}

const ShowEmailToggle = () => {
    const t = useTranslations("report.ShowEmailToggle")

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
}

const SubscriptionReport = ({subscriptionReport}: SubscriptionReportProps) => {

    const t = useTranslations("report")

    const report = subscriptionReport
    const hasMultipleGooleAccounts = report.accountReports.length > 1

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

    const paidSubscriptions = subscriptions.filter(it => (it.paidSince !== null) && !it.isNotSureIfPaymentIsOngoing).sort((a, b) => a.paidSince.getTime() - b.paidSince.getTime())
    const notSureSubscriptions = subscriptions.filter(it => (it.paidSince !== null) && it.isNotSureIfPaymentIsOngoing)
    const cannotAnalyzeSubscriptions = subscriptions.filter(it => !it.serviceProvider.canAnalyzePayment)
    const notPaidSubscriptions = subscriptions.filter(it => (it.paidSince == null) && it.serviceProvider.canAnalyzePayment)

    return (
        <>
            <UIProvider>
                <div className={"h-14"}/>
                <div className={"flex justify-between items-end pb-4"}>
                    <div className={"flex items-end gap-2"}>
                        <h1 className={"font-semibold text-xl"}>내 구독</h1>
                        {/*<p className={"font-light text-xs"}>{`${report.analyzedAt.toLocaleDateString()} 기준`}</p>*/}
                    </div>
                </div>
                <div className={"pb-8"}>
                    <ButtonGroup>{
                        hasMultipleGooleAccounts &&
                        <ButtonGroup>
                            <ShowEmailToggle/>
                        </ButtonGroup>
                    }
                        <ButtonGroup>
                            <ReRunMenuButton analyzedAt={report.analyzedAt}/>
                        </ButtonGroup>
                    </ButtonGroup>
                </div>
                <Section className={"pb-8"}>
                    <h2 className={"font-regular text-base pb-4 px-1"}>구독 중</h2>
                    <ul className={"flex flex-col gap-2"}>
                        {
                            paidSubscriptions.map((subscriptionProps, index) =>
                                <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                    <PaidSubscriptionItem
                                        {...subscriptionProps}/>
                                </li>)
                        }
                    </ul>
                </Section>
                {
                    notSureSubscriptions.length > 0 &&
                    <Section className={"pb-8"}>
                        <h2 className={"font-regular text-base pb-4 px-1"}>구독을 유지 중인지 확실하지 않아요</h2>
                        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {
                                notSureSubscriptions.map((subscriptionProps, index) =>
                                    <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                        <SubscriptionItem
                                            {...subscriptionProps}/>
                                    </li>)
                            }
                        </ul>
                    </Section>
                }
                {
                    notSureSubscriptions.length > 0 &&
                    <Section className={"pb-8"}>
                        <h2 className={"font-regular text-base pb-4 px-1"}>구독 여부를 확인할 수 없어요</h2>
                        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {
                                cannotAnalyzeSubscriptions.map((subscriptionProps, index) =>
                                    <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                        <SubscriptionItem {...subscriptionProps}/>
                                    </li>)
                            }
                        </ul>
                    </Section>
                }
                {
                    notPaidSubscriptions.length > 0 &&
                    <Section className={"pb-8"}>
                        <h2 className={"font-regular text-base pb-4 px-1"}>가입만 한 서비스</h2>
                        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {
                                notPaidSubscriptions.map((subscriptionProps, index) =>
                                    <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                        <SubscriptionItem {...subscriptionProps}/></li>)
                            }
                        </ul>
                    </Section>
                }</UIProvider></>
    );
};

interface SubscriptionItemProps extends SubscriptionType {
    email: string
}


const PaidSubscriptionItem = ({paidSince, serviceProvider, email}: SubscriptionItemProps) => {

    const paidMonths = getMonthsPassed(paidSince)

    return <Item asChild variant={"outline"}><Link
        href={serviceProvider.websiteUrl ?? "#"} target="_blank"
        rel="noopener noreferrer">
        <ItemContent className={"min-w-0"}>
            <ItemTitle className={"w-full"}>
                <BrandAvatar serviceProvider={serviceProvider}/>
                <h2 className={"text-lg font-semibold truncate"}>{serviceProvider.displayName}</h2>
            </ItemTitle>
            <div className={"flex gap-2 mt-1"}>
                <Badge>
                    {`${paidMonths}개월`}
                </Badge>
                <Badge variant="secondary">
                    <Calendar strokeWidth={1.5}/>
                    {paidSince.toLocaleDateString()}
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
const SubscriptionItem = ({serviceProvider, paidSince, email}: SubscriptionItemProps) => {

    return <Item variant={"outline"} className={"p-3"} asChild><Link
        href={serviceProvider.websiteUrl ?? "#"} target="_blank"
        rel="noopener noreferrer">
        <ItemContent className={"min-w-0"}>
            <ItemTitle className={"w-full"}>
                <BrandAvatar serviceProvider={serviceProvider}/>
                <h3 className={"text-base font-medium truncate"}>{serviceProvider.displayName}</h3>
            </ItemTitle>
            {
                paidSince &&
                <Badge variant="secondary">
                    <Calendar strokeWidth={1.5}/>
                    {paidSince.toLocaleDateString()}
                </Badge>
            }
            <EmailBadge email={email}/>
        </ItemContent>
        <ItemActions>
            {/*<ChevronRight className={"size-4"}/>*/}
            {/*<Badge variant="outline" size="sm">*/}
            {/*    구독 중*/}
            {/*</Badge>*/}
        </ItemActions></Link>
    </Item>
}

// 구독 시작: {subscription.paidSince?.toLocaleDateString()}
// subscription.serviceProvider.websiteUrl ?? "#"

const NotSureSubscriptionItem = ({subscription}: {
    subscription: SubscriptionType,
}) => {

    return <SubscriptionItem subscription={subscription}
    />
}

const CannotAnalyzeSubscriptionItem = ({subscription}: {
    subscription: SubscriptionType,
}) => {

    return <SubscriptionItem subscription={subscription}
        // description={
        //     subscription.registeredSince && `가입: ${subscription.registeredSince.toLocaleDateString()}`
        // }
    />
}

const NotPaidSubscriptionItem = ({subscription,}: {
    subscription: SubscriptionType,
}) => {

    return <SubscriptionItem subscription={subscription}
        // description={
        //     subscription.registeredSince && `가입: ${subscription.registeredSince.toLocaleDateString()}`
        // }
    />
}

const getMonthsPassed = (start: Date): number => {
    const days = differenceInDays(Date.now(), start);
    return Math.ceil(days / 30); // Using 30 as the standard month divisor
};


export default SubscriptionReport;
