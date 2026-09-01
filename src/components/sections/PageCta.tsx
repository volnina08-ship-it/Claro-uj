import Reveal from "../Reveal";
import { RedButton, ArrowLink } from "../Buttons";

/* Oldalzáró CTA blokk, opcionális képpel a jobb oldalon. */
export default function PageCta({
  title,
  sub,
  primary,
  secondary,
  imageUrl,
  imageAlt = "",
}: {
  title: string;
  sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  imageUrl?: string;
  imageAlt?: string;
}) {
  return (
    <section className="container-site mt-28">
      <div className={imageUrl ? "grid items-center gap-12 lg:grid-cols-2" : ""}>
        <Reveal>
          <h2 className="font-fraunces text-[34px] font-semibold leading-[1.15] text-cream md:text-[42px]">
            {title}
          </h2>
          <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-mist">{sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <RedButton href={primary.href}>{primary.label}</RedButton>
            <ArrowLink href={secondary.href}>{secondary.label}</ArrowLink>
          </div>
        </Reveal>
        {imageUrl ? (
          <Reveal delay={0.15}>
            <div className="relative h-[300px] overflow-hidden rounded-[34px] border border-gold/50 md:h-[380px]">
              <img
                src={imageUrl}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
