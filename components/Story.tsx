"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Award, Sprout, Heart } from "lucide-react";

// ─── Scroll-triggered text reveal ─────────────────────────────────────────────
// Each line fades up when the section enters the viewport, staggered by index
function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // `once: true` means animation plays only on first entry — no re-trigger on scroll back
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{
          delay,
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1], // Custom "expo out" easing for cinematic feel
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Image card with subtle tilt effect ──────────────────────────────────────
function TiltImage({
  src, alt, className,
}: {
  src: string; alt: string; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

// ─── Value pillars ─────────────────────────────────────────────────────────────
const pillars = [
  {
    Icon: Sprout,
    title: "Direct Trade",
    body: "We travel to origin — Ethiopia, Colombia, Guatemala — to build relationships with farmers who share our values.",
    color: "#4F7942",
  },
  {
    Icon: Award,
    title: "Award-Winning Roasts",
    body: "Three-time Specialty Coffee Association award recipients. Roasted weekly in small batches, never compromising on quality.",
    color: "#D97706",
  },
  {
    Icon: Heart,
    title: "Community First",
    body: "1% of every order goes to farmer education programs. When they thrive, so does the cup in your hands.",
    color: "#D97706",
  },
];

// ─── Main Story Section ───────────────────────────────────────────────────────
export default function Story() {
  // For the subtle parallax on the image grid, we track the section's scroll progress
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to a vertical translation for the image grid
  // Creates the effect of the grid moving slightly slower than the page
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" });

  const pillarsRef = useRef<HTMLDivElement>(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-60px" });

  return (
    <section id="story" ref={sectionRef} className="py-28 overflow-hidden"
      style={{ backgroundColor: "#1C1917" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* ── Split Layout: Text | Images ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text content */}
          <div ref={leftRef}>
            <RevealLine delay={0}>
              <span className="inline-block px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                Our Story
              </span>
            </RevealLine>

            <RevealLine delay={0.1}>
              <h2
                className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-6"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "#FAF7F2",
                  lineHeight: 1.1,
                }}
              >
                Born from a{" "}
                <em className="text-gradient not-italic">
                  love letter
                </em>{" "}
                to coffee.
              </h2>
            </RevealLine>

            <RevealLine delay={0.2}>
              <p className="text-stone-400 text-lg leading-relaxed mb-5">
                Aura Roasters started in 2019 as a tiny roastery above a bookshop
                in Portland. Our founder Mara spent three years traveling between
                Ethiopian highlands and Guatemalan valleys, cup by cup, building
                friendships with the farmers who pour their lives into their land.
              </p>
            </RevealLine>

            <RevealLine delay={0.3}>
              <p className="text-stone-400 text-lg leading-relaxed mb-10">
                Today, we roast every batch to order — never in bulk, never in advance.
                The result? Coffee that tastes like someone cared deeply about the
                entire journey from cherry to cup. Because someone did.
              </p>
            </RevealLine>

            {/* Pull quote */}
            <RevealLine delay={0.4}>
              <blockquote className="relative pl-6 border-l-2 border-amber-500 mb-10">
                <p className="text-oat text-xl italic font-light leading-relaxed"
                  style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F2" }}>
                  "Coffee is not just a drink. It's a conversation between a farmer's
                  labor and your morning calm."
                </p>
                <footer className="text-stone-500 text-sm mt-3 font-medium tracking-wide">
                  — Ubaid ur rehman, Founder & Head Roaster
                </footer>
              </blockquote>
            </RevealLine>

            <RevealLine delay={0.5}>
              <motion.a
                href="#"
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold tracking-wide transition-colors"
              >
                Read the full story →
              </motion.a>
            </RevealLine>
          </div>

          {/* Right: Image grid with parallax */}
          <motion.div style={{ y: imageY }} className="relative">
            <div className="grid grid-cols-2 gap-4 h-[580px]">
              {/* Tall left image */}
              <TiltImage
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80&auto=format&fit=crop"
                alt="Barista crafting espresso"
                className="row-span-2 h-full"
              />
              {/* Two stacked right images */}
              <TiltImage
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80&auto=format&fit=crop"
                alt="Coffee beans sourcing"
                className="h-full"
              />
              <TiltImage
                src="https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&q=80&auto=format&fit=crop"
                alt="Roasting process"
                className="h-full"
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={leftInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-6 glass-dark rounded-2xl p-5 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(217,119,6,0.15)" }}>
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                    SCA Award 2024
                  </div>
                  <div className="text-stone-400 text-sm">Best Small-Batch Roaster</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Value Pillars ── */}
        <div ref={pillarsRef} className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map(({ Icon, title, body, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group p-7 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-all duration-300"
              style={{ background: "rgba(250,247,242,0.03)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${color}18` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <h3
                className="text-oat font-bold text-xl mb-3"
                style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F2" }}
              >
                {title}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
