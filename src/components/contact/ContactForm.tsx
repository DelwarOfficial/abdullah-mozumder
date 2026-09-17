"use client";

import { useState, type FormEvent } from "react";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";

interface FormState {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  // Honeypot — bots fill this in, real users don't see it
  website: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  organization: "",
  subject: "",
  message: "",
  website: "",
};

type Status = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) {
      e.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) e.subject = "Please enter a subject.";
    if (!form.message.trim()) {
      e.message = "Please enter a message.";
    } else if (form.message.trim().length < 10) {
      e.message = "Message should be at least 10 characters.";
    }
    return e;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    // Honeypot — silently reject if filled
    if (form.website) {
      setStatus("success");
      setForm(initialState);
      return;
    }

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organization: form.organization,
          subject: form.subject,
          message: form.message,
          // Honeypot included so server can also reject bots
          website: form.website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
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
      <div
        role="status"
        aria-live="polite"
        className="border border-ink bg-paper-deep/40 p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 bg-newsroom text-paper mb-4">
          <Check className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-ink">
          Message sent.
        </h3>
        <p className="mt-2 text-sm text-ink-soft max-w-md mx-auto">
          Thank you for reaching out. Your message has been received and will
          be reviewed shortly. For urgent enquiries, please email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-newsroom hover:text-newsroom-deep underline underline-offset-2"
          >
            {siteConfig.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center px-5 py-2.5 border border-ink text-ink text-xs font-semibold uppercase tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={serverError ? "form-server-error" : undefined}
      className="space-y-5"
    >
      {/* Honeypot field — visually hidden, but present in DOM */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website-url">Website (leave blank)</label>
        <input
          id="website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          id="name"
          label="Name"
          required
          error={errors.name}
        >
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field
          id="email"
          label="Email"
          required
          error={errors.email}
        >
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="organization" label="Organization" required={false} error={undefined}>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            value={form.organization}
            onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
            className={inputClass(false)}
          />
        </Field>

        <Field id="subject" label="Subject" required error={errors.subject}>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={inputClass(!!errors.subject)}
          />
        </Field>
      </div>

      <Field id="message" label="Message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass(!!errors.message), "resize-y min-h-[150px]")}
        />
      </Field>

      {serverError && (
        <div
          id="form-server-error"
          role="alert"
          className="border border-newsroom bg-newsroom-soft p-4 flex items-start gap-3"
        >
          <AlertCircle className="h-5 w-5 text-newsroom mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-newsroom-deep">Could not send message.</p>
            <p className="text-sm text-newsroom-deep/80 mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ink text-paper text-sm font-semibold uppercase tracking-[0.14em] hover:bg-newsroom transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </button>
        <p className="text-xs text-ink-muted">
          Or email directly:{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-ink hover:text-newsroom underline underline-offset-2 transition-colors"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="editorial-eyebrow block mb-2"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-newsroom ml-1">*</span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-newsroom font-medium"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return cn(
    "w-full bg-transparent border px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition-colors focus:outline-none focus:border-ink",
    hasError ? "border-newsroom" : "border-rule",
  );
}
