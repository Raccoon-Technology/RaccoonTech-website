"use client";

import { FormEvent, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());

  const projectTypes = t.raw("projectTypes") as string[];
  const budgets = t.raw("budgets") as string[];
  const deadlines = t.raw("deadlines") as string[];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, elapsed: Date.now() - startedAt }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "rounded-[10px] border border-[#E2DCEA] bg-white px-3.5 py-[13px] text-[15px] text-brand-black outline-none transition-[border-color,box-shadow] placeholder:text-brand-gray-400 focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(106,27,154,0.12)]";

  if (status === "sent") {
    return (
      <div role="status" className="px-2.5 py-10 text-center">
        <Image src="/logo.png" alt="" width={915} height={752} className="mx-auto h-16 w-auto" />
        <h2 className="mt-5 text-2xl">{t("successTitle")}</h2>
        <p className="mt-3 text-[15.5px] leading-[1.62] text-brand-gray">{t("successText")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-brand-purple-border px-5 py-3 text-[14.5px] font-semibold text-brand-purple transition-colors hover:bg-brand-purple-hover"
        >
          {t("successButton")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <h2 className="text-[22px]">{t("formTitle")}</h2>
        <p className="mt-2 text-[14.5px] leading-[1.55] text-brand-gray">{t("formSubtitle")}</p>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold">{t("formName")}</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          required
          placeholder={t("formNamePlaceholder")}
          className={inputClasses}
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold">{t("formEmail")}</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
            placeholder={t("formEmailPlaceholder")}
            className={inputClasses}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold">{t("formPhone")}</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            placeholder={t("formPhonePlaceholder")}
            className={inputClasses}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold">{t("formProjectType")}</span>
        <select name="projectType" defaultValue="" className={`${inputClasses} appearance-none`}>
          <option value="" disabled>
            {t("selectPlaceholder")}
          </option>
          {projectTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold">{t("formBudget")}</span>
          <select name="budget" defaultValue="" className={`${inputClasses} appearance-none`}>
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {budgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold">{t("formDeadline")}</span>
          <select name="deadline" defaultValue="" className={`${inputClasses} appearance-none`}>
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {deadlines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold">{t("formMessage")}</span>
        <textarea
          name="message"
          rows={5}
          maxLength={5000}
          required
          placeholder={t("formMessagePlaceholder")}
          className={`${inputClasses} resize-y font-[inherit]`}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-brand-purple py-[15px] text-base font-semibold text-white shadow-[0_10px_26px_rgba(106,27,154,0.24)] transition-colors hover:bg-brand-purple-dark disabled:opacity-60"
      >
        {status === "sending" ? t("formSending") : t("formSubmit")}
      </button>
      <p className="text-center text-[12.5px] leading-[1.55] text-brand-gray-400">
        {t("formPrivacyNote")}{" "}
        <Link href="/privacy" className="underline hover:text-brand-purple">
          {t("formPrivacyLink")}
        </Link>
      </p>
      {status === "error" && (
        <p role="alert" className="text-center text-sm font-medium text-red-700">{t("formErrorBanner")}</p>
      )}
    </form>
  );
}
