import type { Locale } from "@/content/types";

interface DarkStatementProps {
  locale: Locale;
}

export function DarkStatement({ locale }: DarkStatementProps) {
  const words = locale === "en"
    ? ["Report.", "Verify.", "Explain."]
    : ["প্রতিবেদন।", "যাচাই।", "ব্যাখ্যা।"];

  return (
    <section
      aria-label={locale === "en" ? "Editorial principles" : "সম্পাদকীয় নীতি"}
      className="relative bg-night text-paper py-20 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Ghost background type */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-serif font-bold text-paper/[0.03] leading-none tracking-[-0.05em]"
          style={{ fontSize: "clamp(14rem, 40vw, 40rem)" }}
        >
          {locale === "en" ? "AM" : "আম"}
        </span>
      </div>

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl">
          <p className="editorial-eyebrow text-paper/40 mb-8">
            {locale === "en" ? "Editorial Statement" : "সম্পাদকীয় বিবৃতি"}
          </p>

          <div className="space-y-2 sm:space-y-4">
            {words.map((word, idx) => (
              <div key={idx} className="flex items-baseline gap-4 sm:gap-8">
                <span
                  className="font-mono text-newsroom font-bold tabular-nums text-sm sm:text-base"
                  aria-hidden="true"
                >
                  0{idx + 1}
                </span>
                <h2
                  className="font-serif font-bold text-paper leading-[0.95] tracking-[-0.035em]"
                  style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
                >
                  {word}
                </h2>
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm sm:text-base text-paper/50 italic max-w-xl">
            {locale === "en"
              ? "Editorial site copy describing journalism principles. Not a direct quote attributed to the journalist."
              : "সাংবাদিকতার নীতি বর্ণনাকারী সম্পাদকীয় লেখা। এটি সাংবাদিকের সরাসরি উক্তি নয়।"}
          </p>
        </div>
      </div>
    </section>
  );
}
