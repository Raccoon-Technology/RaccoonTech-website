import { getTranslations } from "next-intl/server";

export default async function StatsGrid({ variant = "purple" }: { variant?: "purple" | "dark" }) {
  const t = await getTranslations("stats");
  const items = [1, 2, 3, 4] as const;

  if (variant === "dark") {
    return (
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((n) => (
          <div key={n}>
            <div className="font-heading text-[clamp(30px,3.4vw,42px)] font-bold tracking-[-0.03em] text-brand-purple-200">
              {t(`stat${n}n`)}
            </div>
            <div className="mt-1.5 text-[14.5px] leading-relaxed text-white/62">
              {t(`stat${n}l`)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((n) => (
        <div key={n} className="border-l border-white/20 pr-4 pl-5">
          <div className="font-heading text-[clamp(32px,3.6vw,44px)] font-bold tracking-[-0.03em] text-white">
            {t(`stat${n}n`)}
          </div>
          <div className="mt-1.5 text-[14.5px] leading-relaxed text-white/70">
            {t(`stat${n}l`)}
          </div>
        </div>
      ))}
    </div>
  );
}
