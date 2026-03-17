import { useState, useEffect } from "react";
import { Availability, Appointment } from "../api/entities";

const TIME_OPTIONS = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00"];

export default function Admin() {
  const [tab, setTab] = useState("beschikbaarheid");
  const [availabilities, setAvailabilities] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [avs, apts] = await Promise.all([
        Availability.list(),
        Appointment.list()
      ]);
      avs.sort((a, b) => a.date.localeCompare(b.date));
      apts.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
      setAvailabilities(avs);
      setAppointments(apts);
    } catch (e) {}
    setLoading(false);
  };

  const toggleSlot = (slot) => {
    setSelectedSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot].sort());
  };

  const addBulk = (start, end) => {
    const startIdx = TIME_OPTIONS.indexOf(start);
    const endIdx = TIME_OPTIONS.indexOf(end);
    if (startIdx === -1 || endIdx === -1) return;
    const bulk = TIME_OPTIONS.slice(startIdx, endIdx + 1);
    setSelectedSlots(prev => [...new Set([...prev, ...bulk])].sort());
  };

  const saveAvailability = async () => {
    if (!newDate || selectedSlots.length === 0) return;
    setSaving(true);
    try {
      const existing = availabilities.find(a => a.date === newDate);
      if (existing) {
        await Availability.update(existing.id, { time_slots: selectedSlots, is_active: true });
      } else {
        await Availability.create({ date: newDate, time_slots: selectedSlots, is_active: true });
      }
      setNewDate("");
      setSelectedSlots([]);
      await loadAll();
    } catch (e) { alert("Fout bij opslaan: " + e.message); }
    setSaving(false);
  };

  const toggleActive = async (av) => {
    await Availability.update(av.id, { is_active: !av.is_active });
    await loadAll();
  };

  const deleteAvailability = async (id) => {
    if (!confirm("Verwijder deze dag?")) return;
    await Availability.delete(id);
    await loadAll();
  };

  const updateAppointmentStatus = async (id, status) => {
    await Appointment.update(id, { status });
    await loadAll();
  };

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
        .slot-btn{padding:8px 12px;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;transition:all 0.15s;border:2px solid #e2e8f0;background:#fff;color:#475569}
        .slot-btn.on{background:#1a73e8;color:#fff;border-color:#1a73e8}
        .slot-btn:hover{border-color:#1a73e8}
        input[type=date]{padding:10px 14px;border:2px solid #e2e8f0;border-radius:10px;font-size:0.93rem;font-family:inherit;outline:none;background:#fff}
        input[type=date]:focus{border-color:#1a73e8}
        .tab-btn{padding:10px 20px;border-radius:10px;font-weight:600;font-size:0.9rem;cursor:pointer;border:none;transition:all 0.2s}
        .tab-btn.active{background:#1a73e8;color:#fff}
        .tab-btn:not(.active){background:#fff;color:#475569}
        .tab-btn:not(.active):hover{background:#f1f5f9}
        .apt-card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 1px 4px rgba(0,0,0,0.07);border-left:4px solid #e2e8f0}
        .apt-card.pending{border-left-color:#f59e0b}
        .apt-card.confirmed{border-left-color:#10b981}
        .apt-card.cancelled{border-left-color:#ef4444;opacity:0.6}
        .status-badge{padding:3px 10px;border-radius:100px;font-size:0.75rem;font-weight:700}
        .status-badge.pending{background:#fef3c7;color:#92400e}
        .status-badge.confirmed{background:#d1fae5;color:#065f46}
        .status-badge.cancelled{background:#fee2e2;color:#991b1b}
        .action-btn{padding:6px 14px;border-radius:8px;font-size:0.8rem;font-weight:600;cursor:pointer;border:none;transition:all 0.2s}
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

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 32 }}>
          {[
            ["📅", "Komende afspraken", upcomingApts.filter(a=>a.status!=="cancelled").length, "#1a73e8"],
            ["✅", "Bevestigd", appointments.filter(a=>a.status==="confirmed").length, "#10b981"],
            ["⏳", "In afwachting", appointments.filter(a=>a.status==="pending").length, "#f59e0b"],
            ["📆", "Beschikbare dagen", availabilities.filter(a=>a.is_active && a.date >= today).length, "#8b5cf6"],
          ].map(([ic, label, val, color]) => (
            <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{ic}</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color }}>{val}</div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          <button className={`tab-btn ${tab==="beschikbaarheid"?"active":""}`} onClick={() => setTab("beschikbaarheid")}>📅 Beschikbaarheid</button>
          <button className={`tab-btn ${tab==="afspraken"?"active":""}`} onClick={() => setTab("afspraken")}>🗓️ Afspraken {upcomingApts.filter(a=>a.status==="pending").length > 0 && <span style={{background:"#ef4444",color:"#fff",borderRadius:"50%",padding:"1px 6px",fontSize:"0.75rem",marginLeft:4}}>{upcomingApts.filter(a=>a.status==="pending").length}</span>}</button>
        </div>

        {/* BESCHIKBAARHEID TAB */}
        {tab === "beschikbaarheid" && (
          <div>
            {/* Add new */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 28 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: "1.05rem" }}>➕ Beschikbaarheid toevoegen</h3>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: "0.88rem", color: "#475569" }}>Datum</label>
                <input type="date" value={newDate} min={today} onChange={e => { setNewDate(e.target.value); const existing = availabilities.find(a => a.date === e.target.value); setSelectedSlots(existing ? [...existing.time_slots] : []); }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 10, fontSize: "0.88rem", color: "#475569" }}>Snelle selectie</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  {[["Ochtend (9-12)", "09:00","11:30"],["Middag (13-17)", "13:00","16:30"],["Hele dag (9-17)", "09:00","16:30"]].map(([label, s, e]) => (
                    <button key={label} onClick={() => addBulk(s, e)} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 14px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", color: "#475569" }}>{label}</button>
                  ))}
                  <button onClick={() => setSelectedSlots([])} style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "7px 14px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", color: "#991b1b" }}>Wis alles</button>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 10, fontSize: "0.88rem", color: "#475569" }}>Tijdslots ({selectedSlots.length} geselecteerd)</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(80px,1fr))", gap: 8 }}>
                  {TIME_OPTIONS.map(t => (
                    <button key={t} className={`slot-btn ${selectedSlots.includes(t)?"on":""}`} onClick={() => toggleSlot(t)}>{t}</button>
                  ))}
                </div>
              </div>
              <button onClick={saveAvailability} disabled={!newDate || selectedSlots.length === 0 || saving} style={{ background: saving?"#9ca3af":"#1a73e8", color: "#fff", padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: "pointer" }}>
                {saving ? "Opslaan..." : "💾 Opslaan"}
              </button>
            </div>

            {/* Existing */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: "1.05rem" }}>📆 Ingeplande beschikbaarheid</h3>
              {loading ? <p style={{ color: "#94a3b8" }}>Laden...</p> : availabilities.length === 0 ? (
                <p style={{ color: "#94a3b8", textAlign: "center", padding: 20 }}>Nog geen beschikbaarheid ingepland.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {availabilities.map(av => (
                    <div key={av.id} style={{ border: `1px solid ${av.is_active && av.date >= today ? "#e2e8f0" : "#fee2e2"}`, borderRadius: 12, padding: "16px 20px", background: av.is_active && av.date >= today ? "#f8fafc" : "#fff5f5" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div>
                          <span style={{ fontWeight: 700, fontSize: "0.95rem", textTransform: "capitalize" }}>{formatDate(av.date)}</span>
                          <span style={{ marginLeft: 10, fontSize: "0.8rem", color: "#64748b" }}>{av.time_slots?.length || 0} slots</span>
                          {av.date < today && <span style={{ marginLeft: 8, background: "#f1f5f9", color: "#64748b", padding: "2px 8px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 600 }}>Verleden</span>}
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <button className="action-btn" onClick={() => toggleActive(av)} style={{ background: av.is_active ? "#fef3c7" : "#d1fae5", color: av.is_active ? "#92400e" : "#065f46" }}>{av.is_active ? "⏸ Pauzeer" : "▶ Activeer"}</button>
                          <button className="action-btn" onClick={() => deleteAvailability(av.id)} style={{ background: "#fee2e2", color: "#991b1b" }}>🗑 Verwijder</button>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {av.time_slots?.map(t => <span key={t} style={{ background: av.is_active ? "#eff6ff" : "#f1f5f9", color: av.is_active ? "#1e40af" : "#94a3b8", padding: "3px 10px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 600 }}>{t}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* AFSPRAKEN TAB */}
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
                                <span className={`status-badge ${apt.status}`}>{apt.status === "pending" ? "⏳ In afwachting" : apt.status === "confirmed" ? "✅ Bevestigd" : "❌ Geannuleerd"}</span>
                              </div>
                              <p style={{ color: "#475569", fontSize: "0.88rem" }}>📅 {formatDate(apt.date)} &nbsp;•&nbsp; 🕐 {apt.time}</p>
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
                {pastApts.length > 0 && (
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: "1.05rem", color: "#94a3b8" }}>🕐 Verleden afspraken</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {pastApts.slice(0, 10).map(apt => (
                        <div key={apt.id} style={{ background: "#fff", borderRadius: 12, padding: "14px 20px", opacity: 0.6, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{apt.name}</span>
                            <span style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{formatDate(apt.date)} {apt.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {appointments.length === 0 && (
                  <div style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</div>
                    <p>Nog geen afspraken ontvangen.</p>
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
