import { useState, useEffect } from 'react';
import { supabase, type PortfolioProject, type Certificate } from '../../lib/supabase';
import { Lock, Unlock, Plus, Trash2, Edit3, Save, X, Settings, RefreshCw, LogOut } from 'lucide-react';

interface Props { onClose: () => void; }
type Tab = 'projects' | 'certs' | 'settings';
interface SiteSetting { key: string; value: string | null; }

// All mutations go through the edge function which holds the service-role key
const ADMIN_API = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-api`;
const ANON_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function adminFetch(
  method: 'POST' | 'PUT' | 'DELETE',
  table: string,
  password: string,
  payload?: Record<string, unknown>,
  id?: string,
): Promise<{ ok: boolean; error?: string }> {
  const url = id ? `${ADMIN_API}/${table}/${id}` : `${ADMIN_API}/${table}`;
  let res: Response;

  if (method === 'DELETE') {
    res = await fetch(`${url}?password=${encodeURIComponent(password)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${ANON_KEY}` },
    });
  } else {
    res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${ANON_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, ...payload }),
    });
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { ok: false, error: (body as { error?: string }).error ?? `HTTP ${res.status}` };
  }
  return { ok: true };
}

export default function AdminPanel({ onClose }: Props) {
  const [authed, setAuthed]     = useState(false);
  const [pw, setPw]             = useState('');
  const [err, setErr]           = useState('');
  const [tab, setTab]           = useState<Tab>('projects');
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [certs, setCerts]       = useState<Certificate[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving]     = useState(false);
  const [editProj, setEditProj] = useState<Partial<PortfolioProject> | null>(null);
  const [editCert, setEditCert] = useState<Partial<Certificate> | null>(null);

  // Password is verified server-side via the edge function; we also do a quick
  // anon-key read here to give the user immediate feedback.
  async function login() {
    setErr('');
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'admin_password')
      .maybeSingle();
    if (data?.value === pw) { setAuthed(true); load(); }
    else setErr('Incorrect password. Default: admin123');
  }

  async function load() {
    const [p, c, s] = await Promise.all([
      supabase.from('portfolio_projects').select('*').order('order_index'),
      supabase.from('certificates').select('*').order('order_index'),
      supabase.from('site_settings').select('*'),
    ]);
    if (p.data) setProjects(p.data);
    if (c.data) setCerts(c.data);
    if (s.data) {
      const m: Record<string, string> = {};
      (s.data as SiteSetting[]).forEach(r => { m[r.key] = r.value ?? ''; });
      setSettings(m);
    }
  }

  async function saveProj() {
    if (!editProj?.title) return;
    setSaving(true);
    const method  = editProj.id ? 'PUT' : 'POST';
    const { id, ...rest } = editProj as PortfolioProject;
    const payload = editProj.id ? rest : { ...rest, order_index: projects.length, visible: true };
    const result  = await adminFetch(method, 'portfolio_projects', pw, payload as Record<string,unknown>, editProj.id);
    if (!result.ok) { setErr(result.error ?? 'Save failed'); }
    else { setEditProj(null); load(); }
    setSaving(false);
  }

  async function delProj(id: string) {
    if (!confirm('Delete this project?')) return;
    const result = await adminFetch('DELETE', 'portfolio_projects', pw, undefined, id);
    if (!result.ok) setErr(result.error ?? 'Delete failed');
    else load();
  }

  async function saveCert() {
    if (!editCert?.title) return;
    setSaving(true);
    const method  = editCert.id ? 'PUT' : 'POST';
    const { id, ...rest } = editCert as Certificate;
    const payload = editCert.id ? rest : { ...rest, order_index: certs.length, visible: true };
    const result  = await adminFetch(method, 'certificates', pw, payload as Record<string,unknown>, editCert.id);
    if (!result.ok) { setErr(result.error ?? 'Save failed'); }
    else { setEditCert(null); load(); }
    setSaving(false);
  }

  async function delCert(id: string) {
    if (!confirm('Delete this certificate?')) return;
    const result = await adminFetch('DELETE', 'certificates', pw, undefined, id);
    if (!result.ok) setErr(result.error ?? 'Delete failed');
    else load();
  }

  async function saveSetting(key: string, val: string) {
    // Find the row id for this key so we can PUT /admin-api/site_settings/<id>
    const { data } = await supabase.from('site_settings').select('id').eq('key', key).maybeSingle();
    if (!data?.id) return;
    const result = await adminFetch('PUT', 'site_settings', pw, { value: val }, data.id);
    if (!result.ok) setErr(result.error ?? 'Save failed');
  }

  const ov: React.CSSProperties = {
    position:'fixed', inset:0, zIndex:70, display:'flex', alignItems:'center', justifyContent:'center',
    padding:16, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(20px)',
  };
  const panel: React.CSSProperties = {
    width:'100%', maxWidth:680, maxHeight:'88vh', display:'flex', flexDirection:'column',
    borderRadius:18, overflow:'hidden',
    background:'rgba(6,11,18,0.98)', border:'1px solid rgba(255,255,255,0.07)',
  };
  const rowS: React.CSSProperties = {
    display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
    borderRadius:10, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)',
  };
  const ib = (c: string): React.CSSProperties => ({
    background:'none', border:'none', cursor:'pointer', color:c, padding:'3px', display:'flex',
  });

  if (!authed) return (
    <div style={ov}>
      <div className="card p-8 w-full" style={{ maxWidth:340 }}>
        <div className="text-center mb-6">
          <div style={{ width:48, height:48, borderRadius:14, background:'linear-gradient(135deg,#2563eb,#0891b2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
            <Lock size={20} style={{ color:'white' }} />
          </div>
          <h2 style={{ color:'white', fontWeight:700, fontFamily:'Poppins', fontSize:'1.1rem', marginBottom:4 }}>Admin Access</h2>
          <p style={{ color:'rgba(100,116,139,0.7)', fontSize:'0.82rem' }}>Enter password to continue</p>
        </div>
        <input type="password" className="input mb-3" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} autoFocus />
        {err && <p style={{ color:'#f87171', fontSize:'0.8rem', marginBottom:10 }}>{err}</p>}
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-primary flex-1 justify-center" onClick={login}><Unlock size={13} /> Enter</button>
          <button className="btn btn-secondary" onClick={onClose}><X size={14} /></button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={ov}>
      <div style={panel}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Settings size={15} style={{ color:'#60a5fa' }} />
            <span style={{ color:'white', fontWeight:700, fontFamily:'Poppins', fontSize:'0.9rem' }}>Admin</span>
          </div>
          {err && <span style={{ color:'#f87171', fontSize:'0.75rem', flex:1, textAlign:'center' }}>{err}</span>}
          <div style={{ display:'flex', gap:4 }}>
            <button style={ib('rgba(148,163,184,0.5)')} onClick={load} title="Refresh"><RefreshCw size={14} /></button>
            <button style={ib('rgba(248,113,113,0.6)')} onClick={()=>{setAuthed(false);onClose();}} title="Logout"><LogOut size={14} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          {(['projects','certs','settings'] as Tab[]).map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:'10px 0', fontSize:'0.78rem', fontWeight:600, fontFamily:'Inter', textTransform:'capitalize', cursor:'pointer', background:'none', border:'none', borderBottom:tab===t?'2px solid #3b82f6':'2px solid transparent', color:tab===t?'#60a5fa':'rgba(100,116,139,0.6)', transition:'all 0.2s' }}>
              {t==='certs'?'Certificates':t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:'auto', padding:16 }}>

          {/* Projects */}
          {tab==='projects' && (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <button className="btn btn-primary justify-center" style={{ width:'100%', marginBottom:4, fontSize:'0.82rem' }} onClick={()=>setEditProj({title:'',description:'',image_url:'',tags:[],link_url:'',github_url:''})}>
                <Plus size={13} /> Add Project
              </button>
              {editProj && (
                <div style={{ padding:12, borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(59,130,246,0.2)', display:'flex', flexDirection:'column', gap:8 }}>
                  <input className="admin-input" placeholder="Title *" value={editProj.title||''} onChange={e=>setEditProj({...editProj,title:e.target.value})} />
                  <textarea className="admin-input" placeholder="Description" value={editProj.description||''} onChange={e=>setEditProj({...editProj,description:e.target.value})} rows={2} style={{resize:'none'}} />
                  <input className="admin-input" placeholder="Image URL" value={editProj.image_url||''} onChange={e=>setEditProj({...editProj,image_url:e.target.value})} />
                  <input className="admin-input" placeholder="Tags (comma separated)" value={(editProj.tags||[]).join(', ')} onChange={e=>setEditProj({...editProj,tags:e.target.value.split(',').map(t=>t.trim()).filter(Boolean)})} />
                  <input className="admin-input" placeholder="Live URL" value={editProj.link_url||''} onChange={e=>setEditProj({...editProj,link_url:e.target.value})} />
                  <input className="admin-input" placeholder="GitHub URL" value={editProj.github_url||''} onChange={e=>setEditProj({...editProj,github_url:e.target.value})} />
                  <div style={{ display:'flex', gap:8 }}>
                    <button className="admin-btn flex-1" style={{ background:'linear-gradient(135deg,#2563eb,#0891b2)', color:'white' }} onClick={saveProj} disabled={saving}>{saving?'Saving…':'Save'}</button>
                    <button className="admin-btn" style={{ background:'rgba(255,255,255,0.06)', color:'rgba(148,163,184,0.7)' }} onClick={()=>setEditProj(null)}>Cancel</button>
                  </div>
                </div>
              )}
              {projects.map(p => (
                <div key={p.id} style={rowS}>
                  {p.image_url && <img src={p.image_url} alt="" style={{ width:34, height:34, borderRadius:7, objectFit:'cover', flexShrink:0 }} />}
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ color:'rgba(226,232,240,0.9)', fontSize:'0.85rem', fontFamily:'Inter', fontWeight:500, margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.title}</p>
                    <p style={{ color:'rgba(100,116,139,0.55)', fontSize:'0.7rem', margin:0 }}>{(p.tags||[]).join(', ')}</p>
                  </div>
                  <button style={ib('rgba(96,165,250,0.6)')} onClick={()=>setEditProj(p)}><Edit3 size={13} /></button>
                  <button style={ib('rgba(248,113,113,0.5)')} onClick={()=>delProj(p.id)}><Trash2 size={13} /></button>
                </div>
              ))}
            </div>
          )}

          {/* Certs */}
          {tab==='certs' && (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <button className="btn btn-primary justify-center" style={{ width:'100%', marginBottom:4, fontSize:'0.82rem' }} onClick={()=>setEditCert({title:'',issuer:'',date_issued:'',credential_url:''})}>
                <Plus size={13} /> Add Certificate
              </button>
              {editCert && (
                <div style={{ padding:12, borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(59,130,246,0.2)', display:'flex', flexDirection:'column', gap:8 }}>
                  <input className="admin-input" placeholder="Title *" value={editCert.title||''} onChange={e=>setEditCert({...editCert,title:e.target.value})} />
                  <input className="admin-input" placeholder="Issuer" value={editCert.issuer||''} onChange={e=>setEditCert({...editCert,issuer:e.target.value})} />
                  <input className="admin-input" placeholder="Date (e.g. 2024)" value={editCert.date_issued||''} onChange={e=>setEditCert({...editCert,date_issued:e.target.value})} />
                  <input className="admin-input" placeholder="Credential URL" value={editCert.credential_url||''} onChange={e=>setEditCert({...editCert,credential_url:e.target.value})} />
                  <div style={{ display:'flex', gap:8 }}>
                    <button className="admin-btn flex-1" style={{ background:'linear-gradient(135deg,#2563eb,#0891b2)', color:'white' }} onClick={saveCert} disabled={saving}>{saving?'Saving…':'Save'}</button>
                    <button className="admin-btn" style={{ background:'rgba(255,255,255,0.06)', color:'rgba(148,163,184,0.7)' }} onClick={()=>setEditCert(null)}>Cancel</button>
                  </div>
                </div>
              )}
              {certs.map(c => (
                <div key={c.id} style={rowS}>
                  <div style={{ flex:1 }}>
                    <p style={{ color:'rgba(226,232,240,0.9)', fontSize:'0.85rem', fontFamily:'Inter', fontWeight:500, margin:0 }}>{c.title}</p>
                    <p style={{ color:'rgba(100,116,139,0.55)', fontSize:'0.7rem', margin:0 }}>{c.issuer}</p>
                  </div>
                  <button style={ib('rgba(96,165,250,0.6)')} onClick={()=>setEditCert(c)}><Edit3 size={13} /></button>
                  <button style={ib('rgba(248,113,113,0.5)')} onClick={()=>delCert(c.id)}><Trash2 size={13} /></button>
                </div>
              ))}
            </div>
          )}

          {/* Settings */}
          {tab==='settings' && (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <p style={{ color:'rgba(100,116,139,0.5)', fontSize:'0.7rem', fontFamily:'Inter', textTransform:'uppercase', letterSpacing:'0.1em', margin:'0 0 4px' }}>Security</p>
              <SettingRow label="Admin Password" value={settings['admin_password']||''} type="password" onSave={v=>saveSetting('admin_password',v)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, value, onSave, type='text' }: { label:string; value:string; onSave:(v:string)=>void; type?:string }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal]         = useState(value);
  useEffect(() => { setVal(value); }, [value]);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:10, background:'rgba(255,255,255,0.03)' }}>
      <div style={{ flex:1 }}>
        <p style={{ color:'rgba(100,116,139,0.6)', fontSize:'0.7rem', fontFamily:'Inter', margin:'0 0 3px' }}>{label}</p>
        {editing
          ? <input className="admin-input" type={type} value={val} onChange={e=>setVal(e.target.value)} autoFocus style={{ fontSize:'0.82rem' }} />
          : <p style={{ color:'rgba(226,232,240,0.85)', fontSize:'0.85rem', fontFamily:'Inter', margin:0 }}>{type==='password'?'••••••••':val||'—'}</p>
        }
      </div>
      {editing ? (
        <div style={{ display:'flex', gap:5 }}>
          <button style={{ background:'none', border:'none', cursor:'pointer', color:'#4ade80', padding:3, display:'flex' }} onClick={()=>{onSave(val);setEditing(false);}}><Save size={13} /></button>
          <button style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(148,163,184,0.4)', padding:3, display:'flex' }} onClick={()=>{setVal(value);setEditing(false);}}><X size={13} /></button>
        </div>
      ) : (
        <button style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(96,165,250,0.5)', padding:3, display:'flex' }} onClick={()=>setEditing(true)}><Edit3 size={13} /></button>
      )}
    </div>
  );
}
