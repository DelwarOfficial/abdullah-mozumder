/**
 * Photojournalism gallery.
 *
 * CONTENT POLICY: No real photographs supplied.
 * These entries are placeholders. Replace with the journalist's actual field
 * photographs. Each gallery item must eventually have verified alt text, caption
 * and credit before publication.
 *
 * Future CMS: maps to a `gallery` table.
 */

export interface GalleryItem {
  id: string;
  src: string | null;
  thumbnail: string | null;
  title: string;
  caption: string;
  location: string | null;
  date: string | null;
  credit: string | null;
  alt: string;
  isPlaceholder: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    src: null,
    thumbnail: null,
    title: "Portfolio placeholder",
    caption: "Replace with the journalist's actual field photograph and verified caption.",
    location: "Dhaka, Bangladesh",
    date: "2026",
    credit: null,
    alt: "Placeholder gallery image — to be replaced.",
    isPlaceholder: true,
  },
  {
    id: "g-2",
    src: null,
    thumbnail: null,
    title: "Portfolio placeholder",
    caption: "Replace with the journalist's actual field photograph and verified caption.",
    location: "Dhaka, Bangladesh",
    date: "2026",
    credit: null,
    alt: "Placeholder gallery image — to be replaced.",
    isPlaceholder: true,
  },
  {
    id: "g-3",
    src: null,
    thumbnail: null,
    title: "Portfolio placeholder",
    caption: "Replace with the journalist's actual field photograph and verified caption.",
    location: "Dhaka, Bangladesh",
    date: "2026",
    credit: null,
    alt: "Placeholder gallery image — to be replaced.",
    isPlaceholder: true,
  },
  {
    id: "g-4",
    src: null,
    thumbnail: null,
    title: "Portfolio placeholder",
    caption: "Replace with the journalist's actual field photograph and verified caption.",
    location: "Dhaka, Bangladesh",
    date: "2026",
    credit: null,
    alt: "Placeholder gallery image — to be replaced.",
    isPlaceholder: true,
  },
  {
    id: "g-5",
    src: null,
    thumbnail: null,
    title: "Portfolio placeholder",
    caption: "Replace with the journalist's actual field photograph and verified caption.",
    location: "Dhaka, Bangladesh",
    date: "2026",
    credit: null,
    alt: "Placeholder gallery image — to be replaced.",
    isPlaceholder: true,
  },
  {
    id: "g-6",
    src: null,
    thumbnail: null,
    title: "Portfolio placeholder",
    caption: "Replace with the journalist's actual field photograph and verified caption.",
    location: "Dhaka, Bangladesh",
    date: "2026",
    credit: null,
    alt: "Placeholder gallery image — to be replaced.",
    isPlaceholder: true,
  },
];
