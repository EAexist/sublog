"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ServiceProviderType} from "@/lib/dto/dto";

interface BrandAvatarProps {
    serviceProvider: ServiceProviderType
}

export const BrandAvatar = ({serviceProvider}: BrandAvatarProps) => {

    const src = serviceProvider.logoDevSuffix ? `${process.env['NEXT_PUBLIC_LOGO_DEV_URL']}/${serviceProvider.logoDevSuffix}/?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}` : undefined

    return (
        <Avatar>
            <AvatarImage src={src} alt={`${serviceProvider.displayName} Logo`}/>
            <AvatarFallback>{serviceProvider.displayName.substring(0, 4)}</AvatarFallback>
        </Avatar>
    );
};
