import { useState } from 'react';
import { FileText, Search, ArrowRight, Calendar, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { REPORTS } from '@/data/siteData';
import Reveal from './Reveal';

const TYPES = ['Semua', 'Laporan Tahunan', 'Laporan Keuangan', 'Dokumentasi'];

export default function Reports() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('Semua');
  const navigate = useNavigate();

  const list = REPORTS.filter(
    (r) => (type === 'Semua' || r.type === type) && r.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <section id="laporan" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Transparansi</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#5A3E2B] mt-3 mb-4">Laporan Kegiatan</h2>
          <p className="text-gray-600">Pilih salah satu laporan untuk melihat keterangan kegiatan, dokumentasi foto, dan mengunduh laporannya.</p>
        </Reveal>

        <Reveal className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari laporan..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#F5B335] focus:ring-2 focus:ring-[#F5B335]/30 outline-none"
            />
          </div>
          <select value={type} onChange={(e) => setType(e.target.value)} className="px-5 py-3 rounded-full border border-gray-200 focus:border-[#F5B335] outline-none bg-white">
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 2) * 80}>
              <button
                onClick={() => navigate(`/laporan/${r.slug}`)}
                className="group text-left w-full bg-[#FFFDF8] border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-[#F5B335] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={r.cover} alt={r.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-[#5A3E2B] text-white text-[11px] font-semibold px-3 py-1 rounded-full">{r.type}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-serif text-lg font-bold text-[#111] leading-snug">{r.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-1">{r.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500"><Calendar size={13} /> {r.date} · {r.size}</span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-[#5A3E2B] group-hover:text-[#e0a426] transition-colors">
                      Lihat Detail <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-gray-400 py-10 flex flex-col items-center gap-2">
            <FileText className="w-8 h-8 opacity-40" />
            Tidak ada laporan ditemukan.
          </p>
        )}
      </div>
    </section>
  );
}
