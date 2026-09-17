import type { Locale } from "@/content/types";

interface PrinciplesProps {
  locale: Locale;
}

export function Principles({ locale }: PrinciplesProps) {
  const principles = locale === "en"
    ? [
        { word: "Accuracy.", desc: "Every fact verified before publication. Corrections issued promptly when needed." },
        { word: "Clarity.", desc: "Plain language over jargon. Stories structured so readers can follow without effort." },
        { word: "Public Interest.", desc: "Reporting that serves the reader — not the powerful. Stories chosen because they matter." },
        { word: "Verification.", desc: "Multiple sources. Primary documents. On-the-ground reporting wherever possible." },
      ]
    : [
        { word: "নির্ভুলতা।", desc: "প্রকাশের আগে প্রতিটি তথ্য যাচাই করা। প্রয়োজনে দ্রুত সংশোধন প্রকাশ।" },
        { word: "স্বচ্ছতা।", desc: "সহজ ভাষা, পরিষ্কার গঠন। পাঠকের বোঝার সুবিধার জন্য গল্প সাজানো।" },
        { word: "জনস্বার্থ।", desc: "পাঠকের স্বার্থে প্রতিবেদন — ক্ষমতাবানের স্বার্থে নয়।" },
        { word: "যাচাই।", desc: "একাধিক উৎস। মূল নথি। সরাসরি মাঠপর্যায়ের প্রতিবেদন।" },
      ];

  const heading = locale === "en"
    ? ["Accuracy.", "Clarity.", "Public Interest."]
    : ["নির্ভুলতা।", "স্বচ্ছতা।", "জনস্বার্থ।"];

  return (
    <section
      aria-labelledby="principles-heading"
      className="relative bg-night text-paper py-20 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* Chapter mark */}
        <div className="flex items-center gap-3 mb-8 lg:mb-12">
          <span
            className="font-sans font-bold text-paper tabular-nums tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            08
          </span>
          <span className="h-px bg-paper/20" style={{ width: "clamp(20px, 3vw, 48px)" }} aria-hidden="true" />
          <span className="editorial-eyebrow text-paper/50">
            {locale === "en" ? "Journalism Principles" : "সাংবাদিকতার নীতি"}
          </span>
        </div>

        {/* Large heading */}
        <div className="space-y-2 sm:space-y-4 mb-16 lg:mb-24">
          {heading.map((word, idx) => (
            <h2
              key={idx}
              className="font-serif font-bold text-paper leading-[0.95] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
            >
              {word}
            </h2>
          ))}
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-paper/15 pt-12">
          {principles.map((p, idx) => (
            <div key={idx} className="border-t border-paper/20 pt-4">
              <span className="font-mono text-newsroom text-sm font-bold mb-3 block">
                0{idx + 1}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-paper mb-3">
                {p.word}
              </h3>
              <p
                className="text-paper/70 leading-[1.65]"
                style={{ fontSize: "clamp(0.9375rem, 1vw, 1.0625rem)" }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-12 text-paper/40 italic max-w-xl"
          style={{ fontSize: "clamp(0.8125rem, 0.9vw, 0.9375rem)" }}
        >
          {locale === "en"
            ? "Editorial copy describing the website's journalism principles. Not a direct quote attributed to the journalist."
            : "ওয়েবসাইটের সাংবাদিকতার নীতি বর্ণনাকারী সম্পাদকীয় লেখা। এটি সাংবাদিকের সরাসরি উক্তি নয়।"}
        </p>
      </div>
    </section>
  );
}
