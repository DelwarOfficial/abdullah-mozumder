"use client";

import { useEffect } from "react";

/**
 * Locks body scroll while `locked` is true.
 * Used by MobileNav drawer / Lightbox.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
