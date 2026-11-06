"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import type { ReactNode } from "react";
import { IconChevronRight } from "./icons";

type TrackProp = { name: string; data?: Record<string, string> };

/* Vercel Web Analytics custom event kattintásra. */
const fire = (t?: TrackProp) => () => {
  if (t) track(t.name, t.data);
};

/* Piros, körvonalas és nyilas link-gombok az eredeti oldal stílusában. */

const baseBtn =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans text-[14px] font-medium tracking-wide transition-all duration-300 px-6 py-2.5 whitespace-nowrap";

export function RedButton({ href, children, track: t }: { href: string; children: ReactNode; track?: TrackProp }) {
  return (
    <Link
      href={href}
      onClick={fire(t)}
      className={`${baseBtn} bg-red-btn text-cream-bright shadow-[0_6px_20px_rgba(174,46,42,0.35)] hover:bg-red-deep hover:shadow-[0_8px_26px_rgba(143,35,31,0.5)] hover:-translate-y-0.5 active:translate-y-0`}
    >
      {children}
    </Link>
  );
}

export function OutlineButton({
  href,
  children,
  tone = "cream",
  track: t,
}: {
  href: string;
  children: ReactNode;
  tone?: "cream" | "white";
  track?: TrackProp;
}) {
  const colors =
    tone === "white"
      ? "border-cream-bright/70 text-cream-bright hover:bg-cream-bright hover:text-red-deep"
      : "border-cream/50 text-cream hover:bg-cream hover:text-coal";
  return (
    <Link href={href} onClick={fire(t)} className={`${baseBtn} border ${colors} hover:-translate-y-0.5 active:translate-y-0`}>
      {children}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  tone = "cream",
  track: t,
}: {
  href: string;
  children: ReactNode;
  tone?: "cream" | "white" | "red";
  track?: TrackProp;
}) {
  const colors =
    tone === "white"
      ? "text-cream-bright"
      : tone === "red"
        ? "text-red-btn"
        : "text-cream";
  return (
    <Link
      href={href}
      onClick={fire(t)}
      className={`group inline-flex items-center gap-1.5 font-sans text-[14px] font-medium tracking-wide ${colors} transition-colors hover:text-gold`}
    >
      {children}
      <IconChevronRight className="h-4 w-4 text-red-btn transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
