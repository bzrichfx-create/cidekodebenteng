import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CircleCheck as CheckCircle, Building2 } from 'lucide-react';
import { WHATSAPP } from '@/data/siteData';
import { supabase } from '@/lib/supabase';
import Reveal from './Reveal';

export default function Contact() {
  const [form, setForm] = useState({ nama: '', email: '', wa: '', subjek: '', pesan: '' });
  const [sms, setSms] = useState(true);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.email) return;
    setLoading(true);
    try {
      // Simpan pesan ke database agar muncul di Admin Dashboard.
      await supabase.from('contact_messages').insert({
        name: form.nama,
        email: form.email,
        phone: form.wa || null,
        subject: form.subjek || null,
        message: form.pesan,
      });
      // Tambahkan kontak ke CRM.
      await fetch('https://famous.ai/api/crm/6a27d4ff7d4f94dffb7ecf25/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.nama,
          phone: form.wa || undefined,
          sms_opt_in: sms,
          source: 'contact-form',
          tags: ['kontak', 'website'],
        }),
      });
    } catch (e) { /* ignore */ }
    setLoading(false);
    setSent(true);
    setForm({ nama: '', email: '', wa: '', subjek: '', pesan: '' });
    setTimeout(() => setSent(false), 5000);
  };


  const inp = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F5B335] focus:ring-2 focus:ring-[#F5B335]/30 outline-none transition';

  return (
    <section id="kontak" className="py-20 lg:py-28 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-[#F5B335] font-bold tracking-widest uppercase text-sm">Kontak</span>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#5A3E2B] mt-3 mb-4">Hubungi Kami</h2>
          <p className="text-gray-600">Punya pertanyaan, ide kolaborasi, atau ingin bergabung? Kami siap mendengar Anda.</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#5A3E2B] flex items-center justify-center flex-shrink-0"><Building2 className="text-[#F5B335]" size={20} /></div>
              <div>
                <h3 className="font-bold text-[#111] mb-1">Sekretariat</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Jalan Imam Bonjol No. 46, Kelurahan Sukajadi, Kecamatan Karawaci, Kota Tangerang, Banten 15113</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#5A3E2B] flex items-center justify-center flex-shrink-0"><MapPin className="text-[#F5B335]" size={20} /></div>
              <div>
                <h3 className="font-bold text-[#111] mb-1">Basecamp</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Jalan Hartono Raya, No. RT 001/RW 006, Kelurahan Kelapa Indah, Kecamatan Tangerang, Kota Tangerang, Banten 15117.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4 hover:border-[#F5B335] transition">
                <div className="w-11 h-11 rounded-xl bg-[#5A3E2B] flex items-center justify-center flex-shrink-0"><Phone className="text-[#F5B335]" size={20} /></div>
                <div><h3 className="font-bold text-[#111] mb-1 text-sm">WhatsApp</h3><p className="text-sm text-gray-600">+62 852 8652 6886</p></div>
              </a>
              <a href="mailto:cidekodebenteng@gmail.com" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4 hover:border-[#F5B335] transition">
                <div className="w-11 h-11 rounded-xl bg-[#5A3E2B] flex items-center justify-center flex-shrink-0"><Mail className="text-[#F5B335]" size={20} /></div>
                <div className="min-w-0"><h3 className="font-bold text-[#111] mb-1 text-sm">Email</h3><p className="text-xs text-gray-600 truncate">cidekodebenteng@gmail.com</p></div>
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm h-56 border border-gray-100">
              <iframe
                title="Lokasi"
                src="https://www.google.com/maps?q=Jalan+Imam+Bonjol+46+Karawaci+Tangerang&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={submit} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 space-y-4">
              {sent && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
                  <CheckCircle size={18} /> Terima kasih! Pesan Anda telah kami terima.
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <input required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama" className={inp} />
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className={inp} />
              </div>
              <input type="tel" value={form.wa} onChange={(e) => setForm({ ...form, wa: e.target.value })} placeholder="Nomor WhatsApp (opsional)" className={inp} />
              <input value={form.subjek} onChange={(e) => setForm({ ...form, subjek: e.target.value })} placeholder="Subjek" className={inp} />
              <textarea required value={form.pesan} onChange={(e) => setForm({ ...form, pesan: e.target.value })} placeholder="Pesan" rows={5} className={inp} />
              <label className="flex items-start gap-2.5 text-xs text-gray-500 cursor-pointer">
                <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="mt-0.5 accent-[#F5B335]" />
                <span>Kirimi saya info terbaru via SMS/WhatsApp. Msg &amp; data rates may apply. Reply STOP to unsubscribe.</span>
              </label>
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-[#5A3E2B] text-white font-bold py-3.5 rounded-full hover:bg-[#4a3122] transition-colors disabled:opacity-60">
                {loading ? 'Mengirim...' : <>Kirim Pesan <Send size={17} /></>}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
