# Yayasan Cide Kode Benteng Website

Website resmi Yayasan Cide Kode Benteng untuk pelestarian Kebudayaan Cina Benteng di Kota Tangerang.

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Supabase (Database + Auth + Edge Functions)
- React Router DOM

## Database Tables
- `site_content` - Konten dinamis (foto, video, partner)
- `contact_messages` - Pesan dari form kontak
- `announcements` - Pengumuman dashboard anggota
- `member_profiles` - Profil anggota CIKOD

## Admin Credentials
- URL: `/admin`
- Username: `admin`
- Password: `cikod2024`

## Routes
- `/` - Homepage (Hero, About, Stats, Programs, Gallery)
- `/tentang` - Tentang Kami
- `/visi-misi` - Visi & Misi
- `/pengurus` - Susunan Kepengurusan
- `/keanggotaan` - Daftar Anggota
- `/program` - Rencana Program
- `/laporan` - Laporan Kegiatan
- `/kemitraan` - Kemitraan
- `/galeri` - Galeri Foto & Video
- `/kontak` - Form Kontak
- `/admin` - Admin Dashboard

## Environment Variables
Required in `.env`:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key

## Commands
- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
