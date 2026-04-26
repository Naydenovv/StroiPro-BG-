-- =============================================
-- StroiPro BG — Database Setup
-- Paste this into Supabase SQL Editor and click Run
-- =============================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  year INTEGER NOT NULL,
  area TEXT NOT NULL,
  location TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  description TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view projects)
CREATE POLICY "Public read access" ON projects
  FOR SELECT USING (true);

-- Only service_role can insert/update/delete (bypasses RLS automatically)
-- No extra policies needed — service_role always bypasses RLS

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable realtime (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
