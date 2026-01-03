"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ServiceProvider} from "@/lib/dto/dto";

interface BrandAvatarProps {
    serviceProvider: ServiceProvider
    className?: string
}

export const BrandAvatar = ({serviceProvider, className}: BrandAvatarProps) => {

    const src = serviceProvider.logoDevSuffix ? `${process.env['NEXT_PUBLIC_LOGO_DEV_URL']}/${serviceProvider.logoDevSuffix}/?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}` : undefined

    return (
        <Avatar className={className}>
            <AvatarImage src={src} alt={`${serviceProvider.displayName} Logo`}/>
            <AvatarFallback
                className={"whitespace-nowrap justify-start"}>{serviceProvider.displayName.substring(0, 4)}</AvatarFallback>
        </Avatar>
    );
};
