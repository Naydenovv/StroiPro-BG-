"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const services = [
  { icon: "architecture", title: "Ново Строителство", desc: "Цялостно изграждане на жилищни и административни сгради от кота нула." },
  { icon: "construction", title: "Ремонтни Дейности", desc: "Прецизни интериорни и екстериорни ремонти с висококачествени материали." },
  { icon: "design_services", title: "Проектиране", desc: "Индивидуални архитектурни решения, съобразени с Вашите изисквания." },
  { icon: "roofing", title: "Покривни Системи", desc: "Изграждане и хидроизолация на покриви с гаранция за дълголетие." },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-slate-950 relative overflow-hidden" ref={sectionRef}>
      {/* Ambient glow */}
      <motion.div
        className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
        animate={inView ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "4rem" } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-amber-500 rounded-full mb-4 md:mb-6"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-5xl font-black text-white font-montserrat mb-4 md:mb-6 tracking-tight"
            >
              Майсторство и Прецизност
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-slate-400 leading-relaxed"
            >
              Предлагаме пълен цикъл от строителни услуги, гарантирайки
              най-високо качество на всеки етап от Вашия проект.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.7 }}>
            <Link
              href="/uslugi"
              className="hidden md:flex items-center gap-2 text-amber-500 font-bold font-montserrat text-sm uppercase tracking-wider hover:gap-4 transition-all"
            >
              Всички услуги
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
            >
              <div className="bg-slate-900/60 backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-2xl hover:border-amber-500/20 hover:bg-slate-800/60 group transition-all duration-500 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/0 group-hover:bg-amber-500/5 transition-all duration-500 rounded-bl-3xl" />
                <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-5 md:mb-6 group-hover:bg-amber-500 transition-colors">
                  <span className="material-symbols-outlined text-amber-500 group-hover:text-slate-900 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white font-montserrat mb-3 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base group-hover:text-slate-300 transition-colors duration-500 leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="material-symbols-outlined text-amber-500 text-sm">arrow_forward</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/uslugi" className="flex items-center gap-2 text-amber-500 font-bold font-montserrat text-sm uppercase tracking-wider">
            Всички услуги
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
