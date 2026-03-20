import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import FinancieelItemModal from "./FinancieelItemModal";
import ExportButton, { exportToCSV, exportToPDF } from "./ExportButton";

const Payment = base44.entities.Payment;
const FinancieelItem = base44.entities.FinancieelItem;

const HERHALING_DAGEN = {
  dagelijks: 1, wekelijks: 7, maandelijks: 30,
  kwartaal: 90, halfjaar: 180, jaarlijks: 365
};

const FILTERS = [
  { label: "Vandaag", value: "1d", days: 1 },
  { label: "1 week", value: "1w", days: 7 },
  { label: "1 maand", value: "1m", days: 30 },
  { label: "Kwartaal", value: "3m", days: 90 },
  { label: "Halfjaar", value: "6m", days: 180 },
  { label: "1 jaar", value: "1y", days: 365 },
];

const BTW_RATE = 0.21; // 21%
const IB_RATE = 0.3685; // ~36.85% inkomstenbelasting ZZP schaal

function StatCard({ label, value, sub, color, icon }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{icon}</div>
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
      </div>
      <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a" }}>{value}</div>
      {sub && <div style={{ fontSize: "0.76rem", color: "#94a3b8", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function fmt(n) {
  return "€" + Number(n || 0).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getStartDate(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
}

function groupByPeriod(payments, days) {
  // Group into buckets for chart
  const buckets = {};
  const now = new Date();
  const start = getStartDate(days);

  payments.forEach(p => {
    const date = new Date(p.factuurdatum || p.created_date);
    if (date < start) return;

    let key;
    if (days <= 1) key = `${date.getHours()}:00`;
    else if (days <= 7) key = date.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric" });
    else if (days <= 90) key = date.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
    else key = date.toLocaleDateString("nl-NL", { month: "short", year: "2-digit" });

    if (!buckets[key]) buckets[key] = { name: key, inkomsten: 0, openstaand: 0 };
    const bedrag = p.totaal_bedrag || p.bedrag || 0;
    if (p.status === "betaald") buckets[key].inkomsten += bedrag;
    else if (p.status === "openstaand") buckets[key].openstaand += bedrag;
  });

  return Object.values(buckets);
}

export default function CRMFinancien() {
  const [facturen, setFacturen] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("1m");
  const [showModal, setShowModal] = useState(false);

  const load = async () => {
    const [f, i] = await Promise.all([
      Payment.list("-factuurdatum", 500),
      FinancieelItem.list("-datum", 500)
    ]);
    setFacturen(f);
    setItems(i);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    await FinancieelItem.create(data);
    setShowModal(false);
    load();
  };

  const deleteItem = async (id) => {
    if (!confirm("Item verwijderen?")) return;
    await FinancieelItem.delete(id);
    load();
  };

  const { days } = FILTERS.find(f => f.value === filter);
  const startDate = getStartDate(days);

  const filtered = useMemo(() => {
    return facturen.filter(p => {
      const date = new Date(p.factuurdatum || p.created_date);
      return date >= startDate;
    });
  }, [facturen, filter]);

  const omzet = filtered.filter(f => f.status === "betaald").reduce((s, f) => s + (f.totaal_bedrag || f.bedrag || 0), 0);
  const openstaand = filtered.filter(f => f.status === "openstaand").reduce((s, f) => s + (f.totaal_bedrag || f.bedrag || 0), 0);
  const verlopen = filtered.filter(f => f.status === "verlopen").reduce((s, f) => s + (f.totaal_bedrag || f.bedrag || 0), 0);

  // Bereken extra inkomsten/uitgaven uit FinancieelItem, rekening houdend met herhaling
  const { extraInkomsten, extraUitgaven, filteredItems } = useMemo(() => {
    let extraInkomsten = 0, extraUitgaven = 0;
    const filteredItems = [];
    items.forEach(item => {
      const itemDatum = new Date(item.datum);
      let telt = false;
      if (item.herhaling === "eenmalig") {
        telt = itemDatum >= startDate;
      } else {
        // Terugkerend: telt mee als datum vóór of binnen de periode valt
        telt = itemDatum <= new Date();
      }
      if (!telt) return;

      let bedragInPeriode = item.bedrag;
      if (item.herhaling !== "eenmalig") {
        const herhalingDagen = HERHALING_DAGEN[item.herhaling] || 1;
        const aantalKeer = Math.max(1, Math.floor(days / herhalingDagen));
        bedragInPeriode = item.bedrag * aantalKeer;
      }

      filteredItems.push({ ...item, bedragInPeriode });
      if (item.type === "inkomst") extraInkomsten += bedragInPeriode;
      else extraUitgaven += bedragInPeriode;
    });
    return { extraInkomsten, extraUitgaven, filteredItems };
  }, [items, filter]);

  // BTW: omzet bevat 21% BTW (incl.), dus BTW = omzet - omzet/1.21
  const btwAfdracht = omzet - omzet / (1 + BTW_RATE);
  const omzetExclBtw = omzet / (1 + BTW_RATE);
  const totaalInkomsten = omzetExclBtw + extraInkomsten;
  const totaalUitgaven = extraUitgaven;
  const winst = totaalInkomsten - totaalUitgaven;
  // Schatting inkomstenbelasting over netto winst (excl. BTW)
  const ibSchatting = Math.max(0, winst * IB_RATE);
  const nettoWinst = winst - ibSchatting;

  const chartData = useMemo(() => groupByPeriod(facturen, days), [facturen, filter]);

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>Laden...</div>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Financiën</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 4 }}>Overzicht van inkomsten, winst en belasting</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, background: "#f1f5f9", borderRadius: 12, padding: 4 }}>
          {FILTERS.map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)} style={{
              padding: "7px 14px", borderRadius: 9, border: "none", cursor: "pointer",
              background: filter === f.value ? "#fff" : "transparent",
              color: filter === f.value ? "#1e293b" : "#64748b",
              fontWeight: filter === f.value ? 700 : 500,
              fontSize: "0.82rem",
              boxShadow: filter === f.value ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.15s"
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14, marginBottom: 28 }}>
        <StatCard label="Omzet (incl. BTW)" value={fmt(omzet)} icon="💰" color="#10b981" sub="Betaalde facturen" />
        <StatCard label="Omzet (excl. BTW)" value={fmt(omzetExclBtw)} icon="📊" color="#3b82f6" sub="Netto ontvangen" />
        <StatCard label="Extra inkomsten" value={fmt(extraInkomsten)} icon="➕" color="#06b6d4" sub="Handmatig toegevoegd" />
        <StatCard label="Uitgaven" value={fmt(totaalUitgaven)} icon="💸" color="#ef4444" sub="Handmatig toegevoegd" />
        <StatCard label="Openstaand" value={fmt(openstaand)} icon="⏳" color="#f59e0b" sub={`${filtered.filter(f => f.status === "openstaand").length} facturen`} />
        <StatCard label="BTW afdracht" value={fmt(btwAfdracht)} icon="🏛️" color="#8b5cf6" sub="Af te dragen aan Belastingdienst" />
        <StatCard label="IB schatting" value={fmt(ibSchatting)} icon="📋" color="#f97316" sub="~36.85% over winst" />
        <StatCard label="Netto winst" value={fmt(nettoWinst)} icon="✅" color="#10b981" sub="Na BTW, uitgaven & IB" />
      </div>

      {/* Chart */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "22px 24px", marginBottom: 24 }}>
        <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a", marginBottom: 20 }}>Inkomsten over tijd</h3>
        {chartData.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Geen data voor deze periode</div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="gradInk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOpen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => "€" + v} />
              <Tooltip formatter={(val, name) => [fmt(val), name === "inkomsten" ? "Betaald" : "Openstaand"]} contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.82rem" }} />
              <Area type="monotone" dataKey="inkomsten" stroke="#10b981" strokeWidth={2.5} fill="url(#gradInk)" name="inkomsten" />
              <Area type="monotone" dataKey="openstaand" stroke="#f59e0b" strokeWidth={2} fill="url(#gradOpen)" name="openstaand" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Inkomsten & Uitgaven lijst */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>Inkomsten & Uitgaven</h3>
          <button onClick={() => setShowModal(true)} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
            + Toevoegen
          </button>
        </div>
        {filteredItems.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "#94a3b8", fontSize: "0.88rem" }}>
            Nog geen items toegevoegd. Klik op "+ Toevoegen" om te beginnen.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Type", "Omschrijving", "Categorie", "Frequentie", "Bedrag", "In periode", ""].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "11px 14px" }}>
                    <span style={{ background: item.type === "inkomst" ? "#d1fae5" : "#fee2e2", color: item.type === "inkomst" ? "#065f46" : "#dc2626", padding: "3px 9px", borderRadius: 100, fontSize: "0.73rem", fontWeight: 700 }}>
                      {item.type === "inkomst" ? "💰 Inkomst" : "💸 Uitgave"}
                    </span>
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: "0.85rem", fontWeight: 600, color: "#1e293b" }}>{item.omschrijving}</td>
                  <td style={{ padding: "11px 14px", fontSize: "0.82rem", color: "#64748b" }}>{item.categorie || "–"}</td>
                  <td style={{ padding: "11px 14px", fontSize: "0.82rem", color: "#64748b" }}>
                    <span style={{ background: item.herhaling === "eenmalig" ? "#f1f5f9" : "#fef3c7", color: item.herhaling === "eenmalig" ? "#64748b" : "#92400e", padding: "2px 8px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 600 }}>
                      {item.herhaling}
                    </span>
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: "0.85rem", color: "#374151" }}>{fmt(item.bedrag)}</td>
                  <td style={{ padding: "11px 14px", fontSize: "0.88rem", fontWeight: 700, color: item.type === "inkomst" ? "#10b981" : "#ef4444" }}>
                    {item.type === "inkomst" ? "+" : "-"}{fmt(item.bedragInPeriode)}
                  </td>
                  <td style={{ padding: "11px 14px" }}>
                    <button onClick={() => deleteItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "1rem" }}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Belasting breakdown */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "22px 24px" }}>
        <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a", marginBottom: 16 }}>Belastingoverzicht</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "Omzet incl. BTW (facturen)", value: omzet, color: "#10b981" },
            { label: "BTW (21%) — afdragen aan Belastingdienst", value: -btwAfdracht, color: "#ef4444" },
            { label: "Omzet excl. BTW", value: omzetExclBtw, color: "#3b82f6" },
            { label: "Extra inkomsten (handmatig)", value: extraInkomsten, color: "#06b6d4" },
            { label: "Uitgaven (handmatig)", value: -totaalUitgaven, color: "#ef4444" },
            { label: "Winst voor belasting", value: winst, color: "#3b82f6" },
            { label: "Inkomstenbelasting schatting (~36.85%)", value: -ibSchatting, color: "#f97316" },
            { label: "Netto over na belasting", value: nettoWinst, color: "#10b981", bold: true },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: row.bold ? "#f0fdf4" : "#f8fafc", borderRadius: 9 }}>
              <span style={{ fontSize: "0.86rem", fontWeight: row.bold ? 700 : 500, color: "#374151" }}>{row.label}</span>
              <span style={{ fontSize: "0.95rem", fontWeight: 800, color: row.color }}>{row.value < 0 ? "-" + fmt(Math.abs(row.value)) : fmt(row.value)}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 14 }}>
          * Schattingen zijn indicatief. Raadpleeg een boekhouder voor exacte belastingberekeningen. IB-tarief is gebaseerd op box 1 schijf 2 (2024).
        </p>
      </div>

      {showModal && (
        <FinancieelItemModal
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}