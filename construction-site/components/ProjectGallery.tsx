"use client";

import { useState, useEffect, useCallback } from "react";

interface Props {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const goNext = useCallback(() => setCurrentIndex((p) => (p + 1) % images.length), [images.length]);
  const goPrev = useCallback(() => setCurrentIndex((p) => (p - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, goNext, goPrev]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
              i === 0 ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${title} — снимка ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-all duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-xl">
                zoom_in
              </span>
            </div>
            {/* Index badge */}
            <div className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-sm text-slate-300 text-xs font-montserrat font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {i + 1} / {images.length}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500/20 text-white hover:text-amber-400 transition-all flex items-center justify-center z-10"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-amber-500/20 text-white hover:text-amber-400 transition-all flex items-center justify-center z-10"
          >
            <span className="material-symbols-outlined text-3xl">chevron_left</span>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-amber-500/20 text-white hover:text-amber-400 transition-all flex items-center justify-center z-10"
          >
            <span className="material-symbols-outlined text-3xl">chevron_right</span>
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[currentIndex]}
            alt={`${title} — снимка ${currentIndex + 1}`}
            className="max-w-[88vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter + dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-amber-500 w-5" : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <span className="text-slate-400 font-montserrat text-xs">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
