import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Home',         id: 'home'         },
  { label: 'About',        id: 'about'        },
  { label: 'Skills',       id: 'skills'       },
  { label: 'Projects',     id: 'projects'     },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact',      id: 'contact'      },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('home');
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      for (const { id } of [...LINKS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(2,4,8,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.6)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2.5"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)', boxShadow: '0 0 12px rgba(37,99,235,0.5)', fontFamily: 'Poppins, sans-serif' }}
          >
            SK
          </span>
          <span className="text-glow text-sm font-semibold hidden sm:block" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Shashikant
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <button key={l.id} onClick={() => go(l.id)} className={`nav-item ${active === l.id ? 'active' : ''}`}>
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            className="btn btn-primary hidden md:inline-flex"
            style={{ padding: '8px 20px', fontSize: '0.82rem' }}
            onClick={() => go('contact')}
          >
            Hire Me
          </button>
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden"
          style={{ background: 'rgba(2,4,8,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)' }}
        >
          <div className="px-6 py-5 flex flex-col gap-1">
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors border-b"
                style={{ borderColor: 'rgba(255,255,255,0.05)', fontFamily: 'Inter, sans-serif', background: 'none', cursor: 'pointer' }}
              >
                {l.label}
              </button>
            ))}
            <button className="btn btn-primary mt-4 w-full justify-center" onClick={() => go('contact')}>
              Hire Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
