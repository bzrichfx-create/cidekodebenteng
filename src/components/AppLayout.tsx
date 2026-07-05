import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import VisionMission from './VisionMission';
import Stats from './Stats';
import Programs from './Programs';
import Gallery from './Gallery';
import Team from './Team';
import Membership from './Membership';
import Partners from './Partners';
import Reports from './Reports';
import SocialWall from './SocialWall';
import Contact from './Contact';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import AuthModal from './AuthModal';
import MemberDashboard from './MemberDashboard';
import { useAuth } from '@/contexts/AuthContext';

export default function AppLayout() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);

  const handleSignIn = () => {
    if (user) setDashOpen(true);
    else setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar onSignIn={handleSignIn} onDashboard={() => setDashOpen(true)} />
      <main>
        <Hero />
        <About />
        <VisionMission />
        <Stats />
        <Programs />
        <Gallery />
        <Team />
        <Membership />
        <Partners />
        <Reports />
        <SocialWall />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <MemberDashboard open={dashOpen} onClose={() => setDashOpen(false)} />
    </div>
  );
}
