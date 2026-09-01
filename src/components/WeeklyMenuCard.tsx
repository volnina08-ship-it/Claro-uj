import { SunMark } from "./Logo";
import type { WeeklyMenu } from "@/lib/content";

/* A fehér "Napi menü" kártya – az eredeti nyomtatott kártya hű mása,
   de élő adatból renderelve, így az adminból szerkeszthető. */
export default function WeeklyMenuCard({
  data,
  compact = false,
}: {
  data: WeeklyMenu;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "paper relative w-full overflow-hidden rounded-[24px] text-ink shadow-[0_30px_80px_rgba(0,0,0,0.45)]",
        compact ? "px-6 py-7" : "px-7 py-9 sm:px-10 sm:py-11",
      ].join(" ")}
    >
      {/* Felső logó */}
      <div className="flex flex-col items-center gap-1">
        <SunMark className={compact ? "h-8 w-8 text-maroon" : "h-10 w-10 text-maroon"} />
        <span className={`font-fraunces font-bold tracking-[0.1em] text-maroon ${compact ? "text-[20px]" : "text-[24px]"}`}>
          CLARO
        </span>
        <span className="font-sans text-[8px] font-semibold uppercase tracking-[0.45em] text-maroon/75">
          Bisztró
        </span>
      </div>

      <h3 className={`mt-4 text-center font-fraunces font-semibold ${compact ? "text-[26px]" : "text-[34px]"}`}>
        Napi menü
      </h3>

      {/* Napok */}
      <div className={compact ? "mt-3" : "mt-5"}>
        {data.days.map((d) => (
          <div key={d.day} className={`text-center ${compact ? "mt-3.5" : "mt-5"}`}>
            <p className={`font-fraunces font-bold ${compact ? "text-[16px]" : "text-[19px]"}`}>{d.day}</p>
            {d.soup ? <p className={`${compact ? "text-[12.5px]" : "text-[14.5px]"} mt-0.5 text-ink/85`}>{d.soup}</p> : null}
            {d.main ? <p className={`${compact ? "text-[12.5px]" : "text-[14.5px]"} text-ink/85`}>{d.main}</p> : null}
          </div>
        ))}
      </div>

      {/* Állandó ajánlat + extrák */}
      <div className={`border-t border-ink/15 text-center ${compact ? "mt-4 pt-3.5" : "mt-7 pt-5"}`}>
        {data.constant_offer ? (
          <p className={`font-medium ${compact ? "text-[11.5px]" : "text-[13px]"} text-ink/90`}>{data.constant_offer}</p>
        ) : null}
        {data.extra_note ? (
          <p className={`mt-1.5 ${compact ? "text-[11px]" : "text-[12.5px]"} text-ink/65`}>{data.extra_note}</p>
        ) : null}
      </div>

      {data.availability ? (
        <p className={`text-center font-bold uppercase tracking-[0.06em] ${compact ? "mt-3.5 text-[11px]" : "mt-6 text-[13px]"}`}>
          {data.availability}
        </p>
      ) : null}
      {data.takeaway ? (
        <p className={`text-center font-bold uppercase tracking-[0.14em] text-maroon ${compact ? "mt-1 text-[11px]" : "mt-1.5 text-[13px]"}`}>
          {data.takeaway}
        </p>
      ) : null}

      {/* Árak */}
      {data.prices.length ? (
        <div
          className={[
            "grid grid-cols-2 border-t border-ink/15 text-center sm:grid-cols-4",
            compact ? "mt-3.5 gap-2.5 pt-3.5" : "mt-6 gap-4 pt-5",
          ].join(" ")}
        >
          {data.prices.map((p, i) => (
            <div key={`${p.label}-${i}`}>
              <p className={`font-sans font-semibold uppercase tracking-[0.14em] text-ink/55 ${compact ? "text-[8.5px]" : "text-[10px]"}`}>
                {p.label}
              </p>
              <p className={`font-fraunces font-bold text-maroon ${compact ? "text-[14px]" : "text-[17px]"}`}>{p.price}</p>
            </div>
          ))}
        </div>
      ) : null}

      {data.footnote ? (
        <p className={`text-center italic text-ink/55 ${compact ? "mt-3 text-[10.5px]" : "mt-5 text-[12px]"}`}>
          {data.footnote}
        </p>
      ) : null}
    </div>
  );
}
