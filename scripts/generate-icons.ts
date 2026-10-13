/**
 * Generates the favicon set from public/logo.png.
 *
 *   npx tsx scripts/generate-icons.ts
 *
 * Google requires a square favicon whose size is a multiple of 48px and shows it in a
 * circle, so the logo is kept inside ~74% of a white square.
 */
import { createElement as h } from "react";
import { ImageResponse } from "next/og";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();
const LOGO_RATIO = 752 / 915;

async function renderSquare(logoSrc: string, size: number) {
  const width = Math.round(size * 0.74);
  const response = new ImageResponse(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        },
      },
      h("img", { src: logoSrc, width, height: Math.round(width * LOGO_RATIO), alt: "" }),
    ),
    { width: size, height: size },
  );
  return Buffer.from(await response.arrayBuffer());
}

/** Wraps one PNG in an ICO container (PNG-in-ICO is supported by every modern browser). */
function pngToIco(png: Buffer, size: number) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size, 6); // width
  header.writeUInt8(size, 7); // height
  header.writeUInt8(0, 8); // palette colors
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // color planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14); // image data size
  header.writeUInt32LE(22, 18); // image data offset
  return Buffer.concat([header, png]);
}

async function main() {
  const logo = await readFile(join(ROOT, "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  const icon48 = await renderSquare(logoSrc, 48);
  await writeFile(join(ROOT, "src/app/favicon.ico"), pngToIco(icon48, 48));
  await writeFile(join(ROOT, "src/app/icon.png"), await renderSquare(logoSrc, 192));
  await writeFile(join(ROOT, "public/logo-square.png"), await renderSquare(logoSrc, 512));
  console.log("Wrote src/app/favicon.ico (48), src/app/icon.png (192) and public/logo-square.png (512)");
}

main();
