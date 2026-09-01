"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { listGallery, removeFromStorageByUrl, uploadToStorage } from "@/lib/adminApi";
import type { GalleryImage } from "@/lib/content";
import { IconArrowDown, IconArrowUp, IconTrash, IconUpload } from "../icons";
import { Card, IconBtn, Spinner, Toast, inputClass } from "./ui";

const sections: { id: GalleryImage["section"]; label: string; hint: string }[] = [
  {
    id: "hero",
    label: "Kezdőlap kollázs",
    hint: "A kezdőlap tetején lévő képkollázs. Az 1. kép az íves, a 2. a széles helyre kerül, a többi a magas képen váltakozik.",
  },
  {
    id: "home",
    label: "Kezdőlap galéria",
    hint: "A kezdőlapi Galéria szekció rácsa – 6 kép az ideális.",
  },
  {
    id: "gallery",
    label: "Galéria oldal",
    hint: "A teljes galéria oldal képei. Az első képek a menü és galéria oldalak díszítésénél is megjelennek.",
  },
];

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [section, setSection] = useState<GalleryImage["section"]>("gallery");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const refresh = useCallback(async () => {
    setImages(await listGallery());
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const current = images.filter((i) => i.section === section);
  const active = sections.find((s) => s.id === section)!;

  const onUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const supabase = getSupabase();
    let sort = current.length ? Math.max(...current.map((i) => i.sort_order)) + 1 : 0;
    setUploading(files.length);
    let ok = 0;
    for (const file of Array.from(files)) {
      const { url, error } = await uploadToStorage(file, "gallery");
      if (url) {
        const alt = file.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
        const { error: insErr } = await supabase
          .from("gallery_images")
          .insert({ url, alt, section, sort_order: sort++ });
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
    const idx = current.findIndex((i) => i.id === img.id);
    const other = current[idx + dir];
    if (!other) return;
    const supabase = getSupabase();
    // A biztos sorrendhez az indexeket írjuk vissza sort_order-nek
    const reordered = [...current];
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

  const setImgSection = async (img: GalleryImage, target: GalleryImage["section"]) => {
    await getSupabase().from("gallery_images").update({ section: target }).eq("id", img.id);
    await refresh();
    showToast("Kép áthelyezve ✓");
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
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => {
          const count = images.filter((i) => i.section === s.id).length;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={[
                "rounded-full px-4 py-1.5 font-sans text-[13px] font-medium transition-colors",
                section === s.id
                  ? "bg-gold text-coal-deep"
                  : "border border-gold/20 text-cream/80 hover:border-gold hover:text-gold",
              ].join(" ")}
            >
              {s.label} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <Card>
        <p className="text-[13.5px] text-mist">{active.hint}</p>
        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gold/30 bg-coal-deep/30 px-6 py-10 text-center transition-colors hover:border-gold">
          <IconUpload className="h-7 w-7 text-gold" />
          <span className="font-sans text-[14px] text-cream">
            Kattints ide a képek feltöltéséhez
          </span>
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
      ) : current.length === 0 ? (
        <p className="py-8 text-center text-[14px] text-mist/60">
          Ebben a szekcióban még nincs kép – tölts fel párat fentebb!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {current.map((img, idx) => (
            <div key={img.id} className="overflow-hidden rounded-2xl border border-gold/15 bg-surface/60">
              <div className="relative aspect-[4/3] bg-coal-deep">
                <img src={img.url} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-2 top-2 rounded-full bg-coal-deep/80 px-2.5 py-1 font-sans text-[11px] text-cream/85">
                  {idx + 1}.
                </span>
              </div>
              <div className="space-y-3 p-3.5">
                <input
                  defaultValue={img.alt}
                  placeholder="Kép leírása (alt)"
                  onBlur={(e) => void setAlt(img, e.target.value)}
                  className={inputClass}
                />
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1.5">
                    <IconBtn label="Előrébb" onClick={() => void move(img, -1)} disabled={idx === 0}>
                      <IconArrowUp className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn
                      label="Hátrébb"
                      onClick={() => void move(img, 1)}
                      disabled={idx === current.length - 1}
                    >
                      <IconArrowDown className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label="Törlés" danger onClick={() => void remove(img)}>
                      <IconTrash className="h-4 w-4" />
                    </IconBtn>
                  </div>
                  <select
                    value={img.section}
                    onChange={(e) => void setImgSection(img, e.target.value as GalleryImage["section"])}
                    className="rounded-lg border border-gold/20 bg-coal-deep/60 px-2 py-1.5 font-sans text-[12px] text-cream/85 outline-none focus:border-gold"
                  >
                    {sections.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
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
