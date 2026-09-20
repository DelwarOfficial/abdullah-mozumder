import { memberships } from "@/content/memberships";
import type { Locale } from "@/content/types";

interface CredentialsProps {
  locale: Locale;
}

export function Credentials({ locale }: CredentialsProps) {
  const chapterLabel = locale === "en" ? "Credentials" : "পেশাগত সদস্যপদ";
  const sectionTitle = locale === "en" ? "Professional Memberships" : "পেশাগত সদস্যপদ";

  return (
    <section aria-labelledby="credentials-heading" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <h2
          id="credentials-heading"
          className="section-headline text-ink mb-12 lg:mb-20"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
        >
          {sectionTitle}
        </h2>

        {/* Typography-led rows — no cards */}
        <div className="border-t border-ink">
          {memberships.map((m, idx) => (
            <div
              key={m.id}
              className="grid grid-cols-12 gap-x-4 lg:gap-x-8 gap-y-2 py-8 sm:py-12 border-b border-rule group"
            >
              {/* Number */}
              <div className="col-span-2 lg:col-span-1">
                <span
                  className="font-serif font-bold text-newsroom tabular-nums leading-none"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  0{idx + 1}
                </span>
              </div>

              {/* Organization */}
              <div className="col-span-10 lg:col-span-7">
                <h3
                  className="font-serif font-bold text-ink leading-[1.1] tracking-[-0.018em]"
                  style={{ fontSize: "clamp(1.625rem, 3.5vw, 2.75rem)" }}
                >
                  {m.organization[locale]}
                </h3>
                {m.shortName && (
                  <span className="editorial-eyebrow text-ink-muted mt-3 block">
                    {m.shortName}
                  </span>
                )}
              </div>

              {/* Role */}
              <div className="col-span-12 lg:col-span-4 lg:text-right lg:self-center">
                <p
                  className="font-serif text-ink-soft font-medium"
                  style={{ fontSize: "clamp(1.0625rem, 1.4vw, 1.375rem)" }}
                >
                  {m.role[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
