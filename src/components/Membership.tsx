import { useState, useMemo } from 'react';
import { Award, X, Search } from 'lucide-react';
import { ANGGOTA_MEMBERS, ANGKATAN_LIST } from '@/data/siteData';
import Reveal from './Reveal';

const TABS = ['Semua', ...ANGKATAN_LIST];

type Anggota = (typeof ANGGOTA_MEMBERS)[number];

function MemberInitials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#5A3E2B] to-[#3d2a1c]">
      <span className="font-serif text-4xl font-bold text-[#F5B335]">{initials}</span>
    </div>
  );
}

export default function Membership() {
  const [filter, setFilter] = useState('Semua');
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState<Anggota | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ANGGOTA_MEMBERS.filter(
      (m) =>
        (filter === 'Semua' || m.angkatan === filter) &&
        (!q || m.name.toLowerCase().includes(q) || m.gelar.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  return (
    <section id="keanggotaan" className="py-20 lg:py-28 bg-gradient-to-b from-white to-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Komunitas</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#5A3E2B] mt-3 mb-4">Keanggotaan</h2>
          <p className="text-gray-600">
            Mengenal para anggota dan duta budaya Cide Kode Benteng dari berbagai angkatan.
          </p>
        </Reveal>

        {/* Tabs angkatan */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {TABS.map((a) => (
            <button
              key={a}
              onClick={() => setFilter(a)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === a ? 'bg-[#5A3E2B] text-white shadow' : 'bg-[#5A3E2B]/5 text-[#5A3E2B] hover:bg-[#F5B335]/20'
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Pencarian */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau gelar anggota..."
            className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#F5B335] outline-none bg-white"
          />
        </div>

        {list.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Tidak ada anggota yang cocok dengan pencarian.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {list.map((m, i) => (
              <Reveal key={`${m.name}-${i}`} delay={(i % 4) * 60}>
                <button
                  onClick={() => setDetail(m)}
                  className="group w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col"
                >
                  <div className="relative overflow-hidden aspect-[4/5] bg-[#f5ede0]">
                    {m.hasPhoto ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <MemberInitials name={m.name} />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#111]/60 to-transparent" />
                  </div>
                  <div className="p-4 text-center flex flex-col flex-1">
                    <h4 className="font-serif text-base lg:text-lg font-bold text-[#111] leading-tight">{m.name}</h4>
                    <span className="mt-2 inline-flex items-center justify-center gap-1.5 self-center text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F5B335]/20 text-[#92400E]">
                      <Award className="w-3.5 h-3.5" />
                      {m.gelar}
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {detail && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/5] bg-[#f5ede0]">
              {detail.hasPhoto ? (
                <img src={detail.photo} alt={detail.name} className="w-full h-full object-contain" />
              ) : (
                <MemberInitials name={detail.name} />
              )}
              <button onClick={() => setDetail(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-[#F5B335]"><X size={18} /></button>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-serif text-2xl font-bold text-[#5A3E2B]">{detail.name}</h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full bg-[#F5B335]/20 text-[#92400E]">
                <Award size={14} /> {detail.gelar}
              </p>
              <p className="text-gray-500 text-sm mt-3">{detail.angkatan}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
