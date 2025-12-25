import { Footer } from "@/templates/Footer";
import { Hero } from "@/templates/Hero";
import { getTranslations } from "next-intl/server";
import { cookies } from 'next/headers'

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

const IndexPage = async ({ params }: Props) => {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("JSESSIONID");
  return (
    <div className="h-dvh w-full flex flex-col">
      <Hero isAuthenticated={isAuthenticated} />
      <Footer />
    </div>
  );
};

export default IndexPage;
