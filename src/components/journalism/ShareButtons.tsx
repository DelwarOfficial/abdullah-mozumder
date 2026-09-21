"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user dismissed — no-op
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="editorial-eyebrow mr-2 hidden sm:inline">Share</span>

      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className="inline-flex items-center justify-center w-9 h-9 border border-rule text-ink-soft hover:bg-ink hover:text-paper hover:border-ink transition-colors text-xs font-semibold"
        >
          <span className="font-sans">{link.label[0]}</span>
        </a>
      ))}

      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="inline-flex items-center justify-center w-9 h-9 border border-rule text-ink-soft hover:bg-ink hover:text-paper hover:border-ink transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-newsroom" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        onClick={nativeShare}
        aria-label="Share via device"
        className="inline-flex items-center justify-center w-9 h-9 border border-rule text-ink-soft hover:bg-ink hover:text-paper hover:border-ink transition-colors sm:hidden"
      >
        <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
