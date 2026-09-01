import SiteShell from "../SiteShell";
import HomeHero from "../sections/HomeHero";
import AboutRed from "../sections/AboutRed";
import MenuCta from "../sections/MenuCta";
import Reveal from "../Reveal";
import GalleryLightbox from "../GalleryLightbox";
import { getGalleryImages } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";

export default async function HomePage({ lang }: { lang: Lang }) {
  const d = t(lang);
  // A galéria első 6 képe jelenik meg a kezdőlapon
  const gallery = await getGalleryImages("gallery");
  const homeImages = gallery.slice(0, 6);

  return (
    <SiteShell lang={lang}>
      <HomeHero lang={lang} />

      <AboutRed lang={lang} />

      {/* Galéria szekció */}
      <section className="container-site mt-28">
        <Reveal>
          <h2 className="text-center font-fraunces text-[36px] font-semibold text-cream md:text-[44px]">
            {d.homeGallery.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-center text-[14.5px] text-mist">
            {d.homeGallery.sub}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <GalleryLightbox
            lang={lang}
            variant="grid"
            placeholderCount={6}
            images={homeImages.map((g) => ({ url: g.url, alt: g.alt }))}
          />
        </Reveal>
      </section>

      <MenuCta lang={lang} />
    </SiteShell>
  );
}
