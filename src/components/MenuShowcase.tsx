"use client";

import { useCallback, useState } from "react";
import Reveal from "./Reveal";
import { LightboxOverlay, type LightboxImage } from "./GalleryLightbox";
import { t, type Lang } from "@/lib/i18n";

/* A teljes (állandó) étlap képei – a repóban tárolt, "permanens" képek. */
const SPECIALTIES_IMAGE = "/images/magyaros-ajanlat.avif";
const MENU_PAGES = [
  "/images/menu/menu-1.avif",
  "/images/menu/menu-2.avif",
  "/images/menu/menu-3.avif",
  "/images/menu/menu-4.avif",
  "/images/menu/menu-5.avif",
  "/images/menu/menu-6.avif",
];

/* Napi menü kép + Menü szekció (Magyaros ajánlat kártya és a 6 oldalas étlap),
   közös lightboxszal. A napi menü képét az admin felületről lehet cserélni. */
export default function MenuShowcase({ lang, dailyUrl }: { lang: Lang; dailyUrl: string }) {
  const d = t(lang).menuPage;
  const [active, setActive] = useState<number | null>(null);

  const images: LightboxImage[] = [
    { url: dailyUrl, alt: "Napi menü" },
    { url: SPECIALTIES_IMAGE, alt: "Magyaros Ajánlat – Hungarian Specialties" },
    ...MENU_PAGES.map((url, i) => ({ url, alt: `Étlap ${i + 1}. oldal` })),
  ];

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((a) => (a === null ? null : (a + dir + images.length) % images.length)),
    [images.length]
  );

  const cardClass =
    "group block w-full cursor-zoom-in overflow-hidden rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_36px_90px_rgba(0,0,0,0.6)]";

  return (
    <>
      {/* Napi menü */}
      <section id="napi-menu" className="container-site mt-28 scroll-mt-24">
        <Reveal>
          <h2 className="text-center font-fraunces text-[36px] font-semibold text-cream md:text-[44px]">
            {d.dailyTitle}
          </h2>
          <p className="mt-3 text-center text-[14.5px] text-mist">{d.dailySub}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 max-w-[560px]">
            <button type="button" onClick={() => setActive(0)} className={cardClass} aria-label={d.dailyTitle}>
              <img src={dailyUrl} alt="Napi menü" loading="lazy" decoding="async" className="h-auto w-full" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* Menü: Magyaros ajánlat + teljes étlap */}
      <section id="etlap" className="container-site mt-28 scroll-mt-24">
        <Reveal>
          <h2 className="text-center font-fraunces text-[36px] font-semibold text-cream md:text-[44px]">
            {d.specialtiesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 max-w-[760px]">
            <button
              type="button"
              onClick={() => setActive(1)}
              className={cardClass}
              aria-label="Magyaros Ajánlat"
            >
              <img
                src={SPECIALTIES_IMAGE}
                alt="Magyaros Ajánlat – Hungarian Specialties"
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 grid max-w-[1040px] gap-8 md:grid-cols-2">
            {MENU_PAGES.map((url, i) => (
              <button
                key={url}
                type="button"
                onClick={() => setActive(i + 2)}
                className={cardClass}
                aria-label={`Étlap ${i + 1}. oldal`}
              >
                <img
                  src={url}
                  alt={`Étlap ${i + 1}. oldal`}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <LightboxOverlay images={images} active={active} onClose={close} onStep={step} lang={lang} />
    </>
  );
}
