"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const services = [
  {
    icon: "architecture",
    title: "Ново Строителство",
    desc: "Цялостно изграждане на жилищни и административни сгради от кота нула.",
  },
  {
    icon: "construction",
    title: "Ремонтни Дейности",
    desc: "Прецизни интериорни и екстериорни ремонти с висококачествени материали.",
  },
  {
    icon: "design_services",
    title: "Проектиране",
    desc: "Индивидуални архитектурни решения, съобразени с Вашите изисквания.",
  },
  {
    icon: "roofing",
    title: "Покривни Системи",
    desc: "Изграждане и хидроизолация на покриви с гаранция за дълголетие.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-surface relative overflow-hidden" ref={sectionRef}>
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
        animate={inView ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-slate-900/5 blur-2xl pointer-events-none"
        animate={inView ? { scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-32 left-[15%] w-4 h-4 bg-amber-500/20 rotate-45 pointer-events-none hidden md:block"
        animate={inView ? { y: [0, -15, 0], rotate: [45, 90, 45] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-48 right-[20%] w-3 h-3 rounded-full bg-amber-500/30 pointer-events-none hidden md:block"
        animate={inView ? { y: [0, -10, 0], x: [0, 5, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-40 right-[12%] w-6 h-6 border-2 border-slate-900/10 rotate-12 pointer-events-none hidden md:block"
        animate={inView ? { rotate: [12, 60, 12], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-32 left-[25%] w-2 h-8 bg-amber-500/15 rounded-full pointer-events-none hidden md:block"
        animate={inView ? { y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header with animated line */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "4rem" } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-amber-500 rounded-full mb-6"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-black text-slate-900 font-montserrat mb-6 tracking-tight"
            >
              Майсторство и Прецизност
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-on-surface-variant leading-relaxed"
            >
              Предлагаме пълен цикъл от строителни услуги, гарантирайки
              най-високо качество на всеки етап от Вашия проект.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              href="/uslugi"
              className="hidden md:flex items-center gap-2 text-amber-500 font-bold font-montserrat text-sm uppercase tracking-wider hover:gap-4 transition-all"
            >
              Всички услуги
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
            >
              <div className="bg-surface-container-low p-10 rounded-xl hover:bg-slate-900 group transition-all duration-500 h-full relative overflow-hidden">
                {/* Card decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/0 group-hover:bg-amber-500/10 transition-all duration-500 rounded-bl-3xl" />

                <motion.div
                  className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 transition-colors"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <span
                    className="material-symbols-outlined text-amber-500 group-hover:text-slate-900 text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {service.icon}
                  </span>
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white font-montserrat mb-4 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-on-surface-variant group-hover:text-slate-400 transition-colors duration-500">
                  {service.desc}
                </p>

                {/* Animated arrow on hover */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="material-symbols-outlined text-amber-500 text-sm">
                    arrow_forward
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
