import { getTranslations } from "next-intl/server";

// import { Footer } from "@/templates/Footer";
// import { Hero } from "@/templates/Hero";

type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({
    locale: locale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const IndexPage = ({ params }: Props) => {
  return (
    <>
      {/* <Hero />
      <Footer /> */}
    </>
  );
};

export default IndexPage;
