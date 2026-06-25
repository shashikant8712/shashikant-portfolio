import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Globe, Users, Award, Coffee } from 'lucide-react';
import React from 'react';

const FACTS = [
  { icon: Code2,  label: 'Primary Stack',   value: 'Python · React · Node.js' },
  { icon: Brain,  label: 'AI Focus',         value: 'ML, Deep Learning, NLP, LLMs' },
  { icon: Globe,  label: 'Location',         value: 'India — Open to Remote' },
  { icon: Users,  label: 'Education',        value: 'B.Tech CSE (AI & ML)' },
  { icon: Award,  label: 'Specialisation',   value: 'AI/ML · Software Engineering' },
  { icon: Coffee, label: 'Current Goal',     value: 'Building AGI-era products' },
];

const TIMELINE = [
  { year: '2021', title: 'Started B.Tech CSE',  desc: 'Enrolled in Computer Science with specialisation in Artificial Intelligence & Machine Learning.', color: '#3b82f6' },
  { year: '2022', title: 'First ML Project',    desc: 'Built a real-time object detection system using YOLOv5 and deployed it on a Raspberry Pi.', color: '#06b6d4' },
  { year: '2023', title: 'Full-Stack Dev',       desc: 'Learned React, Node.js and Supabase. Shipped multiple production-quality web applications.', color: '#6366f1' },
  { year: '2024', title: 'AI Products',          desc: 'Integrated LLM APIs, built RAG pipelines and started contributing to open-source AI projects.', color: '#3b82f6' },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay }}>
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="badge">Who I Am</span>
            <h2 className="section-heading mt-4">About <span className="text-glow">Me</span></h2>
            <div className="glow-line w-12 mx-auto mt-4" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — story */}
          <FadeIn delay={0.1}>
            <div className="space-y-5">
              <p className="text-slate-300 leading-relaxed" style={{ fontSize: '0.97rem' }}>
                I'm <span className="text-white font-semibold">Shashikant</span>, a Computer Science undergraduate
                specialising in <span className="text-blue-400 font-medium">Artificial Intelligence & Machine Learning</span>.
                I'm passionate about building systems that think, learn, and solve real problems.
              </p>
              <p className="text-slate-400 leading-relaxed" style={{ fontSize: '0.95rem' }}>
                My work spans the full spectrum — from training neural networks and fine-tuning language models to
                designing clean, performant web applications. I care deeply about both the science of AI and the craft
                of engineering.
              </p>
              <p className="text-slate-400 leading-relaxed" style={{ fontSize: '0.95rem' }}>
                When I'm not coding, I'm reading research papers, contributing to open-source projects, or
                exploring how emerging AI capabilities can be applied to real-world domains.
              </p>
              <div className="pt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Let's Work Together
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Right — facts grid */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FACTS.map((f, i) => (
                <motion.div
                  key={f.label}
                  className="card p-4 flex items-start gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.18)' }}>
                    <f.icon size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5 tracking-wide uppercase">{f.label}</p>
                    <p className="text-sm text-slate-200 font-medium">{f.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Timeline */}
        <FadeIn delay={0.3}>
          <div className="mt-20">
            <h3 className="text-center text-lg font-semibold text-slate-200 mb-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
              My Journey
            </h3>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.3), transparent)' }} />
              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10`}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-4 md:left-1/2 top-2 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                      style={{ background: item.color, boxShadow: `0 0 10px ${item.color}88, 0 0 0 3px #020408, 0 0 0 5px ${item.color}44` }}
                    />
                    {/* Card */}
                    <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-[calc(50%+28px)]' : 'md:pl-[calc(50%+28px)]'} flex-1`}>
                      <div className="card p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}>
                            {item.year}
                          </span>
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
