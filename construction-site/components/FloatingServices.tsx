"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

// Single row of 6 cards, evenly spaced
const CARD_POSITIONS = [
  { x: 0, y: 2, rotate: -1, delay: 0 },
  { x: 16, y: -1, rotate: 0.8, delay: 0.1 },
  { x: 32, y: 3, rotate: -0.7, delay: 0.2 },
  { x: 48, y: -2, rotate: 1, delay: 0.3 },
  { x: 64, y: 1, rotate: -0.8, delay: 0.4 },
  { x: 80, y: -1, rotate: 0.6, delay: 0.5 },
];

// Float animation — gentle bob, subtle rotation
const floatVariants = (i: number) => ({
  y: [0, -5 - (i % 3) * 2, 0, 4 + (i % 2) * 2, 0],
  rotate: [
    CARD_POSITIONS[i].rotate,
    CARD_POSITIONS[i].rotate + 0.6,
    CARD_POSITIONS[i].rotate,
    CARD_POSITIONS[i].rotate - 0.5,
    CARD_POSITIONS[i].rotate,
  ],
});

export default function FloatingServices({
  services,
}: {
  services: Service[];
}) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ minHeight: "100vh" }}>
      {/* Same perspective grid as homepage */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          transform: "perspective(600px) rotateX(15deg) scale(1.5)",
          transformOrigin: "center 70%",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header — static on mobile, absolute on desktop */}
      <div className="relative md:absolute md:top-28 md:left-16 z-30 pt-28 md:pt-0 px-6 md:px-0 pb-0 md:pb-0 max-w-md pointer-events-none">
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <span className="block w-8 h-px bg-slate-500" />
          <span className="text-[11px] text-slate-400 tracking-[3px] uppercase font-montserrat font-bold">
            Нашите услуги · {services.length} направления
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-montserrat text-white leading-[1.1] tracking-tighter mb-2 md:mb-3">
          Майсторство,
          <br />
          <em className="text-amber-500 not-italic">прецизност.</em>
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed hidden md:block">
          Задръжте върху услуга за повече информация.
        </p>
      </div>

      {/* Floating Service Cards */}
      {isMobile ? (
        /* Mobile: stacked scrollable layout */
        <div className="relative z-20 pb-24 px-6 flex flex-col gap-4 mt-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      ) : (
        /* Desktop: single row of floating cards below headline */
        <div className="relative z-20 w-full pt-72 pb-24 px-8 md:px-16">
          <div className="grid grid-cols-6 gap-5 mt-16">
            {services.map((service, i) => {
              const pos = CARD_POSITIONS[i];
              return (
                <motion.div
                  key={service.id}
                  className="min-w-0"
                  style={{ marginTop: `${pos.y * 3}px` }}
                  initial={{ opacity: 0, y: 40, rotate: pos.rotate }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: pos.rotate,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: pos.delay,
                    ease: "easeOut",
                  }}
                >
                  <motion.div
                    animate={floatVariants(i)}
                    transition={{
                      duration: 5 + i * 0.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA bottom right */}
      <div className="absolute bottom-10 right-8 md:right-16 z-30">
        <Link
          href="/kontakti"
          className="inline-block px-8 py-3 rounded-full bg-amber-500 text-slate-950 font-montserrat text-sm font-bold hover:scale-105 transition-transform"
        >
          Започнете проект →
        </Link>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-xl p-8 hover:bg-slate-800/90 hover:border-amber-500/20 transition-all duration-500 cursor-default">
      {/* Decorative corner glow on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/0 group-hover:bg-amber-500/10 transition-all duration-500 rounded-bl-3xl pointer-events-none" />

      <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors">
        <span
          className="material-symbols-outlined text-amber-500 text-2xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {service.icon}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white font-montserrat mb-2 group-hover:text-amber-400 transition-colors">
        {service.title}
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed mb-4 group-hover:text-slate-300 transition-colors">
        {service.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-montserrat font-semibold text-slate-400 uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
