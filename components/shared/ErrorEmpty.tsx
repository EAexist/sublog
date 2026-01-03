import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {Button} from "@/components/ui/button";
import {CircleSlash} from "lucide-react";
import {getTranslations} from "next-intl/server";
import Link from "next/link";

import http from 'http';
import {Item} from "@/components/ui/item";
import {PropsWithChildren} from "react";
import {ApiError} from "@/lib/api";

export interface ErrorEmptyProps extends PropsWithChildren {
    apiError: ApiError
}

export async function ErrorEmpty({apiError: {status}}: ErrorEmptyProps) {
    const t = await getTranslations("components.ErrorEmpty")

    const statusText = `${status} ${http.STATUS_CODES[status] || 'Unknown Error'}`;
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
                    <div className="flex gap-2">
                        {/*<Button>{t("homeNavigateButton")}</Button>*/}
                        <Button variant="outline">
                            <Link href={"/"}>{t("homeNavigateButton")}</Link></Button>
                    </div>
                </EmptyContent>
            </Empty>
        </Item>
    )
}