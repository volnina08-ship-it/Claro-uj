import Reveal from "../Reveal";
import { SunMark } from "../Logo";
import { OutlineButton, ArrowLink } from "../Buttons";
import { localePath, t, type Lang } from "@/lib/i18n";

/* A jellegzetes piros "Rólunk" szekció lekerekített panellel. */
export default function AboutRed({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <section className="container-site">
      <Reveal>
        <div className="relative overflow-hidden rounded-[40px] bg-red px-7 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:px-14 md:py-16">
          {/* Lassan forgó nap a háttérben */}
          <SunMark className="animate-spin-slow pointer-events-none absolute -right-24 -top-28 h-[360px] w-[360px] text-cream-bright opacity-[0.07]" />
          <SunMark className="animate-spin-slow pointer-events-none absolute -bottom-32 -left-24 h-[300px] w-[300px] text-cream-bright opacity-[0.05]" />

          <div className="relative grid gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <p className="font-sans text-[13px] font-bold tracking-[0.08em] text-cream-bright">
                {d.about.label}
              </p>
              <h2 className="mt-4 font-fraunces text-[32px] font-semibold leading-[1.15] text-cream-bright md:text-[40px]">
                {d.about.title}
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[15px] leading-relaxed text-cream-bright/90">{d.about.text}</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <OutlineButton href={localePath(lang, "/menu")} tone="white">
                  {d.about.explore}
                </OutlineButton>
                <ArrowLink href={localePath(lang, "/contact")} tone="white">
                  {d.about.reserve}
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
