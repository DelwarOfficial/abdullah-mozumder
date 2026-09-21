import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { siteConfig } from "@/content/site";
import { siteName } from "@/i18n/ui";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Abdullah Mozomdar for editorial enquiries, story tips or media collaborations. Find contact details and send a message through the portfolio website.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: siteName.en, url: siteConfig.url },
        { name: "Contact", url: `${siteConfig.url}/contact` },
      ]} />
      <ContactContent />
    </>
  );
}
