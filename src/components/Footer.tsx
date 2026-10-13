import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "./Container";
import InstagramIcon from "./InstagramIcon";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { LOCAL_PAGES } from "@/lib/local-pages";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects", hidden: !siteConfig.showProjects },
  { href: "/technologies", key: "technologies" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
].filter((item) => !item.hidden) as { href: string; key: string }[];

export default function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const serviceKeys = [
    "landingPage",
    "institutionalSite",
    "catalog",
    "ecommerce",
    "management",
    "customSoftware",
  ] as const;

  // In Portuguese each service links to its Manaus landing page; elsewhere to the services page.
  const serviceHref = (key: (typeof serviceKeys)[number]) => {
    if (locale !== "pt-BR") return "/services";
    const target =
      key === "ecommerce"
        ? "store"
        : key === "management"
          ? "systems"
          : key === "customSoftware"
            ? "software"
            : "sites";
    return `/${LOCAL_PAGES.find((p) => p.key === target)!.slug}`;
  };

  return (
    <footer className="mt-auto bg-brand-black text-white">
      <Container className="grid gap-9 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-[72px]">
        <div>
          <div className="flex items-center gap-[11px]">
            <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-white">
              <Image src="/logo.png" alt="Raccoon Technology" width={915} height={752} className="h-6 w-auto" />
            </span>
            <span className="flex flex-col leading-[1.15]">
              <span className="font-heading text-[17px] font-bold">Raccoon Technology</span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-brand-purple-200 uppercase">
                {tFooter("tagline")}
              </span>
            </span>
          </div>
          <p className="mt-4.5 max-w-[300px] text-[14.5px] leading-relaxed text-white/60">
            {tFooter("blurb")}
          </p>
          <p className="mt-3 max-w-[300px] font-mono text-[11.5px] leading-[1.7] tracking-[0.04em] text-white/60">
            {tFooter("location")}
          </p>
        </div>

        <div>
          <div className="font-mono text-[10.5px] tracking-[0.18em] text-white/60 uppercase">
            {tFooter("navigation")}
          </div>
          <div className="mt-4 flex flex-col items-start gap-2.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14.5px] text-white/72 transition-colors hover:text-white"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10.5px] tracking-[0.18em] text-white/60 uppercase">
            {t("services")}
          </div>
          <div className="mt-4 flex flex-col items-start gap-2.5">
            {serviceKeys.map((key) => (
              <Link
                key={key}
                href={serviceHref(key)}
                className="text-left text-[14.5px] text-white/72 transition-colors hover:text-white"
              >
                {tServices(`${key}.title`)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10.5px] tracking-[0.18em] text-white/60 uppercase">
            {t("contact")}
          </div>
          <div className="mt-4 flex flex-col items-start gap-2.5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14.5px] text-white/72 transition-colors hover:text-white"
            >
              WhatsApp {siteConfig.whatsapp.display}
            </a>
            <a
              href={`mailto:${siteConfig.emails.contact}`}
              className="text-[14.5px] text-white/72 transition-colors hover:text-white"
            >
              {siteConfig.emails.contact}
            </a>
            <a
              href={`mailto:${siteConfig.emails.support}`}
              className="text-[14.5px] text-white/72 transition-colors hover:text-white"
            >
              {siteConfig.emails.support}
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14.5px] text-white/72 transition-colors hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />@{siteConfig.instagram.handle}
            </a>
          </div>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-full bg-brand-purple px-5 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-purple-dark"
          >
            {t("cta")}
          </Link>
        </div>
      </Container>

      <Container className="flex flex-wrap justify-between gap-4 border-t border-white/10 py-[22px] text-[13px] text-white/60">
        <span>
          © {year} {siteConfig.name}. {tFooter("rights")}
        </span>
        <Link href="/privacy" className="transition-colors hover:text-white">
          {tFooter("privacy")}
        </Link>
      </Container>
    </footer>
  );
}
