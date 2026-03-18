import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const Transaction = base44.entities.Transaction;
const FinanceTarget = base44.entities.FinanceTarget;

const TAX_RATE = 0.21; // 21% BTW / IB schatting
const INCOME_TAX_RATE = 0.37; // ~37% inkomstenbelasting bracket ZZP

const CATEGORY_LABELS = {
  website_sale: "Website verkoop",
  change_request: "Wijzigingsverzoek",
  hosting_renewal: "Hosting verlenging",
  other_income: "Overige inkomsten",
  software: "Software/Tools",
  marketing: "Marketing",
  tax: "Belasting",
  office: "Kantoor",
  other_expense: "Overige uitgaven",
};

function formatEuro(val) {
  return "€" + Number(val || 0).toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function ProgressBar({ value, max, color = "#1a73e8" }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div style={{ background: "#f1f5f9", borderRadius: 100, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, background: color, height: 8, borderRadius: 100, transition: "width 0.4s" }} />
    </div>
  );
}

function StatCard({ label, value, sub, color = "#1a73e8", icon, trend }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ fontSize: "1.3rem" }}>{icon}</span>
        {trend !== undefined && (
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: trend >= 0 ? "#10b981" : "#ef4444", background: trend >= 0 ? "#f0fdf4" : "#fef2f2", padding: "2px 8px", borderRadius: 100 }}>
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div style={{ fontSize: "1.7rem", fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151" }}>{label}</div>
      {sub && <div style={{ fontSize: "0.76rem", color: "#94a3b8", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function FinanceStats() {
  const [transactions, setTransactions] = useState([]);
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("month");
  const [showAddTx, setShowAddTx] = useState(false);
  const [showAddTarget, setShowAddTarget] = useState(false);
  const [txForm, setTxForm] = useState({ type: "income", category: "website_sale", amount: "", description: "", date: new Date().toISOString().split("T")[0], client_name: "", invoice_number: "", is_tax_deductible: false });
  const [targetForm, setTargetForm] = useState({ period: "monthly", year: new Date().getFullYear(), month: new Date().getMonth() + 1, quarter: Math.ceil((new Date().getMonth() + 1) / 3), revenue_target: "", profit_target: "", clients_target: "" });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const [txs, tgts] = await Promise.all([Transaction.list("-date", 500), FinanceTarget.list()]);
    setTransactions(txs);
    setTargets(tgts);
    setLoading(false);
  };

  const filterByPeriod = (txs, p) => {
    const d = new Date();
    return txs.filter(tx => {
      const txDate = new Date(tx.date + "T12:00:00");
      if (p === "day") return tx.date === today;
      if (p === "week") {
        const weekAgo = new Date(d); weekAgo.setDate(d.getDate() - 7);
        return txDate >= weekAgo;
      }
      if (p === "month") return txDate.getMonth() === d.getMonth() && txDate.getFullYear() === d.getFullYear();
      if (p === "quarter") {
        const q = Math.ceil((d.getMonth() + 1) / 3);
        const txQ = Math.ceil((txDate.getMonth() + 1) / 3);
        return txQ === q && txDate.getFullYear() === d.getFullYear();
      }
      if (p === "year") return txDate.getFullYear() === d.getFullYear();
      return true;
    });
  };

  const filtered = filterByPeriod(transactions, period);
  const income = filtered.filter(t => t.type === "income").reduce((s, t) => s + (t.amount || 0), 0);
  const expenses = filtered.filter(t => t.type === "expense").reduce((s, t) => s + (t.amount || 0), 0);
  const profit = income - expenses;
  const taxEstimate = profit > 0 ? profit * INCOME_TAX_RATE : 0;
  const netProfit = profit - taxEstimate;

  // Get relevant target
  const getTarget = () => {
    if (period === "month") return targets.find(t => t.period === "monthly" && t.year === now.getFullYear() && t.month === now.getMonth() + 1);
    if (period === "quarter") return targets.find(t => t.period === "quarterly" && t.year === now.getFullYear() && t.quarter === Math.ceil((now.getMonth() + 1) / 3));
    if (period === "year") return targets.find(t => t.period === "yearly" && t.year === now.getFullYear());
    return null;
  };
  const target = getTarget();

  // Category breakdown
  const incomeByCategory = {};
  const expenseByCategory = {};
  filtered.filter(t => t.type === "income").forEach(t => { incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + t.amount; });
  filtered.filter(t => t.type === "expense").forEach(t => { expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount; });

  // Monthly trend (last 6 months)
  const monthlyTrend = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const monthTxs = transactions.filter(tx => {
      const txDate = new Date(tx.date + "T12:00:00");
      return txDate.getMonth() === d.getMonth() && txDate.getFullYear() === d.getFullYear();
    });
    const inc = monthTxs.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const exp = monthTxs.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { label: d.toLocaleDateString("nl-NL", { month: "short" }), income: inc, expense: exp, profit: inc - exp };
  });
  const maxVal = Math.max(...monthlyTrend.map(m => Math.max(m.income, m.expense)), 1);

  const saveTransaction = async () => {
    if (!txForm.amount || !txForm.date) return;
    setSaving(true);
    await Transaction.create({ ...txForm, amount: parseFloat(txForm.amount) });
    setTxForm({ type: "income", category: "website_sale", amount: "", description: "", date: today, client_name: "", invoice_number: "", is_tax_deductible: false });
    setShowAddTx(false);
    await loadData();
    setSaving(false);
  };

  const saveTarget = async () => {
    setSaving(true);
    await FinanceTarget.create({ ...targetForm, revenue_target: parseFloat(targetForm.revenue_target) || 0, profit_target: parseFloat(targetForm.profit_target) || 0, clients_target: parseInt(targetForm.clients_target) || 0 });
    setShowAddTarget(false);
    await loadData();
    setSaving(false);
  };

  const deleteTransaction = async (id) => {
    if (!confirm("Verwijderen?")) return;
    await Transaction.delete(id);
    await loadData();
  };

  const PERIODS = [["day","Dag"],["week","Week"],["month","Maand"],["quarter","Kwartaal"],["year","Jaar"]];

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>⏳ Laden...</div>;

  return (
    <div>
      <style>{`
        .fin-tab{padding:8px 16px;border-radius:8px;font-weight:600;font-size:0.82rem;cursor:pointer;border:none;transition:all 0.2s}
        .fin-tab.active{background:#1a73e8;color:#fff}
        .fin-tab:not(.active){background:#f1f5f9;color:#64748b}
        .fin-tab:not(.active):hover{background:#e2e8f0}
        .period-btn{padding:7px 14px;border-radius:8px;font-weight:700;font-size:0.82rem;cursor:pointer;border:none;transition:all 0.2s}
        .period-btn.active{background:#0a1628;color:#fff}
        .period-btn:not(.active){background:#f1f5f9;color:#64748b}
        .tx-row{display:flex;justify-content:space-between;align-items:center;padding:11px 14px;border-radius:10px;background:#f8fafc;margin-bottom:6px;flex-wrap:wrap;gap:8px}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999;display:flex;align-items:center;justify-content:center;padding:20px}
        .modal{background:#fff;border-radius:20px;padding:28px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto}
        .fin-input{width:100%;padding:10px 14px;border:2px solid #e2e8f0;border-radius:9px;font-size:0.9rem;font-family:inherit;outline:none;transition:border-color 0.2s;background:#fff}
        .fin-input:focus{border-color:#1a73e8}
        .save-btn{background:#1a73e8;color:#fff;padding:11px 22px;border-radius:10px;font-weight:700;font-size:0.9rem;border:none;cursor:pointer}
        .save-btn:disabled{background:#9ca3af;cursor:not-allowed}
        .bar-chart{display:flex;gap:8px;align-items:flex-end;height:120px;margin:20px 0 8px}
        .bar-group{flex:1;display:flex;gap:3px;align-items:flex-end}
        .bar{border-radius:4px 4px 0 0;transition:height 0.3s;cursor:pointer;min-height:3px}
      `}</style>

      {/* Period selector */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {PERIODS.map(([id, label]) => (
            <button key={id} className={`period-btn ${period === id ? "active" : ""}`} onClick={() => setPeriod(id)}>{label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="fin-tab active" onClick={() => setShowAddTx(true)}>➕ Transactie</button>
          <button className="fin-tab active" style={{ background: "#8b5cf6" }} onClick={() => setShowAddTarget(true)}>🎯 Target</button>
        </div>
      </div>

      {/* Sub tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[["overview","📊 Overzicht"],["trend","📈 Trend"],["transactions","💳 Transacties"],["targets","🎯 Targets"]].map(([id, label]) => (
          <button key={id} className={`fin-tab ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div>
          {/* Key metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
            <StatCard icon="💰" label="Omzet" value={formatEuro(income)} color="#1a73e8" sub={`${filtered.filter(t=>t.type==="income").length} transacties`} />
            <StatCard icon="📤" label="Uitgaven" value={formatEuro(expenses)} color="#ef4444" sub={`${filtered.filter(t=>t.type==="expense").length} posten`} />
            <StatCard icon="📈" label="Bruto winst" value={formatEuro(profit)} color={profit >= 0 ? "#10b981" : "#ef4444"} sub={`${income > 0 ? Math.round((profit/income)*100) : 0}% marge`} />
            <StatCard icon="🏛️" label="Est. belasting" value={formatEuro(taxEstimate)} color="#f59e0b" sub={`${Math.round(INCOME_TAX_RATE*100)}% IB schatting`} />
            <StatCard icon="✨" label="Netto winst" value={formatEuro(netProfit)} color={netProfit >= 0 ? "#8b5cf6" : "#ef4444"} sub="Na belasting" />
          </div>

          {/* Target progress */}
          {target && (
            <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #e5e7eb", marginBottom: 20 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.95rem" }}>🎯 Target voortgang</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {target.revenue_target > 0 && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", color: "#64748b", marginBottom: 6 }}>
                      <span>Omzet</span>
                      <span style={{ fontWeight: 700, color: "#1a73e8" }}>{formatEuro(income)} / {formatEuro(target.revenue_target)}</span>
                    </div>
                    <ProgressBar value={income} max={target.revenue_target} color="#1a73e8" />
                  </div>
                )}
                {target.profit_target > 0 && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", color: "#64748b", marginBottom: 6 }}>
                      <span>Winst</span>
                      <span style={{ fontWeight: 700, color: "#10b981" }}>{formatEuro(profit)} / {formatEuro(target.profit_target)}</span>
                    </div>
                    <ProgressBar value={profit} max={target.profit_target} color="#10b981" />
                  </div>
                )}
              </div>
            </div>
          )}
          {!target && (period === "month" || period === "quarter" || period === "year") && (
            <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: "0.85rem", color: "#92400e" }}>
              💡 Geen target ingesteld voor deze periode. Klik op <strong>🎯 Target</strong> om een doelstelling in te stellen.
            </div>
          )}

          {/* Category breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #e5e7eb" }}>
              <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: "0.9rem", color: "#10b981" }}>💰 Inkomsten per categorie</h4>
              {Object.keys(incomeByCategory).length === 0 ? <p style={{ color: "#94a3b8", fontSize: "0.83rem" }}>Geen inkomsten</p> :
                Object.entries(incomeByCategory).sort((a,b) => b[1]-a[1]).map(([cat, val]) => (
                  <div key={cat} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 4 }}>
                      <span style={{ color: "#374151", fontWeight: 500 }}>{CATEGORY_LABELS[cat] || cat}</span>
                      <span style={{ fontWeight: 700, color: "#10b981" }}>{formatEuro(val)}</span>
                    </div>
                    <ProgressBar value={val} max={income} color="#10b981" />
                  </div>
                ))
              }
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #e5e7eb" }}>
              <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: "0.9rem", color: "#ef4444" }}>📤 Uitgaven per categorie</h4>
              {Object.keys(expenseByCategory).length === 0 ? <p style={{ color: "#94a3b8", fontSize: "0.83rem" }}>Geen uitgaven</p> :
                Object.entries(expenseByCategory).sort((a,b) => b[1]-a[1]).map(([cat, val]) => (
                  <div key={cat} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 4 }}>
                      <span style={{ color: "#374151", fontWeight: 500 }}>{CATEGORY_LABELS[cat] || cat}</span>
                      <span style={{ fontWeight: 700, color: "#ef4444" }}>{formatEuro(val)}</span>
                    </div>
                    <ProgressBar value={val} max={expenses || 1} color="#ef4444" />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/* TREND */}
      {activeTab === "trend" && (
        <div style={{ background: "#fff", borderRadius: 16, padding: "24px 22px", border: "1px solid #e5e7eb" }}>
          <h4 style={{ fontWeight: 700, marginBottom: 20, fontSize: "0.95rem" }}>📈 Trend laatste 6 maanden</h4>
          <div className="bar-chart">
            {monthlyTrend.map((m, i) => (
              <div key={i} className="bar-group" title={`${m.label}: Omzet ${formatEuro(m.income)}, Uitgaven ${formatEuro(m.expense)}`}>
                <div className="bar" style={{ height: `${(m.income / maxVal) * 100}%`, background: "#1a73e8", flex: 1 }} title={`Omzet: ${formatEuro(m.income)}`} />
                <div className="bar" style={{ height: `${(m.expense / maxVal) * 100}%`, background: "#ef4444", flex: 1 }} title={`Uitgaven: ${formatEuro(m.expense)}`} />
                <div className="bar" style={{ height: `${(Math.max(0, m.profit) / maxVal) * 100}%`, background: "#10b981", flex: 1 }} title={`Winst: ${formatEuro(m.profit)}`} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {monthlyTrend.map((m, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "0.73rem", color: "#94a3b8", fontWeight: 600 }}>{m.label}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 16, justifyContent: "center" }}>
            <span style={{ fontSize: "0.78rem", color: "#1a73e8", fontWeight: 700 }}>■ Omzet</span>
            <span style={{ fontSize: "0.78rem", color: "#ef4444", fontWeight: 700 }}>■ Uitgaven</span>
            <span style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 700 }}>■ Winst</span>
          </div>

          {/* Monthly detail table */}
          <div style={{ marginTop: 24 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                  {["Maand","Omzet","Uitgaven","Winst","Marge"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "right", color: "#64748b", fontWeight: 700, fontSize: "0.78rem" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyTrend.map((m, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 10px", fontWeight: 600, color: "#374151" }}>{m.label}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: "#1a73e8", fontWeight: 600 }}>{formatEuro(m.income)}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: "#ef4444", fontWeight: 600 }}>{formatEuro(m.expense)}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: m.profit >= 0 ? "#10b981" : "#ef4444", fontWeight: 700 }}>{formatEuro(m.profit)}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: "#64748b", fontWeight: 600 }}>{m.income > 0 ? Math.round((m.profit/m.income)*100) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TRANSACTIONS */}
      {activeTab === "transactions" && (
        <div>
          <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #e5e7eb" }}>
            <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.95rem" }}>💳 Transacties ({filtered.length})</h4>
            {filtered.length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Geen transacties in deze periode.</p>
            ) : (
              filtered.sort((a,b) => b.date.localeCompare(a.date)).map(tx => (
                <div key={tx.id} className="tx-row">
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: "1.2rem" }}>{tx.type === "income" ? "💰" : "📤"}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{tx.description || CATEGORY_LABELS[tx.category]}</div>
                      <div style={{ fontSize: "0.76rem", color: "#94a3b8" }}>{tx.date} {tx.client_name && `• ${tx.client_name}`} {tx.invoice_number && `• ${tx.invoice_number}`}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontWeight: 800, color: tx.type === "income" ? "#10b981" : "#ef4444", fontSize: "0.95rem" }}>
                      {tx.type === "income" ? "+" : "-"}{formatEuro(tx.amount)}
                    </span>
                    <button onClick={() => deleteTransaction(tx.id)} style={{ background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer", fontSize: "0.75rem" }}>🗑</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TARGETS */}
      {activeTab === "targets" && (
        <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #e5e7eb" }}>
          <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.95rem" }}>🎯 Ingestelde targets</h4>
          {targets.length === 0 ? <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Nog geen targets ingesteld.</p> :
            targets.map(t => (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#f8fafc", borderRadius: 10, marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                    {t.period === "monthly" ? `Maand ${t.month}/${t.year}` : t.period === "quarterly" ? `Q${t.quarter} ${t.year}` : `Jaar ${t.year}`}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 12, fontSize: "0.82rem" }}>
                  {t.revenue_target > 0 && <span style={{ color: "#1a73e8", fontWeight: 700 }}>Omzet: {formatEuro(t.revenue_target)}</span>}
                  {t.profit_target > 0 && <span style={{ color: "#10b981", fontWeight: 700 }}>Winst: {formatEuro(t.profit_target)}</span>}
                  {t.clients_target > 0 && <span style={{ color: "#8b5cf6", fontWeight: 700 }}>Klanten: {t.clients_target}</span>}
                </div>
                <button onClick={async () => { if(confirm("Verwijderen?")) { await FinanceTarget.delete(t.id); loadData(); } }} style={{ background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer", fontSize: "0.75rem" }}>🗑</button>
              </div>
            ))
          }
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddTx && (
        <div className="modal-overlay" onClick={e => { if(e.target === e.currentTarget) setShowAddTx(false); }}>
          <div className="modal">
            <h3 style={{ fontWeight: 800, marginBottom: 20, fontSize: "1.05rem" }}>➕ Transactie toevoegen</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Type</label>
                  <select className="fin-input" value={txForm.type} onChange={e => setTxForm(p => ({ ...p, type: e.target.value, category: e.target.value === "income" ? "website_sale" : "software" }))}>
                    <option value="income">💰 Inkomst</option>
                    <option value="expense">📤 Uitgave</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Datum</label>
                  <input type="date" className="fin-input" value={txForm.date} onChange={e => setTxForm(p => ({ ...p, date: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Categorie</label>
                <select className="fin-input" value={txForm.category} onChange={e => setTxForm(p => ({ ...p, category: e.target.value }))}>
                  {txForm.type === "income"
                    ? [["website_sale","Website verkoop"],["change_request","Wijzigingsverzoek"],["hosting_renewal","Hosting verlenging"],["other_income","Overig"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)
                    : [["software","Software/Tools"],["marketing","Marketing"],["tax","Belasting"],["office","Kantoor"],["other_expense","Overig"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)
                  }
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Bedrag (€)</label>
                  <input type="number" className="fin-input" placeholder="0.00" value={txForm.amount} onChange={e => setTxForm(p => ({ ...p, amount: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Factuurnummer</label>
                  <input type="text" className="fin-input" placeholder="VDX-2026-001" value={txForm.invoice_number} onChange={e => setTxForm(p => ({ ...p, invoice_number: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Klant (optioneel)</label>
                <input type="text" className="fin-input" placeholder="Naam van klant" value={txForm.client_name} onChange={e => setTxForm(p => ({ ...p, client_name: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Omschrijving</label>
                <input type="text" className="fin-input" placeholder="Korte omschrijving" value={txForm.description} onChange={e => setTxForm(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                <button onClick={() => setShowAddTx(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 600, cursor: "pointer", color: "#475569" }}>Annuleren</button>
                <button className="save-btn" disabled={!txForm.amount || saving} onClick={saveTransaction}>{saving ? "Opslaan..." : "💾 Opslaan"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Target Modal */}
      {showAddTarget && (
        <div className="modal-overlay" onClick={e => { if(e.target === e.currentTarget) setShowAddTarget(false); }}>
          <div className="modal">
            <h3 style={{ fontWeight: 800, marginBottom: 20, fontSize: "1.05rem" }}>🎯 Target instellen</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Periode</label>
                  <select className="fin-input" value={targetForm.period} onChange={e => setTargetForm(p => ({ ...p, period: e.target.value }))}>
                    <option value="monthly">Maandelijks</option>
                    <option value="quarterly">Per kwartaal</option>
                    <option value="yearly">Jaarlijks</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Jaar</label>
                  <input type="number" className="fin-input" value={targetForm.year} onChange={e => setTargetForm(p => ({ ...p, year: parseInt(e.target.value) }))} />
                </div>
              </div>
              {targetForm.period === "monthly" && (
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Maand</label>
                  <select className="fin-input" value={targetForm.month} onChange={e => setTargetForm(p => ({ ...p, month: parseInt(e.target.value) }))}>
                    {["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"].map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                  </select>
                </div>
              )}
              {targetForm.period === "quarterly" && (
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Kwartaal</label>
                  <select className="fin-input" value={targetForm.quarter} onChange={e => setTargetForm(p => ({ ...p, quarter: parseInt(e.target.value) }))}>
                    <option value={1}>Q1 (Jan–Mar)</option>
                    <option value={2}>Q2 (Apr–Jun)</option>
                    <option value={3}>Q3 (Jul–Sep)</option>
                    <option value={4}>Q4 (Okt–Dec)</option>
                  </select>
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Omzet target (€)</label>
                  <input type="number" className="fin-input" placeholder="0" value={targetForm.revenue_target} onChange={e => setTargetForm(p => ({ ...p, revenue_target: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Winst target (€)</label>
                  <input type="number" className="fin-input" placeholder="0" value={targetForm.profit_target} onChange={e => setTargetForm(p => ({ ...p, profit_target: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 5, fontSize: "0.82rem", color: "#475569" }}>Klanten target</label>
                  <input type="number" className="fin-input" placeholder="0" value={targetForm.clients_target} onChange={e => setTargetForm(p => ({ ...p, clients_target: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                <button onClick={() => setShowAddTarget(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 600, cursor: "pointer", color: "#475569" }}>Annuleren</button>
                <button className="save-btn" disabled={saving} onClick={saveTarget}>{saving ? "Opslaan..." : "🎯 Target opslaan"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}