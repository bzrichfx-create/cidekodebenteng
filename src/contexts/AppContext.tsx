import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  loadContent, CONTENT_KEYS,
  DEFAULT_PHOTOS, DEFAULT_VIDEOS, DEFAULT_PARTNERS,
  Photo, Video,
} from '@/lib/content';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  photos: Photo[];
  videos: Video[];
  partners: string[];
  contentLoading: boolean;
  refreshContent: () => Promise<void>;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  photos: DEFAULT_PHOTOS,
  videos: DEFAULT_VIDEOS,
  partners: DEFAULT_PARTNERS,
  contentLoading: true,
  refreshContent: async () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>(DEFAULT_PHOTOS);
  const [videos, setVideos] = useState<Video[]>(DEFAULT_VIDEOS);
  const [partners, setPartners] = useState<string[]>(DEFAULT_PARTNERS);
  const [contentLoading, setContentLoading] = useState(true);

  const refreshContent = useCallback(async () => {
    const [p, v, pa] = await Promise.all([
      loadContent<Photo[]>(CONTENT_KEYS.photos, DEFAULT_PHOTOS),
      loadContent<Video[]>(CONTENT_KEYS.videos, DEFAULT_VIDEOS),
      loadContent<string[]>(CONTENT_KEYS.partners, DEFAULT_PARTNERS),
    ]);
    setPhotos(Array.isArray(p) && p.length ? p : DEFAULT_PHOTOS);
    setVideos(Array.isArray(v) ? v : DEFAULT_VIDEOS);
    setPartners(Array.isArray(pa) && pa.length ? pa : DEFAULT_PARTNERS);
    setContentLoading(false);
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <AppContext.Provider
      value={{ sidebarOpen, toggleSidebar, photos, videos, partners, contentLoading, refreshContent }}
    >
      {children}
    </AppContext.Provider>
  );
};
