import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const projectSlug = formData.get("projectSlug") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Generate unique filename
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
  const folder = projectSlug || "general";
  const fileName = `${folder}/${timestamp}-${randomId}.${ext}`;

  // Upload to Supabase Storage
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { error } = await supabaseAdmin.storage
    .from("project-images")
    .upload(fileName, buffer, {
      contentType: file.type || "image/webp",
      cacheControl: "31536000", // 1 year cache
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get public URL
  const { data: urlData } = supabaseAdmin.storage
    .from("project-images")
    .getPublicUrl(fileName);

  return NextResponse.json({
    url: urlData.publicUrl,
    fileName,
  });
}

// DELETE an uploaded image
export async function DELETE(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileName } = await req.json();

  if (!fileName) {
    return NextResponse.json({ error: "No fileName provided" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.storage
    .from("project-images")
    .remove([fileName]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
