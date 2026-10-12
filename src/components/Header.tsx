"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Container from "./Container";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { siteConfig } from "@/lib/site-config";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects", hidden: !siteConfig.showProjects },
  { href: "/technologies", key: "technologies" },
  { href: "/about", key: "about" },
].filter((item) => !item.hidden) as { href: string; key: string }[];

export default function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/95 lg:bg-white/[0.86] lg:backdrop-blur-md">
      <Container className="flex h-[60px] items-center gap-5">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={tA11y("mainNav")} className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2.5 text-[14.5px] font-medium transition-colors hover:bg-brand-purple-hover hover:text-brand-purple-dark ${
                pathname === item.href ? "text-brand-purple" : "text-brand-gray-700"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-brand-purple px-[18px] py-[11px] text-[14.5px] font-semibold whitespace-nowrap text-white shadow-[0_6px_18px_rgba(106,27,154,0.24)] transition-colors hover:bg-brand-purple-dark"
          >
            {t("cta")}
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            aria-label={tA11y("menu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute top-0 left-0 h-0.5 w-5 bg-brand-black transition-transform duration-200 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-2 left-0 h-0.5 w-5 bg-brand-black transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute top-4 left-0 h-0.5 w-5 bg-brand-black transition-transform duration-200 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full border-b border-brand-border bg-white shadow-[0_18px_30px_rgba(18,18,18,0.08)] transition-[transform,opacity,visibility] duration-200 ease-out lg:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-base font-medium ${
                pathname === item.href
                  ? "bg-brand-purple-10 text-brand-purple"
                  : "text-brand-black"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-brand-purple px-4 py-2.5 text-center text-base font-semibold text-white"
          >
            {t("cta")}
          </Link>
        </Container>
      </div>
    </header>
  );
}
