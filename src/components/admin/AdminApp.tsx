"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";
import { SunMark } from "../Logo";
import { IconLogout } from "../icons";
import { GhostButton, Spinner } from "./ui";
import LoginForm from "./LoginForm";
import DailyMenuManager from "./DailyMenuManager";
import GalleryManager from "./GalleryManager";

type Status = "loading" | "signedout" | "unauthorized" | "ready";
type Tab = "daily" | "gallery";

const tabs: { id: Tab; label: string }[] = [
  { id: "daily", label: "Heti menü" },
  { id: "gallery", label: "Galéria" },
];

export default function AdminApp() {
  const [status, setStatus] = useState<Status>("loading");
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState<Tab>("daily");

  useEffect(() => {
    const supabase = getSupabase();

    const check = async (s: Session | null) => {
      setSession(s);
      if (!s) {
        setStatus("signedout");
        return;
      }
      // Az RLS csak adminnak ad vissza sort az admins táblából
      const { data } = await supabase.from("admins").select("email").limit(1);
      setStatus(data && data.length > 0 ? "ready" : "unauthorized");
    };

    supabase.auth.getSession().then(({ data }) => check(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      void check(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await getSupabase().auth.signOut();
    setStatus("signedout");
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3 text-mist">
        <Spinner /> Betöltés…
      </div>
    );
  }

  if (status === "signedout") return <LoginForm />;

  if (status === "unauthorized") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <SunMark className="h-12 w-12 text-gold/60" />
        <h1 className="font-fraunces text-[26px] text-cream">Nincs admin jogosultság</h1>
        <p className="max-w-[420px] text-[14px] text-mist">
          A(z) <span className="text-cream">{session?.user.email}</span> fiók be van jelentkezve, de nem
          szerepel az adminok között.
        </p>
        <GhostButton onClick={signOut}>Kijelentkezés</GhostButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Fejléc */}
      <header className="sticky top-0 z-40 border-b border-gold/10 bg-coal/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
          <div className="flex items-center gap-3 text-cream">
            <SunMark className="h-8 w-8 text-gold" />
            <div className="leading-tight">
              <p className="font-fraunces text-[19px] font-semibold">Claro Admin</p>
              <p className="text-[11.5px] text-mist/70">{session?.user.email}</p>
            </div>
          </div>
          <nav className="order-3 flex w-full flex-wrap gap-2 sm:order-none sm:w-auto sm:flex-1 sm:justify-center">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={[
                  "rounded-full px-4 py-1.5 font-sans text-[13px] font-medium transition-colors",
                  tab === t.id
                    ? "bg-red-btn text-cream-bright"
                    : "border border-gold/20 text-cream/80 hover:border-gold hover:text-gold",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={signOut}
            className="ml-auto flex items-center gap-2 rounded-full border border-gold/20 px-4 py-1.5 font-sans text-[13px] text-cream/80 transition-colors hover:border-gold hover:text-gold sm:ml-0"
          >
            <IconLogout className="h-4 w-4" /> Kilépés
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1240px] px-5 pt-8">
        <p className="mb-6 rounded-xl border border-gold/15 bg-surface/40 px-4 py-3 text-[13px] text-mist">
          A mentett módosítások kb. <span className="text-cream">1 percen belül</span> jelennek meg a
          publikus oldalon.
        </p>
        {tab === "daily" && <DailyMenuManager />}
        {tab === "gallery" && <GalleryManager />}
      </div>
    </div>
  );
}
