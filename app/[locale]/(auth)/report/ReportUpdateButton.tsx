import { AnalyzedAtAlert, AvailableSinceAlert } from "@/app/[locale]/(auth)/report/UpdateEligiblityAlert";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ReportUpdateEligibility } from "@/lib/dto/dto";
import { RefreshCcw, Timer } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";


interface ReportUpdateButtonProps {
    reportUpdateEligibility: ReportUpdateEligibility
}

const ReportUpdateButton = ({ reportUpdateEligibility }: ReportUpdateButtonProps) => {

    const t = useTranslations(`report.components.ReportUpdateButton`);
    const state_t = useTranslations(`report.components.ReportUpdateButton.dialog.${reportUpdateEligibility.canUpdate ? "enabled" : "disabled"}`);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}
                    size={"sm"}
                    className={"font-light text-sm items-center"}>
                    {
                        reportUpdateEligibility.canUpdate ?
                            <RefreshCcw className={"size-4"} strokeWidth={1.5} /> :
                            <Timer className={"size-4"} strokeWidth={1.5} />
                    }{`${reportUpdateEligibility.analyzedAt?.toLocaleDateString()} 기준`}
                </Button>
            </DialogTrigger>
            <DialogContent className="z-100 [&>button]:hidden">
                <DialogHeader className={"text-start"}>
                    <DialogTitle>{t("dialog.title")}</DialogTitle>
                    <DialogDescription className="sr-only">
                        Check last analysis record and confirm to create new analysis
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {
                        reportUpdateEligibility.analyzedAt &&
                        <AnalyzedAtAlert analyzedAt={reportUpdateEligibility.analyzedAt} className={"px-0"} />
                    }
                    {
                        (!reportUpdateEligibility.canUpdate) && reportUpdateEligibility.availableSince &&
                        <AvailableSinceAlert availableSince={reportUpdateEligibility.availableSince}
                            className={"px-0"} />
                    }
                </div>
                {/*<div className="grid gap-6 py-4">*/}
                {/*    <div className="grid gap-1">*/}
                {/*        <h3>{t("dialog.analyzedAtTitle")}</h3>*/}
                {/*        <DialogDescription*/}
                {/*            className={"text-sm"}>{reportUpdateEligibility.analyzedAt?.toLocaleString('ko-KR', {*/}
                {/*            year: 'numeric',*/}
                {/*            month: 'long',*/}
                {/*            day: 'numeric',*/}
                {/*            hour: 'numeric',*/}
                {/*            hour12: true*/}
                {/*        })}</DialogDescription>*/}
                {/*    </div>*/}
                {/*    <div className="grid gap-1">*/}
                {/*        <h3>{t("dialog.availableSinceTitle")}</h3>*/}
                {/*        <DialogDescription*/}
                {/*            className={"text-sm"}>{reportUpdateEligibility.availableSince?.toLocaleString('ko-KR', {*/}
                {/*            year: 'numeric',*/}
                {/*            month: 'long',*/}
                {/*            day: 'numeric',*/}
                {/*            hour: 'numeric',*/}
                {/*            hour12: true*/}
                {/*        })}</DialogDescription>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>{state_t("cancel")}</Button>
                    </DialogClose>{
                        reportUpdateEligibility.canUpdate ?
                            <Button variant={"outline"} size={"lg"} asChild>
                                <Link href={"/report/new"} className={"flex gap-2 items-center"}>
                                    {state_t("run")}</Link></Button> :
                            <Button disabled variant={"outline"}><Timer />{state_t("run")}</Button>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReportUpdateButton