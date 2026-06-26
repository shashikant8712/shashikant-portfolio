import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { supabase, type Certificate } from '../../lib/supabase';

const DEFAULTS: Certificate[] = [
  {
    id: 'c1',
    title: 'Fundamentals of Artificial Intelligence',
    issuer: 'Wadhwani Foundation',
    date_issued: 'Jun 2026',
    image_url: null,
    credential_url: 'https://web.certificate.wfglobal.org/en/certificate?certificateId=6a3177986d83cd224e5acc68',
    order_index: 1,
    visible: true,
  },
  {
    id: 'c2',
    title: 'AI For India 2.0',
    issuer: 'GUVI',
    date_issued: 'Jun 2026',
    image_url: null,
    credential_url: 'https://www.guvi.in/share-certificate/8R45Sx1Wd1t6O17y07',
    order_index: 2,
    visible: true,
  },
  {
    id: 'c3',
    title: 'Network Security Engineer',
    issuer: 'NASSCOM',
    date_issued: 'Jun 2026',
    image_url: null,
    credential_url: 'https://api-fe.skillindiadigital.gov.in/api/registry-course/getCertificatePresignedUrl/2025080312987976-aea0e014-9bff-40e4-b2d2-1013f11aa122',
    order_index: 3,
    visible: true,
  },
];

const ACCENT = ['#3b82f6','#06b6d4','#6366f1','#3b82f6','#06b6d4','#6366f1'];

export default function CertificatesSection() {
  const [certs, setCerts]     = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('certificates').select('*').eq('visible', true).order('order_index')
      .then(({ data }) => { setCerts(data && data.length ? data : DEFAULTS); setLoading(false); });
  }, []);

  return (
    <section id="certificates" className="relative py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(6,11,18,0.5) 50%, transparent)' }}
      />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge">Credentials</span>
          <h2 className="section-heading mt-4">Certifications &amp; <span className="text-glow">Achievements</span></h2>
          <div className="glow-line w-12 mx-auto mt-4" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div style={{ width: 32, height: 32, border: '2px solid rgba(59,130,246,0.25)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map((cert, i) => {
              const color = ACCENT[i % ACCENT.length];
              return (
                <motion.div
                  key={cert.id}
                  className="card p-6 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${color}14`,
                        border: `1px solid ${color}28`,
                        boxShadow: `0 0 14px ${color}22`,
                      }}
                    >
                      <CheckCircle2 size={20} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-sm font-semibold text-white mb-1 leading-snug"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {cert.title}
                      </h3>
                      {cert.issuer && (
                        <p className="text-xs mb-2" style={{ color }}>
                          {cert.issuer}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        {cert.date_issued && (
                          <span className="text-xs text-slate-600 flex items-center gap-1">
                            <Calendar size={10} /> {cert.date_issued}
                          </span>
                        )}
                        {cert.credential_url && cert.credential_url !== '#' && (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs flex items-center gap-1 transition-colors"
                            style={{ color: 'rgba(148,163,184,0.5)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#60a5fa'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(148,163,184,0.5)'; }}
                          >
                            <ExternalLink size={10} /> Verify
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
