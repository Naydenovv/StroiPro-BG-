import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

const BASE = "https://construction-site-five-kappa.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["/", "/uslugi", "/kontakti", "/portfolio"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "/" ? 1 : 0.8,
  }));

  const projectPages = getAllProjects().map((project) => ({
    url: `${BASE}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
