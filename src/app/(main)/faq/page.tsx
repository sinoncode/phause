"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";
import SubscriptionModal from "../subscription/SubscriptionModal";

const faqs = [
  {
    question: "Can I switch plans after subscribing?",
    answer:
      "Absolutely. Upgrades take effect instantly and are prorated to the day. Downgrades apply at the start of your next billing cycle, and your historical data is always preserved according to the higher plan's retention window.",
  },
  {
    question: "What happens after my 14-day trial ends?",
    answer:
      "On day 15 we ask for a payment method. If you don't add one, your account gracefully downgrades to Sentinel Free — no data deletion, no service interruption, no awkward sales calls.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "Monthly plans are month-to-month with zero lock-in. Yearly plans are paid upfront with a 20% discount, and you can request a prorated refund within the first 60 days if Phause isn't a fit.",
  },
  {
    question: "How is per-endpoint pricing counted?",
    answer:
      "An endpoint is any device, server, container, or cloud workload running the Phause agent. Ephemeral workloads like CI runners are averaged over the month so burst builds don't inflate your bill.",
  },
  {
    question: "Do you offer discounts for nonprofits or education?",
    answer:
      "Yes. Registered nonprofits, educational institutions, and open-source projects receive 50% off any paid tier, forever. Reach out to our community team to apply.",
  },
  {
    question: "What makes Sentinel Sovereign different?",
    answer:
      "Sovereign is a fully air-gapped deployment of the entire Phause platform — it runs entirely inside your perimeter with zero external telemetry. It includes our post-quantum cryptography migration lab and a dedicated on-site incident response retainer.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-phause-cyan text-sm font-semibold uppercase tracking-widest">
            FAQ
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold">
            Questions, <span className="text-gradient">answered</span>
          </h1>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Everything teams usually ask before they put Phause between them and
            the attackers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            const answerId = `faq-answer-${index}`;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`glass rounded-2xl overflow-hidden transition-colors ${
                  isOpen
                    ? "border-phause-cyan/40"
                    : "hover:border-phause-cyan/25"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-bold text-slate-200 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-phause-cyan shrink-0" />
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-phause-cyan" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 pl-14 text-sm text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      <RequestDemo />
        <FinalCTA />
    </section>
  );
}



/* ══════════════════ REQUEST A DEMO ══════════════════ */

function RequestDemo() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const benefits = [
        "See Phause in action",
        "Explore the right plan for your team",
        "Get answers from security experts",
    ]

    return (
        <>
            <section
                id="request-demo"
                className="relative py-20 md:py-28 overflow-hidden"
            >
                {/* Subtle background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-phause-cyan/[0.07] blur-[140px]" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-phause-cyan/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-phause-teal/20 to-transparent" />
                </div>

                <div className="relative max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="relative rounded-[2rem] border border-phause-cyan/20 bg-slate-950/60 p-8 sm:p-10 md:p-14 overflow-hidden"
                    >
                        {/* Decorative accent */}
                        <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-phause-cyan/60 to-transparent" />

                        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 md:gap-14 items-center">

                            {/* Left content */}
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-phause-cyan/20 bg-phause-cyan/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-phause-cyan mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-phause-cyan" />
                                    Personalized Demo
                                </span>

                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-5">
                                    See smarter security
                                    <br className="hidden sm:block" />
                                    <span className="text-gradient">
                                        in action.
                                    </span>
                                </h2>

                                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mb-8">
                                    Discover how Phause can help your team
                                    detect threats, simplify security operations,
                                    and choose the right protection for your needs.
                                </p>

                                {/* Request Demo Button */}
                                <motion.button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-phause-cyan to-phause-teal px-7 py-4 font-bold text-phause-dark shadow-[0_8px_30px_rgba(0,216,201,0.15)] hover:shadow-[0_10px_35px_rgba(0,216,201,0.28)] transition-shadow duration-300"
                                >
                                    Request Your Demo
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </motion.button>

                                <p className="text-xs text-slate-500 mt-4">
                                    Let's find the right security solution for your team.
                                </p>
                            </div>

                            {/* Right benefits panel */}
                            <motion.div
                                initial={{ opacity: 0, x: 18 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8"
                            >
                                <div className="flex items-center gap-3 mb-7">
                                    <div className="w-11 h-11 rounded-xl bg-phause-cyan/10 border border-phause-cyan/15 flex items-center justify-center">
                                        <ShieldCheck className="w-6 h-6 text-phause-cyan" />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            Your demo, your priorities
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Focused on what matters to you
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {benefits.map((benefit, index) => (
                                        <motion.div
                                            key={benefit}
                                            initial={{ opacity: 0, x: 12 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.2 + index * 0.1,
                                            }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-phause-cyan/10 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-phause-cyan" />
                                            </span>

                                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                                                {benefit}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Not sure which plan fits?
                                        <span className="text-phause-cyan">
                                            {" "}We'll help you explore your options.
                                        </span>
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Request Demo Modal */}
            <SubscriptionModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
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

