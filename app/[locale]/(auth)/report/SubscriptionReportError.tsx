import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {Button} from "@/components/ui/button";
import {CircleSlash} from "lucide-react";
import {getTranslations} from "next-intl/server";
import Link from "next/link";
// import * as http from "node:http";
import http from 'http';

interface SubscriptionReportErrorProps {
    error: string;
    status: number
}

export async function SubscriptionReportError({error, status}: SubscriptionReportErrorProps) {
    const t = await getTranslations("report.SubscriptionReportError")

    const statusText = `${status} ${http.STATUS_CODES[status] || 'Unknown Error'}`;
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <CircleSlash/>
                </EmptyMedia>
                <EmptyTitle><h1>{statusText}</h1></EmptyTitle>
                <EmptyDescription>
                    <p className="whitespace-pre-line">
                        {
                            t("description")
                        }</p>
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <div className="flex gap-2">
                    {/*<Button>{t("homeNavigateButton")}</Button>*/}
                    <Button variant="outline">
                        <Link href={"/"}>{t("homeNavigateButton")}</Link></Button>
                </div>
            </EmptyContent>
        </Empty>
    )
}