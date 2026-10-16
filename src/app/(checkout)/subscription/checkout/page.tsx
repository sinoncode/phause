"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    motion, AnimatePresence,
} from "framer-motion";
import {
    Shield, ShieldCheck, Check, X, Sparkles, Lock,
    User, CreditCard, FileText, PartyPopper, ArrowLeft, ArrowRight,
    Building2, Mail, Phone, MapPin, Eye, EyeOff, Loader2,
    BadgeCheck, Zap, Headset, RefreshCcw, Fingerprint,
} from "lucide-react";
import { PLANS, type Plan } from "@/app/(main)/subscription/plans";
import { ROUTES } from "@/lib/routes";

/* ══════════════════ ANIMATED BACKGROUNDS ══════════════════ */
function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,216,201,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,216,201,0.3) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[160px] bg-phause-teal/15 -top-40 -left-40"
                animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-[160px] bg-cyan-500/12 bottom-0 right-0"
                animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

function ParticleField() {
    const particles = Array.from({ length: 25 });
    return (
        <div className="absolute inset-0 pointer-events-none fixed">
            {particles.map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-phause-cyan"
                    style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, opacity: 0.4 }}
                    animate={{ y: [0, -40, 0], opacity: [0.1, 0.7, 0.1] }}
                    transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.6 }}
                />
            ))}
        </div>
    );
}

/* ══════════════════ STEP DEFINITIONS ══════════════════ */
const STEPS = [
    { id: 0, label: "Plan", icon: Shield, sub: "Confirm selection" },
    { id: 1, label: "Account", icon: User, sub: "Your details" },
    { id: 2, label: "Payment", icon: CreditCard, sub: "Billing info" },
    { id: 3, label: "Done", icon: PartyPopper, sub: "You're in" },
];

/* ══════════════════ INPUT FIELD ══════════════════ */
function Field({
    label, icon: Icon, error, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string; icon: React.ElementType; error?: string;
}) {
    return (
        <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {label}
            </label>
            <div className={`relative glass rounded-xl overflow-hidden transition-all duration-300 focus-within:border-phause-cyan/60 focus-within:shadow-[0_0_25px_rgba(0,216,201,0.15)] ${error ? "border-red-400/50" : ""}`}>
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-phause-cyan/70" />
                <input
                    {...props}
                    className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-500 outline-none"
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-400 mt-1.5 flex items-center gap-1"
                >
                    <X className="w-3 h-3" /> {error}
                </motion.p>
            )}
        </div>
    );
}

/* ══════════════════ PROGRESS STEPPER ══════════════════ */
function Stepper({ step, onJump }: { step: number; onJump: (s: number) => void }) {
    return (
        <div className="relative mb-12">
            {/* Connector line */}
            <div className="absolute top-7 left-[12%] right-[12%] h-[2px] bg-phause-border rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-phause-cyan to-phause-teal"
                    animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
            </div>
            <div className="relative flex justify-between">
                {STEPS.map((s, i) => {
                    const done = i < step;
                    const active = i === step;
                    return (
                        <div key={s.id} className="flex flex-col items-center gap-2 z-10 w-24">
                            <motion.button
                                onClick={() => done && onJump(i)}
                                whileHover={done ? { scale: 1.12 } : {}}
                                animate={{
                                    scale: active ? 1.15 : 1,
                                    boxShadow: active
                                        ? "0 0 35px rgba(0,216,201,0.5)"
                                        : done
                                            ? "0 0 20px rgba(0,216,201,0.3)"
                                            : "0 0 0 rgba(0,0,0,0)",
                                }}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${done
                                    ? "bg-gradient-to-br from-phause-cyan to-phause-teal cursor-pointer"
                                    : active
                                        ? "bg-gradient-to-br from-phause-cyan to-phause-teal"
                                        : "glass border-phause-border"
                                    }`}
                            >
                                {done ? (
                                    <Check className="w-6 h-6 text-phause-dark" />
                                ) : (
                                    <s.icon className={`w-6 h-6 ${active ? "text-phause-dark" : "text-slate-500"}`} />
                                )}
                            </motion.button>
                            <div className="text-center">
                                <p className={`text-xs font-bold ${active ? "text-phause-cyan" : done ? "text-slate-300" : "text-slate-500"}`}>
                                    {s.label}
                                </p>
                                <p className="text-[10px] text-slate-600 hidden sm:block">{s.sub}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ══════════════════ STEP 0 : PLAN CONFIRMATION ══════════════════ */
function StepPlan({
    plan, cycle, onCycleChange, onNext,
}: { plan: Plan; cycle: "monthly" | "yearly"; onCycleChange: (c: "monthly" | "yearly") => void; onNext: () => void }) {
    const isCustom = plan.priceMonthly === null;
    const price = cycle === "monthly" ? plan.priceMonthly : plan.priceYearly;

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div className="glass rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-phause-cyan/15 blur-[80px]" />
                <div className="relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <motion.div
                                animate={{ rotate: [0, 8, 0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center shadow-[0_0_25px_rgba(0,216,201,0.4)]"
                            >
                                <ShieldCheck className="w-7 h-7 text-phause-dark" />
                            </motion.div>
                            <div>
                                <h3 className="text-2xl font-extrabold">{plan.name}</h3>
                                <p className="text-sm text-slate-400">{plan.tagline}</p>
                            </div>
                        </div>
                        <a href={ROUTES.subscription} className="text-xs text-phause-cyan hover:underline flex items-center gap-1">
                            <RefreshCcw className="w-3 h-3" /> Change plan
                        </a>
                    </div>

                    {/* Billing cycle mini-toggle */}
                    {!isCustom && (
                        <div className="flex items-center gap-3 mb-6">
                            <div className="glass rounded-full p-1 flex items-center gap-1">
                                {(["monthly", "yearly"] as const).map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => onCycleChange(c)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all capitalize ${cycle === c ? "bg-phause-cyan/20 text-phause-cyan border border-phause-cyan/40" : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                            {cycle === "yearly" && (
                                <span className="text-xs font-bold text-phause-teal bg-phause-teal/10 border border-phause-teal/30 px-3 py-1 rounded-full">
                                    Save 20%
                                </span>
                            )}
                        </div>
                    )}

                    {/* Price breakdown */}
                    <div className="rounded-2xl bg-phause-cyan/[0.05] border border-phause-cyan/15 p-6 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">{plan.name} — per endpoint</span>
                            <span className="font-bold text-slate-200">
                                {isCustom ? "Custom quote" : `$${price}.00`}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Billing cycle</span>
                            <span className="font-bold text-slate-200 capitalize">{cycle}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">14-day free trial</span>
                            <span className="font-bold text-phause-teal">Included</span>
                        </div>
                        <div className="border-t border-phause-cyan/15 pt-3 flex justify-between">
                            <span className="font-bold text-slate-200">Due today</span>
                            <span className="font-black text-xl text-gradient">$0.00</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-5 text-xs text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-phause-cyan" />
                        No charge until day 15. Cancel anytime with two clicks.
                    </div>
                </div>
            </div>

            <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark font-bold shadow-[0_0_35px_rgba(0,216,201,0.4)] flex items-center justify-center gap-2"
            >
                Confirm Plan & Continue <ArrowRight className="w-5 h-5" />
            </motion.button>
        </motion.div>
    );
}

/* ══════════════════ STEP 1 : ACCOUNT DETAILS ══════════════════ */
function StepAccount({
    form, setForm, errors, onNext, onBack,
}: {
    form: Record<string, string>;
    setForm: (f: Record<string, string>) => void;
    errors: Record<string, string>;
    onNext: () => void; onBack: () => void;
}) {
    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [k]: e.target.value });

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div className="glass rounded-3xl p-8">
                <h3 className="text-xl font-extrabold mb-1 flex items-center gap-2.5">
                    <User className="w-5 h-5 text-phause-cyan" /> Account Details
                </h3>
                <p className="text-sm text-slate-500 mb-7">Tell us who you are — this becomes your admin account.</p>

                <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row gap-5">
                        <Field label="First Name" icon={User} placeholder="Sarah" value={form.firstName} onChange={set("firstName")} error={errors.firstName} />
                        <Field label="Last Name" icon={User} placeholder="Mitchell" value={form.lastName} onChange={set("lastName")} error={errors.lastName} />
                    </div>
                    <Field label="Work Email" icon={Mail} type="email" placeholder="sarah@yourcompany.com" value={form.email} onChange={set("email")} error={errors.email} />
                    <div className="flex flex-col sm:flex-row gap-5">
                        <Field label="Company" icon={Building2} placeholder="Acme Corp" value={form.company} onChange={set("company")} error={errors.company} />
                        <Field label="Phone (optional)" icon={Phone} type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={set("phone")} />
                    </div>
                    <Field label="Country" icon={MapPin} placeholder="United States" value={form.country} onChange={set("country")} error={errors.country} />
                </div>
            </div>

            <div className="flex gap-4">
                <motion.button
                    onClick={onBack}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-4 rounded-2xl glass border border-phause-cyan/25 text-phause-cyan font-bold flex items-center gap-2"
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </motion.button>
                <motion.button
                    onClick={onNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark font-bold shadow-[0_0_35px_rgba(0,216,201,0.4)] flex items-center justify-center gap-2"
                >
                    Continue to Payment <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </motion.div>
    );
}

/* ══════════════════ STEP 2 : PAYMENT ══════════════════ */
function StepPayment({
    form, setForm, errors, onBack, onPay,
}: {
    form: Record<string, string>;
    setForm: (f: Record<string, string>) => void;
    errors: Record<string, string>;
    onBack: () => void; onPay: () => void;
}) {
    const [showCvv, setShowCvv] = useState(false);
    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [k]: e.target.value });

    const formatCard = (v: string) =>
        v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    const formatExp = (v: string) => {
        const d = v.replace(/\D/g, "").slice(0, 4);
        return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div className="glass rounded-3xl p-8">
                <h3 className="text-xl font-extrabold mb-1 flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-phause-cyan" /> Payment Method
                </h3>
                <p className="text-sm text-slate-500 mb-7">
                    You will not be charged until your 14-day trial ends on day 15.
                </p>

                <div className="space-y-5">
                    <Field
                        label="Cardholder Name" icon={User} placeholder="Name on card"
                        value={form.cardName} onChange={set("cardName")} error={errors.cardName}
                    />
                    <Field
                        label="Card Number" icon={CreditCard} placeholder="4242 4242 4242 4242" inputMode="numeric"
                        value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: formatCard(e.target.value) })}
                        error={errors.cardNumber}
                    />
                    <div className="flex flex-col sm:flex-row gap-5">
                        <Field
                            label="Expiry" icon={CreditCard} placeholder="MM/YY" inputMode="numeric"
                            value={form.expiry} onChange={(e) => setForm({ ...form, expiry: formatExp(e.target.value) })}
                            error={errors.expiry}
                        />
                        <div className="flex-1">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                CVV
                            </label>
                            <div className={`relative glass rounded-xl overflow-hidden transition-all duration-300 focus-within:border-phause-cyan/60 ${errors.cvv ? "border-red-400/50" : ""}`}>
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-phause-cyan/70" />
                                <input
                                    type={showCvv ? "text" : "password"}
                                    inputMode="numeric"
                                    placeholder="•••"
                                    maxLength={4}
                                    value={form.cvv}
                                    onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "") })}
                                    className="w-full bg-transparent pl-11 pr-12 py-3.5 text-sm text-slate-200 placeholder-slate-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCvv(!showCvv)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-phause-cyan transition-colors"
                                >
                                    {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.cvv && (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                                    <X className="w-3 h-3" /> {errors.cvv}
                                </motion.p>
                            )}
                        </div>
                    </div>
                    <Field label="Billing ZIP / Postal Code" icon={MapPin} placeholder="94103" value={form.zip} onChange={set("zip")} error={errors.zip} />
                </div>

                <div className="flex items-center gap-2.5 mt-7 p-4 rounded-2xl bg-phause-cyan/[0.06] border border-phause-cyan/15 text-xs text-slate-400">
                    <Fingerprint className="w-5 h-5 text-phause-cyan shrink-0" />
                    Payments are processed over TLS 1.3 with tokenized card storage. Phause never sees or stores your full card number.
                </div>
            </div>

            <div className="flex gap-4">
                <motion.button
                    onClick={onBack}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-4 rounded-2xl glass border border-phause-cyan/25 text-phause-cyan font-bold flex items-center gap-2"
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </motion.button>
                <motion.button
                    onClick={onPay}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark font-bold shadow-[0_0_35px_rgba(0,216,201,0.4)] flex items-center justify-center gap-2"
                >
                    <Lock className="w-4 h-4" /> Start Free Trial
                </motion.button>
            </div>
        </motion.div>
    );
}

/* ══════════════════ STEP 3 : SUCCESS ══════════════════ */
function StepSuccess({ plan, form }: { plan: Plan; form: Record<string, string> }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-10 text-center relative overflow-hidden"
        >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-phause-cyan/20 blur-[90px]" />
            <div className="relative z-10">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center shadow-[0_0_60px_rgba(0,216,201,0.6)] mb-7"
                >
                    <Check className="w-12 h-12 text-phause-dark" strokeWidth={3} />
                </motion.div>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-black mb-3"
                >
                    Welcome aboard, <span className="text-gradient">{form.firstName || "Sentinel"}</span>
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="text-slate-400 max-w-md mx-auto mb-8"
                >
                    Your <strong className="text-phause-cyan">{plan.name}</strong> trial is active.
                    Deployment instructions are on their way to <strong className="text-slate-200">{form.email}</strong>.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-9"
                >
                    {[
                        { icon: Zap, label: "Agent deploys in ~3 min" },
                        { icon: ShieldCheck, label: "Protection live instantly" },
                        { icon: Headset, label: "SOC watching from hour one" },
                    ].map((x) => (
                        <div key={x.label} className="rounded-2xl bg-phause-cyan/[0.06] border border-phause-cyan/15 p-4">
                            <x.icon className="w-5 h-5 text-phause-cyan mx-auto mb-2" />
                            <p className="text-[11px] text-slate-400 leading-tight">{x.label}</p>
                        </div>
                    ))}
                </motion.div>
                <motion.a
                    href={ROUTES.subscription}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.85 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark font-bold shadow-[0_0_40px_rgba(0,216,201,0.5)]"
                >
                    Go to Dashboard <ArrowRight className="w-5 h-5" />
                </motion.a>
            </div>
        </motion.div>
    );
}

/* ══════════════════ ORDER SUMMARY SIDEBAR ══════════════════ */
function OrderSummary({ plan, cycle }: { plan: Plan; cycle: "monthly" | "yearly" }) {
    const isCustom = plan.priceMonthly === null;
    const price = cycle === "monthly" ? plan.priceMonthly : plan.priceYearly;

    return (
        <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24"
        >
            <div className="glass rounded-3xl p-7 relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-phause-cyan/12 blur-[70px]" />
                <div className="relative z-10">
                    <h4 className="text-sm font-black uppercase tracking-widest text-phause-cyan mb-5 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Order Summary
                    </h4>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center">
                            <Shield className="w-5 h-5 text-phause-dark" />
                        </div>
                        <div>
                            <p className="font-bold">{plan.name}</p>
                            <p className="text-xs text-slate-500 capitalize">{cycle} billing · 14-day trial</p>
                        </div>
                    </div>
                    <div className="space-y-2.5 text-sm border-t border-phause-border/60 pt-4">
                        <div className="flex justify-between text-slate-400">
                            <span>Plan (per endpoint)</span>
                            <span className="text-slate-200 font-bold">{isCustom ? "Custom" : `$${price}.00`}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Trial period</span>
                            <span className="text-phause-teal font-bold">14 days free</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Setup fee</span>
                            <span className="text-slate-200 font-bold">$0.00</span>
                        </div>
                        <div className="border-t border-phause-border/60 pt-3 flex justify-between font-black text-lg">
                            <span>Due today</span>
                            <span className="text-gradient">$0.00</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-2.5">
                        {[
                            { icon: BadgeCheck, text: "SOC 2 Type II certified platform" },
                            { icon: Lock, text: "256-bit encrypted checkout" },
                            { icon: RefreshCcw, text: "Cancel anytime, no lock-in" },
                        ].map((row) => (
                            <div key={row.text} className="flex items-center gap-2.5 text-xs text-slate-400">
                                <row.icon className="w-3.5 h-3.5 text-phause-cyan shrink-0" /> {row.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}

/* ══════════════════ CHECKOUT PAGE ══════════════════ */
function CheckoutInner() {
    const searchParams = useSearchParams();
    const selectedPlan = PLANS.find((item) => item.id === searchParams.get("plan")) ?? PLANS[2];
    const selectedCycle = searchParams.get("cycle");
    const [plan] = useState<Plan>(selectedPlan);
    const [cycle, setCycle] = useState<"monthly" | "yearly">(
        selectedCycle === "monthly" || selectedCycle === "yearly" ? selectedCycle : "yearly",
    );
    const [step, setStep] = useState(0);
    const [paying, setPaying] = useState(false);
    const [form, setForm] = useState<Record<string, string>>({
        firstName: "", lastName: "", email: "", company: "", phone: "",
        country: "", cardName: "", cardNumber: "", expiry: "", cvv: "", zip: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep1 = () => {
        const e: Record<string, string> = {};
        if (!form.firstName.trim()) e.firstName = "First name is required";
        if (!form.lastName.trim()) e.lastName = "Last name is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid work email";
        if (!form.company.trim()) e.company = "Company is required";
        if (!form.country.trim()) e.country = "Country is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validateStep2 = () => {
        const e: Record<string, string> = {};
        if (!form.cardName.trim()) e.cardName = "Name on card is required";
        if (form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Enter a valid 16-digit card number";
        if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "Use MM/YY format";
        if (form.cvv.length < 3) e.cvv = "Invalid CVV";
        if (!form.zip.trim()) e.zip = "ZIP is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePay = () => {
        if (!validateStep2()) return;
        setPaying(true);
        setTimeout(() => {
            setPaying(false);
            setStep(3);
        }, 1800);
    };

    return (
        <div className="relative min-h-screen pt-28 pb-20">
            <GridBackground />
            <ParticleField />
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.a
                        href={ROUTES.subscription}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-1.5 text-sm text-phause-cyan hover:underline mb-5"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to plans
                    </motion.a>
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sm text-phause-cyan mb-6">
                        <Sparkles className="w-4 h-4" /> Secure Checkout
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-4">
                        Almost <span className="text-gradient">protected</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Four quick steps between you and the strongest defense grid in the industry.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
                    <div>
                        {step < 3 && <Stepper step={step} onJump={setStep} />}
                        <AnimatePresence mode="wait">
                            {step === 0 && (
                                <StepPlan plan={plan} cycle={cycle} onCycleChange={setCycle} onNext={() => setStep(1)} />
                            )}
                            {step === 1 && (
                                <StepAccount
                                    form={form} setForm={setForm} errors={errors}
                                    onNext={() => { if (validateStep1()) setStep(2); }}
                                    onBack={() => setStep(0)}
                                />
                            )}
                            {step === 2 && (
                                <StepPayment
                                    form={form} setForm={setForm} errors={errors}
                                    onBack={() => setStep(1)}
                                    onPay={handlePay}
                                />
                            )}
                            {step === 3 && <StepSuccess plan={plan} form={form} />}
                        </AnimatePresence>
                    </div>
                    {step < 3 && <OrderSummary plan={plan} cycle={cycle} />}
                </div>
            </div>

            {/* Paying overlay */}
            <AnimatePresence>
                {paying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-phause-dark/80 backdrop-blur-md flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass rounded-3xl p-10 text-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-14 h-14 mx-auto mb-5 rounded-full border-4 border-phause-cyan/20 border-t-phause-cyan"
                            />
                            <p className="font-bold text-lg">Securing your trial…</p>
                            <p className="text-sm text-slate-500 mt-1">Provisioning your Sentinel grid</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-phause-dark px-6 text-white">
                    <div className="glass flex items-center gap-3 rounded-2xl px-6 py-4" role="status">
                        <Loader2 className="h-5 w-5 animate-spin text-phause-cyan" />
                        <span className="text-sm text-slate-300">Loading secure checkout…</span>
                    </div>
                </main>
            }
        >
            <CheckoutInner />
        </Suspense>
    );
}
