import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

/* A Claro logó napkorongja: szaggatott, változó hosszúságú sugarak,
   középen körbe zárt C monogram – az eredeti logó vektoros mása.
   A geometria determinisztikus, így a szerver- és kliens-render azonos. */
function frac(x: number): number {
  return x - Math.floor(x);
}

export function SunMark({ className = "" }: { className?: string }) {
  const parts: React.ReactNode[] = [];
  const C = 24;
  const RAYS = 36;
  const r0 = 10;

  for (let i = 0; i < RAYS; i++) {
    const jitter = (frac(Math.sin(i * 12.9898) * 43758.5453) - 0.5) * 4;
    const angle = ((i * 360) / RAYS + jitter) * (Math.PI / 180);
    const lenRnd = frac(Math.sin(i * 78.233) * 12543.123);
    const len = 4.5 + lenRnd * 9; // 4.5..13.5
    const r1 = Math.min(r0 + len, 23.2);
    const split = frac(Math.sin(i * 39.425) * 9631.77) > 0.5;

    const seg = (a: number, b: number, key: string) => {
      const x1 = C + a * Math.cos(angle);
      const y1 = C + a * Math.sin(angle);
      const x2 = C + b * Math.cos(angle);
      const y2 = C + b * Math.sin(angle);
      parts.push(
        <line
          key={key}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      );
    };

    if (split && r1 - r0 > 5) {
      seg(r0, r0 + (r1 - r0) * 0.42, `a${i}`);
      seg(r0 + (r1 - r0) * 0.62, r1, `b${i}`);
    } else {
      seg(r0, r1, `s${i}`);
    }

    if (i % 6 === 3 && lenRnd > 0.55) {
      const rd = r1 + 1.6;
      parts.push(
        <circle key={`d${i}`} cx={C + rd * Math.cos(angle)} cy={C + rd * Math.sin(angle)} r="0.7" fill="currentColor" />
      );
    }
  }

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx={C} cy={C} r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text
        x={C}
        y={C + 0.4}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display), Georgia, serif"
        fontWeight="700"
        fontSize="9"
        fill="currentColor"
      >
        C
      </text>
      {parts}
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
        <SunMark className={isNav ? "h-7 w-7" : "h-10 w-10"} />
        <span
          className={[
            "font-fraunces font-black leading-none tracking-[0.05em]",
            isNav ? "text-[19px]" : "text-[27px]",
          ].join(" ")}
        >
          CLARO
        </span>
        <span
          className={[
            "font-fraunces font-medium uppercase text-maroon/85 leading-none",
            isNav ? "text-[7px] tracking-[0.4em]" : "text-[9.5px] tracking-[0.42em]",
          ].join(" ")}
        >
          Bisztró
        </span>
      </span>
    </Link>
  );
}
