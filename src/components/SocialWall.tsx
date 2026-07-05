import { Instagram, Youtube, Play } from 'lucide-react';
import { GALLERY } from '@/data/siteData';
import Reveal from './Reveal';

export default function SocialWall() {
  return (
    <section id="sosial" className="py-20 lg:py-28 bg-[#111] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 20%, #F5B335 0, transparent 45%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Social Media</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mt-3 mb-3">Ikuti Perjalanan Kami</h2>
          <a href="https://instagram.com/cidekodebenteng" target="_blank" rel="noreferrer" className="text-[#F5B335] font-semibold hover:underline">@cidekodebenteng</a>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {GALLERY.slice(0, 8).map((g, i) => (
            <Reveal key={i} delay={(i % 4) * 60}>
              <a href="https://instagram.com/cidekodebenteng" target="_blank" rel="noreferrer" className="group relative block aspect-square rounded-2xl overflow-hidden">
                <img src={g.src} alt={g.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#5A3E2B]/0 group-hover:bg-[#5A3E2B]/60 transition-colors flex items-center justify-center">
                  {i % 3 === 0 ? <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} /> : <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={30} />}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://instagram.com/cidekodebenteng" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F5B335] to-[#e0a426] text-[#111] font-bold px-7 py-3.5 rounded-full hover:scale-105 transition-transform"><Instagram size={18} /> Instagram</a>
          <a href="https://youtube.com/@cidekodebenteng" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-bold px-7 py-3.5 rounded-full hover:bg-white/20 transition"><Youtube size={18} /> YouTube</a>
          <a href="https://tiktok.com/@cidekodebenteng" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-bold px-7 py-3.5 rounded-full hover:bg-white/20 transition"><Play size={18} /> TikTok</a>
        </div>
      </div>
    </section>
  );
}
