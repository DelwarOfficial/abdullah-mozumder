import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { stories } from "@/content/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const locales = siteConfig.locales;

  const staticPaths = ["", "/about", "/experience", "/work", "/articles", "/gallery", "/contact"];

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly" as const,
      priority: path === "" ? 1.0 : path === "/work" || path === "/about" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
        ),
      },
    })),
  );

  const storyRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    stories.map((s) => ({
      url: `${siteConfig.url}/${locale}/work/${s.slug}`,
      lastModified: new Date(s.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}/${l}/work/${s.slug}`]),
        ),
      },
    })),
  );

  const articleRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    stories.map((s) => ({
      url: `${siteConfig.url}/${locale}/articles/${s.slug}`,
      lastModified: new Date(s.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}/${l}/articles/${s.slug}`]),
        ),
      },
    })),
  );

  return [...staticRoutes, ...storyRoutes, ...articleRoutes];
}
