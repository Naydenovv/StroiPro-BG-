import servicesData from "@/content/services.json";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export function getAllServices(): Service[] {
  return servicesData as Service[];
}
