"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import SmartImage, { PlaceholderArt } from "../SmartImage";
import { SunMark } from "../Logo";
import { RedButton, OutlineButton } from "../Buttons";
import { localePath, t, type Lang } from "@/lib/i18n";
import type { GalleryImage } from "@/lib/content";

function Star4({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1.5 14.3 9.7 22.5 12 14.3 14.3 12 22.5 9.7 14.3 1.5 12 9.7 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

export default function HomeHero({ lang, images }: { lang: Lang; images: GalleryImage[] }) {
  const d = t(lang);

  // Egyetlen feltöltött kép esetén azt egyben jelenítjük meg (pl. kész
  // hero-kollázs grafika); több képnél élő kollázst építünk: ív, széles,
  // magas (a maradék a magas helyen automatikusan váltakozik)
  const composite = images.length === 1 ? images[0] : null;
  const arch = images[0] ?? null;
  const wide = images[1] ?? null;
  const tallImages = useMemo(() => images.slice(2), [images]);
  const [tallIndex, setTallIndex] = useState(0);

  useEffect(() => {
    if (tallImages.length < 2) return;
    const id = setInterval(() => setTallIndex((i) => (i + 1) % tallImages.length), 4500);
    return () => clearInterval(id);
  }, [tallImages.length]);

  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pt-36">
      {/* Meleg fényudvar a háttérben */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16]"
        style={{ background: "radial-gradient(ellipse, #c9a26d 0%, transparent 62%)" }}
      />

      <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        {/* Szöveg */}
        <div className="relative z-10 max-w-[520px]">
          <motion.h1
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-fraunces text-[42px] font-semibold leading-[1.12] text-cream sm:text-[52px]"
          >
            {d.hero.titleA}{" "}
            <span className={lang === "en" ? "italic" : ""}>{d.hero.titleAccent}</span>{" "}
            {d.hero.titleB}
          </motion.h1>
          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 text-[15px] leading-relaxed text-mist"
          >
            {d.hero.sub}
          </motion.p>
          <motion.div
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <RedButton href={localePath(lang, "/menu")}>{d.hero.explore}</RedButton>
            <OutlineButton href={localePath(lang, "/contact")}>{d.hero.reserve}</OutlineButton>
          </motion.div>
        </div>

        {/* Kollázs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          {composite ? (
            <div className="animate-float-a relative">
              <img
                src={composite.url}
                alt={composite.alt || "Claro Bisztró"}
                className="h-auto w-full drop-shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
              />
            </div>
          ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {/* Bal oszlop */}
            <div className="flex flex-col gap-4 pt-4 sm:gap-5">
              <div className="animate-float-a relative h-[190px] overflow-hidden rounded-b-[22px] rounded-t-[130px] border border-gold/45 sm:h-[225px]">
                <SmartImage
                  src={arch?.url}
                  alt={arch?.alt ?? "Claro Bisztró hangulat"}
                  seed={1}
                  className="absolute inset-0"
                />
              </div>
              <div className="animate-float-b relative h-[175px] overflow-hidden rounded-[24px] border border-gold/45 sm:h-[205px]">
                <SmartImage
                  src={wide?.url}
                  alt={wide?.alt ?? "Claro Bisztró bár"}
                  seed={2}
                  className="absolute inset-0"
                />
              </div>
            </div>

            {/* Jobb oszlop */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Krém logókártya */}
              <div className="animate-float-c relative flex h-[165px] items-center justify-center overflow-hidden rounded-b-[18px] rounded-t-[130px] border border-maroon/25 bg-cream-bright sm:h-[190px]">
                <span aria-hidden className="pointer-events-none absolute inset-[7px] rounded-b-[12px] rounded-t-[124px] border border-maroon/20" />
                <div className="flex flex-col items-center gap-1 pt-4 text-maroon">
                  <SunMark className="h-9 w-9" />
                  <span className="font-fraunces text-[24px] font-bold tracking-[0.1em]">CLARO</span>
                  <span className="font-sans text-[8px] font-semibold uppercase tracking-[0.5em] text-maroon/80">
                    Bisztró
                  </span>
                </div>
                <span aria-hidden className="absolute bottom-3 left-4 font-sans text-[15px] text-maroon/50">+</span>
                <span aria-hidden className="absolute bottom-3 right-4 font-sans text-[15px] text-maroon/50">+</span>
              </div>

              {/* Magas kép – automata váltással, ha több kép van */}
              <div className="animate-float-d relative h-[230px] overflow-hidden rounded-[24px] border border-gold/45 sm:h-[270px]">
                {tallImages.length > 0 ? (
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={tallIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.1 }}
                      className="absolute inset-0"
                    >
                      <SmartImage
                        src={tallImages[tallIndex]?.url}
                        alt={tallImages[tallIndex]?.alt ?? "Claro Bisztró terasz"}
                        seed={3}
                        className="absolute inset-0"
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <PlaceholderArt seed={3} label="Claro Bisztró" className="absolute inset-0" />
                )}
                {tallImages.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                    {tallImages.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Kép ${i + 1}`}
                        onClick={() => setTallIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === tallIndex ? "w-5 bg-cream-bright" : "w-1.5 bg-cream-bright/45"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          )}

          {/* Díszítő csillámok */}
          <Star4 className="animate-twinkle absolute -left-7 top-[56%] h-5 w-5 text-cream/80" />
          <Star4 className="animate-twinkle absolute -right-3 top-[68%] h-3.5 w-3.5 text-gold/80 [animation-delay:1.1s]" />
          <span aria-hidden className="animate-twinkle absolute left-[46%] top-[41%] font-fraunces text-[26px] leading-none text-cream/75 [animation-delay:0.6s]">
        *
          </span>
          <span
            aria-hidden
            className="absolute -top-3 right-[8%] h-10 w-10 rounded-full border border-cream/35"
          />
          <span aria-hidden className="absolute right-[5%] top-8 h-1.5 w-1.5 rounded-full bg-cream/60" />
        </motion.div>
      </div>
    </section>
  );
}
