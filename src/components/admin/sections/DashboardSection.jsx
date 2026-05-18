import React from 'react';

function StatCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #dbe4ef',
        borderRadius: 20,
        padding: 20,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>{title}</div>
      <div style={{ marginTop: 8, fontSize: 28, fontWeight: 900, color: '#0f172a' }}>
        {value}
      </div>
      {subtitle ? (
        <div style={{ marginTop: 6, fontSize: 12, color: '#64748b' }}>{subtitle}</div>
      ) : null}
    </div>
  );
}

export default function DashboardSection({
  totalCustomers = 0,
  activeCustomers = 0,
  monthlyRevenue = '€ 0',
  monthlyCosts = '€ 0',
  failedCustomers = 0,
  warningCustomers = 0,
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
      }}
    >
      <StatCard
        title="Totaal klanten"
        value={totalCustomers}
        subtitle={`${activeCustomers} actief`}
      />
      <StatCard title="MRR" value={monthlyRevenue} subtitle="Maandelijkse omzet" />
      <StatCard title="Kosten" value={monthlyCosts} subtitle="Infra + extra kosten" />
      <StatCard title="Fouten" value={failedCustomers} subtitle="Deployment issues" />
      <StatCard title="Waarschuwingen" value={warningCustomers} subtitle="Aandacht vereist" />
    </div>
  );
}
