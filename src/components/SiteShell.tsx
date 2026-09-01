import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LangSwitcher from "./LangSwitcher";
import type { Lang } from "@/lib/i18n";

/* Közös oldalváz: fejléc, lábléc, lebegő nyelvváltó. */
export default function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <>
      <Navbar lang={lang} />
      <main className="relative">{children}</main>
      <Footer lang={lang} />
      <LangSwitcher />
    </>
  );
}
