
/* ============================================================
   STRUCTURED DATA — linked @graph with stable @id nodes
   ============================================================
   Nodes share stable @id values so Google resolves the page as one
   entity graph instead of disconnected islands:
     {site}/#person   — the author
     {site}/#website  — the site
     {page}/#page     — the current page
     {page}/#article  — a story, when applicable

   All prop names on the exported schema components remain backwards
   compatible with existing call sites. New fields are optional and
   fall back to siteConfig-derived defaults.
   ============================================================ */

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects JSON-LD structured data into the page <head>.
 * Use for Person, WebSite, Article, BreadcrumbList schemas.
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static and built server-side from typed content modules.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(
        Array.isArray(data)
          ? { "@context": "https://schema.org", "@graph": data }
          : { "@context": "https://schema.org", ...data },
      ).replace(/</g, "\\u003c") }}
    />
  );
}

/* ============================================================
   Stable @id helpers — keep references in sync across nodes
   ============================================================ */

export function personId(siteUrl: string) {
  return `${siteUrl}/#person`;
}

export function websiteId(siteUrl: string) {
  return `${siteUrl}/#website`;
}

export function pageId(pageUrl: string) {
  return `${pageUrl}/#page`;
}

/* ============================================================
   Person node
   ============================================================ */

export interface PersonNodeInput {
  name: string;
  alternateName?: string;
  jobTitle: string;
  email: string;
  url: string;
  image?: string | null;
  description?: string;
  location?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: { name: string; url?: string }[];
  memberOf?: { name: string; url?: string; role?: string }[];
  worksFor?: { name: string; url?: string } | null;
}

/** Builds the canonical Person node, linked by @id. */
export function buildPersonNode(input: PersonNodeInput) {
  return {
    "@type": "Person",
    "@id": personId(input.url),
    name: input.name,
    ...(input.alternateName ? { alternateName: input.alternateName } : {}),
    jobTitle: input.jobTitle,
    email: `mailto:${input.email}`,
    url: input.url,
    ...(input.image ? { image: input.image } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.location
      ? { address: { "@type": "PostalAddress", addressLocality: input.location } }
      : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
    ...(input.knowsAbout?.length ? { knowsAbout: input.knowsAbout } : {}),
    ...(input.worksFor
      ? {
          worksFor: {
            "@type": "Organization",
            name: input.worksFor.name,
            ...(input.worksFor.url ? { url: input.worksFor.url } : {}),
          },
        }
      : {}),
    ...(input.alumniOf?.length
      ? {
          alumniOf: input.alumniOf.map((a) => ({
            "@type": "CollegeOrUniversity",
            name: a.name,
            ...(a.url ? { url: a.url } : {}),
          })),
        }
      : {}),
    ...(input.memberOf?.length
      ? {
          memberOf: input.memberOf.map((m) => ({
            "@type": "OrganizationRole",
            ...(m.role ? { roleName: m.role } : {}),
            memberOf: {
              "@type": "Organization",
              name: m.name,
              ...(m.url ? { url: m.url } : {}),
            },
          })),
        }
      : {}),
  };
}

/* ============================================================
   WebSite node
   ============================================================ */

export function buildWebsiteNode(name: string, url: string, description: string) {
  return {
    "@type": "WebSite",
    "@id": websiteId(url),
    name,
    url,
    description,
    publisher: { "@id": personId(url) },
    inLanguage: ["en", "bn"],
  };
}

/* ============================================================
   Full page graph — WebSite + Person + Page + extras, linked by @id
   ============================================================ */

export interface StructuredDataGraphProps {
  pageUrl: string;
  pageType?: string;
  pageName: string;
  pageDescription?: string;
  person: PersonNodeInput;
  website: { name: string; url: string; description: string };
  extraNodes?: Record<string, unknown>[];
}

export function StructuredDataGraph({
  pageUrl,
  pageType = "WebPage",
  pageName,
  pageDescription,
  person,
  website,
  extraNodes = [],
}: StructuredDataGraphProps) {
  const graph = [
    buildWebsiteNode(website.name, website.url, website.description),
    buildPersonNode(person),
    {
      "@type": pageType,
      "@id": pageId(pageUrl),
      url: pageUrl,
      name: pageName,
      ...(pageDescription ? { description: pageDescription } : {}),
      isPartOf: { "@id": websiteId(website.url) },
      about: { "@id": personId(website.url) },
      ...(pageType === "ProfilePage" ? { mainEntity: { "@id": personId(website.url) } } : {}),
      inLanguage: ["en", "bn"],
    },
    ...extraNodes,
  ];

  return <StructuredData data={{ "@context": "https://schema.org", "@graph": graph }} />;
}

/* ============================================================
   NewsArticle node — publisher.logo is required for rich results
   ============================================================ */

export interface NewsArticleNodeInput {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  /** Optional — derived from `url` when omitted. */
  siteUrl?: string;
  authorName: string;
  /** Optional — defaults to siteUrl. */
  authorUrl?: string;
  dateModified?: string;
  image?: string | null;
  /** Back-compat alias for publisherName. */
  publication?: string;
  publisherName?: string;
  publisherLogo?: string | null;
  section?: string;
  keywords?: string[];
  inLanguage?: string;
}

/** Derives the site origin from a page URL. */
function originOf(url: string) {
  try {
    return new URL(url).origin;
  } catch {
    return url.replace(/\/[^/]*$/, "");
  }
}

/**
 * Builds a NewsArticle node linked to the site's #person and #website nodes.
 */
export function buildNewsArticleNode(input: NewsArticleNodeInput) {
  const siteUrl = input.siteUrl ?? originOf(input.url);
  const publisherName = input.publisherName ?? input.publication ?? "Abdullah Mozomdar";
  const logoUrl = input.publisherLogo ?? `${siteUrl}/icon`;

  return {
    "@type": "NewsArticle",
    "@id": `${input.url}/#article`,
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: { "@id": pageId(input.url) },
    author: {
      "@type": "Person",
      "@id": personId(siteUrl),
      name: input.authorName,
      url: input.authorUrl ?? siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: { "@type": "ImageObject", url: logoUrl },
    },
    ...(input.image ? { image: [input.image] } : {}),
    ...(input.section ? { articleSection: input.section } : {}),
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
    ...(input.inLanguage ? { inLanguage: input.inLanguage } : {}),
    isPartOf: { "@id": websiteId(siteUrl) },
  };
}

/* ============================================================
   BreadcrumbList node
   ============================================================ */

export interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function buildBreadcrumbNode(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1]?.url ?? ""}/#breadcrumb`,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ============================================================
   CollectionPage + ItemList node (work / articles indexes)
   ============================================================ */

export interface CollectionNodeInput {
  url: string;
  name: string;
  description?: string;
  items: { name: string; url: string }[];
}

export function buildCollectionNode(input: CollectionNodeInput) {
  return {
    "@type": "CollectionPage",
    "@id": `${input.url}/#collection`,
    url: input.url,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

/* ============================================================
   Exported schema components — backwards compatible signatures
   ============================================================ */

/**
 * Person schema. Existing call sites pass only the original five props;
 * richer entity fields are accepted when supplied.
 */
export function PersonSchema(props: PersonNodeInput) {
  return <StructuredData data={buildPersonNode(props)} />;
}

export function WebsiteSchema(props: { name: string; url: string; description: string }) {
  return <StructuredData data={buildWebsiteNode(props.name, props.url, props.description)} />;
}

/**
 * Article schema. `publication` remains a valid prop (alias of
 * `publisherName`); `siteUrl` / `authorUrl` are optional and derived.
 */
export function ArticleSchema(props: NewsArticleNodeInput) {
  return <StructuredData data={buildNewsArticleNode(props)} />;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  return <StructuredData data={buildBreadcrumbNode(items)} />;
}
