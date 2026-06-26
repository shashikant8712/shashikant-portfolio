import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const GROUPS = [
  {
    title: 'AI & Machine Learning',
    accent: '#3b82f6',
    skills: [
      { name: 'Python',            level: 90 },
      { name: 'TensorFlow / Keras',level: 30 },
      { name: 'PyTorch',           level: 45 },
      { name: 'Scikit-learn',      level: 46 },
      { name: 'LLM / RAG / NLP',  level: 30 },
    ],
  },
  {
    title: 'Web Development',
    accent: '#06b6d4',
    skills: [
      { name: 'React / Next.js', level: 35 },
      { name: 'Node.js / Express', level: 45 },
      { name: 'TypeScript',      level: 35 },
      { name: 'Supabase / PostgreSQL', level: 20 },
      { name: 'REST APIs / GraphQL',   level: 25 },
    ],
  },
  {
    title: 'Tools & DevOps',
    accent: '#6366f1',
    skills: [
      { name: 'Git & GitHub',  level: 90 },
      { name: 'Docker',        level: 35 },
      { name: 'Linux / Bash',  level: 34 },
      { name: 'Figma / UI Design', level: 30 },
      { name: 'Jupyter / Colab',   level: 60 },
    ],
  },
];

const TECH = [
  'Python','PyTorch','TensorFlow','LangChain','OpenAI API',
  'React','Next.js','TypeScript','Tailwind','Node.js',
  'PostgreSQL','Supabase','Docker','FastAPI','Hugging Face',
  'Pandas','NumPy','Matplotlib','Git','Linux',
];

function SkillBar({ name, level, accent, delay }: { name: string; level: number; accent: string; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (inView) { const t = setTimeout(() => setGo(true), delay * 1000); return () => clearTimeout(t); }
  }, [inView, delay]);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-slate-300 font-medium">{name}</span>
        <span className="text-xs font-semibold" style={{ color: accent }}>{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: go ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${accent}88, ${accent})`,
            color: accent,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 px-6">
      {/* subtle bg stripe */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(6,11,18,0.6) 50%, transparent 100%)' }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge">Technical Skills</span>
          <h2 className="section-heading mt-4">My <span className="text-glow">Expertise</span></h2>
          <div className="glow-line w-12 mx-auto mt-4" />
          <p className="text-slate-500 mt-4 max-w-md mx-auto text-sm">
            A curated set of technologies I've worked with across AI, web, and systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              className="card p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1.5 h-6 rounded-full"
                  style={{ background: `linear-gradient(180deg, ${group.accent}, transparent)`, boxShadow: `0 0 10px ${group.accent}88` }}
                />
                <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {group.title}
                </h3>
              </div>
              {group.skills.map((s, si) => (
                <SkillBar key={s.name} name={s.name} level={s.level} accent={group.accent} delay={si * 0.12} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech cloud */}
        <motion.div
          className="card p-7 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <p className="text-xs text-slate-600 uppercase tracking-widest mb-5">Technologies &amp; Libraries</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {TECH.map(t => (
              <span
                key={t}
                className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(203,213,225,0.75)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.4)';
                  (e.currentTarget as HTMLElement).style.color = '#93c5fd';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.08)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(203,213,225,0.75)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
