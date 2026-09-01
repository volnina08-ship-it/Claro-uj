import Reveal from "../Reveal";
import { RedButton, ArrowLink } from "../Buttons";
import { localePath, t, type Lang } from "@/lib/i18n";

/* Kezdőlapi "Fedezd fel étlapunkat" szekció az arany keretes étel-fotóval. */
export default function MenuCta({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <section className="container-site mt-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-fraunces text-[34px] font-semibold leading-[1.15] text-cream md:text-[42px]">
            {d.menuCta.title}
          </h2>
          <p className="mt-4 text-[15px] text-mist">{d.menuCta.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <RedButton href={localePath(lang, "/menu")}>{d.menuCta.menu}</RedButton>
            <ArrowLink href={`${localePath(lang, "/menu")}#napi-menu`}>{d.menuCta.daily}</ArrowLink>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="group relative rounded-[40px] border border-gold/60 bg-coal-deep/40 p-4 transition-transform duration-700 hover:-translate-y-1.5 sm:p-5">
            <div className="relative h-[340px] overflow-hidden rounded-[26px] sm:h-[400px]">
              <img
                src="/images/home-cta.avif"
                alt="Claro Bisztró – bélszín steak burgonyaröszti körettel"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
