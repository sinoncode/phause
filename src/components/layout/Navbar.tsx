"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo/phause-logo.png";
import { NAV_LINKS, ROUTES } from "@/lib/routes";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3 shadow-[0_8px_40px_rgba(0,216,201,0.08)]" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href={ROUTES.home} className="flex items-center gap-3">
            <Image src={Logo} alt="Phause Logo" className="w-full h-20" priority />
          </Link>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -2 }}
              className="relative"
            >
              <Link
                href={link.href}
                className="relative text-sm font-medium text-slate-300 hover:text-phause-cyan transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-phause-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}

          {/* Login Button */}
          <motion.a
            href="#login"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-full text-sm font-semibold border border-phause-cyan/40 text-phause-cyan hover:bg-phause-cyan/10 hover:shadow-[0_0_20px_rgba(0,216,201,0.35)] transition-all duration-300"
          >
            Login
          </motion.a>

          {/* Register Button */}
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={ROUTES.registration}
              className="relative flex items-center gap-1.5 overflow-hidden rounded-full px-6 py-2.5 text-sm font-bold text-phause-dark group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-phause-cyan via-cyan-400 to-phause-teal bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[position:100%_0]" />
              <span className="relative flex items-center gap-1.5">
                Register <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-phause-cyan p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass mt-3 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-200 font-medium hover:text-phause-cyan transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 pt-3 border-t border-phause-border">
                <a
                  href="#login"
                  className="flex-1 text-center py-2.5 rounded-full border border-phause-cyan/40 text-phause-cyan font-semibold"
                >
                  Login
                </a>
                <Link
                  href={ROUTES.registration}
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-full bg-gradient-to-r from-phause-cyan to-phause-teal text-phause-dark font-bold"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
