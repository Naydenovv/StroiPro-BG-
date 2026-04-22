"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 150, suffix: "+", label: "Завършени Обекта" },
  { value: 15, suffix: "г", label: "Професионален Опит" },
  { value: 100, suffix: "%", label: "Доволни Клиенти" },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let rafId: number;
    const animate = () => {
      start += increment;
      if (start >= target) { setCount(target); return; }
      setCount(Math.floor(start));
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target]);

  return <span>{count}{suffix}</span>;
}

export default function CounterStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-slate-900 py-16 md:py-24 border-y border-white/5" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-3 gap-4 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-4 md:p-8"
            >
              <div className="text-3xl sm:text-4xl md:text-6xl font-black text-white font-montserrat mb-1 md:mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-amber-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm font-montserrat leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
