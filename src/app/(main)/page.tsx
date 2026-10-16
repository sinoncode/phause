"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion, useScroll, useTransform, AnimatePresence, useInView,
} from "framer-motion";
import {
  Shield, ShieldCheck, Zap, Globe, Lock, Eye, Radar, Server,
  Cloud, Code2, Users, Award, ArrowRight, ChevronDown,
  CheckCircle2, Star, Quote, Cpu, Workflow, Rocket,
} from "lucide-react";

/* ══════════════════ ANIMATED BACKGROUND ══════════════════ */
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
  const particles = Array.from({ length: 30 });
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
}: { tag: string; title: React.ReactNode; subtitle: string }) {
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
        className="text-3xl md:text-5xl font-extrabold mb-4"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 text-lg"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

/* ══════════════════ HERO ══════════════════ */
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 120]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <GridBackground />
      <ParticleField />

      {/* Rotating ring decoration */}
      <motion.div style={{ y: y2 }} className="absolute top-1/4 right-[10%] hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 rounded-full border border-phause-cyan/15 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full border border-cyan-500/20"
        />
      </motion.div>

      <motion.div style={{ y: y1 }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sm text-phause-cyan mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phause-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-phause-cyan" />
          </span>
          Trusted by 500+ companies worldwide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6"
        >
          Strengthen. <span className="text-gradient">Aware.</span>
          <br />
          <span className="relative inline-block">
            Defend.
            <motion.svg
              className="absolute -bottom-3 left-0 w-full"
              viewBox="0 0 300 14"
              fill="none"
            >
              <motion.path
                d="M4 10 Q 150 -6 296 8"
                stroke="#00d8c9"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
        >
          Next-generation cybersecurity platform that detects, analyzes and
          neutralizes threats before they ever reach your infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <motion.a
            href="#services"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark font-bold text-base overflow-hidden shadow-[0_0_40px_rgba(0,216,201,0.4)]"
          >
            <span className="flex items-center gap-2">
              Get Protected Now
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </motion.a>
          <motion.a
            href="#about-us"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full glass font-semibold text-base hover:border-phause-cyan/50 transition-colors flex items-center gap-2"
          >
            <Eye className="w-5 h-5 text-phause-cyan" /> Explore Platform
          </motion.a>
        </motion.div>

        {/* Floating stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-10 max-w-2xl mx-auto mt-20">
          {[
            { icon: Shield, val: "99.9%", label: "Threat Block Rate" },
            { icon: Radar, val: "24/7", label: "Active Monitoring" },
            { icon: Zap, val: "<50ms", label: "Response Time" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="glass rounded-2xl p-5 hover:border-phause-cyan/40 transition-colors"
            >
              <s.icon className="w-6 h-6 text-phause-cyan mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-black text-gradient">{s.val}</div>
              <div className="text-xs md:text-sm text-slate-400 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about-us"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8 text-phause-cyan/60" />
      </motion.a>
    </section>
  );
}

/* ══════════════════ ABOUT ══════════════════ */
function About() {
  return (
    <section id="about-us" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-phause-cyan/8 blur-[150px]" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-phause-cyan/10 text-phause-cyan border border-phause-cyan/20 mb-5">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            We Build Digital Fortresses for the <span className="text-gradient">Modern Enterprise</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            Founded by security researchers and ethical hackers, Phause exists for one reason:
            to make the digital world a safer place. We combine AI-driven threat intelligence
            with human expertise to protect what matters most — your data, your reputation,
            and your future.
          </p>
          <p className="text-slate-400 leading-relaxed mb-8">
            From startups to Fortune 500 companies, our mission stays the same: stay ahead of
            every threat, every time.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Award, text: "ISO 27001 Certified" },
              { icon: Users, text: "150+ Security Experts" },
              { icon: Globe, text: "40+ Countries Served" },
              { icon: Cpu, text: "AI-Powered Defense" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3"
              >
                <item.icon className="w-5 h-5 text-phause-cyan shrink-0" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-phause-cyan/15 blur-[80px]" />
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-phause-border">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-phause-dark" />
              </div>
              <div>
                <p className="font-bold">Live Threat Dashboard</p>
                <p className="text-xs text-phause-cyan flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-phause-cyan opacity-75" />
                    <span className="relative rounded-full h-2 w-2 bg-phause-cyan" />
                  </span>
                  All systems protected
                </p>
              </div>
            </div>
            {[
              { label: "Firewall Integrity", val: 100 },
              { label: "Intrusion Prevention", val: 98 },
              { label: "Data Encryption", val: 100 },
              { label: "Endpoint Defense", val: 96 },
            ].map((row, i) => (
              <div key={row.label} className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">{row.label}</span>
                  <span className="text-phause-cyan font-bold">{row.val}%</span>
                </div>
                <div className="h-2 rounded-full bg-phause-border overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-phause-cyan to-cyan-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════ COMPANY PHILOSOPHY ══════════════════ */
function Philosophy() {
  const cards = [
    {
      icon: Shield,
      title: "Proactive Defense",
      desc: "We don't wait for attacks. We hunt threats before they strike, turning vulnerability into strength.",
    },
    {
      icon: Eye,
      title: "Radical Transparency",
      desc: "Real-time visibility into every security event. No hidden logs, no surprises — complete clarity.",
    },
    {
      icon: Lock,
      title: "Privacy by Design",
      desc: "Your data is sacred. We build every system with encryption and privacy as the foundation, not an afterthought.",
    },
  ];
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-phause-cyan/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="Our Philosophy"
          title={<>Security is not a product. <br /> It's a <span className="text-gradient">mindset.</span></>}
          subtitle="Three core principles guide everything we build, ship, and defend."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -12, transition: { duration: 0.2 } }}
              className="group glass rounded-3xl p-8 relative overflow-hidden hover:border-phause-cyan/40 transition-colors"
            >
              <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-phause-cyan/10 blur-[60px] group-hover:bg-phause-cyan/25 transition-all duration-500" />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-phause-cyan/20 to-phause-teal/20 border border-phause-cyan/30 flex items-center justify-center mb-6"
              >
                <card.icon className="w-7 h-7 text-phause-cyan" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ WHY CHOOSE US ══════════════════ */
function WhyChooseUs() {
  const reasons = [
    { icon: Zap, title: "Lightning-Fast Response", desc: "Sub-50ms automated threat neutralization — the fastest in the industry." },
    { icon: Cpu, title: "AI-Powered Engine", desc: "Machine learning models trained on 50B+ security events, updated hourly." },
    { icon: Users, title: "Human Experts 24/7", desc: "Elite security analysts watching over your infrastructure around the clock." },
    { icon: Code2, title: "Zero-Downtime Deployment", desc: "Deploy protection without touching a single line of your existing code." },
  ];
  return (
    <section className="relative py-28">
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[130px]" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="Why Choose Us"
          title={<>Why the world's best teams <span className="text-gradient">choose Phause</span></>}
          subtitle="Numbers don't lie. Here's what sets us apart from every other security vendor."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex gap-6 glass rounded-3xl p-8 hover:border-phause-cyan/40 hover:shadow-[0_0_40px_rgba(0,216,201,0.1)] transition-all duration-300 group"
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center shadow-[0_0_25px_rgba(0,216,201,0.35)] group-hover:rotate-6 transition-transform">
                <r.icon className="w-8 h-8 text-phause-dark" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{r.title}</h3>
                <p className="text-slate-400 leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { val: 500, suffix: "+", label: "Happy Clients" },
            { val: 12, suffix: "M+", label: "Threats Blocked" },
            { val: 99, suffix: "%", label: "Uptime SLA" },
            { val: 8, suffix: "yrs", label: "In Business" },
          ].map((c, i) => (
            <CounterCard key={c.label} {...c} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterCard({
  val, suffix, label, delay,
}: { val: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1800;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setCount(Math.floor(p * val));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, val]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="glass rounded-2xl p-6 text-center hover:border-phause-cyan/40 transition-colors"
    >
      <div className="text-4xl font-black text-gradient">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-slate-400 mt-2">{label}</div>
    </motion.div>
  );
}

/* ══════════════════ SERVICES ══════════════════ */
function Services() {
  const services = [
    { icon: Radar, title: "Threat Detection", desc: "Real-time AI scanning across all endpoints, networks and cloud assets." },
    { icon: ShieldCheck, title: "Security Audits", desc: "Deep-dive penetration testing and compliance audits by certified experts." },
    { icon: Cloud, title: "Cloud Protection", desc: "Zero-trust security architecture for AWS, Azure, GCP and hybrid clouds." },
    { icon: Server, title: "Infrastructure Defense", desc: "Harden your servers, APIs and databases against zero-day exploits." },
    { icon: Lock, title: "Data Encryption", desc: "End-to-end AES-256 encryption with automated key rotation." },
    { icon: Eye, title: "SIEM Monitoring", desc: "Centralized log intelligence with instant anomaly alerting." },
  ];
  return (
    <section id="services" className="relative py-28 overflow-hidden">
      <div className="absolute left-0 top-1/2 w-[450px] h-[450px] rounded-full bg-phause-teal/10 blur-[140px]" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="Our Services"
          title={<>Complete security, <span className="text-gradient">end to end</span></>}
          subtitle="Every layer of your stack covered — from infrastructure to the last byte of data."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
              whileHover={{ y: -10 }}
              className="group relative glass rounded-3xl p-8 overflow-hidden hover:border-phause-cyan/50 transition-colors cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-phause-cyan/0 to-phause-cyan/0 group-hover:from-phause-cyan/5 group-hover:to-transparent transition-all duration-500" />
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-phause-cyan/10 border border-phause-cyan/20 inline-flex mb-6 group-hover:bg-phause-cyan/20 transition-colors">
                <s.icon className="w-7 h-7 text-phause-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-slate-400 mb-5 leading-relaxed">{s.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-phause-cyan opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ WHAT WE OFFER ══════════════════ */
function WhatWeOffer() {
  const offers = [
    { title: "Free Security Assessment", desc: "A 360° audit of your infrastructure — completely free, no strings attached." },
    { title: "Dedicated Security Team", desc: "Your own squad of specialists assigned exclusively to your account." },
    { title: "Compliance Made Easy", desc: "GDPR, HIPAA, SOC 2 and ISO — we handle the paperwork, you stay compliant." },
    { title: "Incident Response SLA", desc: "Guaranteed response to critical incidents in under 15 minutes." },
    { title: "Employee Training", desc: "Phishing simulations and security workshops for your entire team." },
    { title: "Insurance Backed", desc: "$10M cyber insurance coverage included with every enterprise plan." },
  ];
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="What We Offer"
          title={<>More than protection — <span className="text-gradient">total peace of mind</span></>}
          subtitle="Everything included in every plan, because security shouldn't be an upsell."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex gap-4 p-6 rounded-2xl border border-phause-border bg-phause-card/50 hover:border-phause-cyan/40 transition-colors"
            >
              <CheckCircle2 className="w-6 h-6 text-phause-cyan shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1.5">{o.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ WORKING PROCESS ══════════════════ */
function WorkingProcess() {
  const steps = [
    { icon: Eye, title: "Discover", desc: "We map every asset, vulnerability and attack surface in your environment." },
    { icon: Workflow, title: "Strategize", desc: "A custom defense blueprint built for your architecture and risk profile." },
    { icon: Shield, title: "Deploy", desc: "Protection rolls out in hours — no downtime, no disruption to your team." },
    { icon: Rocket, title: "Evolve", desc: "Continuous learning and adaptation keeps you ahead of emerging threats." },
  ];
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-phause-cyan/20 to-transparent hidden lg:block" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="Working Process"
          title={<>From vulnerable to <span className="text-gradient">bulletproof</span> in 4 steps</>}
          subtitle="A battle-tested methodology refined over thousands of deployments."
        />
        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative text-center"
            >
              {/* Connector */}
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-10 left-[calc(50%+50px)] w-[calc(100%-100px)] h-[2px] bg-gradient-to-r from-phause-cyan to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 + 0.3 }}
                  style={{ originX: 0 }}
                />
              )}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center mb-6 shadow-[0_0_35px_rgba(0,216,201,0.4)] relative z-10"
              >
                <s.icon className="w-9 h-9 text-phause-dark" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-phause-dark border border-phause-cyan text-phause-cyan text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </motion.div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ TESTIMONIALS ══════════════════ */
function Testimonials() {
  const testimonials = [
    { name: "Sarah Mitchell", role: "CTO, FinEdge Capital", text: "Phause blocked a coordinated ransomware attack in under 30 seconds. They didn't just save our data — they saved our company.", stars: 5 },
    { name: "David Chen", role: "VP Engineering, CloudNine", text: "The smoothest security integration I've experienced in 15 years. Deployed across 200 servers in a single afternoon, zero downtime.", stars: 5 },
    { name: "Amara Okafor", role: "CISO, HealthFirst Group", text: "Their 24/7 team caught a data exfiltration attempt our previous vendor had missed for months. Unmatched expertise.", stars: 5 },
    { name: "James Rodriguez", role: "CEO, Nexa Retail", text: "We passed our SOC 2 audit on the first attempt thanks to Phause's compliance tooling. Best investment we've made.", stars: 5 },
    { name: "Priya Sharma", role: "Head of IT, Lumen Bank", text: "Employee training alone cut our phishing click rate from 18% to under 2%. The ROI is undeniable.", stars: 5 },
  ];

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute right-1/4 top-0 w-[400px] h-[400px] rounded-full bg-phause-cyan/8 blur-[130px]" />
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <SectionHeading
          tag="Testimonials"
          title={<>Loved by security teams <span className="text-gradient">everywhere</span></>}
          subtitle="Don't take our word for it — hear it from the people we protect every day."
        />
      </div>
      {/* Infinite marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-phause-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-phause-dark to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((t, i) => (
            <div
              key={i}
              className="w-[380px] shrink-0 glass rounded-3xl p-8 hover:border-phause-cyan/40 transition-colors"
            >
              <Quote className="w-8 h-8 text-phause-cyan/40 mb-4" />
              <p className="text-slate-300 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-phause-cyan" fill="currentColor" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center font-bold text-phause-dark">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════ FAQ ══════════════════ */
function FAQ() {
  const faqs = [
    { q: "How long does implementation take?", a: "Most clients are fully protected within 2–4 hours. Our agent deploys automatically across cloud and on-premise environments with zero downtime." },
    { q: "Do you support hybrid and multi-cloud setups?", a: "Yes. Phause natively supports AWS, Azure, GCP, on-premise data centers, and any combination of them through a single unified dashboard." },
    { q: "What happens during a security breach?", a: "Our automated response engine isolates affected systems in under 50ms, while our 24/7 incident response team takes over containment, remediation, and forensic analysis." },
    { q: "Is there a free trial?", a: "Absolutely. Every plan starts with a 14-day free trial including a full security assessment, plus our free audit for new customers." },
    { q: "How is my data handled?", a: "All data is encrypted with AES-256 in transit and at rest. We're GDPR, SOC 2 Type II, and ISO 27001 compliant, and we never sell or share your data." },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative py-28">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          tag="FAQ"
          title={<>Questions? <span className="text-gradient">We've got answers</span></>}
          subtitle="Everything you need to know before getting started with Phause."
        />
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass rounded-2xl overflow-hidden transition-colors ${openIdx === i ? "border-phause-cyan/40" : ""}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold pr-4">{f.q}</span>
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 shrink-0 rounded-full bg-phause-cyan/10 flex items-center justify-center"
                >
                  <ChevronDown className="w-5 h-5 text-phause-cyan" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="px-6 pb-6 text-slate-400 leading-relaxed">{f.a}</p>
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

/* ══════════════════ CTA BANNER ══════════════════ */
function CTABanner() {
  return (
    <section className="relative py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-phause-cyan/20 via-phause-teal/10 to-transparent" />
          <div className="absolute inset-0 glass" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
              Ready to become <span className="text-gradient">unhackable?</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              Join 500+ companies that sleep soundly at night. Start your free
              security assessment today.
            </p>
            <motion.a
              href="#register"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark font-bold text-lg shadow-[0_0_50px_rgba(0,216,201,0.5)]"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════ PAGE ══════════════════ */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Philosophy />
      <WhyChooseUs />
      <Services />
      <WhatWeOffer />
      <WorkingProcess />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
