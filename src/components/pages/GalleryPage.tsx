import SiteShell from "../SiteShell";
import Reveal from "../Reveal";
import GalleryLightbox from "../GalleryLightbox";
import PageCta from "../sections/PageCta";
import { getGalleryImages } from "@/lib/data";
import { localePath, t, type Lang } from "@/lib/i18n";

export default async function GalleryPage({ lang }: { lang: Lang }) {
  const d = t(lang).galleryPage;
  const images = await getGalleryImages("gallery");

  return (
    <SiteShell lang={lang}>
      <section className="container-site pt-20">
        <Reveal>
          <h1 className="text-center font-fraunces text-[44px] font-semibold text-cream md:text-[54px]">
            {d.title}
          </h1>
        </Reveal>
        <Reveal delay={0.12} className="mt-14">
          <GalleryLightbox
            lang={lang}
            variant="masonry"
            placeholderCount={9}
            images={images.map((g) => ({ url: g.url, alt: g.alt }))}
          />
        </Reveal>
      </section>

      <PageCta
        title={d.ctaTitle}
        sub={d.ctaSub}
        primary={{ label: d.reserve, href: localePath(lang, "/contact") }}
        secondary={{ label: d.contact, href: localePath(lang, "/contact") }}
        imageUrl="/images/home-cta.avif"
        imageAlt="Claro Bisztró – bélszín steak burgonyaröszti körettel"
      />
    </SiteShell>
  );
}
