"use client";

import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/site-config";

export default function WhatsAppButton() {
  const t = useTranslations("contact");

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-[22px] bottom-[22px] z-[60] flex items-center gap-2.5 rounded-full bg-whatsapp px-5 py-3.5 text-[15px] font-semibold text-brand-black shadow-[0_12px_32px_rgba(37,211,102,0.42)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(37,211,102,0.5)]"
    >
      <span aria-hidden="true" className="font-mono text-xs tracking-[0.06em]">
        WA
      </span>
      {t("whatsapp")}
    </a>
  );
}
