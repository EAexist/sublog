"use client";

import {Suspense} from "react";
import {DefaultLayout} from "@/templates/DefaultLayout";
import {Section} from "@/components/ui/section";
import {Container} from "@/components/ui/container";
import {ErrorEmpty, ErrorEmptyProps} from "@/components/shared/ErrorEmpty";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export interface ErrorPageProps extends ErrorEmptyProps {
    pageTitle?: string,
}

export default function ErrorPage({
                                      status, children, pageTitle
                                  }: ErrorPageProps) {
    const router = useRouter();

    const handleBack = () => {
        const hasPreviousPage = document.referrer.indexOf(window.location.host) !== -1;

        if (hasPreviousPage) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <DefaultLayout>
            <Suspense>
                <Section>
                    <Container>
                        {
                            pageTitle &&
                            <div className={"flex justify-between items-end pb-4"}>
                                <div className={"flex items-end gap-2"}>
                                    <h1 className={"font-semibold text-xl"}>{pageTitle}</h1>
                                </div>
                            </div>
                        }
                        <ErrorEmpty status={status}>
                            {
                                children || <Button variant={"outline"} onClick={handleBack}>{"돌아가기"}</Button>
                            }
                        </ErrorEmpty>
                    </Container>
                </Section>
            </Suspense>
        </DefaultLayout>
    )
}