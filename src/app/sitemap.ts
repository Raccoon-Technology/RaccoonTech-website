import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { localizedPath } from "@/lib/seo";
import { LOCAL_PAGES } from "@/lib/local-pages";

const ROUTES = [
  { href: "/", priority: 1, changeFrequency: "monthly" },
  { href: "/services", priority: 0.9, changeFrequency: "monthly" },
  { href: "/technologies", priority: 0.7, changeFrequency: "yearly" },
  { href: "/about", priority: 0.7, changeFrequency: "yearly" },
  { href: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { href: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ...(siteConfig.showProjects
    ? [{ href: "/projects", priority: 0.8, changeFrequency: "monthly" } as const]
    : []),
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (locale: string, href: string) =>
    new URL(localizedPath(locale, href), siteConfig.url).toString();

  const localPages = LOCAL_PAGES.map((page) => ({
    url: absolute("pt-BR", `/${page.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absolute(locale, route.href),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, absolute(l, route.href)]),
        ),
      },
    })),
  ), ...localPages];
}
