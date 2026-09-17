import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { stories } from "@/content/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const storyRoutes: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${siteConfig.url}/work/${s.slug}`,
    lastModified: new Date(s.publishedAt),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${siteConfig.url}/articles/${s.slug}`,
    lastModified: new Date(s.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...storyRoutes, ...articleRoutes];
}
