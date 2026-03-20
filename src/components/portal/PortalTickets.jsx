import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const Ticket = base44.entities.Ticket;
const TicketComment = base44.entities.TicketComment;

const STATUS_COLORS = { nieuw: "#3b82f6", in_behandeling: "#8b5cf6", wachten_op_klant: "#f97316", in_uitvoering: "#f59e0b", afgerond: "#10b981", gesloten: "#94a3b8" };
const STATUS_LABELS = { nieuw: "Nieuw", in_behandeling: "In behandeling", wachten_op_klant: "Wachten op klant", in_uitvoering: "In uitvoering", afgerond: "Afgerond", gesloten: "Gesloten" };

export default function PortalTickets({ klant }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [newTicket, setNewTicket] = useState({ titel: "", type: "support", beschrijving: "", prioriteit: "normaal" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const t = await Ticket.filter({ customer_id: klant.id });
    setTickets(t.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)));
    setLoading(false);
  };

  useEffect(() => { load(); }, [klant]);

  const loadComments = async (ticketId) => {
    const c = await TicketComment.filter({ ticket_id: ticketId });
    setComments(c.filter(c => !c.is_intern));
  };

  const openTicket = (t) => { setSelected(t); loadComments(t.id); };

  const sendComment = async () => {
    if (!newComment.trim()) return;
    await TicketComment.create({ ticket_id: selected.id, auteur: klant.bedrijfsnaam, rol: "klant", bericht: newComment, is_intern: false });
    setNewComment("");
    loadComments(selected.id);
  };

  const createTicket = async () => {
    if (!newTicket.titel || !newTicket.beschrijving) return;
    setSaving(true);
    await Ticket.create({ ...newTicket, customer_id: klant.id, klant_naam: klant.bedrijfsnaam, status: "nieuw" });
    setSaving(false);
    setShowNew(false);
    setNewTicket({ titel: "", type: "support", beschrijving: "", prioriteit: "normaal" });
    load();
  };

  const inputStyle = { width: "100%", padding: "10px 12px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.88rem", outline: "none", background: "#fff", fontFamily: "inherit" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Tickets & verzoeken</h1>
        <button onClick={() => setShowNew(true)} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>+ Nieuw verzoek</button>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          {loading ? <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Laden...</div> :
            tickets.length === 0 ? (
              <div style={{ textAlign: "center", padding: 60, background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🎫</div>
                <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Geen tickets</div>
                <p style={{ color: "#64748b", fontSize: "0.88rem" }}>Heb je een vraag of verzoek? Maak een nieuw ticket aan.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {tickets.map(t => (
                  <div key={t.id} onClick={() => openTicket(t)} style={{ background: "#fff", borderRadius: 12, border: `2px solid ${selected?.id === t.id ? "#3b82f6" : "#e2e8f0"}`, padding: "16px 20px", cursor: "pointer", transition: "border-color 0.15s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>{t.titel}</div>
                      <span style={{ background: (STATUS_COLORS[t.status] || "#94a3b8") + "18", color: STATUS_COLORS[t.status] || "#94a3b8", padding: "3px 10px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 700, flexShrink: 0 }}>
                        {STATUS_LABELS[t.status] || t.status}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{t.type} · {new Date(t.created_date).toLocaleDateString("nl-NL")}</div>
                  </div>
                ))}
              </div>
            )
          }
        </div>

        {/* Detail */}
        {selected && (
          <div style={{ width: 380, flexShrink: 0, background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 100px)", position: "sticky", top: 20 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>{selected.titel}</h3>
              <button onClick={() => setSelected(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: 7, width: 28, height: 28, cursor: "pointer", color: "#64748b" }}>✕</button>
            </div>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ background: (STATUS_COLORS[selected.status] || "#94a3b8") + "18", color: STATUS_COLORS[selected.status] || "#94a3b8", padding: "4px 12px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700 }}>
                {STATUS_LABELS[selected.status]}
              </span>
              <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.6, marginTop: 12 }}>{selected.beschrijving}</p>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px" }}>
              {comments.map(c => (
                <div key={c.id} style={{ marginBottom: 10, padding: "10px 13px", background: c.rol === "admin" ? "#f0f9ff" : "#f8fafc", borderRadius: 9, borderLeft: `3px solid ${c.rol === "admin" ? "#3b82f6" : "#e2e8f0"}` }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: c.rol === "admin" ? "#1d4ed8" : "#374151", marginBottom: 4 }}>
                    {c.rol === "admin" ? "Vedantix" : "Jij"}
                  </div>
                  <p style={{ fontSize: "0.84rem", color: "#374151", lineHeight: 1.55 }}>{c.bericht}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9" }}>
              <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Stuur een bericht..." style={{ ...inputStyle, minHeight: 70, marginBottom: 8 }} />
              <button onClick={sendComment} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 8, padding: "9px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>Versturen</button>
            </div>
          </div>
        )}
      </div>

      {/* New ticket modal */}
      {showNew && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 500, padding: 28 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 20 }}>Nieuw verzoek indienen</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Type verzoek</label>
                <select value={newTicket.type} onChange={e => setNewTicket(p => ({ ...p, type: e.target.value }))} style={inputStyle}>
                  <option value="wijzigingsverzoek">Wijzigingsverzoek</option>
                  <option value="support">Support ticket</option>
                  <option value="vraag">Algemene vraag</option>
                  <option value="overig">Overig</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Onderwerp *</label>
                <input value={newTicket.titel} onChange={e => setNewTicket(p => ({ ...p, titel: e.target.value }))} style={inputStyle} placeholder="Beschrijf kort je vraag of verzoek" />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Omschrijving *</label>
                <textarea value={newTicket.beschrijving} onChange={e => setNewTicket(p => ({ ...p, beschrijving: e.target.value }))} style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} placeholder="Geef zo veel mogelijk details..." />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button onClick={() => setShowNew(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}>Annuleren</button>
              <button onClick={createTicket} disabled={saving} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>
                {saving ? "Versturen..." : "Verzoek indienen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}