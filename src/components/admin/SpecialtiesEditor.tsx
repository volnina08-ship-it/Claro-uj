"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SPECIALTIES, type Specialties, type SpecialtyItem } from "@/lib/content";
import { fetchContent, saveContent } from "@/lib/adminApi";
import SpecialtiesCard from "../SpecialtiesCard";
import { IconArrowDown, IconArrowUp, IconPlus, IconTrash } from "../icons";
import { Card, Field, GhostButton, IconBtn, PrimaryButton, Spinner, TextInput, Toast } from "./ui";

const emptyItem: SpecialtyItem = { name_hu: "", name_en: "", price: "", note_hu: "", note_en: "" };

export default function SpecialtiesEditor() {
  const [draft, setDraft] = useState<Specialties | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetchContent<Specialties>("specialties").then((data) =>
      setDraft(data && Array.isArray(data.sections) ? { ...DEFAULT_SPECIALTIES, ...data } : DEFAULT_SPECIALTIES)
    );
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    const err = await saveContent("specialties", draft);
    setBusy(false);
    showToast(err ? `Hiba: ${err}` : "Magyaros ajánlat elmentve ✓");
  };

  if (!draft) {
    return (
      <div className="flex items-center gap-3 py-16 text-mist">
        <Spinner /> Betöltés…
      </div>
    );
  }

  const setSection = (si: number, patch: Partial<Specialties["sections"][number]>) => {
    const sections = draft.sections.map((s, j) => (si === j ? { ...s, ...patch } : s));
    setDraft({ ...draft, sections });
  };

  const setItem = (si: number, ii: number, patch: Partial<SpecialtyItem>) => {
    const items = draft.sections[si].items.map((it, j) => (ii === j ? { ...it, ...patch } : it));
    setSection(si, { items });
  };

  const moveSection = (si: number, dir: 1 | -1) => {
    const j = si + dir;
    if (j < 0 || j >= draft.sections.length) return;
    const sections = [...draft.sections];
    [sections[si], sections[j]] = [sections[j], sections[si]];
    setDraft({ ...draft, sections });
  };

  const moveItem = (si: number, ii: number, dir: 1 | -1) => {
    const j = ii + dir;
    const items = [...draft.sections[si].items];
    if (j < 0 || j >= items.length) return;
    [items[ii], items[j]] = [items[j], items[ii]];
    setSection(si, { items });
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="mb-5 font-fraunces text-[22px] font-semibold text-cream">Kártya címe</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cím (magyar)">
            <TextInput value={draft.title_hu} onChange={(e) => setDraft({ ...draft, title_hu: e.target.value })} />
          </Field>
          <Field label="Cím (angol)">
            <TextInput value={draft.title_en} onChange={(e) => setDraft({ ...draft, title_en: e.target.value })} />
          </Field>
        </div>
      </Card>

      {draft.sections.map((s, si) => (
        <Card key={si}>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <Field label="Kategória (magyar)">
                <TextInput value={s.name_hu} onChange={(e) => setSection(si, { name_hu: e.target.value })} />
              </Field>
              <Field label="Kategória (angol)">
                <TextInput value={s.name_en} onChange={(e) => setSection(si, { name_en: e.target.value })} />
              </Field>
            </div>
            <div className="flex gap-1.5 pb-0.5">
              <IconBtn label="Fel" onClick={() => moveSection(si, -1)} disabled={si === 0}>
                <IconArrowUp className="h-4 w-4" />
              </IconBtn>
              <IconBtn label="Le" onClick={() => moveSection(si, 1)} disabled={si === draft.sections.length - 1}>
                <IconArrowDown className="h-4 w-4" />
              </IconBtn>
              <IconBtn
                label="Kategória törlése"
                danger
                onClick={() => setDraft({ ...draft, sections: draft.sections.filter((_, j) => j !== si) })}
              >
                <IconTrash className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>

          <div className="space-y-4">
            {s.items.map((it, ii) => (
              <div key={ii} className="rounded-xl border border-gold/10 bg-coal-deep/40 p-4">
                <div className="grid gap-3 lg:grid-cols-[1fr_1fr_120px_auto]">
                  <Field label="Étel neve (magyar)">
                    <TextInput value={it.name_hu} onChange={(e) => setItem(si, ii, { name_hu: e.target.value })} />
                  </Field>
                  <Field label="Étel neve (angol)">
                    <TextInput value={it.name_en} onChange={(e) => setItem(si, ii, { name_en: e.target.value })} />
                  </Field>
                  <Field label="Ár">
                    <TextInput value={it.price} onChange={(e) => setItem(si, ii, { price: e.target.value })} />
                  </Field>
                  <div className="flex items-end gap-1.5 pb-0.5">
                    <IconBtn label="Fel" onClick={() => moveItem(si, ii, -1)} disabled={ii === 0}>
                      <IconArrowUp className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label="Le" onClick={() => moveItem(si, ii, 1)} disabled={ii === s.items.length - 1}>
                      <IconArrowDown className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn
                      label="Étel törlése"
                      danger
                      onClick={() => setSection(si, { items: s.items.filter((_, j) => j !== ii) })}
                    >
                      <IconTrash className="h-4 w-4" />
                    </IconBtn>
                  </div>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Field label="Megjegyzés (magyar, pl. kis adag)">
                    <TextInput value={it.note_hu} onChange={(e) => setItem(si, ii, { note_hu: e.target.value })} />
                  </Field>
                  <Field label="Megjegyzés (angol)">
                    <TextInput value={it.note_en} onChange={(e) => setItem(si, ii, { note_en: e.target.value })} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <GhostButton onClick={() => setSection(si, { items: [...s.items, { ...emptyItem }] })}>
              <IconPlus className="h-4 w-4" /> Étel hozzáadása
            </GhostButton>
          </div>
        </Card>
      ))}

      <div className="flex flex-wrap items-center gap-4">
        <GhostButton
          onClick={() =>
            setDraft({
              ...draft,
              sections: [...draft.sections, { name_hu: "Új kategória", name_en: "", items: [{ ...emptyItem }] }],
            })
          }
        >
          <IconPlus className="h-4 w-4" /> Kategória hozzáadása
        </GhostButton>
        <PrimaryButton onClick={save} disabled={busy}>
          {busy ? <Spinner /> : null} Magyaros ajánlat mentése
        </PrimaryButton>
      </div>

      <div>
        <p className="mb-3 font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-mist/70">
          Élő előnézet
        </p>
        <SpecialtiesCard data={draft} />
      </div>

      <Toast message={toast} />
    </div>
  );
}
