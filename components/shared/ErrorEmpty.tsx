"use client"

import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {CircleSlash} from "lucide-react";

import http from 'http';
import {Item} from "@/components/ui/item";
import {useTranslations} from "next-intl";
import {PropsWithChildren} from "react";

export interface ErrorEmptyProps extends PropsWithChildren {
    status?: number
}

export function ErrorEmpty({status, children}: ErrorEmptyProps) {
    const t = useTranslations("components.ErrorEmpty")

    const statusText = status ? `${status} ${http.STATUS_CODES[status] || 'Unknown Error'}` : 'Unknown Error'
    return (
        <Item variant={"outline"}>
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
                    {children}
                </EmptyContent>
            </Empty>
        </Item>
    )
}