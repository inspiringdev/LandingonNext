"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Coffee, Camera, MessageCircle, Send, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const socials = [
  { Icon: Camera, label: "Instagram", href: "#" },
  { Icon: MessageCircle, label: "Twitter", href: "#" },
  { Icon: Send, label: "Pinterest", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer id="footer" style={{ backgroundColor: "#1C1917" }}>
      {/* ── Newsletter Band ── */}
      <div
        className="relative overflow-hidden border-y"
        style={{ borderColor: "rgba(250,247,242,0.07)" }}
      >
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: "radial-gradient(ellipse, #D97706 0%, transparent 70%)" }} />

        <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Join the Aura Club
            </span>
            <h3
              className="font-display text-4xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F2" }}
            >
              Rare roasts.<br />First access. Always free.
            </h3>
            <p className="text-stone-400 mb-8 text-base">
              New single-origins, brewing guides, and member-only drops —
              straight to your inbox, never your spam folder.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 py-4 px-8 rounded-full border"
                style={{ borderColor: "#4F7942", backgroundColor: "rgba(79,121,66,0.1)" }}
              >
                <span className="text-lg">✓</span>
                <span className="text-matcha font-semibold" style={{ color: "#6B9E5E" }}>
                  You're in! Check your inbox.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-full text-oat placeholder-stone-500 text-sm outline-none focus:ring-2 ring-amber-500/50 transition-all"
                  style={{
                    backgroundColor: "rgba(250,247,242,0.06)",
                    border: "1px solid rgba(250,247,242,0.1)",
                    color: "#FAF7F2",
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-full font-semibold text-sm text-espresso bg-amber-500 hover:bg-amber-400 transition-colors flex-shrink-0"
                  style={{ color: "#1C1917" }}
                >
                  Subscribe
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <Coffee className="w-7 h-7 text-amber-400" strokeWidth={1.5} />
              <span
                className="font-display text-xl font-bold text-oat tracking-wide"
                style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F2" }}
              >
                Aura<span className="text-amber-400">.</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
              Small-batch, single-origin roasts crafted with intention.
              We believe coffee should be as memorable as the moment you drink it.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-8">
              {[
                { Icon: MapPin, text: "FECHS, O9, ISB" },
                { Icon: Phone, text: "(+92) 341-11954" },
                { Icon: Mail, text: "ubaid.butt5613@gmail.com" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-stone-400 text-sm">
                  <Icon className="w-4 h-4 text-amber-500/60 flex-shrink-0" strokeWidth={1.5} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -4, color: "#D97706" }} // Subtle upward nudge on hover
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-stone-400 transition-colors"
                  style={{ border: "1px solid rgba(250,247,242,0.1)" }}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links], colIdx) => (
            <div key={heading}>
              <h4
                className="text-oat font-semibold text-sm mb-5 tracking-widest uppercase"
                style={{ color: "#FAF7F2", letterSpacing: "0.12em" }}
              >
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: colIdx * 0.05 + i * 0.04, duration: 0.4 }}
                  >
                    <a
                      href="#"
                      className="group flex items-center gap-1 text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300"
                    >
                      {link}
                      <ArrowUpRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        strokeWidth={1.5}
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(250,247,242,0.06)" }}
        >
          <p className="text-stone-600 text-xs">
            © 2024 Aura Roasters LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Accessibility"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-stone-600 hover:text-stone-400 text-xs transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinks = {
  Menu: ["Espresso Bar", "Pour Overs", "Pastries", "Seasonal Specials", "Merchandise"],
  Company: ["Our Story", "Sourcing", "Sustainability", "Careers", "Press"],
  "Find Us": ["Islamabad — Kohsar", "Lahore — Gulberg", "Karachi — Bukhari", "Islamabad — Beverly Centre"]
};
