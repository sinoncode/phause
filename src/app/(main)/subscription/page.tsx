"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    motion, AnimatePresence, useScroll, useTransform, useInView,
} from "framer-motion";
import {
    Shield, ShieldCheck, Zap, Globe, Lock, Check, X, ChevronDown, Sparkles,
    Crown, Rocket, Building2, Landmark, Users, Server, Headset, Database,
    ArrowRight, ArrowLeft, CreditCard, BadgeCheck, Star, Quote,
    GitCompare, HelpCircle, TrendingUp, Fingerprint, Layers, Cpu,
} from "lucide-react";
import { PLANS, BILLING_CYCLE_STORAGE_KEY, type Plan, formatPrice } from "./plans";
import { ROUTES } from "@/lib/routes";

/* ══════════════════ ANIMATED BACKGROUNDS ══════════════════ */
function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,216,201,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,216,201,0.3) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[160px] bg-phause-teal/20 -top-40 -left-40"
                animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-[160px] bg-cyan-500/15 bottom-0 right-0"
                animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

function ParticleField() {
    const particles = Array.from({ length: 25 });
    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-phause-cyan"
                    style={{
                        left: `${(i * 37) % 100}%`,
                        top: `${(i * 53) % 100}%`,
                        opacity: 0.4,
                    }}
                    animate={{ y: [0, -40, 0], opacity: [0.1, 0.7, 0.1] }}
                    transition={{
                        duration: 3 + (i % 5),
                        repeat: Infinity,
                        delay: (i % 7) * 0.6,
                    }}
                />
            ))}
        </div>
    );
}

/* ══════════════════ SECTION HEADING ══════════════════ */
function SectionHeading({
    tag, title, subtitle,
}: { tag: string; title: React.ReactNode; subtitle?: string }) {
    return (
        <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-phause-cyan/10 text-phause-cyan border border-phause-cyan/20 mb-4"
            >
                {tag}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}

/* ══════════════════ PAGE HERO ══════════════════ */
function PageHero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 400], [0, 100]);

    return (
        <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-24">
            <GridBackground />
            <ParticleField />
            <motion.div style={{ y }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sm text-phause-cyan mb-8"
                >
                    <Sparkles className="w-4 h-4" /> Pricing & Plans
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-black leading-[1.05] mb-6"
                >
                    Security that <span className="text-gradient">scales</span> with you
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
                >
                    Five tiers. One platform. Zero compromises. Start free, upgrade when
                    you're ready — every plan runs the same battle-tested defense grid.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ChevronDown className="w-8 h-8 text-phause-cyan/60" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

/* ══════════════════ TRUST STRIP ══════════════════ */
function TrustStrip() {
    const items = [
        { icon: BadgeCheck, label: "SOC 2 Type II Certified" },
        { icon: Lock, label: "Zero-Trust Architecture" },
        { icon: Globe, label: "40+ Countries Served" },
        { icon: Headset, label: "24/7 Human Support" },
        { icon: TrendingUp, label: "99.98% Uptime SLA" },
    ];
    return (
        <section className="relative py-10 border-y border-phause-border/50">
            <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                {items.map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-2.5 text-slate-400 hover:text-phause-cyan transition-colors"
                    >
                        <item.icon className="w-5 h-5 text-phause-cyan" />
                        <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ══════════════════ BILLING TOGGLE ══════════════════ */
function BillingToggle({
    cycle, onChange,
}: { cycle: "monthly" | "yearly"; onChange: (c: "monthly" | "yearly") => void }) {
    return (
        <div className="flex items-center justify-center gap-4 mb-14">
            <div className="relative glass rounded-full p-1.5 flex items-center">
                {(["monthly", "yearly"] as const).map((c) => (
                    <button
                        key={c}
                        onClick={() => onChange(c)}
                        className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${cycle === c ? "text-phause-dark" : "text-slate-300 hover:text-white"
                            }`}
                    >
                        {cycle === c && (
                            <motion.span
                                layoutId="billing-pill"
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-phause-cyan to-phause-teal"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 capitalize">
                            {c === "monthly" ? "Monthly" : "Yearly"}
                        </span>
                    </button>
                ))}
            </div>
            <AnimatePresence>
                {cycle === "yearly" && (
                    <motion.span
                        initial={{ opacity: 0, x: -10, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.8 }}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-phause-teal/15 text-phause-teal border border-phause-teal/30"
                    >
                        Save up to 20%
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ══════════════════ PLAN CARD ══════════════════ */
const accentStyles: Record<string, { ring: string; glow: string; badge: string }> = {
    cyan: {
        ring: "hover:border-phause-cyan/60",
        glow: "group-hover:bg-phause-cyan/25",
        badge: "from-phause-cyan to-phause-teal",
    },
    teal: {
        ring: "hover:border-teal-400/60",
        glow: "group-hover:bg-teal-400/25",
        badge: "from-teal-400 to-emerald-400",
    },
    violet: {
        ring: "hover:border-violet-400/60",
        glow: "group-hover:bg-violet-400/25",
        badge: "from-violet-400 to-fuchsia-400",
    },
    amber: {
        ring: "hover:border-amber-400/60",
        glow: "group-hover:bg-amber-400/25",
        badge: "from-amber-400 to-orange-400",
    },
    slate: {
        ring: "hover:border-slate-400/60",
        glow: "group-hover:bg-slate-400/20",
        badge: "from-slate-400 to-slate-300",
    },
};

function PlanCard({
    plan, cycle, index,
}: { plan: Plan; cycle: "monthly" | "yearly"; index: number }) {
    const router = useRouter();
    const a = accentStyles[plan.accent];
    const isCustom = plan.priceMonthly === null;

    const handleSelect = () => {
        if (isCustom) {
            router.push(ROUTES.contact);
            return;
        }

        sessionStorage.setItem(BILLING_CYCLE_STORAGE_KEY, cycle);
        const params = new URLSearchParams({ plan: plan.id, cycle });
        router.push(`${ROUTES.subscriptionCheckout}?${params.toString()}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -14, scale: 1.015 }}
            className={`group relative glass rounded-3xl p-8 flex flex-col overflow-hidden transition-all duration-300 ${plan.popular
                ? "border-phause-cyan/50 shadow-[0_0_50px_rgba(0,216,201,0.15)] lg:scale-[1.04] lg:-translate-y-2"
                : a.ring
                } hover:shadow-[0_0_50px_rgba(0,216,201,0.12)]`}
        >
            {/* Glow blob */}
            <div
                className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] transition-all duration-500 ${a.glow} bg-phause-cyan/10`}
            />

            {/* Popular ribbon */}
            {plan.popular && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                >
                    <div className="flex items-center gap-1.5 px-5 py-1.5 rounded-b-2xl bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark text-xs font-black tracking-wider uppercase">
                        <Crown className="w-3.5 h-3.5" /> Most Popular
                    </div>
                </motion.div>
            )}

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-4 mt-2">
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.7 }}
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.badge} flex items-center justify-center shadow-[0_0_20px_rgba(0,216,201,0.3)]`}
                    >
                        {plan.id === "sentinel-free" && <Shield className="w-6 h-6 text-phause-dark" />}
                        {plan.id === "sentinel-starter" && <Rocket className="w-6 h-6 text-phause-dark" />}
                        {plan.id === "sentinel-professional" && <ShieldCheck className="w-6 h-6 text-phause-dark" />}
                        {plan.id === "sentinel-business" && <Building2 className="w-6 h-6 text-phause-dark" />}
                        {plan.id === "sentinel-sovereign" && <Landmark className="w-6 h-6 text-phause-dark" />}
                    </motion.div>
                    <div>
                        <h3 className="text-xl font-extrabold">{plan.name}</h3>
                        <p className="text-xs text-phause-cyan font-semibold uppercase tracking-wider">
                            {plan.id === "sentinel-free" ? "Tier 01" : plan.id === "sentinel-starter" ? "Tier 02" : plan.id === "sentinel-professional" ? "Tier 03" : plan.id === "sentinel-business" ? "Tier 04" : "Tier 05"}
                        </p>
                    </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 min-h-[60px]">
                    {plan.tagline}
                </p>

                {/* Price */}
                <div className="mb-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={cycle}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-end gap-2"
                        >
                            <span className="text-5xl font-black text-gradient">
                                {formatPrice(plan, cycle)}
                            </span>
                            {!isCustom && (
                                <span className="text-slate-400 text-sm mb-1.5">
                                    / endpoint / month
                                </span>
                            )}
                        </motion.div>
                    </AnimatePresence>
                    {plan.priceMonthly !== null && plan.priceYearly !== null &&
                        cycle === "yearly" && plan.priceMonthly > 0 && (
                        <p className="text-xs text-phause-teal mt-1.5 font-semibold">
                            Billed yearly — save ${(plan.priceMonthly - plan.priceYearly) * 12}/yr
                        </p>
                    )}
                    {isCustom && (
                        <p className="text-xs text-slate-500 mt-1.5">
                            Tailored quote based on scale, residency & compliance needs
                        </p>
                    )}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {plan.stats.map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl bg-phause-cyan/[0.06] border border-phause-cyan/10 px-3 py-2.5 hover:border-phause-cyan/30 transition-colors"
                        >
                            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                                {s.label}
                            </p>
                            <p className="text-sm font-bold text-slate-200 mt-0.5">{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                        <div key={f.label} className="flex items-start gap-2.5">
                            {f.included ? (
                                <Check className="w-4 h-4 text-phause-cyan shrink-0 mt-0.5" />
                            ) : (
                                <X className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                            )}
                            <span
                                className={`text-sm leading-snug ${f.included ? "text-slate-300" : "text-slate-600 line-through"
                                    }`}
                            >
                                {f.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <motion.button
                    onClick={handleSelect}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 overflow-hidden ${plan.popular || plan.accent === "amber"
                        ? "bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark shadow-[0_0_30px_rgba(0,216,201,0.4)]"
                        : "glass border border-phause-cyan/30 text-phause-cyan hover:bg-phause-cyan/10"
                        }`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {plan.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                    {plan.popular && (
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}

/* ══════════════════ PLANS GRID ══════════════════ */
function PlansSection() {
    const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");

    useEffect(() => {
        const saved = sessionStorage.getItem(BILLING_CYCLE_STORAGE_KEY);
        if (saved === "monthly" || saved === "yearly") setCycle(saved);
    }, []);

    return (
        <section className="relative py-28 overflow-hidden">
            <div className="absolute left-1/2 top-24 w-[700px] h-[500px] rounded-full bg-phause-cyan/8 blur-[160px] -translate-x-1/2" />
            <div className="max-w-[90rem] mx-auto px-6">
                <SectionHeading
                    tag="Choose Your Shield"
                    title={<>Five tiers of <span className="text-gradient">absolute defense</span></>}
                    subtitle="From a weekend project to a global enterprise — there's a Sentinel tier built exactly for where you are right now."
                />
                <BillingToggle cycle={cycle} onChange={setCycle} />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 items-stretch">
                    {PLANS.map((plan, i) => (
                        <PlanCard key={plan.id} plan={plan} cycle={cycle} index={i} />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-sm text-slate-500 mt-10"
                >
                    All paid plans include a 14-day free trial. No credit card required until day 15. Cancel anytime.
                </motion.p>
            </div>
        </section>
    );
}

/* ══════════════════ COMPARISON TABLE ══════════════════ */
function ComparisonRow({
    label, values, highlight,
}: { label: string; values: (string | boolean)[]; highlight?: boolean }) {
    return (
        <motion.tr
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            className={`border-b border-phause-border/40 ${highlight ? "bg-phause-cyan/[0.04]" : ""} hover:bg-phause-cyan/[0.06] transition-colors`}
        >
            <td className="py-4 px-5 text-sm font-semibold text-slate-300 sticky left-0 bg-inherit z-10 min-w-[200px]">
                {label}
            </td>
            {values.map((v, i) => (
                <td key={i} className="py-4 px-5 text-center">
                    {typeof v === "boolean" ? (
                        v ? (
                            <Check className="w-5 h-5 text-phause-cyan mx-auto" />
                        ) : (
                            <X className="w-5 h-5 text-slate-600 mx-auto" />
                        )
                    ) : (
                        <span className="text-sm text-slate-300 font-medium">{v}</span>
                    )}
                </td>
            ))}
        </motion.tr>
    );
}

function ComparisonTable() {
    const rows: { label: string; values: (string | boolean)[] }[] = [
        { label: "Protected Endpoints", values: ["Up to 5", "Up to 50", "Up to 500", "Up to 5,000", "Unlimited"] },
        { label: "Monthly Event Ingestion", values: ["1M", "100M", "5B", "50B", "Unlimited"] },
        { label: "Data Retention", values: ["7 days", "30 days", "1 year", "3 years", "Unlimited"] },
        { label: "Behavioral ML Detection", values: [true, true, true, true, true] },
        { label: "Automated Response Playbooks", values: [false, true, true, true, true] },
        { label: "24/7 Human SOC", values: [false, false, true, true, true] },
        { label: "Compliance Automation", values: [false, false, true, true, true] },
        { label: "Threat Intel Feeds", values: [false, "Standard", "Standard", "Premium", "Premium + Custom"] },
        { label: "Zero-Trust Identity Analytics", values: [false, false, false, true, true] },
        { label: "Air-Gapped Deployment", values: [false, false, false, false, true] },
        { label: "Post-Quantum Crypto Lab", values: [false, false, false, false, true] },
        { label: "Support SLA", values: ["Community", "12h", "1h", "15m", "5m White-Glove"] },
    ];

    return (
        <section className="relative py-28 overflow-hidden">
            <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-phause-teal/8 blur-[140px]" />
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                    tag="Side By Side"
                    title={<>Compare every <span className="text-gradient">dimension</span></>}
                    subtitle="Every capability, every tier, laid out with nothing hidden."
                />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-3xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="border-b border-phause-cyan/20 bg-phause-cyan/[0.06]">
                                    <th className="py-5 px-5 text-left text-sm font-bold text-slate-400 sticky left-0 bg-[rgba(0,216,201,0.06)] z-10">
                                        Capability
                                    </th>
                                    {PLANS.map((p) => (
                                        <th key={p.id} className="py-5 px-5 text-center">
                                            <span className={`text-sm font-extrabold ${p.popular ? "text-gradient" : "text-slate-200"}`}>
                                                {p.name.replace("Sentinel ", "")}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, i) => (
                                    <ComparisonRow key={row.label} label={row.label} values={row.values} highlight={i % 2 === 0} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ══════════════════ FAQ ══════════════════ */
function FAQ() {
    const faqs = [
        { q: "Can I switch plans after subscribing?", a: "Absolutely. Upgrades take effect instantly and are prorated to the day. Downgrades apply at the start of your next billing cycle, and your historical data is always preserved according to the higher plan's retention window." },
        { q: "What happens after my 14-day trial ends?", a: "On day 15 we ask for a payment method. If you don't add one, your account gracefully downgrades to Sentinel Free — no data deletion, no service interruption, no awkward sales calls." },
        { q: "Is there a minimum contract length?", a: "Monthly plans are month-to-month with zero lock-in. Yearly plans are paid upfront with a 20% discount, and you can request a prorated refund within the first 60 days if Phause isn't a fit." },
        { q: "How is per-endpoint pricing counted?", a: "An endpoint is any device, server, container, or cloud workload running the Phause agent. Ephemeral workloads like CI runners are averaged over the month so burst builds don't inflate your bill." },
        { q: "Do you offer discounts for nonprofits or education?", a: "Yes. Registered nonprofits, educational institutions, and open-source projects receive 50% off any paid tier, forever. Reach out to our community team to apply." },
        { q: "What makes Sentinel Sovereign different?", a: "Sovereign is a fully air-gapped deployment of the entire Phause platform — it runs entirely inside your perimeter with zero external telemetry. It includes our post-quantum cryptography migration lab and a dedicated on-site incident response retainer." },
    ];
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="relative py-28">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeading
                    tag="FAQ"
                    title={<>Questions, <span className="text-gradient">answered</span></>}
                    subtitle="Everything teams usually ask before they put Phause between them and the attackers."
                />
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className={`glass rounded-2xl overflow-hidden transition-colors ${open === i ? "border-phause-cyan/40" : "hover:border-phause-cyan/25"
                                }`}
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                            >
                                <span className="font-bold text-slate-200 flex items-center gap-3">
                                    <HelpCircle className="w-5 h-5 text-phause-cyan shrink-0" />
                                    {f.q}
                                </span>
                                <motion.span
                                    animate={{ rotate: open === i ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-5 h-5 text-phause-cyan" />
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                    >
                                        <p className="px-6 pb-6 pl-14 text-sm text-slate-400 leading-relaxed">
                                            {f.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ══════════════════ GUARANTEE BANNER ══════════════════ */
function GuaranteeBanner() {
    return (
        <section className="relative py-20">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-14"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-phause-cyan/20 via-phause-teal/10 to-transparent" />
                    <div className="absolute inset-0 glass" />
                    <div className="relative z-10 grid md:grid-cols-3 gap-10 items-center">
                        <motion.div
                            whileHover={{ rotate: 8, scale: 1.1 }}
                            className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center shadow-[0_0_50px_rgba(0,216,201,0.5)]"
                        >
                            <ShieldCheck className="w-12 h-12 text-phause-dark" />
                        </motion.div>
                        <div className="md:col-span-2 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
                                The Phause <span className="text-gradient">60-Day Pledge</span>
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-5">
                                If we don't detect a live attack simulation that your previous vendor
                                caught, or if any critical alert slips past our SOC in your first 60
                                days — your first year is free. In writing. In the contract.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                {["Contractually Guaranteed", "No Fine Print", "Zero Questions Asked"].map((t) => (
                                    <span key={t} className="px-4 py-1.5 rounded-full text-xs font-bold bg-phause-cyan/10 text-phause-cyan border border-phause-cyan/25">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ══════════════════ FINAL CTA ══════════════════ */
function FinalCTA() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute left-1/2 bottom-0 w-[800px] h-[400px] rounded-full bg-phause-cyan/10 blur-[160px] -translate-x-1/2" />
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black mb-6 leading-tight"
                >
                    Still unsure? <span className="text-gradient">Talk to a human.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="text-slate-400 text-lg max-w-xl mx-auto mb-10"
                >
                    Our solutions engineers (real security people, not sales scripts) will map
                    your environment to the right tier in a free 30-minute call.
                </motion.p>
                <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark font-bold text-lg shadow-[0_0_50px_rgba(0,216,201,0.5)]"
                >
                    Book a Free Consultation <ArrowRight className="w-5 h-5" />
                </motion.a>
            </div>
        </section>
    );
}

/* ══════════════════ PAGE ══════════════════ */
export default function SubscriptionPage() {
    return (
        <>
            <PageHero />
            <TrustStrip />
            <PlansSection />
            <ComparisonTable />
            <GuaranteeBanner />
            <FAQ />
            <FinalCTA />
        </>
    );
}
