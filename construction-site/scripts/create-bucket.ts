/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Creates the "project-images" storage bucket in Supabase.
 * Run with: npx dotenv -e .env.local -- npx tsx scripts/create-bucket.ts
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing env vars. Run with: npx dotenv -e .env.local -- npx tsx scripts/create-bucket.ts");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBucket() {
  // Create bucket
  const { data, error } = await supabase.storage.createBucket("project-images", {
    public: true,
    fileSizeLimit: 10 * 1024 * 1024, // 10MB max
    allowedMimeTypes: ["image/webp", "image/jpeg", "image/png", "image/gif"],
  });

  if (error) {
    if (error.message?.includes("already exists")) {
      console.log("✓ Bucket 'project-images' already exists");
    } else {
      console.error("✗ Error creating bucket:", error.message);
      process.exit(1);
    }
  } else {
    console.log("✓ Bucket 'project-images' created:", data);
  }

  console.log("\nDone! Storage is ready.");
}

createBucket().catch(console.error);
