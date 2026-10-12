import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

type PageKey = "home" | "services" | "projects" | "technologies" | "about" | "contact" | "privacy";

const PAGE_PATHS: Record<PageKey, string> = {
  home: "/",
  services: "/services",
  projects: "/projects",
  technologies: "/technologies",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
};

const OG_LOCALE: Record<string, string> = { "pt-BR": "pt_BR", en: "en_US" };

export function localizedPath(locale: string, href: string) {
  return getPathname({ locale, href });
}

export async function buildMetadata(locale: string, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const href = PAGE_PATHS[page];
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const url = localizedPath(locale, href);

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, href)]),
  );
  languages["x-default"] = localizedPath(routing.defaultLocale, href);

  const hidden = page === "projects" && !siteConfig.showProjects;

  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: page === "home" ? title : `${title} | ${siteConfig.name}`,
      description,
      url,
      locale: OG_LOCALE[locale] ?? "pt_BR",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: hidden ? { index: false, follow: false } : undefined,
  };
}
