import SiteShell from "../SiteShell";
import Reveal from "../Reveal";
import { RedButton, ArrowLink } from "../Buttons";
import { IconMail, IconPhone, IconPin } from "../icons";
import { CONTACT } from "@/lib/constants";
import { t, type Lang } from "@/lib/i18n";

export default function ContactPage({ lang }: { lang: Lang }) {
  const d = t(lang).contactPage;

  const blocks = [
    {
      icon: <IconMail className="h-7 w-7" />,
      title: d.emailTitle,
      text: d.emailText,
      content: (
        <a href={`mailto:${CONTACT.email}`} className="text-[15px] text-cream underline-offset-4 transition-colors hover:text-gold hover:underline">
          {CONTACT.email}
        </a>
      ),
    },
    {
      icon: <IconPhone className="h-7 w-7" />,
      title: d.phoneTitle,
      text: d.phoneText,
      content: (
        <a href={CONTACT.phoneHref} className="text-[15px] text-cream underline-offset-4 transition-colors hover:text-gold hover:underline">
          {CONTACT.phoneDisplay}
        </a>
      ),
    },
    {
      icon: <IconPin className="h-7 w-7" />,
      title: d.addressTitle,
      text: CONTACT.address,
      content: (
        <div className="mt-4 flex flex-wrap items-center gap-5">
          <RedButton href={CONTACT.mapsUrl}>{d.visit}</RedButton>
          <ArrowLink href={CONTACT.phoneHref}>{d.reserveTable}</ArrowLink>
        </div>
      ),
    },
  ];

  return (
    <SiteShell lang={lang}>
      <section className="container-site pb-8 pt-36">
        <Reveal>
          <p className="font-sans text-[13px] font-bold text-cream">{d.label}</p>
          <h1 className="mt-4 max-w-[720px] font-fraunces text-[40px] font-semibold leading-[1.1] text-cream md:text-[54px]">
            {d.title}
          </h1>
          <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-mist">{d.sub}</p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-11">
            {blocks.map((b, i) => (
              <Reveal key={b.title} delay={0.08 * i}>
                <div>
                  <span className="text-red-btn">{b.icon}</span>
                  <h2 className="mt-3 font-sans text-[19px] font-bold text-cream">{b.title}</h2>
                  <p className="mt-1.5 text-[14.5px] text-mist">{b.text}</p>
                  <div className="mt-2">{b.content}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="relative h-[420px] overflow-hidden rounded-[30px] border border-gold/40 bg-surface lg:h-full lg:min-h-[520px]">
              <iframe
                src={CONTACT.mapsEmbed}
                title="Claro Bisztró térkép"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
