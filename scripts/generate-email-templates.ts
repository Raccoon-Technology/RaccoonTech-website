/**
 * Generates the static, copy-paste email templates from the same layout the site uses.
 *
 *   npx tsx scripts/generate-email-templates.ts
 *   npx tsx scripts/generate-email-templates.ts --preview /some/dir   (also renders sample site emails)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { signatureHtml } from "../src/lib/email/layout";
import {
  contactNotification,
  manualReplyTemplate,
  visitorConfirmation,
} from "../src/lib/email/templates";
import { siteConfig } from "../src/lib/site-config";

// Static files cannot use inline (cid:) images, so they point at the deployed site.
const REMOTE_LOGO = `${siteConfig.url}/email-logo.png`;
const OUT_DIR = join(process.cwd(), "email-templates");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "reply.pt-BR.html"), manualReplyTemplate("pt-BR", REMOTE_LOGO));
writeFileSync(join(OUT_DIR, "reply.en.html"), manualReplyTemplate("en", REMOTE_LOGO));
// The signature is a fragment, so wrap it to declare UTF-8 when opened in a browser.
const wrapFragment = (html: string) =>
  `<!DOCTYPE html>\n<html lang="pt-BR">\n<head><meta charset="utf-8"><title>Assinatura</title></head>\n<body style="margin:24px;">\n${html}\n</body>\n</html>\n`;
writeFileSync(join(OUT_DIR, "signature.html"), wrapFragment(signatureHtml({ logoSrc: REMOTE_LOGO })));
console.log(`Wrote reply.pt-BR.html, reply.en.html and signature.html to ${OUT_DIR}`);

const previewFlag = process.argv.indexOf("--preview");
if (previewFlag !== -1) {
  const dir = process.argv[previewFlag + 1];
  if (!dir) throw new Error("--preview needs a directory");
  mkdirSync(dir, { recursive: true });

  // In previews the logo comes from the local file so it renders before the site is deployed.
  const localLogo = "http://localhost:4999/email-logo.png";
  const swap = (html: string) => html.replaceAll("cid:raccoon-logo", localLogo);

  const sample = {
    name: "Mariana Souza",
    email: "mariana@empresa.com.br",
    phone: "(92) 98888-7777",
    projectType: "Sistema de Gestão Interna",
    budget: "R$ 8 mil a R$ 20 mil",
    deadline: "1 a 3 meses",
    message:
      "Olá! Temos uma distribuidora e hoje controlamos pedidos e estoque em planilhas.\nGostaríamos de um sistema para organizar isso e emitir relatórios.",
    locale: "pt-BR" as const,
  };
  writeFileSync(join(dir, "notification.html"), swap(contactNotification(sample).html));
  writeFileSync(join(dir, "confirmation.pt-BR.html"), swap(visitorConfirmation(sample).html));
  writeFileSync(
    join(dir, "confirmation.en.html"),
    swap(visitorConfirmation({ ...sample, locale: "en" }).html),
  );
  writeFileSync(join(dir, "reply.pt-BR.html"), manualReplyTemplate("pt-BR", localLogo));
  writeFileSync(join(dir, "signature.html"), wrapFragment(signatureHtml({ logoSrc: localLogo })));
  console.log(`Wrote previews to ${dir}`);
}
