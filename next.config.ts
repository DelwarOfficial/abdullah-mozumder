import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async redirects() {
    return [
      // Root → default locale (fixed redirect, NOT based on browser language)
      { source: "/", destination: "/en", permanent: false },
      // Old non-locale paths → English equivalents
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/experience", destination: "/en/experience", permanent: true },
      { source: "/work", destination: "/en/work", permanent: true },
      { source: "/work/:slug", destination: "/en/work/:slug", permanent: true },
      { source: "/articles", destination: "/en/articles", permanent: true },
      { source: "/articles/:slug", destination: "/en/articles/:slug", permanent: true },
      { source: "/gallery", destination: "/en/gallery", permanent: true },
      { source: "/contact", destination: "/en/contact", permanent: true },
    ];
  },
};

export default nextConfig;
