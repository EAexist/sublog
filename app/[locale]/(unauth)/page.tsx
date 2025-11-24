import { getTranslations } from "next-intl/server";

// import { Footer } from "@/templates/Footer";
// import { Hero } from "@/templates/Hero";

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: "Index",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  return (
    <>
      {/* <Hero />
      <Footer /> */}
    </>
  );
};

export default IndexPage;
