import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import {Input} from "@/components/ui/input"
// import {Label} from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { getIsAuthenticated } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { LogoutSheetTrigger } from "./LogoutSheetTrigger";

export const Navbar = async () => {
    const t = await getTranslations("components.Navbar");

    const isAuthenticated = await getIsAuthenticated()

    const NAV_LINKS = [
        { name: t("report"), href: "/report" },
        { name: t("home"), href: "/" },
    ];
    return (
        <Sheet modal={false}>
            <header
                className={"fixed top-0 left-0 right-0 z-60 flex justify-between h-14 w-full items-center border-b bg-background/80 backdrop-blur-md px-4 md:px-6"}>
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
            </header>
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
            </SheetContent>
        </Sheet>
    )
}
