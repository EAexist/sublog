"use client"

import {CustomError} from "@/lib/error";
import ErrorPage from "@/components/shared/ErrorPage";
import {Button} from "@/components/ui/button";

export interface ErrorProps {
    error: CustomError
    reset: () => void
}

export default function Error({error, reset}: ErrorProps) {

    return (
        <ErrorPage status={error.status} pageTitle={error.pageTitle}>
            <Button variant={"outline"} onClick={reset}>{"확인"}</Button>
        </ErrorPage>
    )
}