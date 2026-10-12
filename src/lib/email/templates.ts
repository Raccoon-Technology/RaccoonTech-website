import { siteConfig } from "../site-config";
import {
  type EmailLang,
  button,
  buttonRow,
  detailsTable,
  emailLayout,
  esc,
  paragraph,
  quoteBlock,
  stepsList,
} from "./layout";

export const LOGO_CID = "raccoon-logo";

export type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  deadline: string;
  message: string;
  locale: EmailLang;
};

export type RenderedEmail = { subject: string; html: string; text: string };

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** First name only, and only when it looks like a real name (no links or addresses). */
export function safeFirstName(name: string) {
  const first = oneLine(name).split(/\s+/)[0] ?? "";
  if (!first || first.length > 30 || /[@/:.]|www/i.test(first)) return "";
  return first;
}

/** Digits-only WhatsApp number (assumes Brazil when no country code was typed). */
export function whatsappDigits(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  if (digits.length >= 12 && digits.length <= 15) return digits;
  return "";
}

const NOT_INFORMED = "—";

/** Internal email sent to the company when someone submits the contact form. */
export function contactNotification(data: ContactRequest): RenderedEmail {
  const first = safeFirstName(data.name);
  const subject = `Novo pedido de orçamento — ${oneLine(data.name)}`;
  const waDigits = whatsappDigits(data.phone);
  const replySubject = "Seu pedido de orçamento — Raccoon Technology";
  const replyBody = `Olá${first ? `, ${first}` : ""}!\n\nObrigado por entrar em contato com a Raccoon Technology.\n\n`;
  const mailto = `mailto:${data.email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`;

  const rows = [
    { label: "Nome", value: esc(data.name) },
    {
      label: "E-mail",
      value: `<a class="em-link" href="mailto:${esc(data.email)}" style="color:#6A1B9A;text-decoration:none;">${esc(data.email)}</a>`,
    },
    {
      label: "Telefone",
      value: data.phone
        ? waDigits
          ? `<a class="em-link" href="https://wa.me/${waDigits}" style="color:#6A1B9A;text-decoration:none;">${esc(data.phone)}</a>`
          : esc(data.phone)
        : NOT_INFORMED,
    },
    { label: "Tipo de projeto", value: data.projectType ? esc(data.projectType) : NOT_INFORMED },
    { label: "Orçamento", value: data.budget ? esc(data.budget) : NOT_INFORMED },
    { label: "Prazo", value: data.deadline ? esc(data.deadline) : NOT_INFORMED },
    { label: "Idioma do site", value: data.locale === "en" ? "English" : "Português" },
  ];

  const actions = [button("Responder por e-mail", mailto)];
  if (waDigits) actions.push(button("Chamar no WhatsApp", `https://wa.me/${waDigits}`, "outline"));

  const html = emailLayout({
    lang: "pt-BR",
    preheader: `${oneLine(data.name)} enviou um pedido pelo site.`,
    eyebrow: "Novo contato pelo site",
    title: "Novo pedido de orçamento",
    logoSrc: `cid:${LOGO_CID}`,
    body: [
      paragraph("Chegou um novo pedido pelo formulário do site. Os dados estão abaixo."),
      detailsTable(rows),
      `<div style="margin:0 0 6px;font-family:'JetBrains Mono','Courier New',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#666666;">Mensagem</div>`,
      quoteBlock(esc(data.message)),
      buttonRow(actions),
    ].join("\n"),
    note: `Responder a este e-mail também funciona: a resposta vai direto para ${esc(data.email)}.`,
  });

  const text = [
    "Novo pedido de orçamento pelo site",
    "",
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    data.phone ? `Telefone: ${data.phone}` : null,
    data.projectType ? `Tipo de projeto: ${data.projectType}` : null,
    data.budget ? `Orçamento previsto: ${data.budget}` : null,
    data.deadline ? `Prazo desejado: ${data.deadline}` : null,
    `Idioma do site: ${data.locale === "en" ? "English" : "Português"}`,
    "",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
}

const CONFIRMATION_COPY = {
  "pt-BR": {
    subject: "Recebemos seu pedido — Raccoon Technology",
    preheader: "Recebemos seu pedido e respondemos em até 24 horas úteis.",
    eyebrow: "Pedido recebido",
    title: (first: string) => (first ? `Recebemos seu pedido, ${first}.` : "Recebemos seu pedido."),
    intro:
      "Obrigado por falar com a Raccoon Technology. Vamos analisar o que você enviou e responder em até 24 horas úteis, com as próximas perguntas ou já com uma proposta.",
    stepsTitle: "O que acontece agora",
    steps: [
      "Lemos o seu pedido com atenção.",
      "Respondemos neste e-mail em até 24 horas úteis.",
      "Combinamos escopo, prazo e valor, por escrito e sem compromisso.",
    ],
    whatsapp: "Se preferir agilizar, é só chamar no WhatsApp:",
    whatsappButton: "Falar no WhatsApp",
    note: (domain: string) =>
      `Você recebeu este e-mail porque preencheu o formulário em ${domain}. Se não foi você, pode ignorá-lo.`,
    signoff: "Até já,<br>Equipe Raccoon Technology",
  },
  en: {
    subject: "We received your request — Raccoon Technology",
    preheader: "We received your request and will reply within 24 business hours.",
    eyebrow: "Request received",
    title: (first: string) => (first ? `We received your request, ${first}.` : "We received your request."),
    intro:
      "Thanks for reaching out to Raccoon Technology. We'll review what you sent and reply within 24 business hours, with follow-up questions or already with a proposal.",
    stepsTitle: "What happens next",
    steps: [
      "We read your request carefully.",
      "We reply to this email within 24 business hours.",
      "We agree on scope, timeline and price, in writing and with no commitment.",
    ],
    whatsapp: "If you'd like to speed things up, message us on WhatsApp:",
    whatsappButton: "Chat on WhatsApp",
    note: (domain: string) =>
      `You received this email because you filled out the form at ${domain}. If that wasn't you, you can ignore it.`,
    signoff: "Talk soon,<br>The Raccoon Technology team",
  },
} as const;

/**
 * Automatic confirmation sent to the visitor. It deliberately echoes none of the
 * free-text fields, so the form cannot be used to put arbitrary content in our emails.
 */
export function visitorConfirmation(
  data: Pick<ContactRequest, "name" | "locale">,
): RenderedEmail {
  const copy = CONFIRMATION_COPY[data.locale];
  const first = safeFirstName(data.name);

  const html = emailLayout({
    lang: data.locale,
    preheader: copy.preheader,
    eyebrow: copy.eyebrow,
    title: copy.title(first),
    logoSrc: `cid:${LOGO_CID}`,
    body: [
      paragraph(esc(copy.intro)),
      `<h2 style="margin:22px 0 10px;font-family:'Space Grotesk',Helvetica,Arial,sans-serif;font-size:18px;color:#121212;">${esc(copy.stepsTitle)}</h2>`,
      stepsList([...copy.steps]),
      paragraph(esc(copy.whatsapp)),
      buttonRow([button(copy.whatsappButton, `https://wa.me/${siteConfig.whatsapp.number}`)]),
      `<p style="margin:26px 0 0;font-family:'IBM Plex Sans',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#121212;">${copy.signoff}</p>`,
    ].join("\n"),
    note: esc(copy.note(siteConfig.domain)),
  });

  const text = [
    copy.title(first),
    "",
    copy.intro,
    "",
    `${copy.stepsTitle}:`,
    ...copy.steps.map((step, i) => `${i + 1}. ${step}`),
    "",
    `${copy.whatsapp} https://wa.me/${siteConfig.whatsapp.number}`,
    "",
    copy.signoff.replace("<br>", "\n"),
  ].join("\n");

  return { subject: copy.subject, html, text };
}

/** Static, editable reply template for answering leads manually. */
export function manualReplyTemplate(lang: EmailLang, logoSrc: string) {
  const pt = lang === "pt-BR";
  return emailLayout({
    lang,
    preheader: pt ? "Resposta da Raccoon Technology." : "A reply from Raccoon Technology.",
    eyebrow: pt ? "Resposta ao seu pedido" : "Reply to your request",
    title: pt ? "Olá, [Nome]!" : "Hi [Name]!",
    logoSrc,
    body: [
      paragraph(
        pt
          ? "Obrigado por entrar em contato. [Escreva aqui a sua resposta, por exemplo, um resumo do que entendemos do projeto.]"
          : "Thanks for getting in touch. [Write your reply here, for example a summary of what we understood about the project.]",
      ),
      paragraph(
        pt
          ? "Para avançarmos, preciso confirmar com você: [pergunta 1] e [pergunta 2]."
          : "To move forward, I need to confirm with you: [question 1] and [question 2].",
      ),
      paragraph(
        pt
          ? "Se preferir, podemos conversar por uma chamada rápida. Me diga os melhores dias e horários."
          : "If you prefer, we can have a quick call. Let me know the best days and times.",
      ),
      buttonRow([
        button(pt ? "Falar no WhatsApp" : "Chat on WhatsApp", `https://wa.me/${siteConfig.whatsapp.number}`),
      ]),
      `<p style="margin:26px 0 0;font-family:'IBM Plex Sans',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#121212;">${pt ? "Um abraço," : "Best regards,"}<br>[${pt ? "Seu nome" : "Your name"}]<br>Raccoon Technology</p>`,
    ].join("\n"),
  });
}
