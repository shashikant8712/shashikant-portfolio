import { useState, useEffect, useCallback } from 'react';
import { supabase, type SiteSection, type SiteSetting } from '../lib/supabase';

export type Settings = Record<string, string>;

export function useSiteData() {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading]   = useState(true);

  const fetchData = useCallback(async () => {
    const [sr, st] = await Promise.all([
      supabase.from('site_sections').select('*').order('order_index'),
      supabase.from('site_settings').select('*'),
    ]);
    if (sr.data) setSections(sr.data);
    if (st.data) {
      const map: Settings = {};
      (st.data as SiteSetting[]).forEach(r => { map[r.key] = r.value ?? ''; });
      setSettings(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { sections, settings, loading, refetch: fetchData };
}
