"use client";

import { useEffect, useState } from "react";
import { DEFAULT_WEEKLY_MENU, type WeeklyMenu } from "@/lib/content";
import { fetchContent, saveContent } from "@/lib/adminApi";
import WeeklyMenuCard from "../WeeklyMenuCard";
import { IconArrowDown, IconArrowUp, IconPlus, IconTrash } from "../icons";
import { Card, Field, GhostButton, IconBtn, PrimaryButton, Spinner, TextArea, TextInput, Toast } from "./ui";

export default function WeeklyMenuEditor() {
  const [draft, setDraft] = useState<WeeklyMenu | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetchContent<WeeklyMenu>("weekly_menu").then((data) =>
      setDraft(data && Array.isArray(data.days) ? { ...DEFAULT_WEEKLY_MENU, ...data } : DEFAULT_WEEKLY_MENU)
    );
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    const err = await saveContent("weekly_menu", draft);
    setBusy(false);
    showToast(err ? `Hiba: ${err}` : "Heti menü elmentve ✓");
  };

  if (!draft) {
    return (
      <div className="flex items-center gap-3 py-16 text-mist">
        <Spinner /> Betöltés…
      </div>
    );
  }

  const setDay = (i: number, patch: Partial<WeeklyMenu["days"][number]>) => {
    const days = draft.days.map((d, j) => (i === j ? { ...d, ...patch } : d));
    setDraft({ ...draft, days });
  };

  const moveDay = (i: number, dir: 1 | -1) => {
    const j = i + dir;
    if (j < 0 || j >= draft.days.length) return;
    const days = [...draft.days];
    [days[i], days[j]] = [days[j], days[i]];
    setDraft({ ...draft, days });
  };

  const setPrice = (i: number, patch: Partial<WeeklyMenu["prices"][number]>) => {
    const prices = draft.prices.map((p, j) => (i === j ? { ...p, ...patch } : p));
    setDraft({ ...draft, prices });
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <Card>
          <h2 className="mb-5 font-fraunces text-[22px] font-semibold text-cream">Napok</h2>
          <div className="space-y-4">
            {draft.days.map((d, i) => (
              <div key={i} className="rounded-xl border border-gold/10 bg-coal-deep/40 p-4">
                <div className="flex flex-wrap items-end gap-3">
                  <Field label="Nap" className="w-32 shrink-0">
                    <TextInput value={d.day} onChange={(e) => setDay(i, { day: e.target.value })} />
                  </Field>
                  <Field label="Leves" className="min-w-[180px] flex-1">
                    <TextInput value={d.soup} onChange={(e) => setDay(i, { soup: e.target.value })} />
                  </Field>
                  <Field label="Főétel" className="min-w-[180px] flex-1">
                    <TextInput value={d.main} onChange={(e) => setDay(i, { main: e.target.value })} />
                  </Field>
                  <div className="flex gap-1.5 pb-0.5">
                    <IconBtn label="Fel" onClick={() => moveDay(i, -1)} disabled={i === 0}>
                      <IconArrowUp className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label="Le" onClick={() => moveDay(i, 1)} disabled={i === draft.days.length - 1}>
                      <IconArrowDown className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn
                      label="Nap törlése"
                      danger
                      onClick={() => setDraft({ ...draft, days: draft.days.filter((_, j) => j !== i) })}
                    >
                      <IconTrash className="h-4 w-4" />
                    </IconBtn>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <GhostButton
              onClick={() =>
                setDraft({ ...draft, days: [...draft.days, { day: "Új nap", soup: "", main: "" }] })
              }
            >
              <IconPlus className="h-4 w-4" /> Nap hozzáadása
            </GhostButton>
          </div>
        </Card>

        <Card>
          <h2 className="mb-5 font-fraunces text-[22px] font-semibold text-cream">Szövegek</h2>
          <div className="space-y-4">
            <Field label="Állandó ajánlat">
              <TextArea
                value={draft.constant_offer}
                onChange={(e) => setDraft({ ...draft, constant_offer: e.target.value })}
              />
            </Field>
            <Field label="Extra sor (pl. kenyér / szósz)">
              <TextInput
                value={draft.extra_note}
                onChange={(e) => setDraft({ ...draft, extra_note: e.target.value })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Elérhetőség (mikor kapható)">
                <TextInput
                  value={draft.availability}
                  onChange={(e) => setDraft({ ...draft, availability: e.target.value })}
                />
              </Field>
              <Field label="Kiemelés (pl. ELVITELRE IS!)">
                <TextInput
                  value={draft.takeaway}
                  onChange={(e) => setDraft({ ...draft, takeaway: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Lábjegyzet">
              <TextInput
                value={draft.footnote}
                onChange={(e) => setDraft({ ...draft, footnote: e.target.value })}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="mb-5 font-fraunces text-[22px] font-semibold text-cream">Árak</h2>
          <div className="space-y-3">
            {draft.prices.map((p, i) => (
              <div key={i} className="flex items-end gap-3">
                <Field label="Megnevezés" className="flex-1">
                  <TextInput value={p.label} onChange={(e) => setPrice(i, { label: e.target.value })} />
                </Field>
                <Field label="Ár" className="w-36">
                  <TextInput value={p.price} onChange={(e) => setPrice(i, { price: e.target.value })} />
                </Field>
                <div className="pb-0.5">
                  <IconBtn
                    label="Ár törlése"
                    danger
                    onClick={() => setDraft({ ...draft, prices: draft.prices.filter((_, j) => j !== i) })}
                  >
                    <IconTrash className="h-4 w-4" />
                  </IconBtn>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <GhostButton
              onClick={() => setDraft({ ...draft, prices: [...draft.prices, { label: "", price: "" }] })}
            >
              <IconPlus className="h-4 w-4" /> Ársor hozzáadása
            </GhostButton>
          </div>
        </Card>

        <div className="sticky bottom-5 z-30">
          <PrimaryButton onClick={save} disabled={busy}>
            {busy ? <Spinner /> : null} Heti menü mentése
          </PrimaryButton>
        </div>
      </div>

      {/* Élő előnézet */}
      <div>
        <p className="mb-3 font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-mist/70">
          Élő előnézet
        </p>
        <div className="xl:sticky xl:top-24">
          <WeeklyMenuCard data={draft} compact />
        </div>
      </div>

      <Toast message={toast} />
    </div>
  );
}
