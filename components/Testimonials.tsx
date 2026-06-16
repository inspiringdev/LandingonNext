"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya K.",
    role: "Coffee Enthusiast",
    avatar: "PK",
    rating: 5,
    text: "The Ethiopian pour-over blew my mind. Blueberry and jasmine in a coffee cup? I didn't believe it until I tasted it. Now I order every single week.",
    color: "#D97706",
  },
  {
    name: "James R.",
    role: "Restaurant Owner",
    avatar: "JR",
    rating: 5,
    text: "We switched our restaurant to Aura beans six months ago. Guests notice — they comment on the coffee more than any other aspect of the meal.",
    color: "#4F7942",
  },
  {
    name: "Sofia M.",
    role: "Architect",
    avatar: "SM",
    rating: 5,
    text: "The cortado with oat milk and honey is my reason to get out of bed. I've had cortados in Rome, Melbourne, and Seoul. Aura's is better.",
    color: "#D97706",
  },
  {
    name: "David L.",
    role: "Writer",
    avatar: "DL",
    rating: 5,
    text: "Their cold brew is stupid good. I make it last three days max before I'm back ordering another batch. The jasmine notes are unreal.",
    color: "#4F7942",
  },
  {
    name: "Amara T.",
    role: "Designer",
    avatar: "AT",
    rating: 5,
    text: "It's not just the coffee — it's the whole experience. Beautifully designed space, exceptional service, and the cardamom croissant is life-changing.",
    color: "#D97706",
  },
  {
    name: "Marcus W.",
    role: "Engineer",
    avatar: "MW",
    rating: 5,
    text: "I've become insufferable about coffee since discovering Aura. I now travel 45 minutes for the Kyoto pour-over and I would do it twice if I had to.",
    color: "#4F7942",
  },
];

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 p-6 rounded-2xl border border-white/6 mx-3"
      style={{ background: "rgba(250,247,242,0.04)" }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      {/* Quote */}
      <p className="text-stone-300 text-sm leading-relaxed mb-5 italic">
        "{item.text}"
      </p>
      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: item.color }}
        >
          {item.avatar}
        </div>
        <div>
          <div className="text-oat text-sm font-semibold" style={{ color: "#FAF7F2" }}>
            {item.name}
          </div>
          <div className="text-stone-500 text-xs">{item.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const doubled = [...testimonials, ...testimonials]; // Duplicate for seamless marquee loop

  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: "#1C1917" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-6 mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            What People Say
          </span>
          <h2
            className="font-display text-5xl font-bold text-oat leading-tight"
            style={{ fontFamily: "var(--font-playfair)", color: "#FAF7F2" }}
          >
            People are{" "}
            <span className="text-gradient">obsessed.</span>
          </h2>
          <p className="text-stone-400 mt-4 max-w-md mx-auto">
            Don't take our word for it — here's what our community has to say.
          </p>
        </motion.div>
      </div>

      {/* Marquee — CSS animation for infinite smooth scroll */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #1C1917, transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #1C1917, transparent)" }} />

        {/* Marquee track 1 — scrolls left */}
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {doubled.map((item, i) => (
            <TestimonialCard key={`a-${i}`} item={item} />
          ))}
        </motion.div>

        {/* Marquee track 2 — scrolls right (opposite direction, offset for depth) */}
        <motion.div
          className="flex mt-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
        >
          {doubled.reverse().map((item, i) => (
            <TestimonialCard key={`b-${i}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
