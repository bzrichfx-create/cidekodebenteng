import { Eye, Target, Award, Heart, BookOpen, Globe, Sparkles } from 'lucide-react';
import { MISSIONS, HERO_SLIDES } from '@/data/siteData';
import Reveal from './Reveal';

const ICONS = [Award, Sparkles, Heart, BookOpen, Globe, Target];

export default function VisionMission() {
  return (
    <section id="visi" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_SLIDES[1].image})` }}
      />
      <div className="absolute inset-0 bg-[#5A3E2B]/92" />

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Arah Gerak Kami</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mt-3">Visi & Misi</h2>
        </Reveal>

        <Reveal className="mb-14">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto text-center shadow-2xl">
            <Eye className="mx-auto text-[#F5B335] mb-4" size={44} />
            <h3 className="font-serif text-2xl font-bold text-[#F5B335] mb-4">Visi</h3>
            <p className="text-white text-lg lg:text-xl leading-relaxed italic">
              "Melestarikan kebudayaan Cina Benteng melalui generasi muda dengan nilai Berbudaya, Nasionalis, dan Humanis."
            </p>
          </div>
        </Reveal>

        <Reveal className="text-center mb-8">
          <h3 className="font-serif text-2xl font-bold text-white inline-flex items-center gap-3">
            <Target className="text-[#F5B335]" /> Misi
          </h3>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MISSIONS.map((m, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-7 h-full hover:bg-[#F5B335] transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-[#F5B335] group-hover:bg-white flex items-center justify-center mb-5 transition-colors">
                    <Icon className="text-[#5A3E2B]" size={26} />
                  </div>
                  <p className="text-white group-hover:text-[#111] font-medium leading-relaxed transition-colors">{m}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
