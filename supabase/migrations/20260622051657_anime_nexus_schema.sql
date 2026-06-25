/*
# Anime Story Nexus - Database Schema

1. New Tables
- `site_sections` - Dynamic navigation sections (Home, About, Projects, etc.)
  - id, name, slug, icon, order_index, visible, created_at
- `site_settings` - Global site config (title, colors, music, admin password hash)
  - id, key, value
- `portfolio_projects` - Project cards
  - id, title, description, image_url, tags, link_url, github_url, section_id, order_index, visible
- `portfolio_content` - Rich content blocks per section
  - id, section_id, block_type, content_json, order_index
- `certificates` - Certificate items
  - id, title, issuer, date_issued, image_url, credential_url, order_index, visible
- `gallery_items` - Gallery images
  - id, title, image_url, caption, order_index, visible
- `blog_posts` - Blog entries
  - id, title, content, cover_image, published, created_at
- `achievements` - Achievement/award items
  - id, title, description, icon, date_achieved, order_index, visible

2. Security
- RLS enabled on all tables
- Public read access (anon + authenticated)
- Write access for authenticated only (admin)
*/

-- Site sections (navigation)
CREATE TABLE IF NOT EXISTS site_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  icon text DEFAULT 'Star',
  order_index int NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE site_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_sections" ON site_sections;
CREATE POLICY "public_read_sections" ON site_sections FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_sections" ON site_sections;
CREATE POLICY "auth_insert_sections" ON site_sections FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_sections" ON site_sections;
CREATE POLICY "auth_update_sections" ON site_sections FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_sections" ON site_sections;
CREATE POLICY "auth_delete_sections" ON site_sections FOR DELETE TO authenticated USING (true);

-- Site settings (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_settings" ON site_settings;
CREATE POLICY "public_read_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_settings" ON site_settings;
CREATE POLICY "auth_insert_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_settings" ON site_settings;
CREATE POLICY "auth_update_settings" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_settings" ON site_settings;
CREATE POLICY "auth_delete_settings" ON site_settings FOR DELETE TO authenticated USING (true);

-- Portfolio projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  tags text[] DEFAULT '{}',
  link_url text,
  github_url text,
  section_id uuid REFERENCES site_sections(id) ON DELETE SET NULL,
  order_index int NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_projects" ON portfolio_projects;
CREATE POLICY "public_read_projects" ON portfolio_projects FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_projects" ON portfolio_projects;
CREATE POLICY "auth_insert_projects" ON portfolio_projects FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_projects" ON portfolio_projects;
CREATE POLICY "auth_update_projects" ON portfolio_projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_projects" ON portfolio_projects;
CREATE POLICY "auth_delete_projects" ON portfolio_projects FOR DELETE TO authenticated USING (true);

-- Content blocks per section
CREATE TABLE IF NOT EXISTS portfolio_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES site_sections(id) ON DELETE CASCADE,
  block_type text NOT NULL DEFAULT 'text',
  content_json jsonb NOT NULL DEFAULT '{}',
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_content" ON portfolio_content;
CREATE POLICY "public_read_content" ON portfolio_content FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_content" ON portfolio_content;
CREATE POLICY "auth_insert_content" ON portfolio_content FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_content" ON portfolio_content;
CREATE POLICY "auth_update_content" ON portfolio_content FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_content" ON portfolio_content;
CREATE POLICY "auth_delete_content" ON portfolio_content FOR DELETE TO authenticated USING (true);

-- Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text,
  date_issued text,
  image_url text,
  credential_url text,
  order_index int NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_certs" ON certificates;
CREATE POLICY "public_read_certs" ON certificates FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_certs" ON certificates;
CREATE POLICY "auth_insert_certs" ON certificates FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_certs" ON certificates;
CREATE POLICY "auth_update_certs" ON certificates FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_certs" ON certificates;
CREATE POLICY "auth_delete_certs" ON certificates FOR DELETE TO authenticated USING (true);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  caption text,
  order_index int NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gallery" ON gallery_items;
CREATE POLICY "public_read_gallery" ON gallery_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_gallery" ON gallery_items;
CREATE POLICY "auth_insert_gallery" ON gallery_items FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_gallery" ON gallery_items;
CREATE POLICY "auth_update_gallery" ON gallery_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_gallery" ON gallery_items;
CREATE POLICY "auth_delete_gallery" ON gallery_items FOR DELETE TO authenticated USING (true);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  cover_image text,
  published boolean NOT NULL DEFAULT false,
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_blog" ON blog_posts;
CREATE POLICY "public_read_blog" ON blog_posts FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_blog" ON blog_posts;
CREATE POLICY "auth_insert_blog" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_blog" ON blog_posts;
CREATE POLICY "auth_update_blog" ON blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_blog" ON blog_posts;
CREATE POLICY "auth_delete_blog" ON blog_posts FOR DELETE TO authenticated USING (true);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text DEFAULT 'Trophy',
  date_achieved text,
  order_index int NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_achievements" ON achievements;
CREATE POLICY "public_read_achievements" ON achievements FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_achievements" ON achievements;
CREATE POLICY "auth_insert_achievements" ON achievements FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_achievements" ON achievements;
CREATE POLICY "auth_update_achievements" ON achievements FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_achievements" ON achievements;
CREATE POLICY "auth_delete_achievements" ON achievements FOR DELETE TO authenticated USING (true);

-- Seed default sections
INSERT INTO site_sections (name, slug, icon, order_index, visible) VALUES
  ('Home', 'home', 'Home', 0, true),
  ('About Me', 'about', 'User', 1, true),
  ('Education', 'education', 'GraduationCap', 2, true),
  ('Skills', 'skills', 'Zap', 3, true),
  ('Projects', 'projects', 'FolderOpen', 4, true),
  ('Certificates', 'certificates', 'Award', 5, true),
  ('Gallery', 'gallery', 'Image', 6, true),
  ('Blog', 'blog', 'BookOpen', 7, true),
  ('Achievements', 'achievements', 'Trophy', 8, true),
  ('Contact', 'contact', 'Mail', 9, true)
ON CONFLICT (slug) DO NOTHING;

-- Seed default settings
INSERT INTO site_settings (key, value) VALUES
  ('site_title', 'Anime Story Nexus'),
  ('site_subtitle', 'A journey through worlds of wonder'),
  ('admin_password', 'admin123'),
  ('primary_color', '#6ee7f7'),
  ('accent_color', '#f9a8d4'),
  ('music_enabled', 'false'),
  ('dark_mode', 'false'),
  ('character_name', 'Yuki'),
  ('owner_name', 'Your Name'),
  ('owner_tagline', 'Creative Developer & Storyteller')
ON CONFLICT (key) DO NOTHING;

-- Seed sample projects
INSERT INTO portfolio_projects (title, description, image_url, tags, link_url, order_index, visible) VALUES
  ('Starfall Chronicles', 'An immersive fantasy web experience with parallax worlds and animated characters.', 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['React','Three.js','GSAP'], '#', 0, true),
  ('Dreamscape UI', 'Beautiful UI component library inspired by anime aesthetics and Makoto Shinkai art style.', 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['TypeScript','Tailwind','Framer Motion'], '#', 1, true),
  ('Aurora Weather', 'A weather app wrapped in a magical aurora-themed interface with live animations.', 'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['React','API','Canvas'], '#', 2, true)
ON CONFLICT DO NOTHING;
