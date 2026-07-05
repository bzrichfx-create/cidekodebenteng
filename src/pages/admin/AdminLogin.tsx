import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, User, Loader2, ShieldCheck } from 'lucide-react';
import { LOGO } from '@/data/siteData';

interface Props {
  onSuccess: (token: string, name: string) => void;
}

export default function AdminLogin({ onSuccess }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Mohon isi username dan password.');
      return;
    }
    setLoading(true);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke('admin-auth', {
        body: { username, password },
      });
      if (fnErr || !data?.ok) {
        setError(data?.error || 'Login gagal. Periksa kembali kredensial Anda.');
        return;
      }
      onSuccess(data.token, data.name || 'Administrator');
    } catch {
      setError('Terjadi kesalahan koneksi. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-amber-900 px-4">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <img src={LOGO} alt="Logo" className="h-16 w-auto mb-4" />
            <div className="flex items-center gap-2 text-red-800">
              <ShieldCheck className="h-5 w-5" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">Yayasan Cide Kode Benteng</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none"
                  placeholder="Masukkan username"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none"
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-800 hover:bg-red-900 text-white font-semibold py-2.5 transition disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-4 w-4" />}
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Akses khusus pengurus. Kredensial default: admin / cikod2024
          </p>
        </div>
        <a href="/" className="block text-center text-white/80 hover:text-white text-sm mt-6">
          &larr; Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
