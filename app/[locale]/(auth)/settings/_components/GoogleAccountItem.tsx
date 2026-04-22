"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemMedia } from "@/components/ui/item";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslations } from "use-intl";
import { deleteGoogleAccount } from "../actions";

type GoogleAccount = {
    subject: string;
    name: string;
    email: string;
    canDelete?: boolean;
};

interface GoogleAccountItemProps {
    account: GoogleAccount;
}

const GoogleAccountItem = ({ account }: GoogleAccountItemProps) => {
    const t = useTranslations("settings");
    const [isDisconnecting, setIsDisconnecting] = useState(false);

    const handleClick = useCallback(async () => {
        await deleteGoogleAccount(account.subject);
        setIsDisconnecting(true);
    }, [deleteGoogleAccount, account.subject]);

    return (
        <AlertDialog>
            <Item
                size="sm"
                className="bg-muted"
            >
                <ItemMedia>
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=0ea5e9&color=fff&size=96`}
                            alt={account.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm">
                            {account.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                </ItemMedia>
                <ItemContent>
                    <p className="font-medium text-sm leading-tight">{account.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{account.email}</p>
                </ItemContent>
                {
                    account.canDelete && (
                        <ItemActions>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={isDisconnecting}
                                // className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-destructive hover:text-destructive hover:bg-destructive/10 focus:opacity-100 focus:ring-2 focus:ring-destructive/20"
                                >
                                    {isDisconnecting ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    ) : (
                                        <X className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">{t("googleAccounts.disconnect")}</span>
                                </Button>
                            </AlertDialogTrigger>
                        </ItemActions>
                    )
                }
            </Item>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("googleAccounts.disconnectDialog.title")}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("googleAccounts.disconnectDialog.description", { name: account.name, email: account.email })}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {t("googleAccounts.disconnectDialog.cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleClick}
                        disabled={isDisconnecting}
                    // className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDisconnecting ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                                {t("googleAccounts.disconnectDialog.disconnecting")}
                            </>
                        ) : (
                            t("googleAccounts.disconnectDialog.disconnect")
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export { GoogleAccountItem };
export type { GoogleAccount };

