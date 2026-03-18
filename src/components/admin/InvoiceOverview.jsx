import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const Invoice = base44.entities.Invoice;

const STATUS_COLORS = {
  concept:     { bg: "#f1f5f9", color: "#475569", label: "📝 Concept" },
  verzonden:   { bg: "#eff6ff", color: "#1e40af", label: "📤 Verzonden" },
  betaald:     { bg: "#f0fdf4", color: "#065f46", label: "✅ Betaald" },
  geannuleerd: { bg: "#fef2f2", color: "#991b1b", label: "❌ Geannuleerd" },
};

function fmt(val) {
  return "€" + Number(val || 0).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d + "T12:00:00").toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
}

export default function InvoiceOverview() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updating, setUpdating] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const data = await Invoice.list("-issue_date", 200);
    setInvoices(data);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    setUpdating(true);
    await Invoice.update(id, { status });
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    await load();
    setUpdating(false);
  };

  const deleteInvoice = async (id) => {
    if (!confirm("Factuur verwijderen?")) return;
    await Invoice.delete(id);
    if (selected?.id === id) setSelected(null);
    await load();
  };

  const filtered = statusFilter === "all" ? invoices : invoices.filter(i => i.status === statusFilter);

  const totals = {
    concept:   invoices.filter(i => i.status === "concept").reduce((s, i) => s + (i.total_amount || 0), 0),
    verzonden: invoices.filter(i => i.status === "verzonden").reduce((s, i) => s + (i.total_amount || 0), 0),
    betaald:   invoices.filter(i => i.status === "betaald").reduce((s, i) => s + (i.total_amount || 0), 0),
  };

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>⏳ Laden...</div>;

  return (
    <div>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Concepten", val: invoices.filter(i=>i.status==="concept").length, amount: totals.concept, color: "#475569", bg: "#f1f5f9", icon: "📝" },
          { label: "Verzonden", val: invoices.filter(i=>i.status==="verzonden").length, amount: totals.verzonden, color: "#1a73e8", bg: "#eff6ff", icon: "📤" },
          { label: "Betaald", val: invoices.filter(i=>i.status==="betaald").length, amount: totals.betaald, color: "#10b981", bg: "#f0fdf4", icon: "✅" },
          { label: "Totaal facturen", val: invoices.length, amount: invoices.reduce((s,i)=>s+(i.total_amount||0),0), color: "#8b5cf6", bg: "#f5f3ff", icon: "🧾" },
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ fontSize: "1.2rem", marginBottom: 6 }}>{c.icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: c.color, lineHeight: 1 }}>{c.val}</div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151", marginTop: 2 }}>{c.label}</div>
            <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: 2 }}>{fmt(c.amount)}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {[["all","Alle"],["concept","Concept"],["verzonden","Verzonden"],["betaald","Betaald"],["geannuleerd","Geannuleerd"]].map(([id, label]) => (
          <button key={id}
            onClick={() => setStatusFilter(id)}
            style={{ padding: "7px 14px", borderRadius: 8, fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", border: "none",
              background: statusFilter === id ? "#0a1628" : "#f1f5f9",
              color: statusFilter === id ? "#fff" : "#64748b" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Invoice list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>
          <div style={{ fontSize: "2rem", marginBottom: 10 }}>🧾</div>
          <p>Geen facturen gevonden.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(inv => {
            const sc = STATUS_COLORS[inv.status] || STATUS_COLORS.concept;
            const isOverdue = inv.status === "verzonden" && inv.due_date && inv.due_date < new Date().toISOString().split("T")[0];
            return (
              <div key={inv.id}
                onClick={() => setSelected(inv)}
                style={{ background: "#fff", border: `1px solid ${isOverdue ? "#fca5a5" : "#e5e7eb"}`, borderRadius: 12,
                  padding: "14px 18px", cursor: "pointer", transition: "border-color 0.15s",
                  borderLeft: `4px solid ${isOverdue ? "#ef4444" : sc.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{inv.invoice_number}</span>
                      {isOverdue && <span style={{ marginLeft: 8, background: "#fee2e2", color: "#991b1b", padding: "1px 8px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700 }}>VERLOPEN</span>}
                      <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: 2 }}>{inv.client_name} {inv.description && `— ${inv.description.slice(0, 50)}${inv.description.length > 50 ? "..." : ""}`}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0a1628" }}>{fmt(inv.total_amount)}</span>
                    <span style={{ background: sc.bg, color: sc.color, padding: "3px 10px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700 }}>{sc.label}</span>
                    <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{formatDate(inv.issue_date)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem" }}>🧾 {selected.invoice_number}</h3>
                <span style={{ background: STATUS_COLORS[selected.status]?.bg, color: STATUS_COLORS[selected.status]?.color, padding: "3px 10px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 700 }}>
                  {STATUS_COLORS[selected.status]?.label}
                </span>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: "0.85rem" }}>✕</button>
            </div>

            {/* Invoice details */}
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "18px 20px", marginBottom: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: "0.88rem" }}>
                <div><span style={{ color: "#94a3b8", fontWeight: 600 }}>Klant</span><div style={{ fontWeight: 700, marginTop: 2 }}>{selected.client_name}</div></div>
                <div><span style={{ color: "#94a3b8", fontWeight: 600 }}>E-mail</span><div style={{ fontWeight: 600, marginTop: 2 }}>{selected.client_email || "—"}</div></div>
                <div><span style={{ color: "#94a3b8", fontWeight: 600 }}>Factuurdatum</span><div style={{ fontWeight: 600, marginTop: 2 }}>{formatDate(selected.issue_date)}</div></div>
                <div><span style={{ color: "#94a3b8", fontWeight: 600 }}>Vervaldatum</span><div style={{ fontWeight: 600, marginTop: 2, color: selected.due_date < new Date().toISOString().split("T")[0] && selected.status === "verzonden" ? "#ef4444" : "inherit" }}>{formatDate(selected.due_date)}</div></div>
              </div>
            </div>

            {/* Line items */}
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ background: "#f8fafc", padding: "10px 16px", display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>
                <span>Omschrijving</span><span>Bedrag</span>
              </div>
              <div style={{ padding: "14px 16px", borderTop: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", marginBottom: 12 }}>
                  <span style={{ color: "#374151" }}>{selected.description || "Wijzigingsverzoek"}</span>
                  <span style={{ fontWeight: 600 }}>{fmt(selected.amount)}</span>
                </div>
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", color: "#64748b", marginBottom: 6 }}>
                    <span>Subtotaal</span><span>{fmt(selected.amount)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", color: "#64748b", marginBottom: 8 }}>
                    <span>BTW {selected.vat_rate || 21}%</span><span>{fmt(selected.vat_amount)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: 800, borderTop: "2px solid #e5e7eb", paddingTop: 8 }}>
                    <span>Totaal incl. BTW</span><span style={{ color: "#1a73e8" }}>{fmt(selected.total_amount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {selected.notes && (
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: "0.85rem", color: "#92400e" }}>
                💬 {selected.notes}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {selected.status === "concept" && (
                <button disabled={updating} onClick={() => updateStatus(selected.id, "verzonden")}
                  style={{ background: "#1a73e8", color: "#fff", padding: "10px 18px", border: "none", borderRadius: 9, fontWeight: 700, cursor: "pointer", fontSize: "0.88rem" }}>
                  📤 Markeer als verzonden
                </button>
              )}
              {selected.status === "verzonden" && (
                <button disabled={updating} onClick={() => updateStatus(selected.id, "betaald")}
                  style={{ background: "#10b981", color: "#fff", padding: "10px 18px", border: "none", borderRadius: 9, fontWeight: 700, cursor: "pointer", fontSize: "0.88rem" }}>
                  ✅ Markeer als betaald
                </button>
              )}
              {(selected.status === "concept" || selected.status === "verzonden") && (
                <button disabled={updating} onClick={() => updateStatus(selected.id, "geannuleerd")}
                  style={{ background: "#f1f5f9", color: "#64748b", padding: "10px 18px", border: "none", borderRadius: 9, fontWeight: 600, cursor: "pointer", fontSize: "0.88rem" }}>
                  Annuleren
                </button>
              )}
              <button onClick={() => deleteInvoice(selected.id)}
                style={{ background: "#fee2e2", color: "#991b1b", padding: "10px 18px", border: "none", borderRadius: 9, fontWeight: 600, cursor: "pointer", fontSize: "0.88rem", marginLeft: "auto" }}>
                🗑 Verwijderen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}