import { getAllProjects } from "@/lib/projects";
import PortfolioRibbon from "@/components/PortfolioRibbon";

export const metadata = {
  title: "Портфолио — StroiPro BG | Нашите Обекти",
  description:
    "Вижте нашите завършени обекти: жилищно строителство, бизнес сгради и реновации с безкомпромисно качество.",
};

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <main className="pt-20">
      <PortfolioRibbon
        projects={projects}
        heading="Нашите обекти,"
        headingAccent="вашите мечти."
        description="Всяка сграда е доказателство за нашето безкомпромисно внимание към детайла. Разгледайте нашите реализирани проекти."
        height="calc(100vh - 80px)"
      />
    </main>
  );
}
