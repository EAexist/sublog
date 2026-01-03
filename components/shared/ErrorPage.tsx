import {Suspense} from "react";
import {DefaultLayout} from "@/templates/DefaultLayout";
import {Section} from "@/components/ui/section";
import {Container} from "@/components/ui/container";
import {ErrorEmpty, ErrorEmptyProps} from "@/components/shared/ErrorEmpty";

interface ErrorPageProps extends ErrorEmptyProps {
    title?: string
}

export async function ErrorPage({apiError, title}: ErrorPageProps) {
    return (
        <DefaultLayout>
            <Suspense>
                <Section>
                    <Container>
                        <div className={"flex justify-between items-end pb-4"}>
                            <div className={"flex items-end gap-2"}>
                                <h1 className={"font-semibold text-xl"}>{title}</h1>
                            </div>
                        </div>
                        <ErrorEmpty apiError={apiError}/>
                    </Container>
                </Section>
            </Suspense>
        </DefaultLayout>
    )
}