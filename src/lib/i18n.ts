export type Lang = "en" | "hu";

/* A magyar oldal a /hu alatt, az angol a gyökérben él – ahogy a régi oldalon. */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return clean === "/" ? "/" : clean;
  return clean === "/" ? "/hu" : `/hu${clean}`;
}

export function switchLangPath(currentPath: string): { lang: Lang; target: string } {
  if (currentPath === "/hu" || currentPath.startsWith("/hu/")) {
    const rest = currentPath.slice(3) || "/";
    return { lang: "hu", target: rest };
  }
  return { lang: "en", target: currentPath === "/" ? "/hu" : `/hu${currentPath}` };
}

const dict = {
  en: {
    nav: { home: "Home", menu: "Menu", gallery: "Gallery", contact: "Contact" },
    hero: {
      titleA: "Experience the",
      titleAccent: "charm",
      titleB: "of CLARO BISTRO",
      sub: "Indulge in our delectable dishes and cozy ambiance",
      explore: "Explore",
      reserve: "Reserve",
    },
    about: {
      label: "About Us",
      title: "Experience the Best of Traditional and Contemporary Dining",
      text: "At CLARO BISTRO, we offer a dynamic dining experience that seamlessly blends traditional and contemporary flavors. Our menu features a wide range of dishes crafted with the finest ingredients, ensuring a memorable culinary journey for every guest.",
      explore: "Explore",
      reserve: "Reserve",
    },
    homeGallery: {
      title: "Image Gallery",
      sub: "Experience the ambiance and memories of CLARO BISTRO",
    },
    menuCta: {
      title: "Discover our delectable menu",
      sub: "Indulge in a culinary experience like no other",
      menu: "Menu",
      daily: "Daily Deals",
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      cookies: "Cookies Settings",
      madeBy: "Made by: KZH DIGITAL",
    },
    menuPage: {
      heroTitle: "Menu Selection",
      heroSub: "Try our specialties!",
      explore: "Explore",
      reserve: "Reserve",
      gastroLabel: "Gastro experience",
      gastroTitle: "Discover our dishes and drinks",
      gastroText:
        "Dive into our carefully crafted selection of dishes and drinks, prepared from the finest, hand-picked ingredients.",
      col1Title: "Specialties",
      col1Text: "Taste our signature Hungarian dishes and our chef's seasonal recommendations.",
      col2Title: "Daily Menu",
      col2Text: "A budget-friendly, daily changing lunch menu, every weekday from 11:30.",
      dailyTitle: "Daily Menu",
      dailySub: "Every weekday from 11:30",
      specialtiesTitle: "Menu",
      fullMenuTitle: "Full Menu",
      ctaTitle: "Discover our menu!",
      ctaSub: "Visit us and experience the Claro feeling!",
      contact: "Contact",
      reserve2: "Reserve",
    },
    galleryPage: {
      title: "Gallery",
      ctaTitle: "Experience the one-of-a-kind CLARO feeling.",
      ctaSub: "Dive into our wide menu selection and enjoy the Claro experience!",
      reserve: "Reserve",
      contact: "Contact",
    },
    contactPage: {
      label: "Contact",
      title: "Get in touch with us",
      sub: "Do you have a question or need help with something? Feel free to reach out.",
      emailTitle: "Email",
      emailText: "Send us an email",
      phoneTitle: "Phone",
      phoneText: "Give us a call",
      addressTitle: "Claro Bisztró",
      visit: "Visit us",
      reserveTable: "Reserve a table",
    },
    misc: {
      openLightbox: "Open image",
      close: "Close",
      prev: "Previous image",
      next: "Next image",
      langName: "English",
    },
  },
  hu: {
    nav: { home: "Kezdőlap", menu: "Menü", gallery: "Galéria", contact: "Kapcsolat" },
    hero: {
      titleA: "Tapasztald meg a",
      titleAccent: "CLARO",
      titleB: "életérzést",
      sub: "Éld át a Claro Bisztró pezsgő hangulatát!",
      explore: "Felfedezés",
      reserve: "Foglalás",
    },
    about: {
      label: "Rólunk",
      title: "Tapasztald meg a hagyományos és modern étkezés legjobbjait",
      text: "A CLARO BISZTRÓ-ban többféle étkezési élményt kínálunk, amely hagyományos és modern ízeket ötvöz. Az étlapunkon számos fogás szerepel a legfinomabb hozzávalókból készítve, biztosítva minden vendég számára az emlékezetes gasztronómiai élményt.",
      explore: "Felfedezés",
      reserve: "Foglalás",
    },
    homeGallery: {
      title: "Galéria",
      sub: "Látogass el hozzánk, ahol a gasztronómia és a laza környezet találkozik!",
    },
    menuCta: {
      title: "Fedezd fel étlapunkat",
      sub: "Merülj el az egyedi gasztronómiai élményben!",
      menu: "Menü",
      daily: "Napi Menü",
    },
    footer: {
      rights: "Minden jog fenntartva.",
      privacy: "Adatvédelmi irányelvek",
      cookies: "Sütikezelési beállítások",
      madeBy: "Made by: KZH DIGITAL",
    },
    menuPage: {
      heroTitle: "Menüválaszték",
      heroSub: "Próbáld ki különlegességeinket!",
      explore: "Felfedezés",
      reserve: "Foglalás",
      gastroLabel: "Gasztro élmény",
      gastroTitle: "Fedezd fel ételeinket és italainkat",
      gastroText:
        "Merülj el gondosan kidolgozott ételeink és italaink kínálatában, amelyeket a legfinomabb, válogatott hozzávalókból készítünk.",
      col1Title: "Különlegességek",
      col1Text: "Kóstold meg magyaros fogásainkat és séfünk szezonális ajánlatait.",
      col2Title: "Napi Menü",
      col2Text: "Kedvező árú, naponta változó ebédmenü, minden hétköznap 11:30-tól.",
      dailyTitle: "Napi menü",
      dailySub: "Minden hétköznap 11:30-tól",
      specialtiesTitle: "Menü",
      fullMenuTitle: "Teljes étlap",
      ctaTitle: "Fedezd fel étlapunkat!",
      ctaSub: "Látogass el hozzánk, és éld át a Claro élményt!",
      contact: "Kapcsolat",
      reserve2: "Foglalás",
    },
    galleryPage: {
      title: "Galéria",
      ctaTitle: "Tapasztald meg a különleges CLARO életérzést.",
      ctaSub: "Merülj el étlapunk széles kínálatában, és élvezd a Claro élményt!",
      reserve: "Foglalás",
      contact: "Kapcsolat",
    },
    contactPage: {
      label: "Kapcsolat",
      title: "Vedd fel velünk a kapcsolatot",
      sub: "Van valami kérdésed vagy segítségre van szükséged? Keress minket bizalommal.",
      emailTitle: "Email",
      emailText: "Küldj nekünk egy e-mailt",
      phoneTitle: "Telefon",
      phoneText: "Hívj minket",
      addressTitle: "Claro Bisztró",
      visit: "Látogass el hozzánk",
      reserveTable: "Foglalj asztalt",
    },
    misc: {
      openLightbox: "Kép megnyitása",
      close: "Bezárás",
      prev: "Előző kép",
      next: "Következő kép",
      langName: "Magyar",
    },
  },
};

export type Dict = (typeof dict)["en"];

export function t(lang: Lang): Dict {
  return dict[lang];
}
