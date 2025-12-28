import {Button} from "@/components/ui/button";
import {addHours, differenceInMilliseconds} from "date-fns";
import {RefreshCcw, Timer} from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import {useTranslations} from "next-intl";


interface ReRunMenuButtonProps {
    analyzedAt: Date,
}

const getCeiledDays = (ms: number) => {
    const DAY_IN_MS = 86400000;
    return Math.ceil(ms / DAY_IN_MS);
};

function getIsEnabledAfterMilliseconds(analyzedAt: Date) {
    const thresholdHours = Number(process.env.NEXT_PUBLIC_RETRY_AFTER_INTERVAL_HOURS ?? 24)
    return differenceInMilliseconds(addHours(analyzedAt, thresholdHours), (new Date()))
}


const ReRunMenuButton = ({analyzedAt}: ReRunMenuButtonProps) => {
    const rtf = new Intl.RelativeTimeFormat('ko', {numeric: 'always'});

    const enabledAfterMilliseconds = getIsEnabledAfterMilliseconds(analyzedAt)
    const enabledAfterString = rtf.format(getCeiledDays(enabledAfterMilliseconds), 'day')
    const isReRunEnabled = enabledAfterMilliseconds <= 0

    const t = useTranslations(`report.ReRunMenuButton.${isReRunEnabled ? "enabled" : "disabled"}`);


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}
                        size={"sm"}
                        className={"font-light text-sm items-center"}>
                    {
                        isReRunEnabled ?
                            <RefreshCcw className={"size-4"} strokeWidth={1.5}/> :
                            <Timer className={"size-4"} strokeWidth={1.5}/>
                    }{`${analyzedAt.toLocaleDateString()} 기준`}
                </Button>
            </DialogTrigger>
            <DialogContent className="z-100 [&>button]:hidden">
                <DialogHeader className={"text-start"}>
                    <DialogTitle>{`${t("title")}`}</DialogTitle>
                    <DialogDescription>
                        {`${analyzedAt.toLocaleDateString()} ${t("analyzedAt")}`}
                    </DialogDescription>
                </DialogHeader>
                {/*<div>*/}
                {/*    <p className={"text-center"}>*/}
                {/*        {`${t("analyzedAt")}: ${analyzedAt.toLocaleDateString()} `}*/}
                {/*    </p>*/}
                {/*</div>*/}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>{t("cancel")}</Button>
                    </DialogClose>{
                    isReRunEnabled ?
                        <Button variant={"outline"} size={"lg"} asChild>
                            <Link href={"/analysis"} className={"flex gap-2 items-center"}>
                                {t("run")}</Link></Button> :
                        <Button disabled variant={"outline"} size={"lg"}>
                            <Timer/>
                            {`${enabledAfterString}${t("enabledAfter")}`}</Button>
                }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReRunMenuButton