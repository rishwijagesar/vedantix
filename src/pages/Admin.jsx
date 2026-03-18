import { useState, useEffect } from "react";
import { Availability, Appointment, Client, ChangeRequest, EmailTemplate, EmailLog } from "../api/entities";
import { base44 } from "@/api/base44Client";
import FinanceStats from "../components/admin/FinanceStats";

const TIME_OPTIONS = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00"];
const DAYS_NL = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
const STORAGE_KEY = "vedantix_week_template";

const DEFAULT_WEEK_TEMPLATE = {
  0: [],
  1: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  2: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  3: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  4: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  5: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  6: [],
};

const PACKAGE_CONFIG = { starter: { label: "Starter", color: "#6b7280", changes: 0, storage: 500 }, business: { label: "Business", color: "#1a73e8", changes: 1, storage: 2048 }, premium: { label: "Premium", color: "#8b5cf6", changes: 3, storage: 10240 } };

const STATUS_CONFIG = {
  client: { lead: ["🔵","Lead","#3b82f6","#eff6ff"], ordered: ["📦","Besteld","#f59e0b","#fefce8"], in_progress: ["🔨","In uitvoering","#8b5cf6","#f5f3ff"], delivered: ["✅","Opgeleverd","#10b981","#f0fdf4"], active: ["🌐","Actief","#10b981","#f0fdf4"] },
  site: { offline: ["🔴","Offline","#ef4444","#fef2f2"], building: ["🟡","In aanbouw","#f59e0b","#fefce8"], online: ["🟢","Online","#10b981","#f0fdf4"], issue: ["⚠️","Probleem","#ef4444","#fef2f2"] },
};

function Badge({ type, val }) {
  const cfg = STATUS_CONFIG[type]?.[val] || ["⚪","Onbekend","#9ca3af","#f9fafb"];
  return <span style={{ background: cfg[3], color: cfg[2], padding: "3px 10px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700 }}>{cfg[0]} {cfg[1]}</span>;
}

function StorageBar({ used, limit }) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  const color = pct > 90 ? "#ef4444" : pct > 70 ? "#f59e0b" : "#10b981";
  const fmt = (mb) => mb >= 1024 ? `${(mb/1024).toFixed(1)} GB` : `${mb} MB`;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#64748b", marginBottom: 4 }}>
        <span>{fmt(used)} gebruikt</span><span>{fmt(limit)}</span>
      </div>
      <div style={{ background: "#f1f5f9", borderRadius: 100, height: 6 }}>
        <div style={{ width: `${pct}%`, background: color, borderRadius: 100, height: 6, transition: "width 0.3s" }} />
      </div>
      <div style={{ fontSize: "0.72rem", color: pct > 80 ? color : "#94a3b8", marginTop: 3, fontWeight: 600 }}>{pct}%</div>
    </div>
  );
}

export default function Admin() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (user && user.role === "admin") {
        setIsAdmin(true);
      } else if (user) {
        setIsAdmin(false);
      } else {
        base44.auth.redirectToLogin(window.location.href);
      }
      setAuthChecked(true);
    }).catch(() => {
      base44.auth.redirectToLogin(window.location.href);
    });
  }, []);

  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a1628", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#fff", fontFamily: "'Inter',sans-serif", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>🔐</div>
          <p>Toegang controleren...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a1628", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center", maxWidth: 400, fontFamily: "'Inter',sans-serif" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🚫</div>
          <h2 style={{ fontWeight: 800, marginBottom: 12, color: "#0a1628" }}>Geen toegang</h2>
          <p style={{ color: "#6b7280", marginBottom: 24 }}>Je hebt geen beheerdersrechten voor dit paneel.</p>
          <a href="/" style={{ background: "#1a73e8", color: "#fff", padding: "11px 24px", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>Terug naar home</a>
        </div>
      </div>
    );
  }

  const [tab, setTab] = useState("planning");
  const [subTab, setSubTab] = useState("single");
  const [availabilities, setAvailabilities] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [changeRequests, setChangeRequests] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Planning state
  const [newDate, setNewDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [saving, setSaving] = useState(false);
  const [weekTemplate, setWeekTemplate] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : DEFAULT_WEEK_TEMPLATE; } catch { return DEFAULT_WEEK_TEMPLATE; }
  });
  const [templateSaved, setTemplateSaved] = useState(false);
  const [bulkRange, setBulkRange] = useState({ from: "", to: "" });
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkResult, setBulkResult] = useState(null);

  // Client state
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientForm, setClientForm] = useState(null);
  const [showNewClient, setShowNewClient] = useState(false);
  const [newClientForm, setNewClientForm] = useState({ name:"", email:"", phone:"", company:"", package:"business", domain:"", notes:"" });

  // Email state
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateForm, setTemplateForm] = useState(null);
  const [sendModal, setSendModal] = useState(null);
  const [sendClientId, setSendClientId] = useState("");
  const [sending, setSending] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [avs, apts, cls, crs, ets, els] = await Promise.all([
        Availability.list(), Appointment.list(), Client.list(),
        ChangeRequest.list(), EmailTemplate.list(), EmailLog.list()
      ]);
      avs.sort((a,b) => a.date.localeCompare(b.date));
      apts.sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time));
      setAvailabilities(avs); setAppointments(apts); setClients(cls);
      setChangeRequests(crs); setEmailTemplates(ets); setEmailLogs(els);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  // ── Planning helpers ──
  const toggleSlot = s => setSelectedSlots(p => p.includes(s) ? p.filter(x=>x!==s) : [...p,s].sort());
  const toggleTemplateSlot = (dow, s) => setWeekTemplate(p => ({ ...p, [dow]: p[dow].includes(s) ? p[dow].filter(x=>x!==s) : [...p[dow],s].sort() }));
  const addBulkSlots = (start, end, setter) => {
    const si = TIME_OPTIONS.indexOf(start), ei = TIME_OPTIONS.indexOf(end);
    if (si<0||ei<0) return;
    setter(p => Array.isArray(p) ? [...new Set([...p,...TIME_OPTIONS.slice(si,ei+1)])].sort() : p);
  };
  const addTemplateBulk = (dow, start, end) => {
    const si = TIME_OPTIONS.indexOf(start), ei = TIME_OPTIONS.indexOf(end);
    if (si<0||ei<0) return;
    setWeekTemplate(p => ({ ...p, [dow]: [...new Set([...p[dow],...TIME_OPTIONS.slice(si,ei+1)])].sort() }));
  };

  const saveTemplate = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weekTemplate));
    setTemplateSaved(true);
    setTimeout(() => setTemplateSaved(false), 2500);
  };

  const saveAvailability = async () => {
    if (!newDate || selectedSlots.length === 0) return;
    setSaving(true);
    try {
      const ex = availabilities.find(a => a.date === newDate);
      if (ex) await Availability.update(ex.id, { time_slots: selectedSlots, is_active: true });
      else await Availability.create({ date: newDate, time_slots: selectedSlots, is_active: true });
      setNewDate(""); setSelectedSlots([]);
      await loadAll();
    } catch(e) { alert("Fout: "+e.message); }
    setSaving(false);
  };

  const applyBulkTemplate = async () => {
    if (!bulkRange.from || !bulkRange.to) return;
    setBulkSaving(true); setBulkResult(null);
    let count = 0;
    const cur = new Date(bulkRange.from+"T12:00:00");
    const end = new Date(bulkRange.to+"T12:00:00");
    while (cur <= end) {
      const dow = cur.getDay(), slots = weekTemplate[dow];
      if (slots?.length > 0) {
        const ds = cur.toISOString().split("T")[0];
        const ex = availabilities.find(a => a.date === ds);
        if (ex) await Availability.update(ex.id, { time_slots: slots, is_active: true });
        else await Availability.create({ date: ds, time_slots: slots, is_active: true });
        count++;
      }
      cur.setDate(cur.getDate()+1);
    }
    setBulkResult({ count }); await loadAll(); setBulkSaving(false);
  };

  const toggleActive = async av => { await Availability.update(av.id, { is_active: !av.is_active }); await loadAll(); };
  const deleteAv = async id => { if (!confirm("Verwijder?")) return; await Availability.delete(id); await loadAll(); };
  const updateAptStatus = async (id, status) => { await Appointment.update(id, { status }); await loadAll(); };

  // ── Client helpers ──
  const saveClient = async () => {
    if (!clientForm) return;
    await Client.update(clientForm.id, clientForm);
    setSelectedClient(clientForm); await loadAll();
    alert("Opgeslagen!");
  };

  const createClient = async () => {
    const pkg = newClientForm.package;
    const cfg = PACKAGE_CONFIG[pkg];
    await Client.create({
      ...newClientForm,
      free_changes_total: cfg.changes,
      free_changes_used: 0,
      storage_limit_mb: cfg.storage,
      storage_used_mb: 0,
      status: "ordered",
      order_date: today,
      site_status: "building",
    });
    setShowNewClient(false);
    setNewClientForm({ name:"",email:"",phone:"",company:"",package:"business",domain:"",notes:"" });
    await loadAll();
  };

  const addChangeReq = async (client) => {
    const desc = prompt(`Omschrijf de wijziging voor ${client.name}:`);
    if (!desc) return;
    const num = changeRequests.filter(c=>c.client_id===client.id).length + 1;
    const isBillable = num > client.free_changes_total;
    const cost = isBillable ? 75 : 0;
    await ChangeRequest.create({ client_id: client.id, client_name: client.name, description: desc, status: "pending", is_billable: isBillable, cost, change_number: num });
    if (!isBillable) await Client.update(client.id, { free_changes_used: (client.free_changes_used||0)+1 });
    await loadAll();
    alert(isBillable ? `⚠️ Wijziging #${num} — Dit is een betaalde wijziging (€${cost})` : `✅ Gratis wijziging #${num} aangemaakt`);
  };

  const updateChangeStatus = async (id, status) => { await ChangeRequest.update(id, { status }); await loadAll(); };

  // ── Email helpers ──
  const saveEmailTemplate = async () => {
    if (!templateForm) return;
    if (templateForm.id) await EmailTemplate.update(templateForm.id, templateForm);
    else await EmailTemplate.create(templateForm);
    setTemplateForm(null); setSelectedTemplate(null); await loadAll();
  };

  const fillTemplate = (body, client) => {
    if (!client) return body;
    return body
      .replace(/\{\{naam\}\}/g, client.name||"")
      .replace(/\{\{bedrijf\}\}/g, client.company||"")
      .replace(/\{\{pakket\}\}/g, PACKAGE_CONFIG[client.package]?.label||"")
      .replace(/\{\{domein\}\}/g, client.domain||"")
      .replace(/\{\{wijzigingen_gebruikt\}\}/g, client.free_changes_used||0)
      .replace(/\{\{wijzigingen_totaal\}\}/g, client.free_changes_total||0)
      .replace(/\{\{status\}\}/g, client.status||"");
  };

  const sendEmail = async () => {
    if (!sendModal || !sendClientId) return;
    setSending(true);
    const client = clients.find(c=>c.id===sendClientId);
    const filledBody = fillTemplate(sendModal.body, client);
    const filledSubject = fillTemplate(sendModal.subject, client);
    await EmailLog.create({ client_id: sendClientId, client_name: client?.name, client_email: client?.email, template_name: sendModal.name, subject: filledSubject, body: filledBody, sent_at: new Date().toISOString(), status: "sent" });
    setSendModal(null); setSendClientId(""); setSending(false);
    alert("✅ E-mail gelogd! (Integreer met een mail-API voor echte verzending)");
    await loadAll();
  };

  const formatDate = d => d ? new Date(d+"T12:00:00").toLocaleDateString("nl-NL",{weekday:"short",day:"numeric",month:"short"}) : "";
  const upcomingApts = appointments.filter(a=>a.date>=today);
  const pastApts = appointments.filter(a=>a.date<today);

  const TABS = [
    { id: "planning", label: "📅 Planning" },
    { id: "klanten", label: "👥 Klanten" },
    { id: "sites", label: "🌐 Sites" },
    { id: "emails", label: "📧 E-mail templates" },
    { id: "financien", label: "💶 Financiën" },
  ];

  return (
    <div style={{fontFamily:"'Inter',sans-serif",minHeight:"100vh",background:"#f1f5f9",color:"#1e293b"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .slot-btn{padding:7px 10px;border-radius:7px;font-size:0.79rem;font-weight:600;cursor:pointer;transition:all 0.15s;border:2px solid #e2e8f0;background:#fff;color:#475569}
        .slot-btn.on{background:#1a73e8;color:#fff;border-color:#1a73e8}
        .slot-btn:hover{border-color:#1a73e8}
        input[type=date],input[type=text],input[type=email],input[type=tel],select,textarea{padding:10px 14px;border:2px solid #e2e8f0;border-radius:9px;font-size:0.9rem;font-family:inherit;outline:none;background:#fff;transition:border-color 0.2s}
        input:focus,select:focus,textarea:focus{border-color:#1a73e8}
        textarea{resize:vertical;min-height:80px}
        .main-tab{padding:11px 18px;border-radius:9px;font-weight:700;font-size:0.88rem;cursor:pointer;border:none;transition:all 0.2s;white-space:nowrap}
        .main-tab.active{background:#0a1628;color:#fff}
        .main-tab:not(.active){background:#fff;color:#475569;border:1px solid #e2e8f0}
        .sub-tab{padding:8px 14px;border-radius:8px;font-weight:600;font-size:0.82rem;cursor:pointer;border:none;transition:all 0.2s}
        .sub-tab.active{background:#1a73e8;color:#fff}
        .sub-tab:not(.active){background:#f1f5f9;color:#64748b}
        .card{background:#fff;border-radius:16px;padding:24px;box-shadow:0 1px 4px rgba(0,0,0,0.07)}
        .card-lg{background:#fff;border-radius:16px;padding:28px;box-shadow:0 1px 4px rgba(0,0,0,0.07)}
        .action-btn{padding:6px 14px;border-radius:8px;font-size:0.8rem;font-weight:600;cursor:pointer;border:none;transition:all 0.2s}
        .quick-btn{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:7px;padding:6px 11px;font-size:0.76rem;font-weight:600;cursor:pointer;color:#475569}
        .quick-btn:hover{background:#e2e8f0}
        .save-btn{background:#1a73e8;color:#fff;padding:12px 24px;border-radius:10px;font-weight:700;font-size:0.92rem;border:none;cursor:pointer;transition:all 0.2s}
        .save-btn:hover{background:#00c2ff}
        .save-btn:disabled{background:#9ca3af;cursor:not-allowed}
        .client-row{border:1px solid #e2e8f0;border-radius:12px;padding:16px 18px;background:#f8fafc;cursor:pointer;transition:all 0.2s}
        .client-row:hover{border-color:#1a73e8;background:#eff6ff}
        .day-block{background:#f8fafc;border:1px solid #e2e8f0;border-radius:13px;padding:16px 18px;margin-bottom:10px}
        .template-card{border:1px solid #e2e8f0;border-radius:12px;padding:18px;background:#f8fafc;cursor:pointer;transition:all 0.2s}
        .template-card:hover{border-color:#1a73e8}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999;display:flex;align-items:center;justify-content:center;padding:20px}
        .modal{background:#fff;border-radius:20px;padding:32px;max-width:620px;width:100%;max-height:90vh;overflow-y:auto}
      `}</style>

      {/* Header */}
      <div style={{background:"#0a1628",padding:"20px 5%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <a href="/" style={{color:"rgba(255,255,255,0.5)",textDecoration:"none",fontSize:"0.8rem"}}>← Terug naar site</a>
          <h1 style={{color:"#fff",fontWeight:800,fontSize:"1.4rem",marginTop:4}}>⚙️ Vedantix Admin</h1>
        </div>
        <span style={{background:"#00c2ff20",border:"1px solid #00c2ff40",borderRadius:8,padding:"5px 12px",color:"#00c2ff",fontSize:"0.8rem",fontWeight:700}}>Admin Panel</span>
      </div>

      <div style={{maxWidth:1060,margin:"0 auto",padding:"28px 20px"}}>

        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14,marginBottom:28}}>
          {[
            ["📅","Komende afspraken",upcomingApts.filter(a=>a.status!=="cancelled").length,"#1a73e8"],
            ["⏳","Wacht op bevestiging",appointments.filter(a=>a.status==="pending").length,"#f59e0b"],
            ["👥","Klanten",clients.length,"#8b5cf6"],
            ["🌐","Sites online",clients.filter(c=>c.site_status==="online").length,"#10b981"],
            ["⚠️","Sites met probleem",clients.filter(c=>c.site_status==="issue"||c.site_status==="offline").length,"#ef4444"],
          ].map(([ic,label,val,color]) => (
            <div key={label} className="card" style={{padding:18}}>
              <div style={{fontSize:"1.4rem",marginBottom:4}}>{ic}</div>
              <div style={{fontSize:"1.5rem",fontWeight:900,color,lineHeight:1}}>{val}</div>
              <div style={{fontSize:"0.73rem",color:"#94a3b8",fontWeight:600,marginTop:2}}>{label}</div>
            </div>
          ))}
        </div>

        {/* Main tabs */}
        <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
          {TABS.map(t => (
            <button key={t.id} className={`main-tab ${tab===t.id?"active":""}`} onClick={()=>{setTab(t.id);setSelectedClient(null);setClientForm(null);setSelectedTemplate(null);setTemplateForm(null);}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════ PLANNING TAB ══════════ */}
        {tab === "planning" && (
          <div>
            <div style={{display:"flex",gap:8,marginBottom:22}}>
              {[["single","➕ Enkele dag"],["template","📋 Weektemplate"],["bulk","🗓️ Bulkplanning"],["afspraken","🗓️ Afspraken"]].map(([id,label])=>(
                <button key={id} className={`sub-tab ${subTab===id?"active":""}`} onClick={()=>setSubTab(id)}>{label}{id==="afspraken"&&upcomingApts.filter(a=>a.status==="pending").length>0&&<span style={{background:"#ef4444",color:"#fff",borderRadius:"50%",padding:"1px 6px",fontSize:"0.7rem",marginLeft:6}}>{upcomingApts.filter(a=>a.status==="pending").length}</span>}</button>
              ))}
            </div>

            {/* Enkele dag */}
            {subTab === "single" && (
              <div className="card-lg" style={{marginBottom:24}}>
                <h3 style={{fontWeight:700,marginBottom:18,fontSize:"1rem"}}>➕ Beschikbaarheid toevoegen</h3>
                <div style={{marginBottom:16}}>
                  <label style={{display:"block",fontWeight:600,marginBottom:6,fontSize:"0.85rem",color:"#475569"}}>Datum</label>
                  <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
                    <input type="date" value={newDate} min={today} onChange={e=>{
                      const d=e.target.value; setNewDate(d);
                      const ex=availabilities.find(a=>a.date===d);
                      setSelectedSlots(ex?[...ex.time_slots]:[...(weekTemplate[new Date(d+"T12:00:00").getDay()]||[])]);
                    }}/>
                    {newDate&&<span style={{color:"#64748b",fontSize:"0.83rem",fontWeight:600}}>📅 {DAYS_NL[new Date(newDate+"T12:00:00").getDay()]}</span>}
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
                  {[["Ochtend","09:00","11:30"],["Middag","13:00","16:30"],["Hele dag","09:00","16:30"]].map(([l,s,e])=>(
                    <button key={l} className="quick-btn" onClick={()=>addBulkSlots(s,e,prev=>[...new Set([...prev,...TIME_OPTIONS.slice(TIME_OPTIONS.indexOf(s),TIME_OPTIONS.indexOf(e)+1)])].sort())}>{l}</button>
                  ))}
                  <button className="quick-btn" style={{color:"#991b1b"}} onClick={()=>setSelectedSlots([])}>Wis alles</button>
                </div>
                <label style={{display:"block",fontWeight:600,marginBottom:8,fontSize:"0.85rem",color:"#475569"}}>Tijdslots <span style={{color:"#9ca3af",fontWeight:400}}>({selectedSlots.length} geselecteerd)</span></label>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(76px,1fr))",gap:6,marginBottom:20}}>
                  {TIME_OPTIONS.map(t=><button key={t} className={`slot-btn ${selectedSlots.includes(t)?"on":""}`} onClick={()=>toggleSlot(t)}>{t}</button>)}
                </div>
                <button className="save-btn" disabled={!newDate||selectedSlots.length===0||saving} onClick={saveAvailability}>
                  {saving?"Opslaan...":"💾 Dag opslaan"}
                </button>

                {/* Existing list */}
                <div style={{marginTop:28}}>
                  <h4 style={{fontWeight:700,marginBottom:14,fontSize:"0.95rem"}}>📆 Ingeplande beschikbaarheid</h4>
                  {availabilities.length===0?<p style={{color:"#94a3b8",fontSize:"0.88rem"}}>Nog niets ingepland.</p>:(
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {availabilities.map(av=>{
                        const past=av.date<today;
                        return(
                          <div key={av.id} style={{border:`1px solid ${!past&&av.is_active?"#e2e8f0":"#fca5a5"}`,borderRadius:10,padding:"11px 14px",background:!past&&av.is_active?"#f8fafc":"#fff5f5",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                            <div>
                              <span style={{fontWeight:700,fontSize:"0.88rem"}}>{DAYS_NL[new Date(av.date+"T12:00:00").getDay()]} {formatDate(av.date)}</span>
                              <span style={{color:"#64748b",fontSize:"0.78rem",marginLeft:8}}>{av.time_slots?.length} slots</span>
                              {past&&<span style={{marginLeft:6,background:"#f1f5f9",color:"#64748b",padding:"1px 7px",borderRadius:100,fontSize:"0.7rem",fontWeight:600}}>Verleden</span>}
                            </div>
                            <div style={{display:"flex",gap:6}}>
                              {!past&&<button className="action-btn" onClick={()=>toggleActive(av)} style={{background:av.is_active?"#fef3c7":"#d1fae5",color:av.is_active?"#92400e":"#065f46"}}>{av.is_active?"⏸":"▶"}</button>}
                              <button className="action-btn" onClick={()=>deleteAv(av.id)} style={{background:"#fee2e2",color:"#991b1b"}}>🗑</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Weektemplate */}
            {subTab === "template" && (
              <div className="card-lg" style={{marginBottom:24}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6,flexWrap:"wrap",gap:12}}>
                  <div>
                    <h3 style={{fontWeight:700,fontSize:"1rem"}}>📋 Weektemplate instellen</h3>
                    <p style={{color:"#64748b",fontSize:"0.85rem",marginTop:4}}>Stel je standaard werktijden per weekdag in. Wordt automatisch toegepast bij bulkplanning.</p>
                  </div>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    {templateSaved&&<span style={{color:"#10b981",fontWeight:700,fontSize:"0.85rem"}}>✅ Opgeslagen!</span>}
                    <button className="save-btn" onClick={saveTemplate}>💾 Template opslaan</button>
                  </div>
                </div>
                <div style={{marginTop:20}}>
                  {[1,2,3,4,5,6,0].map(dow=>(
                    <div key={dow} className="day-block">
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:8}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <span style={{fontWeight:700,fontSize:"0.92rem"}}>{DAYS_NL[dow]}</span>
                          <span style={{background:weekTemplate[dow].length?"#eff6ff":"#f1f5f9",color:weekTemplate[dow].length?"#1e40af":"#94a3b8",padding:"2px 9px",borderRadius:100,fontSize:"0.72rem",fontWeight:700}}>
                            {weekTemplate[dow].length===0?"Vrij":`${weekTemplate[dow].length} slots`}
                          </span>
                        </div>
                        <div style={{display:"flex",gap:5}}>
                          {[["Och.","09:00","11:30"],["Mid.","13:00","16:30"],["Dag","09:00","16:30"]].map(([l,s,e])=>(
                            <button key={l} className="quick-btn" onClick={()=>addTemplateBulk(dow,s,e)}>{l}</button>
                          ))}
                          <button className="quick-btn" style={{color:"#991b1b"}} onClick={()=>setWeekTemplate(p=>({...p,[dow]:[]}))}> Wis</button>
                        </div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(72px,1fr))",gap:5}}>
                        {TIME_OPTIONS.map(t=><button key={t} className={`slot-btn ${weekTemplate[dow].includes(t)?"on":""}`} onClick={()=>toggleTemplateSlot(dow,t)}>{t}</button>)}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:10,padding:"12px 16px",marginTop:8}}>
                  <p style={{color:"#166534",fontSize:"0.85rem"}}>💡 Klik op <strong>Template opslaan</strong> om je wijzigingen te bewaren. Ga daarna naar <strong>Bulkplanning</strong> om het toe te passen.</p>
                </div>
              </div>
            )}

            {/* Bulk */}
            {subTab === "bulk" && (
              <div className="card-lg" style={{marginBottom:24}}>
                <h3 style={{fontWeight:700,marginBottom:6,fontSize:"1rem"}}>🗓️ Bulkplanning</h3>
                <p style={{color:"#64748b",fontSize:"0.85rem",marginBottom:22}}>Pas het weektemplate automatisch toe op een periode.</p>
                <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,padding:16,marginBottom:20}}>
                  <p style={{fontWeight:700,fontSize:"0.85rem",color:"#475569",marginBottom:10}}>Huidig weektemplate:</p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8}}>
                    {[1,2,3,4,5,6,0].map(dow=>(
                      <div key={dow} style={{fontSize:"0.78rem"}}>
                        <span style={{fontWeight:700,color:weekTemplate[dow].length?"#1e40af":"#94a3b8"}}>{DAYS_NL[dow]}: </span>
                        <span style={{color:weekTemplate[dow].length?"#374151":"#94a3b8"}}>
                          {weekTemplate[dow].length===0?"Vrij":`${weekTemplate[dow][0]}–${weekTemplate[dow][weekTemplate[dow].length-1]}`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button onClick={()=>setSubTab("template")} style={{marginTop:10,background:"transparent",border:"1px solid #cbd5e1",borderRadius:7,padding:"5px 11px",fontSize:"0.76rem",cursor:"pointer",color:"#64748b"}}>✏️ Template aanpassen</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
                  <div><label style={{display:"block",fontWeight:600,marginBottom:6,fontSize:"0.85rem",color:"#475569"}}>Startdatum</label><input type="date" value={bulkRange.from} min={today} onChange={e=>setBulkRange(p=>({...p,from:e.target.value}))} style={{width:"100%"}}/></div>
                  <div><label style={{display:"block",fontWeight:600,marginBottom:6,fontSize:"0.85rem",color:"#475569"}}>Einddatum</label><input type="date" value={bulkRange.to} min={bulkRange.from||today} onChange={e=>setBulkRange(p=>({...p,to:e.target.value}))} style={{width:"100%"}}/></div>
                </div>
                {bulkResult&&<div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:"0.85rem",color:"#166534"}}>✅ <strong>{bulkResult.count} dagen</strong> ingepland!</div>}
                <button className="save-btn" disabled={!bulkRange.from||!bulkRange.to||bulkSaving} onClick={applyBulkTemplate}>
                  {bulkSaving?"Bezig...":"🚀 Toepassen op periode"}
                </button>
              </div>
            )}

            {/* Afspraken */}
            {subTab === "afspraken" && (
              <div>
                {upcomingApts.length===0&&<div style={{textAlign:"center",padding:40,color:"#94a3b8"}}><div style={{fontSize:"2rem",marginBottom:10}}>📭</div><p>Geen komende afspraken.</p></div>}
                {upcomingApts.length>0&&(
                  <div className="card-lg" style={{marginBottom:20}}>
                    <h3 style={{fontWeight:700,marginBottom:16,fontSize:"1rem"}}>📅 Komende afspraken</h3>
                    <div style={{display:"flex",flexDirection:"column",gap:12}}>
                      {upcomingApts.map(apt=>(
                        <div key={apt.id} style={{border:`1px solid #e2e8f0`,borderRadius:12,padding:"14px 18px",borderLeft:`4px solid ${apt.status==="confirmed"?"#10b981":apt.status==="cancelled"?"#ef4444":"#f59e0b"}`}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                            <div>
                              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                                <span style={{fontWeight:700}}>{apt.name}</span>
                                <span style={{background:apt.status==="confirmed"?"#d1fae5":apt.status==="cancelled"?"#fee2e2":"#fef3c7",color:apt.status==="confirmed"?"#065f46":apt.status==="cancelled"?"#991b1b":"#92400e",padding:"2px 9px",borderRadius:100,fontSize:"0.72rem",fontWeight:700}}>
                                  {apt.status==="confirmed"?"✅ Bevestigd":apt.status==="cancelled"?"❌ Geannuleerd":"⏳ Wacht"}
                                </span>
                              </div>
                              <p style={{color:"#64748b",fontSize:"0.85rem"}}>📅 {DAYS_NL[new Date(apt.date+"T12:00:00").getDay()]} {formatDate(apt.date)} • 🕐 {apt.time}</p>
                              {apt.email&&<p style={{color:"#64748b",fontSize:"0.8rem"}}>📧 {apt.email}{apt.phone&&` • 📱 ${apt.phone}`}</p>}
                              {apt.package_interest&&<p style={{color:"#64748b",fontSize:"0.8rem"}}>📦 {apt.package_interest}</p>}
                              {apt.message&&<p style={{color:"#475569",fontSize:"0.83rem",fontStyle:"italic",marginTop:4}}>"{apt.message}"</p>}
                            </div>
                            {apt.status==="pending"&&(
                              <div style={{display:"flex",gap:6}}>
                                <button className="action-btn" onClick={()=>updateAptStatus(apt.id,"confirmed")} style={{background:"#d1fae5",color:"#065f46"}}>✅ Bevestigen</button>
                                <button className="action-btn" onClick={()=>updateAptStatus(apt.id,"cancelled")} style={{background:"#fee2e2",color:"#991b1b"}}>❌ Annuleren</button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {pastApts.length>0&&(
                  <div className="card-lg">
                    <h3 style={{fontWeight:700,marginBottom:14,fontSize:"0.95rem",color:"#94a3b8"}}>🕐 Verleden</h3>
                    <div style={{display:"flex",flexDirection:"column",gap:7}}>
                      {pastApts.slice(0,10).map(apt=>(
                        <div key={apt.id} style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",background:"#f8fafc",borderRadius:9,opacity:0.6}}>
                          <span style={{fontWeight:600,fontSize:"0.87rem"}}>{apt.name}</span>
                          <span style={{color:"#94a3b8",fontSize:"0.8rem"}}>{formatDate(apt.date)} {apt.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════ KLANTEN TAB ══════════ */}
        {tab === "klanten" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
              <h2 style={{fontWeight:800,fontSize:"1.15rem"}}>👥 Klantenbeheer</h2>
              <button className="save-btn" onClick={()=>setShowNewClient(true)}>➕ Nieuwe klant</button>
            </div>

            {/* New client modal */}
            {showNewClient&&(
              <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowNewClient(false)}}>
                <div className="modal">
                  <h3 style={{fontWeight:800,marginBottom:20,fontSize:"1.1rem"}}>➕ Nieuwe klant toevoegen</h3>
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Naam</label><input type="text" value={newClientForm.name} onChange={e=>setNewClientForm(p=>({...p,name:e.target.value}))} style={{width:"100%"}}/></div>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Bedrijf</label><input type="text" value={newClientForm.company} onChange={e=>setNewClientForm(p=>({...p,company:e.target.value}))} style={{width:"100%"}}/></div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>E-mail</label><input type="email" value={newClientForm.email} onChange={e=>setNewClientForm(p=>({...p,email:e.target.value}))} style={{width:"100%"}}/></div>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Telefoon</label><input type="tel" value={newClientForm.phone} onChange={e=>setNewClientForm(p=>({...p,phone:e.target.value}))} style={{width:"100%"}}/></div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Pakket</label>
                        <select value={newClientForm.package} onChange={e=>setNewClientForm(p=>({...p,package:e.target.value}))} style={{width:"100%"}}>
                          <option value="starter">Starter — €399 (0 gratis)</option>
                          <option value="business">Business — €799 (1 gratis)</option>
                          <option value="premium">Premium — €1499 (3 gratis)</option>
                        </select>
                      </div>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Domeinnaam</label><input type="text" value={newClientForm.domain} onChange={e=>setNewClientForm(p=>({...p,domain:e.target.value}))} placeholder="bijv. mijnsite.nl" style={{width:"100%"}}/></div>
                    </div>
                    <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Notities</label><textarea value={newClientForm.notes} onChange={e=>setNewClientForm(p=>({...p,notes:e.target.value}))} style={{width:"100%"}}/></div>
                    <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
                      <button onClick={()=>setShowNewClient(false)} style={{background:"#f1f5f9",border:"none",borderRadius:9,padding:"10px 20px",fontWeight:600,cursor:"pointer",color:"#475569"}}>Annuleren</button>
                      <button className="save-btn" onClick={createClient}>✅ Klant aanmaken</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
              {clients.map(client=>{
                const cfg=PACKAGE_CONFIG[client.package]||{};
                const changes=changeRequests.filter(c=>c.client_id===client.id);
                const usedFree=client.free_changes_used||0;
                const totalFree=client.free_changes_total||0;
                const billable=changes.filter(c=>c.is_billable).length;
                return(
                  <div key={client.id} className="client-row" onClick={()=>{setSelectedClient(client);setClientForm({...client})}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:"0.95rem"}}>{client.name}</div>
                        {client.company&&<div style={{color:"#64748b",fontSize:"0.82rem"}}>🏢 {client.company}</div>}
                      </div>
                      <Badge type="client" val={client.status}/>
                    </div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
                      <span style={{background:cfg.color+"20",color:cfg.color,padding:"2px 9px",borderRadius:100,fontSize:"0.75rem",fontWeight:700}}>📦 {cfg.label}</span>
                      {client.domain&&<span style={{background:"#f0fdf4",color:"#166534",padding:"2px 9px",borderRadius:100,fontSize:"0.75rem",fontWeight:600}}>🌐 {client.domain}</span>}
                    </div>
                    {/* Change progress */}
                    <div style={{background:"#f8fafc",borderRadius:8,padding:"8px 12px",marginBottom:6}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.78rem",color:"#64748b",marginBottom:4}}>
                        <span>Gratis wijzigingen</span>
                        <span style={{fontWeight:700,color:usedFree>=totalFree?"#ef4444":"#374151"}}>{usedFree}/{totalFree}</span>
                      </div>
                      {totalFree>0&&<div style={{background:"#e5e7eb",borderRadius:100,height:5}}>
                        <div style={{width:`${Math.min(100,(usedFree/totalFree)*100)}%`,background:usedFree>=totalFree?"#ef4444":"#10b981",borderRadius:100,height:5}}/>
                      </div>}
                      {billable>0&&<div style={{color:"#f59e0b",fontSize:"0.75rem",fontWeight:600,marginTop:4}}>⚠️ {billable} betaalde wijziging(en)</div>}
                    </div>
                    <StorageBar used={client.storage_used_mb||0} limit={client.storage_limit_mb||500}/>
                  </div>
                );
              })}
            </div>

            {clients.length===0&&!loading&&(
              <div style={{textAlign:"center",padding:40,color:"#94a3b8"}}>
                <div style={{fontSize:"2rem",marginBottom:10}}>👥</div>
                <p>Nog geen klanten. Klik op "+ Nieuwe klant" om te beginnen.</p>
              </div>
            )}

            {/* Client detail modal */}
            {selectedClient&&clientForm&&(
              <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget){setSelectedClient(null);setClientForm(null);}}}>
                <div className="modal">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                    <h3 style={{fontWeight:800,fontSize:"1.05rem"}}>👤 {selectedClient.name}</h3>
                    <button onClick={()=>{setSelectedClient(null);setClientForm(null);}} style={{background:"#f1f5f9",border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:"0.85rem"}}>✕ Sluiten</button>
                  </div>

                  {/* Wijzigingen */}
                  <div style={{background:"#f8fafc",borderRadius:12,padding:16,marginBottom:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <h4 style={{fontWeight:700,fontSize:"0.9rem"}}>🔧 Wijzigingen</h4>
                      <button className="action-btn" style={{background:"#eff6ff",color:"#1e40af"}} onClick={()=>addChangeReq(selectedClient)}>➕ Wijziging toevoegen</button>
                    </div>
                    {changeRequests.filter(c=>c.client_id===selectedClient.id).length===0?
                      <p style={{color:"#94a3b8",fontSize:"0.83rem"}}>Geen wijzigingen.</p>:
                      changeRequests.filter(c=>c.client_id===selectedClient.id).map(cr=>(
                        <div key={cr.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #e5e7eb"}}>
                          <div>
                            <span style={{fontSize:"0.83rem",fontWeight:600}}>#{cr.change_number} {cr.description}</span>
                            <div style={{display:"flex",gap:6,marginTop:3}}>
                              {cr.is_billable&&<span style={{background:"#fef3c7",color:"#92400e",padding:"1px 7px",borderRadius:100,fontSize:"0.7rem",fontWeight:700}}>💶 €{cr.cost}</span>}
                              <span style={{background:cr.status==="done"?"#d1fae5":cr.status==="in_progress"?"#eff6ff":"#f1f5f9",color:cr.status==="done"?"#065f46":cr.status==="in_progress"?"#1e40af":"#64748b",padding:"1px 7px",borderRadius:100,fontSize:"0.7rem",fontWeight:700}}>
                                {cr.status==="done"?"✅ Klaar":cr.status==="in_progress"?"🔨 Bezig":"⏳ Wacht"}
                              </span>
                            </div>
                          </div>
                          {cr.status!=="done"&&<button className="action-btn" onClick={()=>updateChangeStatus(cr.id,cr.status==="pending"?"in_progress":"done")} style={{background:"#d1fae5",color:"#065f46",fontSize:"0.75rem"}}>
                            {cr.status==="pending"?"▶ Start":"✅ Klaar"}
                          </button>}
                        </div>
                      ))
                    }
                  </div>

                  {/* Edit fields */}
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:4,fontSize:"0.8rem",color:"#475569"}}>Status</label>
                        <select value={clientForm.status} onChange={e=>setClientForm(p=>({...p,status:e.target.value}))} style={{width:"100%"}}>
                          {["lead","ordered","in_progress","delivered","active"].map(s=><option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:4,fontSize:"0.8rem",color:"#475569"}}>Site status</label>
                        <select value={clientForm.site_status} onChange={e=>setClientForm(p=>({...p,site_status:e.target.value}))} style={{width:"100%"}}>
                          {["offline","building","online","issue"].map(s=><option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:4,fontSize:"0.8rem",color:"#475569"}}>Opslag gebruikt (MB)</label>
                        <input type="text" value={clientForm.storage_used_mb} onChange={e=>setClientForm(p=>({...p,storage_used_mb:Number(e.target.value)}))} style={{width:"100%"}}/></div>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:4,fontSize:"0.8rem",color:"#475569"}}>Opslag limiet (MB)</label>
                        <input type="text" value={clientForm.storage_limit_mb} onChange={e=>setClientForm(p=>({...p,storage_limit_mb:Number(e.target.value)}))} style={{width:"100%"}}/></div>
                    </div>
                    <div><label style={{display:"block",fontWeight:600,marginBottom:4,fontSize:"0.8rem",color:"#475569"}}>Site URL</label><input type="text" value={clientForm.site_url||""} onChange={e=>setClientForm(p=>({...p,site_url:e.target.value}))} style={{width:"100%"}} placeholder="https://..."/></div>
                    <div><label style={{display:"block",fontWeight:600,marginBottom:4,fontSize:"0.8rem",color:"#475569"}}>Notities</label><textarea value={clientForm.notes||""} onChange={e=>setClientForm(p=>({...p,notes:e.target.value}))} style={{width:"100%"}}/></div>
                  </div>
                  <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
                    <button onClick={()=>{setSendModal(emailTemplates[0]);setSendClientId(selectedClient.id);}} style={{background:"#eff6ff",color:"#1e40af",padding:"10px 18px",border:"none",borderRadius:9,fontWeight:600,cursor:"pointer",fontSize:"0.87rem"}}>📧 E-mail versturen</button>
                    <button className="save-btn" onClick={saveClient}>💾 Opslaan</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════ SITES TAB ══════════ */}
        {tab === "sites" && (
          <div>
            <h2 style={{fontWeight:800,fontSize:"1.15rem",marginBottom:20}}>🌐 Site monitoring</h2>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {clients.length===0&&<div style={{textAlign:"center",padding:40,color:"#94a3b8"}}><p>Geen klanten / sites. Voeg klanten toe via het Klanten-tabblad.</p></div>}
              {clients.map(client=>{
                const cfg=PACKAGE_CONFIG[client.package]||{};
                const storagePct=Math.min(100,Math.round(((client.storage_used_mb||0)/(client.storage_limit_mb||500))*100));
                const isAlert=client.site_status==="offline"||client.site_status==="issue"||storagePct>85;
                return(
                  <div key={client.id} style={{background:"#fff",borderRadius:16,padding:"20px 24px",border:`1px solid ${isAlert?"#fca5a5":"#e2e8f0"}`,boxShadow:isAlert?"0 0 0 2px #fee2e2":"0 1px 4px rgba(0,0,0,0.06)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:16}}>
                      <div>
                        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:4}}>
                          <span style={{fontWeight:800,fontSize:"1rem"}}>{client.company||client.name}</span>
                          <Badge type="site" val={client.site_status}/>
                          {isAlert&&storagePct>85&&<span style={{background:"#fef3c7",color:"#92400e",padding:"2px 9px",borderRadius:100,fontSize:"0.72rem",fontWeight:700}}>⚠️ Opslag bijna vol</span>}
                        </div>
                        {client.domain&&<p style={{color:"#64748b",fontSize:"0.85rem"}}>🌐 {client.domain}</p>}
                        {client.site_url&&<a href={client.site_url} target="_blank" rel="noreferrer" style={{color:"#1a73e8",fontSize:"0.82rem",textDecoration:"none"}}>🔗 Bekijk site →</a>}
                      </div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={{background:cfg.color+"15",color:cfg.color,padding:"3px 10px",borderRadius:100,fontSize:"0.76rem",fontWeight:700}}>📦 {cfg.label}</span>
                        <Badge type="client" val={client.status}/>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                      <div>
                        <p style={{fontWeight:600,fontSize:"0.8rem",color:"#64748b",marginBottom:6}}>💾 Database opslag</p>
                        <StorageBar used={client.storage_used_mb||0} limit={client.storage_limit_mb||500}/>
                      </div>
                      <div>
                        <p style={{fontWeight:600,fontSize:"0.8rem",color:"#64748b",marginBottom:6}}>🔧 Wijzigingen</p>
                        <div style={{fontSize:"0.83rem"}}>
                          <span style={{fontWeight:700}}>{client.free_changes_used||0}/{client.free_changes_total||0}</span>
                          <span style={{color:"#94a3b8"}}> gratis gebruikt</span>
                          {(client.free_changes_used||0)>=(client.free_changes_total||0)&&<div style={{color:"#f59e0b",fontSize:"0.76rem",fontWeight:600,marginTop:2}}>⚠️ Volgende wijziging is betaald</div>}
                        </div>
                      </div>
                    </div>
                    {isAlert&&(
                      <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:9,padding:"10px 14px",marginTop:14}}>
                        <p style={{color:"#991b1b",fontWeight:700,fontSize:"0.85rem"}}>
                          {client.site_status==="offline"?"🔴 Site is offline — actie vereist!":client.site_status==="issue"?"⚠️ Site heeft een probleem — controleer de server.":"⚠️ Opslag bijna vol — informeer klant over uitbreiding."}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════ EMAIL TEMPLATES TAB ══════════ */}
        {tab === "emails" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
              <h2 style={{fontWeight:800,fontSize:"1.15rem"}}>📧 E-mail templates</h2>
              <button className="save-btn" onClick={()=>{setTemplateForm({name:"",subject:"",body:"",trigger:"manual",variables:[]});setSelectedTemplate(null);}}>➕ Nieuw template</button>
            </div>

            {/* Variables reference */}
            <div style={{background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:12,padding:"14px 18px",marginBottom:20,fontSize:"0.83rem",color:"#0369a1"}}>
              <strong>Beschikbare variabelen:</strong> {" "}
              {["{{naam}}","{{bedrijf}}","{{pakket}}","{{domein}}","{{wijzigingen_gebruikt}}","{{wijzigingen_totaal}}","{{status}}"].map(v=>(
                <code key={v} style={{background:"#e0f2fe",padding:"1px 6px",borderRadius:4,marginRight:6,fontFamily:"monospace"}}>{v}</code>
              ))}
            </div>

            {/* Template list */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14,marginBottom:24}}>
              {emailTemplates.map(et=>(
                <div key={et.id} className="template-card" onClick={()=>{setSelectedTemplate(et);setTemplateForm({...et});}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                    <span style={{fontWeight:700,fontSize:"0.92rem"}}>{et.name}</span>
                    <span style={{background:"#f0f9ff",color:"#0369a1",padding:"2px 8px",borderRadius:100,fontSize:"0.72rem",fontWeight:700}}>{et.trigger}</span>
                  </div>
                  <p style={{color:"#475569",fontSize:"0.83rem",marginBottom:8}}>📌 {et.subject}</p>
                  <p style={{color:"#94a3b8",fontSize:"0.78rem",lineHeight:1.5}}>{et.body?.slice(0,100)}...</p>
                  <div style={{display:"flex",gap:8,marginTop:12}}>
                    <button className="action-btn" style={{background:"#eff6ff",color:"#1e40af"}} onClick={e=>{e.stopPropagation();setSendModal(et);setSendClientId("");}}>📤 Versturen</button>
                    <button className="action-btn" style={{background:"#fee2e2",color:"#991b1b"}} onClick={async e=>{e.stopPropagation();if(confirm("Verwijder?"))await EmailTemplate.delete(et.id);await loadAll();}}>🗑</button>
                  </div>
                </div>
              ))}
              {emailTemplates.length===0&&<div style={{padding:32,textAlign:"center",color:"#94a3b8"}}><p>Nog geen templates. Maak je eerste aan.</p></div>}
            </div>

            {/* Edit/create template */}
            {templateForm&&(
              <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget){setTemplateForm(null);setSelectedTemplate(null);}}}>
                <div className="modal">
                  <h3 style={{fontWeight:800,marginBottom:20,fontSize:"1.05rem"}}>{templateForm.id?"✏️ Template bewerken":"➕ Nieuw template"}</h3>
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Naam template</label><input type="text" value={templateForm.name} onChange={e=>setTemplateForm(p=>({...p,name:e.target.value}))} style={{width:"100%"}} placeholder="Bijv. Orderbevestiging"/></div>
                      <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Trigger</label>
                        <select value={templateForm.trigger} onChange={e=>setTemplateForm(p=>({...p,trigger:e.target.value}))} style={{width:"100%"}}>
                          <option value="manual">Handmatig</option>
                          <option value="order_received">Bestelling ontvangen</option>
                          <option value="status_change">Statuswijziging</option>
                          <option value="change_request">Wijzigingsverzoek</option>
                          <option value="delivery">Oplevering</option>
                        </select>
                      </div>
                    </div>
                    <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Onderwerp</label><input type="text" value={templateForm.subject} onChange={e=>setTemplateForm(p=>({...p,subject:e.target.value}))} style={{width:"100%"}} placeholder="Bijv. Jouw bestelling bij Vedantix — {{pakket}}"/></div>
                    <div><label style={{display:"block",fontWeight:600,marginBottom:5,fontSize:"0.82rem",color:"#475569"}}>Inhoud (gebruik variabelen)</label><textarea value={templateForm.body} onChange={e=>setTemplateForm(p=>({...p,body:e.target.value}))} style={{width:"100%",minHeight:200}} placeholder={"Beste {{naam}},\n\nBedankt voor jouw bestelling bij Vedantix!\n\nPakket: {{pakket}}\nDomein: {{domein}}\n\nMet vriendelijke groet,\nVedantix"}/></div>
                  </div>
                  <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
                    <button onClick={()=>{setTemplateForm(null);setSelectedTemplate(null);}} style={{background:"#f1f5f9",border:"none",borderRadius:9,padding:"10px 18px",fontWeight:600,cursor:"pointer",color:"#475569"}}>Annuleren</button>
                    <button className="save-btn" onClick={saveEmailTemplate}>💾 Opslaan</button>
                  </div>
                </div>
              </div>
            )}

            {/* Send modal */}
            {sendModal&&(
              <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget){setSendModal(null);setSendClientId("");}}}>
                <div className="modal">
                  <h3 style={{fontWeight:800,marginBottom:6,fontSize:"1.05rem"}}>📤 E-mail versturen</h3>
                  <p style={{color:"#64748b",fontSize:"0.85rem",marginBottom:20}}>Template: <strong>{sendModal.name}</strong></p>
                  <div style={{marginBottom:14}}>
                    <label style={{display:"block",fontWeight:600,marginBottom:6,fontSize:"0.85rem",color:"#475569"}}>Klant selecteren</label>
                    <select value={sendClientId} onChange={e=>setSendClientId(e.target.value)} style={{width:"100%"}}>
                      <option value="">— Selecteer klant —</option>
                      {clients.map(c=><option key={c.id} value={c.id}>{c.name} {c.company?`(${c.company})`:""} — {c.email}</option>)}
                    </select>
                  </div>
                  {sendClientId&&(()=>{
                    const client=clients.find(c=>c.id===sendClientId);
                    const preview={subject:fillTemplate(sendModal.subject,client),body:fillTemplate(sendModal.body,client)};
                    return(
                      <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,padding:16,marginBottom:16}}>
                        <p style={{fontWeight:700,fontSize:"0.82rem",color:"#475569",marginBottom:8}}>👁 Preview</p>
                        <p style={{fontWeight:600,fontSize:"0.85rem",marginBottom:6}}>Onderwerp: {preview.subject}</p>
                        <pre style={{fontSize:"0.82rem",color:"#374151",whiteSpace:"pre-wrap",fontFamily:"inherit",lineHeight:1.6}}>{preview.body}</pre>
                      </div>
                    );
                  })()}
                  <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                    <button onClick={()=>{setSendModal(null);setSendClientId("");}} style={{background:"#f1f5f9",border:"none",borderRadius:9,padding:"10px 18px",fontWeight:600,cursor:"pointer",color:"#475569"}}>Annuleren</button>
                    <button className="save-btn" disabled={!sendClientId||sending} onClick={sendEmail}>{sending?"Versturen...":"📤 Versturen"}</button>
                  </div>
                </div>
              </div>
            )}

            {/* Email log */}
            {emailLogs.length>0&&(
              <div className="card-lg" style={{marginTop:24}}>
                <h3 style={{fontWeight:700,marginBottom:14,fontSize:"1rem"}}>📋 Verzonden e-mails</h3>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {emailLogs.slice().reverse().slice(0,20).map(log=>(
                    <div key={log.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#f8fafc",borderRadius:9,flexWrap:"wrap",gap:8}}>
                      <div>
                        <span style={{fontWeight:600,fontSize:"0.87rem"}}>{log.client_name}</span>
                        <span style={{color:"#94a3b8",fontSize:"0.8rem",marginLeft:8}}>→ {log.client_email}</span>
                        <div style={{color:"#64748b",fontSize:"0.78rem",marginTop:2}}>{log.template_name} — {log.subject}</div>
                      </div>
                      <span style={{color:"#94a3b8",fontSize:"0.76rem"}}>{new Date(log.sent_at).toLocaleDateString("nl-NL",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}