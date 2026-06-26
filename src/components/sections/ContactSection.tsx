import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, MapPin, Clock } from 'lucide-react';

const SOCIALS = [
  {
    Icon: Github,
    label: 'GitHub',
    href: 'https://github.com/shashikant8712',
    color: '#94a3b8',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shashikant-83a68631b',
    color: '#0ea5e9',
  },
  {
    Icon: Mail,
    label: 'Email',
    href: 'mailto:shashikantsharma74081@gmail.com',
    color: '#6366f1',
  },
];

export default function ContactSection() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <section id="contact" className="relative py-28 px-6 pb-40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge">Get In Touch</span>
          <h2 className="section-heading mt-4">Let's <span className="text-glow">Connect</span></h2>
          <div className="glow-line w-12 mx-auto mt-4" />
          <p className="text-slate-500 mt-4 max-w-md mx-auto text-sm">
            Whether it's a collaboration, internship, project or just a conversation — I'm always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Info panel */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="card p-7">
              <h3 className="text-base font-semibold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Contact Info
              </h3>
              <div className="space-y-5">
                {[
                  { icon: <Mail size={15}/>,     label: 'Email',    val: 'shashikantsharma74081@gmail.com', color: '#6366f1' },
                  { icon: <MapPin size={15}/>,   label: 'Location', val: 'Uttar Pradesh, India',  color: '#3b82f6' },
                  { icon: <Clock size={15}/>,    label: 'Response', val: 'Usually within 24 hours',          color: '#06b6d4' },
                ].map(r => (
                  <div key={r.label} className="flex items-start gap-3.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${r.color}12`, border: `1px solid ${r.color}22`, color: r.color }}
                    >
                      {r.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 uppercase tracking-wide mb-0.5">{r.label}</p>
                      <p className="text-sm text-slate-300 font-medium">{r.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="card p-6">
              <p className="text-xs text-slate-600 uppercase tracking-widest mb-5">Find me on</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    title={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center transition-all duration-200"
                    style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: 'rgba(148,163,184,0.6)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = `${color}15`;
                      el.style.borderColor = `${color}35`;
                      el.style.color = color;
                      el.style.transform = 'translateY(-2px)';
                      el.style.boxShadow = `0 0 16px ${color}33`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(255,255,255,0.04)';
                      el.style.borderColor = 'rgba(255,255,255,0.07)';
                      el.style.color = 'rgba(148,163,184,0.6)';
                      el.style.transform = 'none';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3 card p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {sent ? (
              <motion.div
                className="flex flex-col items-center justify-center text-center"
                style={{ minHeight: 320 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)', boxShadow: '0 0 24px rgba(37,99,235,0.45)' }}
                >
                  <Send size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Message Sent!
                </h3>
                <p className="text-sm text-slate-500 mb-6 max-w-xs">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button className="btn btn-secondary" onClick={() => setSent(false)}>
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <h3 className="text-base font-semibold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Send a Message
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 tracking-wide">Name</label>
                    <input className="input" name="name" value={form.name} onChange={change} placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 tracking-wide">Email</label>
                    <input className="input" name="email" type="email" value={form.email} onChange={change} placeholder="your@email.com" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5 tracking-wide">Message</label>
                  <textarea
                    className="input"
                    name="message"
                    value={form.message}
                    onChange={change}
                    placeholder="Tell me about your project or opportunity…"
                    rows={6}
                    required
                    style={{ resize: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="btn btn-primary w-full justify-center"
                >
                  {sending ? (
                    <>
                      <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                      Sending…
                    </>
                  ) : (
                    <><Send size={14} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
