"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import { SunMark } from "@/components/Logo";
import { Field, PrimaryButton, Spinner, TextInput } from "@/components/admin/ui";

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // A visszaállító link tokenjét a kliens automatikusan feldolgozza
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setReady(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (pw1.length < 8) {
      setError("A jelszó legalább 8 karakter legyen.");
      return;
    }
    if (pw1 !== pw2) {
      setError("A két jelszó nem egyezik.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await getSupabase().auth.updateUser({ password: pw1 });
    setBusy(false);
    if (error) setError(`Nem sikerült a mentés: ${error.message}`);
    else setDone(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <SunMark className="h-12 w-12 text-gold" />
          <h1 className="font-fraunces text-[28px] font-semibold text-cream">Új jelszó beállítása</h1>
        </div>

        {done ? (
          <div className="rounded-3xl border border-gold/15 bg-surface/60 p-7 text-center">
            <p className="text-[15px] text-cream">A jelszavad frissítve ✓</p>
            <Link
              href="/admin"
              className="mt-5 inline-block rounded-full bg-red-btn px-6 py-2.5 font-sans text-[14px] font-medium text-cream-bright transition-colors hover:bg-red-deep"
            >
              Tovább az adminra
            </Link>
          </div>
        ) : !ready ? (
          <div className="rounded-3xl border border-gold/15 bg-surface/60 p-7 text-center text-[14px] text-mist">
            Ez az oldal a jelszó-visszaállító emailben kapott linkről működik. Ha a link lejárt, kérj
            újat az <Link href="/admin" className="text-gold underline underline-offset-4">admin belépésnél</Link>.
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5 rounded-3xl border border-gold/15 bg-surface/60 p-7">
            <Field label="Új jelszó">
              <TextInput
                type="password"
                autoComplete="new-password"
                value={pw1}
                onChange={(e) => setPw1(e.target.value)}
                required
              />
            </Field>
            <Field label="Új jelszó még egyszer">
              <TextInput
                type="password"
                autoComplete="new-password"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                required
              />
            </Field>
            {error && <p className="text-[13px] text-red-btn">{error}</p>}
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? <Spinner /> : null} Jelszó mentése
            </PrimaryButton>
          </form>
        )}
      </div>
    </div>
  );
}
