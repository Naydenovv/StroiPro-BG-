"use client";

import Link from "next/link";
import PortfolioRibbon from "./PortfolioRibbon";

interface Project {
  slug: string;
  title: string;
  coverImage: string;
  type: string;
  location: string;
  year?: number;
  gallery: string[];
}

export default function HomeHero({ projects }: { projects: Project[] }) {
  return (
    <div className="relative" style={{ height: "100vh" }}>
      {/* PortfolioRibbon as background — no overlay text from ribbon */}
      <PortfolioRibbon
        projects={projects}
        showOverlay={false}
        height="100%"
      />

      {/* Hero text overlay — bottom left corner */}
      <div className="absolute bottom-10 left-8 md:left-16 z-20 pointer-events-none max-w-2xl">
        <span className="inline-block px-4 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-500 font-montserrat text-xs font-bold tracking-widest uppercase mb-6">
          Елитно Строителство
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-50 font-montserrat leading-[1.1] mb-6 tracking-tighter">
          Строим вашите мечти
          <br />
          <span className="text-amber-500">от основи до покрив</span>
        </h1>
        <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
          Съчетаваме дългогодишен опит с модерни технологии, за да създадем
          домове, които вдъхновяват и остават във времето.
        </p>
        <div className="pointer-events-auto flex flex-col sm:flex-row gap-4">
          <Link
            href="/uslugi"
            className="bg-amber-500 text-slate-950 px-8 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Нашите услуги
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
          <Link
            href="/kontakti"
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-all flex items-center justify-center"
          >
            Свържете се с нас
          </Link>
        </div>
      </div>

      {/* Scroll hint bottom right */}
      <div className="absolute bottom-10 right-8 md:right-16 z-20 pointer-events-none hidden md:flex items-center gap-3">
        <span className="text-slate-500 text-xs font-montserrat">
          ← → скролирай или задръж бутоните
        </span>
      </div>
    </div>
  );
}
