"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { listGallery, removeFromStorageByUrl, uploadToStorage } from "@/lib/adminApi";
import type { GalleryImage } from "@/lib/content";
import { IconArrowDown, IconArrowUp, IconTrash, IconUpload } from "../icons";
import { Card, IconBtn, Spinner, Toast, inputClass } from "./ui";

/* A galéria kezelése – az itt lévő képek jelennek meg a Galéria oldalon,
   az első 6 pedig a kezdőlap Galéria szekciójában is. */
export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const refresh = useCallback(async () => {
    const all = await listGallery();
    setImages(all.filter((i) => i.section === "gallery"));
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const supabase = getSupabase();
    let sort = images.length ? Math.max(...images.map((i) => i.sort_order)) + 1 : 0;
    setUploading(files.length);
    let ok = 0;
    for (const file of Array.from(files)) {
      const { url, error } = await uploadToStorage(file, "gallery");
      if (url) {
        const alt = file.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
        const { error: insErr } = await supabase
          .from("gallery_images")
          .insert({ url, alt, section: "gallery", sort_order: sort++ });
        if (!insErr) ok++;
      } else if (error) {
        showToast(`Hiba: ${error}`);
      }
      setUploading((u) => u - 1);
    }
    if (ok > 0) showToast(`${ok} kép feltöltve ✓`);
    await refresh();
    if (fileRef.current) fileRef.current.value = "";
  };

  const move = async (img: GalleryImage, dir: 1 | -1) => {
    const idx = images.findIndex((i) => i.id === img.id);
    if (!images[idx + dir]) return;
    const supabase = getSupabase();
    const reordered = [...images];
    [reordered[idx], reordered[idx + dir]] = [reordered[idx + dir], reordered[idx]];
    await Promise.all(
      reordered.map((i, n) => supabase.from("gallery_images").update({ sort_order: n }).eq("id", i.id))
    );
    await refresh();
  };

  const setAlt = async (img: GalleryImage, alt: string) => {
    if (alt === img.alt) return;
    await getSupabase().from("gallery_images").update({ alt }).eq("id", img.id);
    setImages((list) => list.map((i) => (i.id === img.id ? { ...i, alt } : i)));
  };

  const remove = async (img: GalleryImage) => {
    if (!window.confirm("Biztosan törlöd ezt a képet?")) return;
    await getSupabase().from("gallery_images").delete().eq("id", img.id);
    await removeFromStorageByUrl(img.url);
    await refresh();
    showToast("Kép törölve");
  };

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-[13.5px] leading-relaxed text-mist">
          Ezek a képek jelennek meg a <span className="text-cream">Galéria oldalon</span> – az{" "}
          <span className="text-cream">első 6 kép a kezdőlap Galéria szekciójában is</span>. A
          sorrendet a nyilakkal állíthatod.
        </p>
        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gold/30 bg-coal-deep/30 px-6 py-10 text-center transition-colors hover:border-gold">
          <IconUpload className="h-7 w-7 text-gold" />
          <span className="font-sans text-[14px] text-cream">Kattints ide a képek feltöltéséhez</span>
          <span className="text-[12px] text-mist/60">Egyszerre több képet is kiválaszthatsz (JPG, PNG, WebP)</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => void onUpload(e.target.files)}
          />
        </label>
        {uploading > 0 && (
          <p className="mt-4 flex items-center gap-2 text-[13.5px] text-gold">
            <Spinner /> Feltöltés folyamatban… (még {uploading} kép)
          </p>
        )}
      </Card>

      {loading ? (
        <div className="flex items-center gap-3 py-10 text-mist">
          <Spinner /> Betöltés…
        </div>
      ) : images.length === 0 ? (
        <p className="py-8 text-center text-[14px] text-mist/60">
          Még nincs kép a galériában – tölts fel párat fentebb!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, idx) => (
            <div key={img.id} className="overflow-hidden rounded-2xl border border-gold/15 bg-surface/60">
              <div className="relative aspect-[4/3] bg-coal-deep">
                <img src={img.url} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-2 top-2 rounded-full bg-coal-deep/80 px-2.5 py-1 font-sans text-[11px] text-cream/85">
                  {idx + 1}.
                </span>
                {idx < 6 && (
                  <span className="absolute right-2 top-2 rounded-full bg-gold/90 px-2.5 py-1 font-sans text-[10.5px] font-semibold text-coal-deep">
                    Kezdőlapon is
                  </span>
                )}
              </div>
              <div className="space-y-3 p-3.5">
                <input
                  defaultValue={img.alt}
                  placeholder="Kép leírása (alt)"
                  onBlur={(e) => void setAlt(img, e.target.value)}
                  className={inputClass}
                />
                <div className="flex gap-1.5">
                  <IconBtn label="Előrébb" onClick={() => void move(img, -1)} disabled={idx === 0}>
                    <IconArrowUp className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn label="Hátrébb" onClick={() => void move(img, 1)} disabled={idx === images.length - 1}>
                    <IconArrowDown className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn label="Törlés" danger onClick={() => void remove(img)}>
                    <IconTrash className="h-4 w-4" />
                  </IconBtn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toast message={toast} />
    </div>
  );
}
