import { useState } from 'react';
import ParticleBackground  from './components/ui/ParticleBackground';
import NavBar              from './components/ui/NavBar';
import HeroSection         from './components/sections/HeroSection';
import AboutSection        from './components/sections/AboutSection';
import SkillsSection       from './components/sections/SkillsSection';
import ProjectsSection     from './components/sections/ProjectsSection';
import CertificatesSection from './components/sections/CertificatesSection';
import ContactSection      from './components/sections/ContactSection';
import AdminPanel          from './components/admin/AdminPanel';
import { Settings }        from 'lucide-react';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="relative min-h-screen noise">
      {/* Fixed particle canvas */}
      <ParticleBackground />

      {/* Fixed nav */}
      <NavBar />

      {/* Sections */}
      <main className="relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer
        className="relative text-center py-8 px-6"
        style={{
          zIndex: 1,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(2,4,8,0.5)',
        }}
      >
        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} Shashikant. Built with precision.
        </p>
      </footer>

      {/* Admin trigger (subtle) */}
      <button
        onClick={() => setShowAdmin(true)}
        title="Admin"
        className="fixed bottom-6 right-6 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{
          zIndex: 40,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(100,116,139,0.5)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,0.12)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.3)';
          (e.currentTarget as HTMLElement).style.color = '#60a5fa';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
          (e.currentTarget as HTMLElement).style.color = 'rgba(100,116,139,0.5)';
        }}
      >
        <Settings size={15} />
      </button>

      {/* Admin panel */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
