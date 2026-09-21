"use client";

import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";
import { sectionLabels } from "@/i18n/ui";
import { useLanguage } from "@/i18n/language-context";

export function ContactContent() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <section className="pt-10 lg:pt-14 pb-16 lg:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Breadcrumbs items={[
          { label: sectionLabels.home[language], href: "/" },
          { label: sectionLabels.contact[language] },
        ]} />

        <div className="mt-10 grid grid-cols-12 gap-12 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <h1 className="chapter-title text-ink" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
              {en ? (
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
              {en
                ? "Reach out for editorial enquiries, story tips, media collaborations, speaking engagements or any professional communication."
                : "সংবাদ বা তথ্য জানাতে, সাক্ষাৎকার বা সহযোগিতার বিষয়ে কথা বলতে — সরাসরি লিখুন। বার্তা সরাসরি সাংবাদিকের কাছে পৌঁছে যাবে।"}
            </p>
            <dl className="mt-10 space-y-5 border-t border-rule pt-6">
              <div>
                <dt className="editorial-eyebrow">{sectionLabels.email[language]}</dt>
                <dd className="mt-1"><a href={`mailto:${siteConfig.email}`} className="text-base text-ink hover:text-newsroom transition-colors link-underline">{siteConfig.email}</a></dd>
              </div>
              <div>
                <dt className="editorial-eyebrow">{sectionLabels.basedIn[language]}</dt>
                <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.location[language]}</dd>
              </div>
              <div>
                <dt className="editorial-eyebrow">{sectionLabels.currently[language]}</dt>
                <dd className="mt-1 text-sm text-ink-soft font-medium">{profile.currentPosition.role[language]}<br />{profile.currentPosition.organization[language]}</dd>
              </div>
            </dl>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="card-surface p-6 sm:p-10">
              <h2 className="font-serif text-xl font-semibold text-ink mb-6">
                {en ? "Send a message" : "বার্তা পাঠান"}
              </h2>
              <ContactForm locale={language} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
