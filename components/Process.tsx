"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Source",
    subtitle: "Farm to Roastery",
    description:
      "We visit 12+ farms annually across Ethiopia, Colombia, and Guatemala. We cup hundreds of microlots to select only the extraordinary.",
    image: "https://images.unsplash.com/photo-1589135716405-b3ae563c5b75?w=700&q=80&auto=format&fit=crop",
    color: "#4F7942",
  },
  {
    number: "02",
    title: "Roast",
    subtitle: "Small Batch Precision",
    description:
      "Every roast profile is developed over months. We roast in 10kg batches, 3x per week, ensuring peak freshness in every order.",
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=700&q=80&auto=format&fit=crop",
    color: "#D97706",
  },
  {
    number: "03",
    title: "Brew",
    subtitle: "Science Meets Ritual",
    description:
      "Our baristas are trained to SCA standards, but trained harder in hospitality. Every extraction is dialed to 0.1g precision.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80&auto=format&fit=crop",
    color: "#D97706",
  },
  {
    number: "04",
    title: "Savor",
    subtitle: "Your Perfect Moment",
    description:
      "Coffee is the punctuation of your day. We exist to make that comma, that pause — worth it.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&q=80&auto=format&fit=crop",
    color: "#4F7942",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Alternate layout: even index → image right, odd → image left
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
    >
      {/* Text side */}
      <div className="flex-1">
        <div
          className="inline-block text-8xl font-bold leading-none mb-6 opacity-10"
          style={{ fontFamily: "var(--font-playfair)", color: step.color }}
        >
          {step.number}
        </div>
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-[0.18em] uppercase mb-4"
          style={{ backgroundColor: `${step.color}18`, color: step.color }}
        >
          {step.subtitle}
        </span>
        <h3
          className="text-4xl sm:text-5xl font-bold text-oat mb-5 leading-tight"
          style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F2" }}
        >
          {step.title}
        </h3>
        <p className="text-stone-400 text-lg leading-relaxed">{step.description}</p>
      </div>

      {/* Image side */}
      <div className="flex-1 w-full">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/3]"
        >
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
          {/* Corner accent */}
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-[80px] opacity-60"
            style={{ background: `linear-gradient(135deg, ${step.color}40, transparent)` }}
          />
          {/* Number watermark */}
          <div
            className="absolute top-4 right-4 text-6xl font-bold opacity-[0.08]"
            style={{ fontFamily: "var(--font-playfair)", color: "white" }}
          >
            {step.number}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Progress line that grows as you scroll through the section
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#1C1917" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #D97706, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              The Craft
            </span>
            <h2
              className="font-display text-5xl sm:text-6xl font-bold text-oat leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F2" }}
            >
              From cherry to cup,<br />
              <span className="text-gradient">nothing is accidental.</span>
            </h2>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Scroll progress line (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "rgba(250,247,242,0.05)" }}>
            <motion.div
              className="absolute top-0 left-0 w-full bg-amber-500/30 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-24 lg:gap-32">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
