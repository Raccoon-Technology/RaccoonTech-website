import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import StatsGrid from "@/components/StatsGrid";
import Button from "@/components/Button";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  return buildMetadata(locale, "about");
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <>
      <section className="pt-[clamp(52px,7vw,86px)] pb-[clamp(40px,5vw,60px)]">
        <Container>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3.5 max-w-[820px] text-[clamp(34px,4.6vw,56px)] leading-[1.08]">
            {t("pageTitle")}
          </h1>
        </Container>
      </section>

      <section className="pb-[clamp(56px,7vw,84px)]">
        <Container className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-4.5 text-[17px] leading-[1.72] text-brand-ink-soft">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
            <p>{t("paragraph3")}</p>
            <p>{t("paragraph4")}</p>
            <div className="mt-2 rounded-2xl border border-brand-border border-l-4 border-l-brand-purple bg-brand-soft px-6 py-5">
              <div className="font-mono text-[11px] tracking-[0.18em] text-brand-purple uppercase">
                {t("locationLabel")}
              </div>
              <p className="mt-2 text-[16px] leading-[1.65] text-brand-black">
                {t("paragraphLocation")}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4.5">
            <div className="flex flex-col items-center rounded-[18px] border border-brand-border bg-brand-soft px-6 py-[30px] text-center">
              <Image src="/logo.png" alt="" width={915} height={752} className="h-[102px] w-auto" />
              <div className="mt-4.5 font-mono text-[11px] tracking-[0.18em] text-brand-purple uppercase">
                {t("curiousLabel")}
              </div>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-brand-gray">
                {t("curiousText")}
              </p>
            </div>
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-[14px] border border-brand-border bg-white px-[22px] py-5">
                <h3 className="text-[16.5px]">{t(`valor${n}t`)}</h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.58] text-brand-gray">
                  {t(`valor${n}p`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-black text-white">
        <Container className="py-[clamp(48px,6vw,76px)]">
          <StatsGrid variant="dark" />
        </Container>
      </section>

      <section className="py-[clamp(56px,7vw,88px)] text-center">
        <Container>
          <h2 className="mx-auto max-w-[640px] text-[clamp(26px,3.2vw,38px)] leading-[1.14]">
            {t("closingTitle")}
          </h2>
          <Button href="/contact" className="mt-6.5">
            {t("closingButton")}
          </Button>
        </Container>
      </section>
    </>
  );
}
