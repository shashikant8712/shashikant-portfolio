import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles, Code2, Brain } from 'lucide-react';

const ROLES = [
  'Aspiring Data Scientist',
  'AI & ML Student',
  'Python Developer',
  'Machine Learning Enthusiast'
];

function TypingRole() {
  const [idx, setIdx]   = React.useState(0);
  const [text, setText] = React.useState('');
  const [del,  setDel]  = React.useState(false);
  const [wait, setWait] = React.useState(false);

  React.useEffect(() => {
    if (wait) { const t = setTimeout(() => setWait(false), 1400); return () => clearTimeout(t); }
    const target = ROLES[idx];
    if (!del) {
      if (text.length < target.length) {
        const t = setTimeout(() => setText(target.slice(0, text.length + 1)), 55);
        return () => clearTimeout(t);
      } else { const t = setTimeout(() => setDel(true), 1800); return () => clearTimeout(t); }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 32);
        return () => clearTimeout(t);
      } else { setDel(false); setIdx((idx + 1) % ROLES.length); setWait(true); }
    }
  }, [text, del, idx, wait]);

  return (
    <span className="text-glow font-display font-700" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
      {text}
      <span className="inline-block w-0.5 h-6 ml-0.5 bg-blue-400 align-middle" style={{ animation: 'pulse 1s step-end infinite' }} />
    </span>
  );
}

import React from 'react';

// Floating stat card
function StatCard({ value, label, icon: Icon, delay }: { value: string; label: string; icon: React.ElementType; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="card px-5 py-4 flex items-center gap-3"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}
      >
        <Icon size={17} className="text-blue-400" />
      </div>
      <div>
        <p className="font-display font-700 text-white leading-none" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.15rem' }}>{value}</p>
        <p className="text-xs text-slate-500 mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

// Glowing avatar ring decoration
function AvatarRing() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 320, height: 320 }}>
      {/* Orbit rings */}
      {[280, 240, 200].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size, height: size,
            border: `1px solid rgba(59,130,246,${0.08 + i * 0.04})`,
            animation: `spin ${14 + i * 6}s linear ${i % 2 === 0 ? 'normal' : 'reverse'} infinite`,
          }}
        />
      ))}

      {/* Glow blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: 180, height: 180,
          background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Avatar card */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden flex items-center justify-center"
        style={{
          width: 160, height: 160,
          background: 'linear-gradient(135deg, #0c1420 0%, #0e1e35 100%)',
          border: '1.5px solid rgba(59,130,246,0.22)',
          boxShadow: '0 0 0 4px rgba(37,99,235,0.06), 0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Abstract AI grid visual */}
        <svg viewBox="0 0 100 100" width="100" height="100">
          <defs>
            <linearGradient id="nodeG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="nodeBlur"><feGaussianBlur stdDeviation="1.2" /></filter>
          </defs>
          {/* Neural net lines */}
          {[
            [22,30,50,15],[22,30,78,30],[22,30,50,50],
            [50,15,78,30],[50,50,78,30],[50,50,78,70],
            [22,70,50,50],[22,70,50,85],[50,85,78,70],
          ].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
          ))}
          {/* Nodes */}
          {[[22,30],[50,15],[78,30],[50,50],[22,70],[78,70],[50,85]].map(([cx,cy],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" fill="url(#nodeG)" opacity="0.9" />
              <circle cx={cx} cy={cy} r="10" fill="url(#nodeG)" opacity="0.1" filter="url(#nodeBlur)" />
            </g>
          ))}
          {/* SK initials */}
          <text x="50" y="56" textAnchor="middle" fontSize="14" fill="white" fontFamily="Poppins" fontWeight="700" opacity="0.6">SK</text>
        </svg>
      </div>

      {/* Floating tech dots */}
      {[
        { angle: 0,   label: 'Python',    color: '#3b82f6' },
        { angle: 72,  label: 'ML',        color: '#06b6d4' },
        { angle: 144, label: 'React',     color: '#6366f1' },
        { angle: 216, label: 'Node.js',   color: '#3b82f6' },
        { angle: 288, label: 'LLMs',      color: '#06b6d4' },
      ].map((dot, i) => {
        const r = 128;
        const rad = (dot.angle - 90) * (Math.PI / 180);
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center rounded-full text-xs font-bold"
            style={{
              left: `calc(50% + ${x}px - 22px)`, top: `calc(50% + ${y}px - 22px)`,
              width: 44, height: 44,
              background: 'rgba(6,11,18,0.9)',
              border: `1px solid ${dot.color}44`,
              color: dot.color,
              fontSize: '0.58rem',
              fontFamily: 'Inter, sans-serif',
              animation: `float ${5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
              boxShadow: `0 0 12px ${dot.color}33`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            {dot.label}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HeroSection() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '30%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT col ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="badge">
                <Sparkles size={10} />
                B.Tech CSE (AI & ML) • AKTU
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="mt-5 font-display"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', lineHeight: 1.07, letterSpacing: '-0.03em', color: '#f8fafc' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #818cf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Shashikant
              </span>
            </motion.h1>

            {/* Typing role */}
            <motion.div
              className="mt-2 h-9 flex items-center"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <TypingRole />
            </motion.div>

            {/* Bio */}
            <motion.p
              className="mt-6 text-slate-400 leading-relaxed"
              style={{ fontSize: '0.97rem', maxWidth: 480 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
            >
              I'm a B.Tech CSE (AI & ML) student passionate about Artificial Intelligence, Machine Learning, Data Science, and Python. I enjoy building real-world projects and continuously improving my technical skills.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 }}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = '#';
                  a.download = 'Shashikant_Resume.pdf';
                  a.click();
                }}
              >
                <Download size={15} />
                Download Resume
              </button>
              <button className="btn btn-secondary" onClick={() => go('projects')}>
                view projects <ArrowRight size={15} />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-10 grid grid-cols-3 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <StatCard value="5+" label="Projects Built"   icon={Code2}  delay={0.7} />
              <StatCard value="3+"  label="Certifications"  icon={Sparkles} delay={0.75} />
              <StatCard value="1+"  label="Years Learning"  icon={Brain}  delay={0.8} />
            </motion.div>
          </div>

          {/* ── RIGHT col ── */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AvatarRing />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          onClick={() => go('about')}
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-slate-700 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-blue-500" style={{ animation: 'float 1.6s ease-in-out infinite' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
