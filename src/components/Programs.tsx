import { CalendarRange, Clock, Users2, CheckCircle2 } from 'lucide-react';
import { LONG_PROGRAMS, SHORT_PROGRAMS, SDM_TEXT } from '@/data/siteData';
import Reveal from './Reveal';

function ProgramList({
  title,
  subtitle,
  items,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  items: string[];
  icon: typeof CalendarRange;
}) {
  return (
    <div className="bg-white rounded-3xl p-8 lg:p-10 h-full shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5A3E2B] to-[#7a5638] flex items-center justify-center flex-shrink-0">
          <Icon className="text-[#F5B335]" size={28} />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#5A3E2B]">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <ol className="space-y-3.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5B335]/20 text-[#5A3E2B] text-xs font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Programs() {
  return (
    <section id="program" className="py-20 lg:py-28 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Aktivitas</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#5A3E2B] mt-3 mb-4">Rencana Program</h2>
          <p className="text-gray-600">
            Rencana program kerja Yayasan Cide Kode Benteng yang dirancang untuk melestarikan budaya dan memberdayakan generasi muda, terbagi dalam program jangka panjang dan jangka pendek.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-7 items-stretch">
          <Reveal>
            <ProgramList
              title="Program Jangka Panjang"
              subtitle="Sasaran strategis berkelanjutan"
              items={LONG_PROGRAMS}
              icon={CalendarRange}
            />
          </Reveal>
          <Reveal delay={120}>
            <ProgramList
              title="Program Jangka Pendek"
              subtitle="Aksi nyata dalam waktu dekat"
              items={SHORT_PROGRAMS}
              icon={Clock}
            />
          </Reveal>
        </div>

        {/* Sumber Daya Manusia */}
        <Reveal delay={150} className="mt-12">
          <div className="relative bg-gradient-to-br from-[#5A3E2B] to-[#3d2a1c] rounded-3xl p-10 lg:p-14 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-[#F5B335]/15 blur-3xl" />
            <div className="relative flex flex-col lg:flex-row items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-[#F5B335] flex items-center justify-center flex-shrink-0">
                <Users2 className="text-[#5A3E2B]" size={32} />
              </div>
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-4">Sumber Daya Manusia</h3>
                <p className="text-white/85 leading-relaxed max-w-3xl mb-6">{SDM_TEXT}</p>
                <div className="flex flex-wrap gap-3">
                  {['2018', '2019', '2020', '2023', '2024', '2025'].map((y) => (
                    <span key={y} className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full">
                      <CheckCircle2 size={15} className="text-[#F5B335]" /> {y}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1.5 bg-[#F5B335] text-[#5A3E2B] text-sm font-bold px-4 py-2 rounded-full">
                    121 SDM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
