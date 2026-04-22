"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Начало" },
  { href: "/uslugi", label: "Услуги" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full px-8 py-4 z-50 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-slate-950/20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon-light.png"
            alt="StroiPro BG"
            width={80}
            height={42}
            className="h-9 w-auto"
            priority
          />
          <span className="text-xl font-bold tracking-tighter text-slate-50 font-montserrat">
            StroiPro BG
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-montserrat tracking-tight text-sm font-medium uppercase transition-colors ${
                  isActive
                    ? "text-amber-500 font-bold border-b-2 border-amber-500 pb-1"
                    : "text-slate-200 hover:text-amber-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/kontakti"
          className="hidden md:block bg-amber-500 text-slate-900 font-montserrat text-xs font-bold uppercase px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 active:scale-95"
        >
          Започнете Вашия Проект
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-50"
          onClick={() => setMobileOpen(true)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-fade-in">
          <button
            className="absolute top-6 right-6 text-slate-50"
            onClick={() => setMobileOpen(false)}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-montserrat text-2xl font-bold uppercase tracking-wide ${
                  isActive ? "text-amber-500" : "text-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/kontakti"
            onClick={() => setMobileOpen(false)}
            className="mt-8 bg-amber-500 text-slate-900 font-montserrat text-sm font-bold uppercase px-10 py-4 rounded-full"
          >
            Започнете Вашия Проект
          </Link>
        </div>
      )}
    </>
  );
}
