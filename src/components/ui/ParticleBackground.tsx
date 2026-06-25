const COLORS = [
  'rgba(167,139,250,0.6)', 'rgba(34,211,238,0.5)',
  'rgba(244,114,182,0.4)', 'rgba(129,140,248,0.5)',
  'rgba(96,165,250,0.4)',
];

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  x:     (Math.sin(i * 1.9 + 0.3) * 0.5 + 0.5) * 100,
  size:  1 + (i % 4) * 0.8,
  speed: 8 + (i % 5) * 4,
  delay: -(i * 0.7) % 12,
  color: COLORS[i % COLORS.length],
}));

const ORBS = [
  { x:'8%',  y:'20%', w:500, h:500, color:'rgba(124,58,237,0.12)' },
  { x:'65%', y:'5%',  w:400, h:400, color:'rgba(8,145,178,0.1)'  },
  { x:'40%', y:'55%', w:350, h:350, color:'rgba(167,139,250,0.08)'},
  { x:'80%', y:'70%', w:300, h:300, color:'rgba(34,211,238,0.07)' },
];

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex:0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0" style={{ background:'linear-gradient(135deg, #03010f 0%, #07022a 30%, #0d0540 55%, #130a5a 75%, #0a0228 100%)' }} />

      {/* Ambient glow orbs */}
      {ORBS.map((o, i) => (
        <div key={i} className="orb" style={{ left:o.x, top:o.y, width:o.w, height:o.h, background:`radial-gradient(circle, ${o.color} 0%, transparent 70%)` }} />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage:`linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`,
        backgroundSize:'60px 60px',
        maskImage:'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
        WebkitMaskImage:'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
      }} />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="particle-dot" style={{
          left:`${p.x}%`, width:p.size, height:p.size,
          background:p.color, boxShadow:`0 0 ${p.size*3}px ${p.color}`,
          animationDuration:`${p.speed}s`, animationDelay:`${p.delay}s`,
        }} />
      ))}

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0" style={{ height:120, background:'linear-gradient(to bottom, #03010f 0%, transparent 100%)' }} />
    </div>
  );
}
