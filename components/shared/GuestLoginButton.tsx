"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { guestLogin } from "@/lib/api";
import { CustomError } from "@/lib/error";
import { Ghost } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Dialog } from "../ui/dialog";

export const GuestLoginButton = () => {
    const t = useTranslations("components.GuestLoginButton");
    const router = useRouter();

    const [isPending, startTransition] = useTransition()
    const handleGuestLogin = () => {
        startTransition(async () => {
            const response = await guestLogin()

            if (response.status === 200) {
                router.push('/dashboard');
                router.refresh();
            } else {
                if (response.error) {
                    throw new CustomError("Api Error", response.status, t("title"))
                } else {
                    throw new CustomError("Api Error", undefined, t("title"))
                }
            }
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"fullW"} variant={"outline"}>
                    <Ghost />
                    {t("title")}
                </Button>
            </DialogTrigger>
            <DialogContent className="z-100 [&>button]:hidden">
                <DialogHeader className={"text-start"}>
                    <DialogTitle>{t("dialog.title")}</DialogTitle>
                    <DialogDescription className="sr-only">
                        {t("dialog.description")}
                    </DialogDescription>
                </DialogHeader>
                <div className="whitespace-pre-line flex flex-col gap-4">
                    <p>{t("dialog.description")}</p>
                </div>
                <DialogFooter className="flex-row-reverse">
                    <Button onClick={handleGuestLogin}>{isPending ?
                        <Spinner /> : t("dialog.confirm")}</Button>
                    <DialogClose asChild>
                        <Button variant={"outline"}>{t("dialog.cancel")}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
