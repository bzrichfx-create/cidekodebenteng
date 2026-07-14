import { Instagram, Youtube, Facebook, Play, MapPin, Mail, Phone } from 'lucide-react';
import { LOGO, WHATSAPP } from '@/data/siteData';

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const LINKS = [
  { label: 'Beranda', target: 'beranda' },
  { label: 'Tentang Kami', target: 'tentang' },
  { label: 'Visi & Misi', target: 'visi' },
  { label: 'Program', target: 'program' },
  { label: 'Galeri', target: 'galeri' },
  { label: 'Pengurus', target: 'pengurus' },
  { label: 'Kemitraan', target: 'kemitraan' },
  { label: 'Kontak', target: 'kontak' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <img src={LOGO} alt="Logo" className="h-14 w-14 rounded-full bg-white p-0.5" />
            <div>
              <p className="font-serif font-bold leading-tight">CIDE KODE<br /><span className="text-[#F5B335]">BENTENG</span></p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            Yayasan yang melestarikan Kebudayaan Cina Benteng melalui generasi muda dengan nilai Berbudaya, Nasionalis, dan Humanis.
          </p>
          <div className="flex gap-3">
            {[Instagram, Youtube, Facebook, Play].map((Icon, i) => (
              <a key={i} href="https://instagram.com/cidekodebenteng" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F5B335] hover:text-[#111] transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif font-bold text-[#F5B335] mb-5">Quick Links</h3>
          <ul className="space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.label}>
                <button onClick={() => scrollTo(l.target)} className="text-white/60 text-sm hover:text-[#F5B335] transition-colors">{l.label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-bold text-[#F5B335] mb-5">Kontak</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex gap-2.5"><MapPin size={16} className="text-[#F5B335] flex-shrink-0 mt-0.5" /> Jl. Imam Bonjol No. 46, Karawaci, Tangerang, Banten 15113</li>
            <li className="flex gap-2.5"><Phone size={16} className="text-[#F5B335] flex-shrink-0 mt-0.5" /> +62 852 8652 6886</li>
            <li className="flex gap-2.5"><Mail size={16} className="text-[#F5B335] flex-shrink-0 mt-0.5" /> cidekodebenteng@gmail.com</li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-bold text-[#F5B335] mb-5">Tagline</h3>
          <p className="font-serif text-2xl text-white mb-3">"Girang Jasa Kita Mah!"</p>
          <p className="text-white/60 text-sm mb-5">Berbudaya · Nasionalis · Humanis</p>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#F5B335] text-[#111] font-semibold px-5 py-2.5 rounded-full text-sm hover:scale-105 transition-transform">
            <Phone size={15} /> Hubungi Kami
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-white/50 text-sm">
          © 2026 Yayasan Cide Kode Benteng. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
