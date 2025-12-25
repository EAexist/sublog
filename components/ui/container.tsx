import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const containerVariants = cva(
    "w-full px-5 py-8 flex flex-col",
    {
        variants: {
            // size: {
            //     default: "py-36",
            //     sm: "py-12",
            //     lg: "py-48",
            // },
            // variant: {
            //     default: "bg-background",
            //     muted: "bg-muted/50",
            // }
        },
        defaultVariants: {
            // size: "default",
            // variant: "default",
        },
    }
)

export interface ContainerProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, ...props }: ContainerProps, ref) => {
        return (
            <div
                ref={ref}
                className={cn(containerVariants({ className }))}
                {...props}
            />
        )
    }
)
Container.displayName = "Container"

export { Container }