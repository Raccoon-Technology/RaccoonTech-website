import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";

const SERVICE_KEYS = [
  "landingPage",
  "institutionalSite",
  "catalog",
  "ecommerce",
  "management",
  "customSoftware",
] as const;

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  return buildMetadata(locale, "services");
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");

  return (
    <>
      <section className="border-b border-brand-border bg-brand-soft">
        <Container className="py-[clamp(52px,7vw,86px)]">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3.5 max-w-[760px] text-[clamp(34px,4.6vw,56px)] leading-[1.08]">
            {t("pageTitle")}
          </h1>
          <p className="mt-5 max-w-[620px] text-lg leading-[1.62] text-brand-gray">
            {t("pageSubtitle")}
          </p>
        </Container>
      </section>

      <section className="pt-[clamp(48px,6vw,76px)] pb-[clamp(24px,3vw,40px)]">
        <Container>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_KEYS.map((key, i) => {
              const items = [1, 2, 3, 4].map((n) => t(`${key}.item${n}`));
              return (
                <div
                  key={key}
                  className="flex flex-col overflow-hidden rounded-[18px] border border-brand-border bg-white transition-all hover:border-brand-purple-border hover:shadow-[0_18px_44px_rgba(18,18,18,0.07)]"
                >
                  <div className="flex items-start justify-between gap-4 px-[26px] pt-7">
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.16em] text-brand-mauve-400">
                        0{i + 1}
                      </span>
                      <h2 className="mt-2.5 text-[23px]">{t(`${key}.title`)}</h2>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand-purple-10 px-[11px] py-1.5 font-mono text-[11px] whitespace-nowrap text-brand-purple">
                      {t(`${key}.prazo`)}
                    </span>
                  </div>
                  <p className="mt-3.5 px-[26px] text-[15.5px] leading-[1.62] text-brand-gray">
                    {t(`${key}.fullDesc`)}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5 px-[26px]">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-brand-black">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3.5 px-[26px] pt-6 pb-[26px]">
                    <span className="text-[13.5px] text-brand-gray-400">
                      {t("idealLabel")}: {t(`${key}.ideal`)}
                    </span>
                    <Link
                      href="/contact"
                      className="rounded-full bg-brand-black px-[18px] py-[11px] text-sm font-semibold text-white transition-colors hover:bg-brand-purple"
                    >
                      {t("requestButton")}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pt-[clamp(40px,5vw,60px)] pb-[clamp(72px,9vw,104px)]">
        <Container>
          <div className="rounded-[18px] border border-brand-border bg-brand-soft p-[clamp(28px,4vw,44px)]">
            <h2 className="text-[clamp(24px,2.8vw,32px)]">{t("includedTitle")}</h2>
            <div className="mt-7 grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n}>
                  <div className="font-mono text-[11px] tracking-[0.16em] text-brand-purple uppercase">
                    {t(`garantia${n}t`)}
                  </div>
                  <p className="mt-2 text-[15px] leading-[1.6] text-brand-gray">
                    {t(`garantia${n}p`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
