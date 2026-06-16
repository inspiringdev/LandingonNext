"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

// ─── Magnetic Button ───────────────────────────────────────────────────────────
// Tracks cursor proximity and pulls the button toward the cursor magnetically.
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Spring physics: stiffness 150 = snappy but smooth, damping 15 = minimal oscillation
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Pull strength: 35% of distance from center
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href="#menu"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="
        relative group inline-flex items-center gap-3 px-10 py-5
        rounded-full bg-amber-500 text-espresso
        font-semibold text-sm tracking-widest uppercase
        overflow-hidden cursor-pointer select-none
        glow-amber glow-amber-hover transition-all duration-300
      "
      style={{ letterSpacing: "0.14em" }}
    >
      {/* Radial shimmer on hover */}
      <span className="
        absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.35),transparent_70%)]
      " />
      <Sparkles className="w-4 h-4 relative z-10" />
      <span className="relative z-10">Order Now</span>
    </motion.a>
  );
}

// ─── Floating particle (steam / bean blobs) ────────────────────────────────────
function FloatingOrb({
  size, x, delay, duration, color,
}: {
  size: number; x: string; delay: number; duration: number; color: string;
}) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, background: color, filter: "blur(30px)" }}
      animate={{
        y: [0, -160, -320],
        opacity: [0, 0.45, 0],
        scale: [0.6, 1.1, 0.4],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 0.5,
      }}
    />
  );
}

// ─── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), speed);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, words, speed, pause]);

  return displayed;
}

// ─── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const typed = useTypewriter(["Awakens You.", "Inspires You.", "Defines You."], 80, 2200);

  // Stagger timing constants for the entrance animation
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1, y: 0,
      transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=85&auto=format&fit=crop"
          alt="Artisanal coffee close-up"
          className="w-full h-full object-cover object-center"
          // Scale subtly on load for a cinematic feel
          style={{ transform: "scale(1.05)", transformOrigin: "center center" }}
        />
        {/* Deep layered overlay: bottom-heavy for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
        {/* Warm amber tint at top left for brand warmth */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-transparent" />
      </div>

      {/* ── Floating Ambient Orbs ── */}
      {/* Each orb rises from the bottom at a different x-position, mimicking steam */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingOrb size={120} x="10%" delay={0}   duration={5}   color="rgba(217,119,6,0.18)" />
        <FloatingOrb size={80}  x="25%" delay={1.2} duration={4.5} color="rgba(217,119,6,0.12)" />
        <FloatingOrb size={160} x="55%" delay={0.5} duration={6}   color="rgba(79,121,66,0.10)" />
        <FloatingOrb size={100} x="75%" delay={2}   duration={5.5} color="rgba(217,119,6,0.15)" />
        <FloatingOrb size={60}  x="88%" delay={0.8} duration={4}   color="rgba(245,158,11,0.12)" />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow badge */}
        <motion.div
          custom={0.1}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">
            Specialty Coffee · Est. 2019
          </span>
        </motion.div>

        {/* Main headline — Playfair Display */}
        <motion.h1
          custom={0.25}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-bold leading-[1.05] text-oat mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Awaken<br />
          <span className="text-gradient">Your Senses.</span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.p
          custom={0.4}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl md:text-2xl text-stone-300 font-light mb-4 h-9"
        >
          Every cup{" "}
          <span className="text-amber-400 font-medium">
            {typed}
            <span className="animate-pulse">|</span>
          </span>
        </motion.p>

        {/* Supporting tagline */}
        <motion.p
          custom={0.5}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="text-stone-400 text-sm sm:text-base max-w-md mb-12 leading-relaxed"
        >
          Small-batch, single-origin roasts crafted with intention —<br className="hidden sm:block" />
          for those who treat coffee as ritual.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.65}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton>Order Now</MagneticButton>

          <motion.a
            href="#story"
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors text-sm font-medium tracking-wide"
          >
            Our Story
            <span className="text-lg">→</span>
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={0.8}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mt-16 flex items-center gap-8 sm:gap-16 text-center"
        >
          {[
            { val: "12+", label: "Origins" },
            { val: "50k+", label: "Happy Cups" },
            { val: "4", label: "Locations" },
          ].map(({ val, label }) => (
            <div key={label}>
              <div
                className="font-display text-3xl sm:text-4xl font-bold text-amber-400"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {val}
              </div>
              <div className="text-stone-400 text-xs tracking-widest uppercase mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-stone-500 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-amber-500/70" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
