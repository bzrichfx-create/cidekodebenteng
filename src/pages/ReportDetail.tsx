import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, FileText, Tag } from 'lucide-react';
import { REPORTS } from '@/data/siteData';
import Reveal from '@/components/Reveal';

export default function ReportDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const report = REPORTS.find((r) => r.slug === slug);

  if (!report) {
    return (
      <div className="pt-32 pb-24 text-center max-w-2xl mx-auto px-6">
        <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
        <h1 className="font-serif text-2xl font-bold text-[#5A3E2B] mb-3">Laporan tidak ditemukan</h1>
        <button onClick={() => navigate('/laporan')} className="text-[#5A3E2B] font-semibold hover:underline">
          Kembali ke Laporan Kegiatan
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    alert(`Mengunduh: ${report.title}\n\nDokumen laporan akan segera tersedia untuk diunduh.`);
  };

  return (
    <div className="bg-white">
      {/* Hero header */}
      <div className="relative h-[42vh] min-h-[320px] overflow-hidden">
        <img src={report.cover} alt={report.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/55 to-[#5A3E2B]/60" />
        <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-10">
          <button
            onClick={() => navigate('/laporan')}
            className="self-start flex items-center gap-2 text-white/90 hover:text-[#F5B335] text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Laporan Kegiatan
          </button>
          <span className="inline-flex w-fit items-center gap-1.5 bg-[#F5B335] text-[#111] text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Tag size={12} /> {report.type}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight max-w-3xl">
            {report.title}
          </h1>
          <p className="flex items-center gap-2 text-white/80 text-sm mt-3">
            <Calendar size={14} /> {report.date} · {report.size}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <Reveal className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold text-[#5A3E2B] mb-4">Keterangan Kegiatan</h2>
            <p className="text-gray-700 leading-relaxed">{report.description}</p>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-[#FFFDF8] border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-[#111] mb-1">Unduh Laporan</h3>
              <p className="text-sm text-gray-500 mb-4">Format dokumen · {report.size}</p>
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-[#F5B335] text-[#111] font-bold px-5 py-3 rounded-full hover:bg-[#e0a426] transition-colors shadow"
              >
                <Download size={18} /> Unduh Laporan
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="font-serif text-2xl font-bold text-[#5A3E2B] mb-6">Dokumentasi Foto Aktivitas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {report.photos.map((src, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-xl shadow-sm">
                <img src={src} alt={`Aktivitas ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 text-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 bg-[#5A3E2B] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#3d2a1c] transition-colors shadow-lg"
          >
            <Download size={18} /> Unduh Laporan Kegiatan
          </button>
        </div>
      </div>
    </div>
  );
}
