"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SmartImage, { PlaceholderArt } from "./SmartImage";
import { IconChevronLeft, IconChevronRight, IconClose } from "./icons";
import { t, type Lang } from "@/lib/i18n";

export type LightboxImage = { url: string; alt: string };

/* Galéria rács vagy "masonry" elrendezés kattintható lightboxszal.
   Ha nincs feltöltött kép, stílusos placeholderek rajzolják ki a rácsot. */
export default function GalleryLightbox({
  images,
  lang,
  variant = "grid",
  placeholderCount = 6,
  gridClass,
}: {
  images: LightboxImage[];
  lang: Lang;
  variant?: "grid" | "masonry";
  placeholderCount?: number;
  gridClass?: string;
}) {
  const d = t(lang);
  const [active, setActive] = useState<number | null>(null);
  const hasImages = images.length > 0;
  const count = hasImages ? images.length : placeholderCount;

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (!hasImages) return;
      setActive((a) => (a === null ? null : (a + dir + images.length) % images.length));
    },
    [hasImages, images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  // Placeholder magasság-variációk a masonry ritmusához
  const masonryAspect = ["aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square"];

  const itemClass =
    "group relative w-full overflow-hidden rounded-[24px] border border-gold/45 transition-all duration-500 hover:border-gold hover:shadow-[0_16px_50px_rgba(0,0,0,0.45)]";

  const renderItem = (i: number) => {
    const img = hasImages ? images[i] : null;
    // Valódi kép masonry-ban a saját képarányát tartja; placeholder kap fix arányt
    const naturalFlow = variant === "masonry" && !!img;
    const aspect = naturalFlow
      ? ""
      : variant === "grid"
        ? "aspect-square"
        : masonryAspect[i % masonryAspect.length];
    const inner = img ? (
      <SmartImage
        src={img.url}
        alt={img.alt}
        seed={i}
        natural={naturalFlow}
        className={naturalFlow ? "" : "absolute inset-0"}
        imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
    ) : (
      <PlaceholderArt seed={i} label="Claro Bisztró" className="absolute inset-0" />
    );

    if (!img) {
      return (
        <div key={i} className={`${itemClass} ${aspect} ${variant === "masonry" ? "mb-6 break-inside-avoid" : ""}`}>
          {inner}
        </div>
      );
    }
    return (
      <button
        key={i}
        type="button"
        aria-label={d.misc.openLightbox}
        onClick={() => setActive(i)}
        className={`${itemClass} ${aspect} cursor-zoom-in ${variant === "masonry" ? "mb-6 block break-inside-avoid" : ""}`}
      >
        {inner}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal-deep/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </button>
    );
  };

  return (
    <>
      {variant === "grid" ? (
        <div className={gridClass ?? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
          {Array.from({ length: count }, (_, i) => renderItem(i))}
        </div>
      ) : (
        <div className={gridClass ?? "columns-1 gap-6 sm:columns-2 lg:columns-3"}>
          {Array.from({ length: count }, (_, i) => renderItem(i))}
        </div>
      )}

      <AnimatePresence>
        {active !== null && hasImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-coal-deep/95 backdrop-blur-md"
            onClick={close}
          >
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              src={images[active].url}
              alt={images[active].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-[90vw] rounded-2xl border border-gold/35 object-contain shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
            />

            <button
              type="button"
              aria-label={d.misc.close}
              onClick={close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <IconClose className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label={d.misc.prev}
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  <IconChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label={d.misc.next}
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  <IconChevronRight className="h-5 w-5" />
                </button>
                <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[13px] tracking-[0.2em] text-cream/70">
                  {active + 1} / {images.length}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
