"use client";

import { useState, useEffect, useRef } from "react";
import {
    motion, AnimatePresence, useInView,
} from "framer-motion";
import {
    Zap, Mail, Phone, MapPin, Send, Clock, Building2,
    Globe, Headset, CheckCircle2, Loader2, ChevronDown,
    Navigation,
    User, AtSign, MessageSquare, Briefcase, Smartphone,
    MapPinned, Sparkles, ArrowRight,
} from "lucide-react";

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
                className="absolute w-[600px] h-[600px] rounded-full blur-[160px] bg-phause-teal/20 -top-40 -right-40"
                animate={{ x: [0, -80, 0], y: [0, 50, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-[160px] bg-cyan-500/15 bottom-0 left-0"
                animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
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
    return (
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-24">
            <GridBackground />
            <ParticleField />
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sm text-phause-cyan mb-8"
                >
                    <Headset className="w-4 h-4" /> Average response time: under 2 hours
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-black leading-[1.05] mb-6"
                >
                    Let's Secure Your <span className="text-gradient">Future</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
                >
                    Whether you're evaluating a platform, planning a migration, or facing
                    an active incident — our team is one message away, around the clock.
                </motion.p>
            </div>
        </section>
    );
}

/* ══════════════════ GET IN TOUCH — ENQUIRY FORM ══════════════════ */
const enquirySubjects = [
    "General Enquiry",
    "Platform Demo Request",
    "Pricing & Subscription",
    "Incident / Emergency Support",
    "Partnership Opportunity",
    "Careers",
    "Press & Media",
];

function EnquiryForm() {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", company: "",
        subject: enquirySubjects[0], message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Full name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
        if (form.phone && !/^[+]?[\d\s\-()]{7,18}$/.test(form.phone)) e.phone = "Enter a valid phone number";
        if (!form.message.trim()) e.message = "Please tell us how we can help";
        else if (form.message.trim().length < 20) e.message = "Message should be at least 20 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;
        setStatus("sending");
        // Replace with: await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
        await new Promise((r) => setTimeout(r, 1800));
        setStatus("success");
    };

    const inputCls = (field: string) =>
        `w-full px-5 py-4 rounded-2xl bg-phause-card/70 border ${errors[field] ? "border-red-500/60" : "border-phause-border"
        } text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-phause-cyan/60 focus:shadow-[0_0_20px_rgba(0,216,201,0.12)] transition-all duration-300`;

    const fields = [
        { key: "name", label: "Full Name", icon: User, type: "text", placeholder: "Jane Cooper", required: true },
        { key: "email", label: "Work Email", icon: AtSign, type: "email", placeholder: "jane@company.com", required: true },
        { key: "phone", label: "Phone Number", icon: Smartphone, type: "tel", placeholder: "+1 (555) 000-0000", required: false },
        { key: "company", label: "Company", icon: Briefcase, type: "text", placeholder: "Acme Corp", required: false },
    ];

    return (
        <section className="relative py-28 overflow-hidden">
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-phause-cyan/8 blur-[150px]" />
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                    tag="Get In Touch"
                    title={<>We reply fast. <span className="text-gradient">Really fast.</span></>}
                    subtitle="Fill out the enquiry form and a dedicated security consultant will reach out within 2 business hours."
                />

                <div className="grid lg:grid-cols-5 gap-10 items-stretch">
                    {/* Contact detail cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-2 flex flex-col gap-5"
                    >
                        {[
                            {
                                icon: Mail, title: "Email Us",
                                lines: ["hello@phause.com", "support@phause.com"],
                                note: "For demos & partnerships / For existing clients",
                            },
                            {
                                icon: Phone, title: "Call Us",
                                lines: ["+1 (555) 010-PHAUSE (USA)", "+91 80 4719 0100 (India)"],
                                note: "24/7 emergency line for active incidents",
                            },
                            {
                                icon: MapPin, title: "Headquarters",
                                lines: ["580 California Street, Floor 12", "San Francisco, CA 94104, USA"],
                                note: "Regional offices in New York, Bangalore & Mumbai",
                            },
                            {
                                icon: Clock, title: "Working Hours",
                                lines: ["Mon – Fri: 9:00 AM – 6:00 PM (local)", "SOC & Incident Response: 24/7/365"],
                                note: "Global follow-the-sun coverage across 3 continents",
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                whileHover={{ x: 8, borderColor: "rgba(0,216,201,0.4)" }}
                                className="glass rounded-3xl p-6 flex gap-5 transition-colors"
                            >
                                <div className="w-13 h-13 p-3.5 shrink-0 rounded-2xl bg-gradient-to-br from-phause-cyan/20 to-phause-teal/20 border border-phause-cyan/30 flex items-center justify-center">
                                    <card.icon className="w-6 h-6 text-phause-cyan" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1.5">{card.title}</h3>
                                    {card.lines.map((l) => (
                                        <p key={l} className="text-sm text-slate-300">{l}</p>
                                    ))}
                                    <p className="text-xs text-slate-500 mt-1.5">{card.note}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-3"
                    >
                        <div className="glass rounded-[2rem] p-8 md:p-10 relative overflow-hidden h-full">
                            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-phause-cyan/12 blur-[90px]" />

                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full min-h-[420px] flex flex-col items-center justify-center text-center relative z-10"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
                                            className="w-20 h-20 rounded-full bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,216,201,0.5)]"
                                        >
                                            <CheckCircle2 className="w-10 h-10 text-phause-dark" />
                                        </motion.div>
                                        <h3 className="text-2xl font-extrabold mb-3">Enquiry Received!</h3>
                                        <p className="text-slate-400 max-w-sm mb-8">
                                            Thanks, {form.name.split(" ")[0]}. A security consultant will
                                            contact you at <span className="text-phause-cyan">{form.email}</span> within 2 business hours.
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setStatus("idle");
                                                setForm({ name: "", email: "", phone: "", company: "", subject: enquirySubjects[0], message: "" });
                                            }}
                                            className="px-7 py-3 rounded-full border border-phause-cyan/40 text-phause-cyan font-semibold hover:bg-phause-cyan/10 transition-colors"
                                        >
                                            Send Another Enquiry
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        onSubmit={handleSubmit}
                                        noValidate
                                        className="relative z-10 space-y-5"
                                    >
                                        <div className="grid md:grid-cols-2 gap-5">
                                            {fields.map((f) => (
                                                <div key={f.key}>
                                                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                                                        {f.label} {f.required && <span className="text-phause-cyan">*</span>}
                                                    </label>
                                                    <div className="relative">
                                                        <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                                        <input
                                                            type={f.type}
                                                            value={form[f.key as keyof typeof form]}
                                                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                                                            placeholder={f.placeholder}
                                                            className={`${inputCls(f.key)} pl-11`}
                                                        />
                                                    </div>
                                                    <AnimatePresence>
                                                        {errors[f.key] && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -6 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0 }}
                                                                className="text-xs text-red-400 mt-1.5"
                                                            >
                                                                {errors[f.key]}
                                                            </motion.p>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                                                Subject <span className="text-phause-cyan">*</span>
                                            </label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                                <select
                                                    value={form.subject}
                                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                                    className={`${inputCls("subject")} pl-11 appearance-none cursor-pointer`}
                                                >
                                                    {enquirySubjects.map((s) => (
                                                        <option key={s} value={s} className="bg-phause-card">{s}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                                                Message <span className="text-phause-cyan">*</span>
                                            </label>
                                            <textarea
                                                rows={5}
                                                value={form.message}
                                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                                placeholder="Tell us about your infrastructure, current security stack, and what you're trying to achieve…"
                                                className={`${inputCls("message")} resize-none`}
                                            />
                                            <div className="flex justify-between mt-1.5">
                                                <AnimatePresence>
                                                    {errors.message && (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -6 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0 }}
                                                            className="text-xs text-red-400"
                                                        >
                                                            {errors.message}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                                <p className={`text-xs ml-auto ${form.message.length < 20 ? "text-slate-500" : "text-phause-cyan"}`}>
                                                    {form.message.length}/20 min
                                                </p>
                                            </div>
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={status === "sending"}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(0,216,201,0.35)] disabled:opacity-80"
                                        >
                                            {status === "sending" ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" /> Encrypting & Sending…
                                                </>
                                            ) : (
                                                <>
                                                    Send Enquiry <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </motion.button>

                                        <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-phause-cyan/60" />
                                            Your message is transmitted over TLS 1.3 and never shared with third parties.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════ OFFICE LOCATIONS + GOOGLE MAPS ══════════════════ */
type Office = {
    id: string;
    name: string;
    city: string;
    country: "USA" | "India";
    address: string;
    phone: string;
    email: string;
    hours: string;
    isHQ?: boolean;
    mapQuery: string;
};

const offices: Office[] = [
    {
        id: "sf", name: "Phause HQ", city: "San Francisco", country: "USA",
        address: "580 California Street, Floor 12, San Francisco, CA 94104",
        phone: "+1 (555) 010-7428", email: "hq@phause.com",
        hours: "Mon–Fri · 9:00 AM – 6:00 PM PT",
        isHQ: true, mapQuery: "580 California Street San Francisco CA",
    },
    {
        id: "nyc", name: "East Coast Office", city: "New York", country: "USA",
        address: "200 Park Avenue, Suite 1700, New York, NY 10166",
        phone: "+1 (555) 010-8910", email: "newyork@phause.com",
        hours: "Mon–Fri · 9:00 AM – 6:00 PM ET",
        mapQuery: "200 Park Avenue New York NY",
    },
    {
        id: "blr", name: "APAC Engineering Hub", city: "Bangalore", country: "India",
        address: "Prestige Towers, MG Road, Bangalore, Karnataka 560001",
        phone: "+91 80 4719 0100", email: "bangalore@phause.com",
        hours: "Mon–Fri · 9:30 AM – 6:30 PM IST",
        mapQuery: "Prestige Towers MG Road Bangalore",
    },
    {
        id: "bom", name: "India Sales Office", city: "Mumbai", country: "India",
        address: "One BKC, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
        phone: "+91 22 4890 2200", email: "mumbai@phause.com",
        hours: "Mon–Fri · 9:30 AM – 6:30 PM IST",
        mapQuery: "One BKC Bandra Kurla Complex Mumbai",
    },
];

function OfficeMap({ query }: { query: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-[420px] md:h-[480px] rounded-[2rem] overflow-hidden border border-phause-border"
        >
            <iframe
                title="Phause Office Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
                className="w-full h-full grayscale-[35%] contrast-[1.05]"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Phause marker overlay */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                className="absolute top-6 left-6 glass rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-[0_0_30px_rgba(0,216,201,0.2)]"
            >
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-phause-cyan opacity-75" />
                    <span className="relative rounded-full h-3 w-3 bg-phause-cyan" />
                </span>
                <span className="text-sm font-bold">Phause Office</span>
            </motion.div>
            <div className="absolute bottom-6 right-6 glass rounded-xl px-4 py-2 text-xs text-slate-300">
                <Navigation className="w-3.5 h-3.5 inline mr-1.5 text-phause-cyan" />
                Powered by Google Maps
            </div>
        </motion.div>
    );
}

function OfficeLocations() {
    const [country, setCountry] = useState<"USA" | "India">("USA");
    const [active, setActive] = useState<Office>(offices[0]);

    const filtered = offices.filter((o) => o.country === country);

    const selectOffice = (o: Office) => {
        setActive(o);
    };

    return (
        <section className="relative py-28 overflow-hidden">
            <div className="absolute right-0 top-40 w-[450px] h-[450px] rounded-full bg-cyan-500/8 blur-[140px]" />
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                    tag="Our Locations"
                    title={<>Find us across <span className="text-gradient">two continents</span></>}
                    subtitle="Headquartered in San Francisco with engineering and sales hubs across India."
                />

                {/* Country tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    {(["USA", "India"] as const).map((c) => (
                        <motion.button
                            key={c}
                            onClick={() => {
                                setCountry(c);
                                const first = offices.find((o) => o.country === c)!;
                                setActive(first);
                            }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 ${country === c
                                ? "bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark shadow-[0_0_30px_rgba(0,216,201,0.4)]"
                                : "glass text-slate-300 hover:border-phause-cyan/40"
                                }`}
                        >
                            <Globe className="w-4 h-4" /> {c === "USA" ? "🇺🇸 USA" : "🇮🇳 India"}
                        </motion.button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Office cards */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((o, i) => (
                                <motion.button
                                    key={o.id}
                                    layout
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ delay: i * 0.08 }}
                                    onClick={() => selectOffice(o)}
                                    whileHover={{ x: 6 }}
                                    className={`text-left glass rounded-3xl p-6 transition-all duration-300 relative overflow-hidden ${active.id === o.id
                                        ? "border-phause-cyan/60 shadow-[0_0_35px_rgba(0,216,201,0.15)]"
                                        : "hover:border-phause-cyan/40"
                                        }`}
                                >
                                    {active.id === o.id && (
                                        <motion.div
                                            layoutId="activeOffice"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-phause-cyan to-phause-teal"
                                        />
                                    )}
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <h3 className="font-bold">{o.name}</h3>
                                                {o.isHQ && (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-phause-cyan/15 text-phause-cyan border border-phause-cyan/30">
                                                        HQ
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-3">
                                                <MapPin className="w-3.5 h-3.5 text-phause-cyan shrink-0" /> {o.address}
                                            </p>
                                            <div className="space-y-1.5 text-xs text-slate-400">
                                                <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-phause-cyan/70" /> {o.phone}</p>
                                                <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-phause-cyan/70" /> {o.email}</p>
                                                <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-phause-cyan/70" /> {o.hours}</p>
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: active.id === o.id ? 0 : -45 }}
                                            className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${active.id === o.id
                                                ? "bg-gradient-to-br from-phause-cyan to-phause-teal text-phause-dark"
                                                : "bg-phause-cyan/10 text-phause-cyan"
                                                }`}
                                        >
                                            <Navigation className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-3 lg:sticky lg:top-28">
                        <AnimatePresence mode="wait">
                            <OfficeMap key={active.id} query={active.mapQuery} />
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════ EMERGENCY STRIP ══════════════════ */
function EmergencyStrip() {
    return (
        <section className="relative py-16">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2rem] overflow-hidden p-10 md:p-12"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-phause-cyan/10 to-transparent" />
                    <div className="absolute inset-0 glass" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-5">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1.6 }}
                                className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/40 flex items-center justify-center"
                            >
                                <Phone className="w-7 h-7 text-red-400" />
                            </motion.div>
                            <div>
                                <h3 className="text-2xl font-extrabold mb-1">
                                    Facing an <span className="text-red-400">active breach?</span>
                                </h3>
                                <p className="text-slate-400 text-sm max-w-md">
                                    Skip the form. Our incident response team answers the emergency
                                    line in under 60 seconds, 24/7/365.
                                </p>
                            </div>
                        </div>
                        <motion.a
                            href="tel:+15550107428"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="shrink-0 px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow-[0_0_40px_rgba(239,68,68,0.4)] flex items-center gap-2"
                        >
                            Call Emergency Line <ArrowRight className="w-5 h-5" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ══════════════════ CTA + FOOTER ══════════════════ */


/* ══════════════════ PAGE ══════════════════ */
export default function ContactPage() {
    return (
        <main className="bg-phause-dark text-white overflow-hidden">
            <PageHero />
            <EnquiryForm />
            <OfficeLocations />
            <EmergencyStrip />
        </main>
    );
}