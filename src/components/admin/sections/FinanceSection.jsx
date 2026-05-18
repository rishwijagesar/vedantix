import React from 'react';

function Row({ label, value }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 0',
        borderBottom: '1px solid #eef2f7',
      }}
    >
      <span style={{ color: '#64748b', fontSize: 14 }}>{label}</span>
      <strong style={{ color: '#0f172a' }}>{value}</strong>
    </div>
  );
}

export default function FinanceSection({
  currency = (v) => `€ ${Number(v || 0).toFixed(2)}`,
  revenue = 0,
  infraCost = 0,
  directExpenses = 0,
  profit = 0,
  margin = 0,
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #dbe4ef',
        borderRadius: 20,
        padding: 24,
        display: 'grid',
        gap: 8,
      }}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
          Financieel overzicht
        </h3>
        <p style={{ marginTop: 6, color: '#64748b', fontSize: 14 }}>
          Automatische berekening van omzet, kosten en marge.
        </p>
      </div>

      <Row label="Maandelijkse omzet" value={currency(revenue)} />
      <Row label="Infra kosten" value={currency(infraCost)} />
      <Row label="Directe kosten" value={currency(directExpenses)} />
      <Row label="Winst" value={currency(profit)} />
      <Row label="Marge" value={`${Number(margin || 0).toFixed(1)}%`} />
    </div>
  );
}
