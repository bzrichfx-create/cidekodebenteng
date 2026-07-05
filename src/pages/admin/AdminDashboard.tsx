import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ANGGOTA_MEMBERS, ANGKATAN_LIST, ORGS, REPORTS, LOGO } from '@/data/siteData';
import {
  LayoutDashboard, Users, Mail, LogOut, Search, Inbox,
  UsersRound, FileText, CheckCircle2, Loader2, Award,
} from 'lucide-react';

interface Props {
  adminName: string;
  onLogout: () => void;
}

type Msg = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

const TABS = [
  { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
  { id: 'anggota', label: 'Anggota', icon: Users },
  { id: 'pengurus', label: 'Pengurus', icon: UsersRound },
  { id: 'pesan', label: 'Pesan Masuk', icon: Mail },
] as const;

export default function AdminDashboard({ adminName, onLogout }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('overview');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loadingMsgs, setLoadingMsgs] = useState(true);
  const [angkatanFilter, setAngkatanFilter] = useState('Semua');
  const [search, setSearch] = useState('');

  const loadMessages = async () => {
    setLoadingMsgs(true);
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMsgs((data as Msg[]) || []);
    setLoadingMsgs(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const markRead = async (id: string) => {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    setMsgs((m) => m.map((x) => (x.id === id ? { ...x, is_read: true } : x)));
  };

  const totalPengurus = useMemo(
    () => ORGS.reduce((sum, o) => sum + o.groups.reduce((s, g) => s + g.members.length, 0), 0),
    [],
  );
  const unread = msgs.filter((m) => !m.is_read).length;

  const filteredAnggota = useMemo(() => {
    return ANGGOTA_MEMBERS.filter(
      (a) =>
        (angkatanFilter === 'Semua' || a.angkatan === angkatanFilter) &&
        (a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.gelar.toLowerCase().includes(search.toLowerCase())),
    );
  }, [angkatanFilter, search]);

  const stats = [
    { label: 'Total Anggota', value: ANGGOTA_MEMBERS.length, icon: Users, color: 'bg-red-100 text-red-700' },
    { label: 'Total Pengurus', value: totalPengurus, icon: UsersRound, color: 'bg-amber-100 text-amber-700' },
    { label: 'Laporan', value: REPORTS.length, icon: FileText, color: 'bg-blue-100 text-blue-700' },
    { label: 'Pesan Belum Dibaca', value: unread, icon: Inbox, color: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-red-900 text-white">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <img src={LOGO} alt="Logo" className="h-9 w-auto bg-white rounded p-0.5" />
          <div>
            <p className="font-bold text-sm leading-tight">Admin Panel</p>
            <p className="text-[11px] text-white/60">Cide Kode Benteng</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                tab === t.id ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <t.icon className="h-4 w-4" />

              {t.label}
              {t.id === 'pesan' && unread > 0 && (
                <span className="ml-auto bg-amber-400 text-red-900 text-[10px] font-bold rounded-full px-2 py-0.5">
                  {unread}
                </span>
              )}
            </button>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-6 py-4 border-t border-white/10 text-white/80 hover:text-white text-sm"
        >
          <LogOut className="h-4 w-4" /> Keluar
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b px-4 sm:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 capitalize">
              {TABS.find((t) => t.id === tab)?.label}
            </h1>
            <p className="text-xs text-gray-500">Selamat datang, {adminName}</p>
          </div>
          <button
            onClick={onLogout}
            className="md:hidden flex items-center gap-1.5 text-sm text-red-700 font-medium"
          >
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </header>

        {/* Mobile tabs */}
        <div className="md:hidden flex overflow-x-auto border-b bg-white">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${
                tab === t.id ? 'border-red-700 text-red-700' : 'border-transparent text-gray-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <main className="flex-1 p-4 sm:p-8 overflow-auto">
          {tab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white rounded-xl border p-5 shadow-sm">
                    <div className={`inline-flex p-2.5 rounded-lg ${s.color} mb-3`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-sm text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-red-700" /> Jumlah Anggota per Angkatan
                </h2>
                <div className="space-y-3">
                  {ANGKATAN_LIST.map((ang) => {
                    const count = ANGGOTA_MEMBERS.filter((a) => a.angkatan === ang).length;
                    const pct = Math.round((count / ANGGOTA_MEMBERS.length) * 100);
                    return (
                      <div key={ang}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{ang}</span>
                          <span className="font-medium text-gray-900">{count} anggota</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-700 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {tab === 'anggota' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama atau gelar..."
                    className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm focus:border-red-600 outline-none"
                  />
                </div>
                <select
                  value={angkatanFilter}
                  onChange={(e) => setAngkatanFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-600 outline-none"
                >
                  <option>Semua</option>
                  {ANGKATAN_LIST.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Foto</th>
                      <th className="px-4 py-3 font-medium">Nama</th>
                      <th className="px-4 py-3 font-medium">Gelar</th>
                      <th className="px-4 py-3 font-medium">Angkatan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredAnggota.map((a, i) => (
                      <tr key={`${a.name}-${i}`} className="hover:bg-gray-50">
                        <td className="px-4 py-2.5">
                          <img src={a.photo} alt={a.name} className="h-10 w-10 rounded-full object-cover bg-gray-100" />
                        </td>
                        <td className="px-4 py-2.5 font-medium text-gray-900">{a.name}</td>
                        <td className="px-4 py-2.5 text-gray-600">{a.gelar}</td>
                        <td className="px-4 py-2.5 text-gray-500">{a.angkatan}</td>
                      </tr>
                    ))}
                    {filteredAnggota.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                          Tidak ada anggota ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'pengurus' && (
            <div className="space-y-6">
              {ORGS.map((o) => (
                <div key={o.id} className="bg-white rounded-xl border shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">{o.short}</h3>
                  <div className="space-y-4">
                    {o.groups.map((g) => (
                      <div key={g.group}>
                        <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1.5">
                          {g.group}
                        </p>
                        <ul className="text-sm text-gray-700 space-y-0.5 pl-1">
                          {g.members.map((m, idx) => (
                            <li key={idx} className="flex justify-between gap-4">
                              <span>{m.name}</span>
                              <span className="text-gray-400 text-xs whitespace-nowrap">{m.role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'pesan' && (
            <div className="space-y-4">
              {loadingMsgs ? (
                <div className="flex items-center justify-center py-16 text-gray-400">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : msgs.length === 0 ? (
                <div className="bg-white rounded-xl border shadow-sm py-16 text-center text-gray-400">
                  <Inbox className="h-10 w-10 mx-auto mb-2" />
                  Belum ada pesan masuk.
                </div>
              ) : (
                msgs.map((m) => (
                  <div
                    key={m.id}
                    className={`bg-white rounded-xl border shadow-sm p-5 ${
                      m.is_read ? '' : 'border-l-4 border-l-red-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {m.name}{' '}
                          {!m.is_read && (
                            <span className="ml-1 text-[10px] font-bold uppercase text-red-600">Baru</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          {m.email}{m.phone ? ` • ${m.phone}` : ''}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {new Date(m.created_at).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    {m.subject && <p className="text-sm font-medium text-gray-700 mt-3">{m.subject}</p>}
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{m.message}</p>
                    {!m.is_read && (
                      <button
                        onClick={() => markRead(m.id)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-red-700 hover:text-red-900"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Tandai sudah dibaca
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
