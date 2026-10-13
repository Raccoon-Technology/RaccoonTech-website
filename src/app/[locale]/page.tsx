import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import StatsGrid from "@/components/StatsGrid";
import { whatsappLink } from "@/lib/site-config";
import { LOCAL_PAGES } from "@/lib/local-pages";

const SERVICE_KEYS = [
  "landingPage",
  "institutionalSite",
  "catalog",
  "ecommerce",
  "management",
  "customSoftware",
] as const;

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return buildMetadata(locale, "home");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tServices = await getTranslations("services");
  const tContact = await getTranslations("contact");
  const tLocal = locale === "pt-BR" ? await getTranslations("local") : null;

  const briefingRows = [1, 2, 3, 4].map((n) => ({
    k: t(`briefingRow${n}k`),
    v: t(`briefingRow${n}v`),
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(720px 420px at 78% 12%, rgba(106,27,154,0.55), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <Container className="relative flex flex-wrap items-center gap-10 py-[clamp(64px,9vw,118px)] sm:gap-[clamp(32px,5vw,72px)]">
          <div className="min-w-[300px] flex-1 basis-[420px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/5 py-1.5 pr-3.5 pl-2 font-mono text-[11.5px] tracking-[0.08em] text-brand-purple-100 uppercase">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <Image src="/logo.png" alt="" width={915} height={752} className="h-3 w-auto" />
              </span>
              {t("badge")}
            </div>
            <h1 className="mt-5.5 text-[clamp(38px,5.6vw,66px)] leading-[1.03] font-bold">
              {t("heroTitle")}
            </h1>
            <p className="mt-5.5 max-w-[540px] text-[clamp(16.5px,1.5vw,19px)] leading-[1.62] text-white/74">
              {t("heroSubtitle")}
            </p>
            <div className="mt-[34px] flex flex-wrap gap-3">
              <Button href="/contact">{t("ctaPrimary")}</Button>
              <Button href="/services" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </div>
            <div className="mt-[38px] flex flex-wrap gap-6 font-mono text-xs tracking-[0.04em] text-white/60">
              <span>{t("trust1")}</span>
              <span>{t("trust2")}</span>
              <span>{t("trust3")}</span>
            </div>
          </div>

          <div className="min-w-[300px] flex-1 basis-[400px] sm:flex-none">
            <div className="rounded-[18px] border border-white/12 bg-[#1A1A1A] p-[26px] shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.1em] text-white/60 uppercase">
                <span>{t("briefingLabel")}</span>
                <span className="text-ready-green">● {t("briefingStatus")}</span>
              </div>
              <div className="my-4.5 h-px bg-white/10" />
              {briefingRows.map((row) => (
                <div
                  key={row.k}
                  className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-[11px]"
                >
                  <span className="text-[13.5px] text-white/60">{row.k}</span>
                  <span className="font-heading text-right text-[15px] font-medium text-white">
                    {row.v}
                  </span>
                </div>
              ))}
              <Link
                href="/contact"
                className="mt-[22px] block w-full rounded-[10px] bg-white py-[13px] text-center text-[15px] font-semibold text-brand-black transition-colors hover:bg-[#E9DEF5]"
              >
                {t("briefingButton")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-[clamp(64px,8vw,104px)]">
        <Container>
          <Eyebrow>{t("diferenciaisEyebrow")}</Eyebrow>
          <h2 className="mt-3.5 max-w-[620px] text-[clamp(28px,3.4vw,42px)] leading-[1.12]">
            {t("diferenciaisTitle")}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="group rounded-2xl border border-brand-border bg-brand-soft px-[26px] pt-[30px] pb-8 transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-brand-purple-border hover:shadow-[0_16px_40px_rgba(18,18,18,0.07)]"
              >
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-brand-purple-10 font-mono text-[15px] font-medium text-brand-purple">
                  0{n}
                </div>
                <h3 className="mt-5 text-xl">{t(`diferencial${n}Title`)}</h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.62] text-brand-gray">
                  {t(`diferencial${n}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden bg-brand-purple-dark">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(640px 280px at 12% 0%, rgba(255,255,255,0.16), transparent 70%)",
          }}
        />
        <Container className="relative py-[clamp(44px,5vw,60px)]">
          <StatsGrid />
        </Container>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-[clamp(64px,8vw,100px)]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>{t("servicesEyebrow")}</Eyebrow>
              <h2 className="mt-3.5 text-[clamp(28px,3.4vw,42px)] leading-[1.12]">
                {t("servicesTitle")}
              </h2>
            </div>
            <Button href="/services" variant="outline-purple" className="px-5 py-3 text-[14.5px]">
              {t("viewAllServices")}
            </Button>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_KEYS.map((key, i) => (
              <Link
                key={key}
                href="/services"
                className="flex flex-col gap-3 rounded-2xl border border-brand-border bg-white px-6 pt-[26px] pb-7 text-left transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-brand-purple hover:shadow-[0_16px_40px_rgba(106,27,154,0.1)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand-gray-400">
                    0{i + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-brand-purple" />
                </div>
                <h3 className="text-[19.5px]">{tServices(`${key}.title`)}</h3>
                <p className="text-[15px] leading-[1.6] text-brand-gray">
                  {tServices(`${key}.desc`)}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* LOCAL (Portuguese only) */}
      {tLocal && (
        <section className="pb-[clamp(56px,7vw,88px)]">
          <Container>
            <Eyebrow>{tLocal("eyebrow")}</Eyebrow>
            <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] leading-[1.12]">{t("localTitle")}</h2>
            <p className="mt-3 max-w-[620px] text-[16.5px] leading-[1.65] text-brand-gray">
              {t("localText")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {LOCAL_PAGES.map((page) => (
                <Link
                  key={page.key}
                  href={`/${page.slug}`}
                  className="rounded-full border border-brand-purple-border px-5 py-3 text-[14.5px] font-semibold text-brand-purple transition-colors hover:bg-brand-purple-hover"
                >
                  {tLocal(`pages.${page.key}.navLabel`)} em Manaus →
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA BANNER */}
      <Container className="pb-[clamp(72px,9vw,112px)]">
        <div
          className="relative overflow-hidden rounded-[22px] bg-brand-purple-dark px-[clamp(26px,5vw,60px)] py-[clamp(40px,6vw,68px)] text-white"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(500px 300px at 88% 20%, rgba(255,255,255,0.16), transparent 70%)",
            }}
          />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="flex-1 basis-[420px]">
              <h2 className="text-[clamp(28px,3.6vw,44px)] leading-[1.1]">
                {t("ctaBannerTitle")}
              </h2>
              <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-white/78">
                {t("ctaBannerSubtitle")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="secondary">
                {t("ctaBannerButton")}
              </Button>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/28 bg-white/10 px-[26px] py-[15px] text-[16px] font-semibold text-white transition-colors hover:bg-white/20"
              >
                {tContact("whatsapp")}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
