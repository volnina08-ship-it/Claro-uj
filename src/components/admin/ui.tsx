"use client";

import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "motion/react";

export const inputClass =
  "w-full rounded-xl border border-gold/20 bg-coal-deep/60 px-3.5 py-2.5 font-sans text-[14px] text-cream placeholder:text-mist/40 outline-none transition-colors focus:border-gold";

export function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-mist/70">
        {label}
      </span>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-[70px] resize-y ${props.className ?? ""}`} />;
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full bg-red-btn px-6 py-2.5 font-sans text-[14px] font-medium text-cream-bright shadow-[0_6px_20px_rgba(174,46,42,0.35)] transition-all hover:bg-red-deep disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 px-4 py-2 font-sans text-[13px] text-cream/85 transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function IconBtn({
  children,
  onClick,
  label,
  danger = false,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  label: string;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={[
        "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors disabled:opacity-35",
        danger
          ? "border-red-btn/40 text-red-btn hover:border-red-btn hover:bg-red-btn/10"
          : "border-gold/20 text-cream/75 hover:border-gold hover:text-gold",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-gold/15 bg-surface/60 p-5 md:p-6 ${className}`}>{children}</div>
  );
}

export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 right-6 z-[110] rounded-full bg-cream-bright px-5 py-2.5 font-sans text-[14px] font-medium text-ink shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
  );
}
