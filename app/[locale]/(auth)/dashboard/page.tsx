import { Footer } from "@/templates/Footer";
import { Hero } from "@/templates/Hero";
import { getTranslations } from "next-intl/server";
import { cookies } from 'next/headers'
import {Section} from "@/components/ui/section";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {Container} from "@/components/ui/container";

type Props = {
  params: Promise<{ locale: string }>;
};

const IndexPage = ({ params }: Props) => {

  const t = useTranslations("Dashboard");
  return (
      <Section>
          <Container>
        <h2>DASHBOARD</h2>
        <Button size={"fullW"}>{t("run_analysis")}</Button>
          </Container>
      </Section>
  );
};

export default IndexPage;
