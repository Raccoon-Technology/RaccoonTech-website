import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";

type Section = { title: string; paragraphs: string[] };

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  return buildMetadata(locale, "privacy");
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacy");
  const tMeta = await getTranslations("meta");
  const sections = t.raw("sections") as Section[];

  return (
    <section className="py-[clamp(52px,7vw,86px)]">
      <Container className="max-w-3xl">
        <Eyebrow>{t("updated")}</Eyebrow>
        <h1 className="mt-3.5 text-[clamp(32px,4.2vw,50px)] leading-[1.08]">
          {tMeta("privacy.title")}
        </h1>
        <p className="mt-5 text-[17px] leading-[1.72] text-brand-ink-soft">{t("intro")}</p>

        <div className="mt-10 flex flex-col gap-9">
          {sections.map((section, i) => (
            <div key={section.title}>
              <h2 className="text-[22px]">
                {i + 1}. {section.title}
              </h2>
              <div className="mt-3 flex flex-col gap-3 text-[16px] leading-[1.7] text-brand-gray">
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
