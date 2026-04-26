"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────
interface RibbonProject {
  slug: string;
  title: string;
  coverImage: string;
  type: string;
  location: string;
  year?: number;
  gallery: string[];
}

interface Props {
  projects: RibbonProject[];
  showOverlay?: boolean;
  heading?: string;
  headingAccent?: string;
  description?: string;
  height?: string;
}

// ─── Config ──────────────────────────────────────────────
const CONFIG = {
  baseSize: 55,
  maxSize: 210,
  autoSpeed: 0.12,          // ← much slower auto-scroll
  scrollBoost: 4,           // ← slower manual scroll too
  hoverRadius: 300,
  hoverScale: 2.6,
  cardSpacing: 180,
  rotationRange: 9,
  // Wave path settings
  waveAmplitude: 0.18,      // wave height as fraction of container height
  waveFrequency: 1.8,       // how many full waves across the total path
  // Scatter: random offset per card so they don't sit perfectly on the wave
  scatterX: 30,             // max random X offset (px)
  scatterY: 40,             // max random Y offset (px)
};

interface CardState {
  index: number;
  baseRotation: number;
  pathOffset: number;
  scatterX: number;       // random X jitter off the wave
  scatterY: number;       // random Y jitter off the wave
}

export default function PortfolioRibbon({
  projects,
  showOverlay = true,
  heading = "Всеки проект,",
  headingAccent = "всяка история.",
  description = "Вижте нашите реализирани обекти. Задръжте мишката, за да усетите; кликнете, за да видите повече.",
  height = "100vh",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollOffsetRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const scrollDirRef = useRef<number>(0); // -1 = left, 0 = auto, 1 = right
  const cardElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartXRef = useRef<number | null>(null);
  const touchLastXRef = useRef<number | null>(null);
  const touchLastTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0); // inertia: px/frame residual velocity
  const isMobileRef = useRef<boolean>(false);

  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: -1,
  });

  // Duplicate projects to fill the ribbon nicely
  const repeatedProjects: RibbonProject[] = [];
  const minCards = Math.max(30, projects.length * 3);
  while (repeatedProjects.length < minCards) {
    repeatedProjects.push(...projects);
  }
  const totalCards = repeatedProjects.length;

  // Pre-compute card states with scatter offsets
  const cardsRef = useRef<CardState[]>([]);
  if (cardsRef.current.length !== totalCards) {
    cardsRef.current = Array.from({ length: totalCards }, (_, i) => ({
      index: i,
      baseRotation: (Math.random() - 0.5) * CONFIG.rotationRange * 2,
      pathOffset: i * CONFIG.cardSpacing,
      scatterX: (Math.random() - 0.5) * CONFIG.scatterX * 2,
      scatterY: (Math.random() - 0.5) * CONFIG.scatterY * 2,
    }));
  }

  const totalPathLength = totalCards * CONFIG.cardSpacing;

  // ─── Position on sine-wave path ──────────────────────────
  const getPositionOnPath = useCallback(
    (
      offset: number,
      containerW: number,
      containerH: number,
      scatterX: number,
      scatterY: number,
      isMobile: boolean
    ) => {
      // Wrap offset for infinite loop
      const t =
        ((offset % totalPathLength) + totalPathLength) % totalPathLength;
      const halfPath = totalPathLength / 2;
      const relT = t - halfPath; // centered around 0
      const x = containerW * 0.5 + relT * 0.85;

      if (isMobile) {
        // Mobile: evenly-ordered row high up so hero text at the bottom
        // doesn't overlap. Tighter horizontal packing + small y scatter.
        const mobileX = containerW * 0.5 + relT * 0.5; // tighter spacing
        return {
          x: mobileX,
          y: containerH * 0.3 + scatterY * 0.25, // ~30% from top, mild jitter
        };
      }

      // Desktop: sine wave + scatter jitter
      const waveProgress = (t / totalPathLength) * Math.PI * 2 * CONFIG.waveFrequency;
      const waveY = Math.sin(waveProgress) * containerH * CONFIG.waveAmplitude;
      const y = containerH * 0.45 + waveY;
      return { x: x + scatterX, y: y + scatterY };
    },
    [totalPathLength]
  );

  // ─── Animation loop ─────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      if (!isPausedRef.current) {
        const dir = scrollDirRef.current;
        const hasVelocity = Math.abs(velocityRef.current) > 0.05;
        if (dir !== 0) {
          scrollOffsetRef.current += dir * CONFIG.scrollBoost;
        } else if (hasVelocity) {
          // Inertia: keep moving in swipe direction, decay each frame
          scrollOffsetRef.current += velocityRef.current;
          velocityRef.current *= 0.94; // friction
        } else {
          scrollOffsetRef.current += CONFIG.autoSpeed;
        }
      }

      const w = container.clientWidth;
      const h = container.clientHeight;
      isMobileRef.current = w < 768;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const maxDist = Math.sqrt((w / 2) ** 2 + (h / 2) ** 2);

      cardsRef.current.forEach((card) => {
        const el = cardElsRef.current[card.index];
        const label = labelElsRef.current[card.index];
        if (!el) return;

        const pos = getPositionOnPath(
          card.pathOffset + scrollOffsetRef.current,
          w,
          h,
          card.scatterX,
          card.scatterY,
          isMobileRef.current
        );

        // Depth scale (center = big, edges = small)
        const distCenter = Math.sqrt(
          (pos.x - w / 2) ** 2 + (pos.y - h / 2) ** 2
        );
        const depthScale = 1 - Math.min(distCenter / maxDist, 1) * 0.7;

        // Mouse proximity scale
        const distMouse = Math.sqrt(
          (pos.x - mx) ** 2 + (pos.y - my) ** 2
        );
        let mouseScale = 1;
        if (distMouse < CONFIG.hoverRadius) {
          const t = 1 - distMouse / CONFIG.hoverRadius;
          mouseScale = 1 + (CONFIG.hoverScale - 1) * t * t;
        }

        // Smaller cards on mobile
        const mobileScale = isMobileRef.current ? 0.62 : 1;
        const size =
          (CONFIG.baseSize + (CONFIG.maxSize - CONFIG.baseSize) * depthScale) *
          mobileScale;
        const finalW = size * mouseScale;
        const finalH = size * 1.3 * mouseScale;

        // 3D tilt toward cursor
        let tiltX = 0,
          tiltY = 0;
        if (distMouse < CONFIG.hoverRadius && distMouse > 0) {
          const intensity = (1 - distMouse / CONFIG.hoverRadius) * 15;
          tiltX = ((pos.y - my) / distMouse) * intensity;
          tiltY = (-(pos.x - mx) / distMouse) * intensity;
        }

        const finalScale = depthScale * mouseScale;

        el.style.width = `${finalW}px`;
        el.style.height = `${finalH}px`;
        el.style.left = `${pos.x - finalW / 2}px`;
        el.style.top = `${pos.y - finalH / 2}px`;
        el.style.zIndex = String(Math.round(finalScale * 100));
        el.style.opacity = String(Math.max(0.12, depthScale));
        // Mobile gets a softer random tilt; desktop uses the full rotation range
        const baseRot = isMobileRef.current
          ? card.baseRotation * 0.55
          : card.baseRotation;
        el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${baseRot}deg)`;

        // Show/hide label: always visible on mobile; desktop waits until card is big
        if (label) {
          const showLabel = isMobileRef.current ? true : finalW > 100;
          label.style.opacity = showLabel ? "1" : "0";
          label.style.transform = showLabel
            ? "translateY(0)"
            : "translateY(8px)";
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [getPositionOnPath, totalCards]);

  // ─── Scroll direction handlers (hold to scroll) ─────────
  const startScroll = (dir: number) => {
    scrollDirRef.current = dir;
  };
  const stopScroll = () => {
    scrollDirRef.current = 0;
  };

  // ─── Touch swipe handlers (with inertia) ─────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchLastXRef.current = e.touches[0].clientX;
    touchLastTimeRef.current = performance.now();
    velocityRef.current = 0; // stop any ongoing inertia
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchLastXRef.current === null) return;
    const now = performance.now();
    const dt = Math.max(1, now - touchLastTimeRef.current);
    // Natural swipe: drag right → content moves right
    const deltaX = e.touches[0].clientX - touchLastXRef.current;
    scrollOffsetRef.current += deltaX * 1.5;
    // Track velocity as px per ~16ms frame — weighted smoothing
    const perFrame = (deltaX * 1.5) * (16 / dt);
    velocityRef.current = velocityRef.current * 0.3 + perFrame * 0.7;
    touchLastXRef.current = e.touches[0].clientX;
    touchLastTimeRef.current = now;
  }, []);

  const onTouchEnd = useCallback(() => {
    touchStartXRef.current = null;
    touchLastXRef.current = null;
    // Cap the flung velocity so a hard swipe doesn't fly off
    const v = velocityRef.current;
    const max = 45;
    if (v > max) velocityRef.current = max;
    else if (v < -max) velocityRef.current = -max;
  }, []);

  // ─── Keyboard scroll support ────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox.open) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") navLightbox(1);
        if (e.key === "ArrowLeft") navLightbox(-1);
        return;
      }
      if (e.key === "ArrowLeft") scrollDirRef.current = -1;
      if (e.key === "ArrowRight") scrollDirRef.current = 1;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        scrollDirRef.current = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox.open]);

  // ─── Mouse wheel scroll ─────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollOffsetRef.current += e.deltaY * 0.25 + e.deltaX * 0.25;
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  // ─── Lightbox handlers ──────────────────────────────────
  const openLightbox = (idx: number) => {
    isPausedRef.current = true;
    setLightbox({ open: true, index: idx });
  };
  const closeLightbox = () => {
    isPausedRef.current = false;
    setLightbox({ open: false, index: -1 });
  };
  const navLightbox = (dir: number) => {
    setLightbox((prev) => ({
      ...prev,
      index: ((prev.index + dir) % totalCards + totalCards) % totalCards,
    }));
  };

  // ─── Render ─────────────────────────────────────────────
  const currentProject =
    lightbox.index >= 0
      ? repeatedProjects[lightbox.index % repeatedProjects.length]
      : null;

  return (
    <section
      className="relative overflow-hidden bg-slate-950"
      style={{ height }}
    >
      {/* Perspective grid background */}
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

      {/* Ribbon container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10"
        style={{ cursor: "default" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {repeatedProjects.map((project, i) => {
          // Ribbon cards are small (max ~260px). Rewrite Unsplash URLs to request
          // small thumbnails instead of hero-size images — huge bandwidth win.
          const thumbSrc = project.coverImage.includes("images.unsplash.com")
            ? project.coverImage
                .replace(/([?&])w=\d+/, "$1w=500")
                .replace(/([?&])q=\d+/, "$1q=70")
            : project.coverImage;
          const isPriority = i < 6; // first 6 are visible on initial paint
          return (
          <div
            key={`${project.slug}-${i}`}
            ref={(el) => {
              cardElsRef.current[i] = el;
            }}
            onClick={() => openLightbox(i)}
            className="absolute rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-pointer transition-shadow duration-300 hover:shadow-[0_16px_64px_rgba(0,0,0,0.7)] will-change-transform"
            style={{ opacity: 0, width: 0, height: 0, left: 0, top: 0, contain: "layout paint" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbSrc}
              alt={project.title}
              className="w-full h-full object-cover pointer-events-none"
              loading={isPriority ? "eager" : "lazy"}
              fetchPriority={isPriority ? "high" : "low"}
              decoding="async"
              width={500}
              height={650}
            />
            {/* Always-visible gradient + project name & location */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
            <div
              ref={(el) => {
                labelElsRef.current[i] = el;
              }}
              className="absolute bottom-0 left-0 right-0 p-2.5 pointer-events-none transition-all duration-300"
              style={{ opacity: 0, transform: "translateY(8px)" }}
            >
              <div className="text-white text-[11px] font-montserrat font-bold leading-tight truncate">
                {project.title}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span
                  className="material-symbols-outlined text-amber-400"
                  style={{ fontSize: "11px" }}
                >
                  location_on
                </span>
                <span className="text-slate-300 text-[10px] font-medium truncate">
                  {project.location}
                </span>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {/* ── Scroll Left / Right Buttons ── */}
      <button
        onMouseDown={() => startScroll(-1)}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
        onTouchStart={() => startScroll(-1)}
        onTouchEnd={stopScroll}
        className="absolute left-4 md:left-8 top-1/3 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hidden md:flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-all duration-200 cursor-pointer"
        aria-label="Скролирай наляво"
      >
        <span className="material-symbols-outlined text-xl">chevron_left</span>
      </button>
      <button
        onMouseDown={() => startScroll(1)}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
        onTouchStart={() => startScroll(1)}
        onTouchEnd={stopScroll}
        className="absolute right-4 md:right-8 top-1/3 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hidden md:flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-all duration-200 cursor-pointer"
        aria-label="Скролирай надясно"
      >
        <span className="material-symbols-outlined text-xl">
          chevron_right
        </span>
      </button>

      {/* Text overlay */}
      {showOverlay && (
        <div className="absolute bottom-10 left-8 md:left-16 z-20 pointer-events-none max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-slate-500" />
            <span className="text-[11px] text-slate-400 tracking-[3px] uppercase font-montserrat font-bold">
              Избрани проекти · {projects.length} обекта
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-montserrat text-white leading-[1.1] tracking-tighter mb-2">
            {heading}
            <br />
            <em className="text-amber-500 not-italic">{headingAccent}</em>
          </h2>
          <p className="text-sm md:text-base text-slate-400 mb-6 leading-relaxed">
            {description}
          </p>
          <div className="pointer-events-auto flex items-center gap-4">
            <Link
              href="/kontakti"
              className="inline-block px-8 py-3 rounded-full bg-amber-500 text-slate-950 font-montserrat text-sm font-bold hover:scale-105 transition-transform"
            >
              Започнете проект →
            </Link>
            <span className="text-slate-500 text-xs font-montserrat">
              ← → скролирай или задръж бутоните
            </span>
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox.open && currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <button
              onClick={() => navLightbox(-1)}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={() => navLightbox(1)}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={lightbox.index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={currentProject.coverImage}
              alt={currentProject.title}
              className="max-w-[85vw] max-h-[65vh] object-contain rounded-xl"
            />

            <div className="mt-6 text-center">
              <h3 className="text-white text-2xl font-black font-montserrat tracking-tight mb-1">
                {currentProject.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                {currentProject.type} · {currentProject.location}
                {currentProject.year ? ` · ${currentProject.year}` : ""}
              </p>
              <Link
                href={`/portfolio/${currentProject.slug}`}
                className="inline-block px-6 py-2.5 rounded-full bg-amber-500 text-slate-950 font-montserrat font-bold text-sm hover:scale-105 transition-transform"
                onClick={closeLightbox}
              >
                Разгледайте проекта →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
