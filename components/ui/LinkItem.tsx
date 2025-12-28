import * as React from 'react';
import {Item} from "@/components/ui/item";
import Link from "next/link";
import {cn} from "@/lib/utils";

const ItemLink = async ({href, children, ...props}: React.ComponentProps<"div"> & {
    href?: string,
    asChild?: boolean
}) => {

    return <Item variant="outline" asChild {...props}>
        <Link href={href ?? "#"}
              onClick={(e) => !href && e.preventDefault()}
              className={cn(
                  "transition-opacity",
                  !href && "pointer-events-none opacity-50"
              )}>{children}</Link></Item>
};

export default ItemLink;
