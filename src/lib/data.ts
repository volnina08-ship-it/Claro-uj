/* Szerver oldali adatlekérés a Supabase REST API-n keresztül.
   Hiba vagy timeout esetén a beépített alapértékekkel esik vissza,
   így az oldal offline adatbázis mellett is felépül. */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./constants";
import {
  DEFAULT_SPECIALTIES,
  DEFAULT_WEEKLY_MENU,
  type GalleryImage,
  type GallerySection,
  type MenuImage,
  type Specialties,
  type WeeklyMenu,
} from "./content";

async function rest<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      // A publikus oldalak percenként frissülnek az admin módosításai után.
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function getContent<T>(key: string): Promise<T | null> {
  const rows = await rest<{ data: T }[]>(
    `site_content?key=eq.${encodeURIComponent(key)}&select=data&limit=1`
  );
  return rows?.[0]?.data ?? null;
}

export async function getWeeklyMenu(): Promise<WeeklyMenu> {
  const data = await getContent<WeeklyMenu>("weekly_menu");
  if (!data || !Array.isArray(data.days)) return DEFAULT_WEEKLY_MENU;
  return { ...DEFAULT_WEEKLY_MENU, ...data };
}

export async function getSpecialties(): Promise<Specialties> {
  const data = await getContent<Specialties>("specialties");
  if (!data || !Array.isArray(data.sections)) return DEFAULT_SPECIALTIES;
  return { ...DEFAULT_SPECIALTIES, ...data };
}

export async function getGalleryImages(section: GallerySection): Promise<GalleryImage[]> {
  const rows = await rest<GalleryImage[]>(
    `gallery_images?section=eq.${section}&select=id,url,alt,section,sort_order&order=sort_order.asc,created_at.asc`
  );
  return rows ?? [];
}

export async function getMenuImages(category?: MenuImage["category"]): Promise<MenuImage[]> {
  const filter = category ? `category=eq.${category}&` : "";
  const rows = await rest<MenuImage[]>(
    `menu_images?${filter}select=id,url,title,category,sort_order&order=sort_order.asc,created_at.asc`
  );
  return rows ?? [];
}
