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
    <div className="relative overflow-hidden" style={{ height: "100vh", minHeight: "600px" }}>
      {/* PortfolioRibbon as background */}
      <PortfolioRibbon
        projects={projects}
        showOverlay={false}
        height="100%"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Mobile: lighter gradient so images are visible */}
        <div className="absolute inset-0 bg-slate-950/15 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent md:hidden" />
        {/* Desktop: lighter gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent hidden md:block" />
      </div>

      {/* Hero text — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none px-6 md:px-16 pb-10 md:pb-12">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-500 font-montserrat text-xs font-bold tracking-widest uppercase mb-4 md:mb-6">
            Елитно Строителство
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-50 font-montserrat leading-[1.05] mb-4 md:mb-6 tracking-tighter">
            Строим вашите мечти
            <br />
            <span className="text-amber-500">от основи до покрив</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-300 mb-6 md:mb-8 leading-relaxed max-w-lg">
            Съчетаваме дългогодишен опит с модерни технологии, за да създадем
            домове, които вдъхновяват и остават във времето.
          </p>
          <div className="pointer-events-auto flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link
              href="/uslugi"
              className="bg-amber-500 text-slate-950 px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              Нашите услуги
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/kontakti"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Свържете се с нас
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll hint — desktop only */}
      <div className="absolute bottom-10 right-8 md:right-16 z-20 pointer-events-none hidden md:flex items-center gap-3">
        <span className="text-slate-500 text-xs font-montserrat">
          ← → скролирай или задръж бутоните
        </span>
      </div>
    </div>
  );
}
