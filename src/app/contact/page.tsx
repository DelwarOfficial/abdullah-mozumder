import type { Metadata } from "next";
import { Container } from "@/components/ui-editorial/Container";
import { Eyebrow } from "@/components/ui-editorial/Eyebrow";
import { Breadcrumbs } from "@/components/ui-editorial/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { profile } from "@/content/profile";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — ${profile.title}. For editorial enquiries, story tips, media collaborations, speaking engagements and professional communication.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name}.`,
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Contact", url: `${siteConfig.url}/contact` },
        ]}
      />
      <section className="py-12 sm:py-16">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left — copy */}
            <div className="lg:col-span-5">
              <Eyebrow>Contact</Eyebrow>
              <h1 className="mt-4 font-serif font-semibold text-ink text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
                Get in touch.
              </h1>
              <p className="mt-5 text-lg text-ink-soft leading-relaxed max-w-md">
                Reach out for editorial enquiries, story tips, media
                collaborations, speaking engagements or any professional
                communication. Messages are reviewed and answered directly.
              </p>

              <dl className="mt-10 space-y-5 border-t border-rule pt-6">
                <div>
                  <dt className="editorial-eyebrow">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-base text-ink hover:text-newsroom transition-colors link-underline"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">Based in</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">
                    {profile.location}
                  </dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow">Currently</dt>
                  <dd className="mt-1 text-sm text-ink-soft font-medium">
                    {profile.currentPosition.role}
                    <br />
                    {profile.currentPosition.organization}
                  </dd>
                </div>
              </dl>

              <p className="mt-8 text-xs text-ink-muted italic max-w-sm leading-relaxed">
                This form is for professional enquiries only. Private contact
                details are intentionally not published on this site.
              </p>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-7">
              <div className="bg-paper-deep/30 border border-rule p-6 sm:p-10">
                <h2 className="font-serif text-xl font-semibold text-ink mb-6">
                  Send a message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
