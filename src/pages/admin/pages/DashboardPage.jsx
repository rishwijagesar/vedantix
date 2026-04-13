import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Card, SectionTitle, Button, StatCard } from "../components/AdminUI";
import { TIME_FILTERS, currency } from "../utils/adminStorage";

import { useOutletContext } from "react-router-dom";

export default function DashboardPage({ store: storeProp }) {
  /** @type {{ store: any }} */
  const outletContext = useOutletContext();

  const store = storeProp || outletContext.store;
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        <StatCard
          title="Totaal klanten"
          value={store.customers.length}
          subtitle={`${store.activeCustomers} live`}
          tone="#10b981"
        />
        <StatCard
          title="MRR"
          value={currency(store.totalMonthlyRevenue)}
          subtitle="Maandelijkse omzet"
          tone="#0ea5e9"
        />
        <StatCard
          title="Uitgaven"
          value={currency(store.totalMonthlyCosts)}
          subtitle="Infra + extra kosten"
          tone="#f97316"
        />
        <StatCard
          title="Fouten"
          value={store.failedCustomers}
          subtitle="Sites met deployment issues"
          tone="#ef4444"
        />
        <StatCard
          title="Waarschuwingen"
          value={store.warningCustomers}
          subtitle="Aandacht vereist"
          tone="#f59e0b"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 18,
        }}
      >
        <Card>
          <SectionTitle
            title="Omzet, kosten en winst"
            subtitle="Totaal overzicht van al je klanten."
            action={
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {TIME_FILTERS.map((item) => (
                  <Button
                    key={item.key}
                    tone={store.financeFilter === item.key ? "primary" : "default"}
                    onClick={() => store.setFinanceFilter(item.key)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            }
          />
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <AreaChart data={store.dashboardTrendData}>
                <defs>
                  <linearGradient id="dashRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="dashProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="omzet"
                  stroke="#0ea5e9"
                  fill="url(#dashRevenue)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="winst"
                  stroke="#10b981"
                  fill="url(#dashProfit)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Pakketten"
            subtitle="Aantal klanten en omzet per pakket."
          />
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <BarChart data={store.packageChartData}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Bar dataKey="klanten" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="omzet" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}