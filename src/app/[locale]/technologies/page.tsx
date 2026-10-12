import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";

const GROUPS = [
  {
    labelKey: "frontendLabel",
    roleKey: "frontendRole",
    items: [
      { icon: "/tech/react.svg", name: "React", descKey: "react" },
      { icon: "/tech/vite.svg", name: "Vite", descKey: "vite" },
      { icon: "/tech/typescript.svg", name: "TypeScript", descKey: "typescript" },
      { icon: "/tech/nextjs.svg", name: "Next.js", descKey: "nextjs" },
    ],
  },
  {
    labelKey: "backendLabel",
    roleKey: "backendRole",
    items: [
      { icon: "/tech/java.svg", name: "Java", descKey: "java" },
      { icon: "/tech/spring.svg", name: "Spring Boot", descKey: "spring" },
    ],
  },
  {
    labelKey: "devopsLabel",
    roleKey: "devopsRole",
    items: [{ icon: "/tech/docker.svg", name: "Docker", descKey: "docker" }],
  },
] as const;

export async function generateMetadata({ params }: PageProps<"/[locale]/technologies">) {
  const { locale } = await params;
  return buildMetadata(locale, "technologies");
}

export default async function TechnologiesPage({
  params,
}: PageProps<"/[locale]/technologies">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("technologies");

  return (
    <>
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 340px at 20% 0%, rgba(106,27,154,0.5), transparent 70%)",
          }}
        />
        <Container className="relative py-[clamp(52px,7vw,86px)]">
          <Eyebrow className="text-brand-purple-200">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-3.5 max-w-[740px] text-[clamp(34px,4.6vw,56px)] leading-[1.08]">
            {t("pageTitle")}
          </h1>
          <p className="mt-5 max-w-[600px] text-lg leading-[1.62] text-white/70">
            {t("pageSubtitle")}
          </p>
        </Container>
      </section>

      <section className="flex flex-col gap-11 py-[clamp(48px,6vw,80px)]">
        <Container className="flex flex-col gap-11">
          {GROUPS.map((group) => (
            <div key={group.labelKey} className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-4">
                <h2 className="text-[clamp(22px,2.6vw,30px)] whitespace-nowrap">
                  {t(group.labelKey)}
                </h2>
                <span className="h-px flex-1 bg-brand-border" />
                <span className="font-mono text-[11.5px] tracking-[0.1em] text-brand-gray-400">
                  {t(group.roleKey)}
                </span>
              </div>
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start gap-4 rounded-2xl border border-brand-border bg-white p-6 transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-brand-purple"
                >
                  <div
                    className="h-[52px] w-[52px] shrink-0 rounded-[14px] border border-brand-border bg-[#FAF8FC] bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${item.icon})`, backgroundSize: "28px 28px" }}
                  />
                  <div>
                    <h3 className="text-lg">{item.name}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-[1.55] text-brand-gray">
                      {t(item.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Container>
      </section>

      <section className="pb-[clamp(72px,9vw,104px)]">
        <Container>
          <div className="rounded-[20px] border border-brand-border bg-brand-soft p-[clamp(28px,4vw,48px)]">
            <h2 className="text-[clamp(22px,2.6vw,30px)]">{t("whyTitle")}</h2>
            <div className="mt-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n}>
                  <h3 className="text-[17.5px] text-brand-purple">{t(`why${n}t`)}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-brand-gray">
                    {t(`why${n}p`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
