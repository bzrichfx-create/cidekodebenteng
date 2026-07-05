import { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LOGO } from '@/data/siteData';

const ANGKATAN = ['Angkatan 2018', 'Angkatan 2019', 'Angkatan 2020'];

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [angkatan, setAngkatan] = useState(ANGKATAN[0]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) setError(error);
      else { setSuccess('Berhasil masuk!'); setTimeout(onClose, 600); }
    } else {
      if (!fullName.trim()) { setError('Nama lengkap wajib diisi.'); setLoading(false); return; }
      const { error } = await signUp(email, password, fullName, angkatan);
      if (error) setError(error);
      else setSuccess('Pendaftaran berhasil! Anda dapat langsung masuk.');
    }
    setLoading(false);
  };

  const inp = 'w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#F5B335] focus:ring-2 focus:ring-[#F5B335]/30 outline-none transition';

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-gradient-to-br from-[#5A3E2B] to-[#3d2a1c] p-7 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white"><X size={22} /></button>
          <img src={LOGO} alt="Logo" className="h-16 w-16 rounded-full bg-white mx-auto mb-3 p-0.5" />
          <h2 className="font-serif text-2xl font-bold text-white">{mode === 'login' ? 'Portal Anggota' : 'Daftar Anggota'}</h2>
          <p className="text-white/70 text-sm mt-1">{mode === 'login' ? 'Masuk ke dashboard anggota CIKOD' : 'Buat akun anggota baru'}</p>
        </div>

        <form onSubmit={submit} className="p-7 space-y-4">
          {error && <div className="flex items-center gap-2 bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm"><AlertCircle size={16} /> {error}</div>}
          {success && <div className="flex items-center gap-2 bg-green-50 text-green-600 rounded-xl px-4 py-3 text-sm"><CheckCircle size={16} /> {success}</div>}

          {mode === 'register' && (
            <>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nama Lengkap" className={inp} />
              </div>
              <select value={angkatan} onChange={(e) => setAngkatan(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F5B335] outline-none bg-white">
                {ANGKATAN.map((a) => <option key={a}>{a}</option>)}
              </select>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inp} />
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kata Sandi" minLength={6} className={inp} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#5A3E2B] text-white font-bold py-3.5 rounded-full hover:bg-[#4a3122] transition-colors disabled:opacity-60">
            {loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar Sekarang'}
          </button>

          <p className="text-center text-sm text-gray-500">
            {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess(''); }} className="text-[#F5B335] font-semibold hover:underline">
              {mode === 'login' ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
