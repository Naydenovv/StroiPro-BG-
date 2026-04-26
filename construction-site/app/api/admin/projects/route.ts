import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

// GET all projects (admin view with all fields)
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST create new project
export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Generate slug from title if not provided
  if (!body.slug) {
    body.slug = body.title
      .toLowerCase()
      .replace(/[а-я]/g, (c: string) => {
        const map: Record<string, string> = {
          а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z",
          и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
          р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch",
          ш: "sh", щ: "sht", ъ: "a", ь: "", ю: "yu", я: "ya",
        };
        return map[c] || c;
      })
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
  }

  const { data, error } = await supabaseAdmin.from("projects").insert({
    title: body.title,
    slug: body.slug,
    type: body.type,
    year: body.year,
    area: body.area,
    location: body.location,
    cover_image: body.cover_image,
    description: body.description,
    gallery: body.gallery || [],
    sort_order: body.sort_order || 0,
  }).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Revalidate pages that show projects
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/sitemap.xml");

  return NextResponse.json(data, { status: 201 });
}
