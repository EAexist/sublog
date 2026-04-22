import { Container } from "@/components/ui/container";
import Image from "next/image";

export const CenteredHero = (props: {
    banner?: React.ReactNode;
    title: React.ReactNode;
    description: string;
    buttons?: React.ReactNode;
}) => (
    <div className="flex flex-col items-center">
        {/* Hero Image */}
        <div className="relative w-full max-w-2xl mx-auto">
            <Image
                src="/assets/images/hero.png"
                alt="Hero illustration"
                width={800}
                height={400}
                className="object-cover"
                priority
            />
        </div>
        <Container>
            {/* Banner */}
            <div className="text-center">{props.banner}</div>

            {/* Title */}
            <h1 className="text-center text-5xl font-bold tracking-tight">
                {props.title}
            </h1>

            {/* Description */}
            <div className="mx-auto text-center text-xl text-muted-foreground max-w-2xl p-4">
                <p className="whitespace-pre-line font-semibold text-base">
                    {props.description}
                </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-x-5 gap-y-3 max-sm:flex-col py-8">
                {props.buttons}
            </div>
        </Container>
    </div>
);
