import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import Reveal from './Reveal';

export default function Gallery() {
  const { photos } = useAppContext();
  const [open, setOpen] = useState<number | null>(null);

  const close = () => setOpen(null);
  const prev = () => setOpen((o) => (o === null ? o : (o - 1 + photos.length) % photos.length));
  const next = () => setOpen((o) => (o === null ? o : (o + 1) % photos.length));

  return (
    <section id="galeri" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Dokumentasi</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#5A3E2B] mt-3 mb-4">Galeri Foto</h2>
          <p className="text-gray-600">Momen berharga dari berbagai kegiatan budaya, sosial, dan kebersamaan kami.</p>
        </Reveal>

        {photos.length === 0 ? (
          <p className="text-center text-gray-400 py-16">Belum ada foto.</p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:balance]">
            {photos.map((g, i) => (
              <Reveal key={i} delay={(i % 4) * 60} className="mb-4 break-inside-avoid">
                <button
                  onClick={() => setOpen(i)}
                  className="group relative w-full overflow-hidden rounded-2xl block shadow-sm hover:shadow-xl transition-shadow"
                >
                  <img src={g.src} alt={g.title} loading="lazy" className="w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white font-semibold text-sm text-left">{g.title}</span>
                  </div>
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#F5B335]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={18} className="text-[#111]" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {open !== null && photos[open] && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={close}>
          <button onClick={close} className="absolute top-5 right-5 text-white hover:text-[#F5B335]"><X size={32} /></button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-white hover:text-[#F5B335]"><ChevronLeft size={44} /></button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={photos[open].src} alt={photos[open].title} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <p className="text-center text-white mt-4 font-serif text-xl">{photos[open].title}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-white hover:text-[#F5B335]"><ChevronRight size={44} /></button>
        </div>
      )}
    </section>
  );
}
