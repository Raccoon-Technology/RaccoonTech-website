import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LOCAL_PAGES, type LocalPageKey } from "@/lib/local-pages";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import Button from "./Button";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import FaqList, { type FaqItem } from "./FaqList";

type Step = { title: string; text: string };

export default async function LocalLandingPage({ pageKey }: { pageKey: LocalPageKey }) {
  const t = await getTranslations("local");
  const tNav = await getTranslations("nav");
  const tContact = await getTranslations("contact");

  const base = `pages.${pageKey}`;
  const items = t.raw(`${base}.items`) as string[];
  const forWho = t.raw(`${base}.forWho`) as string[];
  const faq = t.raw(`${base}.faq`) as FaqItem[];
  const steps = t.raw("steps") as Step[];
  const others = LOCAL_PAGES.filter((p) => p.key !== pageKey);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(640px 340px at 18% 0%, rgba(106,27,154,0.5), transparent 70%)",
          }}
        />
        <Container className="relative py-[clamp(52px,7vw,92px)]">
          <Eyebrow className="text-brand-purple-200">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3.5 max-w-[820px] text-[clamp(34px,4.8vw,58px)] leading-[1.08]">
            {t(`${base}.h1`)}
          </h1>
          <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-white/78">
            {t(`${base}.intro`)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">{tNav("cta")}</Button>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-[26px] py-[15px] text-[16px] font-semibold text-white transition-colors hover:bg-white/[0.14]"
            >
              {tContact("whatsapp")}
            </a>
          </div>
        </Container>
      </section>

      <section className="py-[clamp(52px,7vw,88px)]">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <h2 className="text-[clamp(24px,2.8vw,32px)]">{t("includesTitle")}</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[16px] leading-[1.55] text-brand-black"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-[18px] border border-brand-border bg-brand-soft p-7">
            <h2 className="text-[20px]">{t("forWhoTitle")}</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] leading-[1.6] text-brand-gray">
              {forWho.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="mt-6 border-t border-brand-border pt-5">
              <div className="font-mono text-[11px] tracking-[0.16em] text-brand-purple uppercase">
                {t("timelineLabel")}
              </div>
              <p className="mt-2 text-[15px] leading-[1.6] text-brand-black">
                {t(`${base}.timeline`)}
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-brand-soft py-[clamp(52px,7vw,88px)]">
        <Container>
          <h2 className="text-[clamp(24px,2.8vw,32px)]">{t("stepsTitle")}</h2>
          <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-brand-border bg-white p-6">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-brand-purple-10 font-mono text-[14px] font-medium text-brand-purple">
                  0{i + 1}
                </div>
                <h3 className="mt-4 text-[18px]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-brand-gray">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-[clamp(52px,7vw,88px)]">
        <Container className="max-w-3xl">
          <h2 className="text-[clamp(24px,2.8vw,32px)]">{t("faqTitle")}</h2>
          <div className="mt-6">
            <FaqList items={faq} />
          </div>
        </Container>
      </section>

      <section className="pb-[clamp(52px,7vw,88px)]">
        <Container>
          <h2 className="text-[clamp(22px,2.6vw,28px)]">{t("othersTitle")}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {others.map((other) => (
              <Link
                key={other.key}
                href={`/${other.slug}`}
                className="rounded-full border border-brand-purple-border px-5 py-3 text-[14.5px] font-semibold text-brand-purple transition-colors hover:bg-brand-purple-hover"
              >
                {t(`pages.${other.key}.navLabel`)} →
              </Link>
            ))}
            <Link
              href="/services"
              className="rounded-full border border-brand-border px-5 py-3 text-[14.5px] font-semibold text-brand-gray transition-colors hover:bg-brand-soft"
            >
              {tNav("services")}
            </Link>
          </div>
        </Container>
      </section>

      <Container className="pb-[clamp(72px,9vw,112px)]">
        <div className="relative overflow-hidden rounded-[22px] bg-brand-purple-dark px-[clamp(26px,5vw,60px)] py-[clamp(36px,5vw,60px)] text-white">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(500px 300px at 88% 20%, rgba(255,255,255,0.16), transparent 70%)",
            }}
          />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="flex-1 basis-[420px]">
              <h2 className="text-[clamp(26px,3.2vw,40px)] leading-[1.1]">{t("ctaTitle")}</h2>
              <p className="mt-4 max-w-[520px] text-[16.5px] leading-[1.6] text-white/78">
                {t("ctaText")}
              </p>
              <p className="mt-4 font-mono text-[11.5px] tracking-[0.08em] text-white/60">
                {siteConfig.location.city}, {siteConfig.location.regionName}
              </p>
            </div>
            <Button href="/contact" variant="secondary">
              {tNav("cta")}
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
