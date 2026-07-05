import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ORGS } from '@/data/siteData';
import Reveal from './Reveal';

const accent = '#F5B335';

function MemberCard({ m, i }: { m: any; i: number }) {
  const initials = m.name
    .replace(/,.*$/, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase();
  const isLeader = /Ketua|Kepala|Pendiri/i.test(m.role || '');
  return (
    <Reveal delay={(i % 4) * 60}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col border border-[#f0e6d6]">
        <div className="relative overflow-hidden aspect-square bg-[#f5ede0]">
          {m.showPhoto ? (
            <img
              src={m.photo}
              alt={m.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#5A3E2B] to-[#3d2a1c]">
              <span className="font-serif text-4xl font-bold text-[#F5B335]">{initials}</span>
            </div>
          )}
        </div>
        <div className="p-4 text-center flex flex-col flex-1">
          <h4 className="font-serif font-bold text-[#111] leading-tight">{m.name}</h4>
          {m.role && (
            <p
              className={`text-xs mt-1.5 flex-1 ${
                isLeader ? 'font-semibold text-[#9A3412]' : 'text-gray-500'
              }`}
            >
              {m.role}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Team() {
  const [activeOrg, setActiveOrg] = useState(0);
  const [query, setQuery] = useState('');

  const org = ORGS[activeOrg];

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return org.groups
      .map((g) => ({
        group: g.group,
        members: g.members.filter((m) => !q || m.name.toLowerCase().includes(q)),
      }))
      .filter((g) => g.members.length > 0);
  }, [org, query]);

  return (
    <section id="pengurus" className="py-20 lg:py-28 bg-gradient-to-b from-[#FFFDF8] to-[#f5ede0]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-8 max-w-2xl mx-auto">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Organisasi</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#5A3E2B] mt-3 mb-4">Susunan Kepengurusan</h2>
          <p className="text-gray-600">
            Struktur organisasi yang solid dalam menjalankan visi dan misi pelestarian budaya.
          </p>
        </Reveal>

        {/* Org Tabs */}
        <Reveal className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {ORGS.map((o, idx) => (
              <button
                key={o.id}
                onClick={() => {
                  setActiveOrg(idx);
                  setQuery('');
                }}
                className={`px-4 lg:px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 text-center ${
                  activeOrg === idx
                    ? 'bg-[#5A3E2B] text-white shadow-lg'
                    : 'bg-white text-[#5A3E2B] hover:bg-[#5A3E2B]/5 border border-[#e8dcc8]'
                }`}
                style={activeOrg === idx ? { boxShadow: `0 8px 20px -6px ${accent}66` } : undefined}
              >
                {o.short}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active org title */}
        <Reveal className="text-center mb-8">
          <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#9A3412] uppercase tracking-wide">
            {org.label}
          </h3>
        </Reveal>

        {/* Search */}
        <Reveal className="mb-12 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama pengurus..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-[#F5B335] focus:ring-2 focus:ring-[#F5B335]/20 outline-none text-sm"
            />
          </div>
        </Reveal>

        {groups.length === 0 && (
          <div className="text-center py-16 text-gray-500">Tidak ada pengurus yang cocok dengan pencarian.</div>
        )}

        {groups.map((group) => (
          <div key={group.group} className="mb-14">
            <Reveal className="flex items-center gap-3 mb-6">
              <span className="h-6 w-1.5 rounded-full" style={{ background: accent }} />
              <h3 className="font-serif text-lg lg:text-2xl font-bold text-[#5A3E2B]">{group.group}</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-[#9A3412] bg-[#FEF3C7]">
                {group.members.length} orang
              </span>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.members.map((m, i) => (
                <MemberCard key={`${m.name}-${i}`} m={m} i={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
