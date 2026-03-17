import { useState, useEffect } from "react";
import { Availability, Appointment } from "../api/entities";

const TIME_OPTIONS = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00"];

const DAYS_NL = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];

// Default week template: per day-of-week (0=Sun..6=Sat), which slots are active
const DEFAULT_WEEK_TEMPLATE = {
  0: [], // Zondag — vrij
  1: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  2: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  3: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  4: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  5: ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"],
  6: [], // Zaterdag — vrij
};

export default function Admin() {
  const [tab, setTab] = useState("beschikbaarheid");
  const [availabilities, setAvailabilities] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Week template state
  const [weekTemplate, setWeekTemplate] = useState(DEFAULT_WEEK_TEMPLATE);
  const [templateTab, setTemplateTab] = useState("single"); // "single" | "template" | "bulk"
  const [bulkRange, setBulkRange] = useState({ from: "", to: "", skipWeekend: true });
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkResult, setBulkResult] = useState(null);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [avs, apts] = await Promise.all([Availability.list(), Appointment.list()]);
      avs.sort((a, b) => a.date.localeCompare(b.date));
      apts.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
      setAvailabilities(avs);
      setAppointments(apts);
    } catch (e) {}
    setLoading(false);
  };

  const toggleSlot = (slot) => setSelectedSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot].sort());
  const toggleTemplateSlot = (day, slot) => {
    setWeekTemplate(prev => ({
      ...prev,
      [day]: prev[day].includes(slot) ? prev[day].filter(s => s !== slot) : [...prev[day], slot].sort()
    }));
  };
  const addBulk = (start, end) => {
    const si = TIME_OPTIONS.indexOf(start), ei = TIME_OPTIONS.indexOf(end);
    if (si === -1 || ei === -1) return;
    setSelectedSlots(prev => [...new Set([...prev, ...TIME_OPTIONS.slice(si, ei+1)])].sort());
  };
  const addTemplateBulk = (day, start, end) => {
    const si = TIME_OPTIONS.indexOf(start), ei = TIME_OPTIONS.indexOf(end);
    if (si === -1 || ei === -1) return;
    setWeekTemplate(prev => ({ ...prev, [day]: [...new Set([...prev[day], ...TIME_OPTIONS.slice(si, ei+1)])].sort() }));
  };

  const saveAvailability = async () => {
    if (!newDate || selectedSlots.length === 0) return;
    setSaving(true);
    try {
      const existing = availabilities.find(a => a.date === newDate);
      if (existing) await Availability.update(existing.id, { time_slots: selectedSlots, is_active: true });
      else await Availability.create({ date: newDate, time_slots: selectedSlots, is_active: true });
      setNewDate(""); setSelectedSlots([]);
      await loadAll();
    } catch (e) { alert("Fout: " + e.message); }
    setSaving(false);
  };

  // Apply week template to a date range
  const applyBulkTemplate = async () => {
    if (!bulkRange.from || !bulkRange.to) return;
    setBulkSaving(true); setBulkResult(null);
    try {
      const from = new Date(bulkRange.from + "T12:00:00");
      const to = new Date(bulkRange.to + "T12:00:00");
      let count = 0;
      const cur = new Date(from);
      while (cur <= to) {
        const dow = cur.getDay();
        const slots = weekTemplate[dow];
        if (slots && slots.length > 0) {
          const dateStr = cur.toISOString().split("T")[0];
          const existing = availabilities.find(a => a.date === dateStr);
          if (existing) await Availability.update(existing.id, { time_slots: slots, is_active: true });
          else await Availability.create({ date: dateStr, time_slots: slots, is_active: true });
          count++;
        }
        cur.setDate(cur.getDate() + 1);
      }
      setBulkResult({ count });
      await loadAll();
    } catch (e) { alert("Fout: " + e.message); }
    setBulkSaving(false);
  };

  const toggleActive = async (av) => { await Availability.update(av.id, { is_active: !av.is_active }); await loadAll(); };
  const deleteAvailability = async (id) => { if (!confirm("Verwijder deze dag?")) return; await Availability.delete(id); await loadAll(); };
  const updateAppointmentStatus = async (id, status) => { await Appointment.update(id, { status }); await loadAll(); };

  const formatDate = (d) => {
    if (!d) return "";
    return new Date(d + "T12:00:00").toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" });
  };

  const today = new Date().toISOString().split("T")[0];
  const upcomingApts = appointments.filter(a => a.date >= today);
  const pastApts = appointments.filter(a => a.date < today);

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", minHeight: "100vh", background: "#f1f5f9", color: "#1e293b" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .slot-btn{padding:7px 11px;border-radius:7px;font-size:0.8rem;font-weight:600;cursor:pointer;transition:all 0.15s;border:2px solid #e2e8f0;background:#fff;color:#475569}
        .slot-btn.on{background:#1a73e8;color:#fff;border-color:#1a73e8}
        .slot-btn:hover{border-color:#1a73e8}
        input[type=date]{padding:10px 14px;border:2px solid #e2e8f0;border-radius:10px;font-size:0.93rem;font-family:inherit;outline:none;background:#fff}
        input[type=date]:focus{border-color:#1a73e8}
        .tab-btn{padding:10px 18px;border-radius:9px;font-weight:600;font-size:0.87rem;cursor:pointer;border:none;transition:all 0.2s}
        .tab-btn.active{background:#1a73e8;color:#fff}
        .tab-btn:not(.active){background:#fff;color:#475569;border:1px solid #e2e8f0}
        .tab-btn:not(.active):hover{background:#f1f5f9}
        .sub-tab{padding:8px 16px;border-radius:8px;font-weight:600;font-size:0.83rem;cursor:pointer;border:none;transition:all 0.2s}
        .sub-tab.active{background:#0a1628;color:#fff}
        .sub-tab:not(.active){background:#f1f5f9;color:#64748b}
        .sub-tab:not(.active):hover{background:#e2e8f0}
        .apt-card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 1px 4px rgba(0,0,0,0.07);border-left:4px solid #e2e8f0}
        .apt-card.pending{border-left-color:#f59e0b}
        .apt-card.confirmed{border-left-color:#10b981}
        .apt-card.cancelled{border-left-color:#ef4444;opacity:0.6}
        .status-badge{padding:3px 10px;border-radius:100px;font-size:0.75rem;font-weight:700}
        .status-badge.pending{background:#fef3c7;color:#92400e}
        .status-badge.confirmed{background:#d1fae5;color:#065f46}
        .status-badge.cancelled{background:#fee2e2;color:#991b1b}
        .action-btn{padding:6px 14px;border-radius:8px;font-size:0.8rem;font-weight:600;cursor:pointer;border:none;transition:all 0.2s}
        .quick-btn{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:7px;padding:6px 12px;font-size:0.78rem;font-weight:600;cursor:pointer;color:#475569;transition:all 0.15s}
        .quick-btn:hover{background:#e2e8f0}
        .day-block{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin-bottom:12px}
        .day-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
        .day-label{font-weight:700;font-size:0.95rem}
        .day-count{background:#eff6ff;color:#1e40af;padding:2px 10px;border-radius:100px;font-size:0.75rem;font-weight:700}
        .day-count.zero{background:#f1f5f9;color:#94a3b8}
      `}</style>

      {/* Header */}
      <div style={{ background: "#0a1628", padding: "24px 5%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <a href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.8rem" }}>← Terug naar site</a>
          <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem", marginTop: 4 }}>⚙️ Vedantix Admin</h1>
        </div>
        <div style={{ background: "#00c2ff20", border: "1px solid #00c2ff40", borderRadius: 8, padding: "6px 14px" }}>
          <span style={{ color: "#00c2ff", fontSize: "0.82rem", fontWeight: 700 }}>Admin Panel</span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 32 }}>
          {[
            ["📅", "Komende afspraken", upcomingApts.filter(a=>a.status!=="cancelled").length, "#1a73e8"],
            ["✅", "Bevestigd", appointments.filter(a=>a.status==="confirmed").length, "#10b981"],
            ["⏳", "In afwachting", appointments.filter(a=>a.status==="pending").length, "#f59e0b"],
            ["📆", "Beschikbare dagen", availabilities.filter(a=>a.is_active && a.date >= today).length, "#8b5cf6"],
          ].map(([ic, label, val, color]) => (
            <div key={label} style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{ic}</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color }}>{val}</div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Main tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          <button className={`tab-btn ${tab==="beschikbaarheid"?"active":""}`} onClick={() => setTab("beschikbaarheid")}>📅 Beschikbaarheid</button>
          <button className={`tab-btn ${tab==="afspraken"?"active":""}`} onClick={() => setTab("afspraken")}>
            🗓️ Afspraken {upcomingApts.filter(a=>a.status==="pending").length > 0 &&
              <span style={{background:"#ef4444",color:"#fff",borderRadius:"50%",padding:"1px 6px",fontSize:"0.72rem",marginLeft:6}}>{upcomingApts.filter(a=>a.status==="pending").length}</span>}
          </button>
        </div>

        {/* ===== BESCHIKBAARHEID TAB ===== */}
        {tab === "beschikbaarheid" && (
          <div>
            {/* Sub-tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <button className={`sub-tab ${templateTab==="single"?"active":""}`} onClick={() => setTemplateTab("single")}>➕ Enkele dag</button>
              <button className={`sub-tab ${templateTab==="template"?"active":""}`} onClick={() => setTemplateTab("template")}>📋 Weektemplate instellen</button>
              <button className={`sub-tab ${templateTab==="bulk"?"active":""}`} onClick={() => setTemplateTab("bulk")}>🗓️ Bulkplanning</button>
            </div>

            {/* SINGLE DAY */}
            {templateTab === "single" && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 28 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: "1.05rem" }}>➕ Beschikbaarheid toevoegen — enkele dag</h3>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: "0.88rem", color: "#475569" }}>Datum</label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <input type="date" value={newDate} min={today} onChange={e => {
                      const d = e.target.value;
                      setNewDate(d);
                      const existing = availabilities.find(a => a.date === d);
                      if (existing) { setSelectedSlots([...existing.time_slots]); }
                      else {
                        // Auto-apply week template for that day
                        const dow = new Date(d + "T12:00:00").getDay();
                        setSelectedSlots([...(weekTemplate[dow] || [])]);
                      }
                    }} />
                    {newDate && (
                      <span style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 600 }}>
                        📅 {DAYS_NL[new Date(newDate + "T12:00:00").getDay()]}
                        {weekTemplate[new Date(newDate + "T12:00:00").getDay()]?.length > 0 && " — weektemplate toegepast"}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 10, fontSize: "0.88rem", color: "#475569" }}>Snelle selectie</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    {[["Ochtend (9-12)", "09:00","11:30"],["Middag (13-17)", "13:00","16:30"],["Hele dag (9-17)", "09:00","16:30"]].map(([label, s, e]) => (
                      <button key={label} className="quick-btn" onClick={() => addBulk(s, e)}>{label}</button>
                    ))}
                    <button className="quick-btn" style={{ color: "#991b1b" }} onClick={() => setSelectedSlots([])}>Wis alles</button>
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 10, fontSize: "0.88rem", color: "#475569" }}>Tijdslots <span style={{ color: "#9ca3af", fontWeight: 400 }}>({selectedSlots.length} geselecteerd)</span></label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(78px,1fr))", gap: 7 }}>
                    {TIME_OPTIONS.map(t => (
                      <button key={t} className={`slot-btn ${selectedSlots.includes(t)?"on":""}`} onClick={() => toggleSlot(t)}>{t}</button>
                    ))}
                  </div>
                </div>
                <button onClick={saveAvailability} disabled={!newDate || selectedSlots.length === 0 || saving}
                  style={{ background: (!newDate || selectedSlots.length === 0 || saving) ? "#9ca3af" : "#1a73e8", color: "#fff", padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: "pointer" }}>
                  {saving ? "Opslaan..." : "💾 Opslaan"}
                </button>
              </div>
            )}

            {/* WEEK TEMPLATE */}
            {templateTab === "template" && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 28 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 6, fontSize: "1.05rem" }}>📋 Weektemplate instellen</h3>
                <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: 24 }}>Stel per weekdag je standaard werktijden in. Dit template wordt automatisch toegepast bij de bulkplanning én als je een datum selecteert.</p>
                {[1,2,3,4,5,6,0].map(dow => (
                  <div key={dow} className="day-block">
                    <div className="day-header">
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="day-label">{DAYS_NL[dow]}</span>
                        <span className={`day-count ${weekTemplate[dow].length === 0 ? "zero" : ""}`}>
                          {weekTemplate[dow].length === 0 ? "Vrij" : `${weekTemplate[dow].length} slots`}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {[["Och.","09:00","11:30"],["Mid.","13:00","16:30"],["Dag","09:00","16:30"]].map(([l,s,e]) => (
                          <button key={l} className="quick-btn" onClick={() => addTemplateBulk(dow, s, e)}>{l}</button>
                        ))}
                        <button className="quick-btn" style={{ color: "#991b1b" }} onClick={() => setWeekTemplate(prev => ({...prev, [dow]: []}))}>Wis</button>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(72px,1fr))", gap: 6 }}>
                      {TIME_OPTIONS.map(t => (
                        <button key={t} className={`slot-btn ${weekTemplate[dow].includes(t)?"on":""}`} onClick={() => toggleTemplateSlot(dow, t)}>{t}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "14px 18px", marginTop: 8 }}>
                  <p style={{ color: "#166534", fontSize: "0.88rem" }}>✅ Weektemplate opgeslagen in dit scherm. Ga naar <strong>Bulkplanning</strong> om het toe te passen op een periode.</p>
                </div>
              </div>
            )}

            {/* BULK PLANNING */}
            {templateTab === "bulk" && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 28 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 6, fontSize: "1.05rem" }}>🗓️ Bulkplanning — weektemplate toepassen</h3>
                <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: 24 }}>Selecteer een periode. Wij passen automatisch het weektemplate toe op elke dag in die periode.</p>

                {/* Template preview */}
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#475569", marginBottom: 10 }}>Huidig weektemplate:</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 8 }}>
                    {[1,2,3,4,5,6,0].map(dow => (
                      <div key={dow} style={{ fontSize: "0.78rem" }}>
                        <span style={{ fontWeight: 700, color: weekTemplate[dow].length > 0 ? "#1e40af" : "#94a3b8" }}>{DAYS_NL[dow]}: </span>
                        <span style={{ color: weekTemplate[dow].length > 0 ? "#374151" : "#94a3b8" }}>
                          {weekTemplate[dow].length === 0 ? "Vrij" : `${weekTemplate[dow][0]}–${weekTemplate[dow][weekTemplate[dow].length-1]}`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setTemplateTab("template")} style={{ marginTop: 12, background: "transparent", border: "1px solid #cbd5e1", borderRadius: 7, padding: "5px 12px", fontSize: "0.78rem", cursor: "pointer", color: "#64748b" }}>
                    ✏️ Template aanpassen
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: "0.88rem", color: "#475569" }}>Startdatum</label>
                    <input type="date" value={bulkRange.from} min={today} onChange={e => setBulkRange(p => ({...p, from: e.target.value}))} style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: "0.88rem", color: "#475569" }}>Einddatum</label>
                    <input type="date" value={bulkRange.to} min={bulkRange.from || today} onChange={e => setBulkRange(p => ({...p, to: e.target.value}))} style={{ width: "100%" }} />
                  </div>
                </div>

                {bulkRange.from && bulkRange.to && (
                  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 18px", marginBottom: 20, fontSize: "0.88rem", color: "#1e40af" }}>
                    📆 Periode: <strong>{formatDate(bulkRange.from)}</strong> t/m <strong>{formatDate(bulkRange.to)}</strong> — dagen zonder slots in het template worden overgeslagen.
                  </div>
                )}

                {bulkResult && (
                  <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "12px 18px", marginBottom: 20, fontSize: "0.88rem", color: "#166534" }}>
                    ✅ <strong>{bulkResult.count} dagen</strong> succesvol ingepland!
                  </div>
                )}

                <button onClick={applyBulkTemplate} disabled={!bulkRange.from || !bulkRange.to || bulkSaving}
                  style={{ background: (!bulkRange.from || !bulkRange.to || bulkSaving) ? "#9ca3af" : "#1a73e8", color: "#fff", padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: "pointer" }}>
                  {bulkSaving ? "Bezig..." : "🚀 Toepassen op periode"}
                </button>
              </div>
            )}

            {/* Existing availabilities */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: "1.05rem" }}>📆 Ingeplande beschikbaarheid</h3>
              {loading ? <p style={{ color: "#94a3b8" }}>Laden...</p> : availabilities.length === 0 ? (
                <p style={{ color: "#94a3b8", textAlign: "center", padding: 20 }}>Nog geen beschikbaarheid ingepland.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {availabilities.map(av => {
                    const isPast = av.date < today;
                    return (
                      <div key={av.id} style={{ border: `1px solid ${!isPast && av.is_active ? "#e2e8f0" : "#fee2e2"}`, borderRadius: 12, padding: "14px 18px", background: !isPast && av.is_active ? "#f8fafc" : "#fff5f5" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontWeight: 700, fontSize: "0.92rem" }}>{DAYS_NL[new Date(av.date+"T12:00:00").getDay()]} {formatDate(av.date)}</span>
                            <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{av.time_slots?.length} slots</span>
                            {isPast && <span style={{ background: "#f1f5f9", color: "#64748b", padding: "1px 8px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 600 }}>Verleden</span>}
                            {!isPast && !av.is_active && <span style={{ background: "#fef3c7", color: "#92400e", padding: "1px 8px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 600 }}>Gepauzeerd</span>}
                          </div>
                          <div style={{ display: "flex", gap: 6 }}>
                            {!isPast && <button className="action-btn" onClick={() => toggleActive(av)} style={{ background: av.is_active ? "#fef3c7" : "#d1fae5", color: av.is_active ? "#92400e" : "#065f46" }}>{av.is_active ? "⏸" : "▶"}</button>}
                            <button className="action-btn" onClick={() => deleteAvailability(av.id)} style={{ background: "#fee2e2", color: "#991b1b" }}>🗑</button>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {av.time_slots?.map(t => <span key={t} style={{ background: !isPast && av.is_active ? "#eff6ff" : "#f1f5f9", color: !isPast && av.is_active ? "#1e40af" : "#94a3b8", padding: "2px 9px", borderRadius: 100, fontSize: "0.76rem", fontWeight: 600 }}>{t}</span>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== AFSPRAKEN TAB ===== */}
        {tab === "afspraken" && (
          <div>
            {loading ? <p style={{ color: "#94a3b8" }}>Laden...</p> : (
              <>
                {upcomingApts.length > 0 && (
                  <div style={{ marginBottom: 28 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: "1.05rem" }}>📅 Komende afspraken</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {upcomingApts.map(apt => (
                        <div key={apt.id} className={`apt-card ${apt.status}`}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                                <span style={{ fontWeight: 700, fontSize: "1rem" }}>{apt.name}</span>
                                <span className={`status-badge ${apt.status}`}>{apt.status === "pending" ? "⏳ Wacht" : apt.status === "confirmed" ? "✅ Bevestigd" : "❌ Geannuleerd"}</span>
                              </div>
                              <p style={{ color: "#475569", fontSize: "0.88rem" }}>📅 {DAYS_NL[new Date(apt.date+"T12:00:00").getDay()]} {formatDate(apt.date)} &nbsp;•&nbsp; 🕐 {apt.time}</p>
                              {apt.email && <p style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 2 }}>📧 {apt.email} {apt.phone && `• 📱 ${apt.phone}`}</p>}
                              {apt.company && <p style={{ color: "#64748b", fontSize: "0.82rem" }}>🏢 {apt.company}</p>}
                              {apt.package_interest && <p style={{ color: "#64748b", fontSize: "0.82rem" }}>📦 {apt.package_interest}</p>}
                              {apt.message && <p style={{ color: "#475569", fontSize: "0.85rem", marginTop: 8, fontStyle: "italic" }}>"{apt.message}"</p>}
                            </div>
                          </div>
                          {apt.status === "pending" && (
                            <div style={{ display: "flex", gap: 8 }}>
                              <button className="action-btn" onClick={() => updateAppointmentStatus(apt.id, "confirmed")} style={{ background: "#d1fae5", color: "#065f46" }}>✅ Bevestigen</button>
                              <button className="action-btn" onClick={() => updateAppointmentStatus(apt.id, "cancelled")} style={{ background: "#fee2e2", color: "#991b1b" }}>❌ Annuleren</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {upcomingApts.length === 0 && (
                  <div style={{ textAlign: "center", padding: "48px 20px", color: "#94a3b8" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</div>
                    <p>Nog geen komende afspraken.</p>
                  </div>
                )}
                {pastApts.length > 0 && (
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: "1.05rem", color: "#94a3b8" }}>🕐 Verleden</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {pastApts.slice(0, 10).map(apt => (
                        <div key={apt.id} style={{ background: "#fff", borderRadius: 12, padding: "12px 18px", opacity: 0.55, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{apt.name}</span>
                          <span style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{formatDate(apt.date)} {apt.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
