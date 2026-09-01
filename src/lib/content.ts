/* A Supabase-ben tárolt, adminból kezelt tartalom típusai. */

/* Kép szekciók: gallery = a galéria (az első 6 kép a kezdőlapon is megjelenik).
   A többi érték korábbi szekciókból maradt az adatbázis-sémában. */
export type GallerySection = "hero" | "home" | "gallery" | "menucta" | "menu_hero" | "menu_side";

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  section: GallerySection;
  sort_order: number;
};

export type MenuImage = {
  id: string;
  url: string;
  title: string;
  category: "menu" | "daily" | "specials";
  sort_order: number;
};
