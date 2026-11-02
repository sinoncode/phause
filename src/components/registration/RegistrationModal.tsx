"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, AtSign, Building2, Check, ChevronDown, Eye, EyeOff, Globe2, LoaderCircle, LockKeyhole, ShieldCheck, UserRound, X } from "lucide-react";
import { createOrganization } from "@/services/organization.service";
import { registrationStore } from "@/store/registration.store";

const regions = ["North America", "South America", "Europe", "Asia Pacific", "Middle East", "Africa", "Other"];

type Props = { open: boolean; onClose: () => void };
const initialForm = { fullName: "", organisationName: "", email: "", password: "", region: "", termsAccepted: false };
type FormState = typeof initialForm;
type Field = keyof FormState;
type Errors = Partial<Record<Field, string>>;

export default function RegistrationModal({ open, onClose }: Props) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    const timer = window.setTimeout(() => dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus(), 180);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  const updateField = <K extends Field>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Errors = {};
    if (form.fullName.trim().length < 2) nextErrors.fullName = "Enter your full name.";
    if (!form.organisationName.trim()) nextErrors.organisationName = "Enter your organisation name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter a valid work email.";
    if (!form.password || form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) nextErrors.password = "Use 8+ characters with upper, lower, number and symbol.";
    if (!form.region) nextErrors.region = "Select your region.";
    if (!form.termsAccepted) nextErrors.termsAccepted = "Please accept the terms to continue.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setServerError("");
    try {
      const regionCodes: Record<string, string> = { "North America": "US", "South America": "BR", Europe: "DE", "Asia Pacific": "IN", "Middle East": "AE", Africa: "ZA", Other: "XX" };
      const emailDomain = form.email.trim().split("@")[1]?.toLowerCase();
      await createOrganization({ name: form.organisationName.trim(), verifiedEmailDomains: emailDomain ? [emailDomain] : [], region: regionCodes[form.region] ?? "XX", disclaimerEnabled: true, eventRetentionMonths: 12 });
      registrationStore.save({ fullName: form.fullName.trim(), organisationName: form.organisationName.trim(), email: form.email.trim(), region: form.region });
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  const passwordScore = [form.password.length >= 8, /[A-Z]/.test(form.password), /[a-z]/.test(form.password), /[0-9]/.test(form.password), /[^A-Za-z0-9]/.test(form.password)].filter(Boolean).length;
  const inputClass = (field: Field) => `h-12 w-full rounded-xl border bg-white/[0.035] px-11 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:bg-white/[0.055] focus:ring-2 focus:ring-phause-cyan/10 ${errors[field] ? "border-red-400/60" : "border-white/[0.09] focus:border-phause-cyan/60"}`;

  const renderField = (name: Field, label: string, placeholder: string, icon: React.ReactNode, type = "text") => (
    <div>
      <label htmlFor={`modal-${name}`} className="mb-2 block text-xs font-semibold text-slate-300">{label} <span className="text-phause-cyan">*</span></label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span>
        <input id={`modal-${name}`} name={name} type={type} value={String(form[name])} onChange={(event) => updateField(name, event.target.value)} placeholder={placeholder} autoComplete={name === "email" ? "email" : name === "fullName" ? "name" : name === "organisationName" ? "organization" : "new-password"} className={inputClass(name)} />
      </div>
      <AnimatePresence>{errors[name] && <motion.p initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-400">{errors[name]}</motion.p>}</AnimatePresence>
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#02070c]/80 px-4 py-6 backdrop-blur-md sm:px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} role="presentation">
          <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="registration-modal-title" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }} transition={{ duration: reduceMotion ? 0.1 : 0.38, ease: [0.22, 1, 0.36, 1] }} className="relative my-auto w-full max-w-[660px] overflow-hidden rounded-[26px] border border-white/[0.1] bg-[#091720]/95 shadow-[0_32px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-phause-cyan/70 to-transparent" />
            <button type="button" onClick={onClose} aria-label="Close registration" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-slate-400 transition-all hover:rotate-90 hover:border-phause-cyan/30 hover:text-white"><X className="h-4 w-4" /></button>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[520px] flex-col items-center justify-center px-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="flex h-20 w-20 items-center justify-center rounded-full border border-phause-cyan/30 bg-phause-cyan/10 text-phause-cyan shadow-[0_0_50px_rgba(0,216,201,0.18)]"><Check className="h-9 w-9" /></motion.div>
                  <h2 className="mt-7 text-3xl font-bold">Welcome to Phause!</h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">Your account has been created and your workspace is ready.</p>
                  <button type="button" onClick={onClose} className="mt-7 rounded-xl bg-phause-cyan px-7 py-3 text-sm font-bold text-phause-dark">Continue</button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-h-[calc(100vh-3rem)] overflow-y-auto p-6 sm:p-8 md:p-9">
                  <div className="mb-7 pr-10">
                    <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-phause-cyan"><ShieldCheck className="h-4 w-4" /> Secure registration</div>
                    <h2 id="registration-modal-title" className="text-2xl font-black tracking-tight sm:text-3xl">Create your account</h2>
                    <p className="mt-2 text-sm text-slate-400">A few details and your Phause workspace is ready.</p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {renderField("fullName", "Full name", "Your full name", <UserRound className="h-[18px] w-[18px]" />)}
                      {renderField("organisationName", "Organisation", "Organisation name", <Building2 className="h-[18px] w-[18px]" />)}
                    </div>
                    {renderField("email", "Work email", "you@company.com", <AtSign className="h-[18px] w-[18px]" />, "email")}

                    <div>
                      <label htmlFor="modal-password" className="mb-2 block text-xs font-semibold text-slate-300">Password <span className="text-phause-cyan">*</span></label>
                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
                        <input id="modal-password" type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => updateField("password", event.target.value)} placeholder="Create a strong password" autoComplete="new-password" className={`${inputClass("password")} pr-12`} />
                        <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-phause-cyan">{showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}</button>
                      </div>
                      {form.password && <div className="mt-2.5 flex gap-1.5">{[0, 1, 2, 3, 4].map((segment) => <motion.span key={segment} animate={{ opacity: segment < passwordScore ? 1 : 0.18 }} className="h-1 flex-1 rounded-full bg-phause-cyan" />)}</div>}
                      {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
                    </div>

                    <div>
                      <label htmlFor="modal-region" className="mb-2 block text-xs font-semibold text-slate-300">Region <span className="text-phause-cyan">*</span></label>
                      <div className="relative">
                        <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
                        <select id="modal-region" value={form.region} onChange={(event) => updateField("region", event.target.value)} className={`${inputClass("region")} appearance-none pr-11 ${!form.region ? "text-slate-500" : ""}`}><option value="" disabled className="bg-[#091720]">Select your region</option>{regions.map((region) => <option key={region} className="bg-[#091720]">{region}</option>)}</select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      </div>
                      {errors.region && <p className="mt-1.5 text-xs text-red-400">{errors.region}</p>}
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 pt-1">
                      <input type="checkbox" checked={form.termsAccepted} onChange={(event) => updateField("termsAccepted", event.target.checked)} className="peer sr-only" />
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-phause-cyan/50 ${form.termsAccepted ? "border-phause-cyan bg-phause-cyan text-phause-dark" : "border-slate-600 bg-white/[0.03]"}`}>{form.termsAccepted && <Check className="h-3.5 w-3.5 stroke-[3]" />}</span>
                      <span className="text-xs leading-5 text-slate-400">I agree to the <a href="/terms" className="font-semibold text-phause-cyan">Terms &amp; Conditions</a> and <a href="/privacy" className="font-semibold text-phause-cyan">Privacy Policy</a>.</span>
                    </label>
                    {errors.termsAccepted && <p className="text-xs text-red-400">{errors.termsAccepted}</p>}
                    {serverError && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs text-red-300">{serverError}</p>}

                    <motion.button type="submit" disabled={status === "submitting"} whileTap={{ scale: 0.985 }} className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-phause-cyan to-phause-teal font-bold text-phause-dark shadow-[0_12px_35px_rgba(0,216,201,0.16)] transition-shadow hover:shadow-[0_16px_45px_rgba(0,216,201,0.28)] disabled:opacity-70">
                      {status === "submitting" ? <><LoaderCircle className="h-5 w-5 animate-spin" /> Creating account...</> : <>Create account <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" /></>}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
