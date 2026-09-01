"use client";

import { useState } from "react";
import { SunMark } from "./Logo";

/* Elegáns placeholder, amíg nincs feltöltött kép az adott helyre.
   A seed alapján kissé eltérő meleg tónusú hátteret kap minden kártya. */
export function PlaceholderArt({
  seed = 0,
  label,
  className = "",
}: {
  seed?: number;
  label?: string;
  className?: string;
}) {
  const gradients = [
    "radial-gradient(120% 90% at 20% 10%, #3a332a 0%, #262119 45%, #1b1815 100%)",
    "radial-gradient(120% 90% at 80% 15%, #40322a 0%, #272019 48%, #1a1714 100%)",
    "radial-gradient(130% 100% at 50% 100%, #3d2f24 0%, #252019 50%, #1b1714 100%)",
    "radial-gradient(120% 90% at 15% 85%, #38312c 0%, #241f1a 46%, #191613 100%)",
    "radial-gradient(140% 100% at 85% 80%, #423528 0%, #262019 50%, #1a1613 100%)",
  ];
  const bg = gradients[Math.abs(seed) % gradients.length];
  return (
    <div
      aria-hidden="true"
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ background: bg }}
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(45deg,transparent_0px,transparent_14px,#c9a26d_14px,#c9a26d_15px)]" />
      <div className="flex flex-col items-center gap-3">
        <SunMark className="h-12 w-12 text-gold/40 animate-spin-slow" />
        {label ? (
          <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-gold/45">{label}</span>
        ) : null}
      </div>
    </div>
  );
}

/* Kép, ami hibás vagy hiányzó forrás esetén automatikusan
   a stílusos placeholderre vált. */
export default function SmartImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  seed = 0,
  label = "Claro Bisztró",
  sizes,
  natural = false,
}: {
  src?: string | null;
  alt?: string;
  className?: string;
  imgClassName?: string;
  seed?: number;
  label?: string;
  sizes?: string;
  /* natural: a kép a saját képarányában folyik (pl. étlap scan-ek) */
  natural?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  if (natural && !showPlaceholder) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src as string}
          alt={alt}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-auto w-full ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showPlaceholder ? (
        <PlaceholderArt seed={seed} label={label} className="absolute inset-0" />
      ) : (
        <img
          src={src as string}
          alt={alt}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
