import {Container} from "@/components/ui/container";

export const CenteredHero = (props: {
  banner?: React.ReactNode;
  title: React.ReactNode;
  description: string;
  buttons?: React.ReactNode;
}) => (
      <Container>
    <div className="text-center">{props.banner}</div>

    <div className="mt-3 text-center text-3xl font-bold tracking-tight">
      {props.title}
    </div>

    <div className="mx-auto mt-5 text-center text-xl text-muted-foreground">
        <p className="whitespace-pre-line font-semibold text-base">
      {props.description}
        </p>
    </div>
    <div className="mt-8 flex justify-center gap-x-5 gap-y-3 max-sm:flex-col">
      {props.buttons}
    </div>
      </Container>
);
