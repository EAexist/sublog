import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import {Input} from "@/components/ui/input"
// import {Label} from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { getIsAuthenticated } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LogoutButton } from "./LogoutButton";
import { LogoutSheetTrigger } from "./LogoutSheetTrigger";

export const Navbar = async () => {
    const commonT = await getTranslations("common");
    const t = await getTranslations("components.Navbar");

    const isAuthenticated = await getIsAuthenticated()

    const NAV_LINKS = [
        { name: t("dashboard"), href: "/dashboard" },
        ...(isAuthenticated ? [{ name: t("settings"), href: "/settings" }] : []),
        { name: t("home"), href: "/" },
    ];

    return (
        <header
            className={"fixed top-0 left-0 right-0 z-60 h-14 w-full border-b bg-background/80 backdrop-blur-md"}
        >
            <div className={"max-w-4xl w-full h-full pr-4 mx-auto flex md:px-6 justify-between"}>
                <div className={"flex"}>
                    <div className="flex items-center">
                        <Button size={"default"} variant={"ghost"} asChild className="min-w-0 text-lg font-semibold tracking-tight md:min-w-28">
                            <Link href="/" className={""}>
                                {commonT("title")}
                            </Link>
                        </Button>
                    </div>
                    <div className="hidden md:flex">
                        <ul className="flex items-center justify-between">
                            {NAV_LINKS.map(({ href, name }) => {
                                return <li key={href} className={"flex"}>
                                    <Button size={"lg"} variant={"ghost"} asChild className="min-w-28">
                                        <Link href={href}
                                            className={""}>
                                            {name}
                                        </Link>
                                    </Button>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="flex items-center md:hidden">
                    <Sheet modal={false}>
                        <div />
                        <div>
                            <SheetTrigger asChild className={"data-[state=open]:hidden"}>
                                <Button variant={"outline"} size={"icon"}>
                                    <Menu />
                                </Button>
                            </SheetTrigger>
                            <SheetTrigger asChild className={"data-[state=closed]:hidden"}>
                                <Button variant={"outline"} size={"icon"}>
                                    <X />
                                </Button>
                            </SheetTrigger>
                        </div>
                        {/*<div className={"h-14"}/>*/}
                        <SheetContent side={"top"} className={"gap-0"}>
                            <SheetHeader className={"hidden"}>
                                <SheetTitle>Navigation Menu</SheetTitle>
                            </SheetHeader>
                            <div className={"h-14"} />
                            <ul className={"flex flex-col"}
                            >
                                {NAV_LINKS.map(({ href, name }) => {
                                    return <li key={href} className={"flex"}><SheetTrigger asChild><Link href={href}
                                        className={"w-full p-5"}>{name}</Link>
                                    </SheetTrigger>
                                    </li>
                                })}
                            </ul>
                            {
                                isAuthenticated &&
                                <>
                                    <Separator className="my-2" />
                                    <LogoutSheetTrigger />
                                </>
                            }
                            <Separator />
                            <div className="flex items-center justify-between h-16 px-1">
                                <LocaleSwitcher />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <LocaleSwitcher />
                    {
                        isAuthenticated &&
                        <LogoutButton />
                    }
                </div>
            </div>
        </header>
    )
}
