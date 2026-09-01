"use client";

import { getSupabase } from "./supabase";
import type { GalleryImage, MenuImage } from "./content";

/* Admin műveletek – minden hívást a Supabase RLS véd,
   csak az admins táblában szereplő email írhat. */

export async function listGallery(): Promise<GalleryImage[]> {
  const { data } = await getSupabase()
    .from("gallery_images")
    .select("id,url,alt,section,sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as GalleryImage[]) ?? [];
}

export async function listMenuImages(): Promise<MenuImage[]> {
  const { data } = await getSupabase()
    .from("menu_images")
    .select("id,url,title,category,sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as MenuImage[]) ?? [];
}

function fileExt(name: string): string {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "jpg";
}

export async function uploadToStorage(file: File, folder: string): Promise<{ url?: string; error?: string }> {
  const supabase = getSupabase();
  const path = `${folder}/${crypto.randomUUID()}.${fileExt(file.name)}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type || undefined,
    cacheControl: "31536000",
  });
  if (error) return { error: error.message };
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}

export async function removeFromStorageByUrl(url: string): Promise<void> {
  const marker = "/storage/v1/object/public/media/";
  const idx = url.indexOf(marker);
  if (idx === -1) return; // külső kép, nincs mit törölni a storage-ból
  const path = decodeURIComponent(url.slice(idx + marker.length));
  await getSupabase().storage.from("media").remove([path]);
}
