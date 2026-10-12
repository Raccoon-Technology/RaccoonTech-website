import { siteConfig } from "../site-config";

export type EmailLang = "pt-BR" | "en";

const C = {
  purple: "#6A1B9A",
  purpleDark: "#4A148C",
  black: "#121212",
  gray: "#666666",
  border: "#ECE7F2",
  soft: "#FCFBFD",
  tint: "#F1E8F8",
  page: "#F4F1F8",
  light: "#C9A8E4",
};

const FONT_BODY = "'IBM Plex Sans', Helvetica, Arial, sans-serif";
const FONT_HEADING = "'Space Grotesk', Helvetica, Arial, sans-serif";
const FONT_MONO = "'JetBrains Mono', 'Courier New', monospace";

export function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function paragraph(html: string) {
  return `<p class="em-text" style="margin:0 0 16px;font-family:${FONT_BODY};font-size:16px;line-height:1.65;color:${C.black};">${html}</p>`;
}

export function button(label: string, href: string, variant: "primary" | "outline" = "primary") {
  const style =
    variant === "primary"
      ? `background:${C.purple};color:#ffffff;border:1px solid ${C.purple};`
      : `background:#ffffff;color:${C.purple};border:1px solid #D6C4E8;`;
  return `<a href="${esc(href)}" style="display:inline-block;${style}border-radius:999px;padding:13px 24px;font-family:${FONT_BODY};font-size:15px;font-weight:600;text-decoration:none;">${esc(label)}</a>`;
}

export function buttonRow(buttons: string[]) {
  const cells = buttons
    .map((b) => `<td style="padding:0 10px 10px 0;">${b}</td>`)
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 0;"><tr>${cells}</tr></table>`;
}

export function detailsTable(rows: { label: string; value: string }[]) {
  const body = rows
    .map(
      (row) => `<tr>
        <td class="em-muted" style="padding:11px 16px 11px 0;border-bottom:1px solid ${C.border};font-family:${FONT_MONO};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${C.gray};vertical-align:top;white-space:nowrap;">${esc(row.label)}</td>
        <td class="em-text" style="padding:11px 0;border-bottom:1px solid ${C.border};font-family:${FONT_BODY};font-size:15px;color:${C.black};vertical-align:top;">${row.value}</td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 20px;">${body}</table>`;
}

export function quoteBlock(html: string) {
  return `<div class="em-soft" style="margin:0 0 20px;padding:16px 18px;background:${C.soft};background-image:linear-gradient(${C.soft},${C.soft});border:1px solid ${C.border};border-left:4px solid ${C.purple};border-radius:8px;font-family:${FONT_BODY};font-size:15px;line-height:1.65;color:${C.black};white-space:pre-wrap;">${html}</div>`;
}

export function stepsList(steps: string[]) {
  const rows = steps
    .map(
      (text, i) => `<tr>
        <td style="width:36px;padding:0 0 14px;vertical-align:top;">
          <div style="width:28px;height:28px;border-radius:8px;background:${C.tint};color:${C.purple};font-family:${FONT_MONO};font-size:12px;font-weight:500;line-height:28px;text-align:center;">0${i + 1}</div>
        </td>
        <td style="padding:3px 0 14px;font-family:${FONT_BODY};font-size:15px;line-height:1.55;color:${C.black};vertical-align:top;">${esc(text)}</td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 12px;">${rows}</table>`;
}

type LayoutOptions = {
  lang: EmailLang;
  /** Hidden inbox preview text. */
  preheader: string;
  eyebrow?: string;
  title: string;
  /** Already-escaped HTML for the card body. */
  body: string;
  /** `cid:` reference for sent emails, absolute URL for static templates. */
  logoSrc: string;
  /** Small gray note under the card (already escaped). */
  note?: string;
};

export function emailLayout({ lang, preheader, eyebrow, title, body, logoSrc, note }: LayoutOptions) {
  const tagline = lang === "en" ? "Custom software" : "Software sob medida";
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<style>
  :root { color-scheme: light only; supported-color-schemes: light only; }
  @media (prefers-color-scheme: dark) {
    .em-page { background: ${C.page} !important; }
    .em-card { background: #ffffff !important; }
    .em-footer { background: ${C.black} !important; }
    .em-soft { background: ${C.soft} !important; }
    .em-text { color: ${C.black} !important; }
    .em-muted { color: ${C.gray} !important; }
    .em-link { color: ${C.purple} !important; }
  }
</style>
<title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body class="em-page" bgcolor="${C.page}" style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="em-page" bgcolor="${C.page}" style="background:${C.page};background-image:linear-gradient(${C.page},${C.page});">
<tr><td align="center" class="em-page" bgcolor="${C.page}" style="padding:28px 12px;background:${C.page};background-image:linear-gradient(${C.page},${C.page});">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">
    <tr><td style="height:5px;background:${C.purple};border-radius:14px 14px 0 0;font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td class="em-card" bgcolor="#ffffff" style="background:#ffffff;background-image:linear-gradient(#ffffff,#ffffff);padding:22px 32px;border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:12px;vertical-align:middle;"><img src="${esc(logoSrc)}" width="44" height="36" alt="Raccoon Technology" style="display:block;border:0;width:44px;height:36px;"></td>
        <td style="vertical-align:middle;line-height:1;">
          <div style="font-family:${FONT_HEADING};font-size:18px;font-weight:700;letter-spacing:-0.02em;color:${C.black};">Raccoon</div>
          <div style="margin-top:3px;font-family:${FONT_MONO};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${C.purple};">Technology</div>
        </td>
      </tr></table>
    </td></tr>
    <tr><td class="em-card" bgcolor="#ffffff" style="background:#ffffff;background-image:linear-gradient(#ffffff,#ffffff);padding:8px 32px 34px;border-left:1px solid ${C.border};border-right:1px solid ${C.border};">
      ${eyebrow ? `<div style="font-family:${FONT_MONO};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${C.purple};">${esc(eyebrow)}</div>` : ""}
      <h1 class="em-text" style="margin:10px 0 18px;font-family:${FONT_HEADING};font-size:26px;line-height:1.2;letter-spacing:-0.02em;color:${C.black};">${esc(title)}</h1>
      ${body}
    </td></tr>
    <tr><td class="em-footer" bgcolor="${C.black}" style="background:${C.black};background-image:linear-gradient(${C.black},${C.black});padding:26px 32px;border-radius:0 0 14px 14px;">
      <div style="font-family:${FONT_HEADING};font-size:15px;font-weight:700;color:#ffffff;">Raccoon Technology</div>
      <div style="margin-top:3px;font-family:${FONT_MONO};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${C.light};">${esc(tagline)}</div>
      <div style="margin-top:14px;font-family:${FONT_BODY};font-size:13px;line-height:1.8;color:rgba(255,255,255,0.72);">
        <a href="${esc(siteConfig.url)}" style="color:#ffffff;text-decoration:none;">${esc(siteConfig.domain)}</a><br>
        <a href="mailto:${esc(siteConfig.emails.contact)}" style="color:rgba(255,255,255,0.72);text-decoration:none;">${esc(siteConfig.emails.contact)}</a><br>
        <a href="${esc(whatsappUrl)}" style="color:rgba(255,255,255,0.72);text-decoration:none;">WhatsApp ${esc(siteConfig.whatsapp.display)}</a><br>
        <a href="${esc(siteConfig.instagram.url)}" style="color:rgba(255,255,255,0.72);text-decoration:none;">Instagram @${esc(siteConfig.instagram.handle)}</a>
      </div>
    </td></tr>
    ${note ? `<tr><td style="padding:16px 8px 0;font-family:${FONT_BODY};font-size:12px;line-height:1.6;color:${C.gray};text-align:center;">${note}</td></tr>` : ""}
  </table>
</td></tr>
</table>
</body>
</html>`;
}

type SignatureOptions = { logoSrc: string };

/** Compact signature meant to be pasted into a mail client (Gmail, Outlook, Apple Mail). */
export function signatureHtml({ logoSrc }: SignatureOptions) {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}`;
  return `<table cellpadding="0" cellspacing="0" style="font-family:${FONT_BODY};font-size:14px;color:${C.black};border-top:3px solid ${C.purple};padding-top:12px;">
<tr>
  <td style="padding:12px 16px 0 0;vertical-align:top;"><img src="${esc(logoSrc)}" width="56" height="46" alt="Raccoon Technology" style="display:block;border:0;"></td>
  <td style="padding-top:12px;vertical-align:top;line-height:1.55;">
    <div style="font-family:${FONT_HEADING};font-size:16px;font-weight:700;color:${C.black};">[Seu nome]</div>
    <div style="color:${C.gray};">[Seu cargo] &middot; Raccoon Technology</div>
    <div style="margin-top:8px;">
      <a href="mailto:${esc(siteConfig.emails.contact)}" style="color:${C.purple};text-decoration:none;">${esc(siteConfig.emails.contact)}</a><br>
      <a href="${esc(whatsappUrl)}" style="color:${C.purple};text-decoration:none;">WhatsApp ${esc(siteConfig.whatsapp.display)}</a><br>
      <a href="${esc(siteConfig.url)}" style="color:${C.purple};text-decoration:none;">${esc(siteConfig.domain)}</a><br>
      <a href="${esc(siteConfig.instagram.url)}" style="color:${C.purple};text-decoration:none;">Instagram @${esc(siteConfig.instagram.handle)}</a>
    </div>
  </td>
</tr>
</table>`;
}
