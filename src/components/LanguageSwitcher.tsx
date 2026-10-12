"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES: { code: "pt-BR" | "en"; label: string; nameKey: "langPT" | "langEN" }[] = [
  { code: "pt-BR", label: "PT", nameKey: "langPT" },
  { code: "en", label: "EN", nameKey: "langEN" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("a11y");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center rounded-full border border-brand-border p-0.5 font-mono text-[11px]"
    >
      {LOCALES.map(({ code, label, nameKey }) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={`cursor-pointer rounded-full px-2.5 py-[5px] transition-colors ${
            locale === code
              ? "bg-brand-purple text-white"
              : "text-brand-gray hover:text-brand-black"
          }`}
          aria-pressed={locale === code}
          aria-label={`${label} - ${t(nameKey)}`}
          lang={code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
