import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const containerVariants = cva(
    "w-full px-5 py-4 flex flex-col max-w-4xl mx-auto",
    {
        variants: {
            size: {
                default: "py-4",
                sm: "py-4",
            },
            // variant: {
            //     default: "bg-background",
            //     muted: "bg-muted/50",
            // }
        },
        defaultVariants: {
            size: "default",
            // variant: "default",
        },
    }
)

export interface ContainerProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> { }

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

