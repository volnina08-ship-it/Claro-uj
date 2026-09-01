"use client";

import { motion, type Variants } from "motion/react";
import { RedButton, OutlineButton } from "../Buttons";
import { localePath, t, type Lang } from "@/lib/i18n";

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

export default function HomeHero({ lang }: { lang: Lang }) {
  const d = t(lang);

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

        {/* Az eredeti oldal hero-kollázsa (átlátszó hátterű grafika) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="animate-float-a relative">
            <img
              src="/images/hero-collage.avif"
              alt="Claro Bisztró – hangulatképek"
              fetchPriority="high"
              className="h-auto w-full drop-shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Díszítő csillámok */}
          <Star4 className="animate-twinkle absolute -left-7 top-[56%] h-5 w-5 text-cream/80" />
          <Star4 className="animate-twinkle absolute -right-3 top-[68%] h-3.5 w-3.5 text-gold/80 [animation-delay:1.1s]" />
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
