import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";

export const alt = "Raccoon Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 90px",
          color: "#ffffff",
          background:
            "radial-gradient(700px 420px at 85% 10%, rgba(106,27,154,0.65), #121212 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 260,
            height: 260,
            borderRadius: 56,
            background: "#ffffff",
          }}
        >
          <img src={src} width={200} height={164} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
            Raccoon Technology
          </div>
          <div style={{ fontSize: 40, marginTop: 14, color: "#C9A8E4" }}>
            {t("ogTagline")}
          </div>
          <div style={{ fontSize: 28, marginTop: 40, color: "rgba(255,255,255,0.6)" }}>
            {siteConfig.domain}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
