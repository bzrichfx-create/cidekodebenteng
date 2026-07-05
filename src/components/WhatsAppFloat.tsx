import { MessageCircle } from 'lucide-react';
import { WHATSAPP } from '@/data/siteData';

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      style={{ animation: 'wapulse 2s infinite' }}
      aria-label="WhatsApp"
    >
      <MessageCircle className="text-white" size={28} fill="white" />
    </a>
  );
}
