import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import CounterStats from "@/components/CounterStats";
import ServicesSection from "@/components/ServicesSection";
import HomeHero from "@/components/HomeHero";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      {/* Hero: PortfolioRibbon as background + hero text overlay */}
      <HomeHero projects={projects} />

      {/* Stats Section */}
      <CounterStats />

      {/* Services Section */}
      <ServicesSection />

      {/* CTA Banner */}
      <section className="relative py-12 md:py-24 px-4 md:px-8 overflow-hidden bg-slate-950">
        <div className="max-w-7xl mx-auto bg-amber-500 rounded-2xl p-8 md:p-20 relative z-10 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-slate-950/5 rounded-full blur-3xl"></div>
          <AnimatedSection>
            <div className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="text-center md:text-left max-w-xl">
                <h2 className="text-2xl md:text-5xl font-black text-slate-950 font-montserrat mb-4 md:mb-6 tracking-tight">
                  Имате проект? Свържете се с нас.
                </h2>
                <p className="text-base md:text-xl text-slate-900/80 font-medium leading-relaxed">
                  Нашите експерти са готови да обсъдят Вашите идеи и да предложат
                  най-доброто решение за Вашия нов дом.
                </p>
              </div>
              <Link
                href="/kontakti"
                className="whitespace-nowrap bg-slate-950 text-white px-8 md:px-12 py-4 md:py-6 rounded-full font-black text-base md:text-xl hover:scale-105 transition-transform shadow-2xl shadow-slate-950/40"
              >
                Започнете Вашия Проект
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
