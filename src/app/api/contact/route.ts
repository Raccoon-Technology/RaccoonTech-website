import { NextResponse } from "next/server";
import { Resend } from "resend";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { EMAIL_LOGO_BASE64 } from "@/lib/email/logo-data";
import { LOGO_CID, contactNotification, visitorConfirmation } from "@/lib/email/templates";

const LIMITS = { name: 100, email: 200, phone: 40, option: 100, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort limiter: state lives in memory, so on serverless it is per instance, not global.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill the hidden field or submit instantly; answer "ok" so they get no signal.
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : Infinity;
  if (field(body.website, 200) || elapsed < 1500) {
    return NextResponse.json({ ok: true });
  }

  const name = field(body.name, LIMITS.name);
  const email = field(body.email, LIMITS.email);
  const phone = field(body.phone, LIMITS.phone);
  const projectType = field(body.projectType, LIMITS.option);
  const budget = field(body.budget, LIMITS.option);
  const deadline = field(body.deadline, LIMITS.option);
  const message = field(body.message, LIMITS.message);
  const locale = routing.locales.find((l) => l === body.locale) ?? routing.defaultLocale;

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form email not sent.");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const from = `Raccoon Technology <contato@${siteConfig.domain}>`;
  const logo = {
    filename: "logo.png",
    content: Buffer.from(EMAIL_LOGO_BASE64, "base64"),
    contentType: "image/png",
    contentId: LOGO_CID,
  };

  const notification = contactNotification({
    name,
    email,
    phone,
    projectType,
    budget,
    deadline,
    message,
    locale,
  });

  const { error } = await resend.emails.send({
    from,
    to: process.env.CONTACT_TO_EMAIL ?? siteConfig.emails.contact,
    replyTo: email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    attachments: [logo],
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }

  // The lead is already safely delivered; a failed confirmation must not fail the request.
  if (siteConfig.autoReplyToVisitors) {
    const confirmation = visitorConfirmation({ name, locale });
    const { error: confirmationError } = await resend.emails.send({
      from,
      to: email,
      replyTo: siteConfig.emails.contact,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
      attachments: [logo],
    });
    if (confirmationError) console.error("Resend confirmation error:", confirmationError);
  }

  return NextResponse.json({ ok: true });
}
