import fs from "fs";
import path from "path";

export interface Project {
  title: string;
  slug: string;
  type: string;
  year: number;
  area: string;
  location: string;
  coverImage: string;
  description: string;
  gallery: string[];
}

const projectsDir = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    return JSON.parse(content) as Project;
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug);
}
