"use client"

import { BrandAvatar } from "@/components/shared/BrandAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Subscription, SubscriptionReport as SubscriptionReportType } from "@/lib/dto/dto";
import { ensureAbsoluteUrl } from "@/lib/utils";
import {
    Check,
    CircleUserRound,
    CreditCard,
    Eye,
    EyeOff,
    Play
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUI } from "./UIContext";

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
    const t = useTranslations("dashboard.components.ShowEmailToggle")

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

interface SubscriptionDashboardProps {
    subscriptionReport: SubscriptionReportType
}

const SubscriptionDashboard = ({ report }: { report: SubscriptionReportType }) => {

    const t = useTranslations("dashboard")

    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null)

    const hasMultipleGoogleAccounts = report.accountReports.length > 1

    const googleAccounts = report.accountReports.map(it => it.googleAccount)
    // const googleAccountToClassname = Object.fromEntries(googleAccounts.map((acc, idx) => [acc.email, `bg-chart-${(idx % 5) + 1}`]));
    const subscriptions: SubscriptionItemProps[] = report.accountReports.flatMap((report) =>
        report.subscriptions.filter(sub => sub.registeredSince != null).map((sub) => ({
            ...sub,
            email: report.googleAccount.email
            // accountAvatarProps: {
            //     bgClassName: googleAccountToClassname[dashboard.googleAccount.email],
            //     name: dashboard.googleAccount.name
            // }
        })))

    const subscribed = subscriptions.filter(it => it.subscribedSince != null)
    const unsubscribed = subscriptions.filter(it => it.subscribedSince == null)
    const subscribedServices = subscribed.sort((a, b) => {
        const timeA = a.subscribedSince?.getTime() ?? 0
        const timeB = b.subscribedSince?.getTime() ?? 0
        return timeA - timeB
    })
    const notSubscribedServices = unsubscribed.sort((a, b) => {
        const timeA = a.registeredSince?.getTime() ?? 0
        const timeB = b.registeredSince?.getTime() ?? 0
        return timeB - timeA
    })

    // Create subscription map for efficient ID-based lookup
    const subscriptionMap = new Map(
        subscriptions.map(sub => [sub.id, sub])
    )

    // const notSureServices = subscriptions.filter(it => (it.subscribedSince !== null) && it.isNotSureIfSubscriptionIsOngoing)
    // const cannotAnalyzeServices = subscriptions.filter(it => !it.serviceProvider.canAnalyzeSubscription)

    useEffect(() => {
        const selectedSubscription = selectedSubscriptionId ? subscriptionMap.get(selectedSubscriptionId) : null;
        console.log(selectedSubscription?.serviceProvider.displayName)
    }, [selectedSubscriptionId])

    const selectedSubscription = selectedSubscriptionId ? subscriptionMap.get(selectedSubscriptionId) : null;

    return (
        <>
            <Drawer
            // open={!!selectedSubscriptionId}
            // onOpenChange={(open) => {
            //     console.log(open)
            //     if (!open) {
            //         // Only clear selection if drawer is closing due to outside click or close button
            //         // Don't clear if we're switching to a new subscription
            //         setTimeout(() => {
            //             if (selectedSubscriptionId) {
            //                 setSelectedSubscriptionId(null);
            //             }
            //         }, 50);
            //     }
            // }}
            >
                {/* <UIProvider showEmail={false}> */}
                {/* <div className={"pb-8"}>
                <ButtonGroup>
                    <ShowEmailToggle />
                </ButtonGroup>
                <div className="flex flex-wrap gap-1 py-4">
                    {
                        googleAccounts.map(it => <EmailBadge key={it.email} email={it.email} />)
                    }
                </div>
            </div> */}
                <Section className={"md:py-8"}>
                    <div className="pb-4">
                        <div className="flex items-center gap-2">
                            <h2 className="font-regular text-base">{t('subscribedServices')}</h2>
                            <span className="font-semibold text-base">
                                {subscribedServices.length > 0 ? subscribedServices.length : '-'}
                            </span>
                        </div>
                    </div>

                    {
                        subscribedServices.length > 0 ?
                            <ul className="grid grid-cols-2 gap-3 w-full">
                                {
                                    subscribedServices.map((subscriptionProps, index) =>
                                        <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`} className="w-full">
                                            <SubscribedServiceProviderItem
                                                {...subscriptionProps} nextPaymentDate={subscriptionProps.nextPaymentDate || undefined} onClick={() => setSelectedSubscriptionId(subscriptionProps.id)} />
                                        </li>)
                                }
                            </ul>
                            :
                            <Empty className="bg-white">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <CreditCard className="h-6 w-6" />
                                    </EmptyMedia>
                                    <EmptyTitle>{t('emptySubscriptions.title')}</EmptyTitle>
                                    {/* <EmptyDescription>{t('emptySubscriptions.description')}</EmptyDescription> */}
                                </EmptyHeader>
                            </Empty>
                    }
                </Section>
                <Separator className="my-6" />
                {
                    notSubscribedServices.length > 0 &&
                    <Section className={"md:py-8"}>
                        <div className="pb-4">
                            <div className="flex items-center gap-2">
                                <h2 className="font-regular text-base">{t('registeredOnlyServices')}</h2>
                                <span className="font-semibold text-base">
                                    {notSubscribedServices.length}
                                </span>
                            </div>
                        </div>
                        <ul className="grid grid-cols-2 gap-3 w-full">
                            {
                                notSubscribedServices.map((subscriptionProps, index) =>
                                    <li key={`${subscriptionProps.serviceProvider.displayName}-${index}`}>
                                        <UnsubscribedServiceProviderItem {...subscriptionProps} nextPaymentDate={subscriptionProps.nextPaymentDate || undefined} onClick={() => setSelectedSubscriptionId(subscriptionProps.id)} /></li>)
                            }
                        </ul>
                    </Section>
                }
                {/* {
                notSureServices.length > 0 &&
                <Section className={"md:py-8"}>
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
                <Section className={"md:py-8"}>
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
                {selectedSubscription && <SubscriptionDrawerContent {...selectedSubscription} />}
                {/* </UIProvider> */}
            </Drawer>
        </>
    );
};

interface SubscriptionItemProps extends Subscription {
    email: string;
    nextPaymentDate?: Date | null;
}

interface SubscriptionDrawerContentProps extends SubscriptionItemProps {
    nextPaymentDate?: Date | null;
}

const SubscriptionDrawerContent = ({
    serviceProvider,
    registeredSince,
    subscribedSince,
    hasSubscribedNewsletterOrAd,
    isNotSureIfSubscriptionIsOngoing,
    nextPaymentDate,
    email
}: SubscriptionDrawerContentProps) => {
    const t = useTranslations("dashboard.components.SubscriptionDrawerContent")
    const paidMonths = subscribedSince ? getMonthsPassed(subscribedSince) : null

    return (
        <DrawerContent>
            <div className="pointer-events-auto mx-auto w-full max-w-md relative">
                <DrawerHeader className="px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <BrandAvatar serviceProvider={serviceProvider} className={"size-12"} />
                            <div>
                                <DrawerTitle className="text-2xl font-semibold text-left">
                                    {serviceProvider.displayName}
                                </DrawerTitle>
                            </div>
                        </div>
                        {/* <DrawerClose asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 rounded-md border-2 hover:bg-muted flex-shrink-0"
                            >
                                <span className="text-sm leading-none">×</span>
                                <span className="sr-only">Close</span>
                            </Button>
                        </DrawerClose> */}
                    </div>
                </DrawerHeader>

                <div className="px-8 pb-4 space-y-4">
                    <div className="space-y-2">
                        {subscribedSince && (
                            <div className="flex items-center gap-2 pb-2">
                                {isNotSureIfSubscriptionIsOngoing ? (
                                    <Badge className="bg-green-100 text-green-800">
                                        <Check className="w-3 h-3 mr-1" />
                                        {t('active')}
                                    </Badge>
                                    // <Badge variant="secondary">
                                    //     <CircleAlert className="w-3 h-3 mr-1" />
                                    //     {t('uncertain')}
                                    // </Badge>
                                ) : (
                                    <Badge className="bg-green-100 text-green-800">
                                        <Check className="w-3 h-3 mr-1" />
                                        {t('active')}
                                    </Badge>
                                )}
                                {hasSubscribedNewsletterOrAd && (
                                    <Badge variant="outline">
                                        {t('newsletterAd')}
                                    </Badge>
                                )}
                            </div>
                        )}
                        {nextPaymentDate && (
                            <>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-muted-foreground">{t('nextPaymentDate')}</span>
                                    <span className="text-sm font-medium">
                                        {formatLocaleDateWithoutYear(nextPaymentDate)}
                                    </span>
                                </div>
                                <Separator />
                            </>
                        )}


                        {subscribedSince && (
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-muted-foreground">{t('subscribed')}</span>
                                <div className="flex items-center gap-2">
                                    {paidMonths && (
                                        <Badge variant="secondary" className="">
                                            {paidMonths} {t('months')}
                                        </Badge>
                                    )}
                                    <span className="text-sm font-medium">
                                        {formatLocaleDate(subscribedSince)}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-muted-foreground">{t('registered')}</span>
                            <span className="text-sm font-medium">
                                {registeredSince ? formatLocaleDate(registeredSince) : ''}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-muted-foreground">{t('registeredEmail')}</span>
                            <span className="text-sm font-medium truncate max-w-[200px]">
                                {email}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {serviceProvider.websiteUrl && (
                            <Button
                                variant="outline"
                                className="h-10 justify-center text-sm font-medium"
                                asChild
                            >
                                <Link
                                    href={ensureAbsoluteUrl(serviceProvider.websiteUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Play className="w-3.5 h-3.5 mr-1.5" />
                                    {t('website')}
                                </Link>
                            </Button>
                        )}
                        {serviceProvider.subscriptionPageUrl && (
                            <Button
                                variant="outline"
                                className="h-10 justify-center text-sm font-medium"
                                asChild
                            >
                                <Link
                                    href={ensureAbsoluteUrl(serviceProvider.subscriptionPageUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                                    {t('unsubscribe')}
                                </Link>
                            </Button>
                        )}
                        {!serviceProvider.websiteUrl && !serviceProvider.subscriptionPageUrl && (
                            <div className="col-span-2 text-center text-sm text-muted-foreground py-2">
                                {t('noExternalLinks')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DrawerContent >
    )
}


interface ServiceProviderItemProps extends SubscriptionItemProps {
    nextPaymentDate?: Date | null;
    onClick?: () => void;
}

const ServiceProviderItem = ({
    serviceProvider,
    nextPaymentDate,
    onClick
}: ServiceProviderItemProps) => {
    const t = useTranslations('dashboard')
    return (
        <DrawerTrigger asChild>
            <Card
                onClick={(e) => {
                    console.log("Clicked")
                    // e.preventDefault(); // Prevent DrawerTrigger's default toggle behavior
                    onClick && onClick(); // Call our custom onClick handler
                }}
                className="cursor-pointer hover:bg-muted/50 transition-colors px-4 py-3 bg-background border-0"
            >
                <CardContent className="p-0">
                    <div className="flex flex-col items-start gap-2 md:flex-row md:min-h-16 md:items-center md:gap-4">
                        <BrandAvatar serviceProvider={serviceProvider} className="size-10 md:size-12" />
                        <div>
                            <h3 className="font-semibold text-lg truncate w-full max-w-[140px] md:max-w-80">
                                {serviceProvider.displayName}
                            </h3>
                            {nextPaymentDate && (
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <CreditCard className="w-3 h-3" />
                                    {formatLocaleDateWithoutYear(nextPaymentDate)}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </DrawerTrigger>
    );
};

const SubscribedServiceProviderItem = ({
    subscribedSince,
    isNotSureIfSubscriptionIsOngoing,
    hasSubscribedNewsletterOrAd,
    registeredSince,
    serviceProvider,
    email,
    id,
    nextPaymentDate,
    onClick
}: SubscriptionItemProps & { nextPaymentDate?: Date; onClick: () => void }) => {
    return (
        <ServiceProviderItem
            id={id}
            serviceProvider={serviceProvider}
            registeredSince={registeredSince}
            subscribedSince={subscribedSince}
            hasSubscribedNewsletterOrAd={hasSubscribedNewsletterOrAd}
            isNotSureIfSubscriptionIsOngoing={isNotSureIfSubscriptionIsOngoing}
            email={email}
            nextPaymentDate={nextPaymentDate}
            onClick={onClick}
        />
    );
};

const UnsubscribedServiceProviderItem = ({ serviceProvider, registeredSince, subscribedSince, hasSubscribedNewsletterOrAd, isNotSureIfSubscriptionIsOngoing, email,
    id, nextPaymentDate, onClick }: SubscriptionItemProps & { nextPaymentDate?: Date; onClick: () => void }) => {
    return (
        <ServiceProviderItem
            id={id}
            serviceProvider={serviceProvider}
            registeredSince={registeredSince}
            subscribedSince={subscribedSince}
            hasSubscribedNewsletterOrAd={hasSubscribedNewsletterOrAd}
            isNotSureIfSubscriptionIsOngoing={isNotSureIfSubscriptionIsOngoing}
            email={email}
            nextPaymentDate={nextPaymentDate}
            onClick={onClick}
        />
    );
};

const getMonthsPassed = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
}

const formatLocaleDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}년 ${month}월 ${day}일`
}

const formatLocaleDateWithoutYear = (date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}월 ${day}일`
}

export default SubscriptionDashboard;
