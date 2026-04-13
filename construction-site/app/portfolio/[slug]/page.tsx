import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectGallery from "@/components/ProjectGallery";

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — StroiPro BG`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <main className="pt-0 pb-24">
      {/* Hero */}
      <header className="relative h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.coverImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pb-16">
          <AnimatedSection>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors mb-6 font-montserrat text-sm"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              Обратно към портфолио
            </Link>
            <span className="block text-secondary font-montserrat text-xs font-bold tracking-[0.3em] uppercase mb-4">
              {project.type} &mdash; {project.year}
            </span>
            <h1 className="text-5xl md:text-7xl font-black font-montserrat tracking-tighter text-white">
              {project.title}
            </h1>
          </AnimatedSection>
        </div>
      </header>

      {/* Project Info */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <AnimatedSection>
          <div className="flex flex-wrap gap-8 md:gap-16 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-montserrat block mb-1">
                Тип
              </span>
              <span className="text-lg font-bold text-primary">
                {project.type}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-montserrat block mb-1">
                Година
              </span>
              <span className="text-lg font-bold text-primary">
                {project.year}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-montserrat block mb-1">
                Площ
              </span>
              <span className="text-lg font-bold text-primary">
                {project.area}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-montserrat block mb-1">
                Локация
              </span>
              <span className="text-lg font-bold text-primary">
                {project.location}
              </span>
            </div>
          </div>

          <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </AnimatedSection>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-8">
        <AnimatedSection>
          <h2 className="text-3xl font-black font-montserrat tracking-tight text-primary mb-8">
            Галерия
          </h2>
        </AnimatedSection>
        <ProjectGallery images={project.gallery} title={project.title} />
      </section>

      {/* Navigation */}
      <section className="max-w-7xl mx-auto px-8 mt-20">
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-12 border-t border-surface-container-high">
          {prevProject ? (
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors font-montserrat font-bold text-primary"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              {prevProject.title}
            </Link>
          ) : (
            <div></div>
          )}
          {nextProject ? (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors font-montserrat font-bold text-primary"
            >
              {nextProject.title}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </section>
    </main>
  );
}
