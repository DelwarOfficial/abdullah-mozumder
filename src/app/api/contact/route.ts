import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteConfig } from "@/content/site";

/**
 * Contact form handler.
 *
 * Pipeline:
 *  1. Honeypot ("website") — bots get a fake success, nothing stored.
 *  2. Server-side validation (mirrors client) + length caps.
 *  3. In-memory per-IP rate limit (60s window).
 *  4. Persist to SQLite (Prisma) — the durable record.
 *  5. Best-effort email via Resend REST API when RESEND_API_KEY is set.
 *     Email failure never loses the message — it's already stored.
 *
 * Secrets (RESEND_API_KEY, CONTACT_TO, CONTACT_FROM) live in .env only —
 * never exposed to the client.
 */

interface ContactPayload {
  name?: string;
  email?: string;
  organization?: string;
  subject?: string;
  message?: string;
  website?: string;
}

// Simple in-memory rate limiter (per IP, last 60s).
// For multi-instance production, use Redis or an edge rate-limit service.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; firstHit: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  // Prune expired entries so the Map cannot grow without bound
  if (ipHits.size > 0 && ipHits.size % 100 === 0) {
    for (const [key, value] of ipHits) {
      if (now - value.firstHit > RATE_LIMIT_WINDOW_MS) ipHits.delete(key);
    }
  }
  const entry = ipHits.get(ip);
  if (!entry || now - entry.firstHit > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, firstHit: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const MAX_LEN = {
  name: 120,
  email: 200,
  organization: 200,
  subject: 200,
  message: 5000,
};

async function sendEmail(input: {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.CONTACT_TO || siteConfig.email;
  const from = process.env.CONTACT_FROM || "Portfolio Contact <onboarding@resend.dev>";

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `[Portfolio] ${input.subject}`,
        html: [
          `<p><strong>${escape(input.name)}</strong> &lt;${escape(input.email)}&gt;${input.organization ? ` — ${escape(input.organization)}` : ""}</p>`,
          `<p>${escape(input.message).replace(/\n/g, "<br/>")}</p>`,
        ].join(""),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — silently succeed without storing or sending anything.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();
  const organization = (body.organization ?? "").trim();

  // Server-side validation
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  else if (name.length > MAX_LEN.name) errors.name = "Name is too long.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Email is invalid.";
  else if (email.length > MAX_LEN.email) errors.email = "Email is too long.";
  if (!subject) errors.subject = "Subject is required.";
  else if (subject.length > MAX_LEN.subject) errors.subject = "Subject is too long.";
  if (!message) errors.message = "Message is required.";
  else if (message.length < 10) errors.message = "Message is too short.";
  else if (message.length > MAX_LEN.message) errors.message = "Message is too long.";
  if (organization.length > MAX_LEN.organization) errors.organization = "Organization is too long.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", fields: errors }, { status: 422 });
  }

  // Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  // 1) Durable record — email delivery never depends on this succeeding first.
  let storedId: string | null = null;
  try {
    const stored = await db.contactMessage.create({
      data: { name, email, organization: organization || null, subject, message, ip },
    });
    storedId = stored.id;
  } catch (err) {
    console.error("[contact] DB write failed:", err);
    return NextResponse.json(
      { error: "Could not save your message. Please try again or email directly." },
      { status: 500 },
    );
  }

  // 2) Best-effort email notification.
  const emailSent = await sendEmail({ name, email, organization, subject, message });
  if (!emailSent) {
    if (process.env.RESEND_API_KEY) {
      console.warn(`[contact] Email delivery failed for stored message ${storedId}`);
    }
    try {
      await db.contactMessage.update({
        where: { id: storedId! },
        data: { emailSent: false },
      });
    } catch {}
  } else {
    try {
      await db.contactMessage.update({
        where: { id: storedId! },
        data: { emailSent: true },
      });
    } catch {}
  }

  return NextResponse.json({ ok: true });
}
