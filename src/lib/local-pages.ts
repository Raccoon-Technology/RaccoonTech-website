/**
 * Portuguese-only landing pages that target local searches ("criar site manaus" etc.).
 * `key` points at messages `local.pages.<key>`; `serviceKey` at the matching `services.<key>` entry.
 */
export const LOCAL_PAGES = [
  { key: "sites", slug: "criacao-de-sites-manaus", serviceKey: "institutionalSite" },
  { key: "store", slug: "loja-virtual-manaus", serviceKey: "ecommerce" },
  { key: "systems", slug: "sistemas-de-gestao-manaus", serviceKey: "management" },
  { key: "software", slug: "desenvolvimento-de-software-manaus", serviceKey: "customSoftware" },
] as const;

export type LocalPageKey = (typeof LOCAL_PAGES)[number]["key"];

export const LOCAL_PAGE_PATHS: string[] = LOCAL_PAGES.map((page) => `/${page.slug}`);

export function isLocalPagePath(pathname: string) {
  return LOCAL_PAGE_PATHS.includes(pathname);
}
