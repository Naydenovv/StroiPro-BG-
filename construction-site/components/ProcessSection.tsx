"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    icon: "forum",
    title: "Консултация",
    desc: "Слушаме визията Ви, оценяваме терена и обсъждаме възможностите. Безплатна първа среща, без ангажимент.",
  },
  {
    num: "02",
    icon: "architecture",
    title: "Проектиране",
    desc: "Архитектите ни изготвят детайлен проект, 3D визуализация и разбивка на бюджета, съобразени с нормативите.",
  },
  {
    num: "03",
    icon: "construction",
    title: "Строителство",
    desc: "Прилагаме най-добрите практики, материали от сертифицирани доставчици и стриктен график по фази.",
  },
  {
    num: "04",
    icon: "verified",
    title: "Предаване",
    desc: "Финален оглед заедно, пълна документация, гаранция и поддръжка. Ключът е във Вашите ръце.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // The connecting line grows as the section scrolls through view
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);
  const lineScaleY = useTransform(lineProgress, (v) => v);

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-28 md:py-40 overflow-hidden"
    >
      {/* Parallax grid background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-30 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundSize: "60px 60px",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            transform: "perspective(600px) rotateX(15deg) scale(1.3)",
            transformOrigin: "center 70%",
          }}
        />
      </motion.div>

      {/* Ambient amber glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute bottom-1/4 -left-20 w-72 h-72 bg-amber-500/4 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating ambient elements — concentrated around the center timeline */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* ── DOTS: scattered around timeline center ── */}
        {/* Between card 1-2, left empty space */}
        <motion.div className="absolute w-2 h-2 rounded-full bg-amber-500/25" style={{ top: "30%", left: "15%" }}
          animate={{ y: [0, -18, 0, 14, 0], x: [0, 8, 0, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-slate-300/20" style={{ top: "33%", left: "22%" }}
          animate={{ y: [0, 12, 0, -16, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
        <motion.div className="absolute w-1 h-1 rounded-full bg-amber-500/30" style={{ top: "28%", left: "18%" }}
          animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />

        {/* Between card 1-2, right empty space */}
        <motion.div className="absolute w-2.5 h-2.5 rounded-full bg-amber-500/20" style={{ top: "32%", right: "18%" }}
          animate={{ y: [0, -20, 0, 16, 0], x: [0, -10, 0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
        <motion.div className="absolute w-1 h-1 rounded-full bg-slate-400/25" style={{ top: "35%", right: "25%" }}
          animate={{ scale: [1, 2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

        {/* Between card 2-3, left */}
        <motion.div className="absolute w-2 h-2 rounded-full bg-amber-500/20" style={{ top: "48%", left: "20%" }}
          animate={{ y: [0, 15, 0, -12, 0], x: [0, -8, 0, 10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-slate-300/25" style={{ top: "52%", left: "12%" }}
          animate={{ y: [0, -14, 0, 18, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 4 }} />
        <motion.div className="absolute w-1 h-1 rounded-full bg-amber-500/35" style={{ top: "50%", left: "25%" }}
          animate={{ scale: [1, 2, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />

        {/* Between card 2-3, right */}
        <motion.div className="absolute w-2 h-2 rounded-full bg-amber-500/25" style={{ top: "46%", right: "14%" }}
          animate={{ y: [0, 18, 0, -15, 0], x: [0, 12, 0, -8, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-slate-400/20" style={{ top: "50%", right: "22%" }}
          animate={{ y: [0, -10, 0, 15, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }} />

        {/* Between card 3-4, left */}
        <motion.div className="absolute w-2.5 h-2.5 rounded-full bg-amber-500/20" style={{ top: "66%", left: "16%" }}
          animate={{ y: [0, -16, 0, 12, 0], x: [0, 10, 0, -6, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
        <motion.div className="absolute w-1 h-1 rounded-full bg-amber-500/30" style={{ top: "70%", left: "24%" }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

        {/* Between card 3-4, right */}
        <motion.div className="absolute w-2 h-2 rounded-full bg-slate-300/20" style={{ top: "68%", right: "16%" }}
          animate={{ y: [0, 14, 0, -18, 0], x: [0, -8, 0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }} />
        <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-amber-500/25" style={{ top: "72%", right: "20%" }}
          animate={{ y: [0, -12, 0, 16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

        {/* Far edges — sparse */}
        <motion.div className="absolute w-2 h-2 rounded-full bg-amber-500/20" style={{ top: "20%", left: "4%" }}
          animate={{ y: [0, -20, 0, 15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute w-1.5 h-1.5 rounded-full bg-slate-400/15" style={{ top: "80%", right: "5%" }}
          animate={{ y: [0, 18, 0, -14, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }} />

        {/* ── GRADIENT LINES: horizontal, between cards ── */}
        <motion.div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
          style={{ top: "34%", left: "10%" }}
          animate={{ x: [0, 60, 0], opacity: [0, 0.35, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.div className="absolute w-20 h-px bg-gradient-to-r from-transparent via-slate-400/25 to-transparent"
          style={{ top: "36%", right: "12%" }}
          animate={{ x: [0, -50, 0], opacity: [0, 0.3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
        <motion.div className="absolute w-28 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"
          style={{ top: "52%", left: "8%" }}
          animate={{ x: [0, 70, 0], opacity: [0, 0.3, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 5 }} />
        <motion.div className="absolute w-16 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
          style={{ top: "54%", right: "10%" }}
          animate={{ x: [0, -40, 0], opacity: [0, 0.35, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <motion.div className="absolute w-20 h-px bg-gradient-to-r from-transparent via-slate-300/20 to-transparent"
          style={{ top: "70%", left: "14%" }}
          animate={{ x: [0, 55, 0], opacity: [0, 0.25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"
          style={{ top: "72%", right: "8%" }}
          animate={{ x: [0, -60, 0], opacity: [0, 0.3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }} />

        {/* ── RINGS: near the timeline center ── */}
        <motion.div className="absolute w-20 h-20 rounded-full border border-amber-500/[0.12]"
          style={{ top: "30%", left: "40%" }}
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }} />
        <motion.div className="absolute w-28 h-28 rounded-full border border-slate-500/[0.08]"
          style={{ top: "55%", right: "38%" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute w-16 h-16 rounded-full border border-amber-500/[0.10]"
          style={{ top: "72%", left: "42%" }}
          animate={{ rotate: 360, scale: [1, 1.15, 1] }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }} />

        {/* ── DIAMONDS: scattered in gaps ── */}
        <motion.div className="absolute w-3 h-3 bg-amber-500/15 rotate-45"
          style={{ top: "32%", right: "30%" }}
          animate={{ y: [0, -10, 0, 8, 0], rotate: [45, 90, 45], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute w-2.5 h-2.5 bg-slate-400/12 rotate-45"
          style={{ top: "50%", left: "30%" }}
          animate={{ y: [0, 12, 0, -8, 0], rotate: [45, 0, 45], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
        <motion.div className="absolute w-2 h-2 bg-amber-500/12 rotate-45"
          style={{ top: "68%", right: "32%" }}
          animate={{ y: [0, -8, 0, 10, 0], rotate: [45, 90, 45], opacity: [0.12, 0.24, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }} />

        {/* ── PLUS SIGNS: along the center ── */}
        <motion.div className="absolute text-amber-500/25 text-xl font-light"
          style={{ top: "28%", left: "35%" }}
          animate={{ rotate: [0, 90, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>+</motion.div>
        <motion.div className="absolute text-slate-500/20 text-lg font-light"
          style={{ top: "48%", right: "33%" }}
          animate={{ rotate: [0, -90, 0], opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}>+</motion.div>
        <motion.div className="absolute text-amber-500/20 text-lg font-light"
          style={{ top: "66%", left: "36%" }}
          animate={{ rotate: [0, 90, 0], opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}>+</motion.div>
        <motion.div className="absolute text-slate-400/18 text-sm font-light"
          style={{ top: "85%", right: "35%" }}
          animate={{ rotate: [0, -90, 0], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 6 }}>+</motion.div>

        {/* ── SMALL CIRCLES CLUSTER: near each node ── */}
        <motion.div className="absolute w-1 h-1 rounded-full bg-amber-500/30"
          style={{ top: "31%", left: "48%" }}
          animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute w-1 h-1 rounded-full bg-amber-500/25"
          style={{ top: "33%", left: "52%" }}
          animate={{ scale: [1, 2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
        <motion.div className="absolute w-1 h-1 rounded-full bg-amber-500/30"
          style={{ top: "51%", left: "49%" }}
          animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.div className="absolute w-1 h-1 rounded-full bg-amber-500/25"
          style={{ top: "53%", left: "51%" }}
          animate={{ scale: [1, 2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }} />
        <motion.div className="absolute w-1 h-1 rounded-full bg-amber-500/30"
          style={{ top: "69%", left: "50%" }}
          animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20 md:mb-28"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-8 h-px bg-amber-500" />
            <span className="text-[11px] text-amber-500 tracking-[3px] uppercase font-montserrat font-bold">
              Нашият процес
            </span>
            <span className="block w-8 h-px bg-amber-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-montserrat text-white leading-[1.05] tracking-tighter">
            От идея
            <br />
            <em className="text-amber-500 not-italic">до ключ.</em>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mt-5 text-sm md:text-base leading-relaxed">
            Ясен процес в четири стъпки, за да знаете винаги къде сте.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Growing vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/5" />
          <motion.div
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent"
          />

          {/* Steps */}
          <div className="space-y-6 md:space-y-8">
            {STEPS.map((step, i) => {
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isRight ? 60 : -60, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Node circle on the line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{
                      duration: 0.45,
                      delay: 0.2,
                      type: "spring",
                      bounce: 0.4,
                    }}
                    className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-amber-500 ring-4 ring-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.6)] z-10"
                  />

                  {/* Card */}
                  <div
                    className={`flex-1 pl-16 md:pl-0 ${
                      isRight ? "md:pr-16 md:text-right" : "md:pl-16"
                    } md:w-1/2`}
                  >
                    <div className="group bg-slate-900/70 backdrop-blur-md border border-white/5 hover:border-amber-500/30 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-1">
                      <div
                        className={`flex items-center gap-4 mb-4 ${
                          isRight ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                          <span
                            className="material-symbols-outlined text-amber-500 text-2xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {step.icon}
                          </span>
                        </div>
                        <span className="text-5xl md:text-6xl font-black font-montserrat tracking-tighter text-white/10 group-hover:text-amber-500/30 transition-colors">
                          {step.num}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black font-montserrat text-white mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Spacer opposite side (desktop only) */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mt-20 md:mt-28"
        >
          <p className="text-slate-400 text-sm md:text-base mb-6">
            Готови сте за първата крачка?
          </p>
          <a
            href="/kontakti"
            className="inline-block px-10 py-4 rounded-full bg-amber-500 text-slate-950 font-montserrat text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Запишете безплатна консултация →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
