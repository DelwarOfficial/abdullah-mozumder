import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterMark } from "@/components/ui-editorial/ChapterMark";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { siteName } from "@/content/site-messages";
import { isLocale, otherLocale, localeHref } from "@/i18n/config";
import type { Locale } from "@/content/types";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const other = otherLocale[locale];
  return {
    title: locale === "en" ? "Contact" : "যোগাযোগ",
    description: locale === "en"
      ? `Get in touch with ${siteName.en} — for editorial enquiries, story tips, media collaborations.`
      : `${siteName.bn}-এর সাথে যোগাযোগ করুন — সম্পাদকীয় অনুসন্ধান, খবরের ইঙ্গিত, গণমাধ্যম সহযোগিতার জন্য।`,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { [locale]: `/${locale}/contact`, [other]: `/${other}/contact`, "x-default": "/en/contact" },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName[locale], url: `${siteConfig.url}/${locale}` },
        { name: locale === "en" ? "Contact" : "যোগাযোগ", url: `${siteConfig.url}/${locale}/contact` },
      ]} />
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[
            { label: locale === "en" ? "Home" : "হোম", href: localeHref("/", locale) },
            { label: locale === "en" ? "Contact" : "যোগাযোগ" },
          ]} />

          <div className="mt-10 grid grid-cols-12 gap-12 lg:gap-16">
            <div className="col-span-12 lg:col-span-5">
              <ChapterMark number="09" label={locale === "en" ? "Contact" : "যোগাযোগ"} locale={locale} className="mb-6" />
              <h1 className="chapter-title text-ink" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
                {locale === "en" ? (
                  <>
                    <span className="block">Get</span>
                    <span className="block italic font-normal text-newsroom">in touch.</span>
                  </>
                ) : (
                  <>
                    <span className="block">যোগাযোগ</span>
                    <span className="block italic font-normal text-newsroom">করুন।</span>
                  </>
                )}
              </h1>
              <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-md">
                {locale === "en"
                  ? "Reach out for editorial enquiries, story tips, media collaborations, speaking engagements or any professional communication."
                  : "সংবাদ বা তথ্য জানাতে, সাক্ষাৎকার বা সহযোগিতার বিষয়ে কথা বলতে — সরাসরি লিখুন। বার্তা সরাসরি সাংবাদিকের কাছে পৌঁছে যাবে।"}
              </p>
              <dl className="mt-10 space-y-5 border-t border-rule pt-6">
                <div>
                  <dt className="editorial-eyebrow">{locale === "en" ? "Email" : "ইমেইল"}</dt>
                  <dd className="mt-1"><a href={`mailto:${siteConfig.email}`} className="text-base text-ink hover:text-newsroom transition-colors link-underline">{siteConfig.email}</a></dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">{locale === "en" ? "Based in" : "অবস্থান"}</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.location[locale]}</dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">{locale === "en" ? "Currently" : "বর্তমানে"}</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.currentPosition.role[locale]}<br />{profile.currentPosition.organization[locale]}</dd>
                </div>
              </dl>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="bg-paper-deep/30 border border-rule p-6 sm:p-10">
                <h2 className="font-serif text-xl font-semibold text-ink mb-6">
                  {locale === "en" ? "Send a message" : "বার্তা পাঠান"}
                </h2>
                <ContactForm locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
