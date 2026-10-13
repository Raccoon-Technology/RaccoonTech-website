import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import LocalLandingPage from "@/components/LocalLandingPage";
import { buildLocalMetadata } from "@/lib/seo";

// Portuguese only: do not pre-render the English variants.
export function generateStaticParams() {
  return [{ locale: "pt-BR" }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/sistemas-de-gestao-manaus">) {
  const { locale } = await params;
  if (locale !== "pt-BR") return {};
  return buildLocalMetadata(locale, "systems");
}

export default async function Page({ params }: PageProps<"/[locale]/sistemas-de-gestao-manaus">) {
  const { locale } = await params;
  // Local landing pages exist in Portuguese only.
  if (locale !== "pt-BR") notFound();
  setRequestLocale(locale);

  return <LocalLandingPage pageKey="systems" />;
}
