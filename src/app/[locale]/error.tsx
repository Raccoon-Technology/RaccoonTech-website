"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { Link } from "@/i18n/navigation";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-[clamp(72px,10vw,130px)]">
      <Container>
        <Eyebrow>Error</Eyebrow>
        <h1 className="mt-3.5 max-w-[640px] text-[clamp(34px,4.6vw,56px)] leading-[1.08]">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-[520px] text-lg leading-[1.62] text-brand-gray">{t("text")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-full bg-brand-purple px-[26px] py-[15px] text-[16px] font-semibold text-white transition-colors hover:bg-brand-purple-dark"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="rounded-full border border-brand-purple-border px-[26px] py-[15px] text-[16px] font-semibold text-brand-purple transition-colors hover:bg-brand-purple-hover"
          >
            {t("home")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
