"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, X } from "lucide-react";
import { login } from "@/services/auth.service";

const DASHBOARD_URL = "https://phause-sumit.vercel.app/auth/sso";
type Props = { open: boolean; onClose: () => void };

function extractAuthToken(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const directToken = record.token ?? record.accessToken ?? record.access_token ?? record.jwt ?? record.bearerToken;

  if (typeof directToken === "string" && directToken.trim()) return directToken;

  for (const key of ["data", "result", "user", "auth", "session", "tokens"] ) {
    const nestedToken = extractAuthToken(record[key]);
    if (nestedToken) return nestedToken;
  }
  return null;
}

function extractRefreshToken(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const directToken = record.refreshToken ?? record.refresh_token;

  if (typeof directToken === "string" && directToken.trim()) return directToken;

  for (const key of ["data", "result", "auth", "session", "tokens"]) {
    const nestedToken = extractRefreshToken(record[key]);
    if (nestedToken) return nestedToken;
  }
  return null;
}

export default function LoginModal({ open, onClose }: Props) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape" && !submittingRef.current) onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    const timer = window.setTimeout(() => dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus(), 180);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKeyDown); window.clearTimeout(timer); };
  }, [open, onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    const nextErrors: { email?: string; password?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length) return;

    submittingRef.current = true;
    setSubmitting(true);
    try {
      const result = await login({ email: email.trim(), password });
      const token = extractAuthToken(result);
      if (!token) throw new Error("Login succeeded, but no authentication token was returned. Please try again.");
      const refreshToken = extractRefreshToken(result);
      const dashboardUrl = new URL(DASHBOARD_URL);
      const handoff = new URLSearchParams({ access_token: token });
      if (refreshToken) handoff.set("refresh_token", refreshToken);
      dashboardUrl.hash = handoff.toString();
      window.location.assign(dashboardUrl.toString());
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) => `h-12 w-full rounded-xl border bg-white/[0.035] pl-11 pr-11 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:bg-white/[0.055] focus:ring-2 focus:ring-phause-cyan/10 ${hasError ? "border-red-400/60" : "border-white/[0.09] focus:border-phause-cyan/60"}`;

  return (
    <AnimatePresence>{open && (
      <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#02070c]/80 px-4 py-6 backdrop-blur-md sm:px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget && !submittingRef.current) onClose(); }} role="presentation">
        <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="login-modal-title" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }} transition={{ duration: reduceMotion ? 0.1 : 0.36, ease: [0.22, 1, 0.36, 1] }} className="relative my-auto w-full max-w-[430px] overflow-hidden rounded-[26px] border border-white/[0.1] bg-[#091720]/95 px-5 py-7 shadow-[0_32px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-8 sm:py-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-phause-cyan/70 to-transparent" />
          <button type="button" onClick={onClose} disabled={submitting} aria-label="Close login" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-slate-400 transition-all hover:rotate-90 hover:border-phause-cyan/30 hover:text-white disabled:opacity-50"><X className="h-4 w-4" /></button>
          <div className="pr-10"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-phause-cyan/20 bg-phause-cyan/[0.08] text-phause-cyan"><LockKeyhole className="h-5 w-5" /></div><h2 id="login-modal-title" className="text-2xl font-bold text-white">Welcome back</h2><p className="mt-2 text-sm leading-6 text-slate-400">Sign in to continue to your Phause account.</p></div>
          <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
            <div><label htmlFor="login-email" className="mb-2 block text-xs font-semibold text-slate-300">Email <span className="text-phause-cyan">*</span></label><div className="relative"><Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input id="login-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setErrors((current) => ({ ...current, email: undefined })); setServerError(""); }} placeholder="you@company.com" className={inputClass(Boolean(errors.email))} disabled={submitting} /></div><AnimatePresence>{errors.email && <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-400">{errors.email}</motion.p>}</AnimatePresence></div>
            <div><label htmlFor="login-password" className="mb-2 block text-xs font-semibold text-slate-300">Password <span className="text-phause-cyan">*</span></label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: undefined })); setServerError(""); }} placeholder="Enter your password" className={inputClass(Boolean(errors.password))} disabled={submitting} /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 transition-colors hover:text-white" disabled={submitting}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div><AnimatePresence>{errors.password && <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-400">{errors.password}</motion.p>}</AnimatePresence></div>
            <AnimatePresence>{serverError && <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="rounded-xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3 text-xs leading-5 text-red-300">{serverError}</motion.div>}</AnimatePresence>
            <motion.button whileHover={submitting ? undefined : { y: -2 }} whileTap={submitting ? undefined : { scale: 0.98 }} type="submit" disabled={submitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-phause-cyan to-phause-teal text-sm font-bold text-phause-dark shadow-[0_12px_35px_rgba(0,216,201,0.16)] transition-shadow hover:shadow-[0_16px_40px_rgba(0,216,201,0.28)] disabled:cursor-not-allowed disabled:opacity-70">{submitting ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Signing in...</> : <>Sign in <ArrowRight className="h-4 w-4" /></>}</motion.button>
          </form>
        </motion.div>
      </motion.div>
    )}</AnimatePresence>
  );
}
