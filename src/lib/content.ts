/* A Supabase-ben tárolt szerkeszthető tartalom típusai és alapértékei.
   Az alapértékek akkor jelennek meg, ha az adatbázis nem érhető el. */

export type WeeklyMenuDay = {
  day: string;
  soup: string;
  main: string;
};

export type PriceRow = {
  label: string;
  price: string;
};

export type WeeklyMenu = {
  days: WeeklyMenuDay[];
  constant_offer: string;
  extra_note: string;
  availability: string;
  takeaway: string;
  prices: PriceRow[];
  footnote: string;
};

export type SpecialtyItem = {
  name_hu: string;
  name_en: string;
  price: string;
  note_hu: string;
  note_en: string;
};

export type SpecialtySection = {
  name_hu: string;
  name_en: string;
  items: SpecialtyItem[];
};

export type Specialties = {
  title_hu: string;
  title_en: string;
  sections: SpecialtySection[];
};

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  section: "hero" | "home" | "gallery";
  sort_order: number;
};

export type MenuImage = {
  id: string;
  url: string;
  title: string;
  category: "menu" | "daily" | "specials";
  sort_order: number;
};

export const DEFAULT_WEEKLY_MENU: WeeklyMenu = {
  days: [
    { day: "Hétfő", soup: "Hagymaleves", main: "Borsófőzelék fasírttal" },
    { day: "Kedd", soup: "Sajtkrémleves", main: "Bolognai spagetti" },
    { day: "Szerda", soup: "Húsleves", main: "Gombapaprikás tésztával" },
    { day: "Csütörtök", soup: "Zellerkrémleves", main: "Sült csirkecomb kukoricás rizzsel" },
    { day: "Péntek", soup: "Frankfurti leves", main: "Rántott sajt rizzsel, tartármártással" },
  ],
  constant_offer:
    "Állandó főétel ajánlat: Mátrai borzas / Cordon bleu vegyes körettel, választható hozzávalókkal",
  extra_note: "Extra kenyér / Szósz / Savanyúság +300 Ft",
  availability: "MINDEN HÉTKÖZNAP 11:30-15:00 (A KÉSZLET EREJÉIG!)",
  takeaway: "ELVITELRE IS!",
  prices: [
    { label: "Leves", price: "500 Ft" },
    { label: "Főétel", price: "1800 Ft" },
    { label: "Nagy főétel", price: "2900 Ft" },
    { label: "Csomagolás", price: "100 Ft/db" },
  ],
  footnote: "A változás jogát fenntartjuk!",
};

export const DEFAULT_SPECIALTIES: Specialties = {
  title_hu: "Magyaros Ajánlat",
  title_en: "Hungarian Specialties",
  sections: [
    {
      name_hu: "Levesek",
      name_en: "Soup",
      items: [
        {
          name_hu: "Gulyásleves",
          name_en: "Goulash Soup",
          price: "2990 Ft",
          note_hu: "kis adag: 1690 Ft",
          note_en: "small portion: 1690 Ft",
        },
        { name_hu: "Halászlé", name_en: "Fisherman's soup", price: "1990 Ft", note_hu: "", note_en: "" },
      ],
    },
    {
      name_hu: "Főételek",
      name_en: "Main Dish",
      items: [
        {
          name_hu: "Marhapörkölt juhtúrós sztrapacskával",
          name_en: "Beef stew with sheep cheese dumplings",
          price: "4500 Ft",
          note_hu: "",
          note_en: "",
        },
        {
          name_hu: "Lecsós bélszínsteak házi steakburgonyával",
          name_en: "Beef tenderloin steak with Hungarian lecsó and homemade steak potatoes",
          price: "9790 Ft",
          note_hu: "",
          note_en: "",
        },
        {
          name_hu: "Óvári sertésszelet házi hasábburgonyával",
          name_en: "Pork chops \"Óvári\" style (ham + mushroom + cheese)",
          price: "5790 Ft",
          note_hu: "",
          note_en: "",
        },
        {
          name_hu: "Hortobágyi húsos palacsinta",
          name_en: "Savory meat pancakes",
          price: "3790 Ft",
          note_hu: "",
          note_en: "",
        },
      ],
    },
    {
      name_hu: "Desszertek",
      name_en: "Desserts",
      items: [
        {
          name_hu: "Óriás házi palacsinta",
          name_en: "Giant homemade pancakes",
          price: "1990 Ft",
          note_hu: "",
          note_en: "",
        },
      ],
    },
  ],
};
