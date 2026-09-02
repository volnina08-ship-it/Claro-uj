"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoPlaque } from "./Logo";
import { IconBurger, IconClose, IconFacebook, IconInstagram } from "./icons";
import { localePath, t, type Lang } from "@/lib/i18n";
import { SOCIAL } from "@/lib/constants";

export default function Navbar({ lang }: { lang: Lang }) {
  const d = t(lang);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: localePath(lang, "/"), label: d.nav.home },
    { href: localePath(lang, "/menu"), label: d.nav.menu },
    { href: localePath(lang, "/gallery"), label: d.nav.gallery },
  ];
  const contactHref = localePath(lang, "/contact");

  const isActive = (href: string) =>
    href === "/" || href === "/hu" ? pathname === href : pathname.startsWith(href);

  return (
    /* Teljesen átlátszatlan, sticky fejléc-blokk az oldal legtetején.
       A fölé nyúló tömör sáv garantálja, hogy iOS Safariban a böngésző
       címsávja mögé se csússzon be soha tartalom – ott csak a sötét
       háttérszín látszik. (Sticky, mert az iOS a fixed rétegeket levágja
       a viewport szélénél.) */
    <header
      className={[
        "sticky inset-x-0 top-0 z-50 h-16 bg-coal border-b border-gold/10 transition-shadow duration-500",
        scrolled ? "shadow-[0_10px_40px_rgba(0,0,0,0.45)]" : "",
      ].join(" ")}
    >
      <div aria-hidden className="absolute inset-x-0 -top-40 h-40 bg-coal" />
      <nav className="relative flex items-start justify-between pr-5 md:pr-8">
        {/* A logó plakett a bal felső sarokból lóg be, mint az eredetin */}
        <div className="pl-4 md:pl-6">
          <LogoPlaque lang={lang} variant="nav" />
        </div>

        {/* Desktop linkek */}
        <div className="hidden h-16 items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={[
                "font-sans text-[12.5px] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                isActive(l.href) ? "text-gold" : "text-cream/85 hover:text-gold",
              ].join(" ")}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            className={[
              "rounded-full border px-4 py-1.5 font-sans text-[12.5px] font-medium uppercase tracking-[0.16em] transition-all duration-300",
              isActive(contactHref)
                ? "border-gold text-gold"
                : "border-cream/50 text-cream/90 hover:border-gold hover:text-gold",
            ].join(" ")}
          >
            {d.nav.contact}
          </Link>
        </div>

        {/* Mobil hamburger */}
        <button
          type="button"
          aria-label="Menü"
          onClick={() => setOpen(true)}
          className="mt-3 flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream md:hidden"
        >
          <IconBurger className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobil overlay menü */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-coal-deep/97 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-start justify-between pr-5">
              <div className="pl-4">
                <LogoPlaque lang={lang} variant="nav" />
              </div>
              <button
                type="button"
                aria-label={d.misc.close}
                onClick={() => setOpen(false)}
                className="mt-3 flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-7">
              {[...links, { href: contactHref, label: d.nav.contact }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.45 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "font-fraunces text-[34px] transition-colors",
                      isActive(l.href) ? "text-gold" : "text-cream hover:text-gold",
                    ].join(" ")}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-6 flex items-center gap-5 text-cream/70"
              >
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold">
                  <IconFacebook className="h-6 w-6" />
                </a>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold">
                  <IconInstagram className="h-6 w-6" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
