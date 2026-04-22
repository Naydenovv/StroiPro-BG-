import { getAllServices } from "@/lib/services";
import FloatingServices from "@/components/FloatingServices";
import ProcessSection from "@/components/ProcessSection";
import LogoWatermark from "@/components/LogoWatermark";

export const metadata = {
  title: "Услуги — StroiPro BG | Майсторство и Прецизност",
  description:
    "Пълен цикъл строителни услуги: ново строителство, ремонт и реконструкция, покривни системи, интериорно довършване, проектиране.",
};

export default function UslugiPage() {
  const services = getAllServices();

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      <LogoWatermark />
      <FloatingServices services={services} />
      <ProcessSection />
    </main>
  );
}
