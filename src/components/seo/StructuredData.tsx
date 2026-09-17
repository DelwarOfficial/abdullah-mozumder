import type { ReactNode } from "react";

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects JSON-LD structured data into the page <head>.
 * Use for Person, WebSite, Article, BreadcrumbList schemas.
 */
export function StructuredData({ data }: StructuredDataProps) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // Structured data is static and built server-side from typed content modules.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  email: string;
  url: string;
  location?: string;
}

export function PersonSchema({ name, jobTitle, email, url, location }: PersonSchemaProps) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        jobTitle,
        email: `mailto:${email}`,
        url,
        ...(location ? { address: { "@type": "PostalAddress", addressLocality: location } } : {}),
      }}
    />
  );
}

interface WebsiteSchemaProps {
  name: string;
  url: string;
  description: string;
}

export function WebsiteSchema({ name, url, description }: WebsiteSchemaProps) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        url,
        description,
      }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  authorName: string;
  url: string;
  image?: string | null;
  publication?: string;
}

export function ArticleSchema({
  headline,
  description,
  datePublished,
  authorName,
  url,
  image,
  publication,
}: ArticleSchemaProps) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline,
        description,
        datePublished,
        author: {
          "@type": "Person",
          name: authorName,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        ...(image ? { image } : {}),
        ...(publication ? { publisher: { "@type": "Organization", name: publication } } : {}),
      }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

interface NodeProps {
  children?: ReactNode;
}

export function StructuredDataNode({ children }: NodeProps) {
  // placeholder to keep TS happy if used as wrapper
  return <>{children}</>;
}
