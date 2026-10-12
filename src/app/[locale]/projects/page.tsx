import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";

const CASE_KEYS = ["case1", "case2", "case3", "case4", "case5", "case6"] as const;

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  return buildMetadata(locale, "projects");
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");
  const tNav = await getTranslations("nav");

  return (
    <>
      <section className="pt-[clamp(52px,7vw,86px)] pb-[clamp(40px,5vw,56px)]">
        <Container>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <div className="mt-3.5 flex flex-wrap items-end justify-between gap-8">
            <h1 className="max-w-[700px] text-[clamp(34px,4.6vw,56px)] leading-[1.08]">
              {t("pageTitle")}
            </h1>
            <p className="max-w-[380px] text-[16.5px] leading-[1.62] text-brand-gray">
              {t("pageSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-[clamp(48px,6vw,72px)]">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CASE_KEYS.map((key) => (
              <div
                key={key}
                className="overflow-hidden rounded-[18px] border border-brand-border bg-white"
              >
                <div
                  className="flex h-[190px] items-center justify-center border-b border-brand-border bg-[#FAF8FC]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(106,27,154,0.09) 0 1px, transparent 1px 9px)",
                  }}
                >
                  <span className="rounded-full bg-white/92 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-brand-mauve-500 uppercase">
                    {t(`${key}.slot`)}
                  </span>
                </div>
                <div className="px-6 pt-[22px] pb-[26px]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-brand-purple-10 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.14em] text-brand-purple uppercase">
                      {t("comingSoon")}
                    </span>
                    <span className="text-[13px] text-brand-gray-400">{t(`${key}.category`)}</span>
                  </div>
                  <h3 className="mt-3.5 text-[19px]">{t(`${key}.title`)}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-brand-gray">
                    {t(`${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-[clamp(72px,9vw,104px)]">
        <Container>
          <div className="flex flex-wrap items-center gap-7 rounded-[18px] border border-dashed border-brand-purple-border bg-brand-soft p-[clamp(30px,4vw,48px)]">
            <Image
              src="/logo.png"
              alt=""
              width={915}
              height={752}
              className="animate-rt-float h-[78px] w-auto opacity-90"
            />
            <div className="flex-1 basis-[320px]">
              <h2 className="text-[clamp(22px,2.6vw,30px)]">{t("ctaTitle")}</h2>
              <p className="mt-2.5 max-w-[520px] text-[15.5px] leading-[1.62] text-brand-gray">
                {t("ctaSubtitle")}
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-brand-purple px-6 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-brand-purple-dark"
            >
              {tNav("cta")}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
