import { supabase } from "./supabase";

export interface Project {
  id?: string;
  title: string;
  slug: string;
  type: string;
  year: number;
  area: string;
  location: string;
  coverImage: string;
  description: string;
  gallery: string[];
  sort_order?: number;
}

// Map Supabase snake_case → camelCase
function mapRow(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    type: row.type as string,
    year: row.year as number,
    area: row.area as string,
    location: row.location as string,
    coverImage: row.cover_image as string,
    description: row.description as string,
    gallery: (row.gallery as string[]) || [],
    sort_order: row.sort_order as number,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return (data || []).map(mapRow);
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return undefined;
  return mapRow(data);
}
