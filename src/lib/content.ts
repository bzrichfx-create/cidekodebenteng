import { supabase } from '@/lib/supabase';
import { GALLERY, PARTNERS } from '@/data/siteData';

export type Photo = { src: string; title: string };
export type Video = { youtube: string; title: string };

export const DEFAULT_PHOTOS: Photo[] = GALLERY.map((g) => ({ src: g.src, title: g.title }));

export const DEFAULT_VIDEOS: Video[] = [
  { youtube: 'dQw4w9WgXcQ', title: 'Dokumentasi Kegiatan CIKOD' },
];

export const DEFAULT_PARTNERS: string[] = [...PARTNERS];

export const CONTENT_KEYS = {
  photos: 'gallery_photos',
  videos: 'gallery_videos',
  partners: 'partners',
} as const;

// Extract a YouTube video id from either a raw id or any youtube url.
export function youtubeId(input: string): string {
  if (!input) return '';
  const s = input.trim();
  // Already an id (no slashes / dots typical of urls)
  if (!/[/.]/.test(s) && s.length >= 6) return s;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{6,})/,
    /(?:youtu\.be\/)([\w-]{6,})/,
    /(?:youtube\.com\/embed\/)([\w-]{6,})/,
    /(?:youtube\.com\/shorts\/)([\w-]{6,})/,
  ];
  for (const p of patterns) {
    const m = s.match(p);
    if (m) return m[1];
  }
  return s;
}

export const ytThumb = (input: string) => `https://img.youtube.com/vi/${youtubeId(input)}/hqdefault.jpg`;
export const ytEmbed = (input: string) => `https://www.youtube.com/embed/${youtubeId(input)}`;

export async function loadContent<T>(key: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('key', key)
      .maybeSingle();
    if (error || !data) return fallback;
    return (data.data as T) ?? fallback;
  } catch {
    return fallback;
  }
}

export async function saveContent(key: string, data: unknown): Promise<{ error?: string }> {
  const { error } = await supabase
    .from('site_content')
    .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) return { error: error.message };
  return {};
}
