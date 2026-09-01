"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { getSupabase } from "@/lib/supabase";
import { SunMark } from "../Logo";
import { Field, PrimaryButton, Spinner, TextInput } from "./ui";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    const { error } = await getSupabase().auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Hibás email cím vagy jelszó."
          : `Sikertelen bejelentkezés: ${error.message}`
      );
    }
  };

  const forgot = async () => {
    if (!email) {
      setError("Add meg az email címed, és újra kattints az elfelejtett jelszóra.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await getSupabase().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset`,
    });
    setBusy(false);
    if (error) setError(`Nem sikerült az email küldése: ${error.message}`);
    else setInfo("Jelszó-visszaállító emailt küldtünk. Nézd meg a postafiókod (spam mappát is)!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="w-full max-w-[400px]"
      >
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <SunMark className="h-12 w-12 text-gold" />
          <h1 className="font-fraunces text-[30px] font-semibold text-cream">Claro Admin</h1>
          <p className="text-[13.5px] text-mist">Jelentkezz be a tartalom szerkesztéséhez</p>
        </div>

        <form
          onSubmit={signIn}
          className="space-y-5 rounded-3xl border border-gold/15 bg-surface/60 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
        >
          <Field label="Email">
            <TextInput
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="te@email.hu"
              required
            />
          </Field>
          <Field label="Jelszó">
            <TextInput
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>

          {error && <p className="text-[13px] text-red-btn">{error}</p>}
          {info && <p className="text-[13px] text-gold">{info}</p>}

          <div className="flex items-center justify-between gap-4 pt-1">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? <Spinner /> : null} Bejelentkezés
            </PrimaryButton>
            <button
              type="button"
              onClick={forgot}
              disabled={busy}
              className="text-[12.5px] text-mist underline underline-offset-4 transition-colors hover:text-gold"
            >
              Elfelejtett jelszó?
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
