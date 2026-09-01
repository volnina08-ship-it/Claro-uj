"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { listMenuImages, removeFromStorageByUrl, uploadToStorage } from "@/lib/adminApi";
import type { MenuImage } from "@/lib/content";
import { IconUpload } from "../icons";
import { Card, Spinner, Toast } from "./ui";

/* A heti (napi) menü képének cseréje – ez jelenik meg a Menü oldal
   "Napi menü" szekciójában. */
export default function DailyMenuManager() {
  const [current, setCurrent] = useState<MenuImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const refresh = useCallback(async () => {
    const all = await listMenuImages();
    const daily = all.filter((m) => m.category === "daily");
    setCurrent(daily[0] ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    const supabase = getSupabase();

    const { url, error } = await uploadToStorage(file, "daily");
    if (!url) {
      setBusy(false);
      showToast(`Hiba a feltöltésnél: ${error ?? "ismeretlen hiba"}`);
      return;
    }

    // A korábbi heti menü képek törlése, hogy mindig csak egy legyen
    const all = await listMenuImages();
    for (const old of all.filter((m) => m.category === "daily")) {
      await supabase.from("menu_images").delete().eq("id", old.id);
      await removeFromStorageByUrl(old.url);
    }

    const { error: insErr } = await supabase
      .from("menu_images")
      .insert({ url, title: "Napi menü", category: "daily", sort_order: 0 });

    setBusy(false);
    if (insErr) showToast(`Hiba a mentésnél: ${insErr.message}`);
    else showToast("Heti menü kép frissítve ✓");
    await refresh();
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <p className="text-[13.5px] leading-relaxed text-mist">
            Ez a kép jelenik meg a <span className="text-cream">Menü oldal „Napi menü”</span>{" "}
            szekciójában. Tölts fel egy új képet (pl. a heti menü kártya fotóját vagy grafikáját), és
            az kb. 1 percen belül lecseréli a jelenlegit a publikus oldalon.
          </p>
          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gold/30 bg-coal-deep/30 px-6 py-12 text-center transition-colors hover:border-gold">
            <IconUpload className="h-7 w-7 text-gold" />
            <span className="font-sans text-[14px] text-cream">
              Kattints ide az új heti menü kép feltöltéséhez
            </span>
            <span className="text-[12px] text-mist/60">JPG, PNG vagy WebP – álló formátum ajánlott</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => void onUpload(e.target.files)}
            />
          </label>
          {busy && (
            <p className="mt-4 flex items-center gap-2 text-[13.5px] text-gold">
              <Spinner /> Feltöltés folyamatban…
            </p>
          )}
        </Card>
      </div>

      <div>
        <p className="mb-3 font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-mist/70">
          Jelenlegi heti menü
        </p>
        {loading ? (
          <div className="flex items-center gap-3 py-10 text-mist">
            <Spinner /> Betöltés…
          </div>
        ) : (
          <div className="max-w-[420px] overflow-hidden rounded-2xl border border-gold/20 bg-coal-deep/40">
            <img
              src={current?.url ?? "/images/napi-menu.avif"}
              alt="Napi menü"
              className="h-auto w-full"
            />
          </div>
        )}
        {!current && !loading && (
          <p className="mt-3 max-w-[420px] text-[12.5px] text-mist/60">
            Jelenleg az oldalba épített alap kép él – az első feltöltéssel ezt cseréled le.
          </p>
        )}
      </div>

      <Toast message={toast} />
    </div>
  );
}
