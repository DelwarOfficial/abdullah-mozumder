import { IBM_Plex_Sans, Spectral, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/content/site";
import { serverTitle, serverDescription } from "@/i18n/ui";
import { themeInitScript } from "@/lib/theme";
import { LanguageProvider } from "@/i18n/language-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/SkipLink";
import { MobileShell } from "@/components/layout/MobileShell";

const plexSans = IBM_Plex_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const spectral = Spectral({
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
    default: serverTitle,
    template: `%s — Abdullah Mozomdar`,
  },
  description: serverDescription,
  applicationName: "Abdullah Mozomdar",
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
  themeColor: "#FBFAF8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resolves theme + language before first paint — no flash, no mismatch */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${plexSans.variable} ${spectral.variable} ${banglaSerif.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <SkipLink />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          {/* Spacer so footer content clears the mobile bottom navigation */}
          <div aria-hidden="true" className="h-16 lg:hidden bg-night" />
          <MobileShell />
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
