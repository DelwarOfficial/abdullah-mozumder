import { NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * Security:
 *  - Honeypot field ("website") — silently drop bot submissions
 *  - Server-side validation (mirror of client validation)
 *  - Rate-limit ready (in-memory per-IP counter, see comment below)
 *  - Input length caps to prevent abuse
 *
 * The current implementation logs submissions to the server console and
 * returns success. To enable email delivery, integrate with a transactional
 * email provider (e.g. Resend, SendGrid, Postmark) by reading process.env
 * API keys — NEVER expose them to the client.
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
// For production, use Redis or an edge rate-limit service.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; firstHit: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
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

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — silently succeed without sending anything.
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

  // Log submission (server-side only — never expose to client)
   
  console.log("[contact] New submission:", {
    name,
    email,
    organization,
    subject,
    messagePreview: message.slice(0, 80) + (message.length > 80 ? "…" : ""),
    ip,
    at: new Date().toISOString(),
  });

  // TODO: forward to a transactional email provider here, e.g.:
  // await resend.emails.send({ from: 'portfolio@...', to: profile.email, ... })

  return NextResponse.json({ ok: true });
}
