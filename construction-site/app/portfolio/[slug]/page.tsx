import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import ProjectGallery from "@/components/ProjectGallery";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — StroiPro BG`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-slate-950 pb-24">

      {/* Hero */}
      <header className="relative h-[55vh] md:h-[75vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('${project.coverImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10" />
        {/* Perspective grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors mb-8 font-montserrat text-sm tracking-wider uppercase"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Обратно към начало
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-amber-500 font-montserrat text-xs font-bold tracking-[0.3em] uppercase">
              {project.type}
            </span>
            <span className="w-6 h-px bg-amber-500/50" />
            <span className="text-slate-400 font-montserrat text-xs tracking-widest">
              {project.year}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black font-montserrat tracking-tighter text-white leading-none">
            {project.title}
          </h1>
        </div>
      </header>

      {/* Project Info */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Description */}
          <div>
            <p className="text-lg text-slate-300 leading-relaxed">
              {project.description}
            </p>
            <Link
              href="/kontakti"
              className="inline-flex items-center gap-2 mt-8 bg-amber-500 text-slate-950 font-montserrat text-sm font-bold uppercase px-8 py-4 rounded-full hover:scale-105 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              Подобен проект?
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Тип проект", value: project.type, icon: "category" },
              { label: "Година", value: String(project.year), icon: "calendar_today" },
              { label: "Площ", value: project.area, icon: "straighten" },
              { label: "Локация", value: project.location, icon: "location_on" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-900/60 backdrop-blur-sm border border-white/5 rounded-2xl p-5"
              >
                <span className="material-symbols-outlined text-amber-500 text-xl mb-2 block">
                  {stat.icon}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-montserrat block mb-1">
                  {stat.label}
                </span>
                <span className="text-lg font-bold text-slate-100 font-montserrat">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-4 mb-10">
          <span className="w-8 h-px bg-amber-500" />
          <span className="text-amber-500 font-montserrat text-xs font-bold tracking-[0.3em] uppercase">
            Снимки от обекта
          </span>
        </div>
        <h2 className="text-4xl font-black font-montserrat tracking-tighter text-white mb-10">
          Галерия
        </h2>
        <ProjectGallery images={project.gallery} title={project.title} />
      </section>

      {/* Navigation */}
      <section className="max-w-7xl mx-auto px-8 mt-20">
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-12 border-t border-white/5">
          {prevProject ? (
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-slate-900/60 border border-white/5 hover:border-amber-500/30 hover:bg-slate-800/60 transition-all font-montserrat font-bold text-slate-200 hover:text-amber-400"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              {prevProject.title}
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-slate-900/60 border border-white/5 hover:border-amber-500/30 hover:bg-slate-800/60 transition-all font-montserrat font-bold text-slate-200 hover:text-amber-400"
            >
              {nextProject.title}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

    </main>
  );
}
