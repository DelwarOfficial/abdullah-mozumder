import { Inter, Newsreader, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/content/site";
import { siteName, siteDescription } from "@/content/site-messages";
import { themeInitScript } from "@/lib/theme";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const banglaSerif = Noto_Serif_Bengali({
  variable: "--font-bangla-serif",
  subsets: ["bengali"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteName.en} — Journalist & Senior Reporter`,
    template: `%s — ${siteName.en}`,
  },
  description: siteDescription.en,
  applicationName: siteName.en,
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  // Single dynamic meta — the pre-paint theme script flips it for dark,
  // so no media-scoped duplicates can fall out of sync.
  themeColor: "#F7F6F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resolves theme + lang before first paint — no flash, no mismatch */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${newsreader.variable} ${banglaSerif.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
