import type { Locale } from "@/content/types";

interface DarkStatementProps {
  locale: Locale;
}

/**
 * §8.11 — Approach to journalism. Website copy, not a quote from Abdullah.
 */
export function DarkStatement({ locale }: DarkStatementProps) {
  const words = locale === "en"
    ? ["Report.", "Verify.", "Explain."]
    : ["প্রতিবেদন।", "যাচাই।", "ব্যাখ্যা।"];

  return (
    <section
      aria-label={locale === "en" ? "Approach to journalism" : "সাংবাদিকতার কর্মপদ্ধতি"}
      className="bg-night text-paper py-20 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl">
          <div className="space-y-2 sm:space-y-4">
            {words.map((word) => (
              <h2
                key={word}
                className="font-serif font-semibold text-paper leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
              >
                {word}
              </h2>
            ))}
          </div>

          <p className="mt-12 text-sm sm:text-base text-paper/50 italic max-w-xl">
            {locale === "en"
              ? "This is website copy describing an approach to journalism — not a direct quote attributed to Abdullah Mozomdar."
              : "এই বিবৃতিটি সাংবাদিকতার কর্মপদ্ধতি বোঝাতে লেখা — আবদুল্লাহ মোজুমদারের সরাসরি উক্তি নয়।"}
          </p>
        </div>
      </div>
    </section>
  );
}
