/* Szerver oldali adatlekérés a Supabase REST API-n keresztül.
   Hiba vagy timeout esetén üres/fallback értékkel tér vissza,
   így az oldal offline adatbázis mellett is felépül. */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./constants";
import type { GalleryImage, GallerySection, MenuImage } from "./content";

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

export async function getGalleryImages(section: GallerySection): Promise<GalleryImage[]> {
  const rows = await rest<GalleryImage[]>(
    `gallery_images?section=eq.${section}&select=id,url,alt,section,sort_order&order=sort_order.asc,created_at.asc`
  );
  return rows ?? [];
}

/* Az adminban feltöltött napi menü kép URL-je (vagy null, ha nincs). */
export async function getDailyMenuImage(): Promise<string | null> {
  const rows = await rest<MenuImage[]>(
    `menu_images?category=eq.daily&select=url&order=sort_order.asc,created_at.desc&limit=1`
  );
  return rows?.[0]?.url ?? null;
}
