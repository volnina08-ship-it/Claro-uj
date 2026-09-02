"use client";

import { motion } from "motion/react";
import SiteShell from "../SiteShell";
import { SunMark } from "../Logo";
import { RedButton, ArrowLink } from "../Buttons";
import { localePath, type Lang } from "@/lib/i18n";

const copy = {
  hu: {
    eyebrow: "404 – nincs ilyen oldal",
    title: "Ez a fogás sajnos elfogyott",
    sub: "A keresett oldal nem szerepel az étlapon. Nézz szét a kínálatunkban, vagy foglalj asztalt – a konyha nyitva!",
    home: "Vissza a kezdőlapra",
    menu: "Étlap",
    receipt: {
      heading: "Rendelés",
      rows: [
        ["Keresett oldal", "nincs"],
        ["Készleten", "0 db"],
        ["Státusz", "elfogyott"],
      ],
      total: "Összesen",
      thanks: "Köszönjük, hogy nálunk kerested!",
      footnote: "A változás jogát fenntartjuk!",
    },
  },
  en: {
    eyebrow: "404 – page not found",
    title: "This dish is sold out",
    sub: "The page you're looking for isn't on the menu. Browse our dishes or reserve a table – the kitchen is open!",
    home: "Back to home",
    menu: "Menu",
    receipt: {
      heading: "Order",
      rows: [
        ["Requested page", "none"],
        ["In stock", "0 pcs"],
        ["Status", "sold out"],
      ],
      total: "Total",
      thanks: "Thanks for looking for it here!",
      footnote: "Subject to change!",
    },
  },
};

function Star4({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1.5 14.3 9.7 22.5 12 14.3 14.3 12 22.5 9.7 14.3 1.5 12 9.7 9.7Z" fill="currentColor" />
    </svg>
  );
}

/* Kreatív 404: "elfogyott fogás" – egy nyugta a Claro papír-stílusában. */
export default function NotFoundPage({ lang }: { lang: Lang }) {
  const c = copy[lang];

  return (
    <SiteShell lang={lang}>
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        {/* Lassan forgó napkorong a háttérben */}
        <SunMark className="animate-spin-slow pointer-events-none absolute -right-40 -top-24 h-[520px] w-[520px] text-gold opacity-[0.06]" />
        <SunMark className="animate-spin-slow pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] text-gold opacity-[0.05]" />

        <div className="container-site grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Szöveg */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p className="font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-gold">{c.eyebrow}</p>
            <h1 className="mt-4 font-fraunces text-[44px] font-semibold leading-[1.08] text-cream sm:text-[60px]">
              {c.title}
            </h1>
            <p className="mt-6 max-w-[480px] text-[15px] leading-relaxed text-mist">{c.sub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <RedButton href={localePath(lang, "/")}>{c.home}</RedButton>
              <ArrowLink href={localePath(lang, "/menu")}>{c.menu}</ArrowLink>
            </div>
          </motion.div>

          {/* Nyugta */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -2.5 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            whileHover={{ rotate: 0, y: -6 }}
            className="relative mx-auto w-full max-w-[380px]"
          >
            <Star4 className="animate-twinkle absolute -left-8 top-10 h-5 w-5 text-cream/80" />
            <Star4 className="animate-twinkle absolute -right-6 bottom-16 h-4 w-4 text-gold/80 [animation-delay:1.2s]" />

            <div className="paper relative rounded-t-[18px] px-8 pb-8 pt-9 text-ink shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col items-center gap-1">
                <SunMark className="h-10 w-10 text-maroon" />
                <span className="font-fraunces text-[22px] font-bold tracking-[0.1em] text-maroon">CLARO</span>
                <span className="font-sans text-[8px] font-semibold uppercase tracking-[0.45em] text-maroon/75">
                  Bisztró
                </span>
              </div>

              <div className="my-6 border-t border-dashed border-ink/30" />

              <div className="flex items-baseline justify-between font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
                <span>{c.receipt.heading}</span>
                <span>#404</span>
              </div>

              <ul className="mt-4 space-y-2.5 font-sans text-[13.5px]">
                {c.receipt.rows.map(([k, v]) => (
                  <li key={k} className="flex items-baseline gap-2">
                    <span className="text-ink/85">{k}</span>
                    <span className="flex-1 border-b border-dotted border-ink/35" />
                    <span className="font-semibold text-ink">{v}</span>
                  </li>
                ))}
              </ul>

              <div className="my-5 border-t border-dashed border-ink/30" />

              <div className="flex items-end justify-between">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
                  {c.receipt.total}
                </span>
                <span className="font-fraunces text-[64px] font-black leading-none text-maroon">404</span>
              </div>

              <p className="mt-6 text-center font-sans text-[12px] text-ink/70">{c.receipt.thanks}</p>
              <p className="mt-1 text-center font-sans text-[10.5px] italic text-ink/50">{c.receipt.footnote}</p>
            </div>

            {/* Fogazott nyugta-szél: lefelé mutató papír-fogak, köztük a sötét háttér */}
            <div
              aria-hidden
              className="h-3 w-full"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M0 0h12L6 12z' fill='%23fdfaf1'/%3E%3C/svg%3E\")",
                backgroundSize: "12px 12px",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "left top",
              }}
            />
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
