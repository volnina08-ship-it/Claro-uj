import SiteShell from "../SiteShell";
import Reveal from "../Reveal";
import { CONTACT } from "@/lib/constants";
import type { Lang } from "@/lib/i18n";

const copy = {
  hu: {
    title: "Adatvédelmi irányelvek",
    intro:
      "A Claro Bisztró (Budapest, Ráday utca 35, 1092) elkötelezett a látogatók személyes adatainak védelme mellett. Az alábbiakban röviden összefoglaljuk, hogyan kezeljük az adatokat ezen a weboldalon.",
    sections: [
      {
        h: "Milyen adatokat kezelünk?",
        p: "A weboldal böngészése regisztráció nélkül lehetséges. Személyes adatot (név, e-mail cím, telefonszám) kizárólag akkor kezelünk, ha kapcsolatba lépsz velünk e-mailben vagy telefonon, például asztalfoglalás céljából. Ezeket az adatokat csak a megkeresés megválaszolásához és a foglalás kezeléséhez használjuk fel.",
      },
      {
        h: "Sütik (cookie-k)",
        p: "Ez a weboldal nem használ követő vagy marketing célú sütiket. Kizárólag a weboldal működéséhez elengedhetetlenül szükséges technikai megoldásokat alkalmazunk. A Google Térkép beágyazás a térkép megjelenítésekor a Google saját feltételei szerint kezelhet adatokat.",
        id: "cookies",
      },
      {
        h: "Adattovábbítás és adatbiztonság",
        p: "Adataidat harmadik félnek nem adjuk át, és nem használjuk fel marketing célokra. A weboldal üzemeltetéséhez biztonságos, európai uniós szervereken futó szolgáltatásokat veszünk igénybe.",
      },
      {
        h: "Jogaid és kapcsolat",
        p: `Bármikor kérheted a rólad tárolt adatok törlését vagy módosítását az alábbi elérhetőségen: ${CONTACT.email} vagy ${CONTACT.phoneDisplay}.`,
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    intro:
      "Claro Bisztró (Budapest, Ráday utca 35, 1092) is committed to protecting the personal data of its visitors. Below is a short summary of how data is handled on this website.",
    sections: [
      {
        h: "What data do we process?",
        p: "You can browse this website without registration. We only process personal data (name, email address, phone number) if you contact us by email or phone, for example to book a table. This data is used solely to respond to your inquiry and manage your reservation.",
      },
      {
        h: "Cookies",
        p: "This website does not use tracking or marketing cookies. Only technical solutions strictly necessary for the operation of the site are used. The embedded Google Map may process data according to Google's own terms when the map is displayed.",
        id: "cookies",
      },
      {
        h: "Data sharing and security",
        p: "We do not share your data with third parties and do not use it for marketing purposes. The website runs on secure services hosted on servers within the European Union.",
      },
      {
        h: "Your rights and contact",
        p: `You may request the deletion or modification of your stored data at any time at ${CONTACT.email} or ${CONTACT.phoneDisplay}.`,
      },
    ],
  },
};

export default function PrivacyPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return (
    <SiteShell lang={lang}>
      <section className="container-site max-w-[820px] pt-20">
        <Reveal>
          <h1 className="font-fraunces text-[40px] font-semibold text-cream md:text-[48px]">{c.title}</h1>
          <p className="mt-6 text-[15px] leading-relaxed text-mist">{c.intro}</p>
        </Reveal>
        {c.sections.map((s, i) => (
          <Reveal key={s.h} delay={0.05 * i}>
            <div id={s.id} className="mt-10 scroll-mt-28">
              <h2 className="font-fraunces text-[24px] font-semibold text-cream">{s.h}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">{s.p}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </SiteShell>
  );
}
