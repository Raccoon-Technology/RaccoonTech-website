import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "@/components/ContactForm";
import InstagramIcon from "@/components/InstagramIcon";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  return buildMetadata(locale, "contact");
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  const emails = [
    { label: t("emailContactLabel"), addr: siteConfig.emails.contact },
    { label: t("emailSupportLabel"), addr: siteConfig.emails.support },
  ];

  return (
    <section>
      <Container className="grid grid-cols-1 items-start gap-8 py-[clamp(52px,7vw,82px)] lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3.5 text-[clamp(32px,4.2vw,50px)] leading-[1.08]">
            {t("pageTitle")}
          </h1>
          <p className="mt-4.5 max-w-[480px] text-[17px] leading-[1.65] text-brand-gray">
            {t("pageSubtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 rounded-2xl border border-brand-border bg-white px-5 py-[18px] transition-all hover:border-whatsapp hover:shadow-[0_12px_30px_rgba(18,18,18,0.06)]"
            >
              <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-whatsapp font-mono text-xs font-medium text-brand-black">
                WA
              </span>
              <span className="flex flex-col">
                <span className="text-[15.5px] font-semibold text-brand-black">
                  {t("whatsappTitle")}
                </span>
                <span className="text-sm text-brand-gray">{siteConfig.whatsapp.display}</span>
              </span>
            </a>
            {emails.map((e) => (
              <a
                key={e.addr}
                href={`mailto:${e.addr}`}
                className="flex items-center gap-3.5 rounded-2xl border border-brand-border bg-white px-5 py-[18px] transition-all hover:border-brand-purple hover:shadow-[0_12px_30px_rgba(18,18,18,0.06)]"
              >
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-brand-purple-10 font-mono text-xs font-medium text-brand-purple">
                  @
                </span>
                <span className="flex flex-col">
                  <span className="text-[15.5px] font-semibold text-brand-black">{e.label}</span>
                  <span className="text-sm text-brand-gray">{e.addr}</span>
                </span>
              </a>
            ))}
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 rounded-2xl border border-brand-border bg-white px-5 py-[18px] transition-all hover:border-brand-purple hover:shadow-[0_12px_30px_rgba(18,18,18,0.06)]"
            >
              <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-brand-purple-10 text-brand-purple">
                <InstagramIcon />
              </span>
              <span className="flex flex-col">
                <span className="text-[15.5px] font-semibold text-brand-black">
                  {t("instagramTitle")}
                </span>
                <span className="text-sm text-brand-gray">@{siteConfig.instagram.handle}</span>
              </span>
            </a>
          </div>

          <div className="mt-7 font-mono text-xs leading-[1.9] tracking-[0.04em] text-brand-gray-400">
            <div>{t("availability1")}</div>
            <div>{t("availability2")}</div>
          </div>
        </div>

        <div className="rounded-[20px] border border-brand-border bg-brand-soft p-[clamp(24px,3vw,34px)]">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
