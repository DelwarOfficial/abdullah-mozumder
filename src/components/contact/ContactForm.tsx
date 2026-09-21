"use client";

import { useState, type FormEvent } from "react";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/content/types";

interface FormState {
  name: string; email: string; organization: string; subject: string; message: string; website: string;
}

const initialState: FormState = { name: "", email: "", organization: "", subject: "", message: "", website: "" };
type Status = "idle" | "submitting" | "success" | "error";
interface FieldErrors { name?: string; email?: string; subject?: string; message?: string; }

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const L = {
    name: locale === "en" ? "Name" : "নাম",
    email: locale === "en" ? "Email" : "ইমেইল",
    org: locale === "en" ? "Organization" : "প্রতিষ্ঠান",
    subject: locale === "en" ? "Subject" : "বিষয়",
    message: locale === "en" ? "Message" : "বার্তা",
    send: locale === "en" ? "Send message" : "বার্তা পাঠান",
    sending: locale === "en" ? "Sending…" : "পাঠানো হচ্ছে…",
    sent: locale === "en" ? "Message sent." : "বার্তা পাঠানো হয়েছে।",
    sentDesc: locale === "en" ? "Thank you for reaching out. Your message has been received and will be reviewed shortly." : "যোগাযোগের জন্য ধন্যবাদ। আপনার বার্তা এসে পড়েছে — শিগগিরই দেখা হবে।",
    sendAnother: locale === "en" ? "Send another message" : "আরেকটি বার্তা লিখুন",
    couldNotSend: locale === "en" ? "Could not send message." : "বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।",
    orEmail: locale === "en" ? "Or email directly" : "অথবা সরাসরি ইমেইল করুন",
    errName: locale === "en" ? "Please enter your name." : "আপনার নাম লিখুন।",
    errEmailReq: locale === "en" ? "Please enter your email." : "ইমেইল ঠিকানা লিখুন।",
    errEmailVal: locale === "en" ? "Please enter a valid email address." : "সঠিক ইমেইল ঠিকানা লিখুন।",
    errSubject: locale === "en" ? "Please enter a subject." : "বিষয় লিখুন।",
    errMsgReq: locale === "en" ? "Please enter a message." : "বার্তা লিখুন।",
    errMsgLen: locale === "en" ? "Message should be at least 10 characters." : "বার্তাটি কমপক্ষে ১০ অক্ষরের হতে হবে।",
  };

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!form.name.trim()) e.name = L.errName;
    if (!form.email.trim()) e.email = L.errEmailReq;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = L.errEmailVal;
    if (!form.subject.trim()) e.subject = L.errSubject;
    if (!form.message.trim()) e.message = L.errMsgReq;
    else if (form.message.trim().length < 10) e.message = L.errMsgLen;
    return e;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    if (form.website) { setStatus("success"); setForm(initialState); return; }
    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) { setStatus("idle"); return; }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 422) {
        const data = await res.json().catch(() => ({}));
        const fields: FieldErrors = data.fields ?? {};
        setErrors((prev) => ({ ...prev, ...fields }));
        setStatus("idle");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || (locale === "en" ? "Something went wrong." : "কিছু একটা সমস্যা হয়েছে।"));
      }
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="card-surface p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-newsroom text-paper mb-4"><Check className="h-6 w-6" aria-hidden="true" /></div>
        <h3 className="font-serif text-2xl font-semibold text-ink">{L.sent}</h3>
        <p className="mt-2 text-sm text-ink-soft max-w-md mx-auto">{L.sentDesc}</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary mt-6">{L.sendAnother}</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website-url">Website (leave blank)</label>
        <input id="website-url" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="name" label={L.name} required error={errors.name}><input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputClass(!!errors.name)} /></Field>
        <Field id="email" label={L.email} required error={errors.email}><input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputClass(!!errors.email)} /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="organization" label={L.org} required={false} error={undefined}><input id="organization" name="organization" type="text" autoComplete="organization" value={form.organization} onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))} className={inputClass(false)} /></Field>
        <Field id="subject" label={L.subject} required error={errors.subject}><input id="subject" name="subject" type="text" required value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} className={inputClass(!!errors.subject)} /></Field>
      </div>
      <Field id="message" label={L.message} required error={errors.message}><textarea id="message" name="message" required rows={6} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className={cn(inputClass(!!errors.message), "resize-y min-h-[150px]")} /></Field>
      {serverError && (
        <div id="form-server-error" role="alert" className="rounded-lg border border-newsroom bg-newsroom-soft p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-newsroom mt-0.5 shrink-0" aria-hidden="true" />
          <div><p className="text-sm font-medium text-newsroom-deep">{L.couldNotSend}</p><p className="text-sm text-newsroom-deep/80 mt-0.5">{serverError}</p></div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
          {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{L.sending}</>) : L.send}
        </button>
        <p className="text-xs text-ink-muted">{L.orEmail}: <a href={`mailto:${siteConfig.email}`} className="text-ink hover:text-newsroom underline underline-offset-2 transition-colors">{siteConfig.email}</a></p>
      </div>
    </form>
  );
}

function Field({ id, label, required, error, children }: { id: string; label: string; required: boolean; error?: string; children: React.ReactNode; }) {
  return (
    <div>
      <label htmlFor={id} className="editorial-eyebrow block mb-2">{label}{required && <span aria-hidden="true" className="text-newsroom ml-1">*</span>}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-newsroom font-medium">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return cn("w-full rounded-lg border bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted transition focus:outline-none focus:border-newsroom focus:ring-2 focus:ring-newsroom/20", hasError ? "border-newsroom" : "border-rule");
}
