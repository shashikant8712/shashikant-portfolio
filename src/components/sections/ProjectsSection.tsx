import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { supabase, type PortfolioProject } from '../../lib/supabase';

const DEFAULTS: PortfolioProject[] = [
  {
    id: 'p1', title: 'MediScan AI',
    description: 'Deep learning system for early-stage medical image diagnosis using CNN architectures (ResNet-50). Achieves 94% accuracy on chest X-ray classification.',
    image_url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Python', 'PyTorch', 'CNN', 'FastAPI', 'React'],
    link_url: '#', github_url: '#', section_id: null, order_index: 0, visible: true, created_at: '',
  },
  {
    id: 'p2', title: 'LexiChat — RAG Chatbot',
    description: 'Retrieval-Augmented Generation chatbot built over custom knowledge bases. Supports multi-turn conversations, PDF ingestion and semantic search.',
    image_url: 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['LangChain', 'OpenAI', 'Pinecone', 'Next.js', 'Supabase'],
    link_url: '#', github_url: '#', section_id: null, order_index: 1, visible: true, created_at: '',
  },
  {
    id: 'p3', title: 'StockPulse — ML Trading',
    description: 'Time-series forecasting for equity markets using LSTM + Transformer hybrid. Dashboard with live data visualisation and portfolio back-testing.',
    image_url: 'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Python', 'TensorFlow', 'React', 'REST API', 'PostgreSQL'],
    link_url: '#', github_url: '#', section_id: null, order_index: 2, visible: true, created_at: '',
  },
  {
    id: 'p4', title: 'DevFlow — Developer Hub',
    description: 'Full-stack developer productivity platform with code review automation, PR analytics, CI/CD integration and team collaboration features.',
    image_url: 'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    link_url: '#', github_url: '#', section_id: null, order_index: 3, visible: true, created_at: '',
  },
];

function ProjectCard({ p, i }: { p: PortfolioProject; i: number }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.article
      className="card overflow-hidden group flex flex-col"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.09 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        transform: hov ? 'translateY(-6px)' : 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={p.image_url || ''}
          alt={p.title}
          className="w-full h-full object-cover"
          style={{
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease',
            filter: 'brightness(0.55) saturate(0.8)',
          }}
        />
        {/* Gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,4,8,0.98) 0%, rgba(2,4,8,0.3) 60%, transparent 100%)' }} />

        {/* Tag chips */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {(p.tags || []).slice(0, 3).map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(2,4,8,0.75)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd', backdropFilter: 'blur(4px)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Hover link overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3"
          style={{ opacity: hov ? 1 : 0, transition: 'opacity 0.3s', background: 'rgba(2,4,8,0.5)', backdropFilter: hov ? 'blur(2px)' : 'none' }}
        >
          {p.link_url && (
            <a href={p.link_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.78rem' }} onClick={e => e.stopPropagation()}>
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {p.github_url && (
            <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.78rem' }} onClick={e => e.stopPropagation()}>
              <Github size={12} /> Code
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{p.title}</h3>
          <ArrowUpRight size={16} className="text-slate-600 flex-shrink-0 mt-0.5 group-hover:text-blue-400 transition-colors" />
        </div>
        <p className="text-xs text-slate-500 leading-relaxed flex-1">{p.description}</p>
        {(p.tags || []).length > 3 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {p.tags.slice(3).map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded text-slate-500" style={{ background: 'rgba(255,255,255,0.04)' }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    supabase.from('portfolio_projects').select('*').eq('visible', true).order('order_index')
      .then(({ data }) => { setProjects(data && data.length ? data : DEFAULTS); setLoading(false); });
  }, []);

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge">Portfolio</span>
          <h2 className="section-heading mt-4">Selected <span className="text-glow">Projects</span></h2>
          <div className="glow-line w-12 mx-auto mt-4" />
          <p className="text-slate-500 mt-4 max-w-md mx-auto text-sm">
            A selection of real-world projects spanning AI, ML and full-stack engineering.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div style={{ width: 32, height: 32, border: '2px solid rgba(59,130,246,0.25)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}
