import { Container } from "@/components/ui/container";
import Image from "next/image";

export const CenteredHero = (props: {
    banner?: React.ReactNode;
    title: React.ReactNode;
    description: string;
    buttons?: React.ReactNode;
}) => (
    <div className="flex flex-col items-center md:flex-row md:gap-8">
        {/* Hero Image */}
        <div className="relative w-full max-w-4xl mx-auto">
            <Image
                src="/assets/images/hero.png"
                alt="Hero illustration"
                width={800}
                height={600}
                className="object-cover"
                priority
            />
        </div>
        <Container className="max-w-sm">
            {/* Banner */}
            <div className="text-center">{props.banner}</div>

            {/* Title */}
            <h1 className="text-center text-4xl font-bold tracking-tight md:text-6xl">
                {props.title}
            </h1>

            {/* Description */}
            <div className="mx-auto text-center text-xl text-muted-foreground max-w-2xl p-4">
                <p className="whitespace-pre-line font-semibold text-base">
                    {props.description}
                </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-x-5 gap-y-3 py-8 md:px-8">
                {props.buttons}
            </div>
        </Container>
    </div>
);
