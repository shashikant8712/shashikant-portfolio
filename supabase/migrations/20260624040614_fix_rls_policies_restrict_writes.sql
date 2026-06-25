/*
  Fix: RLS policies with always-true write clauses

  The original write policies used USING (true) / WITH CHECK (true) which grants
  unrestricted write access to any authenticated user — effectively bypassing RLS.

  This portfolio has a single admin identified by a password stored in site_settings.
  There are no per-row ownership columns, so we cannot scope writes to auth.uid().

  Fix strategy: Restrict all write operations (INSERT / UPDATE / DELETE) to the
  service_role only. Public reads (anon + authenticated) remain open.
  Admin writes from the UI are performed via the Supabase client using the anon key
  with the AdminPanel password gate — the DB-level write restriction ensures that
  no ordinary authenticated session can mutate data without going through the
  service role.
*/

-- ── site_sections ───────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_insert_sections"  ON site_sections;
DROP POLICY IF EXISTS "auth_update_sections"  ON site_sections;
DROP POLICY IF EXISTS "auth_delete_sections"  ON site_sections;

CREATE POLICY "service_insert_sections"  ON site_sections
  FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "service_update_sections"  ON site_sections
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_delete_sections"  ON site_sections
  FOR DELETE TO service_role USING (true);

-- ── site_settings ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_insert_settings"  ON site_settings;
DROP POLICY IF EXISTS "auth_update_settings"  ON site_settings;
DROP POLICY IF EXISTS "auth_delete_settings"  ON site_settings;

CREATE POLICY "service_insert_settings"  ON site_settings
  FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "service_update_settings"  ON site_settings
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_delete_settings"  ON site_settings
  FOR DELETE TO service_role USING (true);

-- ── portfolio_projects ───────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_insert_projects"  ON portfolio_projects;
DROP POLICY IF EXISTS "auth_update_projects"  ON portfolio_projects;
DROP POLICY IF EXISTS "auth_delete_projects"  ON portfolio_projects;

CREATE POLICY "service_insert_projects"  ON portfolio_projects
  FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "service_update_projects"  ON portfolio_projects
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_delete_projects"  ON portfolio_projects
  FOR DELETE TO service_role USING (true);

-- ── portfolio_content ────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_insert_content"   ON portfolio_content;
DROP POLICY IF EXISTS "auth_update_content"   ON portfolio_content;
DROP POLICY IF EXISTS "auth_delete_content"   ON portfolio_content;

CREATE POLICY "service_insert_content"   ON portfolio_content
  FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "service_update_content"   ON portfolio_content
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_delete_content"   ON portfolio_content
  FOR DELETE TO service_role USING (true);

-- ── certificates ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_insert_certs"     ON certificates;
DROP POLICY IF EXISTS "auth_update_certs"     ON certificates;
DROP POLICY IF EXISTS "auth_delete_certs"     ON certificates;

CREATE POLICY "service_insert_certs"     ON certificates
  FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "service_update_certs"     ON certificates
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_delete_certs"     ON certificates
  FOR DELETE TO service_role USING (true);

-- ── gallery_items ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_insert_gallery"   ON gallery_items;
DROP POLICY IF EXISTS "auth_update_gallery"   ON gallery_items;
DROP POLICY IF EXISTS "auth_delete_gallery"   ON gallery_items;

CREATE POLICY "service_insert_gallery"   ON gallery_items
  FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "service_update_gallery"   ON gallery_items
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_delete_gallery"   ON gallery_items
  FOR DELETE TO service_role USING (true);

-- ── blog_posts ────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_insert_blog"      ON blog_posts;
DROP POLICY IF EXISTS "auth_update_blog"      ON blog_posts;
DROP POLICY IF EXISTS "auth_delete_blog"      ON blog_posts;

CREATE POLICY "service_insert_blog"      ON blog_posts
  FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "service_update_blog"      ON blog_posts
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_delete_blog"      ON blog_posts
  FOR DELETE TO service_role USING (true);

-- ── achievements ──────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_insert_achievements" ON achievements;
DROP POLICY IF EXISTS "auth_update_achievements" ON achievements;
DROP POLICY IF EXISTS "auth_delete_achievements" ON achievements;

CREATE POLICY "service_insert_achievements" ON achievements
  FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "service_update_achievements" ON achievements
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_delete_achievements" ON achievements
  FOR DELETE TO service_role USING (true);
