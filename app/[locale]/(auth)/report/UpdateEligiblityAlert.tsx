import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, itemVariants } from "@/components/ui/item";
import type { VariantProps } from "class-variance-authority";
import { CircleAlert, CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { ReactNode } from "react";

type ItemProps = & React.ComponentProps<"div"> &
    VariantProps<typeof itemVariants> & { asChild?: boolean }

type Props = {
    media: ReactNode
    title: string
    description: string
} & ItemProps;

const UpdateEligibilityAlert = ({ media, title, description, ...props }: Props) => {

    const t = useTranslations(`report.components.UpdateEligibilityAlert`);

    return (
        <Item {...props}>
            <ItemMedia>{
                media
            }
            </ItemMedia>
            <ItemContent>
                <ItemTitle>
                    <h3>{title}</h3></ItemTitle>
                <ItemDescription>{description}
                </ItemDescription>
            </ItemContent>
        </Item>

    );
};

interface AnalyzedAtAlertProps extends ItemProps {
    analyzedAt: Date
}

const AnalyzedAtAlert = ({ analyzedAt, ...props }: AnalyzedAtAlertProps) => {

    const t = useTranslations(`report.components.AnalyzedAtAlert`);

    return (
        <UpdateEligibilityAlert media={
            <CircleCheck className={"size-5"} strokeWidth={1} />} title={t("title")}
            description={analyzedAt?.toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                hour12: true
            })} {...props} />

    );
};


interface AvailableSinceAlertProps extends ItemProps {
    availableSince: Date
}

const AvailableSinceAlert = ({ availableSince, ...props }: AvailableSinceAlertProps) => {

    const t = useTranslations(`report.components.AvailableSinceAlert`);

    return (
        <UpdateEligibilityAlert media={
            <CircleAlert className={"size-5"} strokeWidth={1.5} />} title={t("title")}
            description={availableSince?.toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                hour12: true
            })} {...props} />

    );
};

export { AnalyzedAtAlert, AvailableSinceAlert };

