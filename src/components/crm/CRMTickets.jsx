import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

import ExportButton, { exportToCSV, exportToPDF } from "./ExportButton";

const Ticket = base44.entities.Ticket;
const TicketComment = base44.entities.TicketComment;
const CustomerProfile = base44.entities.CustomerProfile;

const STATUS_COLORS = { nieuw: "#3b82f6", in_behandeling: "#8b5cf6", wachten_op_klant: "#f97316", in_uitvoering: "#f59e0b", afgerond: "#10b981", gesloten: "#94a3b8" };
const STATUS_LABELS = { nieuw: "Nieuw", in_behandeling: "In behandeling", wachten_op_klant: "Wachten op klant", in_uitvoering: "In uitvoering", afgerond: "Afgerond", gesloten: "Gesloten" };
const PRIO_COLORS = { laag: "#94a3b8", normaal: "#3b82f6", hoog: "#f59e0b", spoed: "#ef4444" };
const PRIO_LABELS = { laag: "Laag", normaal: "Normaal", hoog: "Hoog", spoed: "Spoed" };

export default function CRMTickets() {
  const [tickets, setTickets] = useState([]);
  const [klanten, setKlanten] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPrio, setFilterPrio] = useState("");
  const [selected, setSelected] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isIntern, setIsIntern] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [newTicket, setNewTicket] = useState({ titel: "", type: "support", beschrijving: "", prioriteit: "normaal", customer_id: "", deadline: "" });

  const load = async () => {
    setLoading(true);
    const [t, k] = await Promise.all([Ticket.list("-created_date", 200), CustomerProfile.list()]);
    setTickets(t); setKlanten(k);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const loadComments = async (ticketId) => {
    const c = await TicketComment.filter({ ticket_id: ticketId });
    setComments(c);
  };

  const openTicket = (t) => { setSelected(t); loadComments(t.id); };

  const saveComment = async () => {
    if (!newComment.trim()) return;
    await TicketComment.create({ ticket_id: selected.id, auteur: "Admin", rol: "admin", bericht: newComment, is_intern: isIntern });
    setNewComment(""); loadComments(selected.id);
  };

  const updateStatus = async (status) => {
    await Ticket.update(selected.id, { status });
    setSelected(p => ({ ...p, status }));
    load();
  };

  const updatePrio = async (prioriteit) => {
    await Ticket.update(selected.id, { prioriteit });
    setSelected(p => ({ ...p, prioriteit }));
  };

  const createTicket = async () => {
    const klant = klanten.find(k => k.id === newTicket.customer_id);
    await Ticket.create({ ...newTicket, klant_naam: klant?.bedrijfsnaam || "" });
    setShowNew(false);
    setNewTicket({ titel: "", type: "support", beschrijving: "", prioriteit: "normaal", customer_id: "", deadline: "" });
    load();
  };

  const filtered = tickets.filter(t => {
    return (!filterStatus || t.status === filterStatus) && (!filterPrio || t.prioriteit === filterPrio);
  });

  const handleExportCSV = () => {
    exportToCSV(filtered.map(t => ({
      Titel: t.titel,
      Klant: t.klant_naam || "",
      Type: t.type,
      Prioriteit: t.prioriteit,
      Status: t.status,
      Deadline: t.deadline || "",
      Aangemaakt: t.created_date ? new Date(t.created_date).toLocaleDateString("nl-NL") : "",
    })), "tickets");
  };

  const handleExportPDF = () => {
    exportToPDF("Ticketoverzicht", [
      { header: "Titel", accessor: r => r.titel },
      { header: "Klant", accessor: r => r.klant_naam },
      { header: "Type", accessor: r => r.type },
      { header: "Prioriteit", accessor: r => r.prioriteit },
      { header: "Status", accessor: r => r.status },
      { header: "Deadline", accessor: r => r.deadline ? new Date(r.deadline).toLocaleDateString("nl-NL") : "" },
    ], filtered, "tickets");
  };

  const inputStyle = { width: "100%", padding: "10px 12px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.88rem", outline: "none", background: "#fff", fontFamily: "inherit" };

  return (
    <div style={{ display: "flex", gap: 20, height: "calc(100vh - 120px)" }}>
      {/* List */}
      <div style={{ width: selected ? 400 : "100%", flexShrink: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>Tickets</h1>
          <div style={{ display: "flex", gap: 8 }}>
            <ExportButton onExportCSV={handleExportCSV} onExportPDF={handleExportPDF} />
            <button onClick={() => setShowNew(true)} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>+ Nieuw ticket</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ flex: 1, padding: "8px 12px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.82rem", background: "#fff", outline: "none" }}>
            <option value="">Alle statussen</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={filterPrio} onChange={e => setFilterPrio(e.target.value)} style={{ flex: 1, padding: "8px 12px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.82rem", background: "#fff", outline: "none" }}>
            <option value="">Alle prioriteiten</option>
            {Object.entries(PRIO_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {loading ? <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Laden...</div> :
            filtered.map(t => (
              <div key={t.id} onClick={() => openTicket(t)}
                style={{ background: "#fff", borderRadius: 12, border: `2px solid ${selected?.id === t.id ? "#3b82f6" : "#e2e8f0"}`, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1e293b" }}>{t.titel}</div>
                  <span style={{ background: PRIO_COLORS[t.prioriteit] + "20", color: PRIO_COLORS[t.prioriteit], padding: "2px 8px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>{PRIO_LABELS[t.prioriteit]}</span>
                </div>
                <div style={{ fontSize: "0.76rem", color: "#64748b", marginBottom: 6 }}>{t.klant_naam}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ background: STATUS_COLORS[t.status] + "18", color: STATUS_COLORS[t.status], padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700 }}>{STATUS_LABELS[t.status]}</span>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{new Date(t.created_date).toLocaleDateString("nl-NL")}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Detail */}
      {selected && (
        <div style={{ flex: 1, background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f172a" }}>{selected.titel}</h2>
              <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 3 }}>{selected.klant_naam}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#64748b" }}>✕</button>
          </div>

          <div style={{ padding: "16px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>Status</div>
              <select value={selected.status} onChange={e => updateStatus(e.target.value)} style={{ padding: "6px 10px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.82rem", background: "#fff", outline: "none" }}>
                {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>Prioriteit</div>
              <select value={selected.prioriteit} onChange={e => updatePrio(e.target.value)} style={{ padding: "6px 10px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.82rem", background: "#fff", outline: "none" }}>
                {Object.entries(PRIO_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>

          <div style={{ padding: "16px 22px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 8 }}>Beschrijving</div>
            <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.65 }}>{selected.beschrijving}</p>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px 22px" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 12 }}>Reacties</div>
            {comments.map(c => (
              <div key={c.id} style={{ marginBottom: 12, padding: "12px 14px", background: c.is_intern ? "#fefce8" : c.rol === "admin" ? "#f0f9ff" : "#f8fafc", borderRadius: 10, borderLeft: `3px solid ${c.is_intern ? "#fbbf24" : c.rol === "admin" ? "#3b82f6" : "#e2e8f0"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#374151" }}>{c.auteur} {c.is_intern && <span style={{ background: "#fef3c7", color: "#92400e", padding: "1px 6px", borderRadius: 100, fontSize: "0.65rem" }}>intern</span>}</span>
                  <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{new Date(c.created_date).toLocaleDateString("nl-NL")}</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.55 }}>{c.bericht}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: "14px 22px", borderTop: "1px solid #f1f5f9" }}>
            <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Reactie toevoegen..." style={{ ...inputStyle, minHeight: 70, marginBottom: 10 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#64748b", cursor: "pointer" }}>
                <input type="checkbox" checked={isIntern} onChange={e => setIsIntern(e.target.checked)} />
                Interne notitie
              </label>
              <button onClick={saveComment} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 700, fontSize: "0.83rem", cursor: "pointer" }}>Versturen</button>
            </div>
          </div>
        </div>
      )}

      {/* New ticket modal */}
      {showNew && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 520, padding: 28 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 20, fontSize: "1.05rem" }}>Nieuw ticket aanmaken</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Klant</label>
                <select value={newTicket.customer_id} onChange={e => setNewTicket(p => ({ ...p, customer_id: e.target.value }))} style={inputStyle}>
                  <option value="">— Selecteer klant —</option>
                  {klanten.map(k => <option key={k.id} value={k.id}>{k.bedrijfsnaam}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Titel</label>
                <input value={newTicket.titel} onChange={e => setNewTicket(p => ({ ...p, titel: e.target.value }))} style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Type</label>
                  <select value={newTicket.type} onChange={e => setNewTicket(p => ({ ...p, type: e.target.value }))} style={inputStyle}>
                    <option value="wijzigingsverzoek">Wijzigingsverzoek</option>
                    <option value="support">Support</option>
                    <option value="vraag">Vraag</option>
                    <option value="overig">Overig</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Prioriteit</label>
                  <select value={newTicket.prioriteit} onChange={e => setNewTicket(p => ({ ...p, prioriteit: e.target.value }))} style={inputStyle}>
                    <option value="laag">Laag</option>
                    <option value="normaal">Normaal</option>
                    <option value="hoog">Hoog</option>
                    <option value="spoed">Spoed</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Beschrijving</label>
                <textarea value={newTicket.beschrijving} onChange={e => setNewTicket(p => ({ ...p, beschrijving: e.target.value }))} style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Deadline</label>
                <input type="date" value={newTicket.deadline} onChange={e => setNewTicket(p => ({ ...p, deadline: e.target.value }))} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button onClick={() => setShowNew(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 600, cursor: "pointer", color: "#374151" }}>Annuleren</button>
              <button onClick={createTicket} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Aanmaken</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}