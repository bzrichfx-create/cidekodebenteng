import { useState } from 'react';
import { X, Play, Youtube } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { ytThumb, ytEmbed } from '@/lib/content';
import Reveal from './Reveal';

export default function GalleryVideos() {
  const { videos } = useAppContext();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="galeri-video" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Dokumentasi</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#5A3E2B] mt-3 mb-4">Galeri Video</h2>
          <p className="text-gray-600">Kumpulan video kegiatan dan dokumentasi Cide Kode Benteng.</p>
        </Reveal>

        {videos.length === 0 ? (
          <p className="text-center text-gray-400 py-16">Belum ada video.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <Reveal key={i} delay={(i % 3) * 60}>
                <button
                  onClick={() => setOpen(i)}
                  className="group relative w-full overflow-hidden rounded-2xl block shadow-sm hover:shadow-xl transition-shadow text-left"
                >
                  <div className="relative aspect-video bg-gray-100">
                    <img src={ytThumb(v.youtube)} alt={v.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <span className="w-14 h-14 rounded-full bg-[#F5B335] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={24} className="text-[#111] ml-1" />
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-2">
                    <Youtube size={18} className="text-red-600 flex-shrink-0" />
                    <span className="font-semibold text-[#5A3E2B] text-sm">{v.title}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {open !== null && videos[open] && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <button onClick={() => setOpen(null)} className="absolute top-5 right-5 text-white hover:text-[#F5B335]"><X size={32} /></button>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full">
              <iframe
                src={`${ytEmbed(videos[open].youtube)}?autoplay=1`}
                title={videos[open].title}
                className="absolute inset-0 w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-white mt-4 font-serif text-xl">{videos[open].title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
