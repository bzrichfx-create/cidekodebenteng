import { useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const TOKEN_KEY = 'cikod_admin_token';
const NAME_KEY = 'cikod_admin_name';

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState('Administrator');

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    const n = localStorage.getItem(NAME_KEY);
    if (t) {
      setToken(t);
      if (n) setName(n);
    }
  }, []);

  const handleSuccess = (t: string, n: string) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(NAME_KEY, n);
    setToken(t);
    setName(n);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
    setToken(null);
  };

  if (!token) return <AdminLogin onSuccess={handleSuccess} />;
  return <AdminDashboard adminName={name} onLogout={handleLogout} />;
}
