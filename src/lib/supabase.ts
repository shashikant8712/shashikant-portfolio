import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SiteSection = {
  id: string; name: string; slug: string; icon: string;
  order_index: number; visible: boolean; created_at: string;
};
export type SiteSetting = {
  id: string; key: string; value: string | null; updated_at: string;
};
export type PortfolioProject = {
  id: string; title: string; description: string | null;
  image_url: string | null; tags: string[];
  link_url: string | null; github_url: string | null;
  section_id: string | null; order_index: number;
  visible: boolean; created_at: string;
};
export type Certificate = {
  id: string; title: string; issuer: string | null;
  date_issued: string | null; image_url: string | null;
  credential_url: string | null; order_index: number; visible: boolean;
};
export type Achievement = {
  id: string; title: string; description: string | null;
  icon: string; date_achieved: string | null;
  order_index: number; visible: boolean;
};
export type BlogPost = {
  id: string; title: string; content: string | null;
  cover_image: string | null; published: boolean;
  order_index: number; created_at: string; updated_at: string;
};
export type GalleryItem = {
  id: string; title: string | null; image_url: string;
  caption: string | null; order_index: number; visible: boolean;
};
