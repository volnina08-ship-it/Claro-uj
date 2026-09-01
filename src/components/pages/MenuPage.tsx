import SiteShell from "../SiteShell";
import Reveal from "../Reveal";
import MenuShowcase from "../MenuShowcase";
import PageCta from "../sections/PageCta";
import { RedButton, OutlineButton } from "../Buttons";
import { getDailyMenuImage } from "@/lib/data";
import { localePath, t, type Lang } from "@/lib/i18n";

export default async function MenuPage({ lang }: { lang: Lang }) {
  const d = t(lang).menuPage;
  // Az adminból cserélhető napi menü kép; amíg nincs feltöltve, a repóban lévő él
  const dailyUrl = (await getDailyMenuImage()) ?? "/images/napi-menu.avif";

  return (
    <SiteShell lang={lang}>
      {/* Hero – halvány háttérképpel */}
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden pb-16 pt-36">
        <div className="absolute inset-0">
          <img
            src="/images/menu-hero.avif"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coal/72 via-coal/82 to-coal" />
        </div>
        <div className="container-site relative text-center">
          <Reveal>
            <h1 className="font-fraunces text-[42px] font-semibold text-cream md:text-[54px]">
              {d.heroTitle}
            </h1>
            <p className="mt-3 text-[15px] text-mist">{d.heroSub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <RedButton href="#napi-menu">{d.explore}</RedButton>
              <OutlineButton href={localePath(lang, "/contact")}>{d.reserve}</OutlineButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gasztro élmény */}
      <section className="container-site mt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.9fr]">
          <Reveal>
            <p className="font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-gold">
              {d.gastroLabel}
            </p>
            <h2 className="mt-3 font-fraunces text-[32px] font-semibold leading-[1.15] text-cream md:text-[40px]">
              {d.gastroTitle}
            </h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-mist">{d.gastroText}</p>
            <div className="mt-9 grid gap-8 sm:grid-cols-2">
              <div className="border-l border-gold/40 pl-5">
                <h3 className="font-fraunces text-[20px] font-semibold text-cream">{d.col1Title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-mist">{d.col1Text}</p>
              </div>
              <div className="border-l border-gold/40 pl-5">
                <h3 className="font-fraunces text-[20px] font-semibold text-cream">{d.col2Title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-mist">{d.col2Text}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative h-[300px] overflow-hidden rounded-[34px] border border-gold/50 md:h-[360px]">
              <img
                src="/images/menu-side.avif"
                alt="Claro Bisztró – sült fogas friss salátával"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Napi menü + Menü képek (közös lightbox) */}
      <MenuShowcase lang={lang} dailyUrl={dailyUrl} />

      {/* Záró CTA */}
      <PageCta
        title={d.ctaTitle}
        sub={d.ctaSub}
        primary={{ label: d.contact, href: localePath(lang, "/contact") }}
        secondary={{ label: d.reserve2, href: localePath(lang, "/contact") }}
      />
    </SiteShell>
  );
}
