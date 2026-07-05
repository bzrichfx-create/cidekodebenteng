import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Hero from '@/components/Hero';
import About from '@/components/About';
import VisionMission from '@/components/VisionMission';
import Stats from '@/components/Stats';
import Programs from '@/components/Programs';
import Gallery from '@/components/Gallery';
import GalleryVideos from '@/components/GalleryVideos';
import Team from '@/components/Team';
import Membership from '@/components/Membership';
import Partners from '@/components/Partners';
import Reports from '@/components/Reports';
import SocialWall from '@/components/SocialWall';
import Contact from '@/components/Contact';
import ReportDetail from '@/pages/ReportDetail';
import Admin from '@/pages/admin/Admin';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function Layout() {
  const navigate = useNavigate();
  const goAdmin = () => navigate('/admin');
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar onSignIn={goAdmin} onDashboard={goAdmin} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

const Pad = ({ children }: { children: React.ReactNode }) => <div className="pt-20">{children}</div>;

const Home = () => (<><Hero /><About /><Stats /><Programs /><Gallery /></>);
const TentangPage = () => (<Pad><About /><VisionMission /></Pad>);
const VisiPage = () => (<Pad><VisionMission /></Pad>);
const PengurusPage = () => (<Pad><Team /></Pad>);
const KeanggotaanPage = () => (<Pad><Membership /></Pad>);
const ProgramPage = () => (<Pad><Programs /></Pad>);
const LaporanPage = () => (<Pad><Reports /></Pad>);
const KemitraanPage = () => (<Pad><Partners /></Pad>);
const KemitraanMediaPage = () => (<Pad><Partners category="media" /></Pad>);
const KemitraanSponsorshipPage = () => (<Pad><Partners category="sponsorship" /></Pad>);
const KemitraanLembagaPage = () => (<Pad><Partners category="lembaga" /></Pad>);
const GaleriFotoPage = () => (<Pad><Gallery /><SocialWall /></Pad>);
const GaleriVideoPage = () => (<Pad><GalleryVideos /><SocialWall /></Pad>);
const KontakPage = () => (<Pad><Contact /></Pad>);

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/tentang" element={<TentangPage />} />
                  <Route path="/visi-misi" element={<VisiPage />} />
                  <Route path="/pengurus" element={<PengurusPage />} />
                  <Route path="/keanggotaan" element={<KeanggotaanPage />} />
                  <Route path="/program" element={<ProgramPage />} />
                  <Route path="/laporan" element={<LaporanPage />} />
                  <Route path="/laporan/:slug" element={<Pad><ReportDetail /></Pad>} />
                  <Route path="/kemitraan" element={<KemitraanPage />} />
                  <Route path="/kemitraan/media" element={<KemitraanMediaPage />} />
                  <Route path="/kemitraan/sponsorship" element={<KemitraanSponsorshipPage />} />
                  <Route path="/kemitraan/lembaga" element={<KemitraanLembagaPage />} />
                  <Route path="/galeri" element={<GaleriFotoPage />} />
                  <Route path="/galeri/foto" element={<GaleriFotoPage />} />
                  <Route path="/galeri/video" element={<GaleriVideoPage />} />
                  <Route path="/kontak" element={<KontakPage />} />
                </Route>
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
