"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo/phause-logo.png";
import { FacebookIcon } from "@/components/icons/lucide-facebook";
import { InstagramIcon } from "@/components/icons/lucide-instagram";
import { LinkedinIcon } from "@/components/icons/lucide-linkedin";
import { NAV_LINKS, FOOTER_SERVICES } from "@/lib/routes";

const SOCIALS = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer id="contact-us" className="relative overflow-hidden pt-24 pb-10">
      {/* Animated wave decoration */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-20 opacity-30">
          <motion.path
            d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50"
            fill="none"
            stroke="#00d8c9"
            strokeWidth="2"
            animate={{
              d: [
                "M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50",
                "M0,50 C240,0 480,100 720,50 C960,0 1200,100 1440,50",
                "M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full bg-phause-cyan/8 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image src={Logo} alt="Phause Logo" className="w-full h-20" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Strengthen. Aware. Defend. Enterprise-grade cybersecurity for the modern world.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-phause-cyan hover:border-phause-cyan/50 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <h4 className="font-bold mb-5 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <motion.div whileHover={{ x: 6 }}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-phause-cyan transition-colors inline-flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-phause-cyan/50" />
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-bold mb-5 text-lg">Services</h4>
            <ul className="space-y-3">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.label}>
                  <motion.div whileHover={{ x: 6 }}>
                    <Link
                      href={s.href}
                      className="text-slate-400 text-sm hover:text-phause-cyan transition-colors inline-flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-phause-cyan/50" />
                      {s.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="font-bold mb-5 text-lg">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4">
              Get the latest threat intelligence and security tips.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-phause-cyan" /> hello@phause.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-phause-cyan" /> +1 (555) 010-PHAUSE
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-phause-cyan" /> San Francisco, CA
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-phause-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} Phause. All rights reserved. Strengthen. Aware. Defend.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-phause-cyan transition-colors">
              Privacy Policy
            </motion.a>
            <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-phause-cyan transition-colors">
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
