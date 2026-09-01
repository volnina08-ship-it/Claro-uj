import SiteShell from "../SiteShell";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import WeeklyMenuCard from "../WeeklyMenuCard";
import SpecialtiesCard from "../SpecialtiesCard";
import GalleryLightbox from "../GalleryLightbox";
import PageCta from "../sections/PageCta";
import { RedButton, OutlineButton } from "../Buttons";
import { getGalleryImages, getMenuImages, getSpecialties, getWeeklyMenu } from "@/lib/data";
import { localePath, t, type Lang } from "@/lib/i18n";

export default async function MenuPage({ lang }: { lang: Lang }) {
  const d = t(lang).menuPage;
  const [weekly, specialties, menuImages, galleryImages] = await Promise.all([
    getWeeklyMenu(),
    getSpecialties(),
    getMenuImages(),
    getGalleryImages("gallery"),
  ]);

  const heroImg = galleryImages[0]?.url ?? null;
  const sideImg = galleryImages[1]?.url ?? null;
  const fullMenuImages = menuImages.filter((m) => m.category === "menu");

  return (
    <SiteShell lang={lang}>
      {/* Hero háttérképpel */}
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden pb-16 pt-36">
        <div className="absolute inset-0">
          <SmartImage src={heroImg} alt="" seed={21} className="absolute inset-0" label="" />
          <div className="absolute inset-0 bg-gradient-to-b from-coal/70 via-coal/78 to-coal" />
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
              <SmartImage src={sideImg} alt="" seed={5} className="absolute inset-0" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Napi menü */}
      <section id="napi-menu" className="container-site mt-28 scroll-mt-24">
        <Reveal>
          <h2 className="text-center font-fraunces text-[36px] font-semibold text-cream md:text-[44px]">
            {d.dailyTitle}
          </h2>
          <p className="mt-3 text-center text-[14.5px] text-mist">{d.dailySub}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 max-w-[620px] transition-transform duration-700 hover:-rotate-[0.4deg] hover:scale-[1.01]">
            <WeeklyMenuCard data={weekly} />
          </div>
        </Reveal>
      </section>

      {/* Magyaros ajánlat */}
      <section id="etlap" className="container-site mt-28 scroll-mt-24">
        <Reveal>
          <h2 className="text-center font-fraunces text-[36px] font-semibold text-cream md:text-[44px]">
            {d.specialtiesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 max-w-[980px]">
            <SpecialtiesCard data={specialties} />
          </div>
        </Reveal>
      </section>

      {/* Teljes étlap képek – csak ha van feltöltve */}
      {fullMenuImages.length > 0 && (
        <section className="container-site mt-28">
          <Reveal>
            <h2 className="text-center font-fraunces text-[36px] font-semibold text-cream md:text-[44px]">
              {d.fullMenuTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="mt-12">
            <GalleryLightbox
              lang={lang}
              variant="masonry"
              gridClass="columns-1 gap-8 md:columns-2"
              images={fullMenuImages.map((m) => ({ url: m.url, alt: m.title }))}
            />
          </Reveal>
        </section>
      )}

      {/* Záró CTA */}
      <PageCta
        title={d.ctaTitle}
        sub={d.ctaSub}
        primary={{ label: d.contact, href: localePath(lang, "/contact") }}
        secondary={{ label: d.reserve2, href: localePath(lang, "/contact") }}
        imageUrl={galleryImages[2]?.url ?? null}
        seed={8}
      />
    </SiteShell>
  );
}
