/**
 * Shared Open Graph image metadata.
 * Default: the generated branded social card (/opengraph-image route).
 * Story pages pass their real hero image instead.
 * metadataBase (set in app/layout.tsx) makes relative URLs absolute.
 */
export function ogImage(alt: string, path: string = "/opengraph-image") {
  return {
    url: path,
    ...(path === "/opengraph-image" ? { width: 1200, height: 630 } : {}),
    alt,
  };
}
