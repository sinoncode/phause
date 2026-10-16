"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion, useScroll, useTransform, useInView,
} from "framer-motion";
import {
  Shield, ShieldCheck, Zap, Globe, Lock, Eye, Cloud, Code2, Users, Award,
  ArrowRight, ChevronDown, Star, Quote, Cpu, Target, HeartHandshake, Lightbulb,
  GitBranch, Rocket, TrendingUp, Building2, Handshake, Fingerprint, Layers,
  Workflow, CheckCircle2, Milestone, Flag,
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
          <Milestone className="w-4 h-4" /> Who We Are
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black leading-[1.05] mb-6"
        >
          The Team Behind the <span className="text-gradient">Shield</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
        >
          From a two-person research lab to a global cybersecurity force —
          this is the story, the mission, and the machine behind Phause.
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

/* ══════════════════ ABOUT US ══════════════════ */
function AboutUs() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-phause-cyan/8 blur-[150px]" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16 items-start">
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-phause-cyan/10 text-phause-cyan border border-phause-cyan/20 mb-5">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
            Born in a War Room. <br />
            Built for the <span className="text-gradient">Digital Battlefield.</span>
          </h2>

          <div className="space-y-6 text-slate-400 leading-relaxed text-[1.05rem]">
            <p>
              Phause was founded in 2018 by two security researchers who kept
              seeing the same pattern repeat itself: companies were spending
              millions on cybersecurity tools and still getting breached. Not
              because the tools were broken — but because the tools were
              fragmented, reactive, and blind to the way modern attacks
              actually unfold.
            </p>
            <p>
              So we asked a simple question: <em className="text-slate-200">what would security look like if it were designed today, from a blank sheet of paper?</em> The answer became the three pillars that still define everything we build at Phause — <strong className="text-phause-cyan">Strengthen, Aware, Defend</strong>.
            </p>
            <p>
              Today, Phause operates as a full-stack cybersecurity platform
              protecting more than 500 organizations across 40+ countries.
            </p>
            <p>
              Technically, Phause is built on a distributed detection mesh
              that ingests over 50 billion security events per month. Our
              machine learning pipeline identifies anomalous behavior
              across endpoints, networks, identities, APIs, and cloud
              workloads.
            </p>
            <p>
              We are also deeply committed to the broader security community.
              Our researchers have responsibly disclosed more than 120
              vulnerabilities to vendors and published open-source detection
              rules used by thousands of SOC teams worldwide.
            </p>
          </div>

          {/* Certification badges */}
          <div className="flex flex-wrap gap-4 mt-10">
            {["ISO 27001", "SOC 2 Type II", "GDPR", "HIPAA", "PCI DSS"].map(
              (badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="px-4 py-2 rounded-xl glass text-sm font-semibold text-phause-cyan cursor-default"
                >
                  {badge}
                </motion.span>
              )
            )}
          </div>
        </motion.div>

        {/* Visual column */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 space-y-6 lg:sticky lg:top-28"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-phause-cyan/15 blur-[80px]" />
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-phause-dark" />
              </div>
              <div>
                <p className="font-bold">Global Defense Grid</p>
                <p className="text-xs text-phause-cyan flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-phause-cyan opacity-75" />
                    <span className="relative rounded-full h-2 w-2 bg-phause-cyan" />
                  </span>
                  Operational — 40+ regions
                </p>
              </div>
            </div>
            {[
              { label: "Detection Coverage", val: 99.8 },
              { label: "Automated Containment", val: 97 },
              { label: "False Positive Rate", val: 99.2 },
              { label: "Analyst Satisfaction", val: 98 },
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Fingerprint, label: "Zero-Trust Native" },
              { icon: Layers, label: "Full-Stack Coverage" },
              { icon: GitBranch, label: "120+ CVE Disclosures" },
              { icon: Handshake, label: "Community First" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass rounded-2xl p-5 text-center hover:border-phause-cyan/40 transition-colors"
              >
                <item.icon className="w-6 h-6 text-phause-cyan mx-auto mb-2" />
                <p className="text-xs font-semibold">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════ WHAT WE DO ══════════════════ */
function WhatWeDo() {
  const items = [
    {
      icon: Shield,
      title: "Continuous Threat Detection & Hunting",
      desc: "Our detection mesh monitors every packet, process, API call, and identity event across your environment — on-premise, cloud, and hybrid. Using behavioral analytics rather than signature matching, we detect zero-days, living-off-the-land attacks, and insider threats that traditional tools miss.",
    },
    {
      icon: Zap,
      title: "Automated Incident Response",
      desc: "Speed is everything in a breach. When our engine detects a critical threat, it executes a pre-authorized response playbook in under 50 milliseconds — isolating hosts, revoking compromised credentials, blocking malicious IPs, and snapshotting affected systems for forensics.",
    },
    {
      icon: Cloud,
      title: "Cloud Security Posture Management",
      desc: "Misconfiguration is the number one cause of cloud breaches. Phause continuously audits your AWS, Azure, and GCP environments against 900+ CIS and vendor-specific benchmarks, detects drift from secure baselines, and remediates issues automatically where permitted.",
    },
    {
      icon: Code2,
      title: "Application & API Security Testing",
      desc: "We embed security into your software development lifecycle. Static and dynamic analysis runs on every commit, dependencies are scanned against known vulnerability databases, and our API fuzzing engine probes every endpoint for broken authentication and injection flaws.",
    },
    {
      icon: Users,
      title: "Security Operations Center (SOC) as a Service",
      desc: "Not every organization can run a 24/7 SOC. Ours is staffed by tiered analysts watching your telemetry around the clock. We integrate directly with your existing SIEM and EDR stack, or replace it entirely.",
    },
    {
      icon: Award,
      title: "Compliance & Governance Automation",
      desc: "SOC 2, ISO 27001, HIPAA, PCI DSS, GDPR — we automate up to 70% of the evidence collection and control-mapping work required for audits. Continuous control monitoring means you're audit-ready every day of the year.",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-phause-cyan/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="What We Do"
          title={<>Six disciplines. <span className="text-gradient">One platform.</span></>}
          subtitle="Everything below ships as part of a single unified deployment — no bolt-ons, no integration projects, no vendor finger-pointing."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, rotateX: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.15 }}
              whileHover={{ y: -12 }}
              className="group glass rounded-3xl p-8 relative overflow-hidden hover:border-phause-cyan/40 transition-colors"
            >
              <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-phause-cyan/10 blur-[60px] group-hover:bg-phause-cyan/25 transition-all duration-500" />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-phause-cyan/20 to-phause-teal/20 border border-phause-cyan/30 flex items-center justify-center mb-6"
              >
                <item.icon className="w-7 h-7 text-phause-cyan" />
              </motion.div>
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ COUNTERS ══════════════════ */
function StatCounter({
  val, suffix, label, icon: Icon, delay,
}: { val: number; suffix: string; label: string; icon: React.ElementType; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 2000;
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
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="glass rounded-3xl p-8 text-center relative overflow-hidden group hover:border-phause-cyan/40 transition-colors"
    >
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-phause-cyan/10 blur-[50px] group-hover:bg-phause-cyan/25 transition-all duration-500" />
      <Icon className="w-8 h-8 text-phause-cyan mx-auto mb-4 relative z-10" />
      <div className="text-4xl md:text-5xl font-black text-gradient relative z-10">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-slate-400 mt-3 relative z-10">{label}</div>
    </motion.div>
  );
}

function Counters() {
  return (
    <section className="relative py-24">
      <div className="absolute left-1/2 top-0 w-[700px] h-[400px] rounded-full bg-phause-teal/8 blur-[150px] -translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="By The Numbers"
          title={<>Proof, not <span className="text-gradient">promises</span></>}
          subtitle="Eight years of consistent, measurable delivery across the metrics that matter."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCounter icon={Building2} val={1250} suffix="+" label="Company Projects" delay={0} />
          <StatCounter icon={Handshake} val={500} suffix="+" label="Active Clients" delay={0.12} />
          <StatCounter icon={CheckCircle2} val={1180} suffix="+" label="Projects Delivered On Time" delay={0.24} />
          <StatCounter icon={Users} val={150} suffix="+" label="Security Experts" delay={0.36} />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-slate-500 mt-8"
        >
          Figures verified as of Q3 2026 across all Phause operating regions.
        </motion.p>
      </div>
    </section>
  );
}

/* ══════════════════ WHY CHOOSE US ══════════════════ */
function WhyChooseUs() {
  const reasons = [
    {
      icon: Zap,
      title: "Response Speed That Breaks Records",
      desc: "Our median time-to-containment is 47 milliseconds for automated playbooks and under 15 minutes for human-led incident response.",
    },
    {
      icon: Cpu,
      title: "AI Trained on Real-World Battle Data",
      desc: "Most security AI is trained on lab data and public datasets. Ours learns from the live, anonymized telemetry of 500+ organizations.",
    },
    {
      icon: Eye,
      title: "Radical Transparency — No Black Boxes",
      desc: "Every detection, every automated action, every analyst decision is visible to you in real time through our client dashboard.",
    },
    {
      icon: Lock,
      title: "Zero-Trust Architecture, Zero Excuses",
      desc: "We practice what we deploy. Phause's own internal infrastructure runs on zero-trust principles — least-privilege access, hardware-backed key management.",
    },
    {
      icon: HeartHandshake,
      title: "We Treat Your Business Like Our Own",
      desc: "Every Phause client gets a named security team, a direct escalation line to senior analysts, and a quarterly threat briefing tailored to their industry.",
    },
    {
      icon: TrendingUp,
      title: "Security That Scales With You",
      desc: "From a 10-person startup to a 50,000-employee enterprise, Phause deploys the same architecture and the same rigor.",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/8 blur-[140px]" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="Why Choose Us"
          title={<>Six reasons teams <span className="text-gradient">never leave</span></>}
          subtitle="We don't win clients with discounts. We keep them with outcomes."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
              whileHover={{ scale: 1.02 }}
              className="group flex gap-6 glass rounded-3xl p-8 hover:border-phause-cyan/40 hover:shadow-[0_0_40px_rgba(0,216,201,0.1)] transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center shadow-[0_0_25px_rgba(0,216,201,0.35)]"
              >
                <r.icon className="w-8 h-8 text-phause-dark" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-2.5">{r.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ OUR COMMITMENT ══════════════════ */
function OurCommitment() {
  const commitments = [
    {
      icon: Target,
      title: "To Our Clients",
      desc: "We commit to treating your security as if our own company depended on it — because reputationally, it does. That means honest risk assessments, transparent pricing with no surprise invoices, and a contractual SLA we have never breached.",
    },
    {
      icon: Users,
      title: "To Our Team",
      desc: "Security talent is rare, and burnout is the industry's silent epidemic. We commit to sustainable careers: no on-call rotations longer than one week per month, a mandatory 10% learning time budget for every engineer.",
    },
    {
      icon: Globe,
      title: "To the Security Community",
      desc: "We commit to making the internet safer for everyone, not just our paying clients. Our threat research is published openly. Our detection rules are released under permissive licenses.",
    },
    {
      icon: Lightbulb,
      title: "To the Future",
      desc: "We commit to anticipating the next decade of threats, not the last one. That means dedicated research into post-quantum cryptography, AI-driven attack vectors, and supply-chain compromise techniques.",
    },
  ];

  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="Our Commitment"
          title={<>Promises we put <span className="text-gradient">in writing</span></>}
          subtitle="Values on a slide deck mean nothing. Here's what we're contractually, culturally, and personally committed to."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
              whileHover={{ y: -8 }}
              className="relative glass rounded-3xl p-9 overflow-hidden hover:border-phause-cyan/40 transition-colors group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-phause-cyan to-phause-teal opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 mb-5">
                <div className="w-13 h-13 p-3.5 rounded-2xl bg-phause-cyan/10 border border-phause-cyan/20 group-hover:bg-phause-cyan/20 transition-colors">
                  <c.icon className="w-7 h-7 text-phause-cyan" />
                </div>
                <h3 className="text-xl font-bold">{c.title}</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
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
    { name: "Sarah Mitchell", role: "CTO, FinEdge Capital", text: "Phause blocked a coordinated ransomware attack in under 30 seconds. They didn't just save our data — they saved our company. Eight years into our relationship, they've never missed a single SLA.", stars: 5 },
    { name: "David Chen", role: "VP Engineering, CloudNine", text: "The smoothest security integration I've experienced in 15 years. Deployed across 200 servers in a single afternoon, zero downtime.", stars: 5 },
    { name: "Amara Okafor", role: "CISO, HealthFirst Group", text: "Their 24/7 team caught a data exfiltration attempt our previous vendor had missed for months. In healthcare, that's not an IT issue — it's a patient safety issue.", stars: 5 },
    { name: "James Rodriguez", role: "CEO, Nexa Retail", text: "We passed our SOC 2 audit on the first attempt thanks to Phause's compliance tooling. Best investment we've made.", stars: 5 },
    { name: "Priya Sharma", role: "Head of IT, Lumen Bank", text: "Employee training alone cut our phishing click rate from 18% to under 2%. The ROI is undeniable.", stars: 5 },
    { name: "Marcus Thorne", role: "Founder, DataForge AI", text: "As a startup we assumed enterprise-grade security was out of reach. Phause proved otherwise — same platform, same team, pricing that scaled with us.", stars: 5 },
  ];
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute right-1/4 top-0 w-[400px] h-[400px] rounded-full bg-phause-cyan/8 blur-[130px]" />
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <SectionHeading
          tag="Testimonials"
          title={<>Relationships measured <span className="text-gradient">in years</span></>}
          subtitle="Our average client tenure is 4.2 years. Here's why they stay."
        />
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-phause-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-phause-dark to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
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

/* ══════════════════ JOURNEY TIMELINE ══════════════════ */
function JourneyTimeline() {
  const milestones = [
    { year: "2018", title: "The Garage Era", icon: Flag, desc: "Two security researchers, one whiteboard, and a rented garage in San Francisco. Phause begins as a weekend project: a lightweight agent that could detect lateral movement inside corporate networks." },
    { year: "2019", title: "First Enterprise Clients & Seed Funding", icon: Rocket, desc: "Phause officially incorporates and closes a $4M seed round. We sign our first 10 enterprise clients and grow the team to 15 engineers." },
    { year: "2020", title: "The Pandemic Stress Test", icon: Shield, desc: "As the world goes remote, attack surfaces explode. We scale from 50 to 200 clients in nine months while handling a 600% spike in ransomware campaigns. Zero client breaches." },
    { year: "2021", title: "Series A & the AI Breakthrough", icon: Cpu, desc: "We raise a $28M Series A and ship Phause Sense, our behavioral ML engine. Detection accuracy jumps 40% while false positives drop by two-thirds." },
    { year: "2022", title: "SOC 2 Type II & Global Expansion", icon: Award, desc: "SOC 2 Type II certification achieved with zero exceptions. We cross 300 enterprise clients and expand into APAC with a Singapore data region." },
    { year: "2023", title: "The Compliance Automation Launch", icon: Layers, desc: "Phause Comply ships, automating evidence collection for SOC 2, ISO 27001, HIPAA, and PCI DSS. Client audit preparation time drops from months to days." },
    { year: "2024", title: "Series B & the 24/7 SOC", icon: Eye, desc: "A $75M Series B funds the launch of our fully managed SOC-as-a-Service with tiered human analysts in three continents." },
    { year: "2025", title: "Zero-Trust Platform Unification", icon: Workflow, desc: "We collapse six products into one unified zero-trust platform under a single agent and a single dashboard. Average client deployment time falls to under 3 hours." },
    { year: "2026", title: "Today — and What's Next", icon: Globe, desc: "500+ clients, 40+ countries, 150+ security experts, and 1,250+ projects delivered. Our quantum-readiness lab is already testing post-quantum encryption migration paths." },
  ];

  const [activeYear, setActiveYear] = useState(0);

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute left-1/2 top-0 w-[600px] h-[500px] rounded-full bg-phause-teal/8 blur-[160px] -translate-x-1/2" />
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          tag="Our Journey So Far"
          title={<>Eight years. <span className="text-gradient">One obsession.</span></>}
          subtitle="From a rented garage to a global defense grid — every chapter written with our clients."
        />

        {/* Year selector pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {milestones.map((m, i) => (
            <motion.button
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setActiveYear(i)}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeYear === i
                  ? "bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark shadow-[0_0_25px_rgba(0,216,201,0.45)]"
                  : "glass text-slate-300 hover:border-phause-cyan/40"
              }`}
            >
              {m.year}
            </motion.button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-phause-cyan/60 via-phause-cyan/20 to-transparent" />
          <div className="space-y-16">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start ${
                  i % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Node */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-phause-cyan to-phause-teal flex items-center justify-center shadow-[0_0_30px_rgba(0,216,201,0.45)] z-10 cursor-pointer"
                  onClick={() => setActiveYear(i)}
                >
                  <m.icon className="w-6 h-6 text-phause-dark" />
                </motion.div>

                {/* Card */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-3.5rem)] ${
                    i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    onClick={() => setActiveYear(i)}
                    className={`glass rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
                      activeYear === i
                        ? "border-phause-cyan/60 shadow-[0_0_40px_rgba(0,216,201,0.15)]"
                        : "hover:border-phause-cyan/40"
                    }`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-phause-cyan/10 text-phause-cyan border border-phause-cyan/20 mb-3">
                      {m.year}
                    </span>
                    <h3 className="text-xl font-bold mb-3">{m.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{m.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
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
              The next chapter could be <span className="text-gradient">yours</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              Join 500+ organizations who trust Phause with their most valuable asset — trust itself.
            </p>
            <motion.a
              href="/#register"
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
export default function AboutPage() {
  return (
    <>
      <PageHero />
      <AboutUs />
      <WhatWeDo />
      <Counters />
      <WhyChooseUs />
      <OurCommitment />
      <Testimonials />
      <JourneyTimeline />
      <CTABanner />
    </>
  );
}
