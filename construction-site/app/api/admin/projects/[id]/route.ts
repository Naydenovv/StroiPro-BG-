import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

// PUT update project
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};
  const allowedFields = [
    "title", "slug", "type", "year", "area", "location",
    "cover_image", "description", "gallery", "sort_order",
  ];

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Revalidate all relevant pages
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${data.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json(data);
}

// DELETE project
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Get slug before deleting for revalidation
  const { data: project } = await supabaseAdmin
    .from("projects")
    .select("slug")
    .eq("id", id)
    .single();

  const { error } = await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/portfolio");
  if (project) revalidatePath(`/portfolio/${project.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ success: true });
}
