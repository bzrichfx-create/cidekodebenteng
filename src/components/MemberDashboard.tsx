import { useEffect, useState } from 'react';
import { X, LogOut, User, Calendar, Bell, Save, Megaphone, Phone, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { LOGO } from '@/data/siteData';

interface Announcement { id: string; title: string; body: string; category: string; created_at: string; }

const CAT_COLOR: Record<string, string> = {
  Internal: 'bg-blue-100 text-blue-700',
  Kegiatan: 'bg-green-100 text-green-700',
  Keuangan: 'bg-amber-100 text-amber-700',
  Edukasi: 'bg-purple-100 text-purple-700',
  Umum: 'bg-gray-100 text-gray-700',
};

export default function MemberDashboard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [tab, setTab] = useState<'announcements' | 'profile'>('announcements');
  const [list, setList] = useState<Announcement[]>([]);
  const [form, setForm] = useState({ full_name: '', department: '', phone: '', bio: '' });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && user) {
      supabase.from('announcements').select('*').order('created_at', { ascending: false }).then(({ data }) => setList((data as Announcement[]) || []));
    }
  }, [open, user]);

  useEffect(() => {
    if (profile) setForm({ full_name: profile.full_name, department: profile.department, phone: profile.phone, bio: profile.bio });
  }, [profile]);

  if (!open || !user) return null;

  const save = async () => {
    setSaving(true);
    await updateProfile(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inp = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F5B335] focus:ring-2 focus:ring-[#F5B335]/30 outline-none transition';
  const initials = (profile?.full_name || user.email || 'A').split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-[#FFFDF8] sm:rounded-3xl w-full max-w-4xl h-full sm:h-[90vh] overflow-hidden flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div className="bg-gradient-to-r from-[#5A3E2B] to-[#3d2a1c] p-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="" className="h-10 w-10 rounded-full bg-white p-0.5 hidden sm:block" />
            <div>
              <h2 className="font-serif text-lg font-bold text-white">Dashboard Anggota</h2>
              <p className="text-white/60 text-xs">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { signOut(); onClose(); }} className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-full transition"><LogOut size={15} /> <span className="hidden sm:inline">Keluar</span></button>
            <button onClick={onClose} className="text-white/70 hover:text-white p-2"><X size={22} /></button>
          </div>
        </div>

        {/* profile banner */}
        <div className="bg-white border-b border-gray-100 p-5 flex items-center gap-4 flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-[#F5B335] flex items-center justify-center text-[#5A3E2B] font-serif text-2xl font-bold flex-shrink-0">{initials}</div>
          <div className="min-w-0">
            <h3 className="font-serif text-xl font-bold text-[#5A3E2B] truncate">{profile?.full_name || 'Anggota CIKOD'}</h3>
            <p className="inline-flex items-center gap-1.5 text-sm text-white bg-[#5A3E2B] px-3 py-1 rounded-full mt-1"><Calendar size={13} /> {profile?.angkatan || '—'}</p>
          </div>
        </div>

        {/* tabs */}
        <div className="flex border-b border-gray-100 bg-white flex-shrink-0">
          <button onClick={() => setTab('announcements')} className={`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition ${tab === 'announcements' ? 'text-[#5A3E2B] border-b-2 border-[#F5B335]' : 'text-gray-400'}`}><Bell size={16} /> Pengumuman</button>
          <button onClick={() => setTab('profile')} className={`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition ${tab === 'profile' ? 'text-[#5A3E2B] border-b-2 border-[#F5B335]' : 'text-gray-400'}`}><User size={16} /> Profil Saya</button>
        </div>

        {/* content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {tab === 'announcements' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#5A3E2B] mb-2"><Megaphone size={18} className="text-[#F5B335]" /> <span className="font-semibold">Pengumuman Eksklusif Anggota</span></div>
              {list.map((a) => (
                <div key={a.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <h4 className="font-serif font-bold text-[#111]">{a.title}</h4>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${CAT_COLOR[a.category] || CAT_COLOR.Umum}`}>{a.category}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{a.body}</p>
                  <p className="text-xs text-gray-400 mt-3">{new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              ))}
              {list.length === 0 && <p className="text-center text-gray-400 py-10">Belum ada pengumuman.</p>}
            </div>
          ) : (
            <div className="max-w-lg space-y-4">
              {saved && <div className="bg-green-50 text-green-600 rounded-xl px-4 py-3 text-sm">Profil berhasil diperbarui.</div>}
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5 mb-1.5"><User size={14} /> Nama Lengkap</label>
                <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className={inp} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5 mb-1.5"><Calendar size={14} /> Angkatan</label>
                <input value={profile?.angkatan || ''} disabled className={`${inp} bg-gray-50 text-gray-500`} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5 mb-1.5"><Building2 size={14} /> Departemen</label>
                <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="cth. Departemen Sosial" className={inp} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5 mb-1.5"><Phone size={14} /> Nomor WhatsApp</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="08xxxxxxxxxx" className={inp} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} placeholder="Ceritakan sedikit tentang Anda..." className={inp} />
              </div>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-[#5A3E2B] text-white font-bold px-6 py-3 rounded-full hover:bg-[#4a3122] transition disabled:opacity-60">
                <Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
