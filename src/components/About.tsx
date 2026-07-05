import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { ABOUT_IMAGE, ABOUT_FULL } from '@/data/siteData';
import Reveal from './Reveal';

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <section id="tentang" className="py-20 lg:py-28 bg-[#FFFDF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={ABOUT_IMAGE} alt="Tentang Cide Kode Benteng" loading="lazy" className="w-full h-[420px] object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-[#5A3E2B] text-white rounded-2xl px-7 py-5 shadow-xl hidden sm:block">
            <p className="text-4xl font-serif font-bold text-[#F5B335]">2023</p>
            <p className="text-sm">Yayasan Resmi Berdiri</p>
          </div>
          <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-[#F5B335]/40 rounded-2xl -z-0" />
        </Reveal>

        <Reveal delay={150}>
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Tentang Kami</span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#5A3E2B] mt-3 mb-6">
            Tentang Yayasan Cide Kode Benteng
          </h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            Cide Kode Benteng merupakan komunitas pemuda yang fokus melestarikan Kebudayaan Cina Benteng di Kota Tangerang.
            Berawal dari kegiatan pageant budaya pada tahun 2013, berkembang menjadi komunitas aktif dan resmi membentuk
            Yayasan Cide Kode Benteng pada tahun 2023.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {['Berbudaya', 'Nasionalis', 'Humanis'].map((v) => (
              <div key={v} className="text-center bg-white rounded-xl py-4 shadow-sm border border-[#F5B335]/20">
                <p className="font-serif font-bold text-[#5A3E2B]">{v}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 bg-[#5A3E2B] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#4a3122] hover:gap-3 transition-all"
          >
            Selengkapnya <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>

      {/* Popup Profil Lengkap */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-[#FFFDF8] rounded-3xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#5A3E2B] px-7 py-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-[#F5B335] font-bold tracking-widest uppercase text-xs">Profil</span>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mt-1">
                  Tentang Cide Kode Benteng
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-7 py-7 max-h-[70vh] overflow-y-auto space-y-5">
              <img
                src={ABOUT_IMAGE}
                alt="Cide Kode Benteng"
                loading="lazy"
                className="w-full h-56 object-cover rounded-2xl shadow-md mb-2"
              />
              {ABOUT_FULL.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed text-justify">
                  {para}
                </p>
              ))}
            </div>

            <div className="px-7 py-5 border-t border-[#F5B335]/20 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 bg-[#5A3E2B] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#4a3122] transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
