import { getTranslations } from "next-intl/server";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="py-[clamp(72px,10vw,130px)]">
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-3.5 max-w-[640px] text-[clamp(34px,4.6vw,56px)] leading-[1.08]">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-[520px] text-lg leading-[1.62] text-brand-gray">{t("text")}</p>
        <Button href="/" className="mt-8">
          {t("button")}
        </Button>
      </Container>
    </section>
  );
}
