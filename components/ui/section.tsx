import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const sectionVariants = cva(
    "w-full px-0 flex flex-col max-w-4xl mx-auto",
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

export interface SectionProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> { }

const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, ...props }: SectionProps, ref) => {
        return (
            <section
                ref={ref}
                className={cn(sectionVariants({ className }))}
                {...props}
            />
        )
    }
)
Section.displayName = "Section"

export { Section }

