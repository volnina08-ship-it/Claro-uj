"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconChevronDown, IconGlobe } from "./icons";

/* Lebegő nyelvváltó a bal alsó sarokban – az eredeti oldal mintájára. */
export default function LangSwitcher() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const isHu = pathname === "/hu" || pathname.startsWith("/hu/");
  const huTarget = isHu ? pathname : pathname === "/" ? "/hu" : `/hu${pathname}`;
  const enTarget = isHu ? (pathname.slice(3) === "" ? "/" : pathname.slice(3)) : pathname;

  const options = [
    { code: "hu", label: "Magyar", href: huTarget, active: isHu },
    { code: "en", label: "English", href: enTarget, active: !isHu },
  ];

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="mb-2 overflow-hidden rounded-2xl border border-gold/25 bg-coal-deep/95 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
          >
            {options.map((o) => (
              <Link
                key={o.code}
                href={o.href}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center gap-2 px-4 py-2.5 font-sans text-[13px] transition-colors",
                  o.active ? "text-gold" : "text-cream/85 hover:bg-cream/5 hover:text-gold",
                ].join(" ")}
              >
                <span className="w-6 text-[11px] font-semibold uppercase tracking-wider">{o.code}</span>
                {o.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Nyelv / Language"
        className="flex items-center gap-2 rounded-full border border-gold/25 bg-coal-deep/85 px-3.5 py-2 text-cream/90 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors hover:text-gold"
      >
        <IconGlobe className="h-4.5 w-4.5" />
        <span className="font-sans text-[12px] font-semibold uppercase tracking-wider">{isHu ? "HU" : "EN"}</span>
        <IconChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
