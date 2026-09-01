import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { RedButton, ArrowLink } from "../Buttons";

/* Oldalzáró CTA blokk, opcionális képpel a jobb oldalon. */
export default function PageCta({
  title,
  sub,
  primary,
  secondary,
  imageUrl,
  imageAlt = "",
  seed = 11,
}: {
  title: string;
  sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  imageUrl?: string | null;
  imageAlt?: string;
  seed?: number;
  withImage?: boolean;
}) {
  return (
    <section className="container-site mt-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
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
        <Reveal delay={0.15}>
          <div className="relative h-[300px] overflow-hidden rounded-[34px] border border-gold/50 md:h-[380px]">
            <SmartImage src={imageUrl} alt={imageAlt} seed={seed} className="absolute inset-0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
