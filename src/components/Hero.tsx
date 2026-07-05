import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES } from '@/data/siteData';

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();
  const go = (target: string) => navigate(target);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="beranda" className="relative h-screen min-h-[600px] overflow-hidden">
      {HERO_SLIDES.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === idx ? 1 : 0 }}>
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: i === idx ? 'kenburns 8s ease-out forwards' : 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111]/70 via-[#111]/50 to-[#5A3E2B]/80" />
        </div>
      ))}

      {/* floating decorative */}
      <div className="absolute top-24 right-10 w-40 h-40 rounded-full bg-[#F5B335]/20 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-[#5A3E2B]/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl" key={idx}>
            <span className="inline-block bg-[#F5B335] text-[#111] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5" style={{ animation: 'fadeUp .8s ease both' }}>
              Berbudaya · Nasionalis · Humanis
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5" style={{ animation: 'fadeUp .9s ease .1s both' }}>
              {HERO_SLIDES[idx].title}
            </h1>
            <p className="text-base sm:text-lg text-white/85 mb-8 max-w-2xl" style={{ animation: 'fadeUp 1s ease .2s both' }}>
              {HERO_SLIDES[idx].subtitle}
            </p>
            <div className="flex flex-wrap gap-4" style={{ animation: 'fadeUp 1.1s ease .3s both' }}>
              <button
                onClick={() => go(HERO_SLIDES[idx].primary.target)}
                className="bg-[#F5B335] text-[#111] font-bold px-7 py-3.5 rounded-full hover:scale-105 hover:shadow-2xl transition-all shadow-lg"
              >
                {HERO_SLIDES[idx].primary.label}
              </button>
              <button
                onClick={() => go(HERO_SLIDES[idx].secondary.target)}
                className="border-2 border-white/70 text-white font-bold px-7 py-3.5 rounded-full hover:bg-white hover:text-[#5A3E2B] transition-all"
              >
                {HERO_SLIDES[idx].secondary.label}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setIdx((idx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-[#F5B335] hidden sm:block">
        <ChevronLeft size={40} />
      </button>
      <button onClick={() => setIdx((idx + 1) % HERO_SLIDES.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-[#F5B335] hidden sm:block">
        <ChevronRight size={40} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-2.5 rounded-full transition-all ${i === idx ? 'w-10 bg-[#F5B335]' : 'w-2.5 bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
