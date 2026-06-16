"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Coffee } from "lucide-react";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Locations", href: "#footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(2);
  const { scrollY } = useScroll();

  // Switch to glass style after 60px of scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <>
      <motion.header
        // Animate between transparent and glass based on scroll
        animate={{
          backgroundColor: scrolled ? "rgba(28, 25, 23, 0.82)" : "rgba(28, 25, 23, 0)",
          borderColor: scrolled ? "rgba(250, 247, 242, 0.08)" : "rgba(250, 247, 242, 0)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between"
          style={{ height: scrolled ? "64px" : "80px", transition: "height 0.4s ease" }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-amber-500 opacity-20 group-hover:opacity-40 transition-opacity blur-md" />
              <Coffee className="w-8 h-8 text-amber-400 relative z-10" strokeWidth={1.5} />
            </div>
            <span
              className="font-display text-xl font-bold tracking-wide text-oat"
              style={{ fontFamily: "var(--font-playfair)", letterSpacing: "0.05em" }}
            >
              Aura<span className="text-amber-400">.</span>
            </span>
          </motion.a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
              >
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors duration-300 group tracking-wide"
                  style={{ letterSpacing: "0.06em" }}
                >
                  {link.label}
                  {/* Underline animation */}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Right: Cart + Mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-stone-300 hover:text-amber-400 transition-colors duration-300"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-500 text-espresso text-[10px] font-bold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* CTA (desktop) */}
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest text-espresso bg-amber-500 hover:bg-amber-400 transition-colors duration-300"
              style={{ letterSpacing: "0.1em" }}
            >
              ORDER NOW
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-stone-300 hover:text-amber-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed inset-0 z-40 flex flex-col bg-espresso pt-24 px-8"
          >
            <nav className="flex flex-col gap-8 mt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-4xl font-display font-bold text-oat hover:text-amber-400 transition-colors"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#menu"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-auto mb-16 flex items-center justify-center py-4 rounded-full bg-amber-500 text-espresso font-semibold text-lg tracking-widest"
              style={{ letterSpacing: "0.1em" }}
            >
              ORDER NOW
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
