import {Button} from "@/components/ui/button"
// import {Input} from "@/components/ui/input"
// import {Label} from "@/components/ui/label"
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import {Menu, X} from "lucide-react";
import Link from "next/link";
import {getTranslations} from "next-intl/server";

export const Navbar = async () => {
    const t = await getTranslations("components.Navbar");

    const NAV_LINKS = [
        {name: t("report"), href: "/report"},
        {name: t("home"), href: "/"},
    ];
    return (
        <Sheet modal={false}>
            <div
                className={"fixed top-0 left-0 right-0 z-60 flex justify-between h-14 w-full items-center border-b bg-background/80 backdrop-blur-md px-4 md:px-6"}>
                <div/>
                <div>
                    <SheetTrigger asChild className={"data-[state=open]:hidden"}>
                        <Button variant={"outline"} size={"icon"}>
                            <Menu/>
                        </Button>
                    </SheetTrigger>
                    <SheetTrigger asChild className={"data-[state=closed]:hidden"}>
                        <Button variant={"outline"} size={"icon"}>
                            <X/>
                        </Button>
                    </SheetTrigger>
                </div>
            </div>
            {/*<div className={"h-14"}/>*/}
            <SheetContent side={"top"} className={"gap-0"}>
                <SheetHeader className={"hidden"}>
                    <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className={"h-14"}/>
                <ul className={"flex flex-col"}
                >{NAV_LINKS.map(({href, name}) => {
                    return <li key={href} className={"flex"}><SheetTrigger asChild><Link href={href}
                                                                                         className={"w-full p-5"}>{name}</Link>
                    </SheetTrigger>
                    </li>
                })}</ul>
                {/*<div className="grid flex-1 auto-rows-min gap-6 px-4">*/}
                {/*    <div className="grid gap-3">*/}
                {/*        <Label htmlFor="sheet-demo-name">Name</Label>*/}
                {/*        <Input id="sheet-demo-name" defaultValue="Pedro Duarte"/>*/}
                {/*    </div>*/}
                {/*    <div className="grid gap-3">*/}
                {/*        <Label htmlFor="sheet-demo-username">Username</Label>*/}
                {/*        <Input id="sheet-demo-username" defaultValue="@peduarte"/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </SheetContent>
        </Sheet>
    )
}
