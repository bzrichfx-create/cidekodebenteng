import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Youtube, Facebook, Phone, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGO, WHATSAPP } from '@/data/siteData';

const MENU = [
  { label: 'Beranda', target: '/' },
  {
    label: 'Tentang Kami',
    target: '/tentang',
    sub: [
      { label: 'Profil', target: '/tentang' },
      { label: 'Visi Misi', target: '/visi-misi' },
      { label: 'Susunan Pengurus', target: '/pengurus' },
      { label: 'Keanggotaan', target: '/keanggotaan' },
    ],
  },
  {
    label: 'Aktivitas',
    target: '/program',
    sub: [
      { label: 'Rencana Program', target: '/program' },
      { label: 'Laporan Kegiatan', target: '/laporan' },
    ],
  },
  {
    label: 'Kemitraan',
    target: '/kemitraan',
    sub: [
      { label: 'Media Partner', target: '/kemitraan/media' },
      { label: 'Mitra Sponsorship', target: '/kemitraan/sponsorship' },
      { label: 'Mitra Lembaga', target: '/kemitraan/lembaga' },
    ],
  },
  {
    label: 'Gallery',
    target: '/galeri/foto',
    sub: [
      { label: 'Foto', target: '/galeri/foto' },
      { label: 'Video', target: '/galeri/video' },
    ],
  },
  { label: 'Kontak', target: '/kontak' },
];

interface NavbarProps {
  onSignIn?: () => void;
  onDashboard?: () => void;
}

export default function Navbar(_props: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        solid ? 'bg-[#5A3E2B]/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button onClick={() => go('/')} className="flex items-center gap-2">
          <img src={LOGO} alt="Yayasan Cide Kode Benteng" className="h-12 w-12 rounded-full object-cover bg-white/90 p-0.5" />
          <span className="font-serif font-bold leading-tight hidden sm:block text-white drop-shadow">
            CIDE KODE<br /><span className="text-[#F5B335]">BENTENG</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {MENU.map((m) => (
            <div key={m.label} className="relative group">
              <button
                onClick={() => go(m.target)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-[#F5B335] transition-colors"
              >
                {m.label}
                {m.sub && <ChevronDown size={14} />}
              </button>
              {m.sub && (
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden min-w-[210px] py-2">
                    {m.sub.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => go(s.target)}
                        className="block w-full text-left px-4 py-2.5 text-sm text-[#111] hover:bg-[#F5B335]/15 hover:text-[#5A3E2B] transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2">
            {[Instagram, Youtube, Facebook].map((Icon, i) => (
              <a key={i} href="https://instagram.com/cidekodebenteng" target="_blank" rel="noreferrer" className="text-white hover:text-[#F5B335] transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-[#F5B335] text-[#111] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e0a426] transition-colors shadow">
            <Phone size={15} /> WhatsApp
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="bg-[#5A3E2B] px-4 py-4 space-y-1">
          {MENU.map((m) => (
            <div key={m.label}>
              <button
                onClick={() => (m.sub ? setMobileSub(mobileSub === m.label ? null : m.label) : go(m.target))}
                className="flex items-center justify-between w-full text-left py-2.5 text-white font-medium border-b border-white/10"
              >
                {m.label}
                {m.sub && <ChevronDown size={16} className={`transition-transform ${mobileSub === m.label ? 'rotate-180' : ''}`} />}
              </button>
              {m.sub && mobileSub === m.label && (
                <div className="pl-4 py-1 space-y-1">
                  {m.sub.map((s) => (
                    <button key={s.label} onClick={() => go(s.target)} className="block w-full text-left py-2 text-sm text-[#F5B335]/90">
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#F5B335] text-[#111] mt-3 py-3 rounded-full font-semibold">
            <Phone size={16} /> Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
