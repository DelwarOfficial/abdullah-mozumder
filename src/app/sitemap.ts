import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { stories } from "@/content/stories";

/**
 * Single-URL sitemap: one canonical entry per page, no language variants,
 * no alternates. Language is a user preference, not an indexable URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/experience", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/articles", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/gallery", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency,
    priority,
  }));

  const storyRoutes: MetadataRoute.Sitemap = stories.flatMap((s) => [
    {
      url: `${siteConfig.url}/work/${s.slug}`,
      lastModified: new Date(s.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/articles/${s.slug}`,
      lastModified: new Date(s.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
  ]);

  return [...staticRoutes, ...storyRoutes];
}
