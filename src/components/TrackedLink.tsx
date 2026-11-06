"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes } from "react";

/* Sima <a> link Vercel Web Analytics custom eventtel (szerver komponensből használható). */
export default function TrackedLink({
  event,
  data,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; data?: Record<string, string> }) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, data);
        onClick?.(e);
      }}
    />
  );
}
