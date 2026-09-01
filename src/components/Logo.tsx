import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

/* A Claro nap-szimbólum vektoros rekonstrukciója. */
export function SunMark({ className = "" }: { className?: string }) {
  const rays: React.ReactNode[] = [];
  const RAYS = 20;
  for (let i = 0; i < RAYS; i++) {
    const angle = (i * 360) / RAYS;
    const long = i % 2 === 0;
    const r1 = 11;
    const r2 = long ? 19 : 15.5;
    const rad = (angle * Math.PI) / 180;
    const x1 = 24 + r1 * Math.cos(rad);
    const y1 = 24 + r1 * Math.sin(rad);
    const x2 = 24 + r2 * Math.cos(rad);
    const y2 = 24 + r2 * Math.sin(rad);
    rays.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    );
    if (long) {
      const rd = 21.8;
      const xd = 24 + rd * Math.cos(rad);
      const yd = 24 + rd * Math.sin(rad);
      rays.push(<circle key={`d${i}`} cx={xd} cy={yd} r="0.85" fill="currentColor" />);
    }
  }
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="2.4" fill="currentColor" />
      {rays}
    </svg>
  );
}

/* Krém színű logó-plakett – a fejlécben a bal felső sarokhoz,
   a láblécben a bal oldalhoz simul, ahogy az eredeti oldalon. */
export function LogoPlaque({
  lang,
  variant = "nav",
}: {
  lang: Lang;
  variant?: "nav" | "footer";
}) {
  const isNav = variant === "nav";
  return (
    <Link
      href={localePath(lang, "/")}
      aria-label="Claro Bisztró – kezdőlap"
      className={[
        "group relative block bg-cream-bright text-maroon transition-transform duration-500",
        isNav
          ? "w-[104px] py-2.5 rounded-b-[26px] rounded-tr-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          : "w-[150px] py-4 rounded-r-[34px] shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute border border-maroon/30",
          isNav ? "inset-[5px] rounded-b-[20px] rounded-tr-[8px]" : "inset-[6px] rounded-r-[26px]",
        ].join(" ")}
      />
      <span className="flex flex-col items-center gap-0.5 px-3">
        <SunMark className={isNav ? "h-6 w-6" : "h-9 w-9"} />
        <span
          className={[
            "font-fraunces font-bold leading-none tracking-[0.08em]",
            isNav ? "text-[19px]" : "text-[27px]",
          ].join(" ")}
        >
          CLARO
        </span>
        <span
          className={[
            "font-sans font-semibold uppercase text-maroon/80 leading-none",
            isNav ? "text-[6.5px] tracking-[0.42em]" : "text-[9px] tracking-[0.45em]",
          ].join(" ")}
        >
          Bisztró
        </span>
      </span>
    </Link>
  );
}
