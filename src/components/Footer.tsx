import Link from "next/link";
import { LogoPlaque } from "./Logo";
import { IconFacebook, IconInstagram } from "./icons";
import { localePath, t, type Lang } from "@/lib/i18n";
import { SOCIAL } from "@/lib/constants";

export default function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  const year = new Date().getFullYear();

  const links = [
    { href: localePath(lang, "/"), label: d.nav.home },
    { href: localePath(lang, "/menu"), label: d.nav.menu },
    { href: localePath(lang, "/gallery"), label: d.nav.gallery },
    { href: localePath(lang, "/contact"), label: d.nav.contact },
  ];

  return (
    <footer className="relative mt-24 pb-8">
      <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:pr-10">
        {/* A plakett a képernyő bal széléhez simul, mint az eredetin */}
        <div className="self-start md:self-center">
          <LogoPlaque lang={lang} variant="footer" />
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans text-[12.5px] font-medium uppercase tracking-[0.16em] text-cream/85 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-cream/80">
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-all hover:-translate-y-0.5 hover:text-gold"
          >
            <IconFacebook className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-all hover:-translate-y-0.5 hover:text-gold"
          >
            <IconInstagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="container-site">
        <div className="mt-10 border-t border-gold/15 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-mist/75">
            <span>
              © {year} Claro Bisztró. {d.footer.rights}
            </span>
            <Link href={localePath(lang, "/privacy")} className="underline underline-offset-4 transition-colors hover:text-gold">
              {d.footer.privacy}
            </Link>
            <Link
              href={`${localePath(lang, "/privacy")}#cookies`}
              className="underline underline-offset-4 transition-colors hover:text-gold"
            >
              {d.footer.cookies}
            </Link>
          </div>
          <p className="mt-6 text-center text-[12px] tracking-wide text-mist/50">{d.footer.madeBy}</p>
        </div>
      </div>
    </footer>
  );
}
