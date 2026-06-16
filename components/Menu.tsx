"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Star, Leaf } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = ["All", "Espresso", "Pours", "Pastries"] as const;
type Category = (typeof categories)[number];

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: Exclude<Category, "All">;
  image: string;
  badge?: string;
  rating: number;
  tags?: string[];
  isNew?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Aura Signature Espresso",
    description: "A velvety double shot with notes of dark chocolate, toasted hazelnut, and a lingering caramel finish.",
    price: "Rs 450",
    category: "Espresso",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80&auto=format&fit=crop",
    badge: "Best Seller",
    rating: 4.9,
    tags: ["Single Origin", "Dark Roast"],
  },
  {
    id: 2,
    name: "Oat Honey Cortado",
    description: "Silky house-made oat milk balanced with raw wildflower honey and a whisper of cinnamon.",
    price: "Rs 590",
    category: "Espresso",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600&q=80&auto=format&fit=crop",
    rating: 4.8,
    tags: ["Oat Milk", "Honey"],
    isNew: true,
  },
  {
    id: 3,
    name: "Ethiopian Cold Brew",
    description: "18-hour steep of our single-origin Yirgacheffe. Bright blueberry and jasmine bloom in every sip.",
    price: "Rs 800",
    category: "Espresso",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop",
    badge: "Staff Pick",
    rating: 4.7,
    tags: ["Single Origin", "Cold Brew"],
  },
  {
    id: 4,
    name: "Kyoto-Style Pour Over",
    description: "A meditative 4-minute bloom ritual. Our Guatemala Huehuetenango grounds yield stone fruit and brown sugar.",
    price: "Rs 1100",
    category: "Pours",
    image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600&q=80&auto=format&fit=crop",
    rating: 4.9,
    tags: ["Guatemala", "Pour Over"],
    isNew: true,
  },
  {
    id: 5,
    name: "Chemex Morning Blend",
    description: "Clean, golden clarity. Our medium-roast Sumatra is made for those who take their mornings seriously.",
    price: "Rs 800",
    category: "Pours",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop",
    badge: "Classic",
    rating: 4.6,
    tags: ["Sumatra", "Chemex"],
  },
  {
    id: 6,
    name: "Ceremonial Matcha Latte",
    description: "Ceremonial-grade Uji matcha, whisked to froth, layered with oat milk. The perfect counterbalance.",
    price: "Rs 600",
    category: "Pours",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80&auto=format&fit=crop",
    rating: 4.8,
    tags: ["Matcha", "Vegan"],
  },
  {
    id: 7,
    name: "Cardamom Croissant",
    description: "Laminated with 72-hour French butter, dusted with green cardamom sugar. Shatteringly crisp.",
    price: "Rs 425",
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop",
    badge: "Freshly Baked",
    rating: 4.9,
    tags: ["Butter", "Cardamom"],
  },
  {
    id: 8,
    name: "Dark Chocolate Tahini Tart",
    description: "Bitter Valrhona chocolate ganache over a sesame-tahini crust. Earthy, decadent, unforgettable.",
    price: "Rs 900",
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80&auto=format&fit=crop",
    isNew: true,
    rating: 4.7,
    tags: ["Chocolate", "Vegan"],
  },
  {
    id: 9,
    name: "Miso Caramel Cookie",
    description: "Chewy brown butter cookie with white miso caramel swirl. Sweet, salty, completely addictive.",
    price: "Rs 390",
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop",
    rating: 4.8,
    tags: ["Cookie", "Miso"],
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    // Card lifts on hover via translateY + shadow; image scales inside overflow-hidden container
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      layout // Framer Motion layout prop animates position changes when filter changes
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-amber-900/15 transition-shadow duration-400 flex flex-col"
    >
      {/* Image container — overflow-hidden clips the scale transform */}
      <div className="relative h-52 overflow-hidden bg-stone-100">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          // Scale image on card hover via CSS group utility
          style={{ transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
          // We use whileHover on the parent but JS can't easily do group-hover with Framer on a child,
          // so we rely on CSS group-hover via a style tag trick + Tailwind group
        />
        {/* Dark gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        {/* Scale image via inline style class on parent group */}
        <style>{`
          .menu-card-img { transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
          .group:hover .menu-card-img { transform: scale(1.08); }
        `}</style>
        <img
          src={item.image}
          alt={item.name}
          className="menu-card-img absolute inset-0 w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.badge && (
            <span className="px-3 py-1 rounded-full bg-amber-500 text-espresso text-[10px] font-bold tracking-widest uppercase">
              {item.badge}
            </span>
          )}
          {item.isNew && (
            <span className="px-3 py-1 rounded-full bg-matcha text-white text-[10px] font-bold tracking-widest uppercase"
              style={{ backgroundColor: "#4F7942" }}>
              New
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full glass-dark">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-white text-[11px] font-semibold">{item.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 text-[10px] font-medium tracking-wide"
            >
              <Leaf className="w-2.5 h-2.5 text-matcha" style={{ color: "#4F7942" }} />
              {tag}
            </span>
          ))}
        </div>

        <h3
          className="font-display text-lg font-bold text-roast mb-1.5 leading-snug"
          style={{ fontFamily: "var(--font-playfair)", color: "#292524" }}
        >
          {item.name}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed flex-1 mb-4">
          {item.description}
        </p>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-auto">
          <span
            className="font-display text-2xl font-bold text-amber-600"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {item.price}
          </span>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            className={`
              flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300
              ${added
                ? "bg-matcha text-white"
                : "bg-espresso text-oat hover:bg-amber-500 hover:text-espresso"
              }
            `}
            style={{ backgroundColor: added ? "#4F7942" : undefined, color: added ? "white" : undefined }}
          >
            <Plus className={`w-3.5 h-3.5 transition-transform ${added ? "rotate-45" : ""}`} />
            {added ? "Added!" : "Add to cart"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Menu() {
  const [active, setActive] = useState<Category>("All");
  const ref = useRef<HTMLDivElement>(null);
  // Trigger entrance animation when section enters viewport
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    active === "All" ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <section id="menu" ref={ref} className="py-28 px-6 bg-oat relative overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}>
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-green-50/50 blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            The Menu
          </span>
          <h2
            className="font-display text-5xl sm:text-6xl font-bold text-roast mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair)", color: "#292524" }}
          >
            Crafted with<br />
            <span className="text-gradient">obsession.</span>
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Every item sourced, roasted, and prepared by people who believe
            good coffee changes your entire morning.
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`
                relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300
                ${active === cat
                  ? "text-espresso"
                  : "text-stone-500 hover:text-stone-800 bg-white hover:bg-stone-50 shadow-sm"
                }
              `}
              style={{ color: active === cat ? "#1C1917" : undefined }}
            >
              {/* Animated active pill background */}
              {active === cat && (
                <motion.span
                  layoutId="activePill" // Shared layout ID — Framer animates it between buttons
                  className="absolute inset-0 rounded-full bg-amber-500"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid — AnimatePresence enables exit animations when cards leave */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm tracking-wide border-b-2 border-amber-400 pb-0.5 transition-colors"
          >
            View Full Menu →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
