import { SunMark } from "./Logo";
import type { Specialties } from "@/lib/content";

/* A piros-fehér "Magyaros Ajánlat / Hungarian Specialties" kártya
   újraalkotva élő adatból, sakktáblás szegéllyel. */
export default function SpecialtiesCard({ data }: { data: Specialties }) {
  return (
    <div className="grid overflow-hidden rounded-[26px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:grid-cols-[0.85fr_1.5fr]">
      {/* Bal oldal – krém panel */}
      <div className="paper relative flex flex-col items-center justify-center gap-1 px-8 py-10 text-center md:py-14">
        <SunMark className="h-14 w-14 text-red-btn" />
        <span className="mt-2 font-fraunces text-[30px] font-bold tracking-[0.1em] text-red-btn">CLARO</span>
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.5em] text-red-btn/80">
          Bisztró
        </span>
        <div className="mt-6 space-y-1">
          <p className="font-fraunces text-[32px] font-semibold leading-tight text-red-deep">{data.title_hu}</p>
          <p className="font-fraunces text-[20px] italic text-red-deep/80">{data.title_en}</p>
        </div>
        {/* Magyar trikolór */}
        <div className="mt-7 flex h-[10px] w-28 overflow-hidden rounded-full border border-ink/10">
          <span className="flex-1 bg-[#c8433c]" />
          <span className="flex-1 bg-white" />
          <span className="flex-1 bg-[#3f7a4e]" />
        </div>
      </div>

      {/* Jobb oldal – piros panel sakktáblás szegéllyel */}
      <div className="relative bg-red px-7 py-9 sm:px-10 sm:py-11 md:pr-16">
        <div className="checker-red pointer-events-none absolute inset-y-0 right-0 hidden w-8 opacity-95 md:block" />
        {data.sections.map((s, si) => (
          <div key={`${s.name_hu}-${si}`} className={si === 0 ? "" : "mt-9"}>
            <div className="border-b border-cream-bright/35 pb-2.5">
              <h4 className="font-fraunces text-[22px] font-semibold text-cream-bright">
                {s.name_hu}
                {s.name_en ? <span className="font-normal italic text-cream-bright/75"> – {s.name_en}</span> : null}
              </h4>
            </div>
            <ul className="mt-4 space-y-4">
              {s.items.map((it, ii) => {
                const note = [it.note_hu, it.note_en].filter(Boolean).join(" – ");
                return (
                  <li key={`${it.name_hu}-${ii}`} className="flex items-baseline justify-between gap-6">
                    <div>
                      <p className="text-[15.5px] font-semibold text-cream-bright">{it.name_hu}</p>
                      {it.name_en ? <p className="text-[13px] italic text-cream-bright/70">{it.name_en}</p> : null}
                      {note ? <p className="mt-0.5 text-[12px] text-cream-bright/60">{note}</p> : null}
                    </div>
                    <p className="whitespace-nowrap font-fraunces text-[16.5px] font-bold text-cream-bright">
                      {it.price}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
