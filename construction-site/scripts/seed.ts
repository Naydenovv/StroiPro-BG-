/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Seed script — migrates existing JSON project files into Supabase.
 * Run with: npx tsx scripts/seed.ts
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  console.error("Run with: npx dotenv -e .env.local -- npx tsx scripts/seed.ts");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const projectsDir = path.join(process.cwd(), "content/projects");
  const files = fs.readdirSync(projectsDir).filter((f: string) => f.endsWith(".json"));

  console.log(`Found ${files.length} project files to seed...\n`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const content = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const project = JSON.parse(content);

    const row = {
      title: project.title,
      slug: project.slug,
      type: project.type,
      year: project.year,
      area: project.area,
      location: project.location,
      cover_image: project.coverImage,
      description: project.description,
      gallery: project.gallery,
      sort_order: i,
    };

    const { error } = await supabase
      .from("projects")
      .upsert(row, { onConflict: "slug" });

    if (error) {
      console.error(`✗ ${project.title}: ${error.message}`);
    } else {
      console.log(`✓ ${project.title}`);
    }
  }

  console.log("\nDone! All projects seeded.");
}

seed().catch(console.error);
