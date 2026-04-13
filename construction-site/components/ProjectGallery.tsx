"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

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

  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <button
              onClick={() => openLightbox(i)}
              className="w-full aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${title} - снимка ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </button>
          </AnimatedSection>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          <button
            onClick={goPrev}
            className="absolute left-6 text-white hover:text-amber-500 transition-colors"
          >
            <span className="material-symbols-outlined text-4xl">
              chevron_left
            </span>
          </button>

          <button
            onClick={goNext}
            className="absolute right-6 text-white hover:text-amber-500 transition-colors"
          >
            <span className="material-symbols-outlined text-4xl">
              chevron_right
            </span>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[currentIndex]}
            alt={`${title} - снимка ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
          />

          <div className="absolute bottom-6 text-white font-montserrat text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
