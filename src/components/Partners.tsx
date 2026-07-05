import { Megaphone, ArrowRight } from 'lucide-react';
import { WHATSAPP, PARTNER_CATEGORIES } from '@/data/siteData';
import Reveal from './Reveal';

interface PartnersProps {
  category?: 'media' | 'sponsorship' | 'lembaga';
}

export default function Partners({ category }: PartnersProps) {
  const cats = category ? PARTNER_CATEGORIES.filter((c) => c.id === category) : PARTNER_CATEGORIES;

  return (
    <section id="kemitraan" className="py-20 lg:py-28 bg-[#f5ede0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Kolaborasi</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#5A3E2B] mt-3 mb-4">
            {category ? cats[0]?.label : 'Kemitraan'}
          </h2>
          <p className="text-gray-600">
            Bersama mitra strategis kami memperluas dampak budaya dan sosial Cide Kode Benteng.
          </p>
        </Reveal>

        <div className="space-y-16">
          {cats.map((cat, ci) => (
            <Reveal key={cat.id} delay={ci * 80}>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-1.5 rounded-full bg-[#F5B335]" />
                  <h3 className="font-serif text-2xl font-bold text-[#5A3E2B]">{cat.label}</h3>
                </div>
                <p className="text-gray-600 max-w-3xl mb-7 leading-relaxed">{cat.desc}</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      className="group bg-white rounded-2xl p-6 shadow-sm border border-[#F5B335]/20 hover:shadow-xl hover:border-[#F5B335] transition-all flex flex-col items-center text-center"
                    >
                      <div className="w-28 h-28 rounded-2xl overflow-hidden bg-[#FFFDF8] flex items-center justify-center mb-4 ring-1 ring-gray-100">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                      <span className="font-semibold text-[#5A3E2B]">{item.name}</span>
                      <span className="text-xs text-gray-400 mt-1">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16">
        <Reveal>
          <div className="relative bg-gradient-to-br from-[#5A3E2B] to-[#3d2a1c] rounded-3xl p-10 lg:p-14 text-center overflow-hidden">
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#F5B335]/20 blur-2xl" />
            <Megaphone className="mx-auto text-[#F5B335] mb-4" size={44} />
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-3">Menjadi Mitra Kami</h3>
            <p className="text-white/80 max-w-xl mx-auto mb-7">
              Jadikan brand atau lembaga Anda bagian dari gerakan pelestarian budaya. Tersedia berbagai bentuk kemitraan: media partner, sponsorship, dan kemitraan lembaga.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5B335] text-[#111] font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              Hubungi Kami <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
